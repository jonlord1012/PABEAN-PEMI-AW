Ext.define("TDK.SYNCHRONIZE.sync_fg_in.sync_fg_in", {
  extend: "Ext.form.Panel",
  alias: "widget.sync_fg_in",
  reference: "sync_fg_in",
  config: {},
  requires: ["TDK.SYNCHRONIZE.sync_fg_in.GRIDsync_fg_in", "TDK.SYNCHRONIZE.sync_fg_in.Csync_fg_in"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Csync_fg_in",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelsync_fg_in",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDsync_fg_in" }],
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
