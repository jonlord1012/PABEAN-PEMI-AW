Ext.define('TDK.masters.master_negara.Cmaster_negara', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Cmaster_negara',
    init: function (view) {
        this.control({
            'master_negara button[pid=btnew]': { click: this.btnew_click },
            'master_negara button[pid=btlist]': { click: this.btlist_click },
            'master_negara grid[pid=GRIDmaster_negara]': { itemdblclick: this.GRIDmaster_negara_dblclick },
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
            var vlinkto = tabconfig.xfunctions_linkto !== null ? tabconfig.xfunctions_linkto : 'dummyservice/home/api/master_negara/master_negara';

            console.log(vlinkto);

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
            var hasil = COMP.run.getservice(vconfig.service_api + vlinkto + '/definition', '', 'POST', vauth);
            hasil.then(function (content) {
                var val = Ext.decode(content, true);
                if (val.success === true) {
                    me.var_definition = val.model1.definition;
                    me.panel_load();
                } else {
                    COMP.TipToast.toast('Error', 'failed Definition', { cls: "danger", delay: 3000 });
                }

            }, this);



        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    panel_load: function () {
        try {

            var panel = Ext.ComponentQuery.query('master_negara')[0];
            panel.removeAll();

            panel.add(this.GRID_create());
            panel.add(this.FRM_create());

        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    FRM_create: function () {
        try {
            var me = this;

            var page = Ext.create('Ext.form.Panel', {
                alias: 'widget.FRMmaster_negara',
                pid: 'FRMmaster_negara',
                reference: 'FRMmaster_negara',
                frame: false,
                border: false,
                layout: { type: 'vbox', pack: 'start', align: 'stretch' },
                bodyPadding: '5 5 5 5',
                flex: 1,
                fieldDefaults: {
                    labelWidth: 80
                },
                items: [
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        margin: '0 0 5 0',
                        items: [
                            { xtype: 'textfield', fieldLabel: 'Country Code', name: 'country_code', width: 200, fieldCls: 'fieldinput', value: '', readOnly: false },
                            { xtype: 'tbspacer', width: 10 },
                            { xtype: 'textfield', fieldLabel: 'Country Name', name: 'country_name', width: 400, fieldCls: 'fieldinput', value: '', readOnly: false }
                        ]
                    },
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        margin: '0 0 5 0',
                        items: [
                            { xtype: 'textfield', fieldLabel: 'Country Code2', name: 'country_code2', width: 200, fieldCls: 'fieldinput', value: '', readOnly: false },
                            { xtype: 'tbspacer', width: 10 },
                            { xtype: 'textfield', fieldLabel: 'Country Name2', name: 'country_name2', width: 400, fieldCls: 'fieldinput', value: '', readOnly: false }
                        ]
                    }
                ],
                tbar: {
                    plugins: {
                        boxreorderer: true
                    },
                    items: [
                        { xtype: 'button', text: 'New Input', pid: 'btnew', icon: vconfig.getstyle + 'icon/add.png', tooltip: 'New Input' },
                        '-',
                        { xtype: 'button', text: 'Save', pid: 'btsave', icon: vconfig.getstyle + 'icon/save.gif', tooltip: 'Save Data' },
                        { xtype: 'button', text: 'Cancel', icon: vconfig.getstyle + 'icon/delete.png', pid: 'btdelete', tooltip: 'Delete Data' },
                        '-',
                        { xtype: 'button', text: 'List Data', pid: 'btlist', icon: vconfig.getstyle + 'icon/grid.png', tooltip: 'List Data' },
                        '->',
                        {
                            text: 'Upload Data',
                            icon: vconfig.getstyle + 'icon/upload.png',
                            menu: [{
                                text: 'upload '
                            }]
                        },
                        {
                            text: 'Download Data',
                            icon: vconfig.getstyle + 'icon/download.png',
                            menu: [{
                                text: 'Download '
                            }]
                        }
                    ]
                }
            });

            var nfield = page.query('field');
            Ext.each(nfield, function (vcol, index) {
                var vfind = me.var_definition.find(c => c.dbname === vcol.name);
                if (vfind) {
                    vcol.name = vfind.name;
                }
            });



            return page;
        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    GRID_create: function () {
        try {
            var me = this;
            var Vcolumn = [
                { xtype: 'rownumberer', width: 50 },
                {
                    xtype: 'actioncolumn', width: 35, align: 'center', menuDisabled: true, sortable: false,
                    items: [{
                        icon: vconfig.getstyle + 'icon/delete.ico',
                        handler: 'btdelete_rows_click',
                        tooltip: 'Delete data'
                    }]
                },
                { header: "Kode", dataIndex: 'country_code', sortable: true, width: 65, filter: { xtype: 'textfield' } },
                { header: "Nama", dataIndex: 'country_name', sortable: true, width: 150, filter: { xtype: 'textfield' } },
                { header: "Kode2", dataIndex: 'country_code2', sortable: true, width: 65, filter: { xtype: 'textfield' } },
                { header: "Nama2", dataIndex: 'country_name2', sortable: true, width: 150, filter: { xtype: 'textfield' } },
                { header: "Create", dataIndex: 'create_date', sortable: true, width: 150, filter: { xtype: 'textfield' } },
                { header: "Date", dataIndex: 'create_by', sortable: true, width: 150, filter: { xtype: 'textfield' } },
                { header: "Update", dataIndex: 'modify_date', sortable: true, width: 150, filter: { xtype: 'textfield' } },
                { header: "Date", dataIndex: 'modify_by', sortable: true, width: 150, filter: { xtype: 'textfield' } },

            ];
            Ext.each(Vcolumn, function (vcol, index) {
                var vfind = me.var_definition.find(c => c.dbname === vcol.dataIndex);
                if (vfind) {
                    vcol.dataIndex = vfind.name;
                }
            });
            return new Ext.create('Ext.form.Panel', {
                alias: 'widget.GRIDmaster_negara',
                reference: 'GRIDmaster_negara',
                frame: false,
                border: false,
                layout: { type: 'vbox', pack: 'start', align: 'stretch' },
                items: [
                    {
                        xtype: 'grid',
                        pid: 'GRIDmaster_negara',
                        emptyText: 'No Matching Records',
                        autoScroll: true,
                        flex: 1,
                        plugins: ['filterfield'],
                        store: {
                            autoLoad: true, remoteSort: true, remoteFilter: true, pageSize: 20,
                            proxy: {
                                type: 'ajax',
                                disableCaching: false,
                                noCache: false,
                                setHeaders: { Authorization: 'Bearer ' + me.var_global.jwt },
                                actionMethods: { read: 'POST' },
                                url: me.var_global.setting.api_read,
                                reader: {
                                    type: 'json',
                                    rootProperty: 'Rows',
                                    totalProperty: 'TotalRows',
                                    successProperty: 'success'
                                },

                            },
                        },
                        columns: Vcolumn,
                        bbar: {
                            xtype: 'pagingtoolbar',
                            displayInfo: true,
                            displayMsg: 'Displaying topics {0} - {1} of {2}',
                            emptyMsg: 'No topics to display'
                        },

                    }
                ],
                tbar: {
                    pid: 'tbar_master_negara',
                    plugins: {
                        boxreorderer: true
                    },
                    items: [
                        { xtype: 'button', text: 'New Input', pid: 'btnew', icon: vconfig.getstyle + 'icon/add.png', tooltip: 'New Input' },
                        { xtype: 'button', text: 'List Data', pid: 'btlist', icon: vconfig.getstyle + 'icon/grid.png', tooltip: 'List Data' },

                    ]
                }
            });

        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    btnew_click: function () {
        try {
            var panel = Ext.ComponentQuery.query('master_negara')[0];
            panel.setActiveItem(1);
        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    btlist_click: function () {
        try {
            var panel = Ext.ComponentQuery.query('master_negara')[0];
            panel.setActiveItem(0);

            var GRIDmaster_negara = Ext.ComponentQuery.query('master_negara grid[pid=GRIDmaster_negara]')[0];
            GRIDmaster_negara.getStore().load();

        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    GRIDmaster_negara_dblclick: function (cmp, rec) {
        try {
            var panel = Ext.ComponentQuery.query('master_negara')[0];
            panel.setActiveItem(1);
            var vdt = rec.data;
            var FRM = Ext.ComponentQuery.query('master_negara form[pid=FRMmaster_negara]')[0];
            //var dtval = FRM.getValues(false, false, false, true);
            FRM.getForm().setValues(vdt)

        } catch (ex) {
            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
    },
    btdelete_rows_click: function (xgrid, rowIndex) {
        try {
            var me = this;
            var vdt = xgrid.getStore().getAt(rowIndex).data;
            Ext.MessageBox.confirm('Confirm', 'Konfirmasi hapus data', function (button) {
                if (button === 'yes') {
                    vdt.method = "delete";
                    var params = vdt;
                    var hasil = COMP.run.getservice(me.var_global.setting.api_create, params, 'POST', me.var_global.jwt);
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
    }

});