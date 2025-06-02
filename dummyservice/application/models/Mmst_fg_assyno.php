<?php
class Mmst_fg_assyno extends CI_Model {

    function read($param){
        $this->load->database();
        $this->db->select("
            A.ID,
            A.ASSY_NO,
            A.ASSY_NAME,
            A.CARLINE,
            A.FAMILY_CODE,
            A.DESTINATION_CODE,
            A.ASSY_CODE,
            A.ID_COMPANY,
            A.CREATE_USER,
            A.CREATE_DATE,
            A.UPDATE_USER,
            A.UPDATE_DATE
            ",false);
        $this->db->from("mst_assy A");
        $this->db->where("A.ID_COMPANY",$param['ID_COMPANY']);

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
            'ASSY_NO' => $vdata['ASSY_NO'],
            'ASSY_NAME' => $vdata['ASSY_NAME'],
            'CARLINE' => $vdata['CARLINE'],
            'FAMILY_CODE' => $vdata['FAMILY_CODE'],
            'DESTINATION_CODE' => $vdata['DESTINATION_CODE'],
            'ASSY_CODE' => $vdata['ASSY_CODE'],
            'ID_COMPANY'=>$param['ID_COMPANY'],
            'CREATE_USER'=>$param['VUSERNAME'] 
        );
        $this->load->database();
        $this->db->set('CREATE_DATE', 'getdate()', false);
        if (!$this->db->insert('mst_assy', array_filter($field)))
        {   
            $out= array(
                'success'=>false,
                'message'=>'Insert Data Failed'
            );
        }else{
                $out= array(
                'success'=>'true',
                'message'=>'Insert Data Success'
            );  
        }
        return json_encode($out);
    }
    function update($param){
        $vdata = json_decode($param['data'],true);
        $this->load->database();
        $field = array(
            'ASSY_NO' => $vdata['ASSY_NO'],
            'ASSY_NAME' => $vdata['ASSY_NAME'],
            'CARLINE' => $vdata['CARLINE'],
            'FAMILY_CODE' => $vdata['FAMILY_CODE'],
            'DESTINATION_CODE' => $vdata['DESTINATION_CODE'],
            'ASSY_CODE' => $vdata['ASSY_CODE'],
            'ID_COMPANY'=>$param['ID_COMPANY'],
            'UPDATE_USER'=>$param['VUSERNAME'] 
        );
        $this->db->where('ID', $vdata['ID']);
        $this->db->set('UPDATE_DATE', 'getdate()', false);
        if(!$this->db->update('mst_assy', $field )){
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
        if(!$this->db->delete('mst_assy')){
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
        $query = $this->db->get_where('mst_assy',array(
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