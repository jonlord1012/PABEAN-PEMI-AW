var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.INVENTORY.inv_wnt_out.FRMinv_wnt_out", {
    extend: "Ext.window.Window",
    alias: "widget.FRMinv_wnt_out",
    reference: "FRMinv_wnt_out",
    // title: "Supply to Production",
    title: "Outgoing Material",
    modal: true,
    closeAction: "destroy",
    centered: true,
    autoScroll: true,
    controller: "Cinv_wnt_out",
    bodyPadding: "5 25 25 5",
    width: mainpanel.getWidth() * 0.77,  
    height: mainpanel.getHeight() * 0.85,
    layout: { type: "vbox", pack: "start", align: "stretch" },
    bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
    items: [
        {
            xtype: "form",
            bodyPadding: "5 25 25 5",
            fieldDefaults: {
                labelAlign: "left",
                labelWidth: 70,
                margin: "0 10 5 0",
            },
            layout: { type: "hbox", pack: "start", align: "stretch" },
            border: false,
            items: [
                {
                    xtype: "container",
                    layout: "vbox",
                    width: 600,
                    items: [
                        {
                            xtype: "container",
                            layout: "hbox",
                            items: [
                                { xtype: "textfield", width: 300, labelWidth: 100, fieldLabel: "SUPPLY DOC NO", name: "NO_DOK", fieldCls: "fieldinput", readOnly: false, enforceMaxLength: true, emptyText: "No Doc Supply" },
                                {
                                    xtype: "button",
                                    pid: "btsearch_doc",
                                    module: "inv_out_doc",
                                    popupwidth: 900,
                                    tofield: {
                                        NO_DOK: "NO_DOK"
                                    },
                                    icon: vconfig.getstyle + "icon/search.ico",
                                    tooltip: "search",
                                },
                            ],
                        },
                        {
                            xtype: "container",
                            layout: "hbox",
                            items: [
                                { xtype: "datefield", labelWidth: 100, width: 300, fieldLabel: "TGL SUPPLY", name: "TANGGAL_SUPPLY", fieldCls: "fieldinput", readOnly: false, enforceMaxLength: true, emptyText: "Tgl Supply", format: "Y-m-d", value: Date.now() }
                            ],
                        },
                        {
                            xtype: "container",
                            layout: "hbox",
                            items: [
                                { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "NAMA TEKNISI", name: "NAMA_TEKNISI", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "TECH NAME" },
                                { xtype: "hiddenfield", width: 200, labelWidth: 100, fieldLabel: "KODE_TEKNISI", name: "KODE_TEKNISI", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "KODE_TEKNISI" },
                                {
                                    xtype: "button",
                                    pid: "btsearch_technician",
                                    module: "inv_out_technician",
                                    popupwidth: 900,
                                    tofield: {
                                        KODE_TEKNISI: "KODE_TEKNISI",
                                        NAMA_TEKNISI: "NAMA_TEKNISI"
                                    },
                                    icon: vconfig.getstyle + "icon/search.ico",
                                    tooltip: "search",
                                },
                            ],
                        },
                        // {
                        //     xtype:"container",
                        //     layout:"hbox",
                        //     items:[
                        //         { 
                        //             xtype:"combobox",
                        //             fieldLabel: 'KATEGORI',
                        //             labelWidth: 100,
                        //             width: 300,
                        //             store: {
                        //                 fields: ['values', 'name'],
                        //                 data : [
                        //                     {"values":"SCRAP", "name":"TO SCRAP"},
                        //                     {"values":"SELLING", "name":"TO SELLING"},
                        //                     {"values":"ENGINEERING", "name":"TO ENGINEERING"}
                        //                 ]
                        //             },
                        //             fieldCls: "fieldinput",
                        //             readOnly:false,
                        //             emptyText:'CHOOSE TO KATEGORI',
                        //             queryMode: 'local',
                        //             displayField: 'name',
                        //             valueField: 'values', 
                        //         }
                        //     ]
                        // }
                    ],
                },
                { xtype: "tbspacer", width: 5 },
                {
                    xtype: "container",
                    layout: "vbox",
                    items: [
                        {
                            xtype: "container",
                            layout: "hbox",
                            items: [
                                { xtype: "textfield", width: 300, labelWidth: 100, fieldLabel: "Proccess", name: "NAMA_PROCESS", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "PROCESS NAME" },
                                { xtype: "hiddenfield", width: 200, labelWidth: 100, fieldLabel: "Proccess", name: "KODE_PROCESS", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "KODE PROCESS" },
                                {
                                    xtype: "button",
                                    pid: "btsearch_process_name",
                                    module: "inv_out_process_name",
                                    popupwidth: 900,
                                    tofield: {
                                        NAMA_PROCESS: "NAMA_PROCESS",
                                        KODE_PROCESS: "KODE_PROCESS"
                                    },
                                    icon: vconfig.getstyle + "icon/search.ico",
                                    tooltip: "search",
                                },
                            ],
                        },
                        {
                            xtype: "container",
                            layout: "hbox",
                            items: [
                                { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "CARLINE NAME", name: "NAMA_CARLINE", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "NAMA_CARLINE" },
                                { xtype: "hiddenfield", width: 200, labelWidth: 100, fieldLabel: "KODE_CARLINE", name: "KODE_CARLINE", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "KODE CARLINE" },
                                {
                                    xtype: "button",
                                    pid: "btsearch_carline",
                                    module: "inv_out_carline",
                                    popupwidth: 900,
                                    tofield: {
                                        KODE_CARLINE: "KODE_CARLINE",
                                        NAMA_CARLINE: "NAMA_CARLINE"
                                    },
                                    icon: vconfig.getstyle + "icon/search.ico",
                                    tooltip: "search",
                                },
                            ],
                        },
                        {
                            xtype: "container",
                            layout: "hbox",
                            items: [{ xtype: "textareafield", labelWidth: 100, width: 300, fieldLabel: "NOTES", name: "NOTES", fieldCls: "fieldinput", readOnly: false, enforceMaxLength: true, emptyText: "NOTES" }],
                        },
                    ]
                },

            ],
        },
        {
            xtype: "panel",
            layout: { type: "hbox", pack: "start", align: "stretch" },
            margin: "5 25 25 5",
            flex: 1,
            items: [
                {
                    xtype: "grid",
                    pid: "GRIDFRMinv_wnt_out",
                    emptyText: "No Matching Records",
                    autoScroll: true,
                    flex: 1,
                    // plugins: ["filterfield"],
                    plugins:{
                        filterfield:true,
                        cellediting: {
                            clicksToEdit: 1,
                        },
                    },
                    // viewConfig: {
                    //     enableTextSelection: true,
                    //     getRowClass: function (record) {
                    //         return record.get("PART_NO") === null || record.get("PART_NO") === "" ? "gridrow-red" : "";
                    //     },
                    // },
                    columns: [
                        { width: 155, filter: { xtype: "textfield" }, header: "PARTNO", dataIndex: "PART_NO" },
                        { width: 200, filter: { xtype: "textfield" }, header: "PARTNAME", dataIndex: "PART_NAME" },
                        { width: 105, filter: { xtype: "textfield" }, header: "UOM", dataIndex: "KODE_SATUAN" },
                        { width: 125, filter: { xtype: "textfield" }, align: "right", header: "QTY_REQUESTED", dataIndex: "QTY_REQUESTED" },
                        {
                            header: "QTY_SUPPLIED",
                            dataIndex: "QTY_SUPPLIED",
                           
                            width: 125,
                            filter: { xtype: "textfield" },
                            tdCls: "fieldinput",
                            align: "right",
                            editor: {
                                xtype: "numberfield",
                                // hidetriger: true,
                                margin: "0 0 0 0",
                                name: "QTY_SUPPLIED",
                                // allowBlank: false,
                            },
                        },
                        { 
                            header: "INFO",
                            width: 220, 
                            filter: { xtype: "textfield" }, 
                            dataIndex: "INFO",
                            editor: {
                                xtype: "combobox",
                                displayField: "FNAME",
                                valueField: "VALUES",
                                fieldCls: "fieldinput",
                                allowBlank: false,
                                queryMode: "local",
                                typeAhead: true,
                                // forceSelection: true,
                                // minChars: 0,
                                anyMatch: true,
                                // hidetriger: true,
                                margin: "0 0 0 0",
                                name: "INFO",
                                store: new Ext.data.Store({
                                data: [
                                  { VALUES: "RUSAK", FNAME: "RUSAK" },
                                  { VALUES: "AUS", FNAME: "AUS" },
                                  { VALUES: "LIMIT", FNAME: "LIMIT" },
                                  { VALUES: "PATAH", FNAME: "PATAH" },
                                  { VALUES: "KENDOR", FNAME: "KENDOR" },
                                ],
                                fields: ["VALUES", "FNAME"],
                              }),
                            }, 
                        },
                        {
                            xtype: "actioncolumn",
                            menuDisabled:true,
                            align:'center',
                            width:50,
                            items:[
                                {
                                    xtype: "button",
                                    text: "Remove Items",
                                    pid: "FRMinv_wnt_out_btrmove_part",
                                    icon: vconfig.getstyle + "icon/delete.ico",
                                    tooltip: "Remove Items",
                                    handler:'btremove_part_click'
                                }
                            ]
                        },
                    ],
                    bbar:{
                        xtype: "pagingtoolbar",
                        displayInfo: true,
                        displayMsg: "Displaying topics {0} - {1} of {2}",
                    }
                },
            ],
            tbar: [
                {
                    xtype: "button",
                    text: "Add Items",
                    pid: "FRMinv_wnt_out_btitem_part",
                    icon: vconfig.getstyle + "icon/save.gif",
                    tooltip: "Add Items",

                },
            ],
        },
    ],
    dockedItems: [
        {
            xtype: "toolbar",
            height: 30,
            dock: "top",
            items: [
                { xtype: "tbspacer", width: 10 },
                {
                    xtype: "button",
                    text: "Save",
                    pid: "FRMinv_wnt_out_btsave",
                    icon: vconfig.getstyle + "icon/save.gif",
                    tooltip: "Save Data",
                },
            ],
        },
    ],
});
