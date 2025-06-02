Ext.define("TDK.INVENTORY.subaw_return.Csubaw_return", {
  extend: "Ext.app.ViewController",
  alias: "controller.Csubaw_return",
  init: function (view) {
    this.control({
      "subaw_return GRIDsubaw_return button[pid=btnew]": { click: this.btnew_click },
      "subaw_return grid[pid=GRIDsubaw_return]": { itemdblclick: this.GRIDsubaw_return_itemdblclick },
      "FRMsubaw_return button[pid=btsearch]": { click: this.btsearch_click },
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