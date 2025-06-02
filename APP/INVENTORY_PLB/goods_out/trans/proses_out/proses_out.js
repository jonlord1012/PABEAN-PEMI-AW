Ext.define("TDK.INVENTORY_PLB.goods_out.trans.proses_out.proses_out", {
  extend: "Ext.form.Panel",
  alias: "widget.proses_out",
  reference: "proses_out",
  config: {},
  requires: ["TDK.INVENTORY_PLB.goods_out.trans.proses_out.Cproses_out", "TDK.INVENTORY_PLB.goods_out.trans.proses_out.FRMproses_out"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cproses_out",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_proses_out",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "FRMproses_out" }],
    });

    this.callParent(arguments);
  },
});
