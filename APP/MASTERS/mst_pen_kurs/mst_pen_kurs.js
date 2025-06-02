Ext.define("TDK.MASTERS.mst_pen_kurs.mst_pen_kurs", {
  extend: "Ext.form.Panel",
  alias: "widget.mst_pen_kurs",
  reference: "mst_pen_kurs",
  config: {},
  requires: ["TDK.MASTERS.mst_pen_kurs.GRIDmst_pen_kurs", "TDK.MASTERS.mst_pen_kurs.Cmst_pen_kurs"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cmst_pen_kurs",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelmst_pen_kurs",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDmst_pen_kurs" }],
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
          },
        ],
          // other options....
        },
      ],
    });

    this.callParent(arguments);
  },
});
