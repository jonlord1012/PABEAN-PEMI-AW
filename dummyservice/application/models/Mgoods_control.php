<?php
class Mgoods_control extends CI_Model
{

    function read($param)
    {
        switch ($param["method"]) {
            case "read_control":
                return $this->read_control($param);
                break;
            case "read_mutasi_stock":
                return $this->read_mutasi_stock($param);
                break;
            case "stockproduct_receipt_in":
                return $this->stockproduct_receipt_in($param);
            case "stockproduct_out":
                return $this->stockproduct_out($param);
            case "stockproduct_bydocument":
                return $this->stockproduct_bydocument($param);

            default:
                return false;

                /*                 
            case "read_bclist":
                return $this->read_bclist($param);
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
*/
        }
    }

    function read_control($param)
    {
        $this->load->database();
        $this->db->select("
            MODE_CATEGORY, MODE_CODE, MODE_NAME, VAL1 as MODE_CONTROL
        ");
        $this->db->from("a_matrix");

        $this->db->where("
        MODE_CATEGORY='goods_control'
        ");

        $this->db->order_by("MODE_SHORT");

        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
            'Rows' => $rows
        );
        return json_encode($data);
    }

    function read_mutasi_stock($param)
    {
        $this->load->database();
        $this->db->select(" * ");
        $this->db->from("VW_TR_STOCK_CARD_MAIN ");

        $arr_field = array(
            'PART_NO' => 'PART_NO',
            'PART_NAME' => 'PART_NAME',
            'PART_GROUP' => 'PART_GROUP',
            'PART_CATEGORY' => 'PART_CATEGORY',
            'PART_TYPE' => 'PART_CATEGORY',
            'ARTICLE_CODE' => 'ARTICLE_CODE',
            '_MONTH' => '_MONTH',
            'YEAR_N_MONTH' => 'YEAR_N_MONTH',
            'QTY_IN' => 'QTY_IN',
            'QTY_OUT' => 'QTY_OUT',
            'STOCK_QTY' => 'STOCK_QTY',
        );
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'], true);
            foreach ($keyval as $key => $val) {
                $this->db->like(array_search($val['property'], $arr_field), $val['value']);
            }
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'], true);
            foreach ($keyval as $key => $val) {
                $this->db->order_by($val["property"], $val['direction']);
            }
        }

        $tempdb = clone $this->db;
        $count = $tempdb->count_all_results();

        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'], $param['start']);
        }

        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
            'TotalRows' => $count,
            'Rows' => $rows
        );

        return json_encode($rows);
    }



    function stockproduct_receipt_in($param)
    {
        $this->load->database();
        $query = $this->db->query("
        SELECT * FROM VW_TR_STOCK_CARD WHERE ARTICLE_CODE = '" . $param['ARTICLE_CODE'] . "' AND QTY_IN IS NOT NULL AND QTY_IN > 0 
        ");
        $rows = $query->result_array();
        return json_encode($rows);
    }

    function stockproduct_out($param)
    {
        $this->load->database();
        $query = $this->db->query("
        SELECT * FROM VW_TR_STOCK_CARD WHERE ARTICLE_CODE = '" . $param['ARTICLE_CODE'] . "' AND QTY_OUT IS NOT NULL  AND QTY_OUT > 0  
        ");
        $rows = $query->result_array();
        return json_encode($rows);
    }

    function stockproduct_bydocument($param)
    {

        $this->load->database();
        $SQL_CALLSP = "EXEC SP_GET_GOODS_CONTROL_DATA @VARTICLE_CODE=?, @VIDCOMPANY=?, @VUSERNAME=?, @VMODE=?";
        $data = [
            '@VARTICLE_CODE' => $param['ARTICLE_CODE'],
            '@VIDCOMPANY' => $param['ID_COMPANY'],
            '@VUSERNAME' => $param['VUSERNAME'],
            '@VMODE' => $param['VMODE'],
        ];

        $retMe = $this->db->query($SQL_CALLSP, $data);
        #print_r($retMe);
        #print($this->db->last_query());
        $data = $retMe->result_array();
        # print_r($data);
        return json_encode($data);
    }
}