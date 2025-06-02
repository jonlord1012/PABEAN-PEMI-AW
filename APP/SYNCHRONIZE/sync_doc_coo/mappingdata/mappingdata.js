Ext.define("TDK.SYNCHRONIZE.sync_doc_coo.mappingdata.mappingdata", {
  extend: "Ext.form.Panel",
  alias: "widget.coo_mappingdata",
  reference: "coo_mappingdata",
  config: {},
  requires: ["TDK.SYNCHRONIZE.sync_doc_coo.mappingdata.GRIDmappingdata", "TDK.SYNCHRONIZE.sync_doc_coo.mappingdata.Cmappingdata"],
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
