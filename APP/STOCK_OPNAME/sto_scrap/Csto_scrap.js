Ext.define("NJC.STOCK_OPNAME.sto_scrap.Csto_scrap", {
  extend: "Ext.app.ViewController",
  alias: "controller.Csto_scrap",
  init: function (view) {
    this.control({
      "sto_scrap GRIDsto_scrap button[pid=btnew]": { click: this.btnew_click },
      // "sto_scrap grid[pid=GRIDsto_scrap]": { itemdblclick: this.GRIDsto_scrap_itemdblclick },
      // "FRMsto_scrap button[pid=btsearch]": { click: this.btsearch_click },
      "FRMsto_scrap_input button[pid=sto_scrap_synchronize]": { click:this.btsto_scrap_synchronize }
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
  renderpage: function () {
    try {
      console.log("renderer controller");
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btnew_click:function() {
    try {
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("FRMsto_scrap_input", "NJC.STOCK_OPNAME.sto_scrap.FRMsto_scrap_input", mainpanel);
    } catch(ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btdetail_frmsto_scrap:function(){
    try {
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("FRMsto_scrap", "NJC.STOCK_OPNAME.sto_scrap.FRMsto_scrap", mainpanel);
    } catch(ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btsto_scrap_synchronize:function(){
    try {
      var vdate = Ext.ComponentQuery.query("FRMsto_scrap_input datefield[name=TANGGAL_RCV_STO_SCRAP]")[0];
      var FRMGRIDsto_scrap_input = Ext.ComponentQuery.query("FRMsto_scrap_input grid[pid=FRMGRIDsto_scrap]")[0];
      var vdate_value = moment(vdate.getValue()).format("YYYY-MM-DD");
      FRMGRIDsto_scrap_input.getStore().load()
      console.log(FRMGRIDsto_scrap_input)
    } catch(ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  exportTo: function(btn) {
    try {
      Ext.MessageBox.show({
        msg: "Processing...",
        progressText: "process...",
        width: 300,
        wait: true,
      });
      var cfg = Ext.merge(
        {
          title: "Sto Scrap",
          fileName: "Sto Scrap." + (btn.cfg.ext || btn.cfg.type),
          includeGroups: true,
          includeSummary: true,
          style: { border:"solid"}, 
        },
        btn.cfg
      );
      
      var GRID = Ext.ComponentQuery.query("sto_scrap GRIDsto_scrap grid[pid=GRIDsto_scrap]")[0];
      
      var store = GRID.getStore();

      store.setPageSize(0);

      store.load({
          callback: function(records, operation, success) {
              if (success) {
                  GRID.saveDocumentAs(cfg);
                  store.setPageSize(GRID.pageSize);
                  store.load({
                    callback:function() {
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