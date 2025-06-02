var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.INVENTORY_PLB.inv_material_in_aw.FRMinv_material_in_bicc", {
  extend: "Ext.window.Window",
  alias: "widget.FRMinv_material_in_bicc",
  reference: "FRMinv_material_in_bicc",
  title: "Receiving from Integrasi",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: true,
  controller: "Cinv_material_in_aw",
  //y: -110,
  width: mainpanel.getWidth() * 0.9,
  height: mainpanel.getHeight() * 0.9,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
  items: [
    {
      xtype: "container",
      layout: { type: "hbox", pack: "start", align: "stretch" },
      flex: 1,
      items: [
        {
          xtype: "grid",
          pid: "GRIDinv_material_in_bicc",
          emptyText: "No Matching Records",
          flex: 1,
          plugins: [
            "filterfield",
            {
              ptype: "cellediting",
              clicksToEdit: 1,
            },
          ],
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
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
              actionMethods: { read: "POST" },
              url: vconfig.service_api + "inv_material_in_aw/inv_material_in_aws",
              extraParams: {
                method: "read_integrasi_bicc",
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
                  var vdate = Ext.ComponentQuery.query("FRMinv_material_in_bicc datefield[name=TANGGAL_RCV]")[0];
                  operation.setParams({
                    vdate: moment(vdate.getValue()).format("YYYY-MM-DD"),
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
              text: "SOURCE BICC",
              columns: [
                { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "RECEIPT DATE", dataIndex: "RECEIPT_DATE" },
                { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "DOKUMEN NO", dataIndex: "SUMBER_DATA" },
                { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "INVOICE", dataIndex: "RECEIPT_NO" },
                { sortable: true, width: 200, filter: { xtype: "textfield" }, header: "PART NO", dataIndex: "PART_NO" },
                { sortable: true, width: 200, filter: { xtype: "textfield" }, header: "BARCODE", dataIndex: "BARCODE" },
                { sortable: true, width: 100, align: "right", renderer: "formatqty", header: "RCV_QTY", dataIndex: "RECEIPT_QTY" },
              ],
            },
            {
              text: "SUMBER DATA",
              columns: [
                { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "INVOICE NO", dataIndex: "INVOICE_NO" },
                { sortable: true, width: 200, filter: { xtype: "textfield" }, header: "PART NO", dataIndex: "MAPP_PARTNO" },
                { sortable: true, width: 100, align: "right", renderer: "formatqty", header: "INVOICE QTY", dataIndex: "INVOICE_QTY" },
                { sortable: true, width: 55, filter: { xtype: "textfield" }, header: "BC TYPE", dataIndex: "BC_TYPE" },
                { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NO AJU", dataIndex: "NOMOR_AJU" },
                { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TGL AJU", dataIndex: "TANGGAL_AJU" },
                { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NO DAFTAR", dataIndex: "NOMOR_DAFTAR" },
                { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TGL DAFTAR", dataIndex: "TANGGAL_DAFTAR" },
              ],
            },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "RECEIPT_NO", dataIndex: "RECEIPT_NO" , hidden:true },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "INVOICE_NO", dataIndex: "INVOICE_NO" , hidden:true },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "PART_NO", dataIndex: "PART_NO" , hidden:true },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "MAPP_PARTNO", dataIndex: "MAPP_PARTNO" , hidden:true },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "INVOICE_QTY", dataIndex: "INVOICE_QTY" , renderer: "formatqty", hidden:true },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "RECEIPT_QTY", dataIndex: "RECEIPT_QTY" , renderer: "formatqty", hidden:true },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "SUMBER_DATA", dataIndex: "SUMBER_DATA" , hidden:true },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "MENU_INPUT", dataIndex: "MENU_INPUT" , hidden:true },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "JENIS_INPUT", dataIndex: "JENIS_INPUT" , hidden:true },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "BC_KURS", dataIndex: "BC_KURS" , hidden:true },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "BC_NDPBM", dataIndex: "BC_NDPBM" , renderer: "formatqty", hidden:true },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "BC_HARGA_SATUAN", dataIndex: "BC_HARGA_SATUAN" , renderer: "formatqty", hidden:true },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "BC_USD_NDPBM", dataIndex: "BC_USD_NDPBM" , renderer: "formatqty", hidden:true },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "BC_USD_HARGA_SATUAN", dataIndex: "BC_USD_HARGA_SATUAN" , renderer: "formatqty", hidden:true },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "BC_TYPE", dataIndex: "BC_TYPE" , hidden:true },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NOMOR_AJU", dataIndex: "NOMOR_AJU" , hidden:true },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TANGGAL_AJU", dataIndex: "TANGGAL_AJU" , hidden:true },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NOMOR_DAFTAR", dataIndex: "NOMOR_DAFTAR" , hidden:true },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TANGGAL_DAFTAR", dataIndex: "TANGGAL_DAFTAR" , hidden:true },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "SUPPLIER_KODE_INTERNAL", dataIndex: "SUPPLIER_KODE_INTERNAL" , hidden:true },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "SUPPLIER_NAME", dataIndex: "SUPPLIER_NAME" , hidden:true },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "RECEIPT_DATE", dataIndex: "RECEIPT_DATE" , hidden:true },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "BARCODE", dataIndex: "BARCODE" , hidden:true },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "SERI_BARANG", dataIndex: "SERI_BARANG" , hidden:true },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "HSCODE", dataIndex: "HSCODE" , hidden:true },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "ID_HEADER_ORI", dataIndex: "ID_HEADER_ORI" , hidden:true },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "ID_HEADER_CEISA_DETAIL", dataIndex: "ID_HEADER_CEISA_DETAIL" , hidden:true },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "HARGA_SATUAN", dataIndex: "HARGA_SATUAN" , renderer: "formatqty", hidden:true },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "CIF_DETAIL", dataIndex: "CIF_DETAIL" , renderer: "formatqty", hidden:true },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "CIF_RUPIAH_DETAIL", dataIndex: "CIF_RUPIAH_DETAIL" , renderer: "formatqty", hidden:true },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "FOB_DETAIL", dataIndex: "FOB_DETAIL" , renderer: "formatqty", hidden:true },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "FREIGHT_DETAIL", dataIndex: "FREIGHT_DETAIL" , renderer: "formatqty", hidden:true },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "HARGA_INVOICE_DETAIL", dataIndex: "HARGA_INVOICE_DETAIL" , renderer: "formatqty", hidden:true },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "HARGA_PENYERAHAN_DETAIL", dataIndex: "HARGA_PENYERAHAN_DETAIL" , renderer: "formatqty", hidden:true },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "JUMLAH_SATUAN", dataIndex: "JUMLAH_SATUAN" , renderer: "formatqty", hidden:true },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "IS_FROM_AW", dataIndex: "IS_FROM_AW" , hidden:true },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "IS_FROM_AW_SEQNO", dataIndex: "IS_FROM_AW_SEQNO" , hidden:true },
           
          ],
          bbar: {
            xtype: "pagingtoolbar",
            displayInfo: true,
            displayMsg: "Displaying topics {0} - {1} of {2}",
            emptyMsg: "No topics to display",
          },
        },
      ],
    },
  ],
  dockedItems: [
    {
      xtype: "toolbar",
      height: 30,
      dock: "top",
      items: [
        //
        { xtype: "tbspacer", width: 10 },
        "-",
        { xtype: "datefield", labelWidth: 100, width: 220, fieldLabel: "Tanggal Receiving", name: "TANGGAL_RCV", fieldCls: "fieldinput", readOnly: false, format: "Y-m-d", value: new Date() },
        "-",
        { xtype: "tbspacer", width: 10, text: "-" },
        { xtype: "button", text: "Process Synchronize", pid: "biccbtprocess_synchronize", icon: vconfig.getstyle + "icon/update.ico", tooltip: "Process Synchronize" },
      ],
    },
  ],
});
