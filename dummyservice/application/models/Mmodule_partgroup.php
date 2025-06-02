<?php
class Mmodule_partgroup extends CI_Model {

    function read($param){

        $this->load->database();
        $this->db->select("
    
        A.MODE_CODE
    
            ",false);
        $this->db->from("a_matrix A");
        $this->db->where("A.MODE_CATEGORY = 'GROUP PART'");
        $this->db->where("A.ID_COMPANY",$param['ID_COMPANY']);
        $this->db->group_by("A.MODE_CODE");
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                    $this->db->like($val["property"],$val['value'], 'both');
            }        
            
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                    $this->db->order_by($val["property"], $val['direction']);
            }
        }
        
        $tempdb = clone $this->db;
        $count= $tempdb->count_all_results(); 
        
        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }

        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                    'TotalRows' => $count,
                        'Rows' => $rows
                     );
        return json_encode($data );
    }


}