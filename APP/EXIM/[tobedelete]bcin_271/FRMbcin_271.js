var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.EXIM.bcin_271.FRMbcin_271", {
  extend: "Ext.window.Window",
  alias: "widget.FRMbcin_271",
  reference: "FRMbcin_271",
  title: "Header Dokumen BC 271",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: true,
  controller: "Cbcin_271",
  //y: -110,
  bodyPadding: "5 5 5 5",
  width: mainpanel.getWidth() * 0.98,
  height: mainpanel.getHeight() * 0.9,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
  items: [
    {
      xtype: "form",
      frame: false,
      border: false,
      fieldDefaults: {
        labelAlign: "left",
        labelWidth: 70,
        margin: "0 10 5 0",
      },
      items: [
        {
          xtype: "container",
          layout: "hbox",
          bodyPadding: "5 0 0 5",
          items: [
            {
              xtype: "fieldset",
              title: "BC 27",
              width: "100%",
              bodyPadding: "5 0 0 0",
              items: [
                {
                  xtype: "container",
                  layout: "hbox",
                  bodyPadding: "5 0 0 5",
                  items: [
                    { xtype: "textfield", fieldLabel: "STATUS", name: "URAIAN_STATUS", labelWidth: 50, width: 400, fieldCls: "fieldlock", readOnly: true },
                    { xtype: "tbspacer", width: 100 },
                    { xtype: "textfield", fieldLabel: "SUMBER DOKUMEN", name: "MODE_SOURCE", labelWidth: 100, width: 300, fieldCls: "fieldlock", readOnly: true },
                    { xtype: "numberfield", fieldLabel: "DOKUMEN ID", name: "ID_HEADER_ORI", labelWidth: 100, labelAlign: "right", width: 200, fieldCls: "fieldlock", value: 0, readOnly: true },
                  ],
                },
              ],
            },
          ],
        },

        {
          xtype: "container",
          layout: "hbox",
          bodyPadding: "5 0 0 5",
          items: [
            {
              xtype: "fieldset",
              layout: "hbox",
              width: 600,
              bodyPadding: "5 0 0 0",
              items: [
                {
                  xtype: "container",
                  layout: "vbox",
                  margin: "5 0 0 0",
                  items: [
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "NOMOR AJU", name: "NOMOR_AJU", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "datefield", labelWidth: 50, width: 170, fieldLabel: "TGL", name: "TANGGAL_AJU", fieldCls: "fieldinput", format: "Y-m-d", readOnly: false },
                      ],
                    },

                    { xtype: "tbspacer", width: 100 },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 130, width: 200, fieldLabel: "A.1. KANTOR ASAL", name: "KODE_KANTOR", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "textfield", width: 200, name: "KODE_KANTORNAME", fieldCls: "fieldlock", readOnly: true },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          vdata: {
                            modulename: "kantorasal",
                            title: "Pilih Kantor Asal",
                            popupwidth: 0.26,
                            popupheight: 0.85,
                          },
                          icon: vconfig.getstyle + "icon/search.ico",
                          tooltip: "search",
                        },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 130, width: 200, fieldLabel: "A.2. KANTOR TUJUAN", name: "KODE_KANTOR_TUJUAN", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "textfield", width: 200, name: "KODE_KANTOR_TUJUANNAME", fieldCls: "fieldlock", readOnly: true },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          vdata: {
                            modulename: "kantortujuan",
                            title: "Pilih Kantor Tujuan",
                            popupwidth: 0.26,
                            popupheight: 0.85,
                          },
                          icon: vconfig.getstyle + "icon/search.ico",
                          tooltip: "search",
                        },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 130, width: 200, fieldLabel: "B. JENIS TPB ASAL", name: "KODE_JENIS_TPB", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "textfield", width: 200, name: "KODE_JENIS_TPBNAME", fieldCls: "fieldlock", readOnly: true },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          vdata: {
                            modulename: "tpbasal",
                            title: "Pilih Jenis TPB Asal",
                            popupwidth: 0.37,
                            popupheight: 0.5,
                          },
                          icon: vconfig.getstyle + "icon/search.ico",
                          tooltip: "search",
                        },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 130, width: 200, fieldLabel: "C. JENIS TPB TUJUAN", name: "KODE_TUJUAN_TPB", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "textfield", width: 200, name: "KODE_TUJUAN_TPBNAME", fieldCls: "fieldlock", readOnly: true },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          vdata: {
                            modulename: "tpbtujuan",
                            title: "Pilih Jenis TPB Tujuan",
                            popupwidth: 0.37,
                            popupheight: 0.5,
                          },
                          icon: vconfig.getstyle + "icon/search.ico",
                          tooltip: "search",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            { xtype: "tbspacer", width: 10 },
            {
              xtype: "fieldset",
              layout: "vbox",
              bodyPadding: "5 0 0 0",
              items: [
                {
                  xtype: "fieldset",
                  layout: "hbox",
                  flex: 1,
                  bodyPadding: "5 0 0 0",
                  items: [
                    {
                      xtype: "container",
                      layout: "vbox",
                      margin: "5 0 0 0",
                      items: [
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "textfield", labelWidth: 130, width: 200, fieldLabel: "D. TUJUAN PENGIRIMAN", name: "KODE_TUJUAN_PENGIRIMAN", fieldCls: "fieldinput", readOnly: true },
                            { xtype: "textfield", width: 200, name: "KODE_TUJUAN_PENGIRIMANNAME", fieldCls: "fieldlock", readOnly: true },
                            {
                              xtype: "button",
                              pid: "btsearch",
                              vdata: {
                                modulename: "tujuanpengiriman27",
                                title: "Pilih Tujuan Pengiriman",
                                popupwidth: 0.37,
                                popupheight: 0.5,
                              },
                              icon: vconfig.getstyle + "icon/search.ico",
                              tooltip: "search",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },

                { xtype: "tbspacer", width: 100 },
                {
                  xtype: "fieldset",
                  layout: "vbox",
                  title: "G. KOLOM KHUSUS BEA DAN CUKAI",
                  flex: 1,
                  bodyPadding: "5 0 0 0",
                  items: [
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "NOMOR DAFTAR", name: "NOMOR_DAFTAR", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "datefield", labelWidth: 50, width: 170, fieldLabel: "TGL", name: "TANGGAL_DAFTAR", fieldCls: "fieldinput", format: "Y-m-d", readOnly: false },
                      ],
                    },
                  ],
                },
              ],
            },

          ],
        },
        {
          xtype: "container",
          flex: 1,
          layout: "hbox",
          bodyPadding: "5 0 0 5",
          items: [
            {
              xtype: "container",
              layout: "vbox",
              width: 600,
              margin: "5 10 0 0",
              items: [
                {
                  xtype: "fieldset",
                  title: "TPB Asal Barang",
                  width: "100%",
                  bodyPadding: "5 0 0 0",
                  items: [
                    {
                      xtype: "container",
                      layout: "vbox",
                      margin: "5 0 0 0",
                      items: [
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [{ xtype: "textfield", labelWidth: 130, width: 420, fieldLabel: "1. Identitas (NPWP)", name: "ID_PENGUSAHA", fieldCls: "fieldlock", readOnly: true }],
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "textfield", labelWidth: 130, width: 200, fieldLabel: "2. Nama", name: "KODE_ID_PENGUSAHA", fieldCls: "fieldinput", readOnly: true },
                            { xtype: "textfield", width: 300, name: "NAMA_PENGUSAHA", fieldCls: "fieldinput", readOnly: true },
                          ],
                        },
                        {
                          xtype: "container",
                          layout: "vbox",
                          margin: "5 0 0 0",
                          items: [
                            { xtype: "textfield", labelWidth: 130, width: 510, labelAlign: "left", fieldLabel: "3. Alamat", name: "ALAMAT_PENGUSAHA", fieldCls: "fieldlock", readOnly: true },
                            { xtype: "textfield", labelWidth: 130, width: 420, labelAlign: "left", fieldLabel: "4. Nomor Izin", name: "NOMOR_IJIN_TPB", fieldCls: "fieldlock", readOnly: true },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  xtype: "fieldset",
                  title: "TPB Tujuan Barang",
                  layout: "vbox",
                  width: "100%",
                  bodyPadding: "5 0 0 0",
                  items: [
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [{ xtype: "textfield", labelWidth: 130, width: 420, fieldLabel: "5. Identitas (NPWP)", name: "ID_PENERIMA_BARANG", fieldCls: "fieldlock", readOnly: true }],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 130, width: 200, fieldLabel: "6. Nama", name: "KODE_ID_PENERIMA_BARANG", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "textfield", width: 300, name: "NAMA_PENERIMA_BARANG", fieldCls: "fieldinput", readOnly: true },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "vbox",
                      margin: "5 0 0 0",
                      items: [
                        { xtype: "textfield", labelWidth: 130, width: 510, labelAlign: "left", fieldLabel: "7. Alamat", name: "ALAMAT_PENERIMA_BARANG", fieldCls: "fieldlock", readOnly: true },
                        { xtype: "textfield", labelWidth: 130, width: 420, labelAlign: "left", fieldLabel: "8. Nomor Izin", name: "NOMOR_IJIN_TPB_PENERIMA", fieldCls: "fieldlock", readOnly: true },
                      ],
                    },
                  ],
                },
                {
                  xtype: "fieldset",
                  title: "Dokumen Pelengkap Pabean",
                  layout: "vbox",
                  width: "100%",
                  bodyPadding: "5 0 0 0",
                  items: [
                    {
                      xtype: "container",
                      layout: "vbox",
                      margin: "5 0 0 0",
                      items: [
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "textfield", labelWidth: 130, width: 350, fieldLabel: "9. Invoice", name: "INVOICE_NOMOR_DOKUMEN", fieldCls: "fieldinput", readOnly: true },
                            { xtype: "datefield", width: 100, name: "INVOICE_TANGGAL_DOKUMEN", fieldCls: "fieldinput", format: "Y-m-d", readOnly: true },
                          ],
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "textfield", labelWidth: 130, width: 350, fieldLabel: "10. Packing List", name: "NOMOR_PACKING_LIST", fieldCls: "fieldinput", readOnly: true },
                            { xtype: "datefield", width: 100, name: "PACKING_LIST_TANGGAL_DOKUMEN", fieldCls: "fieldinput", format: "Y-m-d", readOnly: true },
                          ],
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "textfield", labelWidth: 130, width: 350, fieldLabel: "11. Kontrak", name: "", fieldCls: "fieldinput", readOnly: true },
                            { xtype: "datefield", width: 100, name: "", fieldCls: "fieldinput", format: "Y-m-d", readOnly: true },
                          ],
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "textfield", labelWidth: 130, width: 350, fieldLabel: "12. Surat Jalan", name: "", fieldCls: "fieldinput", readOnly: true },
                            { xtype: "datefield", width: 100, name: "", fieldCls: "fieldinput", format: "Y-m-d", readOnly: true },
                          ],
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "textfield", labelWidth: 130, width: 350, fieldLabel: "13. SKEP", name: "", fieldCls: "fieldinput", readOnly: true },
                            { xtype: "datefield", width: 100, name: "", fieldCls: "fieldinput", format: "Y-m-d", readOnly: true },
                          ],
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            {
                              xtype: "grid",
                              pid: "GRIDbcin_271_input_dokumen",
                              emptyText: "No Matching Records",
                              width: 575,
                              height: 300,
                              plugins: ["filterfield", { ptype: "cellediting", clicksToEdit: 1 }],
                              viewConfig: {
                                enableTextSelection: true,
                              },
                              store: {
                                autoLoad: false,
                                autoSync: false,
                                remoteSort: false,
                                remoteFilter: false,
                                proxy: {
                                  type: "localstorage",
                                },
                              },
                              columns: [
                                { xtype: "rownumberer", width: 40 },
                                { header: "KODE", dataIndex: "KODE_JENIS_DOKUMEN", sortable: true, width: 50, filter: { xtype: "textfield" } },
                                {
                                  header: "NOMOR",
                                  dataIndex: "NOMOR_DOKUMEN",
                                  sortable: true,
                                  width: 150,
                                  filter: { xtype: "textfield" },
                                  editor: {
                                    xtype: "textfield",
                                    allowBlank: false,
                                  },
                                },
                                {
                                  header: "TGL",
                                  dataIndex: "TANGGAL_DOKUMEN",
                                  sortable: true,
                                  width: 90,
                                  filter: { xtype: "textfield" },
                                  editor: {
                                    xtype: "datefield",
                                    allowBlank: false,
                                    format: "Y-m-d",
                                  },
                                  renderer: function (val) {
                                    return moment(val).format("YYYY-MM-DD");
                                  },
                                },
                                { header: "URAIAN", dataIndex: "URAIAN_DOKUMEN", sortable: true, flex: 1, filter: { xtype: "textfield" } },
                                {
                                  xtype: "actioncolumn",
                                  width: 25,
                                  menuDisabled: true,
                                  sortable: false,
                                  items: [
                                    {
                                      icon: vconfig.getstyle + "icon/delete.ico",
                                      handler: function (grid, rowIndex, colIndex) {
                                        grid.getSelectionModel().select(rowIndex);
                                        var vdt = grid.getSelectionModel().getSelection()[0].data;
                                        console.log(vdt.KODE_JENIS_DOKUMEN);
                                        if (vdt.KODE_JENIS_DOKUMEN !== "380") {
                                          grid.getStore().removeAt(rowIndex);
                                        }
                                      },
                                    },
                                  ],
                                },
                              ],
                              listeners: {
                                beforeedit: function (grid, e) {
                                  if (e.record.data.KODE_JENIS_DOKUMEN === "380") {
                                    e.cancel = true;
                                  }
                                },
                              },
                              tbar: [
                                {
                                  xtype: "button",
                                  pid: "bttambah_dokumen",
                                  text: "14. Input Dokumen",
                                  module: "module_input_dokumen",
                                  icon: vconfig.getstyle + "icon/new.ico",
                                  tooltip: "Input dokumen/lampiran",
                                  handler: "bttambah_dokumen_click",
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  xtype: "fieldset",
                  title: "SEGEL (DIISI OLEH BEA DAN CUKAI)",
                  layout: "vbox",
                  flex: 1,
                  width: "100%",
                  bodyPadding: "5 0 0 0",
                  items: [
                    {
                      xtype: "container",
                      layout: "vbox",
                      margin: "5 0 0 0",
                      items: [
                        {
                          xtype: "textfield", labelWidth: 130, width: 350, fieldLabel: "21. No. Segel", name: "NOMOR_SEGEL", fieldCls: "fieldinput", readOnly: false, emptyText: "",
                        },
                        {
                          xtype: "textfield", labelWidth: 130, width: 350, fieldLabel: "22. Jenis", name: "JENIS_SEGEL", fieldCls: "fieldinput", readOnly: false, emptyText: "",
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          title: "23. Catatan BC Tujuan",
                          items: [
                            { xtype: "textfield", labelWidth: 130, width: 300, fieldLabel: "23. Catatan BC Tujuan", name: "NPPPJK", fieldCls: "fieldinput", readOnly: false, emptyText: "NPPJK", },
                            { xtype: "textfield", labelWidth: 130, width: 250, fieldLabel: "", name: "NAMA_PPJK", fieldCls: "fieldinput", readOnly: false, emptyText: "NAMA PPJK", },
                          ],
                        },

                      ],
                    },
                  ],
                },
                {
                  xtype: "fieldset",
                  title: "Dengan ini saya menyatakan bertanggung jawab atas kebenaran hal-hal yang diberitahukan dalam dokumen ini.",
                  layout: "vbox",
                  flex: 1,
                  width: "100%",
                  bodyPadding: "5 0 0 0",
                  items: [
                    {
                      xtype: "container",
                      layout: "vbox",
                      margin: "5 0 0 0",
                      items: [
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "textfield", labelWidth: 100, width: 150, fieldLabel: "", name: "KOTA_TTD", fieldCls: "fieldinput", readOnly: true, emptyText: "" },
                            { xtype: "datefield", labelWidth: 100, width: 150, fieldLabel: "", name: "TANGGAL_TTD", fieldCls: "fieldinput", format: "Y-m-d", readOnly: true },
                          ],
                        },
                        { xtype: "textfield", labelWidth: 130, width: 350, fieldLabel: "Pemberitahun", name: "NAMA_TTD", fieldCls: "fieldinput", readOnly: true, emptyText: "" },
                        { xtype: "textfield", labelWidth: 130, width: 350, fieldLabel: "Jabatan", name: "JABATAN_TTD", fieldCls: "fieldinput", readOnly: true, emptyText: "" },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              xtype: "container",
              layout: "vbox",
              flex: 1,
              margin: "5 0 0 0",
              items: [
                {
                  xtype: "fieldset",
                  title: "DATA PERDAGANGAN",
                  width: "100%",
                  bodyPadding: "5 0 0 0",
                  items: [
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 130, width: 200, fieldLabel: "16. Valuta", name: "KODE_VALUTA", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "textfield", width: 140, name: "KODE_VALUTA_NAME", fieldCls: "fieldinput", readOnly: true },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          vdata: {
                            modulename: "valuta",
                            title: "Pilih Valuta",
                            popupwidth: 0.26,
                            popupheight: 0.85,
                          },
                          icon: vconfig.getstyle + "icon/search.ico",
                          tooltip: "search",
                        },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 130, width: 350, fieldLabel: "17. CIF", name: "CIF", fieldCls: "fieldinput", readOnly: true },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 130, width: 350, fieldLabel: "18. Harga Penyerahan", name: "HARGA_PENYERAHAN", fieldCls: "fieldinput", readOnly: true },
                      ],
                    },
                  ]
                },
                {
                  xtype: "fieldset",
                  title: "DATA PENGANGKUTAN",
                  width: "100%",
                  bodyPadding: "5 0 0 0",
                  items: [
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 205, width: 350, fieldLabel: "19. Jenis Sarana Pengangkut Darat", name: "NAMA_PENGANGKUT", fieldCls: "fieldinput", readOnly: true },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 130, width: 350, fieldLabel: "20. No. Polisi", name: "NOMOR_POLISI", fieldCls: "fieldinput", readOnly: true },
                      ],
                    },
                  ]
                },
                {
                  xtype: "fieldset",
                  title: "24. Nomor, Ukuran, dan Tipe Peti Kemas",
                  layout: "vbox",
                  width: "100%",
                  bodyPadding: "5 0 0 0",
                  items: [
                    {
                      xtype: "grid",
                      pid: "GRIDbcin_271_kontainer",
                      emptyText: "No Matching Records",
                      width: 665,
                      height: 200,
                      plugins: {
                        cellediting: {
                          clicksToEdit: 1,
                        },
                      },
                      store: new Ext.data.Store({
                        data: [],
                        fields: ["NOMOR_KONTAINER", "KODE_UKURAN_KONTAINER", "KODE_TIPE_KONTAINER", "KETERANGAN"],
                      }),
                      columns: [
                        { header: "ID", dataIndex: "ID", sortable: true, width: 65, filter: { xtype: "textfield" }, hidden: true, align: "center" },
                        { xtype: "rownumberer", width: 40 },
                        {
                          header: "No Kontainer",
                          dataIndex: "NOMOR_KONTAINER",
                          sortable: true,
                          width: 120,
                          editor: {
                            xtype: "textfield",
                            allowBlank: false,
                          },
                        },
                        {
                          header: "Ukuran",
                          dataIndex: "KODE_UKURAN_KONTAINER",
                          sortable: true,
                          width: 100,
                          editor: {
                            xtype: "combo",
                            typeAhead: true,
                            triggerAction: "all",
                            store: [
                              ["20", "20 FEET"],
                              ["40", "40 FEET"],
                              ["45", "45 FEET"],
                            ],
                          },
                        },
                        {
                          header: "Type",
                          dataIndex: "KODE_TIPE_KONTAINER",
                          sortable: true,
                          width: 100,
                          editor: {
                            xtype: "combo",
                            typeAhead: true,
                            triggerAction: "all",
                            store: [["F", "FCL"]],
                          },
                        },
                        {
                          header: "Keterangan",
                          dataIndex: "KETERANGAN",
                          sortable: true,
                          flex: 1,
                          editor: {
                            xtype: "textfield",
                            allowBlank: false,
                          },
                        },
                        {
                          xtype: "actioncolumn",
                          width: 25,
                          menuDisabled: true,
                          sortable: false,
                          items: [
                            {
                              icon: vconfig.getstyle + "icon/delete.ico",
                              handler: function (grid, rowIndex, colIndex) {
                                grid.getStore().removeAt(rowIndex);
                              },
                            },
                          ],
                        },
                      ],
                      tbar: [
                        {
                          xtype: "button",
                          pid: "btinput_kontainer",
                          text: "TAMBAH KONTAINER",
                          icon: vconfig.getstyle + "icon/new.ico",
                          tooltip: "Input Data Kontainer",
                          handler: function () {
                            var GRID = Ext.ComponentQuery.query("FRMbcin_271 grid[pid=GRIDbcin_271_kontainer]")[0];
                            var rec = {
                              NOMOR_KONTAINER: "XXXX1234",
                              KODE_UKURAN_KONTAINER: "",
                              KODE_TIPE_KONTAINER: "F",
                              KETERANGAN: "",
                            };
                            GRID.getStore().insert(0, rec);
                            GRID.getStore().commitChanges();
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  xtype: "fieldset",
                  title: "25. Jumlah dan jenis kemasan",
                  layout: "vbox",
                  width: "100%",
                  bodyPadding: "5 0 0 0",
                  items: [
                    {
                      xtype: "grid",
                      pid: "GRIDbcin_271_kemasan",
                      emptyText: "No Matching Records",
                      width: 575,
                      height: 200,
                      plugins: {
                        cellediting: {
                          clicksToEdit: 1,
                        },
                      },
                      store: new Ext.data.Store({
                        data: [],
                        fields: ["JUMLAH_KEMASAN", "KODE_JENIS_KEMASAN", "KETERANGAN", "MERK_KEMASAN"],
                      }),
                      columns: [
                        { xtype: "rownumberer", width: 40 },
                        {
                          header: "Jumlah",
                          dataIndex: "JUMLAH_KEMASAN",
                          sortable: true,
                          width: 80,
                          editor: {
                            xtype: "textfield",
                            allowBlank: false,
                          },
                        },
                        {
                          header: "Keterangan",
                          dataIndex: "KETERANGAN",
                          sortable: true,
                          width: 200,
                          editor: {
                            xtype: "combo",
                            reference: "cbo_keterangan",
                            publishes: "value",
                            typeAhead: true,
                            valueField: "URAIAN_KEMASAN",
                            displayField: "URAIAN_KEMASAN",
                            queryMode: "local",
                            anchor: "-15",
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
                                url: vconfig.service_api + "referensi_kemasan/referensi_kemasans",
                                reader: {
                                  type: "json",
                                  rootProperty: "Rows",
                                  totalProperty: "TotalRows",
                                  successProperty: "success",
                                },
                              },
                            },
                            listeners: {
                              select: function (cmp, rec) {
                                var GRID = Ext.ComponentQuery.query("FRMbcin_271 grid[pid=GRIDbcin_271_kemasan]")[0];
                                var sm = GRID.getSelectionModel();
                                var rs = sm.getSelection()[0];
                                rs.set({
                                  KODE_JENIS_KEMASAN: rec.data.KODE_KEMASAN,
                                });
                                rs.commit();
                              },
                            },
                          },
                        },
                        {
                          header: "Kode",
                          dataIndex: "KODE_JENIS_KEMASAN",
                          sortable: true,
                          width: 50,
                        },
                        {
                          header: "Merk",
                          dataIndex: "MERK_KEMASAN",
                          sortable: true,
                          flex: 1,
                          editor: {
                            xtype: "textfield",
                            allowBlank: false,
                          },
                        },
                        {
                          xtype: "actioncolumn",
                          width: 25,
                          menuDisabled: true,
                          sortable: false,
                          items: [
                            {
                              icon: vconfig.getstyle + "icon/delete.ico",
                              handler: function (grid, rowIndex, colIndex) {
                                grid.getStore().removeAt(rowIndex);
                              },
                            },
                          ],
                        },
                      ],
                      tbar: [
                        {
                          xtype: "button",
                          pid: "btinput_kemasan",
                          text: "TAMBAH KEMASAN",
                          icon: vconfig.getstyle + "icon/new.ico",
                          tooltip: "Input Data Kemasan",
                          handler: function () {
                            var GRID = Ext.ComponentQuery.query("FRMbcin_271 grid[pid=GRIDbcin_271_kemasan]")[0];
                            var rec = {
                              JUMLAH_KEMASAN: "",
                              KODE_JENIS_KEMASAN: "",
                              KETERANGAN: "",
                              MERK_KEMASAN: "",
                            };
                            GRID.getStore().insert(0, rec);
                            GRID.getStore().commitChanges();
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  xtype: "fieldset",
                  title: "Data Barang",
                  width: "100%",
                  bodyPadding: "5 0 0 0",
                  items: [
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "currencyfield", labelWidth: 130, width: 350, fieldLabel: "26. Volume (m3)", name: "VOLUME", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "currencyfield", labelWidth: 130, width: 350, fieldLabel: "27. Berat Kotor (Kg)", name: "BRUTO", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "currencyfield", labelWidth: 130, width: 350, fieldLabel: "28. Berat Bersih (Kg)", name: "NETTO", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "currencyfield", labelWidth: 130, width: 350, fieldLabel: "Jenis Barang", name: "JUMLAH_BARANG", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        {
                          xtype: "grid",
                          pid: "GRIDbcin_271_input_item",
                          emptyText: "No Matching Records",
                          width: 665,
                          height: 340,
                          plugins: ["filterfield"],
                          viewConfig: {
                            enableTextSelection: true,
                          },
                          store: {
                            autoLoad: false,
                            autoSync: false,
                            remoteSort: false,
                            remoteFilter: false,
                            proxy: {
                              type: "localstorage",
                            },
                          },
                          columns: [
                            {
                              xtype: "actioncolumn",
                              width: 35,
                              align: "center",
                              menuDisabled: true,
                              sortable: false,
                              items: [
                                {
                                  icon: vconfig.getstyle + "icon/grid.png",
                                  tooltip: "Detail Dokumen",
                                  handler: "edit_detailbarang_click",
                                },
                              ],
                            },
                            { header: "SERI", dataIndex: "SERI_BARANG", sortable: true, width: 40, hidden: false, filter: { xtype: "textfield" } },
                            { header: "KODE", dataIndex: "KODE_BARANG", sortable: true, width: 100, hidden: false, filter: { xtype: "textfield" } },
                            { header: "URAIAN", dataIndex: "URAIAN", sortable: true, width: 150, hidden: false, filter: { xtype: "textfield" } },
                            { header: "HARGA_SATUAN", dataIndex: "HARGA_SATUAN", sortable: true, width: 100, hidden: false, renderer: "formatAmount", align: "right", filter: { xtype: "textfield" } },
                            { header: "QTY", dataIndex: "JUMLAH_SATUAN", sortable: true, width: 100, hidden: false, renderer: "formatqty", align: "right", filter: { xtype: "textfield" } },
                            { header: "CIF", dataIndex: "CIF", sortable: true, width: 100, hidden: false, renderer: "formatAmount", align: "right", filter: { xtype: "textfield" } },
                            { header: "FOB", dataIndex: "FOB", sortable: true, width: 100, hidden: false, renderer: "formatAmount", align: "right", filter: { xtype: "textfield" } },
                            { header: "FREIGHT", dataIndex: "FREIGHT", sortable: true, width: 100, hidden: true, filter: { xtype: "textfield" } },
                            { header: "HARGA_BARANG_LDP", dataIndex: "HARGA_BARANG_LDP", sortable: true, width: 100, hidden: true, filter: { xtype: "textfield" } },
                            {
                              header: "HARGA_INVOICE",
                              dataIndex: "HARGA_INVOICE",
                              sortable: true,
                              width: 100,
                              hidden: false,
                              renderer: "formatAmount",
                              align: "right",
                              filter: { xtype: "textfield" },
                            },
                            {
                              header: "HARGA_PENYERAHAN",
                              dataIndex: "HARGA_PENYERAHAN",
                              sortable: true,
                              width: 100,
                              hidden: true,
                              renderer: "formatAmount",
                              align: "right",
                              filter: { xtype: "textfield" },
                            },
                          ],
                          tbar: [
                            "-",
                            //
                            { xtype: "displayfield", value: "Data Item/Part" },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
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
        { xtypeL: "tbspacer", width: 5 },
        { xtype: "button", text: "Cancel Dokumen", pid: "btcancel_dokumen", icon: vconfig.getstyle + "icon/delete.ico", tooltip: "Cancel Dokumen BC 271", handler: "FRMbcin_271_btcancel_click" },
        { xtype: "button", text: "Update Dokumen", pid: "btsimpan_draft", icon: vconfig.getstyle + "icon/save.gif", tooltip: "Proses Update Dokumen BC 271", handler: "FRMbcin_271_btupdate_click" },
        { xtype: "button", text: "Kunci Perubahan Dokumen", pid: "btlock_draft", icon: vconfig.getstyle + "icon/lock.png", tooltip: "Proses Lock Dokumen BC 271", handler: "FRMbcin_271_btlock_click" },
        "-",
        { xtype: "button", text: "Send To Ceisa", pid: "btgenerate_draft", icon: vconfig.getstyle + "icon/up.ico", tooltip: "Kirim Dokumen Ke Aplikasi Ceisa", handler: "FRMbcin_271_btsendtoceisa_click" },
        { xtype: "button", text: "Get From Ceisa", pid: "btgenerate_draft", icon: vconfig.getstyle + "icon/down.ico", tooltip: "Sinkronisasi Dokumen dari Aplikasi Ceisa", handler: "FRMbcin_271_btgetfromceisa_click" },
      ],
      // other options....
    },
  ],
  listeners: {
    afterrender: "FRMbcin_271_load",
  },
});
