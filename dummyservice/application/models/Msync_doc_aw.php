<?php
class Msync_doc_aw extends CI_Model
{

    function read($param)
    {
        switch ($param["method"]) {
            case "read_data":
                return $this->read_data($param);
                break;
            case "read_log":
                return $this->read_log($param);
                break;
            case "header_sync":
                return $this->read_header($param);
                break;
            case "read_original":
                return $this->read_original($param);
                break;
            case "read_dokumenpabean_header":
                return $this->read_dokumenpabean_header($param);
                break;
            case "read_dokumenpabean_detail":
                return $this->read_dokumenpabean_detail($param);
                break;
            case "read_dokumenpabean_lampiran":
                return $this->read_dokumenpabean_lampiran($param);
                break;
            case "read_dokumenpabean_kontainer":
                return $this->read_dokumenpabean_kontainer($param);
                break;
            case "read_dokumenpabean_kemasan":
                return $this->read_dokumenpabean_kemasan($param);
                break;
            case "read_dokumenpabean_jaminan":
                return $this->read_dokumenpabean_jaminan($param);
                break;
            case "read_dokumenpabean_tarif":
                return $this->read_dokumenpabean_tarif($param);
                break;
            case "read_receivingdata_header":
                return $this->read_receivingdata_header($param);
                break;
            case "read_receivingdata_detail":
                return $this->read_receivingdata_detail($param);
                break;
            //kebutuhan tracing pabean            
            case "mapping_listitem":
                return $this->mapping_listitem($param);
                break;
            case "read_invoice_mapping_itempart":
                return $this->read_invoice_mapping_itempart($param);
                break;

            case "read_invoice_mapping_supplier":
                return $this->read_invoice_mapping_supplier($param);
                break;

            case "read_mappingdata_supplier":
                return $this->read_mappingdata_supplier($param);
                break;
            case "read_mappingdata_part":
                return $this->read_mappingdata_part($param);
                break;
            case "read_draft_supplier":
                return $this->read_draft_supplier($param);
                break;
            case "read_draft_selectinvoice":
                return $this->read_draft_selectinvoice($param);
                break;

            default:
                return false;
        }
    }
    function read_data($param)
    {
        $this->load->database();
        $this->db->select("
            A.VENDOR,
            A.INVOICE_NO,
            FORMAT(A.INVOICE_DATE,'yyyy-MM-dd')AS INVOICE_DATE,
            A.BC_TYPE,
            A.NOMOR_AJU,
            FORMAT(A.TANGGAL_AJU,'yyyy-MM-dd') as TANGGAL_AJU,
            A.NOMOR_DAFTAR,
            FORMAT(A.TANGGAL_DAFTAR,'yyyy-MM-dd') as TANGGAL_DAFTAR,
            A.MAPP_TENANT,
            MAX(B.NAMA) as NAMA
        ");
        #$this->db->from("upload_" . $param['module'] . '_detail A');
        $this->db->from("AW_DRAFT_TO_PLB A");
        $this->db->join("referensi_pemasok B", "A.MAPP_TENANT = B.KODE_AW", "left");
        $this->db->where("A.INVOICE_NO IS NOT NULL and a.vendor is not null AND FLAG01 IS NULL  AND (A.BC_TYPE <> '27-OUT' OR A.BC_TYPE IS NULL) ");
        #$this->db->where("A.INVOICE_NO IS NOT NULL and a.vendor is not null AND  FORMAT(A.INVOICE_DATE,'yyyy-MM-dd') >'2023-11-30'  ");

        $this->db->group_by("
            A.VENDOR,
            A.INVOICE_NO,
            A.INVOICE_DATE,
            A.BC_TYPE,
            A.NOMOR_AJU,
            A.TANGGAL_AJU,
            A.NOMOR_DAFTAR,
            A.TANGGAL_DAFTAR,
            A.MAPP_TENANT
        ");

        $arr_field = array(
            'A.VENDOR' => 'OUT_DATE',
            'A.INVOICE_NO' => 'INVOICE_NO',
            "format(A.INVOICE_DATE,'yyyy-MM-dd')" => 'INVOICE_DATE',
            'A.MAPP_TENANT' => 'MAPP_TENANT',
            'A.BC_TYPE' => 'BC_TYPE',
            'A.NOMOR_AJU' => 'NOMOR_AJU',
            "format(A.TANGGAL_AJU,'yyyy-MM-dd')" => 'TANGGAL_AJU',
            'A.NOMOR_DAFTAR' => 'NOMOR_DAFTAR',
            "format(A.TANGGAL_DAFTAR,'yyyy-MM-dd')" => 'TANGGAL_DAFTAR',
        );
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'], true);
            foreach ($keyval as $key => $val) {
                $this->db->like(array_search($val['property'], $arr_field), $val['value']);
            }
        }
        switch ($param["cbo_filterkey"]) {
            case "1":
                $this->db->where("A.NOMOR_AJU is null ");
                break;

            default:
                break;
        }

        $tempdb = clone $this->db;
        $count = $tempdb->count_all_results();

        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'], $param['start']);
        }

        if (!array_key_exists('sort', $param)) {
            $this->db->order_by("INVOICE_NO desc");
        }
        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'], true);
            foreach ($keyval as $key => $val) {
                $this->db->order_by($val["property"], $val['direction']);
            }
        }

        $query = $this->db->get();
        #die($this->db->last_query());
        $rows = $query->result_array();
        #print $this->db->last_query();
        #$count = $this->db->count_all_results('', FALSE);
        #$count = $query->count_all_results();
        $data = array(
            'TotalRows' => $count,
            'Rows' => $rows
        );


        return json_encode($data);
    }
    function read_original($param)
    {
        $this->load->database();
        $this->db->select("  
                VENDOR
                , VENDOR_NAME
                , INVOICE_NO
                , INVOICE_DATE
                , FAKTUR_NO
                , FAKTUR_DATE
                , RECEIVE_NUMBER
                , RECEIVE_DATE
                , STOCK_ID
                , STOCK_NAME 
                , LOT_NO
                , SKU_NO
                , ARTICLE_CODE
                , PABEAN_CODE
                , PABEAN_NAME
                , 1 AS INVOICE_QTY
                , 0 AS GR_QTY 
                , BC_TYPE 
                , NOMOR_AJU 
                , TANGGAL_AJU 
                , NOMOR_DAFTAR 
                , TANGGAL_DAFTAR 
        ");
        $this->db->from("AW_DRAFT_TO_PLB A");
        $this->db->where("A.INVOICE_NO", $param['INVOICE_NO']);

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
    function read_log($param)
    {
        $this->load->database();
        $this->db->select("
                LOG_STATUS,
                LOG_FILENAME,
                LOG_DESCRIPTION,
                FORMAT(LOG_DATE,'yyyy-MM-dd HH:mm:ss') as LOG_DATE,
                LOG_USER
        ");
        $this->db->from("upload_log A");
        $this->db->where("A.LOG_MODULE", $param['module']);
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'], true);
            foreach ($keyval as $key => $val) {
                //$valproperty = $val["property"];
                //$key = array_search($valproperty, array_column($vdefinition, "name"));
                $this->db->like($val["property"], $val['value'], 'both');
            }
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'], true);
            foreach ($keyval as $key => $val) {
                //$valproperty = $val["property"];
                //$key = array_search($valproperty, array_column($vdefinition, "name"));
                $this->db->order_by($val["property"], $val['direction']);
            }
        }
        $this->db->order_by("A.LOG_DATE", "DESC");

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
    function sync_file($param)
    {
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_GET_INVOICE_AW_TO_PLB";
        $result = $this->db->query($SQL_CALLSP);
        $row = $result->row_array();

        return json_encode($row);
    }
    function sync_to_ceisa($param)
    {
        $this->load->database();
        $SQL_CALLSP = "EXECUTE SP_SYNC_ALL_FROM_CEISA  
        @VIDCOMPANY='AW',
        @VUSERNAME='pemiaw', 
        @VMODULE = 'aw'
        ";
        $result = $this->db->query($SQL_CALLSP);
        $row = $result->row_array();

        return json_encode($row);
    }
    function read_header($param)
    {
        $this->load->database();
        $this->db->select("
                *
        ");
        $this->db->from("upload_" . $param['module'] . '_header');
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'], true);
            foreach ($keyval as $key => $val) {
                $valproperty = $val["property"];
                $key = array_search($valproperty, array_column($vdefinition, "name"));
                $this->db->like($vdefinition[$key]["dbname"], $val['value'], 'both');
            }
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'], true);
            foreach ($keyval as $key => $val) {
                $valproperty = $val["property"];
                $key = array_search($valproperty, array_column($vdefinition, "name"));
                $this->db->order_by($vdefinition[$key]["dbname"], $val['direction']);
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
    function sync_cancel($param)
    {
        $vdata = $param["data"];
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_UPLOAD_CANCELFILE
        @VMODULE=?,
        @VDATA=?
        ";
        $data = array(
            '@VMODULE' => $param['module'],
            '@VDATA' => $vdata['FILE_ID']
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->row_array();


        return json_encode($row);
    }
    function mapping_invoice($param)
    {
        switch ($param["module"]) {
            case "aw":
                return $this->mapping_SPCALL($param, "SP_AW_SELECT_INVOICE");
                break;
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
    function mapping_listitem($param)
    {
        $this->load->database();
        $this->db->select("
            A.INVOICE_NO,
            A.INVOICE_DATE,
            A.PART_CODE,
            A.PART_NAME,
            B.PART_NO,
            B.PART_NAME,
            B.PART_DESCRIPTION,
            B.PART_UOM,
            C.NOMOR_HS,
            C.TARIF_BM,
            C.TARIF_CUKAI,
            C.TARIF_PPH,
            C.TARIF_PPN,
            C.TARIF_PPNBM
        ");
        $this->db->from("upload_" . $param['module'] . '_detail A');
        $this->db->join(" mst_part_aw B", " on A.MAPP_PARTNO = B.PART_NO", "left");
        $this->db->join(" mst_part_hs C", " on B.PART_NO = C.PART_NO AND B.ID_COMPANY = C.ID_COMPANY", "left");
        $this->db->where("
        A.MAPP_SUPPLIER is NULL ");
        if ($param['ID_COMPANY'] !== "ALL") {
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

        $this->db->order_by("A.ITEM_NUMBER", "ASC");

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
    function mapping_item_otomatis($param)
    {
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_MAPPING_ITEM_AUTO
        @VIDCOMPANY=?,
        @VUSERNAME=?,
        @VMODULE=?
        ";
        $data = array(
            '@VIDCOMPANY' => $param['ID_COMPANY'],
            '@VUSERNAME' => $param['VUSERNAME'],
            '@VMODULE' => $param['module']
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->row_array();


        return json_encode($row);
    }
    function mapping_invoice_draft($param)
    {
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_MAPPING_SAVE_INVOICE_DRAFT_AW
        @VIDCOMPANY=?,
        @VUSERNAME=?,
        @VBLNO=?,
        @VBLDATE=?,
        @VINVOICE=?,
        @VSUPPLIERNO=?
        ";
        $data = array(
            '@VIDCOMPANY' => $param['ID_COMPANY'],
            '@VUSERNAME' => $param['VUSERNAME'],
            '@VBLNO' => $param['blno'],
            '@VBLDATE' => $param['bldate'],
            '@VINVOICE' => $param['invoice'],
            '@VSUPPLIERNO' => $param['supplierno']
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->row_array();


        return json_encode($row);
    }
    function sync_nomoraju($param)
    {
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_SYNC_AJU_AW
        @VIDCOMPANY=?,
        @VUSERNAME=?
        ";
        $data = array(
            '@VIDCOMPANY' => $param['ID_COMPANY'],
            '@VUSERNAME' => $param['VUSERNAME']
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->row_array();


        return json_encode($row);
    }
    function read_invoice_mapping_supplier($param)
    {
        $this->load->database();
        $this->db->select("
            A.VENDOR,
            A.INVOICE_NO,
            A.INVOICE_DATE
        ");
        $this->db->from("upload_aw_detail A");
        $this->db->where("
        A.MAPP_SUPPLIER is NULL OR
        A.MAPP_SUPPLIER =''
        ");

        $this->db->group_by("
            A.VENDOR,
            A.INVOICE_NO,
            A.INVOICE_DATE
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
        //$count= $query->count_all_results();
        $data = array(
            'TotalRows' => $count,
            'Rows' => $rows
        );
        return json_encode($data);
    }
    function sync_automapping_supplier($param)
    {
        $this->load->database();
        $this->db->simple_query("
                UPDATE 
                upload_aw_detail
                SET 
                upload_aw_detail.MAPP_SUPPLIER = B.MAPP_SUPPLIER
                FROM 
                upload_aw_detail A
                LEFT JOIN 
                (
                    SELECT VENDOR,MAPP_SUPPLIER FROM upload_aw_detail A
                    WHERE
                    A.VENDOR IN (
                    SELECT 
                    A.VENDOR
                        FROM upload_aw_detail A
                    WHERE
                    A.MAPP_SUPPLIER is NULL OR
                    A.MAPP_SUPPLIER =''
                    GROUP BY
                    A.VENDOR ) 
                    AND A.MAPP_SUPPLIER is NOT NULL 
                    AND A.MAPP_SUPPLIER <>''
                    GROUP BY
                    VENDOR,MAPP_SUPPLIER
                ) B
                    ON A.VENDOR = B.VENDOR
                WHERE 
                A.MAPP_SUPPLIER is NULL OR
                A.MAPP_SUPPLIER =''
        ");

        $data = array(
            'success' => 'true',
            'message' => 'Auto Mapping Supplier Selesai'
        );
        return json_encode($data);
    }

    function sync_manualmapping_supplier($param)
    {
        $this->load->database();
        $this->db->simple_query("
                update upload_aw_detail set
                mapp_supplier='" . $param['KODE_INTERNAL'] . "'
                where
                VENDOR='" . $param['VENDOR'] . "' AND 
                (MAPP_SUPPLIER IS NULL OR MAPP_SUPPLIER='')
        ");
        $data = array(
            'success' => 'true',
            'message' => 'Manual Mapping Supplier Selesai'
        );
        return json_encode($data);
    }
    function read_invoice_mapping_itempart($param)
    {
        $this->load->database();
        $this->db->select("
            MAX(A.VENDOR) as VENDOR,
            MAX(A.INVOICE_NO) as INVOICE_NO,
            A.PART_CODE ,
            A.PART_NUMBER ,
            A.PART_UNIT 
        ");
        $this->db->from("upload_" . $param['module'] . '_detail A');
        $this->db->where("
            (A.MAPP_PARTNO is NULL OR
            A.MAPP_PARTNO ='')
        ");

        $this->db->group_by("
            A.PART_CODE,
            A.PART_NUMBER,
            A.PART_UNIT
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

        /*print $this->db->last_query();
        exit();*/
        $rows = $query->result_array();
        //$count= $query->count_all_results();
        $data = array(
            'TotalRows' => $count,
            'Rows' => $rows
        );
        return json_encode($data);
    }
    function sync_manualmapping_itempart($param)
    {
        $this->load->database();
        $this->db->simple_query("
                update upload_aw_detail set
                MAPP_PARTNO='" . $param['PART_NO'] . "'
                where
                PART_CODE='" . $param['PART_CODE'] . "' AND 
                (MAPP_PARTNO IS NULL OR MAPP_PARTNO='')
        ");
        $data = array(
            'success' => 'true',
            'message' => 'Manual Mapping Item/Part Material Selesai'
        );
        return json_encode($data);
    }
    function sync_automapping_itempart($param)
    {
        $this->load->database();
        $this->db->simple_query("
                UPDATE 
                    upload_aw_detail
                SET 
                    upload_aw_detail.MAPP_PARTNO = B.PART_NO
                FROM 
                    upload_aw_detail A
                LEFT JOIN
                    mst_part_aw B 
                        on 
                        A.PART_CODE = B.PART_NO AND PART_NAME = PART_NUMBER 
                WHERE 
                    (A.MAPP_PARTNO ='' OR A.MAPP_PARTNO is NULL)
                    AND 
                    (B.PART_NAME <> '' OR B.PART_NAME IS NOT NULL )
        ");

        $data = array(
            'success' => 'true',
            'message' => 'Auto Mapping ITEM Selesai'
        );
        return json_encode($data);
    }
    function sync_get_from_ceisa($param)
    {
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_SYNC_BCIN_FROM_CEISA
        @VIDCOMPANY=?,
        @VUSERNAME=?,
        @VMODULE=?,
        @VINVOICE_NO=?
        ";
        $data = array(
            '@VIDCOMPANY' => $param['ID_COMPANY'],
            '@VUSERNAME' => $param['VUSERNAME'],
            '@VMODULE' => $param['module'],
            '@VINVOICE_NO' => $param['INVOICE_NO']
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->row_array();


        return json_encode($row);
    }
    function read_dokumenpabean_header($param)
    {

        $this->load->database();
        $this->db->select("
        A.*
        ");
        $this->db->from("DBIT_HEADER A");

        $this->db->where("
        A.NOMORAJU= (select TOP 1 NOMOR_AJU 
        from 
            AW_DRAFT_TO_PLB 
        where 
            INVOICE_NO='" . $param['INVOICE_NO'] . "'
        and 
            NOMOR_AJU='" . $param['NOMOR_AJU'] . "'
        )");

        $query = $this->db->get();
        $rows = $query->row_array();

        $data = array();
        if ($query->num_rows() > 0) {
            foreach ($rows as $x => $val) {
                $data[] = array(
                    'FIELDNAME' => $x,
                    'VALUENAME' => $val
                );
            }
        }

        return json_encode($data);
    }
    function read_dokumenpabean_detail($param)
    {
        $this->load->database();
        $this->db->select("
        A.*
        ");
        $this->db->from("DBIT_BARANG A");
        $this->db->where("
            A.NOMORAJU = (
            select 
                TOP 1 A.NOMORAJU 
            from 
                DBIT_BARANG A

            left join DBIT_DOKUMEN B on A.NOMORAJU = B.NOMORAJU

            where 
                B.NOMORDOKUMEN='" . $param['INVOICE_NO'] . "'
            and 
                A.NOMORAJU='" . $param['NOMOR_AJU'] . "'
        )");

        // $this->db->where("
        // A.ID_HEADER = (
        //     Select TOP 1 ID_HEADER_ORI from tr_bc_header 
        //     where 
        //     NOMOR_AJU IN (
        //         select A.NOMOR_AJU from upload_aw_detail A where A.INVOICE_NO='".$param['INVOICE_NO']."' group by A.NOMOR_AJU 
        //     )
        //     group by 
        //     ID_HEADER_ORI
        // )
        // ");

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
    function read_dokumenpabean_lampiran($param)
    {
        $this->load->database();
        $this->db->select("
            A.*
        ");
        $this->db->from("DBIT_DOKUMEN A");
        $this->db->where('A.NOMORDOKUMEN', $param['INVOICE_NO']);
        $this->db->where('A.NOMORAJU', $param['NOMOR_AJU']);


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
    function read_dokumenpabean_kontainer($param)
    {
        $this->load->database();
        $this->db->select("
            NOMORAJU,
            SERI,
            NOMORKONTINER AS NOMOR_KONTAINER,
            KODEUKURANKONTAINER AS KODE_UKURAN_KONTAINER,
            KODEJENISKONTAINER AS KODE_JENIS_KONTAINER,
            KODETIPEKONTAINER AS KODE_TIPE_KONTAINER,
            ID_HEADER,
            SERI_BARANG,
            TRANSID,
            REF_TRANSID
        ");
        $this->db->from("DBIT_KONTAINER A");
        $this->db->where("
            A.NOMORAJU = (
            select 
                TOP 1 A.NOMORAJU 
            from 
                DBIT_KONTAINER A

            left join DBIT_DOKUMEN B on A.NOMORAJU = B.NOMORAJU

            where 
                B.NOMORDOKUMEN='" . $param['INVOICE_NO'] . "'
            and 
                A.NOMORAJU='" . $param['NOMOR_AJU'] . "'
        )");


        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
            'Rows' => $rows
        );
        return json_encode($data);
    }
    function read_dokumenpabean_kemasan($param)
    {
        $this->load->database();
        $this->db->select("
        A.*
        ");
        $this->db->from("DBIT_KEMASAN A");
        $this->db->where("
            A.NOMORAJU = (
            select 
                TOP 1 A.NOMORAJU 
            from 
                DBIT_KEMASAN A

            left join DBIT_DOKUMEN B on A.NOMORAJU = B.NOMORAJU

            where 
                B.NOMORDOKUMEN='" . $param['INVOICE_NO'] . "'
            and 
                A.NOMORAJU='" . $param['NOMOR_AJU'] . "'
        )");


        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
            'Rows' => $rows
        );
        return json_encode($data);
    }
    function read_dokumenpabean_jaminan($param)
    {
        $this->load->database();
        $this->db->select("
        *
        ");
        $this->db->from("DBIT_JAMINAN A");
        $this->db->where("
            A.NOMORAJU = (
            select 
                TOP 1 A.NOMORAJU 
            from 
                DBIT_JAMINAN A

            left join DBIT_DOKUMEN B on A.NOMORAJU = B.NOMORAJU

            where 
                B.NOMORDOKUMEN='" . $param['INVOICE_NO'] . "'
            and 
                A.NOMORAJU='" . $param['NOMOR_AJU'] . "'
        )");


        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
            'Rows' => $rows
        );
        return json_encode($data);
    }
    function read_dokumenpabean_tarif($param)
    {
        $this->load->database();
        $this->db->select("
            A.*
        ");
        $this->db->from("DBIT_BARANGTARIF A");
        $this->db->where("
            A.NOMORAJU = (
            select 
                TOP 1 A.NOMORAJU 
            from 
                DBIT_BARANGTARIF A

            left join DBIT_DOKUMEN B on A.NOMORAJU = B.NOMORAJU

            where 
                B.NOMORDOKUMEN='" . $param['INVOICE_NO'] . "'
            and 
                A.NOMORAJU='" . $param['NOMOR_AJU'] . "'
        )");


        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
            'Rows' => $rows
        );
        return json_encode($data);
    }

    function read_mappingdata_supplier($param)
    {
        $this->load->database();
        $this->db->select("
        A.VENDOR,
        A.INVOICE_NO,
        A.INVOICE_DATE,
        B.KODE_INTERNAL,
        B.NAMA,
        B.ALAMAT,
        B.NPWP,
        B.KODE_NEGARA,
        B.KODE_AW,
        B.KODE_LP
        ");
        $this->db->from("AW_DRAFT_TO_PLB A");
        $this->db->join("referensi_pemasok B ", "A.MAPP_TENANT = B.KODE_INTERNAL", "left");
        $this->db->where("A.INVOICE_NO", $param['INVOICE_NO']);
        $this->db->group_by("
            A.VENDOR,
            A.INVOICE_NO,
            A.INVOICE_DATE,
            B.KODE_INTERNAL,
            B.NAMA,
            B.ALAMAT,
            B.NPWP,
            B.KODE_NEGARA,
            B.KODE_AW,
            B.KODE_LP
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

    function read_mappingdata_part($param)
    {
        $this->load->database();
        $this->db->select("
        A.ARTICLE_CODE AS ARTICLE_CODE,
        A.STOCK_NAME,
        A.GR_QTY AS ARRIV_PLAN_NUMBER,
        'COIL' AS UOM,

        B.PART_ALIAS AS MST_ARTICLE,
        B.PART_DESCRIPTION AS PART_NAME,
        B.PART_ALIAS AS ALIAS,
        B.PART_TYPE AS TYPE,
        B.PART_MPQ AS MPQ
        
        ");
        $this->db->from("AW_DRAFT_TO_PLB A");
        $this->db->join("MST_PART_PLB B ", "(A.MAPP_GOODS COLLATE DATABASE_DEFAULT) = (B.PART_ALIAS COLLATE DATABASE_DEFAULT)", "left");

        $this->db->where("A.INVOICE_NO", $param['INVOICE_NO']);

        $arr_field = array(

            'A.ARTICLE_CODE' => 'ARTICLE_CODE',
            'A.STOCK_NAME' => 'STOCK_NAME',
            'B.PART_DESCRIPTION' => 'PART_NAME',
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
            'Rows' => $rows,
            'QUERY' => $this->db->last_query()
        );
        $tempdb = '';
        return json_encode($data);
    }

    function read_draft_supplier($param)
    {
        $this->load->database();
        $this->db->select("
            A.VENDOR,
            ISNULL(A.MAPP_SUPPLIER,'#######################################') AS MAPP_SUPPLIER,
            ISNULL(B.NAMA, '#######################################') AS NAMA,
            ISNULL(B.ALAMAT, '#######################################') AS ALAMAT,
            ISNULL(B.KODE_NEGARA, '#######################################') AS KODE_NEGARA,
            ISNULL(C.URAIAN_NEGARA, '#######################################') AS URAIAN_NEGARA,
            B.NPWP
        ");
        $this->db->from("upload_" . $param['module'] . '_detail A');
        $this->db->join("referensi_pemasok B", "A.MAPP_SUPPLIER = B.KODE_INTERNAL", "left");
        $this->db->join("referensi_negara C", "B.KODE_NEGARA = C.KODE_NEGARA", "left");
        $this->db->where("
            A.NOMOR_DAFTAR IS NULL
        ");

        $this->db->group_by("
            A.VENDOR,
            A.MAPP_SUPPLIER,
            B.NAMA,
            B.ALAMAT,
            B.KODE_NEGARA,
            C.URAIAN_NEGARA,
            B.NPWP
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
        //$count= $query->count_all_results();
        $data = array(
            'Rows' => $rows
        );
        return json_encode($data);
    }
    function read_draft_selectinvoice($param)
    {
        $this->load->database();
        $this->db->select("
            A.INVOICE_NO,
            A.INVOICE_DATE,
            A.CURRENCY AS CURRENT_MONEY,
            A.CARA_BAYAR,
            '' AS BL_NO,
            '' AS BL_DATE, 
            A.NO_ORI AS NO_KED

        
        ");
        $this->db->from("upload_" . $param['module'] . '_detail A');
        $this->db->where("
            A.NOMOR_DAFTAR IS NULL AND 
            A.MAPP_SUPPLIER='" . $param['KODE_INTERNAL'] . "'
             
        ");

        $this->db->group_by("
            A.INVOICE_NO,
            A.INVOICE_DATE,
            A.CURRENCY,
            A.CARA_BAYAR,
            A.NO_ORI
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
        //$count= $query->count_all_results();
        $data = array(
            'Rows' => $rows
        );
        return json_encode($data);
    }

    function SP_AW_DRAFT_SELECT_INVOICE($param)
    {
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_AW_DRAFT_SELECT_INVOICE
        @VIDCOMPANY=?,
        @VUSERNAME=?,
        @VINVOICE=?,
        @VVENDOR=?
        ";
        $data = array(
            '@VIDCOMPANY' => $param['ID_COMPANY'],
            '@VUSERNAME' => $param['VUSERNAME'],
            '@VINVOICE' => $param['invoice'],
            '@VDATA' => $param['vendor']
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->row_array();


        return json_encode($row);
    }

    function proses_save_dokumen_draft($param)
    {
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_AW_CREATE_DOKUMEN_DRAFT
        @VIDCOMPANY=?,
        @VUSERNAME=?,
        @VHEADER=?,
        @VDOKUMEN=?,
        @VKONTAINER=?,
        @VKEMASAN=?
        ";
        $data = array(
            '@VIDCOMPANY' => $param['ID_COMPANY'],
            '@VUSERNAME' => $param['VUSERNAME'],
            '@VHEADER' => $param['header'],
            '@VDOKUMEN' => $param['dokumen'],
            '@VKONTAINER' => $param['vdraft_kontainer'],
            '@VKEMASAN' => $param['vdraft_kemasan'],
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->row_array();


        return json_encode($row);
    }
    function read_receivingdata_header($param)
    {

        $this->load->database();
        $this->db->distinct();
        $this->db->select("
                A.TRANS_NO
            ,   A.TRANS_DATE  
            ,   A.INVOICE_NO
            ,   A.ARTICLE_CODE
            ,   A.INVOICE_QTY AS QTY_INVOICE
            ,   COUNT(LOT_NO) AS QTY_RECEIVED 
        ");
        $this->db->from("TR_STOCK_TRANS A");

        $this->db->where("
        (INVOICE_NO  COLLATE DATABASE_DEFAULT) = '" . $param['INVOICE_NO'] . "'  
        ");
        $this->db->group_by(
            '
                A.TRANS_NO
              , A.TRANS_DATE
              , A.INVOICE_NO
              , A.INVOICE_QTY
              , A.ARTICLE_CODE
            
            '
        );

        $arr_field = array(

            'A.TRANS_NO' => 'TRANS_NO',
            'A.TRANS_DATE' => 'TRANS_DATE',
            'B.INVOICE_QTY' => 'QTY_INVOICE',
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
                A.TRANS_NO
            ,   A.TRANS_DATE  
            ,   A.INVOICE_NO 
            ,   A.ARTICLE_CODE 
            ,   B.PART_NO
            ,   A.LOT_NO
            ,   B.PART_MPQ AS QTY_RECEIVED
            ,   A.INVOICE_QTY AS QTY_INVOICE
            ,   C.RACK_NAME AS CURRENT_RACK 
        ");
        $this->db->from("TR_STOCK_TRANS A");
        $this->db->join('MST_PART_PLB B ', '(A.ARTICLE_CODE COLLATE DATABASE_DEFAULT)= (B.PART_ALIAS COLLATE DATABASE_DEFAULT)', 'left');
        $this->db->join('MST_RACK C ', 'A.FLAG02 = C.RACK_ID', 'left');

        $this->db->where("
        A.INVOICE_NO = '" . $param['INVOICE_NO'] . "'  
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
}