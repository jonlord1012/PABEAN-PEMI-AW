Ext.define("TDK.INVENTORY.inv_wnt_out.inv_wnt_out", {
  extend: "Ext.form.Panel",
  alias: "widget.inv_wnt_out",
  reference: "inv_wnt_out",
  config: {},
  requires: ["TDK.INVENTORY.inv_wnt_out.GRIDinv_wnt_out", "TDK.INVENTORY.inv_wnt_out.Cinv_wnt_out"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cinv_wnt_out",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelinv_wnt_out",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDinv_wnt_out" }],
    });

    this.callParent(arguments);
  },
});
