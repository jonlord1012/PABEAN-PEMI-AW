var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.INVENTORY_PLB.inv_material_in_aw.receiving_detail.receiving_detail_aw", {
  extend: "Ext.window.Window",
  alias: "widget.receiving_detail_aw",
  reference: "receiving_detail_aw",
  title: "Receiving Detail",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: true,
  controller: "Cinv_material_in_aw",
  /*requires: ["TDK.INVENTORY_AW.inv_material_in_aw.receiving_detail.FRMdata_receiving_aw"],*/
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
                      expanded:true, 
                      children: [
                        { leaf: true, text: "Receiving Detail", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, modulename: "", controlname: "GRIDreceiving_aw_detail_trans" },
                        { leaf: true, text: "Sumber Data", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, modulename: "", controlname: "GRIDreceiving_aw_sumber_data" },    
                      ],
                    },
                    {
                      text: "<b>CEISA</b>",
                      expanded:true, 
                      children: [
                        { leaf: true, text: "Header Dokumen", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumenceisa_header", modulename: "dokumenceisa" },
                        { leaf: true, text: "Lampiran Dokumen", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumenceisa_lampiran", modulename: "dokumenceisa" },
                        { leaf: true, text: "Item/Part ", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumenceisa_detail", modulename: "dokumenceisa" },
                        { leaf: true, text: "Kontainer ", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumenceisa_kontainer", modulename: "dokumenceisa" },
                        { leaf: true, text: "Kemasan ", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumenceisa_kemasan", modulename: "dokumenceisa" },
                        { leaf: true, text: "Jaminan ", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumenceisa_jaminan", modulename: "dokumenceisa" },
                        { leaf: true, text: "Tarif ", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumenceisa_tarif", modulename: "dokumenceisa" },
                      ],
                    },                   
                  ],
                },
              },
              listeners: {
                itemclick: "receiving_detail_aw_link_click",
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
      pid: "receiving_detail_aw_tabpanel",
      frame: false,
      border: true,
      activeTab: 0,
      items: [],
    },
  ],
  listeners: {
    afterrender: "receiving_detail_aw_load",
  },
});
