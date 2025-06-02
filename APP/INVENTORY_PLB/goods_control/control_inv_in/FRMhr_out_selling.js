Ext.define("TDK.INVENTORY_PLB.inv_material_control_aw.control_inv_in.FRMhr_out_selling", {
  extend: "Ext.form.Panel",
  alias: "widget.FRMhr_out_selling",
  reference: "FRMhr_out_selling",
  frame: false,
  border: true,
  autoScroll: false,
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
      pid: "GRIDhr_out_selling",
      emptyText: "No Matching Records",
      autoScroll: true,
      flex: 1,
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
          url: vconfig.service_api + "inv_material_control_aw/inv_material_control_aws",
          extraParams: {
            method: "read_hr_out_selling",
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
              var GRID = Ext.ComponentQuery.query("inv_material_control_aw GRIDinv_material_control_aw grid[pid=GRIDinv_material_control_aw]")[0];
              var vdt = GRID.getSelectionModel().getSelection()[0].data;
              operation.setParams({
                PART_NO: vdt.PART_NO,
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
        { xtype: "rownumberer", width: 50 },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "PART_NO", dataIndex: "PART_NO", filter: { xtype: "textfield" } },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "DATE", dataIndex: "PART_NO", filter: { xtype: "textfield" } },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "OUT TYPE", dataIndex: "PART_NO", filter: { xtype: "textfield" } },
        { sortable: true, width: 200, filter: { xtype: "textfield" }, header: "REMARK", dataIndex: "PART_NO", filter: { xtype: "textfield" } },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "QTY", align: "right", renderer: "formatqty", dataIndex: "QTY", filter: { xtype: "textfield" } },
        { sortable: true, width: 65, filter: { xtype: "textfield" }, header: "BC TYPE", dataIndex: "BC_TYPE", filter: { xtype: "textfield" } },
        { sortable: true, width: 200, filter: { xtype: "textfield" }, header: "NOMOR AJU", dataIndex: "NOMOR_AJU", filter: { xtype: "textfield" } },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "DATE", dataIndex: "TANGGAL_AJU", filter: { xtype: "textfield" } },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NOMOR DAFTAR", dataIndex: "NOMOR_DAFTAR", filter: { xtype: "textfield" } },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "DATE", dataIndex: "TANGGAL_DAFTAR", filter: { xtype: "textfield" } },
      ],
      bbar: {
        xtype: "pagingtoolbar",
        displayInfo: true,
        displayMsg: "Total Data {2}",
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
        {
          xtype: "button",
          pid: "btrefresh",
          text: "Refresh",
          icon: vconfig.getstyle + "icon/update.ico",
          tooltip: "Refresh Data",
          handler: function () {
            var GRID = Ext.ComponentQuery.query("FRMhr_out_selling grid[pid=GRIDhr_out_selling]")[0];
            GRID.getStore().load();
          },
        },
      ],
      // other options....
    },
  ],
});
