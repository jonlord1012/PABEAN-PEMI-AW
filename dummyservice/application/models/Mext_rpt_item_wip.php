<?php
class Mext_rpt_item_wip extends CI_Model {

    function read($param){
        switch ($param["method"]) {
            case "read_to_grid":
                return $this->read_to_grid($param);
                break;
            case "export_to_xls":
                return $this->export_to_xls($param);
                break;
            case "export_to_pdf":
                return $this->export_to_pdf($param);
                break;
            default:
              return false;
          }
    }



	function read_to_grid($param){
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_RPT_WIP
        @VIDCOMPANY=?,
        @VUSERNAME=?,
        @VSTART_DATE=?,
        @VEND_DATE=?
        ";
        $data = array(
            '@VIDCOMPANY' => $param['VCBO_COMPANY'],
            '@VUSERNAME' => $param['VUSERNAME'], 
            '@VSTART_DATE' => $param['VFROMDATE'], 
            '@VEND_DATE' => $param['VTODATE']
        );
       
		$extraParam = array() ; 
		/* FORMAT 
		[{"property":"ID_COMPANY","operator":"like","value":"wh"},{"property":"MODE_SOURCE","operator":"like","value":"coo"}]
		*/

        $result = $this->db->query($SQL_CALLSP, $data);
        $rows = $result->result_array();
        $data = array(
                'Rows' => $rows
             );
        return json_encode($data );

		
	}
	

}







?>