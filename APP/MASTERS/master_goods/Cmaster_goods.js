Ext.define("NJC.MASTERS.master_goods.Cmaster_goods", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cmaster_goods",
  init: function (view) {
    this.control({
      "master_goods button[pid=btnew]": { click: this.btnew_click },
	  "master_goods button[pid=btsync_wms]": { click: this.btsync_click },

      "FRMmaster_goods button[pid=btnew_input]": { click: this.btnew_input_click },
      "FRMmaster_goods button[pid=btsimpan_draft]": { click: this.btsimpan_draft_click },
      "FRMmaster_goods button[pid=bthapus_draft]": { click: this.bthapus_draft_click },
      "FRMmaster_goods button[pid=btsearch]": { click: this.btsearch_click },
      "master_goods grid[pid=GRIDmaster_goods]": { itemdblclick: this.GRIDmaster_goods_itemdblclick },
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
  btsearch_click: function (btn) {
    try {
      return this.popup_search(btn);
      
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  popup_search(btn) {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

      var popup = Ext.define("NJC.EXIM.master_goods.popup_search", {
        extend: "Ext.window.Window",
        alias: "widget.popup_search",
        reference: "popup_search",
        title: "Search",
        modal: true,
        closeAction: "destroy",
        centered: true,
        autoScroll: true,
        width: btn.popupwidth,
        height: mainpanel.getHeight() * 0.6,
        layout: { type: "vbox", pack: "start", align: "stretch" },
        bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
        items: [
          {
            xtype: "grid",
            pid: "GRIDmaster_goods_popup_search",
            emptyText: "No Matching Records",
            plugins: ["filterfield", { ptype: "cellediting", clicksToEdit: 1 }],
            flex: 1,
            height: 200,
            store: me.storename(btn.module),
            columns: me.getcolumn(btn.module),
            listeners: {
              itemdblclick: function (dv, record, item, index, e) {
                me.setfield_input(btn.tofield, record);
              },
            },
            bbar: {
              xtype: "pagingtoolbar",
              displayInfo: true,
              displayMsg: "Displaying topics {0} - {1} of {2}",
              emptyMsg: "No topics to display",
            },
          },
        ],
      });
      COMP.run.getmodulepopup("popup_search", popup, this.getView());
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  storename: function (modulename) {
    var me = this;
    return {
      autoLoad: true,
      autoSync: false,
      remoteSort: true,
      remoteFilter: true,
      pageSize: 12,
      proxy: {
        type: "ajax",
        disableCaching: false,
        noCache: false,
        headers: { Authorization: "Bearer " + me.var_global.jwt },
        actionMethods: { read: "POST" },
        url: vconfig.service_api + modulename + "/" + modulename + "s",
        reader: {
          type: "json",
          rootProperty: "Rows",
          totalProperty: "TotalRows",
          successProperty: "success",
        },
      },
    };
  },
  getcolumn: function (modulename) {
    try {
      var ncol = [];
      switch (modulename) {
        case "module_partbase":
          ncol.push({ header: "BASE PART", dataIndex: "MODE_CODE", sortable: true, flex: 1, filter: { xtype: "textfield" } });
          break;
        case "module_parttype":
          ncol.push({ header: "TYPE PART", dataIndex: "MODE_CODE", sortable: true, flex: 1, filter: { xtype: "textfield" } });
          break;
        case "module_partcategory":
          ncol.push({ header: "CATEGORY PART", dataIndex: "MODE_CODE", sortable: true, flex: 1, filter: { xtype: "textfield" } });
          break;
        case "module_partgroup":
          ncol.push({ header: "GROUP PART", dataIndex: "MODE_CODE", sortable: true, flex: 1, filter: { xtype: "textfield" } });
          break;
        case "module_partuom":
          ncol.push({ header: "UOM PART", dataIndex: "MODE_CODE", sortable: true, flex: 1, filter: { xtype: "textfield" } });
          break;
        case "module_nomorhs":
          ncol.push(
              { header: "NOMOR HS", dataIndex: "NOMOR_HS", sortable: true, flex: 1, filter: { xtype: "textfield" } },
              { header: "TARIF BM", dataIndex: "TARIF_BM", sortable: true, flex: 1, filter: { xtype: "textfield" } },
              { header: "TARIF CUKAI", dataIndex: "TARIF_CUKAI", sortable: true, flex: 1, filter: { xtype: "textfield" } },
              { header: "TARIF PPH", dataIndex: "TARIF_PPH", sortable: true, flex: 1, filter: { xtype: "textfield" } },
              { header: "TARIF PPN", dataIndex: "TARIF_PPN", sortable: true, flex: 1, filter: { xtype: "textfield" } },
              { header: "TARIF PPNBM", dataIndex: "TARIF_PPNBM", sortable: true, flex: 1, filter: { xtype: "textfield" } }
          );
          break;
        default:
          break;
      }
      return ncol;
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
  GRIDmaster_goods_load: function () {
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
          url: vconfig.service_api + "master_goods/master_goodss",
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

      var GRID = Ext.ComponentQuery.query("master_goods GRIDmaster_goods grid[pid=GRIDmaster_goods]")[0];
      GRID.reconfigure(STGRIDnew);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  GRIDmaster_goods_itemdblclick: function (cmp, rec) {
    try {
      var me = this;
      var vdt = rec.data;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var load_edit = COMP.run.getmodulepopup("FRMmaster_goods", "NJC.MASTERS.master_goods.FRMmaster_goods", mainpanel);
      if (load_edit) {
        var FRM = Ext.ComponentQuery.query("FRMmaster_goods form")[0];
        me.edit_header(FRM, vdt);
      }
      console.log(vdt)
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btdetail_rows_click: function (xgrid, rowIndex) {
    try {
      var me = this;
      var vdt = xgrid.getStore().getAt(rowIndex).data;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var load_edit = COMP.run.getmodulepopup("FRMmaster_goods", "NJC.MASTERS.master_goods.FRMmaster_goods", mainpanel);
      if (load_edit) {
        var FRM = Ext.ComponentQuery.query("FRMmaster_goods form")[0];
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
      var FRM = Ext.ComponentQuery.query("FRMmaster_goods form")[0];
      var GRID = Ext.ComponentQuery.query("FRMmaster_goods grid[pid=GRIDFRMmaster_goods_parths]")[0];

      var hasil = COMP.run.getservice(vconfig.service_api + "master_goods/master_goods", params, "POST", me.var_global.jwt);
      hasil.then(function (content) {
        var val = Ext.decode(content, true);
        if (val.success == "true") {
          COMP.TipToast.toast("Info", val.message, { cls: "info", delay: 2000 });
          var vdtload = val.data;
          //var vdtload2 = val.data_mst_part_hs;
          FRM.getForm().reset();
          FRM.getForm().setValues(vdtload);
          console.log(vdtload)
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
  show_hs: function (FRM, vdt) {
    try {
      var me = this;
      var params = Ext.encode({
        method: "edit",
        data: vdt,
      });
      var GRID = Ext.ComponentQuery.query("FRMmaster_goods grid[pid=GRIDFRMmaster_goods_parths]")[0];

      var hasil = COMP.run.getservice(vconfig.service_api + "master_goods/master_goods", params, "POST", me.var_global.jwt);
      hasil.then(function (content) {
        var val = Ext.decode(content, true);
        if (val.success == "true") {
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

      COMP.run.getmodulepopup("FRMmaster_goods", "NJC.MASTERS.master_goods.FRMmaster_goods", mainpanel);
      
      var FRM = Ext.ComponentQuery.query("FRMmaster_goods form")[0];
      FRM.getForm().reset();

    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btnew_input_click: function (cmp) {
    try {
      var FRM = Ext.ComponentQuery.query("FRMmaster_goods form")[0];
      FRM.getForm().reset();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  bthapus_draft_click: function (grid, rowIndex, colIndex) {
    try {
      var me = this;
      var GRID = Ext.ComponentQuery.query("GRIDmaster_goods grid[pid=GRIDmaster_goods]")[0];
      var mainpanel = Ext.ComponentQuery.query("FRMmaster_goods")[0];
      var FRM = Ext.ComponentQuery.query("FRMmaster_goods form")[0];
      var MAIN_dtval = FRM.getValues(false, false, false, true);
      if (MAIN_dtval.ID === "") {
        COMP.TipToast.toast("Error", "Data Yang ingin dihapus Tidak ada", { cls: "danger", delay: 2000 });
        return false;
      }
      Ext.MessageBox.confirm(
        "Konfirmasi",
        "Konfirmasi Hapus Data Master Goods",
        function (button) {
          if (button === "yes") {
            var params = Ext.encode({
              method: "delete",
              module: "part",
              data: Ext.encode(MAIN_dtval.ID),
            });
            var hasil = COMP.run.getservice(vconfig.service_api + "master_goods/master_goods", params, "POST", me.var_global.jwt);
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
      var GRID = Ext.ComponentQuery.query("GRIDmaster_goods grid[pid=GRIDmaster_goods]")[0];
      var mainpanel = Ext.ComponentQuery.query("FRMmaster_goods")[0];
      var FRM = Ext.ComponentQuery.query("FRMmaster_goods form")[0];
      var MAIN_dtval = FRM.getValues(false, false, false, true);

      if (MAIN_dtval.PART_NO === "") 
      {
        COMP.TipToast.toast("Error", "Input Part No lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      if (MAIN_dtval.PART_SAPNO === "") 
      {
        COMP.TipToast.toast("Error", "Input Part SAP No lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      else if (MAIN_dtval.PART_ALIAS === "") 
      {
        COMP.TipToast.toast("Error", "Input Part Alias lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      else if (MAIN_dtval.PART_NAME === "") 
      {
        COMP.TipToast.toast("Error", "Input Part Name lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      else if (MAIN_dtval.PART_MIN_QTY < "1") 
      {
        COMP.TipToast.toast("Error", "Input Part Min Qty lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      else if (MAIN_dtval.NOMOR_HS === "") 
      {
        COMP.TipToast.toast("Error", "Input Nomor HS lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      else if (MAIN_dtval.PART_UOM === "") 
      {
        COMP.TipToast.toast("Error", "Input Part UOM lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      else if (MAIN_dtval.PART_GROUP === "") 
      {
        COMP.TipToast.toast("Error", "Input Part Group lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      else if (MAIN_dtval.PART_CATEGORY === "") 
      {
        COMP.TipToast.toast("Error", "Input Part Category lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      else if (MAIN_dtval.BASE_PART === "") 
      {
        COMP.TipToast.toast("Error", "Input Part Base lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      else if (MAIN_dtval.PART_TYPE === "") 
      {
        COMP.TipToast.toast("Error", "Input Part Type lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      else if (MAIN_dtval.ID !== "")
      {
        Ext.MessageBox.confirm(
          "Konfirmasi",
          "Konfirmasi Simpan Data Update Supporting Goods",
          function (button) {
            if (button === "yes") {
              var params = Ext.encode({
                data: Ext.encode(MAIN_dtval),
				method: "SP_MST_PART_PLB",
				mode: 'process',
				module: 'create', 
              });
              var hasil = COMP.run.getservice(vconfig.service_api + "master_goods/master_goods", params, "POST", me.var_global.jwt);
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
        "Konfirmasi Simpan Data Input Master Goods",
        function (button) {
          if (button === "yes") {
            var params = Ext.encode({
              method: "create",
              module: "part",
              data: Ext.encode(MAIN_dtval),
            });
            var hasil = COMP.run.getservice(vconfig.service_api + "master_goods/master_goods", params, "POST", me.var_global.jwt);
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
  exportTo: async function (btn) {
    try {
      var me = this;
      Ext.MessageBox.show({
        msg: "Processing...",
        progressText: "process...",
        width: 300,
        wait: true,
      });
      var cfg = Ext.merge(
        {
          title: "Master Goods",
          fileName: "Master Goods." + (btn.cfg.ext || btn.cfg.type),
          includeGroups: true,
          includeSummary: true,
        },
        btn.cfg
      );
      
      var GRID = Ext.ComponentQuery.query("master_goods GRIDmaster_goods grid[pid=GRIDmaster_goods]")[0];
      
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
      

      // var filename = "Master Goods"
      // var data = await COMP.run.ajax_form({
      //   url    : vconfig.service_report + "report/report",
      //   token  : me.var_global.jwt,
      //   method : "POST",
      //   param  : Ext.encode({
      //     method :"data"
      //   })
      // });

      // if (data) {
      //   return COMP.run.exportReport(Ext.decode(data), btn)
      // } else {
      //   COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      // }

    } catch (ex) {

      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
    exportGridData : function(GRIDs, cfg) {
      
  },
  
  btsync_click: function () {
    try {
      var me = this;
      var params = Ext.encode({
        //method: "update",
        method: "SP_MST_PART_PLB",
        module: "SYNC_WMS",
        mode: 'SYNC_WMS',
      });
      var hasil = COMP.run.getservice(vconfig.service_api + "master_goods/master_goods", params, "POST", me.var_global.jwt);
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
      });
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});
