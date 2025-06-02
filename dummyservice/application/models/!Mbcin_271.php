<?php
class Mbcin_271 extends CI_Model
{
    function read($param)
    {
        switch ($param["method"]) {
            case "read_data":
                return $this->read_data($param);
                break;
            case "read_original":
                return $this->read_original($param);
                break;
            case "read_mappingdata_supplier":
                return $this->read_mappingdata_supplier($param);
                break;
            case "proses_edit":
                return $this->proses_edit($param);
                break;
            case "read_receivingdata_header":
                return $this->read_receivingdata_header($param);
                break;
        }
    }
    function read_data($param)
    {
        $this->load->database();
        $this->db->distinct();
        $this->db->select("
              A.KODEDOKUMEN AS BC_TYPE
            , 'PLB' AS CPY 
            , B.NOMORDOKUMEN AS NOMOR_DOKUMEN 
            , B.TANGGALDOKUMEN AS TANGGAL_DOKUMEN
            , A.NOMORAJU AS NOMOR_AJU
            , A.TANGGALPERNYATAAN AS TANGGAL_AJU 
            , C.NAMAENTITAS AS NAMA_PEMASOK 
            , A.NOMORDAFTAR AS NOMOR_DAFTAR
            , A.TANGGALDAFTAR AS TANGGAL_DAFTAR
            , D.JUMLAHKEMASAN AS TOTAL_KEMASAN 
        ");
        $this->db->from("DBIT_HEADER A");
        $this->db->join('DBIT_DOKUMEN B ', 'B.NOMORAJU = A.NOMORAJU', 'left');
        $this->db->join('DBIT_ENTITAS C ', 'C.NOMORAJU = A.NOMORAJU', 'left');
        $this->db->join('DBIT_KEMASAN D ', 'D.NOMORAJU = A.NOMORAJU', 'left');

        $this->db->where(
            "
            A.KODEDOKUMEN='27' AND 
            B.KODEDOKUMEN ='380' AND 
            C.SERI = 1  
            
            "

        );
        if (array_key_exists('keywhere', $param)) {
            $keyval = json_decode($param['keywhere'], true);
            foreach ($keyval as $key => $val) {
                $this->db->where($val['property'], $val['value']);
            }
        }
        $arr_field = array(

            'A.KODEDOKUMEN' => 'BC_TYPE',
            'C.NAMAENTITAS' => 'NAMA_PEMASOK',
            'A.NOMORAJU' => 'NOMOR_AJU',
            'B.NOMORDOKUMEN' => 'NOMOR_DOKUMEN',
            'B.TANGGALDOKUMEN' => 'TANGGAL_DOKUMEN',
            'A.TANGGALPERNYATAAN' => 'TANGGAL_AJU',
            'A.NOMORDAFTAR' => 'NOMOR_DAFTAR',
            'A.TANGGALDAFTAR' => 'TANGGAL_DAFTAR',
        );
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'], true);
            foreach ($keyval as $key => $val) {
                $this->db->like(array_search($val['property'], $arr_field), $val['value']);
            }
        }

        $tempdb = clone $this->db;
        $count = $tempdb->count_all_results();

        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'], $param['start']);
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'], true);
            foreach ($keyval as $key => $val) {
                $this->db->order_by($val['property'], $val['direction']);
            }
        }
        $this->db->order_by("A.NOMORAJU", "DESC");
        $this->db->order_by("A.TANGGALPERNYATAAN", "DESC");
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
            'TotalRows' => $count,
            'Rows' => $rows
        );
        return json_encode($data);
    }


    function read1($param)
    {
        $this->load->database();
        $this->db->select("
        A.KODEDOKUMEN
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
        MAX(C.URAIAN_DOKUMEN) as URAIAN_DOKUMEN,
        A.CIF,
        A.CIF_RUPIAH,
        A.HARGA_INVOICE,
        A.FOB
        ", false);
        $this->db->from("DBIT_HEADER A");
        $this->db->join("DBIT_HEADER B", "A.ID_HEADER_ORI = B.EDS_ID_HEADER AND B.KODEDOKUMEN='380'", "left");
        $this->db->join("DBIT_BARANG D", "A.ID_HEADER_ORI = D.EDS_ID_HEADER AND D.KODEDOKUMEN='705'", "left");
        $this->db->join("referensi_dokumen C", "A.KODE_STATUS = C.TIPE_DOKUMEN AND A.KODE_DOKUMEN_PABEAN=C.KODE_DOKUMEN", "left");

        $this->db->group_by(
            "
            A.KODE_DOKUMEN_PABEAN,A.NAMA_PEMASOK,A.NOMOR_AJU,B.NOMORDOKUMEN,B.TANGGALDOKUMEN,A.TANGGAL_AJU,A.NOMOR_DAFTAR,A.TANGGAL_DAFTAR,A.MODE_SOURCE,A.ID_COMPANY,A.KODE_STATUS,A.CIF,A.CIF_RUPIAH,A.HARGA_INVOICE,A.FOB
            "
        );
        $this->db->where(
            "
            A.KODE_DOKUMEN_PABEAN='271' AND 
            A.ID_COMPANY = '" . $param['ID_COMPANY'] . "'
            "
        );
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
            $keyval = json_decode($param['keywhere'], true);
            foreach ($keyval as $key => $val) {
                $this->db->where($val['property'], $val['value']);
            }
        }
        $arr_field = array(

            'A.KODE_DOKUMEN_PABEAN' => 'KODE_DOKUMEN_PABEAN',
            'A.NAMA_PEMASOK' => 'NAMA_PEMASOK',
            'A.NOMOR_AJU' => 'NOMOR_AJU',
            'B.NOMORDOKUMEN' => 'NOMOR_DOKUMEN',
            'B.TANGGALDOKUMEN' => 'TANGGAL_DOKUMEN',
            'A.TANGGAL_AJU' => 'TANGGAL_AJU',
            'A.NOMOR_DAFTAR' => 'NOMOR_DAFTAR',
            'A.TANGGAL_DAFTAR' => 'TANGGAL_DAFTAR',
            'A.MODE_SOURCE' => 'MODE_SOURCE',
            'A.ID_COMPANY' => 'ID_COMPANY',
            'A.KODE_STATUS' => 'KODE_STATUS',
            'A.CIF' => 'CIF',
            'A.CIF_RUPIAH' => 'CIF_RUPIAH',
            'A.HARGA_INVOICE' => 'HARGA_INVOICE',
            'A.FOB' => 'FOB',
            'C.URAIAN_DOKUMEN' => 'URAIAN_DOKUMEN',
            'NOMOR_BL' => 'NOMOR_BL'
        );
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'], true);
            foreach ($keyval as $key => $val) {
                $this->db->like(array_search($val['property'], $arr_field), $val['value']);
            }
        }

        $tempdb = clone $this->db;
        $count = $tempdb->count_all_results();

        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'], $param['start']);
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'], true);
            foreach ($keyval as $key => $val) {
                $this->db->order_by($val['property'], $val['direction']);
            }
        }
        $this->db->order_by("A.NOMOR_AJU", "DESC");
        $this->db->order_by("A.TANGGAL_AJU", "DESC");
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
            'TotalRows' => $count,
            'Rows' => $rows
        );
        return json_encode($data);
    }
    function proses_cancel_dokumen($param)
    {
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
    function proses_edit_dokumen($param)
    {
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_BC_IN_EDIT_DOKUMEN_PLB
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
    function proses_edit($param)
    {
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_BC_IN_EDIT_DOKUMEN_PLB
        @VIDCOMPANY=?,
        @VUSERNAME=?,
        @VMODULE=?,
        @VNOMORAJU=?,
        @VHEADER=?,
        @VENTITAS=?,
        @VDOKUMEN=?,
        @VPENGANGKUT=?,
        @VKEMASAN=?,
        @VKONTAINER=?,
        @VBARANG=?,
        @VBARANGTARIF=?,
        @VPUNGUTAN=?
        ";
        $data = array(
            '@VIDCOMPANY' => $param['ID_COMPANY'],
            '@VUSERNAME' => $param['VUSERNAME'],
            '@VMODULE' => $param['module'],
            '@VNOMORAJU' => $param['VNOMORAJU'],
            '@VHEADER' => $param['VHEADER'],
            '@VENTITAS' => $param['VENTITAS'],
            '@VDOKUMEN' => $param['VDOKUMEN'],
            '@VPENGANGKUT' => $param['VPENGANGKUT'],
            '@VKEMASAN' => $param['VKEMASAN'],
            '@VKONTAINER' => $param['VKONTAINER'],
            '@VBARANG' => $param['VBARANG'],
            '@VBARANGTARIF' => $param['VBARANGTARIF'],
            '@VPUNGUTAN' => $param['VPUNGUTAN']
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        print $this->db->last_query();
        $rows = $result->result_array();

        return json_encode($rows);
    }
    function proses_edit_item_dokumen($param)
    {
        $this->load->database();
        $this->db->select("
                A.*
            ", false);
        $this->db->from("tr_bc_detail A");
        $this->db->where("
        A.ID_HEADER = (select TOP 1 ID_HEADER_ORI from tr_bc_header where NOMOR_AJU='" . $param['NOMOR_AJU'] . "') AND
        A.SERI_BARANG = '" . $param['SERI_BARANG'] . "'
        ");
        $query = $this->db->get();
        $rows = $query->row_array();
        $data = array(
            'success' => 'true',
            'data' => $rows
        );
        return json_encode($data);
    }
}