Ext.define("TDK.INVENTORY_AW.inv_wip_in_aw.inv_wip_in_aw", {
  extend: "Ext.form.Panel",
  alias: "widget.inv_wip_in_aw",
  reference: "inv_wip_in_aw",
  config: {},
  requires: ["TDK.INVENTORY_AW.inv_wip_in_aw.GRIDinv_wip_in_aw", "TDK.INVENTORY_AW.inv_wip_in_aw.Cinv_wip_in_aw"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cinv_wip_in_aw",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelinv_wip_in_aw",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDinv_wip_in_aw" }],
      /*dockedItems: [
        {
          xtype: "toolbar",
          height: 30,
          dock: "top",
          items: [
            "-", //
            { xtype: "button", text: "Receiving Manual", pid: "btreceiving_manual", icon: vconfig.getstyle + "icon/add.png", tooltip: "New" },
            {
              xtype: "button",
              text: "Receiving Integrasi",
              pid: "btreceiving_integrasi",
              icon: vconfig.getstyle + "icon/two%20displays.ico",
              tooltip: "Mapping Data Out Production",
            },
          ],
          // other options....
        },
      ],*/
    });

    this.callParent(arguments);
  },
});
