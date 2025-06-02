Ext.define("NJC.MASTERS.mst_item_comp.type_part.Ctype_part", {
  extend: "Ext.app.ViewController",
  alias: "controller.Ctype_part",
  init: function (view) {
    this.control({
      "type_part FRMtype_part grid[pid=GRIDtype_part]": { itemdblclick: this.GRIDtype_part_itemdblclick },
      "type_part button[pid=btnew_input]": { click: this.btnew_input_click },
      "type_part button[pid=btsave]": { click: this.btsave_click },
      "type_part button[pid=btdelete]": { click: this.btdelete_click },
    });
    this.var_global = {
      jwt: localStorage.getItem("ST_NJC_JWT_PLB"),
    };
    this.renderpage();
  },
  renderpage: function () {
    try {
      console.log("controller type");
    } catch (err) {
      COMP.TipToast.toast("Error", err.message, { cls: "danger", delay: 2000 });
    }
  },
  btnew_input_click: function () {
    try {
      var FRM = Ext.ComponentQuery.query("FRMtype_part form")[0];
      var MAIN_dtval = FRM.getValues(false, false, false, true);
      FRM.getForm().reset();
    } catch (err) {
      COMP.TipToast.toast("Error", err.message, { cls: "danger", delay: 2000 });
    }
  },
  GRIDtype_part_itemdblclick: function (cmp, rec) {
    try {
      var FRM = Ext.ComponentQuery.query("FRMtype_part form")[0];
      var MAIN_dtval = FRM.getValues(false, false, false, true);
      FRM.getForm().setValues({
        ID: rec.data.ID,
        MODE_CODE: rec.data.MODE_CODE,
        MODE_NAME: rec.data.MODE_NAME,
      });
    } catch (err) {
      COMP.TipToast.toast("Error", err.message, { cls: "danger", delay: 2000 });
    }
  },
  btsave_click: function () {
    try {
      var me = this;
      var FRM = Ext.ComponentQuery.query("FRMtype_part form")[0];
      var GRID = Ext.ComponentQuery.query("FRMtype_part grid[pid=GRIDtype_part]")[0];
      var MAIN_dtval = FRM.getValues(false, false, false, true);
      if (MAIN_dtval.MODE_CODE === "") 
      {
        COMP.TipToast.toast("Error", "Isi data lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      var vsave = MAIN_dtval.ID === 0 ? "insert" : "update";
      var params = Ext.encode({
        method: "create_matrix",
        mode_category: "TYPE PART",
        module: vsave,
        data: Ext.encode(MAIN_dtval),
      });
      var hasil = COMP.run.getservice(vconfig.service_api + "matrix/matrix", params, "POST", me.var_global.jwt);
      hasil.then(function (content) {
        var val = Ext.decode(content, true);
        if (val.success === "true") {
          GRID.getStore().load();
          FRM.getForm().reset();
          COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 3000 });
        } else {
          COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 3000 });
        }
      }, this);
    } catch (err) {
      COMP.TipToast.toast("Error", err.message, { cls: "danger", delay: 2000 });
    }
  },
  btdelete_click: function () {
    try {
      var me = this;
      var FRM = Ext.ComponentQuery.query("FRMtype_part form")[0];
      var GRID = Ext.ComponentQuery.query("FRMtype_part grid[pid=GRIDtype_part]")[0];

      if (GRID.getSelectionModel().getSelection().length < 1) {
        COMP.TipToast.toast("Error", "Pilih Data lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      var vdt = GRID.getSelectionModel().getSelection()[0].data;
      var params = Ext.encode({
        method: "delete_matrix",
        mode_category: "TYPE PART",
        module: "delete",
        data: Ext.encode(vdt),
      });

      Ext.MessageBox.confirm(
        "Konfirmasi",
        "Konfirmasi Hapus Data",
        function (button) {
          if (button === "yes") {
            var hasil = COMP.run.getservice(vconfig.service_api + "matrix/matrix", params, "POST", me.var_global.jwt);
            hasil.then(function (content) {
              var val = Ext.decode(content, true);
              if (val.success === "true") {
                GRID.getStore().load();
                FRM.getForm().reset();
                COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 3000 });
              } else {
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
          title: "Master Type Part",
          fileName: "Master Type Part." + (btn.cfg.ext || btn.cfg.type),
          includeGroups: true,
          includeSummary: true,
        },
        btn.cfg
      );
      var GRID = Ext.ComponentQuery.query("FRMtype_part grid[pid=GRIDtype_part]")[0];
      GRID.saveDocumentAs(cfg).then(function () {
        Ext.MessageBox.hide();
      });
    } catch (ex) {
      NJC.plugin.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});
