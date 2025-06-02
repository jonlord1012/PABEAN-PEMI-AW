<?php
class Mbc_lists extends CI_Model
{
    function read($param)
    {
        $switchme = "";
        if ($param["method"] != null) {
            $switchme = $param["method"];
        } else {
            $switchme = $param["module"];
        }
        switch ($switchme) {
            case "bc_detail":
                return $this->bc_detail($param);
                break;
            case "bc_list":
                return $this->header_list($param);
                break;
            case "bc_doc":
                #return $this->doc_list($param);
                break;
            case "ex_bc":
                #return $this->header_list($param);
                break;
            case "source_coo":
                return $this->read_list_source_coo($param);
                break;

            case "select_coo":
                return $this->select_coo($param);
                break;
            default:
                return false;
        }
    }
    function header_list($param)
    {

        $this->load->database();
        $this->db->select("
        C.URAIAN_STATUS,
        A.*
        
            ", false);
        $this->db->from("tr_bc_header A");
        $this->db->join("referensi_status C", "A.KODE_STATUS = C.KODE_STATUS /*AND C.KODE_DOKUMEN='" /*. $param['kode_dokumen_pabean'] */ . "'*/", "left");
        $where = array("A.ID_COMPANY = "  => $param['ID_COMPANY'], "A.KODE_STATUS LIKE " => '8%');

        /*$this->db->where("A.KODE_DOKUMEN_PABEAN", $param['kode_dokumen_pabean']);*/
        if ($param['ID_COMPANY'] !== 'ALL') {
            $this->db->where($where);
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
        $lastQuery = $this->db->last_query();
        $rows = $query->result_array();
        $data = array(
            'TotalRows' => $count,
            'Rows' => $rows,
            'query' => $lastQuery,
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
    function read_list_source_coo($param)
    {
        $this->load->database();
        $this->db->select("
            MAX(A.MAPP_SUPPLIER) as VENDOR,
            A.INVOICE_NO as NOMOR_DOKUMEN,
            A.INVOICE_DATE as TANGGAL_DOKUMEN,
            A.NOMOR_AJU,
            FORMAT(A.TANGGAL_AJU,'yyyy-MM-dd') as TANGGAL_AJU,
            A.NOMOR_DAFTAR,
            FORMAT(A.TANGGAL_DAFTAR,'yyyy-MM-dd') as TANGGAL_DAFTAR,
            MAX(B.KODE_VALUTA) as KODE_VALUTA,
            MAX(B.NDPBM) as NDPBM
        ");
        $this->db->from("upload_coo_detail A");
        $this->db->join("tr_bc_header B", "A.NOMOR_AJU = B.NOMOR_AJU", "left");

        $this->db->where("
        A.NOMOR_DAFTAR IS NOT NULL
        ");

        $this->db->group_by("
            A.INVOICE_NO,
            A.NOMOR_AJU,
            A.TANGGAL_AJU,
            A.NOMOR_DAFTAR,
            A.TANGGAL_DAFTAR,
            A.INVOICE_DATE,
        ");


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

    function read_list_source_molts($param)
    {
        $this->load->database();
        $this->db->select("
            MAX(A.MAPP_SUPPLIER) as VENDOR,
            A.INVOICE_NO as NOMOR_DOKUMEN,
            A.NOMOR_AJU,
            FORMAT(A.TANGGAL_AJU,'yyyy-MM-dd') as TANGGAL_AJU,
            A.NOMOR_DAFTAR,
            FORMAT(A.TANGGAL_DAFTAR,'yyyy-MM-dd') as TANGGAL_DAFTAR,
            MAX(B.KODE_VALUTA) as KODE_VALUTA,
            MAX(B.NDPBM) as NDPBM
        ");
        $this->db->from("upload_coo_detail A");
        $this->db->join("tr_bc_header B", "A.NOMOR_AJU = B.NOMOR_AJU", "left");

        $this->db->where("
        A.NOMOR_DAFTAR IS NOT NULL
        ");

        $this->db->group_by("
            A.INVOICE_NO,
            A.NOMOR_AJU,
            A.TANGGAL_AJU,
            A.NOMOR_DAFTAR,
            A.TANGGAL_DAFTAR
        ");


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
    function select_coo($param)
    {
        switch ($param["module"]) {
            case "source_coo":
                /*return $this->mapping_SPCALL($param, "SP_COO_SELECT_INVOICE");
                break;*/
                $invoice_no = "";
                $invoice_date = "";
                $vendor = "";
                $data = json_decode($param['invoice_data'], true);
                foreach ($data as $key => $val) {
                    $invoice_no = $val["INVOICE_NO"];
                    $invoice_date = $val['INVOICE_DATE'];
                    $vendor = $val['VENDOR'];
                }
                $querySQL = "/*DECLARE @VJSONDATA as NVARCHAR(MAX);
                SET @VJSONDATA = (*/ SELECT 
                A.INVOICE_NO,
                A.INVOICE_DATE,
                A.VENDOR,
                A.ITEM_NUMBER,
                A.ARRIV_PLAN_NUMBER,
                A.PACKING_QTY,
                A.CTN_QUANTITY,
                A.UOM,
                B.PART_NO,
                B.PART_NAME,
                B.PART_DESCRIPTION,
                B.PART_GROUP,
                B.PART_CATEGORY
                 FROM upload_coo_detail A
                 LEFT JOIN mst_part B on A.MAPP_PARTNO = B.PART_NO
                 LEFT JOIN mst_part_hs C on B.PART_NO = C.PART_NO
                 LEFT JOIN (
                    SELECT 
                    '" . $invoice_no . "'  AS INVOICE_NO ,
                    cast('" . $invoice_date . "' as date)  AS INVOICE_DATE , 
                    '" . $vendor . "'  AS VENDOR  " .
                    ") D on A.INVOICE_NO = D.INVOICE_NO AND A.INVOICE_DATE  = D.INVOICE_DATE --AND A.VENDOR = D.VENDOR
                WHERE
                A.ID_COMPANY = '" . $param['ID_COMPANY'] . "' AND 
                A.ID_HEADER_ORI is NULL AND
                A.INVOICE_NO = D.INVOICE_NO /*FOR JSON PATH ) ;*/
                
                /*select 'true' as 'success','Data Invoice dokumen ditampilkan' as 'message',@VJSONDATA as 'vjsondata'*/
                ";


                $this->load->database();
                $query = $this->db->query($querySQL);
                #$count = $query->num_rows();
                $tmp = clone $query;
                $rows = $query->result_array();
                #$count = $tmp->num_rows();
                $count = count($rows);
                $data = array(
                    'TotalRows' => $count,
                    'Rows' => $rows
                );

                return json_encode($data);
            default:
                return false;
        }
    }
    function mapping_SPCALL($param, $spname)
    {
        $this->load->database();
        $SQL_CALLSP = "EXEC " . $spname . "
        @VIDCOMPANY=?,
        @VUSERNAME=?,
        @VDATA=?
        ";
        $data = array(
            '@VIDCOMPANY' => $param['ID_COMPANY'],
            '@VUSERNAME' => $param['VUSERNAME'],
            '@VDATA' => $param['invoice_data']
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->row_array();


        return json_encode($row);
    }
}
