Ext.define("NJC.STOCK_OPNAME.sto_goods.sto_goods", {
  extend: "Ext.form.Panel",
  alias: "widget.sto_goods",
  reference: "sto_goods",
  config: {},
  requires: ["NJC.STOCK_OPNAME.sto_goods.GRIDsto_goods", "NJC.STOCK_OPNAME.sto_goods.Csto_goods"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Csto_goods",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelsto_goods",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDsto_goods" }],
    });

    this.callParent(arguments);
  },
});
