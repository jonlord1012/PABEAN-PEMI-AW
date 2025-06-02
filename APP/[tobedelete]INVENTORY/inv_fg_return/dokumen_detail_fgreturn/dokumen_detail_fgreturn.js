var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.INVENTORY.inv_fg_return.dokumen_detail_fgreturn.dokumen_detail_fgreturn", {
  extend: "Ext.window.Window",
  id: "fgreturn_dokumen_detail_fgreturn",
  alias: "widget.fgreturn_dokumen_detail_fgreturn",
  reference: "fgreturn_dokumen_detail_fgreturn",
  title: "Detail Dokumen FG Return",
  modal: true,
  closeAction: "destroy",
  autoDestroy: true,
  centered: true,
  autoScroll: true,
  width: mainpanel.getWidth() * 0.95,
  height: mainpanel.getHeight() * 0.9,
  requires: ["TDK.INVENTORY.inv_fg_return.dokumen_detail_fgreturn.Cdokumen_detail_fgreturn"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cfgreturndokumen_detail_fgreturn",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_fgreturn_dokumen_detail_fgreturn",
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
                            { leaf: true, text: "fg Out", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "wp_fg_out", modulename: "dokumen_detail_fgreturn" },
                            { leaf: true, text: "Summary Bahan Baku", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "wp_fg_returnbahanbaku", modulename: "dokumen_detail_fgreturn" },
                          ],
                        },
                      ],
                    },
                  },
                  listeners: {
                    itemclick: "fgreturn_dokumen_detail_fgreturn_link_click",
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
          pid: "fgreturn_dokumen_detail_fgreturn_tabpanel",
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
