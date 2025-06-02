Ext.define("TDK.INVENTORY.inv_material_control.Cinv_material_control", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cinv_material_control",
  init: function (view) {
    this.control({
      "inv_material_control dataview": { itemClick: this.Dodataview_click },
      "button[pid=FRMimc_stock_item_btrefresh]": { click: this.FRMimc_stock_item_btrefresh_click },
      "button[pid=FRMimc_list_memo_selling_btrefresh]": { click: this.FRMimc_list_memo_selling_btrefresh_click },
      "button[pid=FRMimc_list_memo_scrap_btrefresh]": { click: this.FRMimc_list_memo_scrap_btrefresh_click },
      "button[pid=FRMimc_outstanding_receiving_btrefresh]": { click: this.FRMimc_outstanding_receiving_btrefresh_click },
      "button[pid=FRMimc_stock_itempending_btrefresh]": { click: this.FRMimc_stock_itempending_btrefresh_click },
      "button[pid=FRMimc_report_stock_btrefresh]": { click: this.FRMimc_report_stock_btrefresh_click },
      "FRMimc_report_stock combobox[name=CBO_COMPANY]": { change: this.FRMimc_report_stock_btrefresh_click },
      "FRMimc_report_stock combobox[name=CBO_PARTGROUP]": { change: this.FRMimc_report_stock_btrefresh_click },
      "FRMimc_report_stock button[pid=FRMimc_report_stock_btsearch]": { click: this.FRMimc_report_stock_btsearch_click },
      "button[pid=FRMimc_report_summary_btrefresh]": { click: this.FRMimc_report_summary_btrefresh_click },
      "FRMimc_report_summary combobox[name=CBO_COMPANY]": { change: this.FRMimc_report_summary_btrefresh_click },
      "FRMimc_report_summary combobox[name=CBO_PARTGROUP]": { change: this.FRMimc_report_summary_btrefresh_click },
      "FRMimc_report_summary button[pid=FRMimc_report_summary_btsearch]": { click: this.FRMimc_report_summary_btsearch_click },


      "FRMimc_stock_item grid[pid=GRIDmutasi_stock]": { itemdblClick: this.FRMimc_stock_item_GRIDmutasi_stock_itemclick },
      "FRMimc_list_memo_selling grid[pid=GRIDmemo_selling]": { itemdblClick: this.FRMimc_list_memo_selling_GRIDmemo_selling_itemclick },
      "FRMimc_list_memo_scrap grid[pid=GRIDmemo_scrap]": { itemdblClick: this.FRMimc_list_memo_scrap_GRIDmemo_scrap_itemclick },
      "FRMimc_outstanding_receiving grid[pid=GRIDoutreceiving_header]": { itemdblClick: this.FRMimc_outstanding_receiving_GRIDoutreceiving_header_itemclick },
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
      var vfname = "FRMimc_" + vdt.MODE_CONTROL;
      COMP.run.getmodulepopup(vfname, "TDK.INVENTORY.inv_material_control." + vfname, mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMimc_stock_item_btrefresh_click: function () {
    try {
      var me = this;
      var GRIDmutasi_stock = Ext.ComponentQuery.query("FRMimc_stock_item grid[pid=GRIDmutasi_stock]")[0];
      GRIDmutasi_stock.getStore().load();
      var GRIDstock_bydocument = Ext.ComponentQuery.query("FRMimc_stock_item grid[pid=GRIDstock_bydocument]")[0];
      var GRIDitem_receiving = Ext.ComponentQuery.query("FRMimc_stock_item grid[pid=GRIDitem_receiving]")[0];
      var GRIDitem_out = Ext.ComponentQuery.query("FRMimc_stock_item grid[pid=GRIDitem_out]")[0];
      GRIDstock_bydocument.getStore().removeAll();
      GRIDitem_receiving.getStore().removeAll();
      GRIDitem_out.getStore().removeAll();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMimc_list_memo_selling_btrefresh_click: function () {
    try {
      var me = this;
      var GRIDmemo_selling = Ext.ComponentQuery.query("FRMimc_list_memo_selling grid[pid=GRIDmemo_selling]")[0];
      GRIDmemo_selling.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMimc_list_memo_scrap_btrefresh_click: function () {
    try {
      var me = this;
      var GRIDmemo_scrap = Ext.ComponentQuery.query("FRMimc_list_memo_scrap grid[pid=GRIDmemo_scrap]")[0];
      GRIDmemo_scrap.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMimc_outstanding_receiving_btrefresh_click: function () {
    try {
      var me = this;
      var GRIDoutreceiving_header = Ext.ComponentQuery.query("FRMimc_outstanding_receiving grid[pid=GRIDoutreceiving_header]")[0];
      GRIDoutreceiving_header.getStore().load();
      var GRIDoutreceiving_item = Ext.ComponentQuery.query("FRMimc_outstanding_receiving grid[pid=GRIDoutreceiving_item]")[0];
      GRIDoutreceiving_item.getStore().removeAll();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMimc_stock_itempending_btrefresh_click: function () {
    try {
      var me = this;
      var GRIDstock_itempending = Ext.ComponentQuery.query("FRMimc_stock_itempending grid[pid=GRIDstock_itempending]")[0];
      GRIDstock_itempending.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMimc_stock_item_GRIDmutasi_stock_itemclick: function (cmp, rec) {
    try {
      var me = this;
      var GRIDstock_bydocument = Ext.ComponentQuery.query("FRMimc_stock_item grid[pid=GRIDstock_bydocument]")[0];
      GRIDstock_bydocument.getStore().load();
      var GRIDitem_receiving = Ext.ComponentQuery.query("FRMimc_stock_item grid[pid=GRIDitem_receiving]")[0];
      GRIDitem_receiving.getStore().load();
      var GRIDitem_out = Ext.ComponentQuery.query("FRMimc_stock_item grid[pid=GRIDitem_out]")[0];
      GRIDitem_out.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMimc_list_memo_selling_GRIDmemo_selling_itemclick: function (cmp, rec) {
    try {
      var me = this;
      var GRIDmemo_selling_item = Ext.ComponentQuery.query("FRMimc_list_memo_selling grid[pid=GRIDmemo_selling_item]")[0];
      GRIDmemo_selling_item.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMimc_list_memo_scrap_GRIDmemo_scrap_itemclick: function (cmp, rec) {
    try {
      var me = this;
      var GRIDmemo_scrap_item = Ext.ComponentQuery.query("FRMimc_list_memo_scrap grid[pid=GRIDmemo_scrap_item]")[0];
      GRIDmemo_scrap_item.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMimc_outstanding_receiving_GRIDoutreceiving_header_itemclick: function (cmp, rec) {
    try {
      var me = this;
      var GRIDoutreceiving_item = Ext.ComponentQuery.query("FRMimc_outstanding_receiving grid[pid=GRIDoutreceiving_item]")[0];
      GRIDoutreceiving_item.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btcancel_memo_selling: function (xgrid, rowIndex) {
    try {
      var me = this;
      var GRIDmemo_selling_item = Ext.ComponentQuery.query("FRMimc_list_memo_selling grid[pid=GRIDmemo_selling_item]")[0];
      var GRIDmemo_selling = Ext.ComponentQuery.query("FRMimc_list_memo_selling grid[pid=GRIDmemo_selling]")[0];
      var vdt = xgrid.getStore().getAt(rowIndex).data;
      xgrid.getSelectionModel().select(rowIndex);
      Ext.MessageBox.confirm(
        "Cancel Memo Selling",
        "No Dokumen Memo : " + vdt.OUT_NO,
        function (button) {
          if (button === "yes") {
            var params = Ext.encode({
              method: "proses_cancel",
              module: "cancel_memo_selling",
              vdata: Ext.encode(vdt),
            });
            var hasil = COMP.run.getservice(vconfig.service_api + "inv_material_control/inv_material_control", params, "POST", me.var_global.jwt);
            hasil.then(function (content) {
              var val = Ext.decode(content, true);
              if (val[0].success === "true") {
                COMP.TipToast.toast("Success", val[0].message, { cls: "success", delay: 3000 });
                GRIDmemo_selling.getStore().load();
                GRIDmemo_selling_item.getStore().removeAll();
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
  btcancel_memo_scrap: function (xgrid, rowIndex) {
    try {
      var me = this;
      var GRIDmemo_selling_item = Ext.ComponentQuery.query("FRMimc_list_memo_scrap grid[pid=GRIDmemo_scrap_item]")[0];
      var GRIDmemo_selling = Ext.ComponentQuery.query("FRMimc_list_memo_scrap grid[pid=GRIDmemo_scrap]")[0];
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
            var hasil = COMP.run.getservice(vconfig.service_api + "inv_material_control/inv_material_control", params, "POST", me.var_global.jwt);
            hasil.then(function (content) {
              var val = Ext.decode(content, true);
              if (val[0].success === "true") {
                COMP.TipToast.toast("Success", val[0].message, { cls: "success", delay: 3000 });
                GRIDmemo_selling.getStore().load();
                GRIDmemo_selling_item.getStore().removeAll();
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
  
  FRMimc_report_stock_btrefresh_click: function () {
    try {
      var GRIDreport_stock = Ext.ComponentQuery.query("FRMimc_report_stock grid[pid=GRIDreport_stock]")[0];
      GRIDreport_stock.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMimc_report_stock_btsearch_click: function () {
    try {
     /*
      var FRM_MAIN = Ext.ComponentQuery.query("FRMimc_report_stock form")[0];
      var dtval = FRM_MAIN.getValues(false, false, false, true);
      if (dtval.tfromdate === null) {
        COMP.TipToast.toast("Error", "Pilih tanggal Start lebih dulu", { cls: "danger", delay: 2000 });
        return;
      }
      if (dtval.ttodate === null) {
        COMP.TipToast.toast("Error", "Pilih tanggal End lebih dulu", { cls: "danger", delay: 2000 });
        return;
      } */
      var GRIDreport_stock = Ext.ComponentQuery.query("FRMimc_report_stock grid[pid=GRIDreport_stock]")[0];
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
          title: "Report Stock Item/Part Material",
          fileName: "Report Stock Item/Part Material." + (btn.cfg.ext || btn.cfg.type),
          includeGroups: true,
          includeSummary: true,
        },
        btn.cfg
      );
      var GRIDreport_stock = Ext.ComponentQuery.query("FRMimc_report_stock grid[pid=GRIDreport_stock]")[0];
      GRIDreport_stock.saveDocumentAs(cfg).then(function () {
        Ext.MessageBox.hide();
      });
    } catch (ex) {
      TDK.plugin.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMimc_report_summary_btrefresh_click: function () {
    try {
      var GRIDreport_summary = Ext.ComponentQuery.query("FRMimc_report_summary grid[pid=GRIDreport_summary]")[0];
      GRIDreport_summary.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMimc_report_summary_btsearch_click: function () {
    try {
     /*
      var FRM_MAIN = Ext.ComponentQuery.query("FRMimc_report_summary form")[0];
      var dtval = FRM_MAIN.getValues(false, false, false, true);
      if (dtval.tfromdate === null) {
        COMP.TipToast.toast("Error", "Pilih tanggal Start lebih dulu", { cls: "danger", delay: 2000 });
        return;
      }
      if (dtval.ttodate === null) {
        COMP.TipToast.toast("Error", "Pilih tanggal End lebih dulu", { cls: "danger", delay: 2000 });
        return;
      } */
      var GRIDreport_summary = Ext.ComponentQuery.query("FRMimc_report_summary grid[pid=GRIDreport_summary]")[0];
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
          title: "Report Summary Item/Part Material",
          fileName: "Report Summary Item/Part Material." + (btn.cfg.ext || btn.cfg.type),
          includeGroups: true,
          includeSummary: true,
        },
        btn.cfg
      );
      var GRIDreport_summary = Ext.ComponentQuery.query("FRMimc_report_summary grid[pid=GRIDreport_summary]")[0];
      GRIDreport_summary.saveDocumentAs(cfg).then(function () {
        Ext.MessageBox.hide();
      });
    } catch (ex) {
      TDK.plugin.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});

