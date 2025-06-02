Ext.define("NJC.INVENTORY_PLB.goods_in.goods_in", {
  extend: "Ext.form.Panel",
  alias: "widget.goods_in",
  reference: "goods_in",
  config: {},
  requires: ["NJC.INVENTORY_PLB.goods_in.GRIDgoods_in", "NJC.INVENTORY_PLB.goods_in.Cgoods_in"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cgoods_in",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelgoods_in",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDgoods_in" }],
      dockedItems: [
        {
          xtype: "toolbar",
          height: 30,
          dock: "top",
          items: [
            "-", //
            { xtype: "component", html: "Refresh" },
            { xtype: "button", pid: "btrefresh_main", icon: vconfig.getstyle + "icon/update.ico", tooltip: "Refresh Data" },
            "-",
            { xtype: "button", text: "Receiving Manual", pid: "btreceiving_manual", icon: vconfig.getstyle + "icon/add.png", tooltip: "New" },
            "-",
            {
              xtype: "button",
              text: "Receiving Integrasi",
              pid: "btreceiving_integrasi",
              icon: vconfig.getstyle + "icon/two%20displays.ico",
              tooltip: "Sync with BinLoc",
            },
            "-",
            {
              xtype: "button",
              text: "Receiving By Invoice",
              pid: "btreceiving_byInvoice",
              icon: vconfig.getstyle + "icon/grid.png",
              tooltip: "Receive by Invoice",
            },
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
                    title: "Goods In",
                    format: ".xlsx"
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
