var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.EXIM.bcin_ppb.FRMbcin_ppb_item", {
  extend: "Ext.window.Window",
  alias: "widget.FRMbcin_ppb_item",
  reference: "FRMbcin_ppb_item",
  title: "",
  modal: true,
  closeAction: "destroy",
  controller: "Cbcin_ppb",
  centered: true,
  autoScroll: true,
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
                    { xtype: "numberfield", labelWidth: 100, width: 250, fieldLabel: "Total Detail (FOB)", name: "FOB", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Kode" },
                    { xtype: "numberfield", labelWidth: 90, labelAlign: "right", width: 250, fieldLabel: "Harga Detail", name: "HARGA_BARANG_LDP", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Kode" },
                  ],
                },
                {
                  xtype: "container",
                  layout: "hbox",
                  items: [
                    { xtype: "numberfield", labelWidth: 100, width: 250, fieldLabel: "BT-Diskon", name: "DISKON", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Kode" },
                    { xtype: "numberfield", labelWidth: 90, labelAlign: "right", width: 250, fieldLabel: "Freight", name: "FREIGHT", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Kode" },
                  ],
                },
                {
                  xtype: "container",
                  layout: "hbox",
                  items: [
                    { xtype: "numberfield", labelWidth: 100, width: 250, fieldLabel: "Jumlah Satuan", name: "JUMLAH_SATUAN", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Kode" },
                    { xtype: "numberfield", labelWidth: 90, labelAlign: "right", width: 250, fieldLabel: "Asuransi", name: "ASURANSI", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Kode" },
                  ],
                },
                {
                  xtype: "container",
                  layout: "hbox",
                  items: [
                    { xtype: "textfield", labelWidth: 100, width: 250, fieldLabel: "Satuan", name: "KODE_SATUAN", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Kode" },

                    { xtype: "textfield", labelWidth: 68, labelAlign: "right", width: 250, fieldLabel: "Harga CIF", name: "CIF", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Kode" },
                  ],
                },
                {
                  xtype: "container",
                  layout: "hbox",
                  items: [
                    { xtype: "textfield", labelWidth: 100, width: 250, fieldLabel: "Harga Satuan", name: "HARGA_SATUAN", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Kode" },
                    { xtype: "textfield", labelWidth: 90, labelAlign: "right", width: 250, fieldLabel: "CIF (Rp)", name: "CIF_RUPIAH", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Kode" },
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
                  items: [{ xtype: "textfield", labelWidth: 100, width: 250, fieldLabel: "Jumlah", name: "JUMLAH_KEMASAN", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Kode" }],
                },
                {
                  xtype: "container",
                  layout: "hbox",
                  items: [{ xtype: "textfield", labelWidth: 100, width: 250, fieldLabel: "Jenis", name: "KODE_KEMASAN", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Kode" }],
                },
                {
                  xtype: "container",
                  layout: "hbox",
                  items: [{ xtype: "textfield", labelWidth: 100, width: 250, fieldLabel: "Netto", name: "NETTO", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Kode" }],
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
                    { xtype: "textfield", labelWidth: 100, width: 180, fieldLabel: "BM", name: "dokumen_kode", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Kode" },
                    { xtype: "textfield", width: 200, name: "dokumen_kode", readOnly: true, enforceMaxLength: true, emptyText: "Nilai", value: "2-DITANGGUHKAN" },
                    { xtype: "textfield", width: 200, name: "dokumen_kode", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Nilai" },
                  ],
                },
                {
                  xtype: "container",
                  layout: "hbox",
                  items: [
                    { xtype: "textfield", labelWidth: 100, width: 180, fieldLabel: "PPN", name: "dokumen_kode", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Kode" },
                    { xtype: "textfield", width: 200, name: "dokumen_kode", readOnly: true, enforceMaxLength: true, emptyText: "Nilai", value: "5-TIDAK DIPUNGUT" },
                    { xtype: "textfield", width: 200, name: "dokumen_kode", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Nilai" },
                  ],
                },
                {
                  xtype: "container",
                  layout: "hbox",
                  items: [
                    { xtype: "textfield", labelWidth: 100, width: 180, fieldLabel: "PPnBM", name: "dokumen_kode", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Kode" },
                    { xtype: "textfield", width: 200, name: "dokumen_kode", readOnly: true, enforceMaxLength: true, emptyText: "Nilai", value: "5-TIDAK DIPUNGUT" },
                    { xtype: "textfield", width: 200, name: "dokumen_kode", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Nilai" },
                  ],
                },
                {
                  xtype: "container",
                  layout: "hbox",
                  items: [
                    { xtype: "textfield", labelWidth: 100, width: 180, fieldLabel: "PPh", name: "dokumen_kode", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Kode" },
                    { xtype: "textfield", width: 200, name: "dokumen_kode", readOnly: true, enforceMaxLength: true, emptyText: "Nilai", value: "5-TIDAK DIPUNGUT" },
                    { xtype: "textfield", width: 200, name: "dokumen_kode", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Nilai" },
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
    afterrender: "FRMbcin_ppb_item_load",
  },
});
