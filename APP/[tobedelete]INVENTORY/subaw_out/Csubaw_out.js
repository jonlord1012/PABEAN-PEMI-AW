Ext.define("TDK.INVENTORY.subaw_out.Csubaw_out", {
  extend: "Ext.app.ViewController",
  alias: "controller.Csubaw_out",
  init: function (view) {
    this.control({
      "subaw_out GRIDsubaw_out button[pid=btnew]": { click: this.btnew_click },
      "subaw_out grid[pid=GRIDsubaw_out]": { itemdblclick: this.GRIDsubaw_out_itemdblclick },
      "FRMsubaw_out button[pid=btsearch]": { click: this.btsearch_click },
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