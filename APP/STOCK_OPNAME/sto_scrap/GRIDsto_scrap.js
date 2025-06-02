Ext.define("NJC.STOCK_OPNAME.sto_scrap.GRIDsto_scrap", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDsto_scrap",
  reference: "GRIDsto_scrap",
  frame: false,
  border: false,
  autoScroll: true,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
  items: [
  {
    xtype: "grid",
    pid: "GRIDsto_scrap",
    emptyText: "No Matching Records",
    autoScroll: true,
    flex: 1,
    plugins: ["filterfield","gridexporter"],
    store: {
      autoLoad: true,
      remoteSort: true,
      remoteFilter: true,
      pageSize: 100,
      proxy: {
        type: "ajax",
        disableCaching: false,
        noCache: false,
        headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
        actionMethods: { read: "POST" },
        url: vconfig.service_api + "sto_goods/sto_goodss",
        extraParams: {
          method: "read_data",
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
          handler: "btdetail_frmsto_scrap",
          tooltip: "Detail Data",
        },
        ],
      },
      { header: "PART_NO2", dataIndex: "PART_NO2", sortable: true, flex: 1, filter: { xtype: "textfield" } },
      { header: "PART_NO", dataIndex: "PART_NO", sortable: true, flex: 1, filter: { xtype: "textfield" } },
      { header: "PART_NAME", dataIndex: "PART_NAME", sortable: true, flex: 1, filter: { xtype: "textfield" } },
      { header: "PART_MPQ", dataIndex: "PART_MPQ", sortable: true, flex: 1, filter: { xtype: "textfield" } },
      { header: "PART_UOM", dataIndex: "PART_UOM", sortable: true, flex: 1, filter: { xtype: "textfield" } },
      { header: "QTY", dataIndex: "QTY", sortable: true, flex: 1, filter: { xtype: "textfield" } },
      { header: "SALDO AKTUAL", dataIndex: "AKTUAL", sortable: true, flex: 1, filter: { xtype: "textfield" } },
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
      { xtype: "button", text: "New Input", pid: "btnew", icon: vconfig.getstyle + "icon/add.png", tooltip: "New" }
      ,"->",
      {
        xtype: "button",
        text: "Export to",
        menu: {
          defaults: {
            handler: "exportTo",
          },
          items: [
          {
            text: "Excel xlsx",
            icon: vconfig.getstyle + "icon/exceldownload.png",
            cfg: {
              type: "excel07",
              ext: "xlsx",
            },
          },
          ],
        },
      }],
      // other options....
  },
  ],
  listeners: {
    afterrender: "GRIDsto_scrap_load",
  },
});
