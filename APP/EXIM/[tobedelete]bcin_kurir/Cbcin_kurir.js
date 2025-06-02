Ext.define("TDK.EXIM.bcin_kurir.Cbcin_kurir", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cbcin_kurir",
  init: function (view) {
    this.control({
      "bcin_kurir GRIDbcin_kurir button[pid=btnew]": { click: this.btnew_click },
      "bcin_kurir grid[pid=GRIDbcin_kurir]": { itemdblclick: this.GRIDbcin_kurir_itemdblclick },
      "FRMbcin_kurir button[pid=btsearch]": { click: this.btsearch_click },
    });
    this.listen({
      store: {},
    });
    this.var_global = {};
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
  GRIDbcin_kurir_load: function () {
    try {
      var STGRIDnew = new Ext.data.Store({
        autoLoad: true,
        remoteSort: true,
        remoteFilter: true,
        pageSize: 15,
        proxy: {
          type: "ajax",
          disableCaching: false,
          noCache: false,
          headers: { Authorization: "Bearer" },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "bcpemasukan_list/bcpemasukan_lists",
          extraParams: {
            kode_dokumen_pabean: "23",
          },
          reader: {
            type: "json",
            rootProperty: "Rows",
            totalProperty: "TotalRows",
            successProperty: "success",
          },
        },
      });

      var GRID = Ext.ComponentQuery.query("bcin_kurir GRIDbcin_kurir grid[pid=GRIDbcin_kurir]")[0];
      GRID.reconfigure(STGRIDnew);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  GRIDbcin_kurir_itemdblclick: function (cmp, rec) {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var vdt = rec.data;
      var load_edit = COMP.run.getmodulepopup("FRMbcin_kurir", "TDK.EXIM.bcin_kurir.FRMbcin_kurir", mainpanel);
      if (load_edit) {
        var FRM = Ext.ComponentQuery.query("FRMbcin_kurir")[0];
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
      var load_edit = COMP.run.getmodulepopup("FRMbcin_kurir", "TDK.EXIM.bcin_kurir.FRMbcin_kurir", mainpanel);
      if (load_edit) {
        var FRM = Ext.ComponentQuery.query("FRMbcin_kurir")[0];
        me.edit_header(FRM, vdt);
      }
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  edit_header: function (frm, xdtedit) {
    try {
      var me = this;
      var FRM = frm.query("form")[0];
      var GRIDkontainer = frm.query("form grid[pid=GRIDinput_kontainer]")[0];
      var GRIDkemasan = frm.query("form grid[pid=GRIDinput_kemasan]")[0];
      var GRIDdokumen = frm.query("form grid[pid=GRIDinput_dokumen]")[0];
      var GRIDbarang = frm.query("form grid[pid=GRIDinput_item]")[0];
      GRIDkontainer.getStore().removeAll();
      GRIDkemasan.getStore().removeAll();
      GRIDdokumen.getStore().removeAll();
      GRIDbarang.getStore().removeAll();
      var params = Ext.encode({
        method: "edit",
        module: "header",
        data: {
          ID_HEADER_ORI: xdtedit.ID_HEADER_ORI,
        },
      });
      var hasil = COMP.run.getservice(vconfig.service_api + "bcpemasukan_list/bcpemasukan_list", params, "POST", me.var_global.jwt);
      hasil.then(function (content) {
        var val = Ext.decode(content, true);
        if (val.success == "true") {
          if (val.dt_header !== null) {
            var dtheader = Ext.decode(val.dt_header, true);
            FRM.getForm().setValues(dtheader);
            FRM.getForm().setValues({
              COMBO_CARA_ANGKUT: dtheader.KODE_CARA_ANGKUT,
            });
          }
          if (val.dt_kontainer !== null) {
            var dtkontainer = Ext.decode(val.dt_kontainer, true);
            GRIDkontainer.getStore().add(dtkontainer);
          }
          if (val.dt_kemasan !== null) {
            var dtkemasan = Ext.decode(val.dt_kemasan, true);
            GRIDkemasan.getStore().add(dtkemasan);
          }
          if (val.dt_dokumen !== null) {
            var dtdokumen = Ext.decode(val.dt_dokumen, true);
            GRIDdokumen.getStore().add(dtdokumen);
          }
          if (val.dt_barang !== null) {
            var dtbarang = Ext.decode(val.dt_barang, true);
            GRIDbarang.getStore().add(dtbarang);
          }
          if (val.field_invoice !== null) {
            var dtinvoice = Ext.decode(val.field_invoice, true);
            FRM.getForm().setValues({
              INVOICE_NOMOR_DOKUMEN: dtinvoice.NOMOR_DOKUMEN,
              INVOICE_TANGGAL_DOKUMEN: moment(dtinvoice.TANGGAL_DOKUMEN).format("YYYY-MM-DD"),
            });
          }
          if (val.field_impor !== null) {
            var dtimpor = Ext.decode(val.field_impor, true);
            FRM.getForm().setValues({
              IMPOR_NOMOR_DOKUMEN: dtimpor.NOMOR_DOKUMEN,
              IMPOR_TANGGAL_DOKUMEN: moment(dtimpor.TANGGAL_DOKUMEN).format("YYYY-MM-DD"),
            });
          }
          if (val.field_lc !== null) {
            var dtlc = Ext.decode(val.field_lc, true);
            FRM.getForm().setValues({
              LC_NOMOR_DOKUMEN: dtlc.NOMOR_DOKUMEN,
              LC_TANGGAL_DOKUMEN: moment(dtlc.TANGGAL_DOKUMEN).format("YYYY-MM-DD"),
            });
          }
          if (val.field_awb !== null) {
            var dtawb = Ext.decode(val.field_awb, true);
            FRM.getForm().setValues({
              AWB_NOMOR_DOKUMEN: dtawb.NOMOR_DOKUMEN,
              AWB_TANGGAL_DOKUMEN: moment(dtawb.TANGGAL_DOKUMEN).format("YYYY-MM-DD"),
            });
          }
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

      COMP.run.getmodulepopup("FRMbcin_kurir", "TDK.EXIM.bcin_kurir.FRMbcin_kurir", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMbcin_kurir_load: function (frm) {
    try {
      var FRM = frm.query("form")[0];
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

      var popup = Ext.define("TDK.EXIM.bcin_kurir.popup_search", {
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
            pid: "GRIDbcin_kurir_popup_search",
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
        headers: { Authorization: "Bearer " },
        actionMethods: { read: "POST" },
        url: vconfig.service_api + modulename + "/" + modulename + "s",
        reader: {
          type: "json",
          rootProperty: "Rows",
          totalProperty: "TotalRows",
          successProperty: "success",
        },
      },
      listeners: {
        beforeload: function (store, operation, eOpts) {
          switch (modulename) {
            case "master_tps":
              var FRM_MAIN = Ext.ComponentQuery.query("FRMbcin_kurir form")[0];
              var MAIN_dtval = FRM_MAIN.getValues(false, false, false, true);
              var params = [{ property: "KODE_KANTOR", value: MAIN_dtval.KODE_KANTOR_BONGKAR }];
              operation.setParams({
                keywhere: Ext.encode(params),
              });
              break;
            case "pelabuhan_bongkar":
              var FRM_MAIN = Ext.ComponentQuery.query("FRMbcin_kurir form")[0];
              var MAIN_dtval = FRM_MAIN.getValues(false, false, false, true);
              var params = [{ property: "KODE_KANTOR", value: MAIN_dtval.KODE_KANTOR_BONGKAR }];
              operation.setParams({
                keywhere: Ext.encode(params),
              });
              break;
          }
        },
      },
    };
  },
  getcolumn: function (modulename) {
    try {
      var ncol = [];
      switch (modulename) {
        case "kppbc_bongkar":
          ncol.push(
            { header: "KODE", dataIndex: "KODE_KANTOR", sortable: true, width: 200, filter: { xtype: "textfield" } },
            { header: "NAMA", dataIndex: "URAIAN_KANTOR", sortable: true, width: 200, filter: { xtype: "textfield" } }
          );
          break;
        case "kppbc_pengawas":
          ncol.push(
            { header: "KODE", dataIndex: "KODE_KANTOR", sortable: true, width: 200, filter: { xtype: "textfield" } },
            { header: "NAMA", dataIndex: "URAIAN_KANTOR", sortable: true, width: 200, filter: { xtype: "textfield" } }
          );
          break;
        case "tujuantpb":
          ncol.push(
            { header: "KODE", dataIndex: "KODE_TUJUAN_TPB", sortable: true, width: 200, filter: { xtype: "textfield" } },
            { header: "NAMA", dataIndex: "URAIAN_TUJUAN_TPB", sortable: true, width: 200, filter: { xtype: "textfield" } }
          );
          break;
        case "pemasok":
          ncol.push(
            { header: "KODEID", dataIndex: "KODE_ID", sortable: true, width: 70, filter: { xtype: "textfield" } },
            { header: "KODE NEGARA", dataIndex: "KODE_NEGARA", sortable: true, width: 90, filter: { xtype: "textfield" } },
            { header: "NAMA", dataIndex: "NAMA", sortable: true, width: 250, filter: { xtype: "textfield" } },
            { header: "ALAMAT", dataIndex: "ALAMAT", sortable: true, width: 250, filter: { xtype: "textfield" } },
            { header: "NPWP", dataIndex: "NPWP", sortable: true, width: 100, filter: { xtype: "textfield" } }
          );
          break;
        case "importir":
          ncol.push(
            { header: "KODEID", dataIndex: "KODE_ID", sortable: true, width: 70, filter: { xtype: "textfield" } },
            { header: "NAMA", dataIndex: "NAMA", sortable: true, width: 250, filter: { xtype: "textfield" } },
            { header: "ALAMAT", dataIndex: "ALAMAT", sortable: true, width: 250, filter: { xtype: "textfield" } },
            { header: "NPWP", dataIndex: "NPWP", sortable: true, width: 100, filter: { xtype: "textfield" } }
          );
          break;
        case "pemilik":
          ncol.push(
            { header: "KODEID", dataIndex: "KODE_ID", sortable: true, width: 70, filter: { xtype: "textfield" } },
            { header: "NAMA", dataIndex: "NAMA", sortable: true, width: 250, filter: { xtype: "textfield" } },
            { header: "ALAMAT", dataIndex: "ALAMAT", sortable: true, width: 250, filter: { xtype: "textfield" } },
            { header: "NPWP", dataIndex: "NPWP", sortable: true, width: 100, filter: { xtype: "textfield" } }
          );
          break;
        case "negara":
          ncol.push(
            { header: "KODE1", dataIndex: "country_code", sortable: true, width: 70, filter: { xtype: "textfield" } },
            { header: "KODE2", dataIndex: "country_code2", sortable: true, width: 70, filter: { xtype: "textfield" } },
            { header: "NAMA", dataIndex: "country_name2", sortable: true, flex: 1, filter: { xtype: "textfield" } }
          );
          break;
        case "pelabuhan":
          ncol.push(
            { header: "KODE", dataIndex: "KODE_PELABUHAN", sortable: true, width: 70, filter: { xtype: "textfield" } },
            { header: "NAMA", dataIndex: "URAIAN_PELABUHAN", sortable: true, flex: 1, filter: { xtype: "textfield" } }
          );
          break;
        case "pelabuhan_bongkar":
          ncol.push(
            { header: "KODE", dataIndex: "KODE_PELABUHAN", sortable: true, width: 70, filter: { xtype: "textfield" } },
            { header: "NAMA", dataIndex: "URAIAN_PELABUHAN", sortable: true, flex: 1, filter: { xtype: "textfield" } }
          );
          break;
        case "jenis_kemasan":
          ncol.push(
            { header: "KODE", dataIndex: "KODE_KEMASAN", sortable: true, width: 70, filter: { xtype: "textfield" } },
            { header: "NAMA", dataIndex: "URAIAN_KEMASAN", sortable: true, flex: 1, filter: { xtype: "textfield" } }
          );
          break;
        case "jenis_dokumen":
          ncol.push(
            { header: "KODE", dataIndex: "KODE_DOKUMEN", sortable: true, width: 50, filter: { xtype: "textfield" } },
            { header: "TIPE", dataIndex: "TIPE_DOKUMEN", sortable: true, width: 50, filter: { xtype: "textfield" } },
            { header: "KETERANGAN", dataIndex: "URAIAN_DOKUMEN", sortable: true, flex: 1, filter: { xtype: "textfield" } }
          );
          break;
        case "master_tps":
          ncol.push(
            { header: "KODE", dataIndex: "KODE_TPS", sortable: true, width: 50, filter: { xtype: "textfield" } },
            { header: "NAMA", dataIndex: "URAIAN_TPS", sortable: true, flex: 1, filter: { xtype: "textfield" } }
          );
          break;
        case "valuta":
          ncol.push(
            { header: "KODE", dataIndex: "KODE_VALUTA", sortable: true, width: 50, filter: { xtype: "textfield" } },
            { header: "NAMA", dataIndex: "URAIAN_VALUTA", sortable: true, flex: 1, filter: { xtype: "textfield" } }
          );
          break;
        case "harga":
          ncol.push(
            { header: "KODE", dataIndex: "KODE_HARGA", sortable: true, width: 50, filter: { xtype: "textfield" } },
            { header: "NAMA", dataIndex: "URAIAN_HARGA", sortable: true, flex: 1, filter: { xtype: "textfield" } }
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
  btinput_dokumen_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

      COMP.run.getmodulepopup("FRMbcin_kurir_dokumen", "TDK.EXIM.bcin_kurir.FRMbcin_kurir_dokumen", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btinput_kontainer_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

      COMP.run.getmodulepopup("FRMbcin_kurir_kontainer", "TDK.EXIM.bcin_kurir.FRMbcin_kurir_kontainer", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  delete_dokumen_kontainer: function (grid, rowIndex, colIndex) {
    try {
      var me = this;
      Ext.MessageBox.confirm(
        "Konfirmasi",
        "Konfirmasi Hapus data Kontainer",
        function (button) {
          if (button === "yes") {
            var rec = grid.getStore().getAt(rowIndex);
            var params = Ext.encode({
              method: "delete",
              module: "kontainer",
              data: rec.data,
            });
            var hasil = COMP.run.getservice(vconfig.service_api + "bcin_kurir/bcin_kurir", params, "POST", me.var_global.jwt);
            hasil.then(function (content) {
              var val = Ext.decode(content, true);
              if (val.success === "true") {
                COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 3000 });
                grid.getStore().remove(rec);
                grid.getStore().commitChanges();
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
  btinput_kemasan_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

      COMP.run.getmodulepopup("FRMbcin_kurir_kemasan", "TDK.EXIM.bcin_kurir.FRMbcin_kurir_kemasan", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btinput_dokumen_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

      COMP.run.getmodulepopup("FRMbcin_kurir_dokumen", "TDK.EXIM.bcin_kurir.FRMbcin_kurir_dokumen", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  delete_dokumen_kemasan: function (grid, rowIndex, colIndex) {
    try {
      var me = this;
      Ext.MessageBox.confirm(
        "Konfirmasi",
        "Konfirmasi Hapus data Kemasan",
        function (button) {
          if (button === "yes") {
            var rec = grid.getStore().getAt(rowIndex);
            var params = Ext.encode({
              method: "delete",
              module: "kemasan",
              data: rec.data,
            });
            var hasil = COMP.run.getservice(vconfig.service_api + "bcin_kurir/bcin_kurir", params, "POST", me.var_global.jwt);
            hasil.then(function (content) {
              var val = Ext.decode(content, true);
              if (val.success === "true") {
                COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 3000 });
                grid.getStore().remove(rec);
                grid.getStore().commitChanges();
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
  btinput_barang_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

      COMP.run.getmodulepopup("FRMbcin_kurir_item", "TDK.EXIM.bcin_kurir.FRMbcin_kurir_item", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});