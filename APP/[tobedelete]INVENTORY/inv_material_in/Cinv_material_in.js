Ext.define("TDK.INVENTORY.inv_material_in.Cinv_material_in", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cinv_material_in",
  init: function (view) {
    this.control({
      "inv_material_in button[pid=btreceiving_manual]": { click: this.btnew_click },
      "inv_material_in button[pid=btreceiving_integrasi]": { click: this.btreceiving_integrasi_click },
      "inv_material_in button[pid=btrefresh_main]": { click: this.btrefresh_main_click },

      "FRMinv_material_in button[pid=btsearch]": { click: this.btsearch_click },
      "FRMinv_material_in combobox[name=CBO_SOURCE]": { change: this.CBO_SOURCE_change },
      "FRMinv_material_in_pis button[pid=pisbtprocess_synchronize]": { click: this.pisbtprocess_synchronize_click },
      "FRMinv_material_in_pis datefield[name=TANGGAL_RCV]": { change: this.pisbtrefresh_click },
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
  formatqty: function (value) {
    var text = Ext.util.Format.number(value, "0,000.00/i");
    return text;
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
  GRIDinv_material_in_load: function (grid) {
    try {
      var me = this;
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btrefresh_main_click: function () {
    try {
      var me = this;
      var GRID = Ext.ComponentQuery.query("inv_material_in GRIDinv_material_in grid[pid=GRIDinv_material_in]")[0];
      GRID.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btnew_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

      COMP.run.getmodulepopup("FRMinv_material_in", "TDK.INVENTORY.inv_material_in.FRMinv_material_in", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btreceiving_integrasi_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("FRMinv_material_in_pis", "TDK.INVENTORY.inv_material_in.FRMinv_material_in_pis", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btsearch_click: function (btn) {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var FRM_MAIN = Ext.ComponentQuery.query("FRMinv_material_in form")[0];
      var MAIN_dtval = FRM_MAIN.getValues(false, false, false, true);
      if (MAIN_dtval.CBO_SOURCE === "" || MAIN_dtval.CBO_SOURCE === null) {
        COMP.TipToast.toast("Error", "Pilih Sumber Data lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      var popup = Ext.define("TDK.INVENTORY.inv_material_in.popup_list_source", {
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
                url: vconfig.service_api + "inv_material_in/inv_material_ins",
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
              { header: "NAMA", dataIndex: "NAMA", sortable: true, width: 300, filter: { xtype: "textfield" } },
              { header: "INVOICE", dataIndex: "INVOICE_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
              { header: "BC TYPE", dataIndex: "BC_TYPE", sortable: true, width: 65, filter: { xtype: "textfield" } },
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
      var FRM_MAIN = Ext.ComponentQuery.query("FRMinv_material_in form")[0];
      var GRID = Ext.ComponentQuery.query("FRMinv_material_in grid[pid=GRIDFRMinv_material_in]")[0];
      var MAIN_dtval = FRM_MAIN.getValues(false, false, false, true);
      var params = Ext.encode({
        method: "receiving_select_aju",
        module: MAIN_dtval.CBO_SOURCE,
        nomor_aju: rec.data.NOMOR_AJU,
      });
      var hasil = COMP.run.getservice(vconfig.service_api + "inv_material_in/inv_material_in", params, "POST", me.var_global.jwt);
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
  FRMinv_material_in_btsave_click: function (btn) {
    try {
      var me = this;
      var popup = Ext.ComponentQuery.query("FRMinv_material_in")[0];
      var FRM_MAIN = Ext.ComponentQuery.query("FRMinv_material_in form")[0];
      var MAIN_dtval = FRM_MAIN.getValues(false, false, false, true);
      var GRID = Ext.ComponentQuery.query("FRMinv_material_in grid[pid=GRIDFRMinv_material_in]")[0];
      var GRIDmain = Ext.ComponentQuery.query("GRIDinv_material_in grid[pid=GRIDinv_material_in]")[0];
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
      var checkmapping_part = GRID.getStore().queryBy(function (record) {
        return record.get("MAPP_PARTNO") === null;
      });
      if (checkmapping_part.length > 0) {
        COMP.TipToast.toast("Error", "Terdapat <b>" + checkmapping_part.length + " Item/Part </b> yang belum dilakukan proses mapping", { cls: "danger", delay: 2000 });
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
            var hasil = COMP.run.getservice(vconfig.service_api + "inv_material_in/inv_material_in", params, "POST", me.var_global.jwt);
            hasil.then(function (content) {
              var val = Ext.decode(content, true);
              if (val.success === "true") {
                popup.close();
                GRIDmain.getStore().load();
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
      var GRID = Ext.ComponentQuery.query("FRMinv_material_in grid[pid=GRIDFRMinv_material_in]")[0];
      GRID.getStore().removeAll();
      GRID.getStore().commitChanges();
      var FRM_MAIN = Ext.ComponentQuery.query("FRMinv_material_in form")[0];
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
  btdetail_rows_click: function (xgrid, rowIndex) {
    try {
      var me = this;
      var vdt = xgrid.getStore().getAt(rowIndex).data;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("receiving_detail", "TDK.INVENTORY.inv_material_in.receiving_detail.receiving_detail", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  edit_header: function (frm, xdtedit) {
    try {
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  pisbtrefresh_click: function () {
    try {
      var GRID = Ext.ComponentQuery.query("FRMinv_material_in_pis grid[pid=GRIDinv_material_in_pis]")[0];
      GRID.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  pisbtprocess_synchronize_click: function () {
    try {
      var me = this;
      var vrcvdate = Ext.ComponentQuery.query("FRMinv_material_in_pis datefield[name=TANGGAL_RCV] ")[0];
      var GRID = Ext.ComponentQuery.query("FRMinv_material_in_pis grid[pid=GRIDinv_material_in_pis]")[0];
      var popup = Ext.ComponentQuery.query("FRMinv_material_in_pis")[0];
      if (GRID.getStore().getDataSource().length === 0) {
        COMP.TipToast.toast("Error", "Data Receipt tidak ada", { cls: "danger", delay: 2000 });
        return false;
      }
      var Vgridinput = [];
      GRID.getStore()
        .getDataSource()
        .each(function (record) {
          if (record.data.PIS_QTY <= record.data.QTY && (record.data.RCV_QTY === null || record.data.PIS_QTY < record.data.RCV_QTY)) {
            var vrec = record.data;
            var Vqty = record.data.RCV_QTY === null ? parseFloat(record.data.PIS_QTY) : parseFloat(record.data.PIS_QTY) - parseFloat(record.data.RCV_QTY);
            Vgridinput.push({
              INVOICE_NO: vrec.INVOICE_NO,
              MODE_SOURCE: vrec.MODE_SOURCE,
              MAPP_PARTNO: vrec.PART_NO,
              PART_NO: vrec.PIS_PART_CODE,
              TOTAL_QTY: vrec.QTY,
              QTY: Vqty,
              BC_TYPE: vrec.BC_TYPE,
              NOMOR_AJU: vrec.NOMOR_AJU,
              TANGGAL_AJU: vrec.TANGGAL_AJU,
              NOMOR_DAFTAR: vrec.NOMOR_DAFTAR,
              TANGGAL_DAFTAR: vrec.TANGGAL_DAFTAR,
            });
          }
        });
      console.log(Vgridinput);
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
              method: "read_integrasi_pis",
              module: "proses_data",
              vdate: moment(vrcvdate.getValue()).format("YYYY-MM-DD"),
              vdata: Ext.encode(Vgridinput),
            });
            var hasil = COMP.run.getservice(vconfig.service_api + "inv_material_in/inv_material_in", params, "POST", me.var_global.jwt);
            hasil.then(function (content) {
              var val = Ext.decode(content, true);
              if (val[0].success === "true") {
                GRID.getStore().load();
                COMP.TipToast.toast("Success", val[0].message, { cls: "success", delay: 3000 });
              } else {
                GRID.getStore().load();
                COMP.TipToast.toast("Error", val[0].message, { cls: "danger", delay: 3000 });
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
  btdetail_sumberdata_onclick: function (xgrid, rowIndex) {
    try {
      var me = this;
      xgrid.getSelectionModel().select(rowIndex);
      var gridselect = xgrid.getSelectionModel().getSelection()[0].data;
      var popup = Ext.define("TDK.INVENTORY.inv_material_in.popup_list_databeda", {
        extend: "Ext.window.Window",
        alias: "widget.popup_list_databeda",
        reference: "popup_list_databeda",
        title: "Detail Sumber Data",
        modal: true,
        closeAction: "destroy",
        centered: true,
        autoScroll: true,
        width: mainpanel.getWidth() * 0.6,
        height: mainpanel.getHeight() * 0.8,
        layout: { type: "vbox", pack: "start", align: "stretch" },
        bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
        items: [
          {
            xtype: "form",
            layout: "hbox",
            border: false,
            frame: false,
            bodyPadding: "5 0 0 5",
            fieldDefaults: {
              labelAlign: "left",
              labelWidth: 90,
              margin: "0 10 5 0",
            },
            items: [
              {
                xtype: "fieldset",
                layout: "hbox",
                flex: 1,
                frame: false,
                border: false,
                bodyPadding: "5 0 0 0",
                items: [
                  {
                    xtype: "container",
                    layout: "vbox",
                    margin: "5 0 0 0",
                    items: [
                      {
                        xtype: "container",
                        layout: "hbox",
                        items: [
                          //
                          { xtype: "datefield", labelWidth: 100, fieldLabel: "Receipt Date", width: 220, name: "RECEIPTDATE", fieldCls: "fieldinput", format: "Y-m-d", readOnly: true, value: gridselect.PIS_RECEIPT_DATE },
                        ],
                      },
                      {
                        xtype: "container",
                        layout: "hbox",
                        items: [{ xtype: "textfield", labelWidth: 100, width: 400, fieldLabel: "Invoice", name: "INVOICE", fieldCls: "fieldinput", readOnly: true, value: gridselect.PIS_PACKINGLISTNO }],
                      },
                      {
                        xtype: "container",
                        layout: "hbox",
                        items: [{ xtype: "textfield", labelWidth: 100, width: 400, fieldLabel: "Part No", name: "PARTCODE", fieldCls: "fieldinput", readOnly: true, value: gridselect.PIS_PART_CODE }],
                      },
                      {
                        xtype: "container",
                        layout: "hbox",
                        items: [{ xtype: "textfield", labelWidth: 100, width: 400, fieldLabel: "Qty", name: "QTY", fieldCls: "fieldinput", readOnly: true, value: me.formatqty(gridselect.PIS_QTY) }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            xtype: "grid",
            pid: "GRIDinv_material_in_pis",
            emptyText: "No Matching Records",
            margin: "2 2 2 2",
            flex: 1,
            plugins: [
              "filterfield",
              {
                ptype: "cellediting",
                clicksToEdit: 1,
              },
            ],
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
                headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
                actionMethods: { read: "POST" },
                url: vconfig.service_api + "inv_material_in/inv_material_ins",
                extraParams: {
                  method: "read_integrasi_pis",
                  module: "read_data_beda",
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
                  try {
                    operation.setParams({
                      vdate: gridselect.PIS_RECEIPT_DATE,
                      vdata: Ext.encode(gridselect),
                    });
                  } catch (ex) {
                    COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                  }
                },
              },
            },
            columns: [
              {
                text: "SUMBER DATA",
                columns: [
                  { xtype: "rownumberer", width: 50 },
                  {
                    xtype: "actioncolumn",
                    width: 35,
                    align: "center",
                    menuDisabled: true,
                    sortable: false,
                    items: [
                      {
                        icon: vconfig.getstyle + "icon/grid.png",
                        handler: "btdetail_sumberdata_onclick",
                        tooltip: "Detail Sumber Data Dokumen",
                      },
                    ],
                  },
                  { sortable: true, width: 65, filter: { xtype: "textfield" }, header: "SOURCE", dataIndex: "MODE_SOURCE" },
                  { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "INVOICE", dataIndex: "INVOICE_NO" },
                  { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "PART NO", dataIndex: "PART_NO" },
                  { sortable: true, width: 80, align: "right", renderer: "formatqty", header: "QTY", dataIndex: "QTY" },
                ],
              },
            ],
            bbar: {
              xtype: "pagingtoolbar",
              displayInfo: true,
              displayMsg: "Displaying topics {0} - {1} of {2}",
              emptyMsg: "No topics to display",
            },
          },
        ],
        dockedItems: [
          {
            xtype: "toolbar",
            height: 30,
            dock: "top",
            items: [
              "-", //
            ],
            // other options....
          },
        ],
      });
      COMP.run.getmodulepopup("popup_list_databeda", popup, this.getView());
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});
