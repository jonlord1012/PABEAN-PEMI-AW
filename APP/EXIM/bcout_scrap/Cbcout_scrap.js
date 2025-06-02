Ext.define("NJC.EXIM.bcout_scrap.Cbcout_scrap", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cbcout_scrap",
  init: function (view) {
    this.control({
      "bcout_scrap GRIDbcout_scrap button[pid=btnew]": { click: this.btnew_click },
      "bcout_scrap grid[pid=GRIDbcout_scrap]": { itemdblclick: this.GRIDbcout_scrap_itemdblclick },
      "FRMbcout_scrap button[pid=btsearch]": { click: this.btsearch_click },
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
  GRIDbcout_scrap_load: function () {
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
          url: vconfig.service_api + "bcpengeluaran_list/bcpengeluaran_lists",
          extraParams: {
            kode_dokumen_pabean: "scrap",
          },
          reader: {
            type: "json",
            rootProperty: "Rows",
            totalProperty: "TotalRows",
            successProperty: "success",
          },
        },
      });

      var GRID = Ext.ComponentQuery.query("bcout_scrap GRIDbcout_scrap grid[pid=GRIDbcout_scrap]")[0];
      GRID.reconfigure(STGRIDnew);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  GRIDbcout_scrap_itemdblclick: function (cmp, rec) {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var vdt = rec.data;
      var load_edit = COMP.run.getmodulepopup("FRMbcout_scrap", "NJC.EXIM.bcout_scrap.FRMbcout_scrap", mainpanel);
      if (load_edit) {
        var FRM = Ext.ComponentQuery.query("FRMbcout_scrap")[0];
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
      var load_edit = COMP.run.getmodulepopup("FRMbcout_scrap", "NJC.EXIM.bcout_scrap.FRMbcout_scrap", mainpanel);
      if (load_edit) {
        var FRM = Ext.ComponentQuery.query("FRMbcout_scrap")[0];
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
      var hasil = COMP.run.getservice(vconfig.service_api + "bcpengeluaran_list/bcpengeluaran_list", params, "POST", me.var_global.jwt);
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

      COMP.run.getmodulepopup("FRMbcout_scrap", "NJC.EXIM.bcout_scrap.FRMbcout_scrap", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMbcout_scrap_load: function (frm) {
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
});