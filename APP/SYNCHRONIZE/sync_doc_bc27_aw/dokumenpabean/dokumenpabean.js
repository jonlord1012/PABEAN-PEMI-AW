Ext.define("TDK.SYNCHRONIZE.sync_doc_bc27_aw.dokumenpabean.dokumenpabean", {
  extend: "Ext.form.Panel",
  alias: "widget.dokumenpabean",
  reference: "aw_dokumenpabean",
  config: {},
  requires: ["TDK.SYNCHRONIZE.sync_doc_bc27_aw.dokumenpabean.GRIDdokumenpabean", "TDK.SYNCHRONIZE.sync_doc_bc27_aw.dokumenpabean.Cdokumenpabean"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cdokumenpabean",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_aw_dokumenpabean",
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
