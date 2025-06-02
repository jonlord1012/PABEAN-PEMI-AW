Ext.define("NJC.INVENTORY_PLB.goods_racking.dokumenpabean.dokumenpabean_kemasan", {
  extend: "Ext.form.Panel",
  alias: "widget.dokumenpabean_kemasan",
  reference: "dokumenpabean_kemasan",
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
      pid: "GRIDdokumenpabean_kemasan",
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
            method: "read_dokumenpabean_kemasan",
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
        // { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "JUMLAH_KEMASAN", dataIndex: "JUMLAH_KEMASAN" },
        // { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KESESUAIAN_DOKUMEN", dataIndex: "KESESUAIAN_DOKUMEN" },
        // { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KETERANGAN", dataIndex: "KETERANGAN" },
        // { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE_JENIS_KEMASAN", dataIndex: "KODE_JENIS_KEMASAN" },
        // { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "MERK_KEMASAN", dataIndex: "MERK_KEMASAN" },
        // { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NIP_GATE_IN", dataIndex: "NIP_GATE_IN" },
        // { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NIP_GATE_OUT", dataIndex: "NIP_GATE_OUT" },
        // { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NO_POLISI", dataIndex: "NO_POLISI" },
        // { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NOMOR_SEGEL", dataIndex: "NOMOR_SEGEL" },
        // { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "SERI_KEMASAN", dataIndex: "SERI_KEMASAN" },
        // { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "WAKTU_GATE_IN", dataIndex: "WAKTU_GATE_IN" },
        // { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "WAKTU_GATE_OUT", dataIndex: "WAKTU_GATE_OUT" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "MEREK", dataIndex: "MEREK" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "SERI_BARANG", dataIndex: "SERI_BARANG" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODEKEMASAN", dataIndex: "KODEKEMASAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "JUMLAH_KEMASAN", dataIndex: "JUMLAH_KEMASAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TRANSID", dataIndex: "TRANSID" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "SERI", dataIndex: "SERI" },
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
            var GRID = Ext.ComponentQuery.query("dokumenpabean_kemasan grid[pid=GRIDdokumenpabean_kemasan]")[0];
            GRID.getStore().load();
          },
        },
      ],
      // other options....
    },
  ],
});
