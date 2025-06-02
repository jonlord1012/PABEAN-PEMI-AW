Ext.define("TDK.INVENTORY.inventory_out.inventory_out", {
  extend: "Ext.form.Panel",
  alias: "widget.inventory_out",
  reference: "inventory_out",
  config: {},
  requires: ["TDK.INVENTORY.inventory_out.GRIDinventory_out", "TDK.INVENTORY.inventory_out.Cinventory_out"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cinventory_out",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelinventory_out",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDinventory_out" }],
    });

    this.callParent(arguments);
  },
});
