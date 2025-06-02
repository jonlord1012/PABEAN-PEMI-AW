<?php
class Mgoods_racking extends CI_Model
{
    function read($param)
    {
        switch ($param["method"]) {
            case "read_in":
                return $this->read_in($param);
                break;
            case "read_list_source_binloc":
                return $this->read_list_source_binloc($param);
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
            case "read_list_rack":
                return $this->read_list_rack($param);
                break;
            case "read_list_source_lotno":
                return $this->read_list_source_lotno($param);
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
            TRANS_NO AS RECEIPT_NO, 
            TRANS_DATE AS RECEIPT_DATE, 
            INVOICE_NO, 
            LOT_NO AS LOT_NO, 
            ARTICLE_CODE, 
            NOMOR_AJU, 
            TANGGAL_AJU, 
            NOMOR_DAFTAR, 
            TANGGAL_DAFTAR ,
            TRANS_QTY AS RECEIPT_QTY,  
            TRANS_QTY_CONVERTED AS PART_MPQ, 
            FLAG02 AS RACK_ID , 
            ISNULL(B.RACK_NAME, 'RECEIVING ZONE') AS RACK_NAME
        ");

        // $this->db->from("wh_inv_detail_aw  A");
        $this->db->from("TR_STOCK_TRANS A");
        $this->db->join('MST_RACK B', 'A.FLAG02 = B.TABLE_ID', 'left');

        // $this->db->from("goods_in_header A");
        /*
        $this->db->group_by("
            TRANS_NO,
            TRANS_DATE,
            INVOICE_NO,
            LOT_NO, 
            ARTICLE_CODE,
            PART_MPQ,
            NOMOR_AJU,
            TANGGAL_AJU,
            NOMOR_DAFTAR,
            TANGGAL_DAFTAR
        ");
*/
        $arr_field = array(
            'NOMOR_AJU' => 'NOMOR_AJU',
            'TANGGAL_AJU' => 'TANGGAL_AJU',
            'LOT_NO' => 'LOT_NO',
            'ARTICLE_CODE' => 'ARTICLE_CODE',
            'INVOICE_NO' => 'INVOICE_NO',
            'NOMOR_DAFTAR' => 'NOMOR_DAFTAR'
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

    function read_list_rack($param)
    {
        $this->load->database();
        $this->db->select("
        TABLE_ID AS RACK_ID , 
        RACK_NAME AS RACK_NAME 
            ", false);
        $this->db->from("mst_rack");


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
        $data = array(
            'TotalRows' => $count,
            'Rows' => $rows
        );
        return json_encode($data);
    }
    function read_list_source_binloc($param)
    {
        $this->load->database();
        $this->db->select("RECEIPT_DATE, INVOICE_NO, NOMOR_AJU, TANGGAL_AJU, NOMOR_DAFTAR, TANGGAL_DAFTAR");
        $this->db->from('SCAN_IN_DETAIL');

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
            (SELECT TOP 1 NAMA FROM referensi_pemasok WHERE KODE_INTERNAL=MAX(A.MAPP_SUPPLIER)) as NAMA_VENDOR,
            A.NOMOR_AJU,
            A.INVOICE_NO,
            FORMAT(MAX(A.TANGGAL_AJU),'yyyy-MM-dd') as TANGGAL_AJU,
            MAX( A.NOMOR_DAFTAR) as NOMOR_DAFTAR,
            FORMAT(MAX(A.TANGGAL_DAFTAR),'yyyy-MM-dd') as TANGGAL_DAFTAR
             FROM upload_aw_detail A
            LEFT JOIN tr_bc_header B on A.NOMOR_AJU = B.NOMOR_AJU
            WHERE
            A.MAPP_SUPPLIER IS NOT NULL AND
            A.NOMOR_AJU IS NOT NULL AND
            B.NOMOR_AJU IS NOT NULL 
            
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
        $data = array(
            //'TotalRows' => $count,
            'Rows' => $rows
        );
        return json_encode($data);
    }
    function read_integrasi_binloc($param)
    {
        try {
            #ini_set('max_execution_time', 2220);
            $this->load->database();
            #$SQL_CALLSP = "EXEC GET_RECEIVING_BINLOC
            $query = "EXEC SP_PUTAWAY_WMS
            
            @VPUTAWAY_DATE='" . $param['vdate'] . "',
            @VUSERNAME='" . $param['VUSERNAME'] . "',
            @VMODULES='AUTO', 

            @VORDERBY = ?, 
            @OFFSET = ?,
            @FETCH_SIZE = ?, 
            @FILTER = ? 


            ";
            $data = array(
                '@VORDERBY' => $param['VUSERNAME'],
                '@OFFSET' => $param['header'],
                '@FETCH_SIZE' =>  $param['detail'],
                '@FILTER' => 'AUTO'
            );
            $field_property = array(
                'RECEIPT_DATE' => 'RECEIPT_DATE',
                'RECEIPT_NO' => 'RECEIPT_NO',
                'PUTAWAY_DATE' => 'PUTAWAY_DATE',
                'INVOICE_NO' => 'INVOICE_NO',
                'LOT_NO' => 'KODE_LOT',
                'ARTICLE_CODE' => 'ARTICLE_CODE',

                'PUTAWAY_RACK_ID' => 'PUTAWAY_RACK_ID',
            );

            $myFilter = '';
            $sort = '';
            #$offset = '';

            if (array_key_exists('filter', $param)) {
                $keyval = json_decode($param['filter'], true);

                foreach ($keyval as $val) {
                    $property = array_search($val["property"], $field_property);
                    $myFilter .= " AND  $property LIKE '%" . $val['value'] . "%' ";
                }
            }

            if (array_key_exists('sort', $param)) {
                $keyval = json_decode($param['sort'], true);
                $sortConditions = array();

                foreach ($keyval as $val) {
                    $sortConditions[] = $val["property"] . ' ' . $val['direction'];
                }
                $sort .= " ORDER BY " . implode(', ', $sortConditions);
            } else {
                $sort .= " ORDER BY TR_STOCK_TRANS.LOT_NO DESC ";
            }


            if (array_key_exists('limit', $param)) {
                // OFFSET 0 rows FETCH NEXT  20  rows ONLY 

                #$offset .= " OFFSET " . $param['start'] . " ROWS FETCH NEXT " . $param['limit'] . " ROWS ONLY ";
                $offset = $param['start'];
                $limit = $param['limit'];
            }
            $data['@FILTER'] =  $myFilter;
            $data['@VORDERBY'] =  $sort;
            $data['@OFFSET'] =  $offset;
            $data['@FETCH_SIZE'] =  $limit;
            #print_r($data);
            $result = $this->db->query($query, $data);
            #print $this->db->last_query();
            #die();
            $rows = $result->result_array();
            $TotalRows = $rows[0]['TOTALROWS'];
            $data = array(
                'TotalRows' => $TotalRows,
                'Rows' => $rows
            );
        } catch (Exception $x) {
            return $x->getMessage();
        }

        return json_encode($data);
    }
    function racking_select_invoice($param)
    {

        $this->load->database();
        $SQL_CALLSP = "EXEC SP_PUTAWAY_SELECT_RECEIPT_DATE ?,?
        ";
        $data = array(
            '@VMODULE' => $param['module'],
            '@VINVOICE_NO' =>  $param['INVOICE_NO']
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->row_array();


        return json_encode($row);
    }
    function create_racking_manual($param)
    {

        $this->load->database();
        $SQL_CALLSP = "EXEC SP_PUTAWAY_WMS ?,?,?,?,?,?,?,?,?
        ";
        $data = array(
            '@VPUTAWAY_DATE' => date('Y-m-d'),
            '@VUSERNAME' => $param['VUSERNAME'],
            '@VMODULES' => 'MANUAL',
            '@VORDERBY' => NULL,
            '@OFFSET' => NULL,
            '@FETCH_SIZE'  => NULL,
            '@FILTER' => '',
            '@VLOT_NO'  => $param['PICKING_LIST'],
            '@VRACK_ID' => $param['RACK_ID']
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        //print ($this->db->last_query()) ; 
        $row = $result->row_array();


        return json_encode($row);
        /*
        $this->load->database();
        $currentDate = date('Y-m-d');

        # $this->db->set('FLAG01', $param['RACK_ID']);
        $updateData = array("FLAG01" =>  $currentDate, "FLAG02" => $param['RACK_ID']);
        $this->db->where('INVOICE_NO', $param['INVOICE_NO']);
        # $this->db->update('TR_STOCK_TRANS', $updateData);

        $retMe = $this->db->update('TR_STOCK_TRANS', $updateData);

        
        if ($retMe) {
            $returnData = array(
                'success' => 'true',
                'message' => 'Racking Manual ' . $param['INVOICE_NO'] . 'success'
            );
        } else {
            $returnData = array(
                'success' => 'false',
                'message' => 'Racking Manual ' . $param['INVOICE_NO'] . 'failed '
            );
        }

        return json_encode($returnData);
        */
    }
    function read_list_source_lotno($param)
    {
        $this->load->database();
        $this->db->distinct();
        $this->db->select("
                LOT_NO 
            ,   INVOICE_NO AS CUSTOMER_INVOICE 
            ,   ISNULL(RACK_NAME, 'RECEIVING ZONE') AS CURRENT_RACK 
            ,   1 AS QTY_PICKING 
        ");
        $this->db->from('TR_STOCK_TRANS');
        $this->db->join("MST_RACK ", "FLAG02 = TABLE_ID", "LEFT");
        $this->db->where(' FLAG04 IS NULL ');

        $arr_field = array(
            'LOT_NO' => 'LOT_NO',
            'INVOICE_NO' => 'CUSTOMER_INVOICE',
            'RACK_NAME' => 'CURRENT_RACK',
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
}