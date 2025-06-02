Ext.define("TDK.SYNCHRONIZE.sync_doc_coo.receivingdata.receivingdata", {
  extend: "Ext.form.Panel",
  alias: "widget.coo_receivingdata",
  reference: "coo_receivingdata",
  config: {},
  requires: ["TDK.SYNCHRONIZE.sync_doc_coo.receivingdata.GRIDreceivingdata", "TDK.SYNCHRONIZE.sync_doc_coo.receivingdata.Creceivingdata"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Creceivingdata",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_coo_receivingdata",
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
