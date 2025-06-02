<?php
class Msync_bc_in extends CI_Model {
    function read($param){
        $vmethod = array_key_exists("method",$param)==false ? '' : $param['method'];
        switch ($vmethod) {
            case "read_dokumen_header":
                return $this->read_dokumen_header($param);
                break;
            case "read_dokumen_lampiran":
                return $this->read_dokumen_lampiran($param);
                break;
            case "read_dokumen_detail":
                return $this->read_dokumen_detail($param);
                break;
            case "read_dokumen_jaminan":
                return $this->read_dokumen_jaminan($param);
                break;
            case "read_dokumen_kemasan":
                return $this->read_dokumen_kemasan($param);
                break;
            case "read_dokumen_kontainer":
                return $this->read_dokumen_kontainer($param);
                break;
            case "read_dokumen_tarif":
                return $this->read_dokumen_tarif($param);
                break;
            case "read_tahun_aju":
                return $this->read_tahun_aju($param);
                break;
                
                
            default:
                return $this->read_default($param);
          }
    }
    function read_default($param){
        IF($param['ID_COMPANY']=='AW'){
            $this->load->database('CEISA_AW');
        }else{
            $this->load->database('CEISA');
        }
        
        $this->db->select("
        
        B.NOMOR_DOKUMEN,
        DATE_FORMAT(B.TANGGAL_DOKUMEN,'%Y-%m-%d') as TANGGAL_DOKUMEN,
        A.NOMOR_AJU,
        DATE_FORMAT(A.TANGGAL_AJU,'%Y-%m-%d') as TANGGAL_AJU,
        A.NOMOR_DAFTAR,
        DATE_FORMAT(A.TANGGAL_DAFTAR,'%Y-%m-%d') as TANGGAL_DAFTAR,
        A.KODE_DOKUMEN_PABEAN,
        A.KODE_STATUS,
        (select URAIAN_STATUS FROM referensi_status WHERE KODE_STATUS=A.KODE_STATUS AND KODE_DOKUMEN=A.KODE_DOKUMEN_PABEAN LIMIT 1) as URAIAN_STATUS
        
        ");
        $this->db->from("tpb_header A");
        $this->db->join("tpb_dokumen B","A.ID = B.ID_HEADER AND (B.KODE_JENIS_DOKUMEN='380' OR B.KODE_JENIS_DOKUMEN='705' OR B.KODE_JENIS_DOKUMEN='388' )","left");
       
        $this->db->where("
        DATE_FORMAT(TANGGAL_AJU, '%Y')='".$param['TAHUN_AJU']."' AND 
        A.KODE_DOKUMEN_PABEAN IN ('23','40','261')
        ");
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                $this->db->like($val["property"],$val['value'], 'both');
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
        
        $this->db->order_by( "B.TANGGAL_DOKUMEN", "DESC");

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
    function read_dokumen_header($param){
        IF($param['ID_COMPANY']=='AW'){
            $this->load->database('CEISA_AW');
        }else{
            $this->load->database('CEISA');
        }
        
        $this->db->select("
        *
        ");
        $this->db->from("tpb_header A");
       
        $this->db->where("
        A.ID = (
            SELECT DISTINCT ID_HEADER FROM tpb_dokumen WHERE NOMOR_DOKUMEN='".$param['NOMOR_DOKUMEN']."'
            )
        ");
        
        $query = $this->db->get();
        $rows = $query->row_array();

        $data = array();
        IF($query->num_rows() >0){
            foreach($rows as $x => $val) {
                $data[]= array(
                    'FIELDNAME'=>$x,
                    'VALUENAME'=>$val
                );
              }
        }
        
        return json_encode($data );


    }
    function read_dokumen_lampiran($param){
        IF($param['ID_COMPANY']=='AW'){
            $this->load->database('CEISA_AW');
        }else{
            $this->load->database('CEISA');
        }
        $this->db->select("
            A.FLAG_URL_DOKUMEN,
            A.KODE_JENIS_DOKUMEN,
            B.URAIAN_DOKUMEN,
            A.NOMOR_DOKUMEN,
            A.SERI_DOKUMEN,
            A.TANGGAL_DOKUMEN,
            A.TIPE_DOKUMEN,
            A.URL_DOKUMEN,
            A.ID_HEADER
        ");
        $this->db->from("tpb_dokumen A");
        $this->db->join("referensi_dokumen B","A.TIPE_DOKUMEN=B.TIPE_DOKUMEN AND A.KODE_JENIS_DOKUMEN = B.KODE_DOKUMEN","left");
       
        $this->db->where("
        A.ID_HEADER= (
            SELECT DISTINCT ID_HEADER FROM tpb_dokumen WHERE NOMOR_DOKUMEN='".$param['NOMOR_DOKUMEN']."'
            ) 
        ");
        
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                'Rows' => $rows
             );
        return json_encode($data );
    }

    function read_dokumen_detail($param){
        IF($param['ID_COMPANY']=='AW'){
            $this->load->database('CEISA_AW');
        }else{
            $this->load->database('CEISA');
        }
        $dbQuery = "
        A.ASURANSI,
        A.CIF,
        A.CIF_RUPIAH,
        A.DISKON,
        A.FLAG_KENDARAAN,
        A.FOB,
        A.FREIGHT,
        A.HARGA_BARANG_LDP,
        A.HARGA_INVOICE,
        A.HARGA_PENYERAHAN,
        A.HARGA_SATUAN,
        A.JENIS_KENDARAAN,
        A.JUMLAH_BAHAN_BAKU,
        A.JUMLAH_KEMASAN,
        A.JUMLAH_SATUAN,
        A.KAPASITAS_SILINDER,
        A.KATEGORI_BARANG,
        A.KODE_ASAL_BARANG,
        A.KODE_BARANG,
        A.KODE_FASILITAS_DOKUMEN,
        A.KODE_GUNA,
        A.KODE_JENIS_NILAI,
        A.KODE_KEMASAN,
        A.KODE_LEBIH_DARI4TAHUN,
        A.KODE_NEGARA_ASAL,
        A.KODE_SATUAN,
        A.KODE_SKEMA_TARIF,
        A.KODE_STATUS,
        A.KONDISI_BARANG,
        A.MERK,
        A.NETTO,
        A.NILAI_INCOTERM,
        A.NILAI_PABEAN,
        A.NOMOR_MESIN,
        A.NOMOR_RANGKA,
        A.POS_TARIF,
        A.SERI_BARANG,
        A.SERI_IJIN,
        A.SERI_POS_TARIF,
        A.SPESIFIKASI_LAIN,
        A.TAHUN_PEMBUATAN,
        A.TIPE,
        A.UKURAN,
        A.URAIAN,
        A.VOLUME,
        A.ID_HEADER,
        A.ID_EKSPORTIR,
        A.NAMA_EKSPORTIR,
        A.ALAMAT_EKSPORTIR,
        A.KODE_PERHITUNGAN,
        A.SERI_BARANG_DOK_ASAL, " ; 
        if  (isset ($param['BC_TYPE'] )) {
            $dbQuery .= "  
            CAST((CASE WHEN '". $param['BC_TYPE'] . "' = '40' THEN (CAST( IFNULL(HARGA_PENYERAHAN,0 )AS DECIMAL(18,4))  / CAST( IFNULL(JUMLAH_SATUAN,0) AS DECIMAL(18,4) )) ELSE HARGA_SATUAN END) AS DECIMAL(18,4)) AS HARGA_SATUAN" ; 
        } else { $dbQuery .= "A.HARGA_SATUAN ;" ; }
        $this->db->select($dbQuery);
        $this->db->from("tpb_barang A");
       
        $this->db->where("
        A.ID_HEADER= (
            SELECT DISTINCT ID_HEADER FROM tpb_dokumen WHERE NOMOR_DOKUMEN='".$param['NOMOR_DOKUMEN']."'
            ) 
        ");
        
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                'Rows' => $rows
             );
        return json_encode($data );
    }

    function read_dokumen_jaminan($param){
        IF($param['ID_COMPANY']=='AW'){
            $this->load->database('CEISA_AW');
        }else{
            $this->load->database('CEISA');
        }
        $this->db->select("
        *
        ");
        $this->db->from("tpb_jaminan A");
       
        $this->db->where("
        A.ID_HEADER= (
            SELECT DISTINCT ID_HEADER FROM tpb_dokumen WHERE NOMOR_DOKUMEN='".$param['NOMOR_DOKUMEN']."'
            ) 
        ");
        
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                'Rows' => $rows
             );
        return json_encode($data );
    }
    function read_dokumen_kemasan($param){
        IF($param['ID_COMPANY']=='AW'){
            $this->load->database('CEISA_AW');
        }else{
            $this->load->database('CEISA');
        }
        $this->db->select("
        *
        ");
        $this->db->from("tpb_kemasan A");
       
        $this->db->where("
        A.ID_HEADER= (
            SELECT DISTINCT ID_HEADER FROM tpb_dokumen WHERE NOMOR_DOKUMEN='".$param['NOMOR_DOKUMEN']."'
            ) 
        ");
        
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                'Rows' => $rows
             );
        return json_encode($data );
    }
    function read_dokumen_kontainer($param){
        IF($param['ID_COMPANY']=='AW'){
            $this->load->database('CEISA_AW');
        }else{
            $this->load->database('CEISA');
        }
        $this->db->select("
        *
        ");
        $this->db->from("tpb_kontainer A");
       
        $this->db->where("
        A.ID_HEADER= (
            SELECT DISTINCT ID_HEADER FROM tpb_dokumen WHERE NOMOR_DOKUMEN='".$param['NOMOR_DOKUMEN']."'
            ) 
        ");
        
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                'Rows' => $rows
             );
        return json_encode($data );
    }
    function read_dokumen_tarif($param){
        IF($param['ID_COMPANY']=='AW'){
            $this->load->database('CEISA_AW');
        }else{
            $this->load->database('CEISA');
        }
        $this->db->select("
        *
        ");
        $this->db->from("tpb_barang_tarif A");
       
        $this->db->where("
        A.ID_HEADER= (
            SELECT DISTINCT ID_HEADER FROM tpb_dokumen WHERE NOMOR_DOKUMEN='".$param['NOMOR_DOKUMEN']."'
            ) 
        ");
        
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                'Rows' => $rows
             );
        return json_encode($data );
    }
    function read_tahun_aju($param){
        IF($param['ID_COMPANY']=='AW'){
            $this->load->database('CEISA_AW');
        }else{
            $this->load->database('CEISA');
        }
        $this->db->select("
        DISTINCT DATE_FORMAT(TANGGAL_AJU, '%Y') as TAHUN_AJU
        ");
        $this->db->from("tpb_header A");
        
        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
                'Rows' => $rows
             );
        return json_encode($data );
    }
}