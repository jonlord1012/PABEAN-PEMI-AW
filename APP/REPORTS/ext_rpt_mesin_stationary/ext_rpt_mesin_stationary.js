Ext.define("TDK.REPORTS.ext_rpt_mesin_stationary.ext_rpt_mesin_stationary", {
  extend: "Ext.form.Panel",
  alias: "widget.ext_rpt_mesin_stationary",
  reference: "ext_rpt_mesin_stationary",
  config: {},
  requires: ["TDK.REPORTS.ext_rpt_mesin_stationary.Cext_rpt_mesin_stationary", "TDK.REPORTS.ext_rpt_mesin_stationary.GRIDext_rpt_mesin_stationary"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cext_rpt_mesin_stationary",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelext_rpt_mesin_stationary",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDext_rpt_mesin_stationary" }],
      dockedItems: [
        {
          xtype: "toolbar",
          dock: "top",
          items: [
            "-",
            {
              xtype: "combobox",
              name: "CBO_SOURCE",
              fieldLabel: "FACTORY",
              labelWidth: 60,
              width: 150,
              displayField: "COMBO",
              valueField: "ID_COMPANY",
              fieldCls: "fieldinput",
              allowBlank: false,
              queryMode: "local",
              forceSelection: true,
              typeAhead: true,
              minChars: 0,
              anyMatch: true,
              value: "2",
              store: new Ext.data.Store({
                data: [
                  { ID_COMPANY: "0", COMBO: "All Data" },
                  { ID_COMPANY: "1", COMBO: "AW" },
                  { ID_COMPANY: "2", COMBO: "WH" },
                ],
                fields: ["ID_COMPANY", "COMBO"],
              }),
            },
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
