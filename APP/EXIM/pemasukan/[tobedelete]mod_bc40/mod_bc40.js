Ext.define('TDK.exim.pemasukan.mod_bc40.mod_bc40', {
    extend: 'Ext.form.Panel',
    alias:'widget.mod_bc40',
    reference:'mod_bc40',
    config: {},
    requires: [
        'TDK.exim.pemasukan.mod_bc40.FRMmod_bc40'
    ],
    constructor: function (config) {
        return this.callParent(arguments);
    },
    //untuk include controller
    controller: '',
    initComponent: function () {

            Ext.apply(this, {
            xtype:'layout-border',
            layout: 'border',
            border:false,
            frame:false,
            bodyBorder: false,
            items: [
                {
                    region: 'center',
                    xtype:'panel',
                    pid:'panelmod_bc40',
                    layout:'card',
                    activeItem:0,
                    frame:false,
                    border:false,
                    items:[
                        {xtype:'FRMmod_bc40'}
                        
                    ]
                    
                }
            ]

        });

        this.callParent(arguments);
    }
});
