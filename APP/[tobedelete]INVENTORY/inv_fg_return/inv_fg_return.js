Ext.define("TDK.INVENTORY.inv_fg_return.inv_fg_return", {
  extend: "Ext.form.Panel",
  alias: "widget.inv_fg_return",
  reference: "inv_fg_return",
  config: {},
  requires: ["TDK.INVENTORY.inv_fg_return.GRIDinv_fg_return", "TDK.INVENTORY.inv_fg_return.Cinv_fg_return"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cinv_fg_return",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelinv_fg_return",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDinv_fg_return" }],
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
              text: "FG Return Product",
              icon: vconfig.getstyle + "icon/add.png",
              menu: [
                { text: "Return Finish Good (Synchronize)", pid: "out_to_return_sis", icon: vconfig.getstyle + "icon/two%20displays.ico", tooltip: "Return Finish Good (Synchronize)", handler: "btprocess_sync_click" },
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
