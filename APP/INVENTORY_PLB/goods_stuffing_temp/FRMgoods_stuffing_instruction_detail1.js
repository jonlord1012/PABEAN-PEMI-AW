var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.INVENTORY_PLB.goods_stuffing.FRMgoods_stuffing_details", {
    extend: "Ext.window.Window",
    alias: "widget.FRMgoods_stuffing_details",
    reference: "FRMgoods_stuffing_details",
    title: "Stuffing Goods for Delivery",
    modal: true,
    closeAction: 'destroy',
    centered: true,
    autoScroll: false,
    controller: "Cgoods_stuffing",
    //y: -110,
    //bodyPadding: "5 5 5 5",
    width: mainpanel.getWidth() * 0.9,
    height: mainpanel.getHeight() * 0.9,
    flex: 1,
    layout: { type: "vbox", pack: "start", align: "stretch" },
    bodyStyle: "background:#FFFFFF;background-color:#FFFFFF; margin:5px 5px 5px 5px;",
    items: [
        {
            xtype: "container",
            layout: { type: "hbox", pack: "start", align: "stretch" },
            flex: 1,
            style: { margin: '5px 30px 30px 0' },
            items: [
                {
                    xtype: "container",
                    layout: { type: "hbox", pack: "start", align: "stretch" },
                    flex: 1,
                    items: [
                        {
                            xtype: "container",
                            layout: { type: "vbox", pack: "start", align: "stretch" },
                            flex: 1,
                            items: [
                                {
                                    xtype: "container",
                                    layout: { type: "vbox", pack: "start", align: "stretch", pack: 'center' },
                                    //style: { border: "solid", },
                                    items: [
                                        {
                                            xtype: "textfield",
                                            fieldLabel: 'Delivery Instruction Number:',
                                            pid: 'INVOICE_NO',
                                            name: 'INVOICE_NO',
                                            labelStyle: 'text-transform:uppercase; vertical-align:middle; font-weight: bold; color:blue;',
                                            labelWidth: 250,
                                            //html: "<div><b>Delivery Instruction Number:<span style='color:red;' id='DocumentNo'>XXXXX</span></b></div>",
                                            height: 35,
                                            readOnly: true,
                                        },
                                    ]
                                },
                                {
                                    xtype: "grid",
                                    pid: "GRIDFRM_goods_stuffing",
                                    emptyText: "No Matching Records",
                                    flex: 1,
                                    plugins: ["filterfield"],
                                    viewConfig: {
                                        enableTextSelection: true,
                                    },
                                    features: [
                                        {
                                            ftype: "summary",
                                            dock: "bottom",
                                        },
                                    ],
                                    store: {
                                        autoLoad: true,
                                        remoteSort: false,
                                        remoteFilter: true,
                                        pageSize: 0,
                                        fields: [
                                            { name: "QTY", type: "float" },
                                            { name: "PART_MPQ", type: "float" },
                                        ],
                                        proxy: {
                                            type: "ajax",
                                            disableCaching: false,
                                            noCache: false,

                                            headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
                                            actionMethods: { read: "POST" },
                                            url: vconfig.service_api + "goods_stuffing/goods_stuffings",
                                            extraParams: {
                                                method: "read_detail_delivery_instruction",
                                                module: "goods_stuffing",
                                            },
                                            reader: {
                                                type: "json",
                                                rootProperty: "Rows",
                                                totalProperty: "TotalRows",
                                                successProperty: "success",
                                            },
                                        },
                                        listeners: {
                                            beforeload: function (store, operation, eOpts) {
                                                try {
                                                    var GRID = Ext.ComponentQuery.query("goods_stuffing GRIDgoods_stuffing grid[pid=GRIDgoods_stuffing]")[0];
                                                    var docNo = GRID.getSelectionModel().getSelection()[0].data.DOCUMENT_NO;
                                                    operation.setParams({
                                                        DOCUMENT_NO: docNo,
                                                    });
                                                    var label = Ext.ComponentQuery.query("FRMgoods_stuffing_details field[pid=INVOICE_NO]")[0];
                                                    label.setValue(docNo);
                                                    //Ext.ComponentQuery.query('#DocumentNo')[0].setFieldLabel(docNo);
                                                } catch (ex) {
                                                    COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                                                }
                                            },
                                        },
                                    },
                                    columns: [
                                        {
                                            xtype: "rownumberer", width: 50, summaryRenderer: function (value, summaryData, dataIndex) {
                                                return '<span style="font-weight:bold;font-size:11px;">TOTAL</span>';
                                            },
                                        },
                                        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "DOCUMENT NO", dataIndex: "DOCUMENT_NO" },
                                        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "DOCUMENT DATE", dataIndex: "DOCUMENT_DATE" },
                                        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "ARTICLE CODE", dataIndex: "ARTICLE_CODE" },
                                        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "PART NAME", dataIndex: "PART_NAME" },
                                        {
                                            sortable: true, width: 100, align: "right", renderer: "formatqty", header: "QTY", dataIndex: "QTY", summaryType: "sum",
                                            summaryRenderer: function (value, summaryData, dataIndex) {
                                                return '<span style="font-weight:bold;font-size:11px;">' + Ext.util.Format.number(value, "0,000.00/i") + "</span>";
                                            },
                                        },
                                        {
                                            sortable: true, width: 100, align: "right", renderer: "formatqty", header: "MPQ", dataIndex: "PART_MPQ", summaryType: "sum",
                                            summaryRenderer: function (value, summaryData, dataIndex) {
                                                return '<span style="font-weight:bold;font-size:11px;">' + Ext.util.Format.number(value, "0,000.00/i") + "</span>";
                                            },
                                        },
                                    ],

                                    bbar: {
                                        xtype: "pagingtoolbar",
                                        displayInfo: true,
                                        displayMsg: "Displaying items {0} - {1} of {2}",
                                        emptyMsg: "No topics to display",
                                    },

                                },
                            ],
                        },
                        { xtype: "tbspacer", width: 5 },
                        {
                            xtype: "container",
                            layout: { type: "vbox", pack: "start", align: "stretch" },
                            flex: 1,
                            items: [
                                {
                                    xtype: "form",
                                    bodyPadding: "5 5 5 5",
                                    fieldDefaults: {
                                        labelAlign: "left",
                                        labelWidth: 70,
                                        margin: "0 10 5 0",
                                    },
                                    border: false,
                                    layout: { type: "hbox", pack: "start", align: "stretch" },
                                    items: [{
                                        xtype: "container",
                                        layout: "hbox",
                                        height: 30,
                                        items: [
                                            { xtype: "datefield", labelWidth: 150, width: 230, fieldLabel: "PICKING DATE & NO", name: "PICKING_DATE", fieldCls: "fieldlock", readOnly: true, format: "Y-m-d" },
                                            { xtype: "tbspacer", width: 10 },
                                            { xtype: "textfield", width: 250, name: "PICKING_NO", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "NO BUKTI" },
                                            {
                                                xtype: "button",
                                                pid: "btsearch",
                                                module: "goods_stuffing",
                                                popupwidth: 900,
                                                tofield: {
                                                    PICKING_DATE: "PICKING_DATE",
                                                    PICKING_NO: "PICKING_NO",
                                                },
                                                icon: vconfig.getstyle + "icon/search.ico",
                                                tooltip: "search",
                                            },
                                        ],
                                    },
                                    ],
                                },
                                {
                                    xtype: "grid",
                                    pid: "GRIDFRM_good_picking_list",
                                    emptyText: "No Matching Records",
                                    flex: 1,

                                    store: {
                                        fields: [
                                            { name: "NO_DRAFT", type: "string" },
                                            { name: "NO_BUKTI", type: "string" },
                                            { name: "TANGGAL", type: "string" },
                                            { name: "CUSTOMER_INVOICE", type: "string" },
                                            { name: "QTY_PICKING", type: "int" },
                                        ],
                                    },
                                    plugins: ["filterfield"],
                                    viewConfig: {
                                        enableTextSelection: true,
                                    },
                                    columns: [
                                        {
                                            xtype: "actioncolumn",
                                            width: 35,
                                            align: "center",
                                            menuDisabled: true,
                                            sortable: false,
                                            items: [
                                                {
                                                    icon: vconfig.getstyle + "icon/delete.ico",
                                                    tooltip: "Hapus Data",
                                                    handler: function (xgrid, rowIndex, colIndex, e, a, rec) {
                                                        try {
                                                            console.log(rec);
                                                            Ext.MessageBox.confirm(
                                                                "Konfirmasi",
                                                                "Konfirmasi Hapus Dokumen:" + rec.data.NOMOR_DOKUMEN,
                                                                function (button) {
                                                                    if (button === "yes") {
                                                                        xgrid.getStore().removeAt(rowIndex);
                                                                        xgrid.getStore().commitChanges();
                                                                    }
                                                                },
                                                                this
                                                            );
                                                        } catch (ex) {
                                                            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                                                        }
                                                    },
                                                },
                                            ],
                                        },
                                        { xtype: "rownumberer", width: 50 },
                                        { header: "NO DRAFT", dataIndex: "NO_DRAFT", sortable: true, width: 100, filter: { xtype: "textfield" } },
                                        { header: "NO BUKTI", dataIndex: "NO_BUKTI", sortable: true, width: 150, filter: { xtype: "textfield" } },
                                        { header: "PICKING DATE", dataIndex: "TANGGAL", sortable: true, width: 150, filter: { xtype: "textfield", format: "Y-m-d" } },
                                        { header: "CUSTOMER", dataIndex: "CUSTOMER_INVOICE", sortable: true, width: 200, filter: { xtype: "textfield" } },
                                        { header: "QTY", dataIndex: "QTY_PICKING", sortable: true, width: 100, filter: { xtype: "textfield" } },
                                        /*
                                        { header: "KODE BARANG", dataIndex: "KODE_BARANG_INVOICE", sortable: true, width: 100, filter: { xtype: "textfield" } },
                                        { header: "LOT", dataIndex: "KODE_LOT", sortable: true, width: 100, filter: { xtype: "textfield" } }, */
                                    ],
                                    tbar: [
                                        {
                                            xtype: "button",
                                            pid: "btsearch_picking",
                                            text: "Pilih picking",
                                            icon: vconfig.getstyle + "icon/search.ico",
                                            tooltip: "Pilih Picking",
                                            handler: "btsearch_picking_click",
                                        },
                                    ],
                                },
                                {
                                    xtype: "grid",
                                    pid: "GRIDFRM_goods_picking",
                                    emptyText: "No Matching Records",
                                    flex: 1,
                                    plugins: ["filterfield", { ptype: "cellediting", clicksToEdit: 1 }],
                                    viewConfig: {
                                        enableTextSelection: true,
                                    },
                                    features: [
                                        {
                                            ftype: "summary",
                                            dock: "bottom",
                                        },
                                    ],
                                    columns: [
                                        { xtype: "rownumberer", width: 50 },
                                        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NO BUKTI", dataIndex: "NO_BUKTI" },
                                        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TANGGAL", dataIndex: "TANGGAL" },
                                        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE BARANG", dataIndex: "KODE_BARANG_INVOICE" },
                                        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "LOT NO", dataIndex: "KODE_LOT" },
                                        {
                                            sortable: true, width: 100, align: "right", renderer: "formatqty", header: "QTY", dataIndex: "QTY_PICKING", summaryType: "sum",
                                            summaryRenderer: function (value, summaryData, dataIndex) {
                                                return '<span style="font-weight:bold;font-size:11px;">' + Ext.util.Format.number(value, "0,000.00/i") + "</span>";
                                            },
                                        },
                                        { sortable: true, width: 100, align: "right", header: "CUSTOMER", dataIndex: "CUSTOMER_INVOICE" },
                                    ],
                                    bbar: {
                                        xtype: "pagingtoolbar",
                                        displayInfo: true,
                                        displayMsg: "Displaying topics {0} - {1} of {2}",
                                        emptyMsg: "No topics to display",
                                    },
                                },
                            ],
                        },
                    ],
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
                    pid: "FRM_goods_stuffing_btsave",
                    icon: vconfig.getstyle + "icon/save.gif",
                    tooltip: "Save Data",
                    handler: "FRM_goods_stuffing_btsave_click",
                },
            ],
        },
    ],
});
