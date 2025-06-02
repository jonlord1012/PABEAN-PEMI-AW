Ext.define('TDK.masters.supplier.Csupplier', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Csupplier',
    init: function (view) {
        this.control({
            'supplier GRIDsupplier': { beforerender: this.setting_layoutgrid },
        });
        this.listen({
            store: {
                'STGRIDsupplier': { beforeload: this.STGRIDsupplier_beforeload }
            }

        });
        this.var_global = [];
        this.renderpage();
    },
    STGRIDsupplier_beforeload: function (store, operation, eOpts) {
        try {
            var me = this;
            store.proxy.api.read = me.var_global.setting.api_read;
            store.getProxy().setHeaders({
                Authorization: 'Bearer ' + me.var_global.jwt
            });
        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    renderpage: function () {
        try {
            var vmodulename = "supplier";
            var tabconfig = Ext.getCmp(vmodulename);
            var mycook = Ext.decode(Ext.util.Cookies.get('NGC_account'));
            var vlinkto = tabconfig.xfunctions_linkto !== null ? tabconfig.xfunctions_linkto : '/dummyservice/home/api/' + vmodulename + '/' + vmodulename;
            var vlink_definition = vlinkto.substring(1, (vlinkto.length) - (vmodulename.length)) + 'definition';

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

            var panel = Ext.ComponentQuery.query('supplier panel[pid=panelsupplier]')[0];
            var me = this;
            var vauth = me.var_global.jwt;
            var hasil = COMP.run.getservice(vlink_definition, '', 'POST', vauth);
            hasil.then(function (content) {
                var val = Ext.decode(content, true);
                me.var_definition = val.model1.definition;
                panel.removeAll();

                panel.add({ xtype: 'GRIDsupplier' });
                panel.setActiveItem({ xtype: 'GRIDsupplier' });
            }, this);

        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    setting_layoutgrid: function (cmp) {
        try {
            cmp.removeAll();
            var Vcolumn = [
                { xtype: 'rownumberer', text: 'No', width: 50 },
                {
                    xtype: 'actioncolumn', width: 35, align: 'center', menuDisabled: true, sortable: false,
                    items: [{
                        icon: vconfig.getstyle + 'icon/delete.ico',
                        handler: 'btdelete_rows_click',
                        tooltip: 'Delete tarif'
                    }]
                }
            ];
            cmp.add(new Ext.create('Ext.grid.Panel', {
                pid: 'GRIDsupplier',
                emptyText: 'No Matching Records',
                autoScroll: true,
                flex: 1,
                plugins: [
                    'filterfield',
                ],
                store: {
                    type: 'STGRIDsupplier', autoLoad: true, remoteSort: true, remoteFilter: true, pageSize: 5,
                },
                columns: Vcolumn,
                bbar: {
                    xtype: 'pagingtoolbar',
                    displayInfo: true,
                    displayMsg: 'Displaying topics {0} - {1} of {2}',
                    emptyMsg: 'No topics to display'
                },
            }));

        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    }
});