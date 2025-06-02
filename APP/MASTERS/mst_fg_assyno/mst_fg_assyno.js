Ext.define("TDK.MASTERS.mst_fg_assyno.mst_fg_assyno", {
  extend: "Ext.form.Panel",
  alias: "widget.mst_fg_assyno",
  reference: "mst_fg_assyno",
  config: {},
  requires: ["TDK.MASTERS.mst_fg_assyno.GRIDmst_fg_assyno", "TDK.MASTERS.mst_fg_assyno.Cmst_fg_assyno"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cmst_fg_assyno",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelmst_fg_assyno",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDmst_fg_assyno" }],
      dockedItems: [
        {
          xtype: "toolbar",
          height: 30,
          dock: "top",
          items: [
            { xtype: "button", text: "New Input AssyNo", pid: "btnew", icon: vconfig.getstyle + "icon/add.png", tooltip: "New" },
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
