var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.MASTERS.mst_pen_kurs.FRMmst_pen_kurs", {
  extend: "Ext.window.Window",
  alias: "widget.FRMmst_pen_kurs",
  reference: "FRMmst_pen_kurs",
  title: "Master Pendukung Kurs",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: true,
  controller: "Cmst_pen_kurs",
  //y: -110,
  bodyPadding: "5 5 5 5",
  flex: 1,
  height: 150,
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
                { xtype: "textfield", labelWidth: 120, width: 180, fieldLabel: "KODE VALUTA", name: "KODE_VALUTA", maxLength: 25, fieldCls: "fieldinput", readOnly: false },
                { xtype: "textfield", labelWidth: 120, width: 400, fieldLabel: "URAIAN VALUTA", name: "URAIAN_VALUTA", maxLength: 100, fieldCls: "fieldinput", readOnly: false },
              ],
            },
          ],
        }
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
        { xtype: "button", text: "Simpan", pid: "btsimpan_draft", icon: vconfig.getstyle + "icon/save.gif", tooltip: "Proses Simpan Data Master Kurs" },
        { xtype: "button", text: "Hapus", pid: "bthapus_draft", icon: vconfig.getstyle + "icon/delete.png", tooltip: "Proses Hapus Data Master Kurs" },
      ],
      // other options....
    },
  ],
  listeners: {
    afterrender: "FRMmst_pen_kurs_load",
  },
});
