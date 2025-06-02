Ext.define('TDK.masters.supplier.GRIDsupplier', {
    extend: 'Ext.form.Panel',
    alias: 'widget.GRIDsupplier',
    reference: 'GRIDsupplier',
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
                type: 'STGRIDsupplier', autoLoad: true, remoteSort: true, remoteFilter: true, pageSize: 10,
            },
            columns: [
                { header: "Kode", dataIndex: 'supplier_customer_code', sortable: true, width: 150, filter: { xtype: 'textfield' } }

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
        pid: 'tbar_supplier',
        plugins: {
            boxreorderer: true
        },
        items: [
            { xtype: 'button', text: 'New Input', pid: 'btnew', icon: vconfig.getstyle + 'icon/add.png', tooltip: 'New Input' },
            { xtype: 'button', text: 'List Data', pid: 'btlist', icon: vconfig.getstyle + 'icon/grid.png', tooltip: 'List Data' },

        ]
    }
});