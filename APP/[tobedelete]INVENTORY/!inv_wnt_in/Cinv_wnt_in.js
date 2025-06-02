Ext.define("TDK.INVENTORY.inv_wnt_in.Cinv_wnt_in", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cinv_wnt_in",
  init: function (view) {
    this.control({
      "inv_wnt_in GRIDinv_wnt_in button[pid=btnew]": { click: this.btnew_click },
      "inv_wnt_in grid[pid=GRIDinv_wnt_in]": { itemdblclick: this.GRIDinv_wnt_in_itemdblclick },
      "FRMinv_wnt_in button[pid=btsearch]": { click: this.btsearch_click },
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
  },
  formatqty: function (value) {
    var text = Ext.util.Format.number(value, "0,000.00/i");
    return text;
  },
  GRIDinv_wnt_in_load: function () {
    try {
      var STGRIDnew = new Ext.data.Store({
        autoLoad: true,
        remoteSort: true,
        remoteFilter: true,
        pageSize: 15,
        proxy: {
          type: "ajax",
          disableCaching: false,
          noCache: false,
          extraParams: {
            module: "receipt_detail",
          },
          headers: { Authorization: "Bearer" },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "inv_wnt/inv_wnts",
          reader: {
            type: "json",
            rootProperty: "Rows",
            totalProperty: "TotalRows",
            successProperty: "success",
          },
        },
      });

      var GRID = Ext.ComponentQuery.query("inv_wnt_in GRIDinv_wnt_in grid[pid=GRIDinv_wnt_in]")[0];
      GRID.reconfigure(STGRIDnew);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  }
});