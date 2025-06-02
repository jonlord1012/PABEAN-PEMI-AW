Ext.define("TDK.INVENTORY_PLB.inv_wip_control_aw.Cinv_wip_control_aw", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cinv_wip_control_aw",
  init: function (view) {
    this.control({
      "inv_wip_control_aw dataview": { itemClick: this.Dodataview_click },

      "FRMwip_list_production_aw datefield[name=FRMwip_list_production_aw_from_date]": { change: this.FRMwip_list_production_aw_from_date_change },
      "FRMwip_list_production_aw button[pid=FRMwip_list_production_aw_btrefresh]": { click: this.FRMwip_list_production_aw_btrefresh_click },
      "FRMwip_list_production_aw button[pid=FRMwip_list_production_aw_getbc]": { click: this.FRMwip_list_production_aw_getbc_click },

      "FRMwip_stock_item_aw button[pid=FRMwip_stock_item_aw_btrefresh]": { click: this.FRMwip_stock_item_aw_btrefresh_click },
      "FRMwip_stock_item_aw grid[pid=GRIDmutasi_stock]": { itemdblClick: this.FRMwip_stock_item_aw_GRIDmutasi_stock_itemdblclick },

      "FRMwip_list_memo_scrap_aw grid[pid=GRIDmemo_scrap]": { itemdblClick: this.FRMwip_list_memo_scrap_aw_GRIDmemo_scrap_itemdblclick },
      "FRMwip_list_memo_scrap_aw button[pid=FRMwip_list_memo_scrap_aw_btrefresh]": { click: this.FRMwip_list_memo_scrap_aw_btrefresh_click },

      "FRMwip_list_bom_aw button[pid=FRMwip_list_bom_aw_btrefresh]": { click: this.FRMwip_list_bom_aw_btrefresh_click },

      "FRMwip_list_bchistory_aw grid[pid=GRIDFRMwip_list_bchistory_aw_header]": { itemdblClick: this.GRIDFRMwip_list_bchistory_aw_header_itemdblclick },
    });
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
  renderpage: function () {
    try {
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  Dodataview_click: function (dv, rec, e, index, el) {
    try {
      var vdt = rec.data;
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var vfname = "FRMwip_" + vdt.MODE_CONTROL;
      COMP.run.getmodulepopup(vfname, "TDK.INVENTORY_AW.inv_wip_control_aw." + vfname, mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMwip_list_production_aw_from_date_change: function () {
    try {
      var GRIDmain = Ext.ComponentQuery.query("FRMwip_list_production_aw grid[pid=GRIDFRMwip_list_production_aw]")[0];
      GRIDmain.getStore().load();

      var GRIDdetail = Ext.ComponentQuery.query("FRMwip_list_production_aw grid[pid=GRIDFRMwip_list_production_aw_itempart]")[0];
      GRIDdetail.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMwip_list_production_aw_btrefresh_click: function () {
    try {
      var GRIDmain = Ext.ComponentQuery.query("FRMwip_list_production_aw grid[pid=GRIDFRMwip_list_production_aw]")[0];
      GRIDmain.getStore().load();
      var GRIDdetail = Ext.ComponentQuery.query("FRMwip_list_production_aw grid[pid=GRIDFRMwip_list_production_aw_itempart]")[0];
      GRIDdetail.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMwip_list_production_aw_getbc_click: function () {
    try {
      var GRIDdetail = Ext.ComponentQuery.query("FRMwip_list_production_aw grid[pid=GRIDFRMwip_list_production_aw_itempart]")[0];
      if (GRIDdetail.getStore().getDataSource().length < 1) {
        COMP.TipToast.toast("Error", "Data tidak ada", { cls: "danger", delay: 2000 });
        return false;
      }

      var from_date = Ext.ComponentQuery.query("FRMwip_list_production_aw datefield[name=FRMwip_list_production_aw_from_date]")[0].getValue();
      if (from_date === null || from_date === "") {
        COMP.TipToast.toast("Error", "Pilih tanggal Produksi lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      var params = Ext.encode({
        method: "PROSES_SP_WIP_OUT_GET_BC",
        from_date: moment(from_date).format("YYYY-MM-DD"),
        module: "proses_sync",
      });

      var hasil = COMP.run.getservice(vconfig.service_api + "inv_wip_control_aw/inv_wip_control_aw", params, "POST", localStorage.getItem("ST_NJC_JWT_PLB"));
      hasil.then(function (content) {
        var val = Ext.decode(content, true);
        if (val.success == "true") {
          COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 2000 });
          GRIDdetail.getStore().load();
        } else {
          COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 2000 });
        }
      }, this);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMwip_stock_item_aw_btrefresh_click: function () {
    try {
      var GRIDmutasi_stock = Ext.ComponentQuery.query("FRMwip_stock_item_aw grid[pid=GRIDmutasi_stock]")[0];
      GRIDmutasi_stock.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMwip_stock_item_aw_GRIDmutasi_stock_itemdblclick: function () {
    try {
      var me = this;
      var GRIDstock_bydocument = Ext.ComponentQuery.query("FRMwip_stock_item_aw grid[pid=GRIDstock_bydocument]")[0];
      GRIDstock_bydocument.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMwip_list_memo_scrap_aw_GRIDmemo_scrap_itemdblclick: function () {
    try {
      var me = this;
      var GRIDmemo_scrap_item = Ext.ComponentQuery.query("FRMwip_list_memo_scrap_aw grid[pid=GRIDmemo_scrap_item]")[0];
      GRIDmemo_scrap_item.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  GRIDFRMwip_list_bchistory_aw_header_itemdblclick: function () {
    try {
      var me = this;
      var GRIDFRMwip_list_bchistory_aw_detail = Ext.ComponentQuery.query("FRMwip_list_bchistory_aw grid[pid=GRIDFRMwip_list_bchistory_aw_detail]")[0];
      GRIDFRMwip_list_bchistory_aw_detail.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btcancel_memo_scrap: function (xgrid, rowIndex) {
    try {
      var me = this;
      var GRIDmemo_scrap_item = Ext.ComponentQuery.query("FRMwip_list_memo_scrap_aw grid[pid=GRIDmemo_scrap_item]")[0];
      var GRIDmemo_scrap = Ext.ComponentQuery.query("FRMwip_list_memo_scrap_aw grid[pid=GRIDmemo_scrap]")[0];
      var vdt = xgrid.getStore().getAt(rowIndex).data;
      xgrid.getSelectionModel().select(rowIndex);
      Ext.MessageBox.confirm(
        "Cancel Memo Scrap",
        "No Dokumen Memo : " + vdt.OUT_NO,
        function (button) {
          if (button === "yes") {
            var params = Ext.encode({
              method: "proses_cancel",
              module: "cancel_memo_scrap",
              vdata: Ext.encode(vdt),
            });
            var hasil = COMP.run.getservice(vconfig.service_api + "inv_wip_control_aw/inv_wip_control_aw", params, "POST", me.var_global.jwt);
            hasil.then(function (content) {
              var val = Ext.decode(content, true);
              if (val[0].success === "true") {
                COMP.TipToast.toast("Success", val[0].message, { cls: "success", delay: 3000 });
                GRIDmemo_scrap_item.getStore().load();
                GRIDmemo_scrap.getStore().removeAll();
              } else {
                popup.close();
                COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 3000 });
              }
            }, this);
          }
        },
        this
      );
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMwip_list_memo_scrap_aw_btrefresh_click: function () {
    try {
      var GRIDmemo_scrap_item = Ext.ComponentQuery.query("FRMwip_list_memo_scrap_aw grid[pid=GRIDmemo_scrap_item]")[0];
      var GRIDmemo_scrap = Ext.ComponentQuery.query("FRMwip_list_memo_scrap_aw grid[pid=GRIDmemo_scrap]")[0];
      GRIDmemo_scrap.getStore().load();
      GRIDmemo_scrap_item.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMwip_list_bom_aw_btrefresh_click: function () {
    try {
      var GRIDFRMwip_list_bom_aw = Ext.ComponentQuery.query("FRMwip_list_bom_aw grid[pid=GRIDFRMwip_list_bom_aw]")[0];

      GRIDFRMwip_list_bom_aw.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});
