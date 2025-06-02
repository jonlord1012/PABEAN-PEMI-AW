Ext.define("TDK.INVENTORY.inv_material_out.Cinv_material_out", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cinv_material_out",
  init: function (view) {
    this.control({
      "inv_material_out [pid=out_to_production_pis]": { click: this.out_to_production_pis_click },
      "inv_material_out [pid=out_to_production_manual]": { click: this.out_to_production_manual_click },
      "inv_material_out [pid=out_to_memo_scrap]": { click: this.out_to_memo_scrap_click },
      "inv_material_out [pid=out_to_memo_selling]": { click: this.out_to_memo_selling_click },

      "inv_material_out [pid=btrefresh_main]": { click: this.btrefresh_main_click },

      "FRMout_toproduction_pis datefield[name=TANGGAL_OUT]": { change: this.tanggal_out_change },
      "FRMout_toproduction_pis button[pid=pisbtprocessout_synchronize]": { click: this.pisbtprocessout_synchronize_click },

      "FRMout_toproduction_manual button[pid=out_toprod_btselectpart]": { click: this.out_toprod_btselectpart_click },
      "FRMout_toproduction_manual button[pid=FRMout_toproduction_manual_btsave]": { click: this.FRMout_toproduction_manual_btsave_click },

      "FRMout_toscrap_mt button[pid=out_toscrap_btselectpart]": { click: this.out_toscrap_btselectpart },
      "FRMout_toscrap_mt button[pid=FRMout_toscrap_mt_btsave]": { click: this.FRMout_toscrap_mt_btsave_click },

      "FRMout_toselling_mt button[pid=out_toselling_btselectpart]": { click: this.out_toselling_btselectpart },
      "FRMout_toselling_mt button[pid=FRMout_toselling_mt_btsave]": { click: this.FRMout_toselling_mt_btsave_click },
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
  btrefresh_main_click: function () {
    try {
      var me = this;
      var GRID = Ext.ComponentQuery.query("GRIDinv_material_out grid[pid=GRIDinv_material_out]")[0];
      GRID.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  out_to_production_pis_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

      COMP.run.getmodulepopup("FRMout_toproduction_pis", "TDK.INVENTORY.inv_material_out.FRMout_toproduction_pis", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  out_to_production_manual_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("FRMout_toproduction_manual", "TDK.INVENTORY.inv_material_out.FRMout_toproduction_manual", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  out_to_memo_scrap_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("FRMout_toscrap_mt", "TDK.INVENTORY.inv_material_out.FRMout_toscrap_mt", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  out_to_memo_selling_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("FRMout_toselling_mt", "TDK.INVENTORY.inv_material_out.FRMout_toselling_mt", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  out_toprod_btselectpart_click: function () {
    try {
      var me = this;
      var FRM = Ext.ComponentQuery.query("FRMout_toproduction_manual form")[0];

      var vdt_form = FRM.getValues(false, false, false, true);
      if (vdt_form.TANGGAL_OUT === null) {
        COMP.TipToast.toast("Error", "Pilih Tanggal Out Production lebih dulu", { cls: "danger", delay: 2000 });
        return;
      }
      vdt_form.TANGGAL_OUT = moment(vdt_form.TANGGAL_OUT).format("YYYY-MM-DD");
      var popup = Ext.define("TDK.INVENTORY.inv_material_in.popup_list_outtoprod_selectpart", {
        extend: "Ext.window.Window",
        alias: "widget.popup_list_outtoprod_selectpart",
        reference: "popup_list_outtoprod_selectpart",
        title: "Pilih Item/Part Material",
        modal: true,
        closeAction: "destroy",
        centered: true,
        autoScroll: true,
        width: mainpanel.getWidth() * 0.8,
        height: mainpanel.getHeight() * 0.86,
        layout: { type: "vbox", pack: "start", align: "stretch" },
        bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
        items: [
          {
            xtype: "grid",
            pid: "GRIDpopup_list_outtoprod_selectpart",
            emptyText: "No Matching Records",
            margin: "2 2 2 2",
            flex: 1,
            plugins: [
              "filterfield",
              {
                ptype: "cellediting",
                clicksToEdit: 1,
              },
            ],
            viewConfig: {
              enableTextSelection: true,
            },
            store: {
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
                url: vconfig.service_api + "inv_material_out/inv_material_outs",
                extraParams: {
                  method: "select_itempart_manual",
                  module: "select_itempart_manual",
                  vdate: vdt_form.TANGGAL_OUT,
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
              { xtype: "rownumberer", width: 50 },
              { sortable: true, width: 65, filter: { xtype: "textfield" }, header: "SOURCE", dataIndex: "SUMBER_DATA" },
              { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "INVOICE", dataIndex: "INVOICE_NO" },
              { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "PART NO", dataIndex: "PART_NO" },
              { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "MAPP PART", dataIndex: "MAPP_PARTNO" },
              { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "PART NAME", dataIndex: "PART_NAME" },
              { sortable: true, width: 80, align: "right", renderer: "formatqty", header: "STOCK", dataIndex: "SISA_QTY" },
              { sortable: true, width: 65, filter: { xtype: "textfield" }, header: "BC TYPE", dataIndex: "BC_TYPE" },
              { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "NO AJU", dataIndex: "NOMOR_AJU" },
              { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "TGL AJU", dataIndex: "TANGGAL_AJU" },
              { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NO DAFTAR", dataIndex: "NOMOR_DAFTAR" },
              { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "TGL DAFTAR", dataIndex: "TANGGAL_DAFTAR" },
            ],
            bbar: {
              xtype: "pagingtoolbar",
              displayInfo: true,
              displayMsg: "Displaying topics {0} - {1} of {2}",
              emptyMsg: "No topics to display",
            },
            listeners: {
              itemdblclick: "out_proses_pilihpart",
            },
          },
        ],
      });
      COMP.run.getmodulepopup("popup_list_outtoprod_selectpart", popup, this.getView());
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  out_proses_pilihpart: function (cmp, rec) {
    try {
      var me = this;
      var GRIDmanual = Ext.ComponentQuery.query("FRMout_toproduction_manual grid[pid=GRIDout_toproduction_manual]")[0];
      var field_dateout = Ext.ComponentQuery.query("FRMout_toproduction_manual form datefield[name=TANGGAL_OUT]")[0];
      var popup = Ext.ComponentQuery.query("popup_list_outtoprod_selectpart")[0];

      var check = 0;
      GRIDmanual.getStore().each(function (record) {
        if (record.data.INVOICE_NO === rec.data.INVOICE_NO && record.data.MAPP_PARTNO === rec.data.MAPP_PARTNO) {
          check = 1;
        }
      });
      if (check === 1) {
        COMP.TipToast.toast("Error", "Part Sudah dipilih sebelumnya", { cls: "danger", delay: 2000 });
        return false;
      }

      GRIDmanual.getStore().add({
        INVOICE_NO: rec.data.INVOICE_NO,
        MAPP_PARTNO: rec.data.MAPP_PARTNO,
        PART_NO: rec.data.PART_NO,
        PART_NAME: rec.data.PART_NAME,
        SISA_QTY: rec.data.SISA_QTY,
        INPUT_QTY: 0,
      });
      field_dateout.setReadOnly(true);
      popup.close();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMout_toproduction_manual_btsave_click: function () {
    try {
      var me = this;
      var GRIDmanual = Ext.ComponentQuery.query("FRMout_toproduction_manual grid[pid=GRIDout_toproduction_manual]")[0];
      var popup = Ext.ComponentQuery.query("FRMout_toproduction_manual")[0];
      var GRIDMAIN = Ext.ComponentQuery.query("inv_material_out GRIDinv_material_out grid[pid=GRIDinv_material_out]")[0];

      var check = null;
      GRIDmanual.getStore().each(function (record) {
        if (record.data.SISA_QTY < record.data.INPUT_QTY) {
          check = record.data;
        }
      });
      if (check !== null) {
        COMP.TipToast.toast("Error", "Part : " + check.MAPP_PARTNO + " Qty input melebihi Stock", { cls: "danger", delay: 2000 });
        return false;
      }

      check = null;
      GRIDmanual.getStore().each(function (record) {
        if (record.data.INPUT_QTY === 0) {
          check = record.data;
        }
      });
      if (check !== null) {
        COMP.TipToast.toast("Error", "Part : " + check.MAPP_PARTNO + " Qty tidak boleh 0", { cls: "danger", delay: 2000 });
        return false;
      }
      var FRM = Ext.ComponentQuery.query("FRMout_toproduction_manual form")[0];

      var vdt_form = FRM.getValues(false, false, false, true);
      if (vdt_form.TANGGAL_OUT === null) {
        COMP.TipToast.toast("Error", "Pilih Tanggal Out Production lebih dulu", { cls: "danger", delay: 2000 });
        return;
      }
      vdt_form.TANGGAL_OUT = moment(vdt_form.TANGGAL_OUT).format("YYYY-MM-DD");
      if (vdt_form.TANGGAL_OUT > moment(new Date()).format("YYYY-MM-DD")) {
        COMP.TipToast.toast("Error", "Tanggal Out Production tidak boleh lebih besar dari hari ini", { cls: "danger", delay: 2000 });
        return;
      }

      if (vdt_form.OUT_REMARK === "") {
        COMP.TipToast.toast("Error", "Input Remark lebih dulu", { cls: "danger", delay: 2000 });
        return;
      }

      var Vgridinput = [];
      GRIDmanual.getStore()
        .getDataSource()
        .each(function (record) {
          var vrec = record.data;
          Vgridinput.push({
            OUT_DATE: vdt_form.TANGGAL_OUT,
            INVOICE_NO: vrec.INVOICE_NO,
            MAPP_PARTNO: vrec.MAPP_PARTNO,
            PART_NO: vrec.PART_NO,
            QTY: vrec.INPUT_QTY,
            OUT_REMARK: vdt_form.OUT_REMARK,
          });
        });

      if (Vgridinput.length < 1) {
        COMP.TipToast.toast("Error", "Data tidak ada yang bisa diproses", { cls: "danger", delay: 2000 });
        return false;
      }

      Ext.MessageBox.confirm(
        "Konfirmasi Manual Out To Production Tanggal: " + vdt_form.TANGGAL_OUT,
        //
        "<b>Proses Manual: </b>" +
          //
          "<ol>" +
          "<li>Tanggal yang diproses: " +
          vdt_form.TANGGAL_OUT +
          "</li>" +
          "</ol>",

        function (button) {
          if (button === "yes") {
            var params = Ext.encode({
              method: "proses_out_manual",
              module: "proses_data",
              vdate: vdt_form.TANGGAL_OUT,
              vdata: Ext.encode(Vgridinput),
            });
            var hasil = COMP.run.getservice(vconfig.service_api + "inv_material_out/inv_material_out", params, "POST", me.var_global.jwt);
            hasil.then(function (content) {
              var val = Ext.decode(content, true);
              if (val[0].success === "true") {
                //GRID.getStore().load();
                popup.close();
                GRIDMAIN.getStore().load();
                COMP.TipToast.toast("Success", val[0].message, { cls: "success", delay: 3000 });
              } else {
                GRID.getStore().load();
                COMP.TipToast.toast("Error", val[0].message, { cls: "danger", delay: 3000 });
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
  tanggal_out_change: function () {
    try {
      var GRID = Ext.ComponentQuery.query("FRMout_toproduction_pis grid[pid=GRIDout_toproduction_pis]")[0];
      GRID.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  toproduction_link_click: function (cmp, dt) {
    try {
      var vdt = dt.data;
      if (vdt.allowclick !== true) return;
      var vmodulecontrol = vdt.controlname === "" ? vdt.text : vdt.controlname;
      var id = vmodulecontrol;
      var cls = "TDK.INVENTORY.inv_material_out." + vdt.module + "." + id + "." + id;
      var tabs = Ext.ComponentQuery.query("FRMto_production tabpanel[pid=toproduction_tabpanel]")[0];
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
  pisbtprocessout_synchronize_click: function () {
    try {
      var me = this;
      var voutdate = Ext.ComponentQuery.query("FRMout_toproduction_pis datefield[name=TANGGAL_OUT] ")[0];
      var GRID = Ext.ComponentQuery.query("FRMout_toproduction_pis grid[pid=GRIDout_toproduction_pis]")[0];
      var popup = Ext.ComponentQuery.query("FRMout_toproduction_pis")[0];
      if (GRID.getStore().getDataSource().length === 0) {
        COMP.TipToast.toast("Error", "Data Receipt tidak ada", { cls: "danger", delay: 2000 });
        return false;
      }
      var Vgridinput = [];
      GRID.getStore()
        .getDataSource()
        .each(function (record) {
          if (parseFloat(record.data.SISA_QTY) >= parseFloat(record.data.PENDING_QTY) && record.data.INVOICE_NO !== null && record.data.ST === "NO") {
            var vrec = record.data;
            Vgridinput.push({
              OUT_DATE: vrec.PIS_TR_DATE,
              INVOICE_NO: vrec.INVOICE_NO,
              MAPP_PARTNO: vrec.MAPP_PARTNO,
              PART_NO: vrec.PIS_PARTCODE,
              QTY: vrec.PENDING_QTY,
            });
          }
        });
      console.log(Vgridinput.length);
      if (Vgridinput.length < 1) {
        COMP.TipToast.toast("Error", "Data tidak ada yang bisa diproses", { cls: "danger", delay: 2000 });
        return false;
      }

      Ext.MessageBox.confirm(
        "Konfirmasi Synchronize Out To Production Tanggal: " + moment(voutdate.getValue()).format("YYYY-MM-DD"),
        //
        "<b>Proses Sinkronisasi: </b>" +
          //
          "<ol>" +
          "<li>Tanggal yang diproses: " +
          moment(voutdate.getValue()).format("YYYY-MM-DD") +
          "</li>" +
          "<li>Hanya Invoice  yang sudah mendapatkan Nomor Aju + Nomor Daftar</li>" +
          "<li>Hanya Part dan Qty yang sesuai dengan Dokumen BC </li>" +
          "</ol>",

        function (button) {
          if (button === "yes") {
            var params = Ext.encode({
              method: "integrasi_pis_out",
              module: "proses_data",
              vdate: moment(voutdate.getValue()).format("YYYY-MM-DD"),
              vdata: Ext.encode(Vgridinput),
            });
            var hasil = COMP.run.getservice(vconfig.service_api + "inv_material_out/inv_material_out", params, "POST", me.var_global.jwt);
            hasil.then(function (content) {
              var val = Ext.decode(content, true);
              if (val[0].success === "true") {
                GRID.getStore().load();
                COMP.TipToast.toast("Success", val[0].message, { cls: "success", delay: 3000 });
              } else {
                GRID.getStore().load();
                COMP.TipToast.toast("Error", val[0].message, { cls: "danger", delay: 3000 });
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
  out_toscrap_btselectpart: function (cmp) {
    try {
      var FRM = Ext.ComponentQuery.query("FRMout_toscrap_mt form")[0];
      var GRIDitem = Ext.ComponentQuery.query("FRMout_toscrap_mt grid")[0];
      var vdt_form = FRM.getValues(false, false, false, true);
      if (vdt_form.TANGGAL_OUT === null) {
        COMP.TipToast.toast("Error", "Pilih Tanggal Scrap lebih dulu", { cls: "danger", delay: 2000 });
        return;
      }
      vdt_form.TANGGAL_OUT = moment(vdt_form.TANGGAL_OUT).format("YYYY-MM-DD");

      this.popup_itempart(FRM, vdt_form, GRIDitem);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  out_toselling_btselectpart: function () {
    try {
      var FRM = Ext.ComponentQuery.query("FRMout_toselling_mt form")[0];
      var GRIDitem = Ext.ComponentQuery.query("FRMout_toselling_mt grid")[0];
      var vdt_form = FRM.getValues(false, false, false, true);
      if (vdt_form.TANGGAL_OUT === null) {
        COMP.TipToast.toast("Error", "Pilih Tanggal Out Selling lebih dulu", { cls: "danger", delay: 2000 });
        return;
      }
      vdt_form.TANGGAL_OUT = moment(vdt_form.TANGGAL_OUT).format("YYYY-MM-DD");

      this.popup_itempart(FRM, vdt_form, GRIDitem);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  popup_itempart: function (FRM, vdt_form, GRIDitem) {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

      var popup = Ext.define("TDK.INVENTORY.inv_material_out.popup_itempart", {
        extend: "Ext.window.Window",
        alias: "widget.popup_itempart",
        reference: "popup_itempart",
        title: "Pilih Item/Part Material",
        modal: true,
        closeAction: "destroy",
        centered: true,
        autoScroll: true,
        width: mainpanel.getWidth() * 0.8,
        height: mainpanel.getHeight() * 0.86,
        layout: { type: "vbox", pack: "start", align: "stretch" },
        bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
        items: [
          {
            xtype: "grid",
            pid: "GRIDpopup_itempart",
            emptyText: "No Matching Records",
            margin: "2 2 2 2",
            flex: 1,
            plugins: [
              "filterfield",
              {
                ptype: "cellediting",
                clicksToEdit: 1,
              },
            ],
            viewConfig: {
              enableTextSelection: true,
            },
            store: {
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
                url: vconfig.service_api + "inv_material_out/inv_material_outs",
                extraParams: {
                  method: "select_itempart_manual",
                  module: "select_itempart_manual",
                  vdate: vdt_form.TANGGAL_OUT,
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
              { xtype: "rownumberer", width: 50 },
              { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "SOURCE", dataIndex: "SUMBER_DATA" },
              { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "INVOICE", dataIndex: "INVOICE_NO" },
              { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "PART NO", dataIndex: "PART_NO" },
              { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "MAPP PART", dataIndex: "MAPP_PARTNO" },
              { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "PART NAME", dataIndex: "PART_NAME" },
              { sortable: true, width: 80, align: "right", renderer: "formatqty", header: "STOCK", dataIndex: "SISA_QTY" },
              { sortable: true, width: 65, filter: { xtype: "textfield" }, header: "BC TYPE", dataIndex: "BC_TYPE" },
              { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "NO AJU", dataIndex: "NOMOR_AJU" },
              { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "TGL AJU", dataIndex: "TANGGAL_AJU" },
              { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NO DAFTAR", dataIndex: "NOMOR_DAFTAR" },
              { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "TGL DAFTAR", dataIndex: "TANGGAL_DAFTAR" },
            ],
            bbar: {
              xtype: "pagingtoolbar",
              displayInfo: true,
              displayMsg: "Displaying topics {0} - {1} of {2}",
              emptyMsg: "No topics to display",
            },
            listeners: {
              itemdblclick: function (cmp, rec) {
                try {
                  var vdt = rec.data;
                  var npopup = Ext.ComponentQuery.query("popup_itempart")[0];
                  var GRIDdata = GRIDitem.getStore()
                    .getDataSource()
                    .items.map(function (record) {
                      return record.getData();
                    });
                  if (GRIDdata.length < 1) {
                    GRIDitem.getStore().add({
                      INVOICE_NO: vdt.INVOICE_NO,
                      MAPP_PARTNO: vdt.MAPP_PARTNO,
                      PART_NO: vdt.PART_NO,
                      PART_NAME: vdt.PART_NAME,
                      SISA_QTY: vdt.SISA_QTY,
                      INPUT_QTY: 0,
                    });
                    GRIDitem.getStore().commitChanges();
                    npopup.close();
                  } else {
                    function findBy(array, conditions) {
                      return array.filter(function (obj) {
                        return conditions.every(function (condition) {
                          var property = condition.property;
                          var value = condition.value;
                          return obj[property] === value;
                        });
                      });
                    }
                    var xfind = [
                      { property: "INVOICE_NO", value: vdt.INVOICE_NO },
                      { property: "MAPP_PARTNO", value: vdt.MAPP_PARTNO },
                    ];

                    var checkFind = findBy(GRIDdata, xfind);
                    if (checkFind.length < 1) {
                      GRIDitem.getStore().add({
                        INVOICE_NO: vdt.INVOICE_NO,
                        MAPP_PARTNO: vdt.MAPP_PARTNO,
                        PART_NO: vdt.PART_NO,
                        PART_NAME: vdt.PART_NAME,
                        SISA_QTY: vdt.SISA_QTY,
                        INPUT_QTY: 0,
                      });
                      GRIDitem.getStore().commitChanges();
                      npopup.close();
                    } else {
                      COMP.TipToast.toast("Error", "Data sudah ada", { cls: "danger", delay: 2000 });
                    }
                  }
                } catch (ex) {
                  COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                }
              },
            },
          },
        ],
        listeners: {
          afterlayout: function (cmp) {
            try {
              var GRID = cmp.query("grid")[0];
              GRID.getStore().removeAll();
              GRID.getStore().commitChanges();
            } catch (ex) {
              COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
            }
          },
        },
      });
      COMP.run.getmodulepopup("popup_select_itempart", popup, this.getView());
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMout_toscrap_mt_btsave_click: function () {
    try {
      var me = this;
      var GRIDmanual = Ext.ComponentQuery.query("FRMout_toscrap_mt grid[pid=GRIDout_toscrap_mt]")[0];
      var popup = Ext.ComponentQuery.query("FRMout_toscrap_mt")[0];
      var GRIDMAIN = Ext.ComponentQuery.query("inv_material_out GRIDinv_material_out grid[pid=GRIDinv_material_out]")[0];

      var check = null;
      GRIDmanual.getStore().each(function (record) {
        if (record.data.SISA_QTY < record.data.INPUT_QTY) {
          check = record.data;
        }
      });
      if (check !== null) {
        COMP.TipToast.toast("Error", "Part : " + check.MAPP_PARTNO + " Qty input melebihi Stock", { cls: "danger", delay: 2000 });
        return false;
      }

      check = null;
      GRIDmanual.getStore().each(function (record) {
        if (record.data.INPUT_QTY === 0) {
          check = record.data;
        }
      });
      if (check !== null) {
        COMP.TipToast.toast("Error", "Part : " + check.MAPP_PARTNO + " Qty tidak boleh 0", { cls: "danger", delay: 2000 });
        return false;
      }
      var FRM = Ext.ComponentQuery.query("FRMout_toscrap_mt form")[0];

      var vdt_form = FRM.getValues(false, false, false, true);
      if (vdt_form.TANGGAL_OUT === null) {
        COMP.TipToast.toast("Error", "Pilih Tanggal Scrap lebih dulu", { cls: "danger", delay: 2000 });
        return;
      }

      if (vdt_form.BAP_DATE === null) {
        COMP.TipToast.toast("Error", "Pilih Tanggal BAP lebih dulu", { cls: "danger", delay: 2000 });
        return;
      }

      vdt_form.TANGGAL_OUT = moment(vdt_form.TANGGAL_OUT).format("YYYY-MM-DD");
      vdt_form.BAP_DATE = moment(vdt_form.BAP_DATE).format("YYYY-MM-DD");

      if (vdt_form.TANGGAL_OUT > moment(new Date()).format("YYYY-MM-DD")) {
        COMP.TipToast.toast("Error", "Tanggal Scrap tidak boleh lebih besar dari hari ini", { cls: "danger", delay: 2000 });
        return;
      }

      if (vdt_form.BAP_DATE > moment(new Date()).format("YYYY-MM-DD")) {
        COMP.TipToast.toast("Error", "Tanggal BAP Scrap tidak boleh lebih besar dari hari ini", { cls: "danger", delay: 2000 });
        return;
      }

      if (vdt_form.OUT_REMARK === "") {
        COMP.TipToast.toast("Error", "Input Remark lebih dulu", { cls: "danger", delay: 2000 });
        return;
      }

      var Vgridinput = [];
      GRIDmanual.getStore()
        .getDataSource()
        .each(function (record) {
          var vrec = record.data;
          Vgridinput.push({
            OUT_DATE: vdt_form.TANGGAL_OUT,
            INVOICE_NO: vrec.INVOICE_NO,
            MAPP_PARTNO: vrec.MAPP_PARTNO,
            PART_NO: vrec.PART_NO,
            QTY: vrec.INPUT_QTY,
            OUT_REMARK: vdt_form.OUT_REMARK,
            BAP_NO: vdt_form.BAP_NO,
            BAP_DATE: vdt_form.BAP_DATE,
          });
        });

      if (Vgridinput.length < 1) {
        COMP.TipToast.toast("Error", "Data tidak ada yang bisa diproses", { cls: "danger", delay: 2000 });
        return false;
      }

      Ext.MessageBox.confirm(
        "Konfirmasi Memo Scrap Tanggal: " + vdt_form.TANGGAL_OUT,
        //
        "<b>Proses Manual: </b>" +
          //
          "<ol>" +
          "<li>Tanggal yang diproses: " +
          vdt_form.TANGGAL_OUT +
          "</li>" +
          "</ol>",

        function (button) {
          if (button === "yes") {
            var params = Ext.encode({
              method: "proses_out_manual",
              module: "proses_scrap",
              vdate: vdt_form.TANGGAL_OUT,
              vdata: Ext.encode(Vgridinput),
            });
            var hasil = COMP.run.getservice(vconfig.service_api + "inv_material_out/inv_material_out", params, "POST", me.var_global.jwt);
            hasil.then(function (content) {
              var val = Ext.decode(content, true);
              if (val[0].success === "true") {
                //GRID.getStore().load();
                popup.close();
                GRIDMAIN.getStore().load();
                COMP.TipToast.toast("Success", val[0].message, { cls: "success", delay: 3000 });
              } else {
                GRID.getStore().load();
                COMP.TipToast.toast("Error", val[0].message, { cls: "danger", delay: 3000 });
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
  FRMout_toselling_mt_btsave_click: function () {
    try {
      var me = this;
      var GRIDmanual = Ext.ComponentQuery.query("FRMout_toselling_mt grid[pid=GRIDout_toselling_mt]")[0];
      var popup = Ext.ComponentQuery.query("FRMout_toselling_mt")[0];
      var GRIDMAIN = Ext.ComponentQuery.query("inv_material_out GRIDinv_material_out grid[pid=GRIDinv_material_out]")[0];

      var check = null;
      GRIDmanual.getStore().each(function (record) {
        if (record.data.SISA_QTY < record.data.INPUT_QTY) {
          check = record.data;
        }
      });
      if (check !== null) {
        COMP.TipToast.toast("Error", "Part : " + check.MAPP_PARTNO + " Qty input melebihi Stock", { cls: "danger", delay: 2000 });
        return false;
      }

      check = null;
      GRIDmanual.getStore().each(function (record) {
        if (record.data.INPUT_QTY === 0) {
          check = record.data;
        }
      });
      if (check !== null) {
        COMP.TipToast.toast("Error", "Part : " + check.MAPP_PARTNO + " Qty tidak boleh 0", { cls: "danger", delay: 2000 });
        return false;
      }
      var FRM = Ext.ComponentQuery.query("FRMout_toselling_mt form")[0];

      var vdt_form = FRM.getValues(false, false, false, true);
      if (vdt_form.TANGGAL_OUT === null) {
        COMP.TipToast.toast("Error", "Pilih Tanggal Selling lebih dulu", { cls: "danger", delay: 2000 });
        return;
      }

      if (vdt_form.BAP_DATE === null) {
        COMP.TipToast.toast("Error", "Pilih Tanggal BAP lebih dulu", { cls: "danger", delay: 2000 });
        return;
      }

      vdt_form.TANGGAL_OUT = moment(vdt_form.TANGGAL_OUT).format("YYYY-MM-DD");
      vdt_form.BAP_DATE = moment(vdt_form.BAP_DATE).format("YYYY-MM-DD");

      if (vdt_form.TANGGAL_OUT > moment(new Date()).format("YYYY-MM-DD")) {
        COMP.TipToast.toast("Error", "Tanggal Selling tidak boleh lebih besar dari hari ini", { cls: "danger", delay: 2000 });
        return;
      }

      if (vdt_form.BAP_DATE > moment(new Date()).format("YYYY-MM-DD")) {
        COMP.TipToast.toast("Error", "Tanggal BAP Scrap tidak boleh lebih besar dari hari ini", { cls: "danger", delay: 2000 });
        return;
      }

      if (vdt_form.OUT_REMARK === "") {
        COMP.TipToast.toast("Error", "Input Remark lebih dulu", { cls: "danger", delay: 2000 });
        return;
      }

      var Vgridinput = [];
      GRIDmanual.getStore()
        .getDataSource()
        .each(function (record) {
          var vrec = record.data;
          Vgridinput.push({
            OUT_DATE: vdt_form.TANGGAL_OUT,
            INVOICE_NO: vrec.INVOICE_NO,
            MAPP_PARTNO: vrec.MAPP_PARTNO,
            PART_NO: vrec.PART_NO,
            QTY: vrec.INPUT_QTY,
            OUT_REMARK: vdt_form.OUT_REMARK,
            BAP_NO: vdt_form.BAP_NO,
            BAP_DATE: vdt_form.BAP_DATE,
          });
        });

      if (Vgridinput.length < 1) {
        COMP.TipToast.toast("Error", "Data tidak ada yang bisa diproses", { cls: "danger", delay: 2000 });
        return false;
      }

      Ext.MessageBox.confirm(
        "Konfirmasi Memo Selling Tanggal: " + vdt_form.TANGGAL_OUT,
        //
        "<b>Proses Manual: </b>" +
          //
          "<ol>" +
          "<li>Tanggal yang diproses: " +
          vdt_form.TANGGAL_OUT +
          "</li>" +
          "</ol>",

        function (button) {
          if (button === "yes") {
            var params = Ext.encode({
              method: "proses_out_manual",
              module: "proses_selling",
              vdate: vdt_form.TANGGAL_OUT,
              vdata: Ext.encode(Vgridinput),
            });
            var hasil = COMP.run.getservice(vconfig.service_api + "inv_material_out/inv_material_out", params, "POST", me.var_global.jwt);
            hasil.then(function (content) {
              var val = Ext.decode(content, true);
              if (val[0].success === "true") {
                //GRID.getStore().load();
                popup.close();
                GRIDMAIN.getStore().load();
                COMP.TipToast.toast("Success", val[0].message, { cls: "success", delay: 3000 });
              } else {
                GRID.getStore().load();
                COMP.TipToast.toast("Error", val[0].message, { cls: "danger", delay: 3000 });
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
});
