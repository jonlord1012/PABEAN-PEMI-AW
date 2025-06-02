var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.MASTERS.mst_fg_carline.FRMmst_fg_carline", {
  extend: "Ext.window.Window",
  alias: "widget.FRMmst_fg_carline",
  reference: "FRMmst_fg_carline",
  title: "Master FG Carline",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: true,
  controller: "Cmst_fg_carline",
  //y: -110,
  bodyPadding: "5 5 5 5",
  flex: 1,
  height: 300,
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
          title: "Input Data",
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
                    { xtype: "hidden", labelWidth: 150, width: 300, labelAlign: "left", fieldLabel: "ID", name: "ID", fieldCls: "fieldinput", readOnly: false },
                    { xtype: "textfield", labelWidth: 150, width: 330, fieldLabel: "CARLINE", name: "CARLINE", fieldCls: "fieldinput", maxLength: 50, readOnly: false },
                    { xtype: "tbspacer", width: 100 },
                    { xtype: "textfield", labelWidth: 150, width: 230, fieldLabel: "PREFIX DR", name: "PREFIX_DR", fieldCls: "fieldinput", maxLength: 1, readOnly: false },
                  ],
                },
                {
                  xtype: "container",
                  layout: "hbox",
                  margin: "0 0 0 0",
                  items: [
                    { xtype: "textfield", labelWidth: 150, width: 430, fieldLabel: "CARLINE NAME", name: "CARLINE_NAME", fieldCls: "fieldinput", maxLength: 50, readOnly: false },
                    { xtype: "textfield", labelWidth: 150, width: 230, labelAlign: "left", fieldLabel: "INVOICENO SAMPLE PREFIX", name: "INVOICENO_SAMPLE_PREFIX", fieldCls: "fieldinput", maxLength: 1, readOnly: false },
                  ],
                },
                {
                  xtype: "container",
                  layout: "hbox",
                  margin: "0 0 0 0",
                  items: [
                    { xtype: "numberfield", labelWidth: 150, width: 230, fieldLabel: "CONTAINER PALLET QTY", name: "CONTAINER_PALLET_QTY", fieldCls: "fieldinput", minValue: 1, readOnly: false },
                    { xtype: "tbspacer", width: 200 },
                    { xtype: "textfield", labelWidth: 150, width: 230, labelAlign: "left", fieldLabel: "INVOICENO SAMPLE AF", name: "INVOICENO_SAMPLE_AF", fieldCls: "fieldinput", maxLength: 1, readOnly: false },
                  ],
                },
                {
                  xtype: "container",
                  layout: "hbox",
                  margin: "0 0 0 0",
                  items: [
                    { xtype: "checkbox", labelWidth: 150, width: 230, fieldLabel: "MIX CLS", name: "MIX_CLS", fieldCls: "checkbox", readOnly: false },
                    { xtype: "tbspacer", width: 200 },
                    { xtype: "textfield", labelWidth: 150, width: 230, labelAlign: "left", fieldLabel: "INVOICENO SAMPLE SF", name: "INVOICENO_SAMPLE_SF", fieldCls: "fieldinput", maxLength: 1, readOnly: false },
                  ],
                },
                {
                  xtype: "container",
                  layout: "hbox",
                  margin: "0 0 0 0",
                  items: [
                    { xtype: "textfield", labelWidth: 150, width: 230, fieldLabel: "NEW CARLINE", name: "NEW_CARLINE", fieldCls: "fieldinput", maxLength: 25, readOnly: false },
                    { xtype: "tbspacer", width: 200 },
                    { xtype: "textfield", labelWidth: 150, width: 230, labelAlign: "left", fieldLabel: "INVOICENO PROTOTYPE AF", name: "INVOICENO_PROTOTYPE_AF", fieldCls: "fieldinput", maxLength: 1, readOnly: false },
                  ],
                },
                {
                  xtype: "container",
                  layout: "hbox",
                  margin: "0 0 0 0",
                  items: [
                    { xtype: "textfield", labelWidth: 150, width: 230, labelAlign: "left", fieldLabel: "INVOICE CODE", name: "INVOICE_CODE", fieldCls: "fieldinput", maxLength: 5, readOnly: false },
                    { xtype: "tbspacer", width: 200 },
                    { xtype: "textfield", labelWidth: 150, width: 230, labelAlign: "left", fieldLabel: "INVOICENO PROTOTYPE SF", name: "INVOICENO_PROTOTYPE_SF", fieldCls: "fieldinput", maxLength: 1, readOnly: false },
                  ],
                },
                {
                  xtype: "container",
                  layout: "hbox",
                  margin: "0 0 0 0",
                  items: [
                    { xtype: "textfield", labelWidth: 150, width: 230, labelAlign: "left", fieldLabel: "INVOICE CODE SAMPLE", name: "INVOICE_CODE_SAMPLE", fieldCls: "fieldinput", maxLength: 5, readOnly: false },
                    { xtype: "tbspacer", width: 200 },
                    { xtype: "textfield", labelWidth: 150, width: 250, labelAlign: "left", fieldLabel: "INTERNAL ORDER", name: "INTERNAL_ORDER", fieldCls: "fieldinput", maxLength: 12, readOnly: false },
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
        { xtype: "button", text: "Simpan", pid: "btsimpan_draft", icon: vconfig.getstyle + "icon/save.gif", tooltip: "Proses Simpan Data Master Carline" },
        { xtype: "button", text: "Hapus", pid: "bthapus_draft", icon: vconfig.getstyle + "icon/delete.png", tooltip: "Proses Hapus Data Master Carline" },
      ],
      // other options....
    },
  ],
  listeners: {
    afterrender: "FRMmst_fg_carline_load",
  },
});
