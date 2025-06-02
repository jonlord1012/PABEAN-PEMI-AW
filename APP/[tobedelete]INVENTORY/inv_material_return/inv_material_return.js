Ext.define("TDK.INVENTORY.inv_material_return.inv_material_return", {
  extend: "Ext.form.Panel",
  alias: "widget.inv_material_return",
  reference: "inv_material_return",
  config: {},
  requires: ["TDK.INVENTORY.inv_material_return.GRIDinv_material_return", "TDK.INVENTORY.inv_material_return.Cinv_material_return"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cinv_material_return",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelinv_material_return",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDinv_material_return" }],
    });

    this.callParent(arguments);
  },
});
