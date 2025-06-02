<?php
class Mgoods_in extends CI_Model
{

    function read($param)
    {
        switch ($param["method"]) {
            case "read_list_source_bicc":
                return $this->read_list_source_bicc($param);
                break;
            case "read_list_source_portal":
                return $this->read_list_source_portal($param);
                break;
            case "read_list_source_invoice":
                //return $this->read_list_source_invoice($param);
                break;
            case "read_in":
                return $this->read_in($param);
                break;
            case "read_original":
                return $this->read_original($param);
                break;
            case "read_integrasi_binloc":
                return $this->read_integrasi_binloc($param);
                break;
            case "read_integrasi_binloc_by_invoice":
                return $this->read_integrasi_binloc_by_invoice($param);
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
            case "read_receivingdata_sumber_data":
                return $this->read_receivingdata_sumber_data($param);
                break;
            case "load_selected_invoice":
                return $this->load_selected_invoice($param);
                break;

            case "load_selected_invoice_non_source":
                return $this->load_selected_invoice_non_source($param);
                break;
            case "load_list_lotno":
                return $this->load_list_lotno($param);
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
            CASE WHEN INVOICE_NO NOT LIKE 'PLB%' THEN FLAG03 ELSE INVOICE_NO END AS INVOICE_NO, 
            INVOICE_NO AS INVOICE_NO_ALT,
            LOT_NO AS LOT_NO, 
            ARTICLE_CODE, 
            NOMOR_AJU, 
            TANGGAL_AJU, 
            NOMOR_DAFTAR, 
            TANGGAL_DAFTAR ,
            TRANS_QTY AS RECEIPT_QTY,  
            TRANS_QTY_CONVERTED AS PART_MPQ
        ");

        // $this->db->from("wh_inv_detail_aw  A");
        $this->db->from("TR_STOCK_TRANS A");
        $this->db->where("TRANS_MODULE = 'RCPT_SYNC'");
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
            'TRANS_DATE' => 'RECEIPT_DATE',
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
    function read_list_source_portal($param)
    {
        $this->load->database();
        $this->db->distinct();
        $this->db->select("
                C.KODE_INTERNAL
            ,   C.KODE_ID
            ,   A.NAMAENTITAS
			,	B.NOMORDOKUMEN AS NOMORDOKUMEN
			,	B.TANGGALDOKUMEN AS TANGGALDOKUMEN
			,	B.NOMORAJU AS NOMOR_AJU
                
        ");
        $this->db->from("DBIT_DOKUMEN  B  ");
        $this->db->join(" DBIT_ENTITAS A ", " A.NOMORAJU = B.NOMORAJU ", "LEFT");
        $this->db->join(" referensi_pemasok C ", "REPLACE(C.NAMA, 'PT. ','') = REPLACE(A.NAMAENTITAS,'PT. ','')", "LEFT");
        $this->db->where("B.NOMORAJU IS NOT NULL AND B.KODEDOKUMEN = '380' AND A.KODEENTITAS = '3'
        AND B.NOMORDOKUMEN NOT IN (SELECT DISTINCT (INVOICE_NO) FROM AW_DRAFT_TO_PLB) ");

        $arr_field = array(
            'C.KODE_INTERNAL' => 'KODE_INTERNAL',
            'C.KODE_ID' => 'KODE_ID',
            'A.NAMAENTITAS' => 'NAMAENTITAS',
            'B.NOMORAJU' => 'NOMOR_AJU',
            'B.TANGGALDOKUMEN' => 'TANGGALDOKUMEN',
            'B.NOMORDOKUMEN' => 'NOMORDOKUMEN'
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
        #print($this->db->last_query());
        $data = array(
            'TotalRows' => $count,
            'Rows' => $rows
        );
        return json_encode($data);
    }

    function read_list_source_bicc($param)
    {
        $this->load->database();
        $this->db->distinct();
        $this->db->select("
                A.VENDOR 
            ,	A.VENDOR_NAME
            ,	A.INVOICE_NO 
            ,   A.NOMOR_AJU 
            ,   FORMAT(A.TANGGAL_AJU , 'yyyy-MM-dd') as TANGGAL_AJU
            ,   FORMAT(A.TANGGAL_DAFTAR , 'yyyy-MM-dd') as TANGGAL_DAFTAR
            ,   A.NOMOR_DAFTAR
        ");
        $this->db->from("upload_aw_detail A ");
        $this->db->join("DBIT_DOKUMEN  B ", "A.INVOICE_NO = B.NOMORDOKUMEN 
        AND A.NOMOR_AJU = B.NOMORAJU", "left");
        $this->db->where("A.NOMOR_AJU IS NOT NULL AND BINLOC_RECEIPT_DETAIL_ID IS NULL ");

        $arr_field = array(
            'A.VENDOR' => 'VENDOR',
            'A.VENDOR_NAME' => 'VENDOR_NAME',
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

    function read_original($param)
    {
        $this->load->database();
        // $this->db->select("
        //     *
        // ");
        // $this->db->from("upload_".$param['module'].'_detail A');
        // $this->db->where("A.INVOICE_NO",$param['INVOICE_NO']);

        // $NOAJU = ;

        $query =
            "
            SELECT  DISTINCT
                A.[NOMOR AJU] AS 'NOMOR_AJU',
                B.[NOMOR DOKUMEN] AS 'INVOICE_NO',
                B.[TANGGAL DOKUMEN] AS 'INVOICE_DATE',
                C.[NAMA ENTITAS] AS 'VENDOR',
                A.[KODE DOKUMEN] AS 'BC_TYPE',
                A.[TANGGAL PERNYATAAN] AS 'TANGGAL_AJU',
                A.[TANGGAL DAFTAR] AS 'TANGGAL_DAFTAR',
                A.[NOMOR DAFTAR] AS 'NOMOR_DAFTAR',
                D.[SERI BARANG] AS 'SERI_BARANG',
                D.[HS] AS 'HS_CODE',
                D.[KODE BARANG] AS 'KODE_BARANG',
                CONVERT(FLOAT, D.[JUMLAH SATUAN]) AS JUMLAH_SATUAN, 
                D.[KODE SATUAN] AS KODE_SATUAN,
                *
            FROM 
                _FROM_PORTAL40_HEADER A
            LEFT JOIN _FROM_PORTAL40_DOKUMEN B ON A.[NOMOR AJU] = B.[NOMOR AJU]
            LEFT JOIN _FROM_PORTAL40_ENTITAS C ON A.[NOMOR AJU] = C.[NOMOR AJU]
            LEFT JOIN _FROM_PORTAL40_BARANG D ON A.[NOMOR AJU] = D.[NOMOR AJU]
            WHERE 
                A.[NOMOR AJU] = '" . $param['NO_AJU'] . "' 
            AND 
                B.[NOMOR DOKUMEN] = '" . $param['INVOICE_NO'] . "'
            AND B.[KODE DOKUMEN]='380' AND C.[SERI] = 3 
            ";

        // $this->db->select('*');
        // $this->db->from('_FROM_PORTAL40_HEADER');
        // $this->db->where('NOMOR AJU', $param['NO_AJU']);


        // $this->db->join('_FROM_PORTAL40_DOKUMEN B', 'A.NOMO DOKUMEN = B.column', 'left');


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

        $exec = $this->db->query($query);
        $rows = $exec->result_array();
        $data = array(
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
            case "kurir":
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
    function load_selected_invoice_non_source($param)
    {
        try {
            $retError = array(
                'success' => 'false',
                'message' => ' No Invoice selected ',
            );
            if ($param['INVOICE_NO'] == '') {
                return json_encode($retError);
            }

            $this->load->database();
            $this->db->distinct();
            $this->db->select("
					BARANG.NOMORAJU
				,	DOKUMEN.NOMORDOKUMEN
                ,   DOKUMEN.TANGGALDOKUMEN
				,	BARANG.SERIBARANG
				,	BARANG.TIPE 
				,	BARANG.KODEBARANG
				,	BARANG.URAIAN 
				,	BARANG.HS
				,	BARANG.KODESATUAN
				,	BARANG.JUMLAHSATUAN
                ,   SCANNED.ARTICLE_CODE 
                ,   SCANNED.INVOICE_NO 
                ,   SCANNED.PART_MPQ 
                ,   SUM(SCANNED.GR_QTY_CONVERTED) AS RCV_INPUT
                ,   case when ISNULL(SCANNED.NONFG,0) = 0 then '' else 'true' end as NONFG
			");
            $this->db->from(" DBIT_DOKUMEN DOKUMEN ");
            $this->db->join(" DBIT_BARANG BARANG ", "BARANG.NOMORAJU = DOKUMEN.NOMORAJU", "LEFT");
            $this->db->join(" SCAN_IN_MANUAL SCANNED", "SCANNED.INVOICE_NO = DOKUMEN.NOMORDOKUMEN AND SCANNED.SERI_BARANG=BARANG.SERIBARANG AND SCANNED.PABEAN_CODE = BARANG.KODEBARANG", "LEFT");
            $this->db->where(" DOKUMEN.NOMORDOKUMEN = '" . $param['INVOICE_NO'] . "' AND DOKUMEN.KODEDOKUMEN = '380'  ");

            $this->db->group_by(
                "
                BARANG.NOMORAJU,
                DOKUMEN.NOMORDOKUMEN,
                DOKUMEN.TANGGALDOKUMEN,
                BARANG.SERIBARANG,
                BARANG.TIPE,
                BARANG.KODEBARANG,
                BARANG.URAIAN,
                BARANG.HS,
                BARANG.KODESATUAN,
                BARANG.JUMLAHSATUAN,
                SCANNED.ARTICLE_CODE,
                SCANNED.INVOICE_NO,
                SCANNED.PART_MPQ,
                case when  ISNULL(SCANNED.NONFG,0) = 0 then '' else 'true' end
                "
            );

            $arr_field = array(
                'BARANG.NOMORAJU' => 'NOMORAJU',
                'DOKUMEN.NOMORDOKUMEN' => 'NOMORDOKUMEN',
                'DOKUMEN.TANGGALDOKUMEN' => 'TANGGALDOKUMEN',
                'BARANG.SERIBARANG' => 'SERIBARANG',
                'BARANG.TIPE ' => 'TIPE',
                'BARANG.KODEBARANG ' => 'KODEBARANG',
                'BARANG.URAIAN  ' => 'URAIAN',
                'BARANG.HS  ' => 'HS',
                'BARANG.KODESATUAN  ' => 'KODESATUAN',
                'BARANG.JUMLAHSATUAN  ' => 'JUMLAHSATUAN',
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
            #print($this->db->last_query());
            $data = array(
                'TotalRows' => $count,
                'Rows' => $rows
            );
            return json_encode($data);
        } catch (Exception $x) {
            return $x->getMessage();
        }
    }

    function load_selected_invoice($param)
    {
        try {
            $retError = array(
                'success' => 'false',
                'message' => ' No Invoice selected ',
            );
            if ($param['INVOICE_NO'] == '') {
                return json_encode($retError);
            }
            $this->load->database();
            $this->db->select(" 
                    INVOICE_NO 
                ,   ARTICLE_CODE 
                ,   STOCK_NAME  
                ,   LOT_NO 
                ,   GR_QTY_CONVERTED
                ,   GR_QTY
                ,   B.PART_MPQ
            ");
            $this->db->from(" UPLOAD_AW_DETAIL ");
            $this->db->join("mst_part_PLB B ", "(B.PART_ALIAS COLLATE DATABASE_DEFAULT)= (ARTICLE_CODE  COLLATE DATABASE_DEFAULT) ", "LEFT");
            $this->db->where("(INVOICE_NO COLLATE DATABASE_DEFAULT) ='" . $param['INVOICE_NO'] . "'");

            $arr_field = array(
                'LOT_NO' => 'LOT_NO',
                'ARTICLE_CODE' => 'ARTICLE_CODE',
                'INVOICE_NO' => 'INVOICE_NO',
                'STOCK_NAME' => 'STOCK_NAME'
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
        } catch (Exception $x) {
            return $x->getMessage();
        }

        return json_encode($data);
    }

    function read_integrasi_binloc($param)
    {
        try {
            #ini_set('max_execution_time', 2220);
            $this->load->database();
            #$SQL_CALLSP = "EXEC GET_RECEIVING_BINLOC
            $query = "exec SP_SCAN_IN_WMS
            
            @VRECEIVE_DATE='" . $param['vdate'] . "',
            @VUSERNAME='" . $param['VUSERNAME'] . "',
            @VMODULES='load', 

            @VORDERBY = ?, 
            @OFFSET = ?,
            @FETCH_SIZE = ?, 
            @FILTER = ? 


            ";
            $data = array(
                '@VORDERBY' => $param['VUSERNAME'],
                '@OFFSET' => $param['header'],
                '@FETCH_SIZE' =>  $param['detail'],
                '@FILTER' => $param['module']
            );
            $field_property = array(
                'NOMOR_AJU' => 'NOMOR_AJU',
                'TANGGAL_AJU' => 'TANGGAL_AJU',
                'INVOICE_NO' => 'INVOICE_NO',
                'PART_NAME' => 'PART_NAME',
                'LOT_NO' => 'LOT_NO',
                'NOMOR_DAFTAR' => 'NOMOR_DAFTAR',
                'TANGGAL_DAFTAR' => 'TANGGAL_DAFTAR',
                'ARTICLE_CODE' => 'ARTICLE_CODE',
                'KODE_BARANG' => 'KODE_BARANG',
                'STOCK_NAME' => 'STOCK_NAME',
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
                $sort .= " ORDER BY LOT_NO DESC ";
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
            #die($query);
            $result = $this->db->query($query, $data);
            #print($this->db->last_query());
            $rows = $result->result_array();
            #print_r($rows);
            #die();
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

    public function read_integrasi_binloc_by_invoice($param)
    {
        try {
            #ini_set('max_execution_time', 2220);
            $this->load->database();
            #$SQL_CALLSP = "EXEC GET_RECEIVING_BINLOC
            $query = "exec SP_SCAN_IN_WMS_BY_INVOICE
            
            @VINVOICENO='" . $param['VINVOICENO'] . "',
            @VUSERNAME='" . $param['VUSERNAME'] . "',
            @VMODULES='load', 

            @VORDERBY = ?, 
            @OFFSET = ?,
            @FETCH_SIZE = ?, 
            @FILTER = ? 


            ";
            $data = array(
                '@VORDERBY' => $param['VUSERNAME'],
                '@OFFSET' => $param['header'],
                '@FETCH_SIZE' =>  $param['detail'],
                '@FILTER' => $param['module']
            );
            $field_property = array(
                'NOMOR_AJU' => 'NOMOR_AJU',
                'TANGGAL_AJU' => 'TANGGAL_AJU',
                'INVOICE_NO' => 'INVOICE_NO',
                'PART_NAME' => 'PART_NAME',
                'LOT_NO' => 'LOT_NO',
                'NOMOR_DAFTAR' => 'NOMOR_DAFTAR',
                'TANGGAL_DAFTAR' => 'TANGGAL_DAFTAR',
                'ARTICLE_CODE' => 'ARTICLE_CODE',
                'KODE_BARANG' => 'KODE_BARANG',
                'STOCK_NAME' => 'STOCK_NAME',
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
                $sort .= " ORDER BY LOT_NO DESC ";
            }


            if (array_key_exists('limit', $param)) {
                $offset = $param['start'];
                $limit = $param['limit'];
            }
            $data['@FILTER'] =  $myFilter;
            $data['@VORDERBY'] =  $sort;
            $data['@OFFSET'] =  $offset;
            $data['@FETCH_SIZE'] =  $limit;

            $result = $this->db->query($query, $data);

            $rows = $result->result_array();
            $TotalRows = $rows[0]['TOTALROWS'];
            $data = array(
                'TotalRows' => $TotalRows,
                'Rows' => $rows,
                'QDebug' => $query,
            );
        } catch (Exception $x) {
            return $x->getMessage();
        }

        return json_encode($data);
    }
    /*
    public function read_integrasi_binloc_fn($param)
    {
        $this->load->database();

        $vusername = $param['VUSERNAME'];
        $vdate = $param['vdate'];
        $module = $param['module'];

        // Prepare the SQL command to execute the stored procedure
        $sql = "SELECT * FROM dbo.fn_GET_RECEIVING_BINLOC(
             ?,
             ?,
             ? ) ;";

        // Execute the stored procedure with parameters
        # $this->db->trans_start();
        #$query = $this->db->query($sql, array($vdate, $vusername, $module));
        $result = $this->db->query($sql, array($vdate, $vusername, $module));
        $row = $result->result_array();

        return json_encode($row);
        /*
        if ($query) {
            // Fetch the result rows
            $result = $query->result_array();
            // Return the result data
            return json_encode($result);
        } else {
            // Handle query execution error
            $error_message = $this->db->error()['message'];
            log_message('error', 'Error executing stored procedure: ' . $error_message);
            return false;
        }
        */
    /*}*/
    function read_integrasi_binloc_fn($param)
    {
        $this->load->database();


        $query = "
        SELECT * FROM dbo.fn_GET_RECEIVING_BINLOC('" . $param['vdate'] . "')   ";


        $field_property = array(
            'NOMOR_AJU' => 'NOMOR_AJU',
            'TANGGAL_AJU' => 'TANGGAL_AJU',
            'INVOICE_NO' => 'INVOICE_NO',
            'LOT_NO' => 'KODE_LOT',
            'NOMOR_DAFTAR' => 'NOMOR_DAFTAR',
            'TANGGAL_DAFTAR' => 'TANGGAL_DAFTAR',
            'ARTICLE_CODE' => 'ARTICLE_CODE',
            'KODE_BARANG' => 'KODE_BARANG',
            'STOCK_NAME' => 'STOCK_NAME',
        );

        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'], true);

            foreach ($keyval as $val) {
                $property = array_search($val["property"], $field_property);
                if (preg_match("/WHERE/i", $query)) {
                    $query .= " AND $property LIKE '%" . $val['value'] . "%' ";
                } else {
                    $query .= " WHERE $property LIKE '%" . $val['value'] . "%' ";
                }
            }
        }


        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'], true);
            $sortConditions = array();
            foreach ($keyval as $val) {
                $sortConditions[] = $val["property"] . ' ' . $val['direction'];
            }
            $query .= " ORDER BY " . implode(', ', $sortConditions);
        } else {
            $query .= " ORDER BY LOT_NO DESC ";
        }

        /*
        $tempdb = clone $this->db;
        $tempexec = $tempdb->query($query, false);
        $rows = $tempexec->result_array();
        $count = count($rows);
        $tempdb = '';

        if (array_key_exists('limit', $param)) {
            // OFFSET 0 rows FETCH NEXT  20  rows ONLY 

            $query .= " OFFSET " . $param['start'] . " ROWS FETCH NEXT " . $param['limit'] . " ROWS ONLY ";
        }*/
        #print $query;
        $exec = $this->db->query($query, false);
        $rows = $exec->result_array();
        $count = count($rows);


        #die($query);
        #die($this->db->last_query());
        $data = array(
            'TotalRows' => $count,
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
    function read_syncronize_binloc($param)
    {
        /* print_r($param);
        die();
        */
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_GOODS_IN_BINLOC_SYNC ?, ?, ?, ?, ?
        ";
        $data = array(
            '@VRECEIPT_DATE' => $param['RECEIPT_DATE'],
            '@VUSERNAME' => $param['VUSERNAME'],
            '@VMODULES_NAME' => $param['module'],
            '@VID_COMPANY' => $param['ID_COMPANY'],
            '@VINVOICE_NO' => NULL,
        );

        $result = $this->db->query($SQL_CALLSP, $data);
        #print $this->db->last_query();
        #die();
        // Check if the result is valid
        if ($result) {
            // Fetch the result row
            $row = $result->row_array();

            // Encode the result as JSON and return
            return json_encode($row);
        } else {
            // Error handling if the query fails
            $error = $this->db->error();
            return json_encode(array('error' => $error['message']));
        }

        #print $this->db->last_query();
        #die();
        #$row = $result->row_array();
        #print_r($result->result_array());
        #return json_encode($row);
    }
    function read_syncronize_binloc_by_invoice($param)
    {
        /* print_r($param);
        die();
        */
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_GOODS_IN_BINLOC_SYNC_BY_INVOICE ?, ?, ?, ?, ?
        ";
        $data = array(
            '@VINVOICENO' => $param['VINVOICENO'],
            '@VUSERNAME' => $param['VUSERNAME'],
            '@VMODULES_NAME' => $param['module'],
            '@VID_COMPANY' => $param['ID_COMPANY'],
            '@VINVOICE_NO' => NULL,
        );

        $result = $this->db->query($SQL_CALLSP, $data);
        # print $this->db->last_query();
        #die();
        // Check if the result is valid
        if ($result) {
            // Fetch the result row
            $row = $result->row_array();

            // Encode the result as JSON and return
            return json_encode($row);
        } else {
            // Error handling if the query fails
            $error = $this->db->error();
            return json_encode(array('error' => $error['message']));
        }

        #print $this->db->last_query();
        #die();
        #$row = $result->row_array();
        #print_r($result->result_array());
        #return json_encode($row);
    }
    function load_list_lotno($param)
    {
        $this->load->database();
        $this->db->select("
                A.NOMOR_AJU AS NOMORAJU 
            ,   A.SERI_BARANG AS SERIBARANG
            ,   A.ARTICLE_CODE AS ARTICLE_CODE 
            ,   A.PART_MPQ AS PART_MPQ
            ,   A.LOT_NO AS LOT_NO
            ,   CASE WHEN ISNULL(A.NONFG,'0')='0' THEN 'FALSE' ELSE 'TRUE' END AS NONFG 
            
        ");
        $this->db->from("SCAN_IN_MANUAL A ");
        $this->db->where("A.ARTICLE_CODE = '" . $param['ARTICLE_CODE'] . "' AND A.NOMOR_AJU ='" . $param['NOMOR_AJU'] . "' 
        AND A.SERI_BARANG='" . $param['SERIBARANG'] . "'");

        $arr_field = array(
            'A.NOMOR_AJU' => 'NOMORAJU',
            'A.SERI_BARANG' => 'SERIBARANG',
            'A.ARTICLE_CODE' => 'ARTICLE_CODE',
            'A.PART_MPQ' => 'PART_MPQ',
            'A.LOT_NO' => 'LOT_NO',
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

        #print($this->db->last_query());
        $data = array(
            'TotalRows' => $count,
            'Rows' => $rows
        );
        return json_encode($data);
    }
    function save_list_lotno($param)
    {
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_GOODS_IN_MANUAL  ?, ?, ?, ?, ?, ?";

        $data = array(
            '@VNOMORAJU' => $param['VNOMORAJU'],
            '@VRECEIVEDATE' => $param['VRECEIVEDATE'],
            '@VJSONDATA' => $param['VJSONDATA'],
            '@VMODE' => 'VMODE',
            '@VID_COMPANY' => $param['ID_COMPANY'],
            '@VUSERNAME' => $param['VUSERNAME'],
        );

        $result = $this->db->query($SQL_CALLSP, $data);
        #print($this->db->last_query());

        #print_r($result->result_array(0));
        #die();
        if ($result) {
            $row = $result->result_array();
            //$rows = count($row);
            #print_r($row);
            #print($this->db->last_query());
            #die();
            if ($row[0]['success'] == 'true') {
                $response['success'] = $row[0]['success'];
                $response['message'] = $row[0]['message'];
            } else {
                $response['success'] = $row[0]['success'];
                $response['message'] = $row[0]['message'];
            }
        } else {
            // Handle the case where the stored procedure call failed
            $response['success'] = 'false';
            $response['message'] = $this->db->error();
        }

        return json_encode($response);
    }
    function create_scan_in_manual($param)
    {
        /* print_r($param);
        die();
        */
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_GOODS_IN_BINLOC_SYNC ?, ?, ?, ?, ?
        ";
        $data = array(
            '@VRECEIPT_DATE' => $param['RECEIPT_DATE'],
            '@VUSERNAME' => $param['VUSERNAME'],
            '@VMODULES_NAME' => 'RCPT_MANUAL',
            '@VID_COMPANY' => $param['ID_COMPANY'],
            '@VINVOICE_NO' => $param['INVOICE_NO'],

        );

        $result = $this->db->query($SQL_CALLSP, $data);
        #print $this->db->last_query();
        #die();
        // Check if the result is valid
        if ($result) {
            // Fetch the result row
            $row = $result->row_array();

            // Encode the result as JSON and return
            return json_encode($row);
        } else {
            // Error handling if the query fails
            $error = $this->db->error();
            return json_encode(array('error' => $error['message']));
        }

        #print $this->db->last_query();
        #die();
        #$row = $result->row_array();
        #print_r($result->result_array());
        #return json_encode($row);
    }
    function read_list_source_portal_bicc($param)
    {
        $this->load->database();
        $this->db->distinct();
        $this->db->select("
                A.VENDOR 
            ,	A.VENDOR_NAME
            ,	A.INVOICE_NO 
            ,   A.NOMOR_AJU 
            ,   FORMAT(A.TANGGAL_AJU , 'yyyy-MM-dd') as TANGGAL_AJU
            ,   FORMAT(A.TANGGAL_DAFTAR , 'yyyy-MM-dd') as TANGGAL_DAFTAR
            ,   A.NOMOR_DAFTAR
        ");
        $this->db->from("upload_aw_detail A ");
        $this->db->join("DBIT_DOKUMEN  B ", "A.INVOICE_NO = B.NOMORDOKUMEN 
        AND A.NOMOR_AJU = B.NOMORAJU", "left");
        $this->db->where("A.NOMOR_AJU IS NOT NULL AND BINLOC_RECEIPT_DETAIL_ID IS NULL ");

        $arr_field = array(
            'A.VENDOR' => 'VENDOR',
            'A.VENDOR_NAME' => 'VENDOR_NAME',
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