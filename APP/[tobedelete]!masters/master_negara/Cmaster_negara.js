Ext.define('TDK.masters.master_negara.Cmaster_negara', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Cmaster_negara',
    init: function (view) {
        this.control({

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

            var tabconfig = Ext.getCmp("master_control");
            var mycook = Ext.decode(Ext.util.Cookies.get('NGC_account'));
            var vlinkto = tabconfig.xfunctions_linkto !== null ? tabconfig.xfunctions_linkto : '/dummyservice/home/api/master_negara/master_negara';

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

            var panel = Ext.ComponentQuery.query('master_negara')[0];
            var me = this;
            var vauth = me.var_global.jwt;
            var hasil = COMP.run.getservice(vlinkto + '/definition', '', 'POST', vauth);
            hasil.then(function (content) {
                var val = Ext.decode(content, true);
                if (val.success === true) {
                    me.var_definition = val.model1.definition;
                    panel.setActiveItem('GRIDmaster_negara');
                } else {
                    COMP.TipToast.toast('Error', 'failed Definition', { cls: "danger", delay: 3000 });
                }

            }, this);



        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },

});