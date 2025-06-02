Ext.define("NJC.SYNCHRONIZE.sync_doc_aw.receivingdata.Creceivingdata", {
  extend: "Ext.app.ViewController",
  alias: "controller.Creceivingdata",
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
    var text = Ext.util.Format.number(value, "0,000.0000/i");
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
});
