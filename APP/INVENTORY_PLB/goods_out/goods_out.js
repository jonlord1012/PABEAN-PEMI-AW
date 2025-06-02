Ext.define("TDK.INVENTORY_PLB.goods_out.goods_out", {
  extend: "Ext.form.Panel",
  alias: "widget.goods_out",
  reference: "goods_out",
  config: {},
  requires: ["TDK.INVENTORY_PLB.goods_out.GRIDgoods_out", "TDK.INVENTORY_PLB.goods_out.Cgoods_out"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cgoods_out",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelgoods_out",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDgoods_out" }],
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
              xtype: "splitbutton",
              text: "Out Item/Part",
              icon: vconfig.getstyle + "icon/add.png",
              menu: [
                { text: "To Production (Synchronize)", pid: "out_to_production_bicc", icon: vconfig.getstyle + "icon/two%20displays.ico", tooltip: "Out To Production (Synchronize)" },
                { text: "To Production Manual", pid: "out_to_production_manual_aw", icon: vconfig.getstyle + "icon/new.ico", tooltip: "Out Item/Part To Production Manual" },
                {
                  text: "Memo Scrap",
                  pid: "out_to_memo_scrap_aw",
                  icon: vconfig.getstyle + "icon/new.ico",
                },
                {
                  text: "Memo Selling",
                  pid: "out_to_memo_selling_aw",
                  icon: vconfig.getstyle + "icon/new.ico",
                },
              ],
            },
          ],
          // other options....
        },
      ],
    });

    this.callParent(arguments);
  },
});
