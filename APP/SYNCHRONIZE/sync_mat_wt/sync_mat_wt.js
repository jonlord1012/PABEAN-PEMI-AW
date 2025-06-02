Ext.define("TDK.SYNCHRONIZE.sync_mat_wt.sync_mat_wt", {
  extend: "Ext.form.Panel",
  alias: "widget.sync_mat_wt",
  reference: "sync_mat_wt",
  config: {},
  requires: ["TDK.SYNCHRONIZE.sync_mat_wt.GRIDsync_mat_wt", "TDK.SYNCHRONIZE.sync_mat_wt.Csync_mat_wt"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Csync_mat_wt",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelsync_mat_wt",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDsync_mat_wt" }],
      dockedItems: [
        {
          xtype: "toolbar",
          height: 30,
          dock: "top",
          items: [
            { xtype: "button", text: "Refresh", pid: "btrefresh", icon: vconfig.getstyle + "icon/refresh.gif", tooltip: "Refresh Data" },
            { xtype: "button", text: "Process Synchronize", pid: "btprocess_sync", icon: vconfig.getstyle + "icon/grid.png", tooltip: "Synchronize proses" },
            { xtype: "button", text: "Cancel Data Synchronize", pid: "btcancel_sync", icon: vconfig.getstyle + "icon/delete.png", tooltip: "New" },
          ],
          // other options....
        },
      ],
    });

    this.callParent(arguments);
  },
});
