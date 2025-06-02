Ext.define("TDK.STOCK_OPNAME.sto_periode.Csto_periode", {
  extend: "Ext.app.ViewController",
  alias: "controller.Csto_periode",
  init: function (view) {
    this.control({
      "sto_periode GRIDsto_periode button[pid=btnew]": { click: this.btnew_click },
      "sto_periode grid[pid=GRIDsto_periode]": { itemdblclick: this.GRIDsto_periode_itemdblclick },
      "FRMsto_periode button[pid=btsearch]": { click: this.btsearch_click },
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