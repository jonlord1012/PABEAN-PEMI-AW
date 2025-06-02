<?php
class Mmatrix extends CI_Model {

    function read($param){
        switch ($param["method"]) {
            case "group_part":
                return $this->read_group_part($param);
                break;
            case "category_part":
                return $this->read_category_part($param);
                break;
            case "base_part":
                return $this->read_base_part($param);
                break;
            case "type_part":
                return $this->read_type_part($param);
                break;
            case "uom_part":
                return $this->read_uom_part($param);
                break;
            case "read_in":
                return $this->read_in($param);
                break;
            default:
              return false;
          }
    }
    
    function read_group_part ($param){
        $this->load->database();
        $this->db->select("
            *
        ");
        $this->db->from("a_matrix A");
        
        $this->db->where("A.ID_COMPANY",$param['ID_COMPANY']);
        $this->db->where("A.MODE_CATEGORY","GROUP PART");
        $arr_field = array(
            'A.NOMOR_AJU'=>'NOMOR_AJU',
            'A.TANGGAL_AJU'=>'TANGGAL_AJU',
            'A.NOMOR_DAFTAR'=>'NOMOR_DAFTAR'
        );
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                    $this->db->where(array_search($val['property'],$arr_field),$val['value']);
            }
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->order_by( $val["property"], $val['direction']);
            }
        }
        
        
        
        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }
        
        $this->db->order_by("A.ID", "DESC");
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                    'TotalRows' => 1,
                        'Rows' => $rows
                     );
        return json_encode($data );
    }

    function read_category_part ($param){
        $this->load->database();
        $this->db->select("
            *
        ");
        $this->db->from("a_matrix A");
        
        $this->db->where("A.ID_COMPANY",$param['ID_COMPANY']);
        $this->db->where("A.MODE_CATEGORY","CATEGORY PART");
        $arr_field = array(
            'A.NOMOR_AJU'=>'NOMOR_AJU',
            'A.TANGGAL_AJU'=>'TANGGAL_AJU',
            'A.NOMOR_DAFTAR'=>'NOMOR_DAFTAR'
        );
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                    $this->db->where(array_search($val['property'],$arr_field),$val['value']);
            }
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->order_by( $val["property"], $val['direction']);
            }
        }
        
        
        
        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }
        
        $this->db->order_by("A.ID", "DESC");
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                    'TotalRows' => 1,
                        'Rows' => $rows
                     );
        return json_encode($data );
    }

    function read_base_part ($param){
        $this->load->database();
        $this->db->select("
            *
        ");
        $this->db->from("a_matrix A");
        
        $this->db->where("A.ID_COMPANY",$param['ID_COMPANY']);
        $this->db->where("A.MODE_CATEGORY","BASE PART");
        $arr_field = array(
            'A.NOMOR_AJU'=>'NOMOR_AJU',
            'A.TANGGAL_AJU'=>'TANGGAL_AJU',
            'A.NOMOR_DAFTAR'=>'NOMOR_DAFTAR'
        );
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                    $this->db->where(array_search($val['property'],$arr_field),$val['value']);
            }
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->order_by( $val["property"], $val['direction']);
            }
        }
        
        
        
        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }
        
        $this->db->order_by("A.ID", "DESC");
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                    'TotalRows' => 1,
                        'Rows' => $rows
                     );
        return json_encode($data );
    }

    function read_type_part ($param){
        $this->load->database();
        $this->db->select("
            *
        ");
        $this->db->from("a_matrix A");
        
        $this->db->where("A.ID_COMPANY",$param['ID_COMPANY']);
        $this->db->where("A.MODE_CATEGORY","TYPE PART");
        $arr_field = array(
            'A.NOMOR_AJU'=>'NOMOR_AJU',
            'A.TANGGAL_AJU'=>'TANGGAL_AJU',
            'A.NOMOR_DAFTAR'=>'NOMOR_DAFTAR'
        );
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                    $this->db->where(array_search($val['property'],$arr_field),$val['value']);
            }
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->order_by( $val["property"], $val['direction']);
            }
        }
        
        
        
        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }
        
        $this->db->order_by("A.ID", "DESC");
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                    'TotalRows' => 1,
                        'Rows' => $rows
                     );
        return json_encode($data );
    }

    function read_uom_part ($param){
        $this->load->database();
        $this->db->select("
            *
        ");
        $this->db->from("a_matrix A");
        
        $this->db->where("A.ID_COMPANY",$param['ID_COMPANY']);
        $this->db->where("A.MODE_CATEGORY","UOM PART");
        $arr_field = array(
            'A.NOMOR_AJU'=>'NOMOR_AJU',
            'A.TANGGAL_AJU'=>'TANGGAL_AJU',
            'A.NOMOR_DAFTAR'=>'NOMOR_DAFTAR'
        );
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                    $this->db->where(array_search($val['property'],$arr_field),$val['value']);
            }
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->order_by( $val["property"], $val['direction']);
            }
        }
        
        
        
        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }
        
        $this->db->order_by("A.ID", "DESC");
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                    'TotalRows' => 1,
                        'Rows' => $rows
                     );
        return json_encode($data );
    }

    function create_matrix($param){
        $vdata = json_decode($param['data'],true);
          $this->load->database();
          
          switch ($param["module"]) {
            case "insert":
                $field = array(
                    'MODE_CODE'=>$vdata['MODE_CODE'],
                    'MODE_NAME'=>$vdata['MODE_NAME'],
                    'MODE_CATEGORY'=>$param['mode_category'],
                    'ID_COMPANY'=>$param['ID_COMPANY'] ,
                    'CREATE_USER'=>$param['VUSERNAME'] 
                  );      
                if(!$this->db->insert('a_matrix', array_filter($field)))
                {
                    $out= array(
                        'success'=>'false',
                        'message'=>'Insert Data Failed'
                    );
                }else{
                        $out= array(
                        'success'=>'true',
                        'message'=>'Insert Data Success'
                    );  
                }
                break;
            case "update":
                $field = array(
                    'MODE_CODE'=>$vdata['MODE_CODE'],
                    'MODE_NAME'=>$vdata['MODE_NAME'],
                    'MODE_CATEGORY'=>$param['mode_category'],
                    'ID_COMPANY'=>$param['ID_COMPANY'] ,
                    'UPDATE_USER'=>$param['VUSERNAME']
                  );
                $this->db->where('ID', $vdata['ID']);
                $this->db->set('UPDATE_DATE', 'getdate()', false);
                if(!$this->db->update('a_matrix', $field )){
                    $out= array(
                        'success'=>'false',
                        'message'=>'Update Data Failed'
                    );
                }else{
                        $out= array(
                        'success'=>'true',
                        'message'=>'Update Data Success'
                    );  
                }
                break;
            default:
                break;
          }

          
          
          return json_encode($out);
    }
    function delete_matrix($param){
        $vdata = json_decode($param['data'],true);
        $this->load->database();
        $this->db->trans_begin();
        
        $this->db->where('ID', $vdata["ID"]);
        $this->db->delete('a_matrix');

        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE)
        {   
            $this->db->trans_rollback();
            $error = $this->db->error();
            $out= array(
                'success'=>'false',
                'message'=>"Delete Data Failed" . $error["message"]
            );
        }else{
            $this->db->trans_commit();
            $out= array(
                'success'=>'true',
                'message'=>'Delete Data Success'
            );  
        }
        return json_encode($out);
    }
}