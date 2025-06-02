Ext.define("NJC.INVENTORY_PLB.goods_in.GRIDLot_no", {
   extend: "Ext.grid.Panel",
   xtype: "GRIDLot_no",
   pid: "GRIDLot_no",
   emptyText: "No Matching Records",
   plugins: ["filterfield"],
   simpleSelect: true,
   flex: 1,
   viewConfig: {
      enableTextSelection: true,
      getRowClass: function (record) {
         //console.log(this.getRowClass.getValue());
         return record.get("NONFG") === "1" || record.get("NONFG") === "true" ? "gridrow-bold" : "";
      },
   },
   columns: [
      {
         xtype: "actioncolumn",
         width: 35,
         align: "center",
         menuDisabled: true,
         sortable: false,
         items: [
            {
               icon: vconfig.getstyle + "icon/delete.ico",
               tooltip: "Hapus Data",
               handler: function (xgrid, rowIndex, colIndex, e, a, rec) {
                  try {
                     console.log(rec);
                     Ext.MessageBox.confirm(
                        "Konfirmasi",
                        "Konfirmasi Hapus Lot No:" + rec.data.LOT_NO,
                        function (button) {
                           if (button === "yes") {
                              xgrid.getStore().removeAt(rowIndex);
                              xgrid.getStore().commitChanges();
                              //xgrid.getView().refresh();
                           }
                        },
                        this
                     );
                  } catch (ex) {
                     COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                  }
               },
            },
         ],
      },
      { xtype: "rownumberer", width: 50 },
      { header: "NOMORAJU", dataIndex: "NOMORAJU", sortable: true, width: 150, filter: { xtype: "textfield" } },
      { header: "SERIBARANG", dataIndex: "SERIBARANG", sortable: true, width: 100, filter: { xtype: "textfield" } },
      { header: "ARTICLE_CODE", dataIndex: "ARTICLE_CODE", sortable: true, width: 150, filter: { xtype: "textfield" } },
      { header: "PART_MPQ", dataIndex: "PART_MPQ", sortable: true, width: 200, filter: { xtype: "textfield" } },
      { header: "LOT_NO", dataIndex: "LOT_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
      { header: "NONFG", dataIndex: "NONFG", sortable: true, width: 50, filter: { xtype: "textfield" } },
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