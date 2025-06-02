<?php
class Min_bc_inventory extends CI_Model {

    function read($param){
        $this->load->database();
        $this->db->select("
            A.ID_HEADER_ORI,
            A.NOMOR_AJU,
            FORMAT(A.TANGGAL_AJU,'yyyy-MM-dd') as TANGGAL_AJU,
            A.KODE_DOKUMEN_PABEAN,
            D.URAIAN_DOKUMEN,
            E.URAIAN_STATUS ,
            case 
                    when A.NAMA_PEMASOK is null then A.NAMA_PENGIRIM
                    ELSE A.NAMA_PEMASOK
            END as PEMASOK,
            B.TOTAL_PART,
            iSNULL(B.QTY_DOK,0) as QTY_DOK,
            ISNULL(C.QTY_RECEIPT,0) as QTY_RECEIPT
            
            ",false);
        $this->db->from("njc.tr_bc_header A");
        $this->db->join("(select A.ID_HEADER,COUNT(*) as TOTAL_PART,SUM(isnull(A.JUMLAH_SATUAN,0)) as QTY_DOK from njc.tr_bc_detail A GROUP BY A.ID_HEADER)  B","A.ID_HEADER_ORI = B.ID_HEADER","Left");
        $this->db->join("(select A.ID_HEADER,SUM(isnull(A.QTY_REAL,0)) as QTY_RECEIPT from njc.tr_inventory_detail A GROUP BY A.ID_HEADER)  C","A.ID_HEADER_ORI = C.ID_HEADER","Left");
        $this->db->join("njc.referensi_dokumen D","A.KODE_DOKUMEN_PABEAN = D.KODE_DOKUMEN","Left");
        $this->db->join("njc.referensi_status E","A.KODE_STATUS = E.KODE_STATUS AND A.KODE_DOKUMEN_PABEAN = E.KODE_DOKUMEN","Left");

        $this->db->where(
            "
            ISNULL(B.QTY_DOK,0)<>ISNULL(C.QTY_RECEIPT,0) AND
            A.KODE_DOKUMEN_PABEAN in ('23','40','261')
            "
        );
        $this->db->order_by(
            "A.TANGGAL_AJU DESC"
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