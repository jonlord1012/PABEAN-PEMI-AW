Ext.define("NJC.MASTERS.supporting_goods.supporting_goods", {
  extend: "Ext.form.Panel",
  alias: "widget.supporting_goods",
  reference: "supporting_goods",
  config: {},
  closeAction: "hide",
  requires: ["NJC.MASTERS.supporting_goods.GRIDsupporting_goods", "NJC.MASTERS.supporting_goods.Csupporting_goods"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Csupporting_goods",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelsupporting_goods",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDsupporting_goods" }],
      dockedItems: [
        {
          xtype: "toolbar",
          height: 30,
          dock: "top",
          items: [
            { xtype: "button", text: "New Input Supporting Goods", pid: "btnew", icon: vconfig.getstyle + "icon/add.png", tooltip: "New" },
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
