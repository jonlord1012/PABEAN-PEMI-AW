Ext.define('TDK.masters.master_control.FRMmaster_control', {
    extend: 'Ext.form.Panel',
    alias: 'widget.FRMmaster_control',
    reference: 'FRMmaster_control',
    frame: false,
    border: false,
    autoScroll: true,
    bodyPadding: '5 5 5 5',
    requires: [
        'Ext.view.View',
        'Ext.ux.BoxReorderer',
        'Ext.ux.DataView.Animated'
    ],
    items: [
        {
            xtype: 'container',
            items: [
                {
                    xtype: 'dataview',
                    pid: 'control_dataview',
                    reference: 'control_dataview',
                    plugins: {
                        'ux-animated-dataview': true
                    },

                    itemSelector: 'div.layout-wrap',
                    tpl: [
                        '<tpl for=".">',
                        '<div class="layout-wrap">',
                        '<div>',
                        '<img src="' + vconfig.getstyle + 'icon/{images}" />',
                        '<p style="text-align:justify;font-weight: bold;margin-top:-1px;margin-left:2px;">{name}</p>',
                        '</div>',
                        '</div>',
                        '</tpl>',
                    ],

                    store: {
                        data: [
                            { "name": "Master Negara", "images": "layout_form.png", "module": "master_negara" },
                            { "name": "Master Carline", "images": "layout_form.png", "module": "master_carline" },
                            { "name": "Master PPN", "images": "layout_form.png", "module": "master_ppn" },
                            { "name": "Master PPH", "images": "layout_form.png", "module": "master_pph" },
                            { "name": "Master Kurs", "images": "layout_form.png", "module": "master_kurs" },
                            { "name": "Master Satuan/unit", "images": "layout_form.png", "module": "master_unit" },
                            { "name": "Master Teknisi", "images": "layout_form.png", "module": "master_teknisi" },

                        ]
                    }
                }
            ]
        }

    ],
    tbar: []
});