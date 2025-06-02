Ext.define('MODST_inputkontainer', {
    extend: 'Ext.data.Model',
    alias: 'MODST_inputkontainer',
    fields: [
        { name: 'kontainer_nomor', type: 'string' },
        { name: 'kontainer_ukuran', type: 'string' },
        { name: 'kontainer_type', type: 'float' },
        { name: 'kontainer_keterangan', type: 'string' }
    ]
});
Ext.define('TDK.store.ST_inputkontainer', {
    extend: 'Ext.data.Store',
    model: 'MODST_inputkontainer',
    alias: 'store.ST_inputkontainer',
    storeId: 'ST_inputkontainer',
    autoLoad: true,
    autoSync: true,
    remoteSort: false,
    remoteFilter: false,
    proxy: {
        type: 'localstorage'
    }
});
