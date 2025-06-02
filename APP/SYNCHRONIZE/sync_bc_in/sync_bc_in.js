Ext.define("TDK.SYNCHRONIZE.sync_bc_in.sync_bc_in", {
  extend: "Ext.form.Panel",
  alias: "widget.sync_bc_in",
  reference: "sync_bc_in",
  config: {},
  requires: ["TDK.SYNCHRONIZE.sync_bc_in.GRIDsync_bc_in", "TDK.SYNCHRONIZE.sync_bc_in.Csync_bc_in"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Csync_bc_in",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelsync_bc_in",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDsync_bc_in" }],
    });

    this.callParent(arguments);
  },
});
