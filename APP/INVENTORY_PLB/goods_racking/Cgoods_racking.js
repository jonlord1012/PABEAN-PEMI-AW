Ext.define("NJC.INVENTORY_PLB.goods_racking.Cgoods_racking", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cgoods_racking",
  init: function (view) {
    this.control({
      "goods_racking button[pid=btracking_manual]": { click: this.btnew_click },
      "goods_racking button[pid=btracking_integrasi]": { click: this.btracking_integrasi_click },
      "goods_racking button[pid=btrefresh_main]": { click: this.btrefresh_main_click },

      "FRM_goods_racking button[pid=btsearch]": { click: this.btsearch_click },
      "FRM_goods_racking button[pid=btsearch_rack]": { click: this.btsearch_rack_click },
      "FRM_goods_racking combobox[name=CBO_SOURCE]": { change: this.CBO_SOURCE_change },
      "FRM_goods_racking_putaway button[pid=racking_synchronize]": { click: this.racking_synchronize_click },
      "FRM_goods_racking_putaway datefield[name=TANGGAL_RACKING]": { change: this.biccbtrefresh_click },
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
  formatqty: function (value) {
    var text = Ext.util.Format.number(value, "0,000.00/i");
    return text;
  },
  formatAmount: function (value) {
    var text = Ext.util.Format.number(value, "0,000.00/i");
    return text;
  },
  formatDate: function (value) {
    var text = Ext.util.Format.date(value, "Y-m-d");
    return text;
  },

  formatDateTime: function (value) {
    var text = Ext.util.Format.date(value, "Y-m-d h:m:s");
    return text;
  },
  renderpage: function () {
    try {
      console.log("renderer controller");
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  GRIDinv_material_in_aw_load: function (grid) {
    try {
      var me = this;
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btrefresh_main_click: function () {
    try {
      var me = this;
      var GRID = Ext.ComponentQuery.query("goods_racking GRIDgoods_racking grid[pid=GRIDgoods_racking]")[0];
      GRID.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btnew_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

      COMP.run.getmodulepopup("FRM_goods_racking", "NJC.INVENTORY_PLB.goods_racking.FRM_goods_racking", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btracking_integrasi_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("FRM_goods_racking_putaway", "NJC.INVENTORY_PLB.goods_racking.FRM_goods_racking_putaway", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btsearch_rack_click: function (btn) {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var FRM_MAIN = Ext.ComponentQuery.query("FRM_goods_racking form")[0];
      var MAIN_dtval = FRM_MAIN.getValues(false, false, false, true);
      if (MAIN_dtval.CBO_SOURCE === "" || MAIN_dtval.CBO_SOURCE === null) {
        COMP.TipToast.toast("Error", "Pilih Sumber Data lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      var popup = Ext.define("NJC.INVENTORY_PLB.goods_racking.popup_list_rack", {
        extend: "Ext.window.Window",
        alias: "widget.popup_list_rack",
        reference: "popup_list_rack",
        title: "Search Sumber Data",
        modal: true,
        closeAction: "destroy",
        centered: true,
        autoScroll: false,
        width: mainpanel.getWidth() * 0.85,
        height: mainpanel.getHeight() * 0.7,
        layout: { type: "vbox", pack: "start", align: "stretch" },
        bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
        items: [
          {
            xtype: "grid",
            pid: "GRIDpopup_search",
            emptyText: "No Matching Records",
            plugins: ["filterfield",],
            flex: 1,
            height: 200,
            store: {
              autoLoad: true,
              autoSync: false,
              remoteSort: true,
              remoteFilter: true,
              pageSize: 25,
              proxy: {
                type: "ajax",
                disableCaching: false,
                noCache: false,
                headers: { Authorization: "Bearer " + me.var_global.jwt },
                actionMethods: { read: "POST" },
                url: vconfig.service_api + "goods_racking/goods_rackings",
                reader: {
                  type: "json",
                  rootProperty: "Rows",
                  totalProperty: "TotalRows",
                  successProperty: "success",
                },
              },
              listeners: {
                beforeload: function (store, operation, eOpts) {
                  operation.setParams({
                    method: "read_list_rack",
                  });
                },
              },
            },
            viewConfig: {
              enableTextSelection: true,
            },
            columns: [
              { xtype: "rownumberer", width: 50 },
              { header: "RACK NO", dataIndex: "RACK_ID", sortable: true, width: 65, filter: { xtype: "textfield" } },
              { header: "RACK NAME", dataIndex: "RACK_NAME", sortable: true, width: 300, filter: { xtype: "textfield" } },
            ],
            listeners: {
              itemdblclick: function (grid, rec) {
                var FRM = Ext.ComponentQuery.query("FRM_goods_racking form")[0];
                var popup = Ext.ComponentQuery.query("popup_list_rack")[0];
                FRM.getForm().setValues({
                  RACK_ID: rec.data.RACK_ID,
                  RACK_NAME: rec.data.RACK_NAME,
                });
                //console.log(rec.data.RACK_ID + rec.data.RACK_NAME);
                popup.close();
                return;
              }
            },
            bbar: {
              xtype: "pagingtoolbar",
              displayInfo: true,
              displayMsg: "Total Data {2}",
              emptyMsg: "No topics to display",
            },
          },
        ],
      });
      COMP.run.getmodulepopup("popup_list_source", popup, this.getView());
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },

  btsearch_click: function (btn) {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var FRM_MAIN = Ext.ComponentQuery.query("FRM_goods_racking form")[0];
      var MAIN_dtval = FRM_MAIN.getValues(false, false, false, true);
      if (MAIN_dtval.CBO_SOURCE === "" || MAIN_dtval.CBO_SOURCE === null) {
        COMP.TipToast.toast("Error", "Pilih Sumber Data lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      var popup = Ext.define("NJC.INVENTORY_PLB.goods_racking.popup_list_source", {
        extend: "Ext.window.Window",
        alias: "widget.popup_list_source",
        reference: "popup_list_source",
        title: "Search Sumber Data",
        modal: true,
        closeAction: "destroy",
        centered: true,
        autoScroll: false,
        width: mainpanel.getWidth() * 0.85,
        height: mainpanel.getHeight() * 0.7,
        layout: { type: "vbox", pack: "start", align: "stretch" },
        bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
        items: [
          {
            xtype: "grid",
            pid: "GRIDpopup_search",
            emptyText: "No Matching Records",
            plugins: ["filterfield", { ptype: "cellediting", clicksToEdit: 1 }],
            flex: 1,
            height: 200,
            store: {
              autoLoad: true,
              autoSync: false,
              remoteSort: true,
              remoteFilter: true,
              pageSize: 15,
              proxy: {
                type: "ajax",
                disableCaching: false,
                noCache: false,
                headers: { Authorization: "Bearer " + me.var_global.jwt },
                actionMethods: { read: "POST" },
                url: vconfig.service_api + "goods_racking/goods_rackings",
                reader: {
                  type: "json",
                  rootProperty: "Rows",
                  totalProperty: "TotalRows",
                  successProperty: "success",
                },
              },
              listeners: {
                beforeload: function (store, operation, eOpts) {
                  operation.setParams({
                    method: "read_list_source_" + MAIN_dtval.CBO_SOURCE,
                  });
                },
              },
            },
            viewConfig: {
              enableTextSelection: true,
            },
            columns: [
              { xtype: "rownumberer", width: 50 },
              { header: "RECEIPT DATE", dataIndex: "RECEIPT_DATE", sortable: true, width: 150, filter: { xtype: "textfield" } },
              { header: "INVOICE", dataIndex: "INVOICE_NO", sortable: true, width: 150, filter: { xtype: "textfield" } },
              { header: "NOMOR AJU", dataIndex: "NOMOR_AJU", sortable: true, width: 200, filter: { xtype: "textfield" } },
              { header: "TANGGAL AJU", dataIndex: "TANGGAL_AJU", sortable: true, width: 100, filter: { xtype: "textfield" } },
              { header: "NOMOR DAFTAR", dataIndex: "NOMOR_DAFTAR", sortable: true, width: 100, filter: { xtype: "textfield" } },
              { header: "TANGGAL DAFTAR", dataIndex: "TANGGAL_DAFTAR", sortable: true, width: 100, filter: { xtype: "textfield" } },
            ],
            listeners: {
              itemdblclick: "GRIDpopup_list_source_itemdblclick",
            },
            bbar: {
              xtype: "pagingtoolbar",
              displayInfo: true,
              displayMsg: "Total Data {2}",
              emptyMsg: "No topics to display",
            },
          },
        ],
      });
      COMP.run.getmodulepopup("popup_list_source", popup, this.getView());
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  GRIDpopup_list_source_itemdblclick: function (cmp, rec) {
    try {
      var me = this;
      var popup = Ext.ComponentQuery.query("popup_list_source")[0];
      var FRM_MAIN = Ext.ComponentQuery.query("FRM_goods_racking form")[0];
      var GRID = Ext.ComponentQuery.query("FRM_goods_racking grid[pid=GRIDFRM_goods_racking]")[0];
      var MAIN_dtval = FRM_MAIN.getValues(false, false, false, true);
      var params = Ext.encode({
        method: "racking_select_invoice",
        module: MAIN_dtval.CBO_SOURCE,
        INVOICE_NO: rec.data.INVOICE_NO,
      });
      var hasil = COMP.run.getservice(vconfig.service_api + "goods_racking/goods_racking", params, "POST", me.var_global.jwt);
      hasil.then(function (content) {
        var val = Ext.decode(content, true);
        if (val.success === "true") {
          COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 3000 });
          var vjsondata = Ext.decode(val.vjson_data);
          FRM_MAIN.getForm().setValues({
            RECEIPT_DATE: rec.data.RECEIPT_DATE,
            INVOICE_NO: rec.data.INVOICE_NO,
          });
          var vnstore = new Ext.data.Store({
            field: [
              { name: "INVOICE_NO", type: "string" },
              { name: "ARTICLE_CODE", type: "string" },
              { name: "LOT_NO", type: "string" },
              { name: "PUTAWAY_QTY", type: "float" },
              { name: "CURRENT_RACK", type: "string" },
            ],
            data: vjsondata,
          });
          GRID.reconfigure(vnstore);
          popup.close();
        } else {
          COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 3000 });
        }
      }, this);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRM_goods_racking_btsave_click_old: function (btn) {
    try {
      var me = this;
      var popup = Ext.ComponentQuery.query("FRM_goods_racking")[0];
      var FRM_MAIN = Ext.ComponentQuery.query("FRM_goods_racking form")[0];
      var MAIN_dtval = FRM_MAIN.getValues(false, false, false, true);
      var GRID = Ext.ComponentQuery.query("FRM_goods_racking grid[pid=GRIDFRM_goods_racking]")[0];

      if (MAIN_dtval.RACK_ID === null || MAIN_dtval.RACK_ID === "") {
        COMP.TipToast.toast("Error", "silahkan pilih Rack yang dituju terlebih dahulu", { cls: "danger", delay: 2000 });
        return false;
      }

      if (MAIN_dtval.RECEIPT_DATE === null || MAIN_dtval.RECEIPT_DATE === "") {
        COMP.TipToast.toast("Error", "Silahkan pilih Tanggal Receiving terlebih dahulu", { cls: "danger", delay: 2000 });
        return false;
      }

      if (MAIN_dtval.INVOICE_NO < MAIN_dtval.INVOICE_NO) {
        COMP.TipToast.toast("Error", "Silahkan pilih Nomor Invoice terlebih dahulu", { cls: "danger", delay: 2000 });
        return false;
      }
      MAIN_dtval.RECEIPT_DATE = moment(MAIN_dtval.RECEIPT_DATE).format("YYYY-MM-DD");
      Ext.MessageBox.confirm(
        "Konfirmasi",
        "Konfirmasi Racking Movement",
        function (button) {
          if (button === "yes") {
            var params = Ext.encode({
              method: "create_racking_manual",
              module: 'MANUAL',
              //module: MAIN_dtval.CBO_SOURCE,
              INVOICE_NO: MAIN_dtval.INVOICE_NO,
              /*header: Ext.encode(MAIN_dtval),
              detail: Ext.encode(Vgridinput),*/
              RACK_ID: MAIN_dtval.RACK_ID,
            });
            var hasil = COMP.run.getservice(vconfig.service_api + "goods_racking/goods_racking", params, "POST", me.var_global.jwt);
            hasil.then(function (content) {
              var val = Ext.decode(content, true);
              if (val.success === "true") {
                popup.close();
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
  CBO_SOURCE_change: function (cmp, rec) {
    try {
      var GRID = Ext.ComponentQuery.query("FRM_goods_racking grid[pid=GRIDFRM_goods_racking]")[0];
      GRID.getStore().removeAll();
      GRID.getStore().commitChanges();
      var FRM_MAIN = Ext.ComponentQuery.query("FRM_goods_racking form")[0];
      FRM_MAIN.getForm().setValues({
        NOMOR_AJU: "",
        NOMOR_DAFTAR: "",
        TANGGAL_AJU: "",
        TANGGAL_DAFTAR: "",
        SUPPLIER: "",
        KODE_INTERNAL: "",
      });
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btdetail_aw_rows_click: function (xgrid, rowIndex) {
    try {

      xgrid.getSelectionModel().select(rowIndex);
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("racking_detail_goods_racking", "NJC.INVENTORY_PLB.goods_racking.receiving_detail_goods_in", mainpanel);

    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });

    }
  },

  receiving_detail_racking_link_click: function (cmp, dt) {
    try {
      var vdt = dt.data;
      if (vdt.allowclick !== true) return;
      var vmodulecontrol = vdt.controlname === "" ? vdt.text : vdt.controlname;
      var vmodulename = vdt.modulename === "" ? vmodulecontrol : vdt.modulename;
      var id = vmodulecontrol;
      var cls = "NJC.INVENTORY_PLB.goods_racking." + vmodulename + "." + vmodulecontrol;
      var tabs = Ext.ComponentQuery.query("receiving_detail_goods_in tabpanel[pid=receiving_detail_goods_in_tabpanel]")[0];
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
  receiving_detail_aw_load: function (cmp) {
    try {
      var GRID = Ext.ComponentQuery.query("inv_material_in_aw GRIDinv_material_in_aw grid[pid=GRIDinv_material_in_aw]")[0];
      var vdt = GRID.getSelectionModel().getSelection()[0].data;
      cmp.setTitle("Tracing Receiving Item, No: " + vdt.RECEIPT_NO);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      console.log(ex.message);
    }
  },
  receiving_detail_aw_link_click: function (cmp, dt) {
    try {
      var vdt = dt.data;
      if (vdt.allowclick !== true) return;
      var vmodulecontrol = vdt.controlname === "" ? vdt.text : vdt.controlname;
      var vmodulename = vdt.modulename === "" ? vmodulecontrol : vdt.modulename;
      var id = vmodulecontrol;
      if (vdt.modulename === "") {
        var cls = "NJC.INVENTORY_PLB.goods_racking.receiving_detail." + vmodulecontrol;
      } else {
        var cls = "NJC.INVENTORY_PLB.goods_racking.receiving_detail." + vmodulename + "." + vmodulecontrol;
      }
      /*var cls = "TDK.INVENTORY_AW.inv_material_in_aw.receiving_detail." + vmodulename + "." + vmodulecontrol ;*/
      var tabs = Ext.ComponentQuery.query("receiving_detail_aw tabpanel[pid=receiving_detail_aw_tabpanel]")[0];
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
          console.log(vmodulename);
        }
      }
      tabs.setActiveTab(tab);
    } catch (err) {
      COMP.TipToast.toast("Error", err.message, { cls: "danger", delay: 2000 });
      console.log(vmodulename);
    }
  },
  edit_header: function (frm, xdtedit) {
    try {
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  biccbtrefresh_click: function () {
    try {
      var GRID = Ext.ComponentQuery.query("FRM_goods_racking_putaway grid[pid=GRID_goods_racking_putaway]")[0];
      GRID.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  racking_synchronize_click: function () {
    try {
      var me = this;
      var popup = Ext.ComponentQuery.query("FRM_goods_racking_putaway")[0];
      var vrcvdate = Ext.ComponentQuery.query("FRM_goods_racking_putaway datefield[name=TANGGAL_RACKING] ")[0];
      var GRID = Ext.ComponentQuery.query("FRM_goods_racking_putaway grid[pid=GRID_goods_racking_putaway]")[0];
      if (GRID.getStore().getDataSource().length === 0) {
        COMP.TipToast.toast("Error", "Data Receipt tidak ada", { cls: "danger", delay: 2000 });
        return false;
      }
      var Vgridinput = [];
      /*GRID.getStore()
        .getDataSource()
        .each(function (record) {
          if (record.data.PART_MPQ <= record.data.GR_QTY_CONVERTED) {
            //if (record.data.INVOICE_NO = 'AXB130214T') {
            var vrec = record.data;
            var Vqty = record.data.GR_QTY_CONVERTED === null ? parseFloat(record.data.PART_MPQ) : parseFloat(record.data.PABEAN_QTY) - parseFloat(record.data.PART_MPQ);
            Vgridinput.push({
              RECEIPT_NO: vrec.RECEIPT_NO,
              INVOICE_NO: vrec.INVOICE_NO,
              ARTICLE_CODE: vrec.ARTICLE_CODE,
              LOT_NO: vrec.LOT_NO,
              INVOICE_QTY: vrec.PABEAN_QTY,
              GR_QTY: vrec.GR_QTY_CONVERTED,
              RECEIPT_NO: vrec.RECEIPT_NO,
              MENU_INPUT: 'BINLOC_SYNC',
              JENIS_INPUT: 'PABEAN_APPS',
              BC_TYPE: vrec.BC_TYPE,
              NOMOR_AJU: vrec.NOMOR_AJU,
              TANGGAL_AJU: vrec.TANGGAL_AJU,
              NOMOR_DAFTAR: vrec.NOMOR_DAFTAR,
              TANGGAL_DAFTAR: vrec.TANGGAL_DAFTAR,
              SKU_NO: vrec.SKU_NO,
              PABEAN_CODE: vrec.YAZAKI_CODE,
              RECEIPT_DATE: vrec.RECEIPT_DATE,
              SERI_BARANG: vrec.SERI_BARANG,
              SOURCE_PART_NO: vrec.SOURCE_PART_NO,
              SOURCE_LOT_NO: vrec.SOURCE_LOT_NO,
              PART_MPQ: vrec.PART_MPQ,
              BINLOC_DETAILID: vrec.BINLOC_DETAILID,
              ID_INVOICE_LOT_ORI: vrec.ID_INVOICE_LOT_ORI,
              BINLOC_STOCKID: vrec.BINLOC_STOCK_ID,
            });
          }
        });*/
      //console.log(Vgridinput);
      //console.log(GRID.getStore().getDataSource());
      Ext.MessageBox.confirm(
        "Konfirmasi Synchronize Data Receiving Tanggal: " + moment(vrcvdate.getValue()).format("YYYY-MM-DD"),
        //
        "<b>Proses Sinkronisasi: </b>" +
        //
        "<ol>" +
        "<li>Tanggal yang diproses: " +
        moment(vrcvdate.getValue()).format("YYYY-MM-DD") +
        "</li>" +
        "<li>Hanya Invoice  yang sudah mendapatkan Nomor Aju + Nomor Daftar</li>" +
        "<li>Hanya Part dan Qty yang sesuai dengan Dokumen BC </li>" +
        "</ol>",

        function (button) {
          if (button === "yes") {
            /*var params = Ext.encode({
              method: "read_syncronize_binloc",
              PUTAWAY_DATE: moment(vrcvdate.getValue()).format("YYYY-MM-DD"),
              module: "RCPT_SYNC",
              vdata: Ext.encode(Vgridinput),
            });
            var hasil = COMP.run.getservice(vconfig.service_api + "goods_racking/goods_racking", params, "POST", me.var_global.jwt);
            hasil.then(function (content) {
              var val = Ext.decode(content, true);
              if (val.success === "true") {
                console.log(val.message);*/
            popup.close();
            COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 3000 });
            /*} else {
              popup.close();
              COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 3000 });
            }
          }, this);*/
          }
        },
        this
      );
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btsearch_lot_click: function (btn) {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var GRIDFRM_good_picking_list = Ext.ComponentQuery.query("FRM_goods_racking grid[pid=GRIDFRM_good_picking_list]")[0];

      var GRIDPicking = Ext.create("NJC.INVENTORY_PLB.goods_racking.GRIDPicking", {
        store: {
          autoLoad: true,
          autoSync: false,
          remoteSort: true,
          remoteFilter: true,
          pageSize: 200,

          fields: [
            { name: "LOT_NO", type: "string" },
            { name: "QTY_PICKING", type: "string" },
            { name: "CURRENT_RACK", type: "string" },
            { name: "CUSTOMER_INVOICE", type: "string" },
          ],
          proxy: {
            type: "ajax",
            disableCaching: false,
            noCache: false,
            headers: { Authorization: "Bearer " + me.var_global.jwt },
            actionMethods: { read: "POST" },
            url: vconfig.service_api + "goods_racking/goods_rackings",
            reader: {
              type: "json",
              rootProperty: "Rows",
              totalProperty: "TotalRows",
              successProperty: "success",
            },
            extraParams: {
              method: "read_list_source_lotno",
              //CODE_CUSTOMER: custNo,
            },
          },
          listeners: {
            //  itemdblclick: "GRIDpopup_list_source_itemdblclick",
          },
          /*listeners: {
              beforeload: function (store, operation, eOpts) {
                  operation.setParams({
                  });
              },
          },*/
        },
      });

      var popup = Ext.define("NJC.INVENTORY_PLB.goods_racking.popup_list_source", {
        extend: "Ext.window.Window",
        alias: "widget.popup_list_source",
        reference: "popup_list_source",
        title: "Search Picking Data",
        modal: true,
        closeAction: "destroy",
        centered: true,
        autoScroll: false,
        width: mainpanel.getWidth() * 0.85,
        height: mainpanel.getHeight() * 0.7,
        layout: { type: "vbox", pack: "start", align: "stretch" },
        bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
        items: [{ xtype: GRIDPicking },],
        dockedItems: [
          {
            xtype: "toolbar",
            dock: "top",
            items: [
              //
              { xtype: "tbspacer", width: 5 },
              {
                xtype: "button",
                pid: "btselect_picking",
                text: "Pilih Picking Doc",
                icon: vconfig.getstyle + "icon/check.png",
                tooltip: "Pilih Picking Doc",
                cls: "fontblack-button",
                //handler: "GRIDpopup_list_source_click",

                handler: function (cmp) {
                  try {
                    //var myGrid = Ext.ComponentQuery.query(GRIDPicking)[0];
                    //xgrid.getSelectionModel().select(rowIndex);
                    var popup = Ext.ComponentQuery.query("popup_list_source")[0];
                    //var GRIDFRM_good_picking_list = Ext.ComponentQuery.query("FRMgoods_stuffing_details grid=[GRIDFRM_good_picking_list]")[0];

                    var sm = GRIDPicking.getSelectionModel();
                    var rs = sm.getSelection();

                    if (rs.length < 1) {
                      COMP.TipToast.toast("Error", "Pilih Picking Doc lebih dulu", { cls: "danger", delay: 2000 });
                      return false;
                    }
                    Ext.each(rs, function (item) {
                      var dtselect = item.data;

                      var check_item = GRIDFRM_good_picking_list.getStore().findRecord("NO_DRAFT", dtselect.NO_DRAFT);
                      // console.log(check_item);
                      if (!check_item) {
                        GRIDFRM_good_picking_list.getStore().add({
                          LOT_NO: dtselect.LOT_NO,
                          CURRENT_RACK: dtselect.CURRENT_RACK,
                          CUSTOMER_INVOICE: dtselect.CUSTOMER_INVOICE,
                          QTY_PICKING: dtselect.QTY_PICKING,
                        });
                      }
                    });
                    GRIDFRM_good_picking_list.getStore().commitChanges();
                    popup.close();
                  } catch (ex) {
                    COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                  }
                },
              },
              "-",
            ],
            // other options....
          },
        ],
      });
      //return popup.show();
      COMP.run.getmodulepopup("popup_list_source", popup, this.getView());
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },

  FRM_goods_racking_btsave_click: function () {
    try {
      var me = this;
      var vgridPickingList = [];
      /*
      var groupBy = function (xs, key) {
          return xs.reduce(function (rv, x) {
              (rv[x[key]] = rv[x[key]] || []).push(x);
              return rv;
          }, {});
      };
      */
      var popup = Ext.ComponentQuery.query("FRM_goods_racking")[0];
      var RACK_ID = Ext.ComponentQuery.query("FRM_goods_racking field[pid=RACK_ID]")[0].value;
      var RACK_NAME = Ext.ComponentQuery.query("FRM_goods_racking field[pid=RACK_NAME]")[0].value;
      GRIDDeliveryInstruction = Ext.ComponentQuery.query("FRM_goods_racking grid[pid=GRIDFRM_good_picking_list]")[0];
      GRIDDeliveryInstruction.getStore().getDataSource()
        .each(function (rec) {
          vgridPickingList.push(rec.data);
        }
        );
      var params = Ext.encode({
        method: "create_racking_manual",
        RACK_ID: RACK_ID,
        RACK_NAME: RACK_NAME,
        PICKING_LIST: Ext.encode(vgridPickingList),
      });
      console.log(Ext.encode(vgridPickingList));
      //return;
      var hasil = COMP.run.getservice(vconfig.service_api + "goods_racking/goods_racking", params, "POST", me.var_global.jwt);
      hasil.then(function (content) {
        var val = Ext.decode(content, true);
        if (val.success === "true") {
          COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 3000 });
          //var vJsonHeader = Ext.decode(val.vjson_header);
          //var vJsonDetail = Ext.decode(val.vjson_detail);
          //console.log("vJsonHeader  " + vJsonHeader);
          //console.log("vJsonHeader  " + vJsonDetail);
          popup.close();
        } else {
          COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 3000 });
        }
      }, this);

      // var kodeBarang_grouped = Object.keys(groupBy(vDataDI, "PART_NAME")).data;
      // console.log("kodeBarang_grouped" + kodeBarang_grouped);
      // console.log(vDataDI);

    } catch (error) {
      COMP.TipToast.toast("ERROR", error.message, { cls: "danger", delay: 4000 });
    }
  }
});
