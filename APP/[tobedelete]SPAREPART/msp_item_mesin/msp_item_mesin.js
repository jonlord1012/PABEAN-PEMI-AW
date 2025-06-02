Ext.define("TDK.SPAREPART.msp_item_mesin.msp_item_mesin", {
  extend: "Ext.form.Panel",
  alias: "widget.msp_item_mesin",
  reference: "msp_item_mesin",
  config: {},
  requires: ["TDK.SPAREPART.msp_item_mesin.GRIDmsp_item_mesin", "TDK.SPAREPART.msp_item_mesin.Cmsp_item_mesin"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cmsp_item_mesin",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelmsp_item_mesin",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDmsp_item_mesin" }],
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
