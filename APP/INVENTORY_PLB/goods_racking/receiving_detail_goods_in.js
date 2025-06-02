var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.INVENTORY_PLB.goods_racking.receiving_detail_goods_in", {
  extend: "Ext.window.Window",
  alias: "widget.receiving_detail_goods_in",
  reference: "receiving_detail_goods_in",
  title: "Receiving Detail",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: true,
  controller: "Cgoods_racking",
  /*requires: ["TDK.INVENTORY_AW.goods_in.receiving_detail.FRMdata_receiving_aw"],*/
  //y: -110,
  width: mainpanel.getWidth() * 0.9,
  height: mainpanel.getHeight() * 0.9,
  layout: { type: "border", pack: "start", align: "stretch" },
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
  items: [
    {
      title: "",
      region: "west",
      layout: "accordion",
      frame: false,
      border: false,
      width: 200,
      items: [
        {
          title: "TRACING DATA",
          icon: vconfig.basepath + "style/icon/folder.gif",
          items: [
            {
              xtype: "treepanel",
              rootVisible: false,
              border: false,
              store: {
                type: "tree",
                data: {
                  expanded: false,
                  children: [
                    {
                      text: "<b>Data</b>",
                      expanded: true,
                      children: [
                        { leaf: true, text: "Receiving Detail", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, modulename: "racking_detail", controlname: "GRIDreceiving_aw_detail_trans" },
                        { leaf: true, text: "Sumber Data", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, modulename: "racking_detail", controlname: "GRIDreceiving_aw_sumber_data" },
                      ],
                    },
                    {
                      text: "<b>CEISA</b>",
                      expanded: true,
                      children: [
                        { leaf: true, text: "Header Dokumen", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumenpabean_header", modulename: "dokumenpabean" },
                        { leaf: true, text: "Lampiran Dokumen", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumenpabean_lampiran", modulename: "dokumenpabean" },
                        { leaf: true, text: "Item/Part ", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumenpabean_detail", modulename: "dokumenpabean" },
                        { leaf: true, text: "Kontainer ", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumenpabean_kontainer", modulename: "dokumenpabean" },
                        { leaf: true, text: "Kemasan ", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumenpabean_kemasan", modulename: "dokumenpabean" },
                        { leaf: true, text: "Jaminan ", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumenpabean_jaminan", modulename: "dokumenpabean" },
                        { leaf: true, text: "Tarif ", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumenpabean_tarif", modulename: "dokumenpabean" },
                      ],
                    },
                  ],
                },
              },
              listeners: {
                itemclick: "receiving_detail_racking_link_click",
              },
            },
          ],
        },
      ],
    },
    {
      collapsible: false,
      region: "center",
      xtype: "tabpanel",
      pid: "receiving_detail_goods_in_tabpanel",
      frame: false,
      border: true,
      activeTab: 0,
      items: [],
    },
  ],
  listeners: {
    afterrender: "receiving_detail_goods_in_load",
  },
});
