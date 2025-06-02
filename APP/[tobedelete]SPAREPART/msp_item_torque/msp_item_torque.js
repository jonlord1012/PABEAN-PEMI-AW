Ext.define("TDK.SPAREPART.msp_item_torque.msp_item_torque", {
  extend: "Ext.form.Panel",
  alias: "widget.msp_item_torque",
  reference: "msp_item_torque",
  config: {},
  requires: ["TDK.SPAREPART.msp_item_torque.GRIDmsp_item_torque", "TDK.SPAREPART.msp_item_torque.Cmsp_item_torque"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cmsp_item_torque",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelmsp_item_torque",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDmsp_item_torque" }],
      dockedItems: [
        {
          xtype: "toolbar",
          height: 30,
          dock: "top",
          items: [{ xtype: "button", text: "New Input", pid: "btnew", icon: vconfig.getstyle + "icon/add.png", tooltip: "New" }],
          // other options....
        },
      ],
    });

    this.callParent(arguments);
  },
});
