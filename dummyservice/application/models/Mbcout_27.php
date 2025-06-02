<?php
class Mbcout_27 extends CI_Model
{

   function read($param)
   {
      switch ($param["method"]) {
         case "read_data":
            return $this->read_data($param);
            break;
         case "proses_cancel_dokumen":
            return $this->proses_cancel_dokumen($param);
            break;
         case "proses_edit_dokumen":
            return $this->proses_edit_dokumen($param);
            break;
         case "read_bahanbaku":
            return $this->read_bahanbaku($param);
            break;
         case "read_bahanbaku_tarif":
            return $this->read_bahanbaku_tarif($param);
            break;
         case "proses_edit_item_dokumen":
            return $this->proses_edit_item_dokumen($param);
            break;
         case "proses_send_dokumen":
            return $this->proses_send_dokumen($param);
            break;
         case "read_dokumen_barang":
            return $this->read_dokumen_barang($param);
            break;
         case "read_dokumen_barang_tarif":
            return $this->read_dokumen_barang_tarif($param);
            break;
         case "process_edit":
            return $this->process_edit($param);
            break;
         default:
            return false;
      }
   }
   function read_data($param)
   {
      $this->load->database();
      $this->db->distinct();
      $this->db->select("
              A.KODEDOKUMEN AS BC_TYPE
            , 'PLB' AS ID_COMPANY 
            , B.NOMORDOKUMEN AS NOMOR_DOKUMEN 
            , B.TANGGALDOKUMEN AS TANGGAL_DOKUMEN
            , A.NOMORAJU AS NOMOR_AJU
            , A.TANGGALPERNYATAAN AS TANGGAL_AJU 
            , C.NAMAENTITAS AS NAMA_PEMASOK 
            , A.NOMORDAFTAR AS NOMOR_DAFTAR
            , A.TANGGALDAFTAR AS TANGGAL_DAFTAR
        ");
      $this->db->from('DBIT_HEADER A');
      $this->db->join('DBIT_DOKUMEN B ', 'B.NOMORAJU = A.NOMORAJU', 'left');
      $this->db->join('DBIT_ENTITAS C ', 'C.NOMORAJU = A.NOMORAJU', 'left');

      $this->db->where(
         "
            A.KODEDOKUMEN='27' AND 
            B.KODEDOKUMEN ='380' AND 
            C.SERI = 3 AND 
            B.NOMORDOKUMEN IN (
                SELECT DISTINCT INVOICE_NO  FROM [dbo].[DRAFT_DELIVERY_AW]
            )
            "
      );
      $arr_field = array(
         'A.KODEDOKUMEN' => 'BC_TYPE',
         'C.NAMAENTITAS' => 'NAMA_PEMASOK',
         'A.NOMORAJU' => 'NOMOR_AJU',
         'B.NOMORDOKUMEN' => 'NOMOR_DOKUMEN',
         'B.TANGGALDOKUMEN' => 'TANGGAL_DOKUMEN',
         'A.TANGGALPERNYATAAN' => 'TANGGAL_AJU',
         'A.NOMORDAFTAR' => 'NOMOR_DAFTAR',
         'A.TANGGALDAFTAR' => 'TANGGAL_DAFTAR',
      );
      if (array_key_exists('filter', $param)) {
         $keyval = json_decode($param['filter'], true);
         foreach ($keyval as $key => $val) {
            $this->db->like(array_search($val['property'], $arr_field), $val['value']);
         }
      }

      $tempdb = clone $this->db;
      $count = $tempdb->count_all_results();

      if (array_key_exists('limit', $param)) {
         $this->db->limit($param['limit'], $param['start']);
      }

      if (array_key_exists('sort', $param)) {
         $keyval = json_decode($param['sort'], true);
         foreach ($keyval as $key => $val) {
            $this->db->order_by($val['property'], $val['direction']);
         }
      }

      $this->db->order_by("A.NOMORAJU", "DESC");
      $this->db->order_by("A.TANGGALPERNYATAAN", "DESC");
      $query = $this->db->get();
      $rows = $query->result_array();
      #print $this->db->last_query();
      $data = array(
         'TotalRows' => $count,
         'Rows' => $rows
      );
      //print $this->db->last_query();
      return json_encode($data);
   }
   function read_dokumen_barang($param)
   {
      $this->load->database();
      $this->db->distinct();
      $this->db->select(" *");
      $this->db->from("DBIT_BARANG ");
      $this->db->where("NOMORAJU = " . $param['NOMOR_AJU']);

      if (array_key_exists('keywhere', $param)) {
         $keyval = json_decode($param['keywhere'], true);
         foreach ($keyval as $key => $val) {
            $this->db->where($val['property'], $val['value']);
         }
      }

      $tempdb = clone $this->db;
      $count = $tempdb->count_all_results();

      if (array_key_exists('limit', $param)) {
         $this->db->limit($param['limit'], $param['start']);
      }

      if (array_key_exists('sort', $param)) {
         $keyval = json_decode($param['sort'], true);
         foreach ($keyval as $key => $val) {
            $this->db->order_by($val['property'], $val['direction']);
         }
      }

      $this->db->order_by("SERIBARANG", "ASC");
      $query = $this->db->get();
      $rows = $query->result_array();
      #print $this->db->last_query();
      $data = array(
         'TotalRows' => $count,
         'Rows' => $rows
      );
      //print $this->db->last_query();
      return json_encode($data);
   }

   function read_dokumen_barang_tarif($param)
   {
      $this->load->database();
      $this->db->distinct();
      $this->db->select(" *");
      $this->db->from("DBIT_BAHANBAKU ");
      $this->db->where("NOMORAJU = " . $param['NOMOR_AJU']);
      $this->db->where("SERIBARANG = " . $param['SERI_BARANG']);

      if (array_key_exists('keywhere', $param)) {
         $keyval = json_decode($param['keywhere'], true);
         foreach ($keyval as $key => $val) {
            $this->db->where($val['property'], $val['value']);
         }
      }

      $tempdb = clone $this->db;
      $count = $tempdb->count_all_results();

      if (array_key_exists('limit', $param)) {
         $this->db->limit($param['limit'], $param['start']);
      }

      if (array_key_exists('sort', $param)) {
         $keyval = json_decode($param['sort'], true);
         foreach ($keyval as $key => $val) {
            $this->db->order_by($val['property'], $val['direction']);
         }
      }

      $this->db->order_by("SERIBAHANBAKU", "ASC");
      $query = $this->db->get();
      $rows = $query->result_array();
      #print $this->db->last_query();
      $data = array(
         'TotalRows' => $count,
         'Rows' => $rows
      );
      //print $this->db->last_query();
      return json_encode($data);
   }

   function process_edit($param)
   {
      $this->load->database();
      $SQL_CALLSP = "EXEC SP_BC_IN_EDIT_DOKUMEN_PLB
       @VIDCOMPANY=?,
       @VUSERNAME=?,
       @VMODULE=?,
       @VNOMORAJU=?,
       @VHEADER=?,
       @VENTITAS=?,
       @VDOKUMEN=?,
       @VPENGANGKUT=?,
       @VKEMASAN=?,
       @VKONTAINER=?,
       @VBARANG=?,
       @VBARANGTARIF=?,
       @VPUNGUTAN=?
       ";
      $data = array(
         '@VIDCOMPANY' => $param['ID_COMPANY'],
         '@VUSERNAME' => $param['VUSERNAME'],
         '@VMODULE' => $param['module'],
         '@VNOMORAJU' => $param['VNOMORAJU'],
         '@VHEADER' => $param['VHEADER'],
         '@VENTITAS' => $param['VENTITAS'],
         '@VDOKUMEN' => $param['VDOKUMEN'],
         '@VPENGANGKUT' => $param['VPENGANGKUT'],
         '@VKEMASAN' => $param['VKEMASAN'],
         '@VKONTAINER' => $param['VKONTAINER'],
         '@VBARANG' => $param['VBARANG'],
         '@VBARANGTARIF' => $param['VBARANGTARIF'],
         '@VPUNGUTAN' => $param['VPUNGUTAN']
      );
      $result = $this->db->query($SQL_CALLSP, $data);
      $rows = $result->result_array();

      return json_encode($rows);
   }
}