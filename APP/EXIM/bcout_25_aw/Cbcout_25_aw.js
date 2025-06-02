Ext.define("NJC.EXIM.bcout_25_aw.Cbcout_25_aw", {
    extend: "Ext.app.ViewController",
    alias: "controller.Cbcout_25_aw",
    init: function (view) {
      this.control({
        "bcout_25_aw button[pid=btrefresh]": { click: this.btrefresh_click },
        "bcout_25_aw combobox[name=CBO_FILTERKEY]": { select: this.btrefresh_click },
        // "FRMbcout_25_aw button[pid=bttambah_dokumen]": { click: this.bttambah_dokumen_click },
        // "FRMbcout_25_aw button[pid=btsearch]": { click: this.btsearch_click },
      });
      this.listen({
        store: {},
      });
      this.var_global = {
        jwt: localStorage.getItem("ST_NJC_JWT_PLB"),
      };
      this.var_data_dokumen = "[]";
      this.var_data_barang = "[]";
      this.var_data_barang_tarif = "[]";
      this.var_data_barang_dokumen = "[]";
  
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
        console.log("load Controller Cbcout_25_aw");
      } catch (ex) {
        COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      }
    },
    btrefresh_click: function () {
      try {
        var GRID = Ext.ComponentQuery.query("bcout_25_aw GRIDbcout_25_aw grid[pid=GRIDbcout_25_aw]")[0];
        GRID.getStore().load();
      } catch (ex) {
        COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      }
    },
    /*
    btdetail_rows_click: function (xgrid, rowIndex) {
      try {
        xgrid.getSelectionModel().select(rowIndex);
        var me = this;
        var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
        COMP.run.getmodulepopup("FRMbcout_25_aw", "NJC.EXIM.bcout_25_aw.FRMbcout_25_aw", mainpanel);
      } catch (ex) {
        COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      }
    },
    */
    btdetail_rows_click: function (xgrid, rowIndex, colIndex, e, a, rec) {
      try {
        var me = this;
        xgrid.getSelectionModel().select(rowIndex);
        var vdt = rec.data;
        var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
        var popup = Ext.ComponentQuery.query("FRMbcout_25_aw")[0];
        if (!popup) {
          popup = Ext.create("NJC.EXIM.bcout_25_aw.FRMbcout_25_aw");
          popup.on(
            "show",
            function () {
              try {
                var params = Ext.encode({
                  method: "process_edit",
                  module: "LOAD_DATA",
                  VNOMORAJU: vdt.NOMOR_AJU,
                  VMODESOURCE: vdt.MODE_SOURCE,
                  VHEADER: "[]",
                  VENTITAS: "[]",
                  VDOKUMEN: "[]",
                  VPENGANGKUT: "[]",
                  VKEMASAN: "[]",
                  VKONTAINER: "[]",
                  VBARANG: "[]",
                  VBARANGTARIF: "[]",
                });
                var hasil = COMP.run.getservice(vconfig.service_api + "bcout_25_aw/bcout_25_aw", params, "POST", me.var_global.jwt);
                hasil.then(function (content) {
                  var val = Ext.decode(content, true)[0];
                  if (val.success == "true") {
                    COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 2000 });
                    if (val.B_HEADER !== null) {
                      var B_HEADER = Ext.decode(val.B_HEADER, true)[0];
                      var FRM = popup.query("form")[0];
                      FRM.getForm().setValues({
                        NOMOR_AJU: B_HEADER.NOMORAJU,
                        KODE_PEL_MUAT: B_HEADER.KODEPELABUHANMUAT,
                        KODE_PEL_BONGKAR: B_HEADER.KODEPELABUHANBONGKAR,
                        KODE_PEL_TRANSIT: B_HEADER.KODEPELABUHANTRANSIT,
                        KODE_KANTOR_BONGKAR: B_HEADER.KODEKANTORBONGKAR,
                        KODE_KANTOR: B_HEADER.KODEKANTOR,
                        KODE_KANTOR_TUJUAN: B_HEADER.KODEKANTORTUJUAN,
                        ASAL_DATA: B_HEADER.ASAL_DATA,
                        NIK: B_HEADER.NIK,
                        SERI: B_HEADER.SERI,
                        KODE_DOKUMEN_PABEAN: B_HEADER.KODEDOKUMEN,
                        MODE_SOURCE: B_HEADER.MODE_SOURCE,
                        ID_COMPANY: B_HEADER.ID_COMPANY,
                        TANGGAL_AJU: B_HEADER.TANGGALPERNYATAAN ? moment(B_HEADER.TANGGALPERNYATAAN).format("YYYY-MM-DD") : "",
                        NOMOR_DAFTAR: B_HEADER.NOMORDAFTAR,
                        TANGGAL_DAFTAR: B_HEADER.TANGGALDAFTAR ? moment(B_HEADER.TANGGALDAFTAR).format("YYYY-MM-DD") : "",
                        KODE_CARA_BAYAR: B_HEADER.KODECARABAYAR ? B_HEADER.KODECARABAYAR : "",
                        NOMOR_BC11: B_HEADER.NOMORBC11 ? B_HEADER.NOMORBC11 : "",
                        TANGGAL_BC11: B_HEADER.TANGGALBC11 ? moment(B_HEADER.TANGGALBC11).format("YYYY-MM-DD") : "",
                        POS_BC11: B_HEADER.NOMORPOS ? B_HEADER.NOMORPOS : "",
                        SUBPOS_BC11: B_HEADER.NOMORSUBPOS ? B_HEADER.NOMORSUBPOS : "",
                        KODE_TUTUP_PU: B_HEADER.KODETUTUPPU ? B_HEADER.KODETUTUPPU : "",
                        KODE_TPS: B_HEADER.KODETPS ? B_HEADER.KODETPS : "",
                        FOB: B_HEADER.FOB ? B_HEADER.FOB : 0,
                        CIF: B_HEADER.CIF ? B_HEADER.CIF : 0,
                        FREIGHT: B_HEADER.FREIGHT ? B_HEADER.FREIGHT : 0,
                        NETTO: B_HEADER.NETTO ? B_HEADER.NETTO : 0,
                        BRUTO: B_HEADER.BRUTO ? B_HEADER.BRUTO : 0,
                        CIF_RUPIAH: B_HEADER.CIF_RUPIAH ? B_HEADER.CIF_RUPIAH : 0,
                        NDPBM: B_HEADER.NDPBM ? B_HEADER.NDPBM : 0,
                        KODE_VALUTA: B_HEADER.KODEVALUTA ? B_HEADER.KODEVALUTA : 0,
                        KODE_TUJUAN_PLB: B_HEADER.KODETUJUANTPB ? B_HEADER.KODETUJUANTPB : "",
                        POSTINGSTATUS: B_HEADER.POSTINGSTATUS ? B_HEADER.POSTINGSTATUS : "",
                        POSTINGDATE: B_HEADER.POSTINGDATE ? B_HEADER.POSTINGDATE : "",
                        POSTINGUSER: B_HEADER.POSTINGUSER ? B_HEADER.POSTINGUSER : "",
                      });
                    }
  
                    if (val.B_DOKUMEN !== null) {
                      var B_DOKUMEN = Ext.decode(val.B_DOKUMEN, true);
                      var GRIDbcout_25_aw_dokumen = popup.query("grid[pid=GRIDbcout_25_aw_dokumen]")[0];
                      Ext.Array.each(B_DOKUMEN, function (rec) {
                        GRIDbcout_25_aw_dokumen.getStore().add(rec);
                      });
                    }
  
                    if (val.B_ENTITAS !== null) {
                      var B_ENTITAS = Ext.decode(val.B_ENTITAS, true);
                      var FRM = popup.query("form")[0];
                      Ext.Array.each(B_ENTITAS, function (rec) {
                        if (rec.SERI === 1) {
                          FRM.getForm().setValues({
                            ENTITAS1_SERIENTITAS: rec.SERI,
                            ENTITAS1_KODESTATUS: rec.KODESTATUS,
                            ENTITAS1_KODEENTITAS: rec.KODEENTITAS,
                            ENTITAS1_KODEJENISIDENTITAS: rec.KODEJENISIDENTITAS,
                            ENTITAS1_NAMAENTITAS: rec.NAMAENTITAS,
                            ENTITAS1_ALAMATENTITAS: rec.ALAMATENTITAS,
                            ENTITAS1_KODENEGARA: rec.KODENEGARA,
                            ENTITAS1_NOMORIJINENTITAS: rec.NOMORIJINENTITAS,
                            ENTITAS1_TANGGALIJINENTITAS: rec.TANGGALIJINENTITAS,
                            ENTITAS1_NIBENTITAS: rec.NIBENTITAS,
                            ENTITAS1_KODEJENISAPI: rec.KODEJENISAPI,
                            ENTITAS1_NOMORIDENTITAS: rec.NOMORIDENTITAS,
                          });
                        }
                        if (rec.SERI === 2) {
                          FRM.getForm().setValues({
                            ENTITAS2_KODESTATUS: rec.KODESTATUS,
                            ENTITAS2_KODEENTITAS: rec.KODEENTITAS,
                            ENTITAS2_KODEJENISIDENTITAS: rec.KODEJENISIDENTITAS,
                            ENTITAS2_SERIENTITAS: rec.SERI,
                            ENTITAS2_NAMAENTITAS: rec.NAMAENTITAS,
                            ENTITAS2_ALAMATENTITAS: rec.ALAMATENTITAS,
                            ENTITAS2_KODENEGARA: rec.KODENEGARA,
                            ENTITAS2_KODEJENISAPI: rec.KODEJENISAPI,
                          });
                        }
                        if (rec.SERI === 3) {
                          FRM.getForm().setValues({
                            ENTITAS3_SERIENTITAS: rec.SERI,
                            ENTITAS3_KODEENTITAS: rec.KODEENTITAS,
                            ENTITAS3_KODEJENISIDENTITAS: rec.KODEJENISIDENTITAS,
                            ENTITAS3_KODESTATUS: rec.KODESTATUS,
                            ENTITAS3_NAMAENTITAS: rec.NAMAENTITAS,
                            ENTITAS3_ALAMATENTITAS: rec.ALAMATENTITAS,
                            ENTITAS3_KODENEGARA: rec.KODENEGARA,
                            ENTITAS3_NOMORIJINENTITAS: rec.NOMORIJINENTITAS,
                            ENTITAS3_TANGGALIJINENTITAS: rec.TANGGALIJINENTITAS,
                            ENTITAS3_NIBENTITAS: rec.NIBENTITAS,
                            ENTITAS3_KODEJENISAPI: rec.KODEJENISAPI,
                            ENTITAS3_NOMORIDENTITAS: rec.NOMORIDENTITAS,
                          });
                        }
                      });
                    }
                    if (val.B_PENGANGKUT !== null) {
                      var B_PENGANGKUT = Ext.decode(val.B_PENGANGKUT, true);
                      var GRIDbcout_25_aw_pengangkut = popup.query("grid[pid=GRIDbcout_25_aw_pengangkut]")[0];
                      Ext.Array.each(B_PENGANGKUT, function (rec) {
                        GRIDbcout_25_aw_pengangkut.getStore().add(rec);
                      });
                    }
                    if (val.B_KONTAINER !== null) {
                      var B_KONTAINER = Ext.decode(val.B_KONTAINER, true);
                      var GRIDbcout_25_aw_kontainer = popup.query("grid[pid=GRIDbcout_25_aw_kontainer]")[0];
                      Ext.Array.each(B_KONTAINER, function (rec) {
                        GRIDbcout_25_aw_kontainer.getStore().add(rec);
                      });
                    }
                    if (val.B_KEMASAN !== null) {
                      var B_KEMASAN = Ext.decode(val.B_KEMASAN, true);
                      var GRIDbcout_25_aw_kemasan = popup.query("grid[pid=GRIDbcout_25_aw_kemasan]")[0];
                      Ext.Array.each(B_KEMASAN, function (rec) {
                        GRIDbcout_25_aw_kemasan.getStore().add(rec);
                      });
                    }
  
                    if (val.B_BARANG !== null) {
                      var B_BARANG = Ext.decode(val.B_BARANG, true);
                      var GRIDbcout_25_aw_barang = popup.query("grid[pid=GRIDbcout_25_aw_barang]")[0];
                      Ext.Array.each(B_BARANG, function (rec) {
                        GRIDbcout_25_aw_barang.getStore().add(rec);
                      });
                    }
                  } else {
                    COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 2000 });
                  }
                }, this);
              } catch (ex) {
                COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
              }
            },
            this
          );
        }
        return popup.show();
      } catch (ex) {
        COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      }
    },
    /*
    FRMbcout_25_aw_load: function (cmp) {
      try {
        var me = this;
        var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
        var FRM = cmp.query("form")[0];
        var GRIDkontainer = cmp.query("form grid[pid=GRIDbcout_25_aw_kontainer]")[0];
        var GRIDkemasan = cmp.query("form grid[pid=GRIDbcout_25_aw_kemasan]")[0];
        var GRIDdokumen = cmp.query("form grid[pid=GRIDbcout_25_aw_input_dokumen]")[0];
        var GRIDbarang = cmp.query("form grid[pid=GRIDbcout_25_aw_input_item]")[0];
        GRIDkontainer.getStore().removeAll();
        GRIDkemasan.getStore().removeAll();
        GRIDdokumen.getStore().removeAll();
        GRIDbarang.getStore().removeAll();
  
        var GRID = Ext.ComponentQuery.query("bcout_25_aw GRIDbcout_25_aw grid[pid=GRIDbcout_25_aw]")[0];
        var vdt = GRID.getSelectionModel().getSelection()[0].data;
        cmp.setTitle("Edit Dokumen No AJU: " + vdt.NOMOR_AJU);
  
        var params = Ext.encode({
          method: "proses_edit_dokumen",
          NOMOR_AJU: vdt.NOMOR_AJU,
        });
        var hasil = COMP.run.getservice(vconfig.service_api + "bcout_25_aw/bcout_25_aw", params, "POST", me.var_global.jwt);
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
            if (val.vkontainer !== null) {
              var dtkontainer = Ext.decode(val.vkontainer, true);
              GRIDkontainer.getStore().add(dtkontainer);
            }
            if (val.vkemasan !== null) {
              var dtkemasan = Ext.decode(val.vkemasan, true);
              GRIDkemasan.getStore().add(dtkemasan);
            }
            if (val.vdokumen !== null) {
              var dtdokumen = Ext.decode(val.vdokumen, true);
              GRIDdokumen.getStore().add(dtdokumen);
            }
            if (val.vbarang !== null) {
              var dtbarang = Ext.decode(val.vbarang, true);
              GRIDbarang.getStore().add(dtbarang);
            }
            if (val.vinvoice !== null) {
              var dtinvoice = Ext.decode(val.vinvoice, true);
              FRM.getForm().setValues({
                INVOICE_NOMOR_DOKUMEN: dtinvoice.NOMOR_DOKUMEN,
                INVOICE_TANGGAL_DOKUMEN: moment(dtinvoice.TANGGAL_DOKUMEN).format("YYYY-MM-DD"),
              });
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
    */
    FRMbcout_25_aw_btcancel_click: function () {
      try {
        var popup = Ext.ComponentQuery.query("FRMbcout_25_aw")[0];
        var GRID = Ext.ComponentQuery.query("bcout_25_aw GRIDbcout_25_aw grid[pid=GRIDbcout_25_aw]")[0];
        var FRM_MAIN = Ext.ComponentQuery.query("FRMbcout_25_aw form")[0];
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
              var hasil = COMP.run.getservice(vconfig.service_api + "bcout_25_aw/bcout_25_aw", params, "POST", me.var_global.jwt);
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
    FRMbcout_25_aw_btsendtoceisa_click: function () {
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
        COMP.run.getmodulepopup("FRMbcout_25_aw_item", "NJC.EXIM.bcout_25_aw.FRMbcout_25_aw_item", mainpanel);
      } catch (ex) {
        COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      }
    },
    FRMbcout_25_aw_item_load: function (cmp) {
      try {
        var me = this;
        var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
        var FRM = cmp.query("form")[0];
  
        var GRID = Ext.ComponentQuery.query("bcout_25_aw GRIDbcout_25_aw grid[pid=GRIDbcout_25_aw]")[0];
        var vdt = GRID.getSelectionModel().getSelection()[0].data;
  
        var GRIDitem = Ext.ComponentQuery.query("FRMbcout_25_aw form grid[pid=GRIDbcout_25_aw_input_item]")[0];
        var vitem = GRIDitem.getSelectionModel().getSelection()[0].data;
  
        cmp.setTitle("Edit Item Seri Barang: " + vitem.SERI_BARANG + " No AJU: " + vdt.NOMOR_AJU);
  
        var params = Ext.encode({
          method: "proses_edit_item_dokumen",
          NOMOR_AJU: vdt.NOMOR_AJU,
          SERI_BARANG: vitem.SERI_BARANG,
        });
  
        var hasil = COMP.run.getservice(vconfig.service_api + "bcout_25_aw/bcout_25_aw", params, "POST", me.var_global.jwt);
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
        var popup = Ext.define("TDK.EXIM.bcout_25_aw.popup_btsearch", {
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
                  switch (btn.vdata.modulename) {
                    case "kantorasal":
                      var FRM = Ext.ComponentQuery.query("FRMbcout_25_aw form")[0];
                      var popup = Ext.ComponentQuery.query("popup_btsearch")[0];
                      FRM.getForm().setValues({
                        KODE_KANTORNAME: rec.data.URAIAN_KANTOR,
                        KODE_KANTOR: rec.data.KODE_KANTOR,
                      });
                      popup.close();
                      return;
                    case "kantortujuan":
                      var FRM = Ext.ComponentQuery.query("FRMbcout_25_aw form")[0];
                      var popup = Ext.ComponentQuery.query("popup_btsearch")[0];
                      FRM.getForm().setValues({
                        KODE_KANTOR_TUJUANNAME: rec.data.URAIAN_KANTOR,
                        KODE_KANTOR_TUJUAN: rec.data.KODE_KANTOR,
                      });
                      popup.close();
                      return;
                    case "tpbasal":
                      var FRM = Ext.ComponentQuery.query("FRMbcout_25_aw form")[0];
                      var popup = Ext.ComponentQuery.query("popup_btsearch")[0];
                      FRM.getForm().setValues({
                        KODE_JENIS_TPBNAME: rec.data.URAIAN_TUJUAN_TPB,
                        KODE_JENIS_TPB: rec.data.KODE_TUJUAN_TPB,
                      });
                      popup.close();
                      return;
                    case "tpbtujuan":
                      var FRM = Ext.ComponentQuery.query("FRMbcout_25_aw form")[0];
                      var popup = Ext.ComponentQuery.query("popup_btsearch")[0];
                      FRM.getForm().setValues({
                        KODE_TUJUAN_TPBNAME: rec.data.URAIAN_TUJUAN_TPB,
                        KODE_TUJUAN_TPB: rec.data.KODE_TUJUAN_TPB,
                      });
                      popup.close();
                      return;
                    case "tujuanpengiriman30":
                      var FRM = Ext.ComponentQuery.query("FRMbcout_25_aw form")[0];
                      var popup = Ext.ComponentQuery.query("popup_btsearch")[0];
                      FRM.getForm().setValues({
                        KODE_TUJUAN_PENGIRIMANNAME: rec.data.URAIAN_TUJUAN_PENGIRIMAN,
                        KODE_TUJUAN_PENGIRIMAN: rec.data.KODE_TUJUAN_PENGIRIMAN,
                      });
                      popup.close();
                      return;
                    case "valuta":
                      var FRM = Ext.ComponentQuery.query("FRMbcout_25_aw form")[0];
                      var popup = Ext.ComponentQuery.query("popup_btsearch")[0];
                      FRM.getForm().setValues({
                        KODE_VALUTA_NAME: rec.data.URAIAN_VALUTA,
                        KODE_VALUTA: rec.data.KODE_VALUTA,
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
          case "kantorasal":
            return [
              { xtype: "rownumberer", width: 40 },
              { header: "KODE KANTOR", dataIndex: "KODE_KANTOR", sortable: true, width: 100, filter: { xtype: "textfield" } },
              { header: "NAMA KANTOR", dataIndex: "URAIAN_KANTOR", sortable: true, width: 200, filter: { xtype: "textfield" } },
            ];
          case "kantortujuan":
            return [
              { xtype: "rownumberer", width: 40 },
              { header: "KODE KANTOR", dataIndex: "KODE_KANTOR", sortable: true, width: 100, filter: { xtype: "textfield" } },
              { header: "NAMA KANTOR", dataIndex: "URAIAN_KANTOR", sortable: true, width: 200, filter: { xtype: "textfield" } },
            ];
          case "tpbasal":
            return [
              { xtype: "rownumberer", width: 40 },
              { header: "KODE TPB ASAL", dataIndex: "KODE_TUJUAN_TPB", sortable: true, width: 100, filter: { xtype: "textfield" } },
              { header: "NAMA TPB ASAL", dataIndex: "URAIAN_TUJUAN_TPB", sortable: true, width: 350, filter: { xtype: "textfield" } },
            ];
          case "tpbtujuan":
            return [
              { xtype: "rownumberer", width: 40 },
              { header: "KODE TPB TUJUAN", dataIndex: "KODE_TUJUAN_TPB", sortable: true, width: 100, filter: { xtype: "textfield" } },
              { header: "NAMA TPB TUJUAN", dataIndex: "URAIAN_TUJUAN_TPB", sortable: true, width: 350, filter: { xtype: "textfield" } },
            ];
          case "tujuanpengiriman30":
            return [
              { xtype: "rownumberer", width: 40 },
              { header: "KODE TUJUAN PENGIRIMAN", dataIndex: "KODE_TUJUAN_PENGIRIMAN", sortable: true, width: 100, filter: { xtype: "textfield" } },
              { header: "NAMA TUJUAN PENGIRIMAN", dataIndex: "URAIAN_TUJUAN_PENGIRIMAN", sortable: true, width: 350, filter: { xtype: "textfield" } },
            ];
          case "valuta":
            return [
              { xtype: "rownumberer", width: 40 },
              { header: "KODE VALUTA", dataIndex: "KODE_VALUTA", sortable: true, width: 100, filter: { xtype: "textfield" } },
              { header: "NAMA VALUTA", dataIndex: "URAIAN_VALUTA", sortable: true, width: 200, filter: { xtype: "textfield" } },
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
          case "kantorasal":
            return {
              autoLoad: true,
              remoteSort: true,
              remoteFilter: true,
              pageSize: 20,
              proxy: {
                type: "ajax",
                disableCaching: false,
                noCache: false,
                headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
                actionMethods: { read: "POST" },
                url: vconfig.service_api + "referensi_kantor_pabean/referensi_kantor_pabeans",
                extraParams: {
                  method: "read",
                  module: "bcout30",
                },
                reader: {
                  type: "json",
                  rootProperty: "Rows",
                  totalProperty: "TotalRows",
                  successProperty: "success",
                },
              },
            };
          case "kantortujuan":
            return {
              autoLoad: true,
              remoteSort: true,
              remoteFilter: true,
              pageSize: 20,
              proxy: {
                type: "ajax",
                disableCaching: false,
                noCache: false,
                headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
                actionMethods: { read: "POST" },
                url: vconfig.service_api + "referensi_kantor_pabean/referensi_kantor_pabeans",
                extraParams: {
                  method: "read",
                  module: "bcout30",
                },
                reader: {
                  type: "json",
                  rootProperty: "Rows",
                  totalProperty: "TotalRows",
                  successProperty: "success",
                },
              },
            };
          case "tpbasal":
            return {
              autoLoad: true,
              remoteSort: true,
              remoteFilter: true,
              pageSize: 20,
              proxy: {
                type: "ajax",
                disableCaching: false,
                noCache: false,
                headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
                actionMethods: { read: "POST" },
                url: vconfig.service_api + "tujuantpb/tujuantpbs",
                extraParams: {
                  method: "read",
                  module: "bcout30",
                },
                reader: {
                  type: "json",
                  rootProperty: "Rows",
                  totalProperty: "TotalRows",
                  successProperty: "success",
                },
              },
            };
          case "tpbtujuan":
            return {
              autoLoad: true,
              remoteSort: true,
              remoteFilter: true,
              pageSize: 20,
              proxy: {
                type: "ajax",
                disableCaching: false,
                noCache: false,
                headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
                actionMethods: { read: "POST" },
                url: vconfig.service_api + "tujuantpb/tujuantpbs",
                extraParams: {
                  method: "read",
                  module: "bcout30",
                },
                reader: {
                  type: "json",
                  rootProperty: "Rows",
                  totalProperty: "TotalRows",
                  successProperty: "success",
                },
              },
            };
          case "tujuanpengiriman30":
            return {
              autoLoad: true,
              remoteSort: true,
              remoteFilter: true,
              pageSize: 20,
              proxy: {
                type: "ajax",
                disableCaching: false,
                noCache: false,
                headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
                actionMethods: { read: "POST" },
                url: vconfig.service_api + "referensi_tujuan_pengiriman30/referensi_tujuan_pengiriman30s",
                extraParams: {
                  method: "read",
                  module: "bcout30",
                },
                reader: {
                  type: "json",
                  rootProperty: "Rows",
                  totalProperty: "TotalRows",
                  successProperty: "success",
                },
              },
            };
          case "valuta":
            return {
              autoLoad: true,
              remoteSort: true,
              remoteFilter: true,
              pageSize: 20,
              proxy: {
                type: "ajax",
                disableCaching: false,
                noCache: false,
                headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
                actionMethods: { read: "POST" },
                url: vconfig.service_api + "valuta/valutas",
                extraParams: {
                  method: "read",
                  module: "bcout30",
                },
                reader: {
                  type: "json",
                  rootProperty: "Rows",
                  totalProperty: "TotalRows",
                  successProperty: "success",
                },
              },
            };
          default:
            return false;
        }
      } catch (ex) {
        COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      }
    },
    bttambah_dokumen_click: function () {
      try {
        var me = this;
  
        var griddokumen = Ext.ComponentQuery.query("FRMbcout_25_aw grid[pid=GRIDbcout_25_aw_input_dokumen]")[0];
  
        var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
        var popup = Ext.define("NJC.EXIM.bcout_25_aw.popup_btadddokumen", {
          extend: "Ext.window.Window",
          alias: "widget.popup_btadddokumen",
          reference: "popup_btadddokumen",
          title: "Tambah Dokumen",
          modal: true,
          closeAction: "destroy",
          centered: true,
          autoScroll: false,
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
                  headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
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
                    var griddokumen = Ext.ComponentQuery.query("FRMbcout_25_aw grid[pid=GRIDbcout_25_aw_input_dokumen]")[0];
  
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
     btupdate_click: function () {
      try {
        var me = this;
        var MAIN_FRM = Ext.ComponentQuery.query("FRMbcout_25_aw")[0];
        var GRID = Ext.ComponentQuery.query("GRIDbcout_25_aw grid[pid=GRIDbcout_25_aw]")[0];
        FRM = MAIN_FRM.query("form")[0];
        var vdt = FRM.getValues(false, false, false, true);
  
        if (vdt.POSTINGSTATUS !== "OPEN") {
          COMP.TipToast.toast("Error", "Dokumen sudah di Posting tidak bisa dilakukan perubahan kembali", { cls: "danger", delay: 2000 });
          return false;
        }
        return this.proses_update();
      } catch (ex) {
        COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      }
    },
    proses_update: function () {
      try {
        var me = this;
        var MAIN_FRM = Ext.ComponentQuery.query("FRMbcout_25_aw")[0];
        var GRID = Ext.ComponentQuery.query("GRIDbcout_25_aw grid[pid=GRIDbcout_25_aw]")[0];
        FRM = MAIN_FRM.query("form")[0];
  
        var GRIDbcout_25_aw_pengangkut = MAIN_FRM.query("grid[pid=GRIDbcout_25_aw_pengangkut]")[0];
        var STpengangkut = GRIDbcout_25_aw_pengangkut.getStore().getData();
        var DATA_pengangkut = [];
        STpengangkut.each(function (rec) {
          DATA_pengangkut.push(rec.data);
        });
  
        var GRIDbcout_25_aw_kontainer = MAIN_FRM.query("grid[pid=GRIDbcout_25_aw_kontainer]")[0];
        var STkontainer = GRIDbcout_25_aw_kontainer.getStore().getData();
        var DATA_kontainer = [];
        STkontainer.each(function (rec) {
          DATA_kontainer.push(rec.data);
        });
  
        var GRIDbcout_25_aw_kemasan = MAIN_FRM.query("grid[pid=GRIDbcout_25_aw_kemasan]")[0];
        var STkemasan = GRIDbcout_25_aw_kemasan.getStore().getData();
        var DATA_kemasan = [];
        STkemasan.each(function (rec) {
          DATA_kemasan.push(rec.data);
        });
  
        var GRIDbcout_25_aw_dokumen = MAIN_FRM.query("grid[pid=GRIDbcout_25_aw_dokumen]")[0];
        var STdokumen = GRIDbcout_25_aw_dokumen.getStore().getData();
        var DATA_dokumen = [];
        STdokumen.each(function (rec) {
          rec.set("TANGGALDOKUMEN", moment(rec.data.TANGGALDOKUMEN).format("YYYY-MM-DD"));
          DATA_dokumen.push(rec.data);
        });
  
        var vdt = FRM.getValues(false, false, false, true);
  
        var DATA_entitas = [
          {
            SERI: vdt.ENTITAS1_SERIENTITAS ?? "",
            KODEENTITAS: vdt.ENTITAS1_KODEENTITAS ?? "",
            KODEJENISIDENTITAS: vdt.ENTITAS1_KODEJENISIDENTITAS ?? "",
            KODESTATUS: vdt.ENTITAS1_KODESTATUS ?? "",
            NAMAENTITAS: vdt.ENTITAS1_NAMAENTITAS ?? "",
            ALAMATENTITAS: vdt.ENTITAS1_ALAMATENTITAS ?? "",
            KODENEGARA: vdt.ENTITAS1_KODENEGARA ?? "",
            NOMORIJINENTITAS: vdt.ENTITAS1_NOMORIJINENTITAS ?? "",
            TANGGALIJINENTITAS: vdt.ENTITAS1_TANGGALIJINENTITAS ?? "",
            NIBENTITAS: vdt.ENTITAS1_NIBENTITAS ?? "",
            KODEJENISAPI: vdt.ENTITAS1_KODEJENISAPI ?? "",
            NOMORIDENTITAS: vdt.ENTITAS1_NOMORIDENTITAS ?? "",
            EDS_NOMOR_AJU: vdt.NOMOR_AJU ?? "",
            NOMORAJU: vdt.NOMOR_AJU ?? "",
          },
          {
            SERI: vdt.ENTITAS2_SERIENTITAS ?? "",
            KODEENTITAS: vdt.ENTITAS2_KODEENTITAS ?? "",
            KODEJENISIDENTITAS: vdt.ENTITAS2_KODEJENISIDENTITAS ?? "",
            KODESTATUS: vdt.ENTITAS2_KODESTATUS ?? "",
            NAMAENTITAS: vdt.ENTITAS2_NAMAENTITAS ?? "",
            ALAMATENTITAS: vdt.ENTITAS2_ALAMATENTITAS ?? "",
            KODENEGARA: vdt.ENTITAS2_KODENEGARA ?? "",
            NOMORIJINENTITAS: vdt.ENTITAS2_NOMORIJINENTITAS ?? "",
            TANGGALIJINENTITAS: vdt.ENTITAS2_TANGGALIJINENTITAS ?? "",
            NIBENTITAS: vdt.ENTITAS2_NIBENTITAS ?? "",
            KODEJENISAPI: vdt.ENTITAS2_KODEJENISAPI ?? "",
            NOMORIDENTITAS: vdt.ENTITAS2_NOMORIDENTITAS ?? "",
            EDS_NOMOR_AJU: vdt.NOMOR_AJU ?? "",
            NOMORAJU: vdt.NOMOR_AJU ?? "",
          },
          {
            SERI: vdt.ENTITAS3_SERIENTITAS,
            KODEENTITAS: vdt.ENTITAS3_KODEENTITAS,
            KODEJENISIDENTITAS: vdt.ENTITAS3_KODEJENISIDENTITAS,
            KODESTATUS: vdt.ENTITAS3_KODESTATUS,
            NAMAENTITAS: vdt.ENTITAS3_NAMAENTITAS,
            ALAMATENTITAS: vdt.ENTITAS3_ALAMATENTITAS,
            KODENEGARA: vdt.ENTITAS3_KODENEGARA,
            NOMORIJINENTITAS: vdt.ENTITAS3_NOMORIJINENTITAS,
            TANGGALIJINENTITAS: vdt.ENTITAS3_TANGGALIJINENTITAS,
            NIBENTITAS: vdt.ENTITAS3_NIBENTITAS,
            KODEJENISAPI: vdt.ENTITAS3_KODEJENISAPI,
            NOMORIDENTITAS: vdt.ENTITAS3_NOMORIDENTITAS,
            EDS_NOMOR_AJU: vdt.NOMOR_AJU,
            NOMORAJU: vdt.NOMOR_AJU ?? "",
          },
        ];
  
        vdt.TANGGAL_BC11 = vdt.TANGGAL_BC11 ? moment(vdt.TANGGAL_BC11).format("YYYY-MM-DD") : null;
        vdt.TANGGAL_AJU = vdt.TANGGAL_AJU ? moment(vdt.TANGGAL_AJU).format("YYYY-MM-DD") : null;
        vdt.TANGGAL_DAFTAR = vdt.TANGGAL_DAFTAR ? moment(vdt.TANGGAL_DAFTAR).format("YYYY-MM-DD") : null;
  
        Ext.MessageBox.confirm(
          "Konfirmasi Update",
          "Konfirmasi Update Dokumen:" + vdt.NOMOR_AJU,
          function (button) {
            if (button === "yes") {
              var params = Ext.encode({
                method: "process_edit",
                module: "UPDATE_DOKUMEN",
                VNOMORAJU: vdt.NOMOR_AJU,
                VMODESOURCE: vdt.MODE_SOURCE,
                VHEADER: Ext.encode(vdt),
                VENTITAS: Ext.encode(DATA_entitas),
                VDOKUMEN: Ext.encode(DATA_dokumen),
                VPENGANGKUT: Ext.encode(DATA_pengangkut),
                VKEMASAN: Ext.encode(DATA_kemasan),
                VKONTAINER: Ext.encode(DATA_kontainer),
                VBARANG: "[]",
                VBARANGTARIF: "[]",
                VPUNGUTAN: "[]",
              });
              var hasil = COMP.run.getservice(vconfig.service_api + "bcout_25_aw/bcout_25_aw", params, "POST", me.var_global.jwt);
              hasil.then(function (content) {
                var val = Ext.decode(content, true)[0];
                console.log(val);
                if (val.success === "true") {
                  MAIN_FRM.close();
                  GRID.getStore().load();
                  COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 3000 });
                } else {
                  COMP.TipToast.toast("Failed", val.message, { cls: "danger", delay: 3000 });
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
      btposting_click: function () {
      try {
        var me = this;
        var MAIN_FRM = Ext.ComponentQuery.query("FRMbcout_25_aw")[0];
        var GRID = Ext.ComponentQuery.query("GRIDbcout_25_aw grid[pid=GRIDbcout_25_aw]")[0];
        FRM = MAIN_FRM.query("form")[0];
        var vdt = FRM.getValues(false, false, false, true);
        if (vdt.POSTINGSTATUS !== "OPEN") {
          COMP.TipToast.toast("Error", "Dokumen sudah di Posting tidak bisa dilakukan perubahan kembali", { cls: "danger", delay: 2000 });
          return false;
        }
        FRM.getForm().setValues({
          POSTINGSTATUS: "NEWPOSTING",
        });
        return this.proses_update();
      } catch (ex) {
        COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      }
    },
  });
  