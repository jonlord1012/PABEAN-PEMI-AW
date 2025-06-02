Ext.define("TDK.SYNCHRONIZE.sync_doc_sa.Csync_doc_sa", {
  extend: "Ext.app.ViewController",
  alias: "controller.Csync_doc_sa",
  init: function (view) {
    this.control({
      "sync_doc_sa button[pid=btrefresh]": { click: this.btrefresh_click },
      "sync_doc_sa combobox[name=CBO_FILTERKEY]": { change: this.btrefresh_click },
      "sync_doc_sa button[pid=btproses_draft]": { click: this.btproses_draft_click },
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
      console.log("renderer controller sync_doc_sa");
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btrefresh_click: function () {
    try {
      var GRIDsync_doc_sa = Ext.ComponentQuery.query("GRIDsync_doc_sa grid[pid=GRIDsync_doc_sa]")[0];
      GRIDsync_doc_sa.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btproses_draft_click: function () {
    try {
      var GRIDsync_doc_sa = Ext.ComponentQuery.query("GRIDsync_doc_sa grid[pid=GRIDsync_doc_sa]")[0];
      var GRIDsync_doc_sa = GRIDsync_doc_sa.getSelectionModel();
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("FRMsync_doc_sa_draft", "TDK.SYNCHRONIZE.sync_doc_sa.FRMsync_doc_sa_draft", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btsearch_sa_list_click: function () {
    try {
      var me = this;
      var FRMsync_doc_sa_draft = Ext.ComponentQuery.query("FRMsync_doc_sa_draft form")[0];
      var vdt = FRMsync_doc_sa_draft.getValues(false, false, false, true);
      if (vdt.BC_TYPE === "" || vdt.BC_TYPE === null) {
        COMP.TipToast.toast("Error", "Pilih Dokumen BC lebih dulu", { cls: "danger", delay: 2000 });
        return;
      }
      var mainpanel = this.getView();
      var popup = new Ext.define("TDK.SYNCHRONIZE.sync_doc_sa.popup_dokumen_sa", {
        extend: "Ext.window.Window",
        alias: "widget.popup_dokumen_sa",
        reference: "popup_dokumen_sa",
        title: "List Vendor/Supplier",
        modal: true,
        closeAction: "destroy",
        centered: true,
        autoScroll: true,
        width: mainpanel.getWidth() * 0.75,
        height: mainpanel.getHeight() * 0.75,
        layout: { type: "vbox", pack: "start", align: "stretch" },
        bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
        items: [
          {
            xtype: "grid",
            pid: "GRIDpopup_btsupplier_list",
            emptyText: "No Matching Records",
            autoScroll: true,
            flex: 1,
            store: {
              autoLoad: true,
              remoteSort: false,
              remoteFilter: true,
              pageSize: 0,
              proxy: {
                type: "ajax",
                disableCaching: false,
                noCache: false,
                headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
                actionMethods: { read: "POST" },
                url: vconfig.service_api + "sync_doc_sa/sync_doc_sas",
                extraParams: {
                  method: "read_doc_sa_list",
                },
                reader: {
                  type: "json",
                  rootProperty: "Rows",
                  totalProperty: "TotalRows",
                  successProperty: "success",
                },
              },
            },
            plugins: ["filterfield"],
            viewConfig: {
              enableTextSelection: true,
            },
            columns: [
              { xtype: "rownumberer", width: 40 },
              { header: "SA NO", dataIndex: "SANO", sortable: true, width: 180, filter: { xtype: "textfield" } },
              { header: "SA DATE", dataIndex: "SADATE", sortable: true, width: 100, filter: { xtype: "textfield" } },
              { header: "ETD", dataIndex: "ETDPEMI", sortable: true, width: 100, filter: { xtype: "textfield" } },
              { header: "SHIPPING", dataIndex: "SHIPPINGTYPE", sortable: true, width: 60, filter: { xtype: "textfield" } },
              { header: "SHIP NAME", dataIndex: "SHIPPING_NAME", sortable: true, width: 80, filter: { xtype: "textfield" } },
              { header: "CODE", dataIndex: "CUST_CODE", sortable: true, width: 50, filter: { xtype: "textfield" } },
              { header: "CUSTOMER", dataIndex: "CUSTOMER", sortable: true, width: 300, filter: { xtype: "textfield" } },
            ],
            bbar: {
              xtype: "pagingtoolbar",
              displayInfo: true,
              displayMsg: "Displaying topics {0} - {1} of {2}",
              emptyMsg: "No topics to display",
            },
            listeners: {
              itemdblclick: function (xgrid, rec) {
                var vdt = rec.data;
                var FRMsync_doc_sa_draft = Ext.ComponentQuery.query("FRMsync_doc_sa_draft form")[0];
                var dtform = FRMsync_doc_sa_draft.getValues(false, false, false, true);
                var popup = Ext.ComponentQuery.query("popup_dokumen_sa")[0];
                var GRIDinvoice_header = Ext.ComponentQuery.query("FRMsync_doc_sa_draft grid[pid=GRIDinvoice_header]")[0];
                var GRIDinvoice_item = Ext.ComponentQuery.query("FRMsync_doc_sa_draft grid[pid=GRIDinvoice_item]")[0];
                FRMsync_doc_sa_draft.getForm().setValues({
                  SANO: vdt.SANO,
                  SADATE: vdt.SADATE,
                  ETDPEMI: vdt.ETDPEMI,
                  CUST_CODE: vdt.CUST_CODE,
                  CUSTOMER: vdt.CUSTOMER,
                  SHIPPING_NAME: vdt.SHIPPING_NAME,
                });
                //GRIDinvoice_header.getStore().removeAll();

                vdt.BC_TYPE = dtform.BC_TYPE;
                var params = Ext.encode({
                  method: "process_data",
                  vmodule: "show_data",
                  vheader: Ext.encode(vdt),
                  vdetail: "",
                });
                var hasil = COMP.run.getservice(vconfig.service_api + "sync_doc_sa/sync_doc_sa", params, "POST", me.var_global.jwt);
                hasil.then(function (content) {
                  var val = Ext.decode(content, true);
                  if (val.success === "true") {
                    var VJSON_INVOICE = Ext.decode(val.JSON_INVOICE, true);
                    var VJSON_ITEM = Ext.decode(val.JSON_ITEM, true);
                    COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 3000 });
                    popup.close();
                    GRIDinvoice_header.getStore().load();
                    GRIDinvoice_item.getStore().load();
                  } else {
                    COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 3000 });
                  }
                }, this);
              },
            },
          },
        ],
      });
      COMP.run.getmodulepopup("popup_dokumen_sa", popup, this.getView());
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});
