Ext.define("NJC.INVENTORY_PLB.goods_delivery.Cgoods_delivery", {
    extend: "Ext.app.ViewController",
    alias: "controller.Cgoods_delivery",
    init: function (view) {
        this.control({
            "goods_delivery button[pid=btrefresh_main]": { click: this.btrefresh_main_click },
            "goods_delivery button[pid=btapprove]": { click: this.btapprove_click },
            //"FRMgoods_delivery_details grid[pid=GRIDFRM_good_picking_list]": { itemdblclick: this.GRIDFRM_good_picking_list_click },

            "FRMgoods_delivery_approve button[pid=btsearch]": { click: this.btsearch_click },
        });
        this.listen({
            store: {},
        });
        this.var_global = {
            jwt: localStorage.getItem("ST_NJC_JWT_PLB"),
            // INVOICENO: '',
            //TENANT_INVOICENO: '',
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
            var GRID = Ext.ComponentQuery.query("goods_delivery GRIDgoods_delivery grid[pid=GRIDgoods_delivery]")[0];

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
    btapprove_click: function (xgrid, rowIndex, colIndex, e, a, rec) {
        try {
            //var GRID = Ext.ComponentQuery.query("goods_delivery GRIDgoods_delivery grid[pid=GRIDgoods_delivery]")[0];
            var me = this;
            xgrid.getSelectionModel().select(rowIndex);
            var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
            var GRID = Ext.ComponentQuery.query("goods_delivery GRIDgoods_delivery grid[pid=GRIDgoods_delivery]")[0];
            var datas = GRID.getSelectionModel().getSelection()[0].data;

            if (datas.SURAT_JALAN == '' || datas.SURAT_JALAN === null) {
                //console.log(datas);
                var popup = "NJC.INVENTORY_PLB.goods_delivery.FRMgoods_delivery_approve";
                console.log("delivery Approve ");
                COMP.run.getmodulepopup("FRMgoods_delivery_approve", "NJC.INVENTORY_PLB.goods_delivery.FRMgoods_delivery_approve", mainpanel);
            } else {
                /*
                var popup = "NJC.INVENTORY_PLB.goods_delivery.FRMgoods_delivery_details";
                COMP.run.getmodulepopup("FRMgoods_delivery_details", "NJC.INVENTORY_PLB.goods_delivery.FRMgoods_delivery_details", mainpanel);
                */
                me.load_frmdelivery_details(xgrid, rowIndex, colIndex, e, a, rec);
                console.log("delivery Details ");
                //console.log("delivery details ");
            }

        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    load_frmdelivery_details: function (xgrid, rowIndex, colIndex, e, a, rec) {
        try {
            var me = this;
            xgrid.getSelectionModel().select(rowIndex);
            var vdt = rec.data;
            //console.log("delivery details ");
            var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
            var popup = Ext.ComponentQuery.query("FRMgoods_delivery_details")[0];
            //console.log(popup);
            if (!popup) {
                popup = Ext.create("NJC.INVENTORY_PLB.goods_delivery.FRMgoods_delivery_details");
                popup.on(
                    "show",
                    function () {
                        try {
                            var params = Ext.encode({
                                method: "view_details",
                                module: "LOAD_DATA",
                                INVOICENO: vdt.INVOICE_NO,
                                TENANT_INVOICENO: vdt.TENANT_INVOICE_NO,
                                VHEADER: "[]",
                                VGRID: "[]",
                            });
                            var hasil = COMP.run.getservice(vconfig.service_api + "goods_delivery/goods_delivery", params, "POST", me.var_global.jwt);
                            hasil.then(function (content) {
                                var val = Ext.decode(content, true)[0];
                                //console.log(content);

                                if (val.success === "true") {
                                    COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 2000 });
                                    //console.log(VHEADER);

                                    if (val.VHEADER !== null) {
                                        var B_HEADER = Ext.decode(val.VHEADER, true);
                                        var FRM = popup.query("form")[0];
                                        FRM.getForm().setValues({
                                            NOMORDOKUMEN: B_HEADER.NOMORDOKUMEN,
                                            TENANT_INVOICE_NO: B_HEADER.TENANT_INVOICE_NO,
                                            INVOICE_NO: B_HEADER.INVOICE_NO,
                                            TENANT: B_HEADER.TENANT,
                                            TENANT_NAME: B_HEADER.TENANT_NAME,
                                            CLIENT: B_HEADER.CLIENT,
                                            CLIENT_NAME: B_HEADER.CLIENT_NAME,
                                            TANGGAL_SURAT_JALAN: B_HEADER.TANGGAL_SURAT_JALAN,
                                            SURAT_JALAN: B_HEADER.SURAT_JALAN,
                                            OUT_BC_TYPE: B_HEADER.OUT_BC_TYPE,
                                            OUT_TANGGAL_AJU: B_HEADER.OUT_TANGGAL_AJU,
                                            OUT_TANGGAL_DAFTAR: B_HEADER.OUT_TANGGAL_DAFTAR,
                                            OUT_NOMOR_AJU: B_HEADER.OUT_NOMOR_AJU,
                                            OUT_NOMOR_DAFTAR: B_HEADER.OUT_NOMOR_DAFTAR,
                                            OUT_NOMOR_AJU: B_HEADER.OUT_NOMOR_AJU,
                                            TRANS_DATE: B_HEADER.TRANS_DATE,
                                            TRANS_NO: B_HEADER.TRANS_NO,
                                        });

                                        //FRM.getForm().setValues(INVOICE_NO) = VHEADER.INVOICE_NO
                                        //console.log("invoice " + VHEADER.INVOICE_NO);
                                    }

                                    if (val.VGRID !== null) {
                                        var B_DOKUMEN = Ext.decode(val.VGRID, true);
                                        var GRIDdelivery_instruction_invoice = popup.query("grid[pid=GRIDdelivery_instruction_invoice]")[0];
                                        Ext.Array.each(B_DOKUMEN, function (rec) {
                                            GRIDdelivery_instruction_invoice.getStore().add(rec);

                                            //GRIDdelivery_instruction_invoice.load();
                                        });
                                    }
                                } else {
                                    COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 2000 });
                                }
                            }, this);
                        } catch (ex) {
                            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                        }
                    },
                    this
                );
            }
            return popup.show();
        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    /*
        btdetail_rows_click: function (xgrid, rowIndex) {
            try {
                //var GRID = Ext.ComponentQuery.query("goods_delivery GRIDgoods_delivery grid[pid=GRIDgoods_delivery]")[0];
                xgrid.getSelectionModel().select(rowIndex);
                var me = this;
                var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
                var popup = "NJC.INVENTORY_PLB.goods_delivery.FRMgoods_delivery_approve";
                COMP.run.getmodulepopup("FRMgoods_delivery_approve", "NJC.INVENTORY_PLB.goods_delivery.FRMgoods_delivery_approve", mainpanel);
            } catch (ex) {
                COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
            }
        },
    */
    /*
    FRMgoods_delivery_approve_load: function () {
        var GRID = Ext.ComponentQuery.query("goods_delivery GRIDgoods_delivery grid[pid=GRIDgoods_delivery]")[0];
        var datas = GRID.getSelectionModel().getSelection()[0].data;
        var FRM = Ext.ComponentQuery.query("FRMgoods_delivery_approve form")[0];
        var valme = FRM.getValues(false, false, false, true);
        FRM.getForm().setValues({
            INVOICENO: datas.INVOICE_NO,
            TENANT_INVOICENO: datas.TENANT_INVOICE_NO,
        });



    },
    */
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
    },


    btsearch_click: function (btn) {
        try {
            var me = this;
            var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
            var FRM = Ext.ComponentQuery.query("FRMgoods_delivery_approve form")[0];
            var valme = FRM.getValues(false, false, false, true);
            //console.log(" ada d" + valme);
            //this.INVOICENO = valme.INVOICE_NO;
            //this.TENANT_INVOICENO = valme.TENANT_INVOICE_NO;
            var popup = Ext.define("TDK.INVENTORY_PLB.goods_delivery.FRMgoods_delivery_approve.popup_btsearch", {
                extend: "Ext.window.Window",
                alias: "widget.popup_btsearch",
                reference: "popup_btsearch",
                title: btn.vdata.title,
                modal: true,
                closeAction: "destroy",
                centered: true,
                controller: "Cgoods_delivery",
                width: mainpanel.getWidth() * btn.vdata.popupwidth,
                height: mainpanel.getHeight() * btn.vdata.popupheight,
                layout: { type: "vbox", pack: "start", align: "stretch" },
                bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
                items: [
                    {
                        xtype: "grid",
                        pid: "GRIDpopup_search",
                        emptyText: "No Matching Records",
                        autoScroll: true,
                        flex: 1,
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
                                url: vconfig.service_api + "goods_delivery/goods_deliverys",
                                extraParams: {
                                    method: "read_bc_list",
                                    module: "aw",
                                    INVOICENO: valme.INVOICENO,
                                    TENANT_INVOICENO: valme.TENANT_INVOICENO,
                                },
                                reader: {
                                    type: "json",
                                    rootProperty: "Rows",
                                    totalProperty: "TotalRows",
                                    successProperty: "success",
                                },
                            },
                        },
                        columns: [
                            { xtype: "rownumberer", width: 40 },
                            { header: "CLIENT", dataIndex: "CLIENT", sortable: true, width: 90, filter: { xtype: "textfield" } },
                            { header: "CLIENT_NAME", dataIndex: "CLIENT_NAME", sortable: true, width: 250, filter: { xtype: "textfield" } },
                            { header: "OUT_BC_TYPE", dataIndex: "OUT_BC_TYPE", sortable: true, width: 50, filter: { xtype: "textfield" } },
                            { header: "OUT_NOMOR_AJU", dataIndex: "OUT_NOMOR_AJU", sortable: true, width: 250, filter: { xtype: "textfield" } },
                            { header: "OUT_TANGGAL_AJU", dataIndex: "OUT_TANGGAL_AJU", sortable: true, width: 100, filter: { xtype: "textfield" } },
                            { header: "TENANT", dataIndex: "TENANT", sortable: true, width: 90, filter: { xtype: "textfield" } },
                            { header: "TENANT_NAME", dataIndex: "TENANT_NAME", sortable: true, width: 250, filter: { xtype: "textfield" } },
                            { header: "NOMORDOKUMEN", dataIndex: "NOMORDOKUMEN", sortable: true, width: 150, filter: { xtype: "textfield" } },
                            { header: "TANGGALDOKUMEN", dataIndex: "TANGGALDOKUMEN", sortable: true, width: 100, filter: { xtype: "textfield" } },
                        ],
                        bbar: {
                            xtype: "pagingtoolbar",
                            displayInfo: true,
                            displayMsg: "Total Data {2}",
                            emptyMsg: "No topics to display",
                        },
                        listeners: {
                            itemdblclick: function (grid, rec) {
                                var FRM = Ext.ComponentQuery.query("FRMgoods_delivery_approve form")[0];
                                console.log("double clicked " + FRM.title);
                                var popup = Ext.ComponentQuery.query("popup_btsearch")[0];
                                FRM.getForm().setValues({
                                    TENANT: rec.data.TENANT,
                                    TENANT_NAME: rec.data.TENANT_NAME,
                                    CLIENT: rec.data.CLIENT,
                                    CLIENT_NAME: rec.data.CLIENT_NAME,
                                    OUT_BC_TYPE: rec.data.OUT_BC_TYPE,
                                    OUT_TANGGAL_AJU: rec.data.OUT_TANGGAL_AJU,
                                    OUT_NOMOR_AJU: rec.data.OUT_NOMOR_AJU,
                                    OUT_NOMOR_DAFTAR: rec.data.OUT_NOMOR_DAFTAR,
                                    OUT_TANGGAL_DAFTAR: rec.data.OUT_TANGGAL_DAFTAR,
                                    NOMORDOKUMEN: rec.data.NOMORDOKUMEN,
                                });
                                popup.close();
                            }
                        },
                    },
                ],
            });

            COMP.run.getmodulepopup("popup_btsearch", popup, this.getView());
        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    save_delivery: function () {
        try {
            var me = this;
            var FRM = Ext.ComponentQuery.query("FRMgoods_delivery_approve form")[0];
            var popup = Ext.ComponentQuery.query("FRMgoods_delivery_approve")[0];
            var dtval = FRM.getValues(false, false, false, true);
            if (dtval.TANGGAL_SURAT_JALAN === "") {
                COMP.TipToast.toast("Error", "Masukan Tanggal Surat Jalan lebih dulu", { cls: "danger", delay: 2000 });
                return false;
            }
            if (dtval.SURAT_JALAN === "") {
                COMP.TipToast.toast("Error", "Masukan Surat Jalan lebih dulu", { cls: "danger", delay: 2000 });
                return false;
            }
            if (dtval.OUT_NOMOR_DAFTAR === "") {
                COMP.TipToast.toast("Error", "Pilih Dokumen BC lebih dulu", { cls: "danger", delay: 2000 });
                return false;
            }
            if (dtval.OUT_TANGGAL_DAFTAR === "") {
                COMP.TipToast.toast("Error", "Pilih Dokumen BC lebih dulu", { cls: "danger", delay: 2000 });
                return false;
            }
            var vform = {
                MODULE_SOURCE: "PLB",
                OUT_NOMOR_DAFTAR: dtval.OUT_NOMOR_DAFTAR,
                OUT_TANGGAL_DAFTAR: dtval.OUT_TANGGAL_DAFTAR,
                OUT_NOMOR_AJU: dtval.OUT_NOMOR_AJU,
                OUT_TANGGAL_AJU: dtval.OUT_TANGGAL_AJU,
                OUT_BC_TYPE: dtval.OUT_BC_TYPE,
                NOMORDOKUMEN: dtval.NOMORDOKUMEN,
                SURAT_JALAN: dtval.SURAT_JALAN,
                TANGGAL_SURAT_JALAN: moment(dtval.TANGGAL_SURAT_JALAN).format("YYYY-MM-DD"),
            };

            var params = Ext.encode({
                method: "approve_delivery_out",
                header: Ext.encode(vform),
            });


            var hasil = COMP.run.getservice(vconfig.service_api + "goods_delivery/goods_delivery", params, "POST", me.var_global.jwt);
            hasil.then(function (content) {
                var val = Ext.decode(content, true);
                if (val.success == "true") {
                    COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 2000 });
                    popup.close();

                } else {
                    COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 2000 });
                }
                me.btrefresh_main_click();
            }, this);
        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }

    }

}); 