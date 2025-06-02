Ext.define("TDK.INVENTORY.inv_subaw_out.inv_subaw_out", {
  extend: "Ext.form.Panel",
  alias: "widget.inv_subaw_out",
  reference: "inv_subaw_out",
  config: {},
  requires: ["TDK.INVENTORY.inv_subaw_out.GRIDinv_subaw_out", "TDK.INVENTORY.inv_subaw_out.Cinv_subaw_out"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cinv_subaw_out",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelinv_subaw_out",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDinv_subaw_out" }],
    });

    this.callParent(arguments);
  },
});
