Ext.define('TDK.masters.tarif.GRIDtarif', {
    extend: 'Ext.form.Panel',
    alias: 'widget.GRIDtarif',
    reference: 'GRIDtarif',
    frame: false,
    border: false,
    layout: { type: 'vbox', pack: 'start', align: 'stretch' },
    requires: [

    ],
    items: [
        {
            xtype: 'grid',
            pid: 'GRIDtarif',
            emptyText: 'No Matching Records',
            autoScroll: true,
            flex: 1,
            plugins: [
                'filterfield',
            ],
            store: {
                type: 'STGRIDtarif', remoteSort: true, remoteFilter: true, pageSize: 18,
            },
            columns: [
                { xtype: 'rownumberer', width: 50 },
                {
                    xtype: 'actioncolumn', width: 35, align: 'center', menuDisabled: true, sortable: false,
                    items: [{
                        icon: vconfig.getstyle + 'icon/delete.ico',
                        handler: 'btdelete_rows_click',
                        tooltip: 'Delete tarif'
                    }]
                },
                { header: "JENIS TARIF BM", dataIndex: 'JENIS_TARIF_BM', sortable: true, flex: 1, filter: { xtype: 'textfield' } },
                { header: "JENIS TARIF CUKAI", dataIndex: 'JENIS_TARIF_CUKAI', sortable: true, flex: 1, filter: { xtype: 'textfield' } },
                { header: "KODE SATUAN BM", dataIndex: 'KODE_SATUAN_BM', sortable: true, flex: 1, filter: { xtype: 'textfield' } },
                { header: "KODE SATUAN CUKAI", dataIndex: 'KODE_SATUAN_CUKAI', sortable: true, flex: 1, filter: { xtype: 'textfield' } },
                { header: "NOMOR HS", dataIndex: 'NOMOR_HS', sortable: true, flex: 1, filter: { xtype: 'textfield' } },
                { header: "SERI HS", dataIndex: 'SERI_HS', sortable: true, flex: 1, filter: { xtype: 'textfield' } },
                { header: "TARIF BM", dataIndex: 'TARIF_BM', sortable: true, flex: 1, filter: { xtype: 'textfield' } },
                { header: "TARIF CUKAI", dataIndex: 'TARIF_CUKAI', sortable: true, flex: 1, filter: { xtype: 'textfield' } },
                { header: "TARIF PPH", dataIndex: 'TARIF_PPH', sortable: true, flex: 1, filter: { xtype: 'textfield' } },
                { header: "TARIF PPN", dataIndex: 'TARIF_PPN', sortable: true, flex: 1, filter: { xtype: 'textfield' } },
                { header: "TARIF PPNBM", dataIndex: 'TARIF_PPNBM', sortable: true, flex: 1, filter: { xtype: 'textfield' } },




            ],
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                displayMsg: 'Displaying topics {0} - {1} of {2}',
                emptyMsg: 'No topics to display'
            },

        }
    ],
    tbar: {
        pid: 'tbar_tarif',
        plugins: {
            boxreorderer: true
        },
        items: [
            { xtype: 'button', text: 'New Input', pid: 'btnew', icon: vconfig.getstyle + 'icon/add.png', tooltip: 'New Input' },
            { xtype: 'button', text: 'List Data', pid: 'btlist', icon: vconfig.getstyle + 'icon/grid.png', tooltip: 'List Data' },

        ]
    }
});