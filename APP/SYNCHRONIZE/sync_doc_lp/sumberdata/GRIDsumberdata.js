Ext.define("TDK.SYNCHRONIZE.sync_doc_lp.sumberdata.GRIDsumberdata", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDsumberdata",
  reference: "GRIDsumberdata",
  frame: false,
  border: true,
  autoScroll: true,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
  items: [
    {
      xtype: "grid",
      pid: "GRIDsumberdata",
      emptyText: "No Matching Records",
      autoScroll: true,
      title: "",
      flex: 1,
      plugins: ["filterfield", "gridexporter"],
      viewConfig: {
        enableTextSelection: true,
      },
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
          url: vconfig.service_api + "sync_doc_lp/sync_doc_lps",
          extraParams: {
            method: "read_original",
            module: "lp",
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
              var GRID = Ext.ComponentQuery.query("sync_doc_lp GRIDsync_doc_lp grid[pid=GRIDsync_doc_lp]")[0];
              var vdt = GRID.getSelectionModel().getSelection()[0].data;
              operation.setParams({
                INVOICE_NO: vdt.INVOICE_NO,
              });
            } catch (ex) {
              COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
            }
          },
        },
      },
      columns: [
        { xtype: "rownumberer", width: 40 },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "VENDOR", dataIndex: "VENDOR" },
        { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "INVOICE_NO", dataIndex: "INVOICE_NO" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "INVOICE_DATE", dataIndex: "INVOICE_DATE" },
        { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "FAKTUR_NO", dataIndex: "FAKTUR_NO" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "FAKTUR_DATE", dataIndex: "FAKTUR_DATE" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "GR_NUMBER", dataIndex: "GR_NUMBER" },
        { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "GR_SUPPLIERNO", dataIndex: "GR_SUPPLIERNO" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "GR_DATE", dataIndex: "GR_DATE" },
        { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "PO_NUMBER", dataIndex: "PO_NUMBER" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "PO_DATE", dataIndex: "PO_DATE" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "PART_CODE", dataIndex: "PART_CODE" },
        { sortable: true, width: 200, filter: { xtype: "textfield" }, header: "PART_NUMBER", dataIndex: "PART_NUMBER" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "PART_UNIT", dataIndex: "PART_UNIT" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "GR_QTY", dataIndex: "GR_QTY" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "HARGA", dataIndex: "HARGA" },
      ],
      bbar: {
        xtype: "pagingtoolbar",
        displayInfo: true,
        displayMsg: "Total Data {2}",
        emptyMsg: "No topics to display",
      },
    },
  ],
  dockedItems: [
    {
      xtype: "toolbar",
      height: 30,
      dock: "top",
      items: [
        "-",
        "->",
        {
          xtype: "button",
          text: "Download",
          pid: "btsumberdata_download",
          icon: vconfig.getstyle + "icon/excel.ico",
          tooltip: "Download Data",
          handler: "btsumberdata_download",
          cfg: {
            type: "excel07",
            ext: "xlsx",
          },
        },
      ],
      // other options....
    },
  ],
});
