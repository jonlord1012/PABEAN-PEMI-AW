var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.SYNCHRONIZE.sync_doc_bc27_aw.dokumen_draft.dokumen_draft", {
  extend: "Ext.window.Window",
  id: "aw_dokumen_draft",
  alias: "widget.aw_dokumen_draft",
  reference: "aw_dokumen_draft",
  title: "Pembuatan Draft Dokumen",
  modal: true,
  closeAction: "destroy",
  autoDestroy: true,
  centered: true,
  autoScroll: true,
  width: mainpanel.getWidth() * 0.95,
  height: mainpanel.getHeight() * 0.9,
  requires: ["TDK.SYNCHRONIZE.sync_doc_bc27_aw.dokumen_draft.FRMdokumen_draft", "TDK.SYNCHRONIZE.sync_doc_bc27_aw.dokumen_draft.Cdokumen_draft"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cdokumen_draft",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_aw_dokumen_draft",
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
