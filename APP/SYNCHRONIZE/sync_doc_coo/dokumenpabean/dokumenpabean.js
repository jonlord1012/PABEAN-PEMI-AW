Ext.define("TDK.SYNCHRONIZE.sync_doc_coo.dokumenpabean.dokumenpabean", {
  extend: "Ext.form.Panel",
  alias: "widget.dokumenpabean",
  reference: "coo_dokumenpabean",
  config: {},
  requires: ["TDK.SYNCHRONIZE.sync_doc_coo.dokumenpabean.GRIDdokumenpabean", "TDK.SYNCHRONIZE.sync_doc_coo.dokumenpabean.Cdokumenpabean"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cdokumenpabean",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_coo_dokumenpabean",
      layout: "card",
      frame: false,
      border: false,
      items: [
        {
          xtype: "GRIDdokumenpabean",
        },
      ],
    });

    this.callParent(arguments);
  },
});
