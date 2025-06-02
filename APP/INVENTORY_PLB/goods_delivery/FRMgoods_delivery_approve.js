var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.INVENTORY_PLB.goods_delivery.FRMgoods_delivery_approve", {
   extend: "Ext.window.Window",
   alias: "widget.FRMgoods_delivery_approve",
   reference: "FRMgoods_delivery_approve",
   title: "Approve Goods Out for Delivery",
   modal: true,
   closeAction: 'destroy',
   centered: true,
   controller: "Cgoods_delivery",
   //y: -110,
   bodyPadding: "5 5 5 5",
   width: mainpanel.getWidth() * 0.9,
   height: mainpanel.getHeight() * 0.9,
   flex: 1,
   layout: { type: "vbox", pack: "start", align: "stretch" },
   bodyStyle: "background:#FFFFFF;background-color:#FFFFFF;",
   items: [
      {
         xtype: "form",
         border: false,
         frame: false,
         autoScroll: true,
         layout: { type: "vbox", pack: "start", align: "stretch" },
         flex: 1,
         fieldDefaults: {
            labelAlign: "left",
            labelWidth: 85,
            margin: "5 10 0 0",
         },
         items: [
            {
               xtype: "panel",
               layout: { type: "hbox", pack: "start", align: "stretch" },
               border: false,
               frame: true,
               padding: "0 10 5 10",
               items: [
                  {
                     xtype: "fieldset",
                     title: "<b>Portal Info</b>",
                     layout: { type: "vbox", pack: "start", align: "stretch" },
                     //flex: 1,
                     padding: "5 10 5 5",
                     width: 600,
                     items: [
                        {
                           xtype: "container",
                           layout: "hbox",
                           items: [
                              { xtype: "textfield", width: 190, labelWidth: 90, fieldLabel: "BC INFO", name: "OUT_BC_TYPE", fieldCls: "fieldinput", readOnly: true },
                              {
                                 xtype: "button",
                                 pid: "btsearch",
                                 vdata: {
                                    modulename: "invoice",
                                    title: "Pilih Invoice",
                                    popupwidth: 0.8,
                                    popupheight: 0.7,
                                 },
                                 margin: "5 0 0 0",
                                 icon: vconfig.getstyle + "icon/search.ico",
                                 tooltip: "search",
                              },
                              {
                                 xtype: "tbspacer",
                                 width: 15,
                              },
                              { xtype: "textfield", width: 190, labelWidth: 90, name: "NOMORDOKUMEN", fieldCls: "fieldinput", readOnly: true },
                              { xtype: "textfield", width: 190, labelWidth: 90, name: "INVOICENO", fieldCls: "fieldinput", readOnly: true, value: "", hidden: true },
                              { xtype: "textfield", width: 190, labelWidth: 90, name: "TENANT_INVOICENO", fieldCls: "fieldinput", readOnly: true, value: "", hidden: true },
                           ]
                        },
                        {
                           xtype: "container",
                           layout: "hbox",
                           items: [
                              { xtype: "textfield", labelWidth: 90, width: 190, fieldLabel: "NOMOR AJU", name: "OUT_TANGGAL_AJU", fieldCls: "fieldinput", readOnly: true, },
                              { xtype: "textfield", width: 280, name: "OUT_NOMOR_AJU", fieldCls: "fieldinput", readOnly: true },
                           ]
                        },
                        {
                           xtype: "container",
                           layout: "hbox",
                           items: [
                              { xtype: "textfield", width: 190, labelWidth: 90, fieldLabel: "NOMOR DAFTAR", name: "OUT_TANGGAL_DAFTAR", fieldCls: "fieldinput", readOnly: true, },
                              { xtype: "textfield", width: 280, name: "OUT_NOMOR_DAFTAR", fieldCls: "fieldinput", readOnly: true },

                           ]
                        },
                     ],
                  },

                  {
                     xtype: "tbspacer",
                     width: 15,
                  },
                  {
                     xtype: "fieldset",
                     title: "Document Info",
                     layout: "vbox",
                     //flex: 1,
                     width: 600,
                     padding: "5 10 5 5",
                     items: [
                        {
                           xtype: "container",
                           layout: "hbox",
                           items: [
                              { xtype: "textfield", labelWidth: 90, width: 180, fieldLabel: "TENANT", name: "TENANT", fieldCls: "fieldinput", readOnly: true },
                              { xtype: "textfield", width: 280, name: "TENANT_NAME", fieldCls: "fieldinput", readOnly: true },
                           ]
                        },
                        {
                           xtype: "container",
                           layout: "hbox",
                           items: [
                              { xtype: "textfield", labelWidth: 90, width: 180, fieldLabel: "CLIENT", name: "CLIENT", fieldCls: "fieldinput", readOnly: true },
                              { xtype: "textfield", width: 280, name: "CLIENT_NAME", fieldCls: "fieldinput", readOnly: true },
                           ]
                        },
                        {
                           xtype: "container",
                           layout: "hbox",
                           items: [
                              { xtype: "datefield", labelWidth: 90, width: 180, fieldLabel: "SURAT JALAN", name: "TANGGAL_SURAT_JALAN", fieldCls: "fieldinput", readOnly: false, format: "Y-m-d", },
                              { xtype: "textfield", width: 280, name: "SURAT_JALAN", fieldCls: "fieldinput", readOnly: false },
                           ]
                        },
                     ],
                  },
               ],
            },
            {
               xtype: "tbspacer",
               height: 10,
            },
            {
               xtype: "container",
               layout: { type: "hbox", pack: "start", align: "stretch" },
               flex: 1,
               items: [
                  {
                     xtype: "grid",
                     pid: "GRIDdelivery_instruction_invoice",
                     emptyText: "No Matching Records",
                     plugins: ["filterfield"],
                     flex: 1,
                     autoScroll: true,
                     viewConfig: {
                        enableTextSelection: true,
                     },
                     features: [
                        {
                           ftype: "summary",
                           dock: "bottom",
                        },
                     ],
                     store: {
                        autoLoad: true,
                        remoteSort: false,
                        remoteFilter: false,
                        fields: [
                           { name: "ORDER_QTY", type: "int" },
                           { name: "BC_QTY", type: "float" },
                        ],
                        pageSize: 0,
                        proxy: {
                           type: "ajax",
                           disableCaching: false,
                           noCache: false,
                           headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
                           actionMethods: { read: "POST" },
                           url: vconfig.service_api + "goods_delivery/goods_deliverys",
                           extraParams: {
                              method: "read_detail",
                              module: "aw",
                           },
                           reader: {
                              type: "json",
                              rootProperty: "Rows",
                              totalProperty: "TotalRows",
                              successProperty: "success",
                           },
                        },
                        listeners: {
                           beforeload: function (store, operation, eOpts) {
                              try {
                                 var GRID = Ext.ComponentQuery.query("goods_delivery GRIDgoods_delivery grid[pid=GRIDgoods_delivery]")[0];
                                 var datas = GRID.getSelectionModel().getSelection()[0].data;
                                 //console.log(datas);
                                 operation.setParams({
                                    INVOICENO: datas.INVOICE_NO,
                                    TENANT_INVOICENO: datas.TENANT_INVOICE_NO,
                                 });
                                 var FRM = Ext.ComponentQuery.query("FRMgoods_delivery_approve form")[0];
                                 FRM.getForm().setValues({
                                    INVOICENO: datas.INVOICE_NO,
                                    TENANT_INVOICENO: datas.TENANT_INVOICE_NO,
                                    INVOICE_NO: datas.INVOICE_NO,
                                 });

                              } catch (ex) {
                                 COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                              }
                           },
                        },
                     },
                     columns: [
                        {
                           xtype: "rownumberer", width: 50, summaryRenderer: function (value, summaryData, dataIndex) {
                              return '<span style="font-weight:bold;font-size:11px;">TOTAL</span>';
                           },
                        },
                        { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "CLIENT", dataIndex: "CLIENT" },
                        { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "INVOICE NO", dataIndex: "INVOICE_NO" },
                        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "INVOICE DATE", dataIndex: "INVOICE_DATE" },
                        { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "TENANT INVOICE NO", dataIndex: "TENANT_INVOICE_NO" },
                        { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "ARTICLE CODE", dataIndex: "ARTICLE_CODE" },
                        { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "PART CODE", dataIndex: "PART_CODE" },
                        { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "MPQ", dataIndex: "PART_MPQ", align: "right", },
                        {
                           sortable: true, width: 80, filter: { xtype: "textfield" }, header: "QTY", align: "right", dataIndex: "ORDER_QTY", summaryType: "sum",
                           summaryRenderer: function (value, summaryData, dataIndex) {
                              return '<span style="font-weight:bold;font-size:11px;">' + Ext.util.Format.number(value, "0,000.00/i") + "</span>";
                           },
                        },
                        {
                           sortable: true, width: 80, filter: { xtype: "textfield" }, header: "BC_QTY", dataIndex: "BC_QTY", align: "right", summaryType: "sum",
                           summaryRenderer: function (value, summaryData, dataIndex) {
                              return '<span style="font-weight:bold;font-size:11px;">' + Ext.util.Format.number(value, "0,000.00/i") + "</span>";
                           },
                        },
                     ],
                     bbar: {
                        xtype: "pagingtoolbar",
                        displayInfo: true,
                        displayMsg: "Displaying topics {0} - {1} of {2}",
                        emptyMsg: "No topics to display",
                     },
                  },
               ]
            },
         ]
      },
   ],
   dockedItems: [
      {
         xtype: "toolbar",
         height: 30,
         dock: "top",
         items: [
            {
               xtype: "container",
               layout: "hbox",
               items: [
                  { xtype: "tbspacer", text: "|" },
                  {
                     xtype: "button",
                     text: "Save",
                     pid: "FRMgoods_delivery_approve_btn",
                     icon: vconfig.getstyle + "icon/save.gif",
                     tooltip: "Save Data",
                     handler: "save_delivery"
                  },

                  { xtype: "tbspacer", text: "|" },
               ]
            }

         ],
      },
   ],
   listeners: {
      show: "FRMgoods_delivery_approve_load",
   },
});