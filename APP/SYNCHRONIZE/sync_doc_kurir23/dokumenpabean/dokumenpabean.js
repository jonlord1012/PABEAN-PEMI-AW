Ext.define("TDK.SYNCHRONIZE.sync_doc_kurir23.dokumenpabean.dokumenpabean", {
  extend: "Ext.form.Panel",
  alias: "widget.dokumenpabean",
  reference: "dokumenpabean",
  config: {},
  requires: ["TDK.SYNCHRONIZE.sync_doc_kurir23.dokumenpabean.GRIDdokumenpabean", "TDK.SYNCHRONIZE.sync_doc_kurir23.dokumenpabean.Cdokumenpabean"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cdokumenpabean",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_kurir23_dokumenpabean",
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
