Ext.define("TDK.INVENTORY.wip_in.Cwip_in", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cwip_in",
  init: function (view) {
    this.control({
      "wip_in GRIDwip_in button[pid=btnew]": { click: this.btnew_click },
      "wip_in grid[pid=GRIDwip_in]": { itemdblclick: this.GRIDwip_in_itemdblclick },
      "FRMwip_in button[pid=btsearch]": { click: this.btsearch_click },
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