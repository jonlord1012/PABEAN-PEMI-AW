Ext.define("TDK.INVENTORY_PLB.inv_material_out_aw.Cinv_material_out_aw", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cinv_material_out_aw",
  init: function (view) {
    this.control({
      "inv_material_out_aw [pid=out_to_production_bicc]": { click: this.out_to_production_bicc_click },
      "inv_material_out_aw [pid=out_to_production_manual_aw]": { click: this.out_to_production_manual_aw_click },
      "inv_material_out_aw [pid=out_to_memo_scrap_aw]": { click: this.out_to_memo_scrap_aw_click },
      "inv_material_out_aw [pid=out_to_memo_selling_aw]": { click: this.out_to_memo_selling_aw_click },

      "inv_material_out_aw [pid=btrefresh_main]": { click: this.btrefresh_main_click },

      "FRMout_toproduction_bicc datefield[name=TANGGAL_OUT]": { change: this.tanggal_out_change },
      "FRMout_toproduction_bicc button[pid=btprocessout_synchronize]": { click: this.btprocessout_synchronize_click },

      "FRMout_toproduction_manual_aw button[pid=out_toprod_btselectpart_aw]": { click: this.out_toprod_btselectpart_aw_click },
      "FRMout_toproduction_manual_aw button[pid=FRMout_toproduction_manual_aw_btsave]": { click: this.FRMout_toproduction_manual_aw_btsave_click },

      "FRMout_toscrap_mt_aw button[pid=out_toscrap_btselectpart]": { click: this.out_toscrap_btselectpart },
      "FRMout_toscrap_mt_aw button[pid=FRMout_toscrap_mt_aw_btsave]": { click: this.FRMout_toscrap_mt_aw_btsave_click },

      "FRMout_toselling_mt_aw button[pid=out_toselling_btselectpart]": { click: this.out_toselling_btselectpart },
      "FRMout_toselling_mt_aw button[pid=FRMout_toselling_mt_aw_btsave]": { click: this.FRMout_toselling_mt_aw_btsave_click },

      "popup_selectinvoice button[pid=supply_invoice_bicc]": { click: this.select_invoice_receiving },
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
  formatqty: function (value) {
    var text = Ext.util.Format.number(value, "0,000.00/i");
    return text;
  },
  formatAmount: function (value) {
    var text = Ext.util.Format.number(value, "0,000.00/i");
    return text;
  },
  formatDate: function (value) {
    var text = Ext.util.Format.date(value, "Y-m-d");
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
      var GRID = Ext.ComponentQuery.query("GRIDinv_material_out_aw grid[pid=GRIDinv_material_out_aw]")[0];
      GRID.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  out_to_production_bicc_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

      COMP.run.getmodulepopup("FRMout_toproduction_bicc", "TDK.INVENTORY_AW.inv_material_out_aw.FRMout_toproduction_bicc", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  out_to_production_manual_aw_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("FRMout_toproduction_manual_aw", "TDK.INVENTORY_AW.inv_material_out_aw.FRMout_toproduction_manual_aw", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  out_to_memo_scrap_aw_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("FRMout_toscrap_mt_aw", "TDK.INVENTORY_AW.inv_material_out_aw.FRMout_toscrap_mt_aw", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  out_to_memo_selling_aw_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("FRMout_toselling_mt_aw", "TDK.INVENTORY_AW.inv_material_out_aw.FRMout_toselling_mt_aw", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  out_toprod_btselectpart_aw_click: function () {
    try {
      var me = this;
      var FRM = Ext.ComponentQuery.query("FRMout_toproduction_manual_aw form")[0];

      var vdt_form = FRM.getValues(false, false, false, true);
      if (vdt_form.TANGGAL_OUT === null) {
        COMP.TipToast.toast("Error", "Pilih Tanggal Out Production lebih dulu", { cls: "danger", delay: 2000 });
        return;
      }
      vdt_form.TANGGAL_OUT = moment(vdt_form.TANGGAL_OUT).format("YYYY-MM-DD");
      var popup = Ext.define("TDK.INVENTORY_AW.inv_material_in.popup_list_outtoprod_selectpart", {
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
                url: vconfig.service_api + "inv_material_out_aw/inv_material_out_aws",
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
      var GRIDmanual = Ext.ComponentQuery.query("FRMout_toproduction_manual_aw grid[pid=GRIDout_toproduction_manual_aw]")[0];
      var field_dateout = Ext.ComponentQuery.query("FRMout_toproduction_manual_aw form datefield[name=TANGGAL_OUT]")[0];
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
  FRMout_toproduction_manual_aw_btsave_click: function () {
    try {
      var me = this;
      var GRIDmanual = Ext.ComponentQuery.query("FRMout_toproduction_manual_aw grid[pid=GRIDout_toproduction_manual_aw]")[0];
      var popup = Ext.ComponentQuery.query("FRMout_toproduction_manual_aw")[0];
      var GRIDMAIN = Ext.ComponentQuery.query("inv_material_out_aw GRIDinv_material_out_aw grid[pid=GRIDinv_material_out_aw]")[0];

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
      var FRM = Ext.ComponentQuery.query("FRMout_toproduction_manual_aw form")[0];

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
            var hasil = COMP.run.getservice(vconfig.service_api + "inv_material_out_aw/inv_material_out_aw", params, "POST", me.var_global.jwt);
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
      var GRID = Ext.ComponentQuery.query("FRMout_toproduction_bicc grid[pid=GRIDout_toproduction_bicc]")[0];
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
      var cls = "TDK.INVENTORY_AW.inv_material_out_aw." + vdt.module + "." + id + "." + id;
      var tabs = Ext.ComponentQuery.query("FRMto_production_aw tabpanel[pid=toproduction_tabpanel]")[0];
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
  btprocessout_synchronize_click: function () {
    try {
      var me = this;
      var voutdate = Ext.ComponentQuery.query("FRMout_toproduction_bicc datefield[name=TANGGAL_OUT] ")[0];
      var GRID = Ext.ComponentQuery.query("FRMout_toproduction_bicc grid[pid=GRIDout_toproduction_bicc]")[0];
      var popup = Ext.ComponentQuery.query("FRMout_toproduction_bicc")[0];
      if (GRID.getStore().getDataSource().length === 0) {
        COMP.TipToast.toast("Error", "Data Receipt tidak ada", { cls: "danger", delay: 2000 });
        return false;
      }
      var Vgridinput = [];
      var PENDING_QTY =0; 
      var currInvoice = '';
      var voutdate = '';
      GRID.getStore()
        .getDataSource()
        .each(function (record) {
          //console.log(record.data); 

           if (currInvoice == record.data.INVOICE_NO   ){
            PENDING_QTY += record.data.BICC_QTY ; 
            var vrec = record.data;
            Vgridinput.push({
              OUT_DATE: vrec.BICC_TR_DATE,
              INVOICE_NO: vrec.INVOICE_NO,
              MAPP_PARTNO: vrec.PART_NO,
              PART_NO: vrec.BICC_PART_NO,
              QTY: vrec.BICC_QTY,
              TANGGAL_DAFTAR: vrec.TANGGAL_DAFTAR, 
              TANGGAL_AJU : vrec.TANGGAL_AJU , 
              NOMOR_AJU: vrec.NOMOR_AJU, 
              NOMOR_DAFTAR: vrec.NOMOR_DAFTAR, 
              SERI_BARANG: vrec.SERI_BARANG,
              BICC_LOT_NO: vrec.BICC_LOT_NO

            });
            console.log(record.data.INVOICE_NO);
            console.log(PENDING_QTY);
            console.log(record.data.QTY_INVOICE);
          }else {
            console.log("Last qty" + PENDING_QTY);
            currInvoice = record.data.INVOICE_NO ; 
            PENDING_QTY = record.data.BICC_QTY ; 
            var vrec = record.data;
            Vgridinput.push({
              OUT_DATE: vrec.BICC_TR_DATE,
              INVOICE_NO: vrec.INVOICE_NO,
              MAPP_PARTNO: vrec.PART_NO,
              PART_NO: vrec.BICC_PART_NO,
              QTY: vrec.BICC_QTY,
              TANGGAL_DAFTAR: vrec.TANGGAL_DAFTAR, 
              TANGGAL_AJU : vrec.TANGGAL_AJU , 
              NOMOR_AJU: vrec.NOMOR_AJU, 
              NOMOR_DAFTAR: vrec.NOMOR_DAFTAR, 
              SERI_BARANG: vrec.SERI_BARANG,
            });
            console.log("invoice baru");
            console.log("new pending " + PENDING_QTY +  currInvoice);
          }
          /*if (parseFloat(record.data.QTY_INVOICE) >= parseFloat(record.data.PENDING_QTY) ) {*/
            voutdate = record.data.BICC_TR_DATE;
          /*}*/
        });
      console.log(Vgridinput);
      //return ; 
      if (Vgridinput.length < 1) {
        COMP.TipToast.toast("Error", "Data tidak ada yang bisa diproses", { cls: "danger", delay: 2000 });
        return false;
      }

      Ext.MessageBox.confirm(
        "Konfirmasi Synchronize Out To Production Tanggal: " + voutdate,
        //
        "<b>Proses Sinkronisasi: </b>" +
          //
          "<ol>" +
          "<li>Tanggal yang diproses: " +
          voutdate +
          "</li>" +
          "<li>Hanya Invoice  yang sudah mendapatkan Nomor Aju + Nomor Daftar</li>" +
          "<li>Hanya Part dan Qty yang sesuai dengan Dokumen BC </li>" +
          "</ol>",

        function (button) {
          if (button === "yes") {
            var params = Ext.encode({
              method: "save_data_syncronize",
              module: "proses_data",
              vdate: voutdate,
              vdata: Ext.encode(Vgridinput),
            });
            var hasil = COMP.run.getservice(vconfig.service_api + "inv_material_out_aw/inv_material_out_aw", params, "POST", me.var_global.jwt);
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
      var FRM = Ext.ComponentQuery.query("FRMout_toscrap_mt_aw form")[0];
      var GRIDitem = Ext.ComponentQuery.query("FRMout_toscrap_mt_aw grid")[0];
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
      var FRM = Ext.ComponentQuery.query("FRMout_toselling_mt_aw form")[0];
      var GRIDitem = Ext.ComponentQuery.query("FRMout_toselling_mt_aw grid")[0];
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

      var popup = Ext.define("TDK.INVENTORY_AW.inv_material_out_aw.popup_itempart", {
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
                url: vconfig.service_api + "inv_material_out_aw/inv_material_out_aws",
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
  FRMout_toscrap_mt_aw_btsave_click: function () {
    try {
      var me = this;
      var GRIDmanual = Ext.ComponentQuery.query("FRMout_toscrap_mt_aw grid[pid=GRIDout_toscrap_mt_aw]")[0];
      var popup = Ext.ComponentQuery.query("FRMout_toscrap_mt_aw")[0];
      var GRIDMAIN = Ext.ComponentQuery.query("inv_material_out_aw GRIDinv_material_out_aw grid[pid=GRIDinv_material_out_aw]")[0];

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
      var FRM = Ext.ComponentQuery.query("FRMout_toscrap_mt_aw form")[0];

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
            var hasil = COMP.run.getservice(vconfig.service_api + "inv_material_out_aw/inv_material_out_aw", params, "POST", me.var_global.jwt);
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
  FRMout_toselling_mt_aw_btsave_click: function () {
    try {
      var me = this;
      var GRIDmanual = Ext.ComponentQuery.query("FRMout_toselling_mt_aw grid[pid=GRIDout_toselling_mt_aw]")[0];
      var popup = Ext.ComponentQuery.query("FRMout_toselling_mt_aw")[0];
      var GRIDMAIN = Ext.ComponentQuery.query("inv_material_out_aw GRIDinv_material_out_aw grid[pid=GRIDinv_material_out_aw]")[0];

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
      var FRM = Ext.ComponentQuery.query("FRMout_toselling_mt_aw form")[0];

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
            var hasil = COMP.run.getservice(vconfig.service_api + "inv_material_out_aw/inv_material_out_aw", params, "POST", me.var_global.jwt);
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
  btdetail_aw_rows_select_invoice: function (xgrid, rowIndex) {
    try {
      xgrid.getSelectionModel().select(rowIndex);
      var me = this;
      var GRID = Ext.ComponentQuery.query("FRMout_toproduction_bicc grid[pid=GRIDout_toproduction_bicc]")[0];
      var vdt = GRID.getSelectionModel().getSelection()[0].data;
      var params = Ext.encode({
        BICC_PART_NO: vdt.BICC_PART_NO,
        BICC_TR_DATE: vdt.BICC_TR_DATE,
      });

      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var popup = Ext.define("TDK.INVENTORY_AW.inv_material_out_aw.FRMout_toproduction_bicc.popup_selectinvoice", {
        extend: "Ext.window.Window",
        alias: "widget.popup_selectinvoice",
        reference: "popup_selectinvoice",
        title: "Mapping Manual Invoice",
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
                url: vconfig.service_api + "inv_material_out_aw/inv_material_out_aws",
                extraParams: {
                  method: "get_invoice_list",
                  BICC_PART_NO: vdt.BICC_PART_NO,
                  BICC_TR_DATE: vdt.BICC_TR_DATE,
                  BICC_QTY: vdt.BICC_QTY,
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
              { xtype: 'checkcolumn', dataIndex: 'CHECKED_INVOICE', text: 'SUPPLY', listeners: {
                checkchange: 'onCheckcolumnCheckChange'}}, 
              { header: "RECEIPT NO", dataIndex: "RECEIPT_NO", sortable: true, width: 160, filter: { xtype: "textfield" } },
              { header: "KODE SUPPLIER", dataIndex: "SUPPLIER_KODE_INTERNAL", sortable: true, width: 80, filter: { xtype: "textfield" } },
              { header: "INVOICE", dataIndex: "INVOICE_NO", sortable: true, width: 120, filter: { xtype: "textfield" } },
              { header: "PART NO", dataIndex: "PART_NO", sortable: true, width: 80, filter: { xtype: "textfield" } },
              { header: "INVOICE QTY", dataIndex: "INVOICE_QTY", sortable: true, width: 80, filter: { xtype: "textfield" }, renderer: "formatqty" },
              { header: "NO BPB", dataIndex: "SUMBER_DATA", sortable: true, width: 150, filter: { xtype: "textfield" } },
              { header: "NOMOR AJU", dataIndex: "NOMOR_AJU", sortable: true, width: 160, filter: { xtype: "textfield" } },
              { header: "TANGGAL AJU", dataIndex: "TANGGAL_AJU", sortable: true, width: 80, filter: { xtype: "textfield" } },
              { header: "TOTAL OUT", dataIndex: "TOTAL_OUT", sortable: true, width: 80, filter: { xtype: "textfield" }, renderer: "formatqty" },
              { header: "SISA", dataIndex: "SISA", sortable: true, width: 90, filter: { xtype: "textfield" }, renderer: "formatqty" },
            ],
            bbar: {
              xtype: "pagingtoolbar",
              displayInfo: true,
              displayMsg: "Total Data {2}",
              emptyMsg: "No topics to display",
            },
            /*
              listeners: {
                itemdblclick: "select_invoice_receiving",
              },
              */
          },
        ],
        onCheckcolumnCheckChange: function (checkcolumn, rowIndex, checked, record, eOpts) {
          // first checkbox is checked
          if (checked) {
              // uncheck the second checkbox
              //record.set('ac2', false)
              console.log(record.data[this.dataIndex]);
              console.log('alkdlfa');
          }
        },
        dockedItems: [
          {
            xtype: "toolbar",
            height: 30,
            dock: "top",
            items: [
              { xtype: "tbspacer", width: 10, text: "-" },
              { xtype: "button", text: "Proses Supply", pid: "supply_invoice_bicc", icon: vconfig.getstyle + "icon/update.ico", tooltip: "Proses Supply" },
            ],
          },
        ],
      });
      COMP.run.getmodulepopup("popup_selectinvoice", popup, this.getView());
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  select_invoice_receiving: function (cmp, rec) {
    try {
      var me = this;
      var GRID = Ext.ComponentQuery.query("popup_selectinvoice grid[pid=GRIDpopup_selectinvoice]")[0];
      var popup = Ext.ComponentQuery.query("popup_selectinvoice")[0];
      var vdt = GRID.getSelectionModel().getSelection();
      var list_invoice = [];
      Ext.each(vdt, function (item) {
        list_invoice.push({
          INVOICE_NO: item.data.INVOICE_NO,
          BICC_PART_NO: item.data.BICC_PART_NO,
          BICC_TR_DATE: item.data.BICC_TR_DATE,
          BICC_QTY: item.data.BICC_QTY,
          SISA: item.data.SISA,
          INVOICE_QTY: item.data.INVOICE_QTY,
        });
      });

      var GRIDout_toproduction_bicc = Ext.ComponentQuery.query("FRMout_toproduction_bicc grid[pid=GRIDout_toproduction_bicc]")[0];

      console.log(Ext.encode(list_invoice));
      Ext.MessageBox.confirm(
        "Konfirmasi",
        "Konfirmasi Supply Invoice",
        function (button) {
          if (button === "yes") {
            var GRID_KE1 = GRIDout_toproduction_bicc.getSelectionModel().getSelection()[0];
            var GRID_KE1_idx = GRIDout_toproduction_bicc.getStore().indexOf(GRID_KE1);
            console.log(GRID_KE1_idx);

            var val_ke1 = list_invoice[0];

            if (GRID_KE1.data.BICC_QTY <= val_ke1.SISA) {
              GRID_KE1.set("INVOICE_NO", val_ke1.INVOICE_NO);
              GRIDout_toproduction_bicc.getStore().commitChanges();
            } else {
            }

            GRIDout_toproduction_bicc.getStore().insert(GRID_KE1_idx + 1, {
              ST: GRID_KE1.data.ST,
              BICC_TR_DATE: GRID_KE1.data.BICC_TR_DATE,
              BICC_INVOICE_NO: GRID_KE1.data.BICC_INVOICE_NO,
              BICC_PART_NO: GRID_KE1.data.BICC_PART_NO,
              BICC_LOT_NO: GRID_KE1.data.BICC_LOT_NO,
              BICC_QTY: GRID_KE1.data.BICC_QTY,

              INVOICE_NO: GRID_KE1.data.INVOICE_NO,
              PART_NO: GRID_KE1.data.PART_NO,
              QTY_BPB: GRID_KE1.data.QTY_BPB,
              BICC_QTY: GRID_KE1.data.BICC_QTY,
            });
          }
        },
        this
      );
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      console.log(ex.message);
    }
  },
});
