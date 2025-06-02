Ext.define('TDK.masters.master_negara.GRIDmaster_negara', {
    extend: 'Ext.form.Panel',
    alias: 'widget.GRIDmaster_negara',
    reference: 'GRIDmaster_negara',
    frame: false,
    border: false,
    layout: { type: 'vbox', pack: 'start', align: 'stretch' },
    requires: [

    ],
    items: [
        {
            xtype: 'grid',
            pid: 'GRIDsupplier',
            emptyText: 'No Matching Records',
            autoScroll: true,
            flex: 1,
            plugins: [
                'filterfield',
            ],
            store: {
                type: '', remoteSort: true, remoteFilter: true, pageSize: 0,
            },
            columns: [
                { xtype: 'rownumberer', width: 50 },
                {
                    xtype: 'actioncolumn', width: 35, align: 'center', menuDisabled: true, sortable: false,
                    items: [{
                        icon: vconfig.getstyle + 'icon/delete.ico',
                        handler: 'btdelete_rows_click',
                        tooltip: 'Delete Supplier'
                    }]
                },
                { header: "Kode", dataIndex: 'supplier_customer_code', sortable: true, width: 150, filter: { xtype: 'textfield' } },
                { header: "Kode 2", dataIndex: 'subcode_mesin', sortable: true, width: 100, filter: { xtype: 'textfield' } },
                { header: "Nama", dataIndex: 'subcode_lp', sortable: true, flex: 1, filter: { xtype: 'textfield' } }

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
        pid: 'tbar_master_negara',
        plugins: {
            boxreorderer: true
        },
        items: [
            { xtype: 'button', text: 'New Input', pid: 'btnew', icon: vconfig.getstyle + 'icon/add.png', tooltip: 'New Input' },
            { xtype: 'button', text: 'List Data', pid: 'btlist', icon: vconfig.getstyle + 'icon/grid.png', tooltip: 'List Data' },

        ]
    }
});