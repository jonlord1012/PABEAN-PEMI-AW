<?php
class Mreferensi_tujuan_pengiriman40 extends CI_Model {

    function read($param){
        $this->load->database();
        $this->db->select("
            A.ID,
            A.KODE_DOKUMEN,
            A.KODE_TUJUAN_PENGIRIMAN,
            A.URAIAN_TUJUAN_PENGIRIMAN
            ",false);
        $this->db->from("referensi_tujuan_pengiriman A");
        $this->db->where("A.KODE_DOKUMEN = '40'");

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
        
        $this->db->order_by("A.KODE_TUJUAN_PENGIRIMAN", "ASC");
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                    'TotalRows' => $count,
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
}