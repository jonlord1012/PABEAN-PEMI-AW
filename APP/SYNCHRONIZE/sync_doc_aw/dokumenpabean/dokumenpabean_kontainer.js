Ext.define("NJC.SYNCHRONIZE.sync_doc_aw.dokumenpabean.dokumenpabean_kontainer", {
  extend: "Ext.form.Panel",
  alias: "widget.dokumenpabean_kontainer",
  reference: "dokumenpabean_kontainer",
  frame: false,
  border: true,
  autoScroll: false,
  closeAction: "destroy",
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
      pid: "GRIDdokumenpabean_kontainer",
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
          headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "sync_doc_aw/sync_doc_aws",
          extraParams: {
            method: "read_dokumenpabean_kontainer",
            // module: "aw",
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
              var GRID = Ext.ComponentQuery.query("sync_doc_aw GRIDsync_doc_aw grid[pid=GRIDsync_doc_aw]")[0];
              var vdt = GRID.getSelectionModel().getSelection()[0].data;
              operation.setParams({
                INVOICE_NO: vdt.INVOICE_NO,
                NOMOR_AJU: vdt.NOMOR_AJU
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
        { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "NOMOR_KONTAINER", dataIndex: "NOMOR_KONTAINER" },
        { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "KODE_UKURAN_KONTAINER", dataIndex: "KODE_UKURAN_KONTAINER" },
        { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "KODE_JENIS_KONTAINER", dataIndex: "KODE_JENIS_KONTAINER" },
        { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "KODE_TIPE_KONTAINER", dataIndex: "KODE_TIPE_KONTAINER" },
        { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "SERI_BARANG", dataIndex: "SERI_BARANG" },
        { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "SERI", dataIndex: "SERI" },
        { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "TRANSID", dataIndex: "TRANSID" },
        { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "ID_HEADER", dataIndex: "ID_HEADER" },
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
            var GRID = Ext.ComponentQuery.query("dokumenpabean_kontainer grid[pid=GRIDdokumenpabean_kontainer]")[0];
            GRID.getStore().load();
          },
        },
      ],
      // other options....
    },
  ],
});
