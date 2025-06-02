Ext.define("TDK.SYNCHRONIZE.sync_doc_aw.GRIDsync_doc_aw", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDsync_doc_aw",
  reference: "GRIDsync_doc_aw",
  requires: ["Ext.grid.feature.Grouping"],
  frame: false,
  border: false,
  autoScroll: true,
  layout: { type: "hbox", pack: "start", align: "stretch" },
  requires: [],
  items: [
    {
      xtype: "grid",
      pid: "GRIDsync_doc_aw",
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
          url: vconfig.service_api + "sync_doc_aw/sync_doc_aws",
          extraParams: {
            method: "read_data",
            module: "aw",
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
              var CBO_FILTERKEY = Ext.ComponentQuery.query("sync_doc_aw combobox[name=CBO_FILTERKEY]")[0];
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
        { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "VENDOR", dataIndex: "VENDOR" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "INVOICE_NO", dataIndex: "INVOICE_NO" },
        { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "INV DATE", dataIndex: "INVOICE_DATE" },
        { sortable: true, width: 60, filter: { xtype: "textfield" }, header: "BC TYPE", dataIndex: "BC_TYPE" },
        { sortable: true, width: 200, filter: { xtype: "textfield" }, header: "NOMOR AJU", dataIndex: "NOMOR_AJU" },
        { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "TGL AJU", dataIndex: "TANGGAL_AJU" },
        { sortable: true, width: 70, filter: { xtype: "textfield" }, header: "NOMOR DAFTAR", dataIndex: "NOMOR_DAFTAR" },
        { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "TGL DAFTAR", dataIndex: "TANGGAL_DAFTAR" },
        { sortable: true, width: 90, filter: { xtype: "textfield" }, header: "MAPP SUPPLIER", dataIndex: "MAPP_SUPPLIER" },
        { sortable: true, width: 300, filter: { xtype: "textfield" }, header: "SUPPLIER NAME", dataIndex: "NAMA" },
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
