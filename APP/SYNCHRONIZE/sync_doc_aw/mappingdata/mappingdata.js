Ext.define("NJC.SYNCHRONIZE.sync_doc_aw.mappingdata.mappingdata", {
  extend: "Ext.form.Panel",
  alias: "widget.aw_mappingdata",
  reference: "aw_mappingdata",
  config: {},
  requires: ["NJC.SYNCHRONIZE.sync_doc_aw.mappingdata.GRIDmappingdata", "NJC.SYNCHRONIZE.sync_doc_aw.mappingdata.Cmappingdata"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cmappingdata",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_aw_mappingdata",
      layout: "card",
      frame: false,
      border: false,
      items: [
        {
          xtype: "GRIDmappingdata_aw",
        },
      ],
    });

    this.callParent(arguments);
  },
});
