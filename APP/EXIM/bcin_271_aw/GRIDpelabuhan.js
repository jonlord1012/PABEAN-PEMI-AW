Ext.define("NJC.EXIM.bcin_271_aw.GRIDpelabuhan", {
  extend: "Ext.grid.Panel",
  xtype: "GRIDpelabuhan",
  pid: "GRIDpelabuhan",
  emptyText: "No Matching Records",
  autoScroll: true,
  flex: 1,
  store: {
    autoLoad: true,
    remoteSort: true,
    remoteFilter: true,
    pageSize: 15,
    proxy: {
      type: "ajax",
      disableCaching: false,
      noCache: false,
      headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
      actionMethods: { read: "POST" },
      url: vconfig.service_api + "referensi_pelabuhan/referensi_pelabuhans",
      reader: {
        type: "json",
        rootProperty: "Rows",
        totalProperty: "TotalRows",
        successProperty: "success",
      },
    },
    listeners: {
      //
    },
  },
  plugins: ["filterfield"],
  columns: [
    { xtype: "rownumberer", width: 40 },
    { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "Kode Pelabuhan", dataIndex: "KODE_PELABUHAN" },
    { sortable: true, width: 230, filter: { xtype: "textfield" }, header: "Nama Pelabuhan", dataIndex: "URAIAN_PELABUHAN" },
  ],
  bbar: {
    xtype: "pagingtoolbar",
    displayInfo: true,
    displayMsg: "Displaying topics {0} - {1} of {2}",
    emptyMsg: "No topics to display",
  },
});
