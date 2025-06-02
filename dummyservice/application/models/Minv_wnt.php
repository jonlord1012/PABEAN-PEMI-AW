<?php
class Minv_wnt extends CI_Model
{
    function read($param)
    {
        switch ($param["module"]) {
            case "receipt_detail":
                return $this->receipt_detail($param);
                break;
            case "histori_receipt":
                # return $this->histori_receipt($param);
                break;
            case "bc_detail_list":
                return $this->bc_detail($param);
                break;
            case "bc_list":
                return $this->header_list($param);
                break;

            case "inv_out_technician":
                return $this->inv_out_technician($param);
                break;

            case "inv_out_process_name":
                return $this->inv_out_process_name($param);
                break;

            case "inv_out_carline":
                return $this->inv_out_carline($param);
                break;

            case "inv_out_doc":
                return $this->inv_out_doc($param);
                break;

            case "item_list":
                return $this->item_list($param);
                break;

            default:
                return false;
        }
    }
    function receipt_detail($param)
    {

        $this->load->database();
        $this->db->select("
        A.TIPE,
        A.KODE_BARANG,
        A.URAIAN,
        SUM(ISNULL(A.QTY_REAL,0)) as QTY_STOCK
            ", false);
        $this->db->from("dbo.tr_inventory_detail A");
        $this->db->group_by(
            "A.TIPE,
            A.KODE_BARANG,
            A.URAIAN"
        );

        if (array_key_exists('keywhere', $param)) {
            $keyval = json_decode($param['keywhere'], true);
            foreach ($keyval as $key => $val) {
                $this->db->where($val['property'], $val['value']);
            }
        }
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'], true);
            foreach ($keyval as $key => $val) {
                $colname = array('SYSUPDATEDATE', 'SYSCREATEDATE');
                if (in_array($val['property'], $colname)) {
                    $this->db->like("TO_CHAR(" . $val['property'] . ", 'YYYY-MM-DD HH24:MI:SS')", $val['value']);
                } else {
                    $this->db->like("UPPER(" . $val['property'] . ")", strtoupper($val['value']), 'both');
                }
            }
        }
        $this->db->order_by("A.URAIAN", "ASC");
        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'], true);
            foreach ($keyval as $key => $val) {
                $this->db->order_by($val['property'], $val['direction']);
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
    function header_list($param)
    {

        $this->load->database();
        $this->db->select("
        C.URAIAN_STATUS,
        D.URAIAN_KANTOR as KODE_KANTOR_BONGKARNAME,
        E.URAIAN_KANTOR as KODE_KANTOR_NAME,
        A.*
        
            ", false);
        $this->db->from("tr_bc_header A");
        $this->db->join("referensi_status C", "A.KODE_STATUS = C.KODE_STATUS /*AND C.KODE_DOKUMEN='" /*. $param['kode_dokumen_pabean'] */ . "'*/", "left");
        $this->db->join("referensi_kantor_pabean D", "A.KODE_KANTOR_BONGKAR = D.KODE_KANTOR", "left");
        $this->db->join("referensi_kantor_pabean E", "A.KODE_KANTOR = E.KODE_KANTOR", "left");

        $this->db->like("A.KODE_STATUS ", '8', 'after');
        if ($param['ID_COMPANY'] !== 'ALL') {
            $this->db->where("A.ID_COMPANY", $param['ID_COMPANY']);
        }

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

        $this->db->order_by("A.create_date", "desc");
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
            'TotalRows' => $count,
            'Rows' => $rows
        );
        return json_encode($data);
    }
    function bc_detail($param)
    {
        $this->load->database();
        $this->db->select("
                A.ID_HEADER,
                A.SERI_BARANG,
                A.KODE_BARANG,
                A.KATEGORI_BARANG,
                A.TIPE,
                A.URAIAN,
                A.KODE_SATUAN,
                ISNULL(A.JUMLAH_SATUAN,0) as QTY_DOK,
                ISNULL(B.QTY_RECEIPT,0) as QTY_RECEIPT,
                ISNULL(A.JUMLAH_SATUAN,0) - ISNULL(B.QTY_RECEIPT,0) as QTY_SISA,
                ISNULL(A.JUMLAH_SATUAN,0) - ISNULL(B.QTY_RECEIPT,0) as QTY_INPUT
            ", false);

        $this->db->from("tr_bc_detail A");
        $this->db->join(
            "(select A.ID_HEADER,A.SERI_BARANG,SUM(isnull(A.QTY_REAL,0)) as QTY_RECEIPT from tr_inventory_detail A GROUP BY A.ID_HEADER,A.SERI_BARANG)  B",
            "A.ID_HEADER = B.ID_HEADER AND A.SERI_BARANG = B.SERI_BARANG",
            "Left"
        );

        $this->db->order_by(
            "A.SERI_BARANG"
        );
        if (array_key_exists('keywhere', $param)) {
            $keyval = json_decode($param['keywhere'], true);
            foreach ($keyval as $key => $val) {
                $this->db->where($val['property'], $val['value']);
            }
        }
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'], true);
            foreach ($keyval as $key => $val) {
                $colname = array('SYSUPDATEDATE', 'SYSCREATEDATE');
                if (in_array($val['property'], $colname)) {
                    $this->db->like("TO_CHAR(" . $val['property'] . ", 'YYYY-MM-DD HH24:MI:SS')", $val['value']);
                } else {
                    $this->db->like("UPPER(" . $val['property'] . ")", strtoupper($val['value']), 'both');
                }
            }
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'], true);
            foreach ($keyval as $key => $val) {
                $this->db->order_by($val['property'], $val['direction']);
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

    function inv_out_technician($param)
    {

        $this->load->database();
        $this->db->select("
        A.TEKNISI_NAME AS NAMA_TEKNISI, 
        A.TEKNISI_CODE AS KODE_TEKNISI
        
            ", false);
        $this->db->from("mst_teknisi A");

        if ($param['ID_COMPANY'] !== 'ALL') {
            $this->db->where("A.ID_COMPANY", $param['ID_COMPANY']);
        }

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

        $this->db->order_by("A.create_date", "desc");
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
            'TotalRows' => $count,
            'Rows' => $rows
        );
        return json_encode($data);
    }

    function inv_out_process_name($param)
    {

        $this->load->database();
        $this->db->select("
        A.MODE_CODE AS 'KODE_PROCESS' ,
        A.MODE_NAME AS 'NAMA_PROCESS'
        
            ", false);
        $this->db->from("a_matrix A");

        $this->db->where("A.MODE_CATEGORY ", 'PROCESS');
        if ($param['ID_COMPANY'] !== 'ALL') {
            $this->db->where("A.ID_COMPANY", $param['ID_COMPANY']);
        }

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

        $this->db->order_by("A.create_date", "desc");
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
            'TotalRows' => $count,
            'Rows' => $rows
        );
        return json_encode($data);
    }

    function inv_out_doc($param)
    {
        $this->load->database();
        
        $this->db->select("
            A.NOMOR_DOKUMEN AS 'NO_DOK'
            ,A.KODE_JENIS_DOKUMEN AS 'KJD'
            ", false);

        $this->db->from("tr_bc_dokumen A");

        // if ($param['ID_COMPANY'] !== 'ALL') {
        //     $this->db->where("A.ID_COMPANY", $param['ID_COMPANY']);
        // }

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


        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'], $param['start']);
        }

        $this->db->order_by("A.create_date", "desc");

        $query = $this->db->get();

        $count = $query->num_rows();
        
        $rows = $query->result_array();

        $data = array(
            'TotalRows' => $count,
            'Rows' => $rows
        );

        return json_encode($data);
    }

    function inv_out_carline($param)
    {

        $this->load->database();
        $this->db->select("
        A.CARLINE AS 'OLD CARLINE',
        A.NEW_CARLINE AS 'KODE_CARLINE',
        A.CARLINE_NAME AS 'NAMA_CARLINE'
        
            ", false);
        $this->db->from("mst_carline A");

        if ($param['ID_COMPANY'] !== 'ALL') {
            $this->db->where("A.ID_COMPANY", $param['ID_COMPANY']);
        }

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

        $this->db->order_by("A.create_date", "desc");
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
            'TotalRows' => $count,
            'Rows' => $rows
        );
        return json_encode($data);
    }

    function item_list($param)
    {

        $this->load->database();
//         $this->db->select("
//         A.PART_NO AS 'PARTNO'
// , A.PART_NAME
// , A.PART_UOM
// , SUM(B.MST_TOTALQTY) AS 'QTY_AVAILABLE'
//             ", false);     

        $this->db->select("
        A.PART_NO AS 'PARTNO'
, A.PART_NAME
, A.PART_UOM
, B.BC_TYPE
, B.NOMOR_AJU
, B.TANGGAL_AJU
, B.NOMOR_DAFTAR
, B.TANGGAL_DAFTAR
,SUM(B.INVOICE_QTY) AS 'QTY_AVAILABLE'
            ", false);

        // $this->db->where("A.PART_CATEGORY ", 'ENGGINE');
        $this->db->from("mst_part A");
        // $this->db->join("wh_inv_mat_detail B", "A.PART_NO = B.PART_NO", "left");
        $this->db->join("wh_inv_detail B", "A.PART_NO = B.PART_NO", "left");

        $this->db->group_by(
            "A.PART_NO 
            , A.PART_NAME
            , A.PART_UOM
            , B.BC_TYPE
            , B.NOMOR_AJU
            , B.TANGGAL_AJU
            , B.NOMOR_DAFTAR
            , B.TANGGAL_DAFTAR"
        );

        $this->db->order_by("SUM(B.INVOICE_QTY)", "desc");


        if ($param['ID_COMPANY'] !== 'ALL') {
            $this->db->where("A.ID_COMPANY", $param['ID_COMPANY']);
        }

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


        $this->db->order_by("A.PART_NAME", "desc");
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
            'TotalRows' => $count,
            'Rows' => $rows
        );
        return json_encode($data);
    }
}
