<?php
class Mmaster_goods extends CI_Model {

    function read($param){
        switch ($param["method"]) {
            case "read_in":
            return $this->read_in($param);
            break;
            case "read_list":
            return $this->read_list($param);
            break;
            default:
            return false;
        }
    }
    
    function read_in($param)
    {
        $this->db->select('*');
        $this->db->from('MST_PART_PLB A');

        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->like($val["property"],$val['value'], 'both');
            }        
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->order_by($val["property"], $val['direction']);
            }
        }

        $tempdb = clone $this->db;
        $count= $tempdb->count_all_results(); 

        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }

        $this->db->order_by("A.ID", "DESC");
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
            'TotalRows' => $count,
            'Rows' => $rows
        );
        return json_encode($data );
    }
    function edit($param){
        $vdata = $param['data'];

        $this->load->database();
        
        $query = $this->db->get_where('mst_part_hs', array(
            'ID'=>$vdata['ID']
        ));

        $rows_items = $query->result_array();

        $query_items = $this->db->get_where('MST_PART_PLB',array(
            'PART_NO'=>$vdata['PART_NO']
        ));
        $rows = $query_items->row_array();

        $out = array(
            'success'=>'true',
            'message'=>'Data Ditampilkan',
            'data'=>$rows,
            'items'=>$rows_items
        );
        return json_encode($out);
    }
	
	 function SP_MST_PART_PLB($param){
        $this->load->database();
        $vform = $param["data"];
        $SQL_CALLSP = "EXEC SP_MST_PART_PLB
        @VDATA=?,
        @VUSERNAME=?,
        @VIDCOMPANY=?,
        @VMODE=?, 
		@XMODULE=?
        ";
        $data = array(
            '@VDATA' => $param["data"], 
            '@VUSERNAME' => $param["VUSERNAME"], 
            '@VIDCOMPANY' => $param["ID_COMPANY"], 
            '@VMODE' => $param["mode"], 
            '@XMODULE' => $param["module"], 
        );

        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->row_array();
       #print_r($this->db->last_query());
        return json_encode($row);
    
    }
}