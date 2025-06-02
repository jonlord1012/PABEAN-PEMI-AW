Ext.define("TDK.INVENTORY.fg_return.fg_return", {
  extend: "Ext.form.Panel",
  alias: "widget.fg_return",
  reference: "fg_return",
  config: {},
  requires: ["TDK.INVENTORY.fg_return.GRIDfg_return", "TDK.INVENTORY.fg_return.Cfg_return"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cfg_return",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelfg_return",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDfg_return" }],
    });

    this.callParent(arguments);
  },
});
