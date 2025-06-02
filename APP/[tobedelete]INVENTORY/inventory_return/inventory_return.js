Ext.define("TDK.INVENTORY.inventory_return.inventory_return", {
  extend: "Ext.form.Panel",
  alias: "widget.inventory_return",
  reference: "inventory_return",
  config: {},
  requires: ["TDK.INVENTORY.inventory_return.GRIDinventory_return", "TDK.INVENTORY.inventory_return.Cinventory_return"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cinventory_return",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelinventory_return",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDinventory_return" }],
    });

    this.callParent(arguments);
  },
});
