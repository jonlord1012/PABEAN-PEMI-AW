Ext.define("NJC.SYNCHRONIZE.portal_data.GRIDportal_data", {
   extend: "Ext.form.Panel",
   alias: "widget.GRIDportal_data",
   reference: "GRIDportal_data",
   requires: ["Ext.grid.feature.Grouping"],
   frame: false,
   border: false,
   autoScroll: true,
   layout: { type: "hbox", pack: "start", align: "stretch" },
   requires: [],
   items: [
      {
         xtype: "grid",
         pid: "GRIDportal_data",
         emptyText: "No Matching Records",
         autoScroll: true,
         flex: 1,
         store: {
            autoLoad: true,
            remoteSort: true,
            remoteFilter: true,
            pageSize: 20,
            proxy: {
               type: "ajax",
               disableCaching: false,
               noCache: false,
               headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
               actionMethods: { read: "POST" },
               url: vconfig.service_api + "portal_data/portal_datas",
               extraParams: {
                  method: "read_data",
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
                     var CBO_FILTERKEY = Ext.ComponentQuery.query("portal_data combobox[name=CBO_FILTERKEY]")[0];
                     operation.setParams({
                        cbo_filterkey: CBO_FILTERKEY.getValue(),
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
            getRowClass: function (record) {
               return record.get("NOMOR_AJU") === null || record.get("NOMOR_DAFTAR") === null ? "gridrow-red" : "";
            },
         },
         columns: [
            { xtype: "rownumberer", width: 40 },
            {
               xtype: "actioncolumn",
               width: 35,
               align: "center",
               menuDisabled: true,
               sortable: false,
               items: [
                  {
                     icon: vconfig.getstyle + "icon/grid.png",
                     handler: "btdetail_rows_click",
                     tooltip: "Detail Dokumen",
                  },
               ],
            },
            { sortable: true, width: 250, filter: { xtype: "textfield" }, header: "VENDOR", dataIndex: "VENDOR" },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "INVOICE_NO", dataIndex: "INVOICE_NO" },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "INV DATE", dataIndex: "INVOICE_DATE" },
            { sortable: true, width: 70, filter: { xtype: "textfield" }, header: "BC TYPE", dataIndex: "BC_TYPE" },
            { sortable: true, width: 200, filter: { xtype: "textfield" }, header: "NOMOR AJU", dataIndex: "NOMOR_AJU" },
            { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "TGL AJU", dataIndex: "TANGGAL_AJU" },
            { sortable: true, width: 70, filter: { xtype: "textfield" }, header: "NOMOR DAFTAR", dataIndex: "NOMOR_DAFTAR" },
            { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "TGL DAFTAR", dataIndex: "TANGGAL_DAFTAR" },
            { sortable: true, width: 90, filter: { xtype: "textfield" }, header: "MAPP SUPPLIER", dataIndex: "MAPP_SUPPLIER" },
            { sortable: true, width: 300, filter: { xtype: "textfield" }, header: "SUPPLIER NAME", dataIndex: "NAMA" },
         ],
         bbar: {
            xtype: "pagingtoolbar",
            displayInfo: true,
            displayMsg: "Displaying topics {0} - {1} of {2}",
            emptyMsg: "No topics to display",
         },
      },
   ],
});
