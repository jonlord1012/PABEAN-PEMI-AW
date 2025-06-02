Ext.define("TDK.INVENTORY_AW.inv_fg_in_aw.inv_fg_in_aw", {
  extend: "Ext.form.Panel",
  alias: "widget.inv_fg_in_aw",
  reference: "inv_fg_in_aw",
  config: {},
  requires: ["TDK.INVENTORY_AW.inv_fg_in_aw.GRIDinv_fg_in_aw", "TDK.INVENTORY_AW.inv_fg_in_aw.Cinv_fg_in_aw"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cinv_fg_in_aw",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelinv_fg_in_aw",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDinv_fg_in_aw" }],
      dockedItems: [
        {
          xtype: "toolbar",
          dock: "top",
          items: [
          /*  "-",
            { xtype: "datefield", labelWidth: 90, fieldLabel: "Production Date", width: 190, name: "mainproduction_date", fieldCls: "fieldinput", format: "Y-m-d", readOnly: false, value: new Date() },
            "-",
            {
              xtype: "combobox",
              name: "CBO_FILTERKEY",
              fieldLabel: "Machine",
              labelWidth: 65,
              width: 200,
              displayField: "MACHINE",
              valueField: "MACHINE",
              fieldCls: "fieldinput",
              allowBlank: false,
              queryMode: "local",
              forceSelection: true,
              typeAhead: true,
              minChars: 0,
              anyMatch: true,
              value: "ALL DATA",
              store: {
                autoLoad: true,
                remoteSort: false,
                remoteFilter: false,
                pageSize: 0,
                proxy: {
                  type: "ajax",
                  disableCaching: false,
                  noCache: false,
                  headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
                  actionMethods: { read: "POST" },
                  url: vconfig.service_api + "inv_fg_in_aw/inv_fg_in_aws",
                  extraParams: {
                    method: "read_group_machine",
                  },
                  reader: {
                    type: "json",
                    rootProperty: "Rows",
                    totalProperty: "TotalRows",
                    successProperty: "success",
                  },
                },
              },
            },
            "-",*/
            { xtype: "button", pid: "btrefresh_main", icon: vconfig.getstyle + "icon/update.ico", tooltip: "Refresh Data" },
            "-",
            { xtype: "component", html: "Sync From Prod" },
            { xtype: "button", pid: "btprocess_sync", icon: vconfig.getstyle + "icon/table_refresh.png", tooltip: "Sinkronisasi dari Production" },
          ],
          // other options....
        },
      ],
    });

    this.callParent(arguments);
  },
});
