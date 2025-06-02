<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Msto_scrap extends CI_Model {

    function read($param){
        switch ($param["method"]) {
            case "read_data":
                return $this->read_data($param);
                break;
            case "read_detail":
                return $this->read_detail($param);
                break;
            default:
            return false;
        }
    }
	function read_data($param){
        $this->load->database();
        $this->db->select("*");
        $this->db->from("mst_part_plb");
        // $this->db->where("A.KODE_DOKUMEN_PABEAN","23");
        
        if (array_key_exists('keywhere', $param)) {
            $keyval = json_decode($param['keywhere'],true);
            foreach ($keyval as $key =>$val ) {
                    $this->db->where($val['property'],$val['value']);
            }
        }
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                    $this->db->like($val['property'], $val['value']);
            }
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                    $this->db->order_by($val['property'], $val['direction']);
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
    function read_detail($param)
    {
        $vdata = $param['vdate'];
        return json_encode($vdata);
    }
}

/* End of file Msto_scrap.php */
/* Location: ./application/models/Msto_scrap.php */ ?>