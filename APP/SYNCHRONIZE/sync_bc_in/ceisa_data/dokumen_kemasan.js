Ext.define("TDK.SYNCHRONIZE.sync_bc_in.ceisa_data.dokumen_kemasan", {
  extend: "Ext.form.Panel",
  alias: "widget.dokumen_kemasan",
  reference: "dokumen_kemasan",
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
      pid: "GRIDdokumen_kemasan",
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
            method: "read_dokumen_kemasan",
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
              var GRID = Ext.ComponentQuery.query("sync_bc_in GRIDsync_bc_in grid[pid=GRIDsync_bc_in]")[0];
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
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "JUMLAH_KEMASAN", dataIndex: "JUMLAH_KEMASAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KESESUAIAN_DOKUMEN", dataIndex: "KESESUAIAN_DOKUMEN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KETERANGAN", dataIndex: "KETERANGAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE_JENIS_KEMASAN", dataIndex: "KODE_JENIS_KEMASAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "MERK_KEMASAN", dataIndex: "MERK_KEMASAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NIP_GATE_IN", dataIndex: "NIP_GATE_IN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NIP_GATE_OUT", dataIndex: "NIP_GATE_OUT" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NO_POLISI", dataIndex: "NO_POLISI" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NOMOR_SEGEL", dataIndex: "NOMOR_SEGEL" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "SERI_KEMASAN", dataIndex: "SERI_KEMASAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "WAKTU_GATE_IN", dataIndex: "WAKTU_GATE_IN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "WAKTU_GATE_OUT", dataIndex: "WAKTU_GATE_OUT" },
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
            var GRID = Ext.ComponentQuery.query("dokumen_kemasan grid[pid=GRIDdokumen_kemasan]")[0];
            GRID.getStore().load();
          },
        },
      ],
      // other options....
    },
  ],
});
