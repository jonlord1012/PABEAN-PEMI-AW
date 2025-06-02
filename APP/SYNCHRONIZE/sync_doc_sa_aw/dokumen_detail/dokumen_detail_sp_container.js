Ext.define("TDK.SYNCHRONIZE.sync_doc_sa.dokumen_detail.dokumen_detail_sp_container", {
  extend: "Ext.form.Panel",
  alias: "widget.dokumen_detail_sp_container",
  reference: "dokumen_detail_sp_container",
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
      pid: "GRIDdokumen_detail_sp_container",
      emptyText: "No Matching Records",
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
          url: vconfig.service_api + "sync_doc_sa/sync_doc_sas",
          extraParams: {
            method: "read_sp_container",
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
              var GRID = Ext.ComponentQuery.query("sync_doc_sa GRIDsync_doc_sa grid[pid=GRIDsync_doc_sa]")[0];
              var vdt = GRID.getSelectionModel().getSelection()[0].data;
              operation.setParams({
                INVOICE_NO: vdt.INVOICE_NO,
                SA_NO: vdt.SA_NO,
                CONTAINER_NO: vdt.CONTAINER_NO,
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
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "InvoiceNo", dataIndex: "InvoiceNo" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "ContainerNo", dataIndex: "ContainerNo" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "PalletNo", dataIndex: "PalletNo" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "AssyNo", dataIndex: "AssyNo" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "PolyNo", dataIndex: "PolyNo" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "AssyCode", dataIndex: "AssyCode" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "Carline", dataIndex: "Carline" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "Qty", dataIndex: "Qty" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "Status", dataIndex: "Status" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "RegisterUser", dataIndex: "RegisterUser" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "RegisterDate", dataIndex: "RegisterDate" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "UpdateUser", dataIndex: "UpdateUser" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "UpdateDate", dataIndex: "UpdateDate" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "CustCode", dataIndex: "CustCode" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "Periode", dataIndex: "Periode" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "DRNo", dataIndex: "DRNo" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "ContainerSize", dataIndex: "ContainerSize" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "ETA", dataIndex: "ETA" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "SealNo", dataIndex: "SealNo" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TotalQty", dataIndex: "TotalQty" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TotalBox", dataIndex: "TotalBox" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TotalPallet", dataIndex: "TotalPallet" },
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
