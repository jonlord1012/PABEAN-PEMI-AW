Ext.define("TDK.SYNCHRONIZE.sync_doc_lp.sumberdata.sumberdata", {
  extend: "Ext.form.Panel",
  alias: "widget.sumberdata",
  reference: "sumberdata",
  config: {},
  requires: ["TDK.SYNCHRONIZE.sync_doc_lp.sumberdata.GRIDsumberdata", "TDK.SYNCHRONIZE.sync_doc_lp.sumberdata.Csumberdata"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Csumberdata",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_lp_sumberdata",
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
