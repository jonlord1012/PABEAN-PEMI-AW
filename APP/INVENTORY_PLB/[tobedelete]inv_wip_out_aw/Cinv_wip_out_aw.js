Ext.define("TDK.INVENTORY_AW.inv_wip_out_aw.Cinv_wip_out_aw", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cinv_wip_out_aw",
  init: function (view) {
    this.control({
      "inv_wip_out_aw button[pid=btreceiving_manual]": { click: this.btnew_click },
      "inv_wip_out_aw button[pid=btreceiving_integrasi]": { click: this.btreceiving_integrasi_click },
      "FRMinv_wip_out_aw button[pid=btsearch]": { click: this.btsearch_click },
      "FRMinv_wip_out_aw combobox[name=CBO_SOURCE]": { change: this.CBO_SOURCE_change },
      "FRMinv_wip_out_aw_pis button[pid=btrefresh]": { click: this.pisbtrefresh_click },
      "FRMinv_wip_out_aw_pis datefield[name=TANGGAL_RCV]": { change: this.pisbtrefresh_click },
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
  GRIDinv_wip_out_aw_load: function (grid) {
    try {
      var me = this;
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btnew_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

      COMP.run.getmodulepopup("FRMinv_wip_out_aw", "TDK.INVENTORY_AW.inv_wip_out_aw.FRMinv_wip_out_aw", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btreceiving_integrasi_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("FRMinv_wip_out_aw_pis", "TDK.INVENTORY_AW.inv_wip_out_aw.FRMinv_wip_out_aw_pis", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btsearch_click: function (btn) {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var FRM_MAIN = Ext.ComponentQuery.query("FRMinv_wip_out_aw form")[0];
      var MAIN_dtval = FRM_MAIN.getValues(false, false, false, true);
      if (MAIN_dtval.CBO_SOURCE === "" || MAIN_dtval.CBO_SOURCE === null) {
        COMP.TipToast.toast("Error", "Pilih Sumber Data lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      var popup = Ext.define("TDK.INVENTORY_AW.inv_wip_out_aw.popup_list_source", {
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
                url: vconfig.service_api + "inv_wip_out_aw/inv_wip_out_aws",
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
                    method: "read_list_source_" + MAIN_dtval.CBO_SOURCE,
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
              { header: "NAMA", dataIndex: "NAMA_VENDOR", sortable: true, width: 300, filter: { xtype: "textfield" } },
              { header: "INVOICE", dataIndex: "INVOICE_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
              { header: "NOMOR AJU", dataIndex: "NOMOR_AJU", sortable: true, width: 200, filter: { xtype: "textfield" } },
              { header: "TANGGAL AJU", dataIndex: "TANGGAL_AJU", sortable: true, width: 100, filter: { xtype: "textfield" } },
              { header: "NOMOR DAFTAR", dataIndex: "NOMOR_DAFTAR", sortable: true, width: 100, filter: { xtype: "textfield" } },
              { header: "TANGGAL DAFTAR", dataIndex: "TANGGAL_DAFTAR", sortable: true, width: 100, filter: { xtype: "textfield" } },
            ],
            listeners: {
              itemdblclick: "GRIDpopup_list_source_itemdblclick",
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
      COMP.run.getmodulepopup("popup_list_source", popup, this.getView());
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  GRIDpopup_list_source_itemdblclick: function (cmp, rec) {
    try {
      var me = this;
      var popup = Ext.ComponentQuery.query("popup_list_source")[0];
      var FRM_MAIN = Ext.ComponentQuery.query("FRMinv_wip_out_aw form")[0];
      var GRID = Ext.ComponentQuery.query("FRMinv_wip_out_aw grid[pid=GRIDFRMinv_wip_out_aw]")[0];
      var MAIN_dtval = FRM_MAIN.getValues(false, false, false, true);
      var params = Ext.encode({
        method: "receiving_select_aju",
        module: MAIN_dtval.CBO_SOURCE,
        nomor_aju: rec.data.NOMOR_AJU,
      });
      var hasil = COMP.run.getservice(vconfig.service_api + "inv_wip_out_aw/inv_wip_out_aw", params, "POST", me.var_global.jwt);
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
          });
          var vnstore = new Ext.data.Store({
            field: [
              { name: "PART_NO", type: "string" },
              { name: "PART_NAME", type: "string" },
              { name: "PRICE", type: "float" },
              { name: "TOTAL_QTY", type: "float" },
              { name: "RCV_IN", type: "float" },
              { name: "RCV_SISA", type: "float" },
              { name: "RCV_INPUT", type: "float" },
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
  FRMinv_wip_out_aw_btsave_click: function (btn) {
    try {
      var me = this;
      var popup = Ext.ComponentQuery.query("FRMinv_wip_out_aw")[0];
      var FRM_MAIN = Ext.ComponentQuery.query("FRMinv_wip_out_aw form")[0];
      var MAIN_dtval = FRM_MAIN.getValues(false, false, false, true);
      var GRID = Ext.ComponentQuery.query("FRMinv_wip_out_aw grid[pid=GRIDFRMinv_wip_out_aw]")[0];
      var Vgridvalidation = "";
      var Vgridinput = [];
      GRID.getStore()
        .getDataSource()
        .each(function (record) {
          if (record.data.RCV_INPUT > record.data.RCV_SISA) {
            Vgridvalidation = record.data;
            return false;
          }
          if (record.data.RCV_INPUT > 0) {
            Vgridinput.push(record.data);
          }
        });
      if (Vgridvalidation !== "") {
        COMP.TipToast.toast("Error", "Item/Part " + Vgridvalidation.PART_NO + " kelebihan Qty", { cls: "danger", delay: 2000 });
        return false;
      }

      if (Vgridinput.length < 1) {
        COMP.TipToast.toast("Error", "Input Qty Item/Part Lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }

      if (MAIN_dtval.NAMA === null || MAIN_dtval.NAMA === "") {
        COMP.TipToast.toast("Error", "Supplier tidak ditemukan, silahkan mapping supplier lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }

      if (MAIN_dtval.TANGGAL_RCV === null || MAIN_dtval.TANGGAL_RCV === "") {
        COMP.TipToast.toast("Error", "Input tanggal Receiving lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }

      if (MAIN_dtval.TANGGAL_RCV < MAIN_dtval.TANGGAL_DAFTAR) {
        COMP.TipToast.toast("Error", "Tanggal Receiving tidak bisa lebih kecil dari Tanggal No Daftar", { cls: "danger", delay: 2000 });
        return false;
      }
      MAIN_dtval.TANGGAL_AJU = moment(MAIN_dtval.TANGGAL_AJU).format("YYYY-MM-DD");
      MAIN_dtval.TANGGAL_DAFTAR = moment(MAIN_dtval.TANGGAL_DAFTAR).format("YYYY-MM-DD");
      MAIN_dtval.TANGGAL_RCV = moment(MAIN_dtval.TANGGAL_RCV).format("YYYY-MM-DD");
      Ext.MessageBox.confirm(
        "Konfirmasi",
        "Konfirmasi Receiving Item/Part Material",
        function (button) {
          if (button === "yes") {
            var params = Ext.encode({
              method: "create_receiving",
              module: MAIN_dtval.CBO_SOURCE,
              header: Ext.encode(MAIN_dtval),
              detail: Ext.encode(Vgridinput),
            });
            var hasil = COMP.run.getservice(vconfig.service_api + "inv_wip_out_aw/inv_wip_out_aw", params, "POST", me.var_global.jwt);
            hasil.then(function (content) {
              var val = Ext.decode(content, true);
              if (val.success === "true") {
                popup.close();
                COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 3000 });
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
  CBO_SOURCE_change: function (cmp, rec) {
    try {
      var GRID = Ext.ComponentQuery.query("FRMinv_wip_out_aw grid[pid=GRIDFRMinv_wip_out_aw]")[0];
      GRID.getStore().removeAll();
      GRID.getStore().commitChanges();
      var FRM_MAIN = Ext.ComponentQuery.query("FRMinv_wip_out_aw form")[0];
      FRM_MAIN.getForm().setValues({
        NOMOR_AJU: "",
        NOMOR_DAFTAR: "",
        TANGGAL_AJU: "",
        TANGGAL_DAFTAR: "",
        SUPPLIER: "",
        KODE_INTERNAL: "",
      });
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  select_all_item_change: function (cmp, rec) {
    try {
      var GRID = Ext.ComponentQuery.query("FRMinv_wip_out_aw grid[pid=GRIDFRMinv_wip_out_aw]")[0];
      if (rec === false) {
        GRID.getStore()
          .getDataSource()
          .each(function (record) {
            record.set({
              RCV_INPUT: 0,
            });
          });
      }

      if (rec === true) {
        GRID.getStore()
          .getDataSource()
          .each(function (record) {
            if (record.data.RCV_SISA > 0) {
              record.set({
                RCV_INPUT: record.data.RCV_SISA,
              });
            }
          });
      }
      GRID.getStore().commitChanges();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btdetail_rows_click: function (xgrid, rowIndex) {
    try {
      var me = this;
      var vdt = xgrid.getStore().getAt(rowIndex).data;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var load_edit = COMP.run.getmodulepopup("FRMinv_wip_out_aw", "TDK.INVENTORY_AW.inv_wip_out_aw.FRMinv_wip_out_aw", mainpanel);
      if (load_edit) {
        var FRM = Ext.ComponentQuery.query("FRMinv_wip_out_aw")[0];
        me.edit_header(FRM, vdt);
      }
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  edit_header: function (frm, xdtedit) {
    try {
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  pisbtrefresh_click: function () {
    try {
      var GRID = Ext.ComponentQuery.query("FRMinv_wip_out_aw_pis grid[pid=GRIDinv_wip_out_aw_pis]")[0];
      GRID.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});
