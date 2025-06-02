<?php
class Msync_delivery_instruction extends CI_Model
{

   function read($param)
   {
      switch ($param["method"]) {
         case "read_data":
            return $this->read_data($param);
            break;
         case "read_log":
            return $this->read_log($param);
            break;
         case "read_packing_list":
            return $this->read_packing_list($param);
            break;
         case "read_clients":
            return $this->read_clients($param);
            break;
         case "read_draft_selectinvoice":
            return $this->read_draft_selectinvoice($param);
            break;

         case "SP_TR_GET_EXBC_PER_SERI_BARANG":
            return $this->SP_TR_GET_EXBC_PER_SERI_BARANG($param);
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
         CLIENT, CLIENT_NAME ,format(A.INVOICE_DATE,'yyyy-MM-dd') AS INVOICE_DATE, 
         TENANT_INVOICE_NO, NO_PICKING, NO_DRAFT, NO_BUKTI , INVOICE_NO
       ");

      $this->db->from("DRAFT_DELIVERY_AW A");
      $this->db->group_by("CLIENT, CLIENT_NAME , INVOICE_DATE ,
         TENANT_INVOICE_NO, NO_PICKING, NO_DRAFT, NO_BUKTI , INVOICE_NO");

      $arr_field = array(
         'A.CLIENT' => 'CLIENT',
         'A.CLIENT_NAME' => 'CLIENT_NAME',
         'A.INVOICE_NO' => 'INVOICE_NO',
         "format(A.INVOICE_DATE,'yyyy-MM-dd')" => 'INVOICE_DATE',
         'A.TENANT_INVOICE_NO' => 'TENANT_INVOICE_NO',
         'A.NO_PICKING' => 'NO_PICKING',
         'A.NO_DRAFT' => 'NO_DRAFT',
         'A.NO_BUKTI' => 'NO_BUKTI',
      );
      if (array_key_exists('filter', $param)) {
         $keyval = json_decode($param['filter'], true);
         foreach ($keyval as $key => $val) {
            $this->db->like(array_search($val['property'], $arr_field), $val['value']);
         }
      }
      $tempdb = clone $this->db;
      $count = $tempdb->count_all_results();

      if (!array_key_exists('sort', $param)) {
         $this->db->order_by("INVOICE_DATE");
      }
      if (array_key_exists('sort', $param)) {
         $keyval = json_decode($param['sort'], true);
         foreach ($keyval as $key => $val) {
            $this->db->order_by($val["property"], $val['direction']);
         }
      }
      $query = $this->db->get();
      $rows = $query->result_array();
      $data = array(
         'TotalRows' => $count,
         'Rows' => $rows
      );
      return json_encode($data);
   }
   function read_packing_list($param)
   {
      $this->load->database();
      $this->db->distinct();
      $this->db->select("
          INVOICE_NO, ARTICLE_CODE, PART_CODE, PART_MPQ, COUNT(DELIVERY_LOT_NO) AS QTY, DELIVERY_LOT_NO, ORDER_QTY, IN_INVOICE_NO, IN_NOMOR_AJU , IN_NOMOR_DAFTAR, IN_TANGGAL_AJU, IN_TANGGAL_DAFTAR , NO_BUKTI, NO_DRAFT
       ");

      $this->db->from("DRAFT_DELIVERY_AW A");
      $this->db->where("NO_DRAFT = '" . $param['NO_DRAFT'] . "' AND NO_BUKTI = '" . $param['NO_BUKTI'] . "' ");

      $this->db->group_by("
          INVOICE_NO, ARTICLE_CODE, PART_CODE, PART_MPQ,  DELIVERY_LOT_NO, ORDER_QTY, IN_INVOICE_NO, IN_NOMOR_AJU , IN_NOMOR_DAFTAR, IN_TANGGAL_AJU, IN_TANGGAL_DAFTAR , NO_BUKTI, NO_DRAFT
       ");
      $arr_field = array(
         'A.INVOICE_NO' => 'INVOICE_NO',
         'A.ARTICLE_CODE' => 'ARTICLE_CODE',
         'A.PART_CODE' => 'PART_CODE',
         'A.PART_MPQ' => 'PART_MPQ',
         'A.DELIVERY_LOT_NO' => 'DELIVERY_LOT_NO',
         'A.ORDER_QTY' => 'ORDER_QTY',
         'A.IN_INVOICE_NO' => 'IN_INVOICE_NO',
         'A.IN_NOMOR_AJU' => 'IN_NOMOR_AJU',
         'A.IN_NOMOR_DAFTAR' => 'IN_NOMOR_DAFTAR',
         'A.IN_TANGGAL_AJU' => 'IN_TANGGAL_AJU',
         'A.IN_TANGGAL_DAFTAR' => 'IN_TANGGAL_DAFTAR',
         'A.NO_BUKTI' => 'NO_BUKTI',
         'A.NO_DRAFT' => 'NO_DRAFT',
      );
      if (array_key_exists('filter', $param)) {
         $keyval = json_decode($param['filter'], true);
         foreach ($keyval as $key => $val) {
            $this->db->like(array_search($val['property'], $arr_field), $val['value']);
         }
      }
      $tempdb = clone $this->db;
      $count = $tempdb->count_all_results();

      if (!array_key_exists('sort', $param)) {
         $this->db->order_by("ARTICLE_CODE");
      }
      if (array_key_exists('sort', $param)) {
         $keyval = json_decode($param['sort'], true);
         foreach ($keyval as $key => $val) {
            $this->db->order_by($val["property"], $val['direction']);
         }
      }
      $query = $this->db->get();
      $rows = $query->result_array();
      $data = array(
         'TotalRows' => $count,
         'Rows' => $rows
      );
      return json_encode($data);
   }
   function sync_data($param)
   {
      $this->load->database();
      $SQL_CALLSP = "EXEC SP_TR_DELIVERY_INSTRUCTION_NEW ? ";
      $data = array(
         '@VUSERNAME' => $param['VUSERNAME'],
      );
      $result = $this->db->query($SQL_CALLSP, $data);
      // print $this->db->last_query();

      $row = $result->row_array();

      return json_encode($row);
   }
   function read_clients($param)
   {
      $this->load->database();
      $this->db->select("
            A.CLIENT,
            ISNULL(A.MAPPED_TENANT,'#######################################') AS MAPPED_TENANT,
            ISNULL(B.NAMA, '#######################################') AS NAMA,
            ISNULL(B.ALAMAT, '#######################################') AS ALAMAT,
            ISNULL(B.KODE_NEGARA, '#######################################') AS KODE_NEGARA,
            ISNULL(C.URAIAN_NEGARA, '#######################################') AS URAIAN_NEGARA,
            B.NPWP
        ");
      $this->db->from('DRAFT_DELIVERY_AW A');
      $this->db->join("referensi_pemasok B", "A.MAPPED_TENANT = B.KODE_INTERNAL", "left");
      $this->db->join("referensi_negara C", "B.KODE_NEGARA = C.KODE_NEGARA", "left");
      /*$this->db->where("
            A.NOMOR_DAFTAR IS NULL
        ");*/

      $this->db->group_by("
            A.CLIENT,
            A.MAPPED_TENANT,
            B.NAMA,
            B.ALAMAT,
            B.KODE_NEGARA,
            C.URAIAN_NEGARA,
            B.NPWP
        ");

      $arr_field = array(
         'A.CLIENT' => 'CLIENT',
         'A.MAPPED_TENANT' => 'MAPPED_TENANT',
         'B.NAMA' => 'NAMA',
         'B.ALAMAT' => 'ALAMAT',
         'B.KODE_NEGARA' => 'KODE_NEGARA',
         'C.URAIAN_NEGARA' => 'URAIAN_NEGARA',
         'B.NPWP' => 'NPWP'
      );

      if (array_key_exists('filter', $param)) {
         $keyval = json_decode($param['filter'], true);
         foreach ($keyval as $key => $val) {
            $this->db->like(array_search($val['property'], $arr_field), $val['value']);
         }
      }
      $tempdb = clone $this->db;
      $count = $tempdb->count_all_results();

      if (!array_key_exists('sort', $param)) {
         $this->db->order_by("CLIENT");
      }
      if (array_key_exists('sort', $param)) {
         $keyval = json_decode($param['sort'], true);
         foreach ($keyval as $key => $val) {
            $this->db->order_by($val["property"], $val['direction']);
         }
      }
      $query = $this->db->get();
      $rows = $query->result_array();
      $data = array(
         'TotalRows' => $count,
         'Rows' => $rows
      );
      return json_encode($data);
   }


   function read_draft_selectinvoice($param)
   {
      $this->load->database();
      $this->db->distinct();
      $this->db->select("
           A.INVOICE_NO,
           A.INVOICE_DATE,
           A.TENANT_INVOICE_NO,
           COUNT(A.DELIVERY_LOT_NO) AS  ORDER_QTY,
       ");
      $this->db->from('DRAFT_DELIVERY_AW A');
      $this->db->where(" A.MAPPED_GOODS IS NOT NULL AND A.MAPPED_TENANT IS NOT NULL AND A.MAPPED_TENANT = '" . $param['MAPPED_TENANT'] . "' ");

      $this->db->group_by("
           A.INVOICE_NO,
           A.INVOICE_DATE,
           A.TENANT_INVOICE_NO,
       ");

      $arr_field = array(
         'A.INVOICE_NO' => 'INVOICE_NO',
         'A.INVOICE_DATE' => 'INVOICE_DATE',
         'B.TENANT_INVOICE_NO' => 'TENANT_INVOICE_NO',
         'B.ORDER_QTY' => 'ORDER_QTY',
      );

      if (array_key_exists('filter', $param)) {
         $keyval = json_decode($param['filter'], true);
         foreach ($keyval as $key => $val) {
            $this->db->like(array_search($val['property'], $arr_field), $val['value']);
         }
      }
      $tempdb = clone $this->db;
      $count = $tempdb->count_all_results();

      if (!array_key_exists('sort', $param)) {
         $this->db->order_by("INVOICE_DATE");
      }
      if (array_key_exists('sort', $param)) {
         $keyval = json_decode($param['sort'], true);
         foreach ($keyval as $key => $val) {
            $this->db->order_by($val["property"], $val['direction']);
         }
      }
      $query = $this->db->get();
      $rows = $query->result_array();
      $data = array(
         'TotalRows' => $count,
         'Rows' => $rows
      );
      return json_encode($data);
   }

   function SP_TR_PLB_DRAFT_OUT_SELECT_INVOICE($param)
   {
      $this->load->database();
      $SQL_CALLSP = "EXEC SP_TR_PLB_DRAFT_OUT_SELECT_INVOICE
       @VIDCOMPANY=?,
       @VUSERNAME=?,
       @VINVOICE=?,
       @VCLIENT=?
       ";
      $data = array(
         '@VIDCOMPANY' => $param['ID_COMPANY'],
         '@VUSERNAME' => $param['VUSERNAME'],
         '@VINVOICE' => $param['invoice'],
         '@VCLIENT' => $param['client']
      );
      $result = $this->db->query($SQL_CALLSP, $data);
      $row = $result->row_array();


      return json_encode($row);
   }


   function SP_TR_GET_EXBC_PER_SERI_BARANG($param)
   {
      $this->load->database();
      $SQL_CALLSP = "EXEC SP_TR_GET_EXBC_PER_SERI_BARANG
       @VINVOICE=?,
       @VDELIVERY_LOT_NO=?
       ";
      $data = array(
         '@VINVOICE' => $param['invoice'],
         '@VDELIVERY_LOT_NO' => $param['DELIVERY_LOT_NO']
      );
      $result = $this->db->query($SQL_CALLSP, $data);
      $row = $result->result_array();
      if ($param['MODE'] == 'exbc') {
         #print "true";
         return ($row[0]['vjson_exbcfg']);
      } else {
         return json_encode($row);
      }
   }


   function proses_save_dokumen_draft($param)
   {
      $this->load->database();
      $SQL_CALLSP = "EXEC SP_TRN_DRAFT_BC_OUT_AW
       @VUSERNAME=?,
       @VIDCOMPANY=?,
       @VBCTYPE=?, 
       @VINVOICE=?,
       @VDRAFTAJU=?
       ";
      $data = array(
         '@VUSERNAME' => $param['VUSERNAME'],
         '@VIDCOMPANY' => $param['ID_COMPANY'],
         '@VBCTYPE' => $param['BCTYPE'],
         '@VINVOICE' => $param['dokumen'],
         '@VDRAFTAJU' => $param['AJU_DRAFT'],
      );
      $result = $this->db->query($SQL_CALLSP, $data);
      $row = $result->row_array();


      return json_encode($row);
   }
}