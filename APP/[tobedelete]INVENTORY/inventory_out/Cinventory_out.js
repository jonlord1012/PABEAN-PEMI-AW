Ext.define("TDK.INVENTORY.inventory_out.Cinventory_out", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cinventory_out",
  init: function (view) {
    this.control({
      "inventory_out GRIDinventory_out button[pid=btnew]": { click: this.btnew_click },
      "inventory_out grid[pid=GRIDinventory_out]": { itemdblclick: this.GRIDinventory_out_itemdblclick },
      "FRMinventory_out button[pid=btsearch]": { click: this.btsearch_click },
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