Ext.define('TDK.masters.master_pph.master_pph', {
    extend: 'Ext.form.Panel',
    alias: 'widget.master_pph',
    reference: 'master_pph',
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
            pid: 'panelmaster_pph',
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
