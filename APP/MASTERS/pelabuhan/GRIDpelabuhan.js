Ext.define('TDK.masters.pelabuhan.GRIDpelabuhan', {
    extend: 'Ext.form.Panel',
    alias: 'widget.GRIDpelabuhan',
    reference: 'GRIDpelabuhan',
    frame: false,
    border: false,
    layout: { type: 'vbox', pack: 'start', align: 'stretch' },
    requires: [

    ],
    items: [
        {
            xtype: 'grid',
            pid: 'GRIDpelabuhan',
            emptyText: 'No Matching Records',
            autoScroll: true,
            flex: 1,
            plugins: [
                'filterfield',
            ],
            store: {
                type: 'STGRIDpelabuhan', remoteSort: true, remoteFilter: true, pageSize: 18,
            },
            columns: [
                { xtype: 'rownumberer', width: 50 },
                {
                    xtype: 'actioncolumn', width: 35, align: 'center', menuDisabled: true, sortable: false,
                    items: [{
                        icon: vconfig.getstyle + 'icon/delete.ico',
                        handler: 'btdelete_rows_click',
                        tooltip: 'Delete pelabuhan'
                    }]
                },
                { header: "Keterangan", dataIndex: 'KETERANGAN', sortable: true, width: 150, filter: { xtype: 'textfield' } },
                { header: "Kode Kantor", dataIndex: 'KODE_KANTOR', sortable: true, width: 100, filter: { xtype: 'textfield' } },
                { header: "Kode Pelabuhan", dataIndex: 'KODE_PELABUHAN', sortable: true, width: 100, filter: { xtype: 'textfield' } },
                { header: "Uraian", dataIndex: 'URAIAN_PELABUHAN', sortable: true, width: 100, filter: { xtype: 'textfield' } },
                {
                    text: 'LOG',
                    columns: [
                        { header: "create", dataIndex: 'create_date', sortable: true, width: 100 },
                        { header: "by", dataIndex: 'create_by', sortable: true, width: 100 },
                        { header: "update", dataIndex: 'modify_date', sortable: true, width: 100 },
                        { header: "by", dataIndex: 'modify_by', sortable: true, width: 100 },
                    ]
                }

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
        pid: 'tbar_pelabuhan',
        plugins: {
            boxreorderer: true
        },
        items: [
            { xtype: 'button', text: 'New Input', pid: 'btnew', icon: vconfig.getstyle + 'icon/add.png', tooltip: 'New Input' },
            { xtype: 'button', text: 'List Data', pid: 'btlist', icon: vconfig.getstyle + 'icon/grid.png', tooltip: 'List Data' },

        ]
    }
});