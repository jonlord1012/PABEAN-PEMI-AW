<?php
class MY_Profiler extends CI_Profiler {
    public function run()
    {
        // $output = parent::run();
        // log output here, and optionally return it if you do want it to display

        #$output = parent::_compile_queries();
        $output = $this->_go_log_me(); 
        $this->_writeMyLog($output);
        return ;
    }
    protected function _writeMyLog($param) {
        $this->CI =& get_instance();
        $this->CI->load->database();
        $this->CI->load->model('Mconfigkey');
        $hasil = $this->CI->Mconfigkey->checktoken();
        $vtoken = json_decode($hasil,true);
        
        $method = $this->CI->uri->total_segments()-1;
        $request_body = file_get_contents('php://input');
        $data = json_decode($request_body, true);
        #print_r(json_decode($request_body,true)); 
        #die();

        $param['EVENT']= isset($data['module']) ? $data['module'] : $this->CI->uri->segment($this->CI->uri->total_segments());
        $param['MODE_SOURCE'] = isset($data['method']) ? $data['method'] : $this->CI->uri->segment($method);
        $param['IP_ADDRESS'] = isset($_SERVER['HTTP_CLIENT_IP']) ? $_SERVER['HTTP_CLIENT_IP'] : (isset($_SERVER['HTTP_X_FORWARDED_FOR']) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : $_SERVER['REMOTE_ADDR']);        
        $param['ID_COMPANY'] = isset($vtoken['data']['ID_COMPANY']) ?  $vtoken['data']['ID_COMPANY'] :'ALL'  ; 
        $param['USERNAME'] = isset($vtoken['data']['VUSERNAME']) ?  $vtoken['data']['VUSERNAME'] :'admin'  ; 
        $param["URL"] = (empty($_SERVER['HTTPS']) ? 'http' : 'https') . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
        $param['DATABASE_NAME'] = isset($param['DATABASE_NAME']) ?  $param['DATABASE_NAME'] : 'dbit'  ; 
        $param['TOTAL_QUERIES'] = isset($param['TOTAL_QUERIES']) ? $param['TOTAL_QUERIES'] : '0' ; 
        $param['QUERIES'] = isset($param['QUERIES']) ? $param['QUERIES'] : '-' ; 
        $param['CREATED_DATETIME'] = date('Y-m-d H:i:s');
           
           # $this->CI->db->insert('LOG_MY_ACTIVITIES', $param);  

        #$query = "INSERT INTO LOG_MY_ACTIVITIES (DATABASE_NAME, TOTAL_QUERIES, QUERIES, EVENT, MODE_SOURCE, IP_ADDRESS, ID_COMPANY, USERNAME, URL, CREATED_DATETIME) VALUES ('". $param['DATABASE_NAME'] . "', '" . $param['TOTAL_QUERIES'] . "' ,  CONVERT(VARBINARY(MAX), " . json_encode($param['QUERIES']) . "',1) , '" . $param['EVENT'] . "' , '".$param['MODE_SOURCE'] . "' , '" . $param['IP_ADDRESS'] . "', '". $param['ID_COMPANY'] . "', '" . $param['USERNAME'] . "' , '" . $param['URL'] . "', '" . $param['CREATED_DATETIME'] . "')  ; " ;  
        $query = "INSERT INTO LOG_MY_ACTIVITIES (DATABASE_NAME, TOTAL_QUERIES, QUERIES, EVENT, MODE_SOURCE, IP_ADDRESS, ID_COMPANY, USERNAME, URL, CREATED_DATETIME) VALUES ('". $param['DATABASE_NAME'] . "', '" . $param['TOTAL_QUERIES'] . "' ,  CONVERT(VARBINARY(MAX)," . $this->mssql_escape($param['QUERIES']) . ",1) , '" . $param['EVENT'] . "' , '".$param['MODE_SOURCE'] . "' , '" . $param['IP_ADDRESS'] . "', '". $param['ID_COMPANY'] . "', '" . $param['USERNAME'] . "' , '" . $param['URL'] . "', '" . $param['CREATED_DATETIME'] . "')  ; " ;  
        $this->CI->db->query($query); 
    }

    
    function checkaddslashes($str){       
        if(strpos(str_replace("\'",""," $str"),"'")!=false)
            return addslashes($str);
        else
            return $str;
    }
    function mssql_escape($data) {
        if(is_numeric($data))
            return $data;
        $unpacked = unpack('H*hex', $data);
        return '0x' . $unpacked['hex'];
    }

    protected function _go_log_me() {
        $dbs = array();
        $outToDB = array(); 
        // Let's determine which databases are currently connected to
		foreach (get_object_vars($this->CI) as $name => $cobject)
		{
			if (is_object($cobject))
			{
				if ($cobject instanceof CI_DB)
				{
					$dbs[get_class($this->CI).':$'.$name] = $cobject;
				}
				elseif ($cobject instanceof CI_Model)
				{
					foreach (get_object_vars($cobject) as $mname => $mobject)
					{
						if ($mobject instanceof CI_DB)
						{
							$dbs[get_class($cobject).':$'.$mname] = $mobject;
						}
					}
				}
			}
		}

        // Load the text helper so we can highlight the SQL
		$this->CI->load->helper('text');
        $output  = "\n\n";
		$count = 0;
        
        
		foreach ($dbs as $name => $db)
		{
            $total_time = number_format(array_sum($db->query_times), 4).' '.$this->CI->lang->line('profiler_seconds');

            $outToDB["go_write"] = 0; 

            $outToDB = array (
                "DATABASE_NAME" => $db->database , 
                "TOTAL_QUERIES" => count($db->queries)
            ) ;
            $output .= "\n\n DATABASE NAME : ";
            $output .= $db->database; 
            
            $output .= "\n\n Counted Queries : ";
            $output .= count($db->queries) . " Total Time to execute :" . $total_time  ; 
            
            if (count($db->queries) === 0)
            {
                $output .= "\n";
                $output .= " No queries \n " ; 
                $outToDB ["QUERIES"] = "NO QUERIES" ;
            }
            else 
            {
                $myQueries = '';
                foreach ($db->queries as $key => $val)
				{
					$time = number_format($db->query_times[$key], 4);
					#$val = highlight_code($val);
                    
                    $output .= "\n Time to Execute : ";
                    $output .= $time;
                    $output .= "   SQLQueries: " .  $val  ." \n";
                    if (strpos($val, "SELECT")===false){
                        $myQueries .= $val . "; ";
                    }else $myQueries = $val ; 
                }
                #$outToDB["QUERIES"] =html_escape(htmlentities($myQueries, ENT_QUOTES));
                $outToDB["QUERIES"] =($myQueries); 
            }
            $output .= "\n";
			$count++;
        }
        return(($outToDB));
		#return json_encode($output);

    }

}