var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.SYNCHRONIZE.portal_data.mapping_itempart.mapping_itempart", {
  extend: "Ext.window.Window",
  alias: "widget.coo_mapping_itempart",
  reference: "coo_mapping_itempart",
  title: "Proses Mapping Item/Part Material",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: true,
  width: mainpanel.getWidth() * 0.6,
  height: mainpanel.getHeight() * 0.7,
  requires: ["NJC.SYNCHRONIZE.portal_data.mapping_itempart.FRMmapping_itempart", "NJC.SYNCHRONIZE.portal_data.mapping_itempart.Cmapping_itempart"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Ccoomapping_itempart",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_coo_mapping_itempart",
      layout: "card",
      frame: false,
      border: false,
      items: [
        {
          xtype: "cooFRMmapping_itempart",
        },
      ],
    });

    this.callParent(arguments);
  },
});
