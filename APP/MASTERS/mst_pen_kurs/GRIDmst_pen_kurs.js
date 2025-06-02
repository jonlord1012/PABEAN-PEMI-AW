Ext.define("TDK.MASTERS.mst_pen_kurs.GRIDmst_pen_kurs", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDmst_pen_kurs",
  reference: "GRIDmst_pen_kurs",
  frame: false,
  border: false,
  autoScroll: true,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
  items: [
    {
      xtype: "grid",
      pid: "GRIDmst_pen_kurs",
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
              tooltip: "Detail Kurs",
            },
          ],
        },
        { hidden: true, header: "ID", dataIndex: "ID", sortable: true, width: 200, filter: { xtype: "textfield" } },
        { header: "KODE VALUTA", dataIndex: "KODE_VALUTA", sortable: true, width: 80, filter: { xtype: "textfield" } },
        { header: "URAIAN VALUTA", dataIndex: "URAIAN_VALUTA", sortable: true, width: 250, filter: { xtype: "textfield" } },
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
    afterrender: "GRIDmst_pen_kurs_load",
  },
});
