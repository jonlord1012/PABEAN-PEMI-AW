Ext.define("NJC.SYNCHRONIZE.portal_data_plb.mappingdata.mappingdata", {
  extend: "Ext.form.Panel",
  alias: "widget.plb_mappingdata",
  reference: "plb_mappingdata",
  config: {},
  requires: ["NJC.SYNCHRONIZE.portal_data_plb.mappingdata.GRIDmappingdata", "NJC.SYNCHRONIZE.portal_data_plb.mappingdata.Cmappingdata"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cmappingdata",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_plb_mappingdata",
      layout: "card",
      frame: false,
      border: false,
      items: [
        {
          xtype: "GRIDmappingdata",
        },
      ],
    });

    this.callParent(arguments);
  },
});
