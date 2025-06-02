Ext.define("TDK.EXIM.bcout_ppb.Cbcout_ppb", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cbcout_ppb",
  init: function (view) {
    this.control({
      "bcout_ppb GRIDbcout_ppb button[pid=btnew]": { click: this.btnew_click },
      "bcout_ppb grid[pid=GRIDbcout_ppb]": { itemdblclick: this.GRIDbcout_ppb_itemdblclick },
      "FRMbcout_ppb button[pid=bttambah_dokumen]": { click: this.bttambah_dokumen_click },
      "FRMbcout_ppb button[pid=btsearch]": { click: this.btsearch_click },
      "FRMbcout_ppb button[pid=btinput_item_detail]": { click: this.btinput_item_detail_click },
      "FRMbcout_ppb button[pid=btinput_item_impor]": { click: this.btinput_item_impor_click },
      "FRMbcout_ppb button[pid=btinput_item_lokal]": { click: this.btinput_item_lokal_click },
      "FRMbcout_ppb_item_detail button[pid=btedit_dokumen_item_detail]": { click: this.btedit_dokumen_item_detail_click },
      "FRMbcout_ppb_item_lokal button[pid=btedit_dokumen_item_lokal]": { click: this.btedit_dokumen_item_lokal_click },
      "FRMbcout_ppb_item_impor button[pid=btedit_dokumen_item_impor]": { click: this.btedit_dokumen_item_impor_click },

      "FRMbcout_ppb_item_detail button[pid=btinput_bea_masuk_tambahan]": { click: this.btinput_bea_masuk_tambahan_click },
      "FRMbcout_ppb_item_impor button[pid=btinput_bea_masuk_tambahan]": { click: this.btinput_bea_masuk_tambahan_click },
      
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
  GRIDbcout_25_load: function () {
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
            kode_dokumen_pabean: "25",
          },
          reader: {
            type: "json",
            rootProperty: "Rows",
            totalProperty: "TotalRows",
            successProperty: "success",
          },
        },
      });

      var GRID = Ext.ComponentQuery.query("bcout_25 GRIDbcout_25 grid[pid=GRIDbcout_25]")[0];
      GRID.reconfigure(STGRIDnew);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  GRIDbcout_25_itemdblclick: function (cmp, rec) {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var vdt = rec.data;
      var load_edit = COMP.run.getmodulepopup("FRMbcout_25", "TDK.EXIM.bcout_25.FRMbcout_25", mainpanel);
      if (load_edit) {
        var FRM = Ext.ComponentQuery.query("FRMbcout_25")[0];
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
      var load_edit = COMP.run.getmodulepopup("FRMbcout_25", "TDK.EXIM.bcout_25.FRMbcout_25", mainpanel);
      if (load_edit) {
        var FRM = Ext.ComponentQuery.query("FRMbcout_25")[0];
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

      COMP.run.getmodulepopup("FRMbcout_25", "TDK.EXIM.bcout_25.FRMbcout_25", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMbcout_25_load: function (frm) {
    try {
      var FRM = frm.query("form")[0];
      FRM.getForm().reset();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btsearch_click: function (btn) {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var popup = Ext.define("TDK.EXIM.bcout_25.popup_btsearch", {
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
                  case "kantorpabean":
                    var FRM = Ext.ComponentQuery.query("FRMbcout_25 form")[0];
                    var popup = Ext.ComponentQuery.query("popup_btsearch")[0];
                    FRM.getForm().setValues({
                      URAIAN_KANTOR: rec.data.URAIAN_KANTOR,
                      KODE_KANTOR: rec.data.KODE_KANTOR,
                    });
                    popup.close();
                    return;
                  case "valuta":
                    var FRM = Ext.ComponentQuery.query("FRMbcout_25 form")[0];
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
        case "kantorpabean":
          return [
            { xtype: "rownumberer", width: 40 },
            { header: "KODE KANTOR", dataIndex: "KODE_KANTOR", sortable: true, width: 120, filter: { xtype: "textfield" } },
            { header: "NAMA KANTOR", dataIndex: "URAIAN_KANTOR", sortable: true, width: 350, filter: { xtype: "textfield" } },
          ];
        case "valuta":
          return [
            { xtype: "rownumberer", width: 40 },
            { header: "KODE VALUTA", dataIndex: "KODE_VALUTA", sortable: true, width: 120, filter: { xtype: "textfield" } },
            { header: "NAMA VALUTA", dataIndex: "URAIAN_VALUTA", sortable: true, width: 350, filter: { xtype: "textfield" } },
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
            pageSize: 25,
            proxy: {
              type: "ajax",
              disableCaching: false,
              noCache: false,
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
              actionMethods: { read: "POST" },
              url: vconfig.service_api + "referensi_kantor_pabean/referensi_kantor_pabeans",
              extraParams: {
                method: "read",
                module: "bcout25",
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
            pageSize: 25,
            proxy: {
              type: "ajax",
              disableCaching: false,
              noCache: false,
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
              actionMethods: { read: "POST" },
              url: vconfig.service_api + "valuta/valutas",
              extraParams: {
                method: "read",
                module: "bcin23",
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

      var griddokumen = Ext.ComponentQuery.query("FRMbcout_25 grid[pid=GRIDbcout_25_input_dokumen]")[0];

      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var popup = Ext.define("TDK.EXIM.bcout_25.popup_btadddokumen", {
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
                    { property: "KODE_DOKUMEN!=", value: "740" },
                    { property: "KODE_DOKUMEN!=", value: "741" },
                    { property: "KODE_DOKUMEN!=", value: "704" },
                    { property: "KODE_DOKUMEN!=", value: "705" },
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
                  var griddokumen = Ext.ComponentQuery.query("FRMbcout_25 grid[pid=GRIDbcout_25_input_dokumen]")[0];

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
  btinput_item_lokal_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

      COMP.run.getmodulepopup("FRMbcout_25_item_lokal", "TDK.EXIM.bcout_25.FRMbcout_25_item_lokal", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btinput_item_impor_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

      COMP.run.getmodulepopup("FRMbcout_25_item_impor", "TDK.EXIM.bcout_25.FRMbcout_25_item_impor", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btinput_item_detail_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

      COMP.run.getmodulepopup("FRMbcout_25_item_detail", "TDK.EXIM.bcout_25.FRMbcout_25_item_detail", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btinput_bea_masuk_tambahan_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

      COMP.run.getmodulepopup("FRMbcout_25_bea_masuk_tambahan", "TDK.EXIM.bcout_25.FRMbcout_25_bea_masuk_tambahan", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btedit_dokumen_item_detail_click: function () {
    try {
      var me = this;

      var griddokumen = Ext.ComponentQuery.query("FRMbcout_25_item_detail grid[pid=GRIDbcout_25_input_dokumen]")[0];

      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var popup = Ext.define("TDK.EXIM.bcout_25.popup_btadddokumen", {
        extend: "Ext.window.Window",
        alias: "widget.popup_btadddokumen",
        reference: "popup_btadddokumen",
        title: "Edit Dokumen",
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
                    { property: "KODE_DOKUMEN!=", value: "740" },
                    { property: "KODE_DOKUMEN!=", value: "741" },
                    { property: "KODE_DOKUMEN!=", value: "704" },
                    { property: "KODE_DOKUMEN!=", value: "705" },
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
                  var griddokumen = Ext.ComponentQuery.query("FRMbcout_25_item_detail grid[pid=GRIDbcout_25_input_dokumen]")[0];

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
  btedit_dokumen_item_lokal_click: function () {
    try {
      var me = this;

      var griddokumen = Ext.ComponentQuery.query("FRMbcout_25_item_lokal grid[pid=GRIDbcout_25_input_dokumen]")[0];

      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var popup = Ext.define("TDK.EXIM.bcout_25.popup_btadddokumen", {
        extend: "Ext.window.Window",
        alias: "widget.popup_btadddokumen",
        reference: "popup_btadddokumen",
        title: "Edit Dokumen",
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
                    { property: "KODE_DOKUMEN!=", value: "740" },
                    { property: "KODE_DOKUMEN!=", value: "741" },
                    { property: "KODE_DOKUMEN!=", value: "704" },
                    { property: "KODE_DOKUMEN!=", value: "705" },
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
                  var griddokumen = Ext.ComponentQuery.query("FRMbcout_25_item_lokal grid[pid=GRIDbcout_25_input_dokumen]")[0];

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
  btedit_dokumen_item_impor_click: function () {
    try {
      var me = this;

      var griddokumen = Ext.ComponentQuery.query("FRMbcout_25_item_impor grid[pid=GRIDbcout_25_input_dokumen]")[0];

      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var popup = Ext.define("TDK.EXIM.bcout_25.popup_btadddokumen", {
        extend: "Ext.window.Window",
        alias: "widget.popup_btadddokumen",
        reference: "popup_btadddokumen",
        title: "Edit Dokumen",
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
                    { property: "KODE_DOKUMEN!=", value: "740" },
                    { property: "KODE_DOKUMEN!=", value: "741" },
                    { property: "KODE_DOKUMEN!=", value: "704" },
                    { property: "KODE_DOKUMEN!=", value: "705" },
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
                  var griddokumen = Ext.ComponentQuery.query("FRMbcout_25_item_impor grid[pid=GRIDbcout_25_input_dokumen]")[0];

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