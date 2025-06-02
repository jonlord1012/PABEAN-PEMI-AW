Ext.define("TDK.INVENTORY.inv_fg_in.inv_fg_in", {
  extend: "Ext.form.Panel",
  alias: "widget.inv_fg_in",
  reference: "inv_fg_in",
  config: {},
  requires: ["TDK.INVENTORY.inv_fg_in.GRIDinv_fg_in", "TDK.INVENTORY.inv_fg_in.Cinv_fg_in"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cinv_fg_in",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelinv_fg_in",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDinv_fg_in" }],
      dockedItems: [
        {
          xtype: "toolbar",
          height: 30,
          dock: "top",
          items: [
            "-",
            { xtype: "component", html: "Refresh" },
            //
            { xtype: "button", pid: "btrefresh_main", icon: vconfig.getstyle + "icon/update.ico", tooltip: "Refresh Data" },
            "-",
            {
              xtype: "splitbutton",
              text: "Finish Good In",
              icon: vconfig.getstyle + "icon/add.png",
              menu: [{ text: "Synchronize", pid: "btprocess_sync", icon: vconfig.getstyle + "icon/two%20displays.ico", tooltip: "Finish Good In (Synchronize)" }],
            },
          ],
          // other options....
        },
      ],
    });

    this.callParent(arguments);
  },
});
