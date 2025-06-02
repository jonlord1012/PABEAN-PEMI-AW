<?php
class Msync_doc_sa extends CI_Model {
    function read($param){
        switch ($param["method"]) {
            case "read_listinvoice":
                return $this->read_listinvoice($param);
                break;
            case "read_data":
                return $this->read_data($param);
                break;
            case "read_period":
                return $this->read_period($param);
                break;
            case "read_sp_container":
                return $this->read_sp_container($param);
                break;
            case "read_sp_invoice":
                return $this->read_sp_invoice($param);
                break;
            case "read_sp_sa":
                return $this->read_sp_sa($param);
                break;
            default:
              return false;
          }
    }
    function read_data($param){
        $this->load->database();
        $this->db->select("
            A.*
        ");
        $this->db->from("upload_sa_header A");

        switch ($param["cbo_filterkey"]) {
            case "1":
                $this->db->where("A.BC_TYPE IS NULL");
                break;
            case "2":
                $this->db->where("A.NOMOR_AJU like '%DRAFT%'");
                break;
            
            default:
                break;
          }

        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->like($val["property"],$val['value'], 'both');
            }        
        }

        //$tempdb = clone $this->db;
        $count= $this->db->count_all_results('', FALSE);

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
        //$count= $query->count_all_results();
        $data = array(
                    'TotalRows' => $count,
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
    function read_period($param){
        $this->load->database();
        $this->db->select("
        DISTINCT SUBSTRING(A.Period,1, 4) as TAHUN
        ");
        $this->db->from("PEMI_SIS.dbo.SA_SADetail A");
        
        $query = $this->db->get();
        $rows = $query->result_array();
        return  json_encode($rows );
    }
    function read_listinvoice($param){
        $this->load->database();
        $this->db->select("
            C.SANo as SA_NO,
            format(F.SADate,'yyyy-MM-dd') as SA_DATE,
            A.InvoiceNo as INVOICE_NO,
            format(B.ETDPEMI,'yyyy-MM-dd') as INVOICE_DATE,
            A.ContainerNo as CONTAINER_NO,
            A.CustCode as CUSTOMER_CODE,
            A.Periode as PERIODE,
            A.DRNo as DRNO,
            B.ShippingType as SHIPPING_TYPE,
            CASE 
                WHEN B.ShippingType='0' THEN 'LAUT'
                WHEN B.ShippingType='1' THEN 'DARAT'
                WHEN B.ShippingType='2' THEN 'UDARA'
                ELSE 'NOT FOUND'
            END SHIPPING_NAME
        ");
        $this->db->from("
        (
        SELECT
        DISTINCT A.InvoiceNo,A.ContainerNo,A.CustCode,A.Periode,A.DRNo
            FROM PEMI_SIS.dbo.SC_ContainerInput A
        WHERE
        SUBSTRING(A.Periode,1, 4)='" . $param['PERIOD'] . "' AND 
        A.InvoiceNo is not NULL
        ) A
        ");
        $this->db->join("PEMI_SIS.dbo.IV_InvoiceMaster B","A.InvoiceNo = B.InvoiceNo","left");
        $this->db->join("PEMI_SIS.dbo.SA_SADetail C","A.InvoiceNo = C.InvoiceNo ","left");
        $this->db->join("upload_sa_header D"," A.InvoiceNo = D.INVOICE_NO","left");
        $this->db->join("PEMI_SIS.dbo.SA_SAMaster F","C.SANo = F.SANo","left");
        $this->db->where("
        D.INVOICE_NO is NULL
        ");

        $arr_field = array(
            'C.SANo'=>'SA_NO',
            'F.SADate'=>'SA_DATE',
            'A.InvoiceNo'=>'INVOICE_NO',
            'B.ETDPEMI'=>'INVOICE_DATE',
            'A.ContainerNo'=>'CONTAINER_NO',
            'A.CustCode'=>'CUSTOMER_CODE',
            'A.Periode'=>'PERIODE',
            'A.DRNo'=>'DRNO',
            'B.ShippingType'=>'SHIPPING_TYPE',
        );
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                    $this->db->like(array_search($val['property'],$arr_field),$val['value']);
            }
        }


        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                    //$valproperty = $val["property"];
                    //$key = array_search($valproperty, array_column($vdefinition, "name"));
                    $this->db->order_by( $val["property"], $val['direction']);
            }
        }
        
        
        $tempdb = clone $this->db;
        $count= $tempdb->count_all_results(); 
        
        $this->db->order_by("B.ETDPEMI", "DESC");

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
    function getdata_invoice($param){
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_UPLOAD_SA
        @VUSERNAME=?,
        @VINVOICE=?,
        @VSANO=?
        ";
        $data = array(
            '@VUSERNAME' => $param['VUSERNAME'], 
            '@VINVOICE' => $param['INVOICE_NO'],
            '@VSANO' => $param['SA_NO']
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->row_array();

        
        return json_encode($row);
    }
    function read_sp_container($param){
        $this->load->database();
        $this->db->select("*");
        $this->db->from("fg_containerinput");
        
        $this->db->where("
        ContainerNo='".$param['CONTAINER_NO']."' AND 
        InvoiceNo='".$param['INVOICE_NO']."'
        ");

        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
    function read_sp_invoice($param){
        $this->load->database();
        $this->db->select("*");
        $this->db->from("fg_invoicedetail");
        
        $this->db->where("
        InvoiceNo='".$param['INVOICE_NO']."'
        ");

        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
    function read_sp_sa($param){
        $this->load->database();
        $this->db->select("*");
        $this->db->from("fg_samaster");
        
        $this->db->where("
        SANo='".$param['SA_NO']."'
        ");

        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
}