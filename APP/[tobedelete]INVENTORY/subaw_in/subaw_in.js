Ext.define("TDK.INVENTORY.subaw_in.subaw_in", {
  extend: "Ext.form.Panel",
  alias: "widget.subaw_in",
  reference: "subaw_in",
  config: {},
  requires: ["TDK.INVENTORY.subaw_in.GRIDsubaw_in", "TDK.INVENTORY.subaw_in.Csubaw_in"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Csubaw_in",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelsubaw_in",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDsubaw_in" }],
    });

    this.callParent(arguments);
  },
});
