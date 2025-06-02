<?php
class Minv_wnt_in_aw extends CI_Model {

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
            A.INVOICE_NO,
            A.PART_NO,
            SUM(A.RCV_IN) as QTY,
            B.BC_TYPE,
            B.NOMOR_AJU,
            B.TANGGAL_AJU,
            B.NOMOR_DAFTAR,
            B.TANGGAL_DAFTAR
        ");
        $this->db->from("wh_inv_mat_detail A");
        $this->db->join("wh_inv_mat_header B","A.RECEIPT_NO = B.RECEIPT_NO","left");
        $this->db->group_by("
            B.RECEIPT_DATE,
            A.INVOICE_NO,
            A.PART_NO,
            B.BC_TYPE,
            B.NOMOR_AJU,
            B.TANGGAL_AJU,
            B.NOMOR_DAFTAR,
            B.TANGGAL_DAFTAR
        ");

        $arr_field = array(
            'A.NOMOR_AJU'=>'NOMOR_AJU',
            'A.TANGGAL_AJU'=>'TANGGAL_AJU',
            'A.NOMOR_DAFTAR'=>'NOMOR_DAFTAR'
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
             FROM upload_coo_detail A
            LEFT JOIN tr_bc_header B on A.NOMOR_AJU = B.NOMOR_AJU
            WHERE
            A.MAPP_SUPPLIER IS NOT NULL AND
            A.NOMOR_AJU IS NOT NULL AND
            B.NOMOR_AJU IS NOT NULL 
            
            GROUP BY
            A.INVOICE_NO,
            A.NOMOR_AJU
            HAVING 
            SUM(cast (A.ARRIV_PLAN_NUMBER as NUMERIC(18,5)) ) >
            ISNULL((select SUM(D.RCV_IN) FROM wh_inv_mat_detail D WHERE
            D.INVOICE_NO = A.INVOICE_NO AND A.NOMOR_AJU = D.NOMOR_AJU
            ),0)

        ) A
        ");
        

        $arr_field = array(
            'A.NOMOR_AJU'=>'NOMOR_AJU',
            'A.TANGGAL_AJU'=>'TANGGAL_AJU',
            'A.NOMOR_DAFTAR'=>'NOMOR_DAFTAR',
            'A.INVOICE_NO'=>'INVOICE_NO'
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
        
        //$tempdb = clone $this->db;
        //$count= $tempdb->count_all_results(); 
        
        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }
        
        $query = $this->db->get();
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
                return $this->SP_INV_MATERIAL_IN_CREATE_COO($param);
                break;
            
            default:
              return false;
          }
        
    }
    function SP_INV_MATERIAL_IN_CREATE_COO($param){
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_INV_MATERIAL_IN_CREATE_COO
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
    function read_integrasi_pis($param){
        $this->load->database();
        $this->db->select("
            A.SUPPLIER_CODE,
            A.INVOICE_NO,
            A.RECEIPT_DATE,
            A.PART_NO,
            A.QTY,
            B.QTY as SUMBER_QTY,
            B.PART_NO as SUMBER_PARTNO,
            B.MODE_SOURCE,
            B.BC_TYPE,
            B.NOMOR_AJU,
            FORMAT(B.TANGGAL_AJU,'yyyy-MM-dd') as TANGGAL_AJU,
            B.NOMOR_DAFTAR,
            FORMAT(B.TANGGAL_DAFTAR,'yyyy-MM-dd') as TANGGAL_DAFTAR
        ");
        $this->db->from("
        (
            SELECT 
            B.Supplier_Code as SUPPLIER_CODE,
            B.Invoice_No as INVOICE_NO,
            A.Receipt_Date as RECEIPT_DATE,
            A.Part_Code as PART_NO,
            C.Supplier_PartNo,
            sum(A.Qty) as QTY
             FROM PEMI_PIS_TRIAL.dbo.Part_Receipt A
             LEFT JOIN PEMI_PIS_TRIAL.dbo.PackingList_Master B on A.PackingList_No = B.PackingList_NO
             LEFT JOIN PEMI_PIS_TRIAL.dbo.PackingList_Detail C on A.PackingList_NO = C.PackingList_NO AND A.Part_Code=C.Item_Code
             
            WHERE
            A.Receipt_Date='".$param['vdate']."'
            GROUP BY
            B.Supplier_Code,
            B.Invoice_No,
            A.Part_Code,
            C.Supplier_PartNo,
            A.Receipt_Date ) A
        ");
        $this->db->join(" VW_SUMBERDATA B","A.INVOICE_NO = B.INVOICE_NO AND (A.Supplier_PartNo = B.PART_NO OR A.PART_NO=B.PART_NO)","left");
        
       
        $arr_field = array(
            'B.Supplier_Code'=>'SUPPLIER_CODE',
            'B.Invoice_No'=>'INVOICE_NO',
            'A.Receipt_Date'=>'RECEIPT_DATE',
            'A.Part_Code'=>'PART_NO'
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
        
        //$tempdb = clone $this->db;
        //$count= $tempdb->count_all_results(); 
        
        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }
        
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                    //'TotalRows' => $count,
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
}