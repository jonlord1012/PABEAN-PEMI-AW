Ext.define("NJC.EXIM.bcin_271_aw.GRIDbcin_271_aw", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDbcin_271_aw",
  reference: "GRIDbcin_271_aw",
  frame: false,
  border: false,
  autoScroll: true,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
  items: [
    {
      xtype: "grid",
      pid: "GRIDbcin_271_aw",
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
          url: vconfig.service_api + "bcin_271_aw/bcin_271_aws",
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
              var CBO_FILTERKEY = Ext.ComponentQuery.query("bcin_271_aw combobox[name=CBO_FILTERKEY]")[0];
              operation.setParams({
                cbo_filterkey: CBO_FILTERKEY.getValue(),
              });
            } catch (ex) {
              COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
            }
          },
        },
      }, //di komen karna belum ada data, maka pake sample store buat sementara untuk tampilkan form popup
     
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
        //{ header: "DESC", dataIndex: "URAIAN_STATUS", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "CPY", dataIndex: "ID_COMPANY", sortable: true, flex: 1, filter: { xtype: "textfield" } },
        //{ header: "SOURCE", dataIndex: "MODE_SOURCE", sortable: true, width: 65, filter: { xtype: "textfield" } },
        { header: "INVOICE", dataIndex: "NOMOR_DOKUMEN", sortable: true, flex: 1, filter: { xtype: "textfield" } },
        { header: "INV DATE", dataIndex: "TANGGAL_DOKUMEN", sortable: true, flex: 1, filter: { xtype: "textfield" } },
        { header: "NOMOR DOKUMEN", dataIndex: "NOMOR_DOKUMEN", sortable: true, flex: 1, filter: { xtype: "textfield" } },
        { header: "NO AJU", dataIndex: "NOMOR_AJU", sortable: true, flex: 1, filter: { xtype: "textfield" } },
        { header: "AJU DATE", dataIndex: "TANGGAL_AJU", sortable: true, flex: 1, filter: { xtype: "textfield" } },
        //{ header: "CIF", dataIndex: "CIF", renderer: "formatAmount", align: "right", sortable: true, width: 120, filter: { xtype: "textfield" } },
        //{ header: "CIF RP", dataIndex: "CIF_RUPIAH", renderer: "formatAmount", align: "right", sortable: true, width: 120, filter: { xtype: "textfield" } },
        //{ header: "HARGA_INVOICE", dataIndex: "HARGA_INVOICE", renderer: "formatAmount", align: "right", sortable: true, width: 120, filter: { xtype: "textfield" } },
        { header: "PEMASOK", dataIndex: "NAMA_PEMASOK", sortable: true, flex: 1, filter: { xtype: "textfield" } },
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
