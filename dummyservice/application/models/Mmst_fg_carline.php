<?php
class Mmst_fg_carline extends CI_Model {

    function read($param){
        $this->load->database();
        $this->db->select("
            A.ID,
            A.CARLINE,
            A.CARLINE_NAME,
            A.CONTAINER_PALLET_QTY,
            A.MIX_CLS,
            A.PREFIX_DR,
            A.NEW_CARLINE,
            A.INVOICE_CODE,
            A.INVOICE_CODE_SAMPLE,
            A.INVOICENO_SAMPLE_PREFIX,
            A.INVOICENO_SAMPLE_AF,
            A.INVOICENO_SAMPLE_SF,
            A.INVOICENO_PROTOTYPE_AF,
            A.INVOICENO_PROTOTYPE_SF,
            A.INTERNAL_ORDER,
            A.CREATE_USER,
            A.CREATE_DATE,
            A.UPDATE_USER,
            A.UPDATE_DATE,
            A.ID_COMPANY
            ",false);
        $this->db->from("mst_carline A");
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
            'CARLINE' => $vdata['CARLINE'],
            'CARLINE_NAME' => $vdata['CARLINE_NAME'],
            'CONTAINER_PALLET_QTY' => $vdata['CONTAINER_PALLET_QTY'],
            'MIX_CLS' => $vdata['MIX_CLS'],
            'PREFIX_DR' => $vdata['PREFIX_DR'],
            'NEW_CARLINE' => $vdata['NEW_CARLINE'],
            'INVOICE_CODE' => $vdata['INVOICE_CODE'],
            'INVOICE_CODE_SAMPLE' => $vdata['INVOICE_CODE_SAMPLE'],
            'INVOICENO_SAMPLE_PREFIX' => $vdata['INVOICENO_SAMPLE_PREFIX'],
            'INVOICENO_SAMPLE_AF' => $vdata['INVOICENO_SAMPLE_AF'],
            'INVOICENO_SAMPLE_SF' => $vdata['INVOICENO_SAMPLE_SF'],
            'INVOICENO_PROTOTYPE_AF' => $vdata['INVOICENO_PROTOTYPE_AF'],
            'INVOICENO_PROTOTYPE_SF' => $vdata['INVOICENO_PROTOTYPE_SF'],
            'INTERNAL_ORDER' => $vdata['INTERNAL_ORDER'],
            'ID_COMPANY'=>$param['ID_COMPANY'],
            'CREATE_USER'=>$param['VUSERNAME'] 
            
        );
        $this->load->database();
        $this->db->set('CREATE_DATE', 'getdate()', false);
        if (!$this->db->insert('mst_carline', array_filter($field)))
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
            'CARLINE' => $vdata['CARLINE'],
            'CARLINE_NAME' => $vdata['CARLINE_NAME'],
            'CONTAINER_PALLET_QTY' => $vdata['CONTAINER_PALLET_QTY'],
            'MIX_CLS' => $vdata['MIX_CLS'],
            'PREFIX_DR' => $vdata['PREFIX_DR'],
            'NEW_CARLINE' => $vdata['NEW_CARLINE'],
            'INVOICE_CODE' => $vdata['INVOICE_CODE'],
            'INVOICE_CODE_SAMPLE' => $vdata['INVOICE_CODE_SAMPLE'],
            'INVOICENO_SAMPLE_PREFIX' => $vdata['INVOICENO_SAMPLE_PREFIX'],
            'INVOICENO_SAMPLE_AF' => $vdata['INVOICENO_SAMPLE_AF'],
            'INVOICENO_SAMPLE_SF' => $vdata['INVOICENO_SAMPLE_SF'],
            'INVOICENO_PROTOTYPE_AF' => $vdata['INVOICENO_PROTOTYPE_AF'],
            'INVOICENO_PROTOTYPE_SF' => $vdata['INVOICENO_PROTOTYPE_SF'],
            'INTERNAL_ORDER' => $vdata['INTERNAL_ORDER'],
            'ID_COMPANY'=>$param['ID_COMPANY'],
            'UPDATE_USER'=>$param['VUSERNAME'] 
        );
        $this->db->where('ID', $vdata['ID']);
        $this->db->set('UPDATE_DATE', 'getdate()', false);
        if(!$this->db->update('mst_carline', $field )){
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
        if(!$this->db->delete('mst_carline')){
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
        $query = $this->db->get_where('mst_carline',array(
            'ID'=>$vdata['ID']
        ));
        $rows = $query->row_array();
        $out = array(
            'success'=>'true',
            'message'=>'Data Ditampilkan',
            'data'=>$rows
        );
       return json_encode($out);
    }
    
    
    
}