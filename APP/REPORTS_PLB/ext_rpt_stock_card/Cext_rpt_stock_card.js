Ext.define("NJC.REPORTS_PLB.ext_rpt_stock_card.Cext_rpt_stock_card", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cext_rpt_stock_card",
  init: function (view) {
    this.control({
      "ext_rpt_stock_card button[pid=btrefresh_main]": { click: this.btrefresh_main_click },
      "ext_rpt_stock_card combobox[name=CBO_COMPANY]": { change: this.btrefresh_main_click },
      "ext_rpt_stock_card button[pid=btsearch]": { click: this.btsearch_click },
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
  formatDate: function (value) {
    var text = Ext.util.Format.date(value, "Y-m-d");
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
      var GRID = Ext.ComponentQuery.query("ext_rpt_stock_card GRIDext_rpt_stock_card grid")[0];
      GRID.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btsearch_click: function () {
    try {
      var me = this;
      var FRM_MAIN = Ext.ComponentQuery.query("ext_rpt_stock_card")[0];
      var dtval = FRM_MAIN.getValues(false, false, false, true);
      if (dtval.tfromdate === null) {
        COMP.TipToast.toast("Error", "Pilih tanggal Start lebih dulu", { cls: "danger", delay: 2000 });
        return;
      }
      if (dtval.ttodate === null) {
        COMP.TipToast.toast("Error", "Pilih tanggal End lebih dulu", { cls: "danger", delay: 2000 });
        return;
      }
      /*
            if (dtval.article_code === null || dtval.article_code === '') {
              COMP.TipToast.toast("Error", "Pilih Article Code lebih dulu", { cls: "danger", delay: 2000 });
              return;
            }
      */
      var GRID = Ext.ComponentQuery.query("ext_rpt_stock_card grid[pid=GRIDext_rpt_stock_card]")[0];
      GRID.getStore().load();
      me.btrefresh_main_click();
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
          title: "Report Stock Card",
          fileName: "Report Stock Card." + (btn.cfg.ext || btn.cfg.type),
          includeGroups: true,
          includeSummary: true,
        },
        btn.cfg
      );
      var GRID = Ext.ComponentQuery.query("ext_rpt_stock_card GRIDext_rpt_stock_card grid[pid=GRIDext_rpt_stock_card]")[0];
      GRID.saveDocumentAs(cfg).then(function () {
        Ext.MessageBox.hide();
      });
    } catch (ex) {
      NJC.plugin.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btdetail_rows_click: function (xgrid, rowIndex) {
    try {

      xgrid.getSelectionModel().select(rowIndex);
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var popup = Ext.ComponentQuery.query("FRMext_rpt_stock_card_details")[0];
      if (popup) {
        popup.remove();
      }
      COMP.run.getmodulepopup("FRMext_rpt_stock_card_details", "NJC.REPORTS_PLB.ext_rpt_stock_card.FRMext_rpt_stock_card_details", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});
