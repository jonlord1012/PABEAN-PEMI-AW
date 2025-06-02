Ext.define("NJC.SYNCHRONIZE.sync_doc_aw.sumberdata.GRIDsumberdata", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDsumberdata_aw",
  reference: "GRIDsumberdata",
  frame: false,
  border: true,
  closeAction: "destroy",

  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
  items: [
    {
      xtype: "grid",
      pid: "GRIDsumberdata_aw",
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
          headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "sync_doc_aw/sync_doc_aws",
          extraParams: {
            method: "read_original",
            module: "aw",
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
      columns: [
        { xtype: "rownumberer", width: 40 },
        { header: "VENDOR", dataIndex: "VENDOR", sortable: true, width: 200, filter: { xtype: "textfield" } },
        { header: "INVOICE_NO", dataIndex: "INVOICE_NO", sortable: true, width: 200, filter: { xtype: "textfield" } },
        { header: "INVOICE_DATE", dataIndex: "INVOICE_DATE", sortable: true, width: 200, filter: { xtype: "textfield" } },
        { header: "BC TYPE", dataIndex: "BC_TYPE", sortable: true, width: 200, filter: { xtype: "textfield" } },
        { header: "TANGGAL AJU", dataIndex: "TANGGAL_AJU", sortable: true, width: 200, filter: { xtype: "textfield" } },
        { header: "NOMOR DAFTAR", dataIndex: "NOMOR_DAFTAR", sortable: true, width: 200, filter: { xtype: "textfield" } },
        { header: "TANGGAL DAFTAR", dataIndex: "TANGGAL_DAFTAR", sortable: true, width: 200, filter: { xtype: "textfield" } },
        //{ header: "FREIGHT", dataIndex: "FREIGHT", sortable: true, width: 100, filter: { xtype: "textfield" } },
        //{ header: "VOLUME", dataIndex: "VOLUME", sortable: true, width: 100, filter: { xtype: "textfield" } },
        //{ header: "HS CODE", dataIndex: "HS_CODE", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "ARTICLE CODE", dataIndex: "ARTICLE_CODE", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "STOCK NAME", dataIndex: "STOCK_NAME", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "LOT NO", dataIndex: "LOT_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
        //{ header: "NETTO", dataIndex: "NETTO", sortable: true, width: 100, filter: { xtype: "textfield" } },
        //{ header: "BRUTTO", dataIndex: "BRUTTO", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "VENDOR", dataIndex: "VENDOR", sortable:  true, width: 150, filter:  { xtype:  "textfield" }},
        // { header: "VENDOR NAME", dataIndex: "VENDOR_NAME", sortable:  true, width: 100, filter:  { xtype:  "textfield" }},
        // { header: "INVOICE NO", dataIndex: "INVOICE_NO", sortable:  true, width: 80, filter:  { xtype:  "textfield" }},
        // { header: "INVOICE DATE", dataIndex: "INVOICE_DATE", sortable:  true, width: 80, filter:  { xtype:  "textfield" }, renderer:  "formatDate"  },
        // { header: "FAKTUR NO", dataIndex: "FAKTUR_NO", sortable:  true, width: 80, filter:  { xtype:  "textfield" }},
        // { header: "FAKTUR DATE", dataIndex: "FAKTUR_DATE", sortable:  true, width: 100, filter:  { xtype:  "textfield" }, renderer:  "formatDate"  },
        // { header: "GR NUMBER", dataIndex: "GR_NUMBER", sortable:  true, width: 100, filter:  { xtype:  "textfield" }},
        // { header: "GR DATE", dataIndex: "GR_DATE", sortable:  true, width: 100, filter:  { xtype:  "textfield" }, renderer:  "formatDate"  },
        // { header: "GR SUPPLIERNO", dataIndex: "GR_SUPPLIERNO", sortable:  true, width: 100, filter:  { xtype:  "textfield" }},
        // { header: "GR SUPPLIER DATE", dataIndex: "GR_SUPPLIER_DATE", sortable:  true, width: 100, filter:  { xtype:  "textfield" }},
        // { header: "PO NUMBER", dataIndex: "PO_NUMBER", sortable:  true, width: 100, filter:  { xtype:  "textfield" }},
        // { header: "PO DATE", dataIndex: "PO_DATE", sortable:  true, width: 100, filter:  { xtype:  "textfield" }, renderer:  "formatDate"  },
        // { header: "LOT NO", dataIndex: "LOT_NO", sortable:  true, width: 100, filter:  { xtype:  "textfield" }},
        // { header: "PART CODE", dataIndex: "PART_CODE", sortable:  true, width: 100, filter:  { xtype:  "textfield" }},
        // { header: "PART NUMBER", dataIndex: "PART_NUMBER", sortable:  true, width: 100, filter:  { xtype:  "textfield" }},
        // { header: "PART UNIT", dataIndex: "PART_UNIT", sortable:  true, width: 100, filter:  { xtype:  "textfield" }},
        { header: "INVOICE QTY", dataIndex: "INVOICE_QTY", sortable: true, width: 100, filter: { xtype: "textfield" }, renderer: "formatQty" },
        { header: "GR QTY", dataIndex: "GR_QTY", sortable: true, width: 100, filter: { xtype: "textfield" }, renderer: "formatQty" },
        // { header: "HARGA", dataIndex: "HARGA", sortable:  true, width: 100, filter:  { xtype:  "textfield" }, renderer:  "formatAmount"  },
        // { header: "CURRENCY", dataIndex: "CURRENCY", sortable:  true, width: 100, filter:  { xtype:  "textfield" }, renderer:  "formatAmount"  },
        // { header: "NDPBM", dataIndex: "NDPBM", sortable:  true, width: 100, filter:  { xtype:  "textfield" }, renderer:  "formatAmount"  },
        // { header: "CARA BAYAR", dataIndex: "CARA_BAYAR", sortable:  true, width: 100, filter:  { xtype:  "textfield" }},
        // { header: "CIF", dataIndex: "CIF", sortable:  true, width: 100, filter:  { xtype:  "textfield" }, renderer:  "formatAmount"  },
        // { header: "NETTO", dataIndex: "NETTO", sortable:  true, width: 100, filter:  { xtype:  "textfield" }, renderer:  "formatQty"  },
        // { header: "BRUTO", dataIndex: "BRUTO", sortable:  true, width: 100, filter:  { xtype:  "textfield" }, renderer:  "formatQty"  },
        // { header: "JUMLAH KEMASAN", dataIndex: "TOTAL_PACKING", sortable:  true, width: 100, filter:  { xtype:  "textfield" }, renderer:  "formatQty"  },
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
