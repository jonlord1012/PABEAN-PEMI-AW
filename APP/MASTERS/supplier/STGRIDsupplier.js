Ext.define('MODSTGRIDsupplier', {
    extend: 'Ext.data.Model',
    alias: 'MODSTGRIDsupplier',
    fields: [
        { name: 'mst_supplier_customer_id', type: 'float' },
        { name: 'supplier_customer_code', type: 'string' },
        { name: 'supplier_customer_name', type: 'string' },
        { name: 'supplier_customer_address', type: 'string' },
        { name: 'supplier_customer_country', type: 'string' },

    ]
});

Ext.define('TDK.masters.supplier.STGRIDsupplier', {
    extend: 'Ext.data.Store',
    model: 'MODSTGRIDsupplier',
    alias: 'store.STGRIDsupplier',
    storeId: 'STGRIDsupplier',
    proxy: {
        type: 'ajax',
        disableCaching: false,
        noCache: false,
        actionMethods: { read: 'POST' },
        api: {
            read: ''
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
