Ext.define("TDK.INVENTORY.inv_fg_return.GRIDinv_fg_return", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDinv_fg_return",
  reference: "GRIDinv_fg_return",
  frame: false,
  border: false,
  autoScroll: true,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
  items: [
    {
      xtype: "grid",
      pid: "GRIDinv_fg_return",
      emptyText: "No Matching Records",
      autoScroll: true,
      flex: 1,
      plugins: ["filterfield"],
      viewConfig: {
        enableTextSelection: true,
      },
      store: {
        fields: [
          { name: "ASSYNO", type: "string" },
          { name: "ASSYCODE", type: "string" },
          { name: "CARLINE", type: "string" },
          { name: "QTY", type: "float" },
        ],
        autoLoad: true,
        remoteSort: true,
        remoteFilter: true,
        pageSize: 17,
        proxy: {
          type: "ajax",
          disableCaching: false,
          noCache: false,
          headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "inv_fg_return/inv_fg_returns",
          extraParams: {
            method: "read_in_fg",
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
            //
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
        { header: "ASSY NO", dataIndex: "ASSYNO", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "ASSY CODE", dataIndex: "ASSYCODE", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "CARLINE", dataIndex: "CARLINE", sortable: true, width: 200, filter: { xtype: "textfield" } },
        { header: "POLY NO", dataIndex: "POLYNO", sortable: true, width: 200, filter: { xtype: "textfield" } },
        { header: "PALLET NO", dataIndex: "PALLETNO", sortable: true, width: 200, filter: { xtype: "textfield" } },
        { header: "QTY", dataIndex: "QTY", renderer: "formatAmount", align: "right", sortable: true, width: 80, filter: { xtype: "textfield" } },
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
