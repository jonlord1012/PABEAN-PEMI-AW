<?php
class Mtarif extends CI_Model {

    function read($param){
        $this->load->database();
        $this->db->select("
                *

            ",false);
        $this->db->from("njc.mst_tarif");

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
            'JENIS_TARIF_BM'=>$vform["JENIS_TARIF_BM"],
            'JENIS_TARIF_CUKAI'=>$vform["JENIS_TARIF_CUKAI"],
            'KODE_SATUAN_BM'=>$vform["KODE_SATUAN_BM"],
            'KODE_SATUAN_CUKAI'=>$vform["KODE_SATUAN_CUKAI"],
            'NOMOR_HS'=>$vform["NOMOR_HS"],
            'SERI_HS'=>$vform["SERI_HS"],
            'TARIF_BM'=>$vform["TARIF_BM"],
            'TARIF_CUKAI'=>$vform["TARIF_CUKAI"],
            'TARIF_PPH'=>$vform["TARIF_PPH"],
            'TARIF_PPN'=>$vform["TARIF_PPN"],
            'TARIF_PPNBM'=>$vform["TARIF_PPNBM"]
        );
        $this->db->insert('njc.mst_tarif', array_filter($vinput));
        

        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE)
        {   
            $this->db->trans_rollback();
            $error = $this->db->error();
            $out= array(
                'success'=>false,
                'message'=>"Failed Create data Tarif " . $error["message"]
            );
        }else{
            $this->db->trans_commit();
            $out= array(
                'success'=>true,
                'message'=>'Create Tarif Success'
            );  
        }
        return json_encode($out);

    }
    function update($param){
        $vform= json_decode($param['form'],true);
        $this->load->database();
        $this->db->trans_begin();
        $vinput= array(
            'JENIS_TARIF_BM'=>$vform["JENIS_TARIF_BM"],
            'JENIS_TARIF_CUKAI'=>$vform["JENIS_TARIF_CUKAI"],
            'KODE_SATUAN_BM'=>$vform["KODE_SATUAN_BM"],
            'KODE_SATUAN_CUKAI'=>$vform["KODE_SATUAN_CUKAI"],
            'NOMOR_HS'=>$vform["NOMOR_HS"],
            'SERI_HS'=>$vform["SERI_HS"],
            'TARIF_BM'=>$vform["TARIF_BM"],
            'TARIF_CUKAI'=>$vform["TARIF_CUKAI"],
            'TARIF_PPH'=>$vform["TARIF_PPH"],
            'TARIF_PPN'=>$vform["TARIF_PPN"],
            'TARIF_PPNBM'=>$vform["TARIF_PPNBM"]
        );

        $this->db->where('ID', $vform["ID"]);
        $this->db->update('njc.mst_tarif', array_filter($vinput));
        

        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE)
        {   
            $this->db->trans_rollback();
            $error = $this->db->error();
            $out= array(
                'success'=>false,
                'message'=>"Failed Update data Tarif " . $error["message"]
            );
        }else{
            $this->db->trans_commit();
            $out= array(
                'success'=>true,
                'message'=>'Update Tarif Success'
            );  
        }
        return json_encode($out);

    }
    function delete($param){
        $vform= json_decode($param['form'],true);
        $this->load->database();
        $this->db->trans_begin();
        
        $this->db->where('ID', $vform["ID"]);
        $this->db->delete('njc.mst_tarif');
        

        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE)
        {   
            $this->db->trans_rollback();
            $error = $this->db->error();
            $out= array(
                'success'=>false,
                'message'=>"Failed Delete data Tarif " . $error["message"]
            );
        }else{
            $this->db->trans_commit();
            $out= array(
                'success'=>true,
                'message'=>'Delete Tarif Success'
            );  
        }
        return json_encode($out);

    }
}