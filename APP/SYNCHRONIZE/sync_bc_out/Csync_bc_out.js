Ext.define("TDK.SYNCHRONIZE.sync_bc_out.Csync_bc_out", {
  extend: "Ext.app.ViewController",
  alias: "controller.Csync_bc_out",
  init: function (view) {
    this.control({
      "sync_bc_out button[pid=btresfresh]": { click: this.btresfresh_click },
      "sync_bc_out GRIDsync_bc_out combobox[name=CBO_FILTERKEY]": { select: this.CBO_FILTERKEY_select },
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
      console.log("renderer controller");
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  CBO_FILTERKEY_select: function () {
    try {
      var GRID = Ext.ComponentQuery.query("sync_bc_out GRIDsync_bc_out grid[pid=GRIDsync_bc_out]")[0];
      return this.GRIDsync_bc_out_load(GRID);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  GRIDsync_bc_out_load: function (grid) {
    try {
      var CBO_FILTERKEY = Ext.ComponentQuery.query("sync_bc_out GRIDsync_bc_out combobox[name=CBO_FILTERKEY]")[0];
      var vtahun_aju = CBO_FILTERKEY.getValue();
      var me = this;
      var STGRIDnew = new Ext.data.Store({
        autoLoad: true,
        remoteSort: true,
        remoteFilter: true,
        pageSize: 15,
        proxy: {
          type: "ajax",
          disableCaching: false,
          noCache: false,
          headers: { Authorization: "Bearer " + me.var_global.jwt },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "sync_bc_out/sync_bc_outs",
          reader: {
            type: "json",
            rootProperty: "Rows",
            totalProperty: "TotalRows",
            successProperty: "success",
          },
        },
        listeners: {
          beforeload: function (store, operation, eOpts) {
            try {
              operation.setParams({
                TAHUN_AJU: vtahun_aju,
              });
            } catch (ex) {
              COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
            }
          },
          load: function (record, rec) {
            if (rec.success === "false") {
              COMP.TipToast.toast("Error", rec.data.message, { cls: "danger", delay: 2000 });
            }
          },
        },
      });
      grid.reconfigure(STGRIDnew);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btdetail_rows_click: function (xgrid, rowIndex) {
    try {
      xgrid.getSelectionModel().select(rowIndex);
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

      COMP.run.getmodulepopup("FRMsync_bc_out_panel", "TDK.SYNCHRONIZE.sync_bc_out.FRMsync_bc_out_panel", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btresfresh_click: function () {
    try {
      var GRID = Ext.ComponentQuery.query("sync_bc_out GRIDsync_bc_out grid[pid=GRIDsync_bc_out]")[0];
      GRID.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMsync_bc_out_panel_load: function (cmp) {
    try {
      var GRID = Ext.ComponentQuery.query("sync_bc_out GRIDsync_bc_out grid[pid=GRIDsync_bc_out]")[0];
      var vdt = GRID.getSelectionModel().getSelection()[0].data;
      cmp.setTitle("Tracing Dokumen CEISA No AJU: " + vdt.NOMOR_AJU);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMsync_bc_out_panel_link_click: function (cmp, dt) {
    try {
      var vdt = dt.data;
      if (vdt.allowclick !== true) return;
      var vmodulecontrol = vdt.controlname === "" ? vdt.text : vdt.controlname;
      var vmodulename = vdt.modulename === "" ? "" : vdt.modulename;
      var id = vmodulecontrol;
      var cls = "TDK.SYNCHRONIZE.sync_bc_out." + vmodulename + "." + id;
      var tabs = Ext.ComponentQuery.query("FRMsync_bc_out_panel tabpanel[pid=tosync_bc_out_tabpanel]")[0];
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
});
