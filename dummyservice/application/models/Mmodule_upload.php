<?php
class Mmodule_upload extends CI_Model {

    function upload($param){
        switch ($param["module"]) {
            case "file_coo":
                return $this->module_send($param,"njc.SP_UPLOAD_COO");
                break;
            case "file_outinventory":
                return $this->module_send($param,"njc.SP_UPLOAD_INVENTORY_OUT");
                break;
                
            default:
              return false;
          }
    }
    function module_send($param,$spname){
        $this->load->database();
        $vform = $param["data"];
        $SQL_CALLSP = "EXEC ". $spname ."
        @VFILENAME=?,
        @VDATA=?
        ";
        $data = array(
            '@VFILENAME' => $param["filename"], 
            '@VDATA' => json_encode($param["data"])
        );

        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->row_array();
        
        return json_encode($row);
    }
    
    
    
}