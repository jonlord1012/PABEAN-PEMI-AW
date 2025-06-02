Ext.define("TDK.INVENTORY_AW.inv_wnt_out_aw.inv_wnt_out_aw", {
  extend: "Ext.form.Panel",
  alias: "widget.inv_wnt_out_aw",
  reference: "inv_wnt_out_aw",
  config: {},
  requires: ["TDK.INVENTORY_AW.inv_wnt_out_aw.GRIDinv_wnt_out_aw", "TDK.INVENTORY_AW.inv_wnt_out_aw.Cinv_wnt_out_aw"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cinv_wnt_out_aw",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelinv_wnt_out_aw",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDinv_wnt_out_aw" }],
    });

    this.callParent(arguments);
  },
});
