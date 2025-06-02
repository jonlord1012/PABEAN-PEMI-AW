Ext.define("TDK.MASTERS.mst_pen_teknisi.mst_pen_teknisi", {
  extend: "Ext.form.Panel",
  alias: "widget.mst_pen_teknisi",
  reference: "mst_pen_teknisi",
  config: {},
  requires: ["TDK.MASTERS.mst_pen_teknisi.GRIDmst_pen_teknisi", "TDK.MASTERS.mst_pen_teknisi.Cmst_pen_teknisi"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cmst_pen_teknisi",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelmst_pen_teknisi",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDmst_pen_teknisi" }],
      dockedItems: [
        {
          xtype: "toolbar",
          height: 30,
          dock: "top",
          items: [{ xtype: "button", text: "New Input Teknisi", pid: "btnew", icon: vconfig.getstyle + "icon/add.png", tooltip: "New" }],
          // other options....
        },
      ],
    });

    this.callParent(arguments);
  },
});
