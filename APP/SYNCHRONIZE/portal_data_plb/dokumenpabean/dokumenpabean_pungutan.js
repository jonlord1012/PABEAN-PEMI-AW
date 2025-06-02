Ext.define("NJC.SYNCHRONIZE.portal_data_plb.dokumenpabean.dokumenpabean_pungutan", {
   extend: "Ext.form.Panel",
   alias: "widget.dokumenpabean_pungutan",
   reference: "dokumenpabean_pungutan",
   frame: false,
   border: true,
   autoScroll: false,
   layout: { type: "vbox", pack: "start", align: "stretch" },
   //requires: ["TDK.SYNCHRONIZE.portal_data_plb.dokumenpabean.Cdokumenpabean"],
   //controller: "Cdokumenpabean",
   fieldDefaults: {
      labelAlign: "left",
      labelWidth: 90,
      margin: "0 10 5 0",
   },
   items: [
      {
         xtype: "grid",
         pid: "GRIDdokumenpabean_pungutan",
         emptyText: "No Matching Records",
         autoScroll: true,
         flex: 1,
         store: {
            autoLoad: true,
            remoteSort: false,
            remoteFilter: false,
            pageSize: 0,
            proxy: {
               type: "ajax",
               disableCaching: false,
               noCache: false,
               headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
               actionMethods: { read: "POST" },
               url: vconfig.service_api + "portal_data/portal_datas",
               extraParams: {
                  method: "read_dokumenpabean_pungutan",
                  // module: "coo",
               },
               reader: {
                  type: "json",
                  rootProperty: "Rows",
                  totalProperty: "TotalRows",
                  successProperty: "success",
               },
            },
            listeners: {
               beforeload: function (store, operation, eOpts) {
                  try {
                     var GRID = Ext.ComponentQuery.query("portal_data_plb GRIDportal_data_plb grid[pid=GRIDportal_data_plb]")[0];
                     var vdt = GRID.getSelectionModel().getSelection()[0].data;
                     operation.setParams({
                        INVOICE_NO: vdt.INVOICE_NO,
                        NOMOR_AJU: vdt.NOMOR_AJU
                     });
                  } catch (ex) {
                     COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                  }
               },
            },
         },
         plugins: ["filterfield"],
         viewConfig: {
            enableTextSelection: true,
         },
         columns: [
            { xtype: "rownumberer", width: 50 },
            { sortable: true, width: 200, filter: { xtype: "textfield" }, header: "NOMOR AJU", dataIndex: "NOMORAJU" },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE PUNGUTAN", dataIndex: "KODEJENISPUNGUTAN" },
            { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "NILAI PUNGUTAN", dataIndex: "NILAIPUNGUTAN", },
         ],
         bbar: ["-"],
      },
   ],
   dockedItems: [
      {
         xtype: "toolbar",
         height: 30,
         dock: "top",
         items: [
            "-",
            {
               xtype: "button",
               pid: "btrefresh",
               text: "Refresh",
               icon: vconfig.getstyle + "icon/update.ico",
               tooltip: "Refresh Data",
               handler: function () {
                  var GRID = Ext.ComponentQuery.query("dokumenpabean_pungutan grid[pid=GRIDdokumenpabean_pungutan]")[0];
                  GRID.getStore().load();
               },
            },
         ],
         // other options....
      },
   ],
});
