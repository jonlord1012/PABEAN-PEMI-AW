Ext.define("TDK.INVENTORY.fg_in.Cfg_in", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cfg_in",
  init: function (view) {
    this.control({
      "fg_in GRIDfg_in button[pid=btnew]": { click: this.btnew_click },
      "fg_in grid[pid=GRIDfg_in]": { itemdblclick: this.GRIDfg_in_itemdblclick },
      "FRMfg_in button[pid=btsearch]": { click: this.btsearch_click },
    });
    this.listen({
      store: {},
    });
    this.var_global = {};
    this.var_definition = {};
    this.renderpage();
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
  }
});