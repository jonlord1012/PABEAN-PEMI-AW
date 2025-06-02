var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.STOCK_OPNAME.sto_goods.FRMsto_goods", {
	extend: "Ext.window.Window",
	alias: "widget.FRMsto_goods",
	reference: "FRMsto_goods",
	title: "Detail STO GOODS",
	modal: true,
	closeAction: "destroy",
	controller: "Csto_goods",
	width: mainpanel.getWidth() * 0.5,
	height: mainpanel.getHeight() * 0.5,
	layout: { type: "vbox", pack: "start", align: "stretch" },

	items:[
		{
			xtype:"container", 
			flex: 1, 
			layout: { type: "vbox", pack: "start", align: "stretch" },
			items: [
				{
					xtype: "grid",
					pid: "FRMGRIDsto_goods",
					emptyText: "No Matching Records",
					plugins: ["filterfield"],
					flex: 1 , 
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
						remoteSort: true,
						remoteFilter: true,
						pageSize: 30, 
						proxy: {
							type: "ajax",
							disableCaching: false,
							noCache: false,
							headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
							actionMethods: { read: "POST" },
							url: vconfig.service_api + "sto_goods/sto_goodss",
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
									var GRID = Ext.ComponentQuery.query("GRIDsto_goods grid[pid=GRIDsto_goods]")[0];
									var vdt = GRID.getSelectionModel().getSelection()[0].data;
									//console.log(vdt);
									if (vdt) {
									operation.setParams({
										ARTICLE_CODE: vdt.ARTICLE_CODE,
										PART_NO: vdt.PART_NO,
									});
									}
									//console.log(GRID, vdt.ARTICLE_CODE, vdt.PART_NO);
								} catch (ex) {
									COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
								}
								},
						},
					},
					columns: [
						{ xtype: "rownumberer", width: 50 , summaryRenderer: function (value, summaryData, dataIndex) {
                        return '<span style="font-weight:bold;font-size:11px;">TOTAL</span>';
                      },},
						{ header: "ARTICLE CODE", dataIndex: "ARTICLE_CODE", sortable: true, filter: { xtype: "textfield" } },
						{ header: "LOT_NO", dataIndex: "LOT_NO", sortable: true,  filter: { xtype: "textfield" } },
						{ header: "RACK_NO", dataIndex: "RACK_NAME", sortable: true,  filter: { xtype: "textfield" } },
						{ header: "QTY", dataIndex: "STOCK_QTY", sortable: true, filter: { xtype: "textfield" } ,  summaryType: "sum",
						summaryRenderer: function (value, summaryData, dataIndex) {
						  return '<span style="font-weight:bold;font-size:11px;">' + value+ "</span>";
						},},
						],
					bbar: {
						xtype: "pagingtoolbar",
						displayInfo: true,
						displayMsg: "Displaying items {0} - {1} of {2}",
						emptyMsg: "No topics to display",
						},
			
				}
			],
		}
	],
});