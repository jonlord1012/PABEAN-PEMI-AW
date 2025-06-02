Ext.define("NJC.REPORTS_PLB.ext_rpt_mutasi.GRIDext_rpt_mutasi", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDext_rpt_mutasi",
  reference: "GRIDext_rpt_mutasi",
  frame: false,
  border: true,
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
      pid: "GRIDext_rpt_mutasi",
      emptyText: "No Matching Records",
      plugins: ["filterfield", "gridexporter"],
      autoScroll: true,
      flex: 1,
      store: {
        autoLoad: false,
        remoteSort: false,
        remoteFilter: false,
        pageSize: 0,
        proxy: {
          type: "ajax",
          disableCaching: false,
          noCache: false,
          headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "ext_rpt_mutasi/ext_rpt_mutasis",
          extraParams: {
            method: "read_to_grid",
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
              var VFROMDATE = Ext.ComponentQuery.query("ext_rpt_mutasi datefield[name=tfromdate]")[0];
              var VTODATE = Ext.ComponentQuery.query("ext_rpt_mutasi datefield[name=ttodate]")[0];
              operation.setParams({
                //VCBO_COMPANY: VIDCOMPANY.getValue(),
                VFROMDATE: moment(VFROMDATE.getValue()).format("YYYY-MM-DD"),
                VTODATE: moment(VTODATE.getValue()).format("YYYY-MM-DD"),
              });
            } catch (ex) {
              COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
            }
          },
        },
        fields: [
          { name: "KODE_BARANG", type: "string" },
          { name: "NAMA_BARANG", type: "string" },
          { name: "SALDO_AWAL", type: "float" },
          { name: "PEMASUKAN", type: "float" },
          { name: "PENGELUARAN", type: "float" },
          { name: "PENYESUAIAN", type: "float" },
          { name: "SALDO_AKHIR", type: "float" },
          { name: "STOCK_OPNAME", type: "float" },
          { name: "SELISIH", type: "float" },
          { name: "KETERANGAN", type: "string" },
          { name: "TGL_STO_TERBARU", type: "string" },
        ],

      },
      viewConfig: {
        enableTextSelection: true,
      },
      columns: [
        { xtype: "rownumberer", width: 40 },
        { sortable: true, width: 120, filter: { xtype: "textfield" }, header: "KODE BARANG ", dataIndex: "KODE_BARANG" },
        { sortable: true, width: 200, filter: { xtype: "textfield" }, header: "NAMA BARANG ", dataIndex: "NAMA_BARANG" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "SALDO AWAL", dataIndex: "SALDO_AWAL", renderer: "formatAmount", },
        { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "PEMASUKAN BARANG", dataIndex: "PEMASUKAN", renderer: "formatAmount", },
        { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "PENGELUARAN BARANG", dataIndex: "PENGELUARAN", renderer: "formatAmount", },
        { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "PENYESUAIAN (ADJUSTMENT)", dataIndex: "PENYESUAIAN", renderer: "formatAmount", },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "SALDO AKHIR", dataIndex: "SALDO_AKHIR", renderer: "formatAmount", },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "STOCK OPNAME ", dataIndex: "STOCK_OPNAME", renderer: "formatAmount", },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "SELISIH", dataIndex: "SELISIH", renderer: "formatAmount", },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KETERANGAN", dataIndex: "KETERANGAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TGL STO", dataIndex: "TGL_STO_TERBARU", renderer: "formatDate", },
      ],
      bbar: {
        xtype: "pagingtoolbar",
        displayInfo: true,
        displayMsg: "Displaying topics {0} - {1} of {2}",
        emptyMsg: "No topics to display",
      },
    },
  ],
});
