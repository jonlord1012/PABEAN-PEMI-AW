<?php
class Mgoods_delivery extends CI_Model
{
    function read($param)
    {
        switch ($param["method"]) {
            case "read_in":
                return $this->read_in($param);
                break;
            case "read_detail":
                return $this->read_detail($param);
                break;
            case "read_bc_list":
                return $this->read_bc_list($param);
                break;
            case "view_details":
                return $this->view_details($param);
                break;
            default:
                return false;
        }
    }
    function read_in($param)
    {
        $this->load->database();
        $this->db->distinct();
        $this->db->select("
           CLIENT, CLIENT_NAME ,format(A.INVOICE_DATE,'yyyy-MM-dd') AS INVOICE_DATE, 
           TENANT_INVOICE_NO, INVOICE_NO, OUT_NOMOR_AJU, OUT_TANGGAL_AJU, OUT_NOMOR_DAFTAR, OUT_TANGGAL_DAFTAR,
           SURAT_JALAN, TANGGAL_SURAT_JALAN , ISNULL(STATUS , 'OPEN') AS STATUS
         ");

        $this->db->from("DRAFT_DELIVERY_AW A");
        $this->db->group_by("CLIENT, CLIENT_NAME , INVOICE_DATE ,
           TENANT_INVOICE_NO, INVOICE_NO, OUT_NOMOR_AJU, OUT_TANGGAL_AJU, OUT_NOMOR_DAFTAR, OUT_TANGGAL_DAFTAR, SURAT_JALAN, TANGGAL_SURAT_JALAN, STATUS ");


        $arr_field = array(
            'A.CLIENT' => 'CLIENT',
            'A.CLIENT_NAME' => 'CLIENT_NAME',
            'A.INVOICE_NO' => 'INVOICE_NO',
            "format(A.INVOICE_DATE,'yyyy-MM-dd')" => 'INVOICE_DATE',
            'A.TENANT_INVOICE_NO' => 'TENANT_INVOICE_NO',
            'A.NO_PICKING' => 'NO_PICKING',
            'A.NO_DRAFT' => 'NO_DRAFT',
            'A.NO_BUKTI' => 'NO_BUKTI',
            'A.SURAT_JALAN' => 'SURAT_JALAN',
            'A.TANGGAL_SURAT_JALAN' => 'TANGGAL_SURAT_JALAN',
            'A.STATUS' => 'STATUS'
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
    function read_bc_list($param)
    {

        $this->load->database();
        $this->db->distinct();
        $this->db->select("
          *
         ");

        $this->db->from("VW_GET_BCOUT_FOR_DELIVERY");
        $this->db->where("NOMORDOKUMEN  = '" . $param['INVOICENO']  . "' ");


        $arr_field = array(
            'NOMORAJU' => 'NOMORAJU',
            'NOMORDOKUMEN' => 'NOMORDOKUMEN',
            'CLIENT_NAME' => 'CLIENT_NAME',
            'CLIENT' => 'CLIENT',
            'TENANT_NAME' => 'TENANT_NAME',
            'TENANT' => 'TENANT',
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
            $this->db->order_by("NOMORDOKUMEN");
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

    function read_detail($param)
    {
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_TR_READ_DELIVERY_INSTRUCTION ? , ?, ? ";
        $data = array(
            '@VUSERNAME' => $param['VUSERNAME'],
            '@VINVOICENO' => $param['INVOICENO'],
            '@VTENANT_INVOICENO' => $param['TENANT_INVOICENO'],
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        // print $this->db->last_query();

        $row = $result->result_array();

        return json_encode($row);
    }

    function view_details($param)
    {
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_GOODS_OUT_VIEW_DETAILS ? , ?, ? ";
        $data = array(
            '@VUSERNAME' => $param['VUSERNAME'],
            '@VINVOICENO' => $param['INVOICENO'],
            '@VTENANT_INVOICENO' => $param['TENANT_INVOICENO'],
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        // print $this->db->last_query();

        $row = $result->result_array();
        #print_r($row);

        return json_encode($row);
    }
    function approve_delivery_out($param)
    {
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_GOODS_OUT_BINLOC ? , ? , ?,  ?, ? ";
        $data = array(
            '@VUSERNAME' => $param['VUSERNAME'],
            '@VMODE' => 'PROCESS',
            '@VMODULE' => 'GOODS_OUT',
            '@VIDCOMPANY' => 'AW',
            '@VDATA' => $param['header'],
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        #print $this->db->last_query();

        $row = $result->row_array();

        return json_encode($row);
    }
}