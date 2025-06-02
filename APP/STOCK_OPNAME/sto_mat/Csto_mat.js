Ext.define("TDK.STOCK_OPNAME.sto_mat.Csto_mat", {
  extend: "Ext.app.ViewController",
  alias: "controller.Csto_mat",
  init: function (view) {
    this.control({
      "sto_mat GRIDsto_mat button[pid=btnew]": { click: this.btnew_click },
      "sto_mat grid[pid=GRIDsto_mat]": { itemdblclick: this.GRIDsto_mat_itemdblclick },
      "FRMsto_mat button[pid=btsearch]": { click: this.btsearch_click },
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