Ext.define('TDK.masters.master_ppn.master_ppn', {
    extend: 'Ext.form.Panel',
    alias: 'widget.master_ppn',
    reference: 'master_ppn',
    width: '100%',
    height: '100%',
    config: {},
    requires: [

    ],
    constructor: function (config) {
        return this.callParent(arguments);
    },
    //untuk include controller
    controller: '',
    initComponent: function () {

        Ext.apply(this, {
            xtype: 'panel',
            pid: 'panelmaster_ppn',
            layout: 'card',
            frame: false,
            border: false,
            items: [
                { xtype: 'container', html: '' }
            ]

        });

        this.callParent(arguments);
    },

});
