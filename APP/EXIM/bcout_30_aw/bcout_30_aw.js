Ext.define("NJC.EXIM.bcout_30_aw.bcout_30_aw", {
    extend: "Ext.form.Panel",
    alias: "widget.bcout_30_aw",
    reference: "bcout_30_aw",
    config: {},
    requires: ["NJC.EXIM.bcout_30_aw.GRIDbcout_30_aw", "NJC.EXIM.bcout_30_aw.Cbcout_30_aw"],
    constructor: function (config) {
      return this.callParent(arguments);
    },
    //untuk include controller
    controller: "Cbcout_30_aw",
    initComponent: function () {
      Ext.apply(this, {
        xtype: "panel",
        pid: "panelbcin_30_aw",
        layout: "card",
        frame: false,
        border: false,
        items: [{ xtype: "GRIDbcout_30_aw" }],
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
  