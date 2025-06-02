Ext.define("TDK.SYNCHRONIZE.sync_doc_kurir.sumberdata.sumberdata", {
  extend: "Ext.form.Panel",
  alias: "widget.sumberdata",
  reference: "sumberdata",
  config: {},
  requires: ["TDK.SYNCHRONIZE.sync_doc_kurir.sumberdata.GRIDsumberdata", "TDK.SYNCHRONIZE.sync_doc_kurir.sumberdata.Csumberdata"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Csumberdata",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_kurir_sumberdata",
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
