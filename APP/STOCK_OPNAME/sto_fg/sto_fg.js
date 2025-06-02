Ext.define("TDK.STOCK_OPNAME.sto_fg.sto_fg", {
  extend: "Ext.form.Panel",
  alias: "widget.sto_fg",
  reference: "sto_fg",
  config: {},
  requires: ["TDK.STOCK_OPNAME.sto_fg.GRIDsto_fg", "TDK.STOCK_OPNAME.sto_fg.Csto_fg"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Csto_fg",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelsto_fg",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDsto_fg" }],
    });

    this.callParent(arguments);
  },
});
