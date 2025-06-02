Ext.define("TDK.INVENTORY.inventory_in.inventory_in", {
  extend: "Ext.form.Panel",
  alias: "widget.inventory_in",
  reference: "inventory_in",
  config: {},
  requires: ["TDK.INVENTORY.inventory_in.GRIDinventory_in", "TDK.INVENTORY.inventory_in.Cinventory_in"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cinventory_in",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelinventory_in",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDinventory_in" }],
    });

    this.callParent(arguments);
  },
});
