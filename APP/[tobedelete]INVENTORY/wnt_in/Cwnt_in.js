Ext.define("TDK.INVENTORY.wnt_in.Cwnt_in", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cwnt_in",
  init: function (view) {
    this.control({
      "wnt_in GRIDwnt_in button[pid=btnew]": { click: this.btnew_click },
      "wnt_in grid[pid=GRIDwnt_in]": { itemdblclick: this.GRIDwnt_in_itemdblclick },
      "FRMwnt_in button[pid=btsearch]": { click: this.btsearch_click },
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