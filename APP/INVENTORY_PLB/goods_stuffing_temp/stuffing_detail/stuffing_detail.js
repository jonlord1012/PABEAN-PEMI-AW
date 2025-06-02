var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.INVENTORY_PLB.goods_stuffing.stuffing_detail.stuffing_detail", {
    extend: "Ext.window.Window",
    alias: "widget.stuffing_detail",
    reference: "stuffing_detail",
    title: "Stuffing Goods for Delivery",
    modal: true,
    closeAction: "destroy",
    centered: true,
    autoScroll: true,
    controller: "Cgoods_stuffing",
    //y: -110,
    //bodyPadding: "5 5 5 5",
    width: mainpanel.getWidth() * 0.9,
    height: mainpanel.getHeight() * 0.9,
    layout: { type: "vbox", pack: "start", align: "stretch" },
    bodyStyle: "background:#FFFFFF;background-color:#FFFFFF; margin:1px;",
    items: [],
    dockedItems: [
        {
            xtype: "toolbar",
            height: 30,
            dock: "top",
            items: [
                { xtype: "tbspacer", width: 10 },
                {
                    xtype: "button",
                    text: "Save",
                    pid: "FRM_goods_stuffing_btsave",
                    icon: vconfig.getstyle + "icon/save.gif",
                    tooltip: "Save Data",
                    handler: "FRM_goods_stuffing_btsave_click",
                },
            ],
        },
    ],
});
