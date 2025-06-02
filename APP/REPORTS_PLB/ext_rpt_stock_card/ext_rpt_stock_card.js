Ext.define("NJC.REPORTS_PLB.ext_rpt_stock_card.ext_rpt_stock_card", {
  extend: "Ext.form.Panel",
  alias: "widget.ext_rpt_stock_card",
  reference: "ext_rpt_stock_card",
  title: "STOCK CARD ",
  config: {},
  requires: ["NJC.REPORTS_PLB.ext_rpt_stock_card.Cext_rpt_stock_card", "NJC.REPORTS_PLB.ext_rpt_stock_card.GRIDext_rpt_stock_card"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cext_rpt_stock_card",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelext_rpt_stock_card",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDext_rpt_stock_card" }],
      dockedItems: [
        {
          xtype: "toolbar",
          dock: "top",
          items: [
            "-",
            {
              xtype: "container",
              layout: "hbox",
              items: [
                {
                  xtype: "container",
                  layout: "hbox",
                  items: [
                    { xtype: "datefield", labelWidth: 60, width: 180, fieldLabel: "PERIODE", name: "tfromdate", fieldCls: "fieldinput", readOnly: false, format: "Y-m-d", value: new Date() },
                    { xtype: "datefield", width: 120, name: "ttodate", fieldCls: "fieldinput", readOnly: false, format: "Y-m-d", value: new Date() },

                    { xtype: "textfield", labelWidth: 110, width: 300, fieldLabel: "ARTICLE CODE", name: "article_code", fieldCls: "fieldlock", maskRe: /[0-9.-]/, },
                  ],
                },

                {
                  xtype: "button",
                  pid: "btsearch",
                  icon: vconfig.getstyle + "icon/search.ico",
                  tooltip: "search",
                  handler: "btsearch_click"
                },
              ],
            },
            "->",
            {
              xtype: "button",
              text: "Export to",
              menu: {
                defaults: {
                  handler: "exportTo",
                },
                items: [
                  {
                    text: "Excel xlsx",
                    icon: vconfig.getstyle + "icon/exceldownload.png",
                    cfg: {
                      type: "excel07",
                      ext: "xlsx",
                    },
                  },
                ],
              },
            },
          ],
          // other options....
        },
      ],
    });

    this.callParent(arguments);
  },
});
