<?php
class Mpelabuhan_bongkar extends CI_Model {

    function read($param){
        $this->load->database();
        $this->db->select("
                *

            ",false);
        $this->db->from("njc.mst_pelabuhan");

        if (array_key_exists('keywhere', $param)) {
            $keyval = json_decode($param['keywhere'],true);
            foreach ($keyval as $key =>$val ) {
                    $this->db->where($val['property'],$val['value']);
            }
        }
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                    $colname = array('SYSUPDATEDATE','SYSCREATEDATE');
                    if (in_array($val['property'], $colname)) {
                        $this->db->like( "TO_CHAR(". $val['property'] .", 'YYYY-MM-DD HH24:MI:SS')", $val['value']);
                    }else{
                        $this->db->like("UPPER(" . $val['property'] .")",strtoupper($val['value']), 'both');
                    }
            }        
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                    $this->db->order_by($val['property'], $val['direction']);
            }
        }
        
        $tempdb = clone $this->db;
        $count= $tempdb->count_all_results(); 
        
        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }

        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                    'success'=>true,
                    'TotalRows' => $count,
                        'Rows' => $rows
                     );
        return json_encode($data );
    }

    function create($param){
        
        $this->load->database();
        $this->db->trans_begin();
        $vinput= array(
            'KETERANGAN'=>$param["KETERANGAN"],
            'KODE_KANTOR'=>$param["KODE_KANTOR"],
            'KODE_PELABUHAN'=>$param["KODE_PELABUHAN"],
            'URAIAN_PELABUHAN'=>$param["URAIAN_PELABUHAN"],
            'create_by'=>$param["userID"]
        );
        $this->db->set('create_date',"CURRENT_TIMESTAMP",false);
        $this->db->insert('njc.mst_pelabuhan', array_filter($vinput));
        

        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE)
        {   
            $this->db->trans_rollback();
            $error = $this->db->error();
            $out= array(
                'success'=>false,
                'message'=>"Failed Create data pelabuhan " . $error["message"]
            );
        }else{
            $this->db->trans_commit();
            $out= array(
                'success'=>true,
                'message'=>'Create pelabuhan Success'
            );  
        }
        return json_encode($out);

    }
    function update($param){
        $this->load->database();
        $this->db->trans_begin();
        $vinput= array(
            'KETERANGAN'=>$param["KETERANGAN"],
            'KODE_KANTOR'=>$param["KODE_KANTOR"],
            'KODE_PELABUHAN'=>$param["KODE_PELABUHAN"],
            'URAIAN_PELABUHAN'=>$param["URAIAN_PELABUHAN"],
            'modify_by'=>$param["userID"]
        );

        $this->db->set('modify_date',"CURRENT_TIMESTAMP",false);
        $this->db->where('mst_pelabuhan.ID', $param["ID"]);
        $this->db->update('njc.mst_pelabuhan', array_filter($vinput));
        

        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE)
        {   
            $this->db->trans_rollback();
            $error = $this->db->error();
            $out= array(
                'success'=>false,
                'message'=>"Failed Update data pelabuhan " . $error["message"]
            );
        }else{
            $this->db->trans_commit();
            $out= array(
                'success'=>true,
                'message'=>'Update pelabuhan Success'
            );  
        }
        return json_encode($out);

    }
    function delete($param){
        $this->load->database();
        $this->db->trans_begin();
        
        $this->db->where('ID', $param["ID"]);
        $this->db->delete('njc.mst_pelabuhan');
        

        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE)
        {   
            $this->db->trans_rollback();
            $error = $this->db->error();
            $out= array(
                'success'=>false,
                'message'=>"Failed Delete data Pelabuhan " . $error["message"]
            );
        }else{
            $this->db->trans_commit();
            $out= array(
                'success'=>true,
                'message'=>'Delete pelabuhan Success'
            );  
        }
        return json_encode($out);

    }
}