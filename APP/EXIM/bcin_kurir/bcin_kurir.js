Ext.define("TDK.EXIM.bcin_kurir.bcin_kurir", {
  extend: "Ext.form.Panel",
  alias: "widget.bcin_kurir",
  reference: "bcin_kurir",
  config: {},
  requires: ["TDK.EXIM.bcin_kurir.GRIDbcin_kurir", "TDK.EXIM.bcin_kurir.Cbcin_kurir"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cbcin_kurir",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelbcin_kurir",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDbcin_kurir" }],
    });

    this.callParent(arguments);
  },
});
