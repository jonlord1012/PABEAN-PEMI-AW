Ext.define('TDK.masters.tarif.Ctarif', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Ctarif',
    init: function (view) {
        this.control({
            'tarif GRIDtarif': { afterrender: this.pagefirst_render },
            'tarif button[pid=btlist]': { click: this.btlist_click },
            'tarif button[pid=btnew]': { click: this.btnew_click },
            'tarif button[pid=btsave]': { click: this.btsave_click },
            'tarif button[pid=btdelete]': { click: this.btdelete_click },
            'tarif GRIDtarif grid[pid=GRIDtarif]': { itemdblclick: this.GRIDtarif_itemdblclick },

        });
        this.listen({
            store: {
                'STGRIDtarif': { beforeload: this.STGRIDtarif_beforeload }
            }

        });
        this.varglobal = [];
        this.renderpage();
    },
    renderpage: function () {
        try {

        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    GetActivepanel: function () {
        try {
            var panel = Ext.ComponentQuery.query('tarif panel[pid=paneltarif]')[0];
            var actindex = panel.getLayout().activeItem;
            var idx = panel.items.indexOf(actindex);
            return idx;
        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    SetActivepanel: function (val) {
        try {

            var panel = Ext.ComponentQuery.query('tarif panel[pid=paneltarif]')[0];
            panel.setActiveItem(val);

        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    pagefirst_render: function () {
        try {
            var mycook = Ext.decode(Ext.util.Cookies.get('NGC_account'));
            var vmain_tbar = Ext.ComponentQuery.query('tarif GRIDtarif toolbar[pid=tbar_tarif]')[0];
            var Vmaintab = Ext.ComponentQuery.query('mainpage Vmainpage tabpanel[pid=modmasterTAB]')[0];
            var activeTab = Vmaintab.getComponent('tarif');

            this.varglobal = ({
                moduleID: activeTab.xfunctions_id,
                userID: mycook.userID,
                userName: mycook.userName,
                jwt: mycook.jwt,
                itemId: activeTab.itemId,
                xfunctions_id: activeTab.xfunctions_id,
                xfunctions_name: activeTab.xfunctions_name,
                xfunctions_linkto: activeTab.xfunctions_linkto,
                setting: ({
                    api_read: vconfig.service_api + activeTab.xfunctions_linkto + 's',
                    api_create: vconfig.service_api + activeTab.xfunctions_linkto,
                    api_update: vconfig.service_api + activeTab.xfunctions_linkto,
                    api_delete: vconfig.service_api + activeTab.xfunctions_linkto

                })
            });

        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }

    },
    STGRIDtarif_beforeload: function (store, operation, eOpts) {
        try {
            var me = this;
            store.proxy.api.read = me.varglobal.setting.api_read;
            store.getProxy().setHeaders({
                Authorization: 'Bearer ' + me.varglobal.jwt
            });
        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    btlist_click: function () {
        try {
            this.SetActivepanel(0);
            var GRIDitem = Ext.ComponentQuery.query('tarif GRIDtarif grid[pid=GRIDtarif]')[0];
            GRIDitem.getStore().load();
        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    btnew_click: function () {
        try {
            this.SetActivepanel(1);
            var FRM = Ext.ComponentQuery.query('tarif FRMtarif')[0];
            FRM.getForm().reset();
        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    GRIDtarif_itemdblclick: function (grid, rec) {
        try {
            var vdt = rec.data;
            this.SetActivepanel(1);
            var FRM = Ext.ComponentQuery.query('tarif FRMtarif')[0];
            FRM.getForm().setValues({
                ID: vdt.ID,
                JENIS_TARIF_BM: vdt.JENIS_TARIF_BM,
                JENIS_TARIF_CUKAI: vdt.JENIS_TARIF_CUKAI,
                KODE_SATUAN_BM: vdt.KODE_SATUAN_BM,
                KODE_SATUAN_CUKAI: vdt.KODE_SATUAN_CUKAI,
                NOMOR_HS: vdt.NOMOR_HS,
                SERI_HS: vdt.SERI_HS,
                TARIF_BM: vdt.TARIF_BM,
                TARIF_CUKAI: vdt.TARIF_CUKAI,
                TARIF_PPH: vdt.TARIF_PPH,
                TARIF_PPN: vdt.TARIF_PPN,
                TARIF_PPNBM: vdt.TARIF_PPNBM

            });


        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    btsave_click: function () {
        try {
            var me = this;
            var FRM = Ext.ComponentQuery.query('tarif FRMtarif')[0];
            var dtval = FRM.getValues(false, false, false, true);

            if (this.Dovalidateinput() === false) {
                return false;
            }


            Ext.MessageBox.confirm('Confirm', 'Konfirmasi simpan data tarif', function (button) {
                if (button === 'yes') {
                    var params = {
                        validate: dtval.ID === 0 ? me.getcookies('create') : me.getcookies('update'),
                        form: Ext.encode(dtval)
                    };
                    var hasil = COMP.run.gethide(vconfig.service_data + 'tarif', params, 'POST');

                    hasil.then(function (content) {
                        var val = Ext.decode(content, true);
                        if (val.success === true) {
                            me.btlist_click();
                            COMP.TipToast.toast('Success', val.message, { cls: "success", delay: 3000 });
                        } else {
                            COMP.TipToast.toast('Error', 'Proses Failed', { cls: "error", delay: 3000 });
                        }

                    }, this);




                }
            }, this);



        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    Dovalidateinput: function () {
        try {
            var FRM = Ext.ComponentQuery.query('tarif FRMtarif')[0];
            var dtval = FRM.getValues(false, false, false, true);

            if (dtval.JENIS_TARIF_BM === "") {
                COMP.TipToast.toast("Error", "JENIS_TARIF_BM belum ada", { cls: "danger", delay: 2000 });
                Ext.ComponentQuery.query('tarif FRMtarif textfield[name=JENIS_TARIF_BM]')[0].markInvalid('Invalid');
                return false;
            }
            if (dtval.JENIS_TARIF_CUKAI === "") {
                COMP.TipToast.toast("Error", "JENIS_TARIF_CUKAI belum ada", { cls: "danger", delay: 2000 });
                Ext.ComponentQuery.query('tarif FRMtarif textfield[name=JENIS_TARIF_CUKAI]')[0].markInvalid('Invalid');
                return false;
            }
            if (dtval.KODE_SATUAN_BM === "") {
                COMP.TipToast.toast("Error", "KODE_SATUAN_BM belum ada", { cls: "danger", delay: 2000 });
                Ext.ComponentQuery.query('tarif FRMtarif textfield[name=KODE_SATUAN_BM]')[0].markInvalid('Invalid');
                return false;
            }
            if (dtval.KODE_SATUAN_CUKAI === "") {
                COMP.TipToast.toast("Error", "KODE_SATUAN_CUKAI belum ada", { cls: "danger", delay: 2000 });
                Ext.ComponentQuery.query('tarif FRMtarif textfield[name=KODE_SATUAN_CUKAI]')[0].markInvalid('Invalid');
                return false;
            }
            if (dtval.NOMOR_HS === "") {
                COMP.TipToast.toast("Error", "NOMOR_HS belum ada", { cls: "danger", delay: 2000 });
                Ext.ComponentQuery.query('tarif FRMtarif textfield[name=NOMOR_HS]')[0].markInvalid('Invalid');
                return false;
            }
            if (dtval.SERI_HS < 0) {
                COMP.TipToast.toast("Error", "SERI_HS belum ada", { cls: "danger", delay: 2000 });
                Ext.ComponentQuery.query('tarif FRMtarif numberfield[name=SERI_HS]')[0].markInvalid('Invalid');
                return false;
            }
            if (dtval.TARIF_BM < 0) {
                COMP.TipToast.toast("Error", "TARIF_BM tidak boleh kurang dari 0", { cls: "danger", delay: 2000 });
                Ext.ComponentQuery.query('tarif FRMtarif numberfield[name=TARIF_BM]')[0].markInvalid('Invalid');
                return false;
            }
            if (dtval.TARIF_CUKAI < 0) {
                COMP.TipToast.toast("Error", "TARIF_CUKAI tidak boleh kurang dari 0", { cls: "danger", delay: 2000 });
                Ext.ComponentQuery.query('tarif FRMtarif numberfield[name=TARIF_CUKAI]')[0].markInvalid('Invalid');
                return false;
            }
            if (dtval.TARIF_PPH < 0) {
                COMP.TipToast.toast("Error", "TARIF_PPH tidak boleh kurang dari 0", { cls: "danger", delay: 2000 });
                Ext.ComponentQuery.query('tarif FRMtarif numberfield[name=TARIF_PPH]')[0].markInvalid('Invalid');
                return false;
            }
            if (dtval.TARIF_PPN < 0) {
                COMP.TipToast.toast("Error", "TARIF_PPN tidak boleh kurang dari 0", { cls: "danger", delay: 2000 });
                Ext.ComponentQuery.query('tarif FRMtarif numberfield[name=TARIF_PPN]')[0].markInvalid('Invalid');
                return false;
            }
            if (dtval.TARIF_PPNBM < 0) {
                COMP.TipToast.toast("Error", "TARIF_PPNBM tidak boleh kurang dari 0", { cls: "danger", delay: 2000 });
                Ext.ComponentQuery.query('tarif FRMtarif numberfield[name=TARIF_PPNBM]')[0].markInvalid('Invalid');
                return false;
            }



        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    btdelete_rows_click: function (xgrid, rowIndex) {
        try {
            var me = this;
            var rec = xgrid.getStore().getAt(rowIndex).data;
            Ext.MessageBox.confirm('Confirm', 'Konfirmasi Hapus tarif: ' + rec.tarif_customer_name, function (button) {
                if (button === 'yes') {
                    var params = {
                        validate: me.getcookies('delete'),
                        form: Ext.encode(rec)
                    };
                    var hasil = COMP.run.gethide(vconfig.service_data + 'tarif', params, 'POST');

                    hasil.then(function (content) {
                        var val = Ext.decode(content, true);
                        if (val.success === true) {
                            me.btlist_click();
                            COMP.TipToast.toast('Success', val.message, { cls: "success", delay: 3000 });
                        } else {
                            COMP.TipToast.toast('Error', 'Proses Failed', { cls: "error", delay: 3000 });
                        }

                    }, this);




                }
            }, this);



        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    btdelete_click: function () {
        try {
            var me = this;
            var FRM = Ext.ComponentQuery.query('tarif FRMtarif')[0];
            var dtval = FRM.getValues(false, false, false, true);

            var GRIDitem = Ext.ComponentQuery.query('tarif GRIDtarif grid[pid=GRIDtarif]')[0];
            var sm = GRIDitem.getSelectionModel().getSelection()[0];
            var row = GRIDitem.store.indexOf(sm);
            if (row < 0 || dtval.mst_tarif_customer_id === 0) {
                return false;
            }
            this.btdelete_rows_click(GRIDitem, row);

        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    }

});