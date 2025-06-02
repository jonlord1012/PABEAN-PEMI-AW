Ext.define("NJC.INVENTORY_PLB.goods_out.trans.proses_out.Cproses_out", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cproses_out",
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
      console.log("renderer Cproses_out");
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
  btmapping_outproduction: function () {
    try {
      var me = this;
      var GRID = Ext.ComponentQuery.query("FRMproses_out grid[pid=GRIDout_production]")[0];
      var FRM_MAIN = Ext.ComponentQuery.query("FRMproses_out form")[0];
      var VTANGGAL_OUT = Ext.ComponentQuery.query("FRMproses_out datefield[name=TANGGAL_OUT]")[0];
      console.log(GRID);
      if (VTANGGAL_OUT.getValue() === null) {
        COMP.TipToast.toast("Error", "Pilih Tanggal lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      var VCHCEK_INVOICE = Ext.ComponentQuery.query("FRMproses_out checkbox[name=CHCEK_INVOICE]")[0];

      var params = Ext.encode({
        method: "get_datamapping",
        dateout: moment(VTANGGAL_OUT.getValue()).format("YYYY-MM-DD"),
        check_invoice: VCHCEK_INVOICE.getValue(),
      });

      var hasil = COMP.run.getservice(vconfig.service_api + "out_to_production/out_to_production", params, "POST", me.var_global.jwt);
      hasil.then(function (content) {
        var val = Ext.decode(content, true);
        if (val.success === "true") {
          COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 3000 });
          var vdtjson = Ext.decode(val.vjsondata);
          var STnew = new Ext.data.Store({
            data: vdtjson,
          });
          GRID.reconfigure(STnew);
        } else {
          COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 3000 });
        }
      }, this);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});
