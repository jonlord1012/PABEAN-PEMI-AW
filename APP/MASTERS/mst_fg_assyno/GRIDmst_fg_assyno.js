Ext.define("TDK.MASTERS.mst_fg_assyno.GRIDmst_fg_assyno", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDmst_fg_assyno",
  reference: "GRIDmst_fg_assyno",
  frame: false,
  border: false,
  autoScroll: true,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
  items: [
    {
      xtype: "grid",
      pid: "GRIDmst_fg_assyno",
      emptyText: "No Matching Records",
      autoScroll: true,
      flex: 1,
      plugins: ["filterfield", "gridexporter"],
      store: "",
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
              tooltip: "Detail AssyNo",
            },
          ],
        },
        { hidden: true, header: "ID", dataIndex: "ID", sortable: true, width: 200, filter: { xtype: "textfield" } },
        { header: "ASSY NO", dataIndex: "ASSY_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "ASSY NAME", dataIndex: "ASSY_NAME", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "ASSY CODE", dataIndex: "ASSY_CODE", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "CARLINE", dataIndex: "CARLINE", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "FAMILY CODE", dataIndex: "FAMILY_CODE", sortable: true, width: 150, filter: { xtype: "textfield" } },
        { header: "DESTINATION CODE", dataIndex: "DESTINATION_CODE", sortable: true, width: 150, filter: { xtype: "textfield" } },
        { header: "CREATE USER", dataIndex: "CREATE_USER", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "CREATE DATE", dataIndex: "CREATE_DATE", sortable: true, width: 200, filter: { xtype: "textfield" } },
        { header: "UPDATE USER", dataIndex: "UPDATE_USER", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "UPDATE DATE", dataIndex: "UPDATE_DATE", sortable: true, width: 200, filter: { xtype: "textfield" } },
        
      ],
      bbar: {
        xtype: "pagingtoolbar",
        displayInfo: true,
        displayMsg: "Displaying topics {0} - {1} of {2}",
        emptyMsg: "No topics to display",
      },
    },
  ],
  listeners: {
    afterrender: "GRIDmst_fg_assyno_load",
  },
});
