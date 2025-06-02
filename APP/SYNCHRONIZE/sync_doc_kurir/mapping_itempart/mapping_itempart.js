var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.SYNCHRONIZE.sync_doc_kurir.mapping_itempart.mapping_itempart", {
  extend: "Ext.window.Window",
  alias: "widget.mapping_itempart",
  reference: "mapping_itempart",
  title: "Proses Mapping Item/Part Material",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: true,
  width: mainpanel.getWidth() * 0.6,
  height: mainpanel.getHeight() * 0.7,
  requires: ["TDK.SYNCHRONIZE.sync_doc_kurir.mapping_itempart.FRMmapping_itempart", "TDK.SYNCHRONIZE.sync_doc_kurir.mapping_itempart.Cmapping_itempart"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cmapping_itempart",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_kurir_mapping_itempart",
      layout: "card",
      frame: false,
      border: false,
      items: [
        {
          xtype: "FRMmapping_itempart",
        },
      ],
    });

    this.callParent(arguments);
  },
});
