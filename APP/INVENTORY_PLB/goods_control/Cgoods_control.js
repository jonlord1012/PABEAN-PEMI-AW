Ext.define("NJC.INVENTORY_PLB.goods_control.Cgoods_control", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cgoods_control",
  init: function (view) {
    this.control({
      "goods_control dataview": { itemClick: this.Dodataview_click },
      "button[pid=FRMimc_goods_stock_btrefresh]": { itemClick: this.FRMimc_goods_stock_btrefresh_click },
      "FRMimc_goods_stock grid[pid=GRIDmutasi_stock]": { itemdblClick: this.FRMimc_goods_stock_GRIDmutasi_stock_itemclick },

      /*
      "button[pid=FRMimc_stock_item_aw_btrefresh]": { click: this.FRMimc_stock_item_aw_btrefresh_click },
      "button[pid=FRMimc_list_memo_selling_aw_btrefresh]": { click: this.FRMimc_list_memo_selling_aw_btrefresh_click },
      "button[pid=FRMimc_list_memo_scrap_aw_btrefresh]": { click: this.FRMimc_list_memo_scrap_aw_btrefresh_click },
      "button[pid=FRMimc_outstanding_receiving_aw_btrefresh]": { click: this.FRMimc_outstanding_receiving_aw_btrefresh_click },
      "button[pid=FRMimc_stock_itempending_aw_btrefresh]": { click: this.FRMimc_stock_itempending_aw_btrefresh_click },
      "button[pid=FRMimc_report_stock_aw_btrefresh]": { click: this.FRMimc_report_stock_aw_btrefresh_click },
      "FRMimc_report_stock_aw combobox[name=CBO_COMPANY]": { change: this.FRMimc_report_stock_aw_btrefresh_click },
      "FRMimc_report_stock_aw combobox[name=CBO_PARTGROUP]": { change: this.FRMimc_report_stock_aw_btrefresh_click },
      "FRMimc_report_stock_aw button[pid=FRMimc_report_stock_aw_btsearch]": { click: this.FRMimc_report_stock_aw_btsearch_click },
      "FRMimc_report_stock_aw button[pid=FRMimc_report_summary_aw_btrefresh]": { click: this.FRMimc_report_summary_aw_btrefresh_click },
      "FRMimc_report_summary_aw combobox[name=CBO_COMPANY]": { change: this.FRMimc_report_summary_aw_btrefresh_click },
      "FRMimc_report_summary_aw combobox[name=CBO_PARTGROUP]": { change: this.FRMimc_report_summary_aw_btrefresh_click },
      "FRMimc_report_summary_aw button[pid=FRMimc_report_summary_aw_btsearch]": { click: this.FRMimc_report_summary_aw_btsearch_click },


      "FRMimc_stock_item_aw grid[pid=GRIDmutasi_stock]": { itemdblClick: this.FRMimc_stock_item_aw_GRIDmutasi_stock_itemclick },
      "FRMimc_list_memo_selling_aw grid[pid=GRIDmemo_selling]": { itemdblClick: this.FRMimc_list_memo_selling_aw_GRIDmemo_selling_itemclick },
      "FRMimc_list_memo_scrap_aw grid[pid=GRIDmemo_scrap]": { itemdblClick: this.FRMimc_list_memo_scrap_aw_GRIDmemo_scrap_itemclick },
      "FRMimc_outstanding_receiving_aw grid[pid=GRIDoutreceiving_header]": { itemdblClick: this.FRMimc_outstanding_receiving_aw_GRIDoutreceiving_header_itemclick },
      */
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
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },

  formatDate: function (value) {
    var text = Ext.util.Format.date(value, "Y-m-d");
    return text;
  },
  Dodataview_click: function (dv, rec, e, index, el) {
    try {
      var vdt = rec.data;
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var vfname = "FRMimc_" + vdt.MODE_CONTROL;
      COMP.run.getmodulepopup(vfname, "NJC.INVENTORY_PLB.goods_control." + vfname, mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMimc_goods_stock_btrefresh_click: function () {
    try {
      var me = this;
      var GRIDmutasi_stock = Ext.ComponentQuery.query("FRMimc_goods_stock grid[pid=GRIDmutasi_stock]")[0];
      GRIDmutasi_stock.getStore().load();
      console.log("refreshing grid ");
      var GRIDstock_bydocument = Ext.ComponentQuery.query("FRMimc_goods_stock grid[pid=GRIDstock_bydocument]")[0];
      var GRIDitem_receiving = Ext.ComponentQuery.query("FRMimc_goods_stock grid[pid=GRIDproduct_receiving]")[0];
      var GRIDitem_out = Ext.ComponentQuery.query("FRMimc_goods_stock grid[pid=GRIDproduct_out]")[0];
      GRIDstock_bydocument.getStore().removeAll();
      GRIDitem_receiving.getStore().removeAll();
      GRIDitem_out.getStore().removeAll();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMimc_goods_stock_GRIDmutasi_stock_itemclick: function (cmp, rec) {
    try {
      var me = this;
      var GRIDstock_bydocument = Ext.ComponentQuery.query("FRMimc_goods_stock grid[pid=GRIDstock_bydocument]")[0];
      GRIDstock_bydocument.getStore().load();
      //console.log(GRIDstock_bydocument);
      //GRIDstock_bydocument.getView().refresh();
      var GRIDitem_receiving = Ext.ComponentQuery.query("FRMimc_goods_stock grid[pid=GRIDproduct_receiving]")[0];
      GRIDitem_receiving.getStore().load();
      //GRIDitem_receiving.getView().refresh();
      var GRIDitem_out = Ext.ComponentQuery.query("FRMimc_goods_stock grid[pid=GRIDproduct_out]")[0];
      GRIDitem_out.getStore().load();
      //GRIDitem_out.getView().refresh();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});

