Ext.define("TDK.SYNCHRONIZE.sync_doc_molts.tracing.molts_sumberdata", {
  extend: "Ext.form.Panel",
  alias: "widget.molts_sumberdata",
  reference: "molts_sumberdata",
  frame: false,
  border: true,
  autoScroll: true,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
  items: [
    {
      xtype: "grid",
      pid: "GRIDmolts_sumberdata",
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
          url: vconfig.service_api + "sync_doc_molts/sync_doc_moltss",
          extraParams: {
            method: "read_original",
            module: "molts",
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
              var GRID = Ext.ComponentQuery.query("GRIDsync_doc_molts grid[pid=GRIDsync_doc_molts]")[0];
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
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "INVOICE_NO", dataIndex: "INVOICE_NO" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "LAST_UPDATE", dataIndex: "LAST_UPDATE" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "FORWARDER", dataIndex: "FORWARDER" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "CONSIGNEE", dataIndex: "CONSIGNEE" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "BUYER", dataIndex: "BUYER" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "SHIPPING_MODE", dataIndex: "SHIPPING_MODE" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "ETD", dataIndex: "ETD" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "ETA", dataIndex: "ETA" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "PAYMENT", dataIndex: "PAYMENT" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "ORDER_NO", dataIndex: "ORDER_NO" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "ITEM_CODE", dataIndex: "ITEM_CODE" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "ITEM_TYPE1", dataIndex: "ITEM_TYPE1" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "ITEM_TYPE2", dataIndex: "ITEM_TYPE2" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "DESCRIPTION1", dataIndex: "DESCRIPTION1" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "DESCRIPTION2", dataIndex: "DESCRIPTION2" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "QTY", dataIndex: "QTY" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "UNIT", dataIndex: "UNIT" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "UNIT_PRICE", dataIndex: "UNIT_PRICE" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TOTAL_PRICE", dataIndex: "TOTAL_PRICE" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "CURRENCY", dataIndex: "CURRENCY" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NET_WEIGHT_UNIT", dataIndex: "NET_WEIGHT_UNIT" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NET_WEIGHT_TOTAL", dataIndex: "NET_WEIGHT_TOTAL" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "HS_CODE", dataIndex: "HS_CODE" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "DANGER_GOODS", dataIndex: "DANGER_GOODS" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "REGULATION", dataIndex: "REGULATION" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "SUPPLIER", dataIndex: "SUPPLIER" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "CONTRY_OF_ORIGIN", dataIndex: "CONTRY_OF_ORIGIN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "SHIPPER", dataIndex: "SHIPPER" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "VESSEL_NAME", dataIndex: "VESSEL_NAME" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "INVOICE_TERM", dataIndex: "INVOICE_TERM" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "PACKAGE_UNIT", dataIndex: "PACKAGE_UNIT" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "PACKAGE_QTY", dataIndex: "PACKAGE_QTY" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "INVOICE_DATE", dataIndex: "INVOICE_DATE" },
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
          cfg: {
            type: "excel07",
            ext: "xlsx",
          },
          handler: function () {
            try {
              var GRIDINV = Ext.ComponentQuery.query("GRIDsync_doc_molts grid[pid=GRIDsync_doc_molts]")[0];
              var vdt = GRIDINV.getSelectionModel().getSelection()[0].data;
              Ext.MessageBox.show({
                msg: "Processing...",
                progressText: "process...",
                width: 300,
                wait: true,
              });
              var cfg = Ext.merge({
                fileName: vdt.INVOICE_NO + ".xlsx",
                includeGroups: true,
                includeSummary: true,
              });

              var GRID = Ext.ComponentQuery.query("molts_sumberdata grid[pid=GRIDmolts_sumberdata]")[0];
              GRID.saveDocumentAs(cfg).then(function () {
                Ext.MessageBox.hide();
              });
            } catch (ex) {
              COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
            }
          },
        },
      ],
      // other options....
    },
  ],
});
