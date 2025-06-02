Ext.define("TDK.SYNCHRONIZE.sync_doc_sa.dokumen_detail.dokumen_detail_sd_sumber_data", {
  extend: "Ext.form.Panel",
  alias: "widget.dokumen_detail_sd_sumber_data",
  reference: "dokumen_detail_sd_sumber_data",
  frame: false,
  border: true,
  autoScroll: true,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
  fieldDefaults: {
    labelAlign: "left",
    labelWidth: 90,
    margin: "0 10 5 0",
  },
  items: [],
  dockedItems: [
    {
      xtype: "toolbar",
      height: 30,
      dock: "top",
      items: ["-"],
      // other options....
    },
  ],
});
