<?php
class Mreferensi_tujuan_pemasukan extends CI_Model {

    function read($param){
        $this->load->database();
        $this->db->select("
            A.ID,
            A.KODE_TUJUAN_PEMASUKAN,
            A.URAIAN_TUJUAN_PEMASUKAN
            ",false);
        $this->db->from("referensi_tujuan_pemasukan A");


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
        
        $this->db->order_by("A.KODE_TUJUAN_PEMASUKAN", "ASC");
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                    'TotalRows' => $count,
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
}