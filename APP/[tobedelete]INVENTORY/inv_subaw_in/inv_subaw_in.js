Ext.define("TDK.INVENTORY.inv_subaw_in.inv_subaw_in", {
  extend: "Ext.form.Panel",
  alias: "widget.inv_subaw_in",
  reference: "inv_subaw_in",
  config: {},
  requires: ["TDK.INVENTORY.inv_subaw_in.GRIDinv_subaw_in", "TDK.INVENTORY.inv_subaw_in.Cinv_subaw_in"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cinv_subaw_in",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelinv_subaw_in",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDinv_subaw_in" }],
    });

    this.callParent(arguments);
  },
});
