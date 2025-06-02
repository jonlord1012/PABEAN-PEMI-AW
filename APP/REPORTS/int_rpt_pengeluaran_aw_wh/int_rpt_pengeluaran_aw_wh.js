Ext.define("TDK.REPORTS.int_rpt_pengeluaran_aw_wh.int_rpt_pengeluaran_aw_wh", {
  extend: "Ext.form.Panel",
  alias: "widget.int_rpt_pengeluaran_aw_wh",
  reference: "int_rpt_pengeluaran_aw_wh",
  config: {},
  requires: ["TDK.REPORTS.int_rpt_pengeluaran_aw_wh.Cint_rpt_pengeluaran_aw_wh", "TDK.REPORTS.int_rpt_pengeluaran_aw_wh.GRIDint_rpt_pengeluaran_aw_wh"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cint_rpt_pengeluaran_aw_wh",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelint_rpt_pengeluaran_aw_wh",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDint_rpt_pengeluaran_aw_wh" }],
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
