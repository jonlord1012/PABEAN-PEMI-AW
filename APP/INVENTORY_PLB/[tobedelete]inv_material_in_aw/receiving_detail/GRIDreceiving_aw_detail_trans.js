Ext.define("TDK.INVENTORY_PLB.inv_material_in_aw.receiving_detail.GRIDreceiving_aw_detail_trans", {
    extend: "Ext.form.Panel",
    alias: "widget.GRIDreceiving_aw_detail_trans",
    reference: "GRIDreceiving_aw_detail_trans",
    frame: false,
    border: true,
    autoScroll: true,
    layout: { type: "vbox", pack: "start", align: "stretch" },
    requires: [],
    items: [
      {
        xtype: "grid",
        pid: "GRIDreceiving_aw_detail_trans_header",
        emptyText: "No Matching Records",
        autoScroll: true,
        title: "",
        height: 150,
        plugins: ["filterfield"],
        viewConfig: {
          enableTextSelection: true,
        },
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
            url: vconfig.service_api + "inv_material_in_aw/inv_material_in_aws",
            extraParams: {
              method: "read_receivingdata_header",
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
                var GRID = Ext.ComponentQuery.query("inv_material_in_aw GRIDinv_material_in_aw grid[pid=GRIDinv_material_in_aw]")[0];
                var vdt = GRID.getSelectionModel().getSelection()[0].data;
                operation.setParams({
                  RECEIPT_NO: vdt.RECEIPT_NO,
                });
              } catch (ex) {
                COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
              }
            },
          },
        },
        columns: [
          { xtype: "rownumberer", width: 40 },
          { header: "RECEIPT_NO", dataIndex: "RECEIPT_NO", sortable: true, width: 200 },
          { header: "RECEIPT_DATE", dataIndex: "RECEIPT_DATE", sortable: true, width: 100 },
          { header: "RECEIPT_USER", dataIndex: "RECEIPT_USER", sortable: true, width: 100 },
        ],
        bbar: {
          xtype: "pagingtoolbar",
          displayInfo: true,
          displayMsg: "Total Data {2}",
          emptyMsg: "No topics to display",
        },
      },
      { xtype: "tbspacer", height: 5 },
      {
        xtype: "grid",
        pid: "GRIDreceiving_aw_detail_trans_detail",
        emptyText: "No Matching Records",
        autoScroll: true,
        title: "",
        flex: 1,
        plugins: ["filterfield"],
        viewConfig: {
          enableTextSelection: true,
        },
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
            url: vconfig.service_api + "inv_material_in_aw/inv_material_in_aws",
            extraParams: {
              method: "read_receivingdata_detail",
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
                var GRID = Ext.ComponentQuery.query("inv_material_in_aw GRIDinv_material_in_aw grid[pid=GRIDinv_material_in_aw]")[0];
                var vdt = GRID.getSelectionModel().getSelection()[0].data;
                operation.setParams({
                  RECEIPT_NO: vdt.RECEIPT_NO,
                });
              } catch (ex) {
                COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
              }
            },
          },
        },
        columns: [
          { header: "MAPP_PARTNO", dataIndex: "MAPP_PARTNO", sortable: true, width: 100, filter: { xtype: "textfield" } },
          { header: "PART_NO", dataIndex: "PART_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
          { header: "INVOICE_QTY", dataIndex: "INVOICE_QTY", sortable: true, width: 100, filter: { xtype: "textfield" } },
          { header: "RECEIPT_QTY", dataIndex: "RECEIPT_QTY", sortable: true, width: 100, filter: { xtype: "textfield" } },
          { header: "PRICE", dataIndex: "HARGA_SATUAN", sortable: true, width: 100, filter: { xtype: "textfield" } },
          { header: "KURS", dataIndex: "KURS", sortable: true, width: 100, filter: { xtype: "textfield" } },
          { header: "KURS_RATE", dataIndex: "NDPBM", sortable: true, width: 100, filter: { xtype: "textfield" } },
          { header: "IDR_PER_UNIT", dataIndex: "BC_HARGA_SATUAN", sortable: true, width: 100, filter: { xtype: "textfield" } },
          { header: "USD_RATE", dataIndex: "BC_USD_NDPBM", sortable: true, width: 100, filter: { xtype: "textfield" } },
          { header: "USD_PER_UNIT", dataIndex: "BC_USD_HARGA_SATUAN", sortable: true, width: 100, filter: { xtype: "textfield" } },
          { header: "RECEIPT_NO", dataIndex: "RECEIPT_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
          { header: "INVOICE_NO", dataIndex: "INVOICE_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
          { header: "BC_TYPE", dataIndex: "BC_TYPE", sortable: true, width: 100, filter: { xtype: "textfield" } },
          { header: "NOMOR_AJU", dataIndex: "NOMOR_AJU", sortable: true, width: 100, filter: { xtype: "textfield" } },
          { header: "TANGGAL_AJU", dataIndex: "TANGGAL_AJU", sortable: true, width: 100, filter: { xtype: "textfield" } },
          { header: "NOMOR_DAFTAR", dataIndex: "NOMOR_DAFTAR", sortable: true, width: 100, filter: { xtype: "textfield" } },
          { header: "TANGGAL_DAFTAR", dataIndex: "TANGGAL_DAFTAR", sortable: true, width: 100, filter: { xtype: "textfield" } },
          { header: "SUPPLIER_KODE_INTERNAL", dataIndex: "SUPPLIER_KODE_INTERNAL", sortable: true, width: 100, filter: { xtype: "textfield" } },
          { header: "SUPPLIER_NAME", dataIndex: "SUPPLIER_NAME", sortable: true, width: 100, filter: { xtype: "textfield" } },
          { header: "MODE INPUT", dataIndex: "JENIS_INPUT", sortable: true, width: 100, filter: { xtype: "textfield" } },

        ],
        bbar: {
          xtype: "pagingtoolbar",
          displayInfo: true,
          displayMsg: "Total Data {2}",
          emptyMsg: "No topics to display",
        },
      },
    ],
    dockedItems: [
      {
        xtype: "toolbar",
        height: 30,
        dock: "top",
        items: ["-", "->"],
        // other options....
      },
    ],
  });
  