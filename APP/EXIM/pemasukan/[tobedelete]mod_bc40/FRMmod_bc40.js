Ext.define('TDK.exim.pemasukan.mod_bc40.FRMmod_bc40', {
    extend: 'Ext.form.Panel',
    alias:'widget.FRMmod_bc40',
    reference:'FRMmod_bc40',
    frame: false,
    border:false,
    autoScroll:true,
    layout: { type: 'vbox', pack: 'start', align: 'stretch' },
    requires: [
        'Ext.ux.BoxReorderer'
    ],
    items: [
        {
            xtype:'grid',
            pid:'GRIDqcd_fa_item',
            emptyText: 'No Matching Records',
            autoScroll:true,
            flex:1,
            plugins:[
                'filterfield',
            ],
            store: {
                type: ''
            },
            columns: [
                    {xtype:'rownumberer', width: 30},
                    {header: "NO BL",dataIndex: 'CV',sortable: true,width: 45,filter:{xtype: 'textfield'}},
                    {header: "TGL BL",dataIndex: 'CARLINE',sortable: true,width: 85,filter:{xtype: 'textfield'}},
                    {header: "CAR",dataIndex: 'FAMILY',sortable: true,width: 85,filter:{xtype: 'textfield'}},
                    {header: "NO DAF",dataIndex: 'ASSYNO',sortable: true,width: 85,filter:{xtype: 'textfield'}},
                    {header: "TG DAF",dataIndex: 'ASSYCODE',sortable: true,width: 85,filter:{xtype: 'textfield'}},
                    {header: "KdPKBC",dataIndex: 'TOTAL_QTY',sortable: true,width: 85,filter:{xtype: 'textfield'}},
                    {header: "Pasok",dataIndex: 'TOTAL_QTY',sortable: true,width: 85,filter:{xtype: 'textfield'}},
                    {header: "NO INV",dataIndex: 'TOTAL_QTY',sortable: true,width: 85,filter:{xtype: 'textfield'}},
                    {header: "TGL INV",dataIndex: 'TOTAL_QTY',sortable: true,width: 85,filter:{xtype: 'textfield'}},
                    {header: "JML BRG",dataIndex: 'TOTAL_QTY',sortable: true,width: 85,filter:{xtype: 'textfield'}},
                
            ],
            tbar: {
                plugins: {
                    boxreorderer: true
                },
                frame:false,
                items: [{
                    xtype:'splitbutton',
                    text:'Pilih Data Source',
                    menu:[
                        {text:'Material'},
                        {text:'bahan Penolong'},
                        {text:'Wear & Tear'},
                        {text:'Manual'},
                        {text:'ceisa'},
                        {text:'Semua Data'}
                    ]
                }]
            }
                
        }
    ],
    tbar:[
        
    ]
});