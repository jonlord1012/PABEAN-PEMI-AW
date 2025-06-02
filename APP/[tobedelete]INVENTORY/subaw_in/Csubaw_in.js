Ext.define("TDK.INVENTORY.subaw_in.Csubaw_in", {
  extend: "Ext.app.ViewController",
  alias: "controller.Csubaw_in",
  init: function (view) {
    this.control({
      "subaw_in GRIDsubaw_in button[pid=btnew]": { click: this.btnew_click },
      "subaw_in grid[pid=GRIDsubaw_in]": { itemdblclick: this.GRIDsubaw_in_itemdblclick },
      "FRMsubaw_in button[pid=btsearch]": { click: this.btsearch_click },
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