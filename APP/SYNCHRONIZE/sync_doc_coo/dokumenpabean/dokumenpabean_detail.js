Ext.define("TDK.SYNCHRONIZE.sync_doc_coo.dokumenpabean.dokumenpabean_detail", {
  extend: "Ext.form.Panel",
  alias: "widget.dokumenpabean_detail",
  reference: "dokumenpabean_detail",
  frame: false,
  border: true,
  autoScroll: true,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: ["TDK.SYNCHRONIZE.sync_doc_coo.dokumenpabean.Cdokumenpabean"],
  controller: "Cdokumenpabean",
  fieldDefaults: {
    labelAlign: "left",
    labelWidth: 90,
    margin: "0 10 5 0",
  },
  items: [
    {
      xtype: "grid",
      pid: "GRIDdokumenpabean_detail",
      emptyText: "No Matching Records",
      autoScroll: true,
      flex: 1,
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
              var GRID = Ext.ComponentQuery.query("sync_doc_coo GRIDsync_doc_coo grid[pid=GRIDsync_doc_coo]")[0];
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

      plugins: ["filterfield"],
      viewConfig: {
        enableTextSelection: true,
      },
      columns: [
        { xtype: "rownumberer", width: 50 },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE_BARANG", dataIndex: "KODE_BARANG" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "SERI_BARANG", dataIndex: "SERI_BARANG" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TIPE", dataIndex: "TIPE" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "UKURAN", dataIndex: "UKURAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "URAIAN", dataIndex: "URAIAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "JUMLAH_SATUAN", align: "right", renderer: "formatamount", dataIndex: "JUMLAH_SATUAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "HARGA_SATUAN", align: "right", renderer: "formatamount", dataIndex: "HARGA_SATUAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE_SATUAN", dataIndex: "KODE_SATUAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "JUMLAH_KEMASAN", align: "right", renderer: "formatamount", dataIndex: "JUMLAH_KEMASAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE_KEMASAN", dataIndex: "KODE_KEMASAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "ASURANSI", dataIndex: "ASURANSI" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "CIF", align: "right", renderer: "formatamount", dataIndex: "CIF" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "CIF_RUPIAH", align: "right", renderer: "formatamount", dataIndex: "CIF_RUPIAH" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "DISKON", align: "right", renderer: "formatamount", dataIndex: "DISKON" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "FOB", align: "right", renderer: "formatamount", dataIndex: "FOB" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "FREIGHT", align: "right", renderer: "formatamount", dataIndex: "FREIGHT" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "HARGA_BARANG_LDP", align: "right", renderer: "formatamount", dataIndex: "HARGA_BARANG_LDP" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "HARGA_INVOICE", align: "right", renderer: "formatamount", dataIndex: "HARGA_INVOICE" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "HARGA_PENYERAHAN", align: "right", renderer: "formatamount", dataIndex: "HARGA_PENYERAHAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "JENIS_KENDARAAN", dataIndex: "JENIS_KENDARAAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "FLAG_KENDARAAN", dataIndex: "FLAG_KENDARAAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "JUMLAH_BAHAN_BAKU", align: "right", renderer: "formatamount", dataIndex: "JUMLAH_BAHAN_BAKU" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KAPASITAS_SILINDER", dataIndex: "KAPASITAS_SILINDER" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KATEGORI_BARANG", dataIndex: "KATEGORI_BARANG" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE_ASAL_BARANG", dataIndex: "KODE_ASAL_BARANG" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE_FASILITAS_DOKUMEN", dataIndex: "KODE_FASILITAS_DOKUMEN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE_GUNA", dataIndex: "KODE_GUNA" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE_JENIS_NILAI", dataIndex: "KODE_JENIS_NILAI" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE_LEBIH_DARI4TAHUN", dataIndex: "KODE_LEBIH_DARI4TAHUN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE_NEGARA_ASAL", dataIndex: "KODE_NEGARA_ASAL" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE_SKEMA_TARIF", dataIndex: "KODE_SKEMA_TARIF" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE_STATUS", dataIndex: "KODE_STATUS" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KONDISI_BARANG", dataIndex: "KONDISI_BARANG" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "MERK", dataIndex: "MERK" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NETTO", align: "right", renderer: "formatamount", dataIndex: "NETTO" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NILAI_INCOTERM", align: "right", renderer: "formatamount", dataIndex: "NILAI_INCOTERM" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NILAI_PABEAN", align: "right", renderer: "formatamount", dataIndex: "NILAI_PABEAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NOMOR_MESIN", dataIndex: "NOMOR_MESIN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NOMOR_RANGKA", dataIndex: "NOMOR_RANGKA" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "POS_TARIF", dataIndex: "POS_TARIF" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "SERI_IJIN", dataIndex: "SERI_IJIN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "SERI_POS_TARIF", dataIndex: "SERI_POS_TARIF" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "SPESIFIKASI_LAIN", dataIndex: "SPESIFIKASI_LAIN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TAHUN_PEMBUATAN", dataIndex: "TAHUN_PEMBUATAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "VOLUME", dataIndex: "VOLUME" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "ID_HEADER", dataIndex: "ID_HEADER" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "ID_EKSPORTIR", dataIndex: "ID_EKSPORTIR" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NAMA_EKSPORTIR", dataIndex: "NAMA_EKSPORTIR" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "ALAMAT_EKSPORTIR", dataIndex: "ALAMAT_EKSPORTIR" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE_PERHITUNGAN", dataIndex: "KODE_PERHITUNGAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "SERI_BARANG_DOK_ASAL", dataIndex: "SERI_BARANG_DOK_ASAL" },
      ],
      bbar: {
        xtype: "pagingtoolbar",
        displayInfo: true,
        displayMsg: "Displaying topics {0} - {1} of {2}",
        emptyMsg: "No topics to display",
      },
    },
  ],
  dockedItems: [
    {
      xtype: "toolbar",
      height: 30,
      dock: "top",
      items: [
        "-",
        {
          xtype: "button",
          pid: "btrefresh",
          text: "Refresh",
          icon: vconfig.getstyle + "icon/update.ico",
          tooltip: "Refresh Data",
          handler: function () {
            var GRID = Ext.ComponentQuery.query("dokumenpabean_detail grid[pid=GRIDdokumenpabean_detail]")[0];
            GRID.getStore().load();
          },
        },
      ],
      // other options....
    },
  ],
});
