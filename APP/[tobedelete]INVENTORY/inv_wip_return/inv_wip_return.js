Ext.define("TDK.INVENTORY.inv_wip_return.inv_wip_return", {
  extend: "Ext.form.Panel",
  alias: "widget.inv_wip_return",
  reference: "inv_wip_return",
  config: {},
  requires: ["TDK.INVENTORY.inv_wip_return.GRIDinv_wip_return", "TDK.INVENTORY.inv_wip_return.Cinv_wip_return"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cinv_wip_return",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelinv_wip_return",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDinv_wip_return" }],
    });

    this.callParent(arguments);
  },
});
