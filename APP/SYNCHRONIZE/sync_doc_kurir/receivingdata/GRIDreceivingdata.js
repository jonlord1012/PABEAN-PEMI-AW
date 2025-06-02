Ext.define("TDK.SYNCHRONIZE.sync_doc_kurir.receivingdata.GRIDreceivingdata", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDreceivingdata",
  reference: "GRIDreceivingdata",
  frame: false,
  border: true,
  autoScroll: true,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
  items: [
    {
      xtype: "grid",
      pid: "GRIDreceivingdata_supplier",
      emptyText: "No Matching Records",
      autoScroll: true,
      title: "",
      height: 150,
      plugins: ["filterfield"],
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
          url: vconfig.service_api + "sync_doc/sync_docs",
          extraParams: {
            method: "read_receivingdata_header",
            module: "coo",
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
              var GRID = Ext.ComponentQuery.query("sync_doc_kurir GRIDsync_doc_kurir grid[pid=GRIDsync_doc_kurir]")[0];
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
        { header: "RECEIPT_NO", dataIndex: "RECEIPT_NO", sortable: true, width: 200 },
        { header: "RECEIPT_DATE", dataIndex: "RECEIPT_DATE", sortable: true, width: 100 },
        { header: "RECEIPT_USER", dataIndex: "RECEIPT_USER", sortable: true, width: 100 },
      ],
      bbar: {
        xtype: "pagingtoolbar",
        displayInfo: true,
        displayMsg: "Total Data {2}",
        emptyMsg: "No topics to display",
      },
    },
    { xtype: "tbspacer", height: 5 },
    {
      xtype: "grid",
      pid: "GRIDreceivingdata_supplier",
      emptyText: "No Matching Records",
      autoScroll: true,
      title: "",
      flex: 1,
      plugins: ["filterfield"],
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
          url: vconfig.service_api + "sync_doc/sync_docs",
          extraParams: {
            method: "read_receivingdata_detail",
            module: "coo",
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
              var GRID = Ext.ComponentQuery.query("sync_doc_kurir GRIDsync_doc_kurir grid[pid=GRIDsync_doc_kurir]")[0];
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
        { header: "PART_NO", dataIndex: "PART_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "MST_TOTALQTY", dataIndex: "MST_TOTALQTY", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "PRICE", dataIndex: "MST_PRICE", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "RCV_IN", dataIndex: "RCV_IN", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "KURS", dataIndex: "KURS", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "KURS_RATE", dataIndex: "KURS_RATE", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "KURS_PER_UNIT", dataIndex: "KURS_PER_UNIT", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "IDR_PER_UNIT", dataIndex: "IDR_PER_UNIT", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "USD", dataIndex: "USD", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "USD_RATE", dataIndex: "USD_RATE", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "USD_PER_UNIT", dataIndex: "USD_PER_UNIT", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "RECEIPT_NO", dataIndex: "RECEIPT_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "INVOICE_NO", dataIndex: "INVOICE_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "COUNTRY_OF", dataIndex: "COUNTRY_OF", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "CAUPRI", dataIndex: "CAUPRI", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "BC_TYPE", dataIndex: "BC_TYPE", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "NOMOR_AJU", dataIndex: "NOMOR_AJU", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "TANGGAL_AJU", dataIndex: "TANGGAL_AJU", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "NOMOR_DAFTAR", dataIndex: "NOMOR_DAFTAR", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "TANGGAL_DAFTAR", dataIndex: "TANGGAL_DAFTAR", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "SUPPLIER_KODE_INTERNAL", dataIndex: "SUPPLIER_KODE_INTERNAL", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "SUPPLIER_NAME", dataIndex: "SUPPLIER_NAME", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "CREATE_USER", dataIndex: "CREATE_USER", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "CREATE_DATE", dataIndex: "CREATE_DATE", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "UPDATE_USER", dataIndex: "UPDATE_USER", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "UPDATE_DATE", dataIndex: "UPDATE_DATE", sortable: true, width: 100, filter: { xtype: "textfield" } },
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
      items: ["-", "->"],
      // other options....
    },
  ],
});
