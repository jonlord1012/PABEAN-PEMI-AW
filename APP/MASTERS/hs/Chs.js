Ext.define('TDK.masters.hs.Chs', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Chs',
    init: function (view) {
        this.control({
            'hs GRIDhs grid[pid=GRIDhs]': { itemdblclick: this.GRIDhs_itemdblclick },
            'hs button[pid=btnew]': { click: this.btnew_click },
            'hs button[pid=btlist]': { click: this.btlist_click }
        });
        this.listen({
            store: {

            }

        });
        this.var_global = {};
        this.var_definition = {};
        this.renderpage();
    },
    renderpage: function () {
        try {

            var tabconfig = Ext.getCmp("hs");
            var mycook = Ext.decode(Ext.util.Cookies.get('NGC_account'));
            var vlinkto = tabconfig.xfunctions_linkto !== null ? tabconfig.xfunctions_linkto : '/dummyservice/home/api/' + tabconfig.xfunctions_name + '/' + tabconfig.xfunctions_name;

            this.var_global = ({
                moduleID: tabconfig.xfunctions_id,
                userID: mycook.userID,
                userName: mycook.userName,
                jwt: mycook.jwt,
                itemId: tabconfig.itemId,
                xfunctions_id: tabconfig.xfunctions_id,
                xfunctions_name: tabconfig.xfunctions_name,
                xfunctions_linkto: tabconfig.xfunctions_linkto,
                setting: ({
                    api_read: vconfig.service_api + vlinkto + 's',
                    api_create: vconfig.service_api + vlinkto,
                    api_update: vconfig.service_api + vlinkto,
                    api_delete: vconfig.service_api + vlinkto

                })
            });

            var panel = Ext.ComponentQuery.query('hs panel[pid=panelhs]')[0];
            var GRIDhs = Ext.ComponentQuery.query('hs panel[pid=panelhs] GRIDhs')[0];


            var me = this;
            var vauth = me.var_global.jwt;
            var hasil = COMP.run.getservice(vlinkto + '/definition', '', 'POST', vauth);
            hasil.then(function (content) {
                var val = Ext.decode(content, true);
                if (val.success === true) {
                    me.var_definition = val.model1.definition;
                    panel.setActiveItem(GRIDhs);
                    me.GRIDhs_render(GRIDhs);
                } else {
                    COMP.TipToast.toast('Error', 'failed Definition', { cls: "danger", delay: 3000 });
                }

            }, this);



        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    GetActivepanel: function () {
        try {
            var panel = Ext.ComponentQuery.query('hs panel[pid=panelhs]')[0];
            var actindex = panel.getLayout().activeItem;
            var idx = panel.items.indexOf(actindex);
            return idx;
        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    SetActivepanel: function (val) {
        try {
            var panel = Ext.ComponentQuery.query('hs panel[pid=panelhs]')[0];
            panel.setActiveItem(val);

        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    GRIDhs_render: function (cmp) {
        try {


            var me = this;
            var model1 = me.var_definition;
            var Vcolumn = [];
            var Vmodelcolumn = [];
            model1.forEach(function (xval) {

                Vcolumn.push(
                    {
                        header: xval.name, dataIndex: xval.name, sortable: true, width: 80, hidden: false, filter: { xtype: 'textfield' }
                    }
                );
                Vmodelcolumn.push(
                    { name: xval.name, type: xval.type },
                );

            });


            Ext.define('MODSTGRIDhs', {
                extend: 'Ext.data.Model',
                alias: 'MODSTGRIDhs',
                fields: Vmodelcolumn
            });

            Ext.define('TDK.masters.hs.STGRIDhs', {
                extend: 'Ext.data.Store',
                model: 'MODSTGRIDhs',
                alias: 'store.STGRIDhs',
                storeId: 'STGRIDhs',
                autoLoad: true, autoSync: false, remoteSort: false, remoteFilter: false,
                pageSize: 0,
                proxy: {
                    type: 'ajax',
                    Headers: {
                        Authorization: 'Bearer ' + me.var_global.jwt
                    },
                    actionMethods: { read: 'POST' },
                    api: {
                        read: me.var_global.setting.api_read
                    },
                    reader: {
                        type: 'json',
                        rootProperty: 'Rows',
                        totalProperty: 'TotalRows',
                        successProperty: 'success'
                    },
                    writer: {
                        type: 'json',
                        writeAllFields: false
                    },
                    listeners: {
                        exception: function (proxy, resp, op) {
                            if (resp.status === 404) {
                                COMP.TipToast.toast("Error", "proses data tidak berhasil,silahkan reload/refresh browser", { cls: "danger", delay: 2000 });
                            } else {
                                COMP.TipToast.toast("Error", resp.statusText, { cls: "danger", delay: 2000 });
                            }
                        }
                    }
                }
            });


            cmp.add(
                new Ext.create('Ext.grid.Panel', {
                    pid: 'GRIDhs',
                    emptyText: 'No Matching Records',
                    autoScroll: true,
                    flex: 1,
                    plugins: [
                        'filterfield',
                    ],
                    store: {
                        type: 'STGRIDhs', remoteSort: true, remoteFilter: true, pageSize: 16,
                    },
                    columns: Vcolumn,
                    bbar: {
                        xtype: 'pagingtoolbar',
                        displayInfo: true,
                        displayMsg: 'Displaying topics {0} - {1} of {2}',
                        emptyMsg: 'No topics to display'
                    },
                })
            );





        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    btnew_click: function () {
        try {
            var panel = Ext.ComponentQuery.query('hs panel[pid=panelhs]')[0];
            var FRMinput = Ext.ComponentQuery.query('hs panel[pid=panelhs] FRMhs')[0];
            panel.setActiveItem(FRMinput);
        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    btlist_click: function () {
        try {
            var panel = Ext.ComponentQuery.query('hs panel[pid=panelhs]')[0];
            var GRIDhs = Ext.ComponentQuery.query('hs panel[pid=panelhs] GRIDhs')[0];
            panel.setActiveItem(GRIDhs);
        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    GRIDhs_itemdblclick: function (grid, rec) {
        try {
            var panel = Ext.ComponentQuery.query('hs panel[pid=panelhs]')[0];
            var FRMinput = Ext.ComponentQuery.query('hs panel[pid=panelhs] FRMhs')[0];
            panel.setActiveItem(FRMinput);

        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    }
});