<?php
class Minv_subassy_aw_in extends CI_Model {

    function read($param){
        switch ($param["method"]) {
            case "read_list_source_coo":
                return $this->read_list_source_coo($param);
                break;
            case "read_in":
                return $this->read_in($param);
                break;
            case "read_integrasi_aw":
                return $this->read_integrasi_aw($param);
                break;
            default:
              return false;
          }
    }
    function read_in($param){
        $this->load->database();
        $this->db->select("
        FORMAT(B.RECEIPT_DATE,'yyyy-MM-dd') as RECEIPT_DATE,
        B.APPROVE_USER,
        FORMAT(B.APPROVE_DATE,'yyyy-MM-dd') as APPROVE_DATE,
        A.RECEIPT_NO,
        A.INVOICE_NO,
        A.PART_NO,
        A.MAPP_PARTNO,
        A.IS_FROM_AW_SEQNO,
        C.PART_NAME,
        A.INVOICE_QTY,
        A.RECEIPT_QTY,
        A.SUMBER_DATA,
        A.JENIS_INPUT,
        A.BC_TYPE,
        A.NOMOR_AJU,
        A.TANGGAL_AJU,
        A.NOMOR_DAFTAR,
        A.TANGGAL_DAFTAR,
        A.SUPPLIER_KODE_INTERNAL,
        A.SUPPLIER_NAME,
        A.CREATE_USER,
        FORMAT(A.CREATE_DATE,'yyyy-MM-dd') as CREATE_DATE
        
        ");
        $this->db->from("wh_inv_detail A");
        
        $this->db->join("wh_inv_header B","A.RECEIPT_NO = B.RECEIPT_NO","left");
        $this->db->join("mst_part C","A.MAPP_PARTNO = C.PART_NO","left");
        $this->db->where("
        A.IS_FROM_AW='YES'
        ");
        $arr_field = array(
            "A.NOMOR_AJU"=>"NOMOR_AJU",
            "A.TANGGAL_AJU"=>"TANGGAL_AJU",
            "A.NOMOR_DAFTAR"=>"NOMOR_DAFTAR",
            "A.RECEIPT_NO"=>"RECEIPT_NO",
            "FORMAT(B.RECEIPT_DATE,'yyyy-MM-dd')"=>"RECEIPT_DATE",
            "A.INVOICE_NO"=>"INVOICE_NO",
            "A.PART_NO"=>"PART_NO",
            "A.MAPP_PARTNO"=>"MAPP_PARTNO",
            "A.RECEIPT_QTY"=>"RECEIPT_QTY",
            "C.PART_NAME"=>"PART_NAME",
            "A.IS_FROM_AW_SEQNO"=>"IS_FROM_AW_SEQNO"
            
        );
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                    $this->db->like(array_search($val['property'],$arr_field),$val['value']);
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
    function read_list_source_coo($param){
        $this->load->database();
        $varlike=" ";

        $arr_field = array(
            'A.VENDOR'=>'VENDOR',
            'A.NAMA'=>'NAMA',
            'A.BC_TYPE'=>'BC_TYPE',
            'A.INVOICE_NO'=>'INVOICE_NO',
            'A.NOMOR_AJU'=>'NOMOR_AJU',
            'A.TANGGAL_AJU'=>'TANGGAL_AJU',
            'A.NOMOR_DAFTAR'=>'NOMOR_DAFTAR'
        );

        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                    //$this->db->like(array_search($val['property'],$arr_field),$val['value']);
                    $varlike = $varlike . " AND " . array_search($val['property'],$arr_field) . " like '%" . $val['value'] . "%'";

            }
        }


        $query = $this->db->query("
        SELECT TOP 15
            B.NAMA,A.INVOICE_NO,A.VENDOR,A.BC_TYPE,A.NOMOR_AJU,A.TANGGAL_AJU,A.NOMOR_DAFTAR,A.TANGGAL_DAFTAR
            FROM upload_coo_detail A
            LEFT JOIN referensi_pemasok B on A.MAPP_SUPPLIER = B.KODE_INTERNAL
                LEFT JOIN (
                SELECT 
            DISTINCT A.INVOICE_NO
            FROM (
            SELECT 
            A.INVOICE_NO,
            A.PART_NO,
            SUM(A.RECEIPT_QTY) as RECEIPT_QTY,
            MAX(B.QTY) as INVOICE_QTY
            from wh_inv_detail A
            LEFT JOIN (
            SELECT 
            A.INVOICE_NO,A.MAPP_PARTNO,SUM(cast(A.ARRIV_PLAN_NUMBER as NUMERIC(18,5) )) as QTY
            FROM upload_coo_detail A
            WHERE 
            A.BC_TYPE is NOT NULL AND
            A.MAPP_SUPPLIER is not NULL AND
            A.MAPP_PARTNO is not NULL
            GROUP BY
            A.INVOICE_NO,A.MAPP_PARTNO
            ) B on A.INVOICE_NO = B.INVOICE_NO AND A.PART_NO = B.MAPP_PARTNO
            WHERE 
            A.SUMBER_DATA='COO'
            GROUP BY A.INVOICE_NO,A.PART_NO
            ) A
            WHERE
            A.INVOICE_QTY= A.RECEIPT_QTY 
                ) C on A.INVOICE_NO = C.INVOICE_NO
                LEFT JOIN tr_bc_header D on A.NOMOR_AJU = D.NOMOR_AJU
                WHERE
                D.NOMOR_AJU IS NOT NULL AND 
                A.NOMOR_AJU IS NOT NULL AND 
                NOT A.NOMOR_AJU like '%DRAFT%' AND 
                C.INVOICE_NO is NULL 
                ". $varlike ."
            GROUP BY
            B.NAMA,A.INVOICE_NO,A.VENDOR,A.BC_TYPE,A.NOMOR_AJU,A.TANGGAL_AJU,A.NOMOR_DAFTAR,A.TANGGAL_DAFTAR
        ",false);
        
        $rows = $query->result_array();
        $data = array(
                    //'TotalRows' => $count,
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
    function receiving_select_aju($param){
        
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
    function create_receiving($param){
        switch ($param["module"]) {
            case "coo":
                return $this->SP_INV_MATERIAL_IN_MANUAL($param);
                break;
            
            default:
              return false;
          }
        
    }
    function SP_INV_MATERIAL_IN_MANUAL($param){
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_INV_MATERIAL_IN_MANUAL
        @VUSERNAME=?,
        @VHEADER=?,
        @VDETAIL=?
        ";
        $data = array(
            '@VUSERNAME' => $param['VUSERNAME'], 
            '@VHEADER' => $param['header'], 
            '@VDETAIL' =>  $param['detail']
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->row_array();

        
        return json_encode($row);
    }
    function read_integrasi_aw($param){
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_INV_MATERIAL_IN_AW_AUTO
        @VIDCOMPANY=?,
        @VUSERNAME=?,
        @VRECEIPT_DATE=?,
        @VMODULE=?,
        @VDATA=?
        ";
        $data = array(
            '@VIDCOMPANY' => $param['ID_COMPANY'], 
            '@VUSERNAME' =>  $param['VUSERNAME'], 
            '@VRECEIPT_DATE' => $param['vdate'], 
            '@VMODULE' => $param['module'], 
            '@VDATA' => isset($param['vdata']) ? $param['vdata'] : '', 
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->result_array();
        //$vdtpis = json_decode($row['vjson_datapis']);
        
        return json_encode($row);
    }
    
    
}