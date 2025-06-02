var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.INVENTORY_PLB.goods_in.FRMinv_goods_in_by_invoice", {
  extend: "Ext.window.Window",
  alias: "widget.FRMinv_goods_in_by_invoice",
  reference: "FRMinv_goods_in_by_invoice",
  title: "Receiving from Integrasi",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: false,
  controller: "Cgoods_in",
  //y: -110,
  width: mainpanel.getWidth() * 0.95,
  height: mainpanel.getHeight() * 0.95,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF; margin:1px;",
  items: [
    /*{
      xtype: "container",
      layout: { type: "hbox", pack: "start", align: "stretch" },
      flex: 1,
      margin: "0 30 30 0",
      items: [*/
    {
      xtype: "grid",
      pid: "GRIDinv_goods_in_binloc_by_invoice",
      emptyText: "No Matching Records",
      flex: 1,
      height: mainpanel.getHeight() * 0.6,
      plugins: [
        "filterfield",
        {
          ptype: "cellediting",
        },
      ],
      viewConfig: {
        enableTextSelection: true,
      },
      store: {
        autoLoad: false,
        remoteSort: true,
        remoteFilter: true,
        pageSize: 50,
        proxy: {
          type: "ajax",
          disableCaching: false,
          timeout: 0,
          noCache: false,
          headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "goods_in/goods_ins",
          extraParams: {
            method: "read_integrasi_binloc_by_invoice",
            module: 'load',
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
              var VINVOICENO = Ext.ComponentQuery.query("FRMinv_goods_in_by_invoice textfield[name=invoice_no]")[0];
              operation.setParams({
                VINVOICENO: VINVOICENO.getValue()
              })

            } catch (ex) {
              COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
            }
          },
        },
      },
      columns: [
        { xtype: "rownumberer", width: 50 },
        {
          text: "SOURCE BINLOC",
          columns: [
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "RECEIPT DATE", dataIndex: "RECEIPT_DATE", renderer: "formatDate" },
            { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "DOKUMEN NO", dataIndex: "RECEIPT_NO" },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "INVOICE", dataIndex: "INVOICE_NO" },
            { sortable: true, width: 200, filter: { xtype: "textfield" }, header: "STOCK NAME", dataIndex: "PART_NAME" },
            { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "ARTICLE CODE", dataIndex: "ARTICLE_CODE" },
            { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "KODE LOT", dataIndex: "LOT_NO" },
            { sortable: true, width: 80, align: "right", renderer: "formatqty", header: "RCV_QTY", dataIndex: "GR_QTY" },
            { sortable: true, width: 80, align: "right", renderer: "formatqty", header: "RCV_QTY (CONVERTED)", dataIndex: "PART_MPQ" },
          ],
        },
        {
          text: "SUMBER DATA",
          columns: [
            { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "NOMOR DOKUMEN", dataIndex: "INVOICE_NO" },
            { sortable: true, width: 200, filter: { xtype: "textfield" }, header: "KODE BARANG", dataIndex: "SOURCE_PABEAN_CODE" },
            { sortable: true, width: 80, align: "right", renderer: "formatqty", header: "JUMLAH SATUAN", dataIndex: "PABEAN_QTY" },
            { sortable: true, width: 55, filter: { xtype: "textfield" }, header: "BC TYPE", dataIndex: "BC_TYPE" },
            { sortable: true, width: 200, filter: { xtype: "textfield" }, header: "NO AJU", dataIndex: "NOMOR_AJU" },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TGL AJU", dataIndex: "TANGGAL_AJU" },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NO DAFTAR", dataIndex: "NOMOR_DAFTAR" },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TGL DAFTAR", dataIndex: "TANGGAL_DAFTAR" },
          ],
        },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "RECEIPT_NO", dataIndex: "RECEIPT_NO", hidden: true },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "INVOICE_NO", dataIndex: "INVOICE_NO", hidden: true },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NO SKU", dataIndex: "SKU_NO", hidden: true },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "STOCK NAME", dataIndex: "SOURCE_PART_NO", hidden: true },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "ARTICLE CODE", dataIndex: "SOURCE_ARTICLE_CODE", hidden: true },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "YAZAKI CODE", dataIndex: "PABEAN_CODE", hidden: true },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "MPQ", dataIndex: "PART_MPQ", renderer: "formatqty", hidden: true },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE LOT", dataIndex: "SOURCE_LOT_NO", hidden: true },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "RCV_QTY", dataIndex: "GR_QTY", renderer: "formatqty", hidden: true },


        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NOMOR AJU", dataIndex: "NOMOR_AJU", hidden: true },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TANGGAL AJU", dataIndex: "TANGGAL_AJU", hidden: true },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NOMOR DOKUMEN", dataIndex: "INVOICE_NO", hidden: true },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TANGGAL DOKUMEN", dataIndex: "INVOICE_DATE", hidden: true },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "SERI BARANG", dataIndex: "SERI_BARANG ", renderer: "formatqty", hidden: true },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE BARANG", dataIndex: "SOURCE_PABEAN_CODE", renderer: "formatqty", hidden: true },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TIPE", dataIndex: "SOURCE_PABEAN_NAME", hidden: true },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "JUMLAH SATUAN", dataIndex: "INVOICE_QTY", renderer: "formatqty", hidden: true },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "JENIS_DOKUMEN", dataIndex: "BC_TYPE", hidden: true },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NOMOR DAFTAR", dataIndex: "NOMOR_DAFTAR", hidden: true },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TANGGAL DAFTAR", dataIndex: "TANGGAL_DAFTAR", hidden: true },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "BINLOC_DETAILID", dataIndex: "BINLOC_RECEIPT_DETAIL_ID", hidden: true },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "ID_INVOICE_LOT_ORI", dataIndex: "BINLOC_INVOICE_LOT_ID", hidden: true },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "BINLOC_STOCKID", dataIndex: "BINLOC_STOCKID", hidden: true },

      ],
      bbar: {
        xtype: "pagingtoolbar",
        displayInfo: true,
        displayMsg: "Displaying topics {0} - {1} of {2}",
        emptyMsg: "No topics to display",
      },
    },
    //],
    //},
  ],
  dockedItems: [
    {
      xtype: "toolbar",
      height: 30,
      dock: "top",
      items: [
        //
        { xtype: "tbspacer", width: 10 },
        { xtype: "textfield", labelWidth: 90, width: 300, fieldLabel: "INVOICE NO", pid: "invoice_no", name: "invoice_no", fieldCls: "fieldlock", },

        { xtype: "button", text: "Cari Invoice", pid: "btsearch_invoice", icon: vconfig.getstyle + "icon/search.ico", tooltip: "search" },
        { xtype: "tbspacer", width: 10, text: "-" },
        "-",
        { xtype: "tbspacer", width: 10 },
        { xtype: "button", text: "Process Synchronize", pid: "binloc_synchronize_by_invoice", icon: vconfig.getstyle + "icon/update.ico", tooltip: "Process Synchronize" },
      ],
    },
    {
      xtype: "toolbar",
      dock: "bottom",
      height: 30,
      items: [
        {
          xtype: "label",
          html: "<b>NOTES:: Data yang akan disimpan dalam IT INVENTORY PABEAN, <span style='color:white;'>HANYA DATA yang memiliki NOMOR DAFTAR & NOMOR AJU</span></b>",
        }
      ],

    },
  ],
});
