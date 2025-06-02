Ext.define("TDK.SYNCHRONIZE.sync_doc_coo.dokumenceisa.dokumenceisa", {
  extend: "Ext.form.Panel",
  alias: "widget.coo_dokumenceisa",
  reference: "coo_dokumenceisa",
  config: {},
  requires: ["TDK.SYNCHRONIZE.sync_doc_coo.dokumenceisa.GRIDdokumenceisa", "TDK.SYNCHRONIZE.sync_doc_coo.dokumenceisa.Cdokumenceisa"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cdokumenceisa",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_coo_dokumenceisa",
      layout: "card",
      frame: false,
      border: false,
      items: [
        {
          xtype: "GRIDdokumenceisa",
        },
      ],
    });

    this.callParent(arguments);
  },
});
