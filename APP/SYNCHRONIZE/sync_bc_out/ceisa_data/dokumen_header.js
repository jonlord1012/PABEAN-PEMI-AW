Ext.define("TDK.SYNCHRONIZE.sync_bc_out.ceisa_data.dokumen_header", {
  extend: "Ext.form.Panel",
  alias: "widget.dokumen_header",
  reference: "dokumen_header",
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
      pid: "GRIDdokumen_header",
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
            method: "read_dokumen_header",
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
        { sortable: true, width: 300, filter: { xtype: "textfield" }, header: "NAMA KOLOM", dataIndex: "FIELDNAME" },
        { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "VALUE", dataIndex: "VALUENAME" },
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
            var GRID = Ext.ComponentQuery.query("dokumen_header grid[pid=GRIDdokumen_header]")[0];
            GRID.getStore().load();
          },
        },
      ],
      // other options....
    },
  ],
});
