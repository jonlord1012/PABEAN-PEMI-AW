Ext.define('TDK.masters.hs.GRIDhs', {
    extend: 'Ext.form.Panel',
    alias: 'widget.GRIDhs',
    reference: 'GRIDhs',
    frame: false,
    border: false,
    layout: { type: 'vbox', pack: 'start', align: 'stretch' },
    requires: [

    ],
    items: [

    ],
    tbar: {
        pid: 'tbar_hs',
        plugins: {
            boxreorderer: true
        },
        items: [
            { xtype: 'button', text: 'New Input', pid: 'btnew', icon: vconfig.getstyle + 'icon/add.png', tooltip: 'New Input' },
            { xtype: 'button', text: 'List Data', pid: 'btlist', icon: vconfig.getstyle + 'icon/grid.png', tooltip: 'List Data' },

        ]
    }
});