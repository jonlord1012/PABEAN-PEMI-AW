Ext.define("TDK.MASTERS.mst_fg_assyno.Cmst_fg_assyno", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cmst_fg_assyno",
  init: function (view) {
    this.control({
      "mst_fg_assyno button[pid=btnew]": { click: this.btnew_click },
      "FRMmst_fg_assyno button[pid=btnew_input]": { click: this.btnew_input_click },
      "FRMmst_fg_assyno button[pid=btsimpan_draft]": { click: this.btsimpan_draft_click },
      "FRMmst_fg_assyno button[pid=bthapus_draft]": { click: this.bthapus_draft_click },
      "FRMmst_fg_assyno button[pid=btsearch]": { click: this.btsearch_click },
      "mst_fg_assyno grid[pid=GRIDmst_fg_assyno]": { itemdblclick: this.GRIDmst_fg_assyno_itemdblclick },
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
  GRIDmst_fg_assyno_load: function () {
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
          url: vconfig.service_api + "mst_fg_assyno/mst_fg_assynos",
          reader: {
            type: "json",
            rootProperty: "Rows",
            totalProperty: "TotalRows",
            successProperty: "success",
          },
        },
      });

      var GRID = Ext.ComponentQuery.query("mst_fg_assyno GRIDmst_fg_assyno grid[pid=GRIDmst_fg_assyno]")[0];
      GRID.reconfigure(STGRIDnew);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  GRIDmst_fg_assyno_itemdblclick: function (cmp, rec) {
    try {
      var me = this;
      var vdt = rec.data;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var load_edit = COMP.run.getmodulepopup("FRMmst_fg_assyno", "TDK.MASTERS.mst_fg_assyno.FRMmst_fg_assyno", mainpanel);
      if (load_edit) {
        var FRM = Ext.ComponentQuery.query("FRMmst_fg_assyno form")[0];
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
      var load_edit = COMP.run.getmodulepopup("FRMmst_fg_assyno", "TDK.MASTERS.mst_fg_assyno.FRMmst_fg_assyno", mainpanel);
      if (load_edit) {
        var FRM = Ext.ComponentQuery.query("FRMmst_fg_assyno form")[0];
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
      var hasil = COMP.run.getservice(vconfig.service_api + "mst_fg_assyno/mst_fg_assyno", params, "POST", me.var_global.jwt);
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

      COMP.run.getmodulepopup("FRMmst_fg_assyno", "TDK.MASTERS.mst_fg_assyno.FRMmst_fg_assyno", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btnew_input_click: function (cmp) {
    try {
      var FRM = Ext.ComponentQuery.query("FRMmst_fg_assyno form")[0];
      FRM.getForm().reset();
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

      var popup = Ext.define("TDK.EXIM.mst_fg_assyno.popup_search", {
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
            pid: "GRIDmst_fg_assyno_popup_search",
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
        case "module_carline":
          ncol.push({ header: "CARLINE", dataIndex: "CARLINE", sortable: true, flex: 1, filter: { xtype: "textfield" } }, { header: "CARLINE NAME", dataIndex: "CARLINE_NAME", sortable: true, flex: 1, filter: { xtype: "textfield" } });
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
  bthapus_draft_click: function (grid, rowIndex, colIndex) {
    try {
      var me = this;
      var GRID = Ext.ComponentQuery.query("GRIDmst_fg_assyno grid[pid=GRIDmst_fg_assyno]")[0];
      var mainpanel = Ext.ComponentQuery.query("FRMmst_fg_assyno")[0];
      var FRM = Ext.ComponentQuery.query("FRMmst_fg_assyno form")[0];
      var MAIN_dtval = FRM.getValues(false, false, false, true);
      if (MAIN_dtval.ID === "") {
        COMP.TipToast.toast("Error", "Data Yang ingin dihapus Tidak ada", { cls: "danger", delay: 2000 });
        return false;
      }
      Ext.MessageBox.confirm(
        "Konfirmasi",
        "Konfirmasi Hapus Data Assy",
        function (button) {
          if (button === "yes") {
            var params = Ext.encode({
              method: "delete",
              module: "assyno",
              data: Ext.encode(MAIN_dtval.ID),
            });
            var hasil = COMP.run.getservice(vconfig.service_api + "mst_fg_assyno/mst_fg_assyno", params, "POST", me.var_global.jwt);
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
      var GRID = Ext.ComponentQuery.query("GRIDmst_fg_assyno grid[pid=GRIDmst_fg_assyno]")[0];
      var mainpanel = Ext.ComponentQuery.query("FRMmst_fg_assyno")[0];
      var FRM = Ext.ComponentQuery.query("FRMmst_fg_assyno form")[0];
      var MAIN_dtval = FRM.getValues(false, false, false, true);
      if (MAIN_dtval.ASSY_NO === "") 
      {
        COMP.TipToast.toast("Error", "Input Assy No lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      else if (MAIN_dtval.ASSY_CODE === "") 
      {
        COMP.TipToast.toast("Error", "Input Assy Code lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      else if (MAIN_dtval.CARLINE === "") 
      {
        COMP.TipToast.toast("Error", "Input Carline lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      else if (MAIN_dtval.POLY_QTY < "1") 
      {
        COMP.TipToast.toast("Error", "Input Poly Qty lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      else if (MAIN_dtval.PALLET_QTY < "1") 
      {
        COMP.TipToast.toast("Error", "Input Pallet Qty lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      else if (MAIN_dtval.BOX_PER_PALLET < "1") 
      {
        COMP.TipToast.toast("Error", "Input Box Per Pallet lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      else if (MAIN_dtval.QTY_PER_LEVEL < "1") 
      {
        COMP.TipToast.toast("Error", "Input Qty Per Level lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      else if (MAIN_dtval.ID !== "")
      {
        Ext.MessageBox.confirm(
          "Konfirmasi",
          "Konfirmasi Simpan Data Update Assy",
          function (button) {
            if (button === "yes") {
              var params = Ext.encode({
                method: "update",
                module: "assy",
                data: Ext.encode(MAIN_dtval),
              });
              var hasil = COMP.run.getservice(vconfig.service_api + "mst_fg_assyno/mst_fg_assyno", params, "POST", me.var_global.jwt);
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
          "Konfirmasi Simpan Data Input Assy",
          function (button) {
            if (button === "yes") {
              var params = Ext.encode({
                method: "create",
                module: "assy",
                data: Ext.encode(MAIN_dtval),
              });
              var hasil = COMP.run.getservice(vconfig.service_api + "mst_fg_assyno/mst_fg_assyno", params, "POST", me.var_global.jwt);
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
          title: "Master Assy No",
          fileName: "Master Assy No." + (btn.cfg.ext || btn.cfg.type),
          includeGroups: true,
          includeSummary: true,
        },
        btn.cfg
      );
      var GRID = Ext.ComponentQuery.query("mst_fg_assyno GRIDmst_fg_assyno grid[pid=GRIDmst_fg_assyno]")[0];
      GRID.saveDocumentAs(cfg).then(function () {
        Ext.MessageBox.hide();
      });
    } catch (ex) {
      TDK.plugin.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});
