Ext.define("NJC.INVENTORY_PLB.goods_stuffing.GRIDgoods_stuffing", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDgoods_stuffing",
  reference: "GRIDgoods_stuffing",
  frame: false,
  border: false,
  autoScroll: true,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
  items: [
    {
      xtype: "grid",
      pid: "GRIDgoods_stuffing",
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
          url: vconfig.service_api + "goods_stuffing/goods_stuffings",
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
            { header: "DOCUMENT NO", dataIndex: "DOCUMENT_NO", sortable: true, width: 200, filter: { xtype: "textfield" } },
            { header: "DOCUMENT DATE", dataIndex: "DOCUMENT_DATE", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "CUSTOMER", dataIndex: "CODE_CUSTOMER", sortable: true, width: 180, filter: { xtype: "textfield" } },
            { header: "STATUS", dataIndex: "STATUS", sortable: true, width: 100, filter: { xtype: "textfield" } },
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
        afterrender: "GRIDgoods_stuffing_load",
      },
    },
  ],
});
