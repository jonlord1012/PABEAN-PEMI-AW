var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.SYNCHRONIZE.sync_delivery_instruction.dokumen_draft_out.dokumen_draft_out", {
  extend: "Ext.window.Window",
  id: "aw_dokumen_draft_out",
  alias: "widget.aw_dokumen_draft_out",
  reference: "aw_dokumen_draft_out",
  title: "Pembuatan Draft Dokumen",
  modal: true,
  closeAction: "destroy",
  autoDestroy: true,
  centered: true,
  autoScroll: true,
  width: mainpanel.getWidth() * 0.95,
  height: mainpanel.getHeight() * 0.9,
  requires: ["NJC.SYNCHRONIZE.sync_delivery_instruction.dokumen_draft_out.FRMdokumen_draft_out", "NJC.SYNCHRONIZE.sync_delivery_instruction.dokumen_draft_out.Cdokumen_draft_out"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cdokumen_draft_out",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_aw_dokumen_draft_out",
      layout: "card",
      frame: false,
      border: false,
      items: [
        {
          xtype: "FRMdokumen_draft_out",
        },
      ],
    });

    this.callParent(arguments);
  },
});
