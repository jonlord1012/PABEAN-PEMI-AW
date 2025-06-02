Ext.define("TDK.INVENTORY.inv_wnt_control.Cinv_wnt_control", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cinv_wnt_control",
  init: function (view) {
    this.control({
      "inv_wnt_control dataview": { itemClick: this.Dodataview_click },
      "button[pid=FRMiwc_report_stock_btrefresh]": { click: this.FRMiwc_report_stock_btrefresh_click },
      "FRMiwc_report_stock combobox[name=CBO_COMPANY]": { change: this.FRMiwc_report_stock_btrefresh_click },
      "FRMiwc_report_stock combobox[name=CBO_PARTGROUP]": { change: this.FRMiwc_report_stock_btrefresh_click },
      "FRMiwc_report_stock button[pid=FRMiwc_report_stock_btsearch]": { click: this.FRMiwc_report_stock_btsearch_click },
      "button[pid=FRMiwc_report_summary_btrefresh]": { click: this.FRMiwc_report_summary_btrefresh_click },
      "FRMiwc_report_summary combobox[name=CBO_COMPANY]": { change: this.FRMiwc_report_summary_btrefresh_click },
      "FRMiwc_report_summary combobox[name=CBO_PARTGROUP]": { change: this.FRMiwc_report_summary_btrefresh_click },
      "FRMiwc_report_summary button[pid=FRMiwc_report_summary_btsearch]": { click: this.FRMiwc_report_summary_btsearch_click },
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
      var vfname = "FRMiwc_" + vdt.MODE_CONTROL;
      COMP.run.getmodulepopup(vfname, "TDK.INVENTORY.inv_wnt_control." + vfname, mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMiwc_report_stock_btrefresh_click: function () {
    try {
      var GRIDreport_stock = Ext.ComponentQuery.query("FRMiwc_report_stock grid[pid=GRIDreport_stock]")[0];
      GRIDreport_stock.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMiwc_report_stock_btsearch_click: function () {
    try {
     /*
      var FRM_MAIN = Ext.ComponentQuery.query("FRMiwc_report_stock form")[0];
      var dtval = FRM_MAIN.getValues(false, false, false, true);
      if (dtval.tfromdate === null) {
        COMP.TipToast.toast("Error", "Pilih tanggal Start lebih dulu", { cls: "danger", delay: 2000 });
        return;
      }
      if (dtval.ttodate === null) {
        COMP.TipToast.toast("Error", "Pilih tanggal End lebih dulu", { cls: "danger", delay: 2000 });
        return;
      } */
      var GRIDreport_stock = Ext.ComponentQuery.query("FRMiwc_report_stock grid[pid=GRIDreport_stock]")[0];
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
          title: "Report Stock Mesin Sparepart & Bahan Penolong",
          fileName: "Report Stock Mesin Sparepart & Bahan Penolong." + (btn.cfg.ext || btn.cfg.type),
          includeGroups: true,
          includeSummary: true,
        },
        btn.cfg
      );
      var GRIDreport_stock = Ext.ComponentQuery.query("FRMiwc_report_stock grid[pid=GRIDreport_stock]")[0];
      GRIDreport_stock.saveDocumentAs(cfg).then(function () {
        Ext.MessageBox.hide();
      });
    } catch (ex) {
      TDK.plugin.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMiwc_report_summary_btrefresh_click: function () {
    try {
      var GRIDreport_summary = Ext.ComponentQuery.query("FRMiwc_report_summary grid[pid=GRIDreport_summary]")[0];
      GRIDreport_summary.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMiwc_report_summary_btsearch_click: function () {
    try {
     /*
      var FRM_MAIN = Ext.ComponentQuery.query("FRMiwc_report_summary form")[0];
      var dtval = FRM_MAIN.getValues(false, false, false, true);
      if (dtval.tfromdate === null) {
        COMP.TipToast.toast("Error", "Pilih tanggal Start lebih dulu", { cls: "danger", delay: 2000 });
        return;
      }
      if (dtval.ttodate === null) {
        COMP.TipToast.toast("Error", "Pilih tanggal End lebih dulu", { cls: "danger", delay: 2000 });
        return;
      } */
      var GRIDreport_summary = Ext.ComponentQuery.query("FRMiwc_report_summary grid[pid=GRIDreport_summary]")[0];
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
          title: "Report Summary Mesin Sparepart & Bahan Penolong",
          fileName: "Report Summary Mesin Sparepart & Bahan Penolong." + (btn.cfg.ext || btn.cfg.type),
          includeGroups: true,
          includeSummary: true,
        },
        btn.cfg
      );
      var GRIDreport_summary = Ext.ComponentQuery.query("FRMiwc_report_summary grid[pid=GRIDreport_summary]")[0];
      GRIDreport_summary.saveDocumentAs(cfg).then(function () {
        Ext.MessageBox.hide();
      });
    } catch (ex) {
      TDK.plugin.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});

