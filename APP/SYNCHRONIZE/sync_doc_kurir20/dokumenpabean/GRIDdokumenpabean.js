Ext.define("TDK.SYNCHRONIZE.sync_doc_kurir20.dokumenpabean.GRIDdokumenpabean", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDdokumenpabean",
  reference: "GRIDdokumenpabean",
  frame: false,
  border: true,
  autoScroll: true,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
  bodyPadding: "2 2 2 2",
  items: [
    {
      xtype: "grid",
      pid: "GRIDdokumenpabean_header",
      emptyText: "No Matching Records",
      autoScroll: true,
      title: "",
      height: 150,
      plugins: ["filterfield"],
      viewConfig: {
        enableTextSelection: true,
      },
      store: {
        autoLoad: true,
        remoteSort: false,
        remoteFilter: false,
        pageSize: 0,
        proxy: {
          type: "ajax",
          disableCaching: false,
          noCache: false,
          headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "sync_doc/sync_docs",
          extraParams: {
            method: "read_dokumenpabean_header",
            module: "coo",
          },
          reader: {
            type: "json",
            rootProperty: "Rows",
            totalProperty: "TotalRows",
            successProperty: "success",
          },
        },
        listeners: {
          beforeload: function (store, operation, eOpts) {
            try {
              var GRID = Ext.ComponentQuery.query("sync_doc_kurir20 GRIDsync_doc_kurir20 grid[pid=GRIDsync_doc_kurir20]")[0];
              var vdt = GRID.getSelectionModel().getSelection()[0].data;
              operation.setParams({
                INVOICE_NO: vdt.INVOICE_NO,
              });
            } catch (ex) {
              COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
            }
          },
        },
      },
      columns: [
        { xtype: "rownumberer", width: 40 },
        { header: "NAMA_PEMASOK", dataIndex: "NAMA_PEMASOK", sortable: true, width: 150 },
        { header: "ALAMAT_PEMASOK", dataIndex: "ALAMAT_PEMASOK", sortable: true, width: 150 },
        { header: "KODE_DOKUMEN_PABEAN", dataIndex: "KODE_DOKUMEN_PABEAN", sortable: true, width: 150 },
        { header: "CIF", dataIndex: "CIF", sortable: true, width: 80 },
        { header: "CIF_RUPIAH", dataIndex: "CIF_RUPIAH", sortable: true, width: 85 },
        { header: "FOB", dataIndex: "FOB", sortable: true, width: 80 },
        { header: "KODE_VALUTA", dataIndex: "KODE_VALUTA", sortable: true, width: 75 },
        { header: "NDPBM", dataIndex: "NDPBM", sortable: true, width: 150 },
        { header: "TANGGAL_AJU", dataIndex: "TANGGAL_AJU", sortable: true, width: 150 },
        { header: "NOMOR_AJU", dataIndex: "NOMOR_AJU", sortable: true, width: 150 },
        { header: "NOMOR_DAFTAR", dataIndex: "NOMOR_DAFTAR", sortable: true, width: 150 },
        { header: "TANGGAL_DAFTAR", dataIndex: "TANGGAL_DAFTAR", sortable: true, width: 150 },
        { header: "ALAMAT_PEMILIK", dataIndex: "ALAMAT_PEMILIK", sortable: true, width: 150 },
        { header: "ALAMAT_PENERIMA_BARANG", dataIndex: "ALAMAT_PENERIMA_BARANG", sortable: true, width: 150 },
        { header: "ALAMAT_PENGIRIM", dataIndex: "ALAMAT_PENGIRIM", sortable: true, width: 150 },
        { header: "ALAMAT_PENGUSAHA", dataIndex: "ALAMAT_PENGUSAHA", sortable: true, width: 150 },
        { header: "ALAMAT_PPJK", dataIndex: "ALAMAT_PPJK", sortable: true, width: 150 },
        { header: "API_PEMILIK", dataIndex: "API_PEMILIK", sortable: true, width: 150 },
        { header: "API_PENERIMA", dataIndex: "API_PENERIMA", sortable: true, width: 150 },
        { header: "API_PENGUSAHA", dataIndex: "API_PENGUSAHA", sortable: true, width: 150 },
        { header: "ASAL_DATA", dataIndex: "ASAL_DATA", sortable: true, width: 150 },
        { header: "ASURANSI", dataIndex: "ASURANSI", sortable: true, width: 150 },
        { header: "BIAYA_TAMBAHAN", dataIndex: "BIAYA_TAMBAHAN", sortable: true },
        { header: "BRUTO", dataIndex: "BRUTO", sortable: true, width: 150 },
        { header: "DISKON", dataIndex: "DISKON", sortable: true, width: 150 },
        { header: "FLAG_PEMILIK", dataIndex: "FLAG_PEMILIK", sortable: true, width: 150 },
        { header: "FLAG_URL_DOKUMEN_PABEAN", dataIndex: "FLAG_URL_DOKUMEN_PABEAN", sortable: true, width: 150 },
        { header: "FREIGHT", dataIndex: "FREIGHT", sortable: true, width: 150 },
        { header: "HARGA_BARANG_LDP", dataIndex: "HARGA_BARANG_LDP", sortable: true, width: 150 },
        { header: "HARGA_INVOICE", dataIndex: "HARGA_INVOICE", sortable: true, width: 150 },
        { header: "HARGA_PENYERAHAN", dataIndex: "HARGA_PENYERAHAN", sortable: true, width: 150 },
        { header: "HARGA_TOTAL", dataIndex: "HARGA_TOTAL", sortable: true, width: 150 },
        { header: "ID_MODUL", dataIndex: "ID_MODUL", sortable: true, width: 150 },
        { header: "ID_PEMASOK", dataIndex: "ID_PEMASOK", sortable: true, width: 150 },
        { header: "ID_PEMILIK", dataIndex: "ID_PEMILIK", sortable: true, width: 150 },
        { header: "ID_PENERIMA_BARANG", dataIndex: "ID_PENERIMA_BARANG", sortable: true, width: 150 },
        { header: "ID_PENGIRIM", dataIndex: "ID_PENGIRIM", sortable: true, width: 150 },
        { header: "ID_PENGUSAHA", dataIndex: "ID_PENGUSAHA", sortable: true, width: 150 },
        { header: "ID_PPJK", dataIndex: "ID_PPJK", sortable: true, width: 150 },
        { header: "JABATAN_TTD", dataIndex: "JABATAN_TTD", sortable: true, width: 150 },
        { header: "JUMLAH_BARANG", dataIndex: "JUMLAH_BARANG", sortable: true, width: 150 },
        { header: "JUMLAH_KEMASAN", dataIndex: "JUMLAH_KEMASAN", sortable: true, width: 150 },
        { header: "JUMLAH_KONTAINER", dataIndex: "JUMLAH_KONTAINER", sortable: true, width: 150 },
        { header: "KESESUAIAN_DOKUMEN", dataIndex: "KESESUAIAN_DOKUMEN", sortable: true, width: 150 },
        { header: "KETERANGAN", dataIndex: "KETERANGAN", sortable: true, width: 150 },
        { header: "KODE_ASAL_BARANG", dataIndex: "KODE_ASAL_BARANG", sortable: true, width: 150 },
        { header: "KODE_ASURANSI", dataIndex: "KODE_ASURANSI", sortable: true, width: 150 },
        { header: "KODE_BENDERA", dataIndex: "KODE_BENDERA", sortable: true, width: 150 },
        { header: "KODE_CARA_ANGKUT", dataIndex: "KODE_CARA_ANGKUT", sortable: true, width: 150 },
        { header: "KODE_CARA_BAYAR", dataIndex: "KODE_CARA_BAYAR", sortable: true, width: 150 },
        { header: "KODE_DAERAH_ASAL", dataIndex: "KODE_DAERAH_ASAL", sortable: true, width: 150 },
        { header: "KODE_FASILITAS", dataIndex: "KODE_FASILITAS", sortable: true, width: 150 },
        { header: "KODE_FTZ", dataIndex: "KODE_FTZ", sortable: true, width: 150 },
        { header: "KODE_HARGA", dataIndex: "KODE_HARGA", sortable: true, width: 150 },
        { header: "KODE_ID_PEMASOK", dataIndex: "KODE_ID_PEMASOK", sortable: true, width: 150 },
        { header: "KODE_ID_PEMILIK", dataIndex: "KODE_ID_PEMILIK", sortable: true, width: 150 },
        { header: "KODE_ID_PENERIMA_BARANG", dataIndex: "KODE_ID_PENERIMA_BARANG", sortable: true, width: 150 },
        { header: "KODE_ID_PENGIRIM", dataIndex: "KODE_ID_PENGIRIM", sortable: true, width: 150 },
        { header: "KODE_ID_PENGUSAHA", dataIndex: "KODE_ID_PENGUSAHA", sortable: true, width: 150 },
        { header: "KODE_ID_PPJK", dataIndex: "KODE_ID_PPJK", sortable: true, width: 150 },
        { header: "KODE_JENIS_API", dataIndex: "KODE_JENIS_API", sortable: true, width: 150 },
        { header: "KODE_JENIS_API_PEMILIK", dataIndex: "KODE_JENIS_API_PEMILIK", sortable: true, width: 150 },
        { header: "KODE_JENIS_API_PENERIMA", dataIndex: "KODE_JENIS_API_PENERIMA", sortable: true, width: 150 },
        { header: "KODE_JENIS_API_PENGUSAHA", dataIndex: "KODE_JENIS_API_PENGUSAHA", sortable: true, width: 150 },
        { header: "KODE_JENIS_BARANG", dataIndex: "KODE_JENIS_BARANG", sortable: true, width: 150 },
        { header: "KODE_JENIS_BC25", dataIndex: "KODE_JENIS_BC25", sortable: true, width: 150 },
        { header: "KODE_JENIS_NILAI", dataIndex: "KODE_JENIS_NILAI", sortable: true, width: 150 },
        { header: "KODE_JENIS_PEMASUKAN01", dataIndex: "KODE_JENIS_PEMASUKAN01", sortable: true, width: 150 },
        { header: "KODE_JENIS_PEMASUKAN02", dataIndex: "KODE_JENIS_PEMASUKAN02", sortable: true, width: 150 },
        { header: "KODE_JENIS_TPB", dataIndex: "KODE_JENIS_TPB", sortable: true, width: 150 },
        { header: "KODE_KANTOR", dataIndex: "KODE_KANTOR", sortable: true, width: 150 },
        { header: "KODE_KANTOR_BONGKAR", dataIndex: "KODE_KANTOR_BONGKAR", sortable: true, width: 150 },
        { header: "KODE_KANTOR_TUJUAN", dataIndex: "KODE_KANTOR_TUJUAN", sortable: true, width: 150 },
        { header: "KODE_LOKASI_BAYAR", dataIndex: "KODE_LOKASI_BAYAR", sortable: true, width: 150 },
        { header: "KODE_NEGARA_PEMASOK", dataIndex: "KODE_NEGARA_PEMASOK", sortable: true, width: 150 },
        { header: "KODE_NEGARA_PEMILIK", dataIndex: "KODE_NEGARA_PEMILIK", sortable: true, width: 150 },
        { header: "KODE_NEGARA_PENGIRIM", dataIndex: "KODE_NEGARA_PENGIRIM", sortable: true, width: 150 },
        { header: "KODE_NEGARA_TUJUAN", dataIndex: "KODE_NEGARA_TUJUAN", sortable: true, width: 150 },
        { header: "KODE_PEL_BONGKAR", dataIndex: "KODE_PEL_BONGKAR", sortable: true, width: 150 },
        { header: "KODE_PEL_MUAT", dataIndex: "KODE_PEL_MUAT", sortable: true, width: 150 },
        { header: "KODE_PEL_TRANSIT", dataIndex: "KODE_PEL_TRANSIT", sortable: true, width: 150 },
        { header: "KODE_PEMBAYAR", dataIndex: "KODE_PEMBAYAR", sortable: true, width: 150 },
        { header: "KODE_STATUS", dataIndex: "KODE_STATUS", sortable: true, width: 150 },
        { header: "KODE_STATUS_PENGUSAHA", dataIndex: "KODE_STATUS_PENGUSAHA", sortable: true, width: 150 },
        { header: "KODE_STATUS_PERBAIKAN", dataIndex: "KODE_STATUS_PERBAIKAN", sortable: true, width: 150 },
        { header: "KODE_TPS", dataIndex: "KODE_TPS", sortable: true, width: 150 },
        { header: "KODE_TUJUAN_PEMASUKAN", dataIndex: "KODE_TUJUAN_PEMASUKAN", sortable: true, width: 150 },
        { header: "KODE_TUJUAN_PENGIRIMAN", dataIndex: "KODE_TUJUAN_PENGIRIMAN", sortable: true, width: 150 },
        { header: "KODE_TUJUAN_TPB", dataIndex: "KODE_TUJUAN_TPB", sortable: true, width: 150 },
        { header: "KODE_TUTUP_PU", dataIndex: "KODE_TUTUP_PU", sortable: true, width: 150 },
        { header: "KOTA_TTD", dataIndex: "KOTA_TTD", sortable: true, width: 150 },
        { header: "LOKASI_ASAL", dataIndex: "LOKASI_ASAL", sortable: true, width: 150 },
        { header: "LOKASI_TUJUAN", dataIndex: "LOKASI_TUJUAN", sortable: true, width: 150 },
        { header: "NAMA_PEMILIK", dataIndex: "NAMA_PEMILIK", sortable: true, width: 150 },
        { header: "NAMA_PENERIMA_BARANG", dataIndex: "NAMA_PENERIMA_BARANG", sortable: true, width: 150 },
        { header: "NAMA_PENGANGKUT", dataIndex: "NAMA_PENGANGKUT", sortable: true, width: 150 },
        { header: "NAMA_PENGIRIM", dataIndex: "NAMA_PENGIRIM", sortable: true, width: 150 },
        { header: "NAMA_PENGUSAHA", dataIndex: "NAMA_PENGUSAHA", sortable: true, width: 150 },
        { header: "NAMA_PPJK", dataIndex: "NAMA_PPJK", sortable: true, width: 150 },
        { header: "NAMA_TTD", dataIndex: "NAMA_TTD", sortable: true, width: 150 },
        { header: "NETTO", dataIndex: "NETTO", sortable: true, width: 150 },
        { header: "NILAI_INCOTERM", dataIndex: "NILAI_INCOTERM", sortable: true, width: 150 },
        { header: "NIPER_PENERIMA", dataIndex: "NIPER_PENERIMA", sortable: true, width: 150 },
        { header: "NOMOR_API", dataIndex: "NOMOR_API", sortable: true, width: 150 },
        { header: "NOMOR_BC11", dataIndex: "NOMOR_BC11", sortable: true, width: 150 },
        { header: "NOMOR_BILLING", dataIndex: "NOMOR_BILLING", sortable: true, width: 150 },
        { header: "NOMOR_IJIN_BPK_PEMASOK", dataIndex: "NOMOR_IJIN_BPK_PEMASOK", sortable: true, width: 150 },
        { header: "NOMOR_IJIN_BPK_PENGUSAHA", dataIndex: "NOMOR_IJIN_BPK_PENGUSAHA", sortable: true, width: 150 },
        { header: "NOMOR_IJIN_TPB", dataIndex: "NOMOR_IJIN_TPB", sortable: true, width: 150 },
        { header: "NOMOR_IJIN_TPB_PENERIMA", dataIndex: "NOMOR_IJIN_TPB_PENERIMA", sortable: true, width: 150 },
        { header: "NOMOR_POLISI", dataIndex: "NOMOR_POLISI", sortable: true, width: 150 },
        { header: "NOMOR_VOY_FLIGHT", dataIndex: "NOMOR_VOY_FLIGHT", sortable: true, width: 150 },
        { header: "NPPPJK", dataIndex: "NPPPJK", sortable: true, width: 150 },
        { header: "NPWP_BILLING", dataIndex: "NPWP_BILLING", sortable: true, width: 150 },
        { header: "POS_BC11", dataIndex: "POS_BC11", sortable: true, width: 150 },
        { header: "SERI", dataIndex: "SERI", sortable: true, width: 150 },
        { header: "SUBPOS_BC11", dataIndex: "SUBPOS_BC11", sortable: true, width: 150 },
        { header: "SUBSUBPOS_BC11", dataIndex: "SUBSUBPOS_BC11", sortable: true, width: 150 },
        { header: "TANGGAL_BC11", dataIndex: "TANGGAL_BC11", sortable: true, width: 150 },
        { header: "TANGGAL_BERANGKAT", dataIndex: "TANGGAL_BERANGKAT", sortable: true, width: 150 },
        { header: "TANGGAL_BILLING", dataIndex: "TANGGAL_BILLING", sortable: true, width: 150 },
        { header: "TANGGAL_IJIN_BPK_PEMASOK", dataIndex: "TANGGAL_IJIN_BPK_PEMASOK", sortable: true, width: 150 },
        { header: "TANGGAL_IJIN_BPK_PENGUSAHA", dataIndex: "TANGGAL_IJIN_BPK_PENGUSAHA", sortable: true, width: 150 },
        { header: "TANGGAL_IJIN_TPB", dataIndex: "TANGGAL_IJIN_TPB", sortable: true, width: 150 },
        { header: "TANGGAL_NPPPJK", dataIndex: "TANGGAL_NPPPJK", sortable: true, width: 150 },
        { header: "TANGGAL_TIBA", dataIndex: "TANGGAL_TIBA", sortable: true, width: 150 },
        { header: "TANGGAL_TTD", dataIndex: "TANGGAL_TTD", sortable: true, width: 150 },
        { header: "TGL_JATUH_TEMPO_BILLING", dataIndex: "TGL_JATUH_TEMPO_BILLING", sortable: true, width: 150 },
        { header: "TOTAL_BAYAR", dataIndex: "TOTAL_BAYAR", sortable: true, width: 150 },
        { header: "TOTAL_BEBAS", dataIndex: "TOTAL_BEBAS", sortable: true, width: 150 },
        { header: "TOTAL_DILUNASI", dataIndex: "TOTAL_DILUNASI", sortable: true, width: 150 },
        { header: "TOTAL_JAMIN", dataIndex: "TOTAL_JAMIN", sortable: true, width: 150 },
        { header: "TOTAL_SUDAH_DILUNASI", dataIndex: "TOTAL_SUDAH_DILUNASI", sortable: true, width: 150 },
        { header: "TOTAL_TANGGUH", dataIndex: "TOTAL_TANGGUH", sortable: true, width: 150 },
        { header: "TOTAL_TANGGUNG", dataIndex: "TOTAL_TANGGUNG", sortable: true, width: 150 },
        { header: "TOTAL_TIDAK_DIPUNGUT", dataIndex: "TOTAL_TIDAK_DIPUNGUT", sortable: true, width: 150 },
        { header: "URL_DOKUMEN_PABEAN", dataIndex: "URL_DOKUMEN_PABEAN", sortable: true, width: 150 },
        { header: "VERSI_MODUL", dataIndex: "VERSI_MODUL", sortable: true, width: 150 },
        { header: "VOLUME", dataIndex: "VOLUME", sortable: true, width: 150 },
        { header: "WAKTU_BONGKAR", dataIndex: "WAKTU_BONGKAR", sortable: true, width: 150 },
        { header: "WAKTU_STUFFING", dataIndex: "WAKTU_STUFFING", sortable: true, width: 150 },
        { header: "TANGGAL_MUAT", dataIndex: "TANGGAL_MUAT", sortable: true, width: 150 },
        { header: "TEMPAT_STUFFING", dataIndex: "TEMPAT_STUFFING", sortable: true, width: 150 },
        { header: "CALL_SIGN", dataIndex: "CALL_SIGN", sortable: true, width: 150 },
        { header: "JUMLAH_TANDA_PENGAMAN", dataIndex: "JUMLAH_TANDA_PENGAMAN", sortable: true, width: 150 },
        { header: "KODE_JENIS_TANDA_PENGAMAN", dataIndex: "KODE_JENIS_TANDA_PENGAMAN", sortable: true, width: 150 },
        { header: "KODE_KANTOR_MUAT", dataIndex: "KODE_KANTOR_MUAT", sortable: true, width: 150 },
        { header: "KODE_PEL_TUJUAN", dataIndex: "KODE_PEL_TUJUAN", sortable: true, width: 150 },
        { header: "TANGGAL_STUFFING", dataIndex: "TANGGAL_STUFFING", sortable: true, width: 150 },
        { header: "KODE_GUDANG_ASAL", dataIndex: "KODE_GUDANG_ASAL", sortable: true, width: 150 },
        { header: "KODE_GUDANG_TUJUAN", dataIndex: "KODE_GUDANG_TUJUAN", sortable: true, width: 150 },
      ],
      dockedItems: [
        {
          xtype: "toolbar",
          height: 25,
          dock: "top",
          items: ["-", { xtype: "component", html: "Dokumen Header" }],
          // other options....
        },
      ],
      bbar: {
        xtype: "pagingtoolbar",
        displayInfo: true,
        displayMsg: "Total Data {2}",
        emptyMsg: "No topics to display",
      },
    },
    { xtype: "tbspacer", height: 5 },
    {
      xtype: "container",
      flex: 1,
      layout: { type: "hbox", pack: "start", align: "stretch" },
      items: [
        {
          xtype: "grid",
          pid: "GRIDdokumenpabean_detail",
          emptyText: "No Matching Records",
          autoScroll: true,
          title: "",
          flex: 1,
          plugins: ["filterfield"],
          viewConfig: {
            enableTextSelection: true,
          },
          store: {
            autoLoad: true,
            remoteSort: false,
            remoteFilter: false,
            pageSize: 0,
            proxy: {
              type: "ajax",
              disableCaching: false,
              noCache: false,
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
              actionMethods: { read: "POST" },
              url: vconfig.service_api + "sync_doc/sync_docs",
              extraParams: {
                method: "read_dokumenpabean_detail",
                module: "coo",
              },
              reader: {
                type: "json",
                rootProperty: "Rows",
                totalProperty: "TotalRows",
                successProperty: "success",
              },
            },
            listeners: {
              beforeload: function (store, operation, eOpts) {
                try {
                  var GRID = Ext.ComponentQuery.query("sync_doc_kurir20 GRIDsync_doc_kurir20 grid[pid=GRIDsync_doc_kurir20]")[0];
                  var vdt = GRID.getSelectionModel().getSelection()[0].data;
                  operation.setParams({
                    INVOICE_NO: vdt.INVOICE_NO,
                  });
                } catch (ex) {
                  COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                }
              },
            },
          },
          columns: [
            { xtype: "rownumberer", width: 40 },
            { header: "KODE_BARANG", dataIndex: "KODE_BARANG", sortable: true, width: 75, filter: { xtype: "textfield" } },
            { header: "TIPE", dataIndex: "TIPE", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "URAIAN", dataIndex: "URAIAN", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "CIF", dataIndex: "CIF", sortable: true, align: "right", renderer: "formatamount", width: 75, filter: { xtype: "textfield" } },
            { header: "CIF_RUPIAH", dataIndex: "CIF_RUPIAH", sortable: true, align: "right", renderer: "formatamount", width: 85, filter: { xtype: "textfield" } },
            { header: "JUMLAH_SATUAN", dataIndex: "JUMLAH_SATUAN", sortable: true, width: 90, align: "right", renderer: "formatqty", filter: { xtype: "textfield" } },
            { header: "HARGA_SATUAN", dataIndex: "HARGA_SATUAN", sortable: true, width: 90, align: "right", renderer: "formatamount", filter: { xtype: "textfield" } },
            { header: "HARGA_INVOICE", dataIndex: "HARGA_INVOICE", sortable: true, width: 75, align: "right", renderer: "formatamount", filter: { xtype: "textfield" } },
            { header: "ASURANSI", dataIndex: "ASURANSI", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "DISKON", dataIndex: "DISKON", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "FLAG_KENDARAAN", dataIndex: "FLAG_KENDARAAN", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "FOB", dataIndex: "FOB", sortable: true, width: 150, align: "right", renderer: "formatamount", filter: { xtype: "textfield" } },
            { header: "FREIGHT", dataIndex: "FREIGHT", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "HARGA_BARANG_LDP", dataIndex: "HARGA_BARANG_LDP", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "HARGA_PENYERAHAN", dataIndex: "HARGA_PENYERAHAN", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "JENIS_KENDARAAN", dataIndex: "JENIS_KENDARAAN", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "JUMLAH_BAHAN_BAKU", dataIndex: "JUMLAH_BAHAN_BAKU", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "JUMLAH_KEMASAN", dataIndex: "JUMLAH_KEMASAN", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "KAPASITAS_SILINDER", dataIndex: "KAPASITAS_SILINDER", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "KATEGORI_BARANG", dataIndex: "KATEGORI_BARANG", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "KODE_ASAL_BARANG", dataIndex: "KODE_ASAL_BARANG", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "KODE_FASILITAS_DOKUMEN", dataIndex: "KODE_FASILITAS_DOKUMEN", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "KODE_GUNA", dataIndex: "KODE_GUNA", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "KODE_JENIS_NILAI", dataIndex: "KODE_JENIS_NILAI", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "KODE_KEMASAN", dataIndex: "KODE_KEMASAN", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "KODE_LEBIH_DARI4TAHUN", dataIndex: "KODE_LEBIH_DARI4TAHUN", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "KODE_NEGARA_ASAL", dataIndex: "KODE_NEGARA_ASAL", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "KODE_SATUAN", dataIndex: "KODE_SATUAN", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "KODE_SKEMA_TARIF", dataIndex: "KODE_SKEMA_TARIF", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "KODE_STATUS", dataIndex: "KODE_STATUS", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "KONDISI_BARANG", dataIndex: "KONDISI_BARANG", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "MERK", dataIndex: "MERK", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "NETTO", dataIndex: "NETTO", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "NILAI_INCOTERM", dataIndex: "NILAI_INCOTERM", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "NILAI_PABEAN", dataIndex: "NILAI_PABEAN", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "NOMOR_MESIN", dataIndex: "NOMOR_MESIN", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "NOMOR_RANGKA", dataIndex: "NOMOR_RANGKA", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "POS_TARIF", dataIndex: "POS_TARIF", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "SERI_BARANG", dataIndex: "SERI_BARANG", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "SERI_IJIN", dataIndex: "SERI_IJIN", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "SERI_POS_TARIF", dataIndex: "SERI_POS_TARIF", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "SPESIFIKASI_LAIN", dataIndex: "SPESIFIKASI_LAIN", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "TAHUN_PEMBUATAN", dataIndex: "TAHUN_PEMBUATAN", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "UKURAN", dataIndex: "UKURAN", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "VOLUME", dataIndex: "VOLUME", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "ID_HEADER", dataIndex: "ID_HEADER", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "ID_EKSPORTIR", dataIndex: "ID_EKSPORTIR", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "NAMA_EKSPORTIR", dataIndex: "NAMA_EKSPORTIR", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "ALAMAT_EKSPORTIR", dataIndex: "ALAMAT_EKSPORTIR", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "KODE_PERHITUNGAN", dataIndex: "KODE_PERHITUNGAN", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "SERI_BARANG_DOK_ASAL", dataIndex: "SERI_BARANG_DOK_ASAL", sortable: true, width: 150, filter: { xtype: "textfield" } },
          ],
          dockedItems: [
            {
              xtype: "toolbar",
              height: 25,
              dock: "top",
              items: ["-", { xtype: "component", html: "Item/Part Material" }],
              // other options....
            },
          ],
          bbar: {
            xtype: "pagingtoolbar",
            displayInfo: true,
            displayMsg: "Total Data {2}",
            emptyMsg: "No topics to display",
          },
        },
        { xtype: "tbspacer", width: 5 },
        {
          xtype: "grid",
          pid: "GRIDdokumenpabean_lampiran",
          emptyText: "No Matching Records",
          autoScroll: true,
          title: "",
          width: 400,
          plugins: ["filterfield"],
          viewConfig: {
            enableTextSelection: true,
          },
          store: {
            autoLoad: true,
            remoteSort: false,
            remoteFilter: false,
            pageSize: 0,
            proxy: {
              type: "ajax",
              disableCaching: false,
              noCache: false,
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
              actionMethods: { read: "POST" },
              url: vconfig.service_api + "sync_doc/sync_docs",
              extraParams: {
                method: "read_dokumenpabean_lampiran",
                module: "coo",
              },
              reader: {
                type: "json",
                rootProperty: "Rows",
                totalProperty: "TotalRows",
                successProperty: "success",
              },
            },
            listeners: {
              beforeload: function (store, operation, eOpts) {
                try {
                  var GRID = Ext.ComponentQuery.query("sync_doc_kurir20 GRIDsync_doc_kurir20 grid[pid=GRIDsync_doc_kurir20]")[0];
                  var vdt = GRID.getSelectionModel().getSelection()[0].data;
                  operation.setParams({
                    INVOICE_NO: vdt.INVOICE_NO,
                  });
                } catch (ex) {
                  COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                }
              },
            },
          },
          columns: [
            { xtype: "rownumberer", width: 40 },
            { header: "KODE", dataIndex: "KODE_JENIS_DOKUMEN", sortable: true, width: 50, filter: { xtype: "textfield" } },
            { header: "DOKUMEN", dataIndex: "NOMOR_DOKUMEN", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "TGL", dataIndex: "TANGGAL_DOKUMEN", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "URAIAN", dataIndex: "URAIAN_DOKUMEN", sortable: true, width: 100, filter: { xtype: "textfield" } },
          ],
          dockedItems: [
            {
              xtype: "toolbar",
              height: 25,
              dock: "top",
              items: ["-", { xtype: "component", html: "Dokumen Lampiran" }],
              // other options....
            },
          ],
          bbar: {
            xtype: "pagingtoolbar",
            displayInfo: true,
            displayMsg: "Total Data {2}",
            emptyMsg: "No topics to display",
          },
        },
      ],
    },
  ],
});
