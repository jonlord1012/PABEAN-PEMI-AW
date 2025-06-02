var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.STOCK_OPNAME.sto_scrap.FRMsto_scrap", {
	extend: "Ext.window.Window",
  	alias: "widget.FRMsto_scrap",
  	reference: "FRMsto_scrap",
  	title: "Detail STO Scrap",
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
	            method: "read_data",
	          },
	          reader: {
	            type: "json",
	            rootProperty: "Rows",
	            totalProperty: "TotalRows",
	            successProperty: "success",
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
  	]
});