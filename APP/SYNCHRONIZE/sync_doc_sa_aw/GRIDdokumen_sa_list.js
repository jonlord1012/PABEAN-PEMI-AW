Ext.define("TDK.SYNCHRONIZE.sync_doc_sa_aw.GRIDdokumen_sa_list", {
  extend: "Ext.grid.Panel",
  alias: "widget.GRIDdokumen_sa_list",
  reference: "GRIDdokumen_sa_list",
  pid: "GRIDdokumen_sa_list",
  emptyText: "No Matching Records",
  autoScroll: true,
  flex: 1,
  plugins: ["filterfield", { ptype: "cellediting", clicksToEdit: 1 }],
  viewConfig: {
    enableTextSelection: true,
  },
  store: {
    autoLoad: true,
    remoteSort: false,
    remoteFilter: true,
    pageSize: 0,
    proxy: {
      type: "ajax",
      disableCaching: false,
      noCache: false,
      headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
      actionMethods: { read: "POST" },
      url: vconfig.service_api + "sync_doc_sa_aw/sync_doc_sa_aws",
      extraParams: {
        method: "read_doc_sa_list",
      },
      reader: {
        type: "json",
        rootProperty: "Rows",
        totalProperty: "TotalRows",
        successProperty: "success",
      },
    },
  },
  columns: [
    { xtype: "rownumberer", width: 40 },
    { header: "SA NO", dataIndex: "SANO", sortable: true, width: 180, filter: { xtype: "textfield" } },
    { header: "SA DATE", dataIndex: "SADATE", sortable: true, width: 100, filter: { xtype: "textfield" } },
    { header: "ETD", dataIndex: "ETDPEMI", sortable: true, width: 100, filter: { xtype: "textfield" } },
    { header: "SHIPPING", dataIndex: "SHIPPINGTYPE", sortable: true, width: 60, filter: { xtype: "textfield" } },
    { header: "SHIP NAME", dataIndex: "SHIPPING_NAME", sortable: true, width: 80, filter: { xtype: "textfield" } },
    { header: "CODE", dataIndex: "CUST_CODE", sortable: true, width: 50, filter: { xtype: "textfield" } },
    { header: "CUSTOMER", dataIndex: "CUSTOMER", sortable: true, width: 300, filter: { xtype: "textfield" } },
  ],
  listeners: {
    itemdblclick: "GRIDpopup_dokumen_sa_list_itemdblclick",
  },
});
