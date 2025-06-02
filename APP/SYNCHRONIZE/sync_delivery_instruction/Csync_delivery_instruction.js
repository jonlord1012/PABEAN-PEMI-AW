Ext.define("NJC.SYNCHRONIZE.sync_delivery_instruction.Csync_delivery_instruction", {
   extend: "Ext.app.ViewController",
   alias: "controller.Csync_delivery_instruction",
   init: function (view) {
      this.control({
         "sync_delivery_instruction button[pid=btrefresh]": { click: this.btrefresh_click },
         "sync_delivery_instruction button[pid=btdelivery_sync]": { click: this.btdelivery_sync_click },
         //"sync_delivery_instruction button[pid=btprocess_syncaju]": { click: this.btprocess_syncaju_click },
         "sync_delivery_instruction button[pid=btcreate_draft]": { click: this.btcreate_draft_click },
         /*
        "sync_delivery_instruction button[pid=btmapping_supplier]": { click: this.btmapping_supplier_click },
        "sync_delivery_instruction button[pid=btmapping_itempart]": { click: this.btmapping_itempart_click },
        "sync_delivery_instruction button[pid=btdokumen_draft]": { click: this.btdokumen_draft_click },
        "FRMsync_delivery_instruction_tracing button[pid=btget_from_ceisa]": { click: this.btget_from_ceisa_click },
        */
         "sync_delivery_instruction combobox[name=CBO_FILTERKEY]": { select: this.btrefresh_click },
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
   formatAmount: function (value) {
      var text = Ext.util.Format.number(value, "0,000.00/i");
      return text;
   },
   renderpage: function () {
      try {
         console.log("Rendered Controller: " + this.alias);
      } catch (ex) {
         COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      }
   },
   formatDate: function (value) {
      var text = Ext.util.Format.date(value, "Y-m-d");
      return text;
   },

   formatqty: function (value) {
      var text = Ext.util.Format.number(value, "0,000/i");
      return text;
   },
   btrefresh_click: function () {
      try {
         var GRID = Ext.ComponentQuery.query("sync_delivery_instruction GRIDsync_delivery_instruction grid[pid=GRIDsync_delivery_instruction]")[0];
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

         COMP.run.getmodulepopup("FRMsync_delivery_instruction_detail", "NJC.SYNCHRONIZE.sync_delivery_instruction.FRMsync_delivery_instruction_detail", mainpanel);
      } catch (ex) {
         COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      }
   },
   FRMsync_delivery_instruction_load: function (cmp) {
      try {
         var GRID = Ext.ComponentQuery.query("sync_delivery_instruction GRIDsync_delivery_instruction grid[pid=GRIDsync_delivery_instruction]")[0];
         var vdt = GRID.getSelectionModel().getSelection()[0].data;
         cmp.setTitle("Tracing Dokumen No Invoice: " + vdt.INVOICE_NO);
      } catch (ex) {
         COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      }
   },
   btcreate_draft_click: function () {
      try {
         var me = this;
         var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

         mainpanel.remove("aw_dokumen_draft_out", true);
         COMP.run.getmodulepopup("aw_dokumen_draft_out", "NJC.SYNCHRONIZE.sync_delivery_instruction.dokumen_draft_out.dokumen_draft_out", mainpanel);
      } catch (ex) {
         COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      }
   },
   btdelivery_sync_click: function () {
      try {
         var me = this;
         var params = Ext.encode({
            method: "sync_data",
            module: "plb",
         });
         var hasil = COMP.run.getservice(vconfig.service_api + "sync_delivery_instruction/sync_delivery_instruction", params, "POST", me.var_global.jwt);
         hasil.then(function (content) {
            var val = Ext.decode(content, true);
            if (val.success === "true") {
               COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 2000 });
               me.btrefresh_click();
            } else {
               COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 2000 });
               console.log(val.message);
            }
         }, this);
      } catch (ex) {
         COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      }
   }

});