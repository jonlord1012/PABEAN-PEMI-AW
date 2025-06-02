Ext.define("NJC.SYNCHRONIZE.portal_data.mappingdata.mappingdata", {
  extend: "Ext.form.Panel",
  alias: "widget.portal_mappingdata",
  reference: "portal_mappingdata",
  config: {},
  requires: ["NJC.SYNCHRONIZE.portal_data.mappingdata.GRIDmappingdata", "NJC.SYNCHRONIZE.portal_data.mappingdata.Cmappingdata"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cmappingdata",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_coo_mappingdata",
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
