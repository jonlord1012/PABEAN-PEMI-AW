var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.EXIM.bcin_262.FRMbcin_262", {
  extend: "Ext.window.Window",
  alias: "widget.FRMbcin_262",
  reference: "FRMbcin_262",
  title: "Header Dokumen BC 262",
  modal: true,
  closeAction: "destroy", 
  centered: true,
  autoScroll: false,
  controller: "Cbcin_262",
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
            { xtype: "textfield", fieldLabel: "STATUS", name: "URAIAN_STATUS", labelWidth: 50, width: 400, fieldCls: "fieldlock", readOnly: true },
            { xtype: "textfield", fieldLabel: "SUMBER DOKUMEN", name: "mode_source_name", labelWidth: 140, width: 300, fieldCls: "fieldlock", readOnly: true },
            { xtype: "numberfield", fieldLabel: "DOKUMEN ID", name: "ID_HEADER_ORI", labelWidth: 140, labelAlign: "right", width: 200, fieldCls: "fieldlock", value: 0, readOnly: true },
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
                    { xtype: "textfield", labelWidth: 130, width: 420, fieldLabel: "NOMOR PENGAJUAN", name: "NOMOR_AJU", fieldCls: "fieldinput", readOnly: true },
                    { xtype: "textfield", labelWidth: 130, width: 420, fieldLabel: "NOMOR PENDAFTARAN", name: "NOMOR_DAFTAR", fieldCls: "fieldinput", readOnly: true },
                    { xtype: "datefield", labelWidth: 130, width: 250, fieldLabel: "TGL PENDAFTARAN", name: "TANGGAL_DAFTAR", fieldCls: "fieldinput", format: "Y-m-d", readOnly: false },
                  ],
                },
              ],
            },
            { xtype: "tbspacer", width: 10 },
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
                        { xtype: "textfield", labelWidth: 120, width: 200, fieldLabel: "KANTOR PABEAN", name: "KODE_KANTOR", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "textfield", width: 200, name: "KODE_KANTORNAME", fieldCls: "fieldlock", readOnly: true },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          vdata: {
                            modulename: "kantorpabean",
                            title: "Pilih Kantor Pabean",
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
                        { xtype: "textfield", labelWidth: 120, width: 200, fieldLabel: "TUJUAN PEMASUKAN", name: "KODE_TUJUAN_PEMASUKAN", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "textfield", width: 200, name: "KODE_TUJUAN_PEMASUKANNAME", fieldCls: "fieldlock", readOnly: true },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          vdata: {
                            modulename: "tujuanpemasukan",
                            title: "Pilih Tujuan Pemasukan",
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
          ],
        },
        {
          xtype: "container",
          flex: 1,
          layout: "hbox",
          bodyPadding: "5 0 0 0",
          items: [
            {
              xtype: "container",
              layout: "vbox",
              width: 600,
              margin: "5 10 0 0",
              items: [
                {
                  xtype: "fieldset",
                  title: "PENGUSAHA TPB",
                  layout: "vbox",
                  width: "100%",
                  bodyPadding: "5 0 0 0",
                  items: [
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [{ xtype: "textfield", labelWidth: 100, width: 480, fieldLabel: "1. NPWP", name: "ID_PENGUSAHA", fieldCls: "fieldlock", readOnly: true }],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 100, width: 140, fieldLabel: "2. Nama", name: "KODE_ID_PENGUSAHA", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "textfield", width: 300, name: "NAMA_PENGUSAHA", fieldCls: "fieldinput", readOnly: true },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "vbox",
                      margin: "5 0 0 0",
                      items: [
                        { xtype: "textfield", labelWidth: 100, width: 480, labelAlign: "left", fieldLabel: "3. Alamat", name: "ALAMAT_PENGUSAHA", fieldCls: "fieldlock", readOnly: true },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      margin: "5 0 0 0",
                      items: [
                        { xtype: "textfield", labelWidth: 100, width: 320, labelAlign: "left", fieldLabel: "4. Nomor Izin", name: "NOMOR_IJIN_TPB", fieldCls: "fieldlock", readOnly: true },
                        { xtype: "textfield", width: 150, name: "TANGGAL_IJIN_TPB", fieldCls: "fieldinput", readOnly: true },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        {
                          xtype: "combobox",
                          name: "KODE_JENIS_API_PENGUSAHA",
                          fieldLabel: "5. API",
                          labelWidth: 100,
                          width: 180,
                          displayField: "MERGE",
                          valueField: "KODE_API_PENGUSAHA",
                          fieldCls: "fieldinput",
                          allowBlank: false,
                          queryMode: "local",
                          forceSelection: true,
                          typeAhead: true,
                          minChars: 0,
                          anyMatch: true,
                          store: new Ext.data.Store({
                            data: [
                              { KODE_API_PENGUSAHA: "1", APINAME: "APIU", MERGE: "1 - APIU" },
                              { KODE_API_PENGUSAHA: "2", APINAME: "APIP", MERGE: "2 - APIP" },
                            ],
                          }),
                        },
                        { xtype: "textfield", width: 290, name: "API_PENGUSAHA", fieldCls: "fieldinput", readOnly: false, emptyText: "Manual" },
                      ],
                    },
                  ],
                },
                {
                  xtype: "fieldset",
                  title: "PENGIRIM BARANG",
                  layout: "vbox",
                  width: "100%",
                  bodyPadding: "5 0 0 0",
                  items: [
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [{ xtype: "textfield", labelWidth: 100, width: 480, fieldLabel: "5. NPWP", name: "ID_PENGIRIM", fieldCls: "fieldlock", readOnly: true }],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 100, width: 450, fieldLabel: "6. Nama", name: "NAMA_PENGIRIM", fieldCls: "fieldinput", readOnly: true },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [{ xtype: "textfield", labelWidth: 100, width: 480, fieldLabel: "7. Alamat", name: "ALAMAT_PENGIRIM", fieldCls: "fieldlock", readOnly: true }],
                    },
                  ],
                },
                {
                  xtype: "fieldset",
                  title: "Amount",
                  width: "100%",
                  bodyPadding: "5 0 0 0",
                  items: [
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 160, width: 210, fieldLabel: "11. Valuta", name: "KODE_VALUTA", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "textfield", width: 100, name: "KODE_VALUTA_NAME", fieldCls: "fieldinput", readOnly: true },
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
                        { xtype: "tbspacer", width: 10 },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          text: "Get Kurs",
                          vdata: {
                            modulename: "harga",
                            title: "Pilih Harga",
                            popupwidth: 0.37,
                            popupheight: 0.6,
                          },
                          tooltip: "search",
                        },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "currencyfield", labelWidth: 160, width: 350, fieldLabel: "12. NDPBM", name: "NDPBM", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "currencyfield", labelWidth: 160, width: 350, fieldLabel: "13. Nilai CIF", name: "CIF", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "currencyfield", labelWidth: 160, width: 350, fieldLabel: "Nilai CIF (Rp)", name: "CIF_RUPIAH", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        {
                          xtype: "combobox",
                          name: "COMBO_CARA_ANGKUT",
                          fieldLabel: "14. Jenis Sarana Pengangkutan",
                          labelWidth: 160,
                          width: 350,
                          displayField: "MERGE",
                          valueField: "KODE_CARA_ANGKUT",
                          fieldCls: "fieldinput",
                          allowBlank: false,
                          queryMode: "local",
                          forceSelection: false,
                          typeAhead: true,
                          minChars: 0,
                          anyMatch: true,
                          store: new Ext.data.Store({
                            data: [
                              { KODE_CARA_ANGKUT: "1", URAIAN_CARA_ANGKUT: "LAUT", MERGE: "1 - LAUT" },
                              { KODE_CARA_ANGKUT: "2", URAIAN_CARA_ANGKUT: "KERETA API", MERGE: "2 - KERETA API" },
                              { KODE_CARA_ANGKUT: "3", URAIAN_CARA_ANGKUT: "DARAT", MERGE: "3 - DARAT" },
                              { KODE_CARA_ANGKUT: "4", URAIAN_CARA_ANGKUT: "UDARA", MERGE: "4 - UDARA" },
                              { KODE_CARA_ANGKUT: "5", URAIAN_CARA_ANGKUT: "POS", MERGE: "5 - POS" },
                              { KODE_CARA_ANGKUT: "6", URAIAN_CARA_ANGKUT: "MULTI MODA", MERGE: "6 - MULTI MODA" },
                              { KODE_CARA_ANGKUT: "7", URAIAN_CARA_ANGKUT: "INSTALASI", MERGE: "7 - INSTALASI" },
                              { KODE_CARA_ANGKUT: "8", URAIAN_CARA_ANGKUT: "PERAIRAN", MERGE: "8 - PERAIRAN" },
                              { KODE_CARA_ANGKUT: "9", URAIAN_CARA_ANGKUT: "LAINNYA", MERGE: "9 - LAINNYA" },
                            ],
                          }),
                        },
                      ],
                    },
                  ],
                },
                {
                  xtype: "fieldset",
                  title: "16. Jumlah dan jenis kemasan",
                  layout: "vbox",
                  width: "100%",
                  bodyPadding: "5 0 0 0",
                  items: [
                    {
                      xtype: "grid",
                      pid: "GRIDbcin_262_kemasan",
                      emptyText: "No Matching Records",
                      width: 575,
                      height: 380,
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
                                headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
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
                                var GRID = Ext.ComponentQuery.query("FRMbcin_262 grid[pid=GRIDbcin_262_kemasan]")[0];
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
                          text: "input",
                          icon: vconfig.getstyle + "icon/new.ico",
                          tooltip: "Input Data Kemasan",
                          handler: function () {
                            var GRID = Ext.ComponentQuery.query("FRMbcin_262 grid[pid=GRIDbcin_262_kemasan]")[0];
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
                  title: "DOKUMEN PELENGKAP PABEAN",
                  layout: "vbox",
                  width: "100%",
                  bodyPadding: "5 0 0 0",
                  items: [
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "8. Packing List", name: "NOMOR_PACKING_LIST", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "datefield", width: 100, name: "PACKING_LIST_TANGGAL_DOKUMEN", fieldCls: "fieldinput", format: "Y-m-d", readOnly: true },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "9. Surat Keputusan", name: "NOMOR_DOKUMEN", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "datefield", width: 100, name: "TANGGAL_DOKUMEN", fieldCls: "fieldinput", format: "Y-m-d", readOnly: true },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "10. Dok. BC 2.6.1", name: "NOMOR_FAKTUR_PAJAK", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "datefield", width: 100, name: "FAKTUR_PAJAK_TANGGAL_DOKUMEN", fieldCls: "fieldinput", format: "Y-m-d", readOnly: true },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        {
                          xtype: "grid",
                          pid: "GRIDbcin_262_input_dokumen",
                          emptyText: "No Matching Records",
                          width: 665,
                          height: 230,
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
                              text: "Input Dokumen",
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
                {
                  xtype: "fieldset",
                  title: "15. Nomor, Ukuran, dan Tipe Peti Kemas",
                  layout: "vbox",
                  width: "100%",
                  bodyPadding: "5 0 0 0",
                  items: [
                    {
                      xtype: "grid",
                      pid: "GRIDbcin_262_kontainer",
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
                          text: "input",
                          icon: vconfig.getstyle + "icon/new.ico",
                          tooltip: "Input Data Kontainer",
                          handler: function () {
                            var GRID = Ext.ComponentQuery.query("FRMbcin_262 grid[pid=GRIDbcin_262_kontainer]")[0];
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
                  title: "Item Produk",
                  width: "100%",
                  bodyPadding: "5 0 0 0",
                  items: [
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "currencyfield", labelWidth: 130, width: 350, fieldLabel: "17. Bruto (Kg)", name: "BRUTO", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "currencyfield", labelWidth: 130, width: 350, fieldLabel: "18. Netto (Kg)", name: "NETTO", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        {
                          xtype: "grid",
                          pid: "GRIDbcin_262_input_item",
                          emptyText: "No Matching Records",
                          width: 665,
                          height: 480,
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
        { xtype: "button", text: "Cancel Dokumen", pid: "btcancel_dokumen", icon: vconfig.getstyle + "icon/delete.ico", tooltip: "Cancel Dokumen BC 262", handler: "FRMbcin_262_btcancel_click" },
        { xtype: "button", text: "Update Dokumen", pid: "btsimpan_draft", icon: vconfig.getstyle + "icon/save.gif", tooltip: "Proses Update Dokumen BC 262", handler: "FRMbcin_262_btupdate_click" },
        { xtype: "button", text: "Kunci Perubahan Dokumen", pid: "btlock_draft", icon: vconfig.getstyle + "icon/lock.png", tooltip: "Proses Lock Dokumen BC 262", handler: "FRMbcin_262_btlock_click" },
        "-",
        { xtype: "button", text: "Send To Ceisa", pid: "btgenerate_draft", icon: vconfig.getstyle + "icon/up.ico", tooltip: "Kirim Dokumen Ke Aplikasi Ceisa", handler: "FRMbcin_262_btsendtoceisa_click" },
        { xtype: "button", text: "Get From Ceisa", pid: "btgenerate_draft", icon: vconfig.getstyle + "icon/down.ico", tooltip: "Sinkronisasi Dokumen dari Aplikasi Ceisa", handler: "FRMbcin_262_btgetfromceisa_click" },
      ],
      // other options....
    },
  ],
  listeners: {
    afterrender: "FRMbcin_262_load",
  },
});
