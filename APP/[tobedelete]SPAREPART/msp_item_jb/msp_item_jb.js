Ext.define("TDK.SPAREPART.msp_item_jb.msp_item_jb", {
  extend: "Ext.form.Panel",
  alias: "widget.msp_item_jb",
  reference: "msp_item_jb",
  config: {},
  requires: ["TDK.SPAREPART.msp_item_jb.GRIDmsp_item_jb", "TDK.SPAREPART.msp_item_jb.Cmsp_item_jb"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cmsp_item_jb",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelmsp_item_jb",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDmsp_item_jb" }],
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
