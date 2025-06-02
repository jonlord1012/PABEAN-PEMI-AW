<?php
class Minv_material_out_aw extends CI_Model {

    function read($param){
        switch ($param["method"]) {
            case "read_out":
                return $this->read_out($param);
                break;
            case "integrasi_bicc_out":
                return $this->integrasi_bicc_out($param);
                break;
                
            case "integrasi_bicc_out2":
                return $this->integrasi_bicc_out2($param);
                break;
            case "select_itempart_manual":
                return $this->select_itempart_manual($param);
                break;
            case "get_invoice_list":
                return $this->get_invoice_list($param);
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
        $this->db->from("wh_inv_detail_out_aw A");
        
        $this->db->join("wh_inv_header_out_aw B","A.OUT_NO = B.OUT_NO","left");
        $this->db->join("mst_part_aw C","A.MAPP_PARTNO = C.PART_NO","left");

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
                    $varlike = $varlike . " AND " . array_search($val['property'],$arr_field) . " like '%" . $val['value'] . "%'";

            }
        }


        $query = $this->db->query("
        SELECT 
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

            from wh_inv_detail_aw A
            LEFT JOIN wh_inv_header_aw B on A.RECEIPT_NO = B.RECEIPT_NO
            LEFT JOIN mst_part_aw C on A.MAPP_PARTNO = C.PART_NO
            WHERE
            B.RECEIPT_DATE<='".$param['vdate']."' 
            ". $varlike ."
            GROUP BY
            A.INVOICE_NO,A.PART_NO,A.MAPP_PARTNO,A.SUMBER_DATA,A.BC_TYPE,A.NOMOR_AJU,A.TANGGAL_AJU,A.NOMOR_DAFTAR,A.TANGGAL_DAFTAR
            ) A
            OUTER APPLY (
                select 
                whout.INVOICE_NO,whout.MAPP_PARTNO, SUM(whout.OUT_QTY) as OUT_QTY
                 FROM wh_inv_detail_out_aw whout 
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
    function integrasi_bicc_out2($param) {
        $this->load->database(); 
        $SQL_CALLSP = "SELECT * FROM OPENQUERY (MY_BICC, 'SELECT 
        A.KODE AS BICC_PART_NO, 
        A.NO_LOT AS BICC_LOT_NO, 
        A.JAM AS BICC_TR_DATE, 
        A.QTY AS BICC_QTY, 
        A.ID_KED AS ID_KED
         FROM OUT_MATERIAL A WHERE A.JAM =''".$param['vdate']."'' ') 
         " ;
        
        $result = $this->db->query($SQL_CALLSP);
        $row = $result->result_array();
        //$vdtpis = json_decode($row['vjson_datapis']);
        
        return json_encode($row);
    }
    function integrasi_bicc_out1($param){
        $this->load->database();

        $SQL_CALLSP = "
        /*
        select  	
        C.PART_NO, 
        C.INVOICE_NO, 
        C.INVOICE_QTY,
        C.RECEIPT_QTY,
        C.NOMOR_AJU, 
        C.NOMOR_DAFTAR,
        A.* 
        
        from (
        */
            SELECT 
            A.* 
            , B.NOMOR_DOKUMEN  as INVOICE_NO
            , B.TANGGAL_DOKUMEN
            , B.NOMOR_AJU
            , B.TANGGAL_AJU
            , B.NOMOR_DAFTAR
            , B.TANGGAL_DAFTAR
            , B.KODE_BARANG as PART_NO
            , B.JUMLAH_SATUAN AS QTY_INVOICE
            , B.SERI_BARANG AS SERI_BARANG
            , B.KODE_SATUAN
            , B.ID_HEADER_ORI
                   FROM 
                   ( SELECT 
                       *		
                     FROM OPENQUERY (MY_BICC, '
                       SELECT 
                           A.JAM as BICC_TR_DATE,
                           REPLACE(REPLACE((REPLACE((REPLACE(REPLACE(A.NO_LOT,'' T'',''''),'' -'','''')), '' P'', '''')),'' -'', ''''),''T'','''')  AS BICC_LOT_NO, 
                           A.kode as BICC_PART_NO,
                           A.nama AS PART_NAME , 
                           SUM(A.QTY) as BICC_QTY,         
                           A.supply AS SUPPLY_TO, 
                           NULLIF(A.id_ked,'''') AS ID_KED ,
                           B.NO_BPB , 
                           B.ID_KED AS ID_KED_BPB ,
                           B.NO_INV AS BICC_INVOICE_NO,
                           B.QTY AS QTY_BPB, 
                           A.id AS ID_OUT_MATERIAL
                       FROM out_material A
                           LEFT JOIN 
                            tbl_barang_bpb B 
                           ON A.ID_KED = B.ID_KED and  a.kode = b.code 
                           WHERE a.id_ked <> ''''  	and 
                                               
                            A.JAM =''".$param['vdate']."''
                           GROUP BY A.JAM, A.KODE, REPLACE(REPLACE((REPLACE((REPLACE(REPLACE(A.NO_LOT,'' T'',''''),'' -'','''')), '' P'', '''')),'' -'', ''''),''T'',''''), B.BARCODE , B.NO_INV, B.CODE   
                           ')
                   )A 
                                   
                   LEFT JOIN VW_TR_DATA_LENGKAP B 
                   ON A.BICC_INVOICE_NO = B.NOMOR_DOKUMEN 
                   AND A.BICC_PART_NO = B.KODE_BARANG		
                   /*
        ) A
        LEFT JOIN wh_inv_detail_aw C 
        ON A.BICC_PART_NO = C.PART_NO 
        AND A.BICC_INVOICE_NO = C.INVOICE_NO 
        AND A.NO_BPB = C.SUMBER_DATA 
        */
        "; 
        /*$SQL_CALLSP = "EXEC SP_INV_MATERIAL_OUT_BICC
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
        */
        $result = $this->db->query($SQL_CALLSP);
        $row = $result->result_array();
        //$vdtpis = json_decode($row['vjson_datapis']);
        
        return json_encode($row);
    }
    function proses_out_manual($param){
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_INV_MATERIAL_OUT_MANUAL_AW
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
    function get_invoice_list ($param) {
        $this->load->database();
        $SQL_CALLSP = "SELECT 
              A.RECEIPT_NO 
            , A.INVOICE_NO
            , A.PART_NO
            , C.TOTAL_OUT  
            , (ISNULL(A.RECEIPT_QTY,0) - ISNULL(C.TOTAL_OUT,0)) AS SISA
            , A.SUPPLIER_KODE_INTERNAL 
            , A.SUPPLIER_NAME
            , A.SUMBER_DATA
            , A.NOMOR_AJU
            , A.TANGGAL_AJU
            , A.RECEIPT_QTY AS INVOICE_QTY 
            , ISNULL(C.TOTAL_OUT,0) AS TOTAL_OUT

            FROM 
                wh_inv_detail_aw A
            LEFT JOIN 
                wh_inv_detail_out_aw B
            ON A.PART_NO = B.PART_NO
            LEFT JOIN 
                (
                    SELECT A.PART_NO, A.INVOICE_NO, SUM(A.OUT_QTY) AS TOTAL_OUT  FROM wh_inv_detail_out_aw A GROUP BY A.PART_NO, A.INVOICE_NO
                ) C 
                ON A.PART_NO = C.PART_NO AND A.INVOICE_NO = C.INVOICE_NO 

            WHERE 
                A.PART_NO ='".$param['BICC_PART_NO']."'
 ";
        $result = $this->db->query($SQL_CALLSP);
        $row = $result->result_array();
        //$vdtpis = json_decode($row['vjson_datapis']);
        
        return json_encode($row);
    }
    function supply_invoice_bicc($param){
        $this->load->database() ; 
        $SQL_CALLSP = "EXEC SP_SUPPLY_INVOICE_BICC 
        @VIDCOMPANY=?,
        @VUSERNAME=?,
        @VDATA=?
        " ; 
        
        $data = array(
            '@VIDCOMPANY' => $param['ID_COMPANY'], 
            '@VUSERNAME' =>  $param['VUSERNAME'], 
            '@VDATA' => isset($param['invoice']) ? $param['invoice'] : '', 
        );
        
        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->result_array();
        return json_encode($row);
    }

    function save_data_syncronize($param){
        $this->load->database() ; 
        $SQL_CALLSP = "EXEC SP_WH_OUT_AW_BICC  
        @VIDCOMPANY=?,
        @VUSERNAME=?,
        @VMODULE=?,
        @VDATA=?,
        @VOUT_DATE=?
        " ; 
        
        $data = array(
            '@VIDCOMPANY' => $param['ID_COMPANY'], 
            '@VUSERNAME' =>  $param['VUSERNAME'], 
            '@VMODULE'=>'proses_data',
            '@VDATA' => isset($param['vdata']) ? $param['vdata'] : '', 
            '@VOUT_DATE' => isset($param['vdate']) ? $param['vdate'] : '', 
        );
        
        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->result_array();
        return json_encode($row);
    }
    
}