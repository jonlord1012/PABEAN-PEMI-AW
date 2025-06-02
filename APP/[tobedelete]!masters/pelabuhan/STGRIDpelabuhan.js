Ext.define('MODSTGRIDpelabuhan', {
    extend: 'Ext.data.Model',
    alias: 'MODSTGRIDpelabuhan',
    fields: [
        { name: 'ID', type: 'int' },
        { name: 'KETERANGAN', type: 'string' },
        { name: 'KODE_KANTOR', type: 'string' },
        { name: 'KODE_PELABUHAN', type: 'string' },
        { name: 'URAIAN_PELABUHAN', type: 'string' },

    ]
});

Ext.define('TDK.masters.pelabuhan.STGRIDpelabuhan', {
    extend: 'Ext.data.Store',
    model: 'MODSTGRIDpelabuhan',
    alias: 'store.STGRIDpelabuhan',
    storeId: 'STGRIDpelabuhan',
    autoLoad: true,
    autoSync: false,
    remoteSort: false,
    remoteFilter: false, //For Remote Filtering 
    pageSize: 0,
    proxy: {
        type: 'ajax',
        disableCaching: false,
        noCache: false,
        actionMethods: { create: 'POST', read: 'POST', update: 'POST', destroy: 'POST' },
        api: {

            read: vconfig.service_data + 'pelabuhan/'
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
