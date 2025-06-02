Ext.define("TDK.INVENTORY.wnt_out.wnt_out", {
  extend: "Ext.form.Panel",
  alias: "widget.wnt_out",
  reference: "wnt_out",
  config: {},
  requires: ["TDK.INVENTORY.wnt_out.GRIDwnt_out", "TDK.INVENTORY.wnt_out.Cwnt_out"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cwnt_out",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelwnt_out",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDwnt_out" }],
    });

    this.callParent(arguments);
  },
});
