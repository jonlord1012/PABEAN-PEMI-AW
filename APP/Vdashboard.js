Ext.define('NJC.Vdashboard', {
    extend: 'Ext.form.Panel',
    alias: 'widget.Vdashboard',
    reference: 'Vdashboard',
    requires: [
        'NJC.Cdashboard',
        'Ext.chart.PolarChart'
    ],
    controller: 'Cdashboard',
    layout: { type: 'vbox', pack: 'start', align: 'stretch' },
    title: 'Dashboard Pemasukan + Pengeluaran',
    bodyPadding: '2 2 2 2',
    items: [
        {
            xtype: 'container',
            layout: { type: 'hbox', pack: 'start', align: 'stretch' },
            items: [
                {
                    xtype: 'panel',
                    height: 180,
                    width: 450,
                    margin: '2 2 2 2',
                    border: false,
                    items: [
                        {
                            xtype: 'cartesian',
                            reference: 'chart',
                            width: 450,
                            height: 180,
                            border: false,
                            captions: {
                                title: {
                                    text: 'Data 1',
                                    align: 'left'
                                }
                            },
                            store: {
                                type: 'STdashboard'
                            },
                            interactions: {
                                type: 'itemedit',
                                tooltip: {
                                    renderer: 'onEditTipRender'
                                },
                                renderer: 'onColumnEdit'
                            },
                            axes: [{
                                type: 'numeric',
                                position: 'left',
                                minimum: 30,
                                titleMargin: 20,
                                title: {
                                    text: 'Amount'
                                },
                                grid: {
                                    odd: {
                                        fillStyle: 'rgba(255, 255, 255, 0.06)'
                                    },
                                    even: {
                                        fillStyle: 'rgba(0, 0, 0, 0.03)'
                                    }
                                },
                                listeners: {
                                    rangechange: 'onAxisRangeChange'
                                }
                            }, {
                                type: 'category',
                                position: 'bottom'
                            }],
                            animation: Ext.isIE8 ? false : true,
                            series: {
                                type: 'bar3d',
                                xField: 'month',
                                yField: 'highF',
                                style: {
                                    minGapWidth: 5
                                },
                                highlight: {
                                    strokeStyle: 'black',
                                    fillStyle: 'gold'
                                },
                                label: {
                                    field: 'highF',
                                    display: 'insideEnd',
                                    renderer: 'onSeriesLabelRender'
                                }
                            },
                            listeners: {
                                afterrender: 'onAfterRender',
                                beginitemedit: 'onBeginItemEdit',
                                enditemedit: 'onEndItemEdit'
                            }
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    height: 180,
                    width: 450,
                    margin: '2 2 2 2',
                    border: false,
                    items: [
                        {
                            xtype: 'cartesian',
                            reference: 'chart',
                            width: 450,
                            height: 180,
                            border: false,
                            captions: {
                                title: {
                                    text: 'Data 2',
                                    align: 'left'
                                }
                            },
                            store: {
                                type: 'STdashboard'
                            },
                            interactions: {
                                type: 'itemedit',
                                tooltip: {
                                    renderer: 'onEditTipRender'
                                },
                                renderer: 'onColumnEdit'
                            },
                            axes: [{
                                type: 'numeric',
                                position: 'left',
                                minimum: 30,
                                titleMargin: 20,
                                title: {
                                    text: 'Amount'
                                },
                                listeners: {
                                    rangechange: 'onAxisRangeChange'
                                },
                                grid: {
                                    odd: {
                                        fillStyle: 'rgba(255, 255, 255, 0.06)'
                                    },
                                    even: {
                                        fillStyle: 'rgba(0, 0, 0, 0.03)'
                                    }
                                }
                            }, {
                                type: 'category',
                                position: 'bottom'
                            }],
                            animation: Ext.isIE8 ? false : true,
                            series: {
                                type: 'bar3d',
                                xField: 'month',
                                yField: 'pengeluaran',
                                style: {
                                    minGapWidth: 5
                                },
                                highlight: {
                                    strokeStyle: 'black',
                                    fillStyle: 'gold'
                                },
                                label: {
                                    field: 'pengeluaran',
                                    display: 'insideEnd',
                                    renderer: 'onSeriesLabelRender'
                                }
                            },
                            listeners: {
                                afterrender: 'onAfterRender',
                                beginitemedit: 'onBeginItemEdit',
                                enditemedit: 'onEndItemEdit'
                            }
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    height: 180,
                    width: 450,
                    margin: '2 2 2 2',
                    border: false,
                    items: [
                        {
                            xtype: 'cartesian',
                            reference: 'chart',
                            width: 450,
                            height: 180,
                            border: false,
                            captions: {
                                title: {
                                    text: 'Data 3',
                                    align: 'left'
                                }
                            },
                            store: {
                                type: 'STdashboard_year'
                            },
                            interactions: {
                                type: 'itemedit',
                                tooltip: {
                                    renderer: 'onEditTipRender'
                                },
                                renderer: 'onColumnEdit'
                            },
                            axes: [{
                                type: 'numeric',
                                position: 'left',
                                minimum: 30,
                                titleMargin: 20,
                                title: {
                                    text: 'Amount'
                                },
                                listeners: {
                                    rangechange: 'onAxisRangeChange'
                                },
                                grid: {
                                    odd: {
                                        fillStyle: 'rgba(255, 255, 255, 0.06)'
                                    },
                                    even: {
                                        fillStyle: 'rgba(0, 0, 0, 0.03)'
                                    }
                                }
                            }, {
                                type: 'category',
                                position: 'bottom'
                            }],
                            animation: Ext.isIE8 ? false : true,
                            series: {
                                type: 'bar3d',
                                xField: 'year',
                                yField: 'pengeluaran',
                                style: {
                                    minGapWidth: 5
                                },
                                highlight: {
                                    strokeStyle: 'black',
                                    fillStyle: 'gold'
                                },
                                label: {
                                    field: 'pengeluaran',
                                    display: 'insideEnd',
                                    renderer: 'onSeriesLabelRender'
                                }
                            },
                            listeners: {
                                afterrender: 'onAfterRender',
                                beginitemedit: 'onBeginItemEdit',
                                enditemedit: 'onEndItemEdit'
                            }
                        }

                    ]
                }
            ]

        },
        {
            xtype: 'container',
            layout: { type: 'hbox', pack: 'start', align: 'stretch' },
            items: [
                {
                    xtype: 'panel',
                    height: 230,
                    width: 200,
                    margin: '2 2 2 2',
                    title: 'JUL 2022',
                    items: [
                        {
                            xtype: 'polar',
                            reference: 'chart_polar',
                            height: 200,
                            width: 200,
                            border: false,
                            frame: false,
                            interactions: ['rotate'],
                            store: {
                                type: 'STdashboard_pie'
                            },
                            series: [
                                {
                                    type: 'pie',
                                    xField: 'data1',
                                    label: {
                                        field: 'os',
                                        display: 'inside',
                                        calloutLine: true
                                    },
                                    showInLegend: true,
                                    highlight: true,
                                    highlightCfg: {
                                        fill: '#ccc',
                                        'stroke-width': 10,
                                        stroke: '#fff'
                                    },
                                    donut: 50,
                                    tooltip: {
                                        trackMouse: true,
                                        renderer: 'onSeriesTooltipRender'
                                    }
                                }
                            ]
                        }
                    ]
                },

            ]
        }
    ]
});