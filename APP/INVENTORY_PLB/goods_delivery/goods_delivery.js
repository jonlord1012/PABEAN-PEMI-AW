Ext.define("NJC.INVENTORY_PLB.goods_delivery.goods_delivery", {
  extend: "Ext.form.Panel",
  alias: "widget.goods_delivery",
  reference: "goods_delivery",
  config: {},
  requires: ["NJC.INVENTORY_PLB.goods_delivery.GRIDgoods_delivery", "NJC.INVENTORY_PLB.goods_delivery.Cgoods_delivery"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cgoods_delivery",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelgoods_delivery",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDgoods_delivery" }],
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
            //{ xtype: "button", pid: "btapprove", icon: vconfig.getstyle + "icon/add.png", text: "Approve Delivery", tooltip: "Approve Delivery" },

            /* { xtype: "button", text: "Stuffing Manual", pid: "btstuffing_manual", icon: vconfig.getstyle + "icon/add.png", tooltip: "New" },
             {
               xtype: "button",
               text: "Stuffing Integrasi",
               pid: "btstuffing_integrasi",
               icon: vconfig.getstyle + "icon/two%20displays.ico",
               tooltip: "Stuffing Data from BinLoc",
             },*/
          ],
          // other options....
        },
      ],
    });

    this.callParent(arguments);
  },
});
