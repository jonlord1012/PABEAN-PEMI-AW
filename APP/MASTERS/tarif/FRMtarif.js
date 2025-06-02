Ext.define('TDK.masters.tarif.FRMtarif', {
    extend: 'Ext.form.Panel',
    alias: 'widget.FRMtarif',
    reference: 'FRMtarif',
    frame: false,
    border: false,
    autoScroll: true,
    layout: { type: 'vbox', pack: 'start', align: 'stretch' },
    bodyPadding: '5 5 5 5',
    requires: [

    ],
    fieldDefaults: {
        labelWidth: 120
    },
    items: [


        {
            xtype: 'container',
            layout: 'hbox',
            margin: '0 0 5 0',
            items: [
                { xtype: 'textfield', fieldLabel: 'Jenis Tarif BM', name: 'JENIS_TARIF_BM', width: 350, fieldCls: 'fieldinput', value: '', readOnly: false, emptyText: 'Jenis Tarif BM' },
                { xtype: 'tbspacer', width: 10 },
                { xtype: 'numberfield', name: 'ID', width: 50, fieldCls: 'fieldlock', value: 0, readOnly: true }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            margin: '0 0 5 0',
            items: [
                { xtype: 'textfield', fieldLabel: 'Jenis Tarif Cukai', name: 'JENIS_TARIF_CUKAI', width: 350, fieldCls: 'fieldinput', value: '', readOnly: false, emptyText: 'Jenis Tarif Cukai' }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            margin: '0 0 5 0',
            items: [
                { xtype: 'textfield', fieldLabel: 'Kode Satuan BM', name: 'KODE_SATUAN_BM', width: 300, fieldCls: 'fieldinput', value: '', readOnly: false, emptyText: 'Satuan BM', enforceMaxLength: true, maxLength: 2 }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            margin: '0 0 5 0',
            items: [
                { xtype: 'textfield', fieldLabel: 'Kode Satuan Cukai', name: 'KODE_SATUAN_CUKAI', width: 300, fieldCls: 'fieldinput', value: '', readOnly: false, emptyText: 'Satuan Cukai', enforceMaxLength: true, maxLength: 2 }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            margin: '0 0 5 0',
            items: [
                { xtype: 'textfield', fieldLabel: 'No HS', name: 'NOMOR_HS', width: 220, fieldCls: 'fieldinput', value: '', readOnly: false, emptyText: 'No HS', enforceMaxLength: true, maxLength: 30 }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            margin: '0 0 5 0',
            items: [
                { xtype: 'numberfield', fieldLabel: 'Seri HS', name: 'SERI_HS', width: 220, fieldCls: 'fieldinput', value: 0, readOnly: false, hideTrigger: true, allowDecimals: false }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            margin: '0 0 5 0',
            items: [
                { xtype: 'numberfield', fieldLabel: 'Tarif BM', name: 'TARIF_BM', width: 220, fieldCls: 'fieldinput', value: 0, readOnly: false, hideTrigger: true, allowDecimals: true, decimalPrecision: 3, step: 0.1 }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            margin: '0 0 5 0',
            items: [
                { xtype: 'textfield', fieldLabel: 'Tarif Cukai', name: 'TARIF_CUKAI', width: 220, fieldCls: 'fieldinput', value: 0, readOnly: false, hideTrigger: true, allowDecimals: true, decimalPrecision: 3, step: 0.1 }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            margin: '0 0 5 0',
            items: [
                { xtype: 'textfield', fieldLabel: 'PPH', name: 'TARIF_PPH', width: 220, fieldCls: 'fieldinput', value: 0, readOnly: false, hideTrigger: true, allowDecimals: true, decimalPrecision: 3, step: 0.1 }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            margin: '0 0 5 0',
            items: [
                { xtype: 'textfield', fieldLabel: 'PPN', name: 'TARIF_PPN', width: 220, fieldCls: 'fieldinput', value: 0, readOnly: false, hideTrigger: true, allowDecimals: true, decimalPrecision: 3, step: 0.1 }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            margin: '0 0 5 0',
            items: [
                { xtype: 'textfield', fieldLabel: 'PPNBM', name: 'TARIF_PPNBM', width: 220, fieldCls: 'fieldinput', value: 0, readOnly: false, hideTrigger: true, allowDecimals: true, decimalPrecision: 3, step: 0.1 }
            ]
        },

    ],
    tbar: {
        pid: 'tbar_tarif',
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