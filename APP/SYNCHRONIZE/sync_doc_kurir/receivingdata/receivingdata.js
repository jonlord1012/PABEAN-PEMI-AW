Ext.define("TDK.SYNCHRONIZE.sync_doc_kurir.receivingdata.receivingdata", {
  extend: "Ext.form.Panel",
  alias: "widget.receivingdata",
  reference: "receivingdata",
  config: {},
  requires: ["TDK.SYNCHRONIZE.sync_doc_kurir.receivingdata.GRIDreceivingdata", "TDK.SYNCHRONIZE.sync_doc_kurir.receivingdata.Creceivingdata"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Creceivingdata",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_kurir_receivingdata",
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
