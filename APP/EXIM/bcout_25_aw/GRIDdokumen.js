Ext.define("NJC.EXIM.bcout_25_aw.GRIDdokumen", {
  extend: "Ext.grid.Panel",
  xtype: "GRIDdokumen",
  pid: "GRIDdokumen",
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
      url: vconfig.service_api + "referensi_dokumen/referensi_dokumens",
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
    { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE", dataIndex: "KODE_DOKUMEN" },
    { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "URAIAN", dataIndex: "URAIAN_DOKUMEN" },
  ],
  bbar: {
    xtype: "pagingtoolbar",
    displayInfo: true,
    displayMsg: "Displaying topics {0} - {1} of {2}",
    emptyMsg: "No topics to display",
  },
});
