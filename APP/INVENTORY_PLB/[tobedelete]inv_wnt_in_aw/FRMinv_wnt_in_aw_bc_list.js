var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.INVENTORY_AW.inv_wnt_in_aw.FRMinv_wnt_in_aw_bc_list", {
    extend: "Ext.window.Window",
    alias: "widget.FRMinv_wnt_in_aw_bc_list",
    reference: "FRMinv_wnt_in_aw_bc_list",
    title: "BC List Search",
    modal: true,
    controller: "Cinv_wnt_in_aw",
    closeAction: "destroy",
    centered: true,
    autoScroll: true,
    width: mainpanel.getWidth() * 0.8,
    height: mainpanel.getHeight() * 0.8,
    layout: { type: "vbox", pack: "start", align: "stretch" },
    bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
    items: [
        {
            xtype: "grid",
            pid: "GRIDFRMinv_wnt_in_aw_bc_list",
            emptyText: "No Matching Records",
            plugins: ["filterfield", { ptype: "cellediting", clicksToEdit: 1 }],
            flex: 1,
            height: 200,
            columns: [
                { sortable: true, width: 50, filter: { xtype: "textfield" }, header: "ID", dataIndex: "ID_HEADER_ORI" },
                { sortable: true, width: 200, filter: { xtype: "textfield" }, header: "NOMOR_AJU", dataIndex: "NOMOR_AJU" },
                { sortable: true, width: 120, filter: { xtype: "textfield" }, header: "TANGGAL_AJU", dataIndex: "TANGGAL_AJU" },
                { sortable: true, width: 65, filter: { xtype: "textfield" }, header: "DOKUMEN", dataIndex: "URAIAN_DOKUMEN" },
                { sortable: true, width: 70, filter: { xtype: "textfield" }, header: "STATUS", dataIndex: "URAIAN_STATUS" },
                { sortable: true, width: 200, filter: { xtype: "textfield" }, header: "PEMASOK", dataIndex: "PEMASOK" },
                { sortable: true, width: 70, filter: { xtype: "textfield" }, header: "PART", dataIndex: "TOTAL_PART" },
                { sortable: true, width: 70, filter: { xtype: "textfield" }, align: "right", renderer: "formatqty", header: "QTY", dataIndex: "QTY_DOK" },
                { sortable: true, width: 70, filter: { xtype: "textfield" }, align: "right", renderer: "formatqty", header: "RECEIPT", dataIndex: "QTY_RECEIPT" }
            ],
            listeners: {
                itemdblclick: "GRIDFRMinv_wnt_in_aw_bc_list_dblclick",
                afterrender: "GRIDFRMinv_wnt_in_aw_bc_list_load",
            },
            bbar: {
                xtype: "pagingtoolbar",
                displayInfo: true,
                displayMsg: "Displaying BC {0} - {1} of {2}",
                emptyMsg: "No Document to display",
            },
        },
    ],
});