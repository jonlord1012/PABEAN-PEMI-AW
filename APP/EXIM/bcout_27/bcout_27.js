Ext.define("NJC.EXIM.bcout_27.bcout_27", {
    extend: "Ext.form.Panel",
    alias: "widget.bcout_27",
    reference: "bcout_27",
    config: {},
    requires: ["NJC.EXIM.bcout_27.GRIDbcout_27", "NJC.EXIM.bcout_27.Cbcout_27"],
    constructor: function (config) {
      return this.callParent(arguments);
    },
    //untuk include controller
    controller: "Cbcout_27",
    initComponent: function () {
      Ext.apply(this, {
        xtype: "panel",
        pid: "panelbcin_27",
        layout: "card",
        frame: false,
        border: false,
        items: [{ xtype: "GRIDbcout_27" }],
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
  