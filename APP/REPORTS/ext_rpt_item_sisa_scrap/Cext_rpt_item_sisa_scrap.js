Ext.define("TDK.REPORTS.ext_rpt_item_sisa_scrap.Cext_rpt_item_sisa_scrap", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cext_rpt_item_sisa_scrap",
  init: function (view) {
    this.control({
      "ext_rpt_item_sisa_scrap button[pid=btrefresh_main]": { click: this.btrefresh_main_click },
      "ext_rpt_item_sisa_scrap combobox[name=CBO_SOURCE]": { change: this.btrefresh_main_click },
      "ext_rpt_item_sisa_scrap button[pid=btsearch]": { click: this.btsearch_click },
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
      console.log("renderer controller");
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btrefresh_main_click: function () {
    try {
      var GRID = Ext.ComponentQuery.query("ext_rpt_item_sisa_scrap GRIDext_rpt_item_sisa_scrap grid")[0];
      GRID.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btsearch_click: function () {
    try {
      var FRM_MAIN = Ext.ComponentQuery.query("ext_rpt_item_sisa_scrap")[0];
      var dtval = FRM_MAIN.getValues(false, false, false, true);
      if (dtval.tfromdate === null) {
        COMP.TipToast.toast("Error", "Pilih tanggal Start lebih dulu", { cls: "danger", delay: 2000 });
        return;
      }
      if (dtval.ttodate === null) {
        COMP.TipToast.toast("Error", "Pilih tanggal End lebih dulu", { cls: "danger", delay: 2000 });
        return;
      }
      var GRID = Ext.ComponentQuery.query("ext_rpt_item_sisa_scrap grid[pid=GRIDext_rpt_item_sisa_scrap]")[0];
      GRID.getStore().load();
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
          title: "Report Item Sisa dan Scrap",
          fileName: "Report Item Sisa dan Scrap." + (btn.cfg.ext || btn.cfg.type),
          includeGroups: true,
          includeSummary: true,
        },
        btn.cfg
      );
      var GRID = Ext.ComponentQuery.query("ext_rpt_item_sisa_scrap GRIDext_rpt_item_sisa_scrap grid[pid=GRIDext_rpt_item_sisa_scrap]")[0];
      GRID.saveDocumentAs(cfg).then(function () {
        Ext.MessageBox.hide();
      });
    } catch (ex) {
      TDK.plugin.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});
