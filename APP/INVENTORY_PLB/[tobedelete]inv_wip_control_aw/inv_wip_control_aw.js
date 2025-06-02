Ext.define("TDK.INVENTORY_PLB.inv_wip_control_aw.inv_wip_control_aw", {
  extend: "Ext.form.Panel",
  alias: "widget.inv_wip_control_aw",
  reference: "inv_wip_control_aw",
  config: {},
  requires: [
    //
    "Ext.toolbar.TextItem",
    "Ext.view.View",
    "Ext.ux.BoxReorderer",
    "Ext.ux.DataView.Animated",
    "TDK.INVENTORY_PLB.inv_wip_control_aw.Cinv_wip_control_aw",
  ],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cinv_wip_control_aw",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelinv_wip_control_aw",
      layout: "card",
      frame: false,
      border: false,
      items: [
        {
          xtype: "panel",
          border: false,
          frame: false,
          items: [
            {
              xtype: "dataview",
              pid: "dataview_inv_wip_control_aw",
              plugins: {
                "ux-animated-dataview": true,
              },
              itemSelector: "div.ndataview",
              tpl: [
                //
                '<tpl for=".">',
                '<div class="ndataview"; style="cursor: pointer;height: 80px;width: 220px;float: left;border-radius: 8px;-moz-border-radius: 8px;background: #307cfc;border: 1px solid #0D47A1;box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);margin: 5px 5px 5px 5px;padding: 5px 10px 10px 10px;color: #555;">',
                '<div style="text-align:justify;font-weight: 230;font-size:1.21vw;color:#ffffff;">',
                '<img src="' + vconfig.getstyle + "icon/search%20database.ico" + '" style="margin-right: 10px;" />',
                "{MODE_CODE}",
                "</div>",
                '<div style="margin-top:6px;text-align:justify;text-justify: inter-word;word-spacing: 1px;letter-spacing: 0.1px;color:#ffffff;">{MODE_NAME}</div>',
                "</div>",
                "</tpl>",
              ],

              store: {
                autoLoad: true,
                sortOnLoad: true,
                proxy: {
                  type: "ajax",
                  disableCaching: false,
                  noCache: false,
                  headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
                  actionMethods: { read: "POST" },
                  url: vconfig.service_api + "inv_wip_control_aw/inv_wip_control_aws",
                  extraParams: {
                    method: "read_control",
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
          ],
          dockedItems: [
            {
              xtype: "toolbar",
              height: 10,
              dock: "top",
            },
          ],
        },
      ],
    });

    this.callParent(arguments);
  },
});
