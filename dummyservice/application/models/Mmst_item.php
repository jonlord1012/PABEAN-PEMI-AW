<?php
class Mmst_item extends CI_Model
{
    function read($param)
    {
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
    function read_in($param)
    {
        $this->load->database();
        $this->db->select("
            A.ID,
            A.HS_CODE,
            A.PART_NO,
            A.PART_NO2,
            A.BASE_PART,
            A.PART_GROUP,
            A.PART_CATEGORY,
            A.PART_TYPE,
            A.PART_NAME,
            A.PART_DESCRIPTION,
            A.PART_CONSUMABLE,
            A.PART_UOM,
            A.PART_MIN_QTY,
            A.PART_MPQ,
            A.PART_CONVERTION,
            A.IS_BOM,
            A.IS_PARTLIST,
            A.IS_AUTO_OUT,            
            A.ID_COMPANY,
            A.PART_ALIAS,
            A.PART_BINLOC_ID,
            A.CREATE_USER,
            A.CREATE_DATE,
            A.UPDATE_USER,
            A.UPDATE_DATE
            ", false);
        if ($param['ID_COMPANY'] == 'AW') {
            $this->db->from("mst_part_aw A");
        } else {
            $this->db->from("mst_part_plb A");
        }
        #$this->db->where("A.ID_COMPANY", $param['ID_COMPANY']);

        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'], true);
            foreach ($keyval as $key => $val) {
                $this->db->like($val["property"], $val['value'], 'both');
            }
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'], true);
            foreach ($keyval as $key => $val) {
                $this->db->order_by($val["property"], $val['direction']);
            }
        }

        $tempdb = clone $this->db;
        $count = $tempdb->count_all_results();

        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'], $param['start']);
        }

        $this->db->order_by("A.ID", "DESC");
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
            'TotalRows' => $count,
            'Rows' => $rows
        );
        return json_encode($data);
    }

    function read_list($param)
    {
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
            ", false);
        if ($param['ID_COMPANY'] == 'AW') {
            $this->db->from("mst_part_aw A");
        } else {
            $this->db->from("mst_part A");
        }
        $this->db->where("A.ID_COMPANY", $param['ID_COMPANY']);

        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'], true);
            foreach ($keyval as $key => $val) {
                $this->db->like($val["property"], $val['value'], 'both');
            }
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'], true);
            foreach ($keyval as $key => $val) {
                $this->db->order_by($val["property"], $val['direction']);
            }
        }

        $tempdb = clone $this->db;
        $count = $tempdb->count_all_results();

        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'], $param['start']);
        }

        $this->db->order_by("A.ID", "DESC");
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
            'TotalRows' => $count,
            'Rows' => $rows
        );
        return json_encode($data);
    }
    function create($param)
    {
        $vdata = json_decode($param['data'], true);
        $field = array(
            'PART_NO' => $vdata['PART_NO'],
            'PART_SAPNO' => $vdata['PART_SAPNO'],
            'PART_GROUP' => $vdata['PART_GROUP'],
            'PART_ALIAS' => $vdata['PART_ALIAS'],
            'BASE_PART' => $vdata['BASE_PART'],
            'NOMOR_HS' => $vdata['NOMOR_HS'],
            'PART_NAME' => $vdata['PART_NAME'],
            'PART_DESCRIPTION' => $vdata['PART_DESCRIPTION'],
            'PART_GROUP' => $vdata['PART_GROUP'],
            'PART_CATEGORY' => $vdata['PART_CATEGORY'],
            'PART_TYPE' => $vdata['PART_TYPE'],
            'PART_CONSUMABLE' => $vdata['PART_CONSUMABLE'],
            'PART_UOM' => $vdata['PART_UOM'],
            'PART_MIN_QTY' => $vdata['PART_MIN_QTY'],
            'PART_SVC_LEVEL' => $vdata['PART_SVC_LEVEL'],
            'RACK_NO' => $vdata['RACK_NO'],
            'IS_BOM' => $vdata['IS_BOM'],
            'IS_PARTLIST' => $vdata['IS_PARTLIST'],
            'IS_AUTO_OUT' => $vdata['IS_AUTO_OUT'],
            'ID_COMPANY' => $param['ID_COMPANY'],
            'CREATE_USER' => $param['VUSERNAME']
        );
        $this->load->database();
        $this->db->set('CREATE_DATE', 'getdate()', false);
        $tableName = '';
        if ($param['ID_COMPANY'] == 'AW') {
            $tableName = "mst_part_aw";
        } else {
            $tableName = "mst_part";
        }

        if (!$this->db->insert($tableName, array_filter($field))) {
            $out = array(
                'success' => false,
                'message' => 'Insert Data Failed'
            );
        } else {
            $out = array(
                'success' => 'true',
                'message' => 'Insert Data Success'
            );
        }
        return json_encode($out);
    }
    function update($param)
    {
        $vdata = json_decode($param['data'], true);
        $this->load->database();
        $field = array(
            'PART_NO' => $vdata['PART_NO'],
            'PART_SAPNO' => $vdata['PART_SAPNO'],
            'PART_GROUP' => $vdata['PART_GROUP'],
            'PART_ALIAS' => $vdata['PART_ALIAS'],
            'BASE_PART' => $vdata['BASE_PART'],
            'NOMOR_HS' => $vdata['NOMOR_HS'],
            'PART_NAME' => $vdata['PART_NAME'],
            'PART_DESCRIPTION' => $vdata['PART_DESCRIPTION'],
            'PART_GROUP' => $vdata['PART_GROUP'],
            'PART_CATEGORY' => $vdata['PART_CATEGORY'],
            'PART_TYPE' => $vdata['PART_TYPE'],
            'PART_CONSUMABLE' => $vdata['PART_CONSUMABLE'],
            'PART_UOM' => $vdata['PART_UOM'],
            'PART_MIN_QTY' => $vdata['PART_MIN_QTY'],
            'PART_SVC_LEVEL' => $vdata['PART_SVC_LEVEL'],
            'RACK_NO' => $vdata['RACK_NO'],
            'IS_BOM' => $vdata['IS_BOM'],
            'IS_PARTLIST' => $vdata['IS_PARTLIST'],
            'IS_AUTO_OUT' => $vdata['IS_AUTO_OUT'],
            'ID_COMPANY' => $param['ID_COMPANY'],
            'UPDATE_USER' => $param['VUSERNAME'],
        );
        $this->db->set('UPDATE_DATE', 'getdate()', false);
        $this->db->where('ID', $vdata['ID']);
        $tableName = '';
        if ($param['ID_COMPANY'] == 'AW') {
            $tableName = "mst_part_aw";
        } else {
            $tableName = "mst_part";
        }
        if (!$this->db->update($tableName, $field)) {
            $out = array(
                'success' => false,
                'message' => 'Update Data Failed'
            );
        } else {
            $out = array(
                'success' => 'true',
                'message' => 'Update Data Success'
            );
        }
        return json_encode($out);
    }
    function delete($param)
    {
        $vdata = json_decode($param['data'], true);

        $this->load->database();
        $this->db->where('ID', $vdata);
        $tableName = '';
        if ($param['ID_COMPANY'] == 'AW') {
            $tableName = "mst_part_aw";
        } else {
            $tableName = "mst_part";
        }
        if (!$this->db->delete($tableName)) {
            $out = array(
                'success' => false,
                'message' => 'Delete Data Failed'
            );
        } else {
            $out = array(
                'success' => 'true',
                'message' => 'Delete Data Success'
            );
        }
        return json_encode($out);
    }
    function module_send($param, $spname)
    {
        $this->load->database();
        $vform = $param["data"];
        $SQL_CALLSP = "EXEC " . $spname . "
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
    function edit($param)
    {
        $vdata = $param['data'];
        $tableName = '';
        if ($param['ID_COMPANY'] == 'AW') {
            $tableName = "mst_part_aw";
        } else {
            $tableName = "mst_part";
        }
        $this->load->database();
        $query = $this->db->get_where($tableName, array(
            'ID' => $vdata['ID']
        ));

        $rows = $query->row_array();

        $query_items = $this->db->get_where('mst_part_hs', array(
            'NOMOR_HS' => $rows['NOMOR_HS']
        ));
        $rows_items = $query_items->result_array();

        $out = array(
            'success' => 'true',
            'message' => 'Data Ditampilkan',
            'data' => $rows,
            'items' => $rows_items
        );
        return json_encode($out);
    }
}