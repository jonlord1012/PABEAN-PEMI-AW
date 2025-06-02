Ext.define("NJC.MASTERS.mst_item_comp.best_part.best_part", {
  extend: "Ext.form.Panel",
  alias: "widget.best_part",
  reference: "best_part",
  config: {},
  requires: ["NJC.MASTERS.mst_item_comp.best_part.Cbest_part", "NJC.MASTERS.mst_item_comp.best_part.FRMbest_part"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cbest_part",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_best_part",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "FRMbest_part" }],
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
          ],
          // other options....
        },
      ],
    });

    this.callParent(arguments);
  },
});
