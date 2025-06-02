Ext.define("TDK.SPAREPART.msp_item_cv.msp_item_cv", {
  extend: "Ext.form.Panel",
  alias: "widget.msp_item_cv",
  reference: "msp_item_cv",
  config: {},
  requires: ["TDK.SPAREPART.msp_item_cv.GRIDmsp_item_cv", "TDK.SPAREPART.msp_item_cv.Cmsp_item_cv"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cmsp_item_cv",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelmsp_item_cv",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDmsp_item_cv" }],
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
