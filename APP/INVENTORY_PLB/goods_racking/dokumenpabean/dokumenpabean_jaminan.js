Ext.define("NJC.INVENTORY_PLB.goods_racking.dokumenpabean.dokumenpabean_jaminan", {
  extend: "Ext.form.Panel",
  alias: "widget.dokumenpabean_jaminan",
  reference: "dokumenpabean_jaminan",
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
      pid: "GRIDdokumenpabean_jaminan",
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
          url: vconfig.service_api + "portal_data/portal_datas",
          extraParams: {
            method: "read_dokumenpabean_jaminan",
            // module: "coo",
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
              var GRID = Ext.ComponentQuery.query("goods_racking GRIDgoods_racking grid[pid=GRIDgoods_racking]")[0];
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
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE_JENIS_JAMINAN", dataIndex: "KODE_JENIS_JAMINAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE_KANTOR", dataIndex: "KODE_KANTOR" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NILAI_JAMINAN", dataIndex: "NILAI_JAMINAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NOMOR_BPJ", dataIndex: "NOMOR_BPJ" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NOMOR_JAMINAN", dataIndex: "NOMOR_JAMINAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "PENJAMIN", dataIndex: "PENJAMIN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TANGGAL_BPJ", dataIndex: "TANGGAL_BPJ" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TANGGAL_JAMINAN", dataIndex: "TANGGAL_JAMINAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TANGGAL_JATUH_TEMPO", dataIndex: "TANGGAL_JATUH_TEMPO" },
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
            var GRID = Ext.ComponentQuery.query("dokumenpabean_jaminan grid[pid=GRIDdokumenpabean_jaminan]")[0];
            GRID.getStore().load();
          },
        },
      ],
      // other options....
    },
  ],
});
