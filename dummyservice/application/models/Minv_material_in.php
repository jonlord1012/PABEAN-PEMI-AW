<?php
class Minv_material_in extends CI_Model {

    function read($param){
        switch ($param["method"]) {
            case "read_list_source_coo":
                return $this->read_list_source_coo($param);
                break;
            case "read_in":
                return $this->read_in($param);
                break;
            case "read_integrasi_pis":
                return $this->read_integrasi_pis($param);
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
            A.IS_FROM_AW='NO'
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
            'B.VENDOR'=>'VENDOR',
            'C.NAMA'=>'NAMA',
            'B.BC_TYPE'=>'BC_TYPE',
            'B.INVOICE_NO'=>'INVOICE_NO',
            'B.NOMOR_AJU'=>'NOMOR_AJU',
            'B.TANGGAL_AJU'=>'TANGGAL_AJU',
            'B.NOMOR_DAFTAR'=>'NOMOR_DAFTAR'
        );

        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                    //$this->db->like(array_search($val['property'],$arr_field),$val['value']);
                    $varlike = $varlike . " AND " . array_search($val['property'],$arr_field) . " like '%" . $val['value'] . "%'";

            }
        }


        $query = $this->db->query("
        SELECT TOP 15 * FROM (
            SELECT DISTINCT B.INVOICE_NO,B.VENDOR,B.BC_TYPE,B.NOMOR_AJU,
            FORMAT(B.TANGGAL_AJU,'yyyy-MM-dd') as TANGGAL_AJU,B.NOMOR_DAFTAR,
            FORMAT(B.TANGGAL_DAFTAR,'yyyy-MM-dd') as TANGGAL_DAFTAR,C.NAMA
            FROM 
            (
            
            SELECT 
            A.INVOICE_NO,
            A.MAPP_PARTNO,
            SUM(cast(A.ARRIV_PLAN_NUMBER as NUMERIC(18,5))) as QTY,
            SUM(B.RECEIPT_QTY) as RCV_QTY
             FROM upload_coo_detail A
             LEFT JOIN wh_inv_detail B on A.INVOICE_NO = B.INVOICE_NO AND A.MAPP_PARTNO = B.MAPP_PARTNO
             
             WHERE
             A.BC_TYPE is not NULL
            GROUP BY
            A.INVOICE_NO,
            A.MAPP_PARTNO
            ) A
            LEFT JOIN upload_coo_detail B on A.INVOICE_NO = B.INVOICE_NO
            LEFT JOIN referensi_pemasok C on B.MAPP_SUPPLIER = C.KODE_INTERNAL
            WHERE 
            A.INVOICE_NO IS NOT NULL 
            AND ( A.RCV_QTY is NULL OR  A.RCV_QTY < A.QTY )
            AND B.INVOICE_NO is not NULL 
            ". $varlike ."
            ) A
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
    function read_integrasi_pis($param){
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_INV_MATERIAL_IN_RECEIPT_PIS
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