<?php
class Mbcpemasukan_list extends CI_Model {

    function read($param){

        $this->load->database();
        $this->db->select("
        C.URAIAN_STATUS,
        D.URAIAN_KANTOR as KODE_KANTOR_BONGKARNAME,
        E.URAIAN_KANTOR as KODE_KANTOR_NAME,
        A.*
        
            ",false);
        $this->db->from("tr_bc_header A");
        $this->db->join("referensi_status C","A.KODE_STATUS = C.KODE_STATUS AND C.KODE_DOKUMEN='".$param['kode_dokumen_pabean']."'","left");
        $this->db->join("referensi_kantor_pabean D","A.KODE_KANTOR_BONGKAR = D.KODE_KANTOR","left");
        $this->db->join("referensi_kantor_pabean E","A.KODE_KANTOR = E.KODE_KANTOR","left");

        $this->db->where("A.KODE_DOKUMEN_PABEAN",$param['kode_dokumen_pabean']);
        if ($param['ID_COMPANY']!=='ALL'){
            $this->db->where("A.ID_COMPANY",$param['ID_COMPANY']);
        }

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
        
        $this->db->order_by("A.create_date", "desc");
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                    'TotalRows' => $count,
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
    function create($param){
        switch ($param["module"]) {
            case "header":
                return $this->module_send($param,"SP_BC23_HEADER");
                break;
            case "kontainer":
                return $this->module_send($param,"SP_BC_KONTAINER");
                break;
            case "kemasan":
                return $this->module_send($param,"SP_BC_KEMASAN");
                break;
            case "dokumen":
                return $this->module_send($param,"SP_BC_DOKUMEN");
                break;
            default:
              return false;
          }
    }
    function update($param){
        switch ($param["module"]) {
            case "header":
                return $this->module_send($param,"SP_BC23_HEADER");
                break;
            case "kontainer":
                return $this->module_send($param,"SP_BC_KONTAINER");
                break;
            case "kemasan":
                return $this->module_send($param,"SP_BC_KEMASAN");
                break;
            case "dokumen":
                return $this->module_send($param,"SP_BC_DOKUMEN");
                break;
            default:
              return false;
          }
        
    }
    function delete($param){
        switch ($param["module"]) {
            case "header":
                return $this->module_send($param,"SP_BC23_HEADER");
                break;
            case "kontainer":
                return $this->module_send($param,"SP_BC_KONTAINER");
                break;
            case "kemasan":
                return $this->module_send($param,"SP_BC_KEMASAN");
                break;
            case "dokumen":
                return $this->module_send($param,"SP_BC_DOKUMEN");
                break;
            default:
              return false;
          }
        

    }
    function module_send($param,$spname){
        $this->load->database();
        $vform = $param["data"];
        $SQL_CALLSP = "EXEC ". $spname ."
        @VMETHOD=?,
        @VDATA=?
        ";
        $data = array(
            '@VMETHOD' => $param["method"], 
            '@VDATA' => json_encode($param["data"])
        );

        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->row_array();
        
        return json_encode($row);
    }
    function edit($param){
        switch ($param["module"]) {
            case "header":
                return $this->module_send($param,"SP_BC_DETAIL");
                break;
            case "item_barang":
                return $this->module_send($param,"SP_BC_ITEM_BARANG");
                break;
            default:
              return false;
          }
        
    }
    function method_generate_draft($param){

        $this->load->database();
        $SQL_CALLSP = "EXEC SP_BC_GENERATE_DRAFT
        @VDATA=?
        ";
        $data = array(
            '@VDATA' => '{
                "modulename":"'.$param['modulename'].'",
                "modesource":"'.$param['modesource'].'",
                "VUSERNAME":"'.$param['VUSERNAME'].'",
                "ID_COMPANY":"'.$param['ID_COMPANY'].'"
            }'
        );

        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->row_array();
        
        return json_encode($row);
    }
    
    
}