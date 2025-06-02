Ext.define("TDK.MASTERS.mst_item.mst_item", {
  extend: "Ext.form.Panel",
  alias: "widget.mst_item",
  reference: "mst_item",
  config: {},
  requires: ["TDK.MASTERS.mst_item.GRIDmst_item", "TDK.MASTERS.mst_item.Cmst_item"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cmst_item",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelmst_item",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDmst_item" }],
      dockedItems: [
        {
          xtype: "toolbar",
          height: 30,
          dock: "top",
          items: [
            { xtype: "button", text: "New Input Part/Item", pid: "btnew", icon: vconfig.getstyle + "icon/add.png", tooltip: "New" },
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
