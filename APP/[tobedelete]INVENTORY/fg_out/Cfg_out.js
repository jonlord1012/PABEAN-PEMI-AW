Ext.define("TDK.INVENTORY.fg_out.Cfg_out", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cfg_out",
  init: function (view) {
    this.control({
      "fg_out GRIDfg_out button[pid=btnew]": { click: this.btnew_click },
      "fg_out grid[pid=GRIDfg_out]": { itemdblclick: this.GRIDfg_out_itemdblclick },
      "FRMfg_out button[pid=btsearch]": { click: this.btsearch_click },
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