Ext.define('MODSTGRIDtarif', {
    extend: 'Ext.data.Model',
    alias: 'MODSTGRIDtarif',
    fields: [
        { name: 'ID', type: 'int' },
        { name: 'JENIS_TARIF_BM', type: 'string' },
        { name: 'JENIS_TARIF_CUKAI', type: 'string' },
        { name: 'KODE_SATUAN_BM', type: 'string' },
        { name: 'KODE_SATUAN_CUKAI', type: 'string' },
        { name: 'NOMOR_HS', type: 'string' },
        { name: 'SERI_HS', type: 'int' },
        { name: 'TARIF_BM', type: 'float' },
        { name: 'TARIF_CUKAI', type: 'float' },
        { name: 'TARIF_PPH', type: 'float' },
        { name: 'TARIF_PPN', type: 'float' },
        { name: 'TARIF_PPNBM', type: 'float' }

    ]
});

Ext.define('TDK.masters.tarif.STGRIDtarif', {
    extend: 'Ext.data.Store',
    model: 'MODSTGRIDtarif',
    alias: 'store.STGRIDtarif',
    storeId: 'STGRIDtarif',
    autoLoad: true,
    autoSync: false,
    remoteSort: false,
    remoteFilter: false, //For Remote Filtering 
    pageSize: 0,
    proxy: {
        type: 'ajax',
        actionMethods: { create: 'POST', read: 'POST', update: 'POST', destroy: 'POST' },
        api: {

            read: vconfig.service_data + 'tarif/'
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
