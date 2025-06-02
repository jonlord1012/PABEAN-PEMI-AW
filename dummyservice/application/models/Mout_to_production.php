<?php
class Mout_to_production extends CI_Model {

    function read($param){
        switch ($param["method"]) {
            case "live_tr":
                return $this->live_tr($param);
                break;
            default:
              return false;
          }
    }
    function live_tr($param){
        $this->load->database('PEMI_PIS_TRIAL');
        $this->db->select("
        FORMAT(A.TR_DATE,'yyyy-MM-dd') as TR_DATE,
        A.PARTCODE,
        A.PACKINGLISTNO,
        SUM(A.TR_QTY) as QTY,
        MAX(A.TR_NAME) as TR_NAME
        ");
        $this->db->from("ALM_PART_TRANSACTION A");
        $this->db->where("
        A.TR_GROUP='OUT' AND
        A.TR_NAME ='OUT PRODUCTION'
        ");
        $this->db->group_by("
            A.TR_DATE,
            A.PARTCODE,
            A.PACKINGLISTNO
        ");

        $arr_field = array(
            'A.TR_DATE'=>'TR_DATE',
            'A.PARTCODE'=>'PARTCODE'
        );
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                    $this->db->where(array_search($val['property'],$arr_field),$val['value']);
            }
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->order_by( $val["property"], $val['direction']);
            }
        }
        
        $tempdb = clone $this->db;
        $count= $tempdb->count_all_results(); 
        
        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }
        $this->db->order_by( "A.TR_DATE", "DESC");
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                    'TotalRows' => $count,
                        'Rows' => $rows
                     );
        return json_encode($data );
    }
    function get_datamapping($param){
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_INV_MATERIAL_IN_OUT_PRODUCTION_GETMAPPING
        @VDATEOUT=?,
        @VCHECKINVOICE=?
        ";
        $data = array(
            '@VDATEOUT' => $param['dateout'], 
            '@VCHECKINVOICE' => $param['check_invoice']
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->row_array();

        
        return json_encode($row);
    }
}