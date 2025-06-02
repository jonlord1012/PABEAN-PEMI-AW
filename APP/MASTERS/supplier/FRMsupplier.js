Ext.define('TDK.masters.supplier.FRMsupplier', {
    extend: 'Ext.form.Panel',
    alias: 'widget.FRMsupplier',
    reference: 'FRMsupplier',
    frame: false,
    border: false,
    autoScroll: true,
    layout: { type: 'vbox', pack: 'start', align: 'stretch' },
    bodyPadding: '5 5 5 5',
    requires: [

    ],
    fieldDefaults: {
        labelWidth: 80
    },
    items: [
        {
            xtype: 'container',
            layout: 'hbox',
            margin: '0 0 5 0',
            items: [
                { xtype: 'textfield', fieldLabel: 'Kode', name: 'supplier_customer_code', width: 350, fieldCls: 'fieldinput', value: '', readOnly: false, emptyText: 'Kode Supplier' },
                { xtype: 'tbspacer', width: 10 },
                { xtype: 'numberfield', name: 'mst_supplier_customer_id', width: 50, fieldCls: 'fieldlock', value: 0, readOnly: true }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            margin: '0 0 5 0',
            items: [
                { xtype: 'textfield', fieldLabel: 'Nama', name: 'supplier_customer_name', width: 350, fieldCls: 'fieldinput', value: '', readOnly: false, emptyText: 'Nama Supplier' }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            margin: '0 0 5 0',
            items: [
                { xtype: 'textfield', fieldLabel: 'Country', name: 'supplier_customer_country', width: 180, fieldCls: 'fieldinput', value: '', readOnly: false, emptyText: 'Country', enforceMaxLength: true, maxLength: 2 }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            margin: '0 0 5 0',
            items: [
                { xtype: 'textarea', fieldLabel: 'Alamat', name: 'supplier_customer_address', width: 450, fieldCls: 'fieldinput', value: '', readOnly: false, emptyText: 'Alamat' }
            ]
        },
    ],
    tbar: {
        pid: 'tbar_supplier',
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