Ext.define("NJC.SYNCHRONIZE.portal_data.sumberdata.sumberdata", {
  extend: "Ext.form.Panel",
  alias: "widget.coo_sumberdata",
  reference: "coo_sumberdata",
  config: {},
  requires: ["NJC.SYNCHRONIZE.portal_data.sumberdata.GRIDsumberdata", "NJC.SYNCHRONIZE.portal_data.sumberdata.Csumberdata"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Csumberdata",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_coo_sumberdata",
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
