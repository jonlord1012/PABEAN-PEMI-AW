Ext.define("TDK.SYNCHRONIZE.sync_fg_out.sync_fg_out", {
  extend: "Ext.form.Panel",
  alias: "widget.sync_fg_out",
  reference: "sync_fg_out",
  config: {},
  requires: ["TDK.SYNCHRONIZE.sync_fg_out.GRIDsync_fg_out", "TDK.SYNCHRONIZE.sync_fg_out.Csync_fg_out"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Csync_fg_out",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelsync_fg_out",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDsync_fg_out" }],
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
