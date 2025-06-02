Ext.define('TDK.masters.master_carline.master_carline', {
    extend: 'Ext.form.Panel',
    alias: 'widget.master_carline',
    reference: 'master_carline',
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
            pid: 'panelmaster_carline',
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
