Ext.define("TDK.INVENTORY_AW.inv_material_out_aw.datasync.live_tr.live_tr", {
  extend: "Ext.form.Panel",
  alias: "widget.live_tr",
  reference: "live_tr",
  config: {},
  requires: ["TDK.INVENTORY_AW.inv_material_out_aw.datasync.live_tr.Clive_tr", "TDK.INVENTORY_AW.inv_material_out_aw.datasync.live_tr.GRIDlive_tr"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Clive_tr",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_live_tr",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDlive_tr" }],
    });

    this.callParent(arguments);
  },
});
