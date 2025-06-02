Ext.define("TDK.SYNCHRONIZE.sync_doc_kurir23.Csync_doc_kurir23", {
  extend: "Ext.app.ViewController",
  alias: "controller.Csync_doc_kurir23",
  init: function (view) {
    this.control({
      "sync_doc_kurir23 button[pid=btrefresh]": { click: this.btrefresh_click },
      "sync_doc_kurir23 button[pid=btprocess_sync]": { click: this.btprocess_sync_click },
      "sync_doc_kurir23 button[pid=btprocess_syncaju]": { click: this.btprocess_syncaju_click },
      "sync_doc_kurir23 button[pid=btmapping_supplier]": { click: this.btmapping_supplier_click },
      "sync_doc_kurir23 button[pid=btmapping_itempart]": { click: this.btmapping_itempart_click },
      "sync_doc_kurir23 button[pid=btdokumen_draft]": { click: this.btdokumen_draft_click },
      "FRMsync_doc_kurir23_tracing button[pid=btget_from_ceisa]": { click: this.btget_from_ceisa_click },

      "sync_doc_kurir23 combobox[name=CBO_FILTERKEY]": { select: this.btrefresh_click },
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
  btrefresh_click: function () {
    try {
      var GRID = Ext.ComponentQuery.query("sync_doc_kurir23 GRIDsync_doc_kurir23 grid[pid=GRIDsync_doc_kurir23]")[0];
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

      COMP.run.getmodulepopup("FRMsync_doc_kurir23_tracing", "TDK.SYNCHRONIZE.sync_doc_kurir23.FRMsync_doc_kurir23_tracing", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMsync_doc_kurir23_load: function (cmp) {
    try {
      var GRID = Ext.ComponentQuery.query("sync_doc_kurir23 GRIDsync_doc_kurir23 grid[pid=GRIDsync_doc_kurir23]")[0];
      var vdt = GRID.getSelectionModel().getSelection()[0].data;
      cmp.setTitle("Tracing Dokumen No Invoice: " + vdt.INVOICE_NO);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMsync_doc_kurir23_tracing_linkclick: function (cmp, dt) {
    try {
      var vdt = dt.data;
      if (vdt.allowclick !== true) return;
      var vmodulecontrol = vdt.controlname === "" ? vdt.text : vdt.controlname;
      var vmodulename = vdt.modulename === "" ? vmodulecontrol : vdt.modulename;
      var id = vmodulecontrol;
      var cls = "TDK.SYNCHRONIZE.sync_doc_kurir23." + vmodulename + "." + vmodulecontrol;
      var tabs = Ext.ComponentQuery.query("FRMsync_doc_kurir23_tracing tabpanel[pid=toproduction_tabpanel]")[0];
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
  btprocess_sync_click: function () {
    try {
      var me = this;
      var params = Ext.encode({
        method: "sync_file",
        module: "coo",
      });
      var hasil = COMP.run.getservice(vconfig.service_api + "sync_doc/sync_doc", params, "POST", me.var_global.jwt);
      hasil.then(function (content) {
        var val = Ext.decode(content, true);
        if (val.success == "true") {
          COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 2000 });
          me.btrefresh_click();
        } else {
          COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 2000 });
        }
      }, this);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btprocess_syncaju_click: function () {
    try {
      var me = this;
      var params = Ext.encode({
        method: "sync_nomoraju",
        module: "coo",
      });
      var hasil = COMP.run.getservice(vconfig.service_api + "sync_doc/sync_doc", params, "POST", me.var_global.jwt);
      hasil.then(function (content) {
        var val = Ext.decode(content, true);
        if (val.success == "true") {
          COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 2000 });
          me.btrefresh_click();
        } else {
          COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 2000 });
        }
      }, this);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btmapping_supplier_click: function () {
    try {
      console.log("mapping supplier");
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

      COMP.run.getmodulepopup("mapping_supplier", "TDK.SYNCHRONIZE.sync_doc_kurir23.mapping_supplier.mapping_supplier", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btmapping_itempart_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("mapping_itempart", "TDK.SYNCHRONIZE.sync_doc_kurir23.mapping_itempart.mapping_itempart", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btdokumen_draft_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("dokumen_draft", "TDK.SYNCHRONIZE.sync_doc_kurir23.dokumen_draft.dokumen_draft", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btget_from_ceisa_click: function () {
    try {
      Ext.MessageBox.confirm("Confirm", "Konfirmasi proses Get To Ceisa No Invoice : XX", this.showResult, this);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});
