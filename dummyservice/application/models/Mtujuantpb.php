<?php
class Mtujuantpb extends CI_Model {

    function read($param){
        $vcolumn = json_decode($this->definition(),true);
        $vdefinition = $vcolumn["model1"]["definition"];

        $this->load->database();
        $this->db->select("
      *
     

            ",false);
        $this->db->from("referensi_tujuan_tpb A");


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
        
        $this->db->order_by("A.KODE_TUJUAN_TPB", "ASC");
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                    'TotalRows' => $count,
                        'Rows' => $rows
                     );
        return json_encode($data );
    }

    function definition(){
        $model1= array(
            'TableName'=>'mst_negara',
            'definition'=>array(
                array('name'=>'KODE_TUJUAN_TPB','dbname'=> 'KODE_TUJUAN_TPB','type'=> 'bigint','max_length'=>'' ,'nullable'=> false,'format'=> ''),
                array('name'=>'URAIAN_TUJUAN_TPB','dbname'=> 'URAIAN_TUJUAN_TPB','type'=> 'varchar','max_length'=> 50,'nullable'=> false,'format'=> ''),
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