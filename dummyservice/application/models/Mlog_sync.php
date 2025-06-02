<?php
class Mlog_sync extends CI_Model {

    function read($param){
        switch ($param["module"]) {
            case "sync_logfile_group_file":
                return $this->sync_logfile_group_file($param);
                break;
            case "sync_logfile_detail_file":
                return $this->sync_logfile_detail_file($param);
                break;
            default:
              return false;
          }
    }
    function sync_logfile_group_file($param){
        $this->load->database();
        $this->db->select("
                REPLACE(A.filename,'C:\\fakepath\\','') as filename,
                FORMAT(A.create_date,'yyyy-MM-dd HH:mm:ss') as create_date
        ");
        $this->db->from("njc.l_upload_coo A");
        $this->db->group_by("        
            A.filename,
            A.create_date
        ");

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
    function sync_logfile_detail_file($param){
        $this->load->database();
        $this->db->select("
                A.*
        ");
        $this->db->from("njc.l_upload_coo A");
        $this->db->where("        
            A.filename like '%".$param['filename']."%' and 
            A.create_date >= '".$param['create_date']."'
        ");

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

}