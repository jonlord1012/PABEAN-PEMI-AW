Ext.define("TDK.INVENTORY.wnt_return.Cwnt_return", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cwnt_return",
  init: function (view) {
    this.control({
      "wnt_return GRIDwnt_return button[pid=btnew]": { click: this.btnew_click },
      "wnt_return grid[pid=GRIDwnt_return]": { itemdblclick: this.GRIDwnt_return_itemdblclick },
      "FRMwnt_return button[pid=btsearch]": { click: this.btsearch_click },
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