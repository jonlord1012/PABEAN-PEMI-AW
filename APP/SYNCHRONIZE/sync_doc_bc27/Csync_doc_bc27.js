Ext.define("TDK.SYNCHRONIZE.sync_doc_bc27.Csync_doc_bc27", {
  extend: "Ext.app.ViewController",
  alias: "controller.Csync_doc_bc27",
  init: function (view) {
    this.control({
      "sync_doc_bc27 button[pid=btrefresh]": { click: this.btrefresh_click },
      "sync_doc_bc27 combobox[name=CBO_FILTERKEY]": { select: this.btrefresh_click },
      "sync_doc_bc27 button[pid=btprocess_sync]": { click: this.btprocess_sync_click },
      "sync_doc_bc27 button[pid=btprocess_syncaju]": { click: this.btprocess_syncaju_click },
      "sync_doc_bc27 button[pid=btmapping_supplier]": { click: this.btmapping_supplier_click },
      "sync_doc_bc27 button[pid=btmapping_itempart]": { click: this.btmapping_itempart_click },
      "sync_doc_bc27 button[pid=btdokumen_draft]": { click: this.btdokumen_draft_click },

      "bc27_popupmapping_supplier button[pid=btautomapping]": { click: this.btautomapping_click },
      "bc27_popupmapping_itempart button[pid=btautomapping_itempart]": { click: this.btautomapping_itempart_click },

      "bc27_FRMdraft_dokumen button[pid=btbc27_savedokumendraft]": { click: this.btbc27_savedokumendraft_click },
      "bc27_FRMdraft_dokumen button[pid=btsearch]": { click: this.btsearch_click },
      "bc27_FRMdraft_dokumen button[pid=btsearch_invoice]": { click: this.btsearch_invoice_click },
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
  btrefresh_click: function () {
    try {
      var GRID = Ext.ComponentQuery.query("sync_doc_bc27 GRIDsync_doc_bc27 grid[pid=GRIDsync_doc_bc27]")[0];
      GRID.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btprocess_sync_click: function () {
    try {
      var me = this;
      var params = Ext.encode({
        method: "sync_file",
        module: "molts",
      });
      var hasil = COMP.run.getservice(vconfig.service_api + "sync_doc_bc27/sync_doc_bc27", params, "POST", me.var_global.jwt);
      hasil.then(function (content) {
        var val = Ext.decode(content, true);
        if (val.success == "true") {
          COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 2000 });
          me.btrefresh_click();
        } else {
          COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 2000 });
        }
      }, this);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btprocess_syncaju_click: function () {
    try {
      var me = this;
      var params = Ext.encode({
        method: "sync_nomoraju",
        module: "molts",
      });
      var hasil = COMP.run.getservice(vconfig.service_api + "sync_doc_bc27/sync_doc_bc27", params, "POST", me.var_global.jwt);
      hasil.then(function (content) {
        var val = Ext.decode(content, true);
        if (val.success == "true") {
          COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 2000 });
          me.btrefresh_click();
        } else {
          COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 2000 });
        }
      }, this);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btmapping_supplier_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("bc27_popupmapping_supplier", "TDK.SYNCHRONIZE.sync_doc_bc27.bc27_popupmapping_supplier", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btmapping_itempart_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("bc27_popupmapping_itempart", "TDK.SYNCHRONIZE.sync_doc_bc27.bc27_popupmapping_itempart", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btdokumen_draft_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("bc27_FRMdraft_dokumen", "TDK.SYNCHRONIZE.sync_doc_bc27.bc27_FRMdraft_dokumen", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btpilihsupplier_mapping: function (grid, rowIndex) {
    try {
      grid.getSelectionModel().select(rowIndex);
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var popup = Ext.define("TDK.SYNCHRONIZE.sync_doc_bc27.popup_selectvendor", {
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
      COMP.run.getmodulepopup("popup_selectvendor", popup, this.getView());
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  select_manualsupplier: function (cmp, rec) {
    try {
      var me = this;
      var GRID = Ext.ComponentQuery.query("bc27_popupmapping_supplier grid[pid=GRIDmappingdata_supplier]")[0];
      var popup = Ext.ComponentQuery.query("popup_selectvendor")[0];
      var vdt = GRID.getSelectionModel().getSelection()[0].data;
      var params = Ext.encode({
        method: "sync_manualmapping_supplier",
        module: "molts",
        SHIPPER: vdt.SHIPPER,
        KODE_INTERNAL: rec.data.KODE_INTERNAL,
      });

      Ext.MessageBox.confirm(
        "Konfirmasi",
        "Konfirmasi Manual Supplier",
        function (button) {
          if (button === "yes") {
            var hasil = COMP.run.getservice(vconfig.service_api + "sync_doc_bc27/sync_doc_bc27", params, "POST", me.var_global.jwt);
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
        module: "molts",
      });
      var GRID = Ext.ComponentQuery.query("bc27_popupmapping_supplier grid[pid=GRIDmappingdata_supplier]")[0];
      var hasil = COMP.run.getservice(vconfig.service_api + "sync_doc_bc27/sync_doc_bc27", params, "POST", me.var_global.jwt);
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
  btpilihpart_mapping: function (grid, rowIndex) {
    try {
      grid.getSelectionModel().select(rowIndex);
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var popup = Ext.define("TDK.SYNCHRONIZE.sync_doc_bc27.popup_selectpart", {
        extend: "Ext.window.Window",
        alias: "widget.popup_selectpart",
        reference: "popup_selectpart",
        title: "Mapping Manual Item/Part Material",
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
            pid: "GRIDpopup_selectpart",
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
                url: vconfig.service_api + "mst_item/mst_items",
                extraParams: {
                  method: "read_in",
                },
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
              { header: "PARTNO", dataIndex: "PART_NO", sortable: true, width: 120, filter: { xtype: "textfield" } },
              { header: "PARTNAME", dataIndex: "PART_NAME", sortable: true, width: 120, filter: { xtype: "textfield" } },
              { header: "DESCRIPTION", dataIndex: "PART_DESCRIPTION", sortable: true, width: 200, filter: { xtype: "textfield" } },
              { header: "UOM", dataIndex: "PART_UOM", sortable: true, width: 65, filter: { xtype: "textfield" } },
              { header: "GROUP", dataIndex: "PART_GROUP", sortable: true, width: 200, filter: { xtype: "textfield" } },
              { header: "CATEGORY", dataIndex: "PART_CATEGORY", sortable: true, width: 200, filter: { xtype: "textfield" } },
              { header: "TYPE", dataIndex: "PART_TYPE", sortable: true, width: 200, filter: { xtype: "textfield" } },
            ],
            bbar: {
              xtype: "pagingtoolbar",
              displayInfo: true,
              displayMsg: "Total Data {2}",
              emptyMsg: "No topics to display",
            },
            listeners: {
              itemdblclick: "select_manual_itempart",
            },
          },
        ],
      });
      COMP.run.getmodulepopup("popup_selectpart", popup, this.getView());
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  select_manual_itempart: function (cmp, rec) {
    try {
      var me = this;
      var GRID = Ext.ComponentQuery.query("bc27_popupmapping_itempart grid[pid=GRIDmappingdata_itempart]")[0];
      var popup = Ext.ComponentQuery.query("popup_selectpart")[0];
      var vdt = GRID.getSelectionModel().getSelection()[0].data;
      var params = Ext.encode({
        method: "sync_manualmapping_itempart",
        module: "molts",
        DESCRIPTION1: vdt.DESCRIPTION1,
        PART_NO: rec.data.PART_NO,
      });

      Ext.MessageBox.confirm(
        "Konfirmasi",
        "Konfirmasi Manual Item/Part Material",
        function (button) {
          if (button === "yes") {
            var hasil = COMP.run.getservice(vconfig.service_api + "sync_doc_bc27/sync_doc_bc27", params, "POST", me.var_global.jwt);
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
  btautomapping_itempart_click: function () {
    try {
      var me = this;
      var params = Ext.encode({
        method: "sync_automapping_itempart",
        module: "molts",
      });
      var GRID = Ext.ComponentQuery.query("bc27_popupmapping_itempart grid[pid=GRIDmappingdata_itempart]")[0];
      var hasil = COMP.run.getservice(vconfig.service_api + "sync_doc_bc27/sync_doc_bc27", params, "POST", me.var_global.jwt);
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
  bc27_show_tracingdocument_rowclick: function (grid, rowIndex) {
    try {
      grid.getSelectionModel().select(rowIndex);
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("bc27_tracing_document", "TDK.SYNCHRONIZE.sync_doc_bc27.bc27_tracing_document", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  bc27_accordion_list_click: function (cmp, dt) {
    try {
      var vdt = dt.data;
      if (vdt.allowclick !== true) return;
      var vmodulecontrol = vdt.controlname;
      var id = vmodulecontrol;
      var cls = "TDK.SYNCHRONIZE.sync_doc_bc27.tracing." + vmodulecontrol;
      var tabs = Ext.ComponentQuery.query("bc27_tracing_document tabpanel[pid=bc27_tabpanel_tracing]")[0];
      var tab = tabs.child("#" + id);
      if (!tab) {
        try {
          tab = tabs.add(
            Ext.create(cls, {
              waitMsgTarget: true,
              itemId: id,
              closable: true,
              frame: false,
              border: false,
              title: vdt.text,
            })
          );
        } catch (err) {
          COMP.TipToast.toast("Error", err.message, { cls: "danger", delay: 2000 });
        }
      }
      tabs.setActiveTab(tab);
    } catch (err) {
      COMP.TipToast.toast("Error", err.message, { cls: "danger", delay: 2000 });
    }
  },
  //=====================================================================================================================================
  //Draft proses
  btsearch_click: function (btn) {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      function getMethod() {
        switch (btn.vdata.modulename) {
          case "supplier":
            return "read_draft_supplier";
          default:
            return "";
        }
      }
      function getColumns() {
        switch (btn.vdata.modulename) {
          case "supplier":
            return [
              { xtype: "rownumberer", width: 40 },
              { header: "KODE", dataIndex: "MAPP_SUPPLIER", sortable: true, width: 80, filter: { xtype: "textfield" } },
              { header: "NAMA", dataIndex: "NAMA", sortable: true, width: 250, filter: { xtype: "textfield" } },
              { header: "ALAMAT", dataIndex: "ALAMAT", sortable: true, width: 300, filter: { xtype: "textfield" } },
              { header: "KODE", dataIndex: "KODE_NEGARA", sortable: true, width: 50, filter: { xtype: "textfield" } },
              { header: "NEGARA", dataIndex: "URAIAN_NEGARA", sortable: true, width: 75, filter: { xtype: "textfield" } },
              { header: "NPWP", dataIndex: "NPWP", sortable: true, width: 100, filter: { xtype: "textfield" } },
            ];
          default:
            return "";
        }
      }
      var popup = Ext.define("TDK.SYNCHRONIZE.sync_doc_bc27.popup_btsearch", {
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
            pid: "GRIDpopup_btsearch",
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
                url: vconfig.service_api + "sync_doc_bc27/sync_doc_bc27s",
                extraParams: {
                  method: getMethod(),
                },
                reader: {
                  type: "json",
                  rootProperty: "Rows",
                  totalProperty: "TotalRows",
                  successProperty: "success",
                },
              },
            },
            columns: getColumns(),
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
                    var FRM = Ext.ComponentQuery.query("bc27_FRMdraft_dokumen form")[0];
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
                  default:
                    return "";
                }
              },
            },
          },
        ],
      });
      COMP.run.getmodulepopup("popup_selectpart", popup, this.getView());
    } catch (err) {
      COMP.TipToast.toast("Error", err.message, { cls: "danger", delay: 2000 });
    }
  },
  popup_btsearch: function () {
    try {
    } catch (err) {
      COMP.TipToast.toast("Error", err.message, { cls: "danger", delay: 2000 });
    }
  },
  btbc27_savedokumendraft_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var FRM = Ext.ComponentQuery.query("bc27_FRMdraft_dokumen form")[0];
      var FRM_val = FRM.getValues(false, false, false, true);
      console.log(FRM_val);
    } catch (err) {
      COMP.TipToast.toast("Error", err.message, { cls: "danger", delay: 2000 });
    }
  },
  btsearch_invoice_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var popup = Ext.define("TDK.SYNCHRONIZE.sync_doc_bc27.popup_selectinvoice", {
        extend: "Ext.window.Window",
        alias: "widget.popup_selectinvoice",
        reference: "popup_selectinvoice",
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
            pid: "GRIDpopup_selectpart",
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
                url: vconfig.service_api + "sync_doc_bc27/sync_doc_bc27s",
                reader: {
                  type: "json",
                  rootProperty: "Rows",
                  totalProperty: "TotalRows",
                  successProperty: "success",
                },
              },
              listeners: {
                beforeload: function (store, operation, eOpts) {
                  try {
                    var FRM = Ext.ComponentQuery.query("bc27_FRMdraft_dokumen form")[0];
                    var FRM_val = FRM.getValues(false, false, false, true);
                    operation.setParams({
                      method: "read_invoice_list",
                      KODE_INTERNAL: FRM_val.KODE_INTERNAL,
                    });
                  } catch (ex) {
                    COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                  }
                },
              },
            },
            selType: "checkboxmodel",
            simpleSelect: true,
            columns: [
              { header: "INVOICE", dataIndex: "INVOICE_NO", sortable: true, width: 120, filter: { xtype: "textfield" } },
              { header: "DATE", dataIndex: "INVOICE_DATE", sortable: true, width: 120, filter: { xtype: "textfield" } },
              { header: "CURRENCY", dataIndex: "CURRENCY", sortable: true, width: 100, filter: { xtype: "textfield" } },
              { header: "INV TERM", dataIndex: "INVOICE_TERM", sortable: true, width: 100, filter: { xtype: "textfield" } },
              { header: "SHIPPING", dataIndex: "SHIPPING_MODE", sortable: true, width: 100, filter: { xtype: "textfield" } },
            ],
            bbar: {
              xtype: "pagingtoolbar",
              displayInfo: true,
              displayMsg: "Total Data {2}",
              emptyMsg: "No topics to display",
            },
            tbar: [
              //
              "-",
              { xtype: "button", pid: "btbc27_select_invoice_draft", text: "Pilih Invoice", icon: vconfig.getstyle + "icon/check.png", tooltip: "Pilih Invoice" },
            ],
          },
        ],
      });
      COMP.run.getmodulepopup("popup_selectinvoice", popup, this.getView());
    } catch (err) {
      COMP.TipToast.toast("Error", err.message, { cls: "danger", delay: 2000 });
    }
  },
});
