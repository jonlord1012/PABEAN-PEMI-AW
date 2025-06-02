Ext.define("TDK.INVENTORY.inv_fg_return.Cinv_fg_return", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cinv_fg_return",
  init: function (view) {
    this.control({
      "inv_fg_return button[pid=btprocess_sync]": { click: this.btprocess_sync_click },
      "inv_fg_return button[pid=btrefresh_main]": { click: this.btrefresh_main_click_with_cbo },

      "FRMsync_return button[pid=btrefresh]": { click: this.btrefresh_click },
      "FRMsync_return datefield[name=RegisterDate]": { change: this.btrefresh_click },

      "FRMfg_out_scrapitem button[pid=out_toscrap_btselectpart]": { click: this.out_toscrap_btselectpart_click },
      "FRMfg_out_scrapitem button[pid=btitem_save]": { click: this.out_scrapitem_btitem_save_click },
    });
    this.listen({
      store: {},
    });
    this.var_global = {
      jwt: localStorage.getItem("ST_NJC_JWT"),
    };
    this.var_definition = {};
    this.renderpage();
  },
  formatAmount: function (value) {
    var text = Ext.util.Format.number(value, "0,000.00/i");
    return text;
  },
  formatqty: function (value) {
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
  btrefresh_main_click_with_cbo: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var GRID = Ext.ComponentQuery.query("inv_fg_return GRIDinv_fg_return grid")[0];
      GRID.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btrefresh_main_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var GRID = Ext.ComponentQuery.query("inv_fg_return GRIDinv_fg_return grid")[0];
      GRID.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btprocess_sync_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("FRMsync_return", "TDK.INVENTORY.inv_fg_return.FRMinv_fg_return_sync_finishgood", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btproses_sync_finishgood_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var popup = Ext.ComponentQuery.query("FRMsync_return")[0];
      var grid_finishgood = Ext.ComponentQuery.query("FRMsync_return grid[pid=GRIDsync_return]")[0];

      if (grid_finishgood.getStore().getDataSource().length < 1) {
        COMP.TipToast.toast("Error", "Data tidak ada", { cls: "danger", delay: 2000 });
        return false;
      }

      var vproddate = Ext.ComponentQuery.query("FRMsync_return datefield[name=RegisterDate]")[0];
      var params = Ext.encode({
        method: "PROSES_SP_FG_GET_FINISHGOOD",
        proddate: moment(vproddate.getValue()).format("YYYY-MM-DD"),
        module: "proses",
      });

      var hasil = COMP.run.getservice(vconfig.service_api + "inv_fg_return/inv_fg_return", params, "POST", localStorage.getItem("ST_NJC_JWT"));
      hasil.then(function (content) {
        var val = Ext.decode(content, true);
        if (val.success == "true") {
          COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 2000 });
          popup.close();
        } else {
          COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 2000 });
        }
      }, this);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btrefresh_click: function () {
    try {
      var me = this;
      var GRID = Ext.ComponentQuery.query("FRMsync_return grid[pid=GRIDsync_return]")[0];
      GRID.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btdetail_rows_click: function (xgrid, rowIndex) {
    try {
      xgrid.getSelectionModel().select(rowIndex);
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("fgreturn_dokumen_detail_fgreturn", "TDK.INVENTORY.inv_fg_return.dokumen_detail_fgreturn.dokumen_detail_fgreturn", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});
