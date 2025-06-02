<?php
class Minv_subassy_aw_out extends CI_Model {

    function read($param){
        switch ($param["method"]) {
            case "read_out":
                return $this->read_out($param);
                break;
            default:
              return false;
          }
    }
    function read_out($param){
        $this->load->database();
        $this->db->select("
        FORMAT(B.OUT_DATE,'yyyy-MM-dd') as OUT_DATE,
        B.APPROVE_USER,
        FORMAT(B.APPROVE_DATE,'yyyy-MM-dd') as APPROVE_DATE,
        A.OUT_NO,
        A.INVOICE_NO,
        A.PART_NO,
        A.MAPP_PARTNO,
        A.IS_FROM_AW_SEQNO,
        C.PART_NAME,
        A.OUT_QTY,
        A.SUMBER_DATA,
        A.OUT_INPUT,
        A.BC_TYPE,
        A.NOMOR_AJU,
        A.TANGGAL_AJU,
        A.NOMOR_DAFTAR,
        A.TANGGAL_DAFTAR,
        A.SUPPLIER_KODE_INTERNAL,
        A.SUPPLIER_NAME,
        A.CREATE_USER,
        FORMAT(A.CREATE_DATE,'yyyy-MM-dd') as CREATE_DATE
        
        ");
        $this->db->from("wh_inv_detail_out A");
        
        $this->db->join("wh_inv_header_out B","A.OUT_NO = B.OUT_NO","left");
        $this->db->join("mst_part C","A.MAPP_PARTNO = C.PART_NO","left");
        $this->db->where("
        A.IS_FROM_AW='YES'
        ");
        $arr_field = array(
            "A.NOMOR_AJU"=>"NOMOR_AJU",
            "A.TANGGAL_AJU"=>"TANGGAL_AJU",
            "A.NOMOR_DAFTAR"=>"NOMOR_DAFTAR",
            "A.OUT_NO"=>"OUT_NO",
            "FORMAT(B.OUT_DATE,'yyyy-MM-dd')"=>"OUT_DATE",
            "A.INVOICE_NO"=>"INVOICE_NO",
            "A.PART_NO"=>"PART_NO",
            "A.MAPP_PARTNO"=>"MAPP_PARTNO",
            "A.OUT_QTY"=>"OUT_QTY",
            "C.PART_NAME"=>"PART_NAME",
            "A.IS_FROM_AW_SEQNO"=>"IS_FROM_AW_SEQNO"
            
        );
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                    $this->db->like(array_search($val['property'],$arr_field),$val['value']);
            }
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->order_by( $val["property"], $val['direction']);
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