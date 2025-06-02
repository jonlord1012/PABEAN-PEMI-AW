Ext.define("NJC.MASTERS.mst_item_comp.base_part.base_part", {
  extend: "Ext.form.Panel",
  alias: "widget.base_part",
  reference: "base_part",
  config: {},
  requires: ["NJC.MASTERS.mst_item_comp.base_part.Cbase_part", "NJC.MASTERS.mst_item_comp.base_part.FRMbase_part"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cbase_part",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_base_part",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "FRMbase_part" }],
      dockedItems: [
        {
          xtype: "toolbar",
          height: 30,
          dock: "top",
          items: [
            { xtypeL: "tbspacer", width: 5 },
            { xtype: "button", text: "New Input", pid: "btnew_input", icon: vconfig.getstyle + "icon/new.ico", tooltip: "New Input Data" },
            { xtype: "button", text: "Save", pid: "btsave", icon: vconfig.getstyle + "icon/save.gif", tooltip: "Save Input Data" },
            { xtype: "button", text: "Delete", pid: "btdelete", icon: vconfig.getstyle + "icon/delete.png", tooltip: "Delete Data" },
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
