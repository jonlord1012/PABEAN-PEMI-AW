Ext.define("TDK.INVENTORY_AW.inv_wip_in_aw.GRIDinv_wip_in_aw", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDinv_wip_in_aw",
  reference: "GRIDinv_wip_in_aw",
  frame: false,
  border: false,
  autoScroll: true,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
  items: [
    {
      xtype: "grid",
      pid: "GRIDinv_wip_in_aw",
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
          url: vconfig.service_api + "inv_wip_in_aw/inv_wip_in_aws",
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
        /*{
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
        },*/
        {
          text: "DOKUMEN",
          columns: [
            
            { header: "IN NO", dataIndex: "WIN_NO", sortable: true, width: 200, filter: { xtype: "textfield" } },
            { header: "IN DATE", dataIndex: "WIN_DATE", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "PART NO", dataIndex: "PART_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "BARCODE", dataIndex: "BARCODE", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "PART NAME", dataIndex: "PART_NAME", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "QTY", dataIndex: "QTY", sortable: true, align: "right", renderer: "formatqty", width: 100, filter: { xtype: "textfield" } },
            { header: "INVOICE", dataIndex: "INVOICE_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "CREATE USER", dataIndex: "CREATE_USER", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "CREATE DATE", dataIndex: "CREATE_DATE", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "UPDATE DATE", dataIndex: "UPDATE_USER", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "UPDATE DATE", dataIndex: "UPDATE_DATE", sortable: true, width: 100, filter: { xtype: "textfield" } },
            
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
        afterrender: "GRIDinv_wip_in_aw_load",
      },
    },
  ],
});
