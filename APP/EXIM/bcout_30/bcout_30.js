Ext.define("NJC.EXIM.bcout_30.bcout_30", {
    extend: "Ext.form.Panel",
    alias: "widget.bcout_30",
    reference: "bcout_30",
    config: {},
    requires: ["NJC.EXIM.bcout_30.GRIDbcout_30", "NJC.EXIM.bcout_30.Cbcout_30"],
    constructor: function (config) {
      return this.callParent(arguments);
    },
    //untuk include controller
    controller: "Cbcout_30",
    initComponent: function () {
      Ext.apply(this, {
        xtype: "panel",
        pid: "panelbcin_30",
        layout: "card",
        frame: false,
        border: false,
        items: [{ xtype: "GRIDbcout_30" }],
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
  