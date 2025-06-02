<?php
class Minv_subassy_aw_control extends CI_Model {

    function read($param){
        switch ($param["method"]) {
            case "read_control":
                return $this->read_control($param);
                break;
            
            default:
              return false;
          }
    }
    function read_control($param){
        $this->load->database();
        $this->db->select("
            MODE_CATEGORY,MODE_CODE,MODE_NAME,VAL1 as MODE_CONTROL
        ");
        $this->db->from("a_matrix");
        
        $this->db->where("
        MODE_CATEGORY='inv_subassy_aw_control'
        ");

        $this->db->order_by("MODE_SHORT");
        
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
    
    
}