var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.SYNCHRONIZE.sync_doc_kurir.dokumen_draft.dokumen_draft", {
  extend: "Ext.window.Window",
  alias: "widget.dokumen_draft",
  reference: "dokumen_draft",
  title: "Pembuatan Draft Dokumen",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: true,
  width: mainpanel.getWidth() * 0.9,
  height: mainpanel.getHeight() * 0.95,
  requires: ["TDK.SYNCHRONIZE.sync_doc_kurir.dokumen_draft.FRMdokumen_draft", "TDK.SYNCHRONIZE.sync_doc_kurir.dokumen_draft.Cdokumen_draft"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cdokumen_draft",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_kurir_dokumen_draft",
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
