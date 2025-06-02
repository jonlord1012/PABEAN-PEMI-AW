<?php
class Mmst_fg_bom extends CI_Model {
    function read($param){
        switch ($param["method"]) {
            case "read_in":
                return $this->read_in($param);
                break;
            case "read_list":
                return $this->read_list($param);
                break;
            case "read_fg_part":
                return $this->read_fg_part($param);
                break;
            default:
              return false;
          }
    }

    function read_in($param){
        $this->load->database();
        $this->db->select("
              A.ID 
            , A.ASSY_NO
            , A.ASSY_CODE
            , A.ASSY_NAME
            , A.CARLINE
        ");
        $this->db->from ("mst_assy A"); 
        /*$this->db->join("mst_bom_detail B", "A.ASSY_CODE=B.ASSY_CODE", "LEFT"); */
        $this->db->where('A.ID_COMPANY', $param['ID_COMPANY']);
        
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
        
        $this->db->order_by("A.ASSY_CODE", "DESC");
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                    'TotalRows' => $count,
                        'Rows' => $rows
                     );
        return json_encode($data );

    }
    function read_list($param){
        $this->load->database();
        $this->db->select("
            A.ID,
            A.ASSY_CODE,
            A.PART_NO,
            A.PART_NAME,
            A.PART_UOM,
            A.PART_QTY,
            A.ID_COMPANY,
            A.CREATE_USER,
            A.CREATE_DATE,
            A.UPDATE_USER,
            A.UPDATE_DATE
            ",false);
        $this->db->from("mst_bom_detail A");
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
        
        $data=[];
        
        $this->load->database();

        $vdata = json_decode($param['data'], true);
        $vdata2 = json_decode($param['data2'], true);
        
        // $field = array(
        //     'ASSY_CODE' => $vdata2['ASSY_CODE'],
        //     /*'ASSY_NO' => $vdata['ASSY_NO'],*/
        //     'PART_NO' => $vdata['PART_NO'],
        //     'PART_NAME' => $vdata['PART_NAME'],
        //     'PART_UOM' => $vdata['PART_UOM'],
        //     'PART_QTY' => $vdata['PART_MIN_QTY'],
        //     /*'ACTIVE' => $vdata['ACTIVE'],*/
        //     'ID_COMPANY' => $param['ID_COMPANY'],
        //     /*'CREATE_USER'=>$param['VUSERNAME']*/
        //     'CREATE_USER'=>$param['VUSERNAME'],
        // );

        foreach ($vdata as $key => $vd) {
            $data[$key] = [
                'ASSY_CODE' => $vdata2['ASSY_CODE'],
                /*'ASSY_NO' => $vdata['ASSY_NO'],*/
                'PART_NO' => $vd['PART_NO'],
                'PART_NAME' => $vd['PART_NAME'],
                'PART_UOM' => $vd['PART_UOM'],
                'PART_QTY' => $vd['PART_MIN_QTY'],
                /*'ACTIVE' => $vdata['ACTIVE'],*/
                'ID_COMPANY' => $param['ID_COMPANY'],
                /*'CREATE_USER'=>$param['VUSERNAME']*/
                'CREATE_USER'=>$param['VUSERNAME'],
                'CREATE_DATE'=> NULL,
            ];
        }
        

        $db = $this->db->insert_batch('mst_bom_detail', array_filter($data));

        if (!$db)
        {   
            $out= array(
                'success'=>false,
                'message'=>'Insert Data Part/Material Failed'
            );
        }else{
                $out= array(
                'success'=>'true',
                'message'=>'Insert Data Part/Material Success'
            ); 
        }

        return json_encode($out);
    }
    function update($param){
        
        $data=[];
        $vdata = json_decode($param['data'], true);
        $vdata2 = json_decode($param['data_input'], true);

        $this->load->database();

        // $query_mst_assy = $this->db->get_where('mst_assy', ['ASSY_CODE' => $vdata['ASSY_CODE']])->row_array();

        if (isset($vdata2)) {
            foreach ($vdata2 as $key => $vd) {
                $data[$key] = array(
                'ASSY_CODE' => $vdata['ASSY_CODE'],
                // 'ASSY_NO' => $vdata['ASSY_NO'],
                // 'ASSY_NAME' => $vdata['ASSY_NAME'],
                'PART_NO' => $vd['PART_NO'],
                'PART_NAME' => $vd['PART_NAME'],
                'PART_QTY' => $vd['PART_QTY'],
                // 'ACTIVE' => $vdata['ACTIVE'],
                'ID_COMPANY' => $param['ID_COMPANY'],
                'UPDATE_USER'=>$param['VUSERNAME'] 
                );
            }

            $db = $this->db->set('UPDATE_DATE', 'getdate()', false)
            ->update_batch('mst_bom_detail', array_filter($data), 'PART_NO');
        } else {

            $db = true;
        
        }


        if(!$db){
            $out= array(
                'success'=> false,
                'message'=>'Update Data Failed'
            );
        }else{
                $out= array(
                'success'=> 'true',
                'message'=>'Update Data Success'
            );
        }
        return json_encode($out);
    }
    function delete($param){
        //$vdata = json_decode($param['ID'],true);
        $vdata = json_decode($param['data'],true);

        $this->load->database();
        $db = $this->db->where('ID', $vdata['ID'])
        ->delete('mst_bom_detail');
        $db = $this->db->where('ASSY_CODE',$vdata['ASSY_CODE'])
        ->delete('mst_assy');
        if(!$db){
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
    function delete_part($param)
    {
        $vdata = json_decode($param['data'], true);

        $db = $this->db->where('PART_NO', $vdata['PART_NO'])->delete('mst_bom_detail');

        if(!$db){
            $out= array(
                'success'=>false,
                'message'=>'Delete Data Part Failed'
            );
        }else{
                $out= array(
                'success'=>'true',
                'message'=>'Delete Data Part Success'
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

        // $this->load->database();
        // $this->db->select('
        //     a.* ,
        //     A.ASSY_CODE,
        //     b.PART_NO,
        //     c.PART_NAME,
        //     c.PART_UOM,
        //     B.PART_QTY
        // ') ;
        // $this->db->from('mst_assy a ');
        // $this->db->join('mst_bom_detail b', 'a.ASSY_CODE=b.ASSY_CODE', 'left');
        // $this->db->join('mst_part c', 'c.PART_NO=B.PART_NO', 'left') ;
        // $this->db->where('A.ASSY_CODE', $vdata['ASSY_CODE']);

        // $query = $this->db->get(); 

        // $rows = $query->result_array();

        // $count = $query->num_rows();
        // $out = array(
        //     'Success' => true,
        //     'Data' => $rows,
        //     'TotalRows' => $count,
        // );

        // return json_encode($out); 

        $query = $this->db->get_where('mst_assy',array(
            'ID'=>$vdata['ID']
        ));
        $rows = $query->row_array();

        // $query_items = $this->db->get_where('mst_bom_detail',array(
        //     'ASSY_CODE'=>$rows['ASSY_CODE']
        // ));
        
        if (!$rows) {
            $out = array(
                'success'=> false,
                'message'=>'Data Gagal Ditampilkan',
                'data'=> NULL,
            );
        } else {
            $out = array(
                'success'=>'true',
                'message'=>'Data Ditampilkan',
                'data'=>$rows,
            );
        }
       return json_encode($out);

    }

    function view_list($param)
    {
        $this->db->select('
            A.ASSY_CODE, 
            B.PART_NO, 
            B.PART_NAME, 
            B.PART_UOM, 
            A.PART_QTY');

        $this->db->from('mst_assy A');
        
        $this->db->join('mst_bom_detail B', 'B.ASSY_CODE = A.ASSY_CODE', 'left');

        $this->db->where('A.ID', $param['ID']);
        $this->db->where('A.ASSY_CODE', $param['ASSY_CODE']);


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

        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }
        
        $this->db->order_by("A.ID", "DESC");

        $query = $this->db->get();

        $count = $query->num_rows();
        $data = $query->result_array();

        $out = array(
            'Success' => true,
            'Data' => $data,
            'TotalRows' => $count,
        );

        return json_encode($out);
    }

    function read_fg_part($param)
    {
        $vdata = $param['data'];

        $query = $this->db->select('
                A.ASSY_CODE,
                B.PART_NO,
                B.PART_NAME,
                B.PART_UOM,
                A.PART_QTY
            ')
        ->from('mst_bom_detail A')
        ->join('mst_part B', 'B.PART_NO = A.PART_NO', 'left')
        ->where('A.ASSY_CODE', $vdata['ASSY_CODE'])
        ->get();

        $count = $query->num_rows();
        $data = $query->result_array();

        $out = array(
            'Success' => true,
            'Data' => $data,
            'TotalRows' => $count,
        );

        return json_encode($out);
    }

    
}