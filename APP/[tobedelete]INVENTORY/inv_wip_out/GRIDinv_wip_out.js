Ext.define("TDK.INVENTORY.inv_wip_out.GRIDinv_wip_out", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDinv_wip_out",
  reference: "GRIDinv_wip_out",
  frame: false,
  border: false,
  autoScroll: true,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
  // items: [
  //   {
  //     xtype: "grid",
  //     pid: "GRIDinv_wip_out",
  //     emptyText: "No Matching Records",
  //     autoScroll: true,
  //     flex: 1,
  //     plugins: ["filterfield"],
  //     viewConfig: {
  //       enableTextSelection: true,
  //     },
  //     store: {
  //       autoLoad: true,
  //       remoteSort: true,
  //       remoteFilter: true,
  //       pageSize: 17,
  //       proxy: {
  //         type: "ajax",
  //         disableCaching: false,
  //         noCache: false,
  //         headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
  //         actionMethods: { read: "POST" },
  //         url: vconfig.service_api + "inv_wip_out/inv_wip_outs",
  //         extraParams: {
  //           method: "read_in_fg",
  //         },
  //         reader: {
  //           type: "json",
  //           rootProperty: "Rows",
  //           totalProperty: "TotalRows",
  //           successProperty: "success",
  //         },
  //       },
  //       listeners: {
  //         /**
  //         beforeload: function (store, operation, eOpts) {
  //           try {
  //             var CBO_FILTERKEY = Ext.ComponentQuery.query("inv_wip_out combobox[name=CBO_FILTERKEY]")[0];

  //             operation.setParams({
  //               cbo_filterkey: CBO_FILTERKEY.getValue(),
  //             });
  //           } catch (ex) {
  //             COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
  //           }
  //         },
  //          */
  //       },
  //     },
  //     columns: [
  //       { xtype: "rownumberer", width: 50 },
  //       { header: "OUT DATE", dataIndex: "OUT_DATE", sortable: true, width: 100, filter: { xtype: "textfield" } },
  //       { header: "KATEGORI", dataIndex: "OUT_KATEGORI", sortable: true, width: 120, filter: { xtype: "textfield" } },
  //       { header: "INVOICE", dataIndex: "INVOICE_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
  //       { header: "MAPPING PART", dataIndex: "MAPP_PARTNO", sortable: true, width: 100, filter: { xtype: "textfield" } },
  //       { header: "PART NAME", dataIndex: "PART_NAME", sortable: true, width: 200, filter: { xtype: "textfield" } },
  //       { header: "QTY", dataIndex: "OUT_QTY", renderer: "formatAmount", align: "right", sortable: true, width: 80, filter: { xtype: "textfield" } },
  //       { header: "ASSY", dataIndex: "ASSY_PRODUCTION", sortable: true, width: 65, filter: { xtype: "textfield" } },
  //       { header: "SOURCE", dataIndex: "SUMBER_DATA", sortable: true, width: 65, filter: { xtype: "textfield" } },
  //       { header: "BC TYPE", dataIndex: "BC_TYPE", sortable: true, width: 65, filter: { xtype: "textfield" } },
  //       { header: "NOMOR AJU", dataIndex: "NOMOR_AJU", sortable: true, width: 170, filter: { xtype: "textfield" } },
  //       { header: "TANGGAL AJU", dataIndex: "TANGGAL_AJU", sortable: true, width: 80, filter: { xtype: "textfield" } },
  //       { header: "NOMOR DAFTAR", dataIndex: "NOMOR_DAFTAR", sortable: true, width: 80, filter: { xtype: "textfield" } },
  //       { header: "TANGGAL DAFTAR", dataIndex: "TANGGAL_DAFTAR", sortable: true, width: 80, filter: { xtype: "textfield" } },
  //     ],
  //     bbar: {
  //       xtype: "pagingtoolbar",
  //       displayInfo: true,
  //       displayMsg: "Displaying topics {0} - {1} of {2}",
  //       emptyMsg: "No topics to display",
  //     },
  //   },
  // ],
});
