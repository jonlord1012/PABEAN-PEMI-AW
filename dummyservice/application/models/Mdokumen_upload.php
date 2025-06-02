<?php
class Mdokumen_upload extends CI_Model {

    function read($param){
        switch ($param["dokumen"]) {
            case "coo":
                return $this->read_coo($param);
                break;
            default:
              return false;
          }
        
    }
    function read_coo($param){

        $this->load->database();
        $this->db->select("
        A.VENDOR,
        A.INVOICE_NO,
        COUNT(*) as INVOICE_QTY,
        A.INVOICE_DATE
            ",false);
        $this->db->from("upload_coo_detail A");
        $this->db->group_by("A.VENDOR,A.INVOICE_NO,A.INVOICE_DATE");
        $this->db->where("A.ID_HEADER_ORI is null");
        $this->db->where("A.ID_COMPANY",$param['ID_COMPANY']);

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