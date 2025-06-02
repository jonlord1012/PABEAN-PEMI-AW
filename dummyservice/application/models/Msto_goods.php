<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Msto_goods extends CI_Model
{

    function read($param)
    {
        switch ($param["method"]) {
            case "read_data":
                return $this->read_data($param);
                break;
            case "read_detail":
                return $this->read_detail($param);
                break;
            default:
                return false;
        }
    }



    function read_data($param)
    {
        $this->load->database();
        $this->db->select("		
                A.ARTICLE_CODE
            , MAX(B.PART_DESCRIPTION) AS PART_NAME 
            , MAX(B.PART_UOM) AS PART_UOM 
            , MAX(B.PART_MPQ) AS PART_MPQ
            , MAX(A.QTY_STO) AS QTY_STO 
            , A.CURRENT_STOCK
	    ");
        $this->db->from("VW_MASTER_STOCK_OPNAME A ");
        $this->db->join("MST_PART_PLB B ", "A.ARTICLE_CODE = B.PART_ALIAS",  "left");
        $this->db->group_by('A.ARTICLE_CODE , A.CURRENT_STOCK ');

        $arr_field = array(
            'ARTICLE_CODE' => 'ARTICLE_CODE',
            'PART_NAME' => 'PART_NAME',
            'PART_UOM' => 'PART_UOM',
            'PART_MPQ' => 'PART_MPQ',
            'QTY_STO' => 'QTY_STO',
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
        return json_encode($data);
    }
    function read_detail($param)
    {
        $this->load->database();
        $this->db->select("* ");
        $this->db->from("VW_GET_DETAIL_STOCK");
        $this->db->where("ARTICLE_CODE = '" . $param['ARTICLE_CODE'] . "' ");

        $arr_field = array(
            'ARTICLE_CODE' => 'ARTICLE_CODE',
            'PART_NAME' => 'PART_NAME',
            'PART_UOM' => 'PART_UOM',
            'PART_MPQ' => 'PART_MPQ',
            'QTY_STO' => 'QTY_STO',
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
        return json_encode($data);
    }
}

/* End of file Msto_goods.php */
/* Location: ./application/models/Msto_goods.php */