<?php
class Mbc23_mainMenu extends CI_Model {

    function read($param){
        $vcolumn = json_decode($this->definition(),true);
        $vdefinition = $vcolumn["model1"]["definition"];

        $this->load->database();
        $this->db->select("
        A.KODE_DOKUMEN_PABEAN,
        B.mode_source_name,
        C.URAIAN_STATUS,
        D.URAIAN_KANTOR as KODE_KANTOR_BONGKARNAME,
        E.URAIAN_KANTOR as KODE_KANTOR_NAME,
        A.*
        
            ",false);
        $this->db->from("njc.tr_bc_header A");
        $this->db->join("njc.h_source_header B","A.mode_source = B.mode_source ","left");
        $this->db->join("njc.referensi_status C","A.KODE_STATUS = C.KODE_STATUS AND C.KODE_DOKUMEN='23'","left");
        $this->db->join("njc.referensi_kantor_pabean D","A.KODE_KANTOR_BONGKAR = D.KODE_KANTOR","left");
        $this->db->join("njc.referensi_kantor_pabean E","A.KODE_KANTOR = E.KODE_KANTOR","left");
        $this->db->where("A.KODE_DOKUMEN_PABEAN","23");

        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'],true);
            foreach ($keyval as $key =>$val ) {
                    $valproperty = $val["property"];
                    $key = array_search($valproperty, array_column($vdefinition, "name"));
                    $this->db->like($vdefinition[$key]["dbname"],$val['value'], 'both');
            }        
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'],true);
            foreach ($keyval as $key =>$val ) {
                    $valproperty = $val["property"];
                    $key = array_search($valproperty, array_column($vdefinition, "name"));
                    $this->db->order_by($vdefinition[$key]["dbname"], $val['direction']);
            }
        }
        
        $tempdb = clone $this->db;
        $count= $tempdb->count_all_results(); 
        
        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'],$param['start']);
        }
        
        $this->db->order_by("A.create_date", "desc");
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
            case "header":
                return $this->create_header($param);
              break;
              case "kontainer":
                return $this->create_kontainer($param);
            default:
              return false;
          }
    }
    function create_header($param){
        $this->load->database();
        $vform = $param["data"];
        
        $vheader = $vform["header"];
        $this->db->trans_begin();
        $dtheader= array(
            'ALAMAT_PEMASOK'=>$vheader["ALAMAT_PEMASOK"],
            'ALAMAT_PEMILIK'=>$vheader["ALAMAT_PEMILIK"],
            'ALAMAT_PENERIMA_BARANG'=>"",
            'ALAMAT_PENGIRIM'=>"",
            'ALAMAT_PENGUSAHA'=>$vheader["ALAMAT_PENGUSAHA"],
            'ALAMAT_PPJK'=>"",
            'API_PEMILIK'=>$vheader["API_PEMILIK"],
            'API_PENERIMA'=>"",
            'API_PENGUSAHA'=>$vheader["API_PENGUSAHA"],
            'ASAL_DATA'=>"I",
            'ASURANSI'=>$vheader["ASURANSI"],
            'BIAYA_TAMBAHAN'=>"",
            'BRUTO'=>$vheader["BRUTO"],
            'CIF'=>$vheader["CIF"],
            'CIF_RUPIAH'=>$vheader["CIF_RUPIAH"],
            'DISKON'=>"",
            'FLAG_PEMILIK'=>"",
            'FLAG_URL_DOKUMEN_PABEAN'=>"",
            'FOB'=>$vheader["FOB"],
            'FREIGHT'=>$vheader["FREIGHT"],
            'HARGA_BARANG_LDP'=>"",
            'HARGA_INVOICE'=>"",
            'HARGA_PENYERAHAN'=>"",
            'HARGA_TOTAL'=>"",
            'ID_MODUL'=>"",
            'ID_PEMASOK'=>"",
            'ID_PEMILIK'=>$vheader["ID_PEMILIK"],
            'ID_PENERIMA_BARANG'=>"",
            'ID_PENGIRIM'=>"",
            'ID_PENGUSAHA'=>$vheader["ID_PENGUSAHA"],
            'ID_PPJK'=>"",
            'JABATAN_TTD'=>"",
            'JUMLAH_BARANG'=>"",
            'JUMLAH_KEMASAN'=>"",
            'JUMLAH_KONTAINER'=>"",
            'KESESUAIAN_DOKUMEN'=>"",
            'KETERANGAN'=>"",
            'KODE_ASAL_BARANG'=>"",
            'KODE_ASURANSI'=>"",
            'KODE_BENDERA'=>$vheader["KODE_BENDERA"],
            'KODE_CARA_ANGKUT'=>$vheader["COMBO_CARA_ANGKUT"],
            'KODE_CARA_BAYAR'=>"",
            'KODE_DAERAH_ASAL'=>"",
            'KODE_DOKUMEN_PABEAN'=>"23",
            'KODE_FASILITAS'=>"",
            'KODE_FTZ'=>"",
            'KODE_HARGA'=>"",
            'KODE_ID_PEMASOK'=>"",
            'KODE_ID_PEMILIK'=>$vheader["KODE_ID_PEMILIK"],
            'KODE_ID_PENERIMA_BARANG'=>"",
            'KODE_ID_PENGIRIM'=>"",
            'KODE_ID_PENGUSAHA'=>$vheader["KODE_ID_PENGUSAHA"],
            'KODE_ID_PPJK'=>"",
            'KODE_JENIS_API'=>"",
            'KODE_JENIS_API_PEMILIK'=>$vheader["KODE_JENIS_API_PEMILIK"],
            'KODE_JENIS_API_PENERIMA'=>"",
            'KODE_JENIS_API_PENGUSAHA'=>$vheader["KODE_JENIS_API_PENGUSAHA"],
            'KODE_JENIS_BARANG'=>"",
            'KODE_JENIS_BC25'=>"",
            'KODE_JENIS_NILAI'=>"",
            'KODE_JENIS_PEMASUKAN01'=>"",
            'KODE_JENIS_PEMASUKAN02'=>"",
            'KODE_JENIS_TPB'=>"",
            'KODE_KANTOR'=>$vheader["KODE_KANTOR_PENGAWAS"],
            'KODE_KANTOR_BONGKAR'=>$vheader["KODE_KANTOR_BONGKAR"],
            'KODE_KANTOR_TUJUAN'=>"",
            'KODE_LOKASI_BAYAR'=>"",
            'KODE_NEGARA_PEMASOK'=>$vheader["KODE_NEGARA_PEMASOK"],
            'KODE_NEGARA_PEMILIK'=>"",
            'KODE_NEGARA_PENGIRIM'=>"",
            'KODE_NEGARA_TUJUAN'=>"",
            'KODE_PEL_BONGKAR'=>$vheader["KODE_PEL_BONGKAR"],
            'KODE_PEL_MUAT'=>$vheader["KODE_PEL_MUAT"],
            'KODE_PEL_TRANSIT'=>$vheader["KODE_PEL_TRANSIT"],
            'KODE_PEMBAYAR'=>"",
            'KODE_STATUS'=>"",
            'KODE_STATUS_PENGUSAHA'=>"",
            'KODE_STATUS_PERBAIKAN'=>"",
            'KODE_TPS'=>$vheader["KODE_TPS"],
            'KODE_TUJUAN_PEMASUKAN'=>"",
            'KODE_TUJUAN_PENGIRIMAN'=>"",
            'KODE_TUJUAN_TPB'=>$vheader["KODE_TUJUAN_TPB"],
            'KODE_TUTUP_PU'=>"",
            'KODE_VALUTA'=>$vheader["KODE_VALUTA"],
            'KOTA_TTD'=>"",
            'LOKASI_ASAL'=>"",
            'LOKASI_TUJUAN'=>"",
            'NAMA_PEMASOK'=>$vheader["NAMA_PEMASOK"],
            'NAMA_PEMILIK'=>$vheader["NAMA_PEMILIK"],
            'NAMA_PENERIMA_BARANG'=>"",
            'NAMA_PENGANGKUT'=>$vheader["NAMA_PENGANGKUT"],
            'NAMA_PENGIRIM'=>"",
            'NAMA_PENGUSAHA'=>$vheader["NAMA_PENGUSAHA"],
            'NAMA_PPJK'=>"",
            'NAMA_TTD'=>"",
            'NDPBM'=>$vheader["NDPBM"],
            'NETTO'=>$vheader["NETTO"],
            'NILAI_INCOTERM'=>"",
            'NIPER_PENERIMA'=>"",
            //'NOMOR_AJU'=>"",
            'NOMOR_API'=>"",
            'NOMOR_BC11'=>$vheader["NOMOR_BC11"],
            'NOMOR_BILLING'=>"",
            'NOMOR_DAFTAR'=>"",
            'NOMOR_IJIN_BPK_PEMASOK'=>"",
            'NOMOR_IJIN_BPK_PENGUSAHA'=>"",
            'NOMOR_IJIN_TPB'=>$vheader["NOMOR_IJIN_TPB"],
            'NOMOR_IJIN_TPB_PENERIMA'=>"",
            'NOMOR_POLISI'=>"",
            'NOMOR_VOY_FLIGHT'=>$vheader["NOMOR_VOY_FLIGHT"],
            'NPPPJK'=>"",
            'NPWP_BILLING'=>"",
            'POS_BC11'=>$vheader["POS_BC11"],
            'SERI'=>"",
            'SUBPOS_BC11'=>$vheader["SUBPOS_BC11"],
            'SUBSUBPOS_BC11'=>$vheader["SUBSUBPOS_BC11"],
            'TANGGAL_AJU'=>"",
            'TANGGAL_BC11'=>$vheader["TANGGAL_BC11"],
            'TANGGAL_BERANGKAT'=>"",
            'TANGGAL_BILLING'=>"",
            //'TANGGAL_DAFTAR'=>"",
            'TANGGAL_IJIN_BPK_PEMASOK'=>"",
            'TANGGAL_IJIN_BPK_PENGUSAHA'=>"",
            'TANGGAL_IJIN_TPB'=>"",
            'TANGGAL_NPPPJK'=>"",
            'TANGGAL_TIBA'=>"",
            'TANGGAL_TTD'=>"",
            'TGL_JATUH_TEMPO_BILLING'=>"",
            'TOTAL_BAYAR'=>"",
            'TOTAL_BEBAS'=>"",
            'TOTAL_DILUNASI'=>"",
            'TOTAL_JAMIN'=>"",
            'TOTAL_SUDAH_DILUNASI'=>"",
            'TOTAL_TANGGUH'=>"",
            'TOTAL_TANGGUNG'=>"",
            'TOTAL_TIDAK_DIPUNGUT'=>"",
            'URL_DOKUMEN_PABEAN'=>"",
            'VERSI_MODUL'=>"",
            'VOLUME'=>"",
            'WAKTU_BONGKAR'=>"",
            'WAKTU_STUFFING'=>"",
            'TANGGAL_MUAT'=>"",
            'TEMPAT_STUFFING'=>"",
            'CALL_SIGN'=>"",
            'JUMLAH_TANDA_PENGAMAN'=>"",
            'KODE_JENIS_TANDA_PENGAMAN'=>"",
            'KODE_KANTOR_MUAT'=>"",
            'KODE_PEL_TUJUAN'=>"",
            'TANGGAL_STUFFING'=>"",
            'KODE_GUDANG_ASAL'=>"",
            'KODE_GUDANG_TUJUAN'=>"",
            'ID_HEADER_ORI'=>"",
            'PJT'=>"",
            'mode_source'=>"4",
            'id_source'=>"",
            'is_get'=>"",
            'receive_ndpbm'=>"",
            'receive_ndpbm_usd'=>"",
            'receive_no'=>"",
            'receive_date'=>"",
            'mapping_supplier_id'=>"",
            'mapping_supplier_date'=>"",
            'mapping_supplier_by'=>"",
            'create_date'=>"",
            'create_by'=>"",
            'modify_date'=>"",
            'modify_by'=>"",
            'tr_bc_header_status'=>"",
            'ms_date_business_id'=>"",
            'is_move_business_date'=>"",
            'ms_date_business_id_from'=>"",
            'cancel_ms_cost_final_avg_id'=>"",
            'approve_ms_cost_final_avg_id'=>"",
            'ID_HEADER_OLD'=>"",
            'NOMOR_ANGKUT'=>"",
            'AngkutFl'=>""

        );
        $this->db->set('ID_HEADER_CEISA',"(select max(ID_HEADER_CEISA) +1 FROM njc.tr_bc_header)",false);
        $this->db->insert('njc.tr_bc_header', array_filter($dtheader));
        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE)
        {   
            $this->db->trans_rollback();
            $error = $this->db->error();
            $out= array(
                'success'=>false,
                'message'=>"Failed Create " . $error["message"]
            );
        }else{
            $this->db->trans_commit();
            $this->db->select("*");
            $this->db->from("njc.tr_bc_header");
            $this->db->where(array_filter($dtheader));
            $this->db->limit(1,0);
            $query=$this->db->get();
            $row = $query->row_array();
            
            $out= array(
                'success'=>true,
                'message'=>'Create BC23 Success',
                'data'=>$row
            );  
        }
        return json_encode($out);
    }
    function create_kontainer($param){
        $this->load->database();
        $vform = $param["data"];
        
        $vkontainer = $vform["kontainer"];
        $this->db->trans_begin();
        $dtkontainer= array(
            'KESESUAIAN_DOKUMEN'=>"",
            'KETERANGAN'=>$vkontainer['kontainer_keterangan'],
            'KODE_STUFFING'=>"",
            'KODE_TIPE_KONTAINER'=>$vkontainer['cbo_kontainer_type'],
            'KODE_UKURAN_KONTAINER'=>$vkontainer['cbo_kontainer_ukuran'],
            'FLAG_GATE_IN'=>"",
            'FLAG_GATE_OUT'=>"",
            'NO_POLISI'=>"",
            'NOMOR_KONTAINER'=>$vkontainer['kontainer_a'] . $vkontainer['kontainer_b'],
            'NOMOR_SEGEL'=>"",
            'WAKTU_GATE_IN'=>"",
            'WAKTU_GATE_OUT'=>"",
            'ID_HEADER'=>$vkontainer['ID_HEADER_CEISA'],
            'ID_CEISA'=>""
        );
        $this->db->set('SERI_KONTAINER',"(select isnull(max(SERI_KONTAINER),0)+1 from njc.tr_bc_kontainer where ID_HEADER=".$vkontainer['ID_HEADER_CEISA']." )" ,false);
        $this->db->insert('njc.tr_bc_kontainer', array_filter($dtkontainer));
        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE)
        {   
            $this->db->trans_rollback();
            $error = $this->db->error();
            $out= array(
                'success'=>false,
                'message'=>"Input Kontainer gagal " . $error["message"]
            );
        }else{
            $this->db->trans_commit();
            $this->db->select("*");
            $this->db->from("njc.tr_bc_kontainer");
            $this->db->where(array_filter($dtkontainer));
            $this->db->limit(1,0);
            $query=$this->db->get();
            $row = $query->row_array();
            
            $out= array(
                'success'=>true,
                'message'=>'Input Kontainer berhasil',
                'data'=>$row
            );  
        }
        return json_encode($out);
    }
    function update($param){
        switch ($param["module"]) {
            case "header":
                return $this->update_header($param);
              break;
            default:
              return false;
          }
        
    }
    function update_header($param){
        $this->load->database();
        $vform = $param["data"];
        
        $vheader = $vform["header"];
        $this->db->trans_begin();
        $dtheader= array(
            'ALAMAT_PEMASOK'=>$vheader["ALAMAT_PEMASOK"],
            'ALAMAT_PEMILIK'=>$vheader["ALAMAT_PEMILIK"],
            'ALAMAT_PENERIMA_BARANG'=>"",
            'ALAMAT_PENGIRIM'=>"",
            'ALAMAT_PENGUSAHA'=>$vheader["ALAMAT_PENGUSAHA"],
            'ALAMAT_PPJK'=>"",
            'API_PEMILIK'=>$vheader["API_PEMILIK"],
            'API_PENERIMA'=>"",
            'API_PENGUSAHA'=>$vheader["API_PENGUSAHA"],
            'ASAL_DATA'=>"I",
            'ASURANSI'=>$vheader["ASURANSI"],
            'BIAYA_TAMBAHAN'=>"",
            'BRUTO'=>$vheader["BRUTO"],
            'CIF'=>$vheader["CIF"],
            'CIF_RUPIAH'=>$vheader["CIF_RUPIAH"],
            'DISKON'=>"",
            'FLAG_PEMILIK'=>"",
            'FLAG_URL_DOKUMEN_PABEAN'=>"",
            'FOB'=>$vheader["FOB"],
            'FREIGHT'=>$vheader["FREIGHT"],
            'HARGA_BARANG_LDP'=>"",
            'HARGA_INVOICE'=>"",
            'HARGA_PENYERAHAN'=>"",
            'HARGA_TOTAL'=>"",
            'ID_MODUL'=>"",
            'ID_PEMASOK'=>"",
            'ID_PEMILIK'=>$vheader["ID_PEMILIK"],
            'ID_PENERIMA_BARANG'=>"",
            'ID_PENGIRIM'=>"",
            'ID_PENGUSAHA'=>$vheader["ID_PENGUSAHA"],
            'ID_PPJK'=>"",
            'JABATAN_TTD'=>"",
            'JUMLAH_BARANG'=>"",
            'JUMLAH_KEMASAN'=>"",
            'JUMLAH_KONTAINER'=>"",
            'KESESUAIAN_DOKUMEN'=>"",
            'KETERANGAN'=>"",
            'KODE_ASAL_BARANG'=>"",
            'KODE_ASURANSI'=>"",
            'KODE_BENDERA'=>$vheader["KODE_BENDERA"],
            'KODE_CARA_ANGKUT'=>$vheader["COMBO_CARA_ANGKUT"],
            'KODE_CARA_BAYAR'=>"",
            'KODE_DAERAH_ASAL'=>"",
            'KODE_DOKUMEN_PABEAN'=>"23",
            'KODE_FASILITAS'=>"",
            'KODE_FTZ'=>"",
            'KODE_HARGA'=>"",
            'KODE_ID_PEMASOK'=>"",
            'KODE_ID_PEMILIK'=>$vheader["KODE_ID_PEMILIK"],
            'KODE_ID_PENERIMA_BARANG'=>"",
            'KODE_ID_PENGIRIM'=>"",
            'KODE_ID_PENGUSAHA'=>$vheader["KODE_ID_PENGUSAHA"],
            'KODE_ID_PPJK'=>"",
            'KODE_JENIS_API'=>"",
            'KODE_JENIS_API_PEMILIK'=>$vheader["KODE_JENIS_API_PEMILIK"],
            'KODE_JENIS_API_PENERIMA'=>"",
            'KODE_JENIS_API_PENGUSAHA'=>$vheader["KODE_JENIS_API_PENGUSAHA"],
            'KODE_JENIS_BARANG'=>"",
            'KODE_JENIS_BC25'=>"",
            'KODE_JENIS_NILAI'=>"",
            'KODE_JENIS_PEMASUKAN01'=>"",
            'KODE_JENIS_PEMASUKAN02'=>"",
            'KODE_JENIS_TPB'=>"",
            'KODE_KANTOR'=>$vheader["KODE_KANTOR_PENGAWAS"],
            'KODE_KANTOR_BONGKAR'=>$vheader["KODE_KANTOR_BONGKAR"],
            'KODE_KANTOR_TUJUAN'=>"",
            'KODE_LOKASI_BAYAR'=>"",
            'KODE_NEGARA_PEMASOK'=>$vheader["KODE_NEGARA_PEMASOK"],
            'KODE_NEGARA_PEMILIK'=>"",
            'KODE_NEGARA_PENGIRIM'=>"",
            'KODE_NEGARA_TUJUAN'=>"",
            'KODE_PEL_BONGKAR'=>$vheader["KODE_PEL_BONGKAR"],
            'KODE_PEL_MUAT'=>$vheader["KODE_PEL_MUAT"],
            'KODE_PEL_TRANSIT'=>$vheader["KODE_PEL_TRANSIT"],
            'KODE_PEMBAYAR'=>"",
            'KODE_STATUS'=>"",
            'KODE_STATUS_PENGUSAHA'=>"",
            'KODE_STATUS_PERBAIKAN'=>"",
            'KODE_TPS'=>$vheader["KODE_TPS"],
            'KODE_TUJUAN_PEMASUKAN'=>"",
            'KODE_TUJUAN_PENGIRIMAN'=>"",
            'KODE_TUJUAN_TPB'=>$vheader["KODE_TUJUAN_TPB"],
            'KODE_TUTUP_PU'=>"",
            'KODE_VALUTA'=>$vheader["KODE_VALUTA"],
            'KOTA_TTD'=>"",
            'LOKASI_ASAL'=>"",
            'LOKASI_TUJUAN'=>"",
            'NAMA_PEMASOK'=>$vheader["NAMA_PEMASOK"],
            'NAMA_PEMILIK'=>$vheader["NAMA_PEMILIK"],
            'NAMA_PENERIMA_BARANG'=>"",
            'NAMA_PENGANGKUT'=>$vheader["NAMA_PENGANGKUT"],
            'NAMA_PENGIRIM'=>"",
            'NAMA_PENGUSAHA'=>$vheader["NAMA_PENGUSAHA"],
            'NAMA_PPJK'=>"",
            'NAMA_TTD'=>"",
            'NDPBM'=>$vheader["NDPBM"],
            'NETTO'=>$vheader["NETTO"],
            'NILAI_INCOTERM'=>"",
            'NIPER_PENERIMA'=>"",
            //'NOMOR_AJU'=>"",
            'NOMOR_API'=>"",
            'NOMOR_BC11'=>$vheader["NOMOR_BC11"],
            'NOMOR_BILLING'=>"",
            'NOMOR_DAFTAR'=>"",
            'NOMOR_IJIN_BPK_PEMASOK'=>"",
            'NOMOR_IJIN_BPK_PENGUSAHA'=>"",
            'NOMOR_IJIN_TPB'=>$vheader["NOMOR_IJIN_TPB"],
            'NOMOR_IJIN_TPB_PENERIMA'=>"",
            'NOMOR_POLISI'=>"",
            'NOMOR_VOY_FLIGHT'=>$vheader["NOMOR_VOY_FLIGHT"],
            'NPPPJK'=>"",
            'NPWP_BILLING'=>"",
            'POS_BC11'=>$vheader["POS_BC11"],
            'SERI'=>"",
            'SUBPOS_BC11'=>$vheader["SUBPOS_BC11"],
            'SUBSUBPOS_BC11'=>$vheader["SUBSUBPOS_BC11"],
            'TANGGAL_AJU'=>"",
            'TANGGAL_BC11'=>$vheader["TANGGAL_BC11"],
            'TANGGAL_BERANGKAT'=>"",
            'TANGGAL_BILLING'=>"",
            //'TANGGAL_DAFTAR'=>"",
            'TANGGAL_IJIN_BPK_PEMASOK'=>"",
            'TANGGAL_IJIN_BPK_PENGUSAHA'=>"",
            'TANGGAL_IJIN_TPB'=>"",
            'TANGGAL_NPPPJK'=>"",
            'TANGGAL_TIBA'=>"",
            'TANGGAL_TTD'=>"",
            'TGL_JATUH_TEMPO_BILLING'=>"",
            'TOTAL_BAYAR'=>"",
            'TOTAL_BEBAS'=>"",
            'TOTAL_DILUNASI'=>"",
            'TOTAL_JAMIN'=>"",
            'TOTAL_SUDAH_DILUNASI'=>"",
            'TOTAL_TANGGUH'=>"",
            'TOTAL_TANGGUNG'=>"",
            'TOTAL_TIDAK_DIPUNGUT'=>"",
            'URL_DOKUMEN_PABEAN'=>"",
            'VERSI_MODUL'=>"",
            'VOLUME'=>"",
            'WAKTU_BONGKAR'=>"",
            'WAKTU_STUFFING'=>"",
            'TANGGAL_MUAT'=>"",
            'TEMPAT_STUFFING'=>"",
            'CALL_SIGN'=>"",
            'JUMLAH_TANDA_PENGAMAN'=>"",
            'KODE_JENIS_TANDA_PENGAMAN'=>"",
            'KODE_KANTOR_MUAT'=>"",
            'KODE_PEL_TUJUAN'=>"",
            'TANGGAL_STUFFING'=>"",
            'KODE_GUDANG_ASAL'=>"",
            'KODE_GUDANG_TUJUAN'=>"",
            'ID_HEADER_ORI'=>"",
            'PJT'=>"",
            'mode_source'=>"4",
            'id_source'=>"",
            'is_get'=>"",
            'receive_ndpbm'=>"",
            'receive_ndpbm_usd'=>"",
            'receive_no'=>"",
            'receive_date'=>"",
            'mapping_supplier_id'=>"",
            'mapping_supplier_date'=>"",
            'mapping_supplier_by'=>"",
            'create_date'=>"",
            'create_by'=>"",
            'modify_date'=>"",
            'modify_by'=>"",
            'tr_bc_header_status'=>"",
            'ms_date_business_id'=>"",
            'is_move_business_date'=>"",
            'ms_date_business_id_from'=>"",
            'cancel_ms_cost_final_avg_id'=>"",
            'approve_ms_cost_final_avg_id'=>"",
            'ID_HEADER_OLD'=>"",
            'NOMOR_ANGKUT'=>"",
            'AngkutFl'=>""

        );
        $this->db->where('ID_HEADER_CEISA', $vheader["ID_HEADER_CEISA"]);
        $this->db->update('njc.tr_bc_header', array_filter($dtheader));
        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE)
        {   
            $this->db->trans_rollback();
            $error = $this->db->error();
            $out= array(
                'success'=>false,
                'message'=>"Failed Update " . $error["message"]
            );
        }else{
            $this->db->trans_commit();
            $out= array(
                'success'=>true,
                'message'=>'Update BC23 Success'
            );  
        }
        return json_encode($out);
    }
    function edit($param){
        $this->load->database();

        $this->db->select("
        A.KODE_DOKUMEN_PABEAN,
        B.mode_source_name,
        C.URAIAN_STATUS,
        D.URAIAN_KANTOR as KODE_KANTOR_BONGKARNAME,
        A.KODE_KANTOR as KODE_KANTOR_PENGAWAS,
        E.URAIAN_KANTOR as KODE_KANTOR_PENGAWASNAME,
        F.URAIAN_TUJUAN_TPB as KODE_TUJUAN_TPBNAME,
        G.URAIAN_JENIS_API as KODE_JENIS_API_PENGUSAHANAME,
        UPPER(H.country_name2) as NAMA_PEMASOK_NEGARA,
        CONCAT(A.KODE_CARA_ANGKUT,' - ',I.URAIAN_CARA_ANGKUT) as COMBO_CARA_ANGKUT,
        J.country_name2 as KODE_BENDERA_NAME,
        K.URAIAN_PELABUHAN as KODE_PEL_MUATNAME,
        L.URAIAN_PELABUHAN as KODE_PEL_TRANSITNAME,
        M.URAIAN_PELABUHAN as KODE_PEL_BONGKARNAME,
        N.URAIAN_TPS as KODE_TPS_NAME,
        O.URAIAN_VALUTA as KODE_VALUTA_NAME,
        A.*
        
            ",false);
        $this->db->from("njc.tr_bc_header A");
        $this->db->join("njc.h_source_header B","A.mode_source = B.mode_source ","left");
        $this->db->join("njc.referensi_status C","A.KODE_STATUS = C.KODE_STATUS AND C.KODE_DOKUMEN='23'","left");
        $this->db->join("njc.referensi_kantor_pabean D","A.KODE_KANTOR_BONGKAR = D.KODE_KANTOR","left");
        $this->db->join("njc.referensi_kantor_pabean E","A.KODE_KANTOR = E.KODE_KANTOR","left");
        $this->db->join("njc.referensi_tujuan_tpb F","A.KODE_TUJUAN_TPB = F.KODE_TUJUAN_TPB ","left");
        $this->db->join("njc.referensi_jenis_api G","A.KODE_JENIS_API_PENGUSAHA= G.KODE_JENIS_API","left");
        $this->db->join("njc.mst_negara H","A.KODE_NEGARA_PEMASOK = H.country_code2","left");
        $this->db->join("njc.referensi_cara_angkut I","A.KODE_CARA_ANGKUT = I.KODE_CARA_ANGKUT","left");
        $this->db->join("njc.mst_negara J","A.KODE_BENDERA = J.country_code2","left");
        $this->db->join("njc.referensi_pelabuhan K","A.KODE_PEL_MUAT = K.KODE_PELABUHAN","left");
        $this->db->join("njc.referensi_pelabuhan L","A.KODE_PEL_TRANSIT = L.KODE_PELABUHAN","left");
        $this->db->join("njc.referensi_pelabuhan M","A.KODE_PEL_BONGKAR = M.KODE_PELABUHAN","left");
        $this->db->join("njc.referensi_tps N","A.KODE_TPS = N.KODE_TPS","left");
        $this->db->join("njc.referensi_valuta O","A.KODE_VALUTA = O.KODE_VALUTA","left");
        $this->db->where("A.ID_HEADER_CEISA",$param['data']['ID_HEADER_CEISA']);


        $sql = $this->db->get();

        $vdoc_header = $sql->row_array();

        $vdoc_kemasan = $this->db->get_where('njc.tr_bc_kemasan', array('ID_HEADER' => $vdoc_header['ID_HEADER_CEISA']));
        $vdoc_kontainer = $this->db->order_by('SERI_KONTAINER', 'ASC')->get_where('njc.tr_bc_kontainer', array('ID_HEADER' => $vdoc_header['ID_HEADER_CEISA']));

        $this->db->select("
        A.KODE_JENIS_DOKUMEN,
        C.URAIAN_DOKUMEN as KODE_JENIS_DOKUMEN_NAME,
        A.NOMOR_DOKUMEN,
        FORMAT(A.TANGGAL_DOKUMEN ,'yyyy-MM-dd') as TANGGAL_DOKUMEN
        ",false);
        $this->db->from("njc.tr_bc_dokumen A");
        $this->db->join("njc.tr_bc_header B","A.ID_HEADER= B.ID_HEADER_CEISA","left");
        $this->db->join("njc.referensi_dokumen C","A.KODE_JENIS_DOKUMEN = C.KODE_DOKUMEN","left");
        $this->db->where("B.NOMOR_AJU",$param['data']['NOMOR_AJU']);
        $vdoc_dokumen =  $this->db->get();


        //INVOICE
        $field_where = array(
            "ID_HEADER"=>$vdoc_header['ID_HEADER_CEISA'],
            "KODE_JENIS_DOKUMEN"=>'380'
        );
        $vfield_invoice = $this->db->get_where('njc.tr_bc_dokumen',$field_where,1);

        //import
        $field_where = array(
            "ID_HEADER"=>$vdoc_header['ID_HEADER_CEISA'],
            "KODE_JENIS_DOKUMEN"=>'861'
        );
        $vfield_impor = $this->db->get_where('njc.tr_bc_dokumen',$field_where,1);
        //LC
        $field_where = array(
            "ID_HEADER"=>$vdoc_header['ID_HEADER_CEISA'],
            "KODE_JENIS_DOKUMEN"=>'465'
        );
        $vfield_lc = $this->db->get_where('njc.tr_bc_dokumen',$field_where,1);

        
        //AWB
        $field_where = "ID_HEADER='".$vdoc_header['ID_HEADER_OLD']."'  AND KODE_JENIS_DOKUMEN IN (704,705,740,741)  ";
        $vfield_awb = $this->db->get_where('njc.tr_bc_dokumen',$field_where,1);

        //item detail
        $this->db->select("
        C.part_name,
        A.KODE_BARANG,
        D.URAIAN_KATEGORI,
        A.*
        ",false);
        $this->db->from("njc.tr_bc_detail A");
        $this->db->join("njc.tr_bc_header B","A.ID_HEADER_CEISA = B.ID_HEADER_CEISA","left");
        $this->db->join("njc.mst_items C","A.TIPE = C.part_no","left");
        $this->db->join("njc.referensi_kategori_barang D","A.KATEGORI_BARANG = D.KODE_KATEGORI","left");

        $this->db->where("B.NOMOR_AJU",$param['data']['NOMOR_AJU']);
        $vdoc_itempart =  $this->db->get();


        $output = array(
            'success'=>true,
            'doc_header'=>$vdoc_header,
            'doc_kontainer'=>$vdoc_kontainer->result_array(),
            'doc_kemasan'=>$vdoc_kemasan->result_array(),
            'doc_dokumen'=>$vdoc_dokumen->result_array(),
            'field_invoice'=>$vfield_invoice->row_array(),
            'field_impor'=>$vfield_impor->row_array(),
            'field_lc'=>$vfield_lc->row_array(),
            'field_awb'=>$vfield_awb->row_array(),
            'doc_itempart'=>$vdoc_itempart->result_array(),
            'doc_formula'=>array()
        );

        return json_encode($output);

    }
    function delete($param){
        switch ($param["module"]) {
            case "header":
                return $this->delete_header($param);
              break;
              case "kontainer":
                return $this->delete_kontainer($param);
              break;
            default:
              return false;
          }
        

    }
    function delete_header($param){
        $vform= $param["data"];
        $this->load->database();
        $this->db->trans_begin();
        
        $this->db->where('ID_HEADER_CEISA', $vform["header"]["ID_HEADER_CEISA"]);
        $this->db->delete('njc.tr_bc_header');
        

        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE)
        {   
            $this->db->trans_rollback();
            $error = $this->db->error();
            $out= array(
                'success'=>false,
                'message'=>"Failed Delete " . $error["message"]
            );
        }else{
            $this->db->trans_commit();
            $out= array(
                'success'=>true,
                'message'=>'Delete Success'
            );  
        }
        return json_encode($out);
    }
    function delete_kontainer($param){
        $vform= $param["data"];
        $this->load->database();
        $this->db->trans_begin();
        
        $this->db->where('ID', $vform["kontainer"]["ID"]);
        $this->db->delete('njc.tr_bc_kontainer');
        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE)
        {   
            $this->db->trans_rollback();
            $error = $this->db->error();
            $out= array(
                'success'=>false,
                'message'=>"Data Kontainer gagal dihapus " . $error["message"]
            );
        }else{
            $this->db->trans_commit();
            $out= array(
                'success'=>true,
                'message'=>'Data Kontainer berhasil dihapus'
            );  
        }
        return json_encode($out);
    }
    function definition(){
        $model1= array(
            'TableName'=>'tblBC23Hdr',
            'definition'=>array(
                array('name'=>'URAIAN_STATUS','dbname'=> 'URAIAN_STATUS','type'=> 'varchar','max_length'=> 26,'nullable'=> true,'format'=> ''),
                array('name'=>'mode_source_name','dbname'=> 'mode_source_name','type'=> 'varchar','max_length'=> 6,'nullable'=> true,'format'=> ''),
                array('name'=>'NOMOR_AJU','dbname'=> 'NOMOR_AJU','type'=> 'varchar','max_length'=> 1,'nullable'=> true,'format'=> ''),
                array('name'=>'CIF','dbname'=> 'CIF','type'=> 'varchar','max_length'=> 1,'nullable'=> true,'format'=> ''),
                array('name'=>'CIF_RUPIAH','dbname'=> 'CIF_RUPIAH','type'=> 'varchar','max_length'=> 1,'nullable'=> true,'format'=> ''),
                    )
                );

        $output = array(
            "success"=>true,
            "model1"=>$model1
        );

        return json_encode($output);
    }
    function relation($param){
        
    }
}