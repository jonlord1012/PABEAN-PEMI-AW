var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.MASTERS.mst_fg_bom.FRMmst_fg_bom", {
  extend: "Ext.window.Window",
  alias: "widget.FRMmst_fg_bom",
  reference: "FRMmst_fg_bom",
  title: "Master FG Bill Of Material",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: true,
  controller: "Cmst_fg_bom",
  //y: -110,
  bodyPadding: "5 5 5 5",
  flex: 1,
  width:mainpanel.getWidth() * 0.5,
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
            {
              xtype: "container",
              flex: 1,
              layout: "vbox",
              items: [
                {
                  xtype: "container",
                  layout: "hbox",
                  items: [
                    { xtype: "textfield", labelWidth: 100, width: 180, fieldLabel: "Assy Code", name: "ASSY_CODE", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "Assy Code" },
                    {
                      xtype: "button",
                      pid: "btsearch",
                      module: "mst_fg_assyno",
                      popupwidth: 900,
                      tofield: {
                        ASSY_CODE: "ASSY_CODE",
                        ASSY_NO: "ASSY_NO",
                        ASSY_NAME: "ASSY_NAME",
                        CARLINE: "CARLINE",
                        FAMILY_CODE: "FAMILY_CODE",
                        DESTINATION_CODE: "DESTINATION_CODE",
                      },
                      icon: vconfig.getstyle + "icon/search.ico",
                      tooltip: "search",
                    },
                  ],
                },
                { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "Assy No", name: "ASSY_NO", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "Assy No" },
                { xtype: "textfield", labelWidth: 100, width: 400, fieldLabel: "Assy Name", name: "ASSY_NAME", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "Assy Name" },
                { xtype: "checkbox", labelWidth: 100, width: 250, fieldLabel: "Active", name: "ACTIVE", fieldCls: "checkbox", readOnly: false},
              ],
            },
          ],
        },
        { xtype: "tbspacer", width: 5 },
        {
          xtype: "container",
          layout: "vbox",
          flex: 1,
          items: [
            { xtype: "textfield", labelWidth: 100, width: 250, fieldLabel: "BOM Code", name: "BOM_CODE", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "BOM Code" },
            { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "Carline", name: "CARLINE", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "Carline" },
            { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "Family Code", name: "FAMILY_CODE", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "Family Code" },
            { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "Destination Code", name: "DESTINATION_CODE", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "Destination Code" },
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
          pid: "GRIDFRMmst_fg_bom_part",
          emptyText: "No Matching Records",
          flex: 1,
          // store: {
          //   fields: [
          //     { name: "PART_NO", type: "string" },
          //     { name: "PART_NAME", type: "string" },
          //     { name: "PART_UOM", type: "string" },
          //     { name: "PART_QTY", type: "float" },
          //   ],
          // },
          // store: {
          //         autoLoad: true,
          //         remoteSort: true,
          //         remoteFilter: true,
          //         pageSize: 15,
          //         proxy: {
          //           type: "ajax",
          //           disableCaching: false,
          //           noCache: false,
          //           headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
          //           actionMethods: { read: "POST" },
          //           url: vconfig.service_api + "mst_fg_bom/mst_fg_bom",
          //           extraParams: {
          //             method: "read_fg_part",
          //             param: {ASSY_CODE:"ASSY_CODE",},  
          //           },
          //           reader: {
          //             type: "json",
          //             rootProperty: "Rows",
          //             totalProperty: "TotalRows",
          //             successProperty: "success",
          //           },
          //         },
          //       },

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
              text: "List Material",
              columns: [
                { sortable: true, width: 160 , filter: { xtype: "textfield" }, header: "PART NO", dataIndex: "PART_NO" },
                { sortable: true, width: 200, filter: { xtype: "textfield" }, header: "PART NAME", dataIndex: "PART_NAME" },
                { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "UOM", dataIndex: "PART_UOM" },
                {
                  filter: { xtype: "textfield" }, 
                  header: "QTY",
                  dataIndex: "PART_QTY",
                  sortable: true,
                  width: 80,
                  tdCls: "fieldinput",
                  align: "right",
                  // renderer: "formatqty",
                  editor: {
                    xtype: "textfield",
                    margin: "0 0 0 0",
                    name: "INPDESC",
                    allowBlank: false,
                  },
                },
                {
                  xtype:'actioncolumn',
                  align: "center",
                  menuDisabled:true,
                  width: 50,
                  items:[
                    { 
                      xtype: "button", 
                      text: "Hapus", 
                      pid: "bthapus_draft", 
                      icon: vconfig.getstyle + "icon/delete.ico", 
                      tooltip: "Proses Hapus Data Part!",
                      handler:'btndeletelistpart', 
                    },
                  ]
                },
              ],
            },
          ],
          bbar: {
            xtype: "pagingtoolbar",
            displayInfo: true,
            displayMsg: "Displaying topics {0} - {1} of {2}",
            emptyMsg: "No topics to display",
          },
          tbar: [
            { 
              xtype: "button", 
              text: "Add Part Item", 
              pid: "btsearchitem", 
              module: "mst_item",
              icon: vconfig.getstyle + "icon/add.png", 
              tooltip: "Proses Pilih Part Item" ,
              popupwidth: 900,
              tofield: {
                PART_NO: "PART_NO",
                PART_NAME: "PART_NAME",
                PART_UOM: "PART_UOM",
                PART_QTY: "PART_QTY",
              },
              tooltip: "search",
            },
            // "->",
            // {
            //   xtype: "checkbox",
            //   boxLabel: "Select All Item/Part",
            //   name: "select_all_item",
            //   hideLabel: true,
            //   checked: false,
            //   handler: "select_all_item_change",
            // },
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
        { xtype: "button", text: "Simpan", pid: "btsimpan_draft", icon: vconfig.getstyle + "icon/save.gif", tooltip: "Proses Simpan Data" },
        { xtype: "button", text: "Hapus", pid: "bthapus_draft", icon: vconfig.getstyle + "icon/delete.png", tooltip: "Proses Hapus Data" },
      ],
      // other options....
    },
  ],
});
