<?php
class Msupplier extends CI_Model {

    function read($param){
        $this->load->database();
        $this->db->select("
                *

            ",false);
        $this->db->from("referensi_pemasok");

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
                    'TotalRows' => $count,
                        'Rows' => $rows
                     );
        return json_encode($data );
    }

    function create($param){
        $vform= json_decode($param['form'],true);
        $this->load->database();
        $this->db->trans_begin();
        $vinput= array(
            'supplier_customer_code'=>$vform["supplier_customer_code"],
            'supplier_customer_name'=>$vform["supplier_customer_name"],
            'supplier_customer_country'=>$vform["supplier_customer_country"],
            'supplier_customer_address'=>$vform["supplier_customer_address"]
        );
        $this->db->insert('mst_suppliers', array_filter($vinput));
        

        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE)
        {   
            $this->db->trans_rollback();
            $error = $this->db->error();
            $out= array(
                'success'=>false,
                'message'=>"Failed Create data supplier " . $error["message"]
            );
        }else{
            $this->db->trans_commit();
            $out= array(
                'success'=>true,
                'message'=>'Create supplier Success'
            );  
        }
        return json_encode($out);

    }
    function update($param){
        $vform= json_decode($param['form'],true);
        $this->load->database();
        $this->db->trans_begin();
        $vinput= array(
            'supplier_customer_code'=>$vform["supplier_customer_code"],
            'supplier_customer_name'=>$vform["supplier_customer_name"],
            'supplier_customer_country'=>$vform["supplier_customer_country"],
            'supplier_customer_address'=>$vform["supplier_customer_address"]
        );

        $this->db->where('mst_supplier_customer_id', $vform["mst_supplier_customer_id"]);
        $this->db->update('mst_suppliers', array_filter($vinput));
        

        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE)
        {   
            $this->db->trans_rollback();
            $error = $this->db->error();
            $out= array(
                'success'=>false,
                'message'=>"Failed Update data supplier " . $error["message"]
            );
        }else{
            $this->db->trans_commit();
            $out= array(
                'success'=>true,
                'message'=>'Update supplier Success'
            );  
        }
        return json_encode($out);

    }
    function delete($param){
        $vform= json_decode($param['form'],true);
        $this->load->database();
        $this->db->trans_begin();
        
        $this->db->where('mst_supplier_customer_id', $vform["mst_supplier_customer_id"]);
        $this->db->delete('mst_suppliers');
        

        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE)
        {   
            $this->db->trans_rollback();
            $error = $this->db->error();
            $out= array(
                'success'=>false,
                'message'=>"Failed Delete data supplier " . $error["message"]
            );
        }else{
            $this->db->trans_commit();
            $out= array(
                'success'=>true,
                'message'=>'Delete supplier Success'
            );  
        }
        return json_encode($out);

    }
}