<?php
class Mbc23_mainMenu extends CI_Model {

    function read($param){
        $vcolumn = json_decode($this->definition(),true);
        $vdefinition = $vcolumn["model1"]["definition"];

        $this->load->database();
        $this->db->select("
        A.KODE_DOKUMEN_PABEAN,
        B.mode_source_name,
        C.URAIAN_STATUS,
        D.URAIAN_KANTOR as KODE_KANTOR_BONGKARNAME,
        E.URAIAN_KANTOR as KODE_KANTOR_NAME,
        A.*
        
            ",false);
        $this->db->from("njc.tr_bc_header A");
        $this->db->join("njc.h_source_header B","A.mode_source = B.mode_source ","left");
        $this->db->join("njc.referensi_status C","A.KODE_STATUS = C.KODE_STATUS AND C.KODE_DOKUMEN='23'","left");
        $this->db->join("njc.referensi_kantor_pabean D","A.KODE_KANTOR_BONGKAR = D.KODE_KANTOR","left");
        $this->db->join("njc.referensi_kantor_pabean E","A.KODE_KANTOR = E.KODE_KANTOR","left");
        $this->db->where("A.KODE_DOKUMEN_PABEAN","23");

        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                    $valproperty = $val["property"];
                    $key = array_search($valproperty, array_column($vdefinition, "name"));
                    $this->db->like($vdefinition[$key]["dbname"],$val['value'], 'both');
            }        
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                    $valproperty = $val["property"];
                    $key = array_search($valproperty, array_column($vdefinition, "name"));
                    $this->db->order_by($vdefinition[$key]["dbname"], $val['direction']);
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
                return $this->module_send($param,"njc.SP_BC23_HEADER");
                break;
            case "kontainer":
                return $this->module_send($param,"njc.SP_BC_KONTAINER");
                break;
            case "kemasan":
                return $this->module_send($param,"njc.SP_BC_KEMASAN");
                break;
            case "dokumen":
                return $this->module_send($param,"njc.SP_BC_DOKUMEN");
                break;
            default:
              return false;
          }
    }
    function update($param){
        switch ($param["module"]) {
            case "header":
                return $this->module_send($param,"njc.SP_BC23_HEADER");
                break;
            case "kontainer":
                return $this->module_send($param,"njc.SP_BC_KONTAINER");
                break;
            case "kemasan":
                return $this->module_send($param,"njc.SP_BC_KEMASAN");
                break;
            case "dokumen":
                return $this->module_send($param,"njc.SP_BC_DOKUMEN");
                break;
            default:
              return false;
          }
        
    }
    function delete($param){
        switch ($param["module"]) {
            case "header":
                return $this->module_send($param,"njc.SP_BC23_HEADER");
                break;
            case "kontainer":
                return $this->module_send($param,"njc.SP_BC_KONTAINER");
                break;
            case "kemasan":
                return $this->module_send($param,"njc.SP_BC_KEMASAN");
                break;
            case "dokumen":
                return $this->module_send($param,"njc.SP_BC_DOKUMEN");
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
                return $this->module_send($param,"njc.SP_BC_DETAIL");
                break;
            case "item_barang":
                return $this->module_send($param,"njc.SP_BC_ITEM_BARANG");
                break;
            default:
              return false;
          }
        
    }
    
    
    function definition(){
        $model1= array(
            'TableName'=>'tblBC23Hdr',
            'definition'=>array(
                array('name'=>'URAIAN_STATUS','dbname'=> 'URAIAN_STATUS','type'=> 'varchar','max_length'=> 26,'nullable'=> true,'format'=> ''),
                array('name'=>'mode_source_name','dbname'=> 'mode_source_name','type'=> 'varchar','max_length'=> 6,'nullable'=> true,'format'=> ''),
                array('name'=>'NOMOR_AJU','dbname'=> 'NOMOR_AJU','type'=> 'varchar','max_length'=> 1,'nullable'=> true,'format'=> ''),
                array('name'=>'CIF','dbname'=> 'CIF','type'=> 'varchar','max_length'=> 1,'nullable'=> true,'format'=> ''),
                array('name'=>'CIF_RUPIAH','dbname'=> 'CIF_RUPIAH','type'=> 'varchar','max_length'=> 1,'nullable'=> true,'format'=> ''),
                    )
                );

        $output = array(
            "success"=>true,
            "model1"=>$model1
        );

        return json_encode($output);
    }
    function relation($param){
        
    }
}