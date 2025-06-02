Ext.define("TDK.INVENTORY_PLB.inv_material_out_aw.inv_material_out_aw", {
  extend: "Ext.form.Panel",
  alias: "widget.inv_material_out_aw",
  reference: "inv_material_out_aw",
  config: {},
  requires: ["TDK.INVENTORY_PLB.inv_material_out_aw.GRIDinv_material_out_aw", "TDK.INVENTORY_PLB.inv_material_out_aw.Cinv_material_out_aw"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cinv_material_out_aw",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelinv_material_out_aw",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDinv_material_out_aw" }],
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
