Ext.define("TDK.SYNCHRONIZE.sync_doc_molts.dokumenceisa.dokumenceisa_lampiran", {
  extend: "Ext.form.Panel",
  alias: "widget.dokumenceisa_lampiran",
  reference: "dokumenceisa_lampiran",
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
      pid: "GRIDdokumenceisa_lampiran",
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
          url: vconfig.service_api + "sync_bc_in/sync_bc_ins",
          extraParams: {
            method: "read_dokumen_lampiran",
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
              var GRID = Ext.ComponentQuery.query("sync_doc_molts GRIDsync_doc_molts grid[pid=GRIDsync_doc_molts]")[0];
              var vdt = GRID.getSelectionModel().getSelection()[0].data;
              operation.setParams({
                NOMOR_DOKUMEN: vdt.INVOICE_NO,
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
        { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "FLAG_URL_DOKUMEN", dataIndex: "FLAG_URL_DOKUMEN" },
        { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "KODE_JENIS_DOKUMEN", dataIndex: "KODE_JENIS_DOKUMEN" },
        { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "URAIAN_DOKUMEN", dataIndex: "URAIAN_DOKUMEN" },
        { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "NOMOR_DOKUMEN", dataIndex: "NOMOR_DOKUMEN" },
        { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "SERI_DOKUMEN", dataIndex: "SERI_DOKUMEN" },
        { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "TANGGAL_DOKUMEN", dataIndex: "TANGGAL_DOKUMEN" },
        { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "TIPE_DOKUMEN", dataIndex: "TIPE_DOKUMEN" },
        { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "URL_DOKUMEN", dataIndex: "URL_DOKUMEN" },
        { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "ID_HEADER", dataIndex: "ID_HEADER" },
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
            var GRID = Ext.ComponentQuery.query("dokumenceisa_lampiran grid[pid=GRIDdokumenceisa_lampiran]")[0];
            GRID.getStore().load();
          },
        },
      ],
      // other options....
    },
  ],
});
