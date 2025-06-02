Ext.define("TDK.INVENTORY.wip_out.wip_out", {
  extend: "Ext.form.Panel",
  alias: "widget.wip_out",
  reference: "wip_out",
  config: {},
  requires: ["TDK.INVENTORY.wip_out.GRIDwip_out", "TDK.INVENTORY.wip_out.Cwip_out"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cwip_out",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelwip_out",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDwip_out" }],
    });

    this.callParent(arguments);
  },
});
