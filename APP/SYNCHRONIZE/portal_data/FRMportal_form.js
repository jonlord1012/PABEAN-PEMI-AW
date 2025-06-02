var mainpage = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.SYNCHRONIZE.portal_data.FRMportal_form", {
   extend: "Ext.window.Window",
   alias: "widget.FRMportal_form",
   pid: "FRMportal_form",
   controller: "Cportal_data",
   title: "Portal Data",
   requires: ["Ext.grid.feature.Grouping"],
   centered: true,
   closeAction: "destroy",
   bodyPadding: 10,
   modal: true,
   layout: { type: "vbox", pack: "start", align: "stretch" },
   width: mainpage.getWidth() * 0.75,
   height: mainpage.getHeight() * 0.8,
   autoScroll: false,
   items: [
      {
         border: true,
         xtype: 'grid',
         pid: "GRIDform_portal",
         reference: 'GRIDform_portal',
         plugins: ["filterfield"],
         flex: 1,
         autoScroll: true,
         viewConfig: {
            enableTextSelection: true,
         },
         store: {
            autoLoad: true,
            remoteSort: false,
            remoteFilter: false,
            //pageSize: 15,
            proxy: {
               type: "ajax",
               disableCaching: false,
               noCache: false,
               headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
               actionMethods: { read: "POST" },
               url: vconfig.service_portal + "main/testBrowse",
               extraParams: {
                  method: "read",
               },
               reader: {
                  type: "json",
                  rootProperty: "data",
                  totalProperty: "total",
                  successProperty: "message",
               },
            },

            listeners: {
               itemdblclick: "download_selectedaju",
            },


         },
         columns: [
            { xtype: "rownumberer", width: 40 },
            { sortable: true, flex: 1, width: 200, filter: { xtype: "textfield" }, header: "JENIS DOKUMEN", dataIndex: "kodeDokumen", name: 'KODEDOKUMEN' },
            { sortable: true, flex: 1, width: 200, filter: { xtype: "textfield" }, header: "NOMOR AJU", dataIndex: "nomorAju", name: 'NOMORAJU' },
            { sortable: true, flex: 1, width: 200, filter: { xtype: "textfield" }, header: "NOMOR DAFTAR", dataIndex: "nomorDaftar", name: 'NOMORDAFTAR' },
            { sortable: true, flex: 1, width: 200, filter: { xtype: "textfield" }, header: "TANGGAL DAFTAR", dataIndex: "tanggalDaftar", name: 'TANGGALDAFTAR' },
            { sortable: true, flex: 1, width: 200, filter: { xtype: "textfield" }, header: "STATUS", dataIndex: "namaRespon", name: 'NAMARESPON' },
         ],
         bbar: {
            xtype: "pagingtoolbar",
            displayInfo: true,
            displayMsg: "Total Data {2}",
            emptyMsg: "No topics to display",
         },

         tbar: ["-"],
      },
   ]
})