Ext.define("TDK.INVENTORY.wnt_out.Cwnt_out", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cwnt_out",
  init: function (view) {
    this.control({
      "wnt_out GRIDwnt_out button[pid=btnew]": { click: this.btnew_click },
      "wnt_out grid[pid=GRIDwnt_out]": { itemdblclick: this.GRIDwnt_out_itemdblclick },
      "FRMwnt_out button[pid=btsearch]": { click: this.btsearch_click },
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