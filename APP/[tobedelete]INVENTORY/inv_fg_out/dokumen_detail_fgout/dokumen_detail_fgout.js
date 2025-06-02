var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.INVENTORY.inv_fg_out.dokumen_detail_fgout.dokumen_detail_fgout", {
  extend: "Ext.window.Window",
  id: "fgout_dokumen_detail_fgout",
  alias: "widget.fgout_dokumen_detail_fgout",
  reference: "fgout_dokumen_detail_fgout",
  title: "Detail Dokumen FG Production",
  modal: true,
  closeAction: "destroy",
  autoDestroy: true,
  centered: true,
  autoScroll: true,
  width: mainpanel.getWidth() * 0.95,
  height: mainpanel.getHeight() * 0.9,
  requires: ["TDK.INVENTORY.inv_fg_out.dokumen_detail_fgout.Cdokumen_detail_fgout"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cfgoutdokumen_detail_fgout",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_fgout_dokumen_detail_fgout",
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
              title: "Tracing Detail fg Production",
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
                          text: "<b>fg Production</b>",
                          expanded: true,
                          children: [
                            //
                            { leaf: true, text: "fg Out", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "wp_fg_out", modulename: "dokumen_detail_fgout" },
                            { leaf: true, text: "Summary Bahan Baku", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "wp_fg_out_bahanbaku", modulename: "dokumen_detail_fgout" },
                          ],
                        },
                      ],
                    },
                  },
                  listeners: {
                    itemclick: "fgout_dokumen_detail_fgout_link_click",
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
          pid: "fgout_dokumen_detail_fgout_tabpanel",
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
