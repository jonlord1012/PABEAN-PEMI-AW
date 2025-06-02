<?php
class Msync_doc_lp extends CI_Model {

    function read($param){
        switch ($param["method"]) {
            case "read_data":
                return $this->read_data($param);
                break;
            case "read_invoice_mapping_supplier":
                return $this->read_invoice_mapping_supplier($param);
                break;
            case "sync_manualmapping_supplier":
                return $this->sync_manualmapping_supplier($param);
                break;
            case "read_invoice_mapping_itempart":
                return $this->read_invoice_mapping_itempart($param);
                break;
            case "mapping_listitem":
                return $this->mapping_listitem($param);
                break;
            case "read_original":
                return $this->read_original($param);
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
    function read_data($param){
        $this->load->database();
        $this->db->select("
            A.VENDOR,
            A.INVOICE_NO,
            A.GR_NUMBER,
            A.GR_SUPPLIERNO,
            FORMAT(A.GR_DATE,'yyyy-MM-dd') as GR_DATE,
            FORMAT(A.INVOICE_DATE,'yyyy-MM-dd') as INVOICE_DATE,
            A.BC_TYPE,
            A.NOMOR_AJU,
            FORMAT(A.TANGGAL_AJU,'yyyy-MM-dd') as TANGGAL_AJU,
            A.NOMOR_DAFTAR,
            FORMAT(A.TANGGAL_DAFTAR,'yyyy-MM-dd') as TANGGAL_DAFTAR,
            A.MAPP_SUPPLIER,
            B.NAMA
        ");
        $this->db->from("upload_lp_detail A");
        $this->db->join("referensi_pemasok B","A.MAPP_SUPPLIER = B.KODE_INTERNAL","left");
        
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
            A.GR_NUMBER,
            A.GR_SUPPLIERNO,
            A.GR_DATE,
            A.BC_TYPE,
            A.NOMOR_AJU,
            A.TANGGAL_AJU,
            A.NOMOR_DAFTAR,
            A.TANGGAL_DAFTAR,
            A.MAPP_SUPPLIER,
            B.NAMA
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
    function read_original($param){
        $this->load->database();
        $this->db->select("
        VENDOR,
        INVOICE_NO,
        FORMAT(INVOICE_DATE,'yyyy-MM-dd') as INVOICE_DATE,
        FAKTUR_NO,
        FORMAT(FAKTUR_DATE,'yyyy-MM-dd') as FAKTUR_DATE,
        GR_NUMBER,
        GR_SUPPLIERNO,
        FORMAT(GR_DATE,'yyyy-MM-dd') as GR_DATE,
        PO_NUMBER,
        FORMAT(PO_DATE,'yyyy-MM-dd') as PO_DATE,
        PART_CODE,
        PART_NUMBER,
        PART_UNIT,
        GR_QTY,
        HARGA,
        
        ");
        $this->db->from("upload_lp_detail A");
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
        $this->db->from("upload_lp_detail A");
        $this->db->join("referensi_pemasok B","A.MAPP_SUPPLIER = B.KODE_INTERNAL","left");
        $this->db->join("referensi_negara C","B.KODE_NEGARA = C.KODE_NEGARA","left");
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
            FORMAT(A.INVOICE_DATE,'yyyy-MM-dd') as INVOICE_DATE,
            A.GR_NUMBER,
            A.GR_SUPPLIERNO,
            FORMAT(A.GR_DATE,'yyyy-MM-dd') as GR_DATE
        
        ");
        $this->db->from("upload_lp_detail A");
        $this->db->where("
            A.MAPP_SUPPLIER='".$param['KODE_INTERNAL']."' AND 
            A.BC_TYPE is NULl
        ");

        $this->db->group_by("
            A.INVOICE_NO,
            A.INVOICE_DATE,
            A.GR_NUMBER,
            A.GR_SUPPLIERNO,
            A.GR_DATE
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
    function sync_file($param){
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_UPLOAD_LP
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
    function sync_aju ($param){
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_SYNC_AJU_LP
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
    function read_invoice_mapping_supplier($param){
        $this->load->database();
        $this->db->select("
            A.VENDOR,
            A.INVOICE_NO,
            A.INVOICE_DATE
        ");
        $this->db->from("upload_lp_detail A");
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
                upload_lp_detail
                SET 
                upload_lp_detail.MAPP_SUPPLIER = B.MAPP_SUPPLIER
                FROM 
                upload_lp_detail A
                LEFT JOIN 
                (
                    SELECT VENDOR,MAPP_SUPPLIER FROM upload_lp_detail A
                    WHERE
                    A.VENDOR IN (
                    SELECT 
                    A.VENDOR
                        FROM upload_lp_detail A
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
                update upload_lp_detail set
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
    function sync_manualmapping_itempart($param){
        $this->load->database();
        $this->db->simple_query("
                update upload_lp_detail set
                MAPP_PARTNO='".$param['PART_NO']."'
                where
                PART_CODE='".$param['PART_NO']."' AND 
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
                upload_lp_detail
                SET 
                upload_lp_detail.MAPP_PARTNO = B.MAPP_PARTNO
                FROM 
                upload_lp_detail A
                LEFT JOIN 
                (
                    SELECT A.PART_CODE,A.MAPP_PARTNO FROM upload_lp_detail A
                                        WHERE A.PART_CODE IN (
                                        SELECT 
                                        A.PART_CODE
                                        FROM upload_lp_detail A
                                        WHERE 
                                        A.MAPP_PARTNO ='' OR A.MAPP_PARTNO is NULL
                                        GROUP BY A.PART_CODE, A.MAPP_PARTNO ) AND
                                        A.MAPP_PARTNO<>'' AND
                                        A.MAPP_PARTNO IS NOT NULL 
                                        GROUP BY
                                        A.PART_CODE,A.MAPP_PARTNO
                ) B
                    ON A.PART_CODE = B.PART_CODE
                WHERE 
                A.MAPP_PARTNO ='' OR A.MAPP_PARTNO is NULL
        ");

        $data = array(
            'success' => 'true',
            'message' => 'Auto Mapping Supplier Selesai'
         );
        return json_encode($data );
    }
    function read_invoice_mapping_itempart($param){
        $this->load->database();
        $this->db->select("
            MAX(A.VENDOR) as VENDOR,
            MAX(A.INVOICE_NO) as INVOICE_NO,
            A.PART_CODE,
            A.PART_NUMBER,
            A.PART_UNIT
        ");
        $this->db->from("upload_lp_detail A");
        $this->db->where("
            A.MAPP_PARTNO is NULL OR
            A.MAPP_PARTNO =''
        ");

        $this->db->group_by("
            A.PART_CODE,
            A.PART_NUMBER,
            A.PART_UNIT
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
    function proses_save_dokumen_draft($param){
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_LP_CREATE_DOKUMEN_DRAFT
        @VIDCOMPANY=?,
        @VUSERNAME=?,
        @VHEADER=?,
        @VDOKUMEN=?
        ";
        $data = array(
            '@VIDCOMPANY' => $param['ID_COMPANY'], 
            '@VUSERNAME' => $param['VUSERNAME'], 
            '@VHEADER' => $param['header'],
            '@VDOKUMEN' => $param['dokumen']
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->row_array();

        
        return json_encode($row);
    }
    function SP_LP_DRAFT_SELECT_INVOICE($param){
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_LP_DRAFT_SELECT_INVOICE
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