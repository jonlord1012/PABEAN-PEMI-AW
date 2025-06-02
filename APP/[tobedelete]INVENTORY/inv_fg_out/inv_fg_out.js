Ext.define("TDK.INVENTORY.inv_fg_out.inv_fg_out", {
  extend: "Ext.form.Panel",
  alias: "widget.inv_fg_out",
  reference: "inv_fg_out",
  config: {},
  requires: ["TDK.INVENTORY.inv_fg_out.GRIDinv_fg_out", "TDK.INVENTORY.inv_fg_out.Cinv_fg_out"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cinv_fg_out",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelinv_fg_out",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDinv_fg_out" }],
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
              text: "FG Out Item/Part",
              icon: vconfig.getstyle + "icon/add.png",
              menu: [
                { text: "Out Finish Good (Synchronize)", pid: "out_to_shipping_sis", icon: vconfig.getstyle + "icon/two%20displays.ico", tooltip: "Out Finish Good (Synchronize)", handler: "btprocess_sync_click" },
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
