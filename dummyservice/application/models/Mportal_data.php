<?php
class Mportal_data extends CI_Model
{
    public function __construct()
    {

        parent::__construct();
        // $this->db->_protect_identifiers = FALSE;


    }

    function read($param)
    {
        switch ($param["method"]) {
            case "read_data":
                return $this->read_data($param);
                break;
            case "read_data_plb":
                return $this->read_data_plb($param);
                break;
            case "read_original":
                return $this->read_original($param);
                break;
            case "read_mappingdata_supplier_plb":
                return $this->read_mappingdata_supplier_plb($param);
                break;
            case "read_mappingdata_supplier":
                return $this->read_mappingdata_supplier($param);
                break;
            case "read_mappingdata_part":
                return $this->read_mappingdata_part($param);
                break;
            case "read_mappingdata_part_plb":
                return $this->read_mappingdata_part_plb($param);
                break;
            case "read_receivingdata_header":
                return $this->read_receivingdata_header($param);
                break;
            case "read_receivingdata_detail":
                return $this->read_receivingdata_detail($param);
                break;
                //kebutuhan tracing pabean
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

            case "read_dokumenpabean_pungutan":
                return $this->read_dokumenpabean_pungutan($param);
                break;
                //kebutuhan tracing pabean
            case "read_dokumenceisa_header":
                return $this->read_dokumenceisa_header($param);
                break;
            case "read_dokumenceisa_detail":
                return $this->read_dokumenceisa_detail($param);
                break;
            case "read_dokumenceisa_lampiran":
                return $this->read_dokumenceisa_lampiran($param);
                break;
            case "read_invoice_mapping_supplier":
                return $this->read_invoice_mapping_supplier($param);
                break;
            case "read_invoice_mapping_itempart":
                return $this->read_invoice_mapping_itempart($param);
                break;
            case "sync_manualmapping_itempart":
                return $this->sync_manualmapping_itempart($param);
                break;
            case "sync_automapping_itempart":
                return $this->sync_automapping_itempart($param);
                break;
            case "read_draft_supplier":
                return $this->read_draft_supplier($param);
                break;
            case "read_draft_selectinvoice":
                return $this->read_draft_selectinvoice($param);
                break;



            case "read_log":
                return $this->read_log($param);
                break;
            case "header_sync":
                return $this->read_header($param);
                break;
            case "mapping_listitem":
                return $this->mapping_listitem($param);
                break;
            case "read_upload_form":
                return $this->read_upload_form($param);
                break;
            case "read_upload_form_aw":
						$data =['ISINTERNAL' => '0']; 
						$param = array_merge($param, $data) ; 
					 #$data = ['ISINTERNAL' => '0', 'VUSERNAME' =>$param['VUSERNAME'] , 'ID_COMPANY' =>$param['ID_COMPANY'] ]; 
                return $this->read_upload_form($param);
                break;
            case "read_upload_form_plb":
						$data =['ISINTERNAL' => '1']; 
						$param = array_merge($param, $data) ; 
					  #$data = ['ISINTERNAL' => '1', 'VUSERNAME' =>$param['VUSERNAME'] , 'ID_COMPANY' =>$param['ID_COMPANY'] ]; 
                return $this->read_upload_form($param);
                break;
				case "uploadfile" : 
					return $this->uploadfile($param) ; 
				break ;
            default:
                return false;
        }
    }

    function read_data_plb($param)
    {
        //
        // $this->db->protect_identifiers = FALSE;

        $this->load->database();

        // start custom query 
        $query = "  SELECT DISTINCT 
        B.NAMAENTITAS AS VENDOR,
                    C.NOMORDOKUMEN AS INVOICE_NO,
                    FORMAT(C.TANGGALDOKUMEN, 'yyyy-MM-dd') AS INVOICE_DATE,
                    A.KODEDOKUMEN AS BC_TYPE,
                    A.NOMORAJU AS NOMOR_AJU,
                    FORMAT(A.TANGGALPERNYATAAN, 'yyyy-MM-dd') AS TANGGAL_AJU,
                    A.NOMORDAFTAR AS NOMOR_DAFTAR,
                    FORMAT(A.TANGGALDAFTAR, 'yyyy-MM-dd') AS TANGGAL_DAFTAR,
                    B.MAPP_SUPPLIER,
                    CASE WHEN B.MAPP_SUPPLIER IS NULL THEN '' ELSE B.NAMAENTITAS END  AS NAMA,
                    D.[NOMOR AJU]
                                
        FROM DBIT_HEADER A 
        LEFT JOIN DBIT_ENTITAS B ON A.NOMORAJU = B.NOMORAJU 
        LEFT JOIN DBIT_DOKUMEN C ON A.NOMORAJU = C.NOMORAJU 
        LEFT JOIN _FROM_PORTAL40_HEADER D ON D.[NOMOR AJU] = A.NOMORAJU
        
        WHERE C.KODEDOKUMEN = '380'
        AND A.KODEDOKUMEN IN ('27', '25', '41') 
        /*AND C.NOMORDOKUMEN LIKE '%AX%' */
        /*AND (B.SERI = 3 AND isnull(B.MAPP_SUPPLIER, 'SUP0022') <> 'SUP0022' ) */
        AND  ((B.SERI= 1 AND ISNULL(B.MAPP_SUPPLIER, 'SUP0022') = 'SUP0022') 
        OR( B.SERI = 3 AND B.MAPP_SUPPLIER ='SUP0022' ))
        ";

        switch ($param["cbo_filterkey"]) {
            case "1":
                $query .= " AND A.FLAG_MODE IS NULL ";
                break;
            default:
                break;
        }
        $field_property = array(
            'B.NAMAENTITAS' => 'VENDOR',
            'C.NOMORDOKUMEN' => 'INVOICE_NO',
            "FORMAT(C.TANGGALDOKUMEN, 'yyyy-MM-dd')" => 'INVOICE_DATE',
            'A.NOMORAJU' => 'NOMOR_AJU',
            'A.KODEDOKUMEN' => 'BC_TYPE',
            'A.NOMORDAFTAR' => 'NOMOR_DAFTAR',
            "FORMAT(A.TANGGALPERNYATAAN, 'yyyy-MM-dd')" => 'TANGGAL_AJU',
            "FORMAT(A.TANGGALDAFTAR, 'yyyy-MM-dd')" => 'TANGGAL_DAFTAR'
        );

        // parse the Filter from grid [filter plugin] 
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'], true);
            // dispatch and rebuilt the filter ...
            foreach ($keyval as $val) {
                $property = array_search($val["property"], $field_property);
                if (preg_match("/WHERE/i", $query)) {
                    $query .= " AND $property LIKE '%" . $val['value'] . "%' ";
                } else {
                    $query .= " WHERE $property LIKE '%" . $val['value'] . "%' ";
                }
            }
        }

        $query .= " 
        GROUP BY 
        B.NAMAENTITAS,
        C.NOMORDOKUMEN,
        C.TANGGALDOKUMEN,
        A.KODEDOKUMEN,
        A.NOMORAJU,
        A.TANGGALPERNYATAAN,
        A.NOMORDAFTAR,
        A.TANGGALDAFTAR,
        B.MAPP_SUPPLIER, 
        D.[NOMOR AJU] 
        ";

        // ---- query end here ---- //

        /* ----------- start paging ----------- */
        // parse the sorting from grid [sort  button]
        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'], true);
            $sortConditions = array();
            foreach ($keyval as $val) {
                $sortConditions[] = $val["property"] . ' ' . $val['direction'];
            }
            $query .= " ORDER BY " . implode(', ', $sortConditions);
        } else {
            $query .= " ORDER BY TANGGAL_DAFTAR DESC ";
        }

        // ini penting nih...  counter for paging ...
        // kek nyari upil... 
        $tempdb = clone $this->db;
        $tempexec = $tempdb->query($query, false);
        $rows = $tempexec->result_array();
        $count = count($rows);
        // reset $tempdb, avoiding counter total page miscounted 
        $tempdb = '';


        // OFFSETING THE PAGE(S), pagging goes here ...
        if (array_key_exists('limit', $param)) {
            // OFFSET 0 rows FETCH NEXT  20  rows ONLY 

            $query .= " OFFSET " . $param['start'] . " ROWS FETCH NEXT " . $param['limit'] . " ROWS ONLY ";
        }
        /* ----------- end paging ----------- */


        // execute the package(s) 
        #print $query;
        $exec = $this->db->query($query, false);
        $rows = $exec->result_array();

        #die($this->db->last_query());
        $data = array(
            'TotalRows' => $count,
            'Rows' => $rows
        );


        // return 
        return json_encode($data);
    }
    function read_data($param)
    {
        //
        // $this->db->protect_identifiers = FALSE;

        $this->load->database();

        // start custom query 
        $query = "  SELECT DISTINCT 
        B.NAMAENTITAS AS VENDOR,
                    C.NOMORDOKUMEN AS INVOICE_NO,
                    FORMAT(C.TANGGALDOKUMEN, 'yyyy-MM-dd') AS INVOICE_DATE,
                    A.KODEDOKUMEN AS BC_TYPE,
                    A.NOMORAJU AS NOMOR_AJU,
                    FORMAT(A.TANGGALPERNYATAAN, 'yyyy-MM-dd') AS TANGGAL_AJU,
                    A.NOMORDAFTAR AS NOMOR_DAFTAR,
                    FORMAT(A.TANGGALDAFTAR, 'yyyy-MM-dd') AS TANGGAL_DAFTAR,
                    B.MAPP_SUPPLIER,
                    CASE WHEN B.MAPP_SUPPLIER IS NULL THEN '' ELSE B.NAMAENTITAS END  AS NAMA,
                    D.[NOMOR AJU]
                                
        FROM DBIT_HEADER A 
        LEFT JOIN DBIT_ENTITAS B ON A.NOMORAJU = B.NOMORAJU 
        LEFT JOIN DBIT_DOKUMEN C ON A.NOMORAJU = C.NOMORAJU 
        LEFT JOIN _FROM_PORTAL40_HEADER D ON D.[NOMOR AJU] = A.NOMORAJU
        
        WHERE C.KODEDOKUMEN = '380'
        AND A.KODEDOKUMEN IN ('27', '25', '41') 
        /*AND C.NOMORDOKUMEN LIKE '%AX%' */
        AND (B.SERI = 1 AND B.MAPP_SUPPLIER ='SUP0022' OR B.NAMAENTITAS LIKE '%SEIWA%') 
        /*OR( B.SERI = 3 AND B.MAPP_SUPPLIER ='SUP0022' )*/
        ";

        switch ($param["cbo_filterkey"]) {
            case "1":
                $query .= " AND A.FLAG_MODE IS NULL ";
                break;
            default:
                break;
        }
        $field_property = array(
            'B.NAMAENTITAS' => 'VENDOR',
            'C.NOMORDOKUMEN' => 'INVOICE_NO',
            "FORMAT(C.TANGGALDOKUMEN, 'yyyy-MM-dd')" => 'INVOICE_DATE',
            'A.NOMORAJU' => 'NOMOR_AJU',
            'A.KODEDOKUMEN' => 'BC_TYPE',
            'A.NOMORDAFTAR' => 'NOMOR_DAFTAR',
            "FORMAT(A.TANGGALPERNYATAAN, 'yyyy-MM-dd')" => 'TANGGAL_AJU',
            "FORMAT(A.TANGGALDAFTAR, 'yyyy-MM-dd')" => 'TANGGAL_DAFTAR'
        );

        // parse the Filter from grid [filter plugin] 
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'], true);
            // dispatch and rebuilt the filter ...
            foreach ($keyval as $val) {
                $property = array_search($val["property"], $field_property);
                if (preg_match("/WHERE/i", $query)) {
                    $query .= " AND $property LIKE '%" . $val['value'] . "%' ";
                } else {
                    $query .= " WHERE $property LIKE '%" . $val['value'] . "%' ";
                }
            }
        }

        $query .= " 
        GROUP BY 
        B.NAMAENTITAS,
        C.NOMORDOKUMEN,
        C.TANGGALDOKUMEN,
        A.KODEDOKUMEN,
        A.NOMORAJU,
        A.TANGGALPERNYATAAN,
        A.NOMORDAFTAR,
        A.TANGGALDAFTAR,
        B.MAPP_SUPPLIER, 
        D.[NOMOR AJU] 
        ";

        // ---- query end here ---- //

        /* ----------- start paging ----------- */
        // parse the sorting from grid [sort  button]
        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'], true);
            $sortConditions = array();
            foreach ($keyval as $val) {
                $sortConditions[] = $val["property"] . ' ' . $val['direction'];
            }
            $query .= " ORDER BY " . implode(', ', $sortConditions);
        } else {
            $query .= " ORDER BY TANGGAL_DAFTAR DESC ";
        }

        // ini penting nih...  counter for paging ...
        // kek nyari upil... 
        $tempdb = clone $this->db;
        $tempexec = $tempdb->query($query, false);
        $rows = $tempexec->result_array();
        $count = count($rows);
        // reset $tempdb, avoiding counter total page miscounted 
        $tempdb = '';


        // OFFSETING THE PAGE(S), pagging goes here ...
        if (array_key_exists('limit', $param)) {
            // OFFSET 0 rows FETCH NEXT  20  rows ONLY 

            $query .= " OFFSET " . $param['start'] . " ROWS FETCH NEXT " . $param['limit'] . " ROWS ONLY ";
        }
        /* ----------- end paging ----------- */


        // execute the package(s) 
        #print $query;
        $exec = $this->db->query($query, false);
        $rows = $exec->result_array();

        #die($this->db->last_query());
        $data = array(
            'TotalRows' => $count,
            'Rows' => $rows
        );


        // return 
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
        switch ($param["module"]) {
            case "coo":
                return $this->sync_SPCALL($param['ID_COMPANY'] === 'WH' ? "SP_UPLOAD_COO_WH" : "SP_UPLOAD_COO_AW");
                break;
            case "coo_aju":
                return $this->sync_SPCALL($param['ID_COMPANY'] === 'WH' ? "SP_UPLOAD_COO_WH" : "SP_UPLOAD_COO_AW");
                break;
            case "molts":
                return $this->sync_SPCALL($param['ID_COMPANY'] === 'WH' ? "SP_UPLOAD_MOLTS_WH" : "SP_UPLOAD_MOLTS_AW");
                break;
            case "read_log":
                return $this->read_log($param);
                break;
            default:
                return false;
        }
    }
    function sync_nomoraju($param)
    {
        switch ($param["module"]) {
            case "coo":
                $this->load->database();
                $SQL_CALLSP = "EXEC SP_SYNC_AJU_COO";
                $result = $this->db->query($SQL_CALLSP);
                $row = $result->row_array();
                return json_encode($row);
            case "coo_aju":
                return $this->sync_SPCALL($param['ID_COMPANY'] === 'WH' ? "SP_UPLOAD_COO_WH" : "SP_UPLOAD_COO_AW");
                break;
            case "molts":
                return $this->sync_SPCALL($param['ID_COMPANY'] === 'WH' ? "SP_UPLOAD_MOLTS_WH" : "SP_UPLOAD_MOLTS_AW");
                break;
            case "read_log":
                return $this->read_log($param);
                break;
            default:
                return false;
        }
    }
    function sync_SPCALL($param)
    {
        $this->load->database();
        $SQL_CALLSP = "EXEC " . $param;
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
            case "coo":
                return $this->mapping_SPCALL($param, "SP_COO_SELECT_INVOICE");
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
            A.ITEM_NUMBER,
            A.DESCRIPTION,
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
        $this->db->join(" mst_part B", " on A.MAPP_PARTNO = B.PART_NO", "left");
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
        $SQL_CALLSP = "EXEC SP_MAPPING_SAVE_INVOICE_DRAFT_COO
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
            /*AND 
                C.[NAMA ENTITAS] = '" . $param['VENDOR'] . "'*/
             AND B.[KODE DOKUMEN]='380' AND C.[SERI] = 1 
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

    function read_mappingdata_supplier_plb($param)
    {
        $this->load->database();
        $this->db->select("
        A.CLIENT AS VENDOR,
        A.INVOICE_NO,
        A.INVOICE_DATE,
        B.KODE_INTERNAL,
        B.NAMA,
        B.ALAMAT,
        B.NPWP,
        B.KODE_NEGARA,
        B.KODE_COO,
        B.KODE_MOLTS,
        B.KODE_LP
        ");
        $this->db->from("DRAFT_DELIVERY_AW A");
        $this->db->join("referensi_pemasok B ", "A.MAPPED_TENANT= B.KODE_INTERNAL", "left");
        $this->db->where("A.INVOICE_NO", $param['INVOICE_NO']);
        $this->db->group_by("
            A.CLIENT,
            A.INVOICE_NO,
            A.INVOICE_DATE,
            B.KODE_INTERNAL,
            B.NAMA,
            B.ALAMAT,
            B.NPWP,
            B.KODE_NEGARA,
            B.KODE_COO,
            B.KODE_MOLTS,
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
        B.KODE_COO,
        B.KODE_MOLTS,
        B.KODE_LP
        ");
        $this->db->from("AW_DRAFT_TO_PLB A");
        $this->db->join("referensi_pemasok B ", "A.MAPP_TENANT= B.KODE_INTERNAL", "left");
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
            B.KODE_COO,
            B.KODE_MOLTS,
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
    function read_mappingdata_part_plb($param)
    {
        $this->load->database();
        $this->db->distinct();
        $this->db->select("
        A.ARTICLE_CODE AS ITEM_NUMBER,
        A.PART_CODE AS DESCRIPTION,
        A.ORDER_QTY AS ARRIV_PLAN_NUMBER,
        'COIL' AS UOM,
        B.PART_NO,
        B.PART_GROUP,
        B.PART_CATEGORY,
        B.PART_TYPE,
        B.PART_NAME,
        B.PART_DESCRIPTION,
        B.PART_UOM ,
        C.NOMOR_HS,
        C.TARIF_BM,
        C.TARIF_CUKAI,
        C.TARIF_PPH,
        C.TARIF_PPN,
        C.TARIF_PPNBM

        ");
        /*,
         */

        $this->db->from("DRAFT_DELIVERY_AW A");
        $this->db->join("MST_PART_PLB B ", "(A.ARTICLE_CODE COLLATE DATABASE_DEFAULT)= (B.PART_ALIAS  COLLATE DATABASE_DEFAULT)", "left");
        $this->db->join("REFERENSI_POS_TARIF C ", "B.HS_CODE = C.NOMOR_HS", "left");
        $this->db->where("A.INVOICE_NO", $param['INVOICE_NO']);
        $this->db->group_by("
        A.ARTICLE_CODE,
        A.PART_CODE, 
        A.ORDER_QTY, 
        B.PART_NO,
        B.PART_GROUP,
        B.PART_CATEGORY,
        B.PART_TYPE,
        B.PART_NAME,
        B.PART_DESCRIPTION,
        B.PART_UOM ,
        C.NOMOR_HS,
        C.TARIF_BM,
        C.TARIF_CUKAI,
        C.TARIF_PPH,
        C.TARIF_PPN,
        C.TARIF_PPNBM
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
        $this->db->distinct();
        $this->db->select("
        A.ARTICLE_CODE AS ITEM_NUMBER,
        A.STOCK_NAME AS DESCRIPTION,
        A.INVOICE_QTY AS ARRIV_PLAN_NUMBER,
        'COIL' AS UOM,
        B.PART_NO,
        B.PART_GROUP,
        B.PART_CATEGORY,
        B.PART_TYPE,
        B.PART_NAME,
        B.PART_DESCRIPTION,
        B.PART_UOM ,
        C.NOMOR_HS,
        C.TARIF_BM,
        C.TARIF_CUKAI,
        C.TARIF_PPH,
        C.TARIF_PPN,
        C.TARIF_PPNBM

        ");
        /*,
         */

        $this->db->from("AW_DRAFT_TO_PLB A");
        $this->db->join("MST_PART_PLB B ", "(A.ARTICLE_CODE COLLATE DATABASE_DEFAULT)= (B.PART_ALIAS  COLLATE DATABASE_DEFAULT)", "left");
        $this->db->join("REFERENSI_POS_TARIF C ", "B.HS_CODE = C.NOMOR_HS", "left");
        $this->db->where("A.INVOICE_NO", $param['INVOICE_NO']);
        $this->db->group_by("
        A.ARTICLE_CODE,
        A.STOCK_NAME, 
        A.INVOICE_QTY, 
        B.PART_NO,
        B.PART_GROUP,
        B.PART_CATEGORY,
        B.PART_TYPE,
        B.PART_NAME,
        B.PART_DESCRIPTION,
        B.PART_UOM ,
        C.NOMOR_HS,
        C.TARIF_BM,
        C.TARIF_CUKAI,
        C.TARIF_PPH,
        C.TARIF_PPN,
        C.TARIF_PPNBM
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
    function read_receivingdata_header($param)
    {

        $this->load->database();
        $this->db->select("
                A.TRANS_NO
            ,   cast(A.TRANS_DATE as date) as TRANS_DATE
            ,   A.INVOICE_NO 
            ,   A.ARTICLE_CODE 
            ,   B.PART_NO
            ,   A.LOT_NO
            ,   B.PART_MPQ AS QTY_RECEIVED
            ,   A.INVOICE_QTY AS QTY_INVOICE
            ,   C.CURRENT_RACK 
        ");
        $this->db->from("TR_STOCK_TRANS A");
        $this->db->join('MST_PART_PLB B ', 'A.ARTICLE_CODE = B.PART_NO2', 'left');
        $this->db->join('MST_RACK C ', 'A.FLAG02 = C.RACK_ID', 'left');

        $this->db->where("
        A.INVOICE_NO = '" . $param['INVOICE_NO'] . "' )
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
        A.*
        ");
        $this->db->from("TR_STOCK_TRANS A");
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
    function read_dokumenpabean_header($param)
    {

        $this->load->database();
        $this->db->select("
            *
        ");
        $this->db->from("DBIT_HEADER A");

        $this->db->where("
        A.NOMORAJU = (
        select 
            TOP 1 A.NOMORAJU 
        from 
            DBIT_HEADER A

        left join DBIT_DOKUMEN B on A.NOMORAJU = B.NOMORAJU

        where 
            B.NOMORDOKUMEN='" . $param['INVOICE_NO'] . "'
        and 
            B.KODEDOKUMEN='380'
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
        A.KODEBARANG AS KODE_BARANG,
        A.SERIBARANG AS SERI_BARANG,
        A.TIPE,
        A.UKURAN,
        A.URAIAN,
        CAST(A.JUMLAHSATUAN AS FLOAT) AS JUMLAH_SATUAN,
        A.HARGASATUAN AS HARGA_SATUAN,
        A.KODESATUAN AS KODE_SATUAN,
        A.ASURANSI,
        A.CIF,
        A.CIFRUPIAH AS CIF_RUPIAH,
        A.DISKON,
        A.FOB,
        A.FREIGHT,
        A.NETTO,
        A.VOLUME,
        A.ID_HEADER,
        A.KODEPERHITUNGAN AS KODE_PERHITUNGAN , 
        A.HARGAPENYERAHAN AS HARGA_PENYERAHAN, 
        A.NDPBM
        ");
        $this->db->from("DBIT_BARANG A");
        // $this->db->where("NOMORAJU", $param['NOMOR_AJU']);
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
        // $this->db->select("
        // A.*,
        // B.URAIAN_DOKUMEN
        // ");
        // $this->db->from("tr_bc_dokumen A");
        // $this->db->join("referensi_dokumen B","A.TIPE_DOKUMEN=B.TIPE_DOKUMEN and A.KODE_JENIS_DOKUMEN=B.KODE_DOKUMEN","left");
        // $this->db->where("
        // A.ID_HEADER = (
        //     Select TOP 1 ID_HEADER_ORI from tr_bc_header 
        //     where 
        //     NOMOR_AJU IN (
        //         select A.NOMOR_AJU from upload_coo_detail A where A.INVOICE_NO='".$param['INVOICE_NO']."' group by A.NOMOR_AJU 
        //     )
        //     group by 
        //     ID_HEADER_ORI

        // )
        // ");

        $this->db->select('
            NOMORAJU AS NOMOR_AJU,
            SERI,
            KODEDOKUMEN AS KODE_DOKUMEN,
            NOMORDOKUMEN AS NOMOR_DOKUMEN,
            TANGGALDOKUMEN AS TANGGAL_DOKUMEN,
            KODEFASILITAS AS KODE_FASILITAS,
            KODEIJIN AS KODE_IJIN,
            ID_HEADER,
            SERI_BARANG,
            TRANSID
        ');

        $this->db->from('DBIT_DOKUMEN');

        $this->db->where("NOMORAJU", $param['NOMOR_AJU']);
        $this->db->where("NOMORDOKUMEN", $param['INVOICE_NO']);

        // $this->db->where('NOMORAJU', $param['NOMOR_AJU']);

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
        // $this->db->where('NOMORAJU', $param['NOMORAJU']);
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

        // $this->db->where("
        // A.ID_HEADER = (
        //     Select TOP 1 ID_HEADER_ORI from tr_bc_header 
        //     where 
        //     NOMOR_AJU IN (
        //         select A.NOMOR_AJU from upload_coo_detail A where A.INVOICE_NO='".$param['INVOICE_NO']."' group by A.NOMOR_AJU 
        //     )
        //     group by 
        //     ID_HEADER_ORI

        // )
        // ");

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
        // $this->db->where('A.NOMORAJU', $param['NOMOR_AJU']);
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

        // $this->db->where("
        // A.ID_HEADER = (
        //     Select TOP 1 ID_HEADER_ORI from tr_bc_header 
        //     where 
        //     NOMOR_AJU IN (
        //         select A.NOMOR_AJU from upload_coo_detail A where A.INVOICE_NO='".$param['INVOICE_NO']."' group by A.NOMOR_AJU 
        //     )
        //     group by 
        //     ID_HEADER_ORI

        // )
        // ");

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
            A.*
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

        // $this->db->where('NOMORAJU', $param['NOMOR_AJU']);
        // $this->db->where("
        // A.ID_HEADER = (
        //     Select TOP 1 ID_HEADER_ORI from tr_bc_header 
        //     where 
        //     NOMOR_AJU IN (
        //         select A.NOMOR_AJU from upload_coo_detail A where A.INVOICE_NO='".$param['INVOICE_NO']."' group by A.NOMOR_AJU 
        //     )
        //     group by 
        //     ID_HEADER_ORI

        // )");

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
        // $this->db->where("A.NOMORAJU", $param['NOMOR_AJU']);
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

        // $this->db->where("
        // A.ID_HEADER = (
        //     Select TOP 1 ID_HEADER_ORI from tr_bc_header 
        //     where 
        //     NOMOR_AJU IN (
        //         select A.NOMOR_AJU from upload_coo_detail A where A.INVOICE_NO='".$param['INVOICE_NO']."' group by A.NOMOR_AJU 
        //     )
        //     group by 
        //     ID_HEADER_ORI

        // )
        // ");

        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
            'Rows' => $rows
        );
        return json_encode($data);
    }
    function read_dokumenpabean_pungutan($param)
    {
        $this->load->database();
        $this->db->select("
            A.*
        ");
        $this->db->from("DBIT_PUNGUTAN A");
        // $this->db->where("A.NOMORAJU", $param['NOMOR_AJU']);
        $this->db->where("
            A.NOMORAJU = (
            select 
                TOP 1 A.NOMORAJU 
            from 
                DBIT_PUNGUTAN A

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
        //         select A.NOMOR_AJU from upload_coo_detail A where A.INVOICE_NO='".$param['INVOICE_NO']."' group by A.NOMOR_AJU 
        //     )
        //     group by 
        //     ID_HEADER_ORI

        // )
        // ");

        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
            'Rows' => $rows
        );
        return json_encode($data);
    }
    function read_dokumenceisa_header($param)
    {
        $this->load->database('CEISA');
        $this->db->select("
        A.*
        ");
        $this->db->from("tpb_header A");
        $this->db->where("
        A.ID IN (
            SELECT 
            A.ID_HEADER
            FROM tpb_dokumen A
            WHERE
            A.NOMOR_DOKUMEN='" . $param['INVOICE_NO'] . "'
            GROUP BY
            A.ID_HEADER
        )
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
    function read_dokumenceisa_detail($param)
    {
        $this->load->database('CEISA');
        $this->db->select("
        A.*
        ");
        $this->db->from("tpb_barang A");
        $this->db->where("
        A.ID_HEADER IN (
            SELECT 
            A.ID_HEADER
            FROM tpb_dokumen A
            WHERE
            A.NOMOR_DOKUMEN='" . $param['INVOICE_NO'] . "'
            GROUP BY
            A.ID_HEADER
        )
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
    function read_dokumenceisa_lampiran($param)
    {
        $this->load->database('CEISA');
        $this->db->select("
        A.*,
        B.URAIAN_DOKUMEN
        ");
        $this->db->from("tpb_dokumen A");
        $this->db->join("referensi_dokumen B", "A.TIPE_DOKUMEN=B.TIPE_DOKUMEN and A.KODE_JENIS_DOKUMEN=B.KODE_DOKUMEN", "left");
        $this->db->where("
        A.ID_HEADER IN (
            SELECT 
            A.ID_HEADER
            FROM tpb_dokumen A
            WHERE
            A.NOMOR_DOKUMEN='" . $param['INVOICE_NO'] . "'
            GROUP BY
            A.ID_HEADER
        )
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

    function read_invoice_mapping_supplier($param)
    {
        $this->load->database();
        $this->db->select("
            A.VENDOR,
            A.INVOICE_NO,
            A.INVOICE_DATE,
            A.CONTAINER_NO
        ");
        $this->db->from("AW_DRAFT_TO_PLB A");
        $this->db->where("
        A.MAPP_TENANT is NULL OR
        A.MAPP_TENANT =''
        ");

        $this->db->group_by("
            A.VENDOR,
            A.INVOICE_NO,
            A.INVOICE_DATE,
            A.CONTAINER_NO
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

    function sync_automapping_supplier($param)
    {
        $this->load->database();
        $this->db->simple_query("
                UPDATE 
                upload_coo_detail
                SET 
                upload_coo_detail.MAPP_SUPPLIER = B.MAPP_SUPPLIER
                FROM 
                upload_coo_detail A
                LEFT JOIN 
                (
                    SELECT VENDOR,MAPP_SUPPLIER FROM upload_coo_detail A
                    WHERE
                    A.VENDOR IN (
                    SELECT 
                    A.VENDOR
                        FROM upload_coo_detail A
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
                update upload_coo_detail set
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
        DISTINCT A.INVOICE_NO,A.VENDOR,A.ARTICLE_CODE,A.DESCRIPTION
        ", false);
        $this->db->from("AW_DRAFT_TO_PLB A");
        $this->db->where("
            A.MAPP_GOODS is NULL OR
            len(A.MAPP_GOODS)<1
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
    function sync_manualmapping_itempart($param)
    {
        $this->load->database();
        $this->db->simple_query("
                update AW_DRAFT_TO_PLB set
                MAPP_GOODS='" . $param['PART_NO'] . "'
                where
                ARTICLE_CODE='" . $param['ITEM_NUMBER'] . "' AND 
                (MAPP_GOODS IS NULL OR MAPP_GOODS='')
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
                AW_DRAFT_TO_PLB
                SET 
                AW_DRAFT_TO_PLB.MAPP_GOODS = B.PART_NO
                FROM 
                AW_DRAFT_TO_PLB A
                LEFT JOIN MST_PART_PLB B on A.ARTICLE_CODE = B.PART_ALIAS 
                WHERE 
                A.MAPP_GOODS ='' OR A.MAPP_GOODS is NULL
        ");

        $data = array(
            'success' => 'true',
            'message' => 'Auto Mapping Supplier Selesai'
        );
        return json_encode($data);
    }
    function read_draft_supplier($param)
    {
        $this->load->database();
        $this->db->select("
            A.VENDOR,
            A.MAPP_SUPPLIER,
            B.NAMA,
            B.ALAMAT,
            B.KODE_NEGARA,
            C.URAIAN_NEGARA,
            B.NPWP
        ");
        $this->db->from("upload_" . $param['module'] . '_detail A');
        $this->db->join("referensi_pemasok B", "A.MAPP_SUPPLIER = B.KODE_INTERNAL", "left");
        $this->db->join("referensi_negara C", "B.KODE_NEGARA = C.KODE_NEGARA", "left");
        $this->db->where("
            A.BC_TYPE IS NULL
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
            A.CURRENT_MONEY,
            A.CARA_BAYAR,
            A.BL_NO,
            A.BL_DATE, 
            A.TRANSPORT_WAY
        
        ");
        $this->db->from("upload_" . $param['module'] . '_detail A');
        $this->db->where("
            A.MAPP_SUPPLIER='" . $param['KODE_INTERNAL'] . "' AND 
            A.BC_TYPE is NULl
        ");

        $this->db->group_by("
            A.INVOICE_NO,
            A.INVOICE_DATE,
            A.CURRENT_MONEY,
            A.CARA_BAYAR,
            A.BL_NO,
            A.BL_DATE, 
            A.TRANSPORT_WAY
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
    function SP_COO_DRAFT_SELECT_INVOICE($param)
    {
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_COO_DRAFT_SELECT_INVOICE
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
    function proses_save_dokumen_draft($param)
    {
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_COO_CREATE_DOKUMEN_DRAFT
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
	 function read_upload_form_aw ($param) { 

		 $this->read_upload_form($param) ;
	 }
	 
	 function read_upload_form_plb ($param) {

		 $this->read_upload_form($param) ;
	 }
    function read_upload_form($param)
    {
        // $vdata = json_decode($param);
        // $source_encoding = base64_decode($param['file_excel']);

        $data = [];
		  #$ISINTERNAL = ($param['ISINTERNAL'] =null ) ? '0' : '1' ; 

        $VUSER = $param['VUSERNAME'];

        # print_r($param);
			
        $query = $this->db->query("
            EXEC SP_UPLOAD_PORTAL_DATA
            @VNOMORAJU='',
            @VFILENAME='',
            @VUSER='SP-SYNC',
            @VMODE='LIST',
            @ISINTERNAL ='" . $param['ISINTERNAL'] ."'
            ");

        foreach ($query->result_array() as $row) {
            $data[] = [
                'NOMORAJU' => pathinfo($row['FileName'])['filename'],
                'FilePath' => $row['FilePath'],
                'FileName' => $row['FileName'],
            ];
        }

        $row = [
            'Rows' => $data,
            'TotalRows' => count($query->result())
        ];
        return json_encode($row);
    }
    function process_upload_form($param)
    {
        $SQL_CALLSP = "
        EXEC SP_UPLOAD_PORTAL_DATA
        @VNOMORAJU=?,
        @VFILENAME=?,
        @VUSER=?,
        @VMODE=?,
        @ISINTERNAL = ?
        ";

        $data = [
            '@VNOMORAJU' => $param['FileName'],
            '@VFILENAME' => $param['FilePath'],
            '@VUSER' => $param['VUSERNAME'],
            '@VMODE' => 'PROCESS',
            '@ISINTERNAL' => $param['ISINTERNAL'],
        ];

        $result = $this->db->query($SQL_CALLSP, $data);
        if ($result) {
            $row = $result->result_array();
            //$rows = count($row);

            if ($row[0]['success'] == 'true') {
					$data= ['PNOMOR_AJU'=>$param['FileName'] ,'VUSERNAME'  => $param['VUSERNAME'], 'ISINTERNAL'=>$param['ISINTERNAL']]; 
				   $this->sync_to_dbit($data); 
                $response['success'] = $row[0]['success'];
                $response['message'] = $row[0]['message'];
            } else {
                $response['success'] = $row[0]['success'];
                $response['message'] = $row[0]['message'];
                #print_r($row);
                #die();
            }
        } else {
            // Handle the case where the stored procedure call failed
            $response['success'] = 'false';
            $response['message'] = $this->db->error();
        }

        #print_r($response);
        #die();

        return json_encode($response);
    }

    function sync_to_dbit($param)
    {
        $SQL_CALLSP = "EXEC SP_SYNC_DBIT_PORTAL_ALL @VNOMORAJU=?, @VUSERNAME=?, @ISINTERNAL=?, @Vsuccess=?, @Vmessage=?";
        $data = [
            '@VNOMORAJU' => $param['PNOMOR_AJU'],
            '@VUSERNAME' => $param['VUSERNAME'],
            '@ISINTERNAL' => $param['ISINTERNAL'],
            '@Vsuccess' => null,
            '@Vmessage' => null
        ];
        /*
        $this->db->query($SQL_CALLSP, $data) or die(array(
            'success' => 'false',
            'message' => ''
        ));
*/
        $result = $this->db->query($SQL_CALLSP, $data);
        if ($result) {
            $row = $result->result_array();
            //$rows = count($row);

            if ($row[0]['success'] == 'true') {
                $response['success'] = $row[0]['success'];
                $response['message'] = $row[0]['message'];
            } else {
                $response['success'] = $row[0]['success'];
                $response['message'] = $row[0]['message'];
                #print_r($row);
                #die();
            }
        } else {
            // Handle the case where the stored procedure call failed
            $response['success'] = 'false';
            $response['message'] = $this->db->error();
        }

        return json_encode($response);
    }
    function mapp_this_document($param)
    {
        $this->load->database();
        /*
        $myQuery = "
        SET NOCOUNT ON ;
        UPDATE A 
		SET 
				A.NOMOR_AJU = D.NOMORAJU  
			,	A.TANGGAL_AJU = D.TANGGALPERNYATAAN 
			, A.NOMOR_DAFTAR = D.NOMORDAFTAR
			, A.TANGGAL_DAFTAR = FORMAT(D.TANGGALDAFTAR, 'yyyy-MM-dd') 
			, A.PABEAN_CODE  = C.TIPE  
			, A.PABEAN_NAME =  C.KODEBARANG 
			, A.BC_TYPE = D.KODEDOKUMEN
			, A.DO_NUMBER = B.NOMORDOKUMEN
			, A.DO_DATE = B.TANGGALDOKUMEN
			, A.SERI_BARANG = C.SERIBARANG  
			, A.PABEAN_QTY = C.JUMLAHSATUAN
			, A.ID_PABEAN_ORI = C.TRANSID
		
		FROM UPLOAD_AW_DETAIL A 
		LEFT JOIN 
				DBIT_DOKUMEN B 
				ON 
					A.INVOICE_NO COLLATE DATABASE_DEFAULT = B.NOMORDOKUMEN  COLLATE DATABASE_DEFAULT
			LEFT JOIN 
				DBIT_BARANG C 
				ON 
					B.NOMORAJU = C.NOMORAJU 
					AND (REPLACE(C.TIPE COLLATE DATABASE_DEFAULT, '-','') = LEFT ((REPLACE(A.ARTICLE_CODE COLLATE DATABASE_DEFAULT, '-','')) , LEN((REPLACE(A.ARTICLE_CODE,'-','')))-2)
					OR  C.TIPE  =  A.ARTICLE_CODE )
			LEFT JOIN 
				DBIT_HEADER D 
				ON
					D.NOMORAJU = B.NOMORAJU 
					
			WHERE A.NOMOR_AJU IS NULL 
			AND B.KODEDOKUMEN = '380' 
			AND D.KODEDOKUMEN IN ('27', '25',  '41')
            AND A.INVOICE_NO = '" . $param['INVOICE_NO'] . "' ; 

            IF @@ROWCOUNT > 0 
            BEGIN 
                SELECT 'true' as success, 'Manual Mapping Berhasil ' as message ;
                RETURN
            END 
            ELSE 
            BEGIN
                SELECT 'false' as success, 'DOKUMEN PABEAN TIDAK DITEMUKAN' AS message ; 
                RETURN
            END 


        ";
        */
        $SQL_CALLSP = "EXEC SP_SYNC_MAPP_DOCUMENT @VINVOICE_NO=?, @VIDCOMPANY=?, @VUSERNAME=?, @VMODE=?";
        $data = [
            '@VINVOICE_NO' => $param['INVOICE_NO'],
            '@VIDCOMPANY' => $param['ID_COMPANY'],
            '@VUSERNAME' => $param['VUSERNAME'],
            '@VMODE' => $param['VMODE'],
        ];

        $retMe = $this->db->query($SQL_CALLSP, $data);
        #print $this->db->last_query();
        #print_r($retMe);
        /*
        if ($retMe) {
            $data = array(
                'success' => 'true',
                'message' => 'Manual Mapping Berhasil'
            );
        } else {
            $data = array(
                'success' => 'false',
                'message' => 'Manual Mapping Gagal'
            );
        }*/

        $data = $retMe->row_array();
        # print_r($data);
        return json_encode($data);
    }
    function update_status($param)
    {
        #print_r($param);
        $this->load->database();
        $this->db->set(array("FLAG04" => $param['nomorRespon'], "FLAG05" => $param['keterangan']));
        $this->db->where("NOMORAJU = ", $param['nomorAju']);
        $this->db->update("DBIT_HEADER");
        /*$this->db->simple_query("

        UPDATE 
            DBIT_HEADER 
        SET 
                FLAG04  ='" . $param['nomorRespon'] . "' 
            ,   FLAG05 = '" . $param['keterangan'] . "' 
        WHERE NOMOR_AJU = '" . $param['nomorAju'] . "' ; 
        ");
        */
        $data = array(
            'success' => 'true',
            'message' => 'Get Data berhasil'
        );
        #print($this->db->last_query());

        return json_encode($data);
    }
	 function uploadfile()
    {
        $vjson = $this->input->post(NULL, TRUE);
        $vparam = json_decode($vjson['params'], true);
        $vheader = json_decode($vparam['vheader'], true);
        $vitem = json_decode($vparam['vitem'], true);

        $filename = $_FILES['file']['name'];
        $config['upload_path']          = FCPATH  . '../z_upload/CUTOFF_WIP/';
        $config['allowed_types']        = array('xlsx', 'xls');
        $config['max_size']             = 20480;
        $config['max_width']            = 1024;
        $config['max_height']           = 768;
        $config['file_name']            = 'upload_' . $filename;

        $this->load->library('upload', $config);

        $filepath = $config['upload_path'] . 'upload_' . $filename . '.xlsx';

        if (file_exists($filepath)) {
            // Hapus file yang sudah ada
            unlink($filepath);
            //delete_files($file_path);
        }

        if (!$this->upload->do_upload('file')) {
            $error = array(
                'success' => 'false',
                'message' => $this->upload->display_errors()
            );
            // Tampilkan pesan kesalahan upload
            return json_encode($error);
        } else {
            $this->save_data($vparam);
            $hasil = [
                'success' => 'true',
                'message' => 'Berhasil Menyimpan data'
            ];

            return json_encode($hasil);
        }
    }
}
