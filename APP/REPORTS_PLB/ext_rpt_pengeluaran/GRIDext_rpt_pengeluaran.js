Ext.define("NJC.REPORTS_PLB.ext_rpt_pengeluaran.GRIDext_rpt_pengeluaran", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDext_rpt_pengeluaran",
  reference: "GRIDext_rpt_pengeluaran",
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
      pid: "GRIDext_rpt_pengeluaran",
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
          url: vconfig.service_api + "ext_rpt_pengeluaran/ext_rpt_pengeluarans",
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
              // var VIDCOMPANY = Ext.ComponentQuery.query("ext_rpt_pengeluaran combobox[name=CBO_SOURCE]")[0];
              // var VBCTYPE = Ext.ComponentQuery.query("ext_rpt_pengeluaran combobox[name=CBO_BCTYPE]")[0];
              var VFROMDATE = Ext.ComponentQuery.query("ext_rpt_pengeluaran datefield[name=tfromdate]")[0];
              var VTODATE = Ext.ComponentQuery.query("ext_rpt_pengeluaran datefield[name=ttodate]")[0];
              operation.setParams({
                VFROMDATE: moment(VFROMDATE.getValue()).format("YYYY-MM-DD"),
                VTODATE: moment(VTODATE.getValue()).format("YYYY-MM-DD"),
              });
            } catch (ex) {
              COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
            }
          },
        },
      },
      viewConfig: {
        enableTextSelection: true,
      },
      columns: [
        { xtype: "rownumberer", width: 40, text: "No" },
        {
          header: "Data Dok Pabean",
          columns: [
            { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "JENIS", dataIndex: "JENISDOKUMENPABEAN" },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NO DAFTAR", dataIndex: "NOMORDAFTAR" },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TANGGAL", dataIndex: "TANGGALDAFTAR" },
          ]
        },
        {
          header: "<b>BUKTI PENGELUARAN BARANG</b>",
          columns: [
            { sortable: true, width: 120, filter: { xtype: "textfield" }, header: "TANGGAL KELUAR", dataIndex: "TANGGALBUKTIPENGELUARANBARANG" },
            { sortable: true, width: 200, filter: { xtype: "textfield" }, header: "PEMILIK BARANG", dataIndex: "PEMILIK" },
            { sortable: true, width: 200, filter: { xtype: "textfield" }, header: "PENERIMA BARANG", dataIndex: "PENERIMA" },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE BARANG", dataIndex: "KODEBARANG" },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "SPESIFIKASI LAIN", dataIndex: "ARTICLE_CODE" },
            { sortable: true, width: 250, filter: { xtype: "textfield" }, header: "NAMA BARANG", dataIndex: "URAIANBARANG" },
            { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "UOM", dataIndex: "KODESATUAN" },
            { sortable: true, width: 120, filter: { xtype: "textfield" }, header: "JUMLAH BARANG", dataIndex: "JUMLAHSATUAN", renderer: "formatAmount" }
          ]
        },
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
