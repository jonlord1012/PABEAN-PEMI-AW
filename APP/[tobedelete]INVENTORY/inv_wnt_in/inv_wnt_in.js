Ext.define("TDK.INVENTORY.inv_wnt_in.inv_wnt_in", {
  extend: "Ext.form.Panel",
  alias: "widget.inv_wnt_in",
  reference: "inv_wnt_in",
  config: {},
  requires: ["TDK.INVENTORY.inv_wnt_in.GRIDinv_wnt_in", "TDK.INVENTORY.inv_wnt_in.Cinv_wnt_in"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cinv_wnt_in",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelinv_wnt_in",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDinv_wnt_in" }],
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
            { xtype: "button", text: "Receiving Manual", pid: "btreceiving_manual", icon: vconfig.getstyle + "icon/add.png", tooltip: "New" },
          ],
          // other options....
        },
      ],
    });

    this.callParent(arguments);
  },
});
