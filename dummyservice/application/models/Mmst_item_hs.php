<?php
class Mmst_item_hs extends CI_Model {

    function read($param){
        switch ($param["method"]) {
            case "read_in":
                return $this->read_in($param);
                break;
            case "read_list":
                return $this->read_list($param);
                break;
            default:
              return false;
          }
    }
    function read_in($param){
        $this->load->database();
        $this->db->select("
            A.ID,
            A.NOMOR_HS,
            A.TARIF_BM,
            A.TARIF_CUKAI,
            A.TARIF_PPH,
            A.TARIF_PPN,
            A.TARIF_PPNBM,
            A.ID_COMPANY,
            A.CREATE_USER,
            A.CREATE_DATE,
            A.UPDATE_USER,
            A.UPDATE_DATE        
            ",false);
        $this->db->from("mst_part_hs A");

        $this->db->where("A.ID_COMPANY", $param['ID_COMPANY']);
        
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
    function read_list($param){
        $this->load->database();
        $this->db->select("
            A.ID,
            A.PART_NO,
            A.PART_GROUP,
            A.PART_CATEGORY,
            A.PART_TYPE,
            A.PART_NAME,
            A.PART_DESCRIPTION,
            A.PART_UOM,
            A.PART_MIN_QTY,
            A.PART_SVC_LEVEL,
            A.ID_COMPANY,
            A.CONSUMABLE,
            A.CREATE_USER,
            A.CREATE_DATE,
            A.UPDATE_USER,
            A.UPDATE_DATE
            ",false);
        $this->db->from("mst_part A");
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
              'NOMOR_HS' => $vdata['NOMOR_HS'],
              'TARIF_BM' => $vdata['TARIF_BM'],
              'TARIF_CUKAI' => $vdata['TARIF_CUKAI'],
              'TARIF_PPH' => $vdata['TARIF_PPH'],
              'TARIF_PPN' => $vdata['TARIF_PPN'],
              'TARIF_PPNBM' => $vdata['TARIF_PPNBM'],
              'ID_COMPANY'=>$param['ID_COMPANY'],
              'CREATE_USER'=>$param['VUSERNAME']
          );
          $this->load->database();
          $this->db->set('CREATE_DATE', 'getdate()', false);
          if (!$this->db->insert('mst_part_hs', array_filter($field)))
          {   
              $out= array(
                  'success'=>false,
                  'message'=>'Insert Data Failed'
              );
          }else{
                  $out= array(
                  'success'=>'true',
                  'message'=>'insert Data Success'
              );  
          }
          return json_encode($out);
      }
      function update($param){
        $vdata = json_decode($param['data'],true);
        $this->load->database();
        $field = array(
            'NOMOR_HS' => $vdata['NOMOR_HS'],
            'TARIF_BM' => $vdata['TARIF_BM'],
            'TARIF_CUKAI' => $vdata['TARIF_CUKAI'],
            'TARIF_PPH' => $vdata['TARIF_PPH'],
            'TARIF_PPN' => $vdata['TARIF_PPN'],
            'TARIF_PPNBM' => $vdata['TARIF_PPNBM'],
            'ID_COMPANY' => $param['ID_COMPANY'],
            'UPDATE_USER'=>$param['VUSERNAME']
        );
        $this->db->set('UPDATE_DATE', 'getdate()', false);
        $this->db->where('ID', $vdata['ID']);
        if(!$this->db->update('mst_part_hs', $field )){
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
        if(!$this->db->delete('mst_part_hs')){
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
        $query = $this->db->get_where('mst_part_hs',array(
            'ID'=>$vdata['ID']
        ));

        $rows = $query->row_array();

        $query_items = $this->db->get_where('mst_part',array(
            'NOMOR_HS'=>$rows['NOMOR_HS']
        ));
        $rows_items = $query_items->result_array();
        $out = array(
            'success'=>'true',
            'message'=>'Data Ditampilkan',
            'data'=>$rows,
            'items'=>$rows_items
        );
       return json_encode($out);
    }
    
    
    
}