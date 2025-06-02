var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.EXIM.bcout_25.FRMbcout_25", {
  extend: "Ext.window.Window",
  alias: "widget.FRMbcout_25",
  reference: "FRMbcout_25",
  title: "Header Dokumen BC 25",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: false,
  controller: "Cbcout_25",
  //y: -110,
  bodyPadding: "5 5 5 5",
  width: mainpanel.getWidth() * 0.98,
  height: mainpanel.getHeight() * 0.9,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
  items: [
    {
      xtype: "form",
      border: false,
      frame: false,
      autoScroll: true,
      flex: 1,
      fieldDefaults: {
        labelAlign: "left",
        labelWidth: 85,
        margin: "5 10 0 0",
      },
      items: [
        {
          xtype: "panel",
          height: 50,
          layout: "hbox",
          border: false,
          frame: false,
          items: [
            {
              xtype: "container",
              layout: "hbox",
              items: [
                { xtype: "textfield", fieldLabel: "Asal Data", name: "ASAL_DATA", labelWidth: 60, width: 200, fieldCls: "fieldlock", readOnly: true },
                { xtype: "textfield", fieldLabel: "Nik", name: "NIK ", labelWidth: 30, width: 200, fieldCls: "fieldlock", readOnly: true },
                //
              ],
            },
            { xtype: "tbspacer", flex: 1 },
            { xtype: "textfield", fieldLabel: "Seri Dokumen", name: "SERI", labelWidth: 80, width: 200, fieldCls: "fieldlock", readOnly: true },
            { xtype: "numberfield", fieldLabel: "Kode Dokumen", name: "KODE_DOKUMEN", labelWidth: 90, labelAlign: "right", width: 200, fieldCls: "fieldlock", readOnly: true },
          ],
        },
        {
          xtype: "panel",
          flex: 1,
          border: false,
          frame: false,
          layout: "hbox",
          margin: "5 5 5 5",
          items: [
            //
            {
              xtype: "panel",
              flex: 1,
              border: false,
              frame: false,
              items: [
                {
                  xtype: "fieldset",
                  padding: "0 5 5 5",
                  layout: "vbox",
                  items: [
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "Nomor Aju", name: "NOMOR_AJU", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "datefield", labelWidth: 80, width: 190, fieldLabel: "Tanggal Aju", name: "TANGGAL_AJU", fieldCls: "fieldinput", format: "Y-m-d", readOnly: false },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "Nomor Daftar", name: "NOMOR_DAFTAR", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "datefield", labelWidth: 80, width: 190, fieldLabel: "Tanggal Daftar", name: "TANGGAL_DAFTAR", fieldCls: "fieldinput", format: "Y-m-d", readOnly: false },
                      ],
                    },
                  ],
                },
                {
                  xtype: "fieldset",
                  title: "Entitas (1)",
                  padding: "0 5 5 5",
                  layout: "vbox",
                  items: [
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 185, fieldLabel: "1. Seri,Kode,Jenis", name: "SERI_ENTITAS", fieldCls: "fieldlock", readOnly: true, value: "1" },
                        { xtype: "textfield", width: 65, name: "KODE_ENTITAS1", fieldCls: "fieldlock", readOnly: true, value: "3" },
                        { xtype: "textfield", width: 65, name: "KODE_JENIS_IDENTITAS1", fieldCls: "fieldlock", readOnly: true, value: "5" },
                        { xtype: "textfield", labelWidth: 80, width: 145, fieldLabel: "Kode Status", name: "KODE_STATUS", fieldCls: "fieldlock", readOnly: true, value: "LAINNYA" },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 200, fieldLabel: "2. Nama", name: "KODE_ID_PENGUSAHA", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "textfield", width: 290, name: "NAMA_PENGUSAHA", fieldCls: "fieldinput", 
                        readOnly: true },
                        {
                          xtype: "button",
                          margin: "5 0 0 0",
                          pid: "btsearch_entitas_1",
                          handler: "btsearch_entitas_1_click",
                          vdata: {
                            title: "Pilih Seri Entitas 1",
                            popupwidth: 0.3,
                            popupheight: 0.7,
                          },
                          icon: vconfig.getstyle + "icon/search.ico",
                          tooltip: "Search Entitas 1",
                        },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 470, labelAlign: "left", fieldLabel: "3. Alamat", name: "ALAMAT_PENGUSAHA", fieldCls: "fieldlock", readOnly: true },
                        { xtype: "textfield", width: 50, name: "KODE_NEGARA_TUJUAN", fieldCls: "fieldlock", readOnly: true, value: "" },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 300, labelAlign: "left", fieldLabel: "4. Nomor & Tgl Izin", name: "NOMOR_IJIN_BPK_PENGUSAHA", fieldCls: "fieldlock", readOnly: true },
                        { xtype: "textfield", width: 100, name: "TANGGAL_IJIN_BPK_PENGUSAHA", fieldCls: "fieldlock", readOnly: true, value: "" },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 250, labelAlign: "left", fieldLabel: "5. NIB & NIPER", name: "NIB_PENGUSAHA", fieldCls: "fieldlock", readOnly: true },
                        { xtype: "textfield", width: 250, name: "NIPER_PENGUSAHA", fieldCls: "fieldlock", readOnly: true, value: "" },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 250, labelAlign: "left", fieldLabel: "6. API & No Identitas", name: "KODE_JENIS_API_PENGUSAHA", fieldCls: "fieldlock", readOnly: true },
                        { xtype: "textfield", width: 250, name: "ID_PENGUSAHA", fieldCls: "fieldlock", readOnly: true, value: "" },
                      ],
                    },
                  ],
                },
                {
                  xtype: "fieldset",
                  title: "Entitas (2)",
                  padding: "0 5 5 5",
                  layout: "vbox",
                  items: [
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 185, fieldLabel: "1. Seri,Kode,Jenis", name: "SERI_ENTITAS", fieldCls: "fieldlock", readOnly: true, value: "1" },
                        { xtype: "textfield", width: 65, name: "KODE_ENTITAS1", fieldCls: "fieldlock", readOnly: true, value: "3" },
                        { xtype: "textfield", width: 65, name: "KODE_JENIS_IDENTITAS1", fieldCls: "fieldlock", readOnly: true, value: "5" },
                        { xtype: "textfield", labelWidth: 80, width: 145, fieldLabel: "Kode Status", name: "KODE_STATUS", fieldCls: "fieldlock", readOnly: true, value: "LAINNYA" },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 200, fieldLabel: "2. Nama", name: "KODE_ID_PENGUSAHA", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "textfield", width: 290, name: "NAMA_PENGUSAHA", fieldCls: "fieldinput", 
                        readOnly: true },
                        {
                          xtype: "button",
                          margin: "5 0 0 0",
                          pid: "btsearch_entitas_1",
                          handler: "btsearch_entitas_1_click",
                          vdata: {
                            title: "Pilih Seri Entitas 1",
                            popupwidth: 0.3,
                            popupheight: 0.7,
                          },
                          icon: vconfig.getstyle + "icon/search.ico",
                          tooltip: "Search Entitas 1",
                        },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 470, labelAlign: "left", fieldLabel: "3. Alamat", name: "ALAMAT_PENGUSAHA", fieldCls: "fieldlock", readOnly: true },
                        { xtype: "textfield", width: 50, name: "KODE_NEGARA_TUJUAN", fieldCls: "fieldlock", readOnly: true, value: "" },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 300, labelAlign: "left", fieldLabel: "4. Nomor & Tgl Izin", name: "NOMOR_IJIN_BPK_PENGUSAHA", fieldCls: "fieldlock", readOnly: true },
                        { xtype: "textfield", width: 100, name: "TANGGAL_IJIN_BPK_PENGUSAHA", fieldCls: "fieldlock", readOnly: true, value: "" },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 250, labelAlign: "left", fieldLabel: "5. NIB & NIPER", name: "NIB_PENGUSAHA", fieldCls: "fieldlock", readOnly: true },
                        { xtype: "textfield", width: 250, name: "NIPER_PENGUSAHA", fieldCls: "fieldlock", readOnly: true, value: "" },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 250, labelAlign: "left", fieldLabel: "6. API & No Identitas", name: "KODE_JENIS_API_PENGUSAHA", fieldCls: "fieldlock", readOnly: true },
                        { xtype: "textfield", width: 250, name: "ID_PENGUSAHA", fieldCls: "fieldlock", readOnly: true, value: "" },
                      ],
                    },
                  ],
                },
                {
                  xtype: "fieldset",
                  title: "Entitas (3)",
                  padding: "0 5 5 5",
                  layout: "vbox",
                  items: [
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 185, fieldLabel: "1. Seri,Kode,Jenis", name: "SERI_ENTITAS", fieldCls: "fieldlock", readOnly: true, value: "1" },
                        { xtype: "textfield", width: 65, name: "KODE_ENTITAS1", fieldCls: "fieldlock", readOnly: true, value: "3" },
                        { xtype: "textfield", width: 65, name: "KODE_JENIS_IDENTITAS1", fieldCls: "fieldlock", readOnly: true, value: "5" },
                        { xtype: "textfield", labelWidth: 80, width: 145, fieldLabel: "Kode Status", name: "KODE_STATUS", fieldCls: "fieldlock", readOnly: true, value: "LAINNYA" },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 200, fieldLabel: "2. Nama", name: "KODE_ID_PENGUSAHA", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "textfield", width: 290, name: "NAMA_PENGUSAHA", fieldCls: "fieldinput", 
                        readOnly: true },
                        {
                          xtype: "button",
                          margin: "5 0 0 0",
                          pid: "btsearch_entitas_1",
                          handler: "btsearch_entitas_1_click",
                          vdata: {
                            title: "Pilih Seri Entitas 1",
                            popupwidth: 0.3,
                            popupheight: 0.7,
                          },
                          icon: vconfig.getstyle + "icon/search.ico",
                          tooltip: "Search Entitas 1",
                        },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 470, labelAlign: "left", fieldLabel: "3. Alamat", name: "ALAMAT_PENGUSAHA", fieldCls: "fieldlock", readOnly: true },
                        { xtype: "textfield", width: 50, name: "KODE_NEGARA_TUJUAN", fieldCls: "fieldlock", readOnly: true, value: "" },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 300, labelAlign: "left", fieldLabel: "4. Nomor & Tgl Izin", name: "NOMOR_IJIN_BPK_PENGUSAHA", fieldCls: "fieldlock", readOnly: true },
                        { xtype: "textfield", width: 100, name: "TANGGAL_IJIN_BPK_PENGUSAHA", fieldCls: "fieldlock", readOnly: true, value: "" },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 250, labelAlign: "left", fieldLabel: "5. NIB & NIPER", name: "NIB_PENGUSAHA", fieldCls: "fieldlock", readOnly: true },
                        { xtype: "textfield", width: 250, name: "NIPER_PENGUSAHA", fieldCls: "fieldlock", readOnly: true, value: "" },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 250, labelAlign: "left", fieldLabel: "6. API & No Identitas", name: "KODE_JENIS_API_PENGUSAHA", fieldCls: "fieldlock", readOnly: true },
                        { xtype: "textfield", width: 250, name: "ID_PENGUSAHA", fieldCls: "fieldlock", readOnly: true, value: "" },
                      ],
                    },
                  ],
                },
                {
                  xtype: "fieldset",
                  title: "Pengangkutan",
                  layout: "vbox",
                  flex: 1,
                  bodyPadding: "0 5 5 5",
                  items: [
                    {
                      xtype: "container",
                      layout: "hbox",
                      margin: "5 0 0 0",
                      items: [
                        {
                          xtype: "combobox",
                          name: "KODE_CARA_ANGKUT",
                          fieldLabel: "Cara Pengangkutan",
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
                          fieldLabel: "Nama Sarana Pengangkut",
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
                            { xtype: "textfield", labelWidth: 35, width: 70, labelAlign: "right", fieldLabel: "Negara", name: "KODE_BENDERA", fieldCls: "fieldlock", readOnly: true },
                            { xtype: "textfield", labelWidth: 20, width: 120, name: "KODE_BENDERA_NAME", fieldCls: "fieldlock", readOnly: true },
                            {
                              xtype: "button",
                              margin: "5 0 0 0",
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
                        { xtype: "textfield", labelWidth: 150, width: 220, fieldLabel: "Pelabuhan Muat", name: "KODE_PEL_MUAT", fieldCls: "fieldlock", readOnly: true },
                        { xtype: "textfield", width: 200, name: "KODE_PEL_MUATNAME", fieldCls: "fieldlock", readOnly: true },
                        {
                          xtype: "button",
                          margin: "5 0 0 0",
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
                        { xtype: "textfield", labelWidth: 150, width: 220, fieldLabel: "Pelabuhan Transit", name: "KODE_PEL_TRANSIT", fieldCls: "fieldlock", readOnly: true },
                        { xtype: "textfield", width: 200, name: "KODE_PEL_TRANSITNAME", fieldCls: "fieldlock", readOnly: true },
                        {
                          xtype: "button",
                          margin: "5 0 0 0",
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
                        { xtype: "textfield", labelWidth: 150, width: 220, fieldLabel: "Pelabuhan Bongkar", name: "KODE_PEL_BONGKAR", fieldCls: "fieldlock", readOnly: true },
                        { xtype: "textfield", width: 200, name: "KODE_PEL_BONGKARNAME", fieldCls: "fieldlock", readOnly: true },
                        {
                          xtype: "button",
                          margin: "5 0 0 0",
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
                  title: "Pungutan",
                  width: "100%",
                  bodyPadding: "5 0 0 0",
                  items: [
                    { xtype: "textfield", labelWidth: 80, width: 130, fieldLabel: "Id Pungutan", name: "IDPUNGUTAN", fieldCls: "fieldlock", readOnly: true },
                    { xtype: "textfield", labelWidth: 80, width: 200, fieldLabel: "Nilai Pungutan", name: "NILAIPUNGUTAN", fieldCls: "fieldinput", readOnly: false },
                    { xtype: "textfield", labelWidth: 80, width: 200, fieldLabel: "Fasilitas Tarif", name: "KODEFASILITASTARIF", fieldCls: "fieldinput", readOnly: false },
                    { xtype: "textfield", labelWidth: 80, width: 200, fieldLabel: "Jenis Pungutan", name: "KODEJENISPUNGUTAN", fieldCls: "fieldinput", readOnly: false },
                  ],
                },
                {
                  xtype: "fieldset",
                  title: "Kontainer",
                  layout: "vbox",
                  bodyPadding: "5 0 0 0",
                  items: [
                    {
                      xtype: "grid",
                      pid: "GRIDbcin_25_kontainer",
                      emptyText: "No Matching Records",
                      width: 615,
                      height: 200,
                      plugins: {
                        cellediting: {
                          clicksToEdit: 1,
                        },
                      },
                      store: new Ext.data.Store({
                        data: [],
                        fields: ["SERI_KONTAINER","NOMOR_KONTAINER", "KODE_UKURAN_KONTAINER", "KODE_TIPE_KONTAINER"],
                      }),
                      columns: [
                        { header: "ID", dataIndex: "ID", sortable: true, width: 65, filter: { xtype: "textfield" }, hidden: true, align: "center" },
                        { xtype: "rownumberer", width: 40 },
                        {
                          header: "Seri Kontainer",
                          dataIndex: "SERI_KONTAINER",
                          sortable: true,
                          width: 120,
                          editor: {
                            xtype: "textfield",
                            allowBlank: false,
                          },
                        },
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
                            var GRID = Ext.ComponentQuery.query("FRMbcin_25 grid[pid=GRIDbcin_25_kontainer]")[0];
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
                  title: "Jumlah dan jenis kemasan",
                  layout: "vbox",
                  flex: 1,
                  bodyPadding: "5 0 0 0",
                  items: [
                    {
                      xtype: "grid",
                      pid: "GRIDbcin_25_kemasan",
                      emptyText: "No Matching Records",
                      width: 615,
                      height: 200,
                      plugins: {
                        cellediting: {
                          clicksToEdit: 1,
                        },
                      },
                      store: new Ext.data.Store({
                        data: [],
                        fields: ["JUMLAH_KEMASAN", "SERI_KEMASAN", "KODE_JENIS_KEMASAN", "MERK_KEMASAN"],
                      }),
                      columns: [
                        { xtype: "rownumberer", width: 40 },
                        {
                          header: "Seri",
                          dataIndex: "SERI_KEMASAN",
                          sortable: true,
                          width: 80,
                          editor: {
                            xtype: "textfield",
                            allowBlank: false,
                          },
                        },
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
                            var GRID = Ext.ComponentQuery.query("FRMbcin_25 grid[pid=GRIDbcin_25_kemasan]")[0];
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
            { xtype: "tbspacer", width: 10 },
            {
              xtype: "panel",
              flex: 1,
              border: false,
              frame: false,
              items: [
                {
                  xtype: "fieldset",
                  layout: "hbox",
                  padding: "0 5 5 5",
                  items: [
                    {
                      xtype: "container",
                      layout: "vbox",
                      items: [
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "textfield", labelWidth: 100, width: 160, fieldLabel: "Kantor Bongkar", name: "KODE_KANTOR_BONGKAR", fieldCls: "fieldinput", readOnly: true },
                            { xtype: "textfield", width: 200, name: "KODE_KANTOR_BONGKARNAME", fieldCls: "fieldlock", readOnly: true },
                            {
                              xtype: "button",
                              margin: "5 0 0 0",
                              pid: "btsearch",
                              vdata: {
                                modulename: "kppbcbongkar",
                                title: "Pilih Kantor Bongkar",
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
                            { xtype: "textfield", labelWidth: 100, width: 160, fieldLabel: "Kantor Pabean", name: "KODE_KANTOR", fieldCls: "fieldinput", readOnly: true },
                            { xtype: "textfield", width: 200, name: "KODE_KANTORNAME", fieldCls: "fieldlock", readOnly: true },
                            {
                              xtype: "button",
                              margin: "5 0 0 0",
                              pid: "btsearch",
                              vdata: {
                                modulename: "kppbcpengawas",
                                title: "Pilih Kantor Pabean",
                                popupwidth: 0.26,
                                popupheight: 0.85,
                              },
                              tofield: {
                                KODEKANTOR: "KODE_KANTOR",
                                KODEKANTORNAME: "URAIAN_KANTOR",
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
                            { xtype: "textfield", labelWidth: 100, width: 160, fieldLabel: "Tujuan", name: "KODE_TUJUAN_TPB", fieldCls: "fieldinput", readOnly: true },
                            { xtype: "textfield", width: 200, name: "KODE_TUJUAN_TPBNAME", fieldCls: "fieldlock", readOnly: true },
                            {
                              xtype: "button",
                              margin: "5 0 0 0",
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
                {
                  xtype: "fieldset",
                  title: "Dokumen",
                  layout: "hbox",
                  padding: "0 5 5 5",
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
                            { xtype: "textfield", labelWidth: 100, width: 400, fieldLabel: "Invoice", name: "INVOICE_NOMOR_DOKUMEN", fieldCls: "fieldlock", readOnly: true },
                            { xtype: "datefield", width: 100, name: "INVOICE_TANGGAL_DOKUMEN", fieldCls: "fieldlock", format: "Y-m-d", readOnly: true },
                          ],
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "textfield", labelWidth: 100, width: 180, fieldLabel: "Fasilitas Impor", name: "IMPOR_KODE_DOKUMEN", fieldCls: "fieldinput", readOnly: false ,emptyText: "Kode Dokumen"},
                            { xtype: "textfield",  width: 150,  name: "IMPOR_URAIAN_DOKUMEN", fieldCls: "fieldinput", readOnly: false ,emptyText: "Keterangan Dokumen"},
                            { xtype: "textfield",  width: 150,  name: "IMPOR_NOMOR_DOKUMEN", fieldCls: "fieldinput", readOnly: false ,emptyText: "Nomor Dokumen"},
                            { xtype: "datefield", width: 100, name: "IMPOR_TANGGAL_DOKUMEN", fieldCls: "fieldinput", format: "Y-m-d", readOnly: false },
                          ],
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "Nomor Bc 11", name: "NOMOR_BC11", fieldCls: "fieldinput", readOnly: true },
                            { xtype: "datefield", labelWidth: 60, width: 170, fieldLabel: "Tgl", name: "TANGGAL_BC11", fieldCls: "fieldinput", format: "Y-m-d", readOnly: false },
                          ],
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "Sub Pos Bc 11", name: "SUBPOS_BC11", fieldCls: "fieldinput", readOnly: true },
                            { xtype: "textfield", labelWidth: 60, width: 170, fieldLabel: "Pos Bc 11", name: "POS_BC11", fieldCls: "fieldinput", readOnly: true },
                          ],
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "textfield", labelWidth: 100, width: 170, fieldLabel: "Tempat Penimbunan", name: "KODE_TPS", fieldCls: "fieldlock", readOnly: true },
                            { xtype: "textfield", width: 270, name: "KODE_TPS_NAME", fieldCls: "fieldlock", readOnly: false },
                            {
                              xtype: "button",
                              pid: "btsearch",
                              margin: "5 5 5 0",
                              vdata: {
                                modulename: "tps",
                                title: "Pilih Tempat Penimbunan",
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
                            {
                              xtype: "grid",
                              pid: "GRIDbcin_25_input_dokumen",
                              emptyText: "No Matching Records",
                              width: 625,
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
                                { header: "Seri", dataIndex: "SERI_DOKUMEN", sortable: true, width: 50, filter: { xtype: "textfield" } },
                                { header: "Kode", dataIndex: "KODE_JENIS_DOKUMEN", sortable: true, width: 50, filter: { xtype: "textfield" } },
                                {
                                  header: "Nomor",
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
                                  header: "Tanggal",
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
                  ],
                },
                {
                  xtype: "fieldset",
                  title: "Amount",
                  layout: "vbox",
                  padding: "0 5 5 5",
                  items: [
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 65, width: 120, fieldLabel: "Valuta", name: "KODE_VALUTA", fieldCls: "fieldlock", readOnly: true },
                        { xtype: "textfield", width: 250, name: "KODE_VALUTA_NAME", fieldCls: "fieldlock", readOnly: false },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          margin: "5 10 0 0",
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
                      layout: "vbox",
                      padding: "0 5 5 5",
                      items: [
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "currencyfield", labelWidth: 60, width: 200, fieldLabel: "Fob", name: "FOB", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                            { xtype: "currencyfield", labelWidth: 60, width: 200, fieldLabel: "Ndpbm", name: "NDPBM", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                          ],
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "currencyfield", labelWidth: 60, width: 200, fieldLabel: "Cif", name: "CIF", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                            { xtype: "currencyfield", labelWidth: 60, width: 200, fieldLabel: "Cif Rupiah", name: "CIF_RUPIAH", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                          ],
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "currencyfield", labelWidth: 60, width: 200, fieldLabel: "Freight", name: "FREIGHT", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                            { xtype: "currencyfield", labelWidth: 60, width: 200, fieldLabel: "Bruto", name: "BRUTO", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                          ],
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "currencyfield", labelWidth: 60, width: 200, fieldLabel: "Freight", name: "FREIGHT", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                            { xtype: "currencyfield", labelWidth: 60, width: 200, fieldLabel: "Netto", name: "NETTO", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  xtype: "fieldset",
                  title: "Barang",
                  flex: 1,
                  bodyPadding: "5 0 0 0",
                  items: [
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        {
                          xtype: "grid",
                          pid: "GRIDbcin_25_input_item",
                          emptyText: "No Matching Records",
                          width: 615,
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
                            { header: "Seri Barang", dataIndex: "SERI_BARANG", sortable: true, width: 100, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Asuransi", dataIndex: "ASURANSI", sortable: true, width: 100, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Cif", dataIndex: "CIF", sortable: true, width: 100, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Cif Rupiah", dataIndex: "CIF_RUPIAH", sortable: true, width: 100, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Harga Ekspor", dataIndex: "HARGA_EKSPOR", sortable: true, width: 100, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Isi Perkemasan", dataIndex: "ISI_PERKEMASAN", sortable: true, width: 100, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Harga Penyerahan", dataIndex: "HARGA_PENYERAHAN", sortable: true, width: 110, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Harga Perolehan", dataIndex: "HARGA_PEROLEHAN", sortable: true, width: 110, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Jumlah Kemasan", dataIndex: "JUMLAH_KEMASAN", sortable: true, width: 100, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Jumlah Satuan", dataIndex: "JUMLAH_SATUAN", sortable: true, width: 100, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Kode Dokumen", dataIndex: "KODE_DOKUMEN", sortable: true, width: 110, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Kode Jenis Kemasan", dataIndex: "KODE_JENIS_KEMASAN", sortable: true, width: 130, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Kode Negara Asal", dataIndex: "KODE_NEGARA_ASAL", sortable: true, width: 130, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Kode Satuan Barang", dataIndex: "KODE_SATUAN_BARANG", sortable: true, width: 130, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Kode Asal Barang", dataIndex: "KODE_ASAL_BARANG", sortable: true, width: 130, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Kode Asal Bahan Baku", dataIndex: "KODE_ASAL_BAHANBAKU", sortable: true, width: 130, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Netto", dataIndex: "NETTO", sortable: true, width: 100, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Nilai Barang", dataIndex: "NILAI_BARANG", sortable: true, width: 100, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Nilai Jasa", dataIndex: "NILAI_JASA", sortable: true, width: 100, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Uang Muka", dataIndex: "UANG_MUKA", sortable: true, width: 100, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Pos Tarif", dataIndex: "POS_TARIF", sortable: true, width: 100, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Tipe", dataIndex: "TIPE", sortable: true, width: 80, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Ndpbm", dataIndex: "NDPBM", sortable: true, width: 80, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Ukuran", dataIndex: "UKURAN", sortable: true, width: 80, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Merek", dataIndex: "MREK", sortable: true, width: 80, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Uraian", dataIndex: "URAIAN", sortable: true, width: 100, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Spesifikasi Lain", dataIndex: "SPESIFIKASI_LAIN", sortable: true, width: 130, hidden: false, filter: { xtype: "textfield" } },
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
                }
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
        { xtype: "button", text: "Cancel Dokumen", pid: "btcancel_dokumen", icon: vconfig.getstyle + "icon/delete.ico", tooltip: "Cancel Dokumen BC 25", handler: "FRMbcout_25_btcancel_click" },
        { xtype: "button", text: "Update Dokumen", pid: "btsimpan_draft", icon: vconfig.getstyle + "icon/save.gif", tooltip: "Proses Update Dokumen BC 25", handler: "FRMbcout_25_btupdate_click" },
        { xtype: "button", text: "Kunci Perubahan Dokumen", pid: "btlock_draft", icon: vconfig.getstyle + "icon/lock.png", tooltip: "Proses Lock Dokumen BC 25", handler: "FRMbcout_25_btlock_click" },
        "-",
        { xtype: "button", text: "Send To Ceisa", pid: "btgenerate_draft", icon: vconfig.getstyle + "icon/up.ico", tooltip: "Kirim Dokumen Ke Aplikasi Ceisa", handler: "FRMbcout_25_btsendtoceisa_click" },
        { xtype: "button", text: "Get From Ceisa", pid: "btgenerate_draft", icon: vconfig.getstyle + "icon/down.ico", tooltip: "Sinkronisasi Dokumen dari Aplikasi Ceisa", handler: "FRMbcout_25_btgetfromceisa_click" },
      ],
      // other options....
    },
  ],
  listeners: {
   //
  },
});
