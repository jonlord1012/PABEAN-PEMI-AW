var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.SYNCHRONIZE.sync_delivery_instruction.FRMsync_delivery_instruction_detail", {
   extend: "Ext.window.Window",
   alias: "widget.FRMsync_delivery_instruction_detail",
   reference: "FRMsync_delivery_instruction_detail",
   title: "Detail Packing List",
   modal: true,
   closeAction: "destroy",
   centered: true,
   //controller: "Csync_delivery_instruction",
   //y: -110,
   width: mainpanel.getWidth() * 0.95,
   height: mainpanel.getHeight() * 0.95,
   layout: { type: "vbox", pack: "start", align: "stretch" },
   bodyStyle: "background:#FFFFFF;background-color:#FFFFFF; margin:1px;",
   items: [
      {
         xtype: "grid",
         pid: "GRIDdelivery_instruction_pl",
         emptyText: "No Matching Records",
         flex: 1,
         autoScroll: true,
         height: mainpanel.getHeight() * 0.6,
         plugins: [
            "filterfield",
            {
               ptype: "cellediting",
            },
         ],
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
            remoteFilter: true,
            pageSize: 50,
            fields: [
               //
               { name: "QTY_RECEIVED", type: "float" },
               { name: "QTY", type: "int" },
            ],
            proxy: {
               type: "ajax",
               disableCaching: false,
               timeout: 0,
               noCache: false,
               headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
               actionMethods: { read: "POST" },
               url: vconfig.service_api + "sync_delivery_instruction/sync_delivery_instructions",
               extraParams: {
                  method: "read_packing_list",
                  module: 'load',
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
                     var VGRID = Ext.ComponentQuery.query("sync_delivery_instruction GRIDsync_delivery_instruction grid[pid=GRIDsync_delivery_instruction]")[0];
                     var datas = VGRID.getSelectionModel().getSelection()[0].data;
                     operation.setParams({
                        NO_BUKTI: datas.NO_BUKTI,
                        NO_DRAFT: datas.NO_DRAFT
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
            { sortable: true, width: 120, filter: { xtype: "textfield" }, header: "NO DRAFT", dataIndex: "NO_DRAFT" },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NO BUKTI", dataIndex: "NO_BUKTI" },
            { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "ARTICLE CODE", dataIndex: "ARTICLE_CODE" },
            { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "PART CODE", dataIndex: "PART_CODE" },
            { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "MPQ", dataIndex: "PART_MPQ" },
            {
               sortable: false, width: 50, filter: { xtype: "textfield" }, header: "QTY", dataIndex: "QTY", align: "right", filter: { xtype: "textfield" }, summaryType: "sum",
               summaryRenderer: function (value, summaryData, dataIndex) {
                  return '<span style="font-weight:bold;font-size:11px;">' + Ext.util.Format.number(value, "0,000.00/i") + "</span>";
               },
            },
            { sortable: true, width: 120, filter: { xtype: "textfield" }, header: "LOT NO", dataIndex: "DELIVERY_LOT_NO" },
            { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "ORDER QTY", dataIndex: "ORDER_QTY" },
            { sortable: true, width: 120, filter: { xtype: "textfield" }, header: "INVOICE KEDATANGAN", dataIndex: "IN_INVOICE_NO" },
            { sortable: true, width: 180, filter: { xtype: "textfield" }, header: "NOMORAJU ", dataIndex: "IN_NOMOR_AJU" },
            { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "TGL AJU", dataIndex: "IN_TANGGAL_AJU" },
            { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "NO DAFTAR", dataIndex: "IN_NOMOR_DAFTAR" },
            { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "TGL DAFTAR", dataIndex: "IN_TANGGAL_DAFTAR" },
         ],
         bbar: {
            xtype: "pagingtoolbar",
            displayInfo: true,
            displayMsg: "Displaying topics {0} - {1} of {2}",
            emptyMsg: "No topics to display",
         },
      },
   ],

});