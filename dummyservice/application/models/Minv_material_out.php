<?php
class Minv_material_out extends CI_Model {

    function read($param){
        switch ($param["method"]) {
            case "read_list_source_coo":
                return $this->read_list_source_coo($param);
                break;
            case "read_out":
                return $this->read_out($param);
                break;
            case "integrasi_pis_out":
                return $this->integrasi_pis_out($param);
                break;
            case "select_itempart_manual":
                return $this->select_itempart_manual($param);
                break;
            default:
              return false;
          }
    }
    function read_out($param){
        $this->load->database();
        $this->db->select("
        FORMAT(B.OUT_DATE,'yyyy-MM-dd') as OUT_DATE,
        B.APPROVE_USER,
        FORMAT(B.APPROVE_DATE,'yyyy-MM-dd') as APPROVE_DATE,
        A.OUT_NO,
        A.INVOICE_NO,
        A.PART_NO,
        A.MAPP_PARTNO,
        C.PART_NAME,
        A.OUT_QTY,
        A.SUMBER_DATA,
        A.OUT_KATEGORI,
        A.OUT_INPUT,
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
        $this->db->from("wh_inv_detail_out A");
        
        $this->db->join("wh_inv_header_out B","A.OUT_NO = B.OUT_NO","left");
        $this->db->join("mst_part C","A.MAPP_PARTNO = C.PART_NO","left");
        $this->db->where(
            "A.IS_FROM_AW='NO'"
        );
        $arr_field = array(
            "A.NOMOR_AJU"=>"NOMOR_AJU",
            "A.TANGGAL_AJU"=>"TANGGAL_AJU",
            "A.NOMOR_DAFTAR"=>"NOMOR_DAFTAR",
            "A.OUT_NO"=>"OUT_NO",
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

        
        $tempdb = clone $this->db;
        $count= $tempdb->count_all_results(); 
        
        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->order_by( $val["property"], $val['direction']);
            }
        }
        
        $this->db->order_by( "B.OUT_DATE","DESC");

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
    function select_itempart_manual($param){
        $this->load->database();
        $varlike=" ";

        $arr_field = array(
            'A.MAPP_PARTNO'=>'MAPP_PARTNO',
            'A.PART_NO'=>'PART_NO',
            'C.PART_NAME'=>'PART_NAME',
            'A.INVOICE_NO'=>'INVOICE_NO',
            'A.SUMBER_DATA'=>'SUMBER_DATA',
            'A.BC_TYPE'=>'BC_TYPE',
            'A.NOMOR_AJU'=>'NOMOR_AJU',
            'A.TANGGAL_AJU'=>'TANGGAL_AJU',
            'A.NOMOR_DAFTAR'=>'NOMOR_DAFTAR',
            'A.TANGGAL_DAFTAR'=>'TANGGAL_DAFTAR',
        );

        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                    //$this->db->like(array_search($val['property'],$arr_field),$val['value']);
                    $varlike = $varlike . " AND " . array_search($val['property'], $arr_field) . " like '%" . $val['value'] . "%'";

            }
        }


        $query = $this->db->query("
        SELECT TOP 20 
            A.INVOICE_NO,
            A.MAPP_PARTNO,
            A.PART_NAME,
            A.PART_NO ,
            A.SUMBER_DATA,A.BC_TYPE,A.NOMOR_AJU,A.TANGGAL_AJU,A.NOMOR_DAFTAR,A.TANGGAL_DAFTAR,
            ISNULL(B.OUT_QTY,0) as OUT_QTY,
            (A.RECEIPT_QTY - ISNULL(B.OUT_QTY,0) ) as SISA_QTY
            FROM (
            SELECT 
            A.INVOICE_NO,A.PART_NO,A.MAPP_PARTNO,MAX(C.PART_NAME) as PART_NAME,
            SUM(A.RECEIPT_QTY) as RECEIPT_QTY,
            A.SUMBER_DATA,A.BC_TYPE,A.NOMOR_AJU,A.TANGGAL_AJU,A.NOMOR_DAFTAR,A.TANGGAL_DAFTAR

            from wh_inv_detail A
            LEFT JOIN wh_inv_header B on A.RECEIPT_NO = B.RECEIPT_NO
            LEFT JOIN mst_part C on A.MAPP_PARTNO = C.PART_NO
            WHERE
            A.IS_FROM_AW='NO' AND 
            B.RECEIPT_DATE<='".$param['vdate']."' 
            ". $varlike ."
            GROUP BY
            A.INVOICE_NO,A.PART_NO,A.MAPP_PARTNO,A.SUMBER_DATA,A.BC_TYPE,A.NOMOR_AJU,A.TANGGAL_AJU,A.NOMOR_DAFTAR,A.TANGGAL_DAFTAR
            ) A
            OUTER APPLY (
                select 
                whout.INVOICE_NO,whout.MAPP_PARTNO, SUM(whout.OUT_QTY) as OUT_QTY
                 FROM wh_inv_detail_out whout 
                WHERE 
                whout.INVOICE_NO = A.INVOICE_NO AND whout.MAPP_PARTNO = A.MAPP_PARTNO
                GROUP BY whout.INVOICE_NO,whout.MAPP_PARTNO
            ) B 
            where 
            (A.RECEIPT_QTY - ISNULL(B.OUT_QTY,0) ) >0
        ",false);
        
        $rows = $query->result_array();
        $data = array(
                    //'TotalRows' => $count,
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
    function integrasi_pis_out($param){
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_INV_MATERIAL_OUT_PIS
        @VIDCOMPANY=?,
        @VUSERNAME=?,
        @VOUT_DATE=?,
        @VMODULE=?,
        @VDATA=?
        ";
        $data = array(
            '@VIDCOMPANY' => $param['ID_COMPANY'], 
            '@VUSERNAME' =>  $param['VUSERNAME'], 
            '@VOUT_DATE' => $param['vdate'], 
            '@VMODULE' => $param['module'], 
            '@VDATA' => isset($param['vdata']) ? $param['vdata'] : '', 
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->result_array();
        //$vdtpis = json_decode($row['vjson_datapis']);
        
        return json_encode($row);
    }
    function proses_out_manual($param){
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_INV_MATERIAL_OUT_MANUAL
        @VIDCOMPANY=?,
        @VUSERNAME=?,
        @VOUT_DATE=?,
        @VMODULE=?,
        @VDATA=?
        ";
        $data = array(
            '@VIDCOMPANY' => $param['ID_COMPANY'], 
            '@VUSERNAME' =>  $param['VUSERNAME'], 
            '@VOUT_DATE' => $param['vdate'], 
            '@VMODULE' => $param['module'], 
            '@VDATA' => isset($param['vdata']) ? $param['vdata'] : '', 
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->result_array();
        //$vdtpis = json_decode($row['vjson_datapis']);
        
        return json_encode($row);
    }
    
    
}