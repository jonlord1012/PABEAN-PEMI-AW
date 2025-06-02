Ext.define("TDK.INVENTORY.inv_fg_return.dokumen_detail_fgreturn.wp_fg_out", {
  extend: "Ext.form.Panel",
  alias: "widget.wp_fg_out",
  reference: "wp_fg_out",
  frame: false,
  border: true,
  autoScroll: true,
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
      pid: "GRIDwp_fg_out",
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
          headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "inv_fg_return/inv_fg_returns",
          extraParams: {
            method: "read_list_fgout",
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
              var GRID = Ext.ComponentQuery.query("inv_fg_return GRIDinv_fg_return grid[pid=GRIDinv_fg_return]")[0];
              var vdt = GRID.getSelectionModel().getSelection()[0].data;
              operation.setParams({
                PRODDATE: vdt.PRODDATE,
                CONVEYOR: vdt.CONVEYOR,
                ASSYCODE: vdt.ASSYCODE,
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
        { xtype: "rownumberer", width: 40 },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "SeqNo", dataIndex: "SeqNo" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "Date", dataIndex: "Date" },
        { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "NameplateID", dataIndex: "NameplateID" },
        { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "PollyLabelId", dataIndex: "PollyLabelId" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "CV", dataIndex: "CV" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "AssyCode", dataIndex: "AssyCode" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "PackingTime", dataIndex: "PackingTime" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NIK", dataIndex: "NIK" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "OTStatus", dataIndex: "OTStatus" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "PackingType", dataIndex: "PackingType" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NameplateABID", dataIndex: "NameplateABID" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "RepackingStatus", dataIndex: "RepackingStatus" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "SAPTransferDate", dataIndex: "SAPTransferDate" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "FlagIns", dataIndex: "FlagIns" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "Sisi", dataIndex: "Sisi" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "IP", dataIndex: "IP" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "version", dataIndex: "version" },
      ],
      bbar: {
        xtype: "pagingtoolbar",
        displayInfo: true,
        displayMsg: "Displaying topics {0} - {1} of {2}",
        emptyMsg: "No topics to display",
      },
    },
  ],
  dockedItems: [
    {
      xtype: "toolbar",
      height: 30,
      dock: "top",
      items: ["-"],
      // other options....
    },
  ],
});
