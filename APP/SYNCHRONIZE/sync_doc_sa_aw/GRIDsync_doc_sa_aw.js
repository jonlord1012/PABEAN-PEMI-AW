Ext.define("TDK.SYNCHRONIZE.sync_doc_sa_aw.GRIDsync_doc_sa_aw", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDsync_doc_sa_aw",
  reference: "GRIDsync_doc_sa_aw",
  requires: ["Ext.grid.feature.Grouping"],
  frame: false,
  border: false,
  autoScroll: true,
  layout: { type: "hbox", pack: "start", align: "stretch" },
  requires: [],
  items: [
    {
      xtype: "grid",
      pid: "GRIDsync_doc_sa_aw",
      emptyText: "No Matching Records",
      autoScroll: true,
      flex: 1,
      store: {
        autoLoad: true,
        remoteSort: true,
        remoteFilter: true,
        pageSize: 15,
        proxy: {
          type: "ajax",
          disableCaching: false,
          noCache: false,
          headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "sync_doc_sa_aw/sync_doc_sa_aws",
          extraParams: {
            method: "read_data",
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
              var CBO_FILTERKEY = Ext.ComponentQuery.query("sync_doc_sa_aw combobox[name=CBO_FILTERKEY]")[0];
              operation.setParams({
                cbo_filterkey: CBO_FILTERKEY.getValue(),
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
        { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "SA NO", dataIndex: "SA_NO" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "SA DATE", dataIndex: "SA_DATE" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "INVOICE", dataIndex: "INVOICE_NO" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "INV DATE", dataIndex: "INVOICE_DATE" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "CONTAINER", dataIndex: "CONTAINER_NO" },
        { sortable: true, width: 65, filter: { xtype: "textfield" }, header: "DR NO", dataIndex: "DRNO" },
        { sortable: true, width: 65, filter: { xtype: "textfield" }, header: "SHIPPING", dataIndex: "SHIPPING_TYPE" },
        { sortable: true, width: 100, header: "SHIP NAME", dataIndex: "SHIPPING_NAME" },
        { sortable: true, width: 60, filter: { xtype: "textfield" }, header: "BC TYPE", dataIndex: "BC_TYPE" },
        { sortable: true, width: 200, filter: { xtype: "textfield" }, header: "NOMOR AJU", dataIndex: "NOMOR_AJU" },
        { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "TGL AJU", dataIndex: "TANGGAL_AJU" },
        { sortable: true, width: 70, filter: { xtype: "textfield" }, header: "NOMOR DAFTAR", dataIndex: "NOMOR_DAFTAR" },
        { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "TGL DAFTAR", dataIndex: "TANGGAL_DAFTAR" },
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
