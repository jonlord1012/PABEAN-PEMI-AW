<?php
class Mpemasok extends CI_Model {

    function read($param){
        $vcolumn = json_decode($this->definition(),true);
        $vdefinition = $vcolumn["model1"]["definition"];

        $this->load->database();
        $this->db->select("
        A.ID,
        A.ALAMAT,
        A.KODE_ID,
        A.KODE_NEGARA,
        A.NAMA,
        A.NPWP,
        UPPER(B.URAIAN_NEGARA) as NAMA_NEGARA
     

            ",false);
        $this->db->from("referensi_pemasok A");
        $this->db->join("referensi_negara B","A.KODE_NEGARA =B.KODE_NEGARA ","left");


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


    function definition(){
        $model1= array(
            'TableName'=>'mst_negara',
            'definition'=>array(
                array('name'=>'ALAMAT','dbname'=> 'ALAMAT','type'=> 'bigint','max_length'=>'' ,'nullable'=> false,'format'=> ''),
                array('name'=>'KODE_ID','dbname'=> 'KODE_ID','type'=> 'varchar','max_length'=> 50,'nullable'=> false,'format'=> ''),
                array('name'=>'KODE_NEGARA','dbname'=> 'KODE_NEGARA','type'=> 'varchar','max_length'=> 150,'nullable'=> true,'format'=> ''),
                array('name'=>'NAMA','dbname'=> 'NAMA','type'=> 'varchar','max_length'=> 50,'nullable'=> true,'format'=> ''),
                array('name'=>'NPWP','dbname'=> 'NPWP','type'=> 'varchar','max_length'=> 150,'nullable'=> true,'format'=> ''),
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