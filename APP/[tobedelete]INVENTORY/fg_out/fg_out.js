Ext.define("TDK.INVENTORY.fg_out.fg_out", {
  extend: "Ext.form.Panel",
  alias: "widget.fg_out",
  reference: "fg_out",
  config: {},
  requires: ["TDK.INVENTORY.fg_out.GRIDfg_out", "TDK.INVENTORY.fg_out.Cfg_out"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cfg_out",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelfg_out",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDfg_out" }],
    });

    this.callParent(arguments);
  },
});
