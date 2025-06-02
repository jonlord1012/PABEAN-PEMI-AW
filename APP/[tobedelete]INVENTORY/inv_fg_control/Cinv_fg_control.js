Ext.define("TDK.INVENTORY.inv_fg_control.Cinv_fg_control", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cinv_fg_control",
  init: function (view) {
    this.control({
      "inv_fg_control dataview": { itemClick: this.Dodataview_click },
      "button[pid=FRMifc_stock_product_btrefresh]": { click: this.FRMifc_stock_product_btrefresh_click },
      "button[pid=FRMifc_list_memo_scrap_btrefresh]": { click: this.FRMifc_list_memo_scrap_btrefresh_click },
      "button[pid=FRMifc_stock_productpending_btrefresh]": { click: this.FRMifc_stock_productpending_btrefresh_click },
      "button[pid=FRMifc_report_stock_btrefresh]": { click: this.FRMifc_report_stock_btrefresh_click },
      
      "FRMifc_report_stock combobox[name=CBO_COMPANY]": { change: this.FRMifc_report_stock_btrefresh_click },
      "FRMifc_report_stock combobox[name=CBO_PARTGROUP]": { change: this.FRMifc_report_stock_btrefresh_click },
      "FRMifc_report_stock button[pid=FRMifc_report_stock_btsearch]": { click: this.FRMifc_report_stock_btsearch_click },
      "button[pid=FRMifc_report_summary_btrefresh]": { click: this.FRMifc_report_summary_btrefresh_click },
      "FRMifc_report_summary combobox[name=CBO_COMPANY]": { change: this.FRMifc_report_summary_btrefresh_click },
      "FRMifc_report_summary combobox[name=CBO_PARTGROUP]": { change: this.FRMifc_report_summary_btrefresh_click },
      "FRMifc_report_summary button[pid=FRMifc_report_summary_btsearch]": { click: this.FRMifc_report_summary_btsearch_click },
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
      var vfname = "FRMifc_" + vdt.MODE_CONTROL;
      COMP.run.getmodulepopup(vfname, "TDK.INVENTORY.inv_fg_control." + vfname, mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMifc_stock_product_btrefresh_click: function () {
    try {
      var me = this;
      var GRIDmutasi_stock = Ext.ComponentQuery.query("FRMifc_stock_product grid[pid=GRIDmutasi_stock]")[0];
      GRIDmutasi_stock.getStore().load();
      var GRIDstock_bydocument = Ext.ComponentQuery.query("FRMifc_stock_product grid[pid=GRIDstock_bydocument]")[0];
      var GRIDproduct_receiving = Ext.ComponentQuery.query("FRMifc_stock_product grid[pid=GRIDproduct_receiving]")[0];
      var GRIDproduct_out = Ext.ComponentQuery.query("FRMifc_stock_product grid[pid=GRIDproduct_out]")[0];
      GRIDstock_bydocument.getStore().removeAll();
      GRIDproduct_receiving.getStore().removeAll();
      GRIDproduct_out.getStore().removeAll();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMifc_list_memo_scrap_btrefresh_click: function () {
    try {
      var me = this;
      var GRIDmemo_scrap = Ext.ComponentQuery.query("FRMifc_list_memo_scrap grid[pid=GRIDmemo_scrap]")[0];
      GRIDmemo_scrap.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMifc_stock_productpending_btrefresh_click: function () {
    try {
      var me = this;
      var GRIDstock_productpending = Ext.ComponentQuery.query("FRMifc_stock_productpending grid[pid=GRIDstock_productpending]")[0];
      GRIDstock_productpending.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMifc_stock_product_GRIDmutasi_stock_productclick: function (cmp, rec) {
    try {
      var me = this;
      var GRIDstock_bydocument = Ext.ComponentQuery.query("FRMifc_stock_product grid[pid=GRIDstock_bydocument]")[0];
      GRIDstock_bydocument.getStore().load();
      var GRIDproduct_receiving = Ext.ComponentQuery.query("FRMifc_stock_product grid[pid=GRIDproduct_receiving]")[0];
      GRIDproduct_receiving.getStore().load();
      var GRIDproduct_out = Ext.ComponentQuery.query("FRMifc_stock_product grid[pid=GRIDproduct_out]")[0];
      GRIDproduct_out.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMifc_list_memo_scrap_GRIDmemo_scrap_productclick: function (cmp, rec) {
    try {
      var me = this;
      var GRIDmemo_scrap_product = Ext.ComponentQuery.query("FRMifc_list_memo_scrap grid[pid=GRIDmemo_scrap_product]")[0];
      GRIDmemo_scrap_product.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btcancel_memo_scrap: function (xgrid, rowIndex) {
    try {
      var me = this;
      var GRIDmemo_scrap_product = Ext.ComponentQuery.query("FRMifc_list_memo_scrap grid[pid=GRIDmemo_scrap_product]")[0];
      var GRIDmemo_scrap = Ext.ComponentQuery.query("FRMifc_list_memo_scrap grid[pid=GRIDmemo_scrap]")[0];
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
            var hasil = COMP.run.getservice(vconfig.service_api + "inv_fg_control/inv_fg_control", params, "POST", me.var_global.jwt);
            hasil.then(function (content) {
              var val = Ext.decode(content, true);
              if (val[0].success === "true") {
                COMP.TipToast.toast("Success", val[0].message, { cls: "success", delay: 3000 });
                GRIDmemo_scrap.getStore().load();
                GRIDmemo_scrap_product.getStore().removeAll();
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
  FRMifc_report_stock_btrefresh_click: function () {
    try {
      var GRIDreport_stock = Ext.ComponentQuery.query("FRMifc_report_stock grid[pid=GRIDreport_stock]")[0];
      GRIDreport_stock.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMifc_report_stock_btsearch_click: function () {
    try {
     /*
      var FRM_MAIN = Ext.ComponentQuery.query("FRMifc_report_stock form")[0];
      var dtval = FRM_MAIN.getValues(false, false, false, true);
      if (dtval.tfromdate === null) {
        COMP.TipToast.toast("Error", "Pilih tanggal Start lebih dulu", { cls: "danger", delay: 2000 });
        return;
      }
      if (dtval.ttodate === null) {
        COMP.TipToast.toast("Error", "Pilih tanggal End lebih dulu", { cls: "danger", delay: 2000 });
        return;
      } */
      var GRIDreport_stock = Ext.ComponentQuery.query("FRMifc_report_stock grid[pid=GRIDreport_stock]")[0];
      GRIDreport_stock.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  exportTo: function (btn) {
    try {
      Ext.MessageBox.show({
        msg: "Processing...",
        progressText: "process...",
        width: 300,
        wait: true,
      });
      var cfg = Ext.merge(
        {
          title: "Report Stock Finish Good",
          fileName: "Report Stock Finish Good." + (btn.cfg.ext || btn.cfg.type),
          includeGroups: true,
          includeSummary: true,
        },
        btn.cfg
      );
      var GRIDreport_stock = Ext.ComponentQuery.query("FRMifc_report_stock grid[pid=GRIDreport_stock]")[0];
      GRIDreport_stock.saveDocumentAs(cfg).then(function () {
        Ext.MessageBox.hide();
      });
    } catch (ex) {
      TDK.plugin.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMifc_report_summary_btrefresh_click: function () {
    try {
      var GRIDreport_summary = Ext.ComponentQuery.query("FRMifc_report_summary grid[pid=GRIDreport_summary]")[0];
      GRIDreport_summary.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMifc_report_summary_btsearch_click: function () {
    try {
     /*
      var FRM_MAIN = Ext.ComponentQuery.query("FRMifc_report_summary form")[0];
      var dtval = FRM_MAIN.getValues(false, false, false, true);
      if (dtval.tfromdate === null) {
        COMP.TipToast.toast("Error", "Pilih tanggal Start lebih dulu", { cls: "danger", delay: 2000 });
        return;
      }
      if (dtval.ttodate === null) {
        COMP.TipToast.toast("Error", "Pilih tanggal End lebih dulu", { cls: "danger", delay: 2000 });
        return;
      } */
      var GRIDreport_summary = Ext.ComponentQuery.query("FRMifc_report_summary grid[pid=GRIDreport_summary]")[0];
      GRIDreport_summary.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  exportTo_report_summary: function (btn) {
    try {
      Ext.MessageBox.show({
        msg: "Processing...",
        progressText: "process...",
        width: 300,
        wait: true,
      });
      var cfg = Ext.merge(
        {
          title: "Report Summary Finish Good",
          fileName: "Report Summary Finish Good." + (btn.cfg.ext || btn.cfg.type),
          includeGroups: true,
          includeSummary: true,
        },
        btn.cfg
      );
      var GRIDreport_summary = Ext.ComponentQuery.query("FRMifc_report_summary grid[pid=GRIDreport_summary]")[0];
      GRIDreport_summary.saveDocumentAs(cfg).then(function () {
        Ext.MessageBox.hide();
      });
    } catch (ex) {
      TDK.plugin.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});

