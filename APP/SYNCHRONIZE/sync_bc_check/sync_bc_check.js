Ext.define("TDK.SYNCHRONIZE.sync_bc_check.sync_bc_check", {
  extend: "Ext.form.Panel",
  alias: "widget.sync_bc_check",
  reference: "sync_bc_check",
  config: {},
  requires: ["TDK.SYNCHRONIZE.sync_bc_check.GRIDsync_bc_check", "TDK.SYNCHRONIZE.sync_bc_check.Csync_bc_check"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Csync_bc_check",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelsync_bc_check",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDsync_bc_check" }],
    });

    this.callParent(arguments);
  },
});
