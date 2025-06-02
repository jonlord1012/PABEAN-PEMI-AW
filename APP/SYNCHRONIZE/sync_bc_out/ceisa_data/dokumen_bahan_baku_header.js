Ext.define("TDK.SYNCHRONIZE.sync_bc_out.ceisa_data.dokumen_bahan_baku_header", {
  extend: "Ext.form.Panel",
  alias: "widget.dokumen_bahan_baku_header",
  reference: "dokumen_bahan_baku_header",
  frame: false,
  border: true,
  autoScroll: true,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
  fieldDefaults: {
    labelAlign: "left",
    labelWidth: 90,
    margin: "0 10 5 0",
  },
  items: [
    {
      xtype: "grid",
      pid: "GRIDdokumen_bahan_baku_header",
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
            method: "read_dokumen_bahan_baku_header",
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
        { header: "SERI DOKUMEN", dataIndex:"SERI_DOKUMEN", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "ID BAHAN BAKU", dataIndex:"ID_BAHAN_BAKU", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "ID BARANG", dataIndex:"ID_BARANG", sortable: true, width: 100, filter: { xtype: "textfield" } },
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
            var GRID = Ext.ComponentQuery.query("dokumen_bahan_baku_header grid[pid=GRIDdokumen_bahan_baku_header]")[0];
            GRID.getStore().load();
          },
        },
      ],
      // other options....
    },
  ],
});
