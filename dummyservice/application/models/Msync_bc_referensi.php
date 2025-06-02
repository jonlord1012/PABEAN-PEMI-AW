<?php
class Msync_bc_referensi extends CI_Model {

    function list_table($param){
        $this->load->database();
        $SQL="
            SELECT
                A.name as TABLE_NAME
            FROM
                [PBN].sys.tables A
            WHERE
                A.type_desc = 'USER_TABLE'
                AND name like 'referensi%'
            ORDER BY 
                A.name ASC
        ";

        $query = $this->db->query($SQL);
        $arrmenu =$query->result_array();
        $data = array(
                    'success' => 'true',
                        'Rows' => $arrmenu
                     );
        return json_encode($data );
    }

    function list_field($param){
        $this->load->database();
        $SQL="
            SELECT COLUMN_NAME
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_NAME = N'".$param['module']."'
        
        ";

        $query = $this->db->query($SQL);
        $arrmenu =$query->result_array();
        $data = array(
                    'success' => 'true',
                        'Rows' => $arrmenu
                     );
        return json_encode($data );
    }

    function read($param){
        
        $this->load->database();
        $tablename = $param['module'];
        $this->db->select("
            *
            ",false);
        
        $this->db->from('njc.'.$tablename);
        
        if (array_key_exists('keywhere', $param)) {
            $keyval = json_decode($param['keywhere'],true);
            foreach ($keyval as $key =>$val ) {
                    $this->db->where($val['property'],$val['value']);
            }
        }
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                    $this->db->like($val['property'], strtoupper($val['value']));
            }
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                    $this->db->order_by($val['property'], $val['direction']);
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