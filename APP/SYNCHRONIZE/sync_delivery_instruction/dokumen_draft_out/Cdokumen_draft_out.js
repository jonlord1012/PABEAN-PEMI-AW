Ext.define("NJC.SYNCHRONIZE.sync_delivery_instruction.dokumen_draft_out.Cdokumen_draft_out", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cdokumen_draft_out",
  init: function (view) {
    this.control({
      "aw_dokumen_draft_out button[pid=btsearch]": { click: this.btsearch_click },
      "aw_dokumen_draft_out button[pid=btsearch_invoice]": { click: this.btsearch_invoice_click },
      "aw_dokumen_draft_out button[pid=bttambah_dokumen]": { click: this.bttambah_dokumen_click },

      "aw_dokumen_draft_out button[pid=btsavedokumendraft_out]": { click: this.btsavedokumendraft_click },
      "aw_dokumen_draft_out FRMdokumen_draft_out button[pid=btgetLastAju]": { click: this.download_lastaju },

      "popup_invoice button[pid=btselect_invoice_draft]": { click: this.btselect_invoice_draft_click },
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
  formatamount: function (value) {
    var text = Ext.util.Format.number(value, "0,000.00/i");
    return text;
  },

  formatDate: function (value) {
    var text = Ext.util.Format.date(value, "Y-m-d");
    return text;
  },
  formatqty: function (value) {
    var text = Ext.util.Format.number(value, "0,000/i");
    return text;
  },
  renderpage: function () {
    try {
      console.log("Rendered Controller: " + this.alias);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btsearch_click: function (btn) {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var popup = Ext.define("TDK.SYNCHRONIZE.sync_delivery_instruction.dokumen_draft_out.popup_btsearch", {
        extend: "Ext.window.Window",
        alias: "widget.popup_btsearch",
        reference: "popup_btsearch",
        title: btn.vdata.title,
        modal: true,
        closeAction: "destroy",
        centered: true,
        width: mainpanel.getWidth() * btn.vdata.popupwidth,
        height: mainpanel.getHeight() * btn.vdata.popupheight,
        layout: { type: "vbox", pack: "start", align: "stretch" },
        bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
        items: [
          {
            xtype: "grid",
            pid: "GRIDpopup_search",
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
                  case "client":
                    var FRM = Ext.ComponentQuery.query("aw_dokumen_draft_out FRMdokumen_draft_out")[0];
                    var popup = Ext.ComponentQuery.query("popup_btsearch")[0];
                    FRM.getForm().setValues({
                      MAPPED_TENANT: rec.data.MAPPED_TENANT,
                      NAMA: rec.data.NAMA,
                      ALAMAT: rec.data.ALAMAT,
                      KODE_NEGARA: rec.data.KODE_NEGARA,
                      NAMA_NEGARA: rec.data.URAIAN_NEGARA,
                    });
                    popup.close();
                    return;
                  case "referensi_negara":
                    var FRM = Ext.ComponentQuery.query("aw_dokumen_draft_out FRMdokumen_draft_out")[0];
                    var popup = Ext.ComponentQuery.query("popup_btsearch")[0];
                    FRM.getForm().setValues({
                      KODE_BENDERA: rec.data.KODE_NEGARA,
                      KODE_BENDERANAME: rec.data.URAIAN_NEGARA,
                    });
                    popup.close();
                    return;
                  case "pelabuhan_muat":
                    var FRM = Ext.ComponentQuery.query("aw_dokumen_draft_out FRMdokumen_draft_out")[0];
                    var popup = Ext.ComponentQuery.query("popup_btsearch")[0];
                    FRM.getForm().setValues({
                      KODE_PEL_MUAT: rec.data.KODE_PELABUHAN,
                      KODE_PEL_MUATNAME: rec.data.URAIAN_PELABUHAN,
                    });
                    popup.close();
                    return;
                  case "pelabuhan_transit":
                    var FRM = Ext.ComponentQuery.query("aw_dokumen_draft_out FRMdokumen_draft_out")[0];
                    var popup = Ext.ComponentQuery.query("popup_btsearch")[0];
                    FRM.getForm().setValues({
                      KODE_PEL_TRANSIT: rec.data.KODE_PELABUHAN,
                      KODE_PEL_TRANSITNAME: rec.data.URAIAN_PELABUHAN,
                    });
                    popup.close();
                    return;
                  case "pelabuhan_bongkar":
                    var FRM = Ext.ComponentQuery.query("aw_dokumen_draft_out FRMdokumen_draft_out")[0];
                    var popup = Ext.ComponentQuery.query("popup_btsearch")[0];
                    FRM.getForm().setValues({
                      KODE_PEL_BONGKAR: rec.data.KODE_PELABUHAN,
                      KODE_PEL_BONGKARNAME: rec.data.URAIAN_PELABUHAN,
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
        case "client":
          return [
            { xtype: "rownumberer", width: 40 },
            { header: "CLIENT", dataIndex: "CLIENT", sortable: true, width: 80, filter: { xtype: "textfield" } },
            { header: "KODE", dataIndex: "MAPPED_TENANT", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "NAMA", dataIndex: "NAMA", sortable: true, width: 300, filter: { xtype: "textfield" } },
            { header: "ALAMAT", dataIndex: "ALAMAT", sortable: true, width: 350, filter: { xtype: "textfield" } },
            { header: "KODE", dataIndex: "KODE_NEGARA", sortable: true, width: 50, filter: { xtype: "textfield" } },
            { header: "NEGARA", dataIndex: "URAIAN_NEGARA", sortable: true, width: 110, filter: { xtype: "textfield" } },
            { header: "NPWP", dataIndex: "NPWP", sortable: true, width: 120, filter: { xtype: "textfield" } },
          ];
        case "referensi_negara":
          return [
            { xtype: "rownumberer", width: 40 },
            { header: "KODE", dataIndex: "KODE_NEGARA", sortable: true, width: 80, filter: { xtype: "textfield" } },
            { header: "URAIAN", dataIndex: "URAIAN_NEGARA", sortable: true, flex: 1, filter: { xtype: "textfield" } },
          ];
        case "kppbcpengawas":
          return [
            { xtype: "rownumberer", width: 40 },
            { header: "KODE", dataIndex: "KODE_KANTOR", sortable: true, width: 80, filter: { xtype: "textfield" } },
            { header: "URAIAN", dataIndex: "URAIAN_KANTOR", sortable: true, flex: 1, filter: { xtype: "textfield" } },
          ];
        case "pelabuhan_muat":
        case "pelabuhan_transit":
        case "pelabuhan_bongkar":
          return [
            { xtype: "rownumberer", width: 40 },
            { header: "KODE", dataIndex: "KODE_PELABUHAN", sortable: true, width: 80, filter: { xtype: "textfield" } },
            { header: "URAIAN", dataIndex: "URAIAN_PELABUHAN", sortable: true, flex: 1, filter: { xtype: "textfield" } },
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
        case "client":
          return {
            autoLoad: true,
            remoteSort: true,
            remoteFilter: true,
            pageSize: 0,
            proxy: {
              type: "ajax",
              disableCaching: false,
              noCache: false,
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
              actionMethods: { read: "POST" },
              url: vconfig.service_api + "sync_delivery_instruction/sync_delivery_instructions",
              extraParams: {
                method: "read_clients",
                module: "aw",
              },
              reader: {
                type: "json",
                rootProperty: "Rows",
                totalProperty: "TotalRows",
                successProperty: "success",
              },
            },
          };
        case "referensi_negara":
          return {
            autoLoad: true,
            remoteSort: true,
            remoteFilter: true,
            pageSize: 0,
            proxy: {
              type: "ajax",
              disableCaching: false,
              noCache: false,
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
              actionMethods: { read: "POST" },
              url: vconfig.service_api + "referensi_negara/referensi_negaras",
              reader: {
                type: "json",
                rootProperty: "Rows",
                totalProperty: "TotalRows",
                successProperty: "success",
              },
            },
          };
        case "pelabuhan_muat":
        case "pelabuhan_transit":
        case "pelabuhan_bongkar":
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
              url: vconfig.service_api + "referensi_pelabuhan/referensi_pelabuhans",
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
  btsearch_invoice_click: function () {
    try {
      var me = this;
      var FRM = Ext.ComponentQuery.query("aw_dokumen_draft_out FRMdokumen_draft_out")[0];
      var MAIN_dtval = FRM.getValues(false, false, false, true);
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var popup = Ext.define("NJC.SYNCHRONIZE.sync_delivery_instruction.dokumen_draft_out.popup_invoice", {
        extend: "Ext.window.Window",
        alias: "widget.popup_invoice",
        reference: "popup_invoice",
        title: "Pilih Invoice",
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
            pid: "GRIDpopup_invoice_select",
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
                url: vconfig.service_api + "sync_delivery_instruction/sync_delivery_instructions",
                extraParams: {
                  method: "read_draft_selectinvoice",
                  module: "plb",
                  MAPPED_TENANT: MAIN_dtval.MAPPED_TENANT,
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
              { header: "INVOICE", dataIndex: "INVOICE_NO", sortable: true, width: 150, filter: { xtype: "textfield" } },
              { header: "INVOICE DATE", dataIndex: "INVOICE_DATE", sortable: true, width: 120, filter: { xtype: "textfield" } },
              { header: "TENANT INVOICE", dataIndex: "TENANT_INVOICE_NO", sortable: true, width: 150, filter: { xtype: "textfield" } },
              { header: "ORDER QTY", dataIndex: "ORDER_QTY", sortable: true, width: 100, filter: { xtype: "textfield" } },
            ],
            tbar: ["-", { xtype: "button", pid: "btselect_invoice_draft", text: "Pilih Invoice", icon: vconfig.getstyle + "icon/check.png", tooltip: "Pilih Invoice" }],
            bbar: {
              xtype: "pagingtoolbar",
              displayInfo: true,
              displayMsg: "Total Data {2}",
              emptyMsg: "No topics to display",
            },
            listeners: {
              itemdblclick: "select_invoice_draft",
            },
          },
        ],
      });
      COMP.run.getmodulepopup("popup_invoice", popup, this.getView());
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btselect_invoice_draft_click: function () {
    try {
      var me = this;
      var popup = Ext.ComponentQuery.query("popup_invoice")[0];
      var FRM = Ext.ComponentQuery.query("aw_dokumen_draft_out FRMdokumen_draft_out")[0];
      var GRIDsumberdata = Ext.ComponentQuery.query("aw_dokumen_draft_out FRMdokumen_draft_out grid[pid=GRIDsumberdata]")[0];
      var GRIDexbcfg = Ext.ComponentQuery.query("aw_dokumen_draft_out FRMdokumen_draft_out grid[pid=GRIDexbcfg]")[0];
      var GRIDinvoicedata = Ext.ComponentQuery.query("aw_dokumen_draft_out FRMdokumen_draft_out grid[pid=GRIDinvoice_dokumen_draft]")[0];
      var GRIDhasilgenerate = Ext.ComponentQuery.query("aw_dokumen_draft_out FRMdokumen_draft_out grid[pid=GRIDhasilgenerate]")[0];
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
        method: "SP_TR_PLB_DRAFT_OUT_SELECT_INVOICE",
        module: "aw",
        invoice: Ext.encode(list_invoice),
        client: MAIN_dtval.CLIENT,
      });
      var hasil = COMP.run.getservice(vconfig.service_api + "sync_delivery_instruction/sync_delivery_instruction", params, "POST", me.var_global.jwt);
      hasil.then(function (content) {
        var val = Ext.decode(content, true);
        if (val.success == "true") {
          COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 2000 });
          var vsumberdata = Ext.decode(val.vjson_sumberdata);
          var vinvoicedata = Ext.decode(val.vjson_invoice);
          var vexbcfg = Ext.decode(val.vjson_exbcfg);
          var STGRIDsumberdata = new Ext.data.Store({
            data: vsumberdata,
          });
          var STGRIDinvoicedata = new Ext.data.Store({
            data: vinvoicedata,
          });
          var STGRIDexbcfg = new Ext.data.Store({
            data: vsumberdata,
          });
          GRIDsumberdata.reconfigure(STGRIDsumberdata);
          GRIDinvoicedata.reconfigure(STGRIDinvoicedata);
          GRIDexbcfg.reconfigure(STGRIDexbcfg);
          popup.close();
        } else {
          COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 2000 });
        }
      }, this);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  bttambah_dokumen_click: function () {
    try {
      var me = this;

      var griddokumen = Ext.ComponentQuery.query("aw_dokumen_draft_out FRMdokumen_draft_out grid[pid=GRIDinvoice_dokumen_draft]")[0];

      if (griddokumen.getStore().getDataSource().length < 1) {
        COMP.TipToast.toast("Error", "Pilih Invoice lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }

      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var popup = Ext.define("NJC.SYNCHRONIZE.sync_delivery_instruction.dokumen_draft_out.popup_btadddokumen", {
        extend: "Ext.window.Window",
        alias: "widget.popup_btadddokumen",
        reference: "popup_btadddokumen",
        title: "Tambah Dokumen",
        modal: true,
        closeAction: "destroy",
        centered: true,
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
                    { property: "KODE_DOKUMEN!=", value: "740" },
                    { property: "KODE_DOKUMEN!=", value: "741" },
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
                  var griddokumen = Ext.ComponentQuery.query("aw_dokumen_draft_out FRMdokumen_draft_out grid[pid=GRIDinvoice_dokumen_draft]")[0];

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

  download_lastaju: function () {
    try {
      var me = this;
      var FRM = Ext.ComponentQuery.query("aw_dokumen_draft_out FRMdokumen_draft_out")[0];
      var MAIN_dtval = FRM.getValues(false, false, false, true);
      var params = Ext.encode({
        method: "testLast",
        NOMORAJU: MAIN_dtval.NOMOR_AJU,
        KODEDOKUMEN: MAIN_dtval.CBO_BC,
      });
      console.log("Button LAST AJU Executed " + MAIN_dtval.CBO_BC);

      if (MAIN_dtval.CBO_BC === "0") {
        COMP.TipToast.toast("Error", "Pilih TIPE BC lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      var tipebc = ["41", "27", "25"];
      if (!tipebc.find(e => e === MAIN_dtval.CBO_BC)) {
        COMP.TipToast.toast("Error", "Tipe BC yang diperbolehkan 41, 27 & 25", { cls: "danger", delay: 2000 });
        return false;
      }
      var hasil = COMP.run.getservice(vconfig.service_portal + "main/testLast", params, "POST", me.var_global.jwt);
      hasil.then(function (content) {
        var val = Ext.decode(content, true);
        var last_aju = val.data[0].nomorAju;
        var draft_aju = "DRAFT-0000" + MAIN_dtval.CBO_BC + "000000" + moment().format('YYYYMMDD') + (+(last_aju.substr(last_aju.length - 6)) + 1);
        console.log("Results: " + val.data[0].nomorAju);
        console.log(+(last_aju.substr(last_aju.length - 6)) + 1);
        //FRM.getForm().setValues(val.data[0]);
        FRM.getForm().setValues({ DRAFT_AJU: draft_aju });
      }, this);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btsavedokumendraft_click: function () {
    try {
      var me = this;
      var popup = Ext.ComponentQuery.query("aw_dokumen_draft_out")[0];
      var FRM = Ext.ComponentQuery.query("aw_dokumen_draft_out FRMdokumen_draft_out")[0];
      var dtval = FRM.getValues(false, false, false, true);
      var griddokumen = Ext.ComponentQuery.query("aw_dokumen_draft_out FRMdokumen_draft_out grid[pid=GRIDinvoice_dokumen_draft]")[0];
      console.log(dtval);
      if (dtval.KODE_INTERNAL === "") {
        COMP.TipToast.toast("Error", "Pilih CLIENT lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      if (dtval.CBO_BC === "0") {
        COMP.TipToast.toast("Error", "Pilih TIPE BC lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      if (griddokumen.getStore().getDataSource().length < 1) {
        COMP.TipToast.toast("Error", "Pilih Invoice lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      if (griddokumen.getStore().getDataSource().find("KODE_JENIS_DOKUMEN", "380") === null) {
        COMP.TipToast.toast("Error", "Pilih Invoice lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }

      var vform = {
        MODULE_SOURCE: "PLB",
        CBO_BC: dtval.CBO_BC,
        MAPPED_TENANT: dtval.MAPPED_TENANT,
        DRAFT_AJU: dtval.DRAFT_AJU,
        IS_KIRIM_BALIK: dtval.IS_KIRIM_BALIK,
        NOMOR_KONTRAK: dtval.NOMOR_KONTRAK,
        TANGGAL_KONTRAK: moment(dtval.TANGGAL_KONTRAK).format("YYYY-MM-DD"),
        TANGGAL_HABIS_KONTRAK: moment(dtval.TANGGAL_HABIS_KONTRAK).format("YYYY-MM-DD"),

      };
      var vdokumen = [];
      var vnodokumen = 1;

      griddokumen
        .getStore()
        .getDataSource()
        .each(function (record, index, count) {
          vdokumen.push({
            KODE_JENIS_DOKUMEN: record.data.KODE_JENIS_DOKUMEN,
            NOMOR_DOKUMEN: record.data.NOMOR_DOKUMEN,
            TANGGAL_DOKUMEN: record.data.TANGGAL_DOKUMEN,
            SERI_DOKUMEN: vnodokumen,
          });
          vnodokumen++;
        });

      var params = Ext.encode({
        method: "proses_save_dokumen_draft",
        header: Ext.encode(vform),
        dokumen: Ext.encode(vdokumen),
        BCTYPE: dtval.CBO_BC,
        AJU_DRAFT: dtval.DRAFT_AJU
      });

      var hasil = COMP.run.getservice(vconfig.service_api + "sync_delivery_instruction/sync_delivery_instruction", params, "POST", me.var_global.jwt);
      hasil.then(function (content) {
        var val = Ext.decode(content, true);
        if (val.success == "true") {
          COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 2000 });
          popup.close();
        } else {
          COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 2000 });
        }
      }, this);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  awFRMdokumen_draft_out_load: function (FRM) {
    try {
      FRM.getForm().reset();
      var GRIDsumberdata = FRM.query("grid[pid=GRIDsumberdata]")[0];
      GRIDsumberdata.getStore().removeAll();
      GRIDsumberdata.getStore().commitChanges();

      //var GRIDkontainer = FRM.query("grid[pid=]");
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});
