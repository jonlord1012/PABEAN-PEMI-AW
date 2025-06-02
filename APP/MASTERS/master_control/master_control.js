Ext.define('TDK.masters.master_control.master_control', {
    extend: 'Ext.form.Panel',
    alias: 'widget.master_control',
    reference: 'master_control',
    config: {},
    requires: [
        'TDK.masters.master_control.FRMmaster_control',
        'TDK.masters.master_control.Cmaster_control',
        'TDK.masters.master_negara.master_negara',
        'TDK.masters.master_carline.master_carline',
        'TDK.masters.master_ppn.master_ppn',
        'TDK.masters.master_pph.master_pph',
        'TDK.masters.master_kurs.master_kurs',
        'TDK.masters.master_unit.master_unit',
        'TDK.masters.master_teknisi.master_teknisi',
    ],
    constructor: function (config) {
        return this.callParent(arguments);
    },
    //untuk include controller
    controller: 'Cmaster_control',
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
                    pid: 'panelmaster_control',
                    layout: 'card',
                    frame: false,
                    border: false,
                    items: [
                        { xtype: 'FRMmaster_control' }
                    ]

                }
            ]

        });

        this.callParent(arguments);
    },

});
