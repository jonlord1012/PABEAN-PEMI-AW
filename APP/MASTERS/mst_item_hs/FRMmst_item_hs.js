var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.MASTERS.mst_item_hs.FRMmst_item_hs", {
  extend: "Ext.window.Window",
  alias: "widget.FRMmst_item_hs",
  reference: "FRMmst_item_hs",
  title: "Master Item/Part HS",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: false,
  controller: "Cmst_item_hs",
  //y: -110,
  bodyPadding: "5 5 5 5",
  width: 1000,
  height: mainpanel.getHeight() * 0.9,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
  items: [
    {
      xtype: "form",
      bodyPadding: "5 5 5 5",
      fieldDefaults: {
        labelAlign: "left",
        labelWidth: 70,
        margin: "0 10 5 0",
      },
      border: false,
      layout: { type: "hbox", pack: "start", align: "stretch" },
      items: [
        {
          xtype: "container",
          layout: "vbox",
          flex: 1,
          items: [
            { xtype: "hidden", labelWidth: 120, width: 300, labelAlign: "left", fieldLabel: "ID", name: "ID", fieldCls: "fieldinput", readOnly: false },
            { xtype: "textfield", labelWidth: 120, width: 310, fieldLabel: "NOMOR HS", name: "NOMOR_HS", fieldCls: "fieldinput", maxLength: 25, readOnly: false },
            { xtype: "numberfield", labelWidth: 120, width: 230, fieldLabel: "TARIF BM", name: "TARIF_BM", fieldCls: "fieldinput", value: "0", minValue: 0, readOnly: false },
            { xtype: "numberfield", labelWidth: 120, width: 230, fieldLabel: "TARIF PPN", name: "TARIF_PPN", fieldCls: "fieldinput", value: "11", minValue: 0, readOnly: false },        
          ],
        },
        {
          xtype: "container",
          layout: "vbox",
          flex: 1,
          items: [
            { xtype: "numberfield", labelWidth: 120, width: 230, fieldLabel: "TARIF PPH", name: "TARIF_PPH", fieldCls: "fieldinput", value: "2.5", minValue: 0, readOnly: false },
            { xtype: "numberfield", labelWidth: 120, width: 230, fieldLabel: "TARIF CUKAI", name: "TARIF_CUKAI", fieldCls: "fieldinput", value: "0", minValue: 0, readOnly: false },
            { xtype: "numberfield", labelWidth: 120, width: 230, fieldLabel: "TARIF PPNBM", name: "TARIF_PPNBM", fieldCls: "fieldinput", value: "0", minValue: 0, readOnly: false },
            { xtype: "hidden", labelWidth: 120, width: 200, fieldLabel: "ID COMPANY", name: "ID_COMPANY", fieldCls: "fieldinput", readOnly: false },
          ],
        },
      ],
    },
    { xtype: "tbspacer", height: 10 },
    {
      xtype: "container",
      layout: { type: "hbox", pack: "start", align: "stretch" },
      flex: 1,
      items: [
        {
          xtype: "grid",
          pid: "GRIDFRMmst_item_hs",
          emptyText: "No Matching Records",
          flex: 1,
          plugins: [
            "filterfield",
            {
              ptype: "cellediting",
              clicksToEdit: 1,
            },
          ],
          columns: [
            { xtype: "rownumberer", width: 50 },
            {
              text: "List Part/Item",
              columns: [
                { header: "PART NO", dataIndex: "PART_NO", sortable: true, width: 160, filter: { xtype: "textfield" } },
                { header: "PART NAME", dataIndex: "PART_NAME", sortable: true, width: 200, filter: { xtype: "textfield" } },
                { header: "PART DESCRIPTION", dataIndex: "PART_DESCRIPTION", sortable: true, width: 300, filter: { xtype: "textfield" } },
                { header: "PART MIN QTY", dataIndex: "PART_MIN_QTY", sortable: true, width: 100, filter: { xtype: "textfield" } },
                { header: "PART UOM", dataIndex: "PART_UOM", sortable: true, width: 80, filter: { xtype: "textfield" } },
                { header: "PART GROUP", dataIndex: "PART_GROUP", sortable: true, width: 100, filter: { xtype: "textfield" } },
                { header: "PART CATEGORY", dataIndex: "PART_CATEGORY", sortable: true, width: 100, filter: { xtype: "textfield" } },
                { header: "PART TYPE", dataIndex: "PART_TYPE", sortable: true, width: 200, filter: { xtype: "textfield" } },
                { header: "PART SVC LEVEL", dataIndex: "PART_SVC_LEVEL", sortable: true, width: 100, filter: { xtype: "textfield" } },
                { header: "ID COMPANY", dataIndex: "ID_COMPANY", sortable: true, width: 100, filter: { xtype: "textfield" } },
                { header: "CONSUMABLE", dataIndex: "CONSUMABLE", sortable: true, width: 100, filter: { xtype: "textfield" } },
              ],
            },
          ],
          bbar: {
            xtype: "pagingtoolbar",
            displayInfo: true,
            displayMsg: "Displaying topics {0} - {1} of {2}",
            emptyMsg: "No topics to display",
          },
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
        { xtype: "button", text: "Simpan", pid: "btsimpan_draft", icon: vconfig.getstyle + "icon/save.gif", tooltip: "Proses Simpan Data Master Part/Item HS" },
        { xtype: "button", text: "Hapus", pid: "bthapus_draft", icon: vconfig.getstyle + "icon/delete.png", tooltip: "Proses Hapus Data Master Part/Item HS" },
      ],
      // other options....
    },
  ],
  listeners: {
    afterrender: "GRIDFRMmst_item_hs_load",
  },
});
