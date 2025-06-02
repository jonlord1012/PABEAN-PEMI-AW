Ext.define("TDK.INVENTORY.wnt_in.wnt_in", {
  extend: "Ext.form.Panel",
  alias: "widget.wnt_in",
  reference: "wnt_in",
  config: {},
  requires: ["TDK.INVENTORY.wnt_in.GRIDwnt_in", "TDK.INVENTORY.wnt_in.Cwnt_in"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cwnt_in",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelwnt_in",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDwnt_in" }],
    });

    this.callParent(arguments);
  },
});
