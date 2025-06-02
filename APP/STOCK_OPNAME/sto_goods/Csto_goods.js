Ext.define("NJC.STOCK_OPNAME.sto_goods.Csto_goods", {
  extend: "Ext.app.ViewController",
  alias: "controller.Csto_goods",
  init: function (view) {
    this.control({

      "sto_goods GRIDsto_goods button[pid=btnew]": { click: this.btnew_click },
      /*"sto_goods grid[pid=GRIDsto_goods]": { itemdblclick: this.GRIDsto_goods_itemdblclick },
      */
      /*"FRMsto_goods button[pid=btsearch]": { click: this.btsearch_click },
      "FRMsto_goods_input button[pid=sto_goods_synchronize]": { click:this.btsto_goods_synchronize }
      */
    });
    this.listen({
      store: {},
    });
    this.var_global = {};
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
  GRIDsto_goods_load: function (grid) {
    try {
      var me = this;
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btnew_click: function () {
    try {
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("FRMsto_goods_input", "NJC.STOCK_OPNAME.sto_goods.FRMsto_goods_input", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btdetail_frmsto_goods: function (xgrid, rowIndex) {
    try {
      xgrid.getSelectionModel().select(rowIndex);
      //var GRID = Ext.ComponentQuery.query("sto_goods GRIDsto_goods grid[pid=GRIDsto_goods]")[0];
      //console.log(GRID);
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("FRMsto_goods", "NJC.STOCK_OPNAME.sto_goods.FRMsto_goods", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btsto_goods_synchronize: function () {
    try {
      var vdate = Ext.ComponentQuery.query("FRMsto_goods_input datefield[name=TANGGAL_RCV_STO_GOODS]")[0];
      var FRMGRIDsto_goods_input = Ext.ComponentQuery.query("FRMsto_goods_input grid[pid=FRMGRIDsto_goods]")[0];
      var vdate_value = moment(vdate.getValue()).format("YYYY-MM-DD");
      FRMGRIDsto_goods_input.getStore().load()
      console.log(FRMGRIDsto_goods_input)
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
      var mydate = Ext.Date.format(new Date(), "(d_m_Y.H.i.s__)");


      var cfg = Ext.merge(
        {

          title: "Stock Opname Goods",
          fileName: "Stock Opname Goods_" + mydate + "." + (btn.cfg.ext || btn.cfg.type),
          includeGroups: true,
          includeSummary: true,
          style: { border: "solid" },
        },
        btn.cfg
      );

      var GRID = Ext.ComponentQuery.query("sto_goods GRIDsto_goods grid[pid=GRIDsto_goods]")[0];

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

    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  }
});