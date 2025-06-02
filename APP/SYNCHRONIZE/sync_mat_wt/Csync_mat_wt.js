Ext.define("TDK.SYNCHRONIZE.sync_mat_wt.Csync_mat_wt", {
  extend: "Ext.app.ViewController",
  alias: "controller.Csync_mat_wt",
  init: function (view) {
    this.control({
      "sync_mat_wt button[pid=btrefresh]": { click: this.btrefresh_click },
      "sync_mat_wt button[pid=btprocess_sync]": { click: this.btprocess_sync_click },
      "sync_mat_wt button[pid=btcancel_sync]": { click: this.btcancel_sync_click },
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
  GRIDsync_mat_wt_load: function () {
    try {
      var STGRIDnew = new Ext.data.Store({
        autoLoad: true,
        remoteSort: true,
        remoteFilter: true,
        pageSize: 15,
        proxy: {
          type: "ajax",
          disableCaching: false,
          noCache: false,
          headers: { Authorization: "Bearer" },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "sync_doc/sync_docs",
          extraParams: {
            method: "read_data",
            module: "mat_wt",
          },
          reader: {
            type: "json",
            rootProperty: "Rows",
            totalProperty: "TotalRows",
            successProperty: "success",
          },
        },
      });

      var GRID = Ext.ComponentQuery.query("sync_mat_wt GRIDsync_mat_wt grid[pid=GRIDsync_mat_wt]")[0];
      GRID.reconfigure(STGRIDnew);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  GRIDsync_mat_wt_log_load: function () {
    try {
      var STGRIDnew = new Ext.data.Store({
        autoLoad: true,
        remoteSort: true,
        remoteFilter: true,
        pageSize: 15,
        proxy: {
          type: "ajax",
          disableCaching: false,
          noCache: false,
          headers: { Authorization: "Bearer" },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "sync_doc/sync_docs",
          extraParams: {
            method: "read_log",
            module: "upload_mat_wt",
          },
          reader: {
            type: "json",
            rootProperty: "Rows",
            totalProperty: "TotalRows",
            successProperty: "success",
          },
        },
      });

      var GRID = Ext.ComponentQuery.query("sync_mat_wt GRIDsync_mat_wt grid[pid=GRIDsync_mat_wt_log]")[0];
      GRID.reconfigure(STGRIDnew);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btrefresh_click: function () {
    try {
      var GRIDlog = Ext.ComponentQuery.query("sync_mat_wt GRIDsync_mat_wt grid[pid=GRIDsync_mat_wt_log]")[0];
      GRIDlog.getStore().load();
      var GRID = Ext.ComponentQuery.query("sync_mat_wt GRIDsync_mat_wt grid[pid=GRIDsync_mat_wt]")[0];
      GRID.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btprocess_sync_click: function () {
    try {
      var me = this;
      var params = Ext.encode({
        method: "sync_file",
        module: "mat_wt",
      });
      var hasil = COMP.run.getservice(vconfig.service_api + "sync_doc/sync_doc", params, "POST", me.var_global.jwt);
      hasil.then(function (content) {
        var val = Ext.decode(content, true);
        if (val.success == "true") {
          COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 2000 });
        } else {
          COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 2000 });
        }
        me.btrefresh_click();
      }, this);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btcancel_sync_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

      COMP.run.getmodulepopup("FRMsync_mat_wt_cancel", "TDK.SYNCHRONIZE.sync_mat_wt.FRMsync_mat_wt_cancel", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  GRIDsync_mat_wt_cancel_load: function (xgrid) {
    try {
      var STGRIDnew = new Ext.data.Store({
        autoLoad: true,
        remoteSort: true,
        remoteFilter: true,
        pageSize: 15,
        proxy: {
          type: "ajax",
          disableCaching: false,
          noCache: false,
          headers: { Authorization: "Bearer" },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "sync_doc/sync_docs",
          extraParams: {
            method: "header_sync",
            module: "mat_wt",
          },
          reader: {
            type: "json",
            rootProperty: "Rows",
            totalProperty: "TotalRows",
            successProperty: "success",
          },
        },
      });

      xgrid.reconfigure(STGRIDnew);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  mat_wt_cancel_dokumen: function (grid, rowIndex, colIndex) {
    try {
      var rec = grid.getStore().getAt(rowIndex);
      var me = this;
      Ext.MessageBox.confirm(
        "Konfirmasi",
        "Konfirmasi Cancel Synchronize MAT WT: <br />" + rec.data.FILE_DESCRIPTION,
        function (button) {
          if (button === "yes") {
            var rec = grid.getStore().getAt(rowIndex);
            var params = Ext.encode({
              method: "sync_cancel",
              module: "mat_wt",
              data: rec.data,
            });
            var hasil = COMP.run.getservice(vconfig.service_api + "sync_doc/sync_doc", params, "POST", me.var_global.jwt);
            hasil.then(function (content) {
              var val = Ext.decode(content, true);
              if (val.success === "true") {
                COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 3000 });
              } else {
                COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 3000 });
              }
              grid.getStore().load();
              me.btrefresh_click();
            }, this);
          }
        },
        this
      );
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});
