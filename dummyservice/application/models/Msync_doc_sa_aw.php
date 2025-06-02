<?php
class Msync_doc_sa_aw extends CI_Model {
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
        $this->db->from("upload_sa_header_aw A");

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

}