Ext.define("NJC.INVENTORY_PLB.goods_delivery.GRIDgoods_delivery", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDgoods_delivery",
  reference: "GRIDgoods_delivery",
  frame: false,
  border: false,
  autoScroll: true,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
  items: [
    {
      xtype: "grid",
      pid: "GRIDgoods_delivery",
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
        proxy: {
          type: "ajax",
          disableCaching: false,
          noCache: false,
          headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "goods_delivery/goods_deliverys",
          extraParams: {
            method: "read_in",
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
        {
          text: "<b>ACTION</b>",
          columns: [
            {
              xtype: "actioncolumn",
              pid: "btapprove",
              width: 35,
              align: "center",
              menuDisabled: true,
              sortable: false,
              items: [
                {
                  icon: vconfig.getstyle + "icon/approved.png",
                  handler: "btapprove_click",
                  tooltip: "Approve Dokumen",
                },
              ],
            }, {
              xtype: "actioncolumn",
              width: 35,
              align: "center",
              menuDisabled: true,
              sortable: false,
              items: [
                {
                  icon: vconfig.getstyle + "icon/folder.gif",
                  handler: "load_frmdelivery_details",
                  tooltip: "Detail Dokumen",
                },
              ],
            },
          ]
        },
        {
          text: "<b>STATUS</b>",
          columns: [
            { dataIndex: "STATUS", sortable: true, width: 100, filter: { xtype: "textfield" } },
          ]

        },
        {
          text: "<b>INTERNAL</b>",
          columns: [
            { header: "CLIENT", dataIndex: "CLIENT", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "INVOICE_NO", dataIndex: "INVOICE_NO", sortable: true, width: 120, filter: { xtype: "textfield" } },
            { header: "INVOICE_DATE", dataIndex: "INVOICE_DATE", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "TENANT INVOICE NO", dataIndex: "TENANT_INVOICE_NO", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "SURAT JALAN", dataIndex: "SURAT_JALAN", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "TGL SURAT JALAN", dataIndex: "TANGGAL_SURAT_JALAN", sortable: true, width: 120, filter: { xtype: "textfield" } },
          ],
        },
        {
          text: "",
          width: 10,
          sortable: false,
        },
        {
          text: "<b>PORTAL</b>",
          columns: [
            { header: "NOMOR_AJU", dataIndex: "OUT_NOMOR_AJU", sortable: true, width: 200, filter: { xtype: "textfield" } },
            { header: "TGL AJU", dataIndex: "OUT_TANGGAL_AJU", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "NO DAFTAR", dataIndex: "OUT_NOMOR_DAFTAR", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "TGL DAFTAR", dataIndex: "OUT_TANGGAL_DAFTAR", sortable: true, width: 100, filter: { xtype: "textfield" } },
          ],
        },
      ],
      bbar: {
        xtype: "pagingtoolbar",
        displayInfo: true,
        displayMsg: "Displaying topics {0} - {1} of {2}",
        emptyMsg: "No topics to display",
      },
      listeners: {
        // afterrender: "GRIDgoods_delivery_load",
      },
    },
  ],
});
