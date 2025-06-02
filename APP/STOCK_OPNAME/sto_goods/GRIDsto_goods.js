Ext.define("NJC.STOCK_OPNAME.sto_goods.GRIDsto_goods", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDsto_goods",
  reference: "GRIDsto_goods",
  frame: false,
  border: false,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
  items: [
    {
      xtype: "grid",
      pid: "GRIDsto_goods",
      emptyText: "No Matching Records",
      autoScroll: true,
      flex: 1,
      plugins: ["filterfield", "gridexporter"],
      pageSize: 20,
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
              handler: "btdetail_frmsto_goods",
              tooltip: "Detail Data",
            },
          ],
        },
        {
          header: "ARTICLE CODE", dataIndex: "ARTICLE_CODE", sortable: true, flex: 1, filter: { xtype: "textfield" },
          exportStyle: {
            type: 'html',
            alignment: {
              horizontal: 'Left'
            }
          },
        },
        {
          header: "PART_NAME", dataIndex: "PART_NAME", sortable: true, flex: 1, width: 250, filter: { xtype: "textfield" },
          exportStyle: {
            type: 'html',
            alignment: {
              horizontal: 'Left'
            }
          },
        },
        {
          header: "PART_MPQ", dataIndex: "PART_MPQ", sortable: true, width: 150, filter: { xtype: "textfield" },
          exportStyle: {
            type: 'html',
            alignment: {
              horizontal: 'Right'
            }
          },
        },
        {
          header: "PART_UOM", dataIndex: "PART_UOM", sortable: true, width: 150, filter: { xtype: "textfield" },
          exportStyle: {
            type: 'html',
            alignment: {
              horizontal: 'Center'
            }
          },
        },
        {
          header: "QTY", dataIndex: "QTY_STO", sortable: true, flex: 1, filter: { xtype: "textfield" },
          exportStyle: {
            type: 'html',
            alignment: {
              horizontal: 'Right'
            }
          },
        },
        {
          header: "SALDO AKTUAL", dataIndex: "CURRENT_STOCK", sortable: true, flex: 1, filter: { xtype: "textfield" },
          exportStyle: {
            type: 'html',
            alignment: {
              horizontal: 'Right'
            }
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
  dockedItems: [
    {
      xtype: "toolbar",
      height: 30,
      dock: "top",
      items: [
        { xtype: "button", text: "New Input", pid: "btnew", icon: vconfig.getstyle + "icon/add.png", tooltip: "New" },
        "->",
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
    afterrender: "GRIDsto_goods_load",
  },
});
