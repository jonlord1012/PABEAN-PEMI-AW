Ext.define("TDK.SYNCHRONIZE.sync_doc_kurir23.sumberdata.Csumberdata", {
  extend: "Ext.app.ViewController",
  alias: "controller.Csumberdata",
  init: function (view) {
    this.control({});
    this.listen({
      store: {},
    });
    this.var_global = {
      jwt: localStorage.getItem("ST_NJC_JWT"),
    };
    this.var_definition = {};
    this.renderpage();
  },
  renderpage: function () {
    try {
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  formatAmount: function (value) {
    var text = Ext.util.Format.number(value, "0,000.0000/i");
    return text;
  },
  formatqty: function (value) {
    var text = Ext.util.Format.number(value, "0,000/i");
    return text;
  },
  btsumberdata_download: function (btn) {
    try {
      var GRIDINV = Ext.ComponentQuery.query("sync_doc_kurir23 GRIDsync_doc_kurir23 grid[pid=GRIDsync_doc_kurir23]")[0];
      var vdt = GRIDINV.getSelectionModel().getSelection()[0].data;
      Ext.MessageBox.show({
        msg: "Processing...",
        progressText: "process...",
        width: 300,
        wait: true,
      });
      var cfg = Ext.merge(
        {
          fileName: vdt.INVOICE_NO + "." + (btn.cfg.ext || btn.cfg.type),
          includeGroups: true,
          includeSummary: true,
        },
        btn.cfg
      );

      var GRID = Ext.ComponentQuery.query("sumberdata GRIDsumberdata grid[pid=GRIDsumberdata]")[0];
      GRID.saveDocumentAs(cfg).then(function () {
        Ext.MessageBox.hide();
      });
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});
