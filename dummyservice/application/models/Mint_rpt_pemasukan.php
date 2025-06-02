<?php
class Mint_rpt_pemasukan extends CI_Model
{

    function read($param)
    {
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



    function read_to_grid($param)
    {
        $this->load->database();
        $this->db->select(
            "
			*
		"
        );

        $this->db->from("VW_INT_RPT_PEMASUKAN");


        $extraParam = array();
        /* FORMAT 
		[{"property":"ID_COMPANY","operator":"like","value":"wh"},{"property":"MODE_SOURCE","operator":"like","value":"coo"}]
		*/

        /* GET DATE RANGE PARAMETER */
        if (array_key_exists('date_start', $param)) {
            /*
			$this->db->where("TANGGAL_AJU >=", $param['date_start']) ; 
			$this->db->where("TANGGAL_AJU <=", $param['date_end']) ; 
			*/
            array_push($extraParam, array("property" => "TANGGAL_AJU >=", "value" => $param['date_start']), array("property" => "TANGGAL_AJU <=", "value" => $param['date_end']));
        }

        /* GET BC TYPE PARAMETER */
        if (array_key_exists('bc_type', $param)) {
            /*
			$this->db->where("JENIS_DOKUMEN_PABEAN =", $param['bc_type']) ; 
			*/
            array_push($extraParam, array("property" => "JENIS_DOKUMEN_PABEAN", "value" => $param['bc_type']));
        }


        /* GET COMPANY PARAMETER */
        if (array_key_exists('id_company', $param)) {
            /*
			$this->db->where("JENIS_DOKUMEN_PABEAN =", $param['bc_type']) ; 
			*/
            array_push($extraParam, array("property" => "ID_COMPANY", "value" => $param['id_company']));
        }

        $param['filter'] += $extraParam;

        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'], true);
            foreach ($keyval as $key => $val) {
                $this->db->like($val["property"], $val['value'], 'both');
            }
        }

        $tempdb = clone $this->db;
        $count = $tempdb->count_all_results();

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'], true);
            foreach ($keyval as $key => $val) {
                $this->db->order_by($val["property"], $val['direction']);
            }
        }


        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'], $param['start']);
        }

        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
            'TotalRows' => $count,
            'Rows' => $rows
        );
        return json_encode($data);
    }
}