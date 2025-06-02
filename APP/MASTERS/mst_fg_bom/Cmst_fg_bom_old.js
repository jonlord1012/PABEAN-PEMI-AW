Ext.define("TDK.MASTERS.mst_fg_bom.Cmst_fg_bom", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cmst_fg_bom",
  init: function (view) {
    this.control({
      "mst_fg_bom button[pid=btnew]": { click: this.btnew_click },
      "FRMmst_fg_bom button[pid=btnew_input]": { click: this.btnew_input_click },
      "FRMmst_fg_bom button[pid=btsimpan_draft]": { click: this.btsimpan_draft_click },
      "FRMmst_fg_bom button[pid=bthapus_draft]": { click: this.bthapus_draft_click },
      "FRMmst_fg_bom button[pid=btsearch]": { click: this.btsearch_click },
      "FRMmst_fg_bom button[pid=btselectitem]": { click: this.btselectitem_click },
      "FRMmst_fg_bom button[pid=btsearchitem]": { click: this.btsearchitem_click },
      "mst_fg_bom grid[pid=GRIDmst_fg_bom]": { itemdblclick: this.GRIDmst_fg_bom_itemdblclick },
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
  GRIDmst_fg_bom_load: function () {
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
          url: vconfig.service_api + "mst_fg_bom/mst_fg_boms",
          reader: {
            type: "json",
            rootProperty: "Rows",
            totalProperty: "TotalRows",
            successProperty: "success",
          },
        },
      });

      var GRID = Ext.ComponentQuery.query("mst_fg_bom GRIDmst_fg_bom grid[pid=GRIDmst_fg_bom]")[0];
      GRID.reconfigure(STGRIDnew);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  GRIDmst_fg_bom_itemdblclick: function (cmp, rec) {
    try {
      var me = this;
      var vdt = rec.data;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var load_edit = COMP.run.getmodulepopup("FRMmst_fg_bom", "TDK.MASTERS.mst_fg_bom.FRMmst_fg_bom", mainpanel);
      if (load_edit) {
        var FRM = Ext.ComponentQuery.query("FRMmst_fg_bom form")[0];
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
      var load_edit = COMP.run.getmodulepopup("FRMmst_fg_bom", "TDK.MASTERS.mst_fg_bom.FRMmst_fg_bom", mainpanel);
      if (load_edit) {
        var FRM = Ext.ComponentQuery.query("FRMmst_fg_bom form")[0];
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
      var hasil = COMP.run.getservice(vconfig.service_api + "mst_fg_bom/mst_fg_bom", params, "POST", me.var_global.jwt);
      hasil.then(function (content) {
        var val = Ext.decode(content, true);
        if (val.success == "true") {
          COMP.TipToast.toast("Info", val.message, { cls: "info", delay: 2000 });
          var vdtload = val.data;
          FRM.getForm().reset();
          FRM.getForm().setValues(vdtload);
          me.loadListMaterial(FRM, vdtload);
        }
      }, this);

    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  loadListMaterial:function(FRM, vdt){

    var me = this;

      // Ext.Ajax.request({
      //   url: vconfig.service_api + "mst_fg_bom/mst_fg_bom",
      //   disableCaching: false,
      //   headers: {
      //     Authorization: "Bearer " + me.var_global.jwt,
      //   },
      //   method: "POST",
      //   timeout: 120000,
      //   redirect: "follow",
      //   dataType: "json",
      //   jsonData: param,
      //   success: function (response) {
      //     var data = response.responseText;
      //     // GRID.reconfigure(data)
      //     console.log(GRID)
      //   },
      //   failure: function (response) {
      //     COMP.TipToast.toast("Error", response.statusText + " " + response.status, { cls: "danger", delay: 2000 });
      //   },
      // });

    try{

    var params = Ext.encode({
      method:'edit',
      data:vdt
    }),
    
    GRID = Ext.ComponentQuery.query('FRMmst_fg_bom grid[pid=GRIDFRMinv_material_in]')[0],
    
    GRIDdata = new Ext.data.Store({
        autoLoad: true,
        remoteSort: true,
        remoteFilter: true,
        pageSize: 10,
        proxy: {
          type: "ajax",
          disableCaching: false,
          noCache: false,
          headers: { Authorization: "Bearer " + me.var_global.jwt },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "mst_fg_bom/mst_fg_boms",
          jsonData:params,
          reader: {
            type: "json",
            rootProperty: "Rows",
            totalProperty: "TotalRows",
            successProperty: "success",
          },
        },
      });
      
      GRID.reconfigure(GRIDdata)

      console.log(GRIDdata)

      // hasil.then((content) => {
      //   let val = Ext.decode(content, true);
      //   console.log(content)
      //   console.log(val)
      // }, this);

    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }

    // console.log(FRM)
    // console.log(vdt.ASSY_CODE)
    // console.log(GRID)
  },
  btnew_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

      COMP.run.getmodulepopup("FRMmst_fg_bom", "TDK.MASTERS.mst_fg_bom.FRMmst_fg_bom", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btnew_input_click: function (cmp) {
    try {
      var FRM = Ext.ComponentQuery.query("FRMmst_fg_bom form")[0];
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

      var popup = Ext.define("TDK.EXIM.mst_fg_bom.popup_search", {
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
            pid: "GRIDmst_fg_bom_popup_search",
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
        case "mst_fg_assyno":
          ncol.push(
                    { header: "ASSY CODE", dataIndex: "ASSY_CODE", sortable: true, flex: 1, filter: { xtype: "textfield" } }, 
                    { header: "ASSY NO", dataIndex: "ASSY_NO", sortable: true, flex: 1, filter: { xtype: "textfield" } },
                    { header: "ASSY NAME", dataIndex: "ASSY_NAME", sortable: true, flex: 1, filter: { xtype: "textfield" } },
                    { header: "CARLINE", dataIndex: "CARLINE", sortable: true, flex: 1, filter: { xtype: "textfield" } },
                    { header: "FAMILY CODE", dataIndex: "FAMILY_CODE", sortable: true, flex: 1, filter: { xtype: "textfield" } },
                    { header: "DESTINATION CODE", dataIndex: "DESTINATION_CODE", sortable: true, flex: 1, filter: { xtype: "textfield" } },
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
  btngetlistpart:function() {
    let me=this
      // var GRIDFGBOM = Ext.Ajax.request({
      //     url: vconfig.service_api + "mst_fg_bom/mst_fg_bom",
      //     method: "POST",
      //     params: Ext.encode({
      //       method:'read_list',

      //     }),
      //     timeout: 120000,
      //     rawData: vdt,
      //     headers: { Authorization: "Bearer" + me.var_global.jwt }, //to use content type of FormData
      //     success: function (response) {
      //       var dtval = response.responseText;
      //       Ext.MessageBox.hide();
      //       deferred.resolve(dtval);
      //     },
      //     failure: function (response) {
      //       deferred.reject(response.status);
      //       Ext.MessageBox.hide();
      //       COMP.TipToast.toast("Error", response.statusText + " " + response.status, { cls: "danger", delay: 2000 });
      //     },
      // });
    COMP.TipToast.toast("Success", 'tambah part item list', { cls: "success", delay: 2000 });
  },
  btsearchitem_click: function (btn) {
    try {
      return this.popup_searchitem(btn);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  popup_searchitem(btn) {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

      var popup = Ext.define("TDK.EXIM.mst_fg_bom.popup_searchitem", {
        extend: "Ext.window.Window",
        alias: "widget.popup_searchitem",
        reference: "popup_searchitem",
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
            pid: "GRIDmst_fg_bom_popup_searchitem",
            emptyText: "No Matching Records",
            plugins: ["filterfield", { ptype: "cellediting", clicksToEdit: 1 }],
            flex: 1,
            height: 200,
            store: me.storenameitem(btn.module),
            columns: me.getcolumnitem(btn.module),
            selType: "checkboxmodel",
            simpleSelect:true,
            listeners: {
              itemdblclick: function (dv, record, item, index, e) {
                me.setfield_inputitem(btn.tofield, record);
              },
            },
            tbar: {
              xtype: "button", 
              text: "Select Part Item",
              pid: "btselectitem",
              icon: vconfig.getstyle + "icon/checked.png",
              tooltip: "select Part Item/Material",
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
      COMP.run.getmodulepopup("popup_searchitem", popup, this.getView());
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  storenameitem: function (modulename) {
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
  getcolumnitem: function (modulename) {
    try {
      var ncol = [];
      switch (modulename) {
        case "mst_item":
          ncol.push(
                    { header: "PART NO", dataIndex: "PART_NO", sortable: true, flex: 1, filter: { xtype: "textfield" } }, 
                    { header: "PART NAME", dataIndex: "PART_NAME", sortable: true, flex: 1, filter: { xtype: "textfield" } },
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
  setfield_inputitem: function (tofield, rec) {
    try {
      var popup = Ext.ComponentQuery.query("popup_searchitem")[0];
      Ext.iterate(tofield, function (key, value) {
        var nfield = Ext.ComponentQuery.query("field[name=" + key + "]")[0];
        nfield.setValue(rec.data[value]);
      });
      popup.close();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btselectitem_click: function (tofield, rec) {
    try {
      var popup = Ext.ComponentQuery.query("popup_searchitem")[0];
      var GRID = Ext.ComponentQuery.query("mst_fg_bom popup_searchitem grid")[0];
      var GRIDdata = Ext.ComponentQuery.query("mst_fg_bom FRMmst_fg_bom grid")[0];
      var GRIDselect = [];
      var me = this;
      var xcheck = "0";

      var selectitem = GRID.getSelectionModel().getSelection();
      Ext.each(selectitem, function (item) {
        GRIDselect.push(item.data.PART_NO);
      })

      var STdata = GRIDdata.getStore();
      STdata.add({
        PART_NO : item.data.PART_NO
      });

      popup_searchitem.close();

     

      
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  bthapus_draft_click: function (grid, rowIndex, colIndex) {
    try {
      var me = this;
      var GRID = Ext.ComponentQuery.query("GRIDmst_fg_bom grid[pid=GRIDmst_fg_bom]")[0];
      var mainpanel = Ext.ComponentQuery.query("FRMmst_fg_bom")[0];
      var FRM = Ext.ComponentQuery.query("FRMmst_fg_bom form")[0];
      var MAIN_dtval = FRM.getValues(false, false, false, true);
      if (MAIN_dtval.ID === "") {
        COMP.TipToast.toast("Error", "Data Yang ingin dihapus Tidak ada", { cls: "danger", delay: 2000 });
        return false;
      }
      Ext.MessageBox.confirm(
        "Konfirmasi",
        "Konfirmasi Hapus Data BOM",
        function (button) {
          if (button === "yes") {
            var params = Ext.encode({
              method: "delete",
              module: "bom",
              data: Ext.encode(MAIN_dtval.ID),
            });
            var hasil = COMP.run.getservice(vconfig.service_api + "mst_fg_bom/mst_fg_bom", params, "POST", me.var_global.jwt);
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
      var GRID = Ext.ComponentQuery.query("GRIDmst_fg_bom grid[pid=GRIDmst_fg_bom]")[0];
      var mainpanel = Ext.ComponentQuery.query("FRMmst_fg_bom")[0];
      var FRM = Ext.ComponentQuery.query("FRMmst_fg_bom form")[0];
      var MAIN_dtval = FRM.getValues(false, false, false, true);
      if (MAIN_dtval.PART_NO === "") 
      {
        COMP.TipToast.toast("Error", "Input Part No lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      if (MAIN_dtval.QTY < "1") 
      {
        COMP.TipToast.toast("Error", "Input Qty lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      else if (MAIN_dtval.ID !== "")
      {
        Ext.MessageBox.confirm(
          "Konfirmasi",
          "Konfirmasi Simpan Data Update BOM",
          function (button) {
            if (button === "yes") {
              var params = Ext.encode({
                method: "update",
                module: "bom",
                data: Ext.encode(MAIN_dtval),
              });
              var hasil = COMP.run.getservice(vconfig.service_api + "mst_fg_bom/mst_fg_bom", params, "POST", me.var_global.jwt);
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
          "Konfirmasi Simpan Data Input BOM",
          function (button) {
            if (button === "yes") {
              var params = Ext.encode({
                method: "create",
                module: "bom",
                data: Ext.encode(MAIN_dtval),
              });
              var hasil = COMP.run.getservice(vconfig.service_api + "mst_fg_bom/mst_fg_bom", params, "POST", me.var_global.jwt);
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
          title: "Master BOM FG",
          fileName: "Master BOM FG." + (btn.cfg.ext || btn.cfg.type),
          includeGroups: true,
          includeSummary: true,
        },
        btn.cfg
      );
      var GRID = Ext.ComponentQuery.query("mst_fg_bom GRIDmst_fg_bom grid[pid=GRIDmst_fg_bom]")[0];
      GRID.saveDocumentAs(cfg).then(function () {
        Ext.MessageBox.hide();
      });
    } catch (ex) {
      TDK.plugin.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});
