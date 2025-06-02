Ext.define("NJC.MASTERS.mst_item_comp.mst_item_comp", {
  extend: "Ext.form.Panel",
  alias: "widget.mst_item_comp",
  reference: "mst_item_comp",
  config: {},
  requires: ["NJC.MASTERS.mst_item_comp.FRMmst_item_comp", "NJC.MASTERS.mst_item_comp.Cmst_item_comp"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Cmst_item_comp",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "panel",
      pid: "panelmst_item_comp",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "FRMmst_item_comp" }],
      dockedItems: [
        {
          xtype: "toolbar",
          dock: "top",
          items: [
            "-",
            {
              xtype: "combobox",
              name: "CBO_PART",
              fieldLabel: "Component Item/Part",
              labelWidth: 150,
              width: 350,
              displayField: "DEFNAME",
              valueField: "DEFCODE",
              fieldCls: "fieldinput",
              allowBlank: false,
              queryMode: "local",
              forceSelection: true,
              typeAhead: true,
              minChars: 0,
              anyMatch: true,
              value: "group_part",
              store: new Ext.data.Store({
                data: [
                  { DEFCODE: "group_part", DEFNAME: "Group Item/Part" },
                  { DEFCODE: "category_part", DEFNAME: "Category Item/Part" },
                  { DEFCODE: "base_part", DEFNAME: "Base Item/Part" },
                  { DEFCODE: "type_part", DEFNAME: "Type Item/Part" },
                  { DEFCODE: "uom_part", DEFNAME: "UOM Item/Part" },
                ],
                fields: ["DEFCODE", "DEFNAME"],
              }),
            },
            "-",
          ],
          // other options....
        },
      ],
    });

    this.callParent(arguments);
  },
});
