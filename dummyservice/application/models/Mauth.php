<?php

class Mauth extends CI_Model {
    
    function main($param){
    
        $this->load->database();
        $vform = $param["data"];
        $SQL_CALLSP = "EXEC SP_USERLOGIN_PLB
            @VUSERNAME=?,
            @VUSERPASSWORD=?
        ";
        $data = array(
            '@VUSERNAME'=>$vform["username"],
            '@VUSERPASSWORD'=>$vform["password"]
        );

        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->row_array();
        if($row['success']==='true'){

            $vprofile = json_decode($row['profile'],true);
            
            $this->load->model('Mconfigkey');
            $gtoken = $this->Mconfigkey->getToken($vprofile[0]);

            $row['token']=$gtoken;
        }

        return json_encode($row);
    }
	
	function getPortalUser() {
		$this->load->database() ; 
		 
		$row =$this->db->query("SELECT top 1 * FROM a_user_ceisa WHERE IS_ACTIVE=1")->row_array(); 
		#print_r($row); 
		return $row ; 
	}
	
}