Ext.define("TDK.INVENTORY_PLB.inv_material_in_aw.receiving_detail.dokumenceisa.dokumenceisa", {
  extend: "Ext.form.Panel",
  alias: "widget.aw_dokumenceisa",
  reference: "aw_dokumenceisa",
  config: {},
  requires: ["TDK.INVENTORY_AW.inv_material_in_aw.receiving_detail.dokumenceisa.GRIDdokumenceisa", "TDK.INVENTORY_AW.inv_material_in_aw.receiving_detail.dokumenceisa.Cdokumenceisa"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cdokumenceisa",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_aw_dokumenceisa",
      layout: "card",
      frame: false,
      border: false,
      items: [
        {
          xtype: "GRIDdokumenceisa",
        },
      ],
    });

    this.callParent(arguments);
  },
});