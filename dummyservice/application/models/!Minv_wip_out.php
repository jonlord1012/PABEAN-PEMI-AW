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
        cast(A.Date as date) as PRODDATE,
        A.CV as CONVEYOR,
        A.AssyCode as ASSYCODE,
        COUNT(*) as QTY,
        0 as DEFECT,
        0 as SCRAP
        ");
        $this->db->from("wh_fg_in A");
        switch ($param["cbo_filterkey"]) {
            case "ALL DATA":
                break;
            default:
                $this->db->where("A.CV ='" . $param['cbo_filterkey'] . "'");
                break;
          }

        $this->db->group_by("
            cast(A.Date as date),
            A.CV,
            A.AssyCode
        ");
        $arr_field = array(
            'A.Date'=>'PRODDATE',
            'A.CV'=>'CONVEYOR',
            'A.AssyCode'=>'ASSYCODE'
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
}