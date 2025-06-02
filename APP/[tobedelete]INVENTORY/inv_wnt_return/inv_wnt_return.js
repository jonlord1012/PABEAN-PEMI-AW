Ext.define("TDK.INVENTORY.inv_wnt_return.inv_wnt_return", {
  extend: "Ext.form.Panel",
  alias: "widget.inv_wnt_return",
  reference: "inv_wnt_return",
  config: {},
  requires: ["TDK.INVENTORY.inv_wnt_return.GRIDinv_wnt_return", "TDK.INVENTORY.inv_wnt_return.Cinv_wnt_return"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cinv_wnt_return",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelinv_wnt_return",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDinv_wnt_return" }],
    });

    this.callParent(arguments);
  },
});
