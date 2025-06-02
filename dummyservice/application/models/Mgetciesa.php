<?php
class Mgetciesa extends CI_Model {

    function read($param){
        $this->load->database("ciesa");
        $this->db->select("
        B.URAIAN_STATUS,
        A.NOMOR_AJU,
        A.TANGGAL_AJU,
        A.TANGGAL_DAFTAR,
        A.NOMOR_DAFTAR,
        A.NOMOR_BC11,
        A.CIF,
        A.CIF_RUPIAH,
        A.NAMA_PEMASOK,
        A.ALAMAT_PEMASOK
            ",false);
        $this->db->from("tpb_header A");
        $this->db->join("referensi_status B","A.KODE_DOKUMEN_PABEAN = B.KODE_DOKUMEN AND A.KODE_STATUS = B.KODE_STATUS","left");
        $this->db->where("A.KODE_DOKUMEN_PABEAN","23");
        
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

    function definition(){
        $model1= array(
            'TableName'=>'mst_part_hs',
            'definition'=>array(
                array('name'=>'hsid','dbname'=> 'part_hs_id','type'=> 'int','max_length'=> '','nullable'=> false,'format'=> ''),
                array('name'=>'part_number','dbname'=> 'part_no','type'=> 'string','max_length'=> 50,'nullable'=> false,'format'=> ''),
                array('name'=>'part_name','dbname'=> 'part_name','type'=> 'string','max_length'=> 150,'nullable'=> true,'format'=> ''),
                array('name'=>'partcname','dbname'=> 'part_name_customs','type'=> 'string','max_length'=> 150,'nullable'=> true,'format'=> ''),
                array('name'=>'hscode','dbname'=> 'hs_code','type'=> 'string','max_length'=> 120,'nullable'=> true,'format'=> ''),
                array('name'=>'bm','dbname'=> 'bm','type'=> 'float','max_length'=> 53,'nullable'=> true,'format'=> ''),
                array('name'=>'cekprice','dbname'=> 'cek_price','type'=> 'float','max_length'=> 53,'nullable'=> true,'format'=> ''),
                array('name'=>'partno2','dbname'=> 'part_no2','type'=> 'string','max_length'=> 150,'nullable'=> true,'format'=> ''),
                array('name'=>'kodebarang','dbname'=> 'kode_barang','type'=> 'string','max_length'=> 150,'nullable'=> true,'format'=> ''),
                array('name'=>'nosap','dbname'=> 'part_no_sap','type'=> 'string','max_length'=> 150,'nullable'=> true,'format'=> ''),
                array('name'=>'ponumber','dbname'=> 'order_number','type'=> 'string','max_length'=> 50,'nullable'=> true,'format'=> ''),
                array('name'=>'newpart','dbname'=> 'new_part','type'=> 'string','max_length'=> 50,'nullable'=> true,'format'=> ''),
                array('name'=>'shipmentterm','dbname'=> 'shipment_term','type'=> 'string','max_length'=> 50,'nullable'=> true,'format'=> ''),
                array('name'=>'supp','dbname'=> 'supplier','type'=> 'string','max_length'=> 250,'nullable'=> true,'format'=> ''),
                array('name'=>'suppcode','dbname'=> 'supplier_kode','type'=> 'string','max_length'=> 50,'nullable'=> true,'format'=> ''),
                array('name'=>'curr','dbname'=> 'currency','type'=> 'string','max_length'=> 50,'nullable'=> true,'format'=> ''),
                array('name'=>'pnadd','dbname'=> 'part_name_added','type'=> 'string','max_length'=> 50,'nullable'=> true,'format'=> ''),
                array('name'=>'jtrfbm','dbname'=> 'jenis_tarif_bm','type'=> 'string','max_length'=> 255,'nullable'=> true,'format'=> ''),
                array('name'=>'jtrfcukai','dbname'=> 'jenis_tarif_cukai','type'=> 'string','max_length'=> 255,'nullable'=> true,'format'=> ''),
                array('name'=>'ksbm','dbname'=> 'kode_satuan_bm','type'=> 'string','max_length'=> 255,'nullable'=> true,'format'=> ''),
                array('name'=>'kscukai','dbname'=> 'kode_satuan_cukai','type'=> 'string','max_length'=> 255,'nullable'=> true,'format'=> ''),
                array('name'=>'trfbm','dbname'=> 'tarif_bm','type'=> 'float','max_length'=> 20,'nullable'=> true,'format'=> ''),
                array('name'=>'trfcukai','dbname'=> 'tarif_cukai','type'=> 'float','max_length'=> 20,'nullable'=> true,'format'=> ''),
                array('name'=>'trfpph','dbname'=> 'tarif_pph','type'=> 'float','max_length'=> 20,'nullable'=> true,'format'=> ''),
                array('name'=>'trfppn','dbname'=> 'tarif_ppn','type'=> 'float','max_length'=> 20,'nullable'=> true,'format'=> ''),
                array('name'=>'trfppnbm','dbname'=> 'tarif_ppnbm','type'=> 'float','max_length'=> 20,'nullable'=> true,'format'=> ''),
                array('name'=>'createdate','dbname'=> 'create_date','type'=> 'string','max_length'=> '','nullable'=> false,'format'=> ''),
                array('name'=>'createby','dbname'=> 'create_by','type'=> 'int','max_length'=> '','nullable'=> false,'format'=> ''),
                array('name'=>'moddate','dbname'=> 'modify_date','type'=> 'string','max_length'=> '','nullable'=> false,'format'=> ''),
                array('name'=>'modby','dbname'=> 'modify_by','type'=> 'int','max_length'=> '','nullable'=> false,'format'=> ''),
                array('name'=>'uom','dbname'=> 'uom','type'=> 'string','max_length'=> 50,'nullable'=> true,'format'=> ''),

        )
    );

        $output = array(
            "success"=>true,
            "model1"=>$model1
        );

        return json_encode($output);
    }
}