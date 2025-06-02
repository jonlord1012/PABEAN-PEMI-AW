<?php
class Mgoods_stuffing extends CI_Model
{
    function read($param)
    {
        switch ($param["method"]) {
            case "read_in":
                return $this->read_in($param);
                break;
            case "sync_data":
                return $this->sync_data($param);
                break;
            case "read_detail_delivery_instruction":
                return $this->read_detail_delivery_instruction($param);
                break;
            case "read_integrasi_binloc":
                return $this->read_integrasi_binloc($param);
                break;
            case "read_syncronize_binloc":
                return $this->read_syncronize_binloc($param);
                break;
            case "read_receivingdata_header":
                return $this->read_receivingdata_header($param);
                break;
            case "read_receivingdata_detail":
                return $this->read_receivingdata_detail($param);
                break;
            case "get_source_picking":
                return $this->get_source_picking($param);
                break;
            case "read_list_source_picking":
                return $this->read_list_source_picking($param);
                break;

            case "saveDelivery_Picking":
                return $this->saveDelivery_Picking($param);
                break;
            default:
                return false;
        }
    }
    function read_in($param)
    {
        $this->load->database();
        $this->db->distinct();
        $this->db->select("
                DELIVERY_NO AS DOCUMENT_NO 
            ,   DELIVERY_DATE AS DOCUMENT_DATE
            ,   CODE_CUSTOMER 
            ,   ISNULL(STATUS,'OPEN') AS STATUS
        ");
        $this->db->from("DELIVERY_INSTRUCTION A");

        $arr_field = array(
            'DELIVERY_NO' => 'DOCUMENT_NO',
            'DELIVERY_DATE' => 'DOCUMENT_DATE',
            'CODE_CUSTOMER' => 'CODE_CUSTOMER',
            'STATUS' => 'STATUS',
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
    function read_detail_delivery_instruction($param)
    {

        $this->load->database();
        $this->db->select("
            A.DELIVERY_NO AS DOCUMENT_NO,
            A.DELIVERY_DATE AS DOCUMENT_DATE,
            A.PART_NAME AS PART_NAME,
            A.ARTICLE_CODE AS ARTICLE_CODE,
            A.STOCK_MPQ AS PART_MPQ,
            SUM(A.DELIVERY_QTY) AS QTY,
            A.CODE_CUSTOMER          
        ");
        $this->db->from('DELIVERY_INSTRUCTION A');
        $this->db->where("
            A.DELIVERY_NO = '" . $param['DOCUMENT_NO']  . "'
        ");

        $this->db->group_by("
            A.DELIVERY_NO,
            A.DELIVERY_DATE,
            A.PART_NAME,
            A.ARTICLE_CODE,
            A.STOCK_MPQ,
            A.CODE_CUSTOMER , 
            A.FLAG01
        ");
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'], true);
            foreach ($keyval as $key => $val) {
                $this->db->like($val["property"], $val['value'], 'both');
            }
        }


        $tempdb = clone $this->db;
        $count = $tempdb->count_all_results();
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
        //$count= $query->count_all_results();
        $data = array(
            'TotalRows' => $count,
            'Rows' => $rows
        );
        return json_encode($data);
    }
    function read_list_source_picking($param)
    {
        $this->load->database();
        $this->db->distinct();
        $this->db->select("
                NO_BUKTI_PICKING AS NO_BUKTI 
            ,   TANGGAL_PICKING AS TANGGAL 
            ,   NO_FAKTUR_PICKING AS NO_DRAFT 
            ,   CUSTOMER_DRAFT
            , COUNT(QTY_PICKING) AS QTY_PICKING
            
         ");
        $this->db->from('VW_TR_STUFFING_WMS');
        $this->db->where("CUSTOMER_DRAFT ='" . $param['CODE_CUSTOMER'] . "' ");

        $this->db->group_by("
                NO_BUKTI_PICKING 
            ,   TANGGAL_PICKING 
            ,   NO_FAKTUR_PICKING 
            ,   CUSTOMER_DRAFT
        ");

        $arr_field = array(
            'NO_BUKTI_PICKING' => 'NO_BUKTI',
            'TANGGAL_PICKING' => 'TANGGAL',
            'KODE_BARANG_INVOICE' => 'KODE_BARANG_INVOICE',
            'QTY_DRAFT' => 'QTY_DRAFT',
            'CUSTOMER_DRAFT' => 'CUSTOMER_INVOICE',
            'NO_BUKTI_DRAFT' => 'NO_BUKTI_DRAFT',
            'QTY_PICKING' => 'QTY_PICKING',
            'NO_FAKTUR_PICKING' => 'NO_DRAFT',
            'KODE_BARANG_PICKING' => 'KODE_BARANG_PICKING',
            'PALLET_BARCODE' => 'PALLET_BARCODE',
            'KODE_LOT' => 'KODE_LOT',
            'QTY_PICKING' => 'QTY_PICKING',

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
    function get_source_picking_json($param)
    {
        $this->load->database();
        // $this->db->distinct();
        $query = $this->db->query("
        DECLARE @VJSON_DATA NVARCHAR(MAX);
		SET @VJSON_DATA =(
            SELECT * FROM VW_GET_SOURCE_PICKING_WMS 
            WHERE 
                NO_BUKTI ='" . $param['NO_BUKTI'] . "'
                AND NO_DRAFT = '" . $param['NO_DRAFT'] . "' 
            FOR JSON PATH, INCLUDE_NULL_VALUES
		)
        SELECT 'true' as success, 'Data Picking dipilih' as message, isnull(@VJSON_DATA,'') AS vjson_data ; 
        ");
        /*
        $this->db->select(" * ");
        $this->db->from('VW_GET_SOURCE_PICKING_WMS');
        $this->db->where("NO_BUKTI = '" . $param['NO_BUKTI']  . "'");
        */

        //$query = $this->db->get();
        $row = $query->row_array();
        return json_encode($row);
    }
    function get_source_picking($param)
    {
        $this->load->database();
        $this->db->distinct();
        $this->db->select("
               *
         ");
        $this->db->from('VW_TR_STUFFING_WMS');
        $this->db->where("NO_BUKTI_PICKING ='" . $param['NO_BUKTI'] . "'
        AND NO_FAKTUR_PICKING = '" . $param['NO_DRAFT'] . "' ");


        $arr_field = array(
            'NO_BUKTI' => 'NO_BUKTI',
            'TANGGAL' => 'TANGGAL',
            'KODE_BARANG_INVOICE' => 'KODE_BARANG_INVOICE',
            'QTY_INVOICE' => 'QTY_INVOICE',
            'CUSTOMER_INVOICE' => 'CUSTOMER_INVOICE',
            'NO_BUKTI_DRAFT' => 'NO_BUKTI_DRAFT',
            'QTY_DRAFT' => 'QTY_DRAFT',
            'NO_DRAFT' => 'NO_DRAFT',
            'KODE_BARANG_PICKING' => 'KODE_BARANG_PICKING',
            'PALLET_BARCODE' => 'PALLET_BARCODE',
            'KODE_LOT' => 'KODE_LOT',
            'QTY_PICKING' => 'QTY_PICKING',

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
        /*
        $this->db->select(" * ");
        $this->db->from('VW_GET_SOURCE_PICKING_WMS');
        $this->db->where("NO_BUKTI = '" . $param['NO_BUKTI']  . "'");
       

        //$query = $this->db->get();
        $row = $query->row_array();
        return json_encode($row);
         */
    }
    function get_picked_picking_documents_nonjson($param)
    {
        $this->load->database();
        $this->db->distinct();
        $this->db->select("
               *
            
         ");
        $this->db->from('DELIVERY_PACK');
        $this->db->where("DOCUMENT_NO ='" . $param['INVOICE_NO'] . "'
        AND CUSTOMER = '" . $param['CODE_CUSTOMER'] . "' ");


        $arr_field = array(
            /*
            'NO_BUKTI' => 'NO_BUKTI',
            'TANGGAL' => 'TANGGAL',
            'KODE_BARANG_INVOICE' => 'KODE_BARANG_INVOICE',
            'QTY_INVOICE' => 'QTY_INVOICE',
            'CUSTOMER_INVOICE' => 'CUSTOMER_INVOICE',
            'NO_BUKTI_DRAFT' => 'NO_BUKTI_DRAFT',
            'QTY_DRAFT' => 'QTY_DRAFT',
            'NO_DRAFT' => 'NO_DRAFT',
            'KODE_BARANG_PICKING' => 'KODE_BARANG_PICKING',
            'PALLET_BARCODE' => 'PALLET_BARCODE',
            'KODE_LOT' => 'KODE_LOT',
            'QTY_PICKING' => 'QTY_PICKING',*/);
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
    function get_picked_picking_documents($param)
    {
        $this->load->database();
        // $this->db->distinct();
        $query = $this->db->query("
        DECLARE @VJSON_DATA NVARCHAR(MAX);
		SET @VJSON_DATA =(
            SELECT distinct 
                NO_BUKTI 
            ,   DOCUMENT_DATE 
            ,   NO_DRAFT 
            ,   CUSTOMER
            ,   SUPPLIED_QTY

            FROM DELIVERY_PACK 
            WHERE 
            DOCUMENT_NO ='" . $param['INVOICE_NO'] . "'
                AND CUSTOMER = '" . $param['CODE_CUSTOMER'] . "' 
            FOR JSON PATH, INCLUDE_NULL_VALUES
		)
        SELECT 'true' as success, 'Data Picking dipilih' as message, isnull(@VJSON_DATA,'') AS vjson_data ; 
        ");
        /*
        $this->db->select(" * ");
        $this->db->from('VW_GET_SOURCE_PICKING_WMS');
        $this->db->where("NO_BUKTI = '" . $param['NO_BUKTI']  . "'");
        */

        //$query = $this->db->get();
        $row = $query->row_array();
        return json_encode($row);
    }
    function saveDelivery_Picking($param)
    {
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_SAVE_DELIVERY_PICKING ?,?,?,?
        ";
        $data = array(
            '@VUSERNAME' => $param['VUSERNAME'],
            '@VIDCOMPANY' => $param['ID_COMPANY'],
            '@VDOCUMENT_NO' => $param['DOCUMENT_NO'],
            '@VPICKING_LIST' =>  $param['PICKING_LIST']
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        // print $this->db->last_query();

        $row = $result->row_array();

        return json_encode($row);
    }

    function sync_data($param)
    {
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_TR_GET_DELIVERY_INSTRUCTION ? ";
        $data = array(
            '@VUSERNAME' => $param['VUSERNAME'],
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        // print $this->db->last_query();

        $row = $result->row_array();

        return json_encode($row);
    }
}