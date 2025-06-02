Ext.define("NJC.SYNCHRONIZE.sync_doc_aw.receivingdata.receivingdata", {
  extend: "Ext.form.Panel",
  alias: "widget.aw_receivingdata",
  reference: "aw_receivingdata",
  config: {},
  requires: ["NJC.SYNCHRONIZE.sync_doc_aw.receivingdata.GRIDreceivingdata", "NJC.SYNCHRONIZE.sync_doc_aw.receivingdata.Creceivingdata_aw"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Creceivingdata_aw",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_aw_receivingdata",
      layout: "card",
      frame: false,
      border: false,
      items: [
        {
          xtype: "GRIDreceivingdata_aw",
        },
      ],
    });

    this.callParent(arguments);
  },
});
