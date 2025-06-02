Ext.define("NJC.INVENTORY_PLB.goods_racking.goods_racking", {
  extend: "Ext.form.Panel",
  alias: "widget.goods_racking",
  reference: "goods_racking",
  config: {},
  requires: ["NJC.INVENTORY_PLB.goods_racking.GRIDgoods_racking", "NJC.INVENTORY_PLB.goods_racking.Cgoods_racking"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cgoods_racking",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelgoods_racking",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDgoods_racking" }],
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
            { xtype: "button", text: "Racking Manual", pid: "btracking_manual", icon: vconfig.getstyle + "icon/add.png", tooltip: "New" },
            {
              xtype: "button",
              text: "Racking Integrasi",
              pid: "btracking_integrasi",
              icon: vconfig.getstyle + "icon/two%20displays.ico",
              tooltip: "Racking Data from BinLoc",
            },
          ],
          // other options....
        },
      ],
    });

    this.callParent(arguments);
  },
});
