Ext.define("TDK.STOCK_OPNAME.sto_wt.sto_wt", {
  extend: "Ext.form.Panel",
  alias: "widget.sto_wt",
  reference: "sto_wt",
  config: {},
  requires: ["TDK.STOCK_OPNAME.sto_wt.GRIDsto_wt", "TDK.STOCK_OPNAME.sto_wt.Csto_wt"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Csto_wt",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelsto_wt",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDsto_wt" }],
    });

    this.callParent(arguments);
  },
});
