Ext.define("TDK.INVENTORY.wip_out.Cwip_out", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cwip_out",
  init: function (view) {
    this.control({
      "wip_out GRIDwip_out button[pid=btnew]": { click: this.btnew_click },
      "wip_out grid[pid=GRIDwip_out]": { itemdblclick: this.GRIDwip_out_itemdblclick },
      "FRMwip_out button[pid=btsearch]": { click: this.btsearch_click },
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