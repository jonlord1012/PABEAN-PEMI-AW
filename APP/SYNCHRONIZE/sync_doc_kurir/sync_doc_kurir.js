Ext.define("TDK.SYNCHRONIZE.sync_doc_kurir.sync_doc_kurir", {
  extend: "Ext.form.Panel",
  alias: "widget.sync_doc_kurir",
  reference: "sync_doc_kurir",
  config: {},
  requires: ["TDK.SYNCHRONIZE.sync_doc_kurir.GRIDsync_doc_kurir", "TDK.SYNCHRONIZE.sync_doc_kurir.Csync_doc_kurir"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Csync_doc_kurir",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelsync_doc_kurir",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDsync_doc_kurir" }],
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
              value: "1",
              store: new Ext.data.Store({
                data: [
                  { DEFCODE: "0", DEFNAME: "All Data" },
                  { DEFCODE: "1", DEFNAME: "Belum Mapping Supplier" },
                  { DEFCODE: "2", DEFNAME: "Belum Mapping Item/Part" },
                  { DEFCODE: "3", DEFNAME: "Belum Ada Dokumen BC" },
                  { DEFCODE: "4", DEFNAME: "Belum Proses Receiving Dokumen" },
                ],
                fields: ["DEFCODE", "DEFNAME"],
              }),
            },
            "-",
            { xtype: "button", pid: "btrefresh", icon: vconfig.getstyle + "icon/update.ico", tooltip: "Refresh Data" },
            "-",
            { xtype: "component", html: "Sync" },
            { xtype: "button", pid: "btprocess_sync", icon: vconfig.getstyle + "icon/table_refresh.png", tooltip: "Sinkronisasi Data KURIR" },
            { xtype: "button", pid: "btprocess_syncaju", icon: vconfig.getstyle + "icon/split%20cells.ico", tooltip: "Sinkronisasi Nomor Aju" },
            "-",
            { xtype: "component", html: "Mapping" },
            { xtype: "button", pid: "btmapping_supplier", icon: vconfig.getstyle + "icon/show_complete.png", tooltip: "Mapping Supplier" },
            { xtype: "button", pid: "btmapping_itempart", icon: vconfig.getstyle + "icon/show_all.png", tooltip: "Mapping Item Part/Material" },
            "-",
            { xtype: "component", html: "Draft" },
            { xtype: "button", pid: "btdokumen_draft", icon: vconfig.getstyle + "icon/paperclip.ico", tooltip: "Pembuatan Draft Dokumen" },
            "-",
            "->",
            { xtype: "button", text: "Log", pid: "btlog_kurir", icon: vconfig.getstyle + "icon/Book%201.ico", tooltip: "Log Dokumen KURIR" },
          ],
          // other options....
        },
      ],
    });

    this.callParent(arguments);
  },
});
