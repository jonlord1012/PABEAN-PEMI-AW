Ext.define("NJC.STOCK_OPNAME.sto_wt.Csto_wt", {
  extend: "Ext.app.ViewController",
  alias: "controller.Csto_wt",
  init: function (view) {
    this.control({
      "sto_wt GRIDsto_wt button[pid=btnew]": { click: this.btnew_click },
      "sto_wt grid[pid=GRIDsto_wt]": { itemdblclick: this.GRIDsto_wt_itemdblclick },
      "FRMsto_wt button[pid=btsearch]": { click: this.btsearch_click },
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