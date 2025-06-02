Ext.define("TDK.MASTERS.mst_fg_carline.mst_fg_carline", {
  extend: "Ext.form.Panel",
  alias: "widget.mst_fg_carline",
  reference: "mst_fg_carline",
  config: {},
  requires: ["TDK.MASTERS.mst_fg_carline.GRIDmst_fg_carline", "TDK.MASTERS.mst_fg_carline.Cmst_fg_carline"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cmst_fg_carline",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelmst_fg_carline",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDmst_fg_carline" }],
      dockedItems: [
        {
          xtype: "toolbar",
          height: 30,
          dock: "top",
          items: [
            { xtype: "button", text: "New Input Carline", pid: "btnew", icon: vconfig.getstyle + "icon/add.png", tooltip: "New" },
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
