Ext.define("TDK.INVENTORY.inv_wnt_in.GRIDinv_wnt_in", {
    extend: "Ext.form.Panel",
    alias: "widget.GRIDinv_wnt_in",
    reference: "GRIDinv_wnt_in",
    frame: false,
    border: false,
    autoScroll: true,
    layout: { type: "vbox", pack: "start", align: "stretch" },
    requires: [],
    items: [
        {
            xtype: "grid",
            pid: "GRIDinv_wnt_in",
            emptyText: "No Matching Records",
            autoScroll: true,
            flex: 1,
            plugins: ["filterfield"],
            store: "",
            columns: [
                { xtype: "rownumberer", width: 50 },
                { header: "KODE", sortable: true, width: 120, filter: { xtype: "textfield" }, dataIndex: "TIPE" },
                { header: "KODE BARANG", sortable: true, width: 100, filter: { xtype: "textfield" }, dataIndex: "KODE_BARANG" },
                { header: "PART NAME", sortable: true, width: 300, filter: { xtype: "textfield" }, dataIndex: "URAIAN" },
                { header: "RECEIPT", sortable: true, width: 120, filter: { xtype: "textfield" }, align: "right", renderer: "formatqty", dataIndex: "QTY_STOCK" },
                {
                    xtype: "actioncolumn",
                    header: "Dokumen",
                    width: 65,
                    align: "center",
                    menuDisabled: true,
                    sortable: false,
                    items: [
                        {
                            icon: vconfig.getstyle + "icon/grid.png",
                            handler: "btdetail_rows_click",
                            tooltip: "Detail Dokumen",
                        },
                    ],
                },
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
            items: [{ xtype: "button", text: "New Input", pid: "btnew", icon: vconfig.getstyle + "icon/add.png", tooltip: "New" }],
            // other options....
        },
    ],
    listeners: {
        afterrender: "GRIDinv_wnt_in_load",
    },
});
