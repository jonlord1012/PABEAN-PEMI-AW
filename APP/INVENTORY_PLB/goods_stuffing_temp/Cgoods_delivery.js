Ext.define("NJC.INVENTORY_PLB.goods_delivery.Cgoods_delivery", {
    extend: "Ext.app.ViewController",
    alias: "controller.Cgoods_delivery",
    init: function (view) {
        this.control({
            "goods_delivery button[pid=btrefresh_main]": { click: this.btrefresh_main_click },
            "FRMgoods_delivery_details grid[pid=GRIDFRM_good_picking_list]": { itemdblclick: this.GRIDFRM_good_picking_list_click },

            //"FRMgoods_delivery_details button[pid=btsearch]": { click: this.btsearch_click },
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
    renderpage: function () {
        try {
            console.log("rendered " + this.alias);
        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
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

    GRIDgoods_delivery_load: function (grid) {
        try {
            var me = this;
        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    btrefresh_main_click: function () {
        try {
            var GRID = Ext.ComponentQuery.query("goods_delivery GRIDgoods_delivery grid[pid=GRIDgoods_delivery]")[0];
            GRID.getStore().load();
        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },

    btdetail_rows_click: function (xgrid, rowIndex) {
        try {
            //var GRID = Ext.ComponentQuery.query("goods_delivery GRIDgoods_delivery grid[pid=GRIDgoods_delivery]")[0];
            xgrid.getSelectionModel().select(rowIndex);
            var me = this;
            var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
            var popup = "NJC.INVENTORY_PLB.goods_delivery.FRMgoods_delivery_details";
            COMP.run.getmodulepopup("FRMgoods_delivery_details", "NJC.INVENTORY_PLB.goods_delivery.FRMgoods_delivery_details", mainpanel);
        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },

    btsearch_picking_click: function (btn) {
        try {
            var me = this;
            var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
            var GRIDFRM_good_picking_list = Ext.ComponentQuery.query("FRMgoods_delivery_details grid[pid=GRIDFRM_good_picking_list]")[0];
            var custNo = Ext.ComponentQuery.query("FRMgoods_delivery_details field[pid=CODE_CUSTOMER]")[0].value;

            var GRIDPicking = Ext.create("NJC.INVENTORY_PLB.goods_delivery.GRIDPicking", {
                store: {
                    autoLoad: true,
                    autoSync: false,
                    remoteSort: true,
                    remoteFilter: true,
                    pageSize: 20,

                    fields: [
                        { name: "NO_DRAFT", type: "string" },
                        { name: "NO_BUKTI", type: "string" },
                        { name: "TANGGAL", type: "string" },
                        { name: "CUSTOMER_INVOICE", type: "string" },
                        { name: "QTY_PICKING", type: "int" },
                    ],
                    proxy: {
                        type: "ajax",
                        disableCaching: false,
                        noCache: false,
                        headers: { Authorization: "Bearer " + me.var_global.jwt },
                        actionMethods: { read: "POST" },
                        url: vconfig.service_api + "goods_delivery/goods_deliverys",
                        reader: {
                            type: "json",
                            rootProperty: "Rows",
                            totalProperty: "TotalRows",
                            successProperty: "success",
                        },
                        extraParams: {
                            method: "read_list_source_picking",
                            CODE_CUSTOMER: custNo,
                        },
                    },
                    listeners: {
                        itemdblclick: "GRIDpopup_list_source_itemdblclick",
                    },
                    /*listeners: {
                        beforeload: function (store, operation, eOpts) {
                            operation.setParams({
                            });
                        },
                    },*/
                },
            });

            var popup = Ext.define("NJC.INVENTORY_PLB.goods_delivery.popup_list_source", {
                extend: "Ext.window.Window",
                alias: "widget.popup_list_source",
                reference: "popup_list_source",
                title: "Search Picking Data",
                modal: true,
                closeAction: "hide",
                centered: true,
                autoScroll: false,
                width: mainpanel.getWidth() * 0.85,
                height: mainpanel.getHeight() * 0.7,
                layout: { type: "vbox", pack: "start", align: "stretch" },
                bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
                items: [{ xtype: GRIDPicking },],
                dockedItems: [
                    {
                        xtype: "toolbar",
                        dock: "top",
                        items: [
                            //
                            { xtype: "tbspacer", width: 5 },
                            {
                                xtype: "button",
                                pid: "btselect_picking",
                                text: "Pilih Picking Doc",
                                icon: vconfig.getstyle + "icon/check.png",
                                tooltip: "Pilih Picking Doc",
                                cls: "fontblack-button",
                                //handler: "GRIDpopup_list_source_click",

                                handler: function (cmp) {
                                    try {
                                        //var myGrid = Ext.ComponentQuery.query(GRIDPicking)[0];
                                        //xgrid.getSelectionModel().select(rowIndex);
                                        var popup = Ext.ComponentQuery.query("popup_list_source")[0];
                                        //var GRIDFRM_good_picking_list = Ext.ComponentQuery.query("FRMgoods_delivery_details grid=[GRIDFRM_good_picking_list]")[0];

                                        var sm = GRIDPicking.getSelectionModel();
                                        var rs = sm.getSelection();

                                        if (rs.length < 1) {
                                            COMP.TipToast.toast("Error", "Pilih Picking Doc lebih dulu", { cls: "danger", delay: 2000 });
                                            return false;
                                        }
                                        Ext.each(rs, function (item) {
                                            var dtselect = item.data;

                                            var check_item = GRIDFRM_good_picking_list.getStore().findRecord("NO_DRAFT", dtselect.NO_DRAFT);
                                            // console.log(check_item);
                                            if (!check_item) {
                                                GRIDFRM_good_picking_list.getStore().add({
                                                    NO_DRAFT: dtselect.NO_DRAFT,
                                                    NO_BUKTI: dtselect.NO_BUKTI,
                                                    TANGGAL: dtselect.TANGGAL,
                                                    CUSTOMER_INVOICE: dtselect.CUSTOMER_INVOICE,
                                                    QTY_PICKING: dtselect.QTY_PICKING,
                                                });
                                            }
                                        });
                                        GRIDFRM_good_picking_list.getStore().commitChanges();
                                        popup.close();
                                    } catch (ex) {
                                        COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                                    }
                                },
                            },
                            "-",
                        ],
                        // other options....
                    },
                ],
            });
            //return popup.show();
            COMP.run.getmodulepopup("popup_list_source", popup, this.getView());
        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    GRIDpopup_list_source_click: function (cmp, rec) {
        try {
            var popup = Ext.ComponentQuery.query("GRIDPicking")[0];
            var sm = popup.getSelectionModel();
            var rs = sm.getSelection();
            if (rs.length < 1) {
                COMP.TipToast.toast("Error", "Pilih Picking Doc lebih dulu", { cls: "danger", delay: 2000 });
                return false;
            }
            Ext.each(rs, function (item) {
                var dtselect = item.data;
                var check_item = popup.getStore().findRecord("NO_DRAFT", dtselect.NO_DRAFT);
                if (!check_item) {
                    popup.getStore().add({
                        NO_DRAFT: dtselect.NO_DRAFT,
                        NO_BUKTI: dtselect.NO_BUKTI,
                        TANGGAL: dtselect.TANGGAL,
                        CUSTOMER_INVOICE: dtselect.CUSTOMER_INVOICE,
                        QTY_PICKING: dtselect.QTY_PICKING,
                    });
                }
            });
            popup.getStore().commitChanges();
            popup.close();
        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },

    good_picking_list_load: function (xgrid, rowIndex) {
        try {
            var me = this;
            xgrid.getSelectionModel().select(rowIndex);

            var GRIDFRM_good_picking_list = Ext.ComponentQuery.query("FRMgoods_delivery_details grid[pid=GRIDFRM_good_picking_list]")[0];
            //var MAIN_dtval = FRM_MAIN.getValues(false, false, false, true);
            //var custNo = Ext.ComponentQuery.query("FRMgoods_delivery_details field[pid=CODE_CUSTOMER]")[0].value;
            //var invNo = Ext.ComponentQuery.query("FRMgoods_delivery_details field[pid=INVOICE_NO]")[0].value;
            var GRID = Ext.ComponentQuery.query("goods_delivery GRIDgoods_delivery grid[pid=GRIDgoods_delivery]")[0];
            var vdt = GRID.getSelectionModel().getSelection()[0].data;
            var params = Ext.encode({
                method: "get_picked_picking_documents",
                CODE_CUSTOMER: vdt.CODE_CUSTOMER,
                INVOICE_NO: vdt.DOCUMENT_NO,
            });
            var hasil = COMP.run.getservice(vconfig.service_api + "goods_delivery/goods_delivery", params, "POST", me.var_global.jwt);
            hasil.then(function (content) {
                var val = Ext.decode(content, true);
                if (val.success === "true") {
                    COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 3000 });
                    var vjsondata = Ext.decode(val.vjson_data);

                    Ext.each(vjsondata, function (item) {
                        console.log(item);
                        GRIDFRM_good_picking_list.getStore().add({
                            NO_DRAFT: item.NO_DRAFT,
                            NO_BUKTI: item.NO_BUKTI,
                            TANGGAL: item.PICKING_DATE,
                            CUSTOMER_INVOICE: item.DOCUMENT_NO,
                            QTY_PICKING: item.SUPPLIED_QTY,
                        });
                    });
                    /*
                    var vnstore = new Ext.data.Store({
                        fields: [
                            { name: "QTY_PICKING", type: "float" },
                        ],
                        data: vjsondata,
                    });*/
                    GRIDFRM_good_picking_list.getStore().commitChanges();
                } else {
                    COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 3000 });
                }
            }, this);
        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    GRIDpopup_list_source_itemdblclick: function (xgrid, rowIndex) {
        try {
            var me = this;

            //var popup = Ext.ComponentQuery.query("popup_list_source")[0];
            //var FRM_MAIN = Ext.ComponentQuery.query("FRMgoods_delivery_details form")[0];
            var GRID = Ext.ComponentQuery.query("FRMgoods_delivery_details grid[pid=GRIDFRM_goods_picking_item]")[0];
            //var MAIN_dtval = FRM_MAIN.getValues(false, false, false, true);
            xgrid.getSelectionModel().select(rowIndex);
            var params = Ext.encode({
                method: "get_source_picking",
                NO_BUKTI: rec.data.NO_BUKTI,
                NO_DRAFT: rec.data.NO_DRAFT,
            });
            var hasil = COMP.run.getservice(vconfig.service_api + "goods_delivery/goods_delivery", params, "POST", me.var_global.jwt);
            hasil.then(function (content) {
                var val = Ext.decode(content, true);
                if (val.success === "true") {
                    COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 3000 });
                    var vjsondata = Ext.decode(val.vjson_data);
                    /*
                     FRM_MAIN.getForm().setValues({
                         PICKING_DATE: rec.data.TANGGAL,
                         PICKING_NO: rec.data.NO_BUKTI,
                     });*/
                    var vnstore = new Ext.data.Store({
                        fields: [
                            { name: "QTY_PICKING", type: "float" },
                        ],
                        data: vjsondata,
                    });
                    GRID.reconfigure(vnstore);
                } else {
                    COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 3000 });
                }
            }, this);
        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },

    GRIDFRM_good_picking_list_click: function (cmp, rec) {
        try {
            var me = this;
            var GRIDFRM_goods_picking_item = Ext.ComponentQuery.query("FRMgoods_delivery_details grid[pid=GRIDFRM_goods_picking_item]")[0];
            GRIDFRM_goods_picking_item.getStore().load();
        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    FRM_goods_delivery_btsave_click: function () {
        try {
            var me = this;
            var vgridPickingList = [];
            /*
            var groupBy = function (xs, key) {
                return xs.reduce(function (rv, x) {
                    (rv[x[key]] = rv[x[key]] || []).push(x);
                    return rv;
                }, {});
            };
            */

            var labelInvoice = Ext.ComponentQuery.query("FRMgoods_delivery_details field[pid=INVOICE_NO]")[0].value;
            var labelCustomer = Ext.ComponentQuery.query("FRMgoods_delivery_details field[pid=CODE_CUSTOMER]")[0].value;
            GRIDDeliveryInstruction = Ext.ComponentQuery.query("FRMgoods_delivery_details grid[pid=GRIDFRM_good_picking_list]")[0];
            GRIDDeliveryInstruction.getStore().getDataSource()
                .each(function (rec) {
                    vgridPickingList.push(rec.data);
                }
                );
            var params = Ext.encode({
                method: "saveDelivery_Picking",
                DOCUMENT_NO: labelInvoice,
                PICKING_LIST: Ext.encode(vgridPickingList),
            });
            console.log(Ext.encode(vgridPickingList));
            //return;
            var hasil = COMP.run.getservice(vconfig.service_api + "goods_delivery/goods_delivery", params, "POST", me.var_global.jwt);
            hasil.then(function (content) {
                var val = Ext.decode(content, true);
                if (val.success === "true") {
                    COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 3000 });
                    var vJsonHeader = Ext.decode(val.vjson_header);
                    var vJsonDetail = Ext.decode(val.vjson_detail);
                    console.log("vJsonHeader  " + vJsonHeader);
                    console.log("vJsonHeader  " + vJsonDetail);

                } else {
                    COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 3000 });
                }
            }, this);

            // var kodeBarang_grouped = Object.keys(groupBy(vDataDI, "PART_NAME")).data;
            // console.log("kodeBarang_grouped" + kodeBarang_grouped);
            // console.log(vDataDI);

        } catch (error) {
            COMP.TipToast.toast("ERROR", error.message, { cls: "danger", delay: 4000 });
        }
    }
});