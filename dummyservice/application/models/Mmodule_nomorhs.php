<?php
class Mmodule_nomorhs extends CI_Model {

    function read($param){

        $this->load->database();
        $this->db->select("
        A.NOMOR_HS,
        A.TARIF_BM,
        A.TARIF_CUKAI,
        A.TARIF_PPH,
        A.TARIF_PPN,
        A.TARIF_PPNBM
            ",false);
        $this->db->from("mst_part_hs A");
        $this->db->where("A.ID_COMPANY",$param['ID_COMPANY']);
        //$this->db->group_by("A.CARLINE");
        //$this->db->group_by("A.CARLINE_NAME");
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