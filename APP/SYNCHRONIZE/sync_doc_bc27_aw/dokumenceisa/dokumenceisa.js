Ext.define("TDK.SYNCHRONIZE.sync_doc_bc27_aw.dokumenceisa.dokumenceisa", {
  extend: "Ext.form.Panel",
  alias: "widget.aw_dokumenceisa",
  reference: "aw_dokumenceisa",
  config: {},
  requires: ["TDK.SYNCHRONIZE.sync_doc_bc27_aw.dokumenceisa.GRIDdokumenceisa", "TDK.SYNCHRONIZE.sync_doc_bc27_aw.dokumenceisa.Cdokumenceisa"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cdokumenceisa",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_aw_dokumenceisa",
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
