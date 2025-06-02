Ext.define("TDK.SYNCHRONIZE.sync_doc_coo.sumberdata.sumberdata", {
  extend: "Ext.form.Panel",
  alias: "widget.coo_sumberdata",
  reference: "coo_sumberdata",
  config: {},
  requires: ["TDK.SYNCHRONIZE.sync_doc_coo.sumberdata.GRIDsumberdata", "TDK.SYNCHRONIZE.sync_doc_coo.sumberdata.Csumberdata"],
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
