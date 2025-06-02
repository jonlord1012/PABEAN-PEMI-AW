Ext.define("TDK.STOCK_OPNAME.sto_periode.sto_periode", {
  extend: "Ext.form.Panel",
  alias: "widget.sto_periode",
  reference: "sto_periode",
  config: {},
  requires: ["TDK.STOCK_OPNAME.sto_periode.GRIDsto_periode", "TDK.STOCK_OPNAME.sto_periode.Csto_periode"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Csto_periode",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelsto_periode",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDsto_periode" }],
    });

    this.callParent(arguments);
  },
});
