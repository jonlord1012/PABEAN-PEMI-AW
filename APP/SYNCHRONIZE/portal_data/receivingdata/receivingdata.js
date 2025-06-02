Ext.define("NJC.SYNCHRONIZE.portal_data.receivingdata.receivingdata", {
  extend: "Ext.form.Panel",
  alias: "widget.portal_data_receivingdata",
  reference: "portal_data_receivingdata",
  config: {},
  requires: ["NJC.SYNCHRONIZE.portal_data.receivingdata.GRIDreceivingdata", "NJC.SYNCHRONIZE.portal_data.receivingdata.Creceivingdata"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Creceivingdata",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_portal_data_receivingdata",
      layout: "card",
      frame: false,
      border: false,
      items: [
        {
          xtype: "GRIDreceivingdata",
        },
      ],
    });

    this.callParent(arguments);
  },
});
