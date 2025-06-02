Ext.define("TDK.SYNCHRONIZE.sync_bc_out.ceisa_data.dokumen_bahan_baku_detail", {
  extend: "Ext.form.Panel",
  alias: "widget.dokumen_bahan_baku_detail",
  reference: "dokumen_bahan_baku_detail",
  frame: false,
  border: true,
  autoScroll: true,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: ["TDK.SYNCHRONIZE.sync_bc_out.ceisa_data.Cceisa_data"],
  controller: "Cceisa_data",
  fieldDefaults: {
    labelAlign: "left",
    labelWidth: 90,
    margin: "0 10 5 0",
  },
  items: [
    {
      xtype: "grid",
      pid: "GRIDdokumen_bahan_baku_detail",
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
          url: vconfig.service_api + "sync_bc_out/sync_bc_outs",
          extraParams: {
            method: "read_dokumen_bahan_baku_detail",
            module: "ceisa",
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
              var GRID = Ext.ComponentQuery.query("sync_bc_out GRIDsync_bc_out grid[pid=GRIDsync_bc_out]")[0];
              var vdt = GRID.getSelectionModel().getSelection()[0].data;
              operation.setParams({
                NOMOR_DOKUMEN: vdt.NOMOR_DOKUMEN,
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
        { header: "ID", dataIndex:"ID", sortable: true, width: 80, filter: { xtype: "textfield" }, hidden: true, },
        { header: "KODE ASAL BAHAN BAKU", dataIndex:"KODE_ASAL_BAHAN_BAKU", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "ID BARANG", dataIndex:"ID_BARANG", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "SERI BARANG", dataIndex:"SERI_BARANG", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "TIPE", dataIndex:"TIPE", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "UKURAN", dataIndex:"UKURAN", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "URAIAN", dataIndex:"URAIAN", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "JUMLAH SATUAN", align: "right", renderer: "formatamount", dataIndex:"JUMLAH_SATUAN", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "JENIS SATUAN", dataIndex:"JENIS_SATUAN", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "CIF", align: "right", renderer: "formatamount", dataIndex:"CIF", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "CIF RUPIAH", align: "right", renderer: "formatamount", dataIndex:"CIF_RUPIAH", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "HARGA PENYERAHAN", align: "right", renderer: "formatamount", dataIndex:"HARGA_PENYERAHAN", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "HARGA PEROLEHAN", align: "right", renderer: "formatamount", dataIndex:"HARGA_PEROLEHAN", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "KODE BARANG", dataIndex:"KODE_BARANG", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "KODE FASILITAS DOKUMEN", dataIndex:"KODE_FASILITAS_DOKUMEN", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "KODE JENIS DOK ASAL", dataIndex:"KODE_JENIS_DOK_ASAL", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "KODE KANTOR", dataIndex:"KODE_KANTOR", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "KODE SKEMA TARIF", dataIndex:"KODE_SKEMA_TARIF", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "KODE STATUS", dataIndex:"KODE_STATUS", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "MERK", dataIndex:"MERK", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "NDPBM", align: "right", renderer: "formatamount", dataIndex:"NDPBM", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "NETTO", align: "right", renderer: "formatamount", dataIndex:"NETTO", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "NOMOR AJU DOK ASAL", dataIndex:"NOMOR_AJU_DOK_ASAL", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "NOMOR DAFTAR DOK ASAL", dataIndex:"NOMOR_DAFTAR_DOK_ASAL", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "POS TARIF", dataIndex:"POS_TARIF", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "SERI BAHAN BAKU", dataIndex:"SERI_BAHAN_BAKU", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "SERI IJIN", dataIndex:"SERI_IJIN", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "SERI BARANG DOK ASAL", dataIndex:"SERI_BARANG_DOK_ASAL", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "SPESIFIKASI LAIN", dataIndex:"SPESIFIKASI_LAIN", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "TANGGAL DAFTAR DOK ASAL", dataIndex:"TANGGAL_DAFTAR_DOK_ASAL", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "ID HEADER", dataIndex:"ID_HEADER", sortable: true, width: 100, filter: { xtype: "textfield" } },
      ],
      bbar: ["-"],
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
            var GRID = Ext.ComponentQuery.query("dokumen_bahan_baku_detail grid[pid=GRIDdokumen_bahan_baku_detail]")[0];
            GRID.getStore().load();
          },
        },
      ],
      // other options....
    },
  ],
});
