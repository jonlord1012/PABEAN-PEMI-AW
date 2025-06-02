<?php
class Mbcout_27 extends CI_Model
{
    function read($param)
    {
        switch ($param["method"]) {
            case "read_to_grid":
                return $this->read_to_grid($param);
                break;
            case "proses_cancel_dokumen":
                return $this->proses_cancel_dokumen($param);
                break;
            case "read_dokumen_barang":
                return $this->read_dokumen_barang($param);
                break;
            case "read_dokumen_barang_tarif":
                return $this->read_dokumen_barang_tarif($param);
                break;
                /* case "proses_edit_dokumen":
                return $this->proses_edit_dokumen($param);
                break;*/
            default:
                return false;
        }
    }
    function read_to_grid($param)
    {
        $this->load->database();
        $this->db->select(" A.* ");
        $this->db->distinct();
        $this->db->from("VW_GRID_OUT A");
        $this->db->where("A.BC_TYPE = '27' ");

        $arr_field = array(

            'A.BC_TYPE' => 'KODE_DOKUMEN_PABEAN',
            'A.NAMA_PEMASOK' => 'NAMA_PEMASOK',
            'A.NOMOR_AJU' => 'NOMOR_AJU',
            'A.TANGGAL_AJU' => 'TANGGAL_AJU',
            'A.NOMOR_DAFTAR' => 'NOMOR_DAFTAR',
            'A.TANGGAL_DAFTAR' => 'TANGGAL_DAFTAR',
            'A.ID_COMPANY' => 'ID_COMPANY',
            'A.KODE_STATUS' => 'KODE_STATUS',

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
        $SQL_CALLSP = "EXEC SP_BC_OUT_EDIT
        @VIDCOMPANY=?,
        @VUSERNAME =?,
        @VMODULE =?,
        @VNOMORAJU =?,
        @VBCTYPE =?,
        @VHEADER =?,
        @VENTITAS =?,
        @VDOKUMEN =?,
        @VPENGANGKUT =?,
        @VKEMASAN =?,
        @VKONTAINER=?,
        @VBARANG =?,
        @VBARANGTARIF =?,
        @VPUNGUTAN =?         
        ";

        $data = array(
            '@VIDCOMPANY' => $param['ID_COMPANY'],
            '@VUSERNAME' => $param['VUSERNAME'],
            '@VMODULE' => $param['module'],
            '@VNOMORAJU' => $param['VNOMORAJU'],
            '@VBCTYPE' => $param['VBCTYPE'],
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
        $row = $result->result_array();


        return json_encode($row);
    }

    function read_dokumen_barang_PAB($param)
    {
        $this->load->database();
        $this->db->distinct();
        $this->db->select(" * ");
        $this->db->from("VW_TRN_PAB_DETAIL");
        $this->db->where('INTERNAL_NOMOR_AJU', $param['NOMOR_AJU']);

        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'], true);
            foreach ($keyval as $key => $val) {
                $this->db->like($val["property"], $val['value'], 'both');
            }
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'], true);
            foreach ($keyval as $key => $val) {
                $this->db->order_by($val["property"], $val['direction']);
            }
        }

        $tempdb = clone $this->db;
        $count = $tempdb->count_all_results();

        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'], $param['start']);
        }

        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
            'TotalRows' => $count,
            'Rows' => $rows
        );
        return json_encode($data);
    }

    function read_dokumen_barang_tarif_PAB($param)
    {
        $this->load->database();
        $this->db->distinct();
        $this->db->select(" * ");
        $this->db->from("PAB_BAHANBAKUTARIF");
        $this->db->where('INTERNAL_NOMOR_AJU', $param['NOMOR_AJU']);
        $this->db->where('SERI_BARANG', $param['SERI_BARANG']);

        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'], true);
            foreach ($keyval as $key => $val) {
                $this->db->like($val["property"], $val['value'], 'both');
            }
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'], true);
            foreach ($keyval as $key => $val) {
                $this->db->order_by($val["property"], $val['direction']);
            }
        }

        $tempdb = clone $this->db;
        $count = $tempdb->count_all_results();

        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'], $param['start']);
        }

        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
            'TotalRows' => $count,
            'Rows' => $rows,
            'DEBUG' => $this->db->last_query(),

        );

        return json_encode($data);
    }
}