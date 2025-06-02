var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.INVENTORY_AW.inv_wnt_out_aw.FRMinv_wnt_out_aw", {
    extend: "Ext.window.Window",
    alias: "widget.FRMinv_wnt_out_aw",
    reference: "FRMinv_wnt_out_aw",
    title: "Supply to Production",
    modal: true,
    closeAction: "destroy",
    centered: true,
    autoScroll: true,
    controller: "Cinv_wnt_out_aw",
    bodyPadding: "5 25 25 5",
    width: mainpanel.getWidth() * 0.8,
    height: mainpanel.getHeight() * 0.8,
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
                                { xtype: "textfield", width: 200, labelWidth: 100, fieldLabel: "SUPPLY DOC NO", name: "NO_DOC", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "No Doc Supply" }
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
                            items: [{ xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "NOTES", name: "NOTES", fieldCls: "fieldinput", readOnly: false, enforceMaxLength: true, emptyText: "NOTES" }],
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
                    pid: "GRIDFRMinv_wnt_out_aw",
                    emptyText: "No Matching Records",
                    autoScroll: true,
                    flex: 1,
                    plugins: ["filterfield"],
                    viewConfig: {
                        enableTextSelection: true,
                        getRowClass: function (record) {
                            return record.get("PART_NO") === null || record.get("PART_NO") === "" ? "gridrow-red" : "";
                        },
                    },
                    columns: [
                        { sortable: true, width: 105, filter: { xtype: "textfield" }, header: "PARTNO", dataIndex: "PART_NO" },
                        { sortable: true, width: 200, filter: { xtype: "textfield" }, header: "PARTNAME", dataIndex: "PART_NAME" },
                        { sortable: true, width: 105, filter: { xtype: "textfield" }, header: "UOM", dataIndex: "KODE_SATUAN" },
                        { sortable: true, width: 125, filter: { xtype: "textfield" }, align: "right", renderer: "formatqty", header: "QTY_REQUESTED", dataIndex: "QTY_REQUESTED" },

                        {
                            header: "QTY_SUPPLIED",
                            dataIndex: "QTY_SUPPLIED",
                            sortable: true,
                            width: 125,
                            filter: { xtype: "textfield" },
                            tdCls: "fieldinput",
                            align: "right",
                            renderer: "formatqty",
                            editor: {
                                xtype: "numberfield",
                                hidetriger: true,
                                margin: "0 0 0 0",
                                name: "QTY_SUPPLIED",
                                allowBlank: false,
                            },
                        },
                        { sortable: true, width: 250, filter: { xtype: "textfield" }, header: "INFO", dataIndex: "INFO" },
                    ],
                },
            ],
            tbar: [
                {
                    xtype: "button",
                    text: "Add Items",
                    pid: "FRMinv_wnt_out_aw_btitem_part",
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
                    pid: "FRMinv_wnt_out_aw_btsave",
                    icon: vconfig.getstyle + "icon/save.gif",
                    tooltip: "Save Data",
                },
            ],
        },
    ],
});
