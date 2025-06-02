<?php

defined('BASEPATH') OR exit('No direct script access allowed');

Class Mreport extends CI_Model {
    
    function data(){
        
        $mst_part = $this->db
        ->order_by("CREATE_DATE")
        ->get("MST_PART_PLB")->result_array();

        $row=[];

        // $fields = ["PART_NO","PART_NO2","PART_ALIAS","BASE_PART"];

        foreach($mst_part as $index => $p){
            $data=[];
            if($index===0){
                $data = ["PART_NO","PART_NO2","PART_ALIAS","BASE_PART"];
            } else {
                $data[] = $p['PART_NO'];
                $data[] = $p['PART_NO2'];
                $data[] = $p['PART_ALIAS'];
                $data[] = $p['BASE_PART'];
            }
            
            $row[] = $data;
        }

        // $fields = array_push($fields, $row);

        return json_encode($row);
    }
    function rpt_pemasukan($param)
    {
        
    }
    function rpt_pengeluaran($param)
    {
        
    }
    function rpt_stock_card($param)
    {
        
    }
    function rpt_mutasi($param)
    {
        
    }
}

?>