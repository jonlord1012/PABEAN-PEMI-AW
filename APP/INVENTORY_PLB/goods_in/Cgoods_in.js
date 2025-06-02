Ext.define("NJC.INVENTORY_PLB.goods_in.Cgoods_in", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cgoods_in",
  init: function (view) {
    this.control({
      "goods_in button[pid=btreceiving_manual]": { click: this.btnew_click },
      "goods_in button[pid=btreceiving_integrasi]": { click: this.btreceiving_integrasi_click },
      "goods_in button[pid=btreceiving_byInvoice]": { click: this.btreceiving_byInvoice_click },
      "goods_in button[pid=btrefresh_main]": { click: this.btrefresh_main_click },

      "FRMinv_material_in_aw button[pid=btsearch]": { click: this.btsearch_click },
      "FRMinv_material_in_manual button[pid=btsearch]": { click: this.btsearch_manual_click },
      "FRMinv_material_in_manual button[pid=btsearch_receipt]": { click: this.btsearch_receipt_click },
      /*"FRMinv_material_in_aw combobox[name=CBO_SOURCE]": { change: this.CBO_SOURCE_change },*/
      "FRMinv_goods_in_binloc button[pid=binloc_synchronize]": { click: this.binloc_synchronize_click },
      "FRMinv_goods_in_by_invoice button[pid=binloc_synchronize_by_invoice]": { click: this.binloc_synchronize_by_invoice_click },
      "FRMinv_goods_in_by_invoice button[pid=btsearch_invoice]": { click: this.btsearch_invoice_click },
      "FRMinv_goods_in_binloc datefield[name=TANGGAL_RCV]": { change: this.biccbtrefresh_click },
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
      console.log("renderer controller " + this.alias);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  GRIDgoods_in_load: function (grid) {
    try {
      var me = this;
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btrefresh_main_click: function () {
    try {
      var me = this;
      var GRID = Ext.ComponentQuery.query("goods_in grid[pid=GRIDgoods_in]")[0];
      //console.log(GRID.getStore().load() + "refresh");
      GRID.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btnew_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      //COMP.run.getmodulepopup("FRMinv_material_in_aw", "NJC.INVENTORY_PLB.goods_in.FRMinv_material_in_aw", mainpanel);
      COMP.run.getmodulepopup("FRMinv_material_in_manual", "NJC.INVENTORY_PLB.goods_in.FRMinv_material_in_manual", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btreceiving_integrasi_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("FRMinv_goods_in_binloc", "NJC.INVENTORY_PLB.goods_in.FRMinv_goods_in_binloc", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btreceiving_byInvoice_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("FRMinv_goods_in_by_invoice", "NJC.INVENTORY_PLB.goods_in.FRMinv_goods_in_by_invoice", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btsearch_click: function (btn) {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var FRM_MAIN = Ext.ComponentQuery.query("FRMinv_material_in_aw form")[0];
      var MAIN_dtval = FRM_MAIN.getValues(false, false, false, true);
      if (MAIN_dtval.CBO_SOURCE === "" || MAIN_dtval.CBO_SOURCE === null) {
        COMP.TipToast.toast("Error", "Pilih Sumber Data lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      var popup = Ext.define("NJC.INVENTORY_PLB.goods_in.popup_list_source", {
        extend: "Ext.window.Window",
        alias: "widget.popup_list_source",
        reference: "popup_list_source",
        title: "Search Sumber Data",
        modal: true,
        closeAction: "destroy",
        centered: true,
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
                url: vconfig.service_api + "goods_in/goods_ins",
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
                    //method: "read_list_source_" + MAIN_dtval.CBO_SOURCE,
                    method: "read_list_source_portal",
                  });
                },
              },
            },
            viewConfig: {
              enableTextSelection: true,
            },
            columns: [
              { xtype: "rownumberer", width: 50 },
              { header: "VENDOR ID", dataIndex: "KODE_INTERNAL", sortable: true, width: 65, filter: { xtype: "textfield" } },
              { header: "VENDOR CODE", dataIndex: "KODE_ID", sortable: true, width: 65, filter: { xtype: "textfield" } },
              { header: "NAMA", dataIndex: "NAMAENTITAS", sortable: true, width: 200, filter: { xtype: "textfield" } },
              { header: "NOMOR AJU", dataIndex: "NOMOR_AJU", sortable: true, width: 150, filter: { xtype: "textfield" } },
              { header: "INVOICE", dataIndex: "NOMORDOKUMEN", sortable: true, width: 150, filter: { xtype: "textfield" } },
              { header: "TANGGAL INVOICE", dataIndex: "TANGGALDOKUMEN", sortable: true, width: 100, filter: { xtype: "textfield" }, renderer: "formatDate" },

            ],
            listeners: {
              itemdblclick: "GRIDpopup_list_source_itemdblclick",
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
      COMP.run.getmodulepopup("popup_list_source", popup, this.getView());
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },

  GRIDpopup_list_source_itemdblclick: function (cmp, rec) {
    try {
      var me = this;
      var popup = Ext.ComponentQuery.query("popup_list_source")[0];
      var FRM_MAIN = Ext.ComponentQuery.query("FRMinv_material_in_aw form")[0];
      var GRID = Ext.ComponentQuery.query("FRMinv_material_in_aw grid[pid=GRIDFRMinv_material_in_aw]")[0];
      var MAIN_dtval = FRM_MAIN.getValues(false, false, false, true);
      if (rec.data) {
        FRM_MAIN.getForm().setValues({
          NOMOR_AJU: rec.data.NOMOR_AJU,
          INVOICE_DATE: rec.data.TANGGALDOKUMEN,
          INVOICE_NO: rec.data.NOMORDOKUMEN,
          VENDOR: rec.data.KODE_INTERNAL,
          VENDOR_CODE: rec.data.KODE_ID,
          VENDOR_NAME: rec.data.NAMAENTITAS,
          TANGGALDOKUMEN: rec.data.TANGGALDOKUMEN,
        });

        /*var params = Ext.encode({
          method: "load_selected_invoice",
          module: MAIN_dtval.CBO_SOURCE,
          nomor_aju: rec.data.INVOICE_NO,
        });
        var hasil = COMP.run.getservice(vconfig.service_api + "goods_in/goods_in", params, "POST", me.var_global.jwt);
        hasil.then(function (content) {
          var val = Ext.decode(content, true);
          if (val.success === "true") {
            COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 3000 });
            var vjsondata = Ext.decode(val.vjson_data);
            var vjsonheader = Ext.decode(val.vjson_header);
            FRM_MAIN.getForm().setValues({
              NOMOR_AJU: vjsonheader.NOMOR_AJU,
              NOMOR_DAFTAR: vjsonheader.NOMOR_DAFTAR,
              TANGGAL_AJU: vjsonheader.TANGGAL_AJU === null ? "" : moment(vjsonheader.TANGGAL_AJU).format("YYYY-MM-DD"),
              TANGGAL_DAFTAR: vjsonheader.TANGGAL_DAFTAR === null ? "" : moment(vjsonheader.TANGGAL_DAFTAR).format("YYYY-MM-DD"),
              SUPPLIER: vjsonheader.NAMA,
              KODE_INTERNAL: vjsonheader.KODE_INTERNAL,
              BC_TYPE: vjsonheader.BC_TYPE,
            });
            /*
            var vnstore = new Ext.data.Store({
              field: [
                { name: "INVOICE_NO", type: "string" },
                { name: "PART_NO", type: "string" },
                { name: "PART_NAME", type: "string" },
                { name: "INPUT_QTY", type: "float" },
                { name: "TOTAL_QTY", type: "float" },
                { name: "RECEIPT_QTY", type: "float" },
                { name: "SISA_QTY", type: "float" },
              ],
              data: vjsondata,
            });*/
        GRID.getStore().load();
        popup.close();
      } else {
        COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 3000 });
      }
      //}, this);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btsearch_manual_click: function (btn) {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var FRM_MAIN = Ext.ComponentQuery.query("FRMinv_material_in_manual form")[0];
      var MAIN_dtval = FRM_MAIN.getValues(false, false, false, true);
      if (MAIN_dtval.CBO_SOURCE === "" || MAIN_dtval.CBO_SOURCE === null) {
        COMP.TipToast.toast("Error", "Pilih Sumber Data lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      var popup = Ext.define("NJC.INVENTORY_PLB.goods_in.popup_list_source_manual", {
        extend: "Ext.window.Window",
        alias: "widget.popup_list_source_manual",
        reference: "popup_list_source_manual",
        title: "Search Sumber Data",
        modal: true,
        closeAction: "destroy",
        centered: true,
        width: mainpanel.getWidth() * 0.85,
        height: mainpanel.getHeight() * 0.7,
        layout: { type: "vbox", pack: "start", align: "stretch" },
        bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
        items: [
          {
            xtype: "grid",
            pid: "GRIDpopup_search_manual",
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
                url: vconfig.service_api + "goods_in/goods_ins",
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
                    //method: "read_list_source_" + MAIN_dtval.CBO_SOURCE,
                    method: "read_list_source_portal",
                  });
                },
              },
            },
            viewConfig: {
              enableTextSelection: true,
            },
            columns: [
              { xtype: "rownumberer", width: 50 },
              { header: "VENDOR ID", dataIndex: "KODE_INTERNAL", sortable: true, width: 65, filter: { xtype: "textfield" } },
              { header: "VENDOR CODE", dataIndex: "KODE_ID", sortable: true, width: 65, filter: { xtype: "textfield" } },
              { header: "NAMA", dataIndex: "NAMAENTITAS", sortable: true, width: 200, filter: { xtype: "textfield" } },
              { header: "NOMOR AJU", dataIndex: "NOMOR_AJU", sortable: true, width: 150, filter: { xtype: "textfield" } },
              { header: "INVOICE", dataIndex: "NOMORDOKUMEN", sortable: true, width: 150, filter: { xtype: "textfield" } },
              { header: "TANGGAL INVOICE", dataIndex: "TANGGALDOKUMEN", sortable: true, width: 100, filter: { xtype: "textfield" }, renderer: "formatDate" },

            ],
            listeners: {
              itemdblclick: "GRIDpopup_list_source_manual_itemdblclick",
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
      COMP.run.getmodulepopup("popup_list_source_manual", popup, this.getView());
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  GRIDpopup_list_source_manual_itemdblclick: function (cmp, rec) {
    try {
      var me = this;
      var popup = Ext.ComponentQuery.query("popup_list_source_manual")[0];
      var FRM_MAIN = Ext.ComponentQuery.query("FRMinv_material_in_manual form")[0];
      var GRID = Ext.ComponentQuery.query("FRMinv_material_in_manual grid[pid=GRIDFRMinv_material_in_manual]")[0];
      var MAIN_dtval = FRM_MAIN.getValues(false, false, false, true);
      if (rec.data) {
        FRM_MAIN.getForm().setValues({
          NOMOR_AJU: rec.data.NOMOR_AJU,
          INVOICE_DATE: rec.data.TANGGALDOKUMEN,
          INVOICE_NO: rec.data.NOMORDOKUMEN,
          VENDOR: rec.data.KODE_INTERNAL,
          VENDOR_CODE: rec.data.KODE_ID,
          VENDOR_NAME: rec.data.NAMAENTITAS,
          TANGGALDOKUMEN: rec.data.TANGGALDOKUMEN,
        });

        /*var params = Ext.encode({
          method: "load_selected_invoice",
          module: MAIN_dtval.CBO_SOURCE,
          nomor_aju: rec.data.INVOICE_NO,
        });
        var hasil = COMP.run.getservice(vconfig.service_api + "goods_in/goods_in", params, "POST", me.var_global.jwt);
        hasil.then(function (content) {
          var val = Ext.decode(content, true);
          if (val.success === "true") {
            COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 3000 });
            var vjsondata = Ext.decode(val.vjson_data);
            var vjsonheader = Ext.decode(val.vjson_header);
            FRM_MAIN.getForm().setValues({
              NOMOR_AJU: vjsonheader.NOMOR_AJU,
              NOMOR_DAFTAR: vjsonheader.NOMOR_DAFTAR,
              TANGGAL_AJU: vjsonheader.TANGGAL_AJU === null ? "" : moment(vjsonheader.TANGGAL_AJU).format("YYYY-MM-DD"),
              TANGGAL_DAFTAR: vjsonheader.TANGGAL_DAFTAR === null ? "" : moment(vjsonheader.TANGGAL_DAFTAR).format("YYYY-MM-DD"),
              SUPPLIER: vjsonheader.NAMA,
              KODE_INTERNAL: vjsonheader.KODE_INTERNAL,
              BC_TYPE: vjsonheader.BC_TYPE,
            });
            /*
            var vnstore = new Ext.data.Store({
              field: [
                { name: "INVOICE_NO", type: "string" },
                { name: "PART_NO", type: "string" },
                { name: "PART_NAME", type: "string" },
                { name: "INPUT_QTY", type: "float" },
                { name: "TOTAL_QTY", type: "float" },
                { name: "RECEIPT_QTY", type: "float" },
                { name: "SISA_QTY", type: "float" },
              ],
              data: vjsondata,
            });*/
        GRID.getStore().load();
        popup.close();
      } else {
        COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 3000 });
      }
      //}, this);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMinv_material_in_aw_btsave_click: function (btn) {
    try {
      var me = this;
      var popup = Ext.ComponentQuery.query("FRMinv_material_in_aw")[0];
      var FRM_MAIN = Ext.ComponentQuery.query("FRMinv_material_in_aw form")[0];
      var MAIN_dtval = FRM_MAIN.getValues(false, false, false, true);
      var GRID = Ext.ComponentQuery.query("FRMinv_material_in_aw grid[pid=GRIDFRMinv_material_in_aw]")[0];
      var Vgridvalidation = "";
      var Vgridinput = [];
      GRID.getStore()
        .getDataSource()
        .each(function (record) {
          if (record.data.INPUT_QTY > 0) {
            Vgridinput.push(record.data);
          }
        });

      if (Vgridinput.length < 1) {
        COMP.TipToast.toast("Error", "Input Qty Item/Part Lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }

      if (MAIN_dtval.NAMA === null || MAIN_dtval.NAMA === "") {
        COMP.TipToast.toast("Error", "Supplier tidak ditemukan, silahkan mapping supplier lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }

      if (MAIN_dtval.TANGGAL_RCV === null || MAIN_dtval.TANGGAL_RCV === "") {
        COMP.TipToast.toast("Error", "Input tanggal Receiving lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }

      if (MAIN_dtval.TANGGAL_RCV < MAIN_dtval.TANGGAL_DAFTAR) {
        COMP.TipToast.toast("Error", "Tanggal Receiving tidak bisa lebih kecil dari Tanggal No Daftar", { cls: "danger", delay: 2000 });
        return false;
      }
      MAIN_dtval.TANGGAL_AJU = moment(MAIN_dtval.TANGGAL_AJU).format("YYYY-MM-DD");
      MAIN_dtval.TANGGAL_DAFTAR = moment(MAIN_dtval.TANGGAL_DAFTAR).format("YYYY-MM-DD");
      MAIN_dtval.TANGGAL_RCV = moment(MAIN_dtval.TANGGAL_RCV).format("YYYY-MM-DD");

      if (MAIN_dtval.BC_TYPE === "40" || MAIN_dtval.BC_TYPE === "271") {
        if (MAIN_dtval.NOMOR_FAKTUR === "") {
          COMP.TipToast.toast("Error", "Faktur Wajib di isi", { cls: "danger", delay: 2000 });
          return false;
        }

        if (MAIN_dtval.TANGGAL_FAKTUR === null) {
          COMP.TipToast.toast("Error", "Tanggal Faktur Wajib di isi", { cls: "danger", delay: 2000 });
          return false;
        }
      }

      Ext.MessageBox.confirm(
        "Konfirmasi",
        "Konfirmasi Receiving Item/Part Material",
        function (button) {
          if (button === "yes") {
            var params = Ext.encode({
              method: "create_receiving",
              module: MAIN_dtval.CBO_SOURCE,
              header: Ext.encode(MAIN_dtval),
              detail: Ext.encode(Vgridinput),
            });
            var hasil = COMP.run.getservice(vconfig.service_api + "goods_in/goods_in", params, "POST", me.var_global.jwt);
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
  /*
  CBO_SOURCE_change: function (cmp, rec) {
    try {
      var GRID = Ext.ComponentQuery.query("FRMinv_material_in_aw grid[pid=GRIDFRMinv_material_in_aw]")[0];
      GRID.getStore().removeAll();
      GRID.getStore().commitChanges();
      var FRM_MAIN = Ext.ComponentQuery.query("FRMinv_material_in_aw form")[0];
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
  },*/
  btdetail_aw_rows_click: function (xgrid, rowIndex) {
    try {

      xgrid.getSelectionModel().select(rowIndex);
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("receiving_detail_goods_in", "NJC.INVENTORY_PLB.goods_in.receiving_detail_goods_in", mainpanel);

    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });

    }
  },

  receiving_detail_goods_in_link_click: function (cmp, dt) {
    try {
      var vdt = dt.data;
      if (vdt.allowclick !== true) return;
      var vmodulecontrol = vdt.controlname === "" ? vdt.text : vdt.controlname;
      var vmodulename = vdt.modulename === "" ? vmodulecontrol : vdt.modulename;
      var id = vmodulecontrol;
      var cls = "NJC.INVENTORY_PLB.goods_in." + vmodulename + "." + vmodulecontrol;
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
        var cls = "NJC.INVENTORY_PLB.goods_in.receiving_detail." + vmodulecontrol;
      } else {
        var cls = "NJC.INVENTORY_PLB.goods_in.receiving_detail." + vmodulename + "." + vmodulecontrol;
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
      var GRID = Ext.ComponentQuery.query("FRMinv_goods_in_binloc grid[pid=GRIDinv_goods_in_binlog]")[0];
      GRID.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btsearch_invoice_click: function () {
    try {
      var GRID = Ext.ComponentQuery.query("FRMinv_goods_in_by_invoice grid[pid=GRIDinv_goods_in_binloc_by_invoice]")[0];
      GRID.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  binloc_synchronize_click: function () {
    try {
      var me = this;
      var popup = Ext.ComponentQuery.query("FRMinv_goods_in_binloc")[0];
      var vrcvdate = Ext.ComponentQuery.query("FRMinv_goods_in_binloc datefield[name=TANGGAL_RCV] ")[0];
      var GRID = Ext.ComponentQuery.query("FRMinv_goods_in_binloc grid[pid=GRIDinv_goods_in_binlog]")[0];
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
            var params = Ext.encode({
              method: "read_syncronize_binloc",
              RECEIPT_DATE: moment(vrcvdate.getValue()).format("YYYY-MM-DD"),
              module: "RCPT_SYNC",
              /*vdata: Ext.encode(Vgridinput),*/
            });
            var hasil = COMP.run.getservice(vconfig.service_api + "goods_in/goods_in", params, "POST", me.var_global.jwt);
            hasil.then(function (content) {
              var val = Ext.decode(content, true);
              if (val.success === "true") {
                console.log(val.message);
                popup.close();
                me.btrefresh_main_click();
                COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 3000 });
              } else {
                me.btrefresh_main_click();
                popup.close();
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

  binloc_synchronize_by_invoice_click: function (FRM) {
    try {
      var me = this;
      var popup = Ext.ComponentQuery.query("FRMinv_goods_in_by_invoice")[0];
      var vinvoiceno = Ext.ComponentQuery.query("FRMinv_goods_in_by_invoice field[pid=invoice_no]")[0].value;
      var GRID = Ext.ComponentQuery.query("FRMinv_goods_in_by_invoice grid[pid=GRIDinv_goods_in_binloc_by_invoice]")[0];
      console.log(GRID.getStore().getDataSource().length)
      //return;

      if (GRID.getStore().getDataSource().length === 0) {
        COMP.TipToast.toast("Error", "Data Receipt tidak ada", { cls: "danger", delay: 2000 });
        return false;
      }
      //console.log(vinvoiceno);
      //return;
      Ext.MessageBox.confirm(
        "Konfirmasi Synchronize Data Receiving No Invoice: " + vinvoiceno,
        //
        "<b>Proses Sinkronisasi: </b>" +
        //
        "<ol>" +
        "<li>Invoice yang diproses: " +
        vinvoiceno +
        "</li>" +
        "<li>Hanya LOT  yang sudah mendapatkan Nomor Aju + Nomor Daftar</li>" +
        "<li>Hanya Part dan Qty yang sesuai dengan Dokumen BC </li>" +
        "</ol>",

        function (button) {
          if (button === "yes") {
            var params = Ext.encode({
              method: "read_syncronize_binloc_by_invoice",
              VINVOICENO: vinvoiceno,
              module: "RCPT_SYNC",
              /*vdata: Ext.encode(Vgridinput),*/
            });
            console.log(params);
            //return;
            var hasil = COMP.run.getservice(vconfig.service_api + "goods_in/goods_in", params, "POST", me.var_global.jwt);
            hasil.then(function (content) {
              var val = Ext.decode(content, true);
              if (val.success === "true") {
                console.log(val.message);
                popup.close();
                me.btrefresh_main_click();
                COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 3000 });
              } else {
                me.btrefresh_main_click();
                popup.close();
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

  create_scan_in_manual: function ($param) {
    var vgridManualScanIn = [];
    var FRM_MAIN = Ext.ComponentQuery.query("FRMinv_material_in_aw form")[0];
    var MAIN_dtval = FRM_MAIN.getValues(false, false, false, true);
    GRIDManualScanIn = Ext.ComponentQuery.query("FRMinv_material_in_aw grid[pid=GRIDFRMinv_material_in_aw]")[0];
    GRIDManualScanIn.getStore().getDataSource()
      .each(function (rec) {
        vgridManualScanIn.push(rec.data);
      }
      );
    var params = Ext.encode({
      method: "saveScanInManual",
      INVOICE_NO: MAIN_dtval.INVOICE_NO,
      NOMOR_AJU: MAIN_dtval.NOMOR_AJU,
      PICKING_LIST: Ext.encode(vgridManualScanIn),
    });
    console.log(Ext.encode(params));

    return;
    try {
      var me = this;
      var popup = Ext.ComponentQuery.query("FRMinv_material_in_aw")[0];
      var FRM_MAIN = Ext.ComponentQuery.query("FRMinv_material_in_aw form")[0];
      var MAIN_dtval = FRM_MAIN.getValues(false, false, false, true);

      if (MAIN_dtval.INVOICE_NO === null || MAIN_dtval.INVOICE_NO === "") {
        COMP.TipToast.toast("Error", "Sumber Data tidak ditemukan, silahkan Pilih sumber data", { cls: "danger", delay: 2000 });
        return false;
      }

      if (MAIN_dtval.TANGGAL_RCV === null || MAIN_dtval.TANGGAL_RCV === "") {
        COMP.TipToast.toast("Error", "Silahkan Input tanggal Receiving ", { cls: "danger", delay: 2000 });
        return false;
      }

      if (MAIN_dtval.TANGGAL_RCV < MAIN_dtval.TANGGAL_DAFTAR) {
        COMP.TipToast.toast("Error", "Tanggal Receiving tidak bisa lebih kecil dari Tanggal No Daftar", { cls: "danger", delay: 2000 });
        return false;
      }
      MAIN_dtval.TANGGAL_AJU = moment(MAIN_dtval.TANGGAL_AJU).format("YYYY-MM-DD");
      MAIN_dtval.TANGGAL_DAFTAR = moment(MAIN_dtval.TANGGAL_DAFTAR).format("YYYY-MM-DD");
      MAIN_dtval.TANGGAL_RCV = moment(MAIN_dtval.TANGGAL_RCV).format("YYYY-MM-DD");
      /*
            if (MAIN_dtval.BC_TYPE === "40" || MAIN_dtval.BC_TYPE === "271") {
              if (MAIN_dtval.NOMOR_FAKTUR === "") {
                COMP.TipToast.toast("Error", "Faktur Wajib di isi", { cls: "danger", delay: 2000 });
                return false;
              }
      
              if (MAIN_dtval.TANGGAL_FAKTUR === null) {
                COMP.TipToast.toast("Error", "Tanggal Faktur Wajib di isi", { cls: "danger", delay: 2000 });
                return false;
              }
            }
      */
      Ext.MessageBox.confirm(
        "Konfirmasi",
        "Konfirmasi Receiving Item/Part Material",
        function (button) {
          if (button === "yes") {
            var params = Ext.encode({
              method: "create_scan_in_manual",
              module: MAIN_dtval.CBO_SOURCE,
              //header: Ext.encode(MAIN_dtval),
              INVOICE_NO: MAIN_dtval.INVOICE_NO,
              RECEIPT_DATE: MAIN_dtval.TANGGAL_RCV,

              //detail: Ext.encode(Vgridinput),
            });
            var hasil = COMP.run.getservice(vconfig.service_api + "goods_in/goods_in", params, "POST", me.var_global.jwt);
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
  mapp_this_part: function (xgrid, rowIndex) {
    try {
      xgrid.getSelectionModel().select(rowIndex);
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var GRID = Ext.ComponentQuery.query("FRMinv_material_in_aw grid[pid=GRIDFRMinv_material_in_aw]")[0];
      var vdt = GRID.getSelectionModel().getSelection()[0].data;
      var KODE_BARANG = vdt.KODEBARANG;
      var TIPE = vdt.TIPE;
      console.log(KODE_BARANG);
      console.log(TIPE);
      var popup = Ext.define("NJC.INVENTORY_PLB.goods_in.popup_selectpart", {
        extend: "Ext.window.Window",
        alias: "widget.popup_selectpart",
        reference: "popup_selectpart",
        title: "Mapping Manual Item/Part Material " + vdt.KODEBARANG,
        modal: true,
        closeAction: "destroy",
        centered: true,
        autoScroll: true,
        width: mainpanel.getWidth() * 0.8,
        height: mainpanel.getHeight() * 0.7,
        layout: { type: "vbox", pack: "start", align: "stretch" },
        bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
        items: [
          {
            xtype: "textfield",
            pid: "myIndex",
            fieldLabel: "MAPPING THIS PART: ",
            value: vdt.KODEBARANG,
            width: 150,
            labelWidth: 200,
            readOnly: true,
          },
          {
            xtype: "grid",
            pid: "GRIDpopup_selectpart_aw",
            emptyText: "No Matching Records",
            autoScroll: true,
            flex: 1,
            plugins: ["filterfield"],
            viewConfig: {
              enableTextSelection: true,
            },
            store: {
              autoLoad: true,
              remoteSort: true,
              remoteFilter: true,
              pageSize: 15,
              proxy: {
                type: "ajax",
                disableCaching: false,
                noCache: false,
                headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
                actionMethods: { read: "POST" },
                url: vconfig.service_api + "mst_item/mst_items",
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
            },
            columns: [
              { xtype: "rownumberer", width: 40 },
              { header: "PARTNO", dataIndex: "PART_NO", sortable: true, width: 120, filter: { xtype: "textfield" } },
              { header: "PARTNAME", dataIndex: "PART_NAME", sortable: true, width: 120, filter: { xtype: "textfield" } },
              { header: "DESCRIPTION", dataIndex: "PART_DESCRIPTION", sortable: true, width: 200, filter: { xtype: "textfield" } },
              { header: "UOM", dataIndex: "PART_UOM", sortable: true, width: 65, filter: { xtype: "textfield" } },
              { header: "GROUP", dataIndex: "PART_GROUP", sortable: true, width: 200, filter: { xtype: "textfield" } },
              { header: "ALIAS", dataIndex: "PART_ALIAS", sortable: true, width: 200, filter: { xtype: "textfield" } },
              { header: "MPQ", dataIndex: "PART_MPQ", sortable: true, width: 200, filter: { xtype: "textfield" } },
            ],
            bbar: {
              xtype: "pagingtoolbar",
              displayInfo: true,
              displayMsg: "Total Data {2}",
              emptyMsg: "No topics to display",
            },
            listeners: {
              //itemdblclick: "select_manual_itempart",
              itemdblclick: function (cmp, rec) {

                try {
                  var GRID = Ext.ComponentQuery.query("FRMinv_material_in_aw grid[pid=GRIDFRMinv_material_in_aw]")[0];
                  var vdt = GRID.getSelectionModel().getSelection()[0];
                  var JUMLAHSATUAN = vdt.data.JUMLAHSATUAN;

                  vdt.set("ARTICLE_CODE", rec.data.PART_ALIAS);
                  vdt.set("PART_MPQ", rec.data.PART_MPQ);
                  vdt.set("RCV_INPUT", JUMLAHSATUAN);
                  console.log(vdt.data);
                  GRID.getStore().commitChanges();
                  GRID.getView().refresh();
                  this.up().close();
                } catch (error) {
                  COMP.TipToast.toast("Error", error.message, { cls: "danger", delay: 2000 });
                }
              },
            },
          },
        ],
      });
      COMP.run.getmodulepopup("popup_search", popup, this.getView());
    } catch (err) {
      COMP.TipToast.toast("Error", err.message, { cls: "danger", delay: 2000 });

    }
  },
  commit_grid_change: function () {

  },
  add_picking_list: function (xgrid, rowIndex) {
    console.log("picking list");
    COMP.TipToast.toast("Info", "Silahkan Pilih picking list untuk dokumen ini", { cls: "info", delay: 2000 });
    try {
      xgrid.getSelectionModel().select(rowIndex);
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var GRID = Ext.ComponentQuery.query("FRMinv_material_in_aw grid[pid=GRIDFRMinv_material_in_aw]")[0];
      var vdt = GRID.getSelectionModel().getSelection()[0].data;
      var KODE_BARANG = vdt.KODEBARANG;
      var ARTICLE_CODE = vdt.ARTICLE_CODE;

      var GRIDPicking_list = Ext.create("NJC.INVENTORY_PLB.goods_in.GRIDPicking_list", {
        store: {
          autoLoad: true,
          autoSync: false,
          remoteSort: true,
          remoteFilter: true,
          pageSize: 30,
          viewConfig: {
            enableTextSelection: true,
            getRowClass: function (record) {
              //console.log(this.getRowClass.getValue());
              return record.get("NONFG") === "1" || record.get("NONFG") === "true" ? "gridrow-bold" : "";
            },
          },
          fields: [
            { name: "NOMORAJU", type: "string" },
            { name: "SERIBARANG", type: "string" },
            { name: "NOMORDOKUMEN", type: "string" },
            { name: "ARTICLE_CODE", type: "string" },
            { name: "PART_MPQ", type: "float" },
            { name: "NO_BUKTI", type: "string" },
            { name: "NO_DRAFT", type: "string" },
            { name: "QTY_PICKING", type: "string" },

          ],
          proxy: {
            type: "ajax",
            disableCaching: false,
            noCache: false,
            headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
            actionMethods: { read: "POST" },
            url: vconfig.service_api + "goods_in/goods_ins",
            extraParams: {
              method: "load_list_picking_list",
            },
            reader: {
              type: "json",
              rootProperty: "Rows",
              totalProperty: "TotalRows",
              successProperty: "success",
            },
          },
          listeners: {
            beforeload: function (store, operation, eOpts) {
              var me = this;
              var GRID = Ext.ComponentQuery.query("FRMinv_material_in_aw grid[pid=GRIDFRMinv_material_in_aw]")[0];
              var vdt = GRID.getSelectionModel().getSelection()[0].data;

              operation.setParams({
                ARTICLE_CODE: vdt.ARTICLE_CODE,
                NOMOR_AJU: vdt.NOMORAJU,
                SERIBARANG: vdt.SERIBARANG,
              });
            }
          },
        },
      });
      var popup = Ext.define("NJC.INVENTORY_PLB.goods_in.popup_addpicking_list", {
        extend: "Ext.window.Window",
        alias: "widget.popup_addpicking_list",
        reference: "popup_addpicking_list",
        title: "Add Picking List " + ARTICLE_CODE,
        modal: true,
        closeAction: "destroy",
        centered: true,
        autoScroll: true,
        width: mainpanel.getWidth() * 0.7,
        height: mainpanel.getHeight() * 0.7,
        layout: { type: "vbox", pack: "start", align: "stretch" },
        bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
        items: [
          {
            xtype: "container",
            layout: { type: "vbox", pack: "start", align: "stretch" },
            bodyPadding: "5 5 5 5",
            items: [
              {
                xtype: "form",
                bodyPadding: "5 5 5 5",
                pid: "InvoiceHeader",
                fieldDefaults: {
                  labelAlign: "left",
                  labelWidth: 70,
                  margin: "0 10 5 0",
                },
                border: false,
                layout: { type: "hbox", pack: "start", align: "stretch" },
                items: [
                  {
                    xtype: "container",
                    layout: { type: "vbox", pack: "start", align: "stretch" },
                    bodyPadding: "5 5 5 5",
                    items: [
                      {
                        xtype: "container",
                        layout: { type: "hbox", pack: "start", align: "stretch" },
                        flex: 1,
                        items: [
                          { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "NOMORAJU", name: "NOMORAJU", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "NOMORAJU", value: vdt.NOMORAJU },
                          { xtype: "tbspacer", width: 10 },

                          { xtype: "textfield", labelWidth: 100, width: 200, fieldLabel: "DOKUMEN", name: "NOMORDOKUMEN", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "DOKUMEN", value: vdt.NOMORDOKUMEN },
                          { xtype: "tbspacer", width: 10 },

                          { xtype: "textfield", labelWidth: 100, width: 200, fieldLabel: "SERIBARANG", name: "SERIBARANG", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "SERI BARANG", value: vdt.SERIBARANG },
                        ],
                      },
                      {
                        xtype: "container",
                        layout: "hbox",
                        items: [
                          { xtype: "textfield", labelWidth: 100, width: 200, fieldLabel: "ARTICLE_CODE", name: "ARTICLE_CODE", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "ARTICLE CODE", value: ARTICLE_CODE },
                          { xtype: "tbspacer", width: 10 },

                          { xtype: "textfield", labelWidth: 100, width: 200, fieldLabel: "PART_MPQ", name: "PART_MPQ", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "MPQ", value: vdt.PART_MPQ },
                          { xtype: "tbspacer", width: 10 },

                          { xtype: "textfield", labelWidth: 100, width: 200, fieldLabel: "REQUIRED", name: "RCV_INPUT", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "REQUIRED", value: vdt.JUMLAHSATUAN },
                        ],
                      },

                      { xtype: "tbspacer", height: 10 },

                      {
                        xtype: "container",
                        layout: "hbox",
                        items: [
                          { xtype: "textfield", labelWidth: 100, width: 450, name: "NO_BUKTI", fieldLabel: "NOMOR BUKTI", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "Nomor BUKTI" },
                          { xtype: "textfield", labelWidth: 100, width: 450, name: "NO_DRAFT", fieldLabel: "NOMOR DRAFT", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "Nomor DRAFT" },
                          {
                            xtype: "button",
                            pid: "btsearch_picking",
                            module: "goods_in",
                            popupwidth: 900,
                            tofield: {
                              //ID_HEADER_ORI: "ID_HEADER_ORI",
                              NO_DRAFT: "NO_DRAFT",
                              NO_BUKTI: "NO_BUKTI",
                            },
                            handler: "btsearch_picking_click",
                            icon: vconfig.getstyle + "icon/search.ico",
                            tooltip: "search",
                          },
                          { xtype: "tbspacer", width: 10 },
                          {
                            xtype: "checkbox", fieldLabel: "NON-FG", name: "NONFG", width: 100, labelWidth: 50
                          },
                          {
                            xtype: "button",
                            pid: "bt_add_to_grid",
                            module: "goods_in",
                            popupwidth: 900,
                            /*tofield: {
                              ID_HEADER_ORI: "ID_HEADER_ORI",
                              NOMOR_AJU: "NOMOR_AJU",
                              DOKUMEN: "URAIAN_DOKUMEN",
                            },*/
                            icon: vconfig.getstyle + "icon/add.ico",
                            tooltip: "add",
                            handler: function (btn) {
                              var myHeaderForm = Ext.ComponentQuery.query("popup_addpicking_list form[pid=InvoiceHeader]")[0];
                              var MAIN_dtval = myHeaderForm.getValues(false, false, false, true);
                              var qtytoAdd = parseFloat(MAIN_dtval.PART_MPQ);
                              var qtyRequired = parseFloat(vdt.JUMLAHSATUAN);
                              var currentRCV = GRIDLot_no.getStore().sum("PART_MPQ");
                              console.log(currentRCV);
                              console.log(qtyRequired);
                              console.log(qtytoAdd);
                              if (MAIN_dtval.ARTICLE_CODE === "" || MAIN_dtval.ARTICLE_CODE === null) {
                                COMP.TipToast.toast("Error", "SILAHKAN MAPPING PART TERLEBIH DULU", { cls: "danger", delay: 4000 });
                                btn.up('.window').close();
                                return;
                              }
                              if (MAIN_dtval.NONFG === "0" || MAIN_dtval.NONFG === false) {
                                if (qtyRequired - (parseFloat(currentRCV) + qtytoAdd) < 0) {
                                  COMP.TipToast.toast("Error", "QTY yg di input melebihi kebutuhan", { cls: "danger", delay: 4000 });
                                  console.log("overqty");
                                  //btn.up('.window').close();
                                  return;
                                }
                              }
                              if (MAIN_dtval.NONFG === "0" || MAIN_dtval.NONFG === true) {
                                //myHeaderForm.setValues("PART_MPQ") = qtyRequired;
                                myHeaderForm.getForm().findField('PART_MPQ').setValue(qtyRequired);
                                MAIN_dtval.PART_MPQ = qtyRequired;
                                console.log(MAIN_dtval.PART_MPQ);
                              }
                              GRIDLot_no.getStore().add({
                                NOMORAJU: MAIN_dtval.NOMORAJU,
                                SERIBARANG: MAIN_dtval.SERIBARANG,
                                NOMORDOKUMEN: MAIN_dtval.NOMORDOKUMEN,
                                ARTICLE_CODE: MAIN_dtval.ARTICLE_CODE,
                                PART_MPQ: MAIN_dtval.PART_MPQ,
                                PALLET_NO: MAIN_dtval.PALLET_NO,
                                LOT_NO: MAIN_dtval.LOT_NO,
                                NONFG: MAIN_dtval.NONFG,
                                //RCV_INPUT: MAIN_dtval.RCV_INPUT,
                              });
                              GRIDLot_no.getStore().commitChanges();
                              GRIDLot_no.getView().refresh();
                              Ext.getCmp("NO_BUKTI").setValue('');
                              Ext.getCmp("NO_DRAFT").setValue('');
                            }
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],

          },

          { xtype: "tbspacer", height: 10 },
          {
            xtype: "container",
            flex: 1,
            items: [{ xtype: GRIDPicking_list }],

          },

        ],

        dockedItems: [
          {
            xtype: "toolbar",
            height: 30,
            dock: "top",
            items: [
              { xtype: "tbspacer", width: 10 },
              {
                xtype: "button",
                text: "Save",
                pid: "popup_addpicking_list_save",
                icon: vconfig.getstyle + "icon/save.gif",
                tooltip: "SAVE PICKING LIST ",
                handler: function (btn) {
                  var GRID = Ext.ComponentQuery.query("FRMinv_material_in_aw grid[pid=GRIDFRMinv_material_in_aw]")[0];
                  var vdt = GRID.getSelectionModel().getSelection()[0].data;
                  //var formInvoice = Ext.ComponentQuery.query("popup_addlotno form[pid=InvoiceHeader]")[0];
                  var formInvoice = Ext.ComponentQuery.query("FRMinv_material_in_aw form")[0];
                  var Invoice_data = formInvoice.getValues(false, false, false, true);
                  var TANGGAL_RCV = Ext.ComponentQuery.query("FRMinv_material_in_aw datefield[name=TANGGAL_RCV]")[0];

                  var NOMORAJU = Invoice_data.NOMORAJU;
                  //var VENDORS = Invoice_data.VENDOR;

                  var jsonLOTNO = [];
                  GRIDLot_no.getStore().each(function (record) {
                    jsonLOTNO.push({
                      TIPE: vdt.TIPE,
                      KODEBARANG: vdt.KODEBARANG,
                      HS: vdt.HS,
                      JUMLAHSATUAN: vdt.JUMLAHSATUAN,
                      RECEVING_QTY: vdt.RCV_INPUT,
                      NOMORAJU: record.data.NOMORAJU,
                      SERIBARANG: record.data.SERIBARANG,
                      NOMORDOKUMEN: vdt.NOMORDOKUMEN,
                      ARTICLE_CODE: record.data.ARTICLE_CODE,
                      PART_MPQ: record.data.PART_MPQ,
                      PALLET_NO: record.data.PALLET_NO,
                      LOT_NO: record.data.LOT_NO,
                      VENDOR: Invoice_data.VENDOR,
                      TANGGALDOKUMEN: Invoice_data.TANGGALDOKUMEN,
                      NONFG: record.data.NONFG,
                    });
                    //jsonLOTNO.push((record.data));
                    console.log(GRIDLot_no.getStore());
                  });
                  var params = Ext.encode({
                    method: "save_list_picking_list",
                    VNOMORAJU: NOMORAJU,
                    VJSONDATA: Ext.encode(jsonLOTNO),
                    VRECEIVEDATE: moment(TANGGAL_RCV.getValue()).format("YYYY-MM-DD"),
                    VMODE: "MANUAL BC",
                  });

                  var hasil = COMP.run.getservice(vconfig.service_api + "goods_in/goods_in", params, "POST", me.var_global.jwt);
                  hasil.then(function (content) {
                    var val = Ext.decode(content, true);
                    if (val.success === "true") {
                      COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 3000 });
                      btn.up('.window').close();
                      GRID.getStore().load();
                      GRID.getView().refresh();
                    } else {
                      COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 3000 });
                      btn.up('.window').close();
                      GRID.getStore().load();
                      GRID.getView().refresh();
                    }
                  }, this);

                  console.log(jsonLOTNO);
                },
              },
            ],
          },
        ],
      }
      );
      COMP.run.getmodulepopup("popup_addpicking_list", popup, this.getView());
    } catch (err) {
      COMP.TipToast.toast("Error", err.message, { cls: "danger", delay: 2000 });
      console.log(rowIndex);
    }
  },
  btsearch_picking_click: function (btn) {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var GRIDFRM_good_picking_list = Ext.ComponentQuery.query("FRMgoods_stuffing_details grid[pid=GRIDFRM_good_picking_list]")[0];
      var custNo = Ext.ComponentQuery.query("FRMgoods_stuffing_details field[pid=CODE_CUSTOMER]")[0].value;

      var GRIDPicking = Ext.create("NJC.INVENTORY_PLB.goods_in.GRIDPicking_list", {
        store: {
          autoLoad: true,
          autoSync: false,
          remoteSort: true,
          remoteFilter: true,
          pageSize: 20,

          fields: [
            { name: "NO_DRAFT", type: "string" },
            { name: "NO_BUKTI", type: "string" },
            { name: "TANGGAL", type: "string" },
            { name: "CUSTOMER_INVOICE", type: "string" },
            { name: "QTY_PICKING", type: "int" },
          ],
          proxy: {
            type: "ajax",
            disableCaching: false,
            noCache: false,
            headers: { Authorization: "Bearer " + me.var_global.jwt },
            actionMethods: { read: "POST" },
            url: vconfig.service_api + "goods_stuffing/goods_stuffings",
            reader: {
              type: "json",
              rootProperty: "Rows",
              totalProperty: "TotalRows",
              successProperty: "success",
            },
            extraParams: {
              method: "read_list_source_picking",
              CODE_CUSTOMER: custNo,
            },
          },
          listeners: {
            itemdblclick: "GRIDpopup_list_source_itemdblclick",
          },
          /*listeners: {
              beforeload: function (store, operation, eOpts) {
                  operation.setParams({
                  });
              },
          },*/
        },
      });

      var popup = Ext.define("NJC.INVENTORY_PLB.goods_in.popup_list_source", {
        extend: "Ext.window.Window",
        alias: "widget.popup_list_source",
        reference: "popup_list_source",
        title: "Search Picking Data",
        modal: true,
        closeAction: "hide",
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
                          NO_DRAFT: dtselect.NO_DRAFT,
                          NO_BUKTI: dtselect.NO_BUKTI,
                          TANGGAL: dtselect.TANGGAL,
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
  add_lot_no: function (xgrid, rowIndex) {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var FRM_MAIN = Ext.ComponentQuery.query("FRMinv_material_in_aw form")[0];
      var MAIN_dtval = FRM_MAIN.getValues(false, false, false, true);
      if (MAIN_dtval.CBO_SOURCE === "picking" || MAIN_dtval.CBO_SOURCE != null) {
        this.add_picking_list(xgrid, rowIndex);
        return;
      }
      xgrid.getSelectionModel().select(rowIndex);
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var GRID = Ext.ComponentQuery.query("FRMinv_material_in_aw grid[pid=GRIDFRMinv_material_in_aw]")[0];
      var vdt = GRID.getSelectionModel().getSelection()[0].data;
      var KODE_BARANG = vdt.KODEBARANG;
      var ARTICLE_CODE = vdt.ARTICLE_CODE;

      /* defining model FOR INVOICE/DOC BC */
      /*
      var barangHeader = Ext.create('BarangHeader', {
        extends: 'Ext.data.Model',
        fields: [
          { name: "NOMORAJU", type: "string" },
          { name: "SERIBARANG", type: "string" },
          { name: "NOMORDOKUMEN", type: "string" },
          { name: "ARTICLE_CODE", type: "string" },
          { name: "PART_MPQ", type: "float" },
          { name: "LOT_NO", type: "string" },
        ],
      }
 
      );*/
      var GRIDLot_no = Ext.create("NJC.INVENTORY_PLB.goods_in.GRIDLot_no", {
        store: {
          autoLoad: true,
          autoSync: false,
          remoteSort: true,
          remoteFilter: true,
          pageSize: 30,
          viewConfig: {
            enableTextSelection: true,
            getRowClass: function (record) {
              //console.log(this.getRowClass.getValue());
              return record.get("NONFG") === "1" || record.get("NONFG") === "true" ? "gridrow-bold" : "";
            },
          },
          fields: [
            { name: "NOMORAJU", type: "string" },
            { name: "SERIBARANG", type: "string" },
            { name: "NOMORDOKUMEN", type: "string" },
            { name: "ARTICLE_CODE", type: "string" },
            { name: "PART_MPQ", type: "float" },
            { name: "PALLET_NO", type: "string" },
            { name: "LOT_NO", type: "string" },
          ],
          proxy: {
            type: "ajax",
            disableCaching: false,
            noCache: false,
            headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
            actionMethods: { read: "POST" },
            url: vconfig.service_api + "goods_in/goods_ins",
            extraParams: {
              method: "load_list_lotno",
            },
            reader: {
              type: "json",
              rootProperty: "Rows",
              totalProperty: "TotalRows",
              successProperty: "success",
            },
          },
          listeners: {
            beforeload: function (store, operation, eOpts) {
              var me = this;
              var GRID = Ext.ComponentQuery.query("FRMinv_material_in_aw grid[pid=GRIDFRMinv_material_in_aw]")[0];
              var vdt = GRID.getSelectionModel().getSelection()[0].data;
              operation.setParams({
                ARTICLE_CODE: vdt.ARTICLE_CODE,
                NOMOR_AJU: vdt.NOMORAJU,
                SERIBARANG: vdt.SERIBARANG,
              });
              //GRIDLot_no.store().load();
            }
          },
          /*listeners: {
              beforeload: function (store, operation, eOpts) {
                  operation.setParams({
                  });
              },
          },*/
        },
      });
      var popup = Ext.define("NJC.INVENTORY_PLB.goods_in.popup_addlotno", {
        extend: "Ext.window.Window",
        alias: "widget.popup_addlotno",
        reference: "popup_addlotno",
        title: "Add LotNo " + ARTICLE_CODE,
        modal: true,
        closeAction: "destroy",
        centered: true,
        autoScroll: false,
        width: mainpanel.getWidth() * 0.7,
        height: mainpanel.getHeight() * 0.7,
        layout: { type: "vbox", pack: "start", align: "stretch" },
        bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
        items: [
          {
            xtype: "container",
            layout: { type: "vbox", pack: "start", align: "stretch" },
            bodyPadding: "5 5 5 5",
            items: [
              {
                xtype: "form",
                bodyPadding: "5 5 5 5",
                pid: "InvoiceHeader",
                fieldDefaults: {
                  labelAlign: "left",
                  labelWidth: 70,
                  margin: "0 10 5 0",
                },
                border: false,
                layout: { type: "hbox", pack: "start", align: "stretch" },
                items: [
                  {
                    xtype: "container",
                    layout: { type: "vbox", pack: "start", align: "stretch" },
                    bodyPadding: "5 5 5 5",
                    items: [
                      {
                        xtype: "container",
                        layout: { type: "hbox", pack: "start", align: "stretch" },
                        flex: 1,
                        items: [
                          { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "NOMORAJU", name: "NOMORAJU", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "NOMORAJU", value: vdt.NOMORAJU },
                          { xtype: "tbspacer", width: 10 },

                          { xtype: "textfield", labelWidth: 100, width: 200, fieldLabel: "DOKUMEN", name: "NOMORDOKUMEN", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "DOKUMEN", value: vdt.NOMORDOKUMEN },
                          { xtype: "tbspacer", width: 10 },

                          { xtype: "textfield", labelWidth: 100, width: 200, fieldLabel: "SERIBARANG", name: "SERIBARANG", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "SERI BARANG", value: vdt.SERIBARANG },
                        ],
                      },
                      {
                        xtype: "container",
                        layout: "hbox",
                        items: [
                          { xtype: "textfield", labelWidth: 100, width: 200, fieldLabel: "ARTICLE_CODE", name: "ARTICLE_CODE", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "ARTICLE CODE", value: ARTICLE_CODE },
                          { xtype: "tbspacer", width: 10 },

                          { xtype: "textfield", labelWidth: 100, width: 200, fieldLabel: "PART_MPQ", name: "PART_MPQ", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "MPQ", value: vdt.PART_MPQ },
                          { xtype: "tbspacer", width: 10 },

                          { xtype: "textfield", labelWidth: 100, width: 200, fieldLabel: "REQUIRED", name: "RCV_INPUT", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "REQUIRED", value: vdt.JUMLAHSATUAN },
                        ],
                      },

                      { xtype: "tbspacer", height: 10 },

                      {
                        xtype: "container",
                        layout: "hbox",
                        items: [
                          { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "ADD PALLET NO", id: "PALLET_NO", name: "PALLET_NO", enforceMaxLength: true, emptyText: "ADD PALLET NO", tabIndex: "1", enableKeyEvents: true, allowBlank: false, },
                          { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "ADD LOT NO", name: "LOT_NO", id: "LOT_NO", enforceMaxLength: true, emptyText: "ADD LOT NO", tabIndex: "2", enableKeyEvents: true, allowBlank: false, },
                          { xtype: "tbspacer", width: 10 },
                          {
                            xtype: "checkbox", fieldLabel: "NON-FG", name: "NONFG", width: 100, labelWidth: 50
                          },
                          {
                            xtype: "button",
                            pid: "bt_add_to_grid",
                            module: "goods_in",
                            popupwidth: 900,
                            tofield: {
                              ID_HEADER_ORI: "ID_HEADER_ORI",
                              NOMOR_AJU: "NOMOR_AJU",
                              DOKUMEN: "URAIAN_DOKUMEN",
                            },
                            icon: vconfig.getstyle + "icon/add.ico",
                            tooltip: "add",
                            handler: function (btn) {
                              var myHeaderForm = Ext.ComponentQuery.query("popup_addlotno form[pid=InvoiceHeader]")[0];
                              var MAIN_dtval = myHeaderForm.getValues(false, false, false, true);
                              var qtytoAdd = parseFloat(MAIN_dtval.PART_MPQ);
                              var qtyRequired = parseFloat(vdt.JUMLAHSATUAN);
                              var currentRCV = GRIDLot_no.getStore().sum("PART_MPQ");
                              console.log(currentRCV);
                              console.log(qtyRequired);
                              console.log(qtytoAdd);
                              if (MAIN_dtval.ARTICLE_CODE === "" || MAIN_dtval.ARTICLE_CODE === null) {
                                COMP.TipToast.toast("Error", "SILAHKAN MAPPING PART TERLEBIH DULU", { cls: "danger", delay: 4000 });
                                btn.up('.window').close();
                                return;
                              }
                              if (MAIN_dtval.NONFG === "0" || MAIN_dtval.NONFG === false) {
                                if (qtyRequired - (parseFloat(currentRCV) + qtytoAdd) < 0) {
                                  COMP.TipToast.toast("Error", "QTY yg di input melebihi kebutuhan", { cls: "danger", delay: 4000 });
                                  console.log("overqty");
                                  //btn.up('.window').close();
                                  return;
                                }
                              }
                              if (MAIN_dtval.NONFG === "0" || MAIN_dtval.NONFG === true) {
                                //myHeaderForm.setValues("PART_MPQ") = qtyRequired;
                                myHeaderForm.getForm().findField('PART_MPQ').setValue(qtyRequired);
                                MAIN_dtval.PART_MPQ = qtyRequired;
                                console.log(MAIN_dtval.PART_MPQ);
                              }
                              GRIDLot_no.getStore().add({
                                NOMORAJU: MAIN_dtval.NOMORAJU,
                                SERIBARANG: MAIN_dtval.SERIBARANG,
                                NOMORDOKUMEN: MAIN_dtval.NOMORDOKUMEN,
                                ARTICLE_CODE: MAIN_dtval.ARTICLE_CODE,
                                PART_MPQ: MAIN_dtval.PART_MPQ,
                                PALLET_NO: MAIN_dtval.PALLET_NO,
                                LOT_NO: MAIN_dtval.LOT_NO,
                                NONFG: MAIN_dtval.NONFG,
                                //RCV_INPUT: MAIN_dtval.RCV_INPUT,
                              });
                              GRIDLot_no.getStore().commitChanges();
                              GRIDLot_no.getView().refresh();
                              Ext.getCmp("PALLET_NO").setValue('');
                              Ext.getCmp("LOT_NO").setValue('');
                            }
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],

          },

          { xtype: "tbspacer", height: 10 },
          {
            xtype: "container",
            flex: 1,
            items: [{ xtype: GRIDLot_no }],

          },

        ],

        dockedItems: [
          {
            xtype: "toolbar",
            height: 30,
            dock: "top",
            items: [
              { xtype: "tbspacer", width: 10 },
              {
                xtype: "button",
                text: "Save",
                pid: "popup_addlotno_save",
                icon: vconfig.getstyle + "icon/save.gif",
                tooltip: "SAVE LOTNO ",
                handler: function (btn) {
                  var GRID = Ext.ComponentQuery.query("FRMinv_material_in_aw grid[pid=GRIDFRMinv_material_in_aw]")[0];
                  var vdt = GRID.getSelectionModel().getSelection()[0].data;
                  //var formInvoice = Ext.ComponentQuery.query("popup_addlotno form[pid=InvoiceHeader]")[0];
                  var formInvoice = Ext.ComponentQuery.query("FRMinv_material_in_aw form")[0];
                  var Invoice_data = formInvoice.getValues(false, false, false, true);
                  var TANGGAL_RCV = Ext.ComponentQuery.query("FRMinv_material_in_aw datefield[name=TANGGAL_RCV]")[0];

                  var NOMORAJU = Invoice_data.NOMORAJU;
                  //var VENDORS = Invoice_data.VENDOR;

                  var jsonLOTNO = [];
                  GRIDLot_no.getStore().each(function (record) {
                    jsonLOTNO.push({
                      TIPE: vdt.TIPE,
                      KODEBARANG: vdt.KODEBARANG,
                      HS: vdt.HS,
                      JUMLAHSATUAN: vdt.JUMLAHSATUAN,
                      RECEVING_QTY: vdt.RCV_INPUT,
                      NOMORAJU: record.data.NOMORAJU,
                      SERIBARANG: record.data.SERIBARANG,
                      NOMORDOKUMEN: vdt.NOMORDOKUMEN,
                      ARTICLE_CODE: record.data.ARTICLE_CODE,
                      PART_MPQ: record.data.PART_MPQ,
                      PALLET_NO: record.data.PALLET_NO,
                      LOT_NO: record.data.LOT_NO,
                      VENDOR: Invoice_data.VENDOR,
                      TANGGALDOKUMEN: Invoice_data.TANGGALDOKUMEN,
                      NONFG: record.data.NONFG,
                    });
                    //jsonLOTNO.push((record.data));
                    console.log(GRIDLot_no.getStore());
                  });
                  var params = Ext.encode({
                    method: "save_list_lotno",
                    VNOMORAJU: NOMORAJU,
                    VJSONDATA: Ext.encode(jsonLOTNO),
                    VRECEIVEDATE: moment(TANGGAL_RCV.getValue()).format("YYYY-MM-DD"),
                    VMODE: "MANUAL BC",
                  });

                  var hasil = COMP.run.getservice(vconfig.service_api + "goods_in/goods_in", params, "POST", me.var_global.jwt);
                  hasil.then(function (content) {
                    var val = Ext.decode(content, true);
                    if (val.success === "true") {
                      COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 3000 });
                      btn.up('.window').close();
                      GRID.getStore().load();
                      GRID.getView().refresh();
                    } else {
                      COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 3000 });
                      btn.up('.window').close();
                      GRID.getStore().load();
                      GRID.getView().refresh();
                    }
                  }, this);

                  console.log(jsonLOTNO);
                },
              },
            ],
          },
        ],
      }
      );
      COMP.run.getmodulepopup("popup_addlotno", popup, this.getView());
    } catch (err) {
      COMP.TipToast.toast("Error", err.message, { cls: "danger", delay: 2000 });
      console.log(rowIndex);
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
          title: "Laporan Goods In",
          fileName: "Laporan Goods In ." + (btn.cfg.ext || btn.cfg.type),
          includeGroups: true,
          includeSummary: true,
        },
        btn.cfg
      );

      var GRID = Ext.ComponentQuery.query("goods_in GRIDgoods_in grid[pid=GRIDgoods_in]")[0];

      var store = GRID.getStore();

      store.setPageSize(0);

      store.load({
        callback: function (records, operation, success) {
          if (success) {
            GRID.saveDocumentAs(cfg);
            store.setPageSize(GRID.pageSize);
            store.load({
              callback: function () {
                Ext.MessageBox.hide();
              }
            })

          } else {
            COMP.TipToast.toast("Error", "Failed load to server", { cls: "danger", delay: 2000 });
          }
        }
      });
    } catch (ex) {

      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },

  btsearch_receipt_click: function () {
    try {
      var me = this;
      var FRM = Ext.ComponentQuery.query("goods_in FRMinv_material_in_manual form")[0];
      //var MAIN_dtval = FRM.getValues(false, false, false, true);
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var popup = Ext.define("NJC.SYNCHRONIZE.goods_in.popup_receipt", {
        extend: "Ext.window.Window",
        alias: "widget.popup_receipt",
        reference: "popup_receipt",
        title: "Pilih Receipt Dokumen",
        modal: true,
        closeAction: "destroy",
        centered: true,
        width: mainpanel.getWidth() * 0.5,
        height: mainpanel.getHeight() * 0.7,
        layout: { type: "vbox", pack: "start", align: "stretch" },
        bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
        items: [
          {
            xtype: "grid",
            pid: "GRIDpopup_receipt_select",
            emptyText: "No Matching Records",
            autoScroll: true,
            flex: 1,
            plugins: ["filterfield"],
            viewConfig: {
              enableTextSelection: true,
            },
            store: {
              autoLoad: true,
              remoteSort: false,
              remoteFilter: false,
              pageSize: 0,
              proxy: {
                type: "ajax",
                disableCaching: false,
                noCache: false,
                headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
                actionMethods: { read: "POST" },
                url: vconfig.service_api + "goods_in/goods_ins",
                extraParams: {
                  method: "read_select_receipt",
                  module: "aw",
                  //KODE_INTERNAL: MAIN_dtval.KODE_INTERNAL,
                },
                reader: {
                  type: "json",
                  rootProperty: "Rows",
                  totalProperty: "TotalRows",
                  successProperty: "success",
                },
              },
            },
            selType: "checkboxmodel",
            simpleSelect: true,
            columns: [
              { header: "INVOICE", dataIndex: "INVOICE_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
              { header: "INVOICE DATE", dataIndex: "INVOICE_DATE", sortable: true, width: 100, filter: { xtype: "textfield" } },
              { header: "NO KED", dataIndex: "NO_KED", sortable: true, width: 100, filter: { xtype: "textfield" } },
              { header: "BL", dataIndex: "BL_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
              { header: "BL DATE", dataIndex: "BL_DATE", sortable: true, width: 100, filter: { xtype: "textfield" } },
              { header: "CUR MONEY", dataIndex: "CURRENT_MONEY", sortable: true, width: 100, filter: { xtype: "textfield" } },
              { header: "CARA BAYAR", dataIndex: "CARA_BAYAR", sortable: true, width: 100, filter: { xtype: "textfield" } },
            ],
            tbar: ["-", { xtype: "button", pid: "btselect_recepit_doc", text: "Pilih Invoice", icon: vconfig.getstyle + "icon/check.png", tooltip: "Pilih Invoice" }],
            bbar: {
              xtype: "pagingtoolbar",
              displayInfo: true,
              displayMsg: "Total Data {2}",
              emptyMsg: "No topics to display",
            },
            listeners: {
              itemdblclick: "select_receipt_doc",
            },
          },
        ],
      });
      COMP.run.getmodulepopup("popup_invoice", popup, this.getView());
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btselect_receipt_doc_click: function () {
    try {
      var me = this;
      var popup = Ext.ComponentQuery.query("popup_invoice")[0];
      var FRM = Ext.ComponentQuery.query("aw_dokumen_draft FRMdokumen_draft")[0];
      var GRIDsumberdata = Ext.ComponentQuery.query("aw_dokumen_draft FRMdokumen_draft grid[pid=GRIDsumberdata]")[0];
      var GRIDinvoicedata = Ext.ComponentQuery.query("aw_dokumen_draft FRMdokumen_draft grid[pid=GRIDinvoice_dokumen_draft]")[0];
      var GRIDhasilgenerate = Ext.ComponentQuery.query("aw_dokumen_draft FRMdokumen_draft grid[pid=GRIDhasilgenerate]")[0];
      var MAIN_dtval = FRM.getValues(false, false, false, true);
      var GRIDinvoice = Ext.ComponentQuery.query("popup_invoice grid[pid=GRIDpopup_invoice_select]")[0];
      var dtselect = GRIDinvoice.getSelectionModel().getSelection();
      var list_invoice = [];
      Ext.each(dtselect, function (item) {
        list_invoice.push({
          INVOICE_NO: item.data.INVOICE_NO,
        });
      });
      var params = Ext.encode({
        method: "SP_AW_DRAFT_SELECT_INVOICE",
        module: "aw",
        invoice: Ext.encode(list_invoice),
        vendor: MAIN_dtval.KODE_INTERNAL,
      });
      var hasil = COMP.run.getservice(vconfig.service_api + "sync_doc_aw/sync_doc_aw", params, "POST", me.var_global.jwt);
      hasil.then(function (content) {
        var val = Ext.decode(content, true);
        if (val.success == "true") {
          COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 2000 });
          var vsumberdata = Ext.decode(val.vjson_sumberdata);
          var vinvoicedata = Ext.decode(val.vjson_invoice);
          var STGRIDsumberdata = new Ext.data.Store({
            data: vsumberdata,
          });
          var STGRIDinvoicedata = new Ext.data.Store({
            data: vinvoicedata,
          });
          GRIDsumberdata.reconfigure(STGRIDsumberdata);
          GRIDinvoicedata.reconfigure(STGRIDinvoicedata);
          popup.close();
        } else {
          COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 2000 });
        }
      }, this);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});
