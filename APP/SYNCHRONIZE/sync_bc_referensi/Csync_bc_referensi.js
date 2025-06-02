Ext.define("TDK.SYNCHRONIZE.sync_bc_referensi.Csync_bc_referensi", {
  extend: "Ext.app.ViewController",
  alias: "controller.Csync_bc_referensi",
  init: function (view) {
    this.control({
      "sync_bc_referensi combobox[name=CBOTABLE_NAME]": { select: this.CBOTABLE_NAME_change },
    });
    this.var_global = {};
    this.renderpage();
  },
  renderpage: function () {
    try {
      this.get_store_cbotable();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  get_store_cbotable: function () {
    try {
      var me = this;
      var params = Ext.encode({
        method: "list_table",
      });
      var cbo_table = Ext.ComponentQuery.query("sync_bc_referensi GRIDsync_bc_referensi combobox[name=CBOTABLE_NAME]")[0];
      var hasil = COMP.run.getservice(vconfig.service_api + "sync_bc_referensi/sync_bc_referensi", params, "POST", me.var_global.jwt);
      hasil.then(function (content) {
        var val = Ext.decode(content, true);
        if (val.success == "true") {
          cbo_table.reset();
          cbo_table.setStore(val.Rows);
        }
      });
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  CBOTABLE_NAME_change: function (cmp, val) {
    try {
      var me = this;
      var vtablename = val.data.TABLE_NAME;
      var panel = Ext.ComponentQuery.query("sync_bc_referensi GRIDsync_bc_referensi")[0];
      var GRID = Ext.ComponentQuery.query("sync_bc_referensi GRIDsync_bc_referensi grid[pid=GRIDsync_bc_referensi]")[0];
      panel.removeAll();
      var params = {
        method: "list_field",
        module: vtablename,
      };

      var hasil = COMP.run.getservice(vconfig.service_api + "sync_bc_referensi/sync_bc_referensi", params, "POST", me.var_global.jwt);
      hasil.then(function (content) {
        var val = Ext.decode(content, true);
        if (val.success === "true") {
          var STGRIDnew = new Ext.data.Store({
            autoLoad: false,
            remoteSort: true,
            remoteFilter: true,
            pageSize: 15,
            proxy: {
              type: "ajax",
              disableCaching: false,
              noCache: false,
              headers: { Authorization: "Bearer" },
              actionMethods: { read: "POST" },
              url: vconfig.service_api + "sync_bc_referensi/sync_bc_referensis",
              extraParams: {
                module: vtablename,
              },
              reader: {
                type: "json",
                rootProperty: "Rows",
                totalProperty: "TotalRows",
                successProperty: "success",
              },
            },
          });
          var Vcolumn = [];
          Ext.each(val.Rows, function (xrow, index) {
            Vcolumn.push({ text: "haloo", width: 10 });
          });
          console.log("masuk");
          console.log(GRID);
          GRID.reconfigure(STGRIDnew);
        } else {
          COMP.TipToast.toast("Error", "Proses Error", { cls: "danger", delay: 2000 });
        }
      }, this);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});
