var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.SYNCHRONIZE.sync_doc_molts.dokumen_draft.dokumen_draft", {
  extend: "Ext.window.Window",
  id: "molts_dokumen_draft",
  alias: "widget.molts_dokumen_draft",
  reference: "molts_dokumen_draft",
  title: "Pembuatan Draft Dokumen",
  modal: true,
  closeAction: "destroy",
  autoDestroy: true,
  centered: true,
  autoScroll: true,
  width: mainpanel.getWidth() * 0.9,
  height: mainpanel.getHeight() * 0.95,
  requires: ["TDK.SYNCHRONIZE.sync_doc_molts.dokumen_draft.FRMdokumen_draft", "TDK.SYNCHRONIZE.sync_doc_molts.dokumen_draft.Cdokumen_draft"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cdokumen_draft",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_molts_dokumen_draft",
      layout: "card",
      frame: false,
      border: false,
      items: [
        {
          xtype: "COOFRMdokumen_draft",
        },
      ],
    });

    this.callParent(arguments);
  },
});
