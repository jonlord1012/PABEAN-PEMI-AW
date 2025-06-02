Ext.define("TDK.INVENTORY.inv_subassy_aw_in.inv_subassy_aw_in", {
  extend: "Ext.form.Panel",
  alias: "widget.inv_subassy_aw_in",
  reference: "inv_subassy_aw_in",
  config: {},
  requires: ["TDK.INVENTORY.inv_subassy_aw_in.GRIDinv_subassy_aw_in", "TDK.INVENTORY.inv_subassy_aw_in.Cinv_subassy_aw_in"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cinv_subassy_aw_in",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelinv_subassy_aw_in",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDinv_subassy_aw_in" }],
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
            { xtype: "button", text: "Receiving Integrasi", pid: "btreceiving_integrasi", icon: vconfig.getstyle + "icon/two%20displays.ico", tooltip: "Mapping Data Out Production" },
          ],
          // other options....
        },
      ],
    });

    this.callParent(arguments);
  },
});
