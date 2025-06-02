Ext.define("NJC.SYNCHRONIZE.portal_data_plb.Cportal_data_plb", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cportal_data_plb",
  init: function (view) {
    this.control({
      "portal_data_plb button[pid=btupload_form]": { click: this.btuploadform_portal },
      "portal_data_plb button[pid=btportal_form]": { click: this.btportalform_click },
      "portal_data_plb button[pid=btrefresh]": { click: this.btrefresh_click },
      //"portal_data_plb button[pid=btprocess_sync]": { click: this.btprocess_sync_click },
      //"portal_data_plb button[pid=btprocess_syncaju]": { click: this.btprocess_syncaju_click },
      //"portal_data_plb button[pid=btmapping_supplier]": { click: this.btmapping_supplier_click },
      //"portal_data_plb button[pid=btmapping_itempart]": { click: this.btmapping_itempart_click },
      //"portal_data_plb button[pid=btdokumen_draft]": { click: this.btdokumen_draft_click },
      "portal_data_plb button[pid=btdownload_aju_plb]": { click: this.btdownload_aju_click },
      "portal_data_plb button[pid=btupload_aju_plb]": { click: this.uploadAju },

      "FRMportal_data_plb_tracing button[pid=btget_from_ceisa]": { click: this.btget_from_ceisa_click },
      "FRMportal_download_aju_plb button[pid=btdownload]": { click: this.download_singleaju },

      "portal_data_plb combobox[name=CBO_FILTERKEY]": { select: this.btrefresh_click },
      // upload form file
      //"FRMupload_form button[pid=btsubmit_upload]": { click: this.btsubmit_upload },
      "FRMportal_form_plb grid[pid=GRIDform_portal]": { itemdblclick: this.process_upload_form },
      "FRMupload_form grid[pid=GRIDform_portal]": { itemdblclick: this.process_upload_form },
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

  formatDate: function (value) {
    var text = Ext.util.Format.date(value, "Y-m-d");
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
  btrefresh_click: function () {
    try {
      var GRID = Ext.ComponentQuery.query("portal_data_plb GRIDportal_data_plb grid[pid=GRIDportal_data_plb]")[0];
      GRID.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btuploadform_portal: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

      COMP.run.getmodulepopup("FRMupload_form", "NJC.SYNCHRONIZE.portal_data_plb.FRMupload_form", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btportalform_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

      COMP.run.getmodulepopup("FRMportal_form_plb", "NJC.SYNCHRONIZE.portal_data_plb.FRMportal_form_plb", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },

  btdownload_aju_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

      mainpanel.remove("FRMportal_download_aju_plb", true);
      COMP.run.getmodulepopup("FRMportal_download_aju_plb", "NJC.SYNCHRONIZE.portal_data_plb.FRMportal_download_aju_plb", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btdetail_rows_click: function (xgrid, rowIndex) {
    try {
      xgrid.getSelectionModel().select(rowIndex);
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

      COMP.run.getmodulepopup("FRMportal_data_tracing", "NJC.SYNCHRONIZE.portal_data_plb.FRMportal_data_tracing", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  FRMportal_data_load: function (cmp) {
    try {
      var GRID = Ext.ComponentQuery.query("portal_data_plb GRIDportal_data_plb grid[pid=GRIDportal_data_plb]")[0];
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
      var cls = "NJC.SYNCHRONIZE.portal_data_plb." + vmodulename + "." + vmodulecontrol;
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
      COMP.run.getmodulepopup("mapping_supplier", "NJC.SYNCHRONIZE.portal_data_plb.mapping_supplier.mapping_supplier", mainpanel);
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
      COMP.run.getmodulepopup("mapping_itempart", "NJC.SYNCHRONIZE.portal_data_plb.mapping_itempart.mapping_itempart", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btdokumen_draft_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

      mainpanel.remove("coo_dokumen_draft", true);
      COMP.run.getmodulepopup("coo_dokumen_draft", "NJC.SYNCHRONIZE.portal_data_plb.dokumen_draft.dokumen_draft", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btget_from_ceisa_click: function () {
    try {
      var me = this;
      var GRID = Ext.ComponentQuery.query("portal_data_plb GRIDportal_data_plb grid[pid=GRIDportal_data_plb]")[0];
      var vdt = GRID.getSelectionModel().getSelection()[0].data;
      var params = Ext.encode({
        method: "mapp_this_document",
        module: "SUMBER DATA",
        INVOICE_NO: vdt.INVOICE_NO,
        VMODE: 'plb',
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
      var params = Ext.encode({
        method: "process_upload_form",
        FileName: row.data.NOMORAJU,
        FilePath: row.data.FileName, 
		  ISINTERNAL : '1' , 
      });

      var hasil = COMP.run.getservice(vconfig.service_api + "portal_data/portal_data", params, "POST", me.var_global.jwt);
      hasil.then(function (response) {
        var result = Ext.decode(response, true);
        if (result.success == "true") {
          form_upload.close();
          COMP.TipToast.toast("Success", result.message, { cls: "success", delay: 2000 });
        } else {
          COMP.TipToast.toast("Error", result.message, { cls: "danger", delay: 2000 });
        }

      }, this);

    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },

  download_selectedaju: function (cmp, rec) {
    console.log("double clicked");
    try {
      var me = this;
      var GRID = Ext.ComponentQuery.query("FRMportal_form_plb grid[pid=GRIDform_portal]")[0];
      var popup = Ext.ComponentQuery.query("FRMportal_form_plb")[0];
      var vdt = GRID.getSelectionModel().getSelection()[0].data;
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
            var hasil = COMP.run.getservice(vconfig.service_portalplb + "main/testDownload", params, "POST", me.var_global.jwt);
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

  download_singleaju: function () {
    try {
      var me = this;
      var FRM = Ext.ComponentQuery.query("FRMportal_download_aju_plb form")[0];
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

      var hasil = COMP.run.getservice(vconfig.service_portalplb + "main/testDownload", params, "POST", me.var_global.jwt);
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
  
  uploadAju: function() {
	try{
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
	  var popupUpload = Ext.define("NJC.SYNCHRONIZE.portal_data_plb.popup_upload",{
		extend: "Ext.window.Window",
        alias: "widget.popup_upload",
        reference: "popup_upload",
        title: "Upload dokumen BeaCukai",
        modal: true,
        closeAction: "destroy",
        centered: true,
        autoScroll: true,
        width: mainpanel.getWidth() * 0.3,
        height: mainpanel.getHeight() * 0.6 ,
        layout: { type: "vbox", pack: "start", align: "stretch" },
        bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
        items: [
		{ xtype: "form", frame: false, border:false, flex: 0.9, layout:{type:"vbox", pack:"start", align:"stretch" }, 
			items : [
				{header: "textfield", label: "Upload file", width:100, }, 
				{
					  xtype: "fileuploadfield",
					  pid: "btuploaddata",
					  emptyText: "Pilih File ",
					  fieldLabel: "Lokasi File Upload",
					  name: "file_upload",
					  buttonText: "Browse...",
					  accept: [".xlsx", ".xls"],
					  margin: "5 5 5 5",
					  fieldCls: "fieldinput",
					  flex: 1,
					  
				},
			],
		
		}, 
		], 
	  });
		 COMP.run.getmodulepopup("popup_upload", popupUpload, this.getView());
	} catch (ex) {
		COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 3000} ) ; 
	}
  }
});
