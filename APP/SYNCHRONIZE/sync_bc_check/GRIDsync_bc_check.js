Ext.define("TDK.SYNCHRONIZE.sync_bc_check.GRIDsync_bc_check", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDsync_bc_check",
  reference: "GRIDsync_bc_check",
  frame: false,
  border: false,
  autoScroll: true,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  items: [
    {
      xtype: "grid",
      pid: "GRIDsync_bc_check",
      emptyText: "No Matching Records",
      autoScroll: true,
      flex: 1,
      plugins: ["filterfield"],
      viewConfig: {
        enableTextSelection: true,
        getRowClass: function (record) {
          return record.get("NOMOR_AJU") === null || record.get("NOMOR_DAFTAR") === null ? "gridrow-red" : "";
        },
      },
      columns: [
        { xtype: "rownumberer", width: 50, locked: true },
        {
          xtype: "actioncolumn",
          width: 35,
          align: "center",
          menuDisabled: true,
          sortable: false,
          locked: true,
          items: [
            {
              icon: vconfig.getstyle + "icon/grid.png",
              handler: "btdetail_rows_click",
              tooltip: "Detail Dokumen",
            },
          ],
        },
        { sortable: true, width: 130, filter: { xtype: "textfield" }, header: "TANGGAL STATUS", dataIndex: "WAKTU_STATUS", locked: true },
        { sortable: true, width: 50, filter: { xtype: "textfield" }, header: "KODE", dataIndex: "KODE_AFTER", locked: true },
        { sortable: true, width: 200, filter: { xtype: "textfield" }, header: "AFTER", dataIndex: "URAIAN_AFTER", locked: true },
        { sortable: true, width: 50, filter: { xtype: "textfield" }, header: "KODE", dataIndex: "KODE_BEFORE" },
        { sortable: true, width: 200, filter: { xtype: "textfield" }, header: "BEFORE", dataIndex: "URAIAN_BEFORE" },
        { sortable: true, width: 200, filter: { xtype: "textfield" }, header: "NO AJU", dataIndex: "NOMOR_AJU" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TANGGAL AJU", dataIndex: "TANGGAL_AJU" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NO DAFTAR", dataIndex: "NOMOR_DAFTAR" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TANGGAL DAFTAR", dataIndex: "TANGGAL_DAFTAR" },
        { sortable: true, width: 65, filter: { xtype: "textfield" }, header: "BC TYPE", dataIndex: "KODE_DOKUMEN_PABEAN" },
        { sortable: true, width: 350, filter: { xtype: "textfield" }, header: "PEMASOK", dataIndex: "NAMA_PEMASOK" },
        { sortable: true, width: 350, filter: { xtype: "textfield" }, header: "PENGIRIM", dataIndex: "NAMA_PENGIRIM" },
      ],
      bbar: {
        xtype: "pagingtoolbar",
        displayInfo: true,
        displayMsg: "Displaying topics {0} - {1} of {2}",
        emptyMsg: "No topics to display",
      },
      listeners: {
        afterrender: "GRIDsync_bc_check_load",
      },
    },
  ],
  dockedItems: [
    {
      xtype: "toolbar",
      height: 30,
      dock: "top",
      items: [{ xtype: "button", text: "Refresh", pid: "btresfresh", icon: vconfig.getstyle + "icon/refresh.gif", tooltip: "Refresh Data" }],
      // other options....
    },
  ],
});
