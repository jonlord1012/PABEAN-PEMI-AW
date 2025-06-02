<?php
class Minv_wip_control_aw extends CI_Model {

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
        MODE_CATEGORY='inv_wip_control_aw'
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
        B.PART_NAME,
        B.PART_GROUP,
        B.PART_CATEGORY,
        B.PART_TYPE,
        SUM(A.WIN_QTY) as IN_QTY,
        SUM(A.OUT_QTY) as OUT_QTY,
        SUM(A.SISA_QTY) as STOCK_QTY
        ");
        $this->db->from("VW_WIP_STOCK_AW A");
        $this->db->join("mst_part_aw B","A.MAPP_PARTNO = B.PART_NO","left");
        
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
        SELECT * FROM VW_WIP_STOCK_AW A
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
}