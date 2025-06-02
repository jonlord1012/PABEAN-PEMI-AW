Ext.define("TDK.INVENTORY.inv_fg_out.GRIDinv_fg_out", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDinv_fg_out",
  reference: "GRIDinv_fg_out",
  frame: false,
  border: false,
  autoScroll: true,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
  // items: [
  //   {
  //     xtype: "grid",
  //     pid: "GRIDinv_fg_out",
  //     emptyText: "No Matching Records",
  //     autoScroll: true,
  //     flex: 1,
  //     plugins: ["filterfield"],
  //     viewConfig: {
  //       enableTextSelection: true,
  //     },
  //     store: {
  //       fields: [
  //         { name: "ASSYNO", type: "string" },
  //         { name: "ASSYCODE", type: "string" },
  //         { name: "CARLINE", type: "string" },
  //         { name: "QTY", type: "float" },
  //       ],
  //       autoLoad: true,
  //       remoteSort: true,
  //       remoteFilter: true,
  //       pageSize: 17,
  //       proxy: {
  //         type: "ajax",
  //         disableCaching: false,
  //         noCache: false,
  //         headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
  //         actionMethods: { read: "POST" },
  //         url: vconfig.service_api + "inv_fg_out/inv_fg_outs",
  //         extraParams: {
  //           method: "read_out_fg",
  //         },
  //         reader: {
  //           type: "json",
  //           rootProperty: "Rows",
  //           totalProperty: "TotalRows",
  //           successProperty: "success",
  //         },
  //       },
  //       listeners: {
  //         beforeload: function (store, operation, eOpts) {
  //           //
  //         },
  //       },
  //     },
  //     columns: [
  //       { xtype: "rownumberer", width: 50 },
  //       {
  //         xtype: "actioncolumn",
  //         width: 35,
  //         align: "center",
  //         menuDisabled: true,
  //         sortable: false,
  //         items: [
  //           {
  //             icon: vconfig.getstyle + "icon/grid.png",
  //             handler: "btdetail_poly_click",
  //             tooltip: "Detail Dokumen",
  //           },
  //         ],
  //       },
  //       { header: "OUT DATE", dataIndex: "OUT_DATE", sortable: true, width: 80, filter: { xtype: "textfield" } },
  //       { header: "SA NO", dataIndex: "SA_NO", sortable: true, width: 170, filter: { xtype: "textfield" } },
  //       { header: "SA DATE", dataIndex: "SA_DATE", sortable: true, width: 100, filter: { xtype: "textfield" } },
  //       { header: "CONTAINER", dataIndex: "CONTAINER_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
  //       { header: "INVOICE NO", dataIndex: "INVOICE_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
  //       { header: "CUSTOMER", dataIndex: "CUST_CODE", sortable: true, width: 80, filter: { xtype: "textfield" } },
  //       { header: "ASSY NO", dataIndex: "ASSY_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
  //       { header: "ASSY CODE", dataIndex: "ASSY_CODE", sortable: true, width: 80, filter: { xtype: "textfield" } },
  //       { header: "CARLINE", dataIndex: "CARLINE", sortable: true, width: 70, filter: { xtype: "textfield" } },
  //       { header: "POLY NO", dataIndex: "POLY_NO", sortable: true, width: 120, filter: { xtype: "textfield" } },
  //       { header: "WIP CHECK", dataIndex: "POLY_STATUS", sortable: true, width: 80, filter: { xtype: "textfield" } },
  //       { header: "PALLET NO", dataIndex: "PALLET_NO", sortable: true, width: 80, filter: { xtype: "textfield" } },
  //       { header: "QTY", dataIndex: "QTY", renderer: "formatAmount", align: "right", sortable: true, width: 80, filter: { xtype: "textfield" } },
  //     ],
  //     bbar: {
  //       xtype: "pagingtoolbar",
  //       displayInfo: true,
  //       displayMsg: "Displaying topics {0} - {1} of {2}",
  //       emptyMsg: "No topics to display",
  //     },
  //   },
  // ],
});
