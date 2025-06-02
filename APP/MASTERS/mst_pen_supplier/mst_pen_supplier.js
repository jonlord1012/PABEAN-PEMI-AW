Ext.define("TDK.MASTERS.mst_pen_supplier.mst_pen_supplier", {
  extend: "Ext.form.Panel",
  alias: "widget.mst_pen_supplier",
  reference: "mst_pen_supplier",
  config: {},
  requires: ["TDK.MASTERS.mst_pen_supplier.GRIDmst_pen_supplier", "TDK.MASTERS.mst_pen_supplier.Cmst_pen_supplier"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cmst_pen_supplier",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelmst_pen_supplier",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDmst_pen_supplier" }],
      dockedItems: [
        {
          xtype: "toolbar",
          height: 30,
          dock: "top",
          items: [{ xtype: "button", text: "New Input Part/Item", pid: "btnew", icon: vconfig.getstyle + "icon/add.png", tooltip: "New" },
          "->",
          {
            xtype: "button",
            text: "Export to",
            menu: {
              defaults: {
                handler: "exportTo",
              },
              items: [
                {
                  text: "Excel xlsx",
                  icon: vconfig.getstyle + "icon/exceldownload.png",
                  cfg: {
                    type: "excel07",
                    ext: "xlsx",
                  },
                },
              ],
            },
          },],
          // other options....
        },
      ],
    });

    this.callParent(arguments);
  },
});
