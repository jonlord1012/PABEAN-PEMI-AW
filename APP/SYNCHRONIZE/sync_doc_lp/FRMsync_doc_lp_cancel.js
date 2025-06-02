var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.SYNCHRONIZE.sync_doc_lp.FRMsync_doc_lp_cancel", {
  extend: "Ext.window.Window",
  alias: "widget.FRMsync_doc_lp_cancel",
  reference: "FRMsync_doc_lp_cancel",
  title: "Proses Cancel Synchronize LP",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: true,
  controller: "Csync_doc_lp",
  //y: -110,
  bodyPadding: "5 5 5 5",
  width: mainpanel.getWidth() * 0.4,
  height: mainpanel.getHeight() * 0.6,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
  items: [],
});
