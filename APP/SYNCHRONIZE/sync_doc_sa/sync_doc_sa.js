Ext.define("TDK.SYNCHRONIZE.sync_doc_sa.sync_doc_sa", {
  extend: "Ext.form.Panel",
  alias: "widget.sync_doc_sa",
  reference: "sync_doc_sa",
  config: {},
  requires: [
    //
    "TDK.SYNCHRONIZE.sync_doc_sa.Csync_doc_sa",
    "TDK.SYNCHRONIZE.sync_doc_sa.GRIDsync_doc_sa",
  ],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Csync_doc_sa",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelsync_doc_sa",
      layout: "card",
      frame: false,
      border: false,
      items: [
        {
          xtype: "GRIDsync_doc_sa",
        },
      ],
      dockedItems: [
        {
          xtype: "toolbar",
          dock: "top",
          items: [
            "-",
            {
              xtype: "combobox",
              name: "CBO_FILTERKEY",
              fieldLabel: "Filter Data Key",
              labelWidth: 80,
              width: 350,
              displayField: "DEFNAME",
              valueField: "DEFCODE",
              fieldCls: "fieldinput",
              allowBlank: false,
              queryMode: "local",
              forceSelection: true,
              typeAhead: true,
              minChars: 0,
              anyMatch: true,
              value: "0",
              store: new Ext.data.Store({
                data: [
                  { DEFCODE: "0", DEFNAME: "All Data" },
                  { DEFCODE: "1", DEFNAME: "Belum Ada Dokumen BC" },
                  { DEFCODE: "2", DEFNAME: "Dokumen BC dalam proses Draft" },
                ],
                fields: ["DEFCODE", "DEFNAME"],
              }),
            },
            "-",
            { xtype: "button", pid: "btrefresh", icon: vconfig.getstyle + "icon/update.ico", tooltip: "Refresh Data" },
            "-",
            { xtype: "component", html: "Draft" },
            { xtype: "button", pid: "btproses_draft", icon: vconfig.getstyle + "icon/paperclip.ico", tooltip: "Pembuatan Draft Dokumen" },
          ],
          // other options....
        },
      ],
    });

    this.callParent(arguments);
  },
});
