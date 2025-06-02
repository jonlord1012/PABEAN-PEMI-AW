var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.MASTERS.master_goods.FRMmaster_goods", {
  extend: "Ext.window.Window",
  alias: "widget.FRMmaster_goods",
  reference: "FRMmaster_goods",
  title: "Master Goods",
  modal: true,
  closeAction: "hide",
  centered: true,
  autoScroll: false,
  controller: "Cmaster_goods",
  //y: -110,
  bodyPadding: "5 5 5 5",
  flex: 1,
  height: 610,
  width: 1000,
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
                  xtype: "container",
                  layout: "vbox",
                  margin: "5 0 0 0",
                  items: [
                    { xtype: "hidden", labelWidth: 120, width: 400, labelAlign: "left", fieldLabel: "ID", name: "ID", fieldCls: "fieldinput", readOnly: false },
                    { xtype: "textfield", labelWidth: 120, width: 400, fieldLabel: "PART NO", name: "PART_NO", fieldCls: "fieldinput", maxLength: 70, readOnly: false},
                    { xtype: "textfield", labelWidth: 120, width: 400, fieldLabel: "PART NO 2", name: "PART_NO2", fieldCls: "fieldinput", maxLength: 70, readOnly: false},
                    { xtype: "textfield", labelWidth: 120, width: 400, fieldLabel: "PART ALIAS", name: "PART_ALIAS", fieldCls: "fieldinput", maxLength: 70, readOnly: false},
                    { xtype: "textfield", labelWidth: 120, width: 400, fieldLabel: "PART NAME", name: "PART_NAME", fieldCls: "fieldinput", maxLength: 100, readOnly: false},
                    { xtype: "textarea", labelWidth: 120, width: 400, fieldLabel: "PART DESCRIPTION", name: "PART_DESCRIPTION", fieldCls: "fieldinput", maxLength: 120, readOnly: false},
                    { xtype: "textfield", labelWidth: 120, width: 400, fieldLabel: "RACK NO", name: "RACK_NO", fieldCls: "fieldinput", maxLength: 30, readOnly: false},
                    { xtype: "numberfield", labelWidth: 120, width: 200, fieldLabel: "PART MIN QTY", name: "PART_MIN_QTY", fieldCls: "fieldinput", value:"0", minValue: 0, readOnly: false},
                    { xtype: "numberfield", labelWidth: 120, width: 200, fieldLabel: "PART SVC LEVEL", name: "PART_SVC_LEVEL", value:"0", fieldCls: "fieldinput", minValue: 0, readOnly: false},
                    { xtype: "tbspacer", height: 10 },
                  ],
                },
                {
                  xtype: "container",
                  layout: "vbox",
                  items :[
                    //{ xtype: "textfield", labelWidth: 120, width: 400, fieldLabel: "NOMOR HS", name: "NOMOR_HS", fieldCls: "fieldinput", maxLength: 30, readOnly: false },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 370, fieldLabel: "HS CODE", name: "NOMOR_HS", fieldCls: "fieldinput", readOnly: true},
                        {
                          xtype: "button",
                          pid: "btsearch",
                          module: "module_nomorhs",
                          popupwidth: 800,  
                          tofield: {
                            NOMOR_HS: "NOMOR_HS",
                          },
                          icon: vconfig.getstyle + "icon/search.ico",
                          tooltip: "search",
                        },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 370, fieldLabel: "PART UOM", name: "PART_UOM", fieldCls: "fieldinput", readOnly: true},
                        {
                          xtype: "button",
                          pid: "btsearch",
                          module: "module_partuom",
                          popupwidth: 800,  
                          tofield: {
                            PART_UOM: "MODE_CODE",
                          },
                          icon: vconfig.getstyle + "icon/search.ico",
                          tooltip: "search",
                        },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 370, fieldLabel: "PART GROUP", name: "PART_GROUP", fieldCls: "fieldinput", readOnly: true},
                        {
                          xtype: "button",
                          pid: "btsearch",
                          module: "module_partgroup",
                          popupwidth: 800,  
                          tofield: {
                            PART_GROUP: "MODE_CODE",
                          },
                          icon: vconfig.getstyle + "icon/search.ico",
                          tooltip: "search",
                        },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 370, fieldLabel: "PART CATEGORY", name: "PART_CATEGORY", fieldCls: "fieldinput", readOnly: true},  
                        {
                          xtype: "button",
                          pid: "btsearch",
                          module: "module_partcategory",
                          popupwidth: 800,  
                          tofield: {
                            PART_CATEGORY: "MODE_CODE",
                          },
                          icon: vconfig.getstyle + "icon/search.ico",
                          tooltip: "search",
                        },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 370, fieldLabel: "PART BASE", name: "BASE_PART", fieldCls: "fieldinput", readOnly: true},
                        {
                          xtype: "button",
                          pid: "btsearch",
                          module: "module_partbase",
                          popupwidth: 800,  
                          tofield: {
                            BASE_PART: "MODE_CODE",
                          },
                          icon: vconfig.getstyle + "icon/search.ico",
                          tooltip: "search",
                        },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 370, fieldLabel: "PART TYPE", name: "PART_TYPE", fieldCls: "fieldinput", readOnly: true},
                        {
                          xtype: "button",
                          pid: "btsearch",
                          module: "module_parttype",
                          popupwidth: 800,  
                          tofield: {
                            PART_TYPE: "MODE_CODE",
                          },
                          icon: vconfig.getstyle + "icon/search.ico",
                          tooltip: "search",
                        },
                      ],
                    },
                    { xtype: "checkbox", labelWidth: 120, width: 200, fieldLabel: "IS PART CONSUMABLE", name: "PART_CONSUMABLE", fieldCls: "checkbox", readOnly: false},
                    { xtype: "checkbox", labelWidth: 120, width: 200, fieldLabel: "IS PARTLIST", name: "IS_PARTLIST", fieldCls: "checkbox", readOnly: false},
                    { xtype: "checkbox", labelWidth: 120, width: 200, fieldLabel: "IS BOM", name: "IS_BOM", fieldCls: "checkbox", readOnly: false},
                    { xtype: "checkbox", labelWidth: 120, width: 200, fieldLabel: "IS AUTO OUT", name: "IS_AUTO_OUT", fieldCls: "checkbox", readOnly: false},
                    { xtype: "hidden", labelWidth: 120, width: 180, fieldLabel: "ID COMPANY", name: "ID_COMPANY", fieldCls: "fieldinput", readOnly: false},
                  ],
                }
          ],
        },
      ],
    },
    {
      xtype: "container",
      layout: { type: "hbox", pack: "start", align: "stretch" },
      flex: 1,
      items: [
        {
          xtype: "grid",
          pid: "GRIDFRMmaster_goods_parths",
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
              text: "List Nomor HS",
              columns: [
                { header: "NOMOR HS", dataIndex: "NOMOR_HS", sortable: true, width: 200, filter: { xtype: "textfield" } },
                { header: "TARIF BM", dataIndex: "TARIF_BM", sortable: true, width: 300, filter: { xtype: "textfield" } },
                { header: "TARIF CUKAI", dataIndex: "TARIF_CUKAI", sortable: true, width: 100, filter: { xtype: "textfield" } },
                { header: "TARIF PPH", dataIndex: "TARIF_PPH", sortable: true, width: 80, filter: { xtype: "textfield" } },
                { header: "TARIF PPN", dataIndex: "TARIF_PPN", sortable: true, width: 100, filter: { xtype: "textfield" } },
                { header: "TARIF PPNBM", dataIndex: "TARIF_PPNBM", sortable: true, width: 100, filter: { xtype: "textfield" } },
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
        { xtype: "button", text: "Simpan", pid: "btsimpan_draft", icon: vconfig.getstyle + "icon/save.gif", tooltip: "Proses Simpan Data Master Part/Item" },
        { xtype: "button", text: "Hapus", pid: "bthapus_draft", icon: vconfig.getstyle + "icon/delete.png", tooltip: "Proses Hapus Data Master Part/Item" },
      ],
      // other options....
    },
  ],
  listeners: {
    afterrender: "GRIDFRMmaster_goods_parths_load",
  },
});
