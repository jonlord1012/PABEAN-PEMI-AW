var mainpage = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.SYNCHRONIZE.portal_data.FRMupload_form", {
   extend: "Ext.window.Window",
   alias: "widget.FRMupload_form",
   pid: "FRMupload_form",
   controller: "Cportal_data",
   title: "Upload Form",
   bodyPadding: 10,
   autoScroll: true,
   modal: true,
   width: mainpage.getWidth() * 0.75,
   height: mainpage.getHeight() * 0.8,
   layout: { type: "vbox", pack: "start", align: "stretch" },
   items: [
      {
         border: false,
         xtype: 'grid',
         pid: "GRIDform_portal",
         reference: 'GRIDform_portal',
         plugins: ["filterfield"],
         autoScroll: true,
         flex: 1,
         viewConfig: {
            enableTextSelection: true,
         },
         store: {
            autoLoad: true,
            remoteSort: false,
            remoteFilter: false,
            proxy: {
               type: "ajax",
               disableCaching: false,
               noCache: false,
               headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
               actionMethods: { read: "POST" },
               url: vconfig.service_api + "portal_data/portal_datas",
               extraParams: {
                  method: "read_upload_form_aw",
               },
               reader: {
                  type: "json",
                  rootProperty: "Rows",
                  totalProperty: "TotalRows",
                  successProperty: "success",
               },
            },
            listeners: {
               itemdblclick: "process_upload_form",
            },
         },
         columns: [
            { xtype: "rownumberer", width: 40 },
            { sortable: true, flex: 1, width: 200, filter: { xtype: "textfield" }, header: "NOMOR AJU", dataIndex: "NOMORAJU", name: 'NOMORAJU' },
            { sortable: true, flex: 1, width: 200, filter: { xtype: "textfield" }, header: "Filename", dataIndex: "FileName", name: 'FILENAME' },
         ],

      }
   ]
})