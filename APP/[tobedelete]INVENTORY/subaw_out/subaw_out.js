Ext.define("TDK.INVENTORY.subaw_out.subaw_out", {
  extend: "Ext.form.Panel",
  alias: "widget.subaw_out",
  reference: "subaw_out",
  config: {},
  requires: ["TDK.INVENTORY.subaw_out.GRIDsubaw_out", "TDK.INVENTORY.subaw_out.Csubaw_out"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Csubaw_out",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelsubaw_out",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDsubaw_out" }],
    });

    this.callParent(arguments);
  },
});
