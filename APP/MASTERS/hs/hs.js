Ext.define('TDK.masters.hs.hs', {
    extend: 'Ext.form.Panel',
    alias: 'widget.hs',
    reference: 'hs',
    config: {},
    requires: [
        'TDK.masters.hs.Chs',
        'TDK.masters.hs.GRIDhs',
        'TDK.masters.hs.FRMhs'
    ],
    constructor: function (config) {
        return this.callParent(arguments);
    },
    //untuk include controller
    controller: 'Chs',
    initComponent: function () {

        Ext.apply(this, {
            xtype: 'layout-border',
            layout: 'border',
            border: false,
            frame: false,
            bodyBorder: false,
            items: [
                {
                    region: 'center',
                    xtype: 'panel',
                    pid: 'panelhs',
                    layout: 'card',
                    frame: false,
                    border: false,
                    items: [
                        { xtype: 'container', html: '' },
                        { xtype: 'GRIDhs' },
                        { xtype: 'FRMhs' },
                    ]

                }
            ]

        });

        this.callParent(arguments);
    },

});
