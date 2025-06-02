var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.MASTERS.mst_pen_teknisi.FRMmst_pen_teknisi", {
  extend: "Ext.window.Window",
  alias: "widget.FRMmst_pen_teknisi",
  reference: "FRMmst_pen_teknisi",
  title: "Master Pendukung Teknisi",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: true,
  controller: "Cmst_pen_teknisi",
  //y: -110,
  bodyPadding: "5 5 5 5",
  flex: 1,
  height: 180,
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
          xtype: "fieldset",
          flex: 1,
          bodyPadding: "5 0 0 0",
          items: [
            {
              xtype: "container",
              layout: "vbox",
              margin: "5 0 0 0",
              items: [
                { xtype: "hidden", labelWidth: 120, width: 300, labelAlign: "left", fieldLabel: "ID", name: "ID", fieldCls: "fieldinput", readOnly: false },
                { xtype: "textfield", labelWidth: 120, width: 300, labelAlign: "left", fieldLabel: "TEKNISI NAME", name: "TEKNISI_NAME", maxLength: 50, fieldCls: "fieldinput", readOnly: false },
                { xtype: "textfield", labelWidth: 120, width: 400, labelAlign: "left", fieldLabel: "DESCRIPTION", name: "TEKNISI_DESCRIPTION", maxLength: 120, fieldCls: "fieldinput", readOnly: false },
                { xtype: "textfield", labelWidth: 120, width: 300, labelAlign: "left", fieldLabel: "CODE", name: "TEKNISI_CODE", maxLength: 50, fieldCls: "fieldinput", readOnly: false },
                { xtype: "hidden", labelWidth: 120, width: 400, labelAlign: "left", fieldLabel: "COMPANY", name: "ID_COMPANY", maxLength: 10, fieldCls: "fieldinput", readOnly: false },
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
        { xtype: "button", text: "Simpan", pid: "btsimpan_draft", icon: vconfig.getstyle + "icon/save.gif", tooltip: "Proses Simpan Data Master Teknisi" },
        { xtype: "button", text: "Hapus", pid: "bthapus_draft", icon: vconfig.getstyle + "icon/delete.png", tooltip: "Proses Hapus Data Master Teknisi" },
      ],
      // other options....
    },
  ],
  listeners: {
    afterrender: "FRMmst_pen_teknisi_load",
  },
});
