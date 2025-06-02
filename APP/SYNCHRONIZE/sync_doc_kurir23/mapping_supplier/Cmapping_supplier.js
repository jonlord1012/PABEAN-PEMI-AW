Ext.define("TDK.SYNCHRONIZE.sync_doc_kurir23.mapping_supplier.Cmapping_supplier", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cmapping_supplier",
  init: function (view) {
    this.control({
      "mapping_supplier button[pid=btautomapping]": { click: this.btautomapping_click },
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
    var text = Ext.util.Format.number(value, "0,000.0000/i");
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
  btpilihsupplier_mapping: function (grid, rowIndex) {
    try {
      grid.getSelectionModel().select(rowIndex);
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var popup = Ext.define("TDK.SYNCHRONIZE.sync_doc_kurir23.mapping_supplier.popup_selectvendor", {
        extend: "Ext.window.Window",
        alias: "widget.popup_selectvendor",
        reference: "popup_selectvendor",
        title: "Mapping Manual Supplier",
        modal: true,
        closeAction: "destroy",
        centered: true,
        autoScroll: true,
        width: mainpanel.getWidth() * 0.8,
        height: mainpanel.getHeight() * 0.7,
        layout: { type: "vbox", pack: "start", align: "stretch" },
        bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
        items: [
          {
            xtype: "grid",
            pid: "GRIDpopup_selectvendor",
            emptyText: "No Matching Records",
            autoScroll: true,
            flex: 1,
            plugins: ["filterfield"],
            viewConfig: {
              enableTextSelection: true,
            },
            store: {
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
                url: vconfig.service_api + "mst_pen_supplier/mst_pen_suppliers",
                reader: {
                  type: "json",
                  rootProperty: "Rows",
                  totalProperty: "TotalRows",
                  successProperty: "success",
                },
              },
            },
            columns: [
              { xtype: "rownumberer", width: 40 },
              { header: "KODE", dataIndex: "KODE_INTERNAL", sortable: true, width: 80, filter: { xtype: "textfield" } },
              { header: "NAMA", dataIndex: "NAMA", sortable: true, width: 250, filter: { xtype: "textfield" } },
              { header: "ALAMAT", dataIndex: "ALAMAT", sortable: true, width: 300, filter: { xtype: "textfield" } },
              { header: "NPWP", dataIndex: "NPWP", sortable: true, width: 100, filter: { xtype: "textfield" } },
              { header: "COO", dataIndex: "KODE_COO", sortable: true, width: 80, filter: { xtype: "textfield" } },
              { header: "MOLTS", dataIndex: "KODE_MOLTS", sortable: true, width: 80, filter: { xtype: "textfield" } },
              { header: "LP", dataIndex: "KODE_LP", sortable: true, width: 80, filter: { xtype: "textfield" } },
            ],
            bbar: {
              xtype: "pagingtoolbar",
              displayInfo: true,
              displayMsg: "Total Data {2}",
              emptyMsg: "No topics to display",
            },
            listeners: {
              itemdblclick: "select_manualsupplier",
            },
          },
        ],
      });
      COMP.run.getmodulepopup("popup_search", popup, this.getView());
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  select_manualsupplier: function (cmp, rec) {
    try {
      var me = this;
      var GRID = Ext.ComponentQuery.query("mapping_supplier FRMmapping_supplier grid[pid=GRIDmappingdata_supplier]")[0];
      var popup = Ext.ComponentQuery.query("popup_selectvendor")[0];
      var vdt = GRID.getSelectionModel().getSelection()[0].data;
      var params = Ext.encode({
        method: "sync_manualmapping_supplier",
        module: "coo",
        VENDOR: vdt.VENDOR,
        KODE_INTERNAL: rec.data.KODE_INTERNAL,
      });

      Ext.MessageBox.confirm(
        "Konfirmasi",
        "Konfirmasi Manual Supplier",
        function (button) {
          if (button === "yes") {
            var hasil = COMP.run.getservice(vconfig.service_api + "sync_doc/sync_doc", params, "POST", me.var_global.jwt);
            hasil.then(function (content) {
              var val = Ext.decode(content, true);
              if (val.success === "true") {
                COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 3000 });
                popup.close();
                GRID.getStore().load();
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
  btautomapping_click: function () {
    try {
      var me = this;
      var params = Ext.encode({
        method: "sync_automapping_supplier",
        module: "coo",
      });
      var GRID = Ext.ComponentQuery.query("mapping_supplier FRMmapping_supplier grid[pid=GRIDmappingdata_supplier]")[0];
      var hasil = COMP.run.getservice(vconfig.service_api + "sync_doc/sync_doc", params, "POST", me.var_global.jwt);
      hasil.then(function (content) {
        var val = Ext.decode(content, true);
        if (val.success == "true") {
          COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 2000 });
          GRID.getStore().load();
        } else {
          COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 2000 });
        }
      }, this);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});
