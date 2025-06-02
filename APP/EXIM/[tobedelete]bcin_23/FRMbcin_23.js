var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.EXIM.bcin_23.FRMbcin_23", {
  extend: "Ext.window.Window",
  alias: "widget.FRMbcin_23",
  reference: "FRMbcin_23",
  title: "Header Dokumen BC 23",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: true,
  controller: "Cbcin_23",
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
              xtype: "container",
              layout: "hbox",
              items: [
                { xtype: "textfield", fieldLabel: "SUMBER DOKUMEN", name: "MODE_SOURCE", labelWidth: 110, width: 300, fieldCls: "fieldlock", readOnly: true },
                //
              ],
            },
            { xtype: "tbspacer", flex: 1 },
            { xtype: "textfield", fieldLabel: "STATUS DOKUMEN INTERNAL", name: "MODE_STATUS", labelWidth: 150, width: 400, fieldCls: "fieldlock", readOnly: true },
            { xtype: "numberfield", fieldLabel: "DOKUMEN ID", name: "ID_HEADER_ORI", labelWidth: 80, labelAlign: "right", width: 200, fieldCls: "fieldlock", value: 0, readOnly: true },
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
                        { xtype: "textfield", labelWidth: 100, width: 140, fieldLabel: "STATUS CEISA", name: "KODE_STATUS", fieldCls: "fieldlock", readOnly: false, id:'KODE_STATUS' },
                        { xtype: "textfield", width: 300, name: "URAIAN_STATUS", fieldCls: "fieldlock", format: "Y-m-d", readOnly: false },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "NOMOR AJU", name: "NOMOR_AJU", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "datefield", labelWidth: 50, width: 170, fieldLabel: "TGL", name: "TANGGAL_AJU", fieldCls: "fieldinput", format: "Y-m-d", readOnly: false },
                      ],
                    },
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
                        { xtype: "textfield", labelWidth: 100, width: 160, fieldLabel: "KPPBC BONGKAR", name: "KODE_KANTOR_BONGKAR", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "textfield", width: 200, name: "KODE_KANTOR_BONGKARNAME", fieldCls: "fieldlock", readOnly: true },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          vdata: {
                            modulename: "kppbcbongkar",
                            title: "Pilih KPPBC Bongkar",
                            popupwidth: 0.26,
                            popupheight: 0.85,
                          },
                          tofield: {
                            KODE_KANTOR_BONGKAR: "KODE_KANTOR",
                            KODE_KANTOR_BONGKARNAME: "URAIAN_KANTOR",
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
                        { xtype: "textfield", labelWidth: 100, width: 160, fieldLabel: "KPPBC PENGAWAS", name: "KODE_KANTOR", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "textfield", width: 200, name: "KODE_KANTORNAME", fieldCls: "fieldlock", readOnly: true },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          vdata: {
                            modulename: "kppbcpengawas",
                            title: "Pilih KPPBC Pengawas",
                            popupwidth: 0.26,
                            popupheight: 0.85,
                          },
                          tofield: {
                            KODE_KANTOR: "KODE_KANTOR",
                            KODE_KANTORNAME: "URAIAN_KANTOR",
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
                        { xtype: "textfield", labelWidth: 100, width: 160, fieldLabel: "TUJUAN", name: "KODE_TUJUAN_TPB", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "textfield", width: 200, name: "KODE_TUJUAN_TPBNAME", fieldCls: "fieldlock", readOnly: true },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          vdata: {
                            modulename: "tujuantpb",
                            title: "Pilih Tujuan TPB",
                            popupwidth: 0.37,
                            popupheight: 0.5,
                          },
                          tofield: {
                            KODE_TUJUAN_TPB: "KODE_TUJUAN_TPB",
                            KODE_TUJUAN_TPBNAME: "URAIAN_TUJUAN_TPB",
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
                          items: [{ xtype: "textfield", labelWidth: 100, width: 400, fieldLabel: "1. Nama", name: "NAMA_PEMASOK", fieldCls: "fieldinput", readOnly: true }],
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
                          name: "KODE_CARA_ANGKUT",
                          fieldLabel: "10. Cara Pengangkutan",
                          labelWidth: 150,
                          width: 320,
                          displayField: "DEFNAME",
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
                              { KODE_CARA_ANGKUT: "1", DEFNAME: "1. LAUT" },
                              { KODE_CARA_ANGKUT: "2", DEFNAME: "2. KERETA API" },
                              { KODE_CARA_ANGKUT: "3", DEFNAME: "3. DARAT" },
                              { KODE_CARA_ANGKUT: "4", DEFNAME: "4. UDARA" },
                              { KODE_CARA_ANGKUT: "5", DEFNAME: "5. POS" },
                              { KODE_CARA_ANGKUT: "6", DEFNAME: "6. MULTI MODA" },
                              { KODE_CARA_ANGKUT: "7", DEFNAME: "7. INSTALASI" },
                              { KODE_CARA_ANGKUT: "8", DEFNAME: "8. PERAIRAN" },
                              { KODE_CARA_ANGKUT: "9", DEFNAME: "9. LAINNYA" },
                            ],
                            fields: ["KODE_CARA_ANGKUT", "DEFNAME"],
                          }),
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
                              vdata: {
                                modulename: "negara",
                                title: "Pilih Negara",
                                popupwidth: 0.26,
                                popupheight: 0.85,
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
                          vdata: {
                            modulename: "pelabuhanmuat",
                            title: "Pilih Pelabuhan Muat",
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
                      margin: "5 0 0 0",
                      items: [
                        { xtype: "textfield", labelWidth: 150, width: 220, fieldLabel: "13. Pelabuhan Transit", name: "KODE_PEL_TRANSIT", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "textfield", width: 200, name: "KODE_PEL_TRANSITNAME", fieldCls: "fieldinput", readOnly: true },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          vdata: {
                            modulename: "pelabuhantransit",
                            title: "Pilih Pelabuhan Transit",
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
                      margin: "5 0 0 0",
                      items: [
                        { xtype: "textfield", labelWidth: 150, width: 220, fieldLabel: "14. Pelabuhan Bongkar", name: "KODE_PEL_BONGKAR", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "textfield", width: 200, name: "KODE_PEL_BONGKARNAME", fieldCls: "fieldinput", readOnly: true },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          vdata: {
                            modulename: "pelabuhanbongkar",
                            title: "Pilih Pelabuhan Bongkar",
                            popupwidth: 0.26,
                            popupheight: 0.85,
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
                  width: "100%",
                  bodyPadding: "5 0 0 0",
                  items: [
                    {
                      xtype: "grid",
                      pid: "GRIDbcin_23_kontainer",
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
                          //pid: "btinput_kontainer",
                          text: "input",
                          icon: vconfig.getstyle + "icon/new.ico",
                          tooltip: "Input Data Kontainer",
                          handler: function () {
                            var GRID = Ext.ComponentQuery.query("FRMbcin_23 grid[pid=GRIDbcin_23_kontainer]")[0];
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
                  title: "29. Jumlah dan jenis kemasan",
                  layout: "vbox",
                  width: "100%",
                  bodyPadding: "5 0 0 0",
                  items: [
                    {
                      xtype: "grid",
                      pid: "GRIDbcin_23_kemasan",
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
                                var GRID = Ext.ComponentQuery.query("FRMbcin_23 grid[pid=GRIDbcin_23_kemasan]")[0];
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
                          //pid: "btinput_kemasan",
                          text: "input",
                          icon: vconfig.getstyle + "icon/new.ico",
                          tooltip: "Input Data Kemasan",
                          handler: function () {
                            var GRID = Ext.ComponentQuery.query("FRMbcin_23 grid[pid=GRIDbcin_23_kemasan]")[0];
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
                            { xtype: "textfield", labelWidth: 100, width: 160, fieldLabel: "16. Fasilitas Impor", name: "IMPOR_KODE_DOKUMEN", fieldCls: "fieldinput", readOnly: false ,emptyText: "Kode Dokumen"},
                            { xtype: "textfield",  width: 200,  name: "IMPOR_URAIAN_DOKUMEN", fieldCls: "fieldinput", readOnly: false ,emptyText: "Keterangan Dokumen"},
                            { xtype: "textfield",  width: 200,  name: "IMPOR_NOMOR_DOKUMEN", fieldCls: "fieldinput", readOnly: false ,emptyText: "Nomor Dokumen"},
                            { xtype: "datefield", width: 100, name: "IMPOR_TANGGAL_DOKUMEN", fieldCls: "fieldinput", format: "Y-m-d", readOnly: false },
                          ],
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            {
                              xtype: "grid",
                              pid: "GRIDbcin_23_input_dokumen",
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
                                  text: "17. Input Dokumen",
                                  module: "module_input_dokumen",
                                  icon: vconfig.getstyle + "icon/new.ico",
                                  tooltip: "Input dokumen/lampiran",
                                  handler: "bttambah_dokumen_click",
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
                            { xtype: "textfield", labelWidth: 100, width: 160, fieldLabel: "21. Temp Penimbunan", name: "KODE_TPS", fieldCls: "fieldinput", readOnly: true },
                            { xtype: "textfield", width: 300, name: "KODE_TPS_NAME", fieldCls: "fieldinput", readOnly: true },
                            {
                              xtype: "button",
                              pid: "btsearch",
                              vdata: {
                                modulename: "tps",
                                title: "Pilih Temp Penimbunan",
                                popupwidth: 0.26,
                                popupheight: 0.85,
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
                        { xtype: "displayfield", width: 100, name: "KODE_VALUTA_NAME", readOnly: true },
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
                        /* { xtype: "textfield", labelWidth: 100, width: 150, fieldLabel: "Kode Harga", name: "KODE_CARA_BAYAR", fieldCls: "fieldinput", readOnly: true }, */
                        { xtype: "textfield", labelWidth: 100, width: 150, fieldLabel: "Kode Harga", name: "KODE_HARGA", fieldCls: "fieldinput", readOnly: true },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          vdata: {
                            modulename: "harga",
                            title: "Pilih Harga",
                            popupwidth: 0.37,
                            popupheight: 0.6,
                          },
                          icon: vconfig.getstyle + "icon/search.ico",
                          tooltip: "search",
                        },
                        { xtype: "tbspacer", width: 5 },
                        /*{ xtype: "displayfield", width: 400, name: "KODE_CARA_BAYARNAME", readOnly: true }, */
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
                              valueField: "KODE_ASURANSI",
                              fieldCls: "fieldinput",
                              allowBlank: false,
                              queryMode: "local",
                              forceSelection: true,
                              typeAhead: true,
                              minChars: 0,
                              anyMatch: true,
                              store: new Ext.data.Store({
                                data: [
                                  { KODE_ASURANSI: "0", ASURANSINAME: "-", MERGE: "-" },
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
                          pid: "GRIDbcin_23_input_item",
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
                                  tooltip: "Detail Item",
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
      pid: 'toolbar_FRMbcin_23',
      height: 30,
      dock: "top",
      items: [
        { xtypeL: "tbspacer", width: 5 },
        { xtype: "button", text: "Cancel Dokumen", id: "btcancel_dokumen",  pid: "btcancel_dokumen", icon: vconfig.getstyle + "icon/delete.ico", tooltip: "Cancel Dokumen BC 23", handler: "FRMbcin_23_btcancel_click" },
        { xtype: "button", text: "Update Dokumen", id: "btsimpan_draft", pid: "btsimpan_draft", icon: vconfig.getstyle + "icon/save.gif", tooltip: "Proses Update Dokumen BC 23", handler: "FRMbcin_23_btupdate_click" },
        { xtype: "button", text: "Kunci Perubahan Dokumen",  id: "btlock_draft", pid: "btlock_draft", icon: vconfig.getstyle + "icon/lock.png", tooltip: "Proses Lock Dokumen BC 23", handler: "FRMbcin_23_btlock_click" },
        "-",
        { xtype: "button", text: "Send To Ceisa", id: "btsend_to_ceisa", pid: "btsend_to_ceisa", icon: vconfig.getstyle + "icon/up.ico", tooltip: "Kirim Dokumen Ke Aplikasi Ceisa", handler: "FRMbcin_23_btsendtoceisa_click" },
        { xtype: "button", text: "Get From Ceisa", id: "bt_get_from_ceisa", pid: "bt_get_from_ceisa", icon: vconfig.getstyle + "icon/down.ico", tooltip: "Sinkronisasi Dokumen dari Aplikasi Ceisa", handler: "FRMbcin_23_btgetfromceisa_click" },
      ],
      // other options....
    },
  ],
  listeners: {
    afterrender: "FRMbcin_23_load",
  },
});
