Ext.define("TDK.INVENTORY.inv_wip_out.inv_wip_out", {
  extend: "Ext.form.Panel",
  alias: "widget.inv_wip_out",
  reference: "inv_wip_out",
  config: {},
  requires: ["TDK.INVENTORY.inv_wip_out.GRIDinv_wip_out", "TDK.INVENTORY.inv_wip_out.Cinv_wip_out"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cinv_wip_out",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelinv_wip_out",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDinv_wip_out" }],
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
              text: "WIP Out Item/Part",
              icon: vconfig.getstyle + "icon/add.png",
              menu: [
                { text: "To Finish Good(Synchronize)", pid: "out_to_production_pis", icon: vconfig.getstyle + "icon/two%20displays.ico", tooltip: "Out To Production (Synchronize)", handler: "btprocess_sync_click" },
                {
                  text: "Memo Scrap Item/Part",
                  pid: "out_to_memo_scrap",
                  icon: vconfig.getstyle + "icon/new.ico",
                  handler: "out_to_memo_scrap_click",
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
