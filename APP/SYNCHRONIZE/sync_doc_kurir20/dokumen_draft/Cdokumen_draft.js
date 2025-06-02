Ext.define("TDK.SYNCHRONIZE.sync_doc_kurir20.dokumen_draft.Cdokumen_draft", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cdokumen_draft",
  init: function (view) {
    this.control({
      "dokumen_draft button[pid=btsearch]": { click: this.btsearch_click },
      "dokumen_draft button[pid=btsearch_invoice]": { click: this.btsearch_invoice_click },
      "popup_invoice button[pid=btselect_invoice_draft]": { click: this.btselect_invoice_draft_click },
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
  formatamount: function (value) {
    var text = Ext.util.Format.number(value, "0,000.00/i");
    return text;
  },
  formatqty: function (value) {
    var text = Ext.util.Format.number(value, "0,000/i");
    return text;
  },
  renderpage: function () {
    try {
      console.log("renderer Cproses_out");
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btsearch_click: function (btn) {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var popup = Ext.define("TDK.SYNCHRONIZE.sync_doc_kurir20.dokumen_draft.popup_btsearch", {
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
                  case "supplier":
                    var FRM = Ext.ComponentQuery.query("dokumen_draft FRMdokumen_draft")[0];
                    var popup = Ext.ComponentQuery.query("popup_btsearch")[0];
                    FRM.getForm().setValues({
                      KODE_INTERNAL: rec.data.MAPP_SUPPLIER,
                      NAMA: rec.data.NAMA,
                      ALAMAT: rec.data.ALAMAT,
                      KODE_NEGARA: rec.data.KODE_NEGARA,
                      NAMA_NEGARA: rec.data.URAIAN_NEGARA,
                    });
                    popup.close();
                    return;
                  case "kppbcbongkar":
                    var FRM = Ext.ComponentQuery.query("dokumen_draft FRMdokumen_draft")[0];
                    var popup = Ext.ComponentQuery.query("popup_btsearch")[0];
                    FRM.getForm().setValues({
                      KODE_KANTOR: rec.data.KODE_KANTOR,
                      KODE_KANTORNAME: rec.data.URAIAN_KANTOR,
                    });
                    popup.close();
                    return;
                  case "kppbcpengawas":
                    var FRM = Ext.ComponentQuery.query("dokumen_draft FRMdokumen_draft")[0];
                    var popup = Ext.ComponentQuery.query("popup_btsearch")[0];
                    FRM.getForm().setValues({
                      KODE_KANTOR_BONGKAR: rec.data.KODE_KANTOR,
                      KODE_KANTOR_BONGKARNAME: rec.data.URAIAN_KANTOR,
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
        case "supplier":
          return [
            { xtype: "rownumberer", width: 40 },
            { header: "VENDOR", dataIndex: "VENDOR", sortable: true, width: 80, filter: { xtype: "textfield" } },
            { header: "KODE", dataIndex: "MAPP_SUPPLIER", sortable: true, width: 80, filter: { xtype: "textfield" } },
            { header: "NAMA", dataIndex: "NAMA", sortable: true, width: 250, filter: { xtype: "textfield" } },
            { header: "ALAMAT", dataIndex: "ALAMAT", sortable: true, width: 300, filter: { xtype: "textfield" } },
            { header: "KODE", dataIndex: "KODE_NEGARA", sortable: true, width: 50, filter: { xtype: "textfield" } },
            { header: "NEGARA", dataIndex: "URAIAN_NEGARA", sortable: true, width: 75, filter: { xtype: "textfield" } },
            { header: "NPWP", dataIndex: "NPWP", sortable: true, width: 100, filter: { xtype: "textfield" } },
          ];
        case "kppbcbongkar":
          return [
            { xtype: "rownumberer", width: 40 },
            { header: "KODE", dataIndex: "KODE_KANTOR", sortable: true, width: 80, filter: { xtype: "textfield" } },
            { header: "URAIAN", dataIndex: "URAIAN_KANTOR", sortable: true, flex: 1, filter: { xtype: "textfield" } },
          ];
        case "kppbcpengawas":
          return [
            { xtype: "rownumberer", width: 40 },
            { header: "KODE", dataIndex: "KODE_KANTOR", sortable: true, width: 80, filter: { xtype: "textfield" } },
            { header: "URAIAN", dataIndex: "URAIAN_KANTOR", sortable: true, flex: 1, filter: { xtype: "textfield" } },
          ];
      }
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btsearch_store: function (modulename) {
    try {
      switch (modulename) {
        case "supplier":
          return {
            autoLoad: true,
            remoteSort: true,
            remoteFilter: true,
            pageSize: 15,
            proxy: {
              type: "ajax",
              disableCaching: false,
              noCache: false,
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
              actionMethods: { read: "POST" },
              url: vconfig.service_api + "sync_doc/sync_docs",
              extraParams: {
                method: "read_draft_supplier",
                module: "coo",
              },
              reader: {
                type: "json",
                rootProperty: "Rows",
                totalProperty: "TotalRows",
                successProperty: "success",
              },
            },
          };
        case "kppbcbongkar":
          return {
            autoLoad: true,
            remoteSort: true,
            remoteFilter: true,
            pageSize: 15,
            proxy: {
              type: "ajax",
              disableCaching: false,
              noCache: false,
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
              actionMethods: { read: "POST" },
              url: vconfig.service_api + "kppbc_bongkar/kppbc_bongkars",
              reader: {
                type: "json",
                rootProperty: "Rows",
                totalProperty: "TotalRows",
                successProperty: "success",
              },
            },
          };
        case "kppbcpengawas":
          return {
            autoLoad: true,
            remoteSort: true,
            remoteFilter: true,
            pageSize: 15,
            proxy: {
              type: "ajax",
              disableCaching: false,
              noCache: false,
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
              actionMethods: { read: "POST" },
              url: vconfig.service_api + "kppbc_pengawas/kppbc_pengawass",
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
  btsearch_invoice_click: function () {
    try {
      var me = this;
      var FRM = Ext.ComponentQuery.query("dokumen_draft FRMdokumen_draft")[0];
      var MAIN_dtval = FRM.getValues(false, false, false, true);
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var popup = Ext.define("TDK.SYNCHRONIZE.sync_doc_kurir20.dokumen_draft.popup_invoice", {
        extend: "Ext.window.Window",
        alias: "widget.popup_invoice",
        reference: "popup_invoice",
        title: "Pilih Invoice",
        modal: true,
        closeAction: "destroy",
        centered: true,
        autoScroll: true,
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
                headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
                actionMethods: { read: "POST" },
                url: vconfig.service_api + "sync_doc/sync_docs",
                extraParams: {
                  method: "read_draft_selectinvoice",
                  module: "coo",
                  KODE_INTERNAL: MAIN_dtval.KODE_INTERNAL,
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
              { header: "DATE", dataIndex: "INVOICE_DATE", sortable: true, width: 100, filter: { xtype: "textfield" } },
              { header: "BL", dataIndex: "BL_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
              { header: "DATE", dataIndex: "BL_DATE", sortable: true, width: 100, filter: { xtype: "textfield" } },
              { header: "CUR MONEY", dataIndex: "CURRENT_MONEY", sortable: true, width: 100, filter: { xtype: "textfield" } },
              { header: "CARA BAYAR", dataIndex: "CARA_BAYAR", sortable: true, width: 100, filter: { xtype: "textfield" } },
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
      var FRM = Ext.ComponentQuery.query("dokumen_draft FRMdokumen_draft")[0];
      var GRIDsumberdata = Ext.ComponentQuery.query("dokumen_draft FRMdokumen_draft grid[pid=GRIDsumberdata]")[0];
      var GRIDinvoicedata = Ext.ComponentQuery.query("dokumen_draft FRMdokumen_draft grid[pid=GRIDinvoicedata]")[0];
      var GRIDhasilgenerate = Ext.ComponentQuery.query("dokumen_draft FRMdokumen_draft grid[pid=GRIDhasilgenerate]")[0];
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
        method: "proses_dokumen_draft",
        module: "coo",
        invoice: Ext.encode(list_invoice),
        vendor: MAIN_dtval.KODE_INTERNAL,
      });
      var hasil = COMP.run.getservice(vconfig.service_api + "sync_doc/sync_doc", params, "POST", me.var_global.jwt);
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
