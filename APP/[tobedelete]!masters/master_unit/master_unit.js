Ext.define('TDK.masters.master_unit.master_unit', {
    extend: 'Ext.form.Panel',
    alias: 'widget.master_unit',
    reference: 'master_unit',
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
            pid: 'panelmaster_unit',
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
