var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.SYNCHRONIZE.portal_data_plb.FRMportal_data_tracing", {
  extend: "Ext.window.Window",
  alias: "widget.FRMportal_data_tracing",
  reference: "FRMportal_data_tracing",
  title: "Detail Dokumen ",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: false,
  controller: "Cportal_data_plb",
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
          title: "Tracing Detail Dokumen",
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
                      text: "<b>Original Data</b>",
                      expanded: true,
                      children: [
                        { leaf: true, text: "Sumber Data", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "sumberdata", modulename: "sumberdata" },
                        //{ leaf: true, text: "Sum by Invoice", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "sumberdata", modulename: "original_data" },
                        //{ leaf: true, text: "Sum by Item/Part", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "sumberdata", modulename: "original_data" },
                      ],
                    },
                    {
                      text: "<b>Mapping</b>",
                      expanded: true,
                      children: [{ leaf: true, text: "Get Mapping Supplier & Item", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "mappingdata", modulename: "mappingdata" }],
                    },
                    {
                      text: "<b>Dokumen BC In</b>",
                      expanded: true,
                      children: [
                        { leaf: true, text: "Header Dokumen", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumenpabean_header", modulename: "dokumenpabean" },
                        { leaf: true, text: "Lampiran Dokumen", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumenpabean_lampiran", modulename: "dokumenpabean" },
                        { leaf: true, text: "Item/Part ", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumenpabean_detail", modulename: "dokumenpabean" },
                        { leaf: true, text: "Kontainer ", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumenpabean_kontainer", modulename: "dokumenpabean" },
                        { leaf: true, text: "Kemasan ", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumenpabean_kemasan", modulename: "dokumenpabean" },
                        { leaf: true, text: "Jaminan ", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumenpabean_jaminan", modulename: "dokumenpabean" },
                        { leaf: true, text: "Tarif ", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumenpabean_tarif", modulename: "dokumenpabean" },
                        { leaf: true, text: "Pungutan ", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumenpabean_pungutan", modulename: "dokumenpabean" },
                      ],
                    },
                    /*
                    {
                      text: "<b>Receiving</b>",
                      expanded: true,
                      children: [{ leaf: true, text: "Get Data Receiving", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "receivingdata" }],
                    },
                    */
                  ],
                },
              },
              listeners: {
                itemclick: "FRMportal_data_tracing_linkclick",
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
  dockedItems: [
    {
      xtype: "toolbar",
      dock: "top",
      items: [
        "-",
        { xtype: "component", html: "***" },
        { xtype: "button", pid: "btget_from_ceisa", text: "Mapp This Document", icon: vconfig.getstyle + "icon/database.ico", tooltip: "Sync with CEISA4.0" },
        { xtype: "component", html: "***" },
        //batas,
      ],
      // other options....
    },
  ],
  listeners: {
    afterrender: "FRMportal_data_load",
  },
});
