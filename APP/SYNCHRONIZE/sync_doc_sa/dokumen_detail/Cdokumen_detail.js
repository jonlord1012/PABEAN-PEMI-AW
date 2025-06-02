Ext.define("TDK.SYNCHRONIZE.sync_doc_sa.dokumen_detail.Cdokumen_detail", {
  extend: "Ext.app.ViewController",
  alias: "controller.Csa_dokumen_detail",
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
  formatamount: function (value) {
    var text = Ext.util.Format.number(value, "0,000.00/i");
    return text;
  },
  formatqty: function (value) {
    var text = Ext.util.Format.number(value, "0,000/i");
    return text;
  },
  renderpage: function () {
    try {
      console.log("renderer Csa_dokumen_detail");
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  sa_dokumen_detail_link_click: function (cmp, dt) {
    try {
      var vdt = dt.data;
      if (vdt.allowclick !== true) return;
      var vmodulecontrol = vdt.controlname === "" ? vdt.text : vdt.controlname;
      var vmodulename = vdt.modulename === "" ? vmodulecontrol : vdt.modulename;
      var id = vmodulecontrol;
      var cls = "TDK.SYNCHRONIZE.sync_doc_sa." + vmodulename + "." + vmodulecontrol;
      var tabs = Ext.ComponentQuery.query("sa_dokumen_detail tabpanel[pid=sa_dokumen_detail_tabpanel]")[0];
      var tab = tabs.child("#" + id);
      if (!tab) {
        try {
          tab = tabs.add(
            Ext.create(cls, {
              waitMsgTarget: true,
              itemId: id,
              closable: true,
              frame: false,
              border: false,
              title: vdt.text,
            })
          );
        } catch (err) {
          COMP.TipToast.toast("Error", err.message, { cls: "danger", delay: 2000 });
        }
      }
      tabs.setActiveTab(tab);
    } catch (err) {
      COMP.TipToast.toast("Error", err.message, { cls: "danger", delay: 2000 });
    }
  },
});
