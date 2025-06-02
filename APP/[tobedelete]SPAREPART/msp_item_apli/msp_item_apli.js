Ext.define("TDK.SPAREPART.msp_item_apli.msp_item_apli", {
  extend: "Ext.form.Panel",
  alias: "widget.msp_item_apli",
  reference: "msp_item_apli",
  config: {},
  requires: ["TDK.SPAREPART.msp_item_apli.GRIDmsp_item_apli", "TDK.SPAREPART.msp_item_apli.Cmsp_item_apli"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cmsp_item_apli",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelmsp_item_apli",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDmsp_item_apli" }],
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
