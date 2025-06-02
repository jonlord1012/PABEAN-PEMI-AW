Ext.define("TDK.INVENTORY.inv_subassy_aw_out.inv_subassy_aw_out", {
  extend: "Ext.form.Panel",
  alias: "widget.inv_subassy_aw_out",
  reference: "inv_subassy_aw_out",
  config: {},
  requires: ["TDK.INVENTORY.inv_subassy_aw_out.GRIDinv_subassy_aw_out", "TDK.INVENTORY.inv_subassy_aw_out.Cinv_subassy_aw_out"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cinv_subassy_aw_out",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelinv_subassy_aw_out",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDinv_subassy_aw_out" }],
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
