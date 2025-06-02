Ext.define("TDK.INVENTORY.wip_return.wip_return", {
  extend: "Ext.form.Panel",
  alias: "widget.wip_return",
  reference: "wip_return",
  config: {},
  requires: ["TDK.INVENTORY.wip_return.GRIDwip_return", "TDK.INVENTORY.wip_return.Cwip_return"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cwip_return",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelwip_return",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDwip_return" }],
    });

    this.callParent(arguments);
  },
});
