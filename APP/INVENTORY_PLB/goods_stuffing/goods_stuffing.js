Ext.define("NJC.INVENTORY_PLB.goods_stuffing.goods_stuffing", {
  extend: "Ext.form.Panel",
  alias: "widget.goods_stuffing",
  reference: "goods_stuffing",
  config: {},
  requires: ["NJC.INVENTORY_PLB.goods_stuffing.GRIDgoods_stuffing", "NJC.INVENTORY_PLB.goods_stuffing.Cgoods_stuffing"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cgoods_stuffing",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelgoods_stuffing",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDgoods_stuffing" }],
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
            {
              xtype: "button",
              text: "Delivery Instruction",
              pid: "btstuffing_integrasi",
              icon: vconfig.getstyle + "icon/two%20displays.ico",
              tooltip: "Delivery Instruction from BinLoc",
            },
            /* { xtype: "button", text: "Stuffing Manual", pid: "btstuffing_manual", icon: vconfig.getstyle + "icon/add.png", tooltip: "New" },
             */
          ],
          // other options....
        },
      ],
    });

    this.callParent(arguments);
  },
});
