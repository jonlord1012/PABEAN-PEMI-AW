Ext.define("NJC.SYNCHRONIZE.sync_doc_aw.dokumenpabean.dokumenpabean_detail", {
  extend: "Ext.form.Panel",
  alias: "widget.dokumenpabean_detail",
  reference: "dokumenpabean_detail",
  frame: false,
  border: true,
  autoScroll: false,
  closeAction: "destroy",
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: ["NJC.SYNCHRONIZE.sync_doc_aw.dokumenpabean.Cdokumenpabean"],
  controller: "Cdokumenpabean",
  fieldDefaults: {
    labelAlign: "left",
    labelWidth: 90,
    margin: "0 10 5 0",
  },
  items: [
    {
      xtype: "grid",
      pid: "GRIDdokumenpabean_detail",
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
          headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "sync_doc_aw/sync_doc_aws",
          extraParams: {
            method: "read_dokumenpabean_detail",
            // module: "aw",
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
              var GRID = Ext.ComponentQuery.query("sync_doc_aw GRIDsync_doc_aw grid[pid=GRIDsync_doc_aw]")[0];
              var vdt = GRID.getSelectionModel().getSelection()[0].data;
              operation.setParams({
                INVOICE_NO: vdt.INVOICE_NO,
                NOMOR_AJU: vdt.NOMOR_AJU
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
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODEBARANG", dataIndex: "KODEBARANG" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "SERIBARANG", dataIndex: "SERIBARANG" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TIPE", dataIndex: "TIPE" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "UKURAN", dataIndex: "UKURAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "URAIAN", dataIndex: "URAIAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "JUMLAHSATUAN", align: "right", renderer: "formatamount", dataIndex: "JUMLAHSATUAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "HARGASATUAN", align: "right", renderer: "formatamount", dataIndex: "HARGASATUAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODESATUAN", dataIndex: "KODESATUAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "JUMLAHKEMASAN", align: "right", renderer: "formatamount", dataIndex: "JUMLAHKEMASAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODEKEMASAN", dataIndex: "KODEKEMASAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "ASURANSI", dataIndex: "ASURANSI" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "CIF", align: "right", renderer: "formatamount", dataIndex: "CIF" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "CIFRUPIAH", align: "right", renderer: "formatamount", dataIndex: "CIFRUPIAH" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "DISKON", align: "right", renderer: "formatamount", dataIndex: "DISKON" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "FOB", align: "right", renderer: "formatamount", dataIndex: "FOB" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "FREIGHT", align: "right", renderer: "formatamount", dataIndex: "FREIGHT" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NETTO", align: "right", renderer: "formatamount", dataIndex: "NETTO" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "VOLUME", dataIndex: "VOLUME" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "ID_HEADER", dataIndex: "ID_HEADER" }
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
      items: [
        "-",
        {
          xtype: "button",
          pid: "btrefresh",
          text: "Refresh",
          icon: vconfig.getstyle + "icon/update.ico",
          tooltip: "Refresh Data",
          handler: function () {
            var GRID = Ext.ComponentQuery.query("dokumenpabean_detail grid[pid=GRIDdokumenpabean_detail]")[0];
            GRID.getStore().load();
          },
        },
      ],
      // other options....
    },
  ],
});
