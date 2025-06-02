Ext.define("NJC.EXIM.bcout_41_aw.GRIDbarang", {
    extend: "Ext.grid.Panel",
    xtype: "GRIDbarang",
    pid: "GRIDbarang",
    emptyText: "No Matching Records",
    autoScroll: true,
    flex: 1,
    requires: [
      //
      "NJC.EXIM.bcout_41_aw.Cbcout_41_aw",
    ],
    controller: "Cbcout_41_aw",
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
        url: vconfig.service_api + "bcout_41_aw/bcout_41_aws",
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
            var FRM = Ext.ComponentQuery.query("FRMbcout_41_aw form")[0];
            var vdt = FRM.getValues(false, false, false, true);
            operation.setParams({
              method: "read_dokumen_barang",
              NOMOR_AJU: vdt.NOMOR_AJU,
              SERI_BARANG:vdt.SERI_BARANG
            });
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
              { name: "SERI_BARANG", type: "int" },
            ],
            proxy: {
              type: "ajax",
              disableCaching: false,
              noCache: false,
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
              actionMethods: { read: "POST" },
              url: vconfig.service_api + "bcout_41_aw/bcout_41_aws",
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
                  var FRM = Ext.ComponentQuery.query("FRMbcout_41_aw form")[0];
                  var GRIDbarang = Ext.ComponentQuery.query("GRIDbarang")[0];
                  var sm = GRIDbarang.getSelectionModel();
                  var rs = sm.getSelection()[0].data;
                  var vdt = FRM.getValues(false, false, false, true);
                  operation.setParams({
                    method: "read_dokumen_barang_tarif",
                    NOMOR_AJU: vdt.NOMORAJU,
                    SERI_BARANG: rs.SERI_BARANG,
                  });
                } catch (ex) {
                  COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                }
              },
            },
          },
          plugins: ["filterfield"],
          columns: [
            { header: "Seri Barang", dataIndex: "SERI_BARANG", sortable: true, width: 70, hidden: false, filter: { xtype: "textfield" } },
            { header: "JENIS TARIF", dataIndex: "JENIS_TARIF", sortable: true, width: 100, hidden: false, filter: { xtype: "textfield" } },
            { header: "KODE", dataIndex: "KODE_FASILITAS", sortable: true, width: 80, hidden: false, filter: { xtype: "textfield" } },
            { header: "NILAI FASILITAS", dataIndex: "NILAI_FASILITAS", sortable: true, width: 80, hidden: false, filter: { xtype: "textfield" } },
            { header: "TARIF", dataIndex: "TARIF", sortable: true, width: 80, hidden: false, filter: { xtype: "textfield" } },
            { header: "TARIF FASILITAS", dataIndex: "TARIF_FASILITAS", sortable: true, width: 80, hidden: false, filter: { xtype: "textfield" } },
          ],
        },
      },
    ],
    columns: [
      { header: "Seri Barang", dataIndex: "SERI_BARANG", sortable: true, width: 70, hidden: false, filter: { xtype: "textfield" } },
      { header: "Uraian", dataIndex: "URAIAN", sortable: true, width: 100, hidden: false, filter: { xtype: "textfield" } },
      { header: "Tipe", dataIndex: "TIPE", sortable: true, width: 80, hidden: false, filter: { xtype: "textfield" } },
      { header: "Asuransi", dataIndex: "ASURANSI", sortable: true, width: 100, hidden: false, align: "right", renderer: "formatAmount", filter: { xtype: "textfield" } },
      { header: "Cif", dataIndex: "CIF", sortable: true, width: 100, hidden: false, align: "right", renderer: "formatAmount", filter: { xtype: "textfield" } },
      { header: "Cif Rupiah", dataIndex: "CIF_RUPIAH", sortable: true, width: 100, hidden: false, align: "right", renderer: "formatAmount", filter: { xtype: "textfield" } },
      { header: "Harga Penyerahan", dataIndex: "HARGA_PENYERAHAN", sortable: true, width: 110, hidden: false, align: "right", renderer: "formatAmount", filter: { xtype: "textfield" } },
      { header: "Harga Perolehan", dataIndex: "HARGA_PEROLEHAN", sortable: true, width: 110, hidden: false, align: "right", renderer: "formatAmount", filter: { xtype: "textfield" } },
      { header: "Jumlah Kemasan", dataIndex: "JUMLAH_KEMASAN", sortable: true, width: 100, hidden: false, align: "right", renderer: "formatAmount", filter: { xtype: "textfield" } },
      { header: "Jumlah Satuan", dataIndex: "JUMLAH_SATUAN", sortable: true, width: 100, hidden: false, align: "right", renderer: "formatAmount", filter: { xtype: "textfield" } },
      { header: "Kode Dokumen", dataIndex: "KODE_DOKUMEN", sortable: true, width: 110, hidden: false, filter: { xtype: "textfield" } },
      { header: "Kode Jenis Kemasan", dataIndex: "KODE_JENIS_KEMASAN", sortable: true, width: 130, hidden: false, filter: { xtype: "textfield" } },
      { header: "Kode Negara Asal", dataIndex: "KODE_NEGARA_ASAL", sortable: true, width: 130, hidden: false, filter: { xtype: "textfield" } },
      { header: "Kode Satuan Barang", dataIndex: "KODE_SATUAN_BARANG", sortable: true, width: 130, hidden: false, filter: { xtype: "textfield" } },
      { header: "Kode Asal Barang", dataIndex: "KODE_ASAL_BARANG", sortable: true, width: 130, hidden: false, filter: { xtype: "textfield" } },
      { header: "Kode Asal Bahan Baku", dataIndex: "KODE_ASAL_BAHANBAKU", sortable: true, width: 130, hidden: false, filter: { xtype: "textfield" } },
      { header: "Netto", dataIndex: "NETTO", sortable: true, width: 100, hidden: false, align: "right", renderer: "formatAmount", filter: { xtype: "textfield" } },
      { header: "Nilai Barang", dataIndex: "NILAI_BARANG", sortable: true, width: 100, hidden: false, align: "right", renderer: "formatAmount", filter: { xtype: "textfield" } },
      { header: "Nilai Jasa", dataIndex: "NILAI_JASA", sortable: true, width: 100, hidden: false, align: "right", renderer: "formatAmount", filter: { xtype: "textfield" } },
      { header: "Uang Muka", dataIndex: "UANG_MUKA", sortable: true, width: 100, hidden: false, align: "right", renderer: "formatAmount", filter: { xtype: "textfield" } },
      { header: "Pos Tarif", dataIndex: "POS_TARIF", sortable: true, width: 100, hidden: false, filter: { xtype: "textfield" } },
      { header: "Ndpbm", dataIndex: "NDPBM", sortable: true, width: 80, hidden: false, align: "right", renderer: "formatAmount", filter: { xtype: "textfield" } },
      { header: "Ukuran", dataIndex: "UKURAN", sortable: true, width: 80, hidden: false, filter: { xtype: "textfield" } },
      { header: "Merek", dataIndex: "MREK", sortable: true, width: 80, hidden: false, filter: { xtype: "textfield" } },
      { header: "Spesifikasi Lain", dataIndex: "SPESIFIKASI_LAIN", sortable: true, width: 130, hidden: false, filter: { xtype: "textfield" } },
    ],
    bbar: {
      xtype: "pagingtoolbar",
      displayInfo: true,
      displayMsg: "Displaying topics {0} - {1} of {2}",
      emptyMsg: "No topics to display",
    },
  });
  