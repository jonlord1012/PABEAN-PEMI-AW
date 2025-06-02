var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.INVENTORY_PLB.goods_out.FRMto_production", {
  extend: "Ext.window.Window",
  alias: "widget.FRMto_production",
  reference: "FRMto_production",
  title: "Out To Production",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: false,
  controller: "Cgoods_out",
  //y: -110,
  width: mainpanel.getWidth() * 0.95,
  height: mainpanel.getHeight() * 0.95,
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
                    {
                      text: "<b>Data Synchronize</b>",
                      expanded: false,
                      children: [{ leaf: true, text: "Monitoring Transaction", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, module: "datasync", controlname: "live_tr" }],
                    },
                    {
                      text: "<b>Transaction</b>",
                      expanded: false,
                      children: [{ leaf: true, text: "Get Data (Out Production)", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, module: "trans", controlname: "proses_out" }],
                    },
                    {
                      text: "<b>History</b>",
                      expanded: false,
                      children: [{ leaf: true, text: "Get Data (Out Production)", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, module: "trans", controlname: "proses_out" }],
                    },
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
      items: [],
    },
  ],
});
