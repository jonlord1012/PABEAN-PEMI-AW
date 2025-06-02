var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.REPORTS_PLB.ext_rpt_stock_card.FRMext_rpt_stock_card_details", {
   extend: "Ext.window.Window",
   alias: "widget.FRMext_rpt_stock_card_details",
   reference: "FRMext_rpt_stock_card_details",
   title: "Detail Dokumen ",
   modal: true,
   closeAction: "destroy",
   centered: true,
   width: mainpanel.getWidth() * 0.95,
   height: mainpanel.getHeight() * 0.95,
   layout: { type: "vbox", pack: "start", align: "stretch" },
   controller: "Cext_rpt_stock_card",

   items: [
      {
         xtype: "grid",
         pid: "GRIDext_rpt_stock_card_details",
         emptyText: "No Matching Records",
         autoScroll: true,
         title: "",
         flex: 1,
         plugins: ["filterfield", "gridexporter"],
         store: {
            autoLoad: true,
            remoteSort: false,
            remoteFilter: false,
            pageSize: 0,
            proxy: {
               type: "ajax",
               disableCaching: false,
               noCache: false,
               headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
               actionMethods: { read: "POST" },
               url: vconfig.service_api + "ext_rpt_stock_card/ext_rpt_stock_cards",
               extraParams: {
                  method: "read_detail",
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
                     var GRID = Ext.ComponentQuery.query("ext_rpt_stock_card grid[pid=GRIDext_rpt_stock_card]")[0];
                     var vdt = GRID.getSelectionModel().getSelection()[0].data;
                     var VFROMDATE = Ext.ComponentQuery.query("ext_rpt_stock_card datefield[name=tfromdate]")[0];
                     var VTODATE = Ext.ComponentQuery.query("ext_rpt_stock_card datefield[name=ttodate]")[0];
                     operation.setParams({
                        ARTICLE_CODE: vdt.ARTICLE_CODE,
                        VFROMDATE: moment(VFROMDATE.getValue()).format("YYYY-MM-DD"),
                        VTODATE: moment(VTODATE.getValue()).format("YYYY-MM-DD"),
                     });
                  } catch (ex) {
                     COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                  }
               },
            },
         },
         viewConfig: {
            enableTextSelection: true,
            getRowClass: function (record) {
               //console.log(this.getRowClass.getValue());
               return record.get("STOCK_QTY") < 0 ? "gridrow-bold" : "";
            },
         },
         columns: [

            { xtype: "rownumberer", width: 50 },
            { header: "TRANS DATE", dataIndex: "LAST_TRANS_DATE", sortable: true, width: 150, filter: { xtype: "textfield" }, renderer: "formatDate" },
            { header: "ARTICLE CODE", dataIndex: "ARTICLE_CODE", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "PART CODE", dataIndex: "PART_CODE", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "MPQ", dataIndex: "MPQ", sortable: true, width: 80, filter: { xtype: "textfield" } },
            { header: "UOM MPQ", dataIndex: "UOM_MPQ", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "LOT NO", dataIndex: "LOT_NO", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "FLAG", dataIndex: "FLAG", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "QTY", dataIndex: "QTY", sortable: true, width: 100, filter: { xtype: "textfield" }, sortType: 'asFloat', },
            { header: "STOCK BALANCE", dataIndex: "CURRENT_BALANCE", sortable: true, width: 100, filter: { xtype: "textfield" }, sortType: 'asFloat', },
         ],
         /*
         listeners: {
             itemdblclick: "GRIDpopup_list_source_itemdblclick",
         },*/
         bbar: {
            xtype: "pagingtoolbar",
            displayInfo: true,
            displayMsg: "Total Data {2}",
            emptyMsg: "No topics to display",
         },
      },
   ],
});
