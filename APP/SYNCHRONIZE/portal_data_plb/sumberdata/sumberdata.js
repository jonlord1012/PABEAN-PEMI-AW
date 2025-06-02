Ext.define("NJC.SYNCHRONIZE.portal_data_plb.sumberdata.sumberdata", {
  extend: "Ext.form.Panel",
  alias: "widget.plb_sumberdata",
  reference: "plb_sumberdata",
  config: {},
  requires: ["NJC.SYNCHRONIZE.portal_data_plb.sumberdata.GRIDsumberdata", "NJC.SYNCHRONIZE.portal_data_plb.sumberdata.Csumberdata"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Csumberdata",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_plb_sumberdata",
      layout: "card",
      frame: false,
      border: false,
      items: [
        {
          xtype: "GRIDsumberdata",
        },
      ],
    });

    this.callParent(arguments);
  },
});
