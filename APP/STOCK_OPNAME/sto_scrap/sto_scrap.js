Ext.define("NJC.STOCK_OPNAME.sto_scrap.sto_scrap", {
  extend: "Ext.form.Panel",
  alias: "widget.sto_scrap",
  reference: "sto_scrap",
  config: {},
  requires: ["NJC.STOCK_OPNAME.sto_scrap.GRIDsto_scrap", "NJC.STOCK_OPNAME.sto_scrap.Csto_scrap"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Csto_scrap",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelsto_scrap",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDsto_scrap" }],
    });

    this.callParent(arguments);
  },
});
