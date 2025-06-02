var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.STOCK_OPNAME.sto_scrap.FRMsto_scrap_input", {
	extend: "Ext.window.Window",
	alias: "widget.FRMsto_scrap_input",
	reference: "FRMsto_scrap_input",
	title: "Input STO Scrap",
	modal: true,
	closeAction: "hide",
	controller: "Csto_scrap",
	width: mainpanel.getWidth() * 0.5,
	height: mainpanel.getHeight() * 0.5,
	items:[
	{
		xtype: "grid",
		pid: "FRMGRIDsto_scrap",
		emptyText: "No Matching Records",
		autoScroll: true,
		flex: 1,
		plugins: ["filterfield"],
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
				url: vconfig.service_api + "sto_scrap/sto_scraps",
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
						var vdate = Ext.ComponentQuery.query("FRMsto_scrap_input datefield[name=TANGGAL_RCV_STO_SCRAP]")[0];
						operation.setParams({
							vdate: moment(vdate.getValue()).format("YYYY-MM-DD"),
						});
					} catch (ex) {
						COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
					}
				},
			},
		},
		columns: [
			{ xtype: "rownumberer", width: 50 },
			{ header: "PART_NO2", dataIndex: "PART_NO2", sortable: true, flex: 1, filter: { xtype: "textfield" } },
			{ header: "LOT_NO", dataIndex: "LOT_NO", sortable: true, flex: 1, filter: { xtype: "textfield" } },
			{ header: "RACK_NO", dataIndex: "RACK_NO", sortable: true, flex: 1, filter: { xtype: "textfield" } },
			{ header: "QTY", dataIndex: "QTY", sortable: true, flex: 1, filter: { xtype: "textfield" } },
			],
		bbar: {
			xtype: "pagingtoolbar",
			displayInfo: true,
			displayMsg: "Displaying topics {0} - {1} of {2}",
			emptyMsg: "No topics to display",
		},
	},
	],
	dockedItems: [
	{
		xtype: "toolbar",
		height: 30,
		dock: "top",
		items: [
        //
			{ xtype: "tbspacer", width: 10 },
			"-",
			{ xtype: "datefield", labelWidth: 100, width: 220, fieldLabel: "Tanggal Receiving", name: "TANGGAL_RCV_STO_SCRAP", fieldCls: "fieldinput", readOnly: false, format: "Y-m-d", value: new Date() },
			"-",
			{ xtype: "tbspacer", width: 10, text: "-" },
			{ xtype: "button", text: "Process Synchronize", pid: "sto_scrap_synchronize", icon: vconfig.getstyle + "icon/update.ico", tooltip: "Process Synchronize" },
			],
	},
	],
});