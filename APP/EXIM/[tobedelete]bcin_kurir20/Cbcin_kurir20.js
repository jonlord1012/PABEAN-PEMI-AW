Ext.define("TDK.EXIM.bcin_kurir20.Cbcin_kurir20", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cbcin_kurir20",
  init: function (view) {
    this.control({
      "bcin_kurir20 button[pid=btrefresh]": { click: this.btrefresh_click },
      "bcin_kurir20 combobox[name=CBO_FILTERKEY]": { select: this.btrefresh_click },
      "FRMbcin_kurir20 button[pid=bttambah_dokumen]": { click: this.bttambah_dokumen_click },
      "FRMbcin_kurir20 button[pid=btsearch]": { click: this.btsearch_click },
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
      console.log("load Controller Cbcin_kurir20");
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btrefresh_click: function () {
    try {
      var GRID = Ext.ComponentQuery.query("bcin_kurir20 GRIDbcin_kurir20 grid[pid=GRIDbcin_kurir20]")[0];
      GRID.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btdetail_rows_click: function (xgrid, rowIndex) {
    try {
      xgrid.getSelectionModel().select(rowIndex);
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("FRMbcin_kurir20", "TDK.EXIM.bcin_kurir20.FRMbcin_kurir20", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMbcin_kurir20_load: function (cmp) {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var FRM = cmp.query("form")[0];
      var GRIDdokumen = cmp.query("form grid[pid=GRIDbcin_kurir20_input_dokumen]")[0];
      var GRIDbarang = cmp.query("form grid[pid=GRIDbcin_kurir20_input_item]")[0];
      GRIDdokumen.getStore().removeAll();
      GRIDbarang.getStore().removeAll();

      var GRID = Ext.ComponentQuery.query("bcin_kurir20 GRIDbcin_kurir20 grid[pid=GRIDbcin_kurir20]")[0];
      var vdt = GRID.getSelectionModel().getSelection()[0].data;
      cmp.setTitle("Edit Dokumen No AJU: " + vdt.NOMOR_AJU);

      var params = Ext.encode({
        method: "proses_edit_dokumen",
        NOMOR_AJU: vdt.NOMOR_AJU,
      });
      var hasil = COMP.run.getservice(vconfig.service_api + "bcin_kurir20/bcin_kurir20", params, "POST", me.var_global.jwt);
      hasil.then(function (content) {
        var val = Ext.decode(content, true);
        if (val.success === "true") {
          if (val.vheader !== null) {
            var dtheader = Ext.decode(val.vheader, true);
            FRM.getForm().setValues(dtheader);
            FRM.getForm().setValues({
              COMBO_CARA_ANGKUT: dtheader.KODE_CARA_ANGKUT,
            });
          }

          if (val.vdokumen !== null) {
            var dtdokumen = Ext.decode(val.vdokumen, true);
            GRIDdokumen.getStore().add(dtdokumen);
          }
          if (val.vbarang !== null) {
            var dtbarang = Ext.decode(val.vbarang, true);
            GRIDbarang.getStore().add(dtbarang);
          }
          if (val.vpackinglist !== null) {
            var dtpackinglist = Ext.decode(val.vpackinglist, true);
            FRM.getForm().setValues({
              NOMOR_PACKING_LIST: dtpackinglist.NOMOR_DOKUMEN,
              PACKING_LIST_TANGGAL_DOKUMEN: moment(dtpackinglist.TANGGAL_DOKUMEN).format("YYYY-MM-DD"),
            });
          }
          if (val.vimpor !== null) {
            var dtimpor = Ext.decode(val.vimpor, true);
            FRM.getForm().setValues({
              IMPOR_NOMOR_DOKUMEN: dtimpor.NOMOR_DOKUMEN,
              IMPOR_TANGGAL_DOKUMEN: moment(dtimpor.TANGGAL_DOKUMEN).format("YYYY-MM-DD"),
            });
          }
          if (val.vlc !== null) {
            var dtlc = Ext.decode(val.vlc, true);
            FRM.getForm().setValues({
              LC_NOMOR_DOKUMEN: dtlc.NOMOR_DOKUMEN,
              LC_TANGGAL_DOKUMEN: moment(dtlc.TANGGAL_DOKUMEN).format("YYYY-MM-DD"),
            });
          }
          if (val.vawb !== null) {
            var dtawb = Ext.decode(val.vawb, true);
            FRM.getForm().setValues({
              AWB_NOMOR_DOKUMEN: dtawb.NOMOR_DOKUMEN,
              AWB_TANGGAL_DOKUMEN: moment(dtawb.TANGGAL_DOKUMEN).format("YYYY-MM-DD"),
            });
          }
          COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 3000 });
        } else {
          COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 3000 });
        }
      }, this);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMbcin_kurir20_btcancel_click: function () {
    try {
      var popup = Ext.ComponentQuery.query("FRMbcin_kurir20")[0];
      var GRID = Ext.ComponentQuery.query("bcin_kurir20 GRIDbcin_kurir20 grid[pid=GRIDbcin_kurir20]")[0];
      var FRM_MAIN = Ext.ComponentQuery.query("FRMbcin_kurir20 form")[0];
      var MAIN_dtval = FRM_MAIN.getValues(false, false, false, true);
      var me = this;
      Ext.MessageBox.confirm(
        "Konfirmasi hapus dokumen",
        //
        "<b>Syarat untuk Proses Hapus Dokumen BC: </b>" +
          //
          "<ol>" +
          "<li>Dokumen belum terkirim ke Aplikasi CEISA</li>" +
          "<li>Dokumen belum proses Receiving (penerimaan Item/Part)</li>" +
          "</ol>" +
          "<i>" +
          "Pastikan Data Invoice diperiksa kembali di menu Sumber Data" +
          "</i>",

        function (button) {
          if (button === "yes") {
            var params = Ext.encode({
              method: "proses_cancel_dokumen",
              NOMOR_AJU: MAIN_dtval.NOMOR_AJU,
            });
            var hasil = COMP.run.getservice(vconfig.service_api + "bcin_kurir20/bcin_kurir20", params, "POST", me.var_global.jwt);
            hasil.then(function (content) {
              var val = Ext.decode(content, true);
              if (val.success === "true") {
                GRID.getStore().load();
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
  FRMbcin_kurir20_btsendtoceisa_click: function () {
    try {
      console.log("send to ceisa");
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  edit_detailbarang_click: function (xgrid, rowIndex) {
    try {
      xgrid.getSelectionModel().select(rowIndex);
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("FRMbcin_kurir20_item", "TDK.EXIM.bcin_kurir20.FRMbcin_kurir20_item", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMbcin_kurir20_item_load: function (cmp) {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var FRM = cmp.query("form")[0];

      var GRID = Ext.ComponentQuery.query("bcin_kurir20 GRIDbcin_kurir20 grid[pid=GRIDbcin_kurir20]")[0];
      var vdt = GRID.getSelectionModel().getSelection()[0].data;

      var GRIDitem = Ext.ComponentQuery.query("FRMbcin_kurir20 form grid[pid=GRIDbcin_kurir20_input_item]")[0];
      var vitem = GRIDitem.getSelectionModel().getSelection()[0].data;

      cmp.setTitle("Edit Item Seri Barang: " + vitem.SERI_BARANG + " No AJU: " + vdt.NOMOR_AJU);

      var params = Ext.encode({
        method: "proses_edit_item_dokumen",
        NOMOR_AJU: vdt.NOMOR_AJU,
        SERI_BARANG: vitem.SERI_BARANG,
      });

      var hasil = COMP.run.getservice(vconfig.service_api + "bcin_kurir20/bcin_kurir20", params, "POST", me.var_global.jwt);
      hasil.then(function (content) {
        var val = Ext.decode(content, true);
        if (val.success === "true") {
          FRM.getForm().setValues(val.data);
        } else {
          COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 3000 });
        }
      }, this);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btsearch_click: function (btn) {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var popup = Ext.define("TDK.EXIM.bcin_kurir20.popup_btsearch", {
        extend: "Ext.window.Window",
        alias: "widget.popup_btsearch",
        reference: "popup_btsearch",
        title: btn.vdata.title,
        modal: true,
        closeAction: "destroy",
        centered: true,
        autoScroll: true,
        width: mainpanel.getWidth() * btn.vdata.popupwidth,
        height: mainpanel.getHeight() * btn.vdata.popupheight,
        layout: { type: "vbox", pack: "start", align: "stretch" },
        bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
        items: [
          {
            xtype: "grid",
            pid: "GRIDpopup_selectsupplier",
            emptyText: "No Matching Records",
            autoScroll: true,
            flex: 1,
            plugins: ["filterfield"],
            viewConfig: {
              enableTextSelection: true,
            },
            store: me.btsearch_store(btn.vdata.modulename),
            columns: me.btsearch_column(btn.vdata.modulename),
            bbar: {
              xtype: "pagingtoolbar",
              displayInfo: true,
              displayMsg: "Total Data {2}",
              emptyMsg: "No topics to display",
            },
            listeners: {
              itemdblclick: function (grid, rec) {
                switch (btn.vdata.modulename) 
                {
                  case "kantorpabean":
                    var FRM = Ext.ComponentQuery.query("FRMbcin_kurir20 form")[0];
                    var popup = Ext.ComponentQuery.query("popup_btsearch")[0];
                    FRM.getForm().setValues({
                      KODE_KANTORNAME: rec.data.URAIAN_KANTOR,
                      KODE_KANTOR: rec.data.KODE_KANTOR,
                    });
                    popup.close();
                    return;
                  case "tpb":
                    var FRM = Ext.ComponentQuery.query("FRMbcin_kurir20 form")[0];
                    var popup = Ext.ComponentQuery.query("popup_btsearch")[0];
                    FRM.getForm().setValues({
                      KODE_JENIS_TPBNAME: rec.data.URAIAN_TUJUAN_TPB,
                      KODE_JENIS_TPB: rec.data.KODE_TUJUAN_TPB,
                    });
                    popup.close();
                    return;
                  case "tujuanpengiriman40":
                    var FRM = Ext.ComponentQuery.query("FRMbcin_kurir20 form")[0];
                    var popup = Ext.ComponentQuery.query("popup_btsearch")[0];
                    FRM.getForm().setValues({
                      KODE_TUJUAN_PENGIRIMANNAME: rec.data.URAIAN_TUJUAN_PENGIRIMAN,
                      KODE_TUJUAN_PENGIRIMAN: rec.data.KODE_TUJUAN_PENGIRIMAN,
                    });
                    popup.close();
                    return;
                }
              },
            },
          },
        ],
      });
      COMP.run.getmodulepopup("popup_btsearch", popup, this.getView());
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btsearch_column: function (modulename) {
    try {
      switch (modulename) {
        case "kantorpabean":
          return [
            { xtype: "rownumberer", width: 40 },
            { header: "KODE KANTOR", dataIndex: "KODE_KANTOR", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "NAMA KANTOR", dataIndex: "URAIAN_KANTOR", sortable: true, width: 200, filter: { xtype: "textfield" } },
          ];
        case "tpb":
          return [
            { xtype: "rownumberer", width: 40 },
            { header: "KODE TPB", dataIndex: "KODE_TUJUAN_TPB", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "NAMA TPB", dataIndex: "URAIAN_TUJUAN_TPB", sortable: true, width: 350, filter: { xtype: "textfield" } },
          ];
        case "tujuanpengiriman40":
          return [
            { xtype: "rownumberer", width: 40 },
            { header: "KODE TUJUAN PENGIRIMAN", dataIndex: "KODE_TUJUAN_PENGIRIMAN", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "NAMA TUJUAN PENGIRIMAN", dataIndex: "URAIAN_TUJUAN_PENGIRIMAN", sortable: true, width: 350, filter: { xtype: "textfield" } },
          ];
        default:
          return false;
      }
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btsearch_store: function (modulename) {
    try {
      switch (modulename) {
        case "kantorpabean":
          return {
            autoLoad: true,
            remoteSort: true,
            remoteFilter: true,
            pageSize: 20,
            proxy: {
              type: "ajax",
              disableCaching: false,
              noCache: false,
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
              actionMethods: { read: "POST" },
              url: vconfig.service_api + "referensi_kantor_pabean/referensi_kantor_pabeans",
              extraParams: {
                method: "read",
                module: "bcinkurir20",
              },
              reader: {
                type: "json",
                rootProperty: "Rows",
                totalProperty: "TotalRows",
                successProperty: "success",
              },
            },
          };
        case "tpb":
          return {
            autoLoad: true,
            remoteSort: true,
            remoteFilter: true,
            pageSize: 20,
            proxy: {
              type: "ajax",
              disableCaching: false,
              noCache: false,
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
              actionMethods: { read: "POST" },
              url: vconfig.service_api + "tujuantpb/tujuantpbs",
              extraParams: {
                method: "read",
                module: "bcinkurir20",
              },
              reader: {
                type: "json",
                rootProperty: "Rows",
                totalProperty: "TotalRows",
                successProperty: "success",
              },
            },
          };
        case "tujuanpengiriman40":
          return {
            autoLoad: true,
            remoteSort: true,
            remoteFilter: true,
            pageSize: 20,
            proxy: {
              type: "ajax",
              disableCaching: false,
              noCache: false,
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
              actionMethods: { read: "POST" },
              url: vconfig.service_api + "referensi_tujuan_pengiriman40/referensi_tujuan_pengiriman40s",
              extraParams: {
                method: "read",
                module: "bcin40",
              },
              reader: {
                type: "json",
                rootProperty: "Rows",
                totalProperty: "TotalRows",
                successProperty: "success",
              },
            },
          };
      }
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  bttambah_dokumen_click: function () {
    try {
      var me = this;

      var griddokumen = Ext.ComponentQuery.query("FRMbcin_kurir20 grid[pid=GRIDbcin_kurir20_input_dokumen]")[0];

      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var popup = Ext.define("TDK.EXIM.bcin_kurir20.popup_btadddokumen", {
        extend: "Ext.window.Window",
        alias: "widget.popup_btadddokumen",
        reference: "popup_btadddokumen",
        title: "Tambah Dokumen",
        modal: true,
        closeAction: "destroy",
        centered: true,
        autoScroll: true,
        width: mainpanel.getWidth() * 0.5,
        height: mainpanel.getHeight() * 0.6,
        layout: { type: "vbox", pack: "start", align: "stretch" },
        bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
        items: [
          {
            xtype: "grid",
            pid: "GRIDpopup_btadddokumen",
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
                headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
                actionMethods: { read: "POST" },
                url: vconfig.service_api + "referensi_dokumen/referensi_dokumens",
                reader: {
                  type: "json",
                  rootProperty: "Rows",
                  totalProperty: "TotalRows",
                  successProperty: "success",
                },
              },
              listeners: {
                beforeload: function (store, operation, eOpts) {
                  var params = [
                    { property: "KODE_DOKUMEN!=", value: "380" },
                  ];
                  operation.setParams({
                    keywhere: Ext.encode(params),
                  });
                },
              },
            },
            columns: [
              { header: "KODE", dataIndex: "KODE_DOKUMEN", sortable: true, width: 65, filter: { xtype: "textfield" } },
              { header: "TIPE", dataIndex: "TIPE_DOKUMEN", sortable: true, width: 65, filter: { xtype: "textfield" } },
              { header: "URAIAN", dataIndex: "URAIAN_DOKUMEN", sortable: true, flex: 1, filter: { xtype: "textfield" } },
            ],
            bbar: {
              xtype: "pagingtoolbar",
              displayInfo: true,
              displayMsg: "Total Data {2}",
              emptyMsg: "No topics to display",
            },
            listeners: {
              itemdblclick: function (grid, rec) {
                try {
                  var griddokumen = Ext.ComponentQuery.query("FRMbcin_kurir20 grid[pid=GRIDbcin_kurir20_input_dokumen]")[0];

                  var rec = {
                    KODE_JENIS_DOKUMEN: rec.data.KODE_DOKUMEN,
                    NOMOR_DOKUMEN: "XXXXX",
                    TANGGAL_DOKUMEN: moment(new Date()).format("YYYY-MM-DD"),
                    URAIAN_DOKUMEN: rec.data.URAIAN_DOKUMEN,
                  };
                  griddokumen.getStore().add(rec);
                  var popup = Ext.ComponentQuery.query("popup_btadddokumen")[0];
                  popup.close();
                } catch (ex) {
                  COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                }
              },
            },
          },
        ],
      });
      COMP.run.getmodulepopup("popup_btadddokumen", popup, this.getView());
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});
