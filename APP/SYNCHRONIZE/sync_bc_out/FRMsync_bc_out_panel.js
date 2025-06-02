var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.SYNCHRONIZE.sync_bc_out.FRMsync_bc_out_panel", {
  extend: "Ext.window.Window",
  alias: "widget.FRMsync_bc_out_panel",
  reference: "FRMsync_bc_out_panel",
  title: "Detail Dokumen ",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: true,
  controller: "Csync_bc_out",
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
                      text: "<b>Ceisa Data</b>",
                      expanded: true,
                      children: [
                        { leaf: true, text: "Header Dokumen", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_header", modulename: "ceisa_data" },
                        { leaf: true, text: "Lampiran Dokumen", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_lampiran", modulename: "ceisa_data" },
                        { leaf: true, text: "Item/Part", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_detail", modulename: "ceisa_data" },
                        { leaf: true, text: "Bahan Baku Dokumen", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_bahan_baku_header", modulename: "ceisa_data" },
                        { leaf: true, text: "Bahan Baku", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_bahan_baku_detail", modulename: "ceisa_data" },
                        { leaf: true, text: "Kontainer", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_kontainer", modulename: "ceisa_data" },
                        { leaf: true, text: "Kemasan", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_kemasan", modulename: "ceisa_data" },
                        { leaf: true, text: "Jaminan", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_jaminan", modulename: "ceisa_data" },
                        { leaf: true, text: "Tarif", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_tarif", modulename: "ceisa_data" },
                      ],
                    },
                  ],
                },
              },
              listeners: {
                itemclick: "FRMsync_bc_out_panel_link_click",
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
      pid: "tosync_bc_out_tabpanel",
      frame: false,
      border: true,
      activeTab: 0,
      items: [],
    },
  ],
  listeners: {
    afterrender: "FRMsync_bc_out_panel_load",
  },
});
