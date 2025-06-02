<?php
class Mbcout_41 extends CI_Model {

    function read($param){
        $this->load->database();
        $this->db->select("
        A.KODE_DOKUMEN_PABEAN,
        A.NAMA_PEMASOK,
        A.NOMOR_AJU,
        B.NOMORDOKUMEN as NOMOR_DOKUMEN,
        MAX(B.NOMORDOKUMEN) as NOMOR_BL,
        FORMAT(MAX(B.TANGGALDOKUMEN),'yyyy-MM-dd') as TANGGAL_DOKUMEN,
        FORMAT(A.TANGGAL_AJU,'yyyy-MM-dd') as TANGGAL_AJU,
        A.NOMOR_DAFTAR,
        FORMAT(A.TANGGAL_DAFTAR,'yyyy-MM-dd') as TANGGAL_DAFTAR,
        A.MODE_SOURCE,
        A.ID_COMPANY,
        A.KODE_STATUS,
        MAX(C.URAIAN_DOKUMEN) as URAIAN_STATUS,
        A.CIF,
        A.CIF_RUPIAH,
        A.HARGA_INVOICE,
        A.FOB
        ",false);
        $this->db->from("tr_bc_header A");
        $this->db->join("PAB_DOKUMEN B","A.ID_HEADER_ORI = B.EDS_ID_HEADER AND B.KODEDOKUMEN='380'","left");
        $this->db->join("PAB_DOKUMEN D","A.ID_HEADER_ORI = D.EDS_ID_HEADER AND D.KODEDOKUMEN='705'","left");
        $this->db->join("referensi_dokumen C","A.KODE_STATUS = C.TIPE_DOKUMEN AND A.KODE_DOKUMEN_PABEAN=C.KODE_DOKUMEN","left");
        
        $this->db->group_by(
            "
            A.KODE_DOKUMEN_PABEAN,A.NAMA_PEMASOK,A.NOMOR_AJU,B.NOMORDOKUMEN,B.TANGGALDOKUMEN,A.TANGGAL_AJU, A.NOMOR_DAFTAR, A.TANGGAL_DAFTAR, A.MODE_SOURCE, A.ID_COMPANY, A.KODE_STATUS, A.CIF, A.CIF_RUPIAH,A.HARGA_INVOICE,A.FOB
            "
        );
        $this->db->where(" A.KODE_DOKUMEN_PABEAN='41' " );
        
        if ($param['ID_COMPANY']=='ALL') {
            $this->db->where( "A.ID_COMPANY IS NOT NULL ");
        }else if (!$param['ID_COMPANY']=='') {
            $this->db->where(" A.ID_COMPANY = '" . $param['ID_COMPANY'] . "'
            ");
        }
        switch ($param["cbo_filterkey"]) {
            case "1":
                $this->db->where("A.NOMOR_AJU like '%DRAFT%'");
                break;
            case "2":
                $this->db->where("A.KODE_STATUS<>'80'");
                break;
            default:
                break;
          }
        if (array_key_exists('keywhere', $param)) {
            $keyval = json_decode($param['keywhere'],true);
            foreach ($keyval as $key =>$val ) {
                    $this->db->where($val['property'],$val['value']);
            }
        }
        $arr_field = array(
            
            'A.KODE_DOKUMEN_PABEAN'=>'KODE_DOKUMEN_PABEAN',
            'A.NAMA_PEMASOK'=>'NAMA_PEMASOK',
            'A.NOMOR_AJU'=>'NOMOR_AJU',
            'B.NOMORDOKUMEN'=>'NOMOR_DOKUMEN',
            'B.TANGGALDOKUMEN'=>'TANGGAL_DOKUMEN',
            'A.TANGGAL_AJU'=>'TANGGAL_AJU',
            'A.NOMOR_DAFTAR'=>'NOMOR_DAFTAR',
            'A.TANGGAL_DAFTAR'=>'TANGGAL_DAFTAR',
            'A.MODE_SOURCE'=>'MODE_SOURCE',
            'A.ID_COMPANY'=>'ID_COMPANY',
            'A.KODE_STATUS'=>'KODE_STATUS',
            'A.CIF'=>'CIF',
            'A.CIF_RUPIAH'=>'CIF_RUPIAH',
            'A.HARGA_INVOICE'=>'HARGA_INVOICE',
            'A.FOB'=>'FOB',
            'C.URAIAN_STATUS'=>'URAIAN_STATUS',
            'NOMOR_BL'=>'NOMOR_BL'
        );
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                    $this->db->like(array_search($val['property'],$arr_field),$val['value']);
            }
        }

        $tempdb = clone $this->db;
        $count= $tempdb->count_all_results(); 
        
        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }
        
        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                    $this->db->order_by($val['property'], $val['direction']);
            }
        }else {
            $this->db->order_by("A.NOMOR_AJU","DESC");
            $this->db->order_by("A.TANGGAL_AJU","DESC");
        }
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                    'TotalRows' => $count,
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
    function proses_cancel_dokumen($param){
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_BC_IN_CANCEL_DOKUMEN
        @VIDCOMPANY=?,
        @VUSERNAME=?,
        @VNOMOR_AJU=?
        ";
        $data = array(
            '@VIDCOMPANY' => $param['ID_COMPANY'], 
            '@VUSERNAME' => $param['VUSERNAME'], 
            '@VNOMOR_AJU' => $param['NOMOR_AJU']
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->row_array();

        
        return json_encode($row);
    }
    function proses_edit_dokumen($param){
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_BC_IN_EDIT_DOKUMEN
        @VIDCOMPANY=?,
        @VUSERNAME=?,
        @VNOMOR_AJU=?
        ";
        $data = array(
            '@VIDCOMPANY' => $param['ID_COMPANY'], 
            '@VUSERNAME' => $param['VUSERNAME'], 
            '@VNOMOR_AJU' => $param['NOMOR_AJU']
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->row_array();

        
        return json_encode($row);
    }
    function proses_edit_item_dokumen ($param){
        $this->load->database();
        $this->db->select("
                A.*
            ",false);
        $this->db->from("tr_bc_detail A");
        $this->db->where("
        A.ID_HEADER = (select TOP 1 ID_HEADER_ORI from tr_bc_header where NOMOR_AJU='" . $param['NOMOR_AJU'] . "') AND
        A.SERI_BARANG = '". $param['SERI_BARANG'] ."'
        ");
        $query = $this->db->get();
        $rows = $query->row_array();
        $data = array(
                    'success' => 'true',
                        'data' => $rows
                     );
        return json_encode($data );
    }
}