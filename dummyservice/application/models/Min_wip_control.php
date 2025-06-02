<?php
class Min_wip_control extends CI_Model {

    function read($param){
        switch ($param["method"]) {
            case "read_control":
                return $this->read_control($param);
                break;
            case "read_mutasi_stock":
                return $this->read_mutasi_stock($param);
                break;
            case "stockitem_bydocument":
                return $this->stockitem_bydocument($param);
                break;
            case "stockitem_receipt_in":
                return $this->stockitem_receipt_in($param);
                break;
            case "stockitem_out":
                return $this->stockitem_out($param);
                break;
            case "read_selling_header":
                return $this->read_selling_header($param);
                break;
            case "memo_selling_byitem":
                return $this->memo_selling_byitem($param);
                break;
            case "read_scrap_header":
                return $this->read_scrap_header($param);
                break;
            case "memo_scrap_byitem":
                return $this->memo_scrap_byitem($param);
                break;
            case "read_outreceiving_header":
                return $this->read_outreceiving_header($param);
                break;
            case "outreceiving_byitem":
                return $this->outreceiving_byitem($param);
                break;
            case "read_stock_itempending":
                return $this->read_stock_itempending($param);
                break;
                
                
            default:
              return false;
          }
    }
    function read_control($param){
        $this->load->database();
        $this->db->select("
            MODE_CATEGORY,MODE_CODE,MODE_NAME,VAL1 as MODE_CONTROL
        ");
        $this->db->from("a_matrix");
        
        $this->db->where("
        MODE_CATEGORY='inv_wip_control'
        ");

        $this->db->order_by("MODE_SHORT");
        
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
    function read_mutasi_stock($param){
        $this->load->database();
        $this->db->select("
        A.MAPP_PARTNO,
        C.PART_NAME,
        C.PART_GROUP,
        C.PART_CATEGORY,
        A.IN_QTY,
        isnull(B.OUT_QTY ,0) as OUT_QTY,
        (isnull(A.IN_QTY,0) - isnull(B.OUT_QTY ,0)) as STOCK_QTY
        ");
        $this->db->from("
            (
            SELECT 
            A.MAPP_PARTNO,SUM(A.RECEIPT_QTY) as IN_QTY
            FROM wh_inv_detail A
            where
            A.IS_FROM_AW='NO'
            GROUP BY
            A.MAPP_PARTNO ) A
        ");
        $this->db->join("
        (
            SELECT 
            A.MAPP_PARTNO,SUM(A.OUT_QTY) as OUT_QTY
            FROM wh_inv_detail_out A
            where
            A.IS_FROM_AW='NO'
            GROUP BY
            A.MAPP_PARTNO
            ) B
        ","A.MAPP_PARTNO = B.MAPP_PARTNO","left");
        $this->db->join("mst_part C","A.MAPP_PARTNO = C.PART_NO","left");
        
        $arr_field = array(
            'A.MAPP_PARTNO'=>'MAPP_PARTNO',
            'C.PART_NAME'=>'PART_NAME',
            'C.PART_GROUP'=>'PART_GROUP',
            'C.PART_CATEGORY'=>'PART_CATEGORY'
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
    function stockitem_bydocument($param){
        $this->load->database();
        $query = $this->db->query("
        SELECT 
        A.MAPP_PARTNO,
        A.INVOICE_NO,
        A.BC_TYPE,
        A.NOMOR_AJU,
        A.TANGGAL_AJU,
        A.NOMOR_DAFTAR,
        A.TANGGAL_DAFTAR,
        A.IN_QTY,
        B.OUT_QTY,
        (A.IN_QTY - isnull(B.OUT_QTY,0)) as STOCK_QTY
        FROM (
        SELECT 
        A.MAPP_PARTNO,
        A.INVOICE_NO,
        A.BC_TYPE,
        A.NOMOR_AJU,
        A.TANGGAL_AJU,
        A.NOMOR_DAFTAR,
        A.TANGGAL_DAFTAR,
        SUM(A.RECEIPT_QTY) as IN_QTY
        FROM wh_inv_detail A
        WHERE
        A.MAPP_PARTNO='".$param['MAPP_PARTNO']."'
        GROUP BY
        A.MAPP_PARTNO,
        A.INVOICE_NO,
        A.BC_TYPE,
        A.NOMOR_AJU,
        A.TANGGAL_AJU,
        A.NOMOR_DAFTAR,
        A.TANGGAL_DAFTAR) A
        OUTER APPLY (
        SELECT INVOICE_NO,MAPP_PARTNO,SUM(OUT_QTY) as OUT_QTY
        from wh_inv_detail_out wout
        WHERE wout.INVOICE_NO = A.INVOICE_NO AND wout.MAPP_PARTNO = A.MAPP_PARTNO
        GROUP BY
        wout.INVOICE_NO,wout.MAPP_PARTNO
        ) B
        where
        (A.IN_QTY - isnull(B.OUT_QTY,0))>0
        ");
        $rows = $query->result_array();
        return json_encode($rows);
    }
    function stockitem_receipt_in($param){
        $this->load->database();
        $query = $this->db->query("
        SELECT 
        format(B.RECEIPT_DATE,'yyyy') as RECEIPT_TAHUN,
        format(B.RECEIPT_DATE,'yyyy-MM') as RECEIPT_BULAN,
        A.MAPP_PARTNO,
        SUM(A.RECEIPT_QTY) as RECEIPT_QTY
        FROM wh_inv_detail A
        LEFT JOIN wh_inv_header B on A.RECEIPT_NO = B.RECEIPT_NO
        WHERE
        A.MAPP_PARTNO='".$param['MAPP_PARTNO']."'
        GROUP BY
        format(B.RECEIPT_DATE,'yyyy'),
        format(B.RECEIPT_DATE,'yyyy-MM'),
        A.MAPP_PARTNO
        ");
        $rows = $query->result_array();
        return json_encode($rows);
    }
    function stockitem_out($param){
        $this->load->database();
        $query = $this->db->query("
        SELECT 
        format(B.OUT_DATE,'yyyy') as OUT_TAHUN,
        format(B.OUT_DATE,'yyyy-MM') as OUT_BULAN,
        A.MAPP_PARTNO,
        SUM(CASE WHEN A.OUT_KATEGORI='TO PRODUCTION' THEN A.OUT_QTY ELSE 0 END ) as OUT_TOPROD,
        SUM(CASE WHEN A.OUT_KATEGORI='MEMO SCRAP' THEN A.OUT_QTY ELSE 0 END ) as OUT_TOSCRAP,
        SUM(CASE WHEN A.OUT_KATEGORI='MEMO SELLING' THEN A.OUT_QTY ELSE 0 END ) as OUT_TOSELLING,
        SUM(A.OUT_QTY) as OUT_TOTAL
        FROM wh_inv_detail_out A
        LEFT JOIN wh_inv_header_out B on A.OUT_NO = B.OUT_NO
        WHERE
        A.MAPP_PARTNO='".$param['MAPP_PARTNO']."'
        GROUP BY
        format(B.OUT_DATE,'yyyy'),
        format(B.OUT_DATE,'yyyy-MM'),
        A.MAPP_PARTNO
        ");
        $rows = $query->result_array();
        return json_encode($rows);
    }
    function read_selling_header($param){
        $this->load->database();
        $this->db->select("
            A.OUT_NO,
            A.OUT_DATE,
            A.OUT_INPUT,
            A.OUT_REMARK,
            A.BAP_NO,
            A.BAP_DATE
        ");
        $this->db->from("
        wh_inv_header_out A
        ");
        
        $this->db->where("
        A.OUT_KATEGORI='MEMO SELLING'
        ");
        $arr_field = array(
            'B.OUT_NO'=>'OUT_NO',
            'B.OUT_DATE'=>'OUT_DATE',
            'A.OUT_INPUT'=>'OUT_INPUT',
            'A.OUT_REMARK'=>'OUT_REMARK',
            'A.BAP_NO'=>'BAP_NO',
            'A.BAP_DATE'=>'BAP_DATE',
        );
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                    $this->db->like(array_search($val['property'],$arr_field),$val['value']);
            }
        }

        
        $tempdb = clone $this->db;
        $count= $tempdb->count_all_results(); 
        
        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }
        
        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->order_by( $val["property"], $val['direction']);
            }
        }
        
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                    'TotalRows' => $count,
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
    function memo_selling_byitem($param){
        $this->load->database();
        $this->db->select("
            A.INVOICE_NO,
            A.MAPP_PARTNO,
            A.OUT_QTY,
            A.BC_TYPE,
            A.NOMOR_AJU,
            A.TANGGAL_AJU,
            A.NOMOR_DAFTAR,
            A.TANGGAL_DAFTAR
        ");
        $this->db->from("
        wh_inv_detail_out A
        ");
        
        $this->db->where("A.OUT_NO",$param['OUT_NO']);
        $arr_field = array(
            'A.INVOICE_NO'=>'OUT_NO',
            'A.MAPP_PARTNO'=>'OUT_NO',
            'A.OUT_QTY'=>'OUT_NO',
            'A.BC_TYPE'=>'OUT_NO',
            'A.NOMOR_AJU'=>'OUT_NO',
            'A.TANGGAL_AJU'=>'OUT_NO',
            'A.NOMOR_DAFTAR'=>'OUT_NO',
            'A.TANGGAL_DAFTAR'=>'OUT_NO'
        );
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                    $this->db->like(array_search($val['property'],$arr_field),$val['value']);
            }
        }

        
        $tempdb = clone $this->db;
        $count= $tempdb->count_all_results(); 
        
        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }
        
        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->order_by( $val["property"], $val['direction']);
            }
        }
        
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                    'TotalRows' => $count,
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
    function read_scrap_header($param){
        $this->load->database();
        $this->db->select("
            A.OUT_NO,
            A.OUT_DATE,
            A.OUT_INPUT,
            A.OUT_REMARK,
            A.BAP_NO,
            A.BAP_DATE
        ");
        $this->db->from("
        wh_inv_header_out A
        ");
        
        $this->db->where("
        A.OUT_KATEGORI='MEMO SCRAP'
        ");
        $arr_field = array(
            'B.OUT_NO'=>'OUT_NO',
            'B.OUT_DATE'=>'OUT_DATE',
            'A.OUT_INPUT'=>'OUT_INPUT',
            'A.OUT_REMARK'=>'OUT_REMARK',
            'A.BAP_NO'=>'BAP_NO',
            'A.BAP_DATE'=>'BAP_DATE',
        );
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                    $this->db->like(array_search($val['property'],$arr_field),$val['value']);
            }
        }

        
        $tempdb = clone $this->db;
        $count= $tempdb->count_all_results(); 
        
        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }
        
        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->order_by( $val["property"], $val['direction']);
            }
        }
        
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                    'TotalRows' => $count,
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
    function memo_scrap_byitem($param){
        $this->load->database();
        $this->db->select("
            A.INVOICE_NO,
            A.MAPP_PARTNO,
            A.OUT_QTY,
            A.BC_TYPE,
            A.NOMOR_AJU,
            A.TANGGAL_AJU,
            A.NOMOR_DAFTAR,
            A.TANGGAL_DAFTAR
        ");
        $this->db->from("
        wh_inv_detail_out A
        ");
        
        $this->db->where("A.OUT_NO",$param['OUT_NO']);
        $arr_field = array(
            'A.INVOICE_NO'=>'OUT_NO',
            'A.MAPP_PARTNO'=>'OUT_NO',
            'A.OUT_QTY'=>'OUT_NO',
            'A.BC_TYPE'=>'OUT_NO',
            'A.NOMOR_AJU'=>'OUT_NO',
            'A.TANGGAL_AJU'=>'OUT_NO',
            'A.NOMOR_DAFTAR'=>'OUT_NO',
            'A.TANGGAL_DAFTAR'=>'OUT_NO'
        );
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                    $this->db->like(array_search($val['property'],$arr_field),$val['value']);
            }
        }

        
        $tempdb = clone $this->db;
        $count= $tempdb->count_all_results(); 
        
        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }
        
        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->order_by( $val["property"], $val['direction']);
            }
        }
        
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                    'TotalRows' => $count,
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
    function proses_cancel($param){
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_INV_MATERIAL_OUT_CANCEL
        @VIDCOMPANY=?,
        @VUSERNAME=?,
        @VMODULE=?,
        @VDATA=?
        ";
        $data = array(
            '@VIDCOMPANY' => $param['ID_COMPANY'], 
            '@VUSERNAME' =>  $param['VUSERNAME'],
            '@VMODULE' => $param['module'], 
            '@VDATA' => isset($param['vdata']) ? $param['vdata'] : '', 
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->result_array();
        //$vdtpis = json_decode($row['vjson_datapis']);
        
        return json_encode($row);
    }
    function read_outreceiving_header($param){
        $this->load->database();
        $varlike=" ";

        $arr_field = array(
            'A.INVOICE_NO'=>'INVOICE_NO',
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
        SELECT TOP 20 A.INVOICE_NO,A.MODE_SOURCE,A.BC_TYPE,A.NOMOR_AJU,
        FORMAT(A.TANGGAL_AJU,'yyyy-MM-dd') as TANGGAL_AJU,A.NOMOR_DAFTAR,
        FORMAT(A.TANGGAL_DAFTAR,'yyyy-MM-dd') as TANGGAL_DAFTAR
            FROM (
            SELECT 
            DISTINCT A.INVOICE_NO,A.MODE_SOURCE,A.BC_TYPE,A.NOMOR_AJU,A.TANGGAL_AJU,A.NOMOR_DAFTAR,A.TANGGAL_DAFTAR
            FROM (
            SELECT 
            A.INVOICE_NO,A.PART_NO,A.MODE_SOURCE,A.BC_TYPE,A.NOMOR_AJU,A.TANGGAL_AJU,A.NOMOR_DAFTAR,A.TANGGAL_DAFTAR,SUM(A.QTY) as QTY
            FROM VW_SUMBERDATA A
            WHERE
            A.NOMOR_AJU IS NOT NULL AND
            A.INVOICE_NO IS NOT NULL
            ". $varlike ."
            GROUP BY
            A.INVOICE_NO,A.PART_NO,A.MODE_SOURCE,A.BC_TYPE,A.NOMOR_AJU,A.TANGGAL_AJU,A.NOMOR_DAFTAR,A.TANGGAL_DAFTAR) A
            LEFT JOIN (
            SELECT 
            A.INVOICE_NO,A.MAPP_PARTNO,SUM(A.RECEIPT_QTY) as RECEIPT_QTY
            FROM wh_inv_detail A
            GROUP BY
            A.INVOICE_NO,A.MAPP_PARTNO
            ) B on A.INVOICE_NO = B.INVOICE_NO AND A.PART_NO = B.MAPP_PARTNO
            WHERE
            A.QTY> ISNULL(B.RECEIPT_QTY,0) AND 
            (
            A.MODE_SOURCE ='COO' OR A.MODE_SOURCE like '%KURIR%'
            ) AND 
            NOT A.NOMOR_AJU like '%DRAFT%'
            ) A
        ",false);
        
        $rows = $query->result_array();
        $data = array(
                    //'TotalRows' => $count,
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
    function outreceiving_byitem($param){
        $this->load->database();
        $query = $this->db->query("
        SELECT
        A.INVOICE_NO,A.PART_NO,C.PART_NAME,
        A.QTY,ISNULL(B.RECEIPT_QTY,0) as RECEIPT_QTY
        FROM (
        SELECT 
        A.INVOICE_NO,A.PART_NO,SUM(A.QTY) as QTY
        FROM VW_SUMBERDATA A
        WHERE
        A.INVOICE_NO='".$param['INVOICE_NO']."'
        GROUP BY
        A.INVOICE_NO,A.PART_NO ) A
        LEFT JOIN (
        SELECT 
        A.INVOICE_NO,A.MAPP_PARTNO,
        SUM(A.RECEIPT_QTY) as RECEIPT_QTY
        FROM wh_inv_detail A
        GROUP BY
        A.INVOICE_NO,A.MAPP_PARTNO
        ) B on A.INVOICE_NO = B.INVOICE_NO AND A.PART_NO = B.MAPP_PARTNO
        LEFT JOIN mst_part C on A.PART_NO = C.PART_NO
        WHERE
        A.QTY>ISNULL(B.RECEIPT_QTY,0)
        ");
        $rows = $query->result_array();
        return json_encode($rows);
    }
    function read_stock_itempending($param){
        $this->load->database();
        $varlike=" ";

        $arr_field = array(
            'B.RECEIPT_DATE'=>'RECEIPT_DATE',
            'A.INVOICE_NO'=>'INVOICE_NO',
            'A.MAPP_PARTNO'=>'MAPP_PARTNO',
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
        SELECT TOP 20
        B.RECEIPT_DATE,
        B.INVOICE_NO,B.MAPP_PARTNO,B.RECEIPT_QTY,B.SUMBER_DATA,
        ISNULL(C.OUT_QTY,0) as OUT_QTY,ISNULL(C.TO_PROD,0) as TO_PROD,ISNULL(C.MEMO_SELLING,0) as MEMO_SELLING,ISNULL(C.MEMO_SCRAP,0) as MEMO_SCRAP,
        B.BC_TYPE,B.NOMOR_AJU,B.TANGGAL_AJU,B.NOMOR_DAFTAR,B.TANGGAL_DAFTAR
        FROM (
        SELECT
        A.INVOICE_NO,A.MAPP_PARTNO,
        MAX(B.RECEIPT_DATE) as RECEIPT_DATE,
        MAX(A.SUMBER_DATA) as SUMBER_DATA,
        MAX(A.BC_TYPE) as BC_TYPE,
        MAX(A.NOMOR_AJU) as NOMOR_AJU,
        MAX(FORMAT(A.TANGGAL_AJU,'yyyy-MM-dd')) as TANGGAL_AJU,
        MAX(A.NOMOR_DAFTAR) as NOMOR_DAFTAR,
        MAX(FORMAT(A.TANGGAL_DAFTAR,'yyyy-MM-dd')) as TANGGAL_DAFTAR,

        SUM(A.RECEIPT_QTY) as RECEIPT_QTY
        FROM wh_inv_detail A
        LEFT JOIN wh_inv_header B on A.RECEIPT_NO = B.RECEIPT_NO
        WHERE
        B.RECEIPT_DATE < DATEADD(MONTH, -6, GETDATE())
        ". $varlike ."
        GROUP BY
        A.INVOICE_NO,A.MAPP_PARTNO) B
        OUTER APPLY (
        SELECT 
        A.INVOICE_NO,A.MAPP_PARTNO,
        SUM(CASE WHEN A.OUT_KATEGORI='TO PRODUCTION' THEN A.OUT_QTY ELSE 0 END) as TO_PROD,
        SUM(CASE WHEN A.OUT_KATEGORI='MEMO SELLING' THEN A.OUT_QTY ELSE 0 END) as MEMO_SELLING,
        SUM(CASE WHEN A.OUT_KATEGORI='MEMO SCRAP' THEN A.OUT_QTY ELSE 0 END) as MEMO_SCRAP,
        SUM(A.OUT_QTY) as OUT_QTY
        FROM wh_inv_detail_out A
        WHERE A.INVOICE_NO = B.INVOICE_NO AND A.MAPP_PARTNO = B.MAPP_PARTNO
        GROUP BY
        A.INVOICE_NO,A.MAPP_PARTNO
        ) C
        WHERE
        B.RECEIPT_QTY > ISNULL(C.OUT_QTY,0)
        ",false);
        
        $rows = $query->result_array();
        $data = array(
                    //'TotalRows' => $count,
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
    
}