<?php
class Minv_wip_out extends CI_Model {

    function read($param){
        switch ($param["method"]) {
            case "read_group_conveyor":
                return $this->read_group_conveyor($param);
                break;
            case "SP_FG_GET_DOUBLECHECK":
                return $this->SP_FG_GET_DOUBLECHECK($param);
                break;
            case "read_in_fg":
                return $this->read_in_fg($param);
                break;
            case "read_list_wipout":
                return $this->read_list_wipout($param);
                break;
            case "read_list_bahanbaku":
                return $this->read_list_bahanbaku($param);
                break;
            case "select_itempart_manual":
                return $this->select_itempart_manual($param);
                break;
            case "proses_out_manual":
                return $this->proses_out_manual($param);
                break;
                
            default:
              return false;
          }
    }
    function read_group_conveyor($param){
        $this->load->database();
        $this->db->select("
        A.CV
        ");
        $this->db->from("
        (
            SELECT 'ALL DATA' as CV
            UNION ALL
            SELECT 
            A.CV
             FROM wh_fg_in A
            GROUP BY
            A.CV ) A
        ");
        
        $arr_field = array(
            'A.NOMOR_AJU'=>'NOMOR_AJU',
            'A.TANGGAL_AJU'=>'TANGGAL_AJU',
            'A.NOMOR_DAFTAR'=>'NOMOR_DAFTAR'
        );
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                    $this->db->where(array_search($val['property'],$arr_field),$val['value']);
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
        return json_encode($rows );
    }
    function read_in_fg($param){
        $this->load->database();
        $this->db->select("
        FORMAT(A.OUT_DATE,'yyyy-MM-dd') as OUT_DATE,
        A.OUT_KATEGORI,
        A.INVOICE_NO,
        A.MAPP_PARTNO,
        B.PART_NAME,
        A.OUT_QTY,
        A.ASSY_PRODUCTION,
        A.SUMBER_DATA,
        A.BC_TYPE,
        A.NOMOR_AJU,
        A.TANGGAL_AJU,
        A.NOMOR_DAFTAR,
        A.TANGGAL_DAFTAR
        ");
        $this->db->from("wh_wip_detail_out A");
        $this->db->join("mst_part B","A.MAPP_PARTNO = B.PART_NO","left");
        $arr_field = array(
            'A.OUT_DATE'=>'OUT_DATE',
            'A.INVOICE_NO'=>'INVOICE_NO',
            'A.MAPP_PARTNO'=>'MAPP_PARTNO',
            'A.PART_NAME'=>'PART_NAME',
            'A.SUMBER_DATA'=>'SUMBER_DATA',
            'A.ASSY_PRODUCTION'=>'ASSY_PRODUCTION',
            'A.BC_TYPE'=>'BC_TYPE',
            'A.NOMOR_AJU'=>'NOMOR_AJU',
            'A.TANGGAL_AJU'=>'TANGGAL_AJU',
            'A.NOMOR_DAFTAR'=>'NOMOR_DAFTAR',
            'A.TANGGAL_DAFTAR'=>'TANGGAL_DAFTAR',
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
        $this->db->order_by("A.OUT_DATE", "DESC");
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
            'A.NOMOR_DAFTAR'=>'NOMOR_DAFTAR'
        );
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                    $this->db->where(array_search($val['property'],$arr_field),$val['value']);
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
    function SP_FG_GET_DOUBLECHECK($param){
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_FG_GET_DOUBLECHECK
        @VUSERNAME=?,
        @VMODULE=?,
        @VPRODDATE=?
        ";
        $data = array(
            '@VUSERNAME' => $param['VUSERNAME'], 
            '@VMODULE' => $param['module'], 
            '@VPRODDATE' =>  $param['proddate']
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        $rows = $result->result_array();
        $data = array(
                'Rows' => $rows
             );
        return json_encode($data );
    }
    function PROSES_SP_FG_GET_DOUBLECHECK($param){
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_FG_GET_DOUBLECHECK
        @VUSERNAME=?,
        @VMODULE=?,
        @VPRODDATE=?
        ";
        $data = array(
            '@VUSERNAME' => $param['VUSERNAME'], 
            '@VMODULE' => $param['module'], 
            '@VPRODDATE' =>  $param['proddate']
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->row_array();
        
        return json_encode($row );
    }
    function read_list_wipout($param){
        $this->load->database();
        $this->db->select("
        *
        ");
        $this->db->from("wh_fg_in A");
        $this->db->where("
        A.[Date] = '".$param['PRODDATE']."'
        ");
        
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                    #$this->db->like(array_search($val['property'],$arr_field),$val['value']);
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
    function read_list_bahanbaku($param){
        $this->load->database();
        $this->db->select("
        *
        ");
        $this->db->from("wh_fg_in_detail A");
        $this->db->where("
        A.PROD_DATE = '".$param['PRODDATE']."'
        ");
        
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                    #$this->db->like(array_search($val['property'],$arr_field),$val['value']);
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
    function select_itempart_manual($param){
        $this->load->database();
        $varlike=" ";

        $arr_field = array(
            'A.WIN_DATE'=>'WIN_DATE',
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
        SELECT TOP 20
        A.WIN_NO,A.WIN_DATE,A.INVOICE_NO,A.PART_NO,A.MAPP_PARTNO,C.PART_NAME,
        A.IS_FROM_AW,A.IS_FROM_AW_SEQNO,
        A.WIN_QTY,
        ISNULL(B.OUT_QTY,0) as OUT_QTY,
        (A.WIN_QTY -ISNULL(B.OUT_QTY,0)) as SISA_QTY,
        A.SUMBER_DATA,A.BC_TYPE,A.NOMOR_AJU,A.TANGGAL_AJU,A.NOMOR_DAFTAR,A.TANGGAL_DAFTAR
        FROM (
        SELECT 
        A.WIN_NO,
        A.WIN_DATE,
        A.INVOICE_NO,
        A.PART_NO,
        A.MAPP_PARTNO,
        A.IS_FROM_AW,A.IS_FROM_AW_SEQNO,
        SUM(A.WIN_QTY) as WIN_QTY,
        A.SUMBER_DATA,A.BC_TYPE,A.NOMOR_AJU,A.TANGGAL_AJU,A.NOMOR_DAFTAR,A.TANGGAL_DAFTAR
        FROM wh_wip_in A
        GROUP BY
        A.WIN_NO,
        A.WIN_DATE,
        A.INVOICE_NO,
        A.PART_NO,
        A.MAPP_PARTNO,
        A.IS_FROM_AW,
        A.IS_FROM_AW_SEQNO,
        A.SUMBER_DATA,A.BC_TYPE,A.NOMOR_AJU,A.TANGGAL_AJU,A.NOMOR_DAFTAR,A.TANGGAL_DAFTAR
        ) A
        LEFT JOIN (
        SELECT 
        A.WIP_IN_NO,
        A.WIP_IN_DATE,
        A.INVOICE_NO,
        A.PART_NO,
        A.MAPP_PARTNO,
        SUM(A.OUT_QTY) as OUT_QTY,
        A.IS_FROM_AW,A.IS_FROM_AW_SEQNO,
        A.SUMBER_DATA,A.BC_TYPE,A.NOMOR_AJU,A.TANGGAL_AJU,A.NOMOR_DAFTAR,A.TANGGAL_DAFTAR
        FROM wh_wip_detail_out A
        GROUP BY
        A.WIP_IN_NO,
        A.WIP_IN_DATE,
        A.INVOICE_NO,
        A.PART_NO,
        A.MAPP_PARTNO,
        A.IS_FROM_AW,A.IS_FROM_AW_SEQNO,
        A.SUMBER_DATA,A.BC_TYPE,A.NOMOR_AJU,A.TANGGAL_AJU,A.NOMOR_DAFTAR,A.TANGGAL_DAFTAR
        ) B on 
        A.WIN_NO = B.WIP_IN_NO AND 
        A.WIN_DATE = B.WIP_IN_DATE AND 
        A.INVOICE_NO = B.INVOICE_NO AND 
        A.PART_NO = B.PART_NO AND 
        A.MAPP_PARTNO = B.MAPP_PARTNO AND 
        A.IS_FROM_AW = B.IS_FROM_AW AND 
        isnull(A.IS_FROM_AW_SEQNO,'') = isnull(B.IS_FROM_AW_SEQNO,'') AND 
        A.SUMBER_DATA = B.SUMBER_DATA AND 
        A.BC_TYPE = B.BC_TYPE AND 
        A.NOMOR_AJU = B.NOMOR_AJU AND 
        A.TANGGAL_AJU = B.TANGGAL_AJU AND 
        A.NOMOR_DAFTAR = B.NOMOR_DAFTAR AND 
        A.TANGGAL_DAFTAR = B.TANGGAL_DAFTAR
        LEFT JOIN 
        mst_part C on A.MAPP_PARTNO = C.PART_NO
        WHERE
        (A.WIN_QTY -ISNULL(B.OUT_QTY,0))>0 AND 
        A.WIN_DATE<='".$param['vdate']."' 
        ". $varlike ."
        ORDER BY A.WIN_DATE,A.IS_FROM_AW,(A.WIN_QTY -ISNULL(B.OUT_QTY,0))
        ",false);
        
        $rows = $query->result_array();
        $data = array(
                    //'TotalRows' => $count,
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
    function proses_out_manual($param){
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_INV_WIP_OUT_MANUAL
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