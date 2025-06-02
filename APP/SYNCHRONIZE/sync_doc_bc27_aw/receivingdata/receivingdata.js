Ext.define("TDK.SYNCHRONIZE.sync_doc_bc27_aw.receivingdata.receivingdata", {
  extend: "Ext.form.Panel",
  alias: "widget.aw_receivingdata",
  reference: "aw_receivingdata",
  config: {},
  requires: ["TDK.SYNCHRONIZE.sync_doc_bc27_aw.receivingdata.GRIDreceivingdata", "TDK.SYNCHRONIZE.sync_doc_bc27_aw.receivingdata.Creceivingdata"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Creceivingdata",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_aw_receivingdata",
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
