Ext.define("TDK.INVENTORY.inv_fg_control.control_inv_in.FRMhr_summary_out", {
  extend: "Ext.form.Panel",
  alias: "widget.FRMhr_summary_out",
  reference: "FRMhr_summary_out",
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
      pid: "GRIDhr_summary_out",
      emptyText: "No Matching Records",
      autoScroll: true,
      flex: 1,
      store: {
        autoLoad: true,
        remoteSort: true,
        remoteFilter: true,
        pageSize: 20,
        proxy: {
          type: "ajax",
          disableCaching: false,
          noCache: false,
          headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "inv_fg_control/inv_fg_controls",
          extraParams: {
            method: "read_hr_summary_out",
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
              var GRID = Ext.ComponentQuery.query("inv_fg_control GRIDinv_fg_control grid[pid=GRIDinv_fg_control]")[0];
              var vdt = GRID.getSelectionModel().getSelection()[0].data;
              operation.setParams({
                PART_NO: vdt.PART_NO,
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
        { xtype: "rownumberer", width: 50 },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "PART_NO", dataIndex: "PART_NO", filter: { xtype: "textfield" } },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "DATE", dataIndex: "PART_NO", filter: { xtype: "textfield" } },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "OUT TYPE", dataIndex: "PART_NO", filter: { xtype: "textfield" } },
        { sortable: true, width: 200, filter: { xtype: "textfield" }, header: "REMARK", dataIndex: "PART_NO", filter: { xtype: "textfield" } },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "QTY", align: "right", renderer: "formatqty", dataIndex: "QTY", filter: { xtype: "textfield" } },
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
        {
          xtype: "button",
          pid: "btrefresh",
          text: "Refresh",
          icon: vconfig.getstyle + "icon/update.ico",
          tooltip: "Refresh Data",
          handler: function () {
            var GRID = Ext.ComponentQuery.query("FRMhr_summary_out grid[pid=GRIDhr_summary_out]")[0];
            GRID.getStore().load();
          },
        },
      ],
      // other options....
    },
  ],
});
