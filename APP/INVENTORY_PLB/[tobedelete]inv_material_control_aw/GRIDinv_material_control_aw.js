Ext.define("TDK.INVENTORY_PLB.inv_material_control_aw.GRIDinv_material_control_aw", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDinv_material_control_aw",
  reference: "GRIDinv_material_control_aw",
  frame: false,
  border: false,
  autoScroll: true,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
  items: [
    {
      xtype: "grid",
      pid: "GRIDinv_material_control_aw",
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
        pageSize: 17,
        proxy: {
          type: "ajax",
          disableCaching: false,
          noCache: false,
          headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "inv_material_control_aw/inv_material_control_aws",
          extraParams: {
            method: "read_group",
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
        { header: "PART NO", dataIndex: "PART_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "MAPP_PART", dataIndex: "MAPP_PARTNO", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "NAME", dataIndex: "PART_NAME", sortable: true, width: 200, filter: { xtype: "textfield" } },
        { header: "DESCRIPTION", dataIndex: "PART_DESCRIPTION", sortable: true, width: 200, filter: { xtype: "textfield" } },
        { header: "GROUP", dataIndex: "PART_GROUP", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "CATEGORY", dataIndex: "PART_CATEGORY", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "TYPE", dataIndex: "PART_TYPE", sortable: true, width: 100, filter: { xtype: "textfield" } },
        {
          text: "STOCK",
          columns: [
            { header: "IN", dataIndex: "IN_QTY", renderer: "formatAmount", align: "right", sortable: true, width: 120 },
            { header: "OUT", dataIndex: "OUT_QTY", renderer: "formatAmount", align: "right", sortable: true, width: 120 },
            { header: "STOCK", dataIndex: "STOCK_QTY", renderer: "formatAmount", align: "right", sortable: true, width: 120 },
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
        "-",
        //menu atas
      ],
      // other options....
    },
  ],
});
