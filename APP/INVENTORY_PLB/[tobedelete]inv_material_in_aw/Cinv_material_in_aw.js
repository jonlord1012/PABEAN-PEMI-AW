Ext.define("TDK.INVENTORY_PLB.inv_material_in_aw.Cinv_material_in_aw", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cinv_material_in_aw",
  init: function (view) {
    this.control({
      "inv_material_in_aw button[pid=btreceiving_manual]": { click: this.btnew_click },
      "inv_material_in_aw button[pid=btreceiving_integrasi]": { click: this.btreceiving_integrasi_click },
      "inv_material_in_aw button[pid=btrefresh_main]": { click: this.btrefresh_main_click },

      "FRMinv_material_in_aw button[pid=btsearch]": { click: this.btsearch_click },
      "FRMinv_material_in_aw combobox[name=CBO_SOURCE]": { change: this.CBO_SOURCE_change },
      "FRMinv_material_in_bicc button[pid=biccbtprocess_synchronize]": { click: this.biccbtprocess_synchronize_click },
      "FRMinv_material_in_bicc datefield[name=TANGGAL_RCV]": { change: this.biccbtrefresh_click },
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
      var GRID = Ext.ComponentQuery.query("inv_material_in_aw GRIDinv_material_in_aw grid[pid=GRIDinv_material_in_aw]")[0];
      GRID.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btnew_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

      COMP.run.getmodulepopup("FRMinv_material_in_aw", "TDK.INVENTORY_AW.inv_material_in_aw.FRMinv_material_in_aw", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btreceiving_integrasi_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("FRMinv_material_in_bicc", "TDK.INVENTORY_AW.inv_material_in_aw.FRMinv_material_in_bicc", mainpanel);
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
      var popup = Ext.define("TDK.INVENTORY_AW.inv_material_in_aw.popup_list_source", {
        extend: "Ext.window.Window",
        alias: "widget.popup_list_source",
        reference: "popup_list_source",
        title: "Search Sumber Data",
        modal: true,
        closeAction: "destroy",
        centered: true,
        autoScroll: true,
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
                url: vconfig.service_api + "inv_material_in_aw/inv_material_in_aws",
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
              { header: "VENDOR", dataIndex: "VENDOR", sortable: true, width: 65, filter: { xtype: "textfield" } },
              { header: "NAMA", dataIndex: "NAMA_VENDOR", sortable: true, width: 300, filter: { xtype: "textfield" } },
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
              xtype: "toolbar",
              height: 30,
              dock: "top",
              // other options....
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
      var params = Ext.encode({
        method: "receiving_select_aju",
        module: MAIN_dtval.CBO_SOURCE,
        nomor_aju: rec.data.NOMOR_AJU,
      });
      var hasil = COMP.run.getservice(vconfig.service_api + "inv_material_in_aw/inv_material_in_aw", params, "POST", me.var_global.jwt);
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
            var hasil = COMP.run.getservice(vconfig.service_api + "inv_material_in_aw/inv_material_in_aw", params, "POST", me.var_global.jwt);
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
  },
  btdetail_aw_rows_click: function (xgrid, rowIndex) {
    try {
      
      xgrid.getSelectionModel().select(rowIndex);
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("receiving_detail_aw", "TDK.INVENTORY_PLB.inv_material_in_aw.receiving_detail.receiving_detail_aw", mainpanel);

    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
       
    }
  },
  receiving_detail_aw_load: function (cmp ) {
    try {
      var GRID = Ext.ComponentQuery.query("inv_material_in_aw GRIDinv_material_in_aw grid[pid=GRIDinv_material_in_aw]")[0];
      var vdt = GRID.getSelectionModel().getSelection()[0].data;
      cmp.setTitle("Tracing Receiving Item, No: " + vdt.RECEIPT_NO);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      console.log(ex.message) ; 
    }
  },
  receiving_detail_aw_link_click: function (cmp, dt) {
    try {
      var vdt = dt.data;
      if (vdt.allowclick !== true) return;
      var vmodulecontrol = vdt.controlname === "" ? vdt.text : vdt.controlname;      
      var vmodulename = vdt.modulename === "" ? vmodulecontrol : vdt.modulename ;
      var id = vmodulecontrol;
      if (vdt.modulename==="") {
        var cls = "TDK.INVENTORY_PLB.inv_material_in_aw.receiving_detail." + vmodulecontrol;
      }else {
        var cls = "TDK.INVENTORY_PLB.inv_material_in_aw.receiving_detail." + vmodulename + "." + vmodulecontrol ;
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
      var GRID = Ext.ComponentQuery.query("FRMinv_material_in_bicc grid[pid=GRIDinv_material_in_bicc]")[0];
      GRID.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  biccbtprocess_synchronize_click: function () {
    try {
      var me = this;
      var popup = Ext.ComponentQuery.query("FRMinv_material_in_bicc")[0];
      var vrcvdate = Ext.ComponentQuery.query("FRMinv_material_in_bicc datefield[name=TANGGAL_RCV] ")[0];
      var GRID = Ext.ComponentQuery.query("FRMinv_material_in_bicc grid[pid=GRIDinv_material_in_bicc]")[0];
      if (GRID.getStore().getDataSource().length === 0) {
        COMP.TipToast.toast("Error", "Data Receipt tidak ada", { cls: "danger", delay: 2000 });
        return false;
      }
      var Vgridinput = [];
      GRID.getStore()
        .getDataSource()
        .each(function (record) {
          if (record.data.RECEIPT_QTY <= record.data.INVOICE_QTY ) {
            var vrec = record.data;
            var Vqty = record.data.RECEIPT_QTY === null ? parseFloat(record.data.RCV_QTY) : parseFloat(record.data.QTY) - parseFloat(record.data.RECEIPT_QTY);
            Vgridinput.push({
              RECEIPT_NO: vrec.RECEIPT_NO , 
              INVOICE_NO: vrec.INVOICE_NO , 
              PART_NO: vrec.PART_NO , 
              MAPP_PARTNO: vrec.MAPP_PARTNO , 
              INVOICE_QTY: vrec.INVOICE_QTY , 
              RECEIPT_QTY: vrec.RECEIPT_QTY , 
              SUMBER_DATA: vrec.SUMBER_DATA , 
              MENU_INPUT: vrec.MENU_INPUT , 
              JENIS_INPUT: vrec.JENIS_INPUT , 
              IS_FROM_AW: vrec.IS_FROM_AW , 
              IS_FROM_AW_SEQNO: vrec.IS_FROM_AW_SEQNO , 
              BC_KURS: vrec.BC_KURS , 
              BC_NDPBM: vrec.BC_NDPBM , 
              BC_HARGA_SATUAN: vrec.BC_HARGA_SATUAN , 
              BC_USD_NDPBM: vrec.BC_USD_NDPBM , 
              BC_USD_HARGA_SATUAN: vrec.BC_USD_HARGA_SATUAN , 
              BC_TYPE: vrec.BC_TYPE , 
              NOMOR_AJU: vrec.NOMOR_AJU , 
              TANGGAL_AJU: vrec.TANGGAL_AJU , 
              NOMOR_DAFTAR: vrec.NOMOR_DAFTAR , 
              TANGGAL_DAFTAR: vrec.TANGGAL_DAFTAR , 
              SUPPLIER_KODE_INTERNAL: vrec.SUPPLIER_KODE_INTERNAL , 
              SUPPLIER_NAME: vrec.SUPPLIER_NAME , 
              RECEIPT_DATE: vrec.RECEIPT_DATE , 
              BARCODE: vrec.BARCODE , 
              SERI_BARANG: vrec.SERI_BARANG , 
              HSCODE: vrec.HSCODE , 
              ID_HEADER_ORI: vrec.ID_HEADER_ORI , 
              ID_HEADER_CEISA_DETAIL: vrec.ID_HEADER_CEISA_DETAIL , 
              HARGA_SATUAN: vrec.HARGA_SATUAN , 
              CIF_DETAIL: vrec.CIF_DETAIL , 
              CIF_RUPIAH_DETAIL: vrec.CIF_RUPIAH_DETAIL , 
              FOB_DETAIL: vrec.FOB_DETAIL , 
              FREIGHT_DETAIL: vrec.FREIGHT_DETAIL , 
              HARGA_INVOICE_DETAIL: vrec.HARGA_INVOICE_DETAIL , 
              HARGA_PENYERAHAN_DETAIL: vrec.HARGA_PENYERAHAN_DETAIL , 
              JUMLAH_SATUAN: vrec.JUMLAH_SATUAN ,               
            });
          }
        });
      console.log(Vgridinput);
      console.log(GRID.getStore().getDataSource());
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
              method: "proses_synchronize_bicc",
              RECEIPT_DATE: moment(vrcvdate.getValue()).format("YYYY-MM-DD"),
              module: "proses_data",
              vdata: Ext.encode(Vgridinput),
            });
            var hasil = COMP.run.getservice(vconfig.service_api + "inv_material_in_aw/inv_material_in_aw", params, "POST", me.var_global.jwt);
            hasil.then(function (content) {
              var val = Ext.decode(content, true);
              if (val.success === "true") {
                popup.close();
                COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 3000 });
              } else {
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
});
