Ext.define("TDK.REPORTS.ext_rpt_item_wip.GRIDext_rpt_item_wip", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDext_rpt_item_wip",
  reference: "GRIDext_rpt_item_wip",
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
      pid: "GRIDext_rpt_item_wip",
      emptyText: "No Matching Records",
      plugins: ["filterfield", "gridexporter"],
      autoScroll: true,
      flex: 1,
      store: {
        autoLoad: true,
        remoteSort: false,
        remoteFilter: false,
        pageSize: 0,
        proxy: {
          type: "ajax",
          disableCaching: false,
          noCache: false,
          headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "ext_rpt_item_wip/ext_rpt_item_wips",
          extraParams: {
            method: "read_to_grid",
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
              var VIDCOMPANY = Ext.ComponentQuery.query("ext_rpt_item_wip combobox[name=CBO_COMPANY]")[0];
              var VFROMDATE = Ext.ComponentQuery.query("ext_rpt_item_wip datefield[name=tfromdate]")[0];
              var VTODATE = Ext.ComponentQuery.query("ext_rpt_item_wip datefield[name=ttodate]")[0];

              operation.setParams({
                VCBO_COMPANY: VIDCOMPANY.getValue(),
                VFROMDATE: moment(VFROMDATE.getValue()).format("YYYY-MM-DD"),
                VTODATE: moment(VTODATE.getValue()).format("YYYY-MM-DD"),
              });
            } catch (ex) {
              COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
            }
          },
        },
      },
      viewConfig: {
        enableTextSelection: true,
      },
      columns: [
        { xtype: "rownumberer", width: 40 },
        { sortable: true, width: 120, filter: { xtype: "textfield" }, header: "KODE BARANG ", dataIndex: "KODE_BARANG" },
        { sortable: true, width: 200, filter: { xtype: "textfield" }, header: "NAMA BARANG ", dataIndex: "URAIAN_BARANG" },
        { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "SAT ", dataIndex: "SAT" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "JML", dataIndex: "JML" },
        { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "KETERANGAN ", dataIndex: "KETERANGAN" },
        { sortable: true, width: 100, hidden: true, filter: { xtype: "textfield" }, header: "ID", dataIndex: "ID" },
        { sortable: true, width: 100, hidden: true,  filter: { xtype: "textfield" }, header: "ID_HEADER ", dataIndex: "ID_HEADER " },
        { sortable: true, width: 100, hidden: true,  filter: { xtype: "textfield" }, header: "ID_HEADER_ORI", dataIndex: "ID_HEADER_ORI" },
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
