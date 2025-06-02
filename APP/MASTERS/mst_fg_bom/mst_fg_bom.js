Ext.define("TDK.MASTERS.mst_fg_bom.mst_fg_bom", {
  extend: "Ext.form.Panel",
  alias: "widget.mst_fg_bom",
  reference: "mst_fg_bom",
  config: {},
  requires: ["TDK.MASTERS.mst_fg_bom.GRIDmst_fg_bom", "TDK.MASTERS.mst_fg_bom.Cmst_fg_bom"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cmst_fg_bom",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelmst_fg_bom",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDmst_fg_bom" }],
      dockedItems: [
        {
          xtype: "toolbar",
          height: 30,
          dock: "top",
          items: [
            { xtype: "button", text: "New Input Bill Of Material", pid: "btnew", icon: vconfig.getstyle + "icon/add.png", tooltip: "New" },
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
