Ext.define("TDK.INVENTORY.wnt_return.wnt_return", {
  extend: "Ext.form.Panel",
  alias: "widget.wnt_return",
  reference: "wnt_return",
  config: {},
  requires: ["TDK.INVENTORY.wnt_return.GRIDwnt_return", "TDK.INVENTORY.wnt_return.Cwnt_return"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cwnt_return",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelwnt_return",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDwnt_return" }],
    });

    this.callParent(arguments);
  },
});
