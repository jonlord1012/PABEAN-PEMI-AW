Ext.define("NJC.INVENTORY_PLB.goods_in.GRIDPicking_list", {
   extend: "Ext.grid.Panel",
   xtype: "GRIDPicking_list",
   pid: "GRIDPicking_list",
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
      { header: "NO DRAFT", dataIndex: "NO_DRAFT", sortable: true, width: 150, filter: { xtype: "textfield" } },
      { header: "NO BUKTI", dataIndex: "NO_BUKTI", sortable: true, width: 100, filter: { xtype: "textfield" } },
      { header: "PICKING DATE", dataIndex: "TANGGAL", sortable: true, width: 150, filter: { xtype: "textfield", format: "Y-m-d" } },
      { header: "CUSTOMER", dataIndex: "CUSTOMER_INVOICE", sortable: true, width: 200, filter: { xtype: "textfield" } },
      { header: "QTY", dataIndex: "QTY_PICKING", sortable: true, width: 100, filter: { xtype: "textfield" } },
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