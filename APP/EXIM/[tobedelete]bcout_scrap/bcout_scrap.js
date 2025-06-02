Ext.define("TDK.EXIM.bcout_scrap.bcout_scrap", {
  extend: "Ext.form.Panel",
  alias: "widget.bcout_scrap",
  reference: "bcout_scrap",
  config: {},
  requires: ["TDK.EXIM.bcout_scrap.GRIDbcout_scrap", "TDK.EXIM.bcout_scrap.Cbcout_scrap"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cbcout_scrap",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelbcout_scrap",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDbcout_scrap" }],
    });

    this.callParent(arguments);
  },
});
