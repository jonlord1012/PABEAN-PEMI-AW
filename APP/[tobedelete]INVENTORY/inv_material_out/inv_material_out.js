Ext.define("TDK.INVENTORY.inv_material_out.inv_material_out", {
  extend: "Ext.form.Panel",
  alias: "widget.inv_material_out",
  reference: "inv_material_out",
  config: {},
  requires: ["TDK.INVENTORY.inv_material_out.GRIDinv_material_out", "TDK.INVENTORY.inv_material_out.Cinv_material_out"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cinv_material_out",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelinv_material_out",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDinv_material_out" }],
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
                { text: "To Production (Synchronize)", pid: "out_to_production_pis", icon: vconfig.getstyle + "icon/two%20displays.ico", tooltip: "Out To Production (Synchronize)" },
                { text: "To Production Manual", pid: "out_to_production_manual", icon: vconfig.getstyle + "icon/new.ico", tooltip: "Out Item/Part To Production Manual" },
                {
                  text: "Memo Scrap",
                  pid: "out_to_memo_scrap",
                  icon: vconfig.getstyle + "icon/new.ico",
                },
                {
                  text: "Memo Selling",
                  pid: "out_to_memo_selling",
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
