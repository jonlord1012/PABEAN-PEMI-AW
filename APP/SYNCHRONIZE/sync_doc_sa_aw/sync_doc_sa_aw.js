Ext.define("TDK.SYNCHRONIZE.sync_doc_sa_aw.sync_doc_sa_aw", {
  extend: "Ext.form.Panel",
  alias: "widget.sync_doc_sa_aw",
  reference: "sync_doc_sa_aw",
  config: {},
  requires: [
    //
    "TDK.SYNCHRONIZE.sync_doc_sa_aw.Csync_doc_sa_aw",
    "TDK.SYNCHRONIZE.sync_doc_sa_aw.GRIDsync_doc_sa_aw",
  ],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Csync_doc_sa_aw",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelsync_doc_sa_aw",
      layout: "card",
      frame: false,
      border: false,
      items: [
        {
          xtype: "GRIDsync_doc_sa_aw",
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
