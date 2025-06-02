Ext.define("TDK.INVENTORY.inv_subaw_return.inv_subaw_return", {
  extend: "Ext.form.Panel",
  alias: "widget.inv_subaw_return",
  reference: "inv_subaw_return",
  config: {},
  requires: ["TDK.INVENTORY.inv_subaw_return.GRIDinv_subaw_return", "TDK.INVENTORY.inv_subaw_return.Cinv_subaw_return"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cinv_subaw_return",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelinv_subaw_return",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDinv_subaw_return" }],
    });

    this.callParent(arguments);
  },
});
