var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.INVENTORY.inv_wip_out.dokumen_detail.dokumen_detail", {
  extend: "Ext.window.Window",
  id: "wipout_dokumen_detail",
  alias: "widget.wipout_dokumen_detail",
  reference: "wipout_dokumen_detail",
  title: "Detail Dokumen WIP Production",
  modal: true,
  closeAction: "destroy",
  autoDestroy: true,
  centered: true,
  autoScroll: true,
  width: mainpanel.getWidth() * 0.95,
  height: mainpanel.getHeight() * 0.9,
  requires: ["TDK.INVENTORY.inv_wip_out.dokumen_detail.Cdokumen_detail"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cwipoutdokumen_detail",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_wipout_dokumen_detail",
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
              title: "Tracing Detail WIP Production",
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
                          text: "<b>WIP Production</b>",
                          expanded: true,
                          children: [
                            //
                            { leaf: true, text: "WIP Out", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "wp_wip_out", modulename: "dokumen_detail" },
                            { leaf: true, text: "Summary Bahan Baku", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "wp_wip_out_bahanbaku", modulename: "dokumen_detail" },
                          ],
                        },
                      ],
                    },
                  },
                  listeners: {
                    itemclick: "wipout_dokumen_detail_link_click",
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
          pid: "wipout_dokumen_detail_tabpanel",
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
