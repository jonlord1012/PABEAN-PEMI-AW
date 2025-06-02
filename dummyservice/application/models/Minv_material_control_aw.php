<?php
class Minv_material_control_aw extends CI_Model {

    function read($param){
        switch ($param["method"]) {
            case "read_control":
                return $this->read_control($param);
                break;
            case "read_all":
                return $this->read_all($param);
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
            case "read_hr_receiving":
                return $this->read_hr_receiving($param);
                break;
            case "read_group_part":
                return $this->read_group_part($param);
                break;
            case "read_data":
                return $this->read_data_report($param);
                break;
            case "read_data_summary":
                return $this->read_data_summary($param);
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
        MODE_CATEGORY='inv_material_control_aw'
        ");

        $this->db->order_by("MODE_SHORT");
        
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
    function read_group_part($param){
        $this->load->database();
        $this->db->distinct();
        $this->db->select("PART_GROUP");
        $this->db->from("mst_part");
        $query = $this->db->get();
        $rows = $query->result_array();
        return json_encode($rows);
    }
    function read_data_report($param){
        $this->load->database();
		$this->db->select (
		"
			*
		") ; 
		
		$this->db->from("VW_RAWMAT_MUTASI_STOCK_AW") ; 
		$this->db->where(" VW_RAWMAT_MUTASI_STOCK_AW.BULAN BETWEEN  '".$param['VFROMDATE']."'  AND '".$param['VTODATE']."'  ") ; 
        /*
        $this->db->where(' VW_RAWMAT_MUTASI_STOCK.PART_GROUP = ', 'MATERIAL');
        
        if($param['VPARTGROUP']<>''){
            $this->db->where(' VW_RAWMAT_MUTASI_STOCK.PART_GROUP = ', $param['VPARTGROUP']);
        }
        */
		$extraParam = array() ; 
		/* GET DATE RANGE PARAMETER */
        /*
		if(array_key_exists('date_start', $param)) {
			array_push($extraParam, array("property" => "TANGGAL_AJU >=", "value" => $param['date_start']) , array("property"=> "TANGGAL_AJU <=", "value" => $param['date_end'])); 
		}
        */
		
		/* GET PART_GROUP PARAMETER */
		/*
        if(array_key_exists('VPARTGROUP', $param)) {
            if($param['VPARTGROUP']<>'') {
                array_push($extraParam, array("property" => "PART_GROUP", "value" => $param['VPARTGROUP'])) ;
            }
		}
		*/

		/* GET COMPANY PARAMETER 
		if(array_key_exists('id_company', $param)) {
			array_push($extraParam, array("property" => "ID_COMPANY", "value" => $param['id_company'])) ; 
		}
		*/
		
		
        if (array_key_exists('filter', $param)) {
            $param['filter'] += $extraParam ; 
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->like($val["property"],$val['value'], 'both');
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
        #print $this->db->last_query();
        
        return json_encode($data );
    }
    function read_all($param){
        $this->load->database();
        $this->db->select("
            A.PART_NO,
            A.PART_NAME,
            A.PART_DESCRIPTION,
            A.PART_GROUP,
            A.PART_CATEGORY,
            A.PART_TYPE,
            A.PART_UOM,
            ISNULL(B.QTY,0) as IN_QTY,
            0 as OUT_QTY,
            ISNULL(B.QTY,0) as STOCK_QTY
        ");
        $this->db->from("mst_part_aw A");
        $this->db->join("
        (
            SELECT 
            A.PART_NO,
            SUM(A.RCV_IN) as QTY
            FROM wh_inv_mat_detail A
            GROUP BY
            A.PART_NO ) B
        ","A.PART_NO = B.PART_NO","left");

        $arr_field = array(
            'A.PART_NO'=>'PART_NO',
            'A.PART_NAME'=>'PART_NAME',
            'A.PART_DESCRIPTION'=>'PART_DESCRIPTION',
            'A.PART_GROUP'=>'PART_GROUP',
            'A.PART_CATEGORY'=>'PART_CATEGORY',
            'A.PART_TYPE'=>'PART_TYPE',
            'A.PART_UOM'=>'PART_UOM'
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
        
        $this->db->order_by( "B.QTY", "DESC");

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
            FROM wh_inv_detail_aw A
            GROUP BY
            A.MAPP_PARTNO ) A
        ");
        $this->db->join("
        (
            SELECT 
            A.MAPP_PARTNO,SUM(A.OUT_QTY) as OUT_QTY
            FROM wh_inv_detail_out_aw A
            GROUP BY
            A.MAPP_PARTNO
            ) B
        ","A.MAPP_PARTNO = B.MAPP_PARTNO","left");
        $this->db->join("mst_part_aw C","A.MAPP_PARTNO = C.PART_NO","left");
        
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
    function read_hr_receiving($param){
        $this->load->database();
        $this->db->select("
        A.RECEIPT_NO,
        FORMAT(B.RECEIPT_DATE,'yyyy-MM-dd') as RECEIPT_DATE,
        A.INVOICE_NO,
        A.PART_NO,
        SUM(A.RCV_IN) as QTY
        ");
        $this->db->from("wh_inv_mat_detail_aw A");
        $this->db->join("wh_inv_mat_header B","A.RECEIPT_NO = B.RECEIPT_NO","left");
        $this->db->where("
        A.PART_NO='".$param['PART_NO']."'
        ");
        $this->db->group_by("
        A.RECEIPT_NO,
        B.RECEIPT_DATE,
        A.INVOICE_NO,
        A.PART_NO
        ");
        $arr_field = array(
            'A.PART_NO'=>'PART_NO',
            'A.RECEIPT_DATE'=>'RECEIPT_DATE',
            'A.INVOICE_NO'=>'INVOICE_NO',
            'A.RECEIPT_NO'=>'RECEIPT_NO'
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
        
        $this->db->order_by( "B.RECEIPT_DATE", "DESC");

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
        FROM wh_inv_detail_aw A
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
        from wh_inv_detail_out_aw wout
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
        FROM wh_inv_detail_aw A
        LEFT JOIN wh_inv_header_aw B on A.RECEIPT_NO = B.RECEIPT_NO
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
        FROM wh_inv_detail_out_aw A
        LEFT JOIN wh_inv_header_out_aw B on A.OUT_NO = B.OUT_NO
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
    
    function read_data_summary($param){
        $this->load->database();
		$this->db->select (
		"
			*
		") ; 
		
		$this->db->from("VW_RAWMAT_MUTASI_STOCK_MONTHLY_SUMMARY_AW") ; 
        $this->db->join("
                         (   SELECT 
                            A.MAPP_PARTNO,
                            (isnull(A.IN_QTY,0) - isnull(B.OUT_QTY ,0)) as AVAILABLE_STOCK
                        FROM 
                            (
                                SELECT 
                                A.MAPP_PARTNO,SUM(A.RECEIPT_QTY) as IN_QTY
                                FROM wh_inv_detail_aw A
                                left join wh_inv_header_aw B
                                on A.RECEIPT_NO = B.RECEIPT_NO
                                where
                                A.IS_FROM_AW='NO'
                                AND FORMAT(B.RECEIPT_DATE,'yyyy-MM') BETWEEN '".$param['VFROMDATE']."'  AND '".$param['VTODATE']."'  
                                GROUP BY
                                A.MAPP_PARTNO 
                            ) A
                        LEFT JOIN 
                            (
                                SELECT 
                                A.MAPP_PARTNO,SUM(A.OUT_QTY) as OUT_QTY
                                FROM wh_inv_detail_out_aw A
                                where
                                A.IS_FROM_AW='NO'
                                AND FORMAT(A.OUT_DATE,'yyyy-MM') BETWEEN '".$param['VFROMDATE']."'  AND '".$param['VTODATE']."'  
                                GROUP BY
                                A.MAPP_PARTNO
                            ) B
                        ON
                            A.MAPP_PARTNO = B.MAPP_PARTNO

                    ) A ", 'a.MAPP_PARTNO = VW_RAWMAT_MUTASI_STOCK_MONTHLY_SUMMARY_AW.PART_NO', 'left');
        
		$this->db->where(" VW_RAWMAT_MUTASI_STOCK_MONTHLY_SUMMARY_AW.TAHUN_BULAN BETWEEN '".$param['VFROMDATE']."'  AND '".$param['VTODATE']."'  ") ;  
        $this->db->where(' VW_RAWMAT_MUTASI_STOCK_MONTHLY_SUMMARY_AW.PART_GROUP = ', 'MATERIAL');
        /*
        if($param['VPARTGROUP']<>''){
            $this->db->where(' VW_RAWMAT_MUTASI_STOCK.PART_GROUP = ', $param['VPARTGROUP']);
        }
        */
		$extraParam = array() ; 
		
		
        if (array_key_exists('filter', $param)) {
            $param['filter'] += $extraParam ; 
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->like($val["property"],$val['value'], 'both');
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
        #print $this->db->last_query();
        
        return json_encode($data );
    }
}