Ext.define("NJC.INVENTORY_PLB.goods_in.receiving_detail.GRIDreceiving_aw_sumber_data", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDreceiving_aw_sumber_data",
  reference: "GRIDreceiving_aw_sumber_data",
  frame: false,
  border: true,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
  items: [
    {
      xtype: "grid",
      pid: "GRIDsumberdata",
      emptyText: "No Matching Records",
      autoScroll: true,
      title: "",
      flex: 1,
      plugins: ["filterfield", "gridexporter"],
      viewConfig: {
        enableTextSelection: true,
      },
      features: [
        {
          ftype: "summary",
          dock: "bottom",
        },
      ],
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
          url: vconfig.service_api + "goods_in/goods_ins",
          extraParams: {
            method: "read_original",
            // module: "coo",
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
              var GRID = Ext.ComponentQuery.query("goods_in GRIDgoods_in grid[pid=GRIDgoods_in]")[0];
              var vdt = GRID.getSelectionModel().getSelection()[0].data;
              operation.setParams({
                INVOICE_NO: vdt.INVOICE_NO,
                NO_AJU: vdt.NOMOR_AJU,
                VENDOR: vdt.VENDOR
              });
              console.log(vdt)
            } catch (ex) {
              COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
            }
          },
        },
      },
      columns: [
        { xtype: "rownumberer", width: 40 },
        { header: "VENDOR", dataIndex: "VENDOR", sortable: true, width: 200, filter: { xtype: "textfield" } },
        { header: "INVOICE_NO", dataIndex: "INVOICE_NO", sortable: true, width: 150, filter: { xtype: "textfield" } },
        { header: "INVOICE_DATE", dataIndex: "INVOICE_DATE", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "BC TYPE", dataIndex: "BC_TYPE", sortable: true, width: 80, filter: { xtype: "textfield" } },
        { header: "TANGGAL AJU", dataIndex: "TANGGAL_AJU", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "NOMOR DAFTAR", dataIndex: "NOMOR_DAFTAR", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "TANGGAL DAFTAR", dataIndex: "TANGGAL_DAFTAR", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "KODE BARANG", dataIndex: "KODE_BARANG", sortable: true, width: 100, filter: { xtype: "textfield" } },
        {
          header: "JUMLAH SATUAN", dataIndex: "JUMLAH_SATUAN", sortable: true, width: 100, align: "right", renderer: "formatqty", filter: { xtype: "textfield" }, summaryType: "sum",
          summaryRenderer: function (value, summaryData, dataIndex) {
            return '<span style="font-weight:bold;font-size:11px;">' + Ext.util.Format.number(value, "0,000.00/i") + "</span>";
          },
        },
        { header: "KODE SATUAN", dataIndex: "KODE_SATUAN", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "HS CODE", dataIndex: "HS_CODE", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "NETTO", dataIndex: "NETTO", sortable: true, width: 100, align: "right", renderer: "formatqty", filter: { xtype: "textfield" } },
        { header: "BRUTTO", dataIndex: "[ISI PER KEMASAN]", sortable: true, align: "right", renderer: "formatqty", width: 100, filter: { xtype: "textfield" } },
        // { header: "VENDOR", dataIndex: "NAMA_ENTITAS", name:'VENDOR', sortable: true, width: 200, filter: { xtype: "textfield" } },
        // { header: "INVOICE_NO", dataIndex: "NOMOR_DOKUMEN", name:'INVOICE_NO', sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "CONTAINER_NO", dataIndex: "CONTAINER_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "INVOICE_DATE", dataIndex: "TANGGAL_DOKUMEN", name:'INVOICE_DATE', sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "ETD_VEBDER", dataIndex: "ETD_VEBDER", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "ETD_PORT", dataIndex: "ETD_PORT", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "ETA_PORT", dataIndex: "ETA_PORT", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "ETA_FACT", dataIndex: "ETA_FACT", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "TRANSPORT_WAY", dataIndex: "TRANSPORT_WAY", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "CARA_BAYAR", dataIndex: "CARA_BAYAR", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "ONEROUS", dataIndex: "ONEROUS", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "SHIP_FROM", dataIndex: "SHIP_FROM", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "VIA", dataIndex: "VIA", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "SHIP_TO", dataIndex: "SHIP_TO", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "PAY_BY", dataIndex: "PAY_BY", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "SEAL_NO", dataIndex: "SEAL_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "SHIP_NAME", dataIndex: "SHIP_NAME", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "SHIP_COMPANY", dataIndex: "SHIP_COMPANY", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "ORDER_NO", dataIndex: "ORDER_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "ITEM_NUMBER", dataIndex: "ITEM_NUMBER", sortable: true, width: 100, filter: { xtype: "textfield" }, tdCls: "fieldinput" },
        // { header: "DESCRIPTION", dataIndex: "DESCRIPTION", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "ARRIV_PLAN_NUMBER", dataIndex: "ARRIV_PLAN_NUMBER", sortable: true, width: 100, filter: { xtype: "textfield" }, tdCls: "fieldinput" },
        // { header: "UOM", dataIndex: "UOM", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "PRICE", dataIndex: "PRICE", sortable: true, width: 100, filter: { xtype: "textfield" }, tdCls: "fieldinput" },
        // { header: "CURRENT_MONEY", dataIndex: "CURRENT_MONEY", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "CTN_NO_PREFIX", dataIndex: "CTN_NO_PREFIX", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "CTN_NO_FROM", dataIndex: "CTN_NO_FROM", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "CTN_NO_TO", dataIndex: "CTN_NO_TO", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "CTN_QUANTITY", dataIndex: "CTN_QUANTITY", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "PACKING_QTY", dataIndex: "PACKING_QTY", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "NET_WEIGHT", dataIndex: "NET_WEIGHT", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "GROSS_WEIGHT", dataIndex: "GROSS_WEIGHT", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "WEIGHT_UOM", dataIndex: "WEIGHT_UOM", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "VOLUME", dataIndex: "VOLUME", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "VOLUME_UOM", dataIndex: "VOLUME_UOM", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "BL_DATE", dataIndex: "BL_DATE", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "BL_NO", dataIndex: "BL_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "FREIGHT", dataIndex: "FREIGHT", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "EURO_NO", dataIndex: "EURO_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "PALET_NO", dataIndex: "PALET_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "HS_CODE", dataIndex: "HS_CODE", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "COUNTRY_OF", dataIndex: "COUNTRY_OF", sortable: true, width: 100, filter: { xtype: "textfield" }, tdCls: "fieldinput" },
        // { header: "CAUPRI", dataIndex: "CAUPRI", sortable: true, width: 100, filter: { xtype: "textfield" }, tdCls: "fieldinput" },
        // { header: "CATAMZ", dataIndex: "CATAMZ", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "CAROUD", dataIndex: "CAROUD", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "AKHIR", dataIndex: "AKHIR", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "MAPP_SUPPLIER", dataIndex: "MAPP_SUPPLIER", sortable: true, width: 100, filter: { xtype: "textfield" } },
        // { header: "MAPP_PARTNO", dataIndex: "MAPP_PARTNO", sortable: true, width: 100, filter: { xtype: "textfield" } },
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
