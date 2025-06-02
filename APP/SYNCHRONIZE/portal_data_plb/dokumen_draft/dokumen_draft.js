var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.SYNCHRONIZE.portal_data.dokumen_draft.dokumen_draft", {
  extend: "Ext.window.Window",
  id: "coo_dokumen_draft",
  alias: "widget.plb_dokumen_draft",
  reference: "plb_dokumen_draft",
  title: "Pembuatan Draft Dokumen",
  modal: true,
  closeAction: "destroy",
  autoDestroy: true,
  centered: true,
  autoScroll: true,
  width: mainpanel.getWidth() * 0.95,
  height: mainpanel.getHeight() * 0.9,
  requires: ["NJC.SYNCHRONIZE.portal_data.dokumen_draft.FRMdokumen_draft", "NJC.SYNCHRONIZE.portal_data.dokumen_draft.Cdokumen_draft"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cdokumen_draft",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_plb_dokumen_draft",
      layout: "card",
      frame: false,
      border: false,
      items: [
        {
          xtype: "FRMdokumen_draft",
        },
      ],
    });

    this.callParent(arguments);
  },
});
