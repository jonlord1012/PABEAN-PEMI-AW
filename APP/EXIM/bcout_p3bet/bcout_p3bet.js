Ext.define("NJC.EXIM.bcout_p3bet.bcout_p3bet", {
    extend: "Ext.form.Panel",
    alias: "widget.bcout_p3bet",
    reference: "bcout_p3bet",
    config: {},
    requires: ["NJC.EXIM.bcout_p3bet.GRIDbcout_p3bet", "NJC.EXIM.bcout_p3bet.Cbcout_p3bet"],
    constructor: function (config) {
      return this.callParent(arguments);
    },
    //untuk include controller
    controller: "Cbcout_p3bet",
    initComponent: function () {
      Ext.apply(this, {
        xtype: "panel",
        pid: "panelbcin_33",
        layout: "card",
        frame: false,
        border: false,
        items: [{ xtype: "GRIDbcout_p3bet" }],
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
  