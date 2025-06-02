Ext.define("TDK.INVENTORY.inventory_in.Cinventory_in", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cinventory_in",
  init: function (view) {
    this.control({
      "inventory_in GRIDinventory_in button[pid=btnew]": { click: this.btnew_click },
      "inventory_in grid[pid=GRIDinventory_in]": { itemdblclick: this.GRIDinventory_in_itemdblclick },
      "FRMinventory_in button[pid=btsearch]": { click: this.btsearch_click },
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