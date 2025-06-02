Ext.define("TDK.SPAREPART.msp_item_cv.Cmsp_item_cv", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cmsp_item_cv",
  init: function (view) {
    this.control({
      "msp_item_cv button[pid=btnew]": { click: this.btnew_click },
      "FRMmsp_item_cv button[pid=btnew_input]": { click: this.btnew_input_click },
      "FRMmsp_item_cv button[pid=btsimpan_draft]": { click: this.btsimpan_draft_click },
      "FRMmsp_item_cv button[pid=bthapus_draft]": { click: this.bthapus_draft_click },
      "FRMmsp_item_cv button[pid=btsearch]": { click: this.btsearch_click },
      "msp_item_cv grid[pid=GRIDmsp_item_cv]": { itemdblclick: this.GRIDmsp_item_cv_itemdblclick },
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
  GRIDmsp_item_cv_load: function () {
    try {
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
          url: vconfig.service_api + "msp_item_cv/msp_item_cvs",
          reader: {
            type: "json",
            rootProperty: "Rows",
            totalProperty: "TotalRows",
            successProperty: "success",
          },
        },
      });

      var GRID = Ext.ComponentQuery.query("msp_item_cv GRIDmsp_item_cv grid[pid=GRIDmsp_item_cv]")[0];
      GRID.reconfigure(STGRIDnew);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  GRIDmsp_item_cv_itemdblclick: function (cmp, rec) {
    try {
      var me = this;
      var vdt = rec.data;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var load_edit = COMP.run.getmodulepopup("FRMmsp_item_cv", "TDK.SPAREPART.msp_item_cv.FRMmsp_item_cv", mainpanel);
      if (load_edit) {
        var FRM = Ext.ComponentQuery.query("FRMmsp_item_cv form")[0];
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
      var load_edit = COMP.run.getmodulepopup("FRMmsp_item_cv", "TDK.SPAREPART.msp_item_cv.FRMmsp_item_cv", mainpanel);
      if (load_edit) {
        var FRM = Ext.ComponentQuery.query("FRMmsp_item_cv form")[0];
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
      var hasil = COMP.run.getservice(vconfig.service_api + "msp_item_cv/msp_item_cv", params, "POST", me.var_global.jwt);
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

      COMP.run.getmodulepopup("FRMmsp_item_cv", "TDK.SPAREPART.msp_item_cv.FRMmsp_item_cv", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btnew_input_click: function (cmp) {
    try {
      var FRM = Ext.ComponentQuery.query("FRMmsp_item_cv form")[0];
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

      var popup = Ext.define("TDK.EXIM.msp_item_cv.popup_search", {
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
            pid: "GRIDmsp_item_cv_popup_search",
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
      var GRID = Ext.ComponentQuery.query("GRIDmsp_item_cv grid[pid=GRIDmsp_item_cv]")[0];
      var mainpanel = Ext.ComponentQuery.query("FRMmsp_item_cv")[0];
      var FRM = Ext.ComponentQuery.query("FRMmsp_item_cv form")[0];
      var MAIN_dtval = FRM.getValues(false, false, false, true);
      if (MAIN_dtval.ID === "") {
        COMP.TipToast.toast("Error", "Data Yang ingin dihapus Tidak ada", { cls: "danger", delay: 2000 });
        return false;
      }
      Ext.MessageBox.confirm(
        "Konfirmasi",
        "Konfirmasi Hapus Data Cost Center",
        function (button) {
          if (button === "yes") {
            var params = Ext.encode({
              method: "delete",
              module: "cc",
              data: Ext.encode(MAIN_dtval.ID),
            });
            var hasil = COMP.run.getservice(vconfig.service_api + "msp_item_cv/msp_item_cv", params, "POST", me.var_global.jwt);
            hasil.then(function (content) {
              var val = Ext.decode(content, true);
              if (val.success === "true") {
                COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 3000 });
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
      var GRID = Ext.ComponentQuery.query("GRIDmsp_item_cv grid[pid=GRIDmsp_item_cv]")[0];
      var mainpanel = Ext.ComponentQuery.query("FRMmsp_item_cv")[0];
      var FRM = Ext.ComponentQuery.query("FRMmsp_item_cv form")[0];
      var MAIN_dtval = FRM.getValues(false, false, false, true);
      if (MAIN_dtval.COSTCENTER_NAME === "") 
      {
        COMP.TipToast.toast("Error", "Input Nama Cost Center lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      else if (MAIN_dtval.ID !== "")
      {
        Ext.MessageBox.confirm(
          "Konfirmasi",
          "Konfirmasi Simpan Data Update Cost Center",
          function (button) {
            if (button === "yes") {
              var params = Ext.encode({
                method: "update",
                module: "cc",
                data: Ext.encode(MAIN_dtval),
              });
              var hasil = COMP.run.getservice(vconfig.service_api + "msp_item_cv/msp_item_cv", params, "POST", me.var_global.jwt);
              hasil.then(function (content) {
                var val = Ext.decode(content, true);
                if (val.success === "true") {
                  COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 3000 });
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
          "Konfirmasi Simpan Data Input Cost Center",
          function (button) {
            if (button === "yes") {
              var params = Ext.encode({
                method: "create",
                module: "cc",
                data: Ext.encode(MAIN_dtval),
              });
              var hasil = COMP.run.getservice(vconfig.service_api + "msp_item_cv/msp_item_cv", params, "POST", me.var_global.jwt);
              hasil.then(function (content) {
                var val = Ext.decode(content, true);
                if (val.success === "true") {
                  COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 3000 });
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
});
