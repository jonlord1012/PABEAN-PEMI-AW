var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.INVENTORY.inv_fg_control.FRMifc_stock_productpending", {
  extend: "Ext.window.Window",
  alias: "widget.FRMifc_stock_productpending",
  reference: "FRMifc_stock_productpending",
  title: "Stock Product Pending",
  modal: true,
  closeAction: "hide",
  centered: true,
  autoScroll: true,
  controller: "Cinv_fg_control",
  //y: -110,
  width: mainpanel.getWidth() * 0.98,
  height: mainpanel.getHeight() * 0.98,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
  bodyBorder: false,
  items: [
    {
      xtype: "grid",
      pid: "GRIDstock_productpending",
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
          url: vconfig.service_api + "inv_fg_control/inv_fg_controls",
          extraParams: {
            method: "read_stock_productpending",
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
        {
          text: "ITEM/PART",
          columns: [
            { xtype: "rownumberer", width: 50 },
            { header: "RECEIPT DATE", dataIndex: "RECEIPT_DATE", sortable: true, width: 100, filter: { xtype: "textfield" }, filter: { xtype: "textfield" } },
            { header: "INVOICE NO", dataIndex: "INVOICE_NO", sortable: true, width: 80, filter: { xtype: "textfield" }, filter: { xtype: "textfield" } },
            { header: "PART NO", dataIndex: "MAPP_PARTNO", sortable: true, width: 80, filter: { xtype: "textfield" }, filter: { xtype: "textfield" } },
            { header: "RECEIPT", dataIndex: "RECEIPT_QTY", renderer: "formatAmount", align: "right", sortable: true, width: 80 },
          ],
        },
        {
          text: "PROCESS OUT",
          columns: [
            { header: "TO PROD", dataIndex: "TO_PROD", renderer: "formatAmount", align: "right", sortable: true, width: 80 },
            { header: "SELLING", dataIndex: "MEMO_SELLING", renderer: "formatAmount", align: "right", sortable: true, width: 80 },
            { header: "SCRAP", dataIndex: "MEMO_SCRAP", renderer: "formatAmount", align: "right", sortable: true, width: 80 },
            { header: "TOTAL", dataIndex: "OUT_QTY", renderer: "formatAmount", align: "right", sortable: true, width: 80 },
          ],
        },
        {
          text: "DOCUMENT",
          columns: [
            { header: "SUMBER DATA", dataIndex: "SUMBER_DATA", sortable: true, width: 80, filter: { xtype: "textfield" }, filter: { xtype: "textfield" } },
            { header: "BC TYPE", dataIndex: "BC_TYPE", sortable: true, width: 80, filter: { xtype: "textfield" }, filter: { xtype: "textfield" } },
            { header: "NO AJU", dataIndex: "NOMOR_AJU", sortable: true, width: 170, filter: { xtype: "textfield" }, filter: { xtype: "textfield" } },
            { header: "TGL AJU", dataIndex: "TANGGAL_AJU", sortable: true, width: 80, filter: { xtype: "textfield" }, filter: { xtype: "textfield" } },
            { header: "NO DAFTAR", dataIndex: "NOMOR_DAFTAR", sortable: true, width: 80, filter: { xtype: "textfield" }, filter: { xtype: "textfield" } },
            { header: "TGL DAFTAR", dataIndex: "TANGGAL_DAFTAR", sortable: true, width: 80, filter: { xtype: "textfield" }, filter: { xtype: "textfield" } },
          ],
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
  dockedItems: [
    {
      xtype: "toolbar",
      height: 30,
      dock: "top",
      items: [
        //
        { xtype: "tbspacer", width: 10, text: "-" },
        { xtype: "button", text: "Refresh", pid: "FRMifc_stock_productpending_btrefresh", icon: vconfig.getstyle + "icon/update.ico", tooltip: "Refresh Data" },
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
