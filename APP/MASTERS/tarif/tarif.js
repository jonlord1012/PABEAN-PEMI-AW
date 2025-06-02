Ext.define('TDK.masters.tarif.tarif', {
    extend: 'Ext.form.Panel',
    alias: 'widget.tarif',
    reference: 'tarif',
    config: {},
    requires: [
        'TDK.masters.tarif.Ctarif',
        'TDK.masters.tarif.GRIDtarif',
        'TDK.masters.tarif.FRMtarif',
        'TDK.masters.tarif.STGRIDtarif'
    ],
    constructor: function (config) {
        return this.callParent(arguments);
    },
    //untuk include controller
    controller: 'Ctarif',
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
                    pid: 'paneltarif',
                    layout: 'card',
                    activeItem: 0,
                    frame: false,
                    border: false,
                    items: [
                        { xtype: 'GRIDtarif' },
                        { xtype: 'FRMtarif' },

                    ]

                }
            ]

        });

        this.callParent(arguments);
    },

});
