Ext.define("TDK.INVENTORY.inv_fg_in.dokumen_detail_fgin.dokumen_detail_fgin_data", {
  extend: "Ext.form.Panel",
  alias: "widget.dokumen_detail_fgin_data",
  reference: "dokumen_detail_fgin_data",
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
      pid: "GRIDdokumen_detail_fgin_data",
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
          url: vconfig.service_api + "inv_fg_in/inv_fg_ins",
          extraParams: {
            method: "read_fgin_data",
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
              var GRID = Ext.ComponentQuery.query("inv_fg_in GRIDinv_fg_in grid[pid=GRIDinv_fg_in]")[0];
              /*var vdt = GRID.getSelectionModel().getSelection()[0].data;
              operation.setParams({
                INVOICE_NO: vdt.INVOICE_NO,
                SA_NO: vdt.SA_NO,
                CONTAINER_NO: vdt.CONTAINER_NO,
              });*/
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
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "CustCode", dataIndex: "CustCode" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "Period", dataIndex: "Period" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "ETDPEMI", dataIndex: "ETDPEMI" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "DRNo", dataIndex: "DRNo" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "PalletNo", dataIndex: "PalletNo" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "AssyNo", dataIndex: "AssyNo" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "AssyCode", dataIndex: "AssyCode" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "LoadingLine", dataIndex: "LoadingLine" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "LineNo", dataIndex: "LineNo" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "PolyQty", dataIndex: "PolyQty" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "Qty", dataIndex: "Qty" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TotalPoly", dataIndex: "TotalPoly" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "BoxType", dataIndex: "BoxType" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "FromPolyNo", dataIndex: "FromPolyNo" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "ToPolyNo", dataIndex: "ToPolyNo" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "PolyNo", dataIndex: "PolyNo" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "Price", dataIndex: "Price" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NetKgs", dataIndex: "NetKgs" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "GrossKgs", dataIndex: "GrossKgs" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "Volume", dataIndex: "Volume" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "Cumm", dataIndex: "Cumm" },
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
