Ext.define("TDK.SYNCHRONIZE.sync_doc_lp.dokumenceisa.dokumenceisa", {
  extend: "Ext.form.Panel",
  alias: "widget.dokumenceisa",
  reference: "dokumenceisa",
  config: {},
  requires: ["TDK.SYNCHRONIZE.sync_doc_lp.dokumenceisa.GRIDdokumenceisa", "TDK.SYNCHRONIZE.sync_doc_lp.dokumenceisa.Cdokumenceisa"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cdokumenceisa",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_lp_dokumenceisa",
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
