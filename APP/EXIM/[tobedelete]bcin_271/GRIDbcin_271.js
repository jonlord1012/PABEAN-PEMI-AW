Ext.define("NJC.EXIM.bcin_271.GRIDbcin_271", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDbcin_271",
  reference: "GRIDbcin_271",
  frame: false,
  border: false,
  autoScroll: true,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
  items: [
    {
      xtype: "grid",
      pid: "GRIDbcin_271",
      emptyText: "No Matching Records",
      autoScroll: true,
      flex: 1,
      plugins: ["filterfield"],
      viewConfig: {
        enableTextSelection: true,
      },
      store: {
        autoLoad: true,
        remoteSort: true,
        remoteFilter: true,
        pageSize: 15,
        proxy: {
          type: "ajax",
          disableCaching: false,
          noCache: false,
          headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "bcin_271/bcin_271s",
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
              var CBO_FILTERKEY = Ext.ComponentQuery.query("bcin_271 combobox[name=CBO_FILTERKEY]")[0];
              operation.setParams({
                cbo_filterkey: CBO_FILTERKEY.getValue(),
              });
            } catch (ex) {
              COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
            }
          },
        },
      },
      columns: [
        { xtype: "rownumberer", width: 50 },
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
        //{ header: "STATUS", dataIndex: "KODE_STATUS", sortable: true, width: 50, filter: { xtype: "textfield" } },
        // { header: "DESC", dataIndex: "URAIAN_STATUS", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "CPY", dataIndex: "ID_COMPANY", sortable: true, width: 50, filter: { xtype: "textfield" } },
        //{ header: "SOURCE", dataIndex: "MODE_SOURCE", sortable: true, width: 65, filter: { xtype: "textfield" } },
        { header: "PEMASOK", dataIndex: "NAMA_PEMASOK", sortable: true, width: 300, filter: { xtype: "textfield" } },
        { header: "INVOICE", dataIndex: "NOMOR_DOKUMEN", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "TANGGAL INVOICE", dataIndex: "TANGGAL_DOKUMEN", sortable: true, width: 80, filter: { xtype: "textfield" } },
        { header: "BC TYPE", dataIndex: "BC_TYPE", sortable: true, width: 150, filter: { xtype: "textfield" } },
        { header: "NO AJU", dataIndex: "NOMOR_AJU", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "TANGGAL AJU", dataIndex: "TANGGAL_AJU", sortable: true, width: 80, filter: { xtype: "textfield" } },
        { header: "NO DAFTAR", dataIndex: "NOMOR_DAFTAR", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "TANGGAL DAFTAR", dataIndex: "TANGGAL_DAFTAR", sortable: true, width: 80, filter: { xtype: "textfield" } },
        //{ header: "CIF", dataIndex: "CIF", renderer: "formatAmount", align: "right", sortable: true, width: 120, filter: { xtype: "textfield" } },
        //{ header: "CIF RP", dataIndex: "CIF_RUPIAH", renderer: "formatAmount", align: "right", sortable: true, width: 120, filter: { xtype: "textfield" } },
        //{ header: "HARGA_INVOICE", dataIndex: "HARGA_INVOICE", renderer: "formatAmount", align: "right", sortable: true, width: 120, filter: { xtype: "textfield" } },
        { header: "TOTAL_KEMASAN", dataIndex: "TOTAL_KEMASAN", sortable: true, renderer: "formatAmount", width: 300, filter: { xtype: "textfield" } },

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
