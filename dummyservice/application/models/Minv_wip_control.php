<?php
class Minv_wip_control extends CI_Model {

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
            case "list_bom":
                return $this->list_bom($param);
                break;
            case "list_production":
                return $this->list_production($param);
                break;
            case "list_production_detail":
                return $this->list_production_detail($param);
                break;
            case "bchistory_header":
                return $this->bchistory_header($param);
                break;
            case "bchistory_detail":
                return $this->bchistory_detail($param);
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
    function list_bom($param){
        $this->load->database();
        $this->db->select("
        A.ASSY_CODE,A.PART_NO,A.PART_QTY
        ");
        $this->db->from("
            mst_bom_detail A
        ");
        
        $arr_field = array(
            'A.PART_NO'=>'PART_NO',
            'A.ASSY_CODE'=>'ASSY_CODE',
            'A.PART_QTY'=>'PART_QTY'
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
        $this->db->order_by("A.ASSY_CODE","DESC");
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
    function list_production($param){
        $this->load->database();
        $this->db->select("
        format(A.Date,'yyyy-MM-dd') as PROD_DATE,
        A.AssyCode as ASSYCODE,
        COUNT(*) as QTY
        ");
        $this->db->from("
            wh_prod_header A
        ");
        $this->db->group_by("
        A.Date,A.AssyCode
        ");
        $this->db->where("
            A.Date = '".$param['from_date']."'
        ");
        $arr_field = array(
            'A.Date'=>'PROD_DATE',
            'A.NameplateID'=>'NAMEPLATE',
            'A.PollyLabelId'=>'POLY_NO',
            'A.CV'=>'CV',
            'A.AssyCode'=>'ASSYCODE',
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
    function list_production_detail($param){
        $this->load->database();
        $this->db->select("
        A.PART_NO,A.QTY,A.ASSY_CODE,A.QTY_NAMEPLATE,A.QTY_BOM,B.OUT_QTY,
        B.WIP_IN_DATE,B.INVOICE_NO,
        B.BC_TYPE,B.SUMBER_DATA,B.NOMOR_AJU,B.TANGGAL_AJU,B.NOMOR_DAFTAR,B.TANGGAL_DAFTAR
        ");
        $this->db->from("wh_prod_detail A");
        $this->db->join("wh_wip_detail_out B"," cast(A.PROD_DATE as date) = B.OUT_DATE AND A.PART_NO = B.MAPP_PARTNO AND A.ASSY_CODE = B.ASSY_PRODUCTION ","left");
      
        $this->db->where("
            cast(A.PROD_DATE as date) ='".$param['from_date']."' 
        ");

        $arr_field = array(
            'A.PROD_DATE'=>'PROD_DATE',
            'A.ASSY_CODE'=>'ASSY_CODE',
            'A.PART_NO'=>'PART_NO'
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
    function bchistory_header($param){
        $this->load->database();
        $this->db->select("
        A.INVOICE_NO,
        A.MAPP_PARTNO,
        SUM(A.WIN_QTY) as WIN_QTY,
        A.SUMBER_DATA,
        A.BC_TYPE,
        A.NOMOR_AJU,
        A.TANGGAL_AJU,
        A.NOMOR_DAFTAR,
        A.TANGGAL_DAFTAR
        ");
        $this->db->from("
        wh_wip_in A
        ");
        $this->db->group_by(
            "
                A.INVOICE_NO,
                A.MAPP_PARTNO,
                A.SUMBER_DATA,
                A.BC_TYPE,
                A.NOMOR_AJU,
                A.TANGGAL_AJU,
                A.NOMOR_DAFTAR,
                A.TANGGAL_DAFTAR
            "
        );
        $arr_field = array(
            'A.INVOICE_NO'=>'INVOICE_NO',
            'A.MAPP_PARTNO'=>'MAPP_PARTNO',
            'A.SUMBER_DATA'=>'SUMBER_DATA',
            'A.BC_TYPE'=>'BC_TYPE',
            'A.NOMOR_AJU'=>'NOMOR_AJU',
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
    function bchistory_detail($param){
        $this->load->database();
        $this->db->select("
        A.OUT_KATEGORI,
        A.ASSY_PRODUCTION,
        SUM(A.OUT_QTY) as OUT_QTY
        ");
        $this->db->from("
        wh_wip_detail_out A
        ");
        $this->db->where(
            "
            A.INVOICE_NO='".$param['INVOICE_NO']."' AND
            A.MAPP_PARTNO='".$param['MAPP_PARTNO']."'
            "
        );
        $this->db->group_by(
            "
            A.OUT_KATEGORI,
            A.ASSY_PRODUCTION
            "
        );
        $arr_field = array(
            'A.OUT_KATEGORI'=>'OUT_KATEGORI',
            'A.ASSY_PRODUCTION'=>'ASSY_PRODUCTION',
        );
        
        
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
        B.PART_NAME,
        B.PART_GROUP,
        B.PART_CATEGORY,
        B.PART_TYPE,
        SUM(A.WIN_QTY) as IN_QTY,
        SUM(A.OUT_QTY) as OUT_QTY,
        SUM(A.SISA_QTY) as STOCK_QTY
        ");
        $this->db->from("VW_WIP_STOCK_FORMULA A");
        $this->db->join("mst_part B","A.MAPP_PARTNO = B.PART_NO","left");
        
        $this->db->group_by("
            A.MAPP_PARTNO,
            B.PART_NAME,
            B.PART_GROUP,
            B.PART_CATEGORY,
            B.PART_TYPE
        ");

        $arr_field = array(
            'A.MAPP_PARTNO'=>'MAPP_PARTNO',
            'B.PART_NAME'=>'PART_NAME',
            'B.PART_GROUP'=>'PART_GROUP',
            'B.PART_CATEGORY'=>'PART_CATEGORY',
            'B.PART_TYPE'=>'PART_TYPE'
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
        SELECT * FROM VW_WIP_STOCK A
        WHERE
        A.MAPP_PARTNO='".$param['MAPP_PARTNO']."'
        AND 
        A.SISA_QTY>0
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
        wh_wip_header_out A
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
        wh_wip_detail_out A
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
        $SQL_CALLSP = "EXEC SP_WIP_OUT_CANCEL
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
    function PROSES_SP_WIP_OUT_GET_BC($param){
        $this->load->database();
        $SQL_checksp = "        
            SELECT
            Req.session_id ,InBuf.event_info 
            FROM sys.dm_exec_requests AS Req
            JOIN sys.dm_exec_sessions AS Ses 
            ON Ses.session_id = Req.session_id
            CROSS APPLY sys.dm_exec_input_buffer(Req.session_id, Req.request_id) AS InBuf
            WHERE
                    InBuf.event_info like '%SP_INV_WIP_OUT_GET_BC%' AND
                    not InBuf.event_info like '%Req.session_id ,InBuf.event_info %'
            
        ";
        $result = $this->db->query($SQL_checksp);
        if ($result->num_rows() > 0) {
            $row = array(
                "success"=>'false',
                "message"=>'Aplikasi sedang diproses'
            );
            return json_encode($row);
        } 
        
        




        $SQL_CALLSP = "EXEC SP_INV_WIP_OUT_GET_BC
        @VIDCOMPANY=?,
        @VUSERNAME=?,
        @VMODULE=?,
        @VOUT_DATE=?,
        @VDATA=?
        ";
        $data = array(
            '@VIDCOMPANY' => $param['ID_COMPANY'], 
            '@VUSERNAME' =>  $param['VUSERNAME'],
            '@VMODULE' => $param['module'], 
            '@VOUT_DATE' => $param['from_date'], 
            '@VDATA' => isset($param['vdata']) ? $param['vdata'] : '', 
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        
        if ($result->num_rows() > 1) {
            $row = $result->result_array();
        } else {
            $row = $result->row_array();
        }
        
        return json_encode($row);
    }
    
}