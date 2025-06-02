Ext.define("TDK.INVENTORY.wip_in.wip_in", {
  extend: "Ext.form.Panel",
  alias: "widget.wip_in",
  reference: "wip_in",
  config: {},
  requires: ["TDK.INVENTORY.wip_in.GRIDwip_in", "TDK.INVENTORY.wip_in.Cwip_in"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cwip_in",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelwip_in",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDwip_in" }],
    });

    this.callParent(arguments);
  },
});
