Ext.define("NJC.REPORTS.int_rpt_pemasukan.int_rpt_pemasukan", {
  extend: "Ext.form.Panel",
  alias: "widget.int_rpt_pemasukan",
  reference: "int_rpt_pemasukan",
  config: {},
  requires: ["NJC.REPORTS.int_rpt_pemasukan.Cint_rpt_pemasukan", "NJC.REPORTS.int_rpt_pemasukan.GRIDint_rpt_pemasukan"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cint_rpt_pemasukan",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelint_rpt_pemasukan",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDint_rpt_pemasukan" }],
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
