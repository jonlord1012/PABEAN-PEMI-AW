var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.INVENTORY_PLB.inv_material_control_aw.FRMinv_material_control_aw", {
  extend: "Ext.window.Window",
  alias: "widget.FRMinv_material_control_aw",
  reference: "FRMinv_material_control_aw",
  title: "",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: false,
  controller: "Cinv_material_control_aw",
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
              width: 520,
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
                        { xtype: "textfield", labelWidth: 120, width: 200, fieldLabel: "KPPBC Bongkar", name: "KODE_KANTOR_BONGKAR", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "textfield", width: 200, name: "KODE_KANTOR_BONGKARNAME", fieldCls: "fieldlock", readOnly: true },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          module: "kppbc_bongkar",
                          popupwidth: 450,
                          tofield: { KODE_KANTOR_BONGKAR: "KODE_KANTOR", KODE_KANTOR_BONGKARNAME: "URAIAN_KANTOR" },
                          icon: vconfig.getstyle + "icon/search.ico",
                          tooltip: "search",
                        },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 200, fieldLabel: "KPPBC Pengawas", name: "KODE_KANTOR_PENGAWAS", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "textfield", width: 200, name: "KODE_KANTOR_PENGAWASNAME", fieldCls: "fieldlock", readOnly: true },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          module: "kppbc_pengawas",
                          popupwidth: 450,
                          tofield: { KODE_KANTOR_PENGAWAS: "KODE_KANTOR", KODE_KANTOR_PENGAWASNAME: "URAIAN_KANTOR" },
                          icon: vconfig.getstyle + "icon/search.ico",
                          tooltip: "search",
                        },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 200, fieldLabel: "Tujuan", name: "KODE_TUJUAN_TPB", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "textfield", width: 200, name: "KODE_TUJUAN_TPBNAME", fieldCls: "fieldlock", readOnly: true },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          module: "tujuantpb",
                          popupwidth: 450,
                          tofield: { KODE_TUJUAN_TPB: "KODE_TUJUAN_TPB", KODE_TUJUAN_TPBNAME: "URAIAN_TUJUAN_TPB" },
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
              width: 520,
              margin: "5 10 0 0",
              items: [
                {
                  xtype: "fieldset",
                  title: "PEMASOK",
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
                            { xtype: "textfield", labelWidth: 100, width: 400, fieldLabel: "1. Nama", name: "NAMA_PEMASOK", fieldCls: "fieldinput", readOnly: true },
                            {
                              xtype: "button",
                              pid: "btsearch",
                              module: "pemasok",
                              popupwidth: 800,
                              tofield: {
                                NAMA_PEMASOK: "NAMA",
                                KODE_NEGARA_PEMASOK: "KODE_NEGARA",
                                ALAMAT_PEMASOK: "ALAMAT",
                                KODE_NEGARA_PEMASOK_NAME: "NAMA_NEGARA",
                              },
                              icon: vconfig.getstyle + "icon/search.ico",
                              tooltip: "search",
                            },
                          ],
                        },
                        { xtype: "textfield", labelWidth: 100, width: 480, labelAlign: "right", fieldLabel: "Alamat", name: "ALAMAT_PEMASOK", fieldCls: "fieldlock", readOnly: true },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "textfield", labelWidth: 100, width: 150, labelAlign: "right", fieldLabel: "Negara", name: "KODE_NEGARA_PEMASOK", fieldCls: "fieldlock", readOnly: true },
                            { xtype: "displayfield", labelWidth: 10, width: 200, name: "KODE_NEGARA_PEMASOK_NAME" },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  xtype: "fieldset",
                  title: "IMPORTIR",
                  layout: "vbox",
                  width: "100%",
                  bodyPadding: "5 0 0 0",
                  items: [
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [{ xtype: "textfield", labelWidth: 100, width: 400, fieldLabel: "2. Identitas (NPWP)", name: "ID_PENGUSAHA", fieldCls: "fieldlock", readOnly: true }],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 100, width: 140, fieldLabel: "3. Nama", name: "KODE_ID_PENGUSAHA", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "textfield", width: 300, name: "NAMA_PENGUSAHA", fieldCls: "fieldinput", readOnly: true },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          module: "importir",
                          popupwidth: 450,
                          tofield: {
                            KODE_ID_PENGUSAHA: "KODE_ID",
                            NAMA_PENGUSAHA: "NAMA",
                            ID_PENGUSAHA: "NPWP",
                            ALAMAT_PENGUSAHA: "ALAMAT",
                            NOMOR_IJIN_TPB: "NOMOR_SKEP",
                            KODE_JENIS_API_PENGUSAHA: "API_CODE",
                          },
                          icon: vconfig.getstyle + "icon/search.ico",
                          tooltip: "search",
                        },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "vbox",
                      margin: "5 0 0 0",
                      items: [
                        { xtype: "textfield", labelWidth: 100, width: 480, labelAlign: "right", fieldLabel: "Alamat", name: "ALAMAT_PENGUSAHA", fieldCls: "fieldlock", readOnly: true },
                        { xtype: "textfield", labelWidth: 100, width: 320, labelAlign: "right", fieldLabel: "Nomor Izin", name: "NOMOR_IJIN_TPB", fieldCls: "fieldlock", readOnly: true },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            {
                              xtype: "combobox",
                              name: "KODE_JENIS_API_PENGUSAHA",
                              fieldLabel: "4. API",
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
                            { xtype: "textfield", width: 300, name: "API_PENGUSAHA", fieldCls: "fieldinput", readOnly: false, emptyText: "Manual" },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  xtype: "fieldset",
                  title: "PEMILIK",
                  layout: "vbox",
                  width: "100%",
                  bodyPadding: "5 0 0 0",
                  items: [
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [{ xtype: "textfield", labelWidth: 100, width: 400, fieldLabel: "5. Identitas (NPWP)", name: "ID_PEMILIK", fieldCls: "fieldlock", readOnly: true }],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 100, width: 140, fieldLabel: "6. Nama", name: "KODE_ID_PEMILIK", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "textfield", width: 300, name: "NAMA_PEMILIK", fieldCls: "fieldinput", readOnly: true },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          module: "pemilik",
                          popupwidth: 450,
                          tofield: {
                            KODE_ID_PEMILIK: "KODE_ID",
                            NAMA_PEMILIK: "NAMA",
                            ID_PEMILIK: "NPWP",
                            ALAMAT_PEMILIK: "ALAMAT",
                            KODE_JENIS_API_PEMILIK: "API_CODE",
                          },
                          icon: vconfig.getstyle + "icon/search.ico",
                          tooltip: "search",
                        },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "vbox",
                      margin: "5 0 0 0",
                      items: [
                        { xtype: "textfield", labelWidth: 100, width: 480, labelAlign: "right", fieldLabel: "Alamat", name: "ALAMAT_PEMILIK", fieldCls: "fieldlock", readOnly: true },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            {
                              xtype: "combobox",
                              name: "KODE_JENIS_API_PEMILIK",
                              fieldLabel: "4. API",
                              labelWidth: 100,
                              width: 180,
                              displayField: "MERGE",
                              valueField: "KODE_API_PEMILIK",
                              fieldCls: "fieldinput",
                              allowBlank: false,
                              queryMode: "local",
                              forceSelection: true,
                              typeAhead: true,
                              minChars: 0,
                              anyMatch: true,
                              store: new Ext.data.Store({
                                data: [
                                  { KODE_API_PEMILIK: "1", APINAME: "APIU", MERGE: "1 - APIU" },
                                  { KODE_API_PEMILIK: "2", APINAME: "APIP", MERGE: "2 - APIP" },
                                ],
                              }),
                            },
                            { xtype: "textfield", width: 300, name: "API_PEMILIK", fieldCls: "fieldinput", readOnly: false, emptyText: "Manual" },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  xtype: "fieldset",
                  title: "PENGANGKUTAN",
                  layout: "vbox",
                  flex: 1,
                  width: "100%",
                  bodyPadding: "5 0 0 0",
                  items: [
                    {
                      xtype: "container",
                      layout: "hbox",
                      margin: "5 0 0 0",
                      items: [
                        {
                          xtype: "combobox",
                          name: "COMBO_CARA_ANGKUT",
                          fieldLabel: "10. Cara Pengangkutan",
                          labelWidth: 150,
                          width: 320,
                          displayField: "COMBO",
                          valueField: "KODE_CARA_ANGKUT",
                          fieldCls: "fieldinput",
                          allowBlank: false,
                          queryMode: "local",
                          forceSelection: false,
                          typeAhead: true,
                          minChars: 0,
                          anyMatch: true,
                        },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "vbox",
                      margin: "5 0 0 0",
                      items: [
                        {
                          xtype: "textfield",
                          labelWidth: 150,
                          width: 420,
                          fieldLabel: "11. Nama Sarana Pengangkut",
                          name: "NAMA_PENGANGKUT",
                          fieldCls: "fieldinput",
                          readOnly: false,
                          emptyText: "Manual",
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            {
                              xtype: "textfield",
                              labelWidth: 150,
                              width: 250,
                              labelAlign: "right",
                              fieldLabel: "Voy/Flight",
                              name: "NOMOR_VOY_FLIGHT",
                              fieldCls: "fieldinput",
                              readOnly: false,
                              emptyText: "Manual",
                            },
                            { xtype: "textfield", labelWidth: 35, width: 70, labelAlign: "right", fieldLabel: "Negara", name: "KODE_BENDERA", fieldCls: "fieldinput", readOnly: true },
                            { xtype: "textfield", labelWidth: 20, width: 120, name: "KODE_BENDERA_NAME", fieldCls: "fieldinput", readOnly: true },
                            {
                              xtype: "button",
                              pid: "btsearch",
                              module: "negara",
                              popupwidth: 400,
                              tofield: {
                                KODE_BENDERA_NAME: "country_name2",
                                KODE_BENDERA: "country_code2",
                              },
                              icon: vconfig.getstyle + "icon/search.ico",
                              tooltip: "search",
                            },
                          ],
                        },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      margin: "5 0 0 0",
                      items: [
                        { xtype: "textfield", labelWidth: 150, width: 220, fieldLabel: "12. Pelabuhan Muat", name: "KODE_PEL_MUAT", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "textfield", width: 200, name: "KODE_PEL_MUATNAME", fieldCls: "fieldinput", readOnly: true },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          module: "pelabuhan",
                          popupwidth: 450,
                          tofield: {
                            KODE_PEL_MUAT: "KODE_PELABUHAN",
                            KODE_PEL_MUATNAME: "URAIAN_PELABUHAN",
                          },
                          icon: vconfig.getstyle + "icon/search.ico",
                          tooltip: "search",
                        },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      margin: "5 0 0 0",
                      items: [
                        { xtype: "textfield", labelWidth: 150, width: 220, fieldLabel: "13. Pelabuhan Transit", name: "KODE_PEL_TRANSIT", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "textfield", width: 200, name: "KODE_PEL_TRANSITNAME", fieldCls: "fieldinput", readOnly: true },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          module: "pelabuhan",
                          popupwidth: 450,
                          tofield: {
                            KODE_PEL_TRANSIT: "KODE_PELABUHAN",
                            KODE_PEL_TRANSITNAME: "URAIAN_PELABUHAN",
                          },
                          icon: vconfig.getstyle + "icon/search.ico",
                          tooltip: "search",
                        },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      margin: "5 0 0 0",
                      items: [
                        { xtype: "textfield", labelWidth: 150, width: 220, fieldLabel: "14. Pelabuhan Bongkar", name: "KODE_PEL_BONGKAR", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "textfield", width: 200, name: "KODE_PEL_BONGKARNAME", fieldCls: "fieldinput", readOnly: true },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          module: "pelabuhan_bongkar",
                          popupwidth: 450,
                          tofield: {
                            KODE_PEL_BONGKAR: "KODE_PELABUHAN",
                            KODE_PEL_BONGKARNAME: "URAIAN_PELABUHAN",
                          },
                          icon: vconfig.getstyle + "icon/search.ico",
                          tooltip: "search",
                        },
                      ],
                    },
                  ],
                },
                {
                  xtype: "fieldset",
                  title: "28. Nomor, Ukuran, dan Tipe Peti Kemas",
                  layout: "vbox",
                  flex: 1,
                  bodyPadding: "5 0 0 0",
                  items: [
                    {
                      xtype: "grid",
                      pid: "GRIDinput_kontainer",
                      emptyText: "No Matching Records",
                      width: 495,
                      height: 200,
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
                        { header: "ID", dataIndex: "ID", sortable: true, width: 65, filter: { xtype: "textfield" }, hidden: true, align: "center" },
                        { xtype: "rownumberer", width: 40 },
                        { header: "No Kontainer", dataIndex: "NOMOR_KONTAINER", sortable: true, width: 120, filter: { xtype: "textfield" } },
                        { header: "Ukuran", dataIndex: "KODE_UKURAN_KONTAINER", sortable: true, width: 100, filter: { xtype: "textfield" } },
                        { header: "Type", dataIndex: "KODE_TIPE_KONTAINER", sortable: true, width: 100, filter: { xtype: "textfield" } },
                        { header: "Keterangan", dataIndex: "KETERANGAN", sortable: true, flex: 1, filter: { xtype: "textfield" } },
                        {
                          xtype: "actioncolumn",
                          width: 25,
                          menuDisabled: true,
                          sortable: false,
                          items: [
                            {
                              icon: vconfig.getstyle + "icon/delete.ico",
                              handler: "delete_dokumen_kontainer",
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
                          handler: "btinput_kontainer_click",
                        },
                      ],
                    },
                  ],
                },
                {
                  xtype: "fieldset",
                  title: "29. Jumlah dan jenis kemasan",
                  layout: "vbox",
                  flex: 1,
                  bodyPadding: "5 0 0 0",
                  items: [
                    {
                      xtype: "grid",
                      pid: "GRIDinput_kemasan",
                      emptyText: "No Matching Records",
                      width: 495,
                      height: 200,
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
                        { header: "Jumlah", dataIndex: "JUMLAH_KEMASAN", sortable: true, width: 80, filter: { xtype: "textfield" } },
                        { header: "Kode", dataIndex: "KODE_JENIS_KEMASAN", sortable: true, width: 50, filter: { xtype: "textfield" } },
                        { header: "Keterangan", dataIndex: "KETERANGAN", sortable: true, flex: 1, filter: { xtype: "textfield" } },
                        { header: "Merk", dataIndex: "MERK_KEMASAN", sortable: true, flex: 1, filter: { xtype: "textfield" } },
                        {
                          xtype: "actioncolumn",
                          width: 25,
                          menuDisabled: true,
                          sortable: false,
                          items: [
                            {
                              icon: vconfig.getstyle + "icon/delete.ico",
                              handler: "delete_dokumen_kemasan",
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
                          handler: "btinput_kemasan_click",
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
              margin: "5 10 0 0",
              items: [
                {
                  xtype: "fieldset",
                  title: "Dokumen",
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
                            { xtype: "textfield", labelWidth: 100, width: 400, fieldLabel: "15. Invoice", name: "INVOICE_NOMOR_DOKUMEN", fieldCls: "fieldinput", readOnly: true },
                            { xtype: "datefield", width: 100, name: "INVOICE_TANGGAL_DOKUMEN", fieldCls: "fieldinput", format: "Y-m-d", readOnly: true },
                          ],
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "textfield", labelWidth: 100, width: 400, fieldLabel: "16. Fasilitas Impor", name: "IMPOR_NOMOR_DOKUMEN", fieldCls: "fieldinput", readOnly: true },
                            { xtype: "datefield", width: 100, name: "IMPOR_TANGGAL_DOKUMEN", fieldCls: "fieldinput", format: "Y-m-d", readOnly: true },
                            { xtype: "textfield", width: 100, name: "IMPOR_KODE_DOKUMEN", fieldCls: "fieldinput", readOnly: true },
                          ],
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            {
                              xtype: "grid",
                              pid: "GRIDinput_dokumen",
                              emptyText: "No Matching Records",
                              width: 600,
                              height: 230,
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
                                { header: "Kode", dataIndex: "KODE_JENIS_DOKUMEN", sortable: true, width: 50, filter: { xtype: "textfield" } },
                                { header: "Jenis", dataIndex: "URAIAN_DOKUMEN", sortable: true, width: 250, filter: { xtype: "textfield" } },
                                { header: "Nomor", dataIndex: "NOMOR_DOKUMEN", sortable: true, flex: 1, filter: { xtype: "textfield" } },
                                { header: "Tanggal", dataIndex: "TANGGAL_DOKUMEN", sortable: true, width: 100, filter: { xtype: "textfield" } },
                                {
                                  xtype: "actioncolumn",
                                  width: 25,
                                  menuDisabled: true,
                                  sortable: false,
                                  items: [
                                    {
                                      icon: vconfig.getstyle + "icon/delete.ico",
                                      handler: function (grid, rowIndex, colIndex) {
                                        me.delete_dokumen_lampiran(grid, rowIndex, colIndex);
                                      },
                                    },
                                  ],
                                },
                              ],
                              tbar: [
                                {
                                  xtype: "button",
                                  pid: "btinput_dokumen",
                                  text: "17. input Dokumen",
                                  popupwidth: 800,
                                  module: "module_input_dokumen",
                                  tofield: {},
                                  icon: vconfig.getstyle + "icon/new.ico",
                                  tooltip: "Input dokumen/lampiran",
                                  handler: "btinput_dokumen_click",
                                },
                              ],
                            },
                          ],
                        },
                        {
                          xtype: "tbspacer",
                          height: 5,
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "textfield", labelWidth: 100, width: 400, fieldLabel: "18. LC", name: "LC_NOMOR_DOKUMEN", fieldCls: "fieldinput", readOnly: true },
                            { xtype: "datefield", width: 100, name: "LC_TANGGAL_DOKUMEN", fieldCls: "fieldinput", format: "Y-m-d", readOnly: true },
                          ],
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "textfield", labelWidth: 100, width: 400, fieldLabel: "19. BL / AWB", name: "AWB_NOMOR_DOKUMEN", fieldCls: "fieldinput", readOnly: true },
                            { xtype: "datefield", width: 100, name: "AWB_TANGGAL_DOKUMEN", fieldCls: "fieldinput", format: "Y-m-d", readOnly: true },
                          ],
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            {
                              xtype: "textfield",
                              labelWidth: 100,
                              width: 400,
                              fieldLabel: "20. BC 1.1",
                              name: "NOMOR_BC11",
                              fieldCls: "fieldinput",
                              readOnly: false,
                              emptyText: "Manual",
                              maskRe: /[0-9.]/,
                            },
                            { xtype: "datefield", width: 100, name: "TANGGAL_BC11", fieldCls: "fieldinput", format: "Y-m-d", readOnly: false, emptyText: "Manual" },
                          ],
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            {
                              xtype: "textfield",
                              labelWidth: 100,
                              width: 200,
                              fieldLabel: "pos",
                              name: "POS_BC11",
                              fieldCls: "fieldinput",
                              readOnly: false,
                              labelAlign: "right",
                              emptyText: "Manual",
                              value: "0000",
                              maskRe: /[0-9.]/,
                            },
                            { xtype: "textfield", width: 100, name: "SUBPOS_BC11", fieldCls: "fieldinput", readOnly: false, emptyText: "Manual", value: "0000", maskRe: /[0-9.]/ },
                            { xtype: "textfield", width: 100, name: "SUBSUBPOS_BC11", fieldCls: "fieldinput", readOnly: false, emptyText: "Manual", value: "0000", maskRe: /[0-9.]/ },
                          ],
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "textfield", labelWidth: 110, width: 200, fieldLabel: "21. Temp Penimbunan", name: "KODE_TPS", fieldCls: "fieldinput", readOnly: true },
                            { xtype: "textfield", width: 300, name: "KODE_TPS_NAME", fieldCls: "fieldinput", readOnly: true },
                            {
                              xtype: "button",
                              pid: "btsearch",
                              module: "master_tps",
                              popupwidth: 450,
                              tofield: {
                                KODE_TPS: "KODE_TPS",
                                KODE_TPS_NAME: "URAIAN_TPS",
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
                {
                  xtype: "fieldset",
                  title: "Amount + Item Produk",
                  width: "100%",
                  bodyPadding: "5 0 0 0",
                  items: [
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 100, width: 150, fieldLabel: "22. Valuta", name: "KODE_VALUTA", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "textfield", width: 100, name: "KODE_VALUTA_NAME", fieldCls: "fieldinput", readOnly: true },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          module: "valuta",
                          popupwidth: 450,
                          tofield: {
                            KODE_VALUTA: "KODE_VALUTA",
                            KODE_VALUTA_NAME: "URAIAN_VALUTA",
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
                        { xtype: "textfield", labelWidth: 100, width: 150, fieldLabel: "Kode Harga", name: "KODE_HARGA", fieldCls: "fieldinput", readOnly: true },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          module: "harga",
                          margin: "0 10 0 0",
                          popupwidth: 450,
                          tofield: {
                            KODE_HARGA: "KODE_HARGA",
                            KODE_HARGANAME: "URAIAN_HARGA",
                          },
                          icon: vconfig.getstyle + "icon/search.ico",
                          tooltip: "search",
                        },
                        { xtype: "displayfield", width: 400, name: "KODE_HARGANAME", readOnly: true },
                      ],
                    },
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
                              name: "KODE_ASURANSI",
                              fieldLabel: "Asuransi dibayar",
                              labelWidth: 100,
                              width: 300,
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
                                  { KODE_ASURANSI: "", ASURANSINAME: "-", MERGE: "-" },
                                  { KODE_ASURANSI: "1", ASURANSINAME: "Dalam Negeri", MERGE: "1 - Dalam Negeri" },
                                  { KODE_ASURANSI: "2", ASURANSINAME: "Luar Negeri", MERGE: "2 - luar Negeri" },
                                ],
                              }),
                            },
                          ],
                        },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "currencyfield", labelWidth: 100, width: 250, fieldLabel: "23. NDPBM", name: "NDPBM", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                        { xtype: "currencyfield", labelWidth: 100, width: 250, fieldLabel: "24. FOB", name: "FOB", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "currencyfield", labelWidth: 100, width: 250, fieldLabel: "25. Freight", name: "FREIGHT", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                        { xtype: "currencyfield", labelWidth: 100, width: 250, fieldLabel: "26. Asuransi LN/DN", name: "ASURANSI", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "currencyfield", labelWidth: 100, width: 250, fieldLabel: "27. Nilai CIF", name: "CIF", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                        { xtype: "currencyfield", labelWidth: 100, width: 250, fieldLabel: "Nilai CIF (Rp)", name: "CIF_RUPIAH", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "currencyfield", labelWidth: 100, width: 250, fieldLabel: "30. Bruto (Kg)", name: "BRUTO", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                        { xtype: "currencyfield", labelWidth: 100, width: 250, fieldLabel: "31. Netto (Kg)", name: "NETTO", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        {
                          xtype: "grid",
                          pid: "GRIDinput_item",
                          emptyText: "No Matching Records",
                          width: 700,
                          height: 480,
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
                            { xtype: "rownumberer", width: 50 },
                            {
                              xtype: "actioncolumn",
                              width: 35,
                              align: "center",
                              menuDisabled: true,
                              sortable: false,
                              items: [
                                {
                                  icon: vconfig.getstyle + "icon/delete.ico",
                                  handler: function (grid, rowIndex, colIndex) {
                                    Ext.MessageBox.confirm(
                                      "Konfirmasi",
                                      "Konfirmasi Hapus Item/Part",
                                      function (button) {
                                        if (button === "yes") {
                                          var rec = grid.getStore().getAt(rowIndex);
                                          grid.getStore().remove(rec);
                                          grid.getStore().commitChanges();
                                        }
                                      },
                                      this
                                    );
                                  },
                                },
                              ],
                            },
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
                                  handler: function (grid, rowIndex, colIndex) {
                                    var rec = grid.getStore().getAt(rowIndex);
                                    me.btinput_barang_click(me, rec);
                                  },
                                },
                              ],
                            },
                            { header: "KODE", dataIndex: "KODE_BARANG", sortable: true, width: 65, hidden: false, filter: { xtype: "textfield" } },
                            { header: "KODE_KATEGORI", dataIndex: "KATEGORI_BARANG", sortable: true, width: 100, hidden: true, filter: { xtype: "textfield" } },
                            { header: "KATEGORI", dataIndex: "URAIAN_KATEGORI", sortable: true, width: 150, hidden: false, filter: { xtype: "textfield" } },
                            { header: "NAMA", dataIndex: "URAIAN", sortable: true, width: 200, hidden: false, filter: { xtype: "textfield" } },
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
                            { header: "HARGA_SATUAN", dataIndex: "HARGA_SATUAN", sortable: true, width: 100, hidden: false, renderer: "formatAmount", align: "right", filter: { xtype: "textfield" } },
                          ],
                          tbar: [
                            {
                              xtype: "button",
                              pid: "btinput_barang",
                              text: "Input Jenis Barang",
                              icon: vconfig.getstyle + "icon/new.ico",
                              tooltip: "Input Jenis Barang",
                              handler: "btinput_barang_click",
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
    },
  ],
  dockedItems: [],
  listeners: {
    afterrender: "FRMinv_material_control_aw_load",
  },
});
