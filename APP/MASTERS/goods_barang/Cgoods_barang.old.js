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
        var load_edit = COMP.run.getmodulepopup("FRMgoods_barang", "NJC.MASTERS.goods_barang.Fgoods_barang", mainpanel);
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
        var load_edit = COMP.run.getmodulepopup("FRMgoods_barang", "NJC.MASTERS.goods_barang.Fgoods_barang", mainpanel);
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
    btnew_click: function () {
      try {
        var me = this;
        var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
  
        COMP.run.getmodulepopup("FRMgoods_barang", "NJC.MASTERS.goods_barang.FRMgoods_barang", mainpanel);
      } catch (ex) {
        COMP.TipToast.toast("Error", ex.message, { cls: "dangerCgoods_barang delay: 2000 });
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
        var mainpanel = Ext.ComponentQuery.query("FRMgoods_barang")[0];
        var GRID = Ext.ComponentQuery.query("GRIDgoods_barang grid[pid=GRIDgoods_barang]")[0];
        var FRM = Ext.ComponentQuery.query("FRMgoods_barang form")[0];
        var MAIN_dtval = FRM.getValues(false, false, false, true);
        if (MAIN_dtval.ID === "") {
          COMP.TipToast.toast("Error", "Data Yang ingin dihapus Tidak ada", { cls: "danger", delay: 2000 });
          return false;
        }
        Ext.MessageBox.confirm(
          "Konfirmasi",
          "Konfirmasi Hapus Data Supplier",
          function (button) {
            if (button === "yes") {
              var params = Ext.encode({
                method: "delete",
                module: "supplier",
                data: Ext.encode(MAIN_dtval.ID),
              });
              var hasil = COMP.run.getservice(vconfig.service_api + "goods_barang/goods_barang", params, "POST", me.var_global.jwt);
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
        var mainpanel = Ext.ComponentQuery.query("FRMgoods_barang")[0];
        var GRID = Ext.ComponentQuery.query("GRIDgoods_barang grid[pid=GRIDgoods_barang]")[0];
        var FRM = Ext.ComponentQuery.query("FRMgoods_barang form")[0];
        var MAIN_dtval = FRM.getValues(false, false, false, true);
        if (MAIN_dtval.KODE_INTERNAL === "") 
        {
          COMP.TipToast.toast("Error", "Input Kode Internal lebih dulu", { cls: "danger", delay: 2000 });
          return false;
        }
        else if (MAIN_dtval.NAMA === "") 
        {
          COMP.TipToast.toast("Error", "Input Nama Supplier lebih dulu", { cls: "danger", delay: 2000 });
          return false;
        }
        else if (MAIN_dtval.ALAMAT === "") 
        {
          COMP.TipToast.toast("Error", "Input Alamat Supplier lebih dulu", { cls: "danger", delay: 2000 });
          return false;
        }
        else if (MAIN_dtval.NPWP === "") 
        {
          COMP.TipToast.toast("Error", "Input NPWP Supplier lebih dulu", { cls: "danger", delay: 2000 });
          return false;
        }
        else if (MAIN_dtval.KODE_ID === "") 
        {
          COMP.TipToast.toast("Error", "Input Kode ID Supplier lebih dulu", { cls: "danger", delay: 2000 });
          return false;
        }
        else if (MAIN_dtval.KODE_NEGARA === "") 
        {
          COMP.TipToast.toast("Error", "Input Kode Negara Supplier lebih dulu", { cls: "danger", delay: 2000 });
          return false;
        }
        else if (MAIN_dtval.ID_CEISA < "1") 
        {
          COMP.TipToast.toast("Error", "Input ID Ceisa Supplier lebih dulu", { cls: "danger", delay: 2000 });
          return false;
        }
        else if (MAIN_dtval.KODE_COO === "") 
        {
          COMP.TipToast.toast("Error", "Input Kode COO Supplier lebih dulu", { cls: "danger", delay: 2000 });
          return false;
        }
        else if (MAIN_dtval.KODE_MOLTS === "") 
        {
          COMP.TipToast.toast("Error", "Input Kode Molts Supplier lebih dulu", { cls: "danger", delay: 2000 });
          return false;
        }
        else if (MAIN_dtval.KODE_LP === "") 
        {
          COMP.TipToast.toast("Error", "Input Kode LP Supplier lebih dulu", { cls: "danger", delay: 2000 });
          return false;
        }
        else if (MAIN_dtval.ID !== "")
        {
          Ext.MessageBox.confirm(
            "Konfirmasi",
            "Konfirmasi Simpan Data Update Teknisi",
            function (button) {
              if (button === "yes") {
                var params = Ext.encode({
                  method: "update",
                  module: "supplier",
                  data: Ext.encode(MAIN_dtval),
                });
                var hasil = COMP.run.getservice(vconfig.service_api + "goods_barang/goods_barang", params, "POST", me.var_global.jwt);
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
            "Konfirmasi Simpan Data Input Supplier",
            function (button) {
              if (button === "yes") {
                var params = Ext.encode({
                  method: "create",
                  module: "supplier",
                  data: Ext.encode(MAIN_dtval),
                });
                var hasil = COMP.run.getservice(vconfig.service_api + "goods_barang/goods_barang", params, "POST", me.var_global.jwt);
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
        NJC.plugin.Tgoods_barang.tgoods_barang("Error", ex.message, { cls: "danger", delay: 2000 Cgoods_barang
      }
    },
  });
  