Ext.define("NJC.MASTERS.goods_barang.Cgoods_barang", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cgoods_barang",
  init: function (view) {
    this.control({
      "goods_barang button[pid=btnew]": { click: this.btnew_click },
      "FRMgoods_barang button[pid=btnew_input]": { click: this.btnew_input_click },
      "FRMgoods_barang button[pid=btsimpan_draft]": { click: this.btsimpan_draft_click },
      "FRMgoods_barang button[pid=bthapus_draft]": { click: this.bthapus_draft_click },
      "goods_barang grid[pid=GRIDgoods_barang]": { itemdblclick: this.GRIDgoods_barang_itemdblclick },
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
      console.log("renderer controller");
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  GRIDgoods_barang_load: function () {
    try {
      var me = this;
      var STGRIDnew = new Ext.data.Store({
        autoLoad: true,
        remoteSort: true,
        remoteFilter: true,
        pageSize: 0,
        proxy: {
          type: "ajax",
          disableCaching: false,
          noCache: false,
          headers: { Authorization: "Bearer " + me.var_global.jwt },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "goods_barang/goods_barangs",
          reader: {
            type: "json",
            rootProperty: "Rows",
            totalProperty: "TotalRows",
            successProperty: "success",
          },
        },
      });

      var GRID = Ext.ComponentQuery.query("goods_barang GRIDgoods_barang grid[pid=GRIDgoods_barang]")[0];
      GRID.reconfigure(STGRIDnew);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  GRIDgoods_barang_itemdblclick: function (cmp, rec) {
    try {
      var me = this;
      var vdt = rec.data;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var load_edit = COMP.run.getmodulepopup("FRMgoods_barang", "NJC.MASTERS.goods_barang.FRMgoods_barang", mainpanel);
      if (load_edit) {
        var FRM = Ext.ComponentQuery.query("Cgoods_barang form")[0];
        me.edit_header(FRM, vdt);
      }
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btdetail_rows_click: function (xgrid, rowIndex) {
    try {
      var me = this;
      var vdt = xgrid.getStore().getAt(rowIndex).data;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var load_edit = COMP.run.getmodulepopup("FRMgoods_barang", "NJC.MASTERS.goods_barang.FRMgoods_barang", mainpanel);
      if (load_edit) {
        var FRM = Ext.ComponentQuery.query("Cgoods_barang form")[0];
        me.edit_header(FRM, vdt);
      }
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  edit_header: function (FRM, vdt) {
    try {
      var me = this;
      var params = Ext.encode({
        method: "edit",
        data: vdt,
      });
      var hasil = COMP.run.getservice(vconfig.service_api + "goods_barang/goods_barang", params, "POST", me.var_global.jwt);
      hasil.then(function (content) {
        var val = Ext.decode(content, true);
        if (val.success == "true") {
          COMP.TipToast.toast("Info", val.message, { cls: "info", delay: 2000 });
          var vdtload = val.data;
          FRM.getForm().reset();
          FRM.getForm().setValues(vdtload);
        }
      }, this);
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
          title: "Master Supplier",
          fileName: "Master Supplier." + (btn.cfg.ext || btn.cfg.type),
          includeGroups: true,
          includeSummary: true,
        },
        btn.cfg
      );
      var GRID = Ext.ComponentQuery.query("goods_barang GRIDgoods_barang grid[pid=GRIDgoods_barang]")[0];
      GRID.saveDocumentAs(cfg).then(function () {
        Ext.MessageBox.hide();
      });
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btnew_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

      COMP.run.getmodulepopup("FRMgoods_barang", "NJC.MASTERS.goods_barang.FRMgoods_barang", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btnew_input_click: function (cmp) {
    try {
      var FRM = Ext.ComponentQuery.query("FRMgoods_barang form")[0];
      FRM.getForm().reset();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});
