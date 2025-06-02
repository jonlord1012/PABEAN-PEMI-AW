Ext.define("TDK.SYNCHRONIZE.sync_doc_molts.Csync_doc_molts", {
  extend: "Ext.app.ViewController",
  alias: "controller.Csync_doc_molts",
  init: function (view) {
    this.control({
      "sync_doc_molts button[pid=btrefresh]": { click: this.btrefresh_click },
      "sync_doc_molts combobox[name=CBO_FILTERKEY]": { select: this.btrefresh_click },
      "sync_doc_molts button[pid=btprocess_sync]": { click: this.btprocess_sync_click },
      "sync_doc_molts button[pid=btprocess_syncaju]": { click: this.btprocess_syncaju_click },
      "sync_doc_molts button[pid=btmapping_supplier]": { click: this.btmapping_supplier_click },
      "sync_doc_molts button[pid=btmapping_itempart]": { click: this.btmapping_itempart_click },
      "sync_doc_molts button[pid=btdokumen_draft]": { click: this.btdokumen_draft_click },

      "molts_popupmapping_supplier button[pid=btautomapping]": { click: this.btautomapping_click },
      "molts_popupmapping_itempart button[pid=btautomapping_itempart]": { click: this.btautomapping_itempart_click },

      "molts_FRMdraft_dokumen button[pid=btmolts_savedokumendraft]": { click: this.btmolts_savedokumendraft_click },
      "molts_FRMdraft_dokumen button[pid=btsearch]": { click: this.btsearch_click },
      "molts_FRMdraft_dokumen button[pid=btsearch_invoice]": { click: this.btsearch_invoice_click },
      "molts_FRMdraft_dokumen button[pid=bttambah_dokumen]": { click: this.bttambah_dokumen_click },
      "popup_selectinvoice button[pid=btmolts_select_invoice_draft]": { click: this.btmolts_select_invoice_draft_click },
      "molts_tracing_document button[pid=molts_btget_from_ceisa]": { click: this.molts_btget_from_ceisa_click },
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
      var GRID = Ext.ComponentQuery.query("sync_doc_molts GRIDsync_doc_molts grid[pid=GRIDsync_doc_molts]")[0];
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
      var hasil = COMP.run.getservice(vconfig.service_api + "sync_doc_molts/sync_doc_molts", params, "POST", me.var_global.jwt);
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
      var hasil = COMP.run.getservice(vconfig.service_api + "sync_doc_molts/sync_doc_molts", params, "POST", me.var_global.jwt);
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
      COMP.run.getmodulepopup("molts_popupmapping_supplier", "TDK.SYNCHRONIZE.sync_doc_molts.molts_popupmapping_supplier", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btmapping_itempart_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("molts_popupmapping_itempart", "TDK.SYNCHRONIZE.sync_doc_molts.molts_popupmapping_itempart", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btdokumen_draft_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      
      COMP.run.getmodulepopup("molts_FRMdraft_dokumen", "TDK.SYNCHRONIZE.sync_doc_molts.molts_FRMdraft_dokumen", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btpilihsupplier_mapping: function (grid, rowIndex) {
    try {
      grid.getSelectionModel().select(rowIndex);
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var popup = Ext.define("TDK.SYNCHRONIZE.sync_doc_molts.popup_selectvendor", {
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
      var GRID = Ext.ComponentQuery.query("molts_popupmapping_supplier grid[pid=GRIDmappingdata_supplier]")[0];
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
            var hasil = COMP.run.getservice(vconfig.service_api + "sync_doc_molts/sync_doc_molts", params, "POST", me.var_global.jwt);
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
      var GRID = Ext.ComponentQuery.query("molts_popupmapping_supplier grid[pid=GRIDmappingdata_supplier]")[0];
      var hasil = COMP.run.getservice(vconfig.service_api + "sync_doc_molts/sync_doc_molts", params, "POST", me.var_global.jwt);
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
      var popup = Ext.define("TDK.SYNCHRONIZE.sync_doc_molts.popup_selectpart", {
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
      var GRID = Ext.ComponentQuery.query("molts_popupmapping_itempart grid[pid=GRIDmappingdata_itempart]")[0];
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
            var hasil = COMP.run.getservice(vconfig.service_api + "sync_doc_molts/sync_doc_molts", params, "POST", me.var_global.jwt);
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
      var GRID = Ext.ComponentQuery.query("molts_popupmapping_itempart grid[pid=GRIDmappingdata_itempart]")[0];
      var hasil = COMP.run.getservice(vconfig.service_api + "sync_doc_molts/sync_doc_molts", params, "POST", me.var_global.jwt);
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
  molts_show_tracingdocument_rowclick: function (grid, rowIndex) {
    try {
      grid.getSelectionModel().select(rowIndex);
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("molts_tracing_document", "TDK.SYNCHRONIZE.sync_doc_molts.molts_tracing_document", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  molts_accordion_list_click: function (cmp, dt) {
    try {
      var vdt = dt.data;
      if (vdt.allowclick !== true) return;
      var vmodulecontrol = vdt.controlname;
      var id = vmodulecontrol;
      var cls = "TDK.SYNCHRONIZE.sync_doc_molts.tracing." + vmodulecontrol;
      var tabs = Ext.ComponentQuery.query("molts_tracing_document tabpanel[pid=molts_tabpanel_tracing]")[0];
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
      var popup = Ext.define("TDK.SYNCHRONIZE.sync_doc_molts.molts_FRMdraft_dokumen.popup_btsearch", {
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
                    var FRM = Ext.ComponentQuery.query("molts_FRMdraft_dokumen form")[0];
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
                  case "referensi_negara":
                    var FRM = Ext.ComponentQuery.query("molts_FRMdraft_dokumen form")[0];
                    var popup = Ext.ComponentQuery.query("popup_btsearch")[0];
                    FRM.getForm().setValues({
                      KODE_BENDERA: rec.data.KODE_NEGARA,
                      KODE_BENDERANAME: rec.data.URAIAN_NEGARA,
                    });
                    popup.close();
                    return;
                  case "pelabuhan_muat":
                    var FRM = Ext.ComponentQuery.query("molts_FRMdraft_dokumen form")[0];
                    var popup = Ext.ComponentQuery.query("popup_btsearch")[0];
                    FRM.getForm().setValues({
                      KODE_PEL_MUAT: rec.data.KODE_PELABUHAN,
                      KODE_PEL_MUATNAME: rec.data.URAIAN_PELABUHAN,
                    });
                    popup.close();
                    return;
                  case "pelabuhan_transit":
                    var FRM = Ext.ComponentQuery.query("molts_FRMdraft_dokumen form")[0];
                    var popup = Ext.ComponentQuery.query("popup_btsearch")[0];
                    FRM.getForm().setValues({
                      KODE_PEL_TRANSIT: rec.data.KODE_PELABUHAN,
                      KODE_PEL_TRANSITNAME: rec.data.URAIAN_PELABUHAN,
                    });
                    popup.close();
                    return;
                  case "pelabuhan_bongkar":
                    var FRM = Ext.ComponentQuery.query("molts_FRMdraft_dokumen form")[0];
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
        case "supplier":
          return {
            autoLoad: true,
            remoteSort: true,
            remoteFilter: true,
            pageSize: 0,
            proxy: {
              type: "ajax",
              disableCaching: false,
              noCache: false,
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
              actionMethods: { read: "POST" },
              url: vconfig.service_api + "sync_doc_molts/sync_doc_moltss",
              extraParams: {
                method: "read_draft_supplier",
                module: "molts",
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
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
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
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
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
  },/*
  popup_btsearch: function () {
    try {
    } catch (err) {
      COMP.TipToast.toast("Error", err.message, { cls: "danger", delay: 2000 });
    }
  },*/
  btmolts_savedokumendraft_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var popup = Ext.ComponentQuery.query("sync_doc_molts")[0];
      var FRM = Ext.ComponentQuery.query("molts_FRMdraft_dokumen form")[0];
      var dtval = FRM.getValues(false, false, false, true);
      if (dtval.KODE_INTERNAL === "") {
        COMP.TipToast.toast("Error", "Pilih Vendor/Supplier lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }

      var arrbc = ["40", "271"];
      if (arrbc.find((e) => e === dtval.CBO_BC)) {
        if (dtval.NOMOR_AJU === "") {
          COMP.TipToast.toast("Error", "Nomor Aju Wajib diisi", { cls: "danger", delay: 2000 });
          return false;
        }
        if (dtval.TANGGAL_AJU === null) {
          COMP.TipToast.toast("Error", "Tanggal Aju Wajib diisi", { cls: "danger", delay: 2000 });
          return false;
        }
        if (dtval.NOMOR_DAFTAR === "") {
          COMP.TipToast.toast("Error", "Nomor Daftar Wajib diisi", { cls: "danger", delay: 2000 });
          return false;
        }
        if (dtval.TANGGAL_DAFTAR === null) {
          COMP.TipToast.toast("Error", "Tanggal Aju Wajib diisi", { cls: "danger", delay: 2000 });
          return false;
        }
      } else {
        /*if (dtval.MASTER_AWB_NAMA_DOKUMEN === "") {
          COMP.TipToast.toast("Error", "Master AWB Wajib diisi", { cls: "danger", delay: 2000 });
          return false;
        }
        if (dtval.MASTER_AWB_TANGGAL_DOKUMEN === null) {
          COMP.TipToast.toast("Error", "Tanggal Master AWB Wajib diisi", { cls: "danger", delay: 2000 });
          return false;
        }
        */
      }

      var griddokumen = Ext.ComponentQuery.query("molts_FRMdraft_dokumen grid[pid=GRIDinvoice_dokumen_draft]")[0];
      var GRIDdokumen_draft_kontainer = Ext.ComponentQuery.query("molts_FRMdraft_dokumen grid[pid=GRIDdokumen_draft_kontainer]")[0];
      var vdraft_kontainer = [];
      GRIDdokumen_draft_kontainer.getStore()
        .getDataSource()
        .each(function (record, index, count) {
          vdraft_kontainer.push({
            NOMOR_KONTAINER: record.data.NOMOR_KONTAINER,
            KODE_UKURAN_KONTAINER: record.data.KODE_UKURAN_KONTAINER,
            KODE_TIPE_KONTAINER: record.data.KODE_TIPE_KONTAINER,
            KETERANGAN: record.data.KETERANGAN,
          });
        });

      var GRIDdokumen_draft_kemasan = Ext.ComponentQuery.query("molts_FRMdraft_dokumen grid[pid=GRIDdokumen_draft_kemasan]")[0];
      var vdraft_kemasan = [];
      GRIDdokumen_draft_kemasan.getStore()
        .getDataSource()
        .each(function (record, index, count) {
          vdraft_kemasan.push({
            JUMLAH_KEMASAN: record.data.JUMLAH_KEMASAN,
            KODE_JENIS_KEMASAN: record.data.KODE_JENIS_KEMASAN,
            KETERANGAN: record.data.KETERANGAN,
            MERK_KEMASAN: record.data.MERK_KEMASAN,
          });
        });
      /*
      var gridinvoicedata = Ext.ComponentQuery.query("sync_doc_molts molts_FRMdraft_dokumen grid[pid=GRIDsumberdata]")[0];
      if(gridinvoicedata.getStore().getDataSource().each(function(record, index, count) {
          vsumberdata.pull({
            TRANSPORT_WAY
          })
        })
      );
      */
      if (griddokumen.getStore().getDataSource().length < 1) {
        COMP.TipToast.toast("Error", "Pilih Invoice lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      if (griddokumen.getStore().getDataSource().find("KODE_JENIS_DOKUMEN", "380") === null) {
        COMP.TipToast.toast("Error", "Pilih Invoice lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      var vform = {
        MODULE_SOURCE: "MOLTS",
        CBO_BC: dtval.CBO_BC,
        KODE_INTERNAL: dtval.KODE_INTERNAL,
        CBO_CARA_ANGKUT: dtval.CBO_CARA_ANGKUT,
        NAMA_PENGANGKUT: dtval.NAMA_PENGANGKUT,
        NOMOR_VOY_FLIGHT: dtval.NOMOR_VOY_FLIGHT,
        KODE_BENDERA: dtval.KODE_BENDERA,
        KODE_PEL_TRANSIT: dtval.KODE_PEL_TRANSIT,
        KODE_PEL_MUAT: dtval.KODE_PEL_MUAT,
        KODE_PEL_BONGKAR: dtval.KODE_PEL_BONGKAR,
        MASTER_AWB_NOMOR_DOKUMEN: dtval.MASTER_AWB_NOMOR_DOKUMEN,
        MASTER_AWB_NAMA_DOKUMEN: dtval.MASTER_AWB_NAMA_DOKUMEN,
        MASTER_AWB_TANGGAL_DOKUMEN: dtval.MASTER_AWB_TANGGAL_DOKUMEN === "" ? "" : moment(dtval.MASTER_AWB_TANGGAL_DOKUMEN).format("YYYY-MM-DD"),
        HOST_AWB_NOMOR_DOKUMEN: dtval.HOST_AWB_NOMOR_DOKUMEN,
        HOST_AWB_NAMA_DOKUMEN: dtval.HOST_AWB_NAMA_DOKUMEN,
        HOST_AWB_TANGGAL_DOKUMEN: dtval.HOST_AWB_TANGGAL_DOKUMEN === "" ? "" : moment(dtval.HOST_AWB_TANGGAL_DOKUMEN).format("YYYY-MM-DD"),
        NOMOR_BC11: dtval.NOMOR_BC11,
        TANGGAL_BC11: dtval.TANGGAL_BC11 === "" ? "" : moment(dtval.TANGGAL_BC11).format("YYYY-MM-DD"),
        POS_BC11: dtval.POS_BC11,
        SUBPOS_BC11: dtval.SUBPOS_BC11,
        SUBSUBPOS_BC11: dtval.SUBSUBPOS_BC11,
        NOMOR_KONTRAK: dtval.NOMOR_KONTRAK,
        TANGGAL_KONTRAK: dtval.TANGGAL_KONTRAK,
        TANGGAL_HABIS_KONTRAK: dtval.TANGGAL_HABIS_KONTRAK,
        NOMOR_AJU: dtval.NOMOR_AJU,
        TANGGAL_AJU: dtval.TANGGAL_AJU,
        NOMOR_DAFTAR: dtval.NOMOR_DAFTAR,
        TANGGAL_DAFTAR: dtval.TANGGAL_DAFTAR,
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
            TRANSPORT_WAY: record.data.TRANSPORT_WAY,
          });
          vnodokumen++;
        });

      var params = Ext.encode({
        method: "proses_save_dokumen_draft_molts",
        header: Ext.encode(vform),
        dokumen: Ext.encode(vdokumen),
        vdraft_kontainer: Ext.encode(vdraft_kontainer),
        vdraft_kemasan: Ext.encode(vdraft_kemasan),
      });

      var hasil = COMP.run.getservice(vconfig.service_api + "sync_doc_molts/sync_doc_molts", params, "POST", me.var_global.jwt);
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
  btsearch_invoice_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var popup = Ext.define("TDK.SYNCHRONIZE.sync_doc_molts.popup_selectinvoice", {
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
            pid: "GRIDpopup_selectinvoice",
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
                url: vconfig.service_api + "sync_doc_molts/sync_doc_moltss",
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
                    var FRM = Ext.ComponentQuery.query("molts_FRMdraft_dokumen form")[0];
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
              { xtype: "button", pid: "btmolts_select_invoice_draft", text: "Pilih Invoice", icon: vconfig.getstyle + "icon/check.png", tooltip: "Pilih Invoice" },
            ],
          },
        ],
      });
      COMP.run.getmodulepopup("popup_selectinvoice", popup, this.getView());
    } catch (err) {
      COMP.TipToast.toast("Error", err.message, { cls: "danger", delay: 2000 });
    }
  },
  btmolts_select_invoice_draft_click: function () {
    try {
      var me = this;
      var popup = Ext.ComponentQuery.query("popup_selectinvoice")[0];
      var FRM = Ext.ComponentQuery.query("molts_FRMdraft_dokumen form")[0];
      var GRIDsumberdata = Ext.ComponentQuery.query("molts_FRMdraft_dokumen grid[pid=GRIDsumberdata]")[0];
      var GRIDinvoicedata = Ext.ComponentQuery.query("molts_FRMdraft_dokumen grid[pid=GRIDinvoice_dokumen_draft]")[0];
      var GRIDhasilgenerate = Ext.ComponentQuery.query("molts_FRMdraft_dokumen grid[pid=GRIDhasilgenerate]")[0];
      var MAIN_dtval = FRM.getValues(false, false, false, true);
      var GRIDinvoice = Ext.ComponentQuery.query("popup_selectinvoice grid[pid=GRIDpopup_selectinvoice]")[0];
      var dtselect = GRIDinvoice.getSelectionModel().getSelection();
      var list_invoice = [];
      Ext.each(dtselect, function (item) {
        list_invoice.push({
          INVOICE_NO: item.data.INVOICE_NO,
        });
      });
      var params = Ext.encode({
        method: "SP_MOLTS_DRAFT_SELECT_INVOICE",
        module: "molts",
        invoice: Ext.encode(list_invoice),
        vendor: MAIN_dtval.KODE_INTERNAL,
      });
      var hasil = COMP.run.getservice(vconfig.service_api + "sync_doc_molts/sync_doc_molts", params, "POST", me.var_global.jwt);
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
  bttambah_dokumen_click: function () {
    try {
      var me = this;

      var griddokumen = Ext.ComponentQuery.query("molts_FRMdraft_dokumen grid[pid=GRIDinvoice_dokumen_draft]")[0];

      if (griddokumen.getStore().getDataSource().length < 1) {
        COMP.TipToast.toast("Error", "Pilih Invoice lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }

      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var popup = Ext.define("TDK.SYNCHRONIZE.sync_doc_molts.popup_btadddokumen", {
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
                  var params = [{ property: "KODE_DOKUMEN!=", value: "380" }];
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
                  var griddokumen = Ext.ComponentQuery.query("molts_FRMdraft_dokumen grid[pid=GRIDinvoice_dokumen_draft]")[0];

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
  molts_btget_from_ceisa_click: function () {
    try {
      var me = this;
      var GRID = Ext.ComponentQuery.query("sync_doc_molts GRIDsync_doc_molts grid[pid=GRIDsync_doc_molts]")[0];
      var vdt = GRID.getSelectionModel().getSelection()[0].data;
      var params = Ext.encode({
        method: "sync_get_from_ceisa",
        module: "molts",
        INVOICE_NO: vdt.INVOICE_NO,
      });
      var hasil = COMP.run.getservice(vconfig.service_api + "sync_doc_molts/sync_doc_molts", params, "POST", me.var_global.jwt);
      hasil.then(function (content) {
        var val = Ext.decode(content, true);
        if (val.success == "true") {
          COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 2000 });
        } else {
          COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 2000 });
        }
      }, this);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});
