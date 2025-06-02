Ext.define("NJC.SYNCHRONIZE.portal_data_plb.dokumenpabean.dokumenpabean", {
  extend: "Ext.form.Panel",
  alias: "widget.dokumenpabean",
  reference: "portal_dokumenpabean",
  config: {},
  requires: ["NJC.SYNCHRONIZE.portal_data_plb.dokumenpabean.GRIDdokumenpabean", "NJC.SYNCHRONIZE.portal_data_plb.dokumenpabean.Cdokumenpabean"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cdokumenpabean",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_portal_dokumenpabean",
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
