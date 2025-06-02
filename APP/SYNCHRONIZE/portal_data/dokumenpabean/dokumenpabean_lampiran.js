Ext.define("NJC.SYNCHRONIZE.portal_data.dokumenpabean.dokumenpabean_lampiran", {
  extend: "Ext.form.Panel",
  alias: "widget.dokumenpabean_lampiran",
  reference: "dokumenpabean_lampiran",
  frame: false,
  border: true,
  autoScroll: true,
  closeAction: "destroy",

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
      pid: "GRIDdokumenpabean_lampiran",
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
          url: vconfig.service_api + "portal_data/portal_datas",
          extraParams: {
            method: "read_dokumenpabean_lampiran",
            // module: "ceisa",
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
              var GRID = Ext.ComponentQuery.query("portal_data GRIDportal_data grid[pid=GRIDportal_data]")[0];
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
        { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "KODE_DOKUMEN", dataIndex: "KODE_DOKUMEN" },
        { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "NOMOR_DOKUMEN", dataIndex: "NOMOR_DOKUMEN" },
        { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "TANGGAL_DOKUMEN", dataIndex: "TANGGAL_DOKUMEN", renderer: "formatDate" },
        { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "KODE_FASILITAS", dataIndex: "KODE_FASILITAS" },
        { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "KODE_IJIN", dataIndex: "KODE_IJIN" },
        { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "SERI", dataIndex: "SERI" },
        { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "SERI_BARANG", dataIndex: "SERI_BARANG" },
        { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "ID_HEADER", dataIndex: "ID_HEADER" },
        { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "TRANSID", dataIndex: "TRANSID" },
        { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "REF_TRANSID", dataIndex: "REF_TRANSID" },
        // { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "KODE_JENIS_DOKUMEN", dataIndex: "KODE_JENIS_DOKUMEN" },
        // { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "URAIAN_DOKUMEN", dataIndex: "URAIAN_DOKUMEN" },
        // { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "NOMOR_DOKUMEN", dataIndex: "NOMOR_DOKUMEN" },
        // { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "SERI_DOKUMEN", dataIndex: "SERI_DOKUMEN" },
        // { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "TANGGAL_DOKUMEN", dataIndex: "TANGGAL_DOKUMEN" },
        // { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "TIPE_DOKUMEN", dataIndex: "TIPE_DOKUMEN" },
        // { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "URL_DOKUMEN", dataIndex: "URL_DOKUMEN" },
        // { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "ID_HEADER", dataIndex: "ID_HEADER" },
      ],
      bbar: ["-"],
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
            var GRID = Ext.ComponentQuery.query("dokumenpabean_lampiran grid[pid=GRIDdokumenpabean_lampiran]")[0];
            GRID.getStore().load();
          },
        },
      ],
      // other options....
    },
  ],
});
