var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.INVENTORY.inv_material_in.receiving_detail.receiving_detail", {
  extend: "Ext.window.Window",
  alias: "widget.receiving_detail",
  reference: "receiving_detail",
  title: "Receiving Detail",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: true,
  requires: ["TDK.INVENTORY.inv_material_in.receiving_detail.FRMdata_receiving"],
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
          title: "Transaction",
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
                    { leaf: true, text: "Receiving Detail", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, module: "datasync", controlname: "live_tr" },
                    { leaf: true, text: "Sumber Data", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, module: "datasync", controlname: "live_tr" },
                    { leaf: true, text: "BC Dokumen", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, module: "datasync", controlname: "live_tr" },
                  ],
                },
              },
              listeners: {
                itemclick: "toproduction_link_click",
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
      pid: "toproduction_tabpanel",
      frame: false,
      border: true,
      activeTab: 0,
      items: [
        {
          title: "Data Receiving",
          xtype: "FRMdata_receiving",
        },
      ],
    },
  ],
});
