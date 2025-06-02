<?php
class Minv_fg_out extends CI_Model {

    function read($param){
        switch ($param["method"]) {
            case "read_group_conveyor":
                return $this->read_group_conveyor($param);
                break;
            case "SP_INV_FG_OUT":
                return $this->SP_INV_FG_OUT($param);
                break;
            case "read_out_fg":
                return $this->read_out_fg($param);
                break;
            case "list_poly_header":
                return $this->list_poly_header($param);
                break;
            case "list_poly_detail":
                return $this->list_poly_detail($param);
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
    function read_out_fg($param){
        $this->load->database();
        $this->db->select("
        
        A.FGID,
        A.OUT_DATE,
        A.SA_NO,
        A.SA_DATE,
        A.CONTAINER_NO,
        A.INVOICE_NO,
        A.CUST_CODE,
        A.ASSY_NO,
        A.ASSY_CODE,
        A.CARLINE,
        A.POLY_NO,
        A.POLY_STATUS,
        A.PALLET_NO,
        A.QTY,
        A.CREATE_USER,
        A.CREATE_DATE,
        A.UPDATE_USER,
        A.UPDATE_DATE

        ");
        $this->db->from("
        (
            SELECT
            A.FGID,
            A.OUT_DATE,
            A.SA_NO,
            A.SA_DATE,
            A.CONTAINER_NO,
            A.INVOICE_NO,
            A.CUST_CODE,
            A.ASSY_NO,
            A.ASSY_CODE,
            A.CARLINE,
            A.POLY_NO,
            CASE 
            WHEN B.PollyLabelId is null THEN 'NO'
            ELSE 'YES'
            END as POLY_STATUS,
            A.PALLET_NO,
            A.QTY,
            A.CREATE_USER,
            A.CREATE_DATE,
            A.UPDATE_USER,
            A.UPDATE_DATE
            FROM wh_fg_out A
            LEFT JOIN wh_prod_header B ON A.POLY_NO = B.PollyLabelId
            ) A
        ");
        $this->db->distinct();
        $arr_field = array(
            'A.POLY_STATUS'=>'POLY_STATUS',
            'A.OUT_DATE'=>'OUT_DATE',
            'A.SA_NO'=>'SA_NO',
            'A.SA_DATE'=>'SA_DATE',
            'A.CONTAINER_NO'=>'CONTAINER_NO',
            'A.INVOICE_NO'=>'INVOICE_NO',
            'A.CUST_CODE'=>'CUST_CODE',
            'A.ASSY_NO'=>'ASSY_NO',
            'A.ASSY_CODE'=>'ASSY_CODE',
            'A.CARLINE'=>'CARLINE',
            'A.POLY_NO'=>'POLY_NO',
            'A.PALLET_NO'=>'PALLET_NO',
            'A.QTY'=>'QTY',
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
    function SP_INV_FG_OUT($param){
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_INV_FG_OUT
        @VUSERNAME=?,
        @VOUT_DATE=?,
        @VMODULE=?,
        @VDATA=?
        ";
        $data = array(
            '@VUSERNAME' => $param['VUSERNAME'], 
            '@VOUT_DATE' => $param['fgdate'], 
            '@VMODULE' => $param['module'], 
            '@VDATA' => ''
        );
        
        $result = $this->db->query($SQL_CALLSP, $data);
        // Periksa jumlah baris hasil query
        if ($result->num_rows() > 1) {
            $rows = $result->result_array();
            return json_encode($rows); 
        } else {
            $row = $result->row_array();
            return json_encode($row);
        }


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
    function list_poly_header($param){
        $this->load->database();
        $this->db->select("
        format(A.[Date],'yyyy-MM-dd') as PROD_DATE,
        A.AssyCode as ASSYCODE,
        A.NameplateID as NAMEPLATE
        ");
        $this->db->from("wh_prod_header A");
        $this->db->where("A.PollyLabelId='". $param['polyno']  . "'");
        $arr_field = array(
            'A.PROD_DATE'=>'PROD_DATE',
            'A.ASSYCODE'=>'ASSYCODE',
            'A.NAMEPLATE'=>'NAMEPLATE'
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
    function list_poly_detail($param){
        $this->load->database();
        $this->db->select("
            A.PROD_DATE,
            A.PART_NO,
            A.ASSY_CODE,
            A.QTY_NAMEPLATE,
            A.QTY_BOM,
            A.QTY,
            MAX(B.WIP_IN_DATE) as WIP_IN_DATE,
            MAX(B.INVOICE_NO) as INVOICE_NO,
            MAX(B.BC_TYPE) as BC_TYPE,
            MAX(B.SUMBER_DATA) as SUMBER_DATA,
            MAX(B.NOMOR_AJU) as NOMOR_AJU,
            MAX(B.TANGGAL_AJU) as TANGGAL_AJU,
            MAX(B.NOMOR_DAFTAR) as NOMOR_DAFTAR,
            MAX(B.TANGGAL_DAFTAR) as TANGGAL_DAFTAR
        ");
        $this->db->from("
        (
            SELECT
            A.PROD_DATE,
            B.PART_NO,
            B.ASSY_CODE,
            A.QTY as QTY_NAMEPLATE,
            B.QTY_BOM,
            (A.QTY * B.QTY_BOM) as QTY
            FROM (
            SELECT 
            cast(B.[Date] as date) as PROD_DATE,
            B.AssyCode,
            COUNT(B.ASsyCode) as QTY
            FROM wh_prod_header B
            WHERE
            B.PollyLabelId='". $param['polyno'] ."'
            GROUP BY
            B.AssyCode,
            cast(B.[Date] as date)
            ) A
            LEFT JOIN wh_prod_detail B on A.PROD_DATE = cast(B.PROD_DATE as date) AND A.AssyCode = B.ASSY_CODE
            ) A

        ");
        $this->db->join("wh_wip_detail_out B ","A.PROD_DATE = B.OUT_DATE AND A.ASSY_CODE = B.ASSY_PRODUCTION AND A.PART_NO = B.MAPP_PARTNO AND B.OUT_KATEGORI='TO FG'","left");
        $this->db->group_by(
            "
            A.PROD_DATE,
            A.PART_NO,
            A.ASSY_CODE,
            A.QTY_NAMEPLATE,
            A.QTY_BOM,
            A.QTY
            "
        );
        $arr_field = array(
            'A.PROD_DATE'=>'PROD_DATE',
            'A.ASSYCODE'=>'ASSYCODE',
            'A.NAMEPLATE'=>'NAMEPLATE'
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
    
}