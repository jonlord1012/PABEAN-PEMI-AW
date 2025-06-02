var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.INVENTORY.inv_wip_control.FRMwip_list_bchistory", {
  extend: "Ext.window.Window",
  alias: "widget.FRMwip_list_bchistory",
  reference: "FRMwip_list_bchistory",
  title: "BC History",
  modal: true,
  closeAction: "hide",
  centered: true,
  autoScroll: true,
  controller: "Cinv_wip_control",
  //y: -110,
  width: mainpanel.getWidth() * 0.98,
  height: mainpanel.getHeight() * 0.98,
  layout: { type: "border", pack: "start", align: "stretch" },
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
  bodyBorder: false,
  items: [
    {
      title: "BC List",
      region: "west",
      floatable: false,
      flex: 1,
      layout: { type: "vbox", pack: "start", align: "stretch" },
      items: [
        {
          xtype: "grid",
          pid: "GRIDFRMwip_list_bchistory_header",
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
            pageSize: 20,
            fields: [
              { name: "MAPP_PARTNO", type: "string" },
              { name: "PART_NAME", type: "string" },
              { name: "PART_GROUP", type: "string" },
              { name: "PART_CATEGORY", type: "string" },
              { name: "IN_QTY", type: "float" },
              { name: "OUT_QTY", type: "float" },
              { name: "STOCK_QTY", type: "float" },
            ],
            proxy: {
              type: "ajax",
              disableCaching: false,
              noCache: false,
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
              actionMethods: { read: "POST" },
              url: vconfig.service_api + "inv_wip_control/inv_wip_controls",
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
                  operation.setParams({
                    method: "bchistory_header",
                  });
                } catch (ex) {
                  COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                }
              },
            },
          },
          columns: [
            //
            { xtype: "rownumberer", width: 50 },
            { header: "INVOICE NO", dataIndex: "INVOICE_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "MAPPING PART", dataIndex: "MAPP_PARTNO", sortable: true, width: 120, filter: { xtype: "textfield" } },
            { header: "QTY", dataIndex: "WIN_QTY", renderer: "formatAmount", align: "right", sortable: true, width: 80, filter: { xtype: "textfield" } },
            { header: "SOURCE", dataIndex: "SUMBER_DATA", sortable: true, width: 65, filter: { xtype: "textfield" } },
            { header: "BC TYPE", dataIndex: "BC_TYPE", sortable: true, width: 65, filter: { xtype: "textfield" } },
            { header: "NOMOR AJU", dataIndex: "NOMOR_AJU", sortable: true, width: 170, filter: { xtype: "textfield" } },
            { header: "TANGGAL AJU", dataIndex: "TANGGAL_AJU", sortable: true, width: 80, filter: { xtype: "textfield" } },
            { header: "NOMOR DAFTAR", dataIndex: "NOMOR_DAFTAR", sortable: true, width: 80, filter: { xtype: "textfield" } },
            { header: "TANGGAL DAFTAR", dataIndex: "TANGGAL_DAFTAR", sortable: true, width: 80, filter: { xtype: "textfield" } },
          ],
          bbar: {
            xtype: "pagingtoolbar",
            displayInfo: true,
            displayMsg: "Displaying topics {0} - {1} of {2}",
            emptyMsg: "No topics to display",
          },
        },
      ],
    },
    {
      title: "Item/Part Material (BOM)",
      collapsible: false,
      region: "center",
      layout: { type: "vbox", pack: "start", align: "stretch" },
      items: [
        {
          xtype: "grid",
          pid: "GRIDFRMwip_list_bchistory_detail",
          emptyText: "No Matching Records",
          autoScroll: true,
          flex: 2,
          plugins: ["filterfield"],
          viewConfig: {
            enableTextSelection: true,
          },
          features: [
            {
              ftype: "summary",
              dock: "bottom",
            },
          ],
          store: {
            autoLoad: false,
            remoteSort: false,
            remoteFilter: false,
            pageSize: 0,
            fields: [
              //
              { name: "OUT_QTY", type: "float" },
            ],
            proxy: {
              type: "ajax",
              disableCaching: false,
              noCache: false,
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
              actionMethods: { read: "POST" },
              url: vconfig.service_api + "inv_wip_control/inv_wip_controls",
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
                  var GRIDheader = Ext.ComponentQuery.query("FRMwip_list_bchistory grid[pid=GRIDFRMwip_list_bchistory_header]")[0];
                  var vdt = GRIDheader.getSelectionModel().getSelection()[0].data;
                  console.log(vdt);
                  operation.setParams({
                    method: "bchistory_detail",
                    INVOICE_NO: vdt.INVOICE_NO,
                    MAPP_PARTNO: vdt.MAPP_PARTNO,
                  });
                } catch (ex) {
                  COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                }
              },
            },
          },
          columns: [
            { xtype: "rownumberer", width: 50 },
            { header: "KATEGORI", dataIndex: "OUT_KATEGORI", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "ASSY CODE", dataIndex: "ASSY_PRODUCTION", sortable: true, width: 120, filter: { xtype: "textfield" } },
            {
              header: "QTY",
              dataIndex: "OUT_QTY",
              renderer: "formatAmount",
              align: "right",
              sortable: true,
              width: 80,
              filter: { xtype: "textfield" },
              summaryType: "sum",
              summaryRenderer: function (value, summaryData, dataIndex) {
                return '<span style="font-weight:bold;font-size:11px;">' + Ext.util.Format.number(value, "0,000.00/i") + "</span>";
              },
            },
          ],
          bbar: {
            xtype: "pagingtoolbar",
            displayInfo: true,
            displayMsg: "Displaying topics {0} - {1} of {2}",
            emptyMsg: "No topics to display",
          },
        },
      ],
    },
  ],
  listeners: {
    afterlayout: function (cmp) {
      try {
        //
      } catch (ex) {
        COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      }
    },
  },
});
