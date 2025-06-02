<?php
class Mkontainer_ukuran extends CI_Model {

    function read($param){
        $vcolumn = json_decode($this->definition(),true);
        $vdefinition = $vcolumn["model1"]["definition"];

        $this->load->database();
        $this->db->select("
        KODE_UKURAN_KONTAINER,
        URAIAN_UKURAN_KONTAINER,
        CONCAT(KODE_UKURAN_KONTAINER,' - ',URAIAN_UKURAN_KONTAINER) as COMBO
            ",false);
        $this->db->from("njc.referensi_ukuran_kontainer");


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
        $vform= $param;
        $this->load->database();
        $this->db->trans_begin();
        
        $this->db->where('id_negara', $vform["idnegara"]);
        $this->db->delete('njc.mst_negara');
        

        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE)
        {   
            $this->db->trans_rollback();
            $error = $this->db->error();
            $out= array(
                'success'=>false,
                'message'=>"Failed Delete " . $error["message"]
            );
        }else{
            $this->db->trans_commit();
            $out= array(
                'success'=>true,
                'message'=>'Delete Success'
            );  
        }
        return json_encode($out);

    }

    function definition(){
        $model1= array(
            'TableName'=>'mst_negara',
            'definition'=>array(
                array('name'=>'KODE_KANTOR','dbname'=> 'KODE_KANTOR','type'=> 'bigint','max_length'=>'' ,'nullable'=> false,'format'=> ''),
                array('name'=>'URAIAN_KANTOR','dbname'=> 'URAIAN_KANTOR','type'=> 'varchar','max_length'=> 50,'nullable'=> false,'format'=> ''),
                array('name'=>'cname','dbname'=> 'country_name','type'=> 'varchar','max_length'=> 150,'nullable'=> true,'format'=> ''),
                array('name'=>'ccode2','dbname'=> 'country_code2','type'=> 'varchar','max_length'=> 50,'nullable'=> true,'format'=> ''),
                array('name'=>'cname2','dbname'=> 'country_name2','type'=> 'varchar','max_length'=> 150,'nullable'=> true,'format'=> ''),
                array('name'=>'cdate','dbname'=> 'create_date','type'=> 'datetime','max_length'=>'' ,'nullable'=> true,'format'=> ''),
                array('name'=>'cby','dbname'=> 'create_by','type'=> 'int','max_length'=>'' ,'nullable'=> true,'format'=> ''),
                array('name'=>'mdate','dbname'=> 'modify_date','type'=> 'datetime','max_length'=>'' ,'nullable'=> true,'format'=> ''),
                array('name'=>'mby','dbname'=> 'modify_by','type'=> 'int','max_length'=>'' ,'nullable'=> true,'format'=> ''),

        )
    );

        $output = array(
            "success"=>true,
            "model1"=>$model1
        );

        return json_encode($output);
    }
}