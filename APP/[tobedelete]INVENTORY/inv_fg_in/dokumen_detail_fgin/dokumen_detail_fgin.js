var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.INVENTORY.inv_fg_in.dokumen_detail_fgin.dokumen_detail_fgin", {
  extend: "Ext.window.Window",
  id: "fgin_dokumen_detail",
  alias: "widget.fgin_dokumen_detail",
  reference: "fgin_dokumen_detail",
  title: "Detail Dokumen SA Invoice",
  modal: true,
  closeAction: "destroy",
  autoDestroy: true,
  centered: true,
  autoScroll: true,
  width: mainpanel.getWidth() * 0.95,
  height: mainpanel.getHeight() * 0.9,
  requires: ["TDK.INVENTORY.inv_fg_in.dokumen_detail_fgin.Cdokumen_detail_fgin"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cfgindokumen_detail",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_fgin_dokumen_detail",
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
                          text: "<b>Detail Finish Good</b>",
                          expanded: true,
                          children: [
                            { leaf: true, text: "Data", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_detail_fgin_data", modulename: "dokumen_detail_fgin" },
                            { leaf: true, text: "Detail Finish Good", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_detail_fgin_detail", modulename: "dokumen_detail_fgin" },
                          ],
                        },
                        {
                          text: "<b>WIP Production</b>",
                          expanded: true,
                          children: [
                            { leaf: true, text: "WIP Out", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_detail_fgin_wip_out", modulename: "dokumen_detail_fgin" },
                            { leaf: true, text: "WIP In", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_detail_fgin_wip_in", modulename: "dokumen_detail_fgin" },
                            { leaf: true, text: "Bill Of Material", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "dokumen_detail_fgin_bom", modulename: "dokumen_detail_fgin" },
                          ],
                        },
                      ],
                    },
                  },
                  listeners: {
                    itemclick: "fgin_dokumen_detail_link_click",
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
          pid: "fgin_dokumen_detail_tabpanel",
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
