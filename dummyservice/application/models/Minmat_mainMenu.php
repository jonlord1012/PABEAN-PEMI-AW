<?php
class Minmat_mainMenu extends CI_Model {

    function read($param){
        switch ($param["module"]) {
            case "receipt_detail":
                return $this->receipt_detail($param);
                break;
            case "histori_receipt":
                return $this->histori_receipt($param);
                break;
            default:
              return false;
          }
    }
    function receipt_detail($param){
       
        $this->load->database();
        $this->db->select("
        A.TIPE,
        A.KODE_BARANG,
        A.URAIAN,
        SUM(ISNULL(A.QTY_REAL,0)) as QTY_STOCK
            ",false);
        $this->db->from("njc.tr_inventory_detail A");
        $this->db->group_by(
            "A.TIPE,
            A.KODE_BARANG,
            A.URAIAN"
        );

        if (array_key_exists('keywhere', $param)) {
            $keyval = json_decode($param['keywhere'],true);
            foreach ($keyval as $key =>$val ) {
                    $this->db->where($val['property'],$val['value']);
            }
        }
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                    $colname = array('SYSUPDATEDATE','SYSCREATEDATE');
                    if (in_array($val['property'], $colname)) {
                        $this->db->like( "TO_CHAR(". $val['property'] .", 'YYYY-MM-DD HH24:MI:SS')", $val['value']);
                    }else{
                        $this->db->like("UPPER(" . $val['property'] .")",strtoupper($val['value']), 'both');
                    }
            }        
        }
        $this->db->order_by("A.URAIAN", "ASC");
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
    function histori_receipt($param){
       
        $this->load->database();
        $this->db->select("
        A.KODE_RECEIVING,
        A.TANGGAL_RECEIVING,
        A.TIPE,
        A.URAIAN,
        D.URAIAN_DOKUMEN_PABEAN as DOKUMEN,
        B.NO_AJU,
        FORMAT(C.TANGGAL_AJU,'yyyy-MM-dd') as TANGGAL_AJU,
        C.TANGGAL_DAFTAR,
        A.SERI_BARANG,
        A.JUMLAH_SATUAN,
        A.QTY_REAL,
        CASE 
            WHEN C.NAMA_PEMASOK is null THEN C.NAMA_PENGIRIM
            ELSE C.NAMA_PEMASOK
        END as SUPPLIER
            ",false);
        $this->db->from("njc.tr_inventory_detail A");
        $this->db->join("njc.tr_receiving_hdr B","A.ID_HEADER = B.ID_HEADER AND A.KODE_RECEIVING = B.KODE_RECEIVING","left");
        $this->db->join("njc.tr_bc_header C ","A.ID_HEADER = C.ID_HEADER_ORI","left");
        $this->db->join("njc.referensi_dokumen_pabean D","C.KODE_DOKUMEN_PABEAN = D.KODE_DOKUMEN_PABEAN","left");
        $this->db->where(
            "
            A.URAIAN='".$param['uraian']."' AND
            A.TIPE='".$param['tipe']."'
            "
        );

        if (array_key_exists('keywhere', $param)) {
            $keyval = json_decode($param['keywhere'],true);
            foreach ($keyval as $key =>$val ) {
                    $this->db->where($val['property'],$val['value']);
            }
        }
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                    $colname = array('SYSUPDATEDATE','SYSCREATEDATE');
                    if (in_array($val['property'], $colname)) {
                        $this->db->like( "TO_CHAR(". $val['property'] .", 'YYYY-MM-DD HH24:MI:SS')", $val['value']);
                    }else{
                        $this->db->like("UPPER(" . $val['property'] .")",strtoupper($val['value']), 'both');
                    }
            }        
        }
        $this->db->order_by("A.URAIAN", "ASC");
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

}