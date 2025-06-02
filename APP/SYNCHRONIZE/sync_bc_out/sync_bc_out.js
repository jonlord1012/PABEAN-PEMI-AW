Ext.define("TDK.SYNCHRONIZE.sync_bc_out.sync_bc_out", {
  extend: "Ext.form.Panel",
  alias: "widget.sync_bc_out",
  reference: "sync_bc_out",
  config: {},
  requires: ["TDK.SYNCHRONIZE.sync_bc_out.GRIDsync_bc_out", "TDK.SYNCHRONIZE.sync_bc_out.Csync_bc_out"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Csync_bc_out",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelsync_bc_out",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDsync_bc_out" }],
    });

    this.callParent(arguments);
  },
});
