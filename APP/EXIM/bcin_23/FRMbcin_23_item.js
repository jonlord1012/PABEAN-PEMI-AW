var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.EXIM.bcin_23.FRMbcin_23_item", {
  extend: "Ext.window.Window",
  alias: "widget.FRMbcin_23_item",
  reference: "FRMbcin_23_item",
  title: "",
  modal: true,
  closeAction: "destroy",
  controller: "Cbcin_23",
  centered: true,
  //y: -110,
  bodyPadding: "5 5 5 5",
  width: mainpanel.getWidth() * 0.9,
  height: mainpanel.getHeight() * 0.8,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
  items: [
    {
      xtype: "form",
      bodyPadding: "5 5 5 5",
      fieldDefaults: {
        labelAlign: "left",
        labelWidth: 70,
        margin: "0 10 5 0",
      },
      border: false,
      items: [
        {
          xtype: "fieldset",
          title: "Deskripsi Barang",
          defaults: {
            anchor: "100%",
          },
          items: [
            {
              xtype: "container",
              layout: "hbox",
              items: [
                { xtype: "textfield", labelWidth: 100, width: 250, fieldLabel: "Kode Barang", name: "KODE_BARANG", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Kode" },

                { xtype: "textfield", labelWidth: 100, width: 250, fieldLabel: "Seri Barang", labelAlign: "right", name: "SERI_BARANG", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Kode" },
              ],
            },
            {
              xtype: "container",
              layout: "hbox",
              items: [
                { xtype: "textfield", labelWidth: 100, width: 250, fieldLabel: "Kategori", name: "KATEGORI_BARANG", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Kode" },
                { xtype: "textfield", labelWidth: 100, width: 250, fieldLabel: "POS Tarif", labelAlign: "right", name: "POS_TARIF", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Kode" },
              ],
            },
            {
              xtype: "container",
              layout: "hbox",
              flex: 1,
              items: [{ xtype: "textfield", labelWidth: 100, flex: 1, fieldLabel: "Nama Barang", name: "URAIAN", fieldCls: "fieldinput", readOnly: false, enforceMaxLength: true, emptyText: "Manual" }],
            },
            {
              xtype: "container",
              layout: "hbox",
              flex: 1,
              items: [
                { xtype: "textfield", labelWidth: 100, flex: 1, fieldLabel: "Merk", name: "MERK", fieldCls: "fieldinput", readOnly: false, enforceMaxLength: true, emptyText: "Manual" },
                { xtype: "textfield", labelWidth: 100, labelAlign: "right", flex: 1, fieldLabel: "Tipe", name: "TIPE", fieldCls: "fieldinput", readOnly: false, enforceMaxLength: true, emptyText: "Manual" },
                { xtype: "textfield", labelWidth: 100, labelAlign: "right", flex: 1, fieldLabel: "Ukuran", name: "UKURAN", fieldCls: "fieldinput", readOnly: false, enforceMaxLength: true, emptyText: "Manual" },
                { xtype: "textfield", labelWidth: 100, labelAlign: "right", flex: 1, fieldLabel: "Spf Lain", name: "SPESIFIKASI_LAIN", fieldCls: "fieldinput", readOnly: false, enforceMaxLength: true, emptyText: "Manual" },
                { xtype: "tbspacer", flex: 1 },
              ],
            },
          ],
        },
        {
          xtype: "container",
          layout: "hbox",
          items: [
            {
              xtype: "fieldset",
              title: "Harga Barang",
              items: [
                {
                  xtype: "container",
                  layout: "hbox",
                  items: [
                    { xtype: "currencyfield", labelWidth: 100, width: 250, fieldLabel: "Total Detail (FOB)", name: "FOB", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Kode" },
                    { xtype: "numberfield", labelWidth: 90, labelAlign: "right", width: 250, fieldLabel: "Harga Detail", name: "HARGA_BARANG_LDP", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Kode" },
                  ],
                },
                {
                  xtype: "container",
                  layout: "hbox",
                  items: [
                    { xtype: "currencyfield", labelWidth: 100, width: 250, fieldLabel: "BT-Diskon", name: "DISKON", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Kode" },
                    { xtype: "currencyfield", labelWidth: 90, labelAlign: "right", width: 250, fieldLabel: "Freight", name: "FREIGHT", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Kode" },
                  ],
                },
                {
                  xtype: "container",
                  layout: "hbox",
                  items: [
                    { xtype: "currencyfield", labelWidth: 100, width: 250, fieldLabel: "Jumlah Satuan", name: "JUMLAH_SATUAN", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Kode" },
                    { xtype: "currencyfield", labelWidth: 90, labelAlign: "right", width: 250, fieldLabel: "Asuransi", name: "ASURANSI", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Kode" },
                  ],
                },
                {
                  xtype: "container",
                  layout: "hbox",
                  items: [
                    { xtype: "textfield", labelWidth: 100, width: 250, fieldLabel: "Satuan", name: "KODE_SATUAN", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Kode" },

                    { xtype: "currencyfield", labelWidth: 90, labelAlign: "right", width: 250, fieldLabel: "Harga CIF", name: "CIF", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Kode" },
                  ],
                },
                {
                  xtype: "container",
                  layout: "hbox",
                  items: [
                    { xtype: "currencyfield", labelWidth: 100, width: 250, fieldLabel: "Harga Satuan", name: "HARGA_SATUAN", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Kode" },
                    { xtype: "currencyfield", labelWidth: 90, labelAlign: "right", width: 250, fieldLabel: "CIF (Rp)", name: "CIF_RUPIAH", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Kode" },
                  ],
                },
              ],
            },
            { xtype: "tbspacer", width: 10 },
            {
              xtype: "fieldset",
              title: "Kemasan",
              flex: 1,
              items: [
                {
                  xtype: "container",
                  layout: "hbox",
                  items: [{ xtype: "currencyfield", labelWidth: 100, width: 250, fieldLabel: "Jumlah", name: "JUMLAH_KEMASAN", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Kode" }],
                },
                {
                  xtype: "container",
                  layout: "hbox",
                  items: [{ xtype: "textfield", labelWidth: 100, width: 250, fieldLabel: "Jenis", name: "KODE_KEMASAN", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Kode" }],
                },
                {
                  xtype: "container",
                  layout: "hbox",
                  items: [{ xtype: "currencyfield", labelWidth: 100, width: 250, fieldLabel: "Netto", name: "NETTO", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Kode" }],
                },
                {
                  xtype: "container",
                  layout: "hbox",
                  items: [{ xtype: "textfield", labelWidth: 100, width: 250, fieldLabel: "Negara Asal", name: "KODE_NEGARA_ASAL", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Kode" }],
                },
              ],
            },
          ],
        },
        {
          xtype: "container",
          layout: "hbox",
          items: [
            {
              xtype: "fieldset",
              title: "Tarif & Fasilitas",
              items: [
                {
                  xtype: "container",
                  layout: "hbox",
                  items: [
                    { xtype: "currencyfield", labelWidth: 100, width: 180, fieldLabel: "BM", name: "TARIF_BM", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "TARIF" },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            {
                              xtype: "combobox",
                              name: "KODE_FASILITAS_BM",
                              fieldLabel: "%  ",
                              labelWidth: 25,
                              width: 300,
                              displayField: "MERGE",
                              valueField: "KODE_FASILITAS_BM",
                              fieldCls: "fieldinput",
                              allowBlank: false,
                              queryMode: "local",
                              forceSelection: true,
                              typeAhead: true,
                              minChars: 0,
                              anyMatch: true,
                              store: new Ext.data.Store({
                                data: [
                                  { KODE_FASILITAS_BM: "", KODE_FASILITAS_BMNAME: "-", MERGE: "-" },
                                  { KODE_FASILITAS_BM: "0", KODE_FASILITAS_BMNAME: "DIBAYAR", MERGE: "0 - DIBAYAR" },
                                  { KODE_FASILITAS_BM: "1", KODE_FASILITAS_BMNAME: "DITANGGUNG PEMERINTAH", MERGE: "1 - DITANGGUNG PEMERINTAH" },
                                  { KODE_FASILITAS_BM: "2", KODE_FASILITAS_BMNAME: "DITANGGUHKAN", MERGE: "2 - DITANGGUHKAN" },
                                  { KODE_FASILITAS_BM: "3", KODE_FASILITAS_BMNAME: "BERKALA", MERGE: "3 - BERKALA" },
                                  { KODE_FASILITAS_BM: "4", KODE_FASILITAS_BMNAME: "DIBEBASKAN", MERGE: "4 - DIBEBASKAN" },
                                  { KODE_FASILITAS_BM: "5", KODE_FASILITAS_BMNAME: "TIDAK DIPUNGUT", MERGE: "5 - TIDAK DIPUNGUT" },
                                  { KODE_FASILITAS_BM: "6", KODE_FASILITAS_BMNAME: "SUDAH DILUNASI", MERGE: "6 - SUDAH DILUNASI" },
                                  { KODE_FASILITAS_BM: "7", KODE_FASILITAS_BMNAME: "DIJAMINKAN", MERGE: "7 - DIJAMINKAN" },
                                ],
                              }),
                            },
                          ],
                        },
                      ],
                    },
                    /*{ xtype: "textfield", width: 200, name: "KODE_FASILITAS_BM", readOnly: true, enforceMaxLength: true, fieldCls: "fieldinput", emptyText: "KODE FASILITAS", value: "2-DITANGGUHKAN" },*/
                    { xtype: "currencyfield", width: 200, name: "NILAI_FASILITAS_BM", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "NILAI FASILITAS" },
                  ],
                },
                {
                  xtype: "container",
                  layout: "hbox",
                  items: [
                    { xtype: "currencyfield", labelWidth: 100, width: 180, fieldLabel: "PPN", name: "TARIF_PPN", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "TARIF" },
                    /*{ xtype: "textfield", width: 200, name: "KODE_FASILITAS_PPN", readOnly: true, enforceMaxLength: true, fieldCls: "fieldinput", emptyText: "Nilai", value: "5-TIDAK DIPUNGUT" },*/
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            {
                              xtype: "combobox",
                              name: "KODE_FASILITAS_PPN",
                              fieldLabel: "%  ",
                              labelWidth: 25,
                              width: 300,
                              displayField: "MERGE",
                              valueField: "KODE_FASILITAS_PPN",
                              fieldCls: "fieldinput",
                              allowBlank: false,
                              queryMode: "local",
                              forceSelection: true,
                              typeAhead: true,
                              minChars: 0,
                              anyMatch: true,
                              store: new Ext.data.Store({
                                data: [
                                  { KODE_FASILITAS_PPN: "", KODE_FASILITAS_PPNNAME: "-", MERGE: "-" },
                                  { KODE_FASILITAS_PPN: "0", KODE_FASILITAS_PPNNAME: "DIBAYAR", MERGE: "0 - DIBAYAR" },
                                  { KODE_FASILITAS_PPN: "1", KODE_FASILITAS_PPNNAME: "DITANGGUNG PEMERINTAH", MERGE: "1 - DITANGGUNG PEMERINTAH" },
                                  { KODE_FASILITAS_PPN: "2", KODE_FASILITAS_PPNNAME: "DITANGGUHKAN", MERGE: "2 - DITANGGUHKAN" },
                                  { KODE_FASILITAS_PPN: "3", KODE_FASILITAS_PPNNAME: "BERKALA", MERGE: "3 - BERKALA" },
                                  { KODE_FASILITAS_PPN: "4", KODE_FASILITAS_PPNNAME: "DIBEBASKAN", MERGE: "4 - DIBEBASKAN" },
                                  { KODE_FASILITAS_PPN: "5", KODE_FASILITAS_PPNNAME: "TIDAK DIPUNGUT", MERGE: "5 - TIDAK DIPUNGUT" },
                                  { KODE_FASILITAS_PPN: "6", KODE_FASILITAS_PPNNAME: "SUDAH DILUNASI", MERGE: "6 - SUDAH DILUNASI" },
                                  { KODE_FASILITAS_PPN: "7", KODE_FASILITAS_PPNNAME: "DIJAMINKAN", MERGE: "7 - DIJAMINKAN" },
                                ],
                              }),
                            },
                          ],
                        },
                      ],
                    },                    
                    { xtype: "currencyfield", width: 200, name: "NILAI_FASILITAS_PPN", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "NILAI FASILITAS" },
                  ],
                },
                {
                  xtype: "container",
                  layout: "hbox",
                  items: [
                    { xtype: "currencyfield", labelWidth: 100, width: 180, fieldLabel: "PPnBM", name: "dokumen_kode", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "TARIF" },
                    /*{ xtype: "textfield", width: 200, name: "dokumen_kode", readOnly: true, enforceMaxLength: true, emptyText: "Nilai", value: "" },*/
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            {
                              xtype: "combobox",
                              name: "KODE_FASILITAS_PPnBM",
                              fieldLabel: "%  ",
                              labelWidth: 25,
                              width: 300,
                              displayField: "MERGE",
                              valueField: "KODE_FASILITAS_PPnBM",
                              fieldCls: "fieldinput",
                              allowBlank: false,
                              queryMode: "local",
                              forceSelection: true,
                              typeAhead: true,
                              minChars: 0,
                              anyMatch: true,
                              store: new Ext.data.Store({
                                data: [
                                  { KODE_FASILITAS_PPnBM: "", KODE_FASILITAS_PPnBMNAME: "-", MERGE: "-" },
                                  { KODE_FASILITAS_PPnBM: "0", KODE_FASILITAS_PPnBMNAME: "DIBAYAR", MERGE: "0 - DIBAYAR" },
                                  { KODE_FASILITAS_PPnBM: "1", KODE_FASILITAS_PPnBMNAME: "DITANGGUNG PEMERINTAH", MERGE: "1 - DITANGGUNG PEMERINTAH" },
                                  { KODE_FASILITAS_PPnBM: "2", KODE_FASILITAS_PPnBMNAME: "DITANGGUHKAN", MERGE: "2 - DITANGGUHKAN" },
                                  { KODE_FASILITAS_PPnBM: "3", KODE_FASILITAS_PPnBMNAME: "BERKALA", MERGE: "3 - BERKALA" },
                                  { KODE_FASILITAS_PPnBM: "4", KODE_FASILITAS_PPnBMNAME: "DIBEBASKAN", MERGE: "4 - DIBEBASKAN" },
                                  { KODE_FASILITAS_PPnBM: "5", KODE_FASILITAS_PPnBMNAME: "TIDAK DIPUNGUT", MERGE: "5 - TIDAK DIPUNGUT" },
                                  { KODE_FASILITAS_PPnBM: "6", KODE_FASILITAS_PPnBMNAME: "SUDAH DILUNASI", MERGE: "6 - SUDAH DILUNASI" },
                                  { KODE_FASILITAS_PPnBM: "7", KODE_FASILITAS_PPnBMNAME: "DIJAMINKAN", MERGE: "7 - DIJAMINKAN" },
                                ],
                              }),
                            },
                          ],
                        },
                      ],
                    }, 
                    { xtype: "currencyfield", width: 200, name: "NILAI_FASILITAS_PPnBM", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "NILAI FASILITAS" },
                  ],
                },
                {
                  xtype: "container",
                  layout: "hbox",
                  items: [
                    { xtype: "currencyfield", labelWidth: 100, width: 180, fieldLabel: "PPh", name: "TARIF_PPH", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "TARIF" },
                    /*{ xtype: "textfield", width: 200, name: "KODE_FASILITAS_PPH", readOnly: true, enforceMaxLength: true, fieldCls: "fieldinput", emptyText: "Nilai", value: "5-TIDAK DIPUNGUT" },*/
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            {
                              xtype: "combobox",
                              name: "KODE_FASILITAS_PPH",
                              fieldLabel: "%  ",
                              labelWidth: 25,
                              width: 300,
                              displayField: "MERGE",
                              valueField: "KODE_FASILITAS_PPH",
                              fieldCls: "fieldinput",
                              allowBlank: false,
                              queryMode: "local",
                              forceSelection: true,
                              typeAhead: true,
                              minChars: 0,
                              anyMatch: true,
                              store: new Ext.data.Store({
                                data: [
                                  { KODE_FASILITAS_PPH: "", KODE_FASILITAS_PPHNAME: "-", MERGE: "-" },
                                  { KODE_FASILITAS_PPH: "0", KODE_FASILITAS_PPHNAME: "DIBAYAR", MERGE: "0 - DIBAYAR" },
                                  { KODE_FASILITAS_PPH: "1", KODE_FASILITAS_PPHNAME: "DITANGGUNG PEMERINTAH", MERGE: "1 - DITANGGUNG PEMERINTAH" },
                                  { KODE_FASILITAS_PPH: "2", KODE_FASILITAS_PPHNAME: "DITANGGUHKAN", MERGE: "2 - DITANGGUHKAN" },
                                  { KODE_FASILITAS_PPH: "3", KODE_FASILITAS_PPHNAME: "BERKALA", MERGE: "3 - BERKALA" },
                                  { KODE_FASILITAS_PPH: "4", KODE_FASILITAS_PPHNAME: "DIBEBASKAN", MERGE: "4 - DIBEBASKAN" },
                                  { KODE_FASILITAS_PPH: "5", KODE_FASILITAS_PPHNAME: "TIDAK DIPUNGUT", MERGE: "5 - TIDAK DIPUNGUT" },
                                  { KODE_FASILITAS_PPH: "6", KODE_FASILITAS_PPHNAME: "SUDAH DILUNASI", MERGE: "6 - SUDAH DILUNASI" },
                                  { KODE_FASILITAS_PPH: "7", KODE_FASILITAS_PPHNAME: "DIJAMINKAN", MERGE: "7 - DIJAMINKAN" },
                                ],
                              }),
                            },
                          ],
                        },
                      ],
                    }, 
                    { xtype: "currencyfield", width: 200, name: "NILAI_FASILITAS_PPH", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "NILAI FASILITAS" },
                  ],
                },
              ],
            },
            {
              xtype: "container",
              flex: 1,
            },
          ],
        },
      ],
    },
  ],
  listeners: {
    afterrender: "FRMbcin_23_item_load",
  },
});
