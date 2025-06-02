Ext.define("TDK.INVENTORY.inv_fg_out.Cinv_fg_out", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cinv_fg_out",
  init: function (view) {
    this.control({
      "inv_fg_out button[pid=btprocess_sync]": { click: this.btprocess_sync_click },
      "inv_fg_out button[pid=btrefresh_main]": { click: this.btrefresh_main_click_with_cbo },

      "FRMinv_fg_out_sync_finishgood button[pid=btrefresh]": { click: this.btrefresh_click },
      "FRMinv_fg_out_sync_finishgood datefield[name=RegisterDate]": { change: this.btrefresh_click },

      "FRMfg_out_scrapitem button[pid=out_toscrap_btselectpart]": { click: this.out_toscrap_btselectpart_click },
      "FRMfg_out_scrapitem button[pid=btitem_save]": { click: this.out_scrapitem_btitem_save_click },
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
  formatqty: function (value) {
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
  btrefresh_main_click_with_cbo: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var GRID = Ext.ComponentQuery.query("inv_fg_out GRIDinv_fg_out grid")[0];
      GRID.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btrefresh_main_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var GRID = Ext.ComponentQuery.query("inv_fg_out GRIDinv_fg_out grid")[0];
      GRID.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btprocess_sync_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("FRMinv_fg_out_sync_finishgood", "TDK.INVENTORY.inv_fg_out.FRMinv_fg_out_sync_finishgood", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btproses_sync_finishgood_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var popup = Ext.ComponentQuery.query("FRMinv_fg_out_sync_finishgood")[0];
      var grid_finishgood = Ext.ComponentQuery.query("FRMinv_fg_out_sync_finishgood grid[pid=GRIDsync_finishgood]")[0];
      var GRIDmain = Ext.ComponentQuery.query("GRIDinv_fg_out grid[pid=GRIDinv_fg_out]")[0];

      if (grid_finishgood.getStore().getDataSource().length < 1) {
        COMP.TipToast.toast("Error", "Data tidak ada", { cls: "danger", delay: 2000 });
        return false;
      }

      var vfgdate = Ext.ComponentQuery.query("FRMinv_fg_out_sync_finishgood datefield[name=RegisterDate]")[0];
      var params = Ext.encode({
        method: "SP_INV_FG_OUT",
        fgdate: moment(vfgdate.getValue()).format("YYYY-MM-DD"),
        module: "proses_data",
      });

      var hasil = COMP.run.getservice(vconfig.service_api + "inv_fg_out/inv_fg_out", params, "POST", localStorage.getItem("ST_NJC_JWT"));
      hasil.then(function (content) {
        var val = Ext.decode(content, true);
        if (val.success == "true") {
          COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 2000 });
          popup.close();
          GRIDmain.getStore().load();
        } else {
          COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 2000 });
        }
      }, this);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btrefresh_click: function () {
    try {
      var me = this;
      var GRID = Ext.ComponentQuery.query("FRMinv_fg_out_sync_finishgood grid[pid=GRIDsync_finishgood]")[0];
      GRID.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btdetail_rows_click: function (xgrid, rowIndex) {
    try {
      xgrid.getSelectionModel().select(rowIndex);
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("fgout_dokumen_detail", "TDK.INVENTORY.inv_fg_out.dokumen_detail.dokumen_detail", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  out_to_memo_scrap_click: function () {
    try {
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("FRMfg_out_scrapitem", "TDK.INVENTORY.inv_fg_out.FRMfg_out_scrapitem", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  out_toscrap_btselectpart_click: function () {
    try {
      var FRM = Ext.ComponentQuery.query("FRMfg_out_scrapitem form")[0];
      var GRIDitem = Ext.ComponentQuery.query("FRMfg_out_scrapitem grid")[0];
      var vdt_form = FRM.getValues(false, false, false, true);
      if (vdt_form.TANGGAL_OUT === null) {
        COMP.TipToast.toast("Error", "Pilih Tanggal Scrap lebih dulu", { cls: "danger", delay: 2000 });
        return;
      }
      vdt_form.TANGGAL_OUT = moment(vdt_form.TANGGAL_OUT).format("YYYY-MM-DD");

      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

      var popup = Ext.define("TDK.INVENTORY.inv_fg_out.popup_itempart", {
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
                url: vconfig.service_api + "inv_fg_out/inv_fg_outs",
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
              { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "IN DATE", dataIndex: "WIN_DATE" },
              { sortable: true, width: 90, filter: { xtype: "textfield" }, header: "SOURCE", dataIndex: "SUMBER_DATA" },
              { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "INVOICE", dataIndex: "INVOICE_NO" },
              { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "PART NO", dataIndex: "PART_NO" },
              { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "MAPP PART", dataIndex: "MAPP_PARTNO" },
              { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "PART NAME", dataIndex: "PART_NAME" },
              { sortable: true, width: 80, align: "right", renderer: "formatqty", header: "STOCK", dataIndex: "SISA_QTY" },
              { sortable: true, width: 50, filter: { xtype: "textfield" }, header: "SEQNO", dataIndex: "IS_FROM_AW_SEQNO" },

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
                      WIN_DATE: vdt.WIN_DATE,
                      IS_FROM_AW_SEQNO: vdt.IS_FROM_AW_SEQNO,
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
                      { property: "IS_FROM_AW_SEQNO", value: vdt.IS_FROM_AW_SEQNO },
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
                        WIN_DATE: vdt.WIN_DATE,
                        IS_FROM_AW_SEQNO: vdt.IS_FROM_AW_SEQNO,
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
  out_scrapitem_btitem_save_click: function () {
    try {
      var me = this;
      var GRIDmanual = Ext.ComponentQuery.query("FRMfg_out_scrapitem grid[pid=GRIDout_toscrap_mt]")[0];
      var popup = Ext.ComponentQuery.query("FRMfg_out_scrapitem")[0];
      var GRIDMAIN = Ext.ComponentQuery.query("inv_fg_out GRIDinv_fg_out grid[pid=GRIDinv_fg_out]")[0];

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
      var FRM = Ext.ComponentQuery.query("FRMfg_out_scrapitem form")[0];

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
            WIN_DATE: vrec.WIN_DATE,
            IS_FROM_AW_SEQNO: vrec.IS_FROM_AW_SEQNO,
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
            var hasil = COMP.run.getservice(vconfig.service_api + "inv_fg_out/inv_fg_out", params, "POST", me.var_global.jwt);
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
  btdetail_poly_click: function (cmp, idx) {
    try {
      var GRIDmain = Ext.ComponentQuery.query("GRIDinv_fg_out grid[pid=GRIDinv_fg_out]")[0];
      GRIDmain.getSelectionModel().select(idx);

      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("FRMinv_fg_out_polyinfo", "TDK.INVENTORY.inv_fg_out.FRMinv_fg_out_polyinfo", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});
