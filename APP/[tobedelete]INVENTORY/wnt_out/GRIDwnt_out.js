Ext.define("TDK.INVENTORY.wnt_out.GRIDwnt_out", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDwnt_out",
  reference: "GRIDwnt_out",
  frame: false,
  border: false,
  autoScroll: true,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
  items: [
    {
      xtype: "grid",
      pid: "GRIDwnt_out",
      emptyText: "No Matching Records",
      autoScroll: true,
      flex: 1,
      plugins: ["filterfield"],
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
              tooltip: "Detail Dokumen",
            },
          ],
        },
        { header: "STATUS", dataIndex: "URAIAN_STATUS", sortable: true, width: 65, filter: { xtype: "textfield" } },
        { header: "DT FROM", dataIndex: "mode_source_name", sortable: true, width: 65, filter: { xtype: "textfield" } },
        { header: "CAR (NO AJU)", dataIndex: "NOMOR_AJU", sortable: true, width: 180, filter: { xtype: "textfield" } },
        { header: "AJU DATE", dataIndex: "TANGGAL_AJU", sortable: true, width: 120, filter: { xtype: "textfield" } },
        { header: "PEMASOK", dataIndex: "NAMA_PEMASOK", sortable: true, width: 300, filter: { xtype: "textfield" } },
        { header: "CIF", dataIndex: "CIF", renderer: "formatAmount", align: "right", sortable: true, width: 120, filter: { xtype: "textfield" } },
        { header: "CIF RP", dataIndex: "CIF_RUPIAH", renderer: "formatAmount", align: "right", sortable: true, width: 120, filter: { xtype: "textfield" } },
        { header: "FOB", dataIndex: "FOB", renderer: "formatAmount", align: "right", sortable: true, width: 120, filter: { xtype: "textfield" } },
        { header: "HARGA_INVOICE", dataIndex: "HARGA_INVOICE", renderer: "formatAmount", align: "right", sortable: true, width: 120, filter: { xtype: "textfield" } },
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
      items: [{ xtype: "button", text: "New Input", pid: "btnew", icon: vconfig.getstyle + "icon/add.png", tooltip: "New" }],
      // other options....
    },
  ],
  listeners: {
    afterrender: "GRIDwnt_out_load",
  },
});
