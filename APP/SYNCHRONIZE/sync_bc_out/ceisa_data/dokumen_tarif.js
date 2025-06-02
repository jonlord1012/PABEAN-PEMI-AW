Ext.define("TDK.SYNCHRONIZE.sync_bc_out.ceisa_data.dokumen_tarif", {
  extend: "Ext.form.Panel",
  alias: "widget.dokumen_tarif",
  reference: "dokumen_tarif",
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
      pid: "GRIDdokumen_tarif",
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
            method: "read_dokumen_tarif",
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
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "ID_BARANG", dataIndex: "ID_BARANG" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "SERI_BARANG", dataIndex: "SERI_BARANG" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "JUMLAH_SATUAN", align: "right", renderer: "formatamount", dataIndex: "JUMLAH_SATUAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE_SATUAN", dataIndex: "KODE_SATUAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TARIF", align: "right", renderer: "formatamount", dataIndex: "TARIF" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "JENIS_TARIF", dataIndex: "JENIS_TARIF" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NILAI_BAYAR", align: "right", renderer: "formatamount", dataIndex: "NILAI_BAYAR" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NILAI_FASILITAS", align: "right", renderer: "formatamount", dataIndex: "NILAI_FASILITAS" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NILAI_SUDAH_DILUNASI", align: "right", renderer: "formatamount", dataIndex: "NILAI_SUDAH_DILUNASI" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TARIF_FASILITAS", align: "right", renderer: "formatamount", dataIndex: "TARIF_FASILITAS" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE_TARIF", dataIndex: "KODE_TARIF" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE_FASILITAS", dataIndex: "KODE_FASILITAS" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE_KOMODITI_CUKAI", dataIndex: "KODE_KOMODITI_CUKAI" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE_SUB_KOMODITI_CUKAI", dataIndex: "KODE_SUB_KOMODITI_CUKAI" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "FLAG_BMT_SEMENTARA", dataIndex: "FLAG_BMT_SEMENTARA" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "ID_HEADER", dataIndex: "ID_HEADER" },
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
            var GRID = Ext.ComponentQuery.query("dokumen_tarif grid[pid=GRIDdokumen_tarif]")[0];
            GRID.getStore().load();
          },
        },
      ],
      // other options....
    },
  ],
});
