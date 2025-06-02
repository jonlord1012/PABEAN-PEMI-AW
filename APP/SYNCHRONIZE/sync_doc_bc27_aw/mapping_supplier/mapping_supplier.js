var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.SYNCHRONIZE.sync_doc_bc27_aw.mapping_supplier.mapping_supplier", {
  extend: "Ext.window.Window",
  alias: "widget.aw_mapping_supplier",
  reference: "aw_mapping_supplier",
  title: "Proses Mapping Supplier",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: true,
  width: mainpanel.getWidth() * 0.5,
  height: mainpanel.getHeight() * 0.5,
  requires: ["TDK.SYNCHRONIZE.sync_doc_bc27_aw.mapping_supplier.FRMmapping_supplier", "TDK.SYNCHRONIZE.sync_doc_bc27_aw.mapping_supplier.Cmapping_supplier"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cmapping_supplier",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_aw_mapping_supplier",
      layout: "card",
      frame: false,
      border: false,
      items: [
        {
          xtype: "FRMmapping_supplier",
        },
      ],
    });

    this.callParent(arguments);
  },
});
