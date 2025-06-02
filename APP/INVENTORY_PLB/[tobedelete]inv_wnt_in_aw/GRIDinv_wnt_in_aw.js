Ext.define("TDK.INVENTORY_AW.inv_wnt_in_aw.GRIDinv_wnt_in_aw", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDinv_wnt_in_aw",
  reference: "GRIDinv_wnt_in_aw",
  frame: false,
  border: false,
  autoScroll: true,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
  items: [
    {
      xtype: "grid",
      pid: "GRIDinv_wnt_in_aw",
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
          headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "inv_wnt_in_aw/inv_wnt_in_aws",
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
        {
          text: "DOKUMEN",
          columns: [
            { hidden: true, header: "ID", dataIndex: "ID", sortable: true, width: 200, filter: { xtype: "textfield" } },
            { header: "RECEIPT NO", dataIndex: "RECEIPT_NO", sortable: true, width: 170, filter: { xtype: "textfield" } },
            { header: "RECEIPT DATE", dataIndex: "RECEIPT_DATE", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "INVOICE", dataIndex: "INVOICE_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "PART NO", dataIndex: "PART_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "QTY", dataIndex: "RECEIPT_QTY", sortable: true, align: "right", renderer: "formatqty", width: 100, filter: { xtype: "textfield" } },
            { header: "BC TYPE", dataIndex: "BC_TYPE", sortable: true, width: 65, filter: { xtype: "textfield" } },
            { header: "NOMOR AJU", dataIndex: "NOMOR_AJU", sortable: true, width: 170, filter: { xtype: "textfield" } },
            { header: "TANGGAL AJU", dataIndex: "TANGGAL_AJU", sortable: true, width: 80, filter: { xtype: "textfield" } },
            { header: "NOMOR DAFTAR", dataIndex: "NOMOR_DAFTAR", sortable: true, width: 80, filter: { xtype: "textfield" } },
            { header: "TANGGAL DAFTAR", dataIndex: "TANGGAL_DAFTAR", sortable: true, width: 80, filter: { xtype: "textfield" } },
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
        afterrender: "GRIDinv_wnt_in_aw_load",
      },
    },
  ],
});
