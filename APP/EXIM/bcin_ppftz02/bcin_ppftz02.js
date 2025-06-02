Ext.define("TDK.EXIM.bcin_ppftz02.bcin_ppftz02", {
  extend: "Ext.form.Panel",
  alias: "widget.bcin_ppftz02",
  id: "bcin_ppftz02",
  reference: "bcin_ppftz02",
  config: {},
  requires: ["TDK.EXIM.bcin_ppftz02.GRIDbcin_ppftz02", "TDK.EXIM.bcin_ppftz02.Cbcin_ppftz02"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cbcin_ppftz02",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelbcin_ppftz02",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDbcin_ppftz02" }],
      dockedItems: [
        {
          xtype: "toolbar",
          height: 30,
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
                  { DEFCODE: "1", DEFNAME: "Dokumen Masih Proses Draft" },
                  { DEFCODE: "2", DEFNAME: "Dokumen Belum SPPD" },
                ],
                fields: ["DEFCODE", "DEFNAME"],
              }),
            },
            "-",
            { xtype: "button", pid: "btrefresh", icon: vconfig.getstyle + "icon/update.ico", tooltip: "Refresh Data" },
            "-",
          ],
          // other options....
        },
      ],
    });

    this.callParent(arguments);
  },
});
