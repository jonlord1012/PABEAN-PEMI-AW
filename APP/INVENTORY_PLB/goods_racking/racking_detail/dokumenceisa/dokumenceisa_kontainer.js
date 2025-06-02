Ext.define("NJC.INVENTORY_PLB.goods_racking.racking_detail.dokumenceisa.dokumenceisa_kontainer", {
  extend: "Ext.form.Panel",
  alias: "widget.dokumenceisa_kontainer",
  reference: "dokumenceisa_kontainer",
  frame: false,
  border: true,
  autoScroll: false,
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
      pid: "GRIDdokumenceisa_kontainer",
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
          url: vconfig.service_api + "sync_bc_in/sync_bc_ins",
          extraParams: {
            method: "read_dokumen_kontainer",
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
              var GRID = Ext.ComponentQuery.query("goods_in GRIDgoods_in grid[pid=GRIDgoods_in]")[0];
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
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KESESUAIAN_DOKUMEN", dataIndex: "KESESUAIAN_DOKUMEN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KETERANGAN", dataIndex: "KETERANGAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE_STUFFING", dataIndex: "KODE_STUFFING" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE_TIPE_KONTAINER", dataIndex: "KODE_TIPE_KONTAINER" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE_UKURAN_KONTAINER", dataIndex: "KODE_UKURAN_KONTAINER" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "FLAG_GATE_IN", dataIndex: "FLAG_GATE_IN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "FLAG_GATE_OUT", dataIndex: "FLAG_GATE_OUT" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NO_POLISI", dataIndex: "NO_POLISI" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NOMOR_KONTAINER", dataIndex: "NOMOR_KONTAINER" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NOMOR_SEGEL", dataIndex: "NOMOR_SEGEL" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "SERI_KONTAINER", dataIndex: "SERI_KONTAINER" },
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
            var GRID = Ext.ComponentQuery.query("dokumenceisa_kontainer grid[pid=GRIDdokumenceisa_kontainer]")[0];
            GRID.getStore().load();
          },
        },
      ],
      // other options....
    },
  ],
});
