Ext.define("NJC.INVENTORY_PLB.goods_out.datasync.live_tr.Clive_tr", {
  extend: "Ext.app.ViewController",
  alias: "controller.Clive_tr",
  init: function (view) {
    this.control({});
    this.listen({
      store: {},
    });
    this.var_global = {
      jwt: localStorage.getItem("ST_NJC_JWT_PLB"),
    };
    this.var_definition = {};
    this.renderpage();
  },
  formatAmount: function (value) {
    var text = Ext.util.Format.number(value, "0,000.00/i");
    return text;
  },
  formatqty: function (value) {
    var text = Ext.util.Format.number(value, "0,000/i");
    return text;
  },
  renderpage: function () {
    try {
      console.log("renderer Clive_tr");
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  GRIDlive_tr_load: function (grid) {
    try {
      var me = this;
      var STGRIDnew = new Ext.data.Store({
        autoLoad: true,
        remoteSort: true,
        remoteFilter: true,
        pageSize: 20,
        proxy: {
          type: "ajax",
          disableCaching: false,
          noCache: false,
          headers: { Authorization: "Bearer " + me.var_global.jwt },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "out_to_production/out_to_productions",
          extraParams: {
            method: "live_tr",
          },
          reader: {
            type: "json",
            rootProperty: "Rows",
            totalProperty: "TotalRows",
            successProperty: "success",
          },
        },
      });

      grid.reconfigure(STGRIDnew);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});
