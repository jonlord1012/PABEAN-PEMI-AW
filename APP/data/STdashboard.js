Ext.define('NJC.data.STdashboard', {
    extend: 'Ext.data.Store',
    alias: 'store.STdashboard',
    fields: [
        'month',
        'high',
        'low',
        {
            name: 'highF',
            calculate: function (data) {
                return data.high * 1.8 + 32;
            }
        },
        {
            name: 'pengeluaran',
            calculate: function (data) {
                return data.high * 0.5 + 32;
            }
        },
        {
            name: 'lowF',
            calculate: function (data) {
                return data.low * 1.8 + 32;
            }
        }
    ],
    data: [
        { month: 'JUL', high: 27.7, low: 13.3 },
        { month: 'AUG', high: 27.6, low: 13.2 },
        { month: 'SEP', high: 26.4, low: 12.1 },
        { month: 'OCT', high: 23.6, low: 9.9  },
        { month: 'NOV', high: 17  , low: 6.8  },
        { month: 'DEC', high: 14.7, low: 5.8  },
        { month: 'JAN', high: 14.7, low: 5.6  },
        { month: 'FEB', high: 16.5, low: 6.6  },
        { month: 'MAR', high: 18.6, low: 7.3  },
        { month: 'APR', high: 20.8, low: 8.1  },
        { month: 'MAY', high: 23.3, low: 9.9  },
        { month: 'JUN', high: 26.2, low: 11.9 }
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