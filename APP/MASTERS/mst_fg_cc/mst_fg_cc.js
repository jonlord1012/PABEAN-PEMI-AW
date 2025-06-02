Ext.define("TDK.MASTERS.mst_fg_cc.mst_fg_cc", {
  extend: "Ext.form.Panel",
  alias: "widget.mst_fg_cc",
  reference: "mst_fg_cc",
  config: {},
  requires: ["TDK.MASTERS.mst_fg_cc.GRIDmst_fg_cc", "TDK.MASTERS.mst_fg_cc.Cmst_fg_cc"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cmst_fg_cc",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelmst_fg_cc",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDmst_fg_cc" }],
      dockedItems: [
        {
          xtype: "toolbar",
          height: 30,
          dock: "top",
          items: [
            { xtype: "button", text: "New Input Cost Center", pid: "btnew", icon: vconfig.getstyle + "icon/add.png", tooltip: "New" },
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
