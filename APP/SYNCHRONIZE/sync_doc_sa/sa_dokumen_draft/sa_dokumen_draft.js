var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.SYNCHRONIZE.sync_doc_sa.sa_dokumen_draft.sa_dokumen_draft", {
  extend: "Ext.window.Window",
  id: "sa_dokumen_draft",
  alias: "widget.sa_dokumen_draft",
  reference: "sa_dokumen_draft",
  title: "Pembuatan Draft Dokumen",
  modal: true,
  closeAction: "destroy",
  autoDestroy: true,
  centered: true,
  autoScroll: true,
  width: mainpanel.getWidth() * 0.95,
  height: mainpanel.getHeight() * 0.9,
  requires: ["TDK.SYNCHRONIZE.sync_doc_sa.sa_dokumen_draft.FRMsa_dokumen_draft", "TDK.SYNCHRONIZE.sync_doc_sa.sa_dokumen_draft.Csa_dokumen_draft"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Csa_dokumen_draft",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_sa_dokumen_draft",
      layout: "card",
      frame: false,
      border: false,
      items: [
        {
          xtype: "FRMsa_dokumen_draft",
        },
      ],
    });

    this.callParent(arguments);
  },
});
