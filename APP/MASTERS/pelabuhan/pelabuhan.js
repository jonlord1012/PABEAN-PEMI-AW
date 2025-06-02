Ext.define('TDK.masters.pelabuhan.pelabuhan', {
    extend: 'Ext.form.Panel',
    alias: 'widget.pelabuhan',
    reference: 'pelabuhan',
    config: {},
    requires: [
        'TDK.masters.pelabuhan.Cpelabuhan',
        'TDK.masters.pelabuhan.GRIDpelabuhan',
        'TDK.masters.pelabuhan.FRMpelabuhan',
        'TDK.masters.pelabuhan.STGRIDpelabuhan'
    ],
    constructor: function (config) {
        return this.callParent(arguments);
    },
    //untuk include controller
    controller: 'Cpelabuhan',
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
                    pid: 'panelpelabuhan',
                    layout: 'card',
                    activeItem: 0,
                    frame: false,
                    border: false,
                    items: [
                        { xtype: 'GRIDpelabuhan' },
                        { xtype: 'FRMpelabuhan' },

                    ]

                }
            ]

        });

        this.callParent(arguments);
    },

});
