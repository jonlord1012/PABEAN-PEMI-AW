var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.INVENTORY_PLB.inv_material_control_aw.FRMimc_outstanding_receiving_aw", {
  extend: "Ext.window.Window",
  alias: "widget.FRMimc_outstanding_receiving_aw",
  reference: "FRMimc_outstanding_receiving_aw",
  title: "Outstanding Receiving Dokumen BC",
  modal: true,
  closeAction: "hide",
  centered: true,
  autoScroll: true,
  controller: "Cinv_material_control_aw",
  //y: -110,
  width: mainpanel.getWidth() * 0.98,
  height: mainpanel.getHeight() * 0.98,
  layout: { type: "border", pack: "start", align: "stretch" },
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
  bodyBorder: false,
  items: [
    {
      title: "List Invoice dokumen",
      region: "west",
      floatable: false,
      width: 790,
      layout: { type: "vbox", pack: "start", align: "stretch" },
      items: [
        {
          xtype: "grid",
          pid: "GRIDoutreceiving_header",
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
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
              actionMethods: { read: "POST" },
              url: vconfig.service_api + "inv_material_control_aw/inv_material_control_aws",
              extraParams: {
                method: "read_outreceiving_header",
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
            { header: "INVOICE NO", dataIndex: "INVOICE_NO", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "SOURCE", dataIndex: "MODE_SOURCE", sortable: true, width: 65, filter: { xtype: "textfield" } },
            { header: "BCTYPE", dataIndex: "BC_TYPE", sortable: true, width: 65, filter: { xtype: "textfield" } },
            { header: "NO AJU", dataIndex: "NOMOR_AJU", sortable: true, width: 170, filter: { xtype: "textfield" } },
            { header: "TANGGAL AJU", dataIndex: "TANGGAL_AJU", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "NO DAFTAR", dataIndex: "NOMOR_DAFTAR", sortable: true, width: 80, filter: { xtype: "textfield" } },
            { header: "TANGGAL DAFTAR", dataIndex: "TANGGAL_DAFTAR", sortable: true, width: 100, filter: { xtype: "textfield" } },

            { width: 20 },
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
      title: "Item/Part Material",
      collapsible: false,
      region: "center",
      layout: { type: "vbox", pack: "start", align: "stretch" },
      items: [
        {
          xtype: "grid",
          pid: "GRIDoutreceiving_item",
          emptyText: "No Matching Records",
          autoScroll: true,
          flex: 1,
          plugins: ["filterfield"],
          viewConfig: {
            enableTextSelection: true,
          },
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
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
              actionMethods: { read: "POST" },
              url: vconfig.service_api + "inv_material_control_aw/inv_material_control_aws",
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
                  var GRIDoutreceiving_header = Ext.ComponentQuery.query("FRMimc_outstanding_receiving_aw grid[pid=GRIDoutreceiving_header]")[0];
                  var vdt = GRIDoutreceiving_header.getSelectionModel().getSelection()[0];
                  if (vdt) {
                    operation.setParams({
                      method: "outreceiving_byitem",
                      INVOICE_NO: vdt.data.INVOICE_NO,
                    });
                  }
                } catch (ex) {
                  COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                }
              },
            },
          },
          columns: [
            { xtype: "rownumberer", width: 50 },
            { header: "PART NO", dataIndex: "PART_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "MAP PARTNO", dataIndex: "MAPP_PARTNO", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "PART NAME", dataIndex: "PART_NAME", sortable: true, width: 200, filter: { xtype: "textfield" } },
            { header: "QTY", dataIndex: "QTY", renderer: "formatAmount", align: "right", sortable: true, width: 80 },
            { header: "RECEIPT", dataIndex: "RECEIPT_QTY", renderer: "formatAmount", align: "right", sortable: true, width: 80 },
          ],
        },
      ],
    },
  ],
  dockedItems: [
    {
      xtype: "toolbar",
      height: 30,
      dock: "top",
      items: [
        //
        { xtype: "tbspacer", width: 10, text: "-" },
        { xtype: "button", text: "Refresh", pid: "FRMimc_outstanding_receiving_aw_btrefresh", icon: vconfig.getstyle + "icon/update.ico", tooltip: "Refresh Data" },
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
