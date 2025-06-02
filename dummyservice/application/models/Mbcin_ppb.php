<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Mbcin_ppb extends CI_Model {
	
	function read($param){
		$this->load->database();
		$this->db->select("
			A.KODE_DOKUMEN_PABEAN,
			A.NAMA_PEMASOK,
			A.NOMOR_AJU,
			B.NOMORDOKUMEN as NOMOR_DOKUMEN,
			MAX(B.NOMORDOKUMEN) as NOMOR_BL,
			FORMAT(MAX(B.TANGGALDOKUMEN),'yyyy-MM-dd') as TANGGAL_DOKUMEN,
			FORMAT(A.TANGGAL_AJU,'yyyy-MM-dd') as TANGGAL_AJU,
			A.NOMOR_DAFTAR,
			FORMAT(A.TANGGAL_DAFTAR,'yyyy-MM-dd') as TANGGAL_DAFTAR,
			A.MODE_SOURCE,
			A.ID_COMPANY,
			A.KODE_STATUS,
			MAX(C.URAIAN_DOKUMEN) as URAIAN_DOKUMEN,
			A.CIF,
			A.CIF_RUPIAH,
			A.HARGA_INVOICE,
			A.FOB
			",false);
		$this->db->from("tr_bc_header A");
		$this->db->join("PAB_DOKUMEN B","A.ID_HEADER_ORI = B.EDS_ID_HEADER AND B.KODEDOKUMEN='380'","left");
		$this->db->join("PAB_DOKUMEN D","A.ID_HEADER_ORI = D.EDS_ID_HEADER AND D.KODEDOKUMEN='705'","left");
		$this->db->join("referensi_dokumen C","A.KODE_STATUS = C.TIPE_DOKUMEN AND A.KODE_DOKUMEN_PABEAN=C.KODE_DOKUMEN","left");

		$this->db->group_by(
			"
			A.KODE_DOKUMEN_PABEAN,A.NAMA_PEMASOK,A.NOMOR_AJU,B.NOMORDOKUMEN,B.TANGGALDOKUMEN,A.TANGGAL_AJU,A.NOMOR_DAFTAR,A.TANGGAL_DAFTAR,A.MODE_SOURCE,A.ID_COMPANY,A.KODE_STATUS,A.CIF,A.CIF_RUPIAH,A.HARGA_INVOICE,A.FOB
			"
		);
		$this->db->where("A.KODE_DOKUMEN_PABEAN='PPB' AND A.ID_COMPANY = '" . $param['ID_COMPANY'] . "'");
		switch ($param["cbo_filterkey"]) {
			case "1":
			$this->db->where("A.NOMOR_AJU like '%DRAFT%'");
			break;
			case "2":
			$this->db->where("A.KODE_STATUS<>'80'");
			break;
			default:
			break;
		}
		if (array_key_exists('keywhere', $param)) {
			$keyval = json_decode($param['keywhere'],true);
			foreach ($keyval as $key =>$val ) {
				$this->db->where($val['property'],$val['value']);
			}
		}
		$arr_field = array(

			'A.KODE_DOKUMEN_PABEAN'=>'KODE_DOKUMEN_PABEAN',
			'A.NAMA_PEMASOK'=>'NAMA_PEMASOK',
			'A.NOMOR_AJU'=>'NOMOR_AJU',
			'B.NOMORDOKUMEN'=>'NOMOR_DOKUMEN',
			'B.TANGGALDOKUMEN'=>'TANGGAL_DOKUMEN',
			'A.TANGGAL_AJU'=>'TANGGAL_AJU',
			'A.NOMOR_DAFTAR'=>'NOMOR_DAFTAR',
			'A.TANGGAL_DAFTAR'=>'TANGGAL_DAFTAR',
			'A.MODE_SOURCE'=>'MODE_SOURCE',
			'A.ID_COMPANY'=>'ID_COMPANY',
			'A.KODE_STATUS'=>'KODE_STATUS',
			'A.CIF'=>'CIF',
			'A.CIF_RUPIAH'=>'CIF_RUPIAH',
			'A.HARGA_INVOICE'=>'HARGA_INVOICE',
			'A.FOB'=>'FOB',
			'C.URAIAN_DOKUMEN'=>'URAIAN_DOKUMEN',
			'NOMOR_BL'=>'NOMOR_BL'
		);
		if (array_key_exists('filter', $param)) {
			$keyval = json_decode($param['filter'],true);
			foreach ($keyval as $key =>$val ) {
				$this->db->like(array_search($val['property'],$arr_field),$val['value']);
			}
		}

		$tempdb = clone $this->db;
		$count= $tempdb->count_all_results(); 

		if (array_key_exists('limit', $param)) {
			$this->db->limit($param['limit'],$param['start']);
		}

		if (array_key_exists('sort', $param)) {
			$keyval = json_decode($param['sort'],true);
			foreach ($keyval as $key =>$val ) {
				$this->db->order_by($val['property'], $val['direction']);
			}
		}
		$this->db->order_by("A.NOMOR_AJU","DESC");
		$this->db->order_by("A.TANGGAL_AJU","DESC");
		$query = $this->db->get();
		$rows = $query->result_array();
		$data = array(
			'TotalRows' => $count,
			'Rows' => $rows
		);
		return json_encode($data );
	}	
}
/* End of file Mbcin_ppb.php */
/* Location: ./application/models/Mbcin_ppb.php */