Ext.define("TDK.INVENTORY.fg_in.fg_in", {
  extend: "Ext.form.Panel",
  alias: "widget.fg_in",
  reference: "fg_in",
  config: {},
  requires: ["TDK.INVENTORY.fg_in.GRIDfg_in", "TDK.INVENTORY.fg_in.Cfg_in"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cfg_in",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelfg_in",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDfg_in" }],
    });

    this.callParent(arguments);
  },
});
