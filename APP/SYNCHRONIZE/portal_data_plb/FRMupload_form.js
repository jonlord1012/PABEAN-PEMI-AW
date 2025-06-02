var mainpage = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.SYNCHRONIZE.portal_data_plb.FRMupload_form", {
	extend: "Ext.window.Window",
	alias: "widget.FRMupload_form",
	pid: "FRMupload_form",
	controller: "Cportal_data_plb",
	title: "Upload Form",
	bodyPadding: 10,
	modal: true,
	width: mainpage.getWidth() * 0.75,
	height: mainpage.getHeight() * 0.8,
	autoScroll: false,
	items:[
	{
		// border : false,
		// xtype:'form',
		// reference: "upload_form",
		// items: [
		// {
		// 	xtype: 'filefield',
		// 	name: 'file_excel',
		// 	fieldLabel: 'Pilih File',
		// 	labelWidth: 80,
		// 	msgTarget: 'side',
		// 	allowBlank: false,
		// 	anchor: '100%',
		// 	buttonText: 'Pilih Berkas...'
		// },
		// buttons:[
		// 	{
		// 		text:'submit',
		// 		pid:'btsubmit_upload'
		// 	}
		// ]
		border:false,
		xtype:'grid',
		pid:"GRIDform_portal",
		reference:'GRIDform_portal',
		plugins: ["filterfield"],
		autoScroll: true,
		viewConfig: {
			enableTextSelection: true,
		},
		store:{
			autoLoad: true,
			remoteSort: false,
			remoteFilter: false,
			proxy: {
				type: "ajax",
				disableCaching: false,
				noCache: false,
				headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
				actionMethods: { read: "POST" },
				url: vconfig.service_api + "portal_data/portal_datas",
				extraParams: {
					method: "read_upload_form_plb",
            		// module: "coo",
				},
				reader: {
					type: "json",
					rootProperty: "Rows",
					totalProperty: "TotalRows",
					successProperty: "success",
				},
			},
			listeners: {
				itemdblclick: "process_upload_form",
			},
		},
		columns:[
			// { sortable: true, flex: 1, width: 200, filter: { xtype: "textfield" }, header: "Filename", dataIndex: "Filename" },
			// { sortable: true, flex: 1, width: 200, filter: { xtype: "textfield" }, header: "NOMOR AJU", dataIndex: "NOMOR_AJU" },
			{ sortable: true, flex: 1, width: 200, filter: { xtype: "textfield" }, header: "NOMOR AJU", dataIndex: "NOMORAJU", name:'NOMORAJU'},
			{ sortable: true, flex: 1, width: 200, filter: { xtype: "textfield" }, header: "Filename", dataIndex: "FileName", name:'FILENAME' },
		],
		// bbar: {
		// 	xtype: "pagingtoolbar",
		// 	displayInfo: true,
		// 	displayMsg: "Displaying topics {0} - {1} of {2}",
		// 	emptyMsg: "No topics to display",
		// },
	}]
})