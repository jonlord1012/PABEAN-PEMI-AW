Ext.define("TDK.INVENTORY.inv_subassy_aw_control.Cinv_subassy_aw_control", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cinv_subassy_aw_control",
  init: function (view) {
    this.control({
      "inv_subassy_aw_control dataview": { itemClick: this.Dodataview_click },
      "inv_subassy_aw_control button[pid=menu_back]": { click: this.menu_back_click },
    });
    this.listen({
      store: {},
    });
    this.var_global = {
      jwt: localStorage.getItem("ST_NJC_JWT"),
    };
    this.var_definition = {};
    this.renderpage();
  },
  formatqty: function (value) {
    var text = Ext.util.Format.number(value, "0,000.00/i");
    return text;
  },
  formatAmount: function (value) {
    var text = Ext.util.Format.number(value, "0,000.00/i");
    return text;
  },
  renderpage: function () {
    try {
      console.log("renderer controller");
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  menu_back_click: function () {
    try {
      var me_panel = Ext.ComponentQuery.query("inv_subassy_aw_control[pid=panelinv_subassy_aw_control]")[0];
      me_panel.setActiveItem(0);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  Dodataview_click: function (dv, rec, e, index, el) {
    try {
      var vname = "FRMinv_subassy_aw_control_" + rec.data.MODE_CONTROL;
      var me_panel = Ext.ComponentQuery.query("inv_subassy_aw_control[pid=panelinv_subassy_aw_control]")[0];

      var npage = COMP.run.getnewpage(vname, "TDK.INVENTORY.inv_subassy_aw_control." + vname);
      me_panel.setActiveItem(npage);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});
