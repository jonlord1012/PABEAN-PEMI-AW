Ext.define("NJC.REPORTS_PLB.ext_rpt_mutasi.ext_rpt_mutasi", {
  extend: "Ext.form.Panel",
  alias: "widget.ext_rpt_mutasi",
  reference: "ext_rpt_mutasi",
  config: {},
  requires: ["NJC.REPORTS_PLB.ext_rpt_mutasi.Cext_rpt_mutasi", "NJC.REPORTS_PLB.ext_rpt_mutasi.GRIDext_rpt_mutasi"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cext_rpt_mutasi",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelext_rpt_mutasi",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDext_rpt_mutasi" }],
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
                    { xtype: "datefield", labelWidth: 60, width: 180, fieldLabel: "PERIODE", name: "tfromdate", fieldCls: "fieldinput", readOnly: false, format: "Y-m-d", value: Ext.Date.add(new Date(), Ext.Date.DAY, -1) },
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
