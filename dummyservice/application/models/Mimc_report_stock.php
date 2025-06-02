<?php 
class Mimc_report_stock extends CI_Model {

    function read($param){ 
        switch ($param["method"]) {
            case "read_group_part":
                return $this->read_group_part($param);
                break;
            case "read_data":
                return $this->read_data($param);
                break;
            case "read_data_summary":
                return $this->read_data_summary($param);
                break;
            default:
            return false;

        }
    }
    
    function read_group_part($param){
        $this->load->database();
        $this->db->distinct();
        $this->db->select("PART_GROUP");
        $this->db->from("mst_part");
        $query = $this->db->get();
        $rows = $query->result_array();
        return json_encode($rows);
    }
    
    function read_data($param){
        $this->load->database();
		$this->db->select (
		"
			*
		") ; 
		
		$this->db->from("VW_RAWMAT_MUTASI_STOCK") ; 
		$this->db->where(" VW_RAWMAT_MUTASI_STOCK.BULAN BETWEEN  '".$param['VFROMDATE']."'  AND '".$param['VTODATE']."'  ") ; 
        $this->db->where(' VW_RAWMAT_MUTASI_STOCK.PART_GROUP = ', 'MATERIAL');
        /*
        if($param['VPARTGROUP']<>''){
            $this->db->where(' VW_RAWMAT_MUTASI_STOCK.PART_GROUP = ', $param['VPARTGROUP']);
        }
        */
		$extraParam = array() ; 
		/* GET DATE RANGE PARAMETER */
        /*
		if(array_key_exists('date_start', $param)) {
			array_push($extraParam, array("property" => "TANGGAL_AJU >=", "value" => $param['date_start']) , array("property"=> "TANGGAL_AJU <=", "value" => $param['date_end'])); 
		}
        */
		
		/* GET PART_GROUP PARAMETER */
		/*
        if(array_key_exists('VPARTGROUP', $param)) {
            if($param['VPARTGROUP']<>'') {
                array_push($extraParam, array("property" => "PART_GROUP", "value" => $param['VPARTGROUP'])) ;
            }
		}
		*/

		/* GET COMPANY PARAMETER */
		if(array_key_exists('id_company', $param)) {
			array_push($extraParam, array("property" => "ID_COMPANY", "value" => $param['id_company'])) ; 
		}
		
		
		
        if (array_key_exists('filter', $param)) {
            $param['filter'] += $extraParam ; 
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->like($val["property"],$val['value'], 'both');
            }        
        }
        
        $tempdb = clone $this->db;
        $count= $tempdb->count_all_results(); 
        
        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->order_by( $val["property"], $val['direction']);
            }
        }
        
        
        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }

        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                    'TotalRows' => $count,
                        'Rows' => $rows
                     );
        #print $this->db->last_query();
        
        return json_encode($data );
    }
    
    function read_data_summary($param){
        $this->load->database();
		$this->db->select (
		"
			*
		") ; 
		
		$this->db->from("VW_RAWMAT_MUTASI_STOCK_MONTHLY_SUMMARY") ; 
        $this->db->join("
                         (   SELECT 
                            A.MAPP_PARTNO,
                            (isnull(A.IN_QTY,0) - isnull(B.OUT_QTY ,0)) as AVAILABLE_STOCK
                        FROM 
                            (
                                SELECT 
                                A.MAPP_PARTNO,SUM(A.RECEIPT_QTY) as IN_QTY
                                FROM wh_inv_detail A
                                left join wh_inv_header B
                                on A.RECEIPT_NO = B.RECEIPT_NO
                                where
                                A.IS_FROM_AW='NO'
                                AND FORMAT(B.RECEIPT_DATE,'yyyy-MM') BETWEEN '".$param['VFROMDATE']."'  AND '".$param['VTODATE']."'  
                                GROUP BY
                                A.MAPP_PARTNO 
                            ) A
                        LEFT JOIN 
                            (
                                SELECT 
                                A.MAPP_PARTNO,SUM(A.OUT_QTY) as OUT_QTY
                                FROM wh_inv_detail_out A
                                where
                                A.IS_FROM_AW='NO'
                                AND FORMAT(A.OUT_DATE,'yyyy-MM') BETWEEN '".$param['VFROMDATE']."'  AND '".$param['VTODATE']."'  
                                GROUP BY
                                A.MAPP_PARTNO
                            ) B
                        ON
                            A.MAPP_PARTNO = B.MAPP_PARTNO

                    ) A ", 'a.MAPP_PARTNO = VW_RAWMAT_MUTASI_STOCK_MONTHLY_SUMMARY.PART_NO', 'left');
        
		$this->db->where(" VW_RAWMAT_MUTASI_STOCK_MONTHLY_SUMMARY.TAHUN_BULAN BETWEEN '".$param['VFROMDATE']."'  AND '".$param['VTODATE']."'  ") ;  
        $this->db->where(' VW_RAWMAT_MUTASI_STOCK_MONTHLY_SUMMARY.PART_GROUP = ', 'MATERIAL');
        /*
        if($param['VPARTGROUP']<>''){
            $this->db->where(' VW_RAWMAT_MUTASI_STOCK.PART_GROUP = ', $param['VPARTGROUP']);
        }
        */
		$extraParam = array() ; 
		/* GET DATE RANGE PARAMETER */
        /*
		if(array_key_exists('date_start', $param)) {
			array_push($extraParam, array("property" => "TANGGAL_AJU >=", "value" => $param['date_start']) , array("property"=> "TANGGAL_AJU <=", "value" => $param['date_end'])); 
		}
        */
		
		/* GET PART_GROUP PARAMETER */
		/*
        if(array_key_exists('VPARTGROUP', $param)) {
            if($param['VPARTGROUP']<>'') {
                array_push($extraParam, array("property" => "PART_GROUP", "value" => $param['VPARTGROUP'])) ;
            }
		}
		*/

		/* GET COMPANY PARAMETER */
		if(array_key_exists('id_company', $param)) {
			array_push($extraParam, array("property" => "ID_COMPANY", "value" => $param['id_company'])) ; 
		}
		
		
		
        if (array_key_exists('filter', $param)) {
            $param['filter'] += $extraParam ; 
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->like($val["property"],$val['value'], 'both');
            }        
        }
        
        $tempdb = clone $this->db;
        $count= $tempdb->count_all_results(); 
        
        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->order_by( $val["property"], $val['direction']);
            }
        }
        
        
        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }

        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                    'TotalRows' => $count,
                        'Rows' => $rows
                     );
        #print $this->db->last_query();
        
        return json_encode($data );
    }
}