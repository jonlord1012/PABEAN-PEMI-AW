Ext.define("TDK.INVENTORY.fg_return.Cfg_return", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cfg_return",
  init: function (view) {
    this.control({
      "fg_return GRIDfg_return button[pid=btnew]": { click: this.btnew_click },
      "fg_return grid[pid=GRIDfg_return]": { itemdblclick: this.GRIDfg_return_itemdblclick },
      "FRMfg_return button[pid=btsearch]": { click: this.btsearch_click },
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