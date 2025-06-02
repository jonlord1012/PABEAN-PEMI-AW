Ext.define("NJC.MASTERS.mst_item_hs.Cmst_item_hs", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cmst_item_hs",
  init: function (view) {
    this.control({
      "mst_item_hs button[pid=btnew]": { click: this.btnew_click },
      "FRMmst_item_hs button[pid=btnew_input]": { click: this.btnew_input_click },
      "FRMmst_item_hs button[pid=btsimpan_draft]": { click: this.btsimpan_draft_click },
      "FRMmst_item_hs button[pid=bthapus_draft]": { click: this.bthapus_draft_click },
      "mst_item_hs grid[pid=GRIDmst_item_hs]": { itemdblclick: this.GRIDmst_item_hs_itemdblclick },
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
  GRIDmst_item_hs_load: function () {
    try {
      var me = this;
      var STGRIDnew = new Ext.data.Store({
        autoLoad: true,
        remoteSort: true,
        remoteFilter: true,
        pageSize: 20,
        proxy: {
          type: "ajax",
          disableCaching: false,
          noCache: false,
          headers: { Authorization: "Bearer " + me.var_global.jwt },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "mst_item_hs/mst_item_hss",
          extraParams: {
            method: "read_in",
          },
          reader: {
            type: "json",
            rootProperty: "Rows",
            totalProperty: "TotalRows",
            successProperty: "success",
          },
        },
      });

      var GRID = Ext.ComponentQuery.query("mst_item_hs GRIDmst_item_hs grid[pid=GRIDmst_item_hs]")[0];
      GRID.reconfigure(STGRIDnew);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  GRIDFRMmst_item_hs_load: function () {
    try {
      var me = this;
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  GRIDmst_item_hs_itemdblclick: function (cmp, rec) {
    try {
      var me = this;
      var vdt = rec.data;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var load_edit = COMP.run.getmodulepopup("FRMmst_item_hs", "NJC.MASTERS.mst_item_hs.FRMmst_item_hs", mainpanel);
      if (load_edit) {
        var FRM = Ext.ComponentQuery.query("FRMmst_item_hs form")[0];
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
      var load_edit = COMP.run.getmodulepopup("FRMmst_item_hs", "NJC.MASTERS.mst_item_hs.FRMmst_item_hs", mainpanel);
      if (load_edit) {
        var FRM = Ext.ComponentQuery.query("FRMmst_item_hs form")[0];
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
      var GRID = Ext.ComponentQuery.query("FRMmst_item_hs grid[pid=GRIDFRMmst_item_hs]")[0];

      var hasil = COMP.run.getservice(vconfig.service_api + "mst_item_hs/mst_item_hs", params, "POST", me.var_global.jwt);
      hasil.then(function (content) {
        var val = Ext.decode(content, true);
        if (val.success == "true") {
          COMP.TipToast.toast("Info", val.message, { cls: "info", delay: 2000 });
          var vdtload = val.data;
          //var vdt_items = Ext.decode(val.items);
          //console.log(vdt_items);
          FRM.getForm().reset();
          FRM.getForm().setValues(vdtload);
          var GRIDstore = Ext.create("Ext.data.Store", {
            data: val.items,
          });
          GRID.reconfigure(GRIDstore);
        }
      }, this);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btnew_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

      COMP.run.getmodulepopup("FRMmst_item_hs", "NJC.MASTERS.mst_item_hs.FRMmst_item_hs", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btnew_input_click: function (cmp) {
    try {
      var FRM = Ext.ComponentQuery.query("FRMmst_item_hs form")[0];
      FRM.getForm().reset();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  setfield_input: function (tofield, rec) {
    try {
      var popup = Ext.ComponentQuery.query("popup_search")[0];
      Ext.iterate(tofield, function (key, value) {
        var nfield = Ext.ComponentQuery.query("field[name=" + key + "]")[0];
        nfield.setValue(rec.data[value]);
      });
      popup.close();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  bthapus_draft_click: function (grid, rowIndex, colIndex) {
    try {
      var me = this;
      var GRID = Ext.ComponentQuery.query("GRIDmst_item_hs grid[pid=GRIDmst_item_hs]")[0];
      var mainpanel = Ext.ComponentQuery.query("FRMmst_item_hs")[0];
      var FRM = Ext.ComponentQuery.query("FRMmst_item_hs form")[0];
      var MAIN_dtval = FRM.getValues(false, false, false, true);
      if (MAIN_dtval.ID === "") {
        COMP.TipToast.toast("Error", "Data Yang ingin dihapus Tidak ada", { cls: "danger", delay: 2000 });
        return false;
      }
      Ext.MessageBox.confirm(
        "Konfirmasi",
        "Konfirmasi Hapus Data Part/Item",
        function (button) {
          if (button === "yes") {
            var params = Ext.encode({
              method: "delete",
              module: "part_hs",
              data: Ext.encode(MAIN_dtval.ID),
            });
            var hasil = COMP.run.getservice(vconfig.service_api + "mst_item_hs/mst_item_hs", params, "POST", me.var_global.jwt);
            hasil.then(function (content) {
              var val = Ext.decode(content, true);
              if (val.success === "true") {
                COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 3000 });
                FRM.reset();
                mainpanel.close();
                GRID.getStore().load();
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
  btsimpan_draft_click: function () {
    try {
      var me = this;
      var GRID = Ext.ComponentQuery.query("GRIDmst_item_hs grid[pid=GRIDmst_item_hs]")[0];
      var mainpanel = Ext.ComponentQuery.query("FRMmst_item_hs")[0];
      var FRM = Ext.ComponentQuery.query("FRMmst_item_hs form")[0];
      var MAIN_dtval = FRM.getValues(false, false, false, true);

      if (MAIN_dtval.NOMOR_HS === "") {
        COMP.TipToast.toast("Error", "Input Nomor HS lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      } else if (MAIN_dtval.TARIF_BM < "0") {
        COMP.TipToast.toast("Error", "Tarif BM tidak boleh kurang dari 0", { cls: "danger", delay: 2000 });
        return false;
      } else if (MAIN_dtval.TARIF_PPN < "0") {
        COMP.TipToast.toast("Error", "Tarif PPN tidak boleh kurang dari 0", { cls: "danger", delay: 2000 });
        return false;
      } else if (MAIN_dtval.TARIF_PPH < "0") {
        COMP.TipToast.toast("Error", "Tarif PPH tidak boleh kurang dari 0", { cls: "danger", delay: 2000 });
        return false;
      } else if (MAIN_dtval.TARIF_CUKAI < "0") {
        COMP.TipToast.toast("Error", "Tarif Cukai tidak boleh kurang dari 0", { cls: "danger", delay: 2000 });
        return false;
      } else if (MAIN_dtval.TARIF_PPNBM < "0") {
        COMP.TipToast.toast("Error", "Tarif PPNBM tidak boleh kurang dari 0", { cls: "danger", delay: 2000 });
        return false;
      } 
      else if (MAIN_dtval.ID !== "") 
      {
        Ext.MessageBox.confirm(
          "Konfirmasi",
          "Konfirmasi Simpan Data Update Part/Item",
          function (button) {
            if (button === "yes") {
              var params = Ext.encode({
                method: "update",
                module: "part_hs",
                data: Ext.encode(MAIN_dtval),
              });
              var hasil = COMP.run.getservice(vconfig.service_api + "mst_item_hs/mst_item_hs", params, "POST", me.var_global.jwt);
              hasil.then(function (content) {
                var val = Ext.decode(content, true);
                if (val.success === "true") {
                  COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 3000 });
                  FRM.reset();
                  mainpanel.close();
                  GRID.getStore().load();
                } else {
                  COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 3000 });
                }
              }, this);
            }
          },
          this
        );
      } 
      else 
      {
        Ext.MessageBox.confirm(
          "Konfirmasi",
          "Konfirmasi Simpan Data Input Part/Item",
          function (button) {
            if (button === "yes") {
              var params = Ext.encode({
                method: "create",
                module: "part_hs",
                data: Ext.encode(MAIN_dtval),
              });
              var hasil = COMP.run.getservice(vconfig.service_api + "mst_item_hs/mst_item_hs", params, "POST", me.var_global.jwt);
              hasil.then(function (content) {
                var val = Ext.decode(content, true);
                if (val.success === "true") {
                  COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 3000 });
                  FRM.reset();
                  mainpanel.close();
                  GRID.getStore().load();
                } else {
                  COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 3000 });
                }
              }, this);
            }
          },
          this
        );
      }
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
          title: "Master Item/Part HS",
          fileName: "Master Item/Part HS." + (btn.cfg.ext || btn.cfg.type),
          includeGroups: true,
          includeSummary: true,
        },
        btn.cfg
      );
      var GRID = Ext.ComponentQuery.query("mst_item_hs GRIDmst_item_hs grid[pid=GRIDmst_item_hs]")[0];
      GRID.saveDocumentAs(cfg).then(function () {
        Ext.MessageBox.hide();
      });
    } catch (ex) {
      NJC.plugin.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});
