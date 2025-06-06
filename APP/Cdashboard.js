Ext.define('NJC.Cdashboard', {
    extend: 'Ext.app.ViewController',
    alias:'controller.Cdashboard',
    init: function (view) {
        this.control({
           
        });
        this.renderpage();
    },
    renderpage:function(){
        try{
            
        }catch(ex){

        }
    },
    onDownload: function() {
        if (Ext.isIE8) {
            Ext.Msg.alert('Unsupported Operation', 'This operation requires a newer version of Internet Explorer.');
            return;
        }
        var chart = this.lookup('chart');
        if (Ext.os.is.Desktop) {
            chart.download({
                filename: 'Redwood City Climate Data Chart'
            });
        } else {
            chart.preview();
        }
    },

    onReloadData: function() {
        var chart = this.lookup('chart');
        chart.getStore().refreshData();
    },

    // The 'target' here is an object that contains information
    // about the target value when the drag operation on the column ends.
    onEditTipRender: function (tooltip, item, target, e) {
        tooltip.setHtml('Temperature °F: ' + target.yValue.toFixed(1));
    },

    onSeriesLabelRender: function (value) {
        return value.toFixed(1);
    },

    onColumnEdit: function (chart, data) {
        var threshold = 65,
            delta = 20,
            yValue = data.target.yValue,
            coldness;

        if (yValue < threshold) {
            coldness = Ext.Number.constrain((threshold - yValue) / delta, 0, 1);
            return {
                fillStyle: 'rgba(133, 231, 252, ' + coldness.toString() + ')'
            };
        } else {
            return {
                fillStyle: 'none'
            };
        }
    },

    onAfterRender: function () {
        var me = this,
            chart = this.lookup('chart'),
            axis = chart.getAxis(0),
            store = chart.getStore();

        function onAxisRangeChange() {
            me.onAxisRangeChange(axis);
        }

        store.on({
            datachanged: onAxisRangeChange,
            update: onAxisRangeChange
        });
    },

    onAxisRangeChange: function (axis, range) {
        // this.lookup('chart') will fail here,
        // as at the time of this call
        // the chart is not yet in the component tree,
        // so we have to use axis.getChart() instead.
        var chart = axis.getChart(),
            store = chart.getStore(),
            average = store.average('highF');

        if (average) {
            axis.setLimits({
                value: average,
                line: {
                    title: {
                        text: 'Average high: ' + average.toFixed(2)
                    },
                    lineDash: [2,2]
                }
            });
        } else {
            axis.setLimits(null);
        }
    },

    itemAnimationDuration: 0,

    // Disable item's animaton for editing.
    onBeginItemEdit: function (chart, interaction, item) {
        var itemsMarker = item.sprite.getMarker(item.category),
            animation = itemsMarker.getTemplate().getAnimation(); // animation modifier

        this.itemAnimationDuration = animation.getDuration();
        animation.setDuration(0);
    },

    // Restore item's animation when editing is done.
    onEndItemEdit: function (chart, interaction, item, target) {
        var itemsMarker = item.sprite.getMarker(item.category),
            animation = itemsMarker.getTemplate().getAnimation();

        animation.setDuration(this.itemAnimationDuration);
    },

    onSeriesTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml(record.get('os') + ': ' + record.get('data1') + '%');
    }       
});