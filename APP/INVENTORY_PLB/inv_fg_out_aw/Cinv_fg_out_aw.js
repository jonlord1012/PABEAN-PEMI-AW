Ext.define("NJC.INVENTORY_AW.inv_fg_out_aw.Cinv_fg_out_aw", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cinv_fg_out_aw",
  init: function (view) {
    this.control({
      "inv_fg_out_aw GRIDinv_fg_out_aw button[pid=btnew]": { click: this.btnew_click },
      "inv_fg_out_aw grid[pid=GRIDinv_fg_out_aw]": { itemdblclick: this.GRIDinv_fg_out_aw_itemdblclick },
      "FRMinv_fg_out_aw button[pid=btsearch]": { click: this.btsearch_click },
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