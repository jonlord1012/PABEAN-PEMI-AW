Ext.define('TDK.masters.master_kurs.master_kurs', {
    extend: 'Ext.form.Panel',
    alias: 'widget.master_kurs',
    reference: 'master_kurs',
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
            pid: 'panelmaster_kurs',
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
