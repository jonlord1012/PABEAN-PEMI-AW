Ext.define("NJC.MASTERS.master_goods.master_goods", {
  extend: "Ext.form.Panel",
  alias: "widget.master_goods",
  reference: "master_goods",
  config: {},
  closeAction: "hide",
  requires: ["NJC.MASTERS.master_goods.GRIDmaster_goods", "NJC.MASTERS.master_goods.Cmaster_goods"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cmaster_goods",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelmaster_goods",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDmaster_goods" }],
      dockedItems: [
        {
          xtype: "toolbar",
          height: 30,
          dock: "top",
          items: [
            { xtype: "button", text: "New Input Goods", pid: "btnew", icon: vconfig.getstyle + "icon/add.png", tooltip: "New" },
            { xtype: "button", text: "Synchronize Master", pid: "btsync_wms", icon: vconfig.getstyle + "icon/sync.ico", tooltip: "Sync" },
            "->",
            {
              xtype: "button",
              text: "Export to",
              menu: {
                defaults: {
                  handler: "exportTo",
                },
                items: [
                  {
                    text: "Excel xlsx",
                    icon: vconfig.getstyle + "icon/exceldownload.png",
                    cfg: {
                      type: "excel07",
                      ext: "xlsx",
                    },
                    title:"Master Goods",
                    format:".xlsx"
                  },
                ],
              },
            },
          ],
          // other options....
        },
      ],
    });

    this.callParent(arguments);
  },
});
