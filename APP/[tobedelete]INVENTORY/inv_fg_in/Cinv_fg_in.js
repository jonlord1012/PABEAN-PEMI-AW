Ext.define("TDK.INVENTORY.inv_fg_in.Cinv_fg_in", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cinv_fg_in",
  init: function (view) {
    this.control({
      "inv_fg_in [pid=btprocess_sync]": { click: this.btprocess_sync_click },
      "inv_fg_in button[pid=btrefresh_main]": { click: this.btrefresh_main_click },

      "FRMinv_fg_in_sync_finishgood datefield[name=finishgood_date]": { change: this.finishgood_date_change },
      "FRMinv_fg_in_sync_finishgood button[pid=btrefresh]": { click: this.finishgood_date_change },
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
  btrefresh_main_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var GRID = Ext.ComponentQuery.query("inv_fg_in GRIDinv_fg_in grid")[0];
      GRID.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btdetail_rows_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("fgin_dokumen_detail", "TDK.INVENTORY.inv_fg_in.dokumen_detail_fgin.dokumen_detail_fgin", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btprocess_sync_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("FRMinv_fg_in_sync_finishgood", "TDK.INVENTORY.inv_fg_in.FRMinv_fg_in_sync_finishgood", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btproses_sync_finishgood_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var popup = Ext.ComponentQuery.query("FRMinv_fg_in_sync_finishgood")[0];
      var grid_finishgood = Ext.ComponentQuery.query("FRMinv_fg_in_sync_finishgood grid[pid=GRIDsync_finishgood]")[0];

      var GRIDmain = Ext.ComponentQuery.query("GRIDinv_fg_in grid[pid=GRIDinv_fg_in]")[0];

      if (grid_finishgood.getStore().getDataSource().length < 1) {
        COMP.TipToast.toast("Error", "Data tidak ada", { cls: "danger", delay: 2000 });
        return false;
      }

      var vfg_date = Ext.ComponentQuery.query("FRMinv_fg_in_sync_finishgood datefield[name=finishgood_date]")[0];
      var params = Ext.encode({
        method: "SP_INV_FG_IN",
        fgdate: moment(vfg_date.getValue()).format("YYYY-MM-DD"),
        module: "proses_data",
      });

      var hasil = COMP.run.getservice(vconfig.service_api + "inv_fg_in/inv_fg_in", params, "POST", localStorage.getItem("ST_NJC_JWT"));
      hasil.then(function (content) {
        var val = Ext.decode(content, true);
        if (val.success == "true") {
          COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 2000 });
          popup.close();
          GRIDmain.getStore().load();
        } else {
          COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 2000 });
        }
      }, this);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  finishgood_date_change: function () {
    try {
      var GRIDsync = Ext.ComponentQuery.query("FRMinv_fg_in_sync_finishgood grid[pid=GRIDsync_finishgood]")[0];
      GRIDsync.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btdetail_poly_click: function (cmp, idx) {
    try {
      var GRIDmain = Ext.ComponentQuery.query("GRIDinv_fg_in grid[pid=GRIDinv_fg_in]")[0];
      GRIDmain.getSelectionModel().select(idx);

      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("FRMinv_fg_in_polyinfo", "TDK.INVENTORY.inv_fg_in.FRMinv_fg_in_polyinfo", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});
