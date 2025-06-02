var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.SYNCHRONIZE.sync_doc_lp.lp_tracing_document", {
  extend: "Ext.window.Window",
  alias: "widget.lp_tracing_document",
  reference: "lp_tracing_document",
  title: "Tracing Document No Invoice : ",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: true,
  controller: "Csync_doc_lp",
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
                        //
                        { leaf: true, text: "Sumber Data", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "lp_sumberdata", modulename: "sumberdata" },
                      ],
                    },
                    {
                      text: "<b>Mapping</b>",
                      expanded: true,
                      children: [{ leaf: true, text: "Get Mapping Supplier & Item", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "lp_mappingdata", modulename: "mappingdata" }],
                    },
                    {
                      text: "<b>Dokumen BC In</b>",
                      expanded: false,
                      children: [
                        { leaf: true, text: "Header Dokumen", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "lp_pabean_header", modulename: "dokumenpabean" },
                        { leaf: true, text: "Lampiran Dokumen", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "lp_pabean_dokumen", modulename: "dokumenpabean" },
                        { leaf: true, text: "Item/Part ", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "lp_pabean_item", modulename: "dokumenpabean" },
                        { leaf: true, text: "Kontainer ", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "lp_pabean_kontainer", modulename: "dokumenpabean" },
                        { leaf: true, text: "Kemasan ", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "lp_pabean_kemasan", modulename: "dokumenpabean" },
                        { leaf: true, text: "Jaminan ", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "lp_pabean_jaminan", modulename: "dokumenpabean" },
                        { leaf: true, text: "Tarif ", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "lp_pabean_tarif", modulename: "dokumenpabean" },
                      ],
                    },
                    {
                      text: "<b>Dokumen Ceisa In</b>",
                      expanded: false,
                      children: [
                        { leaf: true, text: "Header Dokumen", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "lp_ceisa_header", modulename: "dokumenceisa" },
                        { leaf: true, text: "Lampiran Dokumen", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "lp_ceisa_dokumen", modulename: "dokumenceisa" },
                        { leaf: true, text: "Item/Part ", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "lp_ceisa_item", modulename: "dokumenceisa" },
                        { leaf: true, text: "Kontainer ", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "lp_ceisa_kontainer", modulename: "dokumenceisa" },
                        { leaf: true, text: "Kemasan ", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "lp_ceisa_kemasan", modulename: "dokumenceisa" },
                        { leaf: true, text: "Jaminan ", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "lp_ceisa_jaminan", modulename: "dokumenceisa" },
                        { leaf: true, text: "Tarif ", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "lp_ceisa_tarif", modulename: "dokumenceisa" },
                      ],
                    },
                    {
                      text: "<b>Inventory</b>",
                      expanded: true,
                      children: [
                        //
                        { leaf: true, text: "Receiving", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "lp_inv_receiving", modulename: "inventory" },
                        { leaf: true, text: "Outgoing", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "lp_inv_outgoing", modulename: "inventory" },
                      ],
                    },
                  ],
                },
              },
              listeners: {
                itemclick: "lp_accordion_list_click",
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
      pid: "lp_tabpanel_tracing",
      frame: false,
      border: true,
      activeTab: 0,
      items: [
        //
      ],
    },
  ],
  dockedItems: [
    {
      xtype: "toolbar",
      dock: "top",
      items: [
        "-",
        { xtype: "component", html: "***" },
        { xtype: "button", pid: "lp_btget_from_ceisa", text: "Get From Data Ceisa", icon: vconfig.getstyle + "icon/database.ico", tooltip: "Get From Data Ceisa" },
        { xtype: "component", html: "***" },
        //batas,
      ],
      // other options....
    },
  ],
  listeners: {
    afterlayout: function (cmp) {
      try {
        var GRIDmain = Ext.ComponentQuery.query("GRIDsync_doc_lp grid[pid=GRIDsync_doc_lp]")[0];
        var vdt = GRIDmain.getSelectionModel().getSelection()[0].data;
        cmp.setTitle("Tracing Document No Invoice : " + vdt.INVOICE_NO);
      } catch (ex) {
        COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      }
    },
  },
});
