Ext.define("TDK.INVENTORY.inv_subaw_return.Cinv_subaw_return", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cinv_subaw_return",
  init: function (view) {
    this.control({
      "inv_subaw_return GRIDinv_subaw_return button[pid=btnew]": { click: this.btnew_click },
      "inv_subaw_return grid[pid=GRIDinv_subaw_return]": { itemdblclick: this.GRIDinv_subaw_return_itemdblclick },
      "FRMinv_subaw_return button[pid=btsearch]": { click: this.btsearch_click },
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