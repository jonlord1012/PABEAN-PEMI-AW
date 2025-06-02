Ext.define("TDK.INVENTORY.inventory_return.Cinventory_return", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cinventory_return",
  init: function (view) {
    this.control({
      "inventory_return GRIDinventory_return button[pid=btnew]": { click: this.btnew_click },
      "inventory_return grid[pid=GRIDinventory_return]": { itemdblclick: this.GRIDinventory_return_itemdblclick },
      "FRMinventory_return button[pid=btsearch]": { click: this.btsearch_click },
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