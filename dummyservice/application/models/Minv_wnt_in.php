<?php
class Minv_wnt_in extends CI_Model {

    function read($param){
        switch ($param["method"]) {
            case "read_in":
                return $this->read_in($param);
                break;
            case "read_sumberdata":
                return $this->read_sumberdata($param);
                break;
            case "read_list_source_lp":
                return $this->read_list_source_lp($param);
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
        $this->db->where("
            A.MENU_INPUT='WNT'
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
    function read_sumberdata($param){
        $this->load->database();
        $SQL = "
        SELECT DISTINCT MODE_CODE,MODE_NAME,A.MODE_SHORT FROM a_matrix A
        WHERE
        A.MODE_CATEGORY='RECEIVING_MATERIAL_WNT'
        ORDER BY A.MODE_SHORT
        ";
        $result = $this->db->query($SQL);
        $rows = $result->result_array();
        return json_encode($rows);
    }
    function read_list_source_lp($param){
        $this->load->database();
        $varlike=" ";

        $arr_field = array(
            'C.VENDOR'=>'VENDOR',
            'D.NAMA'=>'NAMA',
            'C.BC_TYPE'=>'BC_TYPE',
            'C.INVOICE_NO'=>'INVOICE_NO',
            'C.NOMOR_AJU'=>'NOMOR_AJU',
            'C.TANGGAL_AJU'=>'TANGGAL_AJU',
            'C.NOMOR_DAFTAR'=>'NOMOR_DAFTAR',
            'C.GR_SUPPLIERNO'=>'GR_SUPPLIERNO'
        );

        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                    //$this->db->like(array_search($val['property'],$arr_field),$val['value']);
                    $varlike = $varlike . " AND " . array_search($val['property'],$arr_field) . " like '%" . $val['value'] . "%'";

            }
        }


        $query = $this->db->query("
            SELECT 
            TOP 15 A.VENDOR,A.NAMA,A.INVOICE_NO,A.BC_TYPE,A.GR_SUPPLIERNO,A.NOMOR_AJU,A.TANGGAL_AJU,A.NOMOR_DAFTAR,A.TANGGAL_DAFTAR
            FROM (
            SELECT
            DISTINCT C.VENDOR,D.NAMA,C.INVOICE_NO,C.GR_SUPPLIERNO,C.BC_TYPE,C.NOMOR_AJU,
            FORMAT(C.TANGGAL_AJU,'yyyy-MM-dd') as TANGGAL_AJU,
            C.NOMOR_DAFTAR,
            FORMAT(C.TANGGAL_DAFTAR,'yyyy-MM-dd') as TANGGAL_DAFTAR
            FROM (
            SELECT A.VENDOR,A.INVOICE_NO,A.NOMOR_AJU,A.MAPP_PARTNO,'LP' as SUMBER_DATA,SUM(A.GR_QTY) as GR_QTY FROM upload_lp_detail A
            WHERE 
            A.BC_TYPE IS NOT NULL AND 
            A.MAPP_SUPPLIER is NOT NULL
            GROUP BY
            A.VENDOR,A.INVOICE_NO,A.NOMOR_AJU,A.MAPP_PARTNO) A
            LEFT JOIN (
            SELECT A.INVOICE_NO,A.NOMOR_AJU,A.MAPP_PARTNO,A.SUMBER_DATA,SUM(A.RECEIPT_QTY) as RECEIPT_QTY FROM wh_inv_detail A
            GROUP BY 
            A.INVOICE_NO,A.NOMOR_AJU,A.MAPP_PARTNO,A.SUMBER_DATA
            ) B on A.INVOICE_NO = B.INVOICE_NO AND A.NOMOR_AJU = B.NOMOR_AJU AND A.SUMBER_DATA = B.SUMBER_DATA AND A.MAPP_PARTNO = A.MAPP_PARTNO
            LEFT JOIN upload_lp_detail C on A.INVOICE_NO = C.INVOICE_NO
            LEFT JOIN referensi_pemasok D on C.MAPP_SUPPLIER = D.KODE_INTERNAL
            WHERE
            A.GR_QTY>isnull(B.RECEIPT_QTY,0) AND 
            A.INVOICE_NO = C.INVOICE_NO  AND 
            NOT C.NOMOR_AJU like '%DRAFT%'
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
    function receiving_wnt_select_aju($param){
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_INV_WNT_IN_SELECT_AJU
        @VIDCOMPANY=?,
        @VUSERNAME=?,
        @VMODULE=?,
        @VDATA=?
        ";
        $data = array(
            '@VIDCOMPANY' => $param['ID_COMPANY'], 
            '@VUSERNAME' => $param['VUSERNAME'], 
            '@VMODULE' => $param['vmodule'],
            '@VDATA' => $param['vdata']
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->row_array();

        
        return json_encode($row);
    }
    
}