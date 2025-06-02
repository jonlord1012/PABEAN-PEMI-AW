Ext.define("TDK.SYNCHRONIZE.sync_mat_aw.sync_mat_aw", {
  extend: "Ext.form.Panel",
  alias: "widget.sync_mat_aw",
  reference: "sync_mat_aw",
  config: {},
  requires: ["TDK.SYNCHRONIZE.sync_mat_aw.GRIDsync_mat_aw", "TDK.SYNCHRONIZE.sync_mat_aw.Csync_mat_aw"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Csync_mat_aw",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelsync_mat_aw",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDsync_mat_aw" }],
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
