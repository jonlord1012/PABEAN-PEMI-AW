Ext.define("TDK.INVENTORY.inv_fg_out.dokumen_detail_fgout.wp_fg_out_bahanbaku", {
  extend: "Ext.form.Panel",
  alias: "widget.wp_fg_out_bahanbaku",
  reference: "wp_fg_out_bahanbaku",
  frame: false,
  border: true,
  autoScroll: true,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
  fieldDefaults: {
    labelAlign: "left",
    labelWidth: 90,
    margin: "0 10 5 0",
  },
  items: [
    {
      xtype: "grid",
      pid: "GRIDwp_fg_out_bahanbaku",
      emptyText: "No Matching Records",
      autoScroll: true,
      flex: 1,
      store: {
        autoLoad: true,
        remoteSort: true,
        remoteFilter: true,
        pageSize: 30,
        proxy: {
          type: "ajax",
          disableCaching: false,
          noCache: false,
          headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "inv_fg_out/inv_fg_outs",
          extraParams: {
            method: "read_list_bahanbaku",
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
            try {
              var GRID = Ext.ComponentQuery.query("inv_fg_out GRIDinv_fg_out grid[pid=GRIDinv_fg_out]")[0];
              var vdt = GRID.getSelectionModel().getSelection()[0].data;
              operation.setParams({
                PRODDATE: vdt.PRODDATE,
                CONVEYOR: vdt.CONVEYOR,
                ASSYCODE: vdt.ASSYCODE,
              });
            } catch (ex) {
              COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
            }
          },
        },
      },
      plugins: ["filterfield"],
      viewConfig: {
        enableTextSelection: true,
      },
      columns: [
        { xtype: "rownumberer", width: 40 },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "PROD_DATE", dataIndex: "PROD_DATE" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "ASSY_CODE", dataIndex: "ASSY_CODE" },
        { sortable: true, width: 200, filter: { xtype: "textfield" }, header: "PART_NO", dataIndex: "PART_NO" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "QTY", dataIndex: "QTY", renderer: "formatqty", align: "right" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "QTY_NAMEPLATE", dataIndex: "QTY_NAMEPLATE", renderer: "formatqty", align: "right" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "QTY_BOM", dataIndex: "QTY_BOM", renderer: "formatqty", align: "right" },

        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "INVOICE_NO", dataIndex: "INVOICE_NO" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "BC_TYPE", dataIndex: "BC_TYPE" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NOMOR_AJU", dataIndex: "NOMOR_AJU" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TANGGAL_AJU", dataIndex: "TANGGAL_AJU" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NOMOR_DAFTAR", dataIndex: "NOMOR_DAFTAR" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TANGGAL_DAFTAR", dataIndex: "TANGGAL_DAFTAR" },
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
      items: ["-"],
      // other options....
    },
  ],
});
