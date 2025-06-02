Ext.define('TDK.masters.master_negara.master_negara', {
    extend: 'Ext.form.Panel',
    alias: 'widget.master_negara',
    reference: 'master_negara',
    width: '100%',
    height: '100%',
    config: {},
    requires: [
        'TDK.masters.master_negara.Cmaster_negara',
        'TDK.masters.master_negara.GRIDmaster_negara'
    ],
    constructor: function (config) {
        return this.callParent(arguments);
    },
    //untuk include controller
    controller: 'Cmaster_negara',
    initComponent: function () {

        Ext.apply(this, {
            xtype: 'panel',
            pid: 'panelmaster_negara',
            layout: 'card',
            frame: false,
            border: false,
            items: [
                { xtype: 'container', html: '' },
                { xtype: 'GRIDmaster_negara' },
            ]

        });

        this.callParent(arguments);
    },

});
