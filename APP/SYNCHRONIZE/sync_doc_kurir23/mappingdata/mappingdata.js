Ext.define("TDK.SYNCHRONIZE.sync_doc_kurir23.mappingdata.mappingdata", {
  extend: "Ext.form.Panel",
  alias: "widget.mappingdata",
  reference: "mappingdata",
  config: {},
  requires: ["TDK.SYNCHRONIZE.sync_doc_kurir23.mappingdata.GRIDmappingdata", "TDK.SYNCHRONIZE.sync_doc_kurir23.mappingdata.Cmappingdata"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cmappingdata",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_kurir23_mappingdata",
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
