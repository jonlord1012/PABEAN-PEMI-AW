Ext.define("TDK.INVENTORY.inv_wip_in.inv_wip_in", {
  extend: "Ext.form.Panel",
  alias: "widget.inv_wip_in",
  reference: "inv_wip_in",
  config: {},
  requires: [
    //
    "TDK.INVENTORY.inv_wip_in.GRIDinv_wip_in",
    "TDK.INVENTORY.inv_wip_in.Cinv_wip_in",
  ],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cinv_wip_in",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelinv_wip_in",
      layout: "card",
      frame: false,
      border: false,
      items: [
        //
        { xtype: "GRIDinv_wip_in" },
      ],
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
          ],
          // other options....
        },
      ],
    });

    this.callParent(arguments);
  },
});
