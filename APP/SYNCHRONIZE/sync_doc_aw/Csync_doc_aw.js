Ext.define("NJC.SYNCHRONIZE.sync_doc_aw.Csync_doc_aw", {
  extend: "Ext.app.ViewController",
  alias: "controller.Csync_doc_aw",
  init: function (view) {
    this.control({
      "sync_doc_aw button[pid=btrefresh]": { click: this.btrefresh_click },
      "sync_doc_aw button[pid=btprocess_sync]": { click: this.btprocess_sync_click },
      "sync_doc_aw button[pid=btprocess_syncaju]": { click: this.btprocess_syncaju_click },
      "sync_doc_aw button[pid=btprocess_syncportal]": { click: this.btprocess_syncportal_click },
      "sync_doc_aw button[pid=btmapping_supplier]": { click: this.btmapping_supplier_click },
      "sync_doc_aw button[pid=btmapping_itempart]": { click: this.btmapping_itempart_click },
      "sync_doc_aw button[pid=btdokumen_draft]": { click: this.btdokumen_draft_click },
      "FRMsync_doc_aw_tracing button[pid=btget_from_ceisa]": { click: this.btget_from_ceisa_click },

      "sync_doc_aw combobox[name=CBO_FILTERKEY]": { select: this.btrefresh_click },
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
      console.log("renderer controller" + this.alias);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  formatDate: function (value) {
    var text = Ext.util.Format.date(value, "Y-m-d");
    return text;
  },
  btrefresh_click: function () {
    try {
      var GRID = Ext.ComponentQuery.query("sync_doc_aw GRIDsync_doc_aw grid[pid=GRIDsync_doc_aw]")[0];
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

      COMP.run.getmodulepopup("FRMsync_doc_aw_tracing", "NJC.SYNCHRONIZE.sync_doc_aw.FRMsync_doc_aw_tracing", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMsync_doc_aw_load: function (cmp) {
    try {
      var GRID = Ext.ComponentQuery.query("sync_doc_aw GRIDsync_doc_aw grid[pid=GRIDsync_doc_aw]")[0];
      var vdt = GRID.getSelectionModel().getSelection()[0].data;
      cmp.setTitle("Tracing Dokumen No Invoice: " + vdt.INVOICE_NO);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMsync_doc_aw_tracing_linkclick: function (cmp, dt) {
    try {
      var GRID = Ext.ComponentQuery.query("sync_doc_aw GRIDsync_doc_aw grid[pid=GRIDsync_doc_aw]")[0];
      var vdt = GRID.getSelectionModel().getSelection()[0].data;
      var vdt = dt.data;
      if (vdt.allowclick !== true) return;
      var vmodulecontrol = vdt.controlname === "" ? vdt.text : vdt.controlname;
      var vmodulename = vdt.modulename === "" ? vmodulecontrol : vdt.modulename;
      var id = vmodulecontrol;
      var cls = "NJC.SYNCHRONIZE.sync_doc_aw." + vmodulename + "." + vmodulecontrol;
      var tabs = Ext.ComponentQuery.query("FRMsync_doc_aw_tracing tabpanel[pid=toproduction_tabpanel]")[0];
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
        module: "aw",
      });
      var hasil = COMP.run.getservice(vconfig.service_api + "sync_doc_aw/sync_doc_aw", params, "POST", me.var_global.jwt);
      hasil.then(function (content) {
        var val = Ext.decode(content, true);
        if (val.success == "true") {
          COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 2000 });
          me.btrefresh_click();
        } else if (val.success == "warning") {
          COMP.TipToast.toast("Success", val.message, { cls: "warning", delay: 2500 });
        } else {
          COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 2000 });
        }
      }, this);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btprocess_syncportal_click: function (cmp, dt) {
    try {
      var me = this;
      if (dt === "") {
        COMP.TipToast.toast("Error", "Pilih Dokumen yang ingin diselaraskan", { cls: "danger", delay: 2000 });
        me.btrefresh_click();
        return false;
      }
      var GRID = Ext.ComponentQuery.query("sync_doc_aw GRIDsync_doc_aw grid[pid=GRIDsync_doc_aw]")[0];
      console.log(GRID.getSelectionModel().hasSelection());
      if (GRID.getSelectionModel().hasSelection() === "" || GRID.getSelectionModel().hasSelection() === false) {
        COMP.TipToast.toast("Error", "Pilih Dokumen yang ingin diselaraskan", { cls: "danger", delay: 2000 });
        me.btrefresh_click();
        return false;
      }
      var vdt = GRID.getSelectionModel().getSelection()[0].data;
      var params = Ext.encode({
        method: "mapp_this_document",
        module: "aw",
        INVOICE_NO: vdt.INVOICE_NO,
        VMODE: 'PABEAN',
      });
      var hasil = COMP.run.getservice(vconfig.service_api + "portal_data/portal_data", params, "POST", me.var_global.jwt);
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
        method: "sync_to_ceisa",
        module: "aw",
      });
      var hasil = COMP.run.getservice(vconfig.service_api + "sync_doc_aw/sync_doc_aw", params, "POST", me.var_global.jwt);
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
      var popup = Ext.ComponentQuery.query("mapping_supplier")[0]; //this.lookupReference('FRMposales');
      if (popup) {
        popup.remove();
      }
      COMP.run.getmodulepopup("mapping_supplier", "NJC.SYNCHRONIZE.sync_doc_aw.mapping_supplier.mapping_supplier", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btmapping_itempart_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var popup = Ext.ComponentQuery.query("mapping_itempart")[0]; //this.lookupReference('FRMposales');
      if (popup) {
        popup.remove();
      }
      COMP.run.getmodulepopup("mapping_itempart", "NJC.SYNCHRONIZE.sync_doc_aw.mapping_itempart.mapping_itempart", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btdokumen_draft_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

      mainpanel.remove("aw_dokumen_draft", true);
      COMP.run.getmodulepopup("aw_dokumen_draft", "NJC.SYNCHRONIZE.sync_doc_aw.dokumen_draft.dokumen_draft", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btget_from_ceisa_click: function () {
    try {
      var me = this;
      var GRID = Ext.ComponentQuery.query("sync_doc_aw GRIDsync_doc_aw grid[pid=GRIDsync_doc_aw]")[0];
      var vdt = GRID.getSelectionModel().getSelection()[0].data;
      var params = Ext.encode({
        method: "mapp_this_document",
        module: "aw",
        INVOICE_NO: vdt.INVOICE_NO,
      });
      var hasil = COMP.run.getservice(vconfig.service_api + "portal_data/portal_data", params, "POST", me.var_global.jwt);
      hasil.then(function (content) {
        var val = Ext.decode(content, true);
        if (val.success == "true") {
          COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 2000 });
        } else {
          COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 2000 });
        }
      }, this);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },

  exportTo: async function (btn) {
    try {
      var me = this;
      Ext.MessageBox.show({
        msg: "Processing...",
        progressText: "process...",
        width: 300,
        wait: true,
      });
      var mydate = Ext.Date.format(new Date(), "(d_m_Y.H.i.s__)");
      var cfg = Ext.merge(
        {
          title: " AW ",
          fileName: "DATA SOURCE AW ." + mydate + "." + (btn.cfg.ext || btn.cfg.type),
          includeGroups: true,
          includeSummary: true,
        },
        btn.cfg
      );

      var GRID = Ext.ComponentQuery.query("sync_doc_aw GRIDsync_doc_aw grid[pid=GRIDsync_doc_aw]")[0];

      var store = GRID.getStore();

      store.setPageSize(0);

      store.load({
        callback: function (records, operation, success) {
          if (success) {
            GRID.saveDocumentAs(cfg);
            store.setPageSize(GRID.pageSize);
            store.load({
              callback: function () {
                Ext.MessageBox.hide();
              }
            })

          } else {
            COMP.TipToast.toast("Error", "Failed load to server", { cls: "danger", delay: 2000 });
          }
        }
      });


      // var filename = "Master Goods"
      // var data = await COMP.run.ajax_form({
      //   url    : vconfig.service_report + "report/report",
      //   token  : me.var_global.jwt,
      //   method : "POST",
      //   param  : Ext.encode({
      //     method :"data"
      //   })
      // });

      // if (data) {
      //   return COMP.run.exportReport(Ext.decode(data), btn)
      // } else {
      //   COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      // }

    } catch (ex) {

      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});
