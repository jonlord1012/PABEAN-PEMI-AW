<?php
class Msync_doc_kurir20 extends CI_Model {

    function read($param){
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
            case "read_mappingdata_part":
                return $this->read_mappingdata_part($param);
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
            case "read_data_lp":
                return $this->read_data_lp($param);
                break;
            case "header_sync":
                return $this->read_header($param);
                break;
            case "mapping_listitem":
                return $this->mapping_listitem($param);
                break;
            default:
              return false;
          }
    }
    function read_data($param){
        $this->load->database();
        $this->db->select("
            A.VENDOR,
            A.INVOICE_NO,
            A.INVOICE_DATE,
            A.BC_TYPE,
            A.NOMOR_AJU,
            FORMAT(A.TANGGAL_AJU,'yyyy-MM-dd') as TANGGAL_AJU,
            A.NOMOR_DAFTAR,
            FORMAT(A.TANGGAL_DAFTAR,'yyyy-MM-dd') as TANGGAL_DAFTAR,
            A.MAPP_SUPPLIER,
            MAX(B.NAMA) as NAMA
        ");
        $this->db->from("upload_".$param['module'].'_detail A');
        $this->db->join("referensi_pemasok B","A.MAPP_SUPPLIER = B.KODE_INTERNAL","left");
        $this->db->where("A.INVOICE_NO IS NOT NULL");

        switch ($param["cbo_filterkey"]) {
            case "1":
                $this->db->where("A.MAPP_SUPPLIER IS NULL");
                break;
            case "2":
                $this->db->where("A.MAPP_PARTNO IS NULL");
                break;
            case "3":
                $this->db->where("A.BC_TYPE IS NULL");
                break;
            case "4":
                $this->db->where("A.NOMOR_AJU IS NOT NULL");
                $this->db->where("A.INVOICE_NO NOT IN (SELECT C.INVOICE_NO FROM wh_inv_mat_detail C group by C.INVOICE_NO) ");
                break;
            default:
                break;
          }


        $this->db->group_by("
            A.VENDOR,
            A.INVOICE_NO,
            A.INVOICE_DATE,
            A.BC_TYPE,
            A.NOMOR_AJU,
            A.TANGGAL_AJU,
            A.NOMOR_DAFTAR,
            A.TANGGAL_DAFTAR,
            A.MAPP_SUPPLIER
        ");
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->like($val["property"],$val['value'], 'both');
            }        
        }

        //$tempdb = clone $this->db;
        $count= $this->db->count_all_results('', FALSE);

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->order_by( $val["property"], $val['direction']);
            }
        }
        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }
        
        $query = $this->db->get();
        $rows = $query->result_array();
        //$count= $query->count_all_results();
        $data = array(
                    'TotalRows' => $count,
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
    function read_log($param){
        $this->load->database();
        $this->db->select("
                LOG_STATUS,
                LOG_FILENAME,
                LOG_DESCRIPTION,
                FORMAT(LOG_DATE,'yyyy-MM-dd HH:mm:ss') as LOG_DATE,
                LOG_USER
        ");
        $this->db->from("upload_log A");
        $this->db->where("A.LOG_MODULE",$param['module']);
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                    //$valproperty = $val["property"];
                    //$key = array_search($valproperty, array_column($vdefinition, "name"));
                    $this->db->like($val["property"],$val['value'], 'both');
            }        
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                    //$valproperty = $val["property"];
                    //$key = array_search($valproperty, array_column($vdefinition, "name"));
                    $this->db->order_by( $val["property"], $val['direction']);
            }
        }
        $this->db->order_by("A.LOG_DATE", "DESC");
        
        $tempdb = clone $this->db;
        $count= $tempdb->count_all_results(); 
        
        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }
        
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                    'TotalRows' => $count,
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
    function read_data_lp($param){
        $this->load->database();
        $this->db->select("
                A.PO_SUPCODE,
                A.INV_SUPNO,
                A.INV_DATE,
                MAX(A.GR_NUMBER) as GR_NUMBER,
                COUNT( DISTINCT A.GR_NUMBER) as GR_QTY,
                COUNT(A.PART_CODE) as ITEM_QTY,
                MAX(A.NOMOR_AJU) as NOMOR_AJU
        ");
        $this->db->from("upload_lp_detail A");
        $this->db->group_by("
            A.PO_SUPCODE,
            A.INV_SUPNO,
            A.INV_DATE
        ");
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->like($val["property"],$val['value'], 'both');
            }        
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->order_by( $val["property"], $val['direction']);
            }
        }
        
        $tempdb = clone $this->db;
        $count= $tempdb->count_all_results(); 
        
        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }
        
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                    'TotalRows' => $count,
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
    function sync_file($param){
        switch ($param["module"]) {
            case "coo":
                return $this->sync_SPCALL($param['ID_COMPANY']==='WH' ? "SP_UPLOAD_COO_WH" : "SP_UPLOAD_COO_AW");
                break;
            case "coo_aju":
                return $this->sync_SPCALL($param['ID_COMPANY']==='WH' ? "SP_UPLOAD_COO_WH" : "SP_UPLOAD_COO_AW");
                break;
            case "molts":
                return $this->sync_SPCALL($param['ID_COMPANY']==='WH' ? "SP_UPLOAD_MOLTS_WH" : "SP_UPLOAD_MOLTS_AW");
                break;
            case "read_log":
                return $this->read_log($param);
                break;
            default:
              return false;
          }
    }
    function sync_nomoraju($param){
        switch ($param["module"]) {
            case "coo":
                $this->load->database();
                $SQL_CALLSP = "EXEC SP_SYNC_AJU_COO";
                $result = $this->db->query($SQL_CALLSP);
                $row = $result->row_array();
                return json_encode($row);
            case "coo_aju":
                return $this->sync_SPCALL($param['ID_COMPANY']==='WH' ? "SP_UPLOAD_COO_WH" : "SP_UPLOAD_COO_AW");
                break;
            case "molts":
                return $this->sync_SPCALL($param['ID_COMPANY']==='WH' ? "SP_UPLOAD_MOLTS_WH" : "SP_UPLOAD_MOLTS_AW");
                break;
            case "read_log":
                return $this->read_log($param);
                break;
            default:
              return false;
          }
    }
    function sync_SPCALL ($param){
        $this->load->database();
        $SQL_CALLSP = "EXEC ".$param;
        $result = $this->db->query($SQL_CALLSP);
        $row = $result->row_array();
        return json_encode($row);
    }
    function read_header($param){
        $this->load->database();
        $this->db->select("
                *
        ");
        $this->db->from("upload_".$param['module'].'_header');
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                    $valproperty = $val["property"];
                    $key = array_search($valproperty, array_column($vdefinition, "name"));
                    $this->db->like($vdefinition[$key]["dbname"],$val['value'], 'both');
            }        
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                    $valproperty = $val["property"];
                    $key = array_search($valproperty, array_column($vdefinition, "name"));
                    $this->db->order_by($vdefinition[$key]["dbname"], $val['direction']);
            }
        }
        
        $tempdb = clone $this->db;
        $count= $tempdb->count_all_results(); 
        
        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }
        
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                    'TotalRows' => $count,
                        'Rows' => $rows
                     );
        return json_encode($data );

    }
    function sync_cancel($param){
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
    function mapping_invoice($param){
        switch ($param["module"]) {
            case "coo":
                return $this->mapping_SPCALL($param,"SP_COO_SELECT_INVOICE");
                break;
            default:
              return false;
          }
    }
    function mapping_SPCALL($param,$spname){
        $this->load->database();
        $SQL_CALLSP = "EXEC " .$spname. "
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
    function mapping_listitem($param){
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
        $this->db->from("upload_".$param['module'].'_detail A');
        $this->db->join(" mst_part B"," on A.MAPP_PARTNO = B.PART_NO","left");
        $this->db->join(" mst_part_hs C"," on B.PART_NO = C.PART_NO AND B.ID_COMPANY = C.ID_COMPANY","left");
        $this->db->where("
        A.MAPP_SUPPLIER is NULL ");
        if($param['ID_COMPANY']!=="ALL"){
            $this->db->where("A.ID_COMPANY",$param['ID_COMPANY']);
        }

        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->like($val["property"],$val['value'], 'both');
            }        
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->order_by( $val["property"], $val['direction']);
            }
        }
        
        $tempdb = clone $this->db;
        $count= $tempdb->count_all_results(); 

        $this->db->order_by( "A.ITEM_NUMBER", "ASC");

        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }
        
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                    'TotalRows' => $count,
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
    function mapping_item_otomatis ($param){
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
    function mapping_invoice_draft($param){
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
    function read_original($param){
        $this->load->database();
        $this->db->select("
            *
        ");
        $this->db->from("upload_".$param['module'].'_detail A');
        $this->db->where("A.INVOICE_NO",$param['INVOICE_NO']);

        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->like($val["property"],$val['value'], 'both');
            }        
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->order_by( $val["property"], $val['direction']);
            }
        }
        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }
        
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
    function read_mappingdata_supplier($param){
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
        $this->db->from("upload_".$param['module'].'_detail A');
        $this->db->join("referensi_pemasok B ","A.MAPP_SUPPLIER = B.KODE_INTERNAL","left");
        $this->db->where("A.INVOICE_NO",$param['INVOICE_NO']);
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
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->like($val["property"],$val['value'], 'both');
            }        
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->order_by( $val["property"], $val['direction']);
            }
        }
        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }
        
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                        'Rows' => $rows
                     );
        return json_encode($data );
    }

    function read_mappingdata_part($param){
        $this->load->database();
        $this->db->select("
        A.ITEM_NUMBER,
        A.DESCRIPTION,
        A.ARRIV_PLAN_NUMBER,
        A.UOM,
        A.PRICE,
        A.CAUPRI,
        B.PART_NO,
        B.PART_GROUP,
        B.PART_CATEGORY,
        B.PART_TYPE,
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
        $this->db->from("upload_".$param['module'].'_detail A');
        $this->db->join("mst_part B ","A.ITEM_NUMBER = B.PART_NO","left");
        $this->db->join("mst_part_hs C ","B.PART_NO = C.PART_NO","left");
        $this->db->where("A.INVOICE_NO",$param['INVOICE_NO']);
        
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->like($val["property"],$val['value'], 'both');
            }        
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->order_by( $val["property"], $val['direction']);
            }
        }
        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }
        
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
    function read_receivingdata_header($param){
        $this->load->database();
        $this->db->select("
        A.RECEIPT_NO,
        A.RECEIPT_DATE,
        A.RECEIPT_USER
        ");
        $this->db->from("wh_inv_mat_header A");
        $this->db->where("
        A.RECEIPT_NO IN (select B.RECEIPT_NO from wh_inv_mat_detail B where B.INVOICE_NO = '".$param['INVOICE_NO']."' group by B.RECEIPT_NO )
        ");
        
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->like($val["property"],$val['value'], 'both');
            }        
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->order_by( $val["property"], $val['direction']);
            }
        }
        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }
        
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
    function read_receivingdata_detail($param){
        $this->load->database();
        $this->db->select("
        A.*
        ");
        $this->db->from("wh_inv_mat_detail A");
        $this->db->where("A.INVOICE_NO",$param['INVOICE_NO']);
        
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->like($val["property"],$val['value'], 'both');
            }        
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->order_by( $val["property"], $val['direction']);
            }
        }
        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }
        
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
    function read_dokumenpabean_header($param){
        
        $this->load->database();
        $this->db->select("
        *
        ");
        $this->db->from("tr_bc_header A");
       
        $this->db->where("
        A.NOMOR_AJU= (select TOP 1 NOMOR_AJU from upload_coo_detail where INVOICE_NO='".$param['INVOICE_NO']."')
        ");
        
        $query = $this->db->get();
        $rows = $query->row_array();
        
        $data = array();
        IF($query->num_rows() >0){
            foreach($rows as $x => $val) {
                $data[]= array(
                    'FIELDNAME'=>$x,
                    'VALUENAME'=>$val
                );
              }
        }
        
        return json_encode($data );
    }
    function read_dokumenpabean_detail($param){
        $this->load->database();
        $this->db->select("
        A.*
        ");
        $this->db->from("tr_bc_detail A");
        $this->db->where("
        A.ID_HEADER = (
            Select TOP 1 ID_HEADER_ORI from tr_bc_header 
            where 
            NOMOR_AJU IN (
                select A.NOMOR_AJU from upload_coo_detail A where A.INVOICE_NO='".$param['INVOICE_NO']."' group by A.NOMOR_AJU 
            )
            group by 
            ID_HEADER_ORI

        )
        ");
        
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->like($val["property"],$val['value'], 'both');
            }        
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->order_by( $val["property"], $val['direction']);
            }
        }
        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }
        
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
    function read_dokumenpabean_lampiran($param){
        $this->load->database();
        $this->db->select("
        A.*,
        B.URAIAN_DOKUMEN
        ");
        $this->db->from("tr_bc_dokumen A");
        $this->db->join("referensi_dokumen B","A.TIPE_DOKUMEN=B.TIPE_DOKUMEN and A.KODE_JENIS_DOKUMEN=B.KODE_DOKUMEN","left");
        $this->db->where("
        A.ID_HEADER = (
            Select TOP 1 ID_HEADER_ORI from tr_bc_header 
            where 
            NOMOR_AJU IN (
                select A.NOMOR_AJU from upload_coo_detail A where A.INVOICE_NO='".$param['INVOICE_NO']."' group by A.NOMOR_AJU 
            )
            group by 
            ID_HEADER_ORI

        )
        ");
        
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->like($val["property"],$val['value'], 'both');
            }        
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->order_by( $val["property"], $val['direction']);
            }
        }
        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }
        
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
    function read_dokumenpabean_kontainer($param){
        $this->load->database();
        $this->db->select("
        *
        ");
        $this->db->from("tr_bc_kontainer A");
       
        $this->db->where("
        A.ID_HEADER = (
            Select TOP 1 ID_HEADER_ORI from tr_bc_header 
            where 
            NOMOR_AJU IN (
                select A.NOMOR_AJU from upload_coo_detail A where A.INVOICE_NO='".$param['INVOICE_NO']."' group by A.NOMOR_AJU 
            )
            group by 
            ID_HEADER_ORI

        )
        ");
        
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                'Rows' => $rows
             );
        return json_encode($data );
    }
    function read_dokumenpabean_kemasan($param){
        $this->load->database();
        $this->db->select("
        *
        ");
        $this->db->from("tr_bc_kemasan A");
       
        $this->db->where("
        A.ID_HEADER = (
            Select TOP 1 ID_HEADER_ORI from tr_bc_header 
            where 
            NOMOR_AJU IN (
                select A.NOMOR_AJU from upload_coo_detail A where A.INVOICE_NO='".$param['INVOICE_NO']."' group by A.NOMOR_AJU 
            )
            group by 
            ID_HEADER_ORI

        )
        ");
        
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                'Rows' => $rows
             );
        return json_encode($data );
    }
    function read_dokumenpabean_jaminan($param){
        $this->load->database();
        $this->db->select("
        *
        ");
        $this->db->from("tr_bc_jaminan A");
       
        $this->db->where("
        A.ID_HEADER = (
            Select TOP 1 ID_HEADER_ORI from tr_bc_header 
            where 
            NOMOR_AJU IN (
                select A.NOMOR_AJU from upload_coo_detail A where A.INVOICE_NO='".$param['INVOICE_NO']."' group by A.NOMOR_AJU 
            )
            group by 
            ID_HEADER_ORI

        )
        ");
        
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                'Rows' => $rows
             );
        return json_encode($data );
    }
    function read_dokumenpabean_tarif($param){
        $this->load->database();
        $this->db->select("
        *
        ");
        $this->db->from("tr_bc_tarif A");
       
        $this->db->where("
        A.ID_HEADER = (
            Select TOP 1 ID_HEADER_ORI from tr_bc_header 
            where 
            NOMOR_AJU IN (
                select A.NOMOR_AJU from upload_coo_detail A where A.INVOICE_NO='".$param['INVOICE_NO']."' group by A.NOMOR_AJU 
            )
            group by 
            ID_HEADER_ORI

        )
        ");
        
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                'Rows' => $rows
             );
        return json_encode($data );
    }
    function read_dokumenceisa_header($param){
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
            A.NOMOR_DOKUMEN='".$param['INVOICE_NO']."'
            GROUP BY
            A.ID_HEADER
        )
        ");
        
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->like($val["property"],$val['value'], 'both');
            }        
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->order_by( $val["property"], $val['direction']);
            }
        }
        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }
        
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
    function read_dokumenceisa_detail($param){
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
            A.NOMOR_DOKUMEN='".$param['INVOICE_NO']."'
            GROUP BY
            A.ID_HEADER
        )
        ");
        
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->like($val["property"],$val['value'], 'both');
            }        
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->order_by( $val["property"], $val['direction']);
            }
        }
        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }
        
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
    function read_dokumenceisa_lampiran($param){
        $this->load->database('CEISA');
        $this->db->select("
        A.*,
        B.URAIAN_DOKUMEN
        ");
        $this->db->from("tpb_dokumen A");
        $this->db->join("referensi_dokumen B","A.TIPE_DOKUMEN=B.TIPE_DOKUMEN and A.KODE_JENIS_DOKUMEN=B.KODE_DOKUMEN","left");
        $this->db->where("
        A.ID_HEADER IN (
            SELECT 
            A.ID_HEADER
            FROM tpb_dokumen A
            WHERE
            A.NOMOR_DOKUMEN='".$param['INVOICE_NO']."'
            GROUP BY
            A.ID_HEADER
        )
        ");
        
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->like($val["property"],$val['value'], 'both');
            }        
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->order_by( $val["property"], $val['direction']);
            }
        }
        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }
        
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                        'Rows' => $rows
                     );
        return json_encode($data );
    }

    function read_invoice_mapping_supplier($param){
        $this->load->database();
        $this->db->select("
            A.VENDOR,
            A.INVOICE_NO,
            A.INVOICE_DATE,
            A.CONTAINER_NO
        ");
        $this->db->from("upload_".$param['module'].'_detail A');
        $this->db->where("
        A.MAPP_SUPPLIER is NULL OR
        A.MAPP_SUPPLIER =''
        ");

        $this->db->group_by("
            A.VENDOR,
            A.INVOICE_NO,
            A.INVOICE_DATE,
            A.CONTAINER_NO
        ");
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->like($val["property"],$val['value'], 'both');
            }        
        }


        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->order_by( $val["property"], $val['direction']);
            }
        }
        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }
        
        $query = $this->db->get();
        $rows = $query->result_array();
        //$count= $query->count_all_results();
        $data = array(
                        'Rows' => $rows
                     );
        return json_encode($data );
    }

    function sync_automapping_supplier($param){
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
        return json_encode($data );

    }

    function sync_manualmapping_supplier($param){
        $this->load->database();
        $this->db->simple_query("
                update upload_coo_detail set
                mapp_supplier='".$param['KODE_INTERNAL']."'
                where
                VENDOR='".$param['VENDOR']."' AND 
                (MAPP_SUPPLIER IS NULL OR MAPP_SUPPLIER='')
        ");
        $data = array(
            'success' => 'true',
            'message' => 'Manual Mapping Supplier Selesai'
         );
        return json_encode($data );
    }
    function read_invoice_mapping_itempart($param){
        $this->load->database();
        $this->db->select("
            MAX(A.VENDOR) as VENDOR,
            MAX(A.INVOICE_NO) as INVOICE_NO,
            A.ITEM_NUMBER,
            A.DESCRIPTION,
            A.UOM
        ");
        $this->db->from("upload_".$param['module'].'_detail A');
        $this->db->where("
            A.MAPP_PARTNO is NULL OR
            A.MAPP_PARTNO =''
        ");

        $this->db->group_by("
            A.ITEM_NUMBER,
            A.DESCRIPTION,
            A.UOM
        ");
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->like($val["property"],$val['value'], 'both');
            }        
        }


        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->order_by( $val["property"], $val['direction']);
            }
        }
        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }
        
        $query = $this->db->get();
        $rows = $query->result_array();
        //$count= $query->count_all_results();
        $data = array(
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
    function sync_manualmapping_itempart($param){
        $this->load->database();
        $this->db->simple_query("
                update upload_coo_detail set
                MAPP_PARTNO='".$param['PART_NO']."'
                where
                ITEM_NUMBER='".$param['ITEM_NUMBER']."' AND 
                (MAPP_PARTNO IS NULL OR MAPP_PARTNO='')
        ");
        $data = array(
            'success' => 'true',
            'message' => 'Manual Mapping Item/Part Material Selesai'
         );
        return json_encode($data );
    }
    function sync_automapping_itempart ($param){
        $this->load->database();
        $this->db->simple_query("
                UPDATE 
                upload_coo_detail
                SET 
                upload_coo_detail.MAPP_PARTNO = B.MAPP_PARTNO
                FROM 
                upload_coo_detail A
                LEFT JOIN 
                (
                    SELECT A.ITEM_NUMBER,A.MAPP_PARTNO FROM upload_coo_detail A
                                        WHERE A.ITEM_NUMBER IN (
                                        SELECT 
                                        A.ITEM_NUMBER
                                        FROM upload_coo_detail A
                                        WHERE 
                                        A.MAPP_PARTNO ='' OR A.MAPP_PARTNO is NULL
                                        GROUP BY A.ITEM_NUMBER, A.MAPP_PARTNO ) AND
                                        A.MAPP_PARTNO<>'' AND
                                        A.MAPP_PARTNO IS NOT NULL 
                                        GROUP BY
                                        A.ITEM_NUMBER,A.MAPP_PARTNO
                ) B
                    ON A.ITEM_NUMBER = B.ITEM_NUMBER
                WHERE 
                A.MAPP_PARTNO ='' OR A.MAPP_PARTNO is NULL
        ");

        $data = array(
            'success' => 'true',
            'message' => 'Auto Mapping Supplier Selesai'
         );
        return json_encode($data );
    }
    function read_draft_supplier ($param){
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
        $this->db->from("upload_".$param['module'].'_detail A');
        $this->db->join("referensi_pemasok B","A.MAPP_SUPPLIER = B.KODE_INTERNAL","left");
        $this->db->join("referensi_negara C","B.KODE_NEGARA = C.KODE_NEGARA","left");
        $this->db->where("
            A.MAPP_SUPPLIER is NOT NULL AND 
            (A.BC_TYPE is NULL OR A.NOMOR_AJU is NULL)
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
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->like($val["property"],$val['value'], 'both');
            }        
        }


        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->order_by( $val["property"], $val['direction']);
            }
        }
        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }
        
        $query = $this->db->get();
        $rows = $query->result_array();
        //$count= $query->count_all_results();
        $data = array(
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
    function read_draft_selectinvoice ($param){
        $this->load->database();
        $this->db->select("
            A.INVOICE_NO,
            A.INVOICE_DATE,
            A.CURRENT_MONEY,
            A.CARA_BAYAR,
            A.BL_NO,
            A.BL_DATE
        
        ");
        $this->db->from("upload_".$param['module'].'_detail A');
        $this->db->where("
            A.MAPP_SUPPLIER='".$param['KODE_INTERNAL']."' AND 
            (A.NOMOR_AJU is NULL OR A.BC_TYPE is NULl)
        ");

        $this->db->group_by("
            A.INVOICE_NO,
            A.INVOICE_DATE,
            A.CURRENT_MONEY,
            A.CARA_BAYAR,
            A.BL_NO,
            A.BL_DATE
        ");
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->like($val["property"],$val['value'], 'both');
            }        
        }


        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->order_by( $val["property"], $val['direction']);
            }
        }
        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }
        
        $query = $this->db->get();
        $rows = $query->result_array();
        //$count= $query->count_all_results();
        $data = array(
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
    function proses_dokumen_draft($param){
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_COO_CREATE_DOKUMEN_DRAFT
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
    
}