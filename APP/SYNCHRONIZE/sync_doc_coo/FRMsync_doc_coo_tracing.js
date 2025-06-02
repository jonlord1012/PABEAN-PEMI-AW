var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.SYNCHRONIZE.sync_doc_coo.FRMsync_doc_coo_tracing", {
  extend: "Ext.window.Window",
  alias: "widget.FRMsync_doc_coo_tracing",
  reference: "FRMsync_doc_coo_tracing",
  title: "Detail Dokumen ",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: true,
  controller: "Csync_doc_coo",
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
                      text: "<b>Orginal Data</b>",
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
                      ],
                    },
                    {
                      text: "<b>Dokumen Ceisa In</b>",
                      expanded: true,
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
                    {
                      text: "<b>Receiving</b>",
                      expanded: true,
                      children: [{ leaf: true, text: "Get Data Receiving", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "receivingdata" }],
                    },
                  ],
                },
              },
              listeners: {
                itemclick: "FRMsync_doc_coo_tracing_linkclick",
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
        { xtype: "button", pid: "btget_from_ceisa", text: "Get From Data Ceisa", icon: vconfig.getstyle + "icon/database.ico", tooltip: "Get From Data Ceisa" },
        { xtype: "component", html: "***" },
        //batas,
      ],
      // other options....
    },
  ],
  listeners: {
    afterrender: "FRMsync_doc_coo_load",
  },
});
