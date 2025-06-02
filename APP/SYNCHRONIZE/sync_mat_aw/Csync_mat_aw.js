Ext.define("TDK.SYNCHRONIZE.sync_mat_aw.Csync_mat_aw", {
  extend: "Ext.app.ViewController",
  alias: "controller.Csync_mat_aw",
  init: function (view) {
    this.control({
      "sync_mat_aw button[pid=btrefresh]": { click: this.btrefresh_click },
      "sync_mat_aw button[pid=btprocess_sync]": { click: this.btprocess_sync_click },
      "sync_mat_aw button[pid=btcancel_sync]": { click: this.btcancel_sync_click },
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
  GRIDsync_mat_aw_load: function () {
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
            module: "mat_aw",
          },
          reader: {
            type: "json",
            rootProperty: "Rows",
            totalProperty: "TotalRows",
            successProperty: "success",
          },
        },
      });

      var GRID = Ext.ComponentQuery.query("sync_mat_aw GRIDsync_mat_aw grid[pid=GRIDsync_mat_aw]")[0];
      GRID.reconfigure(STGRIDnew);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  GRIDsync_mat_aw_log_load: function () {
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
            module: "upload_mat_aw",
          },
          reader: {
            type: "json",
            rootProperty: "Rows",
            totalProperty: "TotalRows",
            successProperty: "success",
          },
        },
      });

      var GRID = Ext.ComponentQuery.query("sync_mat_aw GRIDsync_mat_aw grid[pid=GRIDsync_mat_aw_log]")[0];
      GRID.reconfigure(STGRIDnew);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btrefresh_click: function () {
    try {
      var GRIDlog = Ext.ComponentQuery.query("sync_mat_aw GRIDsync_mat_aw grid[pid=GRIDsync_mat_aw_log]")[0];
      GRIDlog.getStore().load();
      var GRID = Ext.ComponentQuery.query("sync_mat_aw GRIDsync_mat_aw grid[pid=GRIDsync_mat_aw]")[0];
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
        module: "mat_aw",
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

      COMP.run.getmodulepopup("FRMsync_mat_aw_cancel", "TDK.SYNCHRONIZE.sync_mat_aw.FRMsync_mat_aw_cancel", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  GRIDsync_mat_aw_cancel_load: function (xgrid) {
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
            module: "mat_aw",
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
  mat_aw_cancel_dokumen: function (grid, rowIndex, colIndex) {
    try {
      var rec = grid.getStore().getAt(rowIndex);
      var me = this;
      Ext.MessageBox.confirm(
        "Konfirmasi",
        "Konfirmasi Cancel Synchronize MAT AW: <br />" + rec.data.FILE_DESCRIPTION,
        function (button) {
          if (button === "yes") {
            var rec = grid.getStore().getAt(rowIndex);
            var params = Ext.encode({
              method: "sync_cancel",
              module: "mat_aw",
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
