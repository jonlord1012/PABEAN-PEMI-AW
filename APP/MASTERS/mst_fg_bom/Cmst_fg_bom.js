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
      "FRMmst_fg_bom button[pid=btsearchitem]": { click: this.btsearchitem_click },
      "mst_fg_bom grid[pid=GRIDmst_fg_bom]": { itemdblclick: this.GRIDmst_fg_bom_itemdblclick },
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
  btgridbom_detail_refresh:function() {
    try{
      // var GRID = Ext.ComponentQuery.query('popup_search')[0];
      var GRID = Ext.ComponentQuery.query("FRMmst_fg_bom grid[pid=GRIDFRMmst_fg_bom_detail]")[0];
      GRID.getStore().load();
      console.log(GRID)
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
        /*console.log(vdt); */
      }
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  edit_header: function (FRM, vdt) {
    try {
      var FRM = Ext.ComponentQuery.query("FRMmst_fg_bom form")[0];
      var me = this;
      var params = Ext.encode({
        method: "edit",
        data: vdt,
      });

      // var GRID = Ext.ComponentQuery.query("FRMmst_fg_bom grid[pid=GRIDFRMmst_fg_bom_part]")[0];

      var hasil = COMP.run.getservice(vconfig.service_api + "mst_fg_bom/mst_fg_bom", params, "POST", me.var_global.jwt);
      
      Ext.MessageBox.hide()

      hasil.then(function (content) {
        
        var val = Ext.decode(content, true);
        
        var MAIN_dtval = FRM.getValues(false, false, false, true);
          
        //me.loadListMaterial2(val.ASSY_CODE);

        if (val.success == "true") {
          console.log(val.data); 
          COMP.TipToast.toast("Info", val.message, { cls: "info", delay: 2000 });
          var vdtload = val;
          FRM.getForm().reset();  
          
          FRM.getForm().setValues(val.data); 

          me.loadListMaterial(val.data);

          // var GRIDStore = Ext.create("Ext.data.Store", {
          //   data: val.Data,
          // });
          // GRID.reconfigure(GRIDStore);
        }
      }, this);
    
    
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  loadListMaterial:function(data_mst_assy) {

    try{

      var me=this;

      var GRIDFRMPART = Ext.ComponentQuery.query('FRMmst_fg_bom grid[pid=GRIDFRMmst_fg_bom_part]')[0];

      var params = Ext.encode({
        method:'read_fg_part',
        data:data_mst_assy
      })

      // var params = Ext.encode({
      //   method:'edit',
      //   data:Ext.encode(data_mst_assy)
      // });

      var hasil = COMP.run.getservice(vconfig.service_api + "mst_fg_bom/mst_fg_bom", params, "POST", me.var_global.jwt);

      hasil.then(function(content){
        
        let val = Ext.decode(content, true);
        
        if (val.Success == true) {
          
          var GRIDFRMDATA = Ext.create("Ext.data.Store", {
            data: val.Data
          })

        
          GRIDFRMPART.reconfigure(GRIDFRMDATA);
        }

      }, this)

      

    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
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
      var GRIDPART = Ext.ComponentQuery.query("FRMmst_fg_bom grid[pid=GRIDFRMmst_fg_bom_part]")[0];
      var FRM = Ext.ComponentQuery.query("FRMmst_fg_bom form")[0];
      FRM.getForm().reset();

      var GRIDFRMDATA = Ext.create("Ext.data.Store", {
        data:''
      })

        
      GRIDPART.reconfigure(GRIDFRMDATA);

      // GRIDPART.getStore().loadData([],false);

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
      var me=this;
      var popup = Ext.ComponentQuery.query("popup_search")[0];
      me.loadListMaterial(rec.data);
      Ext.iterate(tofield, function (key, value) {
        var nfield = Ext.ComponentQuery.query("field[name=" + key + "]")[0];
        nfield.setValue(rec.data[value]);
        // console.log(tofield)
      });
      popup.close();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
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
        width: mainpanel.getWidth() * 0.6,
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
              handler: "btselectitem_click",
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
  btndeletelistpart:function(grid, rowIndex){
    
    var me=this, arr=[];

    var GRIDFRMPART = Ext.ComponentQuery.query('FRMmst_fg_bom grid[pid=GRIDFRMmst_fg_bom_part]')[0];
    
    var FRM = Ext.ComponentQuery.query("FRMmst_fg_bom form")[0];    

    var data_mst_assy = FRM.getForm().getValues();

    Ext.MessageBox.confirm(
        "Konfirmasi",
        "Konfirmasi Hapus Data Part/Material!",
        function(btn) {

          if (btn === "yes") {

            var getRows = (grid.store.getAt(rowIndex).data)

            var params = Ext.encode({
              method:'delete_part',
              data: Ext.encode(getRows),
            });

            var hasil = COMP.run.getservice(vconfig.service_api + "mst_fg_bom/mst_fg_bom", params, "POST", me.var_global.jwt);
            
            Ext.MessageBox.hide()

            hasil.then(function(content) {

              let val = Ext.decode(content, true);
        
              if (val.success == "true") {

                console.log('remove item part:', val)

                // COMP.TipToast.toast("info", val.message, { cls: "info", delay: 2000 });
                
                // var removeRows = grid.store.removeAt(rowIndex)

                // var hasil = (grid.getStore().getData().items);

                // Ext.each(hasil, function(item) {
                //   arr.push(item.data)
                // }, this);

                me.loadListMaterial(data_mst_assy);
              
              }

            }, this)

          }

        }
      ,this)
  },
  btselectitem_click: function (tofield, rec) {
    
    try {

      var me=this,mst_part=[];
      var popup = Ext.ComponentQuery.query("popup_searchitem")[0];
      var GRIDpopupitem = Ext.ComponentQuery.query("popup_searchitem grid[pid=GRIDmst_fg_bom_popup_searchitem]")[0];
      
      var GRID = Ext.ComponentQuery.query("FRMmst_fg_bom grid[pid=GRIDFRMmst_fg_bom_part]")[0];
      
      var FRM = Ext.ComponentQuery.query("FRMmst_fg_bom form")[0];

      var data_mst_assy = FRM.getForm().getValues();

      var GRIDpopupitem_selected = GRIDpopupitem.getSelectionModel().getSelection();

      if (GRIDpopupitem_selected.length <= 0) {
        COMP.TipToast.toast("Error", "Part belum dipilih", { cls: "danger", delay: 2000 });
        return false;
      } else {

        // var part = (GRID.getStore().getData().items);

        // Ext.each(part, function(item) {
        //   mst_part.push(item.data)
        // }, this);
        
        Ext.each(GRIDpopupitem_selected, function (item) {

          mst_part.push(item.data);

          // STgrid.add({
          //   PART_NO: dtselect.PART_NO,
          //   PART_NAME: dtselect.PART_NAME,
          //   PART_UOM: "",
          //   PART_QTY: 1,
          // });

        });

        var params = Ext.encode({
          method:'create',
          data: Ext.encode(mst_part),
          data2:Ext.encode(data_mst_assy)
        });

        var hasil = COMP.run.getservice(vconfig.service_api + "mst_fg_bom/mst_fg_bom", params, "POST", me.var_global.jwt);
        
        Ext.MessageBox.hide()

        hasil.then(function(content) {
          
          let val = Ext.decode(content, true)


          if (val.success == "true") {

            // COMP.TipToast.toast("Info", val.message, { cls: "info", delay: 2000 });

            console.log('select add item part:', val)
            // GRID.getStore().load();
            
            me.loadListMaterial(data_mst_assy)

            // var GRIDDATAPART = Ext.create("Ext.data.Store", {
            //   data: val.data,
            // })
            
            popup.close();
          
          }

        }, this)

      }

      

      // STgrid.commitChanges();

      /*var GRIDitem = Ext.ComponentQuery.query("mst_fg_bom popup_searchitem GRIDmst_fg_bom_popup_searchitem grid")[0];
      var GRIDdata = Ext.ComponentQuery.query("mst_fg_bom FRMmst_fg_bom grid")[0];
      var GRIDselect = [];
      var me = this;
      var xcheck = "0";

      var selectitem = GRIDpopupitem.getSelectionModel().getSelection();
      Ext.each(selectitem, function (item) {
        GRIDpopupitem.push(item.data.PART_NO);
      })

      var STdata = GRIDdata.getStore();
      STdata.add({
        PART_NO : item.data.PART_NO
      });*/



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
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btsimpan_draft_click: function () {
    try {
      
      var me = this, qty, input_grid_modified=[];
      var GRID = Ext.ComponentQuery.query("GRIDmst_fg_bom grid[pid=GRIDmst_fg_bom]")[0];
      var mainpanel = Ext.ComponentQuery.query("FRMmst_fg_bom")[0];
      var FRM = Ext.ComponentQuery.query("FRMmst_fg_bom form")[0];

      var GRID = Ext.ComponentQuery.query("FRMmst_fg_bom grid[pid=GRIDFRMmst_fg_bom_part]")[0];

      var MAIN_dtval = FRM.getValues(false, false, false, true);

      var GRIDPARTMODIFIED = GRID.getStore().getModifiedRecords();
      var GRIDPART = GRID.getStore().getRange();

      Ext.each(GRIDPARTMODIFIED, function(item) {
        input_grid_modified.push(item.data)
      })

      Ext.each(GRIDPART.items, function(item) {
        console.log(item)
      })

      // ID mast_bom_detail = null
      console.log(MAIN_dtval)

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
                data_input: Ext.encode(input_grid_modified),
              });
              var hasil = COMP.run.getservice(vconfig.service_api + "mst_fg_bom/mst_fg_bom", params, "POST", me.var_global.jwt);
              hasil.then(function (content) {
                var val = Ext.decode(content, true);
                if (val.success == "true") {
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
