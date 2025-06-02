Ext.define("NJC.MASTERS.master_tenant.Cmaster_tenant", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cmaster_tenant",
  init: function (view) {
    this.control({
      "master_tenant button[pid=btnew]": { click: this.btnew_click },
      "FRMmaster_tenant button[pid=btnew_input]": { click: this.btnew_input_click },
      "FRMmaster_tenant button[pid=btsimpan_draft]": { click: this.btsimpan_draft_click },
      "FRMmaster_tenant button[pid=bthapus_draft]": { click: this.bthapus_draft_click },
      "master_tenant grid[pid=GRIDmaster_tenant]": { itemdblclick: this.GRIDmaster_tenant_itemdblclick },
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
      console.log("renderer " + this.alias);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  GRIDmaster_tenant_load: function () {
    try {
      var me = this;
      var STGRIDnew = new Ext.data.Store({
        autoLoad: true,
        remoteSort: true,
        remoteFilter: true,
        pageSize: 100,
        proxy: {
          type: "ajax",
          disableCaching: false,
          noCache: false,
          headers: { Authorization: "Bearer " + me.var_global.jwt },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "master_tenant/master_tenants",
          reader: {
            type: "json",
            rootProperty: "Rows",
            totalProperty: "TotalRows",
            successProperty: "success",
          },
        },
      });

      var GRID = Ext.ComponentQuery.query("master_tenant GRIDmaster_tenant grid[pid=GRIDmaster_tenant]")[0];
      GRID.reconfigure(STGRIDnew);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  GRIDmaster_tenant_itemdblclick: function (cmp, rec) {
    try {
      var me = this;
      var vdt = rec.data;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var load_edit = COMP.run.getmodulepopup("FRMmaster_tenant", "NJC.MASTERS.master_tenant.FRMmaster_tenant", mainpanel);
      if (load_edit) {
        var FRM = Ext.ComponentQuery.query("Cmaster_tenant form")[0];
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
      var load_edit = COMP.run.getmodulepopup("FRMmaster_tenant", "NJC.MASTERS.master_tenant.FRMmaster_tenant", mainpanel);
      if (load_edit) {
        var FRM = Ext.ComponentQuery.query("Cmaster_tenant form")[0];
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
      var FRM = Ext.ComponentQuery.query("FRMmaster_tenant form")[0];
      var hasil = COMP.run.getservice(vconfig.service_api + "master_tenant/master_tenant", params, "POST", me.var_global.jwt);
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
          title: "Master Tenant",
          fileName: "Master Tenant." + (btn.cfg.ext || btn.cfg.type),
          includeGroups: true,
          includeSummary: true,
          style: { border:"solid",}, 
        },
        btn.cfg
      );
      
      var GRID = Ext.ComponentQuery.query("master_tenant GRIDmaster_tenant grid[pid=GRIDmaster_tenant]")[0];
      
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
  },
  btnew_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("FRMmaster_tenant", "NJC.MASTERS.master_tenant.FRMmaster_tenant", mainpanel);
      //var FRM = Ext.ComponentQuery.query("FRMmaster_tenant form")[0];
      //FRM.getForm().reset();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btnew_input_click: function (cmp) {
    try {
      var FRM = Ext.ComponentQuery.query("FRMmaster_tenant form")[0];
      FRM.getForm().reset();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  bthapus_draft_click: function () {

  },
  btsimpan_draft_click: function () {

  },
});
