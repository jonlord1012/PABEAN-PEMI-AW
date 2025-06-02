Ext.define("NJC.MASTERS.goods_barang.goods_barang", {
    extend: "Ext.form.Panel",
    alias: "widget.goods_barang",
    reference: "goods_barang",
    config: {},
    requires: ["NJC.MASTERS.goods_barang.GRIDgoods_barang", "NJC.MASTERS.goods_barang.Cgoods_barang"],
    constructor: function (config) {
      return this.callParent(arguments);
    },
    //untuk include controller
    controller: "Cgoods_barang",
    initComponent: function () {
      Ext.apply(this, {
        xtype: "panel",
        pid: "panelgoods_barang",
        layout: "card",
        frame: false,
        border: false,
        items: [{ xtype: "GRIDgoods_barang" }],
        dockedItems: [
          {
            xtype: "toolbar",
            height: 30,
            dock: "top",
            items: [{ xtype: "button", text: "New Input Goods", pid: "btnew", icon: vconfig.getstyle + "icon/add.png", tooltip: "New" },
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
  