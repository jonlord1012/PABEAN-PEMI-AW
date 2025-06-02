<?php
class Min_bc_inventory_detail extends CI_Model {

    function read($param){
        $this->load->database();
        $this->db->select("
                A.ID_HEADER,
                A.SERI_BARANG,
                A.KODE_BARANG,
                A.KATEGORI_BARANG,
                A.TIPE,
                A.URAIAN,
                A.KODE_SATUAN,
                ISNULL(A.JUMLAH_SATUAN,0) as QTY_DOK,
                ISNULL(B.QTY_RECEIPT,0) as QTY_RECEIPT,
                ISNULL(A.JUMLAH_SATUAN,0) - ISNULL(B.QTY_RECEIPT,0) as QTY_SISA,
                ISNULL(A.JUMLAH_SATUAN,0) - ISNULL(B.QTY_RECEIPT,0) as QTY_INPUT
            ",false);
        $this->db->from("njc.tr_bc_detail A");
        $this->db->join("(select A.ID_HEADER,A.SERI_BARANG,SUM(isnull(A.QTY_REAL,0)) as QTY_RECEIPT from njc.tr_inventory_detail A GROUP BY A.ID_HEADER,A.SERI_BARANG)  B","A.ID_HEADER = B.ID_HEADER AND A.SERI_BARANG = B.SERI_BARANG","Left");
        
        $this->db->order_by(
            "A.SERI_BARANG"
        );
        if (array_key_exists('keywhere', $param)) {
            $keyval = json_decode($param['keywhere'],true);
            foreach ($keyval as $key =>$val ) {
                    $this->db->where($val['property'],$val['value']);
            }
        }
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                    $colname = array('SYSUPDATEDATE','SYSCREATEDATE');
                    if (in_array($val['property'], $colname)) {
                        $this->db->like( "TO_CHAR(". $val['property'] .", 'YYYY-MM-DD HH24:MI:SS')", $val['value']);
                    }else{
                        $this->db->like("UPPER(" . $val['property'] .")",strtoupper($val['value']), 'both');
                    }
            }        
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                    $this->db->order_by($val['property'], $val['direction']);
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
    function create($param){
        switch ($param["module"]) {
            case "input_receiving":
                return $this->module_send($param,"njc.SP_INVENTORY_IN");
                break;
            default:
              return false;
          }
    }
    function module_send($param,$spname){
        $this->load->database();
        $vform = $param["data"];
        $SQL_CALLSP = "EXEC ". $spname ."
            @VID_HEADER=?,
            @VKODE_RECEIVING=?,
            @VTANGGAL_RECEIVING=?,
            @VKETERANGAN=?,
            @VDATA=?
        ";
        $data = array(
            '@VID_HEADER'=>$param["ID_HEADER"],
            '@VKODE_RECEIVING'=>$param["KODE_RECEIVING"],
            '@VTANGGAL_RECEIVING'=>$param["TANGGAL_RECEIVING"],
            '@VKETERANGAN'=>$param["KETERANGAN"],
            '@VDATA' => json_encode($param["data"])
        );

        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->row_array();
        
        return json_encode($row);
    }
}