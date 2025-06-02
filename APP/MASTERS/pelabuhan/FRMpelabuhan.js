Ext.define('TDK.masters.pelabuhan.FRMpelabuhan', {
    extend: 'Ext.form.Panel',
    alias: 'widget.FRMpelabuhan',
    reference: 'FRMpelabuhan',
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
                { xtype: 'textfield', fieldLabel: 'Kode Kantor', name: 'KODE_KANTOR', width: 250, fieldCls: 'fieldinput', value: '', readOnly: false, emptyText: 'Kode pelabuhan', enforceMaxLength: true, maxLength: 50 },
                { xtype: 'tbspacer', width: 10 },
                { xtype: 'numberfield', name: 'ID', width: 50, fieldCls: 'fieldlock', value: 0, readOnly: true }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            margin: '0 0 5 0',
            items: [
                { xtype: 'textfield', fieldLabel: 'Kode Pelabuhan', name: 'KODE_PELABUHAN', width: 250, fieldCls: 'fieldinput', value: '', readOnly: false, emptyText: 'Nama pelabuhan', enforceMaxLength: true, maxLength: 50 }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            margin: '0 0 5 0',
            items: [
                { xtype: 'textfield', fieldLabel: 'Uraian', name: 'URAIAN_PELABUHAN', width: 450, fieldCls: 'fieldinput', value: '', readOnly: false, emptyText: 'Uraian', enforceMaxLength: true, maxLength: 50 }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            margin: '0 0 5 0',
            items: [
                { xtype: 'textarea', fieldLabel: 'Keterangan', name: 'KETERANGAN', width: 450, fieldCls: 'fieldinput', value: '', readOnly: false, emptyText: 'Keterangan', enforceMaxLength: true, maxLength: 50 }
            ]
        },
    ],
    tbar: {
        pid: 'tbar_pelabuhan',
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