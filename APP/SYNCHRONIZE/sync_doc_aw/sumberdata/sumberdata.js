Ext.define("NJC.SYNCHRONIZE.sync_doc_aw.sumberdata.sumberdata", {
  extend: "Ext.form.Panel",
  alias: "widget.aw_sumberdata",
  reference: "aw_sumberdata",
  config: {},
  requires: ["NJC.SYNCHRONIZE.sync_doc_aw.sumberdata.GRIDsumberdata", "NJC.SYNCHRONIZE.sync_doc_aw.sumberdata.Csumberdata"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Csumberdata",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_aw_sumberdata",
      layout: "card",
      frame: false,
      border: false,
      items: [
        {
          xtype: "GRIDsumberdata_aw",
        },
      ],
    });

    this.callParent(arguments);
  },
});
