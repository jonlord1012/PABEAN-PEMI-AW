Ext.define('TDK.masters.hs.FRMhs', {
    extend: 'Ext.form.Panel',
    alias: 'widget.FRMhs',
    reference: 'FRMhs',
    frame: false,
    border: false,
    autoScroll: true,
    layout: { type: 'hbox', pack: 'start', align: 'stretch' },
    bodyPadding: '5 5 5 5',
    requires: [

    ],
    fieldDefaults: {
        labelWidth: 80,
        width: 200,
        fieldCls: 'fieldinput', value: '',
        readOnly: false,
        labelAlign: 'right',
    },
    items: [
        {
            xtype: 'container',
            layout: 'vbox',
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        { xtype: 'textfield', fieldLabel: 'hsid', name: 'hsid', emptyText: 'hsid', enforceMaxLength: true, maxLength: 50, hidden: true }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        {
                            xtype: 'textfield', fieldLabel: 'Part No1', name: 'partno', emptyText: 'partno', enforceMaxLength: true, maxLength: 50,
                            width: 250
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield', fieldLabel: 'Part No2', name: 'partno2', emptyText: 'partno2', enforceMaxLength: true, maxLength: 50,
                            width: 250
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        {
                            xtype: 'textfield', fieldLabel: 'Kode Barang', name: 'kodebarang', emptyText: 'kodebarang', enforceMaxLength: true, maxLength: 50,
                            width: 250
                        },
                        { xtype: 'tbspacer', width: 10 },
                        { xtype: 'textfield', fieldLabel: 'SAP No', name: 'nosap', emptyText: 'nosap', enforceMaxLength: true, maxLength: 50 }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        {
                            xtype: 'textfield', fieldLabel: 'partname', name: 'partname', emptyText: 'partname', enforceMaxLength: true, maxLength: 50,
                            width: 500
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        {
                            xtype: 'textfield', fieldLabel: 'Custom Name', name: 'partcname', emptyText: 'partcname', enforceMaxLength: true, maxLength: 50,
                            width: 300
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        { xtype: 'textfield', fieldLabel: 'hscode', name: 'hscode', emptyText: 'hscode', enforceMaxLength: true, maxLength: 50 }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        { xtype: 'textfield', fieldLabel: 'bm', name: 'bm', emptyText: 'bm', enforceMaxLength: true, maxLength: 50 },
                        { xtype: 'tbspacer', width: 10 },
                        { xtype: 'textfield', fieldLabel: 'cekprice', name: 'cekprice', emptyText: 'cekprice', enforceMaxLength: true, maxLength: 50 }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        { xtype: 'textfield', fieldLabel: 'New Part', name: 'newpart', emptyText: 'newpart', enforceMaxLength: true, maxLength: 50 }
                    ]
                },

            ]
        },
        { xtype: 'tbspacer', width: 10 },
        {
            xtype: 'container',
            layout: 'vbox',
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        {
                            xtype: 'textfield', fieldLabel: 'Supplier', name: 'suppcode', emptyText: 'suppcode', enforceMaxLength: true, maxLength: 50,
                            width: 120
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield', name: 'supp', emptyText: 'supp', enforceMaxLength: true, maxLength: 50,
                            width: 300
                        },

                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        { xtype: 'textfield', fieldLabel: 'shipmentterm', name: 'shipmentterm', emptyText: 'shipmentterm', enforceMaxLength: true, maxLength: 50 }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        { xtype: 'textfield', fieldLabel: 'ponumber', name: 'ponumber', emptyText: 'ponumber', enforceMaxLength: true, maxLength: 50 }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        { xtype: 'textfield', fieldLabel: 'curr', name: 'curr', emptyText: 'curr', enforceMaxLength: true, maxLength: 50 }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        { xtype: 'textfield', fieldLabel: 'pnadd', name: 'pnadd', emptyText: 'pnadd', enforceMaxLength: true, maxLength: 50 }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        { xtype: 'textfield', fieldLabel: 'jtrfbm', name: 'jtrfbm', emptyText: 'jtrfbm', enforceMaxLength: true, maxLength: 50 }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        { xtype: 'textfield', fieldLabel: 'jtrfcukai', name: 'jtrfcukai', emptyText: 'jtrfcukai', enforceMaxLength: true, maxLength: 50 }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        { xtype: 'textfield', fieldLabel: 'ksbm', name: 'ksbm', emptyText: 'ksbm', enforceMaxLength: true, maxLength: 50 }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        { xtype: 'textfield', fieldLabel: 'kscukai', name: 'kscukai', emptyText: 'kscukai', enforceMaxLength: true, maxLength: 50 }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        { xtype: 'textfield', fieldLabel: 'trfbm', name: 'trfbm', emptyText: 'trfbm', enforceMaxLength: true, maxLength: 50 }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        { xtype: 'textfield', fieldLabel: 'trfcukai', name: 'trfcukai', emptyText: 'trfcukai', enforceMaxLength: true, maxLength: 50 }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        { xtype: 'textfield', fieldLabel: 'trfpph', name: 'trfpph', emptyText: 'trfpph', enforceMaxLength: true, maxLength: 50 }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        { xtype: 'textfield', fieldLabel: 'trfppn', name: 'trfppn', emptyText: 'trfppn', enforceMaxLength: true, maxLength: 50 }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        { xtype: 'textfield', fieldLabel: 'trfppnbm', name: 'trfppnbm', emptyText: 'trfppnbm', enforceMaxLength: true, maxLength: 50 }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        { xtype: 'textfield', fieldLabel: 'createdate', name: 'createdate', emptyText: 'createdate', enforceMaxLength: true, maxLength: 50 }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        { xtype: 'textfield', fieldLabel: 'createby', name: 'createby', emptyText: 'createby', enforceMaxLength: true, maxLength: 50 }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        { xtype: 'textfield', fieldLabel: 'moddate', name: 'moddate', emptyText: 'moddate', enforceMaxLength: true, maxLength: 50 }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        { xtype: 'textfield', fieldLabel: 'modby', name: 'modby', emptyText: 'modby', enforceMaxLength: true, maxLength: 50 }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        { xtype: 'textfield', fieldLabel: 'uom', name: 'uom', emptyText: 'uom', enforceMaxLength: true, maxLength: 50 }
                    ]
                },
            ]
        }


    ],
    tbar: {
        pid: 'tbar_hs',
        plugins: {
            boxreorderer: true
        },
        items: [
            { xtype: 'button', text: 'New Input', pid: 'btnew', icon: vconfig.getstyle + 'icon/add.png', tooltip: 'New Input' },
            '-',
            { xtype: 'button', text: 'Save', pid: 'btsave', icon: vconfig.getstyle + 'icon/save.gif', tooltip: 'Save Data' },
            { xtype: 'button', text: 'Cancel', icon: vconfig.getstyle + 'icon/delete.png', pid: 'btdelete', tooltip: 'Delete Data' },
            '-',
            { xtype: 'button', text: 'List Data', pid: 'btlist', icon: vconfig.getstyle + 'icon/grid.png', tooltip: 'List Data' },
            '->',
            {
                text: 'Upload Data',
                icon: vconfig.getstyle + 'icon/upload.png',
                menu: [{
                    text: 'upload '
                }]
            },
            {
                text: 'Download Data',
                icon: vconfig.getstyle + 'icon/download.png',
                menu: [{
                    text: 'Download '
                }]
            }
        ]
    }
});