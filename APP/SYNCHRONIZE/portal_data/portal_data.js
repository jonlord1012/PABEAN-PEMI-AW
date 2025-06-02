Ext.define("NJC.SYNCHRONIZE.portal_data.portal_data", {
   extend: "Ext.form.Panel",
   alias: "widget.portal_data",
   reference: "portal_data",
   config: {},
   requires: ["NJC.SYNCHRONIZE.portal_data.GRIDportal_data", "NJC.SYNCHRONIZE.portal_data.Cportal_data"],
   constructor: function (config) {
      return this.callParent(arguments);
   },
   //untuk include controller
   controller: "Cportal_data",
   initComponent: function () {
      Ext.apply(this, {
         xtype: "panel",
         pid: "panelportal_data",
         layout: "card",
         frame: false,
         border: false,
         items: [{ xtype: "GRIDportal_data" }],
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
                  { xtype: "component", html: "UPLOAD BC" },
                  { xtype: "button", pid: "btupload_form", icon: vconfig.getstyle + "icon/up.ico", tooltip: "Upload form portal" },
                  "-",/*
                  { xtype: "component", html: "PORTAL" },
                  { xtype: "button", pid: "btportal_form", icon: vconfig.getstyle + "icon/up.ico", tooltip: "Download form portal" },
                  "-",
                  { xtype: "component", html: "DOWNLOAD AJU" },
                  { xtype: "button", pid: "btdownload_aju", icon: vconfig.getstyle + "icon/up.ico", tooltip: "Download Dokumen BC from CEISA 4.0" },
                  "-",
                  { xtype: "component", html: "LAST AJU" },
                  { xtype: "button", pid: "btlast_aju", icon: vconfig.getstyle + "icon/up.ico", tooltip: "Download LAST AJU from CEISA 4.0" },
*/
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
