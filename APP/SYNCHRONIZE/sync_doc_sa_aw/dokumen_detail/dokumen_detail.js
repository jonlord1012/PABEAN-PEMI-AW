var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.SYNCHRONIZE.sync_doc_sa.dokumen_detail.dokumen_detail", {
  extend: "Ext.window.Window",
  id: "sa_dokumen_detail",
  alias: "widget.sa_dokumen_detail",
  reference: "sa_dokumen_detail",
  title: "Detail Dokumen SA Invoice",
  modal: true,
  closeAction: "destroy",
  autoDestroy: true,
  centered: true,
  autoScroll: true,
  width: mainpanel.getWidth() * 0.95,
  height: mainpanel.getHeight() * 0.9,
  requires: ["TDK.SYNCHRONIZE.sync_doc_sa.dokumen_detail.Cdokumen_detail"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Csa_dokumen_detail",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_sa_dokumen_detail",
      layout: { type: "border", pack: "start", align: "stretch" },
      frame: false,
      border: false,
      autoScroll: true,
      items: [
        {
          title: "",
          region: "west",
          layout: "accordion",
          frame: false,
          border: false,
          width: 200,
          autoScroll: true,
          fill: false,
          items: [
            {
              title: "Tracing Detail Dokumen",
              icon: vconfig.basepath + "style/icon/folder.gif",
              autoScroll: true,
              items: [
                {
                  xtype: "treepanel",
                  rootVisible: false,
                  border: false,
                  store: {
                    type: "tree",
                    data: {
                      expanded: true,
                      children: [
                        {
                          text: "<b>BC Dokumen OUT</b>",
                          expanded: false,
                          children: [
                            { leaf: true, text: "Header Dokumen", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_detail_bcout_header", modulename: "dokumen_detail" },
                            { leaf: true, text: "Lampiran Dokumen", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_detail_bcout_lampiran", modulename: "dokumen_detail" },
                            { leaf: true, text: "Item/Part ", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_detail_bcout_detail", modulename: "dokumen_detail" },
                            { leaf: true, text: "Kontainer ", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_detail_bcout_kontainer", modulename: "dokumen_detail" },
                            { leaf: true, text: "Kemasan ", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_detail_bcout_kemasan", modulename: "dokumen_detail" },
                            { leaf: true, text: "Jaminan ", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_detail_bcout_jaminan", modulename: "dokumen_detail" },
                            { leaf: true, text: "Tarif ", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_detail_bcout_tarif", modulename: "dokumen_detail" },
                          ],
                        },
                        {
                          text: "<b>Finish Good</b>",
                          expanded: true,
                          children: [
                            { leaf: true, text: "Data Container", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_detail_sp_container", modulename: "dokumen_detail" },
                            { leaf: true, text: "Data Invoice", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_detail_sp_invoice", modulename: "dokumen_detail" },
                            { leaf: true, text: "Data SA", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_detail_sp_sa", modulename: "dokumen_detail" },
                          ],
                        },
                        {
                          text: "<b>WIP Production</b>",
                          expanded: true,
                          children: [
                            { leaf: true, text: "Hasil Produksi", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_detail_wp_produksi", modulename: "dokumen_detail" },
                            { leaf: true, text: "WIP Out", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_detail_wp_wip_out", modulename: "dokumen_detail" },
                            { leaf: true, text: "WIP In", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_detail_wp_wip_in", modulename: "dokumen_detail" },
                            { leaf: true, text: "Bill Of Material", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_detail_wp_bom", modulename: "dokumen_detail" },
                          ],
                        },
                        {
                          text: "<b>Warehouse</b>",
                          expanded: true,
                          children: [
                            { leaf: true, text: "Receiving", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_detail_wh_receiving", modulename: "dokumen_detail" },
                            { leaf: true, text: "Out To WIP", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_detail_wh_out_wip", modulename: "dokumen_detail" },
                          ],
                        },
                        {
                          text: "<b>BC Dokumen IN</b>",
                          expanded: true,
                          children: [
                            { leaf: true, text: "Header Dokumen", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_detail_bcin_header", modulename: "dokumen_detail" },
                            { leaf: true, text: "Lampiran Dokumen", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_detail_bcin_lampiran", modulename: "dokumen_detail" },
                            { leaf: true, text: "Item/Part ", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_detail_bcin_detail", modulename: "dokumen_detail" },
                            { leaf: true, text: "Kontainer ", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_detail_bcin_kontainer", modulename: "dokumen_detail" },
                            { leaf: true, text: "Kemasan ", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_detail_bcin_kemasan", modulename: "dokumen_detail" },
                            { leaf: true, text: "Jaminan ", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_detail_bcin_jaminan", modulename: "dokumen_detail" },
                            { leaf: true, text: "Tarif ", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_detail_bcin_tarif", modulename: "dokumen_detail" },
                          ],
                        },
                        {
                          text: "<b>Sumber Data</b>",
                          expanded: true,
                          children: [{ leaf: true, text: "Sumber Data", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_detail_sd_sumber_data", modulename: "dokumen_detail" }],
                        },
                      ],
                    },
                  },
                  listeners: {
                    itemclick: "sa_dokumen_detail_link_click",
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
          pid: "sa_dokumen_detail_tabpanel",
          frame: false,
          border: true,
          activeTab: 0,
          items: [],
        },
      ],
    });

    this.callParent(arguments);
  },
});
