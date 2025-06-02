Ext.define('TDK.masters.master_control.Cmaster_control', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Cmaster_control',
    init: function (view) {
        this.control({
            'master_control FRMmaster_control dataview': { itemClick: this.Dodataview_click },
        });
        this.listen({
            store: {

            }

        });
        this.var_global = {};
        this.var_definition = {};
        //this.renderpage();
    },
    renderpage: function () {
        try {

            var tabconfig = Ext.getCmp("master_control");
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

            var panel = Ext.ComponentQuery.query('master_control panel[pid=panelmaster_control]')[0];
            var GRIDmaster_control = Ext.ComponentQuery.query('master_control panel[pid=panelmaster_control] GRIDmaster_control')[0];


            var me = this;
            var vauth = me.var_global.jwt;
            var hasil = COMP.run.getservice(vlinkto + '/definition', '', 'POST', vauth);
            hasil.then(function (content) {
                var val = Ext.decode(content, true);
                if (val.success === true) {
                    me.var_definition = val.model1.definition;
                    panel.setActiveItem(GRIDmaster_control);
                    me.GRIDmaster_control_render(GRIDmaster_control);
                } else {
                    COMP.TipToast.toast('Error', 'failed Definition', { cls: "danger", delay: 3000 });
                }

            }, this);



        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    Dodataview_click: function (cmp, rec) {
        try {
            var me = this;
            var vdt = rec.data;
            var MAINpage = Ext.ComponentQuery.query('mainpage Vmainpage')[0];

            var popup = Ext.define('TDK.masters.master_control.popup_main', {
                extend: 'Ext.window.Window',
                alias: 'widget.popup_main',
                reference: 'popup_main',
                title: vdt.name,
                modal: true,
                closeAction: 'destroy',
                centered: true,
                autoScroll: true,
                width: MAINpage.getWidth() * 0.90,
                height: 550,
                layout: { type: 'card', pack: 'start', align: 'stretch' },
                bodyStyle: 'background:#FFFFFF;background-color:#FFFFFF',
                items: [
                    { xtype: vdt.module },
                ],
            });
            COMP.run.getmodulepopup('popup_main', popup, MAINpage);
        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    }
});