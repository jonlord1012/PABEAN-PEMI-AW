var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.MASTERS.mst_fg_assyno.FRMmst_fg_assyno", {
  extend: "Ext.window.Window",
  alias: "widget.FRMmst_fg_assyno",
  reference: "FRMmst_fg_assyno",
  title: "Master FG AssyNo",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: true,
  controller: "Cmst_fg_assyno",
  //y: -110,
  bodyPadding: "5 5 5 5",
  flex: 1,
  height: 260,
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
          margin: "5 0 0 5",
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
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "hidden", labelWidth: 120, width: 300, fieldLabel: "ID", name: "ID", fieldCls: "fieldinput", readOnly: false },
                        { xtype: "textfield", labelWidth: 120, width: 300, fieldLabel: "ASSY NO", name: "ASSY_NO", fieldCls: "fieldinput", maxLength: 25, readOnly: false },
                        { xtype: "tbspacer", width: 100 },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 400, fieldLabel: "ASSY NAME", name: "ASSY_NAME", fieldCls: "fieldinput", maxLength: 50, readOnly: false },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 180, fieldLabel: "ASSY CODE", name: "ASSY_CODE", fieldCls: "fieldinput", maxLength: 5, readOnly: false },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "textfield", labelWidth: 120, width: 300, fieldLabel: "CARLINE", name: "CARLINE", fieldCls: "fieldinput", readOnly: true },
                            {
                              xtype: "button",
                              pid: "btsearch",
                              module: "module_carline",
                              popupwidth: 800,  
                              tofield: {
                                CARLINE: "CARLINE",
                              },
                              icon: vconfig.getstyle + "icon/search.ico",
                              tooltip: "search",
                            },
                          ],
                        },
                        { xtype: "tbspacer", width: 77.5 },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 300, fieldLabel: "FAMILY CODE", name: "FAMILY_CODE", fieldCls: "fieldinput", maxLength: 25, readOnly: false },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 300, fieldLabel: "DESTINATION CODE", name: "DESTINATION_CODE", fieldCls: "fieldinput", maxLength: 25, readOnly: false },
                      ],
                    },
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
        { xtype: "button", text: "Simpan", pid: "btsimpan_draft", icon: vconfig.getstyle + "icon/save.gif", tooltip: "Proses Simpan Data Master AssyNo" },
        { xtype: "button", text: "Hapus", pid: "bthapus_draft", icon: vconfig.getstyle + "icon/delete.png", tooltip: "Proses Hapus Data Master AssyNo" },
      ],
      // other options....
    },
  ],
  listeners: {
    afterrender: "FRMmst_fg_assyno_load",
  },
});
