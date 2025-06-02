Ext.define("TDK.INVENTORY.subaw_return.subaw_return", {
  extend: "Ext.form.Panel",
  alias: "widget.subaw_return",
  reference: "subaw_return",
  config: {},
  requires: ["TDK.INVENTORY.subaw_return.GRIDsubaw_return", "TDK.INVENTORY.subaw_return.Csubaw_return"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Csubaw_return",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelsubaw_return",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDsubaw_return" }],
    });

    this.callParent(arguments);
  },
});
