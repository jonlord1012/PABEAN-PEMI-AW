Ext.define('NJC.data.STdashboard_pie', {
    extend: 'Ext.data.Store',
    alias: 'store.STdashboard_pie',
    
    fields: ['os', 'data1' ],
    data: [
        { os: 'BC 23', data1: 30 },
        { os: 'BC 40', data1: 30 },
        { os: 'BC 27', data1: 20 },
        { os: 'BC 262', data1: 20 }
    ]


});