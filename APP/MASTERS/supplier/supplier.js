Ext.define('TDK.masters.supplier.supplier', {
    extend: 'Ext.form.Panel',
    alias: 'widget.supplier',
    reference: 'supplier',
    config: {},
    requires: [
        'TDK.masters.supplier.Csupplier',
        'TDK.masters.supplier.GRIDsupplier',
        'TDK.masters.supplier.FRMsupplier',
        'TDK.masters.supplier.STGRIDsupplier'
    ],
    constructor: function (config) {
        return this.callParent(arguments);
    },
    //untuk include controller
    controller: 'Csupplier',
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
                    pid: 'panelsupplier',
                    layout: 'card',
                    activeItem: 0,
                    frame: false,
                    border: false,
                    items: [
                        { xtype: 'container', html: '' }

                    ]

                }
            ]

        });

        this.callParent(arguments);
    },

});
