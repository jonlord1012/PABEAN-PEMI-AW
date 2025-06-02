Ext.define("NJC.SYNCHRONIZE.portal_data_plb.portal_data_plb", {
  extend: "Ext.form.Panel",
  alias: "widget.portal_data_plb",
  reference: "portal_data_plb",
  config: {},
  requires: ["NJC.SYNCHRONIZE.portal_data_plb.GRIDportal_data_plb", "NJC.SYNCHRONIZE.portal_data_plb.Cportal_data_plb"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cportal_data_plb",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelportal_data",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDportal_data_plb" }],
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
                  { DEFCODE: "1", DEFNAME: "Outstanding Receiving Dokumen" },
                ],
                fields: ["DEFCODE", "DEFNAME"],
              }),
            },
            "-",
            { xtype: "button", pid: "btrefresh", icon: vconfig.getstyle + "icon/update.ico", tooltip: "Refresh Data" },
            "-",
            { xtype: "component", html: "Upload" },
            { xtype: "button", pid: "btupload_form", icon: vconfig.getstyle + "icon/up.ico", tooltip: "Upload form portal" },
            "-",
            { xtype: "component", html: "PORTAL" },
            { xtype: "button", pid: "btportal_form", icon: vconfig.getstyle + "icon/up.ico", tooltip: "Download form portal" },
            "-",
            { xtype: "component", html: "DOWNLOAD AJU" },
            { xtype: "button", pid: "btdownload_aju_plb", icon: vconfig.getstyle + "icon/up.ico", tooltip: "Download Dokumen BC from CEISA 4.0" },
            "-",
            { xtype: "component", html: "UPLOAD AJU" },
            { xtype: "button", pid: "btupload_aju_plb", icon: vconfig.getstyle + "icon/up.ico", tooltip: "Upload Dokumen From CEISA 4.0" },
            "-",
            "->",
            { xtype: "button", text: "Log", pid: "btlog_coo", icon: vconfig.getstyle + "icon/Book%201.ico", tooltip: "Log Dokumen Portal" },
          ],
          // other options....
        },
      ],
    });

    this.callParent(arguments);
  },
});
