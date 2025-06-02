<?php
class Msync_bc_check extends CI_Model {
    function read($param){
        $this->load->database('CEISA');
        $this->db->select("
        A.KODE_STATUS as KODE_AFTER,
        (select URAIAN_STATUS FROM referensi_status WHERE KODE_STATUS=A.KODE_STATUS AND KODE_DOKUMEN=B.KODE_DOKUMEN_PABEAN LIMIT 1) as URAIAN_AFTER,
        B.KODE_STATUS as KODE_BEFORE,
        (select URAIAN_STATUS FROM referensi_status WHERE KODE_STATUS=B.KODE_STATUS AND KODE_DOKUMEN=B.KODE_DOKUMEN_PABEAN LIMIT 1) as URAIAN_BEFORE,
        A.WAKTU_STATUS,
        A.ID_HEADER,
        B.KODE_DOKUMEN_PABEAN,
        B.NOMOR_AJU,
        DATE_FORMAT(B.TANGGAL_AJU,'%Y-%m-%d') as TANGGAL_AJU,
        B.NOMOR_DAFTAR,
        DATE_FORMAT(B.TANGGAL_DAFTAR,'%Y-%m-%d') as TANGGAL_DAFTAR,
        B.NAMA_PEMASOK,
        B.NAMA_PENGIRIM
        ");
        $this->db->from("tpb_detil_status A");
        $this->db->join("tpb_header B","A.ID_HEADER = B.ID","left");
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->like($val["property"],$val['value'], 'both');
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
        
        $this->db->order_by( "A.WAKTU_STATUS", "DESC");

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