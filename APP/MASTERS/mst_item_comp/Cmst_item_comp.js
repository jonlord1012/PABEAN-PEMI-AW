Ext.define("NJC.MASTERS.mst_item_comp.Cmst_item_comp", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cmst_item_comp",
  init: function (view) {
    this.control({
      "mst_item_comp combobox[name=CBO_PART]": { select: this.CBO_PART_select },
    });
    this.renderpage();
  },
  renderpage: function () {
    try {
      var FRM = Ext.ComponentQuery.query("mst_item_comp FRMmst_item_comp")[0];
      var npage = Ext.create("NJC.MASTERS.mst_item_comp.group_part.group_part");
      FRM.removeAll();
      FRM.add(npage);
    } catch (err) {
      COMP.TipToast.toast("Error", err.message, { cls: "danger", delay: 2000 });
    }
  },
  CBO_PART_select: function (cmp, rec) {
    try {
      var vmodule = rec.data.DEFCODE;
      var FRM = Ext.ComponentQuery.query("mst_item_comp FRMmst_item_comp")[0];
      var npage = Ext.create("NJC.MASTERS.mst_item_comp." + vmodule + "." + vmodule);
      FRM.removeAll();
      FRM.add(npage);
    } catch (err) {
      COMP.TipToast.toast("Error", err.message, { cls: "danger", delay: 2000 });
    }
  },
});
