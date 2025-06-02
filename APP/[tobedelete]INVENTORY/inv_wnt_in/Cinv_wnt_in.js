Ext.define("TDK.INVENTORY.inv_wnt_in.Cinv_wnt_in", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cinv_wnt_in",
  init: function (view) {
    this.control({
      //"inv_wnt_in GRIDinv_wnt_in button[pid=btnew]": { click: this.btnew_click },
      "inv_wnt_in button[pid=btreceiving_manual]": { click: this.btreceiving_manual_click },
      "button[pid=btsearch]": { click: this.btsearch_click },
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
  btreceiving_manual_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

      COMP.run.getmodulepopup("FRMinv_wnt_in_manual", "TDK.INVENTORY.inv_wnt_in.FRMinv_wnt_in_manual", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btsearch_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var FRM = Ext.ComponentQuery.query("FRMinv_wnt_in_manual form")[0];
      var FRM_val = FRM.getValues(false, false, false, true);
      if (FRM_val.CBO_SOURCE === null) {
        COMP.TipToast.toast("Error", "Pilih Sumber Data lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      var popup = Ext.define("TDK.INVENTORY.inv_wnt_in.popup_list_source", {
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
                url: vconfig.service_api + "inv_wnt_in/inv_wnt_ins",
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
                    method: "read_list_source_" + FRM_val.CBO_SOURCE,
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
              { header: "INVOICE", dataIndex: "INVOICE_NO", sortable: true, width: 150, filter: { xtype: "textfield" } },
              { header: "GR SUPPLIER", dataIndex: "GR_SUPPLIERNO", sortable: true, width: 120, filter: { xtype: "textfield" } },
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
      var FRM = Ext.ComponentQuery.query("FRMinv_wnt_in_manual form")[0];
      var FRM_val = FRM.getValues(false, false, false, true);
      var GRID = Ext.ComponentQuery.query("FRMinv_wnt_in_manual grid[pid=GRIDFRMinv_wnt_in]")[0];

      var params = Ext.encode({
        method: "receiving_wnt_select_aju",
        vmodule: FRM_val.CBO_SOURCE,
        vdata: Ext.encode(rec.data),
      });
      var hasil = COMP.run.getservice(vconfig.service_api + "inv_wnt_in/inv_wnt_in", params, "POST", me.var_global.jwt);
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
});
