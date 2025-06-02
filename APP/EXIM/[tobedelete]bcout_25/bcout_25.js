Ext.define("TDK.EXIM.bcout_25.bcout_25", {
  extend: "Ext.form.Panel",
  alias: "widget.bcout_25",
  reference: "bcout_25",
  config: {},
  requires: ["TDK.EXIM.bcout_25.GRIDbcout_25", "TDK.EXIM.bcout_25.Cbcout_25"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cbcout_25",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelbcout_25",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDbcout_25" }],
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
