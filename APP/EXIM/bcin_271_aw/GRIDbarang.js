Ext.define("NJC.EXIM.bcin_271_aw.GRIDbarang", {
  extend: "Ext.grid.Panel",
  xtype: "GRIDbarang",
  pid: "GRIDbarang",
  emptyText: "No Matching Records",
  autoScroll: true,
  flex: 1,
  requires: [
    //
    "NJC.EXIM.bcin_271_aw.Cbcin_271_aw",
  ],
  controller: "Cbcin_271_aw",
  store: {
    autoLoad: true,
    remoteSort: false,
    remoteFilter: false,
    pageSize: 0,
    fields: [
      { name: "ASURANSI", type: "float" },
      { name: "CIF", type: "float" },
      { name: "CIF_RUPIAH", type: "float" },
      { name: "DISKON", type: "float" },
      { name: "FLAG_KENDARAAN", type: "string" },
      { name: "FOB", type: "float" },
      { name: "FREIGHT", type: "float" },
      { name: "HARGA_BARANG_LDP", type: "float" },
      { name: "HARGA_INVOICE", type: "float" },
      { name: "HARGA_PENYERAHAN", type: "float" },
      { name: "HARGA_SATUAN", type: "float" },
      { name: "JENIS_KENDARAAN", type: "string" },
      { name: "JUMLAH_BAHAN_BAKU", type: "float" },
      { name: "JUMLAH_KEMASAN", type: "float" },
      { name: "JUMLAH_SATUAN", type: "float" },
      { name: "KATEGORI_BARANG", type: "string" },
      { name: "KODE_ASAL_BARANG", type: "string" },
      { name: "KODE_BARANG", type: "string" },
      { name: "KODE_FASILITAS_DOKUMEN", type: "string" },
      { name: "KODE_GUNA", type: "string" },
      { name: "KODE_JENIS_NILAI", type: "string" },
      { name: "KODE_KEMASAN", type: "string" },
      { name: "KODE_NEGARA_ASAL", type: "string" },
      { name: "KODE_SATUAN", type: "string" },
      { name: "KODE_STATUS", type: "string" },
      { name: "KONDISI_BARANG", type: "string" },
      { name: "MERK", type: "string" },
      { name: "NETTO", type: "float" },
      { name: "NILAI_INCOTERM", type: "float" },
      { name: "NILAI_PABEAN", type: "float" },
      { name: "POS_TARIF", type: "string" },
      { name: "SERI_BARANG", type: "int" },
      { name: "SERI_IJIN", type: "string" },
      { name: "SERI_POS_TARIF", type: "string" },
      { name: "SPESIFIKASI_LAIN", type: "string" },
      { name: "TAHUN_PEMBUATAN", type: "string" },
      { name: "TIPE", type: "string" },
      { name: "UKURAN", type: "string" },
      { name: "URAIAN", type: "string" },
      { name: "VOLUME", type: "string" },
      { name: "mode_source", type: "string" },
      { name: "invoice_no", type: "string" },
      { name: "EDS_NOMOR_AJU", type: "string" },
      { name: "ISIPERKEMASAN", type: "string" },
      { name: "KODEDOKUMEN", type: "string" },
      { name: "NILAITAMBAH", type: "string" },
      { name: "NDPBM", type: "float" },
      { name: "HARGAPEROLEHAN", type: "float" },
      { name: "KODEASALBAHANBAKU", type: "string" },
      { name: "BRUTO", type: "float" },
      { name: "ID_COMPANY", type: "string" },
      { name: "CREATE_USER", type: "string" },
    ],
    proxy: {
      type: "ajax",
      disableCaching: false,
      noCache: false,
      headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
      actionMethods: { read: "POST" },
      url: vconfig.service_api + "bcin_271_aw/bcin_271_aws",
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
          var FRM = Ext.ComponentQuery.query("FRMbcin_271_aw form")[0];
          var GRIDsbarang = Ext.ComponentQuery.query("GRIDbarang")[0];
          var vdt = FRM.getValues(false, false, false, true);
          operation.setParams({
            method: "read_dokumen_barang",
            NOMOR_AJU: vdt.NOMOR_AJU
          });
          console.log(vdt)
          console.log(GRIDsbarang.getStore().getData())
        } catch (ex) {
          COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
        }
      },
    },
  },
  plugins: [
    "filterfield",
    {
      ptype: "rowwidget",
      pluginId: "rowwidgetPlugin",
      selectRowOnExpand: true,
      widget: {
        xtype: "grid",
        store: {
          autoLoad: true,
          remoteSort: false,
          remoteFilter: false,
          pageSize: 0,
          fields: [
            //
            { name: "SERIBARANG", type: "int" },
            { name: "NOMORAJU", type: "string" },
          ],
          proxy: {
            type: "ajax",
            disableCaching: false,
            noCache: false,
            headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
            actionMethods: { read: "POST" },
            url: vconfig.service_api + "bcin_271_aw/bcin_271_aws",
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
                var FRM = Ext.ComponentQuery.query("FRMbcin_271_aw form")[0];
                var GRIDbarang = Ext.ComponentQuery.query("GRIDbarang")[0];
                var sm = GRIDbarang.getSelectionModel();
                var rs = sm.getSelection()[0].data;
                var vdt = FRM.getValues(false, false, false, true);
                operation.setParams({
                  method: "read_dokumen_barang_tarif",
                  NOMOR_AJU: rs.NOMORAJU,
                  SERI_BARANG: rs.SERIBARANG,
                });
                console.log(vdt);
              } catch (ex) {
                COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
              }
            },
          },
        },
        plugins: ["filterfield"],
        columns: [
          { header: "NOMOR AJU", dataIndex: "NOMORAJU", sortable: true, width: 70, hidden: false, filter: { xtype: "textfield" } },
          { header: "SERI BARANG", dataIndex: "SERIBARANG", sortable: true, width: 70, hidden: false, filter: { xtype: "textfield" } },
          { header: "SERI BAHAN BAKU", dataIndex: "SERIBAHANBAKU", sortable: true, width: 70, hidden: false, filter: { xtype: "textfield" } },
          { header: "ASAL BAHAN BAKU", dataIndex: "KODEASALBAHANBAKU", sortable: true, width: 70, hidden: false, filter: { xtype: "textfield" } },
          { header: "HS", dataIndex: "HS", sortable: true, width: 100, hidden: false, filter: { xtype: "textfield" } },
          { header: "KODE BARANG", dataIndex: "KODEBARANG", sortable: true, width: 80, hidden: false, filter: { xtype: "textfield" } },
          { header: "URAIAN", dataIndex: "URAIAN", sortable: true, width: 80, hidden: false, filter: { xtype: "textfield" } },
          { header: "JUMLAH SATUAN", dataIndex: "JUMLAHSATUAN", sortable: true, width: 80, hidden: false, filter: { xtype: "textfield" }, align: "right", renderer: "formatAmount", },
          { header: "KODE SATUAN", dataIndex: "KODESATUAN", sortable: true, width: 80, hidden: false, filter: { xtype: "textfield" } },
          { header: "DOK ASAL", dataIndex: "KODEDOKUMENASAL", sortable: true, width: 80, hidden: false, filter: { xtype: "textfield" } },
          { header: "NODAFT ASAL", dataIndex: "NOMORDAFTARASAL", sortable: true, width: 100, hidden: false, filter: { xtype: "textfield" } },
          { header: "TGDAFT ASAL", dataIndex: "TANGGALDAFTARASAL", sortable: true, width: 100, hidden: false, filter: { xtype: "textfield" }, renderer: "formatDate" },
          { header: "AJU ASAL", dataIndex: "NOMORAJUASAL", sortable: true, width: 180, hidden: false, filter: { xtype: "textfield" } },
          { header: "SERIBARANG ASAL", dataIndex: "SERIBARANGASAL", sortable: true, width: 80, hidden: false, filter: { xtype: "textfield" } },
          { header: "HARGAPENYERAHAN ASAL", dataIndex: "HARGAPENYERAHAN", sortable: true, width: 150, hidden: false, filter: { xtype: "textfield" }, align: "right", renderer: "formatAmount", },

        ],
      },
    },
  ],
  columns: [
    { header: "Nomor Aju", dataIndex: "NOMORAJU", sortable: true, width: 150, hidden: true, filter: { xtype: "textfield" } },
    { header: "Seri Barang", dataIndex: "SERIBARANG", sortable: true, width: 70, hidden: false, filter: { xtype: "textfield" } },
    { header: "Uraian", dataIndex: "URAIAN", sortable: true, width: 100, hidden: false, filter: { xtype: "textfield" } },
    { header: "Tipe", dataIndex: "TIPE", sortable: true, width: 80, hidden: false, filter: { xtype: "textfield" } },
    { header: "Asuransi", dataIndex: "ASURANSI", sortable: true, width: 100, hidden: false, align: "right", renderer: "formatAmount", filter: { xtype: "textfield" } },
    { header: "Cif", dataIndex: "CIF", sortable: true, width: 100, hidden: false, align: "right", renderer: "formatAmount", filter: { xtype: "textfield" } },
    { header: "Cif Rupiah", dataIndex: "CIFRUPIAH", sortable: true, width: 100, hidden: false, align: "right", renderer: "formatAmount", filter: { xtype: "textfield" } },
    { header: "Harga Penyerahan", dataIndex: "HARGAPENYERAHAN", sortable: true, width: 110, hidden: false, align: "right", renderer: "formatAmount", filter: { xtype: "textfield" } },
    { header: "Harga Perolehan", dataIndex: "HARGAPEROLEHAN", sortable: true, width: 110, hidden: false, align: "right", renderer: "formatAmount", filter: { xtype: "textfield" } },
    { header: "Jumlah Kemasan", dataIndex: "JUMLAHKEMASAN", sortable: true, width: 100, hidden: false, align: "right", renderer: "formatAmount", filter: { xtype: "textfield" } },
    { header: "Jumlah Satuan", dataIndex: "JUMLAHSATUAN", sortable: true, width: 100, hidden: false, align: "right", renderer: "formatAmount", filter: { xtype: "textfield" } },
    { header: "Kode Dokumen", dataIndex: "KODEDOKUMEN", sortable: true, width: 110, hidden: false, filter: { xtype: "textfield" } },
    { header: "Kode Jenis Kemasan", dataIndex: "KODEJENISKEMASAN", sortable: true, width: 130, hidden: false, filter: { xtype: "textfield" } },
    { header: "Kode Negara Asal", dataIndex: "KODENEGARAASAL", sortable: true, width: 130, hidden: false, filter: { xtype: "textfield" } },
    { header: "Kode Satuan Barang", dataIndex: "KODESATUANBARANG", sortable: true, width: 130, hidden: false, filter: { xtype: "textfield" } },
    { header: "Kode Asal Barang", dataIndex: "KODEASALBARANG", sortable: true, width: 130, hidden: false, filter: { xtype: "textfield" } },
    { header: "Kode Asal Bahan Baku", dataIndex: "KODEASALBAHANBAKU", sortable: true, width: 130, hidden: false, filter: { xtype: "textfield" } },
    { header: "Netto", dataIndex: "NETTO", sortable: true, width: 100, hidden: false, align: "right", renderer: "formatAmount", filter: { xtype: "textfield" } },
    { header: "Nilai Barang", dataIndex: "NILAIBARANG", sortable: true, width: 100, hidden: false, align: "right", renderer: "formatAmount", filter: { xtype: "textfield" } },
    { header: "Nilai Jasa", dataIndex: "NILAIJASA", sortable: true, width: 100, hidden: false, align: "right", renderer: "formatAmount", filter: { xtype: "textfield" } },
    { header: "Uang Muka", dataIndex: "UANGMUKA", sortable: true, width: 100, hidden: false, align: "right", renderer: "formatAmount", filter: { xtype: "textfield" } },
    { header: "Pos Tarif", dataIndex: "POSTARIF", sortable: true, width: 100, hidden: false, filter: { xtype: "textfield" } },
    { header: "Ndpbm", dataIndex: "NDPBM", sortable: true, width: 80, hidden: false, align: "right", renderer: "formatAmount", filter: { xtype: "textfield" } },
    { header: "Ukuran", dataIndex: "UKURAN", sortable: true, width: 80, hidden: false, filter: { xtype: "textfield" } },
    { header: "Merek", dataIndex: "MREK", sortable: true, width: 80, hidden: false, filter: { xtype: "textfield" } },
    { header: "Spesifikasi Lain", dataIndex: "SPESIFIKASILAIN", sortable: true, width: 130, hidden: false, filter: { xtype: "textfield" } },
  ],
  bbar: {
    xtype: "pagingtoolbar",
    displayInfo: true,
    displayMsg: "Displaying topics {0} - {1} of {2}",
    emptyMsg: "No topics to display",
  },
});
