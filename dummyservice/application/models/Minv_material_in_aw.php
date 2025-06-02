<?php
class Minv_material_in_aw extends CI_Model
{

    function read($param)
    {
        switch ($param["method"]) {
            case "read_list_source_bicc":
                return $this->read_list_source_bicc($param);
                break;
            case "read_in":
                return $this->read_in($param);
                break;
            case "read_integrasi_bicc":
                return $this->read_integrasi_bicc($param);
                break;
            case "read_receivingdata_header":
                return $this->read_receivingdata_header($param);
                break;
            case "read_receivingdata_detail":
                return $this->read_receivingdata_detail($param);
                break;
            case "read_receivingdata_sumber_data":
                return $this->read_receivingdata_sumber_data($param);
                break;
            default:


                return false;
        }
    }
    function read_in($param)
    {
        $this->load->database();
        $this->db->select("
            A.RECEIPT_NO,
            FORMAT(A.RECEIPT_DATE,'yyyy-MM-dd') as RECEIPT_DATE,
            A.INVOICE_NO,
            A.PART_NO, 
            A.MAPP_PARTNO,
            SUM(A.RECEIPT_QTY) as RECEIPT_QTY,
            A.BC_TYPE,
            A.NOMOR_AJU,
            A.TANGGAL_AJU,
            A.NOMOR_DAFTAR,
            A.TANGGAL_DAFTAR
        ");
        $this->db->from("wh_inv_detail_aw  A");
        $this->db->group_by("
            A.RECEIPT_NO,
            A.RECEIPT_DATE,
            A.INVOICE_NO,
            A.PART_NO, 
            A.MAPP_PARTNO,
            A.BC_TYPE,
            A.NOMOR_AJU,
            A.TANGGAL_AJU,
            A.NOMOR_DAFTAR,
            A.TANGGAL_DAFTAR
        ");

        $arr_field = array(
            'A.NOMOR_AJU' => 'NOMOR_AJU',
            'A.TANGGAL_AJU' => 'TANGGAL_AJU',
            'A.NOMOR_DAFTAR' => 'NOMOR_DAFTAR'
        );
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'], true);
            foreach ($keyval as $key => $val) {
                $this->db->like(array_search($val['property'], $arr_field), $val['value']);
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


    function read_list_source_bicc($param)
    {
        $this->load->database();
        $this->db->select("
            A.VENDOR,
            A.NAMA_VENDOR,
            A.NOMOR_AJU,
            A.TANGGAL_AJU,
            A.NOMOR_DAFTAR,
            A.TANGGAL_DAFTAR,
            A.INVOICE_NO
        ");
        $this->db->from("
        (
            SELECT 
            MAX(A.VENDOR) as VENDOR,
            (SELECT TOP 1 NAMA FROM referensi_pemasok WHERE KODE_AW=MAX(A.MAPP_TENANT)) as NAMA_VENDOR,
            A.NOMOR_AJU,
            A.INVOICE_NO,
            FORMAT(MAX(A.TANGGAL_AJU),'yyyy-MM-dd') as TANGGAL_AJU,
            MAX( A.NOMOR_DAFTAR) as NOMOR_DAFTAR,
            FORMAT(MAX(A.TANGGAL_DAFTAR),'yyyy-MM-dd') as TANGGAL_DAFTAR
             FROM upload_aw_detail A
            LEFT JOIN DBIT_HEADER B on A.NOMOR_AJU = B.NOMORAJU
            WHERE
            A.MAPP_TENANT IS NOT NULL AND
            A.NOMOR_AJU IS NOT NULL AND
            B.NOMORAJU IS NOT NULL 
            
            GROUP BY
            A.INVOICE_NO,
            A.NOMOR_AJU
            HAVING 
            SUM(cast (A.GR_QTY as NUMERIC(18,5)) ) >
            ISNULL((select SUM(D.RECEIPT_QTY) FROM wh_inv_detail_aw D WHERE
            D.INVOICE_NO = A.INVOICE_NO AND A.NOMOR_AJU = D.NOMOR_AJU
            ),0)

        ) A
        ");


        $arr_field = array(
            'A.NOMOR_AJU' => 'NOMOR_AJU',
            'A.TANGGAL_AJU' => 'TANGGAL_AJU',
            'A.NOMOR_DAFTAR' => 'NOMOR_DAFTAR',
            'A.INVOICE_NO' => 'INVOICE_NO'
        );
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'], true);
            foreach ($keyval as $key => $val) {
                $this->db->like(array_search($val['property'], $arr_field), $val['value']);
            }
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'], true);
            foreach ($keyval as $key => $val) {
                $this->db->order_by($val["property"], $val['direction']);
            }
        }

        //$tempdb = clone $this->db;
        //$count= $tempdb->count_all_results(); 

        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'], $param['start']);
        }

        $query = $this->db->get();
        $rows = $query->result_array();
        #print $this->db->last_query();

        $data = array(
            //'TotalRows' => $count,
            'Rows' => $rows
        );
        return json_encode($data);
    }
    function receiving_select_aju($param)
    {

        $this->load->database();
        $SQL_CALLSP = "EXEC SP_INV_MATERIAL_IN_SELECT_AJU
        @VMODULE=?,
        @VNOMOR_AJU=?
        ";
        $data = array(
            '@VMODULE' => $param['module'],
            '@VNOMOR_AJU' =>  $param['nomor_aju']
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->row_array();


        return json_encode($row);
    }
    function create_receiving($param)
    {
        switch ($param["module"]) {
            case "coo":
                return $this->SP_INV_MATERIAL_IN_MANUAL($param);
                break;
            case "bicc":
                return $this->SP_INV_MATERIAL_IN_MANUAL($param);
                break;

            default:
                return false;
        }
    }
    function SP_INV_MATERIAL_IN_MANUAL($param)
    {
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_INV_MATERIAL_IN_MANUAL
        @VUSERNAME=?,
        @VHEADER=?,
        @VDETAIL=?, 
        @VMODULES=?
        ";
        $data = array(
            '@VUSERNAME' => $param['VUSERNAME'],
            '@VHEADER' => $param['header'],
            '@VDETAIL' =>  $param['detail'],
            '@VMODULES' => $param['module']
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->row_array();
        return json_encode($row);
    }
    function read_integrasi_bicc($param)
    {
        $this->load->database();
        $query = $this->db->query("
        SELECT * FROM dbo.fn_GET_RECEIVING_AW('" . $param['vdate'] . "')", false);
        /* SELECT 
        A.RCV_RECEIPT_DATE,
        A.RCV_INVOICE_NO,
        A.RCV_PART_NO,
        A.RCV_SUPPLIER_PART,
        A.RCV_BARCODE,
        A.RCV_QTY,
				A.RCV_NETTO,
        B.NOMOR_DOKUMEN AS INVOICE_NO,
        B.KODE_BARANG AS PART_NO,
        B.JUMLAH_SATUAN AS QTY,
				--B.INVOICE_QTY, 
				--B.PO_QTY,
        B.KODE_JENIS_DOKUMEN AS BC_TYPE,
        B.MODE_SOURCE,
        B.NOMOR_AJU,
        FORMAT(B.TANGGAL_AJU,'yyyy-MM-dd') as TANGGAL_AJU,
        B.NOMOR_DAFTAR,
        FORMAT(B.TANGGAL_DAFTAR,'yyyy-MM-dd') as TANGGAL_DAFTAR, 
        C.RECEIPT_QTY
        FROM (
            SELECT * FROM OPENQUERY( 
                [MY_BICC], 'SELECT A.TGL_RECEIVE AS RCV_RECEIPT_DATE, A.INVOICE_NO AS RCV_INVOICE_NO, A.PART_CODE AS RCV_PART_NO, A.LOT_NO AS RCV_BARCODE, A.PART_NAME AS RCV_SUPPLIER_PART, MAX(A.QTY_RECEIVED) AS RCV_QTY , 
								SUM(A.NETTO) AS RCV_NETTO
                FROM VW_GET_BPB_AW A 
                 GROUP BY A.TGL_RECEIVE, A.INVOICE_NO, A.PART_CODE, A.PART_NAME')
        ) A 
        LEFT JOIN 
        VW_TR_DATA_LENGKAP B
            ON A.RCV_PART_NO = B.KODE_BARANG AND A.RCV_INVOICE_NO = B.NOMOR_DOKUMEN
        LEFT JOIN 
        ( SELECT A.INVOICE_NO, A.PART_NO, SUM(A.RECEIPT_QTY) AS RECEIPT_QTY FROM wh_inv_detail_aw A GROUP BY A.INVOICE_NO, A.PART_NO) C
            ON B.NOMOR_DOKUMEN = C.INVOICE_NO AND B.KODE_BARANG = C.PART_NO 
        WHERE A.RCV_RECEIPT_DATE = '".$param['vdate']."'
				AND 
        C.INVOICE_NO IS NULL AND (C.RECEIPT_QTY IS NULL OR (ISNULL(C.RECEIPT_QTY,0)+A.RCV_QTY) < ISNULL(B.JUMLAH_SATUAN,0) )
				 AND B.KODE_BARANG <> ''
    ",false);
    */
        $rows = $query->result_array();
        $data = array(
            //'TotalRows' => $count,
            'Rows' => $rows
        );
        return json_encode($data);
    }
    function read_integrasi_bicc_OLD($param)
    {
        $this->load->database();
        $this->db->select("
        /*SELECT 
        A.RCV_RECEIPT_DATE,
        A.RCV_INVOICE_NO,
        A.RCV_PART_NO,
        A.RCV_SUPPLIER_PART,
        A.RCV_BARCODE,
        A.RCV_QTY,
        B.INVOICE_NO,
        B.PART_NO,
        B.QTY,
        B.BC_TYPE,
        B.MODE_SOURCE,
        B.NOMOR_AJU,
        FORMAT(B.TANGGAL_AJU,'yyyy-MM-dd') as TANGGAL_AJU,
        B.NOMOR_DAFTAR,
        FORMAT(B.TANGGAL_DAFTAR,'yyyy-MM-dd') as TANGGAL_DAFTAR, 
        C.RECEIPT_QTY

        FROM (
            SELECT * FROM OPENQUERY( 
                [MY_BICC], 'SELECT A.GR_DATE AS RCV_RECEIPT_DATE, A.INVOICE_NO AS RCV_INVOICE_NO, A.PART_CODE AS RCV_PART_NO, A.SUPPLIER_LOT_NO AS RCV_BARCODE, A.DESCRIPTION AS RCV_SUPPLIER_PART, SUM(A.GR_QTY) AS RCV_QTY 
                FROM VW_GET_RECEIVE_AW A 
                 GROUP BY A.GR_DATE, A.INVOICE_NO, A.PART_CODE, A.DESCRIPTION')
        ) A 
        LEFT JOIN 
        VW_SUMBERDATA_AW B
            ON A.RCV_PART_NO = B.PART_NO AND A.RCV_INVOICE_NO = B.INVOICE_NO
        LEFT JOIN 
        ( SELECT A.INVOICE_NO, A.PART_NO, SUM(A.RECEIPT_QTY) AS RECEIPT_QTY FROM wh_inv_detail_aw A GROUP BY A.INVOICE_NO, A.PART_NO) C
            ON B.INVOICE_NO = C.INVOICE_NO AND B.PART_NO = C.PART_NO 
        WHERE A.RCV_RECEIPT_DATE = '" . $param['vdate'] . "' AND 
        C.INVOICE_NO IS NULL AND (C.RECEIPT_QTY IS NULL OR (C.RECEIPT_QTY+A.RCV_QTY) < B.QTY )
        */
            A.RCV_RECEIPT_DATE,
            A.RCV_INVOICE_NO,
            A.RCV_PART_NO,
            A.RCV_SUPPLIER_PART,
            A.RCV_QTY,
            B.INVOICE_NO,
            B.PART_NO,
            A.RCV_BARCODE,
            B.QTY,
            B.BC_TYPE,
            B.MODE_SOURCE,
            B.NOMOR_AJU,
            FORMAT(B.TANGGAL_AJU,'yyyy-MM-dd') as TANGGAL_AJU,
            B.NOMOR_DAFTAR,
            FORMAT(B.TANGGAL_DAFTAR,'yyyy-MM-dd') as TANGGAL_DAFTAR
        ");
        $this->db->from("
        (
            SELECT * FROM OPENQUERY(MY_BICC,
                'SELECT 
                A.GR_DATE AS RCV_RECEIPT_DATE, 
                A.INVOICE_NO AS RCV_INVOICE_NO,
                A.PART_CODE AS RCV_PART_NO, 
                A.SUPPLIER_LOT_NO AS RCV_BARCODE, 
                A.DESCRIPTION AS RCV_SUPPLIER_PART, 
                SUM(A.GR_QTY) AS RCV_QTY
                FROM 
                VW_GET_RECEIVE_AW A 
                WHERE A.GR_DATE =''" . $param['vdate'] . "''
                GROUP BY 
                A.GR_DATE,
                A.INVOICE_NO, 
                A.PART_CODE, 
                A.DESCRIPTION')
                ) A 
        ");
        $this->db->join("
        (
            SELECT 
            'AW' as MODE_SOURCE,
            A.INVOICE_NO,A.MAPP_PARTNO as PART_NO,A.GR_QTY as QTY,
            A.BC_TYPE,A.NOMOR_AJU,A.TANGGAL_AJU,A.NOMOR_DAFTAR,A.TANGGAL_DAFTAR,A.MAPP_SUPPLIER
             FROM upload_aw_detail A) B
        ", "A.RCV_INVOICE_NO = B.INVOICE_NO AND (A.RCV_PART_NO = B.PART_NO OR A.RCV_SUPPLIER_PART = B.PART_NO)", "left");
        $this->db->join(" 
            (
                SELECT A.INVOICE_NO,A.PART_NO,SUM(A.RECEIPT_QTY) as QTY FROM wh_inv_detail_aw A GROUP BY A.INVOICE_NO,A.PART_NO
            ) C
        ", "B.INVOICE_NO = C.INVOICE_NO AND B.PART_NO = C.PART_NO", "left");

        $this->db->where("
        A.RCV_RECEIPT_DATE='" . $param['vdate'] . "' AND
        C.INVOICE_NO is NULL
        ");
        $arr_field = array(
            'B.Supplier_Code' => 'SUPPLIER_CODE',
            'B.Invoice_No' => 'INVOICE_NO',
            'A.Receipt_Date' => 'RECEIPT_DATE',
            'A.Part_Code' => 'PART_NO'
        );
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'], true);
            foreach ($keyval as $key => $val) {
                $this->db->like(array_search($val['property'], $arr_field), $val['value']);
            }
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'], true);
            foreach ($keyval as $key => $val) {
                $this->db->order_by($val["property"], $val['direction']);
            }
        }

        //$tempdb = clone $this->db;
        //$count= $tempdb->count_all_results(); 

        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'], $param['start']);
        }

        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
            //'TotalRows' => $count,
            'Rows' => $rows
        );
        return json_encode($data);
    }
    function proses_synchronize_bicc($param)
    {
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_INV_MATERIAL_IN_AW
        @VIDCOMPANY=?,
        @VUSERNAME=?,
        @VRECEIPT_DATE=?,
        @VMODULE=?,
        @VDATA=?
        ";
        $data = array(
            '@VIDCOMPANY' => $param['ID_COMPANY'],
            '@VUSERNAME' =>  $param['VUSERNAME'],
            '@VRECEIPT_DATE' => $param['RECEIPT_DATE'],
            '@VMODULE' => 'proses_data',
            '@VDATA' => $param['vdata'],

        );
        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->row_array();


        return json_encode($row);
    }


    function read_receivingdata_header($param)
    {
        $this->load->database();
        $this->db->select("
        A.RECEIPT_NO,
        A.RECEIPT_DATE,
        A.RECEIPT_USER
        ");
        $this->db->from("wh_inv_header_aw A");
        $this->db->where("
        A.RECEIPT_NO = '" . $param['RECEIPT_NO'] . "' 
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
        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'], $param['start']);
        }

        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
            'Rows' => $rows
        );
        return json_encode($data);
    }

    function read_receivingdata_detail($param)
    {
        $this->load->database();
        $this->db->select("
            B.MAPP_PARTNO
            , A.PART_NO
            , A.INVOICE_QTY
            , A.RECEIPT_QTY
            , C.HARGA_SATUAN
            , (CASE WHEN A.BC_KURS IS NULL THEN C.KODE_VALUTA ELSE A.BC_KURS END) AS KURS 
            , (CASE WHEN A.BC_NDPBM IS NULL THEN C.NDPBM ELSE A.BC_NDPBM END) AS NDPBM 
            , (CASE WHEN A.BC_HARGA_SATUAN IS NULL THEN (CASE WHEN C.HARGA_INVOICE IS NULL THEN C.HARGA_PENYERAHAN ELSE C.HARGA_INVOICE END) ELSE A.BC_HARGA_SATUAN END) AS BC_HARGA_SATUAN
            , A.BC_USD_NDPBM
            , A.BC_USD_HARGA_SATUAN
            , A.RECEIPT_NO
            , A.INVOICE_NO
            , A.BC_TYPE
            , C.NOMOR_AJU
            , C.TANGGAL_AJU
            , C.NOMOR_DAFTAR
            , C.TANGGAL_DAFTAR
            , A.SUPPLIER_KODE_INTERNAL
            , A.SUPPLIER_NAME
            , A.JENIS_INPUT
        
        ");
        $this->db->from("wh_inv_detail_aw A");
        $this->db->join('upload_aw_detail B', 'A.INVOICE_NO = B.INVOICE_NO AND A.PART_NO = B.MAPP_PARTNO', 'left');
        $this->db->join('VW_TR_DATA_LENGKAP C', 'B.NOMOR_AJU = C.NOMOR_AJU 
                        AND A.PART_NO = C.KODE_BARANG
                        AND B.PART_CODE = C.KODE_BARANG 
                        AND A.INVOICE_NO = C.NOMOR_DOKUMEN
                        ', 'left');


        $this->db->where("A.RECEIPT_NO", $param['RECEIPT_NO']);


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

        $query = $this->db->get();
        $rows = $query->result_array();
        /*print($this->db->last_query());*/
        $data = array(
            'Rows' => $rows
        );
        return json_encode($data);
    }
    function read_receivingdata_sumber_data($param)
    {
        $this->load->database();
        $this->db->select("
          *
        ");
        $this->db->from("upload_aw_detail ");
        $this->db->where("INVOICE_NO", $param['INVOICE_NO']);

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

        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
            'Rows' => $rows
        );
        return json_encode($data);
    }
}