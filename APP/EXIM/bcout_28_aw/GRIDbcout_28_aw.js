Ext.define("NJC.EXIM.bcout_28_aw.GRIDbcout_28_aw", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDbcout_28_aw",
  reference: "GRIDbcout_28_aw",
  frame: false,
  border: false,
  autoScroll: true,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
  items: [
    {
      xtype: "grid",
      pid: "GRIDbcout_28_aw",
      emptyText: "No Matching Records",
      autoScroll: true,
      flex: 1,
      plugins: ["filterfield"],
      viewConfig: {
        enableTextSelection: true,
      },
      // store: {
      //   autoLoad: true,
      //   remoteSort: true,
      //   remoteFilter: true,
      //   pageSize: 15,
      //   proxy: {
      //     type: "ajax",
      //     disableCaching: false,
      //     noCache: false,
      //     headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
      //     actionMethods: { read: "POST" },
      //     url: vconfig.service_api + "bcout_28_aw/bcout_28_aws",
      //     reader: {
      //       type: "json",
      //       rootProperty: "Rows",
      //       totalProperty: "TotalRows",
      //       successProperty: "success",
      //     },
      //   },
      //   listeners: {
      //     beforeload: function (store, operation, eOpts) {
      //       try {
      //         var CBO_FILTERKEY = Ext.ComponentQuery.query("bcout_28_aw combobox[name=CBO_FILTERKEY]")[0];
      //         operation.setParams({
      //           cbo_filterkey: CBO_FILTERKEY.getValue(),
      //         });
      //       } catch (ex) {
      //         COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      //       }
      //     },
      //   },
      // },
      store:new Ext.data.Store({
        data:[
          {
            KODE_STATUS:"1",
            URAIAN_STATUS:"1",
            ID_COMPANY:"1",
            MODE_SOURCE:"1",
            NOMOR_DOKUMEN:"1",
            TANGGAL_DOKUMEN:"1",
            NOMOR_AJU:"1",
            TANGGAL_AJU:"1",
            CIF:"1",
            CIF_RUPIAH:"1",
            HARGA_INVOICE:"1",
            NAMA_PEMASOK:"1" 
          }
        ],
        fields:[
          "KODE_STATUS",
          "URAIAN_STATUS",
          "ID_COMPANY",
          "MODE_SOURCE",
          "NOMOR_DOKUMEN",
          "TANGGAL_DOKUMEN",
          "NOMOR_AJU",
          "TANGGAL_AJU",
          "CIF",
          "CIF_RUPIAH",
          "HARGA_INVOICE",
          "NAMA_PEMASOK"
        ]
      }),
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
        { header: "STATUS", dataIndex: "KODE_STATUS", sortable: true, width: 50, filter: { xtype: "textfield" } },
        { header: "DESC", dataIndex: "URAIAN_STATUS", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "CPY", dataIndex: "ID_COMPANY", sortable: true, width: 50, filter: { xtype: "textfield" } },
        { header: "SOURCE", dataIndex: "MODE_SOURCE", sortable: true, width: 65, filter: { xtype: "textfield" } },
        { header: "INVOICE", dataIndex: "NOMOR_DOKUMEN", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "INV DATE", dataIndex: "TANGGAL_DOKUMEN", sortable: true, width: 80, filter: { xtype: "textfield" } },
        { header: "NOMOR DOKUMEN", dataIndex: "NOMOR_DOKUMEN", sortable: true, width: 150, filter: { xtype: "textfield" } },
        { header: "NO AJU", dataIndex: "NOMOR_AJU", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "AJU DATE", dataIndex: "TANGGAL_AJU", sortable: true, width: 80, filter: { xtype: "textfield" } },
        { header: "CIF", dataIndex: "CIF", renderer: "formatAmount", align: "right", sortable: true, width: 120, filter: { xtype: "textfield" } },
        { header: "CIF RP", dataIndex: "CIF_RUPIAH", renderer: "formatAmount", align: "right", sortable: true, width: 120, filter: { xtype: "textfield" } },
        { header: "HARGA_INVOICE", dataIndex: "HARGA_INVOICE", renderer: "formatAmount", align: "right", sortable: true, width: 120, filter: { xtype: "textfield" } },
        { header: "PEMASOK", dataIndex: "NAMA_PEMASOK", sortable: true, width: 300, filter: { xtype: "textfield" } },
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
