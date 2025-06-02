Ext.define('NJC.data.STdashboard_year', {
    extend: 'Ext.data.Store',
    alias: 'store.STdashboard_year',
    fields: [
        'year',
        'data',
        {
            name: 'highF',
            calculate: function (data) {
                return data.data * 1.8 + 32;
            }
        },
        {
            name: 'pengeluaran',
            calculate: function (data) {
                return data.data * 0.5 + 32;
            }
        },
        {
            name: 'lowF',
            calculate: function (data) {
                return data.data * 1.8 + 32;
            }
        }
    ],
    data: [
        { year: '2022', data:1200},
        { year: '2021', data:1000},
        { year: '2020', data:800},
        { year: '2019', data:400},
        { year: '2018', data:1100},
        { year: '2017', data:850},
        { year: '2016', data:600},
        { year: '2015', data:700},
        { year: '2014', data:650},
    ],

    counter: 0,

    generateData: function () {
        var data = this.config.data,
            i, result = [],
            temp = 15,
            min = this.counter % 2 === 1 ? 0 : temp;
        for (i = 0; i < data.length; i++) {
            result.push({
                month: data[i].month,
                high: min + temp + Math.random() * temp,
                low: min + Math.random() * temp
            });
        }
        this.counter++;
        return result;
    },

    refreshData: function () {
        this.setData(this.generateData());
    }

});