Ext.define("TDK.INVENTORY.inv_subassy_aw_in.Cinv_subassy_aw_in", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cinv_subassy_aw_in",
  init: function (view) {
    this.control({
      "inv_subassy_aw_in button[pid=btrefresh_main]": { click: this.btrefresh_main_click },
      "inv_subassy_aw_in button[pid=btreceiving_integrasi]": { click: this.btreceiving_integrasi_click },
      "FRMinv_subassy_aw_auto datefield[name=TANGGAL_RCV]": { change: this.tanggal_rcv_change },
      "FRMinv_subassy_aw_auto button[pid=awbtprocess_synchronize]": { click: this.awbtprocess_synchronize_click },
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
      var GRID = Ext.ComponentQuery.query("inv_subassy_aw_in GRIDinv_subassy_aw_in grid[pid=GRIDinv_subassy_aw_in]")[0];
      GRID.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btreceiving_integrasi_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("FRMinv_subassy_aw_auto", "TDK.INVENTORY.inv_subassy_aw_in.FRMinv_subassy_aw_auto", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  tanggal_rcv_change: function () {
    try {
      var GRID = Ext.ComponentQuery.query("FRMinv_subassy_aw_auto grid[pid=GRIDinv_subassy_aw_auto]")[0];
      GRID.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  awbtprocess_synchronize_click: function () {
    try {
      var me = this;
      var vrcvdate = Ext.ComponentQuery.query("FRMinv_subassy_aw_auto datefield[name=TANGGAL_RCV] ")[0];
      var GRID = Ext.ComponentQuery.query("FRMinv_subassy_aw_auto grid[pid=GRIDinv_subassy_aw_auto]")[0];
      var popup = Ext.ComponentQuery.query("FRMinv_subassy_aw_auto")[0];
      if (GRID.getStore().getDataSource().length === 0) {
        COMP.TipToast.toast("Error", "Data Receipt tidak ada", { cls: "danger", delay: 2000 });
        return false;
      }
      var Vgridinput = [];
      GRID.getStore()
        .getDataSource()
        .each(function (record) {
          if (record.data.ST === "OK") {
            var vrec = record.data;
            Vgridinput.push({
              RECEIPT_NO: vrec.AW_RECEIPT_NO,
              RECEIPT_DATE: vrec.AW_RECEIPT_DATE,
              INVOICE_NO: vrec.AW_INVOICE_NO,
              MODE_SOURCE: "ORA_MTRLPEMI",
              MAPP_PARTNO: vrec.AW_PART_NO,
              PART_NO: vrec.AW_PART_NO,
              QTY: vrec.AW_QTY,
              URUT: vrec.AW_URUT,
            });
          }
        });
      if (Vgridinput.length === 0) {
        COMP.TipToast.toast("Error", "Data tidak ada yang diproses", { cls: "danger", delay: 2000 });
        return false;
      }
      Ext.MessageBox.confirm(
        "Konfirmasi Synchronize Data Receiving Tanggal: " + moment(vrcvdate.getValue()).format("YYYY-MM-DD"),
        //
        "<b>Proses Sinkronisasi: </b>" +
          //
          "<ol>" +
          "<li>Tanggal yang diproses: " +
          moment(vrcvdate.getValue()).format("YYYY-MM-DD") +
          "</li>" +
          "</ol>",

        function (button) {
          if (button === "yes") {
            var params = Ext.encode({
              method: "read_integrasi_aw",
              module: "proses_data",
              vdate: moment(vrcvdate.getValue()).format("YYYY-MM-DD"),
              vdata: Ext.encode(Vgridinput),
            });
            var hasil = COMP.run.getservice(vconfig.service_api + "inv_subassy_aw_in/inv_subassy_aw_in", params, "POST", me.var_global.jwt);
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
});
