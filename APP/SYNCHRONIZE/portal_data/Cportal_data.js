Ext.define("NJC.SYNCHRONIZE.portal_data.Cportal_data", {
   extend: "Ext.app.ViewController",
   alias: "controller.Cportal_data",
   init: function (view) {
      this.control({
         "portal_data button[pid=btupload_form]": { click: this.btuploadform_portal },
         "portal_data button[pid=btportal_form]": { click: this.btportalform_click },
         "portal_data button[pid=btrefresh]": { click: this.btrefresh_click },
         // "portal_data button[pid=btprocess_sync]": { click: this.btprocess_sync_click },
         // "portal_data button[pid=btprocess_syncaju]": { click: this.btprocess_syncaju_click },
         // "portal_data button[pid=btmapping_supplier]": { click: this.btmapping_supplier_click },
         // "portal_data button[pid=btmapping_itempart]": { click: this.btmapping_itempart_click },
         // "portal_data button[pid=btdokumen_draft]": { click: this.btdokumen_draft_click },
         "portal_data button[pid=btdownload_aju]": { click: this.btdownload_aju_click },
         "portal_data button[pid=btlast_aju]": { click: this.btlast_aju_click },
         "FRMportal_download_aju button[pid=btdownload]": { click: this.download_singleaju },
         "FRMportal_last_aju button[pid=btgetLastAju]": { click: this.download_lastaju },


         "FRMportal_data_tracing button[pid=btget_from_ceisa]": { click: this.btget_from_ceisa_click },

         "portal_data combobox[name=CBO_FILTERKEY]": { select: this.btrefresh_click },
         // upload form file
         "FRMupload_form grid[pid=GRIDform_portal]": { itemdblclick: this.process_upload_form },
         /*"FRMportal_form grid[pid=GRIDform_portal]": { itemdblclick: this.download_selectedaju }*/
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
   btrefresh_click: function () {
      try {
         var GRID = Ext.ComponentQuery.query("portal_data GRIDportal_data grid[pid=GRIDportal_data]")[0];
         GRID.getStore().load();
      } catch (ex) {
         COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      }
   },
   btuploadform_portal: function () {
      try {
         var me = this;
         var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

         COMP.run.getmodulepopup("FRMupload_form", "NJC.SYNCHRONIZE.portal_data.FRMupload_form", mainpanel);
      } catch (ex) {
         COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      }
   },
   btportalform_click: function () {
      try {
         var me = this;
         var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

         COMP.run.getmodulepopup("FRMportal_form", "NJC.SYNCHRONIZE.portal_data.FRMportal_form", mainpanel);
      } catch (ex) {
         COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      }
   },
   btdetail_rows_click: function (xgrid, rowIndex) {
      try {
         xgrid.getSelectionModel().select(rowIndex);
         var me = this;
         var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

         COMP.run.getmodulepopup("FRMportal_data_tracing", "NJC.SYNCHRONIZE.portal_data.FRMportal_data_tracing", mainpanel);
      } catch (ex) {
         COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      }
   },
   FRMportal_data_load: function (cmp) {
      try {
         var GRID = Ext.ComponentQuery.query("portal_data GRIDportal_data grid[pid=GRIDportal_data]")[0];
         var vdt = GRID.getSelectionModel().getSelection()[0].data;
         cmp.setTitle("Tracing Dokumen No Invoice: " + vdt.INVOICE_NO + ' - ' + vdt.VENDOR);
      } catch (ex) {
         COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      }
   },
   FRMportal_data_tracing_linkclick: function (cmp, dt) {
      try {
         var vdt = dt.data;
         if (vdt.allowclick !== true) return;
         var vmodulecontrol = vdt.controlname === "" ? vdt.text : vdt.controlname;
         var vmodulename = vdt.modulename === "" ? vmodulecontrol : vdt.modulename;
         var id = vmodulecontrol;
         var cls = "NJC.SYNCHRONIZE.portal_data." + vmodulename + "." + vmodulecontrol;
         var tabs = Ext.ComponentQuery.query("FRMportal_data_tracing tabpanel[pid=toproduction_tabpanel]")[0];
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
   btprocess_sync_click: function () {
      try {
         var me = this;
         var params = Ext.encode({
            method: "sync_file",
            module: "coo",
         });
         var hasil = COMP.run.getservice(vconfig.service_api + "sync_doc/sync_doc", params, "POST", me.var_global.jwt);
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
            module: "coo",
         });
         var hasil = COMP.run.getservice(vconfig.service_api + "sync_doc/sync_doc", params, "POST", me.var_global.jwt);
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
         console.log("mapping supplier");
         var me = this;
         var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
         var popup = Ext.ComponentQuery.query("mapping_supplier")[0]; //this.lookupReference('FRMposales');
         if (popup) {
            popup.remove();
         }
         COMP.run.getmodulepopup("mapping_supplier", "NJC.SYNCHRONIZE.portal_data.mapping_supplier.mapping_supplier", mainpanel);
      } catch (ex) {
         COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      }
   },
   btmapping_itempart_click: function () {
      try {
         var me = this;
         var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
         var popup = Ext.ComponentQuery.query("mapping_itempart")[0]; //this.lookupReference('FRMposales');
         if (popup) {
            popup.remove();
         }
         COMP.run.getmodulepopup("mapping_itempart", "NJC.SYNCHRONIZE.portal_data.mapping_itempart.mapping_itempart", mainpanel);
      } catch (ex) {
         COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      }
   },
   btdokumen_draft_click: function () {
      try {
         var me = this;
         var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

         mainpanel.remove("coo_dokumen_draft", true);
         COMP.run.getmodulepopup("coo_dokumen_draft", "NJC.SYNCHRONIZE.portal_data.dokumen_draft.dokumen_draft", mainpanel);
      } catch (ex) {
         COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      }
   },
   btdownload_aju_click: function () {
      try {
         var me = this;
         var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

         mainpanel.remove("FRMportal_download_aju", true);
         COMP.run.getmodulepopup("FRMportal_download_aju", "NJC.SYNCHRONIZE.portal_data.FRMportal_download_aju", mainpanel);
      } catch (ex) {
         COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      }
   },
   btlast_aju_click: function () {
      try {
         var me = this;
         var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

         mainpanel.remove("FRMportal_last_aju", true);
         COMP.run.getmodulepopup("FRMportal_last_aju", "NJC.SYNCHRONIZE.portal_data.FRMportal_last_aju", mainpanel);
      } catch (ex) {
         COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      }
   },
   btget_from_ceisa_click: function () {
      try {
         var me = this;
         var GRID = Ext.ComponentQuery.query("portal_data GRIDportal_data grid[pid=GRIDportal_data]")[0];
         var vdt = GRID.getSelectionModel().getSelection()[0].data;
         var params = Ext.encode({
            method: "mapp_this_document",
            VMODE: 'SUMBER DATA',
            INVOICE_NO: vdt.INVOICE_NO,
         });
         var hasil = COMP.run.getservice(vconfig.service_api + "portal_data/portal_data", params, "POST", me.var_global.jwt);
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
   btsubmit_upload: async function (e, b) {
      var me = this,
         form = Ext.ComponentQuery.query("FRMupload_form form")[0],
         form_data = form.getForm();

      if (form.isValid()) {

         // var form_ = await form.submit({
         //   url: vconfig.service_api + "portal_data/portal_datas",
         //   method: "POST",
         //   enctype: 'multipart/form-data',
         //   headers: { 
         //     'Authorization': "Bearer " + me.var_global.jwt,
         //     'Content-Type' : "application/json" 
         //   },
         //   params: {
         //     method: "read_upload_form",
         //     // jwt:me.var_global.jwt
         //   },
         //   waitMsg: "Upload file excel",
         //   success: function (form, action){
         //     console.log(form, action)
         //     COMP.TipToast.toast("Success", action.result.message, { cls: "success", delay: 2000 });
         //   }, 
         //   failure: function (form, action){
         //     COMP.TipToast.toast("Error", action.result.message, { cls: "danger", delay: 2000 });
         //   }
         // })

         // console.log(form_)


         // var formdata = new FormData();

         // formdata.append('file_excel', file)
         // formdata.append('method', "read_upload_form");




         // // var hasil = await COMP.run.getservice(vconfig.service_api + "portal_data/portal_data", params, "POST", me.var_global.jwt)
         var reader = new FileReader();

         var file_excel = form_data.findField('file_excel');
         var file = file_excel.fileInputEl.dom.files[0];
         var filename = file.name;
         var fileExt = filename.split('.').pop();
         // console.log(filename.split('.').pop())

         if (fileExt === 'xlsx' || fileExt === 'xls' || fileExt === 'xlx') {

            reader.onload = async function (event) {

               var fileContent = event.target.result;

               var params = Ext.encode({
                  method: "read_upload_form",
                  file_excel: fileContent
               })

               var response = await COMP.run.ajax_form({
                  url: vconfig.service_api + "portal_data/portal_data",
                  method: "POST",
                  token: me.var_global.jwt,
                  param: params,
               })

               console.log(response)
            }

            reader.readAsDataURL(file)
         } else {

         }

      } else {
         COMP.TipToast.toast("Error", "input file kosong!", { cls: "danger", delay: 2000 });
      }
   },
   process_upload_form: function (grid, row) {
      try {
         var me = this;
         var form_upload = Ext.ComponentQuery.query("FRMupload_form")[0];
         // var nomorAju = row.data.NOMORAJU.substring(5);
         // var fileName = row.data.NOMORAJU + ".xlsx";
         var params = Ext.encode({
            method: "process_upload_form",
            FileName: row.data.NOMORAJU,
            FilePath: row.data.FileName,
            ISINTERNAL: '0',
         });
         console.log(params);
         //return;

         var hasil = COMP.run.getservice(vconfig.service_api + "portal_data/portal_data", params, "POST", me.var_global.jwt);
         hasil.then(function (response) {
            var result = Ext.decode(response, true);
            console.log(result.message);
            /*
            if (result.success == "true") {
               var paramsforDBIT = Ext.encode({
                  method: "sync_to_dbit",
                  PNOMOR_AJU: nomorAju,
               });
               
               var hasilDBIT = COMP.run.getservice(vconfig.service_api + "portal_data/portal_data", paramsforDBIT, "POST", me.var_global.jwt);
               hasilDBIT.then(function (response) {
                  var result2 = Ext.decode(response, true);
                  console.log(result2.message);
                  */

            if (result.success == "true") {
               form_upload.close();
               COMP.TipToast.toast("Success", result.message, { cls: "success", delay: 2000 });
            } else {
               COMP.TipToast.toast("Error", result.message, { cls: "danger", delay: 2000 });
            }
         }, this);
         /*
      } else {
         COMP.TipToast.toast("Error", result.message, { cls: "danger", delay: 2000 });
      }
}, this);
*/

      } catch (ex) {
         COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      }
   },
   download_singleaju: function () {
      try {
         var me = this;
         var FRM = Ext.ComponentQuery.query("FRMportal_download_aju form")[0];
         var MAIN_dtval = FRM.getValues(false, false, false, true);
         var params = Ext.encode({
            method: "testDownload",
            NOMORAJU: MAIN_dtval.NOMOR_AJU,
            KODEDOKUMEN: MAIN_dtval.KODE_DOKUMEN,
         });
         console.log("From Single Form");
         if (MAIN_dtval.NOMOR_AJU === "") {
            COMP.TipToast.toast("Error", "Nomor Aju Wajib diisi", { cls: "danger", delay: 2000 });
            return false;
         }
         if (MAIN_dtval.KODE_DOKUMEN === "") {
            COMP.TipToast.toast("Error", "Tipe BC Wajib diisi", { cls: "danger", delay: 2000 });
            return false;
         }
         var tipebc = ["41", "27", "25"];
         if (!tipebc.find(e => e === MAIN_dtval.KODE_DOKUMEN)) {
            COMP.TipToast.toast("Error", "Tipe BC yang diperbolehkan 41, 27 & 25", { cls: "danger", delay: 2000 });
            return false;
         }

         var hasil = COMP.run.getservice(vconfig.service_portal + "main/testDownload", params, "POST", me.var_global.jwt);
         hasil.then(function (content) {
            var val = Ext.decode(content, true);
            if (val.success === "true") {
               COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 3000 });
               popup.close();
               $this.btrefresh_click();
               //GRID.getStore().load();
            } else {
               COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 3000 });
               popup.close();
            }
         }, this);
      } catch (ex) {
         COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      }
   },
   download_lastaju: function () {
      try {
         var me = this;
         var FRM = Ext.ComponentQuery.query("FRMportal_last_aju form")[0];
         var MAIN_dtval = FRM.getValues(false, false, false, true);
         var params = Ext.encode({
            method: "testLast",
            NOMORAJU: MAIN_dtval.NOMOR_AJU,
            KODEDOKUMEN: MAIN_dtval.KODE_DOKUMEN,
         });
         console.log("Button LAST AJU Executed");
         /*if (MAIN_dtval.NOMOR_AJU === "") {
            COMP.TipToast.toast("Error", "Nomor Aju Wajib diisi", { cls: "danger", delay: 2000 });
            return false;
         }*/
         if (MAIN_dtval.KODE_DOKUMEN === "") {
            COMP.TipToast.toast("Error", "Tipe BC Wajib diisi", { cls: "danger", delay: 2000 });
            return false;
         }
         var tipebc = ["41", "27", "25"];
         if (!tipebc.find(e => e === MAIN_dtval.KODE_DOKUMEN)) {
            COMP.TipToast.toast("Error", "Tipe BC yang diperbolehkan 41, 27 & 25", { cls: "danger", delay: 2000 });
            return false;
         }

         var hasil = COMP.run.getservice(vconfig.service_portal + "main/testLast", params, "POST", me.var_global.jwt);

         //console.log(hasil.then);
         hasil.then(function (content) {
            var val = Ext.decode(content, true);
            console.log("Results: " + val.data[0]);
            FRM.getForm().setValues(val.data[0]);
            //FRM.NOMOR_AJU.setValues(val.nomorAju);

            /*
            if (val.success === "true") {
               COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 3000 });
               // popup.close();
               //$this.btrefresh_click();
               //GRID.getStore().load();
            } else {
               COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 3000 });
               popup.close();
            }*/
         }, this);
      } catch (ex) {
         COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      }
   },
   download_selectedaju: function (cmp, rec) {
      console.log("double clicked");
      try {
         var me = this;
         var GRID = Ext.ComponentQuery.query("FRMportal_form grid[pid=GRIDform_portal]")[0];
         var popup = Ext.ComponentQuery.query("FRMportal_form")[0];
         var vdt = GRID.getSelectionModel().getSelection()[0].data;
         console.log("From Grid");
         var params = Ext.encode({
            method: "testDownload",
            NOMORAJU: vdt.nomorAju,
            KODEDOKUMEN: vdt.kodeDokumen,

         });
         Ext.MessageBox.confirm(
            "Konfirmasi",
            "Konfirmasi Download Portal Data",
            function (button) {
               if (button === "yes") {
                  var hasil = COMP.run.getservice(vconfig.service_portal + "main/testDownload", params, "POST", me.var_global.jwt);
                  hasil.then(function (content) {
                     var val = Ext.decode(content, true);
                     if (val.success === "true") {
                        COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 3000 });
                        popup.close();
                        //GRID.getStore().load();
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
});
