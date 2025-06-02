Ext.define("NJC.INVENTORY_AW.inv_fg_in_aw.Cinv_fg_in_aw", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cinv_fg_in_aw",
  init: function (view) {
    this.control({
      "inv_fg_in_aw button[pid=btprocess_sync]": { click: this.btprocess_sync_click },
      "inv_fg_in_aw button[pid=btrefresh_main]": { click: this.btrefresh_main_click_with_cbo },
      /*"inv_fg_in_aw datefield[name=mainproduction_date]": { change: this.btrefresh_main_click },
      "inv_fg_in_aw combobox[name=CBO_FILTERKEY]": { change: this.btrefresh_main_click },*/

      "FRMinv_fg_in_aw_sync_wms button[pid=btrefresh]": { click: this.btrefresh_click },
      "FRMinv_fg_in_aw_sync_wms datefield[name=production_date]": { change: this.btrefresh_click },
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
  btrefresh_main_click_with_cbo: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var CBO_FILTERKEY = Ext.ComponentQuery.query("inv_fg_in_aw combobox[name=CBO_FILTERKEY]")[0];
      CBO_FILTERKEY.getStore().load();
      var GRID = Ext.ComponentQuery.query("inv_fg_in_aw GRIDinv_fg_in_aw grid")[0];
      GRID.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btrefresh_main_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var GRID = Ext.ComponentQuery.query("inv_fg_in_aw GRIDinv_fg_in_aw grid")[0];
      GRID.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btprocess_sync_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("FRMinv_fg_in_aw_sync_wms", "NJC.INVENTORY_AW.inv_fg_in_aw.FRMinv_fg_in_aw_sync_wms", mainpanel);
    } catch (ex) { 
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btproses_sync_wms_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var popup = Ext.ComponentQuery.query("FRMinv_fg_in_aw_sync_wms")[0];
      var grid_doublecheck = Ext.ComponentQuery.query("FRMinv_fg_in_aw_sync_wms grid[pid=GRIDsync_wms]")[0];

      if (grid_doublecheck.getStore().getDataSource().length < 1) {
        COMP.TipToast.toast("Error", "Data tidak ada", { cls: "danger", delay: 2000 });
        return false;
      }

      var vproddate = Ext.ComponentQuery.query("FRMinv_fg_in_aw_sync_wms datefield[name=production_date]")[0];
      var params = Ext.encode({
        method: "callMySP",
        proddate: moment(vproddate.getValue()).format("YYYY-MM-DD"),
        module: "proses",
      });

      var hasil = COMP.run.getservice(vconfig.service_api + "inv_fg_in_aw/inv_fg_in_aw", params, "POST", localStorage.getItem("ST_NJC_JWT"));
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
      var GRID = Ext.ComponentQuery.query("FRMinv_fg_in_aw_sync_wms grid[pid=GRIDsync_wms]")[0];
      GRID.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});
