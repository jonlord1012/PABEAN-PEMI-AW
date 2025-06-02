<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Mmaster_tenant extends CI_Model {
	
	function read($param){
		$this->load->database();
		$this->db->select("
                *
			",false);
		$this->db->from("referensi_pemasok");

		if (array_key_exists('keywhere', $param)) {
			$keyval = json_decode($param['keywhere'],true);
			foreach ($keyval as $key =>$val ) {
				$this->db->where($val['property'],$val['value']);
			}
		}
		if (array_key_exists('filter', $param)) {
			$keyval = json_decode($param['filter'],true);
			foreach ($keyval as $key =>$val ) {
				$colname = array('SYSUPDATEDATE','SYSCREATEDATE');
				if (in_array($val['property'], $colname)) {
					$this->db->like( "TO_CHAR(". $val['property'] .", 'YYYY-MM-DD HH24:MI:SS')", $val['value']);
				}else{
					$this->db->like("UPPER(" . $val['property'] .")",strtoupper($val['value']), 'both');
				}
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
	function edit($param){
		$this->load->database();
		$query = $this->db->get_where("referensi_pemasok");
		$rows = $query->row_array();
		$data = array(
			'success'=>'true',
			'message'=>'Data Ditampilkan',
			'data'=>$rows,
		);
		return json_encode($data);
	}

}
/* End of file Mmaster_tenant.php */
/* Location: ./application/models/Mmaster_tenant.php */	

?>