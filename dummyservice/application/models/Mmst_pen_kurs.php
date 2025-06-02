<?php
class Mmst_pen_kurs extends CI_Model {

    function read($param){
        $this->load->database();
        $this->db->select("
            A.ID,
            A.KODE_VALUTA,
            A.URAIAN_VALUTA,
            A.CREATE_USER,
            A.CREATE_DATE,
            A.UPDATE_USER,
            A.UPDATE_DATE
            ",false);
        $this->db->from("referensi_valuta A");
        /*
        $this->db->where("
        A.ID_COMPANY
        ");
        */
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
        
        $this->db->order_by("A.ID", "DESC");
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                    'TotalRows' => $count,
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
    function create($param){
        $vdata = json_decode($param['data'],true);
        $field = array(
            'KODE_VALUTA' => $vdata['KODE_VALUTA'],
            'URAIAN_VALUTA' => $vdata['URAIAN_VALUTA'],
            'CREATE_USER'=>$param['VUSERNAME']
        );
        $this->load->database();
        $this->db->set('CREATE_DATE', 'getdate()', false);
        if (!$this->db->insert('referensi_valuta', array_filter($field)))
        {   
            $out= array(
                'success'=>false,
                'message'=>'Insert Data Failed'
            );
        }else{
                $out= array(
                'success'=>'true',
                'message'=>'insert Data Success'
            );  
        }
        return json_encode($out);
    }
    function update($param){
        $vdata = json_decode($param['data'],true);
        $this->load->database();
        $field = array(
            'KODE_VALUTA' => $vdata['KODE_VALUTA'],
            'URAIAN_VALUTA' => $vdata['URAIAN_VALUTA'],
            'UPDATE_USER'=>$param['VUSERNAME'] 
        );
        $this->db->where('ID', $vdata['ID']);
        $this->db->set('UPDATE_DATE', 'getdate()', false);
        if(!$this->db->update('referensi_valuta', $field )){
            $out= array(
                'success'=>false,
                'message'=>'Update Data Failed'
            );
        }else{
                $out= array(
                'success'=>'true',
                'message'=>'Update Data Success'
            );  
        }
        return json_encode($out);
    }
    function delete($param){
        $vdata = json_decode($param['data'],true);

        $this->load->database();
        $this->db->where('ID',$vdata);
        if(!$this->db->delete('referensi_valuta')){
            $out= array(
                'success'=>false,
                'message'=>'Delete Data Failed'
            );
        }else{
                $out= array(
                'success'=>'true',
                'message'=>'Delete Data Success'
            );  
        }
        return json_encode($out);
        

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
        $vdata = $param['data'];
        $this->load->database();
        $query = $this->db->get_where('referensi_valuta',array(
            'ID'=>$vdata['ID']
        ));
        $rows = $query->row_array();
        $out = array(
            'success'=>'true',
            'message'=>'Data Ditampilkan',
            'data'=>$rows
        );
       return json_encode($out);
    }
    
    
    
}