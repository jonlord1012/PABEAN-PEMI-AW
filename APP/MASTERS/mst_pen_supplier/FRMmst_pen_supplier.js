var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.MASTERS.mst_pen_supplier.FRMmst_pen_supplier", {
  extend: "Ext.window.Window",
  alias: "widget.FRMmst_pen_supplier",
  reference: "FRMmst_pen_supplier",
  title: "Master Pendukung Supplier",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: true,
  controller: "Cmst_pen_supplier",
  //y: -110,
  bodyPadding: "5 5 5 5",
  flex: 1,
  height: 360,
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
          bodyPadding: "5 0 0 0",
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
                    { xtype: "hidden", labelWidth: 120, width: 200, fieldLabel: "ID", name: "ID", fieldCls: "fieldinput", readOnly: false },
                    { xtype: "textfield", labelWidth: 120, width: 200, fieldLabel: "KODE INTERNAL", name: "KODE_INTERNAL", maxLength: 10, fieldCls: "fieldinput", readOnly: false },
                    { xtype: "textfield", labelWidth: 120, width: 400, fieldLabel: "NAMA", name: "NAMA", maxLength: 255, fieldCls: "fieldinput", readOnly: false },
                    { xtype: "textarea", labelWidth: 120, width: 600, fieldLabel: "ALAMAT", name: "ALAMAT", fieldCls: "fieldinput", readOnly: false },
                    { xtype: "textfield", labelWidth: 120, width: 400, fieldLabel: "NPWP", name: "NPWP", maxLength: 20, fieldCls: "fieldinput", readOnly: false },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 200, fieldLabel: "KODE ID", name: "KODE_ID", maxLength: 10, fieldCls: "fieldinput", readOnly: false },
                        { xtype: "tbspacer", width: 190 },
                        { xtype: "textfield", labelWidth: 120, width: 200, fieldLabel: "KODE NEGARA", name: "KODE_NEGARA", maxLength: 10, fieldCls: "fieldinput", readOnly: false },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "numberfield", labelWidth: 120, width: 200, fieldLabel: "ID CEISA", minValue:1, name: "ID_CEISA", fieldCls: "fieldinput", readOnly: false },
                        { xtype: "tbspacer", width: 190 },
                        { xtype: "textfield", labelWidth: 120, width: 200, fieldLabel: "KODE COO", name: "KODE_COO", maxLength: 20, fieldCls: "fieldinput", readOnly: false },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 200, fieldLabel: "KODE MOLTS", name: "KODE_MOLTS", maxLength: 20, fieldCls: "fieldinput", readOnly: false },
                        { xtype: "tbspacer", width: 190 },
                        { xtype: "textfield", labelWidth: 120, width: 200, fieldLabel: "KODE LP", name: "KODE_LP", maxLength: 20, fieldCls: "fieldinput", readOnly: false },
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
        { xtype: "button", text: "Simpan", pid: "btsimpan_draft", icon: vconfig.getstyle + "icon/save.gif", tooltip: "Proses Simpan Data Master Supplier" },
        { xtype: "button", text: "Hapus", pid: "bthapus_draft", icon: vconfig.getstyle + "icon/delete.png", tooltip: "Proses Hapus Data Master Supplier" },
      ],
      // other options....
    },
  ],
});
