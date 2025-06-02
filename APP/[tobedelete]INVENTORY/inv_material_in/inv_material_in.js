Ext.define("TDK.INVENTORY.inv_material_in.inv_material_in", {
  extend: "Ext.form.Panel",
  alias: "widget.inv_material_in",
  reference: "inv_material_in",
  config: {},
  requires: ["TDK.INVENTORY.inv_material_in.GRIDinv_material_in", "TDK.INVENTORY.inv_material_in.Cinv_material_in"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cinv_material_in",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelinv_material_in",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDinv_material_in" }],
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
            { xtype: "button", text: "Receiving Integrasi", pid: "btreceiving_integrasi", icon: vconfig.getstyle + "icon/two%20displays.ico", tooltip: "Mapping Data Out Production" },
          ],
          // other options....
        },
      ],
    });

    this.callParent(arguments);
  },
});
