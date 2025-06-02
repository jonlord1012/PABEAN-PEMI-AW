Ext.define('TDK.masters.pelabuhan.Cpelabuhan', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Cpelabuhan',
    init: function (view) {
        this.control({
            'pelabuhan GRIDpelabuhan': { afterrender: this.pagefirst_render },
            'pelabuhan button[pid=btlist]': { click: this.btlist_click },
            'pelabuhan button[pid=btnew]': { click: this.btnew_click },
            'pelabuhan button[pid=btsave]': { click: this.btsave_click },
            'pelabuhan button[pid=btdelete]': { click: this.btdelete_click },
            'pelabuhan GRIDpelabuhan grid[pid=GRIDpelabuhan]': { itemdblclick: this.GRIDpelabuhan_itemdblclick },

        });
        this.listen({
            store: {
                'STGRIDpelabuhan': { beforeload: this.STGRIDpelabuhan_beforeload }
            }

        });
        this.varglobal = [];
        this.renderpage();
    },
    renderpage: function () {
        try {



        } catch (ex) {
            COMP.TipToast.toast("Error", err.message, { cls: "danger", delay: 2000 });
        }
    },
    GetActivepanel: function () {
        try {
            var panel = Ext.ComponentQuery.query('pelabuhan panel[pid=panelpelabuhan]')[0];
            var actindex = panel.getLayout().activeItem;
            var idx = panel.items.indexOf(actindex);
            return idx;
        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    SetActivepanel: function (val) {
        try {

            var panel = Ext.ComponentQuery.query('pelabuhan panel[pid=panelpelabuhan]')[0];
            panel.setActiveItem(val);

        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    pagefirst_render: function () {
        try {
            var mycook = Ext.decode(Ext.util.Cookies.get('NGC_account'));
            var vmain_tbar = Ext.ComponentQuery.query('pelabuhan GRIDpelabuhan toolbar[pid=tbar_pelabuhan]')[0];
            var Vmaintab = Ext.ComponentQuery.query('mainpage Vmainpage tabpanel[pid=modmasterTAB]')[0];
            var activeTab = Vmaintab.getComponent('pelabuhan');

            var vlinkto = activeTab.xfunctions_linkto !== null ? activeTab.xfunctions_linkto : '/dummyservice/home/api/' + activeTab.xfunctions_name + '/' + activeTab.xfunctions_name;

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
                    api_read: vconfig.service_api + vlinkto + 's',
                    api_create: vconfig.service_api + vlinkto,
                    api_update: vconfig.service_api + vlinkto,
                    api_delete: vconfig.service_api + vlinkto

                })
            });
        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }

    },
    STGRIDpelabuhan_beforeload: function (store, operation, eOpts) {
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
            var GRIDitem = Ext.ComponentQuery.query('pelabuhan GRIDpelabuhan grid[pid=GRIDpelabuhan]')[0];
            GRIDitem.getStore().load();
        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    btnew_click: function () {
        try {
            var me = this;
            console.log(me.myconfig);
            this.SetActivepanel(1);
            var FRM = Ext.ComponentQuery.query('pelabuhan FRMpelabuhan')[0];
            FRM.getForm().reset();
        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    GRIDpelabuhan_itemdblclick: function (grid, rec) {
        try {
            var vdt = rec.data;
            this.SetActivepanel(1);
            var FRM = Ext.ComponentQuery.query('pelabuhan FRMpelabuhan')[0];
            FRM.getForm().setValues({
                ID: vdt.ID,
                KETERANGAN: vdt.KETERANGAN,
                KODE_KANTOR: vdt.KODE_KANTOR,
                KODE_PELABUHAN: vdt.KODE_PELABUHAN,
                URAIAN_PELABUHAN: vdt.URAIAN_PELABUHAN
            });


        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    btsave_click: function () {
        try {
            var me = this;
            var FRM = Ext.ComponentQuery.query('pelabuhan FRMpelabuhan')[0];
            var dtval = FRM.getValues(false, false, false, true);

            if (this.Dovalidateinput() === false) {
                return false;
            }


            Ext.MessageBox.confirm('Confirm', 'Konfirmasi simpan data pelabuhan', function (button) {
                if (button === 'yes') {

                    var vurl = dtval.ID === 0 ? me.varglobal.setting.api_create : me.varglobal.setting.api_update;
                    var vmethod = dtval.ID === 0 ? 'POST' : 'POST';
                    dtval.ID === 0 ? dtval.method = 'create' : dtval.method = 'update';
                    var vauth = me.varglobal.jwt;
                    dtval.userID = me.varglobal.userID;
                    dtval.userName = me.varglobal.userName;
                    var hasil = COMP.run.getservice(vurl, Ext.encode(dtval), vmethod, vauth);

                    hasil.then(function (content) {
                        var val = Ext.decode(content, true);
                        if (val.success === true) {
                            me.btlist_click();
                            COMP.TipToast.toast('Success', val.message, { cls: "success", delay: 3000 });
                        } else {
                            COMP.TipToast.toast('Error', 'Proses  Request Order Failed', { cls: "error", delay: 3000 });
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
            var FRM = Ext.ComponentQuery.query('pelabuhan FRMpelabuhan')[0];
            var dtval = FRM.getValues(false, false, false, true);

            if (dtval.pelabuhan_customer_code === "") {
                COMP.TipToast.toast("Error", "kode pelabuhan belum ada", { cls: "danger", delay: 2000 });
                Ext.ComponentQuery.query('pelabuhan FRMpelabuhan textfield[name=pelabuhan_customer_code]')[0].markInvalid('Invalid');
                return false;
            }
            if (dtval.pelabuhan_customer_name === "") {
                COMP.TipToast.toast("Error", "Nama pelabuhan belum ada", { cls: "danger", delay: 2000 });
                Ext.ComponentQuery.query('pelabuhan FRMpelabuhan textfield[name=pelabuhan_customer_name]')[0].markInvalid('Invalid');
                return false;
            }
            if (dtval.pelabuhan_customer_country === "") {
                COMP.TipToast.toast("Error", "Country pelabuhan belum ada", { cls: "danger", delay: 2000 });
                Ext.ComponentQuery.query('pelabuhan FRMpelabuhan textfield[name=pelabuhan_customer_country]')[0].markInvalid('Invalid');
                return false;
            }
            if (dtval.pelabuhan_customer_address === "") {
                COMP.TipToast.toast("Error", "Address pelabuhan belum ada", { cls: "danger", delay: 2000 });
                Ext.ComponentQuery.query('pelabuhan FRMpelabuhan textarea[name=pelabuhan_customer_address]')[0].markInvalid('Invalid');
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
            Ext.MessageBox.confirm('Confirm', 'Konfirmasi Hapus pelabuhan: ' + rec.KODE_PELABUHAN, function (button) {
                if (button === 'yes') {
                    var vurl = me.varglobal.setting.api_delete;
                    var vmethod = 'POST';
                    var vauth = me.varglobal.jwt;
                    rec.method = 'delete';
                    rec.userID = me.varglobal.userID;
                    rec.userName = me.varglobal.userName;
                    var hasil = COMP.run.getservice(vurl, Ext.encode(rec), vmethod, vauth);
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
            var FRM = Ext.ComponentQuery.query('pelabuhan FRMpelabuhan')[0];
            var dtval = FRM.getValues(false, false, false, true);

            var GRIDitem = Ext.ComponentQuery.query('pelabuhan GRIDpelabuhan grid[pid=GRIDpelabuhan]')[0];
            var sm = GRIDitem.getSelectionModel().getSelection()[0];
            var row = GRIDitem.store.indexOf(sm);
            if (row < 0 || dtval.ID === 0) {
                return false;
            }
            this.btdelete_rows_click(GRIDitem, row);

        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    }

});