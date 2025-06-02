Ext.define("TDK.SPAREPART.msp_item_cb.msp_item_cb", {
  extend: "Ext.form.Panel",
  alias: "widget.msp_item_cb",
  reference: "msp_item_cb",
  config: {},
  requires: ["TDK.SPAREPART.msp_item_cb.GRIDmsp_item_cb", "TDK.SPAREPART.msp_item_cb.Cmsp_item_cb"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cmsp_item_cb",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelmsp_item_cb",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDmsp_item_cb" }],
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
