Ext.define("TDK.STOCK_OPNAME.sto_fg.Csto_fg", {
  extend: "Ext.app.ViewController",
  alias: "controller.Csto_fg",
  init: function (view) {
    this.control({
      "sto_fg GRIDsto_fg button[pid=btnew]": { click: this.btnew_click },
      "sto_fg grid[pid=GRIDsto_fg]": { itemdblclick: this.GRIDsto_fg_itemdblclick },
      "FRMsto_fg button[pid=btsearch]": { click: this.btsearch_click },
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