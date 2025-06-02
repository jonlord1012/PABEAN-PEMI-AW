Ext.define("NJC.MASTERS.mst_item_hs.mst_item_hs", {
  extend: "Ext.form.Panel",
  alias: "widget.mst_item_hs",
  reference: "mst_item_hs",
  config: {},
  requires: ["NJC.MASTERS.mst_item_hs.GRIDmst_item_hs", "NJC.MASTERS.mst_item_hs.Cmst_item_hs"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cmst_item_hs",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelmst_item_hs",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDmst_item_hs" }],
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
