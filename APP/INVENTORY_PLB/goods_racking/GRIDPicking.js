Ext.define("NJC.INVENTORY_PLB.goods_racking.GRIDPicking", {
   extend: "Ext.grid.Panel",
   xtype: "GRIDPicking",
   pid: "GRIDPicking",
   emptyText: "No Matching Records",
   plugins: ["filterfield"],
   selType: "checkboxmodel",
   simpleSelect: true,
   flex: 1,


   viewConfig: {
      enableTextSelection: true,
   },
   columns: [
      { xtype: "rownumberer", width: 50 },
      { header: "LOT NO", dataIndex: "LOT_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
      { header: "CURRENT RACK", dataIndex: "CURRENT_RACK", sortable: true, width: 200, filter: { xtype: "textfield" } },
      { header: "INVOICE NO", dataIndex: "CUSTOMER_INVOICE", sortable: true, width: 150, filter: { xtype: "textfield", format: "Y-m-d" } },
      { header: "QTY", dataIndex: "QTY_PICKING", sortable: true, width: 100,  filter: { xtype: "textfield" } },
      /*
      { header: "KODE BARANG", dataIndex: "KODE_BARANG_INVOICE", sortable: true, width: 100, filter: { xtype: "textfield" } },
      { header: "LOT", dataIndex: "KODE_LOT", sortable: true, width: 100, filter: { xtype: "textfield" } }, */
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
}); 