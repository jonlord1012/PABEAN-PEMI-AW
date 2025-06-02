Ext.define("TDK.STOCK_OPNAME.sto_mat.sto_mat", {
  extend: "Ext.form.Panel",
  alias: "widget.sto_mat",
  reference: "sto_mat",
  config: {},
  requires: ["TDK.STOCK_OPNAME.sto_mat.GRIDsto_mat", "TDK.STOCK_OPNAME.sto_mat.Csto_mat"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Csto_mat",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelsto_mat",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDsto_mat" }],
    });

    this.callParent(arguments);
  },
});
