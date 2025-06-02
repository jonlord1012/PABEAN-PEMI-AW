Ext.define("TDK.INVENTORY.inv_fg_in.GRIDinv_fg_in", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDinv_fg_in",
  reference: "GRIDinv_fg_in",
  frame: false,
  border: false,
  autoScroll: true,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
  // items: [
  //   {
  //     xtype: "grid",
  //     pid: "GRIDinv_fg_in",
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
  //         url: vconfig.service_api + "inv_fg_in/inv_fg_ins",
  //         extraParams: {
  //           method: "read_in_fg",
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
  //         width: 30,
  //         align: "center",
  //         menuDisabled: true,
  //         sortable: false,
  //         items: [
  //           {
  //             icon: vconfig.getstyle + "icon/grid.png",
  //             handler: "btdetail_poly_click",
  //             tooltip: "Detail FG poly Part",
  //           },
  //         ],
  //       },
  //       { header: "FG IN", dataIndex: "FGIN_DATE", sortable: true, width: 100, filter: { xtype: "textfield" } },
  //       { header: "ASSY NO", dataIndex: "ASSY_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
  //       { header: "ASSY CODE", dataIndex: "ASSY_CODE", sortable: true, width: 100, filter: { xtype: "textfield" } },
  //       { header: "CARLINE", dataIndex: "CARLINE", sortable: true, width: 200, filter: { xtype: "textfield" } },
  //       { header: "POLY NO", dataIndex: "POLY_NO", sortable: true, width: 120, filter: { xtype: "textfield" } },

  //       { header: "WIP CHECK", dataIndex: "POLY_STATUS", sortable: true, width: 80, filter: { xtype: "textfield" } },
  //       { header: "PALLET NO", dataIndex: "PALLET_NO", sortable: true, width: 200, filter: { xtype: "textfield" } },
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
