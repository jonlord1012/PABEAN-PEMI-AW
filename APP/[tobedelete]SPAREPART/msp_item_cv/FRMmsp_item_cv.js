var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.SPAREPART.msp_item_cv.FRMmsp_item_cv", {
  extend: "Ext.window.Window",
  alias: "widget.FRMmsp_item_cv",
  reference: "FRMmsp_item_cv",
  title: "Master FG Cost Center",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: true,
  controller: "Cmsp_item_cv",
  //y: -110,
  bodyPadding: "5 5 5 5",
  flex: 1,
  height: 230,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
  items: [
    {
      xtype: "form",
      frame: false,
      border: false,
      fieldDefaults: {
        labelAlign: "left",
        labelWidth: 70,
        margin: "0 10 5 0",
      },
      items: [
        {
          xtype: "container",
          layout: "hbox",
          bodyPadding: "5 0 0 5",
          items: [
            {
              xtype: "fieldset",
              flex: 1,
              bodyPadding: "5 0 0 0",
              items: [
                {
                  xtype: "container",
                  layout: "vbox",
                  margin: "5 0 0 0",
                  items: [
                    { xtype: "hidden", labelWidth: 150, width: 200, fieldLabel: "ID", name: "ID", fieldCls: "fieldinput", readOnly: false},
                    { xtype: "textfield", labelWidth: 150, width: 280, fieldLabel: "COST CENTER CODE", name: "COSTCENTER_CODE", maxLength: 10, fieldCls: "fieldinput", readOnly: false},
                    { xtype: "textfield", labelWidth: 150, width: 400, fieldLabel: "COST CENTER NAME", name: "COSTCENTER_NAME", maxLength: 50, fieldCls: "fieldinput", readOnly: false},
                    { xtype: "textfield", labelWidth: 150, width: 400, fieldLabel: "COST CENTER DESCRIPTION", name: "COSTCENTER_DESCRIPTION", maxLength: 50, fieldCls: "fieldinput", readOnly: false},
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 150, width: 280, fieldLabel: "CARLINE", name: "COSTCENTER_CARLINE", maxLength: 50, fieldCls: "fieldinput", readOnly: true},
                        {
                          xtype: "button",
                          pid: "btsearch",
                          module: "module_carline",
                          popupwidth: 800,  
                          tofield: {
                            COSTCENTER_CARLINE: "CARLINE",
                            COSTCENTER_CARLINEDESC: "CARLINE_NAME",
                          },
                          icon: vconfig.getstyle + "icon/search.ico",
                          tooltip: "search",
                        },
                      ],
                    },
                    { xtype: "textfield", labelWidth: 150, width: 400, fieldLabel: "CARLINE DESCRIPTION", name: "COSTCENTER_CARLINEDESC", maxLength: 50, fieldCls: "fieldinput", readOnly: true},
                    { xtype: "hidden", labelWidth: 150, width: 200, fieldLabel: "ID COMPANY", name: "ID_COMPANY", fieldCls: "fieldinput", readOnly: false},
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  dockedItems: [
    {
      xtype: "toolbar",
      height: 30,
      dock: "top",
      items: [
        { xtypeL: "tbspacer", width: 5 },
        { xtype: "button", text: "Input Baru", pid: "btnew_input", icon: vconfig.getstyle + "icon/docshow.png", tooltip: "Proses Reset Form Input" },
        { xtype: "button", text: "Simpan", pid: "btsimpan_draft", icon: vconfig.getstyle + "icon/save.gif", tooltip: "Proses Simpan Data Master Cost Center" },
        { xtype: "button", text: "Hapus", pid: "bthapus_draft", icon: vconfig.getstyle + "icon/delete.png", tooltip: "Proses Hapus Data Master Cost Center" },
      ],
      // other options....
    },
  ],
  listeners: {
    afterrender: "FRMmsp_item_cv_load",
  },
});
