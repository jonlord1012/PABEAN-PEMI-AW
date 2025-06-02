Ext.define("TDK.EXIM.bcin_kurir23.bcin_kurir23", {
  extend: "Ext.form.Panel",
  alias: "widget.bcin_kurir23",
  reference: "bcin_kurir23",
  config: {},
  requires: ["TDK.EXIM.bcin_kurir23.GRIDbcin_kurir23", "TDK.EXIM.bcin_kurir23.Cbcin_kurir23"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cbcin_kurir23",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelbcin_kurir23",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDbcin_kurir23" }],
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
