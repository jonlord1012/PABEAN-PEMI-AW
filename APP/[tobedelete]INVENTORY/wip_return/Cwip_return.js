Ext.define("TDK.INVENTORY.wip_return.Cwip_return", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cwip_return",
  init: function (view) {
    this.control({
      "wip_return GRIDwip_return button[pid=btnew]": { click: this.btnew_click },
      "wip_return grid[pid=GRIDwip_return]": { itemdblclick: this.GRIDwip_return_itemdblclick },
      "FRMwip_return button[pid=btsearch]": { click: this.btsearch_click },
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