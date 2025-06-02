<?php
class Msync_doc_molts extends CI_Model {

    function read($param){
        switch ($param["method"]) {
            case "read_data":
                return $this->read_data($param);
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
            A.INVOICE_NO,
            A.INVOICE_DATE,
            A.BC_TYPE,
            A.NOMOR_AJU,
            A.TANGGAL_AJU,
            A.NOMOR_DAFTAR,
            A.TANGGAL_DAFTAR,
            A.MAPP_SUPPLIER,
            MAX(B.NAMA) as MAPP_SUPPLIERNAME
        ");
        $this->db->from("upload_molts_detail A");
        $this->db->join("referensi_pemasok B","A.MAPP_SUPPLIER = B.KODE_INTERNAL","left");

        switch ($param["cbo_filterkey"]) {
            case "1":
                $this->db->where("A.MAPP_SUPPLIER IS NULL");
                break;
            case "2":
                $this->db->where("A.MAPP_PARTNO IS NULL");
                break;
            case "3":
                $this->db->where("A.NOMOR_AJU IS NULL");
                break;
            case "4":
                $this->db->where("A.NOMOR_AJU IS NOT NULL");
                $this->db->where("A.INVOICE_NO NOT IN (SELECT C.INVOICE_NO FROM wh_inv_mat_detail C group by C.INVOICE_NO) ");
                break;
            default:
                break;
          }


        $this->db->group_by("
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
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_UPLOAD_MOLTS";
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
            case "molts":
                return $this->mapping_SPCALL($param,"SP_MOLTS_SELECT_INVOICE");
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
        $SQL_CALLSP = "EXEC SP_MAPPING_SAVE_INVOICE_DRAFT_MOLTS
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
}