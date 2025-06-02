Ext.define("NJC.INVENTORY_PLB.goods_stuffing.Cgoods_stuffing", {
    extend: "Ext.app.ViewController",
    alias: "controller.Cgoods_stuffing",
    init: function (view) {
        this.control({
            "goods_stuffing button[pid=btstuffing_manual]": { click: this.btnew_click },
            "goods_stuffing button[pid=btstuffing_integrasi]": { click: this.btstuffing_integrasi_click },
            "goods_stuffing button[pid=btrefresh_main]": { click: this.btrefresh_main_click },

            "FRMgoods_stuffing_details button[pid=btsearch]": { click: this.btsearch_click },
            "FRMgoods_stuffing_details button[pid=btsearch_rack]": { click: this.btsearch_rack_click },
            "FRMgoods_stuffing_details combobox[name=CBO_SOURCE]": { change: this.CBO_SOURCE_change },
            "FRMgoods_stuffing_details button[pid=FRM_goods_stuffing_btsave]": { click: this.FRM_goods_stuffing_btsave_click },
        });
        this.listen({
            store: {},
        });
        this.var_global = {
            jwt: localStorage.getItem("ST_NJC_JWT_PLB"),
        };
        this.var_definition = {};
        this.renderpage();
    },
    formatqty: function (value) {
        var text = Ext.util.Format.number(value, "0,000.00/i");
        return text;
    },
    formatAmount: function (value) {
        var text = Ext.util.Format.number(value, "0,000.00/i");
        return text;
    },
    formatDate: function (value) {
        var text = Ext.util.Format.date(value, "Y-m-d");
        return text;
    },

    formatDateTime: function (value) {
        var text = Ext.util.Format.date(value, "Y-m-d h:m:s");
        return text;
    },
    refs: [
        { ref: 'FRMgoods_stuffing_details', selector: 'FRMgoods_stuffing_details', },
    ],
    renderpage: function () {
        try {
            console.log("rendered " + this.alias);
        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    GRIDgoods_stuffing_load: function (grid) {
        try {
            var me = this;
        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    btrefresh_click: function () {
        try {
            var GRID = Ext.ComponentQuery.query("goods_stuffing GRIDgoods_stuffing grid[pid=GRIDgoods_stuffing]")[0];
            GRID.getStore().load();
        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    btdetail_rows_click1: function (xgrid, rowIndex) {
        try {
            xgrid.getSelectionModel().select(rowIndex);
            var me = this;
            var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

            var popup = Ext.define("NJC.INVENTORY_PLB.goods_stuffing.FRMgoods_stuffing_instruction_detail", {
                extend: "Ext.window.Window",
                alias: "widget.FRMgoods_stuffing_instruction_detail",
                reference: "FRMgoods_stuffing_instruction_detail",
                title: "Stuffing Goods for Delivery",
                modal: true,
                closeAction: "destroy",
                centered: true,
                autoScroll: false,
                width: mainpanel.getWidth() * 0.9,
                height: mainpanel.getHeight() * 0.9,
                layout: { type: "vbox", pack: "start", align: "stretch" },
                bodyStyle: "background:#FFFFFF;background-color:#FFFFFF; margin:1px;",
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
                        items: [
                            {
                                xtype: "container",
                                layout: "vbox",
                                flex: 1,
                                items: [
                                    {
                                        xtype: "container",
                                        layout: "hbox",
                                        items: [
                                            { xtype: "datefield", labelWidth: 150, width: 230, fieldLabel: "PICKING DATE & NO", name: "PICKING_DATE", fieldCls: "fieldlock", readOnly: true, format: "Y-m-d" },
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
                        ],
                    },
                    { xtype: "tbspacer", height: 10 },
                    {
                        xtype: "container",
                        layout: { type: "hbox", pack: "start", align: "stretch" },
                        flex: 1,
                        items: [
                            {
                                xtype: "grid",
                                pid: "GRIDFRM_goods_stuffing",
                                emptyText: "No Matching Records",
                                flex: 1,
                                autoLoad: true,
                                remoteSort: true,
                                remoteFilter: true,
                                pageSize: 25,
                                plugins: ["filterfield"],
                                viewConfig: {
                                    enableTextSelection: true,
                                },
                                store: {
                                    autoLoad: true,
                                    remoteSort: true,
                                    remoteFilter: true,
                                    pageSize: 0,
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
                                                var vdt = GRID.getSelectionModel().getSelection()[0].data;
                                                operation.setParams({
                                                    DOCUMENT_NO: vdt.DOCUMENT_NO,
                                                });
                                            } catch (ex) {
                                                COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                                            }
                                        },
                                    },
                                },
                                columns: [
                                    { xtype: "rownumberer", width: 50 },
                                    { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "DOCUMENT NO", dataIndex: "DOCUMENT_NO" },
                                    { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "DOCUMENT DATE", dataIndex: "DOCUMENT_DATE" },
                                    { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "ARTICLE CODE", dataIndex: "ARTICLE_CODE" },
                                    { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "PART NAME", dataIndex: "PART_NAME" },
                                    { sortable: true, width: 100, align: "right", renderer: "formatqty", header: "QTY", dataIndex: "QTY" },
                                    { sortable: true, width: 100, align: "right", renderer: "formatqty", header: "MPQ", dataIndex: "PART_MPQ" },
                                ],

                                bbar: {
                                    xtype: "pagingtoolbar",
                                    displayInfo: true,
                                    displayMsg: "Displaying topics {0} - {1} of {2}",
                                    emptyMsg: "No topics to display",
                                },
                                tbar: [
                                    {
                                        xtype: "displayfield",
                                        value: "menampilkan Item/Part dalam 1 dokumen",
                                    },
                                    "->",
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
            COMP.run.getmodulepopup("FRMgoods_stuffing_instruction_detail", popup, mainpanel);
        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    btdetail_rows_click: function (xgrid, rowIndex) {
        try {
            //var GRID = Ext.ComponentQuery.query("goods_stuffing GRIDgoods_stuffing grid[pid=GRIDgoods_stuffing]")[0];
            xgrid.getSelectionModel().select(rowIndex);
            var me = this;
            var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
            var popup = "NJC.INVENTORY_PLB.goods_stuffing.FRMgoods_stuffing_details";
            COMP.run.getmodulepopup("FRMgoods_stuffing_details", "NJC.INVENTORY_PLB.goods_stuffing.FRMgoods_stuffing_details", mainpanel);
        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    GRIDFRM_goods_stuffing_load1: function () {
        try {
            var STGRIDnew = new Ext.data.Store({
                autoLoad: true,
                remoteSort: true,
                remoteFilter: true,
                pageSize: 15,
                proxy: {
                    type: "ajax",
                    disableCaching: false,
                    noCache: false,
                    headers: { Authorization: "Bearer" },
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
            });

            var GRID = Ext.ComponentQuery.query("FRMgoods_stuffing_details grid[pid=GRIDFRM_goods_stuffing]")[0];
            GRID.reconfigure(STGRIDnew);
        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    btsearch_click: function (btn) {
        try {
            var me = this;
            var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
            var FRM_MAIN = Ext.ComponentQuery.query("FRMgoods_stuffing_details form")[0];
            var MAIN_dtval = FRM_MAIN.getValues(false, false, false, true);
            var popup = Ext.define("NJC.INVENTORY_PLB.goods_stuffing.popup_list_source", {
                extend: "Ext.window.Window",
                alias: "widget.popup_list_source",
                reference: "popup_list_source",
                title: "Search Picking Data",
                modal: true,
                closeAction: "destroy",
                centered: true,
                autoScroll: false,
                width: mainpanel.getWidth() * 0.85,
                height: mainpanel.getHeight() * 0.7,
                layout: { type: "vbox", pack: "start", align: "stretch" },
                bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
                items: [
                    {
                        xtype: "grid",
                        pid: "GRIDpopup_search",
                        emptyText: "No Matching Records",
                        plugins: ["filterfield", { ptype: "cellediting", clicksToEdit: 1 }],
                        flex: 1,
                        height: 200,
                        store: {
                            autoLoad: true,
                            autoSync: false,
                            remoteSort: true,
                            remoteFilter: true,
                            pageSize: 15,
                            proxy: {
                                type: "ajax",
                                disableCaching: false,
                                noCache: false,
                                headers: { Authorization: "Bearer " + me.var_global.jwt },
                                actionMethods: { read: "POST" },
                                url: vconfig.service_api + "goods_stuffing/goods_stuffings",
                                reader: {
                                    type: "json",
                                    rootProperty: "Rows",
                                    totalProperty: "TotalRows",
                                    successProperty: "success",
                                },
                            },
                            listeners: {
                                beforeload: function (store, operation, eOpts) {
                                    operation.setParams({
                                        method: "read_list_source_picking",
                                    });
                                },
                            },
                        },
                        viewConfig: {
                            enableTextSelection: true,
                        },
                        columns: [
                            { xtype: "rownumberer", width: 50 },
                            { header: "PICKING DATE", dataIndex: "TANGGAL", sortable: true, width: 150, filter: { xtype: "textfield", format: "Y-m-d" } },
                            { header: "NO BUKTI", dataIndex: "NO_BUKTI", sortable: true, width: 150, filter: { xtype: "textfield" } },
                            { header: "CUSTOMER", dataIndex: "CUSTOMER_INVOICE", sortable: true, width: 200, filter: { xtype: "textfield" } },
                            { header: "NO DRAFT", dataIndex: "NO_DRAFT", sortable: true, width: 100, filter: { xtype: "textfield" } },
                            { header: "KODE BARANG", dataIndex: "KODE_BARANG_INVOICE", sortable: true, width: 100, filter: { xtype: "textfield" } },
                            { header: "LOT", dataIndex: "KODE_LOT", sortable: true, width: 100, filter: { xtype: "textfield" } },
                            { header: "QTY", dataIndex: "QTY_PICKING", sortable: true, width: 100, filter: { xtype: "textfield" } },
                        ],
                        listeners: {
                            itemdblclick: "GRIDpopup_list_source_itemdblclick",
                        },
                        bbar: {
                            xtype: "pagingtoolbar",
                            displayInfo: true,
                            displayMsg: "Total Data {2}",
                            emptyMsg: "No topics to display",
                        },
                    },
                ],
            });
            COMP.run.getmodulepopup("popup_list_source", popup, this.getView());
        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    GRIDpopup_list_source_itemdblclick: function (cmp, rec) {
        try {
            var me = this;
            var popup = Ext.ComponentQuery.query("popup_list_source")[0];
            var FRM_MAIN = Ext.ComponentQuery.query("FRMgoods_stuffing_details form")[0];
            var GRID = Ext.ComponentQuery.query("FRM_goods_racking grid[pid=GRIDFRM_goods_racking]")[0];
            var MAIN_dtval = FRM_MAIN.getValues(false, false, false, true);
            var params = Ext.encode({
                method: "racking_select_invoice",
                module: MAIN_dtval.CBO_SOURCE,
                INVOICE_NO: rec.data.INVOICE_NO,
            });
            var hasil = COMP.run.getservice(vconfig.service_api + "goods_racking/goods_racking", params, "POST", me.var_global.jwt);
            hasil.then(function (content) {
                var val = Ext.decode(content, true);
                if (val.success === "true") {
                    COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 3000 });
                    var vjsondata = Ext.decode(val.vjson_data);
                    FRM_MAIN.getForm().setValues({
                        RECEIPT_DATE: rec.data.RECEIPT_DATE,
                        INVOICE_NO: rec.data.INVOICE_NO,
                    });
                    var vnstore = new Ext.data.Store({
                        field: [
                            { name: "INVOICE_NO", type: "string" },
                            { name: "ARTICLE_CODE", type: "string" },
                            { name: "LOT_NO", type: "string" },
                            { name: "PUTAWAY_QTY", type: "float" },
                            { name: "CURRENT_RACK", type: "string" },
                        ],
                        data: vjsondata,
                    });
                    GRID.reconfigure(vnstore);
                    popup.close();
                } else {
                    COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 3000 });
                }
            }, this);
        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
});