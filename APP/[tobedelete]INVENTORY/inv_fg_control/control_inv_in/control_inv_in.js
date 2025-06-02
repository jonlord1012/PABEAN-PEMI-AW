var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.INVENTORY.inv_fg_control.control_inv_in.control_inv_in", {
  extend: "Ext.window.Window",
  alias: "widget.control_inv_in",
  reference: "control_inv_in",
  title: "",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: true,
  width: mainpanel.getWidth() * 0.95,
  height: mainpanel.getHeight() * 0.95,
  config: {},
  requires: ["TDK.INVENTORY.inv_fg_control.control_inv_in.Ccontrol_inv_in"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Ccontrol_inv_in",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
      pid: "panel_control_inv_in",
      layout: "border",
      frame: true,
      border: true,
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
              title: "Tracing Detail Item Part",
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
                          text: "<b>Histori Receiving</b>",
                          expanded: true,
                          children: [
                            { leaf: true, text: "Sumber Data", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "FRMhr_sumberdata", modulename: "histori_receiving" },
                            { leaf: true, text: "Item Receiving", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "FRMhr_receiving", modulename: "histori_receiving" },
                            //{ leaf: true, text: "Sum by Invoice", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "sumberdata", modulename: "original_data" },
                            //{ leaf: true, text: "Sum by Item/Part", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "sumberdata", modulename: "original_data" },
                          ],
                        },
                        {
                          text: "<b>Stock Item/Part</b>",
                          expanded: true,
                          children: [
                            { leaf: true, text: "Mutasi Stock", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "FRMhr_mutasi_item", modulename: "mutasi" },
                            //{ leaf: true, text: "Sum by Invoice", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "sumberdata", modulename: "original_data" },
                            //{ leaf: true, text: "Sum by Item/Part", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "sumberdata", modulename: "original_data" },
                          ],
                        },
                        {
                          text: "<b>Histori Out</b>",
                          expanded: true,
                          children: [
                            { leaf: true, text: "Summary Out", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "FRMhr_summary_out", modulename: "histori_receiving" },
                            { leaf: true, text: "By Out Production", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "FRMhr_out_prod", modulename: "histori_receiving" },
                            { leaf: true, text: "By Out Repair", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "FRMhr_out_repair", modulename: "histori_receiving" },
                            { leaf: true, text: "By Out Selling", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "FRMhr_out_selling", modulename: "histori_receiving" },
                            { leaf: true, text: "By Out Scrap", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "FRMhr_out_scrap", modulename: "histori_receiving" },
                            //{ leaf: true, text: "Sum by Invoice", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "sumberdata", modulename: "original_data" },
                            //{ leaf: true, text: "Sum by Item/Part", icon: vconfig.getstyle + "icon/doc.png", allowclick: true, controlname: "sumberdata", modulename: "original_data" },
                          ],
                        },
                      ],
                    },
                  },
                  listeners: {
                    itemclick: "control_inv_in_tracing_link_click",
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
          pid: "control_inv_in_tabpanel",
          frame: false,
          border: true,
          activeTab: 0,
          items: [],
        },
      ],
    });

    this.callParent(arguments);
  },
  listeners: {
    afterrender: "control_inv_in_afterrender",
  },
});
