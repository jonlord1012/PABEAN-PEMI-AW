var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.EXIM.bcout_27_aw.FRMbcout_27_aw", {
  extend: "Ext.window.Window",
  alias: "widget.FRMbcout_27_aw",
  reference: "FRMbcout_27_aw",
  title: "Header Dokumen BC 27 ( AW )",
  modal: true,
  closeAction: "destroy",
  centered: true,
  requires: [
    //
    "NJC.EXIM.bcout_27_aw.Cbcout_27_aw",
  ],
  controller: "Cbcout_27_aw",
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
          layout: { type: "hbox", pack: "start", align: "stretch" },
          border: false,
          frame: false,
          padding: "0 10 5 10",
          items: [
            {
              xtype: "container",
              layout: "hbox",
              flex: 1,
              items: [
                { xtype: "textfield", fieldLabel: "Asal Data", name: "ASAL_DATA", labelWidth: 60, width: 200, fieldCls: "fieldlock", readOnly: true },
                { xtype: "textfield", fieldLabel: "Nik", name: "NIK", labelWidth: 30, width: 200, fieldCls: "fieldlock", readOnly: true },
              ],
            },
            {
              xtype: "container",
              layout: { type: "vbox", pack: "start", align: "stretch" },
              flex: 1,
              padding: "0 0 0 10",
              items: [
                {
                  xtype: "container",
                  layout: { type: "hbox", pack: "start", align: "stretch" },
                  items: [
                    { xtype: "textfield", fieldLabel: "Seri Dokumen", name: "SERI", labelWidth: 80, width: 200, fieldCls: "fieldlock", readOnly: true },
                    { xtype: "textfield", fieldLabel: "Kode Dokumen", name: "KODE_DOKUMEN_PABEAN", labelWidth: 90, labelAlign: "right", width: 200, fieldCls: "fieldlock", readOnly: true },
                    { xtype: "textfield", fieldLabel: "Sumber Data", name: "MODE_SOURCE", labelWidth: 80, labelAlign: "right", width: 200, fieldCls: "fieldlock", readOnly: true },
                    { xtype: "textfield", name: "ID_COMPANY", labelAlign: "right", width: 200, fieldCls: "fieldlock", readOnly: true },
                  ],
                },
                {
                  xtype: "container",
                  layout: { type: "hbox", pack: "start", align: "stretch" },
                  items: [
                    { xtype: "textfield", fieldLabel: "Status", name: "POSTINGSTATUS", labelWidth: 80, width: 200, fieldCls: "fieldlock", readOnly: true },
                    { xtype: "textfield", fieldLabel: "Posting User", name: "POSTINGUSER", labelWidth: 90, labelAlign: "right", width: 200, fieldCls: "fieldlock", readOnly: true },
                    { xtype: "textfield", fieldLabel: "Posting Date", name: "POSTINGDATE", labelWidth: 80, labelAlign: "right", width: 200, fieldCls: "fieldlock", readOnly: true },
                  ],
                },
              ],
            },
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
              padding: "5 5 5 5",
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
                        { xtype: "textfield", labelWidth: 120, width: 350, fieldLabel: "Nomor Aju", name: "NOMOR_AJU", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "datefield", labelWidth: 80, width: 190, fieldLabel: "Tanggal Aju", name: "TANGGAL_AJU", fieldCls: "fieldinput", format: "Y-m-d", readOnly: true },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 350, fieldLabel: "Nomor Daftar", name: "NOMOR_DAFTAR", fieldCls: "fieldinput", readOnly: false },
                        { xtype: "datefield", labelWidth: 80, width: 190, fieldLabel: "Tanggal Daftar", name: "TANGGAL_DAFTAR", fieldCls: "fieldinput", format: "Y-m-d", readOnly: false },
                      ],
                    },
                  ],
                },
                {
                  xtype: "fieldset",
                  title: "Pengusaha (Entitas 1)",
                  padding: "0 5 5 5",
                  layout: "vbox",
                  items: [
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 185, fieldLabel: "1. Seri,Kode,Jenis", name: "ENTITAS1_SERIENTITAS", fieldCls: "fieldlock", readOnly: true, value: "" },
                        { xtype: "textfield", width: 65, name: "ENTITAS1_KODEENTITAS", fieldCls: "fieldlock", readOnly: true, value: "" },
                        { xtype: "textfield", width: 65, name: "ENTITAS1_KODEJENISIDENTITAS", fieldCls: "fieldlock", readOnly: true, value: "" },
                        { xtype: "textfield", labelWidth: 80, width: 145, fieldLabel: "Kode Status", name: "ENTITAS1_KODESTATUS", fieldCls: "fieldlock", readOnly: true, value: "" },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        //
                        { xtype: "textfield", labelWidth: 120, width: 500, fieldLabel: "2. Nama", name: "ENTITAS1_NAMAENTITAS", fieldCls: "fieldinput", readOnly: true, value: "" },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          margin: "5 0 0 0",
                          vdata: {
                            modulename: "Pengusaha",
                            title: "Pilih Pengusaha",
                            popupwidth: 0.7,
                            popupheight: 0.7,
                          },
                          icon: vconfig.getstyle + "icon/search.ico",
                          tooltip: "Search Pengusaha",
                          handler: function () {
                            try {
                              var me = this;
                              var FRM = me.up("form");
                              var GRIDpelabuhan = Ext.create(
                                "NJC.EXIM.bcout_27_aw.GRIDentitas",
                                {
                                  listeners: {
                                    itemdblClick: function (cmp, rec) {
                                      FRM.getForm().setValues({
                                        ENTITAS1_NAMAENTITAS: rec.data.NAMA,
                                        ENTITAS1_ALAMATENTITAS: rec.data.ALAMAT,
                                        ENTITAS1_KODENEGARA: rec.data.KODE_NEGARA,
                                        ENTITAS1_NOMORIJINENTITAS: rec.data.NOMOR_IJIN_ENTITAS,
                                        ENTITAS1_TANGGALIJINENTITAS: rec.data.TANGGAL_IJIN_ENTITAS,
                                        ENTITAS1_NIBENTITAS: rec.data.NIB_ENTITAS,
                                        ENTITAS1_KODEJENISAPI: rec.data.KODE_JENIS_API,
                                        ENTITAS1_NOMORIDENTITAS: rec.data.NOMOR_IDENTITAS,
                                      });
                                      popup.close();
                                    },
                                  },
                                },
                                this
                              );
                              var popup = Ext.create(
                                "Ext.window.Window",
                                {
                                  alias: "widget.popup_pengusaha",
                                  reference: "popup_pengusaha",
                                  title: "Pilih Pengusaha",
                                  modal: true,
                                  closeAction: "destroy",
                                  centered: true,
                                  autoScroll: true,
                                  //y: -110,
                                  width: mainpanel.getWidth() * 0.6,
                                  height: mainpanel.getHeight() * 0.7,
                                  layout: "fit",
                                  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
                                  items: [{ xtype: GRIDpelabuhan }],
                                },
                                this
                              );
                              return popup.show();
                            } catch (ex) {
                              COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                            }
                          },
                        },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 470, labelAlign: "left", fieldLabel: "3. Alamat", name: "ENTITAS1_ALAMATENTITAS", fieldCls: "fieldlock", readOnly: true },
                        { xtype: "textfield", width: 50, name: "ENTITAS1_KODENEGARA", fieldCls: "fieldlock", readOnly: true, value: "" },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 300, labelAlign: "left", fieldLabel: "4. Nomor & Tgl Izin", name: "ENTITAS1_NOMORIJINENTITAS", fieldCls: "fieldlock", readOnly: true },
                        { xtype: "textfield", width: 100, name: "ENTITAS1_TANGGALIJINENTITAS", fieldCls: "fieldlock", readOnly: true, value: "" },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        //
                        { xtype: "textfield", labelWidth: 120, width: 250, labelAlign: "left", fieldLabel: "5. NIB", name: "ENTITAS1_NIBENTITAS", fieldCls: "fieldlock", readOnly: true },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 250, labelAlign: "left", fieldLabel: "6. API & No Identitas", name: "ENTITAS1_KODEJENISAPI", fieldCls: "fieldlock", readOnly: true },
                        { xtype: "textfield", width: 250, name: "ENTITAS1_NOMORIDENTITAS", fieldCls: "fieldlock", readOnly: true, value: "" },
                      ],
                    },
                  ],
                },
                {
                  xtype: "fieldset",
                  title: "Pemasok (Entitas 2)",
                  padding: "0 5 5 5",
                  layout: "vbox",
                  items: [
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 185, fieldLabel: "1. Seri,Kode,Jenis", name: "ENTITAS2_SERIENTITAS", fieldCls: "fieldlock", readOnly: true, value: "" },
                        { xtype: "textfield", width: 65, name: "ENTITAS2_KODEENTITAS", fieldCls: "fieldlock", readOnly: true, value: "" },
                        { xtype: "textfield", width: 65, name: "ENTITAS2_KODEJENISIDENTITAS", fieldCls: "fieldlock", readOnly: true, value: "" },
                        { xtype: "textfield", labelWidth: 80, width: 145, fieldLabel: "Kode Status", name: "ENTITAS2_KODESTATUS", fieldCls: "fieldlock", readOnly: true, value: "" },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        //
                        { xtype: "textfield", labelWidth: 120, width: 500, fieldLabel: "2. Nama", name: "ENTITAS2_NAMAENTITAS", fieldCls: "fieldinput", readOnly: true },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          margin: "5 0 0 0",
                          vdata: {
                            modulename: "pemasok",
                            title: "Pilih Pemasok",
                            popupwidth: 0.7,
                            popupheight: 0.7,
                          },
                          icon: vconfig.getstyle + "icon/search.ico",
                          tooltip: "Search Pemasok",
                          handler: function () {
                            try {
                              var me = this;
                              var FRM = me.up("form");
                              var GRIDpelabuhan = Ext.create(
                                "NJC.EXIM.bcout_27_aw.GRIDentitas",
                                {
                                  listeners: {
                                    itemdblClick: function (cmp, rec) {
                                      FRM.getForm().setValues({
                                        ENTITAS2_NAMAENTITAS: rec.data.NAMA,
                                        ENTITAS2_ALAMATENTITAS: rec.data.ALAMAT,
                                        ENTITAS2_KODENEGARA: rec.data.KODE_NEGARA,
                                        ENTITAS2_NOMORIJINENTITAS: rec.data.NOMOR_IJIN,
                                        ENTITAS2_TANGGALIJINENTITAS: rec.data.TANGGAL_IJIN,
                                        ENTITAS2_NIBENTITAS: rec.data.NIB,
                                        ENTITAS2_KODEJENISAPI: rec.data.KODE_JENIS_API,
                                        ENTITAS2_NOMORIDENTITAS: rec.data.NOMOR_IDENTITAS,
                                      });
                                      popup.close();
                                    },
                                  },
                                },
                                this
                              );
                              var popup = Ext.create(
                                "Ext.window.Window",
                                {
                                  alias: "widget.popup_pemasok",
                                  reference: "popup_pemasok",
                                  title: "Pilih Pemasok",
                                  modal: true,
                                  closeAction: "destroy",
                                  centered: true,
                                  autoScroll: true,
                                  //y: -110,
                                  width: mainpanel.getWidth() * 0.6,
                                  height: mainpanel.getHeight() * 0.7,
                                  layout: "fit",
                                  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
                                  items: [{ xtype: GRIDpelabuhan }],
                                },
                                this
                              );
                              return popup.show();
                            } catch (ex) {
                              COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                            }
                          },
                        },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 470, labelAlign: "left", fieldLabel: "3. Alamat", name: "ENTITAS2_ALAMATENTITAS", fieldCls: "fieldlock", readOnly: true },
                        { xtype: "textfield", width: 50, name: "ENTITAS2_KODENEGARA", fieldCls: "fieldlock", readOnly: true, value: "" },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        //
                        { xtype: "textfield", labelWidth: 120, width: 250, labelAlign: "left", fieldLabel: "4. API & No Identitas", name: "ENTITAS2_KODEJENISAPI", fieldCls: "fieldlock", readOnly: true },
                      ],
                    },
                  ],
                },
                {
                  xtype: "fieldset",
                  title: "Pemilik (Entitas 3)",
                  padding: "0 5 5 5",
                  layout: "vbox",
                  items: [
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 185, fieldLabel: "1. Seri,Kode,Jenis", name: "ENTITAS3_SERIENTITAS", fieldCls: "fieldlock", readOnly: true, value: "" },
                        { xtype: "textfield", width: 65, name: "ENTITAS3_KODEENTITAS", fieldCls: "fieldlock", readOnly: true, value: "" },
                        { xtype: "textfield", width: 65, name: "ENTITAS3_KODEJENISIDENTITAS", fieldCls: "fieldlock", readOnly: true, value: "" },
                        { xtype: "textfield", labelWidth: 80, width: 145, fieldLabel: "Kode Status", name: "ENTITAS3_KODESTATUS", fieldCls: "fieldlock", readOnly: true, value: "" },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        //
                        { xtype: "textfield", labelWidth: 120, width: 500, fieldLabel: "2. Nama", name: "ENTITAS3_NAMAENTITAS", fieldCls: "fieldinput", readOnly: true },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          margin: "5 0 0 0",
                          vdata: {
                            modulename: "pemilik",
                            title: "Pilih Pemilik",
                            popupwidth: 0.7,
                            popupheight: 0.7,
                          },
                          icon: vconfig.getstyle + "icon/search.ico",
                          tooltip: "Search Pemilik",
                          handler: function () {
                            try {
                              var me = this;
                              var FRM = me.up("form");
                              var GRIDpelabuhan = Ext.create(
                                "NJC.EXIM.bcout_27_aw.GRIDentitas",
                                {
                                  listeners: {
                                    itemdblClick: function (cmp, rec) {
                                      FRM.getForm().setValues({
                                        ENTITAS3_NAMAENTITAS: rec.data.NAMA,
                                        ENTITAS3_ALAMATENTITAS: rec.data.ALAMAT,
                                        ENTITAS3_KODENEGARA: rec.data.KODE_NEGARA,
                                        ENTITAS3_NOMORIJINENTITAS: rec.data.NOMOR_IJIN,
                                        ENTITAS3_TANGGALIJINENTITAS: rec.data.TANGGAL_IJIN,
                                        ENTITAS3_NIBENTITAS: rec.data.NIB,
                                        ENTITAS3_KODEJENISAPI: rec.data.KODE_JENIS_API,
                                        ENTITAS3_NOMORIDENTITAS: rec.data.NOMOR_IDENTITAS,
                                      });
                                      popup.close();
                                    },
                                  },
                                },
                                this
                              );
                              var popup = Ext.create(
                                "Ext.window.Window",
                                {
                                  alias: "widget.popup_pemilik",
                                  reference: "popup_pemilik",
                                  title: "Pilih Pemilik",
                                  modal: true,
                                  closeAction: "destroy",
                                  centered: true,
                                  autoScroll: true,
                                  //y: -110,
                                  width: mainpanel.getWidth() * 0.6,
                                  height: mainpanel.getHeight() * 0.7,
                                  layout: "fit",
                                  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
                                  items: [{ xtype: GRIDpelabuhan }],
                                },
                                this
                              );
                              return popup.show();
                            } catch (ex) {
                              COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                            }
                          },
                        },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 470, labelAlign: "left", fieldLabel: "3. Alamat", name: "ENTITAS3_ALAMATENTITAS", fieldCls: "fieldlock", readOnly: true },
                        { xtype: "textfield", width: 50, name: "ENTITAS3_KODENEGARA", fieldCls: "fieldlock", readOnly: true, value: "" },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 300, labelAlign: "left", fieldLabel: "4. Nomor & Tgl Izin", name: "ENTITAS3_NOMORIJINENTITAS", fieldCls: "fieldlock", readOnly: true },
                        { xtype: "textfield", width: 100, name: "ENTITAS3_TANGGALIJINENTITAS", fieldCls: "fieldlock", readOnly: true, value: "" },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        //
                        { xtype: "textfield", labelWidth: 120, width: 250, labelAlign: "left", fieldLabel: "5. NIB", name: "ENTITAS3_NIBENTITAS", fieldCls: "fieldlock", readOnly: true },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 250, labelAlign: "left", fieldLabel: "6. API & No Identitas", name: "ENTITAS3_KODEJENISAPI", fieldCls: "fieldlock", readOnly: true },
                        { xtype: "textfield", width: 250, name: "ENTITAS3_NOMORIDENTITAS", fieldCls: "fieldlock", readOnly: true, value: "" },
                      ],
                    },
                  ],
                },
                {
                  xtype: "fieldset",
                  title: "Pengangkut",
                  layout: "anchor",
                  padding: "5 5 5 5",
                  items: [
                    {
                      xtype: "container",
                      padding: "5 5 5 5",
                      layout: { type: "vbox", pack: "start", align: "stretch" },
                      flex: 1,
                      height: 120,
                      items: [
                        {
                          xtype: "grid",
                          pid: "GRIDbcout_27_aw_pengangkut",
                          emptyText: "No Matching Records",
                          flex: 1,
                          plugins: {
                            cellediting: {
                              clicksToEdit: 1,
                            },
                          },
                          store: {
                            autoLoad: false,
                            autoSync: false,
                            remoteSort: false,
                            remoteFilter: false,
                            fields: [
                              { name: "ID", type: "int" },
                              { name: "SERI_PENGANGKUT", type: "string" },
                              { name: "KODE_CARA_ANGKUT", type: "string" },
                              { name: "NAMA_PENGANGKUT", type: "string" },
                              { name: "NOMOR_PENGANGKUT", type: "string" },
                              { name: "KODE_BENDERA", type: "string" },
                              { name: "INTERNAL_NOMOR_AJU", type: "string" },
                            ],
                          },
                          columns: [
                            { header: "SERI", dataIndex: "SERI_PENGANGKUT", sortable: true, width: 50 },
                            {
                              header: "KODE",
                              dataIndex: "KODE_CARA_ANGKUT",
                              sortable: true,
                              width: 120,
                              editor: {
                                xtype: "combo",
                                typeAhead: true,
                                triggerAction: "all",
                                store: [
                                  ["1", "LAUT"],
                                  ["2", "KERETA"],
                                  ["3", "DARAT"],
                                  ["4", "UDARA"],
                                  ["5", "POS"],
                                  ["6", "MULTI MODA"],
                                  ["7", "INSTALLASI/ PIPA"],
                                  ["8", "PERAIRAN"],
                                  ["9", "LAINNYA"],
                                ],
                              },
                            },
                            //
                            { header: "NAMA", dataIndex: "NAMA_PENGANGKUT", sortable: true, flex: 1, editor: { xtype: "textfield" } },
                            { header: "NOMOR", dataIndex: "NOMOR_PENGANGKUT", sortable: true, width: 120, editor: { xtype: "textfield" } },
                            { header: "BENDERA", dataIndex: "KODE_BENDERA", sortable: true, width: 120, editor: { xtype: "textfield" } },
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
                                    grid.getStore().removeAt(rowIndex);
                                    var idx = 0;
                                    grid.getStore().each(function (rec) {
                                      rec.set("SERIPENGANGKUT", idx + 1);
                                      idx++;
                                    });
                                    grid.getStore().commitChanges();
                                  },
                                },
                              ],
                            },
                          ],
                          tbar: [
                            //
                            {
                              xtype: "button",
                              text: "Input Baru",
                              id: "btpengangkut_add",
                              pid: "btpengangkut_add",
                              icon: vconfig.getstyle + "icon/new.ico",
                              tooltip: "Tambah Data Baru",
                              handler: function () {
                                try {
                                  var FRM = this.up("form");
                                  var vdt = FRM.getValues(false, false, false, true);
                                  console.log(vdt);
                                  var GRIDpengangkut = this.up("grid[pid=GRIDbcout_27_aw_pengangkut]");
                                  GRIDpengangkut.getStore().add({
                                    ID: 0,
                                    SERI_PENGANGKUT: 0,
                                    KODE_CARAANGKUT: "",
                                    NAMA_PENGANGKUT: "",
                                    NOMOR_PENGANGKUT: "",
                                    KODE_BENDERA: "",
                                    INTERNAL_NOMOR_AJU: vdt.NOMOR_AJU,
                                  });
                                  GRIDpengangkut.getStore().commitChanges();
                                  var idx = 0;
                                  GRIDpengangkut.getStore().each(function (rec) {
                                    console.log("perubahan");
                                    rec.set("SERI_PENGANGKUT", idx + 1);
                                    idx++;
                                  });
                                  GRIDpengangkut.getStore().commitChanges();
                                } catch (ex) {
                                  COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                                }
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  xtype: "fieldset",
                  title: "Pelabuhan Muat & Bongkar",
                  layout: "vbox",
                  flex: 1,
                  padding: "0 5 5 5",
                  items: [
                    {
                      xtype: "container",
                      layout: "hbox",
                      margin: "5 0 0 0",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 220, fieldLabel: "Pelabuhan Muat", name: "KODE_PELABUHAN_MUAT", fieldCls: "fieldlock", readOnly: true },
                        { xtype: "textfield", width: 200, name: "KODE_PELABUHAN_MUAT_NAME", fieldCls: "fieldlock", readOnly: true },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          margin: "5 0 0 0",
                          icon: vconfig.getstyle + "icon/search.ico",
                          tooltip: "Search Pelabuhan Muat",
                          handler: function () {
                            try {
                              var me = this;
                              var FRM = me.up("form");
                              var GRIDpelabuhan = Ext.create(
                                "NJC.EXIM.bcout_27_aw.GRIDpelabuhan",
                                {
                                  listeners: {
                                    itemdblClick: function (cmp, rec) {
                                      FRM.getForm().setValues({
                                        KODE_PELABUHAN_MUAT: rec.data.KODE_PELABUHAN_MUAT,
                                        KODE_PELABUHAN_MUAT_NAME: rec.data.KODE_PELABUHAN_MUAT_NAME,
                                      });
                                      popup.close();
                                    },
                                  },
                                },
                                this
                              );
                              var popup = Ext.create(
                                "Ext.window.Window",
                                {
                                  alias: "widget.popup_pelabuhan",
                                  reference: "popup_pelabuhan",
                                  title: "Pilih Pelabuhan",
                                  modal: true,
                                  closeAction: "destroy",
                                  centered: true,
                                  autoScroll: true,
                                  //y: -110,
                                  width: mainpanel.getWidth() * 0.3,
                                  height: mainpanel.getHeight() * 0.7,
                                  layout: "fit",
                                  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
                                  items: [{ xtype: GRIDpelabuhan }],
                                },
                                this
                              );
                              return popup.show();
                            } catch (ex) {
                              COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                            }
                          },
                        },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      margin: "5 0 0 0",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 220, fieldLabel: "Pelabuhan Transit", name: "KODE_PELABUHAN_TRANSIT", fieldCls: "fieldlock", readOnly: true },
                        { xtype: "textfield", width: 200, name: "KODE_PELABUHAN_TRANSIT_NAME", fieldCls: "fieldlock", readOnly: true },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          margin: "5 0 0 0",
                          icon: vconfig.getstyle + "icon/search.ico",
                          tooltip: "Search Pelabuhan Transit",
                          handler: function () {
                            try {
                              var me = this;
                              var FRM = me.up("form");
                              var GRIDpelabuhan = Ext.create(
                                "NJC.EXIM.bcout_27_aw.GRIDpelabuhan",
                                {
                                  listeners: {
                                    itemdblClick: function (cmp, rec) {
                                      FRM.getForm().setValues({
                                        KODE_PELABUHAN_TRANSIT: rec.data.KODE_PELABUHAN,
                                        KODE_PELABUHAN_TRANSIT_NAME: rec.data.KODE_PELABUHAN_TRANSIT_NAME,
                                      });
                                      popup.close();
                                    },
                                  },
                                },
                                this
                              );
                              var popup = Ext.create(
                                "Ext.window.Window",
                                {
                                  alias: "widget.popup_pelabuhan",
                                  reference: "popup_pelabuhan",
                                  title: "Pilih Pelabuhan",
                                  modal: true,
                                  closeAction: "destroy",
                                  centered: true,
                                  autoScroll: true,
                                  //y: -110,
                                  width: mainpanel.getWidth() * 0.3,
                                  height: mainpanel.getHeight() * 0.7,
                                  layout: "fit",
                                  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
                                  items: [{ xtype: GRIDpelabuhan }],
                                },
                                this
                              );
                              return popup.show();
                            } catch (ex) {
                              COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                            }
                          },
                        },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      margin: "5 0 0 0",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 220, fieldLabel: "Pelabuhan Bongkar", name: "KODE_PELABUHAN_BONGKAR", fieldCls: "fieldlock", readOnly: true },
                        { xtype: "textfield", width: 200, name: "KODE_PELABUHAN_BONGKAR_NAME", fieldCls: "fieldlock", readOnly: true },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          margin: "5 0 0 0",
                          icon: vconfig.getstyle + "icon/search.ico",
                          tooltip: "Search Pelabuhan Bongkar",
                          handler: function () {
                            try {
                              var me = this;
                              var FRM = me.up("form");
                              var GRIDpelabuhan = Ext.create(
                                "NJC.EXIM.bcout_27_aw.GRIDpelabuhan",
                                {
                                  listeners: {
                                    itemdblClick: function (cmp, rec) {
                                      FRM.getForm().setValues({
                                        KODE_PELABUHAN_BONGKAR: rec.data.KODE_PELABUHAN,
                                        KODE_PELABUHAN_BONGKAR_NAME: rec.data.URAIAN_PELABUHAN,
                                      });
                                      popup.close();
                                    },
                                  },
                                },
                                this
                              );
                              var popup = Ext.create(
                                "Ext.window.Window",
                                {
                                  alias: "widget.popup_pelabuhan",
                                  reference: "popup_pelabuhan",
                                  title: "Pilih Pelabuhan",
                                  modal: true,
                                  closeAction: "destroy",
                                  centered: true,
                                  autoScroll: true,
                                  //y: -110,
                                  width: mainpanel.getWidth() * 0.3,
                                  height: mainpanel.getHeight() * 0.7,
                                  layout: "fit",
                                  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
                                  items: [{ xtype: GRIDpelabuhan }],
                                },
                                this
                              );
                              return popup.show();
                            } catch (ex) {
                              COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                            }
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  xtype: "fieldset",
                  title: "Kontainer",
                  layout: "anchor",
                  padding: "5 5 5 5",
                  items: [
                    {
                      xtype: "container",
                      padding: "5 5 5 5",
                      layout: { type: "vbox", pack: "start", align: "stretch" },
                      flex: 1,
                      height: 120,
                      items: [
                        {
                          xtype: "grid",
                          pid: "GRIDbcout_27_aw_kontainer",
                          emptyText: "No Matching Records",
                          flex: 1,
                          height: 100,
                          plugins: {
                            cellediting: {
                              clicksToEdit: 1,
                            },
                          },
                          store: {
                            autoLoad: false,
                            autoSync: false,
                            remoteSort: false,
                            remoteFilter: false,
                            fields: [
                              { name: "ID", type: "int" },
                              { name: "SERI", type: "int" },
                              { name: "KODE_UKURAN_KONTAINER", type: "int" },
                              { name: "NOMOR_KONTINER", type: "string" },
                              { name: "KODE_TIPE_KONTAINER", type: "string" },
                              { name: "KODE_JENIS_KONTAINER", type: "string" },
                              { name: "INTERNAL_NOMOR_AJU", type: "string" },
                            ],
                          },
                          columns: [
                            { header: "SERI", dataIndex: "SERI", sortable: true, width: 60 },
                            { header: "UKURAN", dataIndex: "KODE_UKURAN_KONTAINER", sortable: true, width: 60, editor: { xtype: "numberfield" } },
                            { header: "NOMOR", dataIndex: "NOMOR_KONTINER", sortable: true, flex: 1, editor: { xtype: "textfield" } },
                            { header: "TIPE", dataIndex: "KODE_TIPE_KONTAINER", sortable: true, width: 60, editor: { xtype: "textfield" } },
                            { header: "JENIS", dataIndex: "KODE_JENIS_KONTAINER", sortable: true, width: 60, editor: { xtype: "textfield" } },
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
                                    grid.getStore().removeAt(rowIndex);
                                    var idx = 0;
                                    grid.getStore().each(function (rec) {
                                      rec.set("SERI", idx + 1);
                                      idx++;
                                    });
                                    grid.getStore().commitChanges();
                                  },
                                },
                              ],
                            },
                          ],
                          tbar: [
                            {
                              xtype: "button",
                              text: "Input Baru",
                              id: "btkontainer_add",
                              pid: "btkontainer_add",
                              icon: vconfig.getstyle + "icon/new.ico",
                              tooltip: "Tambah Data Baru",
                              handler: function () {
                                try {
                                  var FRM = this.up("form");
                                  var vdt = FRM.getValues(false, false, false, true);
                                  var GRID = this.up("grid[pid=GRIDbcout_27_aw_kontainer]");
                                  GRID.getStore().add({
                                    ID: 0,
                                    SERI: 0,
                                    KODE_UKURAN_KONTAINER: "",
                                    NOMOR_KONTINER: "",
                                    KODE_TIPE_KONTAINER: "",
                                    KODE_JENIS_KONTAINER: "",
                                    INTERNAL_NOMOR_AJU: vdt.NOMOR_AJU,
                                  });
                                  GRID.getStore().commitChanges();
                                  var idx = 0;
                                  GRID.getStore().each(function (rec) {
                                    rec.set("SERI", idx + 1);
                                    idx++;
                                  });
                                  GRID.getStore().commitChanges();
                                } catch (ex) {
                                  COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                                }
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  xtype: "fieldset",
                  title: "Jumlah dan jenis kemasan",
                  layout: "anchor",
                  padding: "5 5 5 5",
                  items: [
                    {
                      xtype: "container",
                      padding: "5 5 5 5",
                      layout: { type: "vbox", pack: "start", align: "stretch" },
                      flex: 1,
                      height: 120,
                      items: [
                        {
                          xtype: "grid",
                          pid: "GRIDbcout_27_aw_kemasan",
                          emptyText: "No Matching Records",
                          flex: 1,
                          plugins: {
                            cellediting: {
                              clicksToEdit: 1,
                            },
                          },
                          store: {
                            fields: [
                              { name: "JUMLAH_KEMASAN", type: "int" },
                              { name: "SERI", type: "int" },
                              { name: "KODE_KEMASAN", type: "string" },
                              { name: "MEREK", type: "string" },
                              { name: "ID", type: "int" },
                              { name: "INTERNAL_NOMOR_AJU", type: "string" },
                            ],
                          },
                          columns: [
                            { header: "SERI", dataIndex: "SERI", sortable: true, width: 80 },
                            { header: "JUMLAH", dataIndex: "JUMLAH_KEMASAN", sortable: true, width: 80, editor: { xtype: "textfield" } },
                            { header: "KODE", dataIndex: "KODE_KEMASAN", sortable: true, width: 80, editor: { xtype: "textfield" } },
                            { header: "MERK", dataIndex: "MEREK", sortable: true, flex: 1 },
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
                                    grid.getStore().removeAt(rowIndex);
                                    var idx = 0;
                                    grid.getStore().each(function (rec) {
                                      rec.set("SERI", idx + 1);
                                      idx++;
                                    });
                                    grid.getStore().commitChanges();
                                  },
                                },
                              ],
                            },
                          ],
                          tbar: [
                            {
                              xtype: "button",
                              text: "Input Baru",
                              id: "btkemasan_add",
                              pid: "btkemasan_add",
                              icon: vconfig.getstyle + "icon/new.ico",
                              tooltip: "Tambah Data Baru",
                              handler: function () {
                                try {
                                  var FRM = this.up("form");
                                  var vdt = FRM.getValues(false, false, false, true);
                                  var GRID = this.up("grid[pid=GRIDbcout_27_aw_kemasan]");
                                  GRID.getStore().add({
                                    JUMLAH_KEMASAN: 0,
                                    SERI: 0,
                                    KODE_KEMASAN: "",
                                    MEREK: "-",
                                    ID: 0,
                                    INTERNAL_NOMOR_AJU: vdt.NOMOR_AJU,
                                  });
                                  GRID.getStore().commitChanges();
                                  var idx = 0;
                                  GRID.getStore().each(function (rec) {
                                    rec.set("SERI", idx + 1);
                                    idx++;
                                  });
                                  GRID.getStore().commitChanges();
                                } catch (ex) {
                                  COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                                }
                              },
                            },
                          ],
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
              padding: "5 5 5 5",
              border: false,
              frame: false,
              items: [
                {
                  xtype: "fieldset",
                  layout: "vbox",
                  flex: 1,
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
                            { xtype: "textfield", labelWidth: 120, width: 200, fieldLabel: "Kantor Pabean", name: "KODE_KANTOR", fieldCls: "fieldinput", readOnly: true },
                            { xtype: "textfield", width: 200, name: "KODE_KANTOR_NAME", fieldCls: "fieldlock", readOnly: true },
                            {
                              xtype: "button",
                              pid: "btsearch",
                              margin: "5 5 5 5",
                              vdata: {
                                modulename: "kantorpabean",
                                title: "Pilih Kantor Pabean",
                                popupwidth: 0.7,
                                popupheight: 0.7,
                              },
                              icon: vconfig.getstyle + "icon/search.ico",
                              tooltip: "search Kantor Pabean",
                              handler: function () {
                                try {
                                  var me = this;
                                  var popup = Ext.create(
                                    "Ext.window.Window",
                                    {
                                      alias: "widget.popup_kantorpabean",
                                      reference: "popup_kantorpabean",
                                      title: "Pilih Kantor Pabean",
                                      modal: true,
                                      closeAction: "destroy",
                                      centered: true,
                                      autoScroll: true,
                                      //y: -110,
                                      width: mainpanel.getWidth() * 0.3,
                                      height: mainpanel.getHeight() * 0.7,
                                      layout: { type: "hbox", pack: "start", align: "stretch" },
                                      bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
                                      items: [
                                        {
                                          xtype: "grid",
                                          pid: "GRIDpopup_kantorpabean",
                                          emptyText: "No Matching Records",
                                          autoScroll: true,
                                          flex: 1,
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
                                              url: vconfig.service_api + "referensi_kantor_pabean/referensi_kantor_pabeans",
                                              reader: {
                                                type: "json",
                                                rootProperty: "Rows",
                                                totalProperty: "TotalRows",
                                                successProperty: "success",
                                              },
                                            },
                                            listeners: {
                                              //
                                            },
                                          },
                                          plugins: ["filterfield"],
                                          columns: [
                                            { xtype: "rownumberer", width: 40 },
                                            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "Kode Kantor", dataIndex: "KODE_KANTOR" },
                                            { sortable: true, width: 230, filter: { xtype: "textfield" }, header: "Nama Kantor", dataIndex: "URAIAN_KANTOR" },
                                          ],
                                          bbar: {
                                            xtype: "pagingtoolbar",
                                            displayInfo: true,
                                            displayMsg: "Displaying topics {0} - {1} of {2}",
                                            emptyMsg: "No topics to display",
                                          },
                                          listeners: {
                                            itemdblClick: function (cmp, rec) {
                                              try {
                                                var FRM = me.up("form");
                                                FRM.getForm().setValues({
                                                  KODE_KANTOR: rec.data.KODE_KANTOR,
                                                  KODE_KANTOR_NAME: rec.data.URAIAN_KANTOR,
                                                });
                                                popup.close();
                                              } catch (ex) {
                                                COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                                              }
                                            },
                                          },
                                        },
                                      ],
                                    },
                                    this
                                  );
                                  popup.show();
                                } catch (ex) {
                                  COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                                }
                              },
                            },
                          ],
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "textfield", labelWidth: 120, width: 200, fieldLabel: "Kantor Bongkar", name: "KODE_KANTOR_BONGKAR", fieldCls: "fieldinput", readOnly: true },
                            { xtype: "textfield", width: 200, name: "KODE_KANTOR_BONGKAR_NAME", fieldCls: "fieldlock", readOnly: true },
                            {
                              xtype: "button",
                              pid: "btsearch",
                              margin: "5 5 5 5",
                              vdata: {
                                modulename: "kantorbongkar",
                                title: "Pilih Kantor Bongkar",
                                popupwidth: 0.7,
                                popupheight: 0.7,
                              },
                              icon: vconfig.getstyle + "icon/search.ico",
                              tooltip: "search Kantor Bongkar",
                              handler: function () {
                                try {
                                  var me = this;
                                  var popup = Ext.create(
                                    "Ext.window.Window",
                                    {
                                      alias: "widget.popup_kantorbongkar",
                                      reference: "popup_kantorbongkar",
                                      title: "Pilih Kantor Bongkar",
                                      modal: true,
                                      closeAction: "destroy",
                                      centered: true,
                                      autoScroll: true,
                                      //y: -110,
                                      width: mainpanel.getWidth() * 0.3,
                                      height: mainpanel.getHeight() * 0.7,
                                      layout: { type: "hbox", pack: "start", align: "stretch" },
                                      bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
                                      items: [
                                        {
                                          xtype: "grid",
                                          pid: "GRIDpopup_kantorbongkar",
                                          emptyText: "No Matching Records",
                                          autoScroll: true,
                                          flex: 1,
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
                                              url: vconfig.service_api + "referensi_kantor_pabean/referensi_kantor_pabeans",
                                              reader: {
                                                type: "json",
                                                rootProperty: "Rows",
                                                totalProperty: "TotalRows",
                                                successProperty: "success",
                                              },
                                            },
                                            listeners: {
                                              //
                                            },
                                          },
                                          plugins: ["filterfield"],
                                          columns: [
                                            { xtype: "rownumberer", width: 40 },
                                            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "Kode Kantor", dataIndex: "KODE_KANTOR" },
                                            { sortable: true, width: 230, filter: { xtype: "textfield" }, header: "Nama Kantor", dataIndex: "URAIAN_KANTOR" },
                                          ],
                                          bbar: {
                                            xtype: "pagingtoolbar",
                                            displayInfo: true,
                                            displayMsg: "Displaying topics {0} - {1} of {2}",
                                            emptyMsg: "No topics to display",
                                          },
                                          listeners: {
                                            itemdblClick: function (cmp, rec) {
                                              try {
                                                var FRM = me.up("form");
                                                FRM.getForm().setValues({
                                                  KODE_KANTOR_BONGKAR: rec.data.KODE_KANTOR,
                                                  KODE_KANTOR_BONGKAR_NAME: rec.data.URAIAN_KANTOR,
                                                });
                                                popup.close();
                                              } catch (ex) {
                                                COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                                              }
                                            },
                                          },
                                        },
                                      ],
                                    },
                                    this
                                  );
                                  popup.show();
                                } catch (ex) {
                                  COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                                }
                              },
                            },
                          ],
                        },

                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "textfield", labelWidth: 120, width: 200, fieldLabel: "Kantor Periksa", name: "KODE_KANTOR_PERIKSA", fieldCls: "fieldinput", readOnly: true },
                            { xtype: "textfield", width: 200, name: "KODE_KANTOR_PERIKSA_NAME", fieldCls: "fieldlock", readOnly: true },
                            {
                              xtype: "button",
                              pid: "btsearch",
                              margin: "5 5 5 5",
                              vdata: {
                                modulename: "kantorperiksa",
                                title: "Pilih Kantor Periksa",
                                popupwidth: 0.7,
                                popupheight: 0.7,
                              },
                              icon: vconfig.getstyle + "icon/search.ico",
                              tooltip: "search Kantor Periksa",
                              handler: function () {
                                try {
                                  var me = this;
                                  var popup = Ext.create(
                                    "Ext.window.Window",
                                    {
                                      alias: "widget.popup_kantorperiksa",
                                      reference: "popup_kantorperiksa",
                                      title: "Pilih Kantor Periksa",
                                      modal: true,
                                      closeAction: "destroy",
                                      centered: true,
                                      autoScroll: true,
                                      //y: -110,
                                      width: mainpanel.getWidth() * 0.3,
                                      height: mainpanel.getHeight() * 0.7,
                                      layout: { type: "hbox", pack: "start", align: "stretch" },
                                      bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
                                      items: [
                                        {
                                          xtype: "grid",
                                          pid: "GRIDpopup_kantorperiksa",
                                          emptyText: "No Matching Records",
                                          autoScroll: true,
                                          flex: 1,
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
                                              url: vconfig.service_api + "referensi_kantor_pabean/referensi_kantor_pabeans",
                                              reader: {
                                                type: "json",
                                                rootProperty: "Rows",
                                                totalProperty: "TotalRows",
                                                successProperty: "success",
                                              },
                                            },
                                            listeners: {
                                              //
                                            },
                                          },
                                          plugins: ["filterfield"],
                                          columns: [
                                            { xtype: "rownumberer", width: 40 },
                                            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "Kode Kantor", dataIndex: "KODE_KANTOR" },
                                            { sortable: true, width: 230, filter: { xtype: "textfield" }, header: "Nama Kantor", dataIndex: "URAIAN_KANTOR" },
                                          ],
                                          bbar: {
                                            xtype: "pagingtoolbar",
                                            displayInfo: true,
                                            displayMsg: "Displaying topics {0} - {1} of {2}",
                                            emptyMsg: "No topics to display",
                                          },
                                          listeners: {
                                            itemdblClick: function (cmp, rec) {
                                              try {
                                                var FRM = me.up("form");
                                                FRM.getForm().setValues({
                                                  KODE_KANTOR_PERIKSA: rec.data.KODE_KANTOR,
                                                  KODE_KANTOR_PERIKSA_NAME: rec.data.URAIAN_KANTOR,
                                                });
                                                popup.close();
                                              } catch (ex) {
                                                COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                                              }
                                            },
                                          },
                                        },
                                      ],
                                    },
                                    this
                                  );
                                  popup.show();
                                } catch (ex) {
                                  COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                                }
                              },
                            },
                          ],
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "textfield", labelWidth: 120, width: 200, fieldLabel: "Kantor Tujuan", name: "KODE_KANTOR_TUJUAN", fieldCls: "fieldinput", readOnly: true },
                            { xtype: "textfield", width: 200, name: "KODE_KANTOR_TUJUAN_NAME", fieldCls: "fieldlock", readOnly: true },
                            {
                              xtype: "button",
                              pid: "btsearch",
                              margin: "5 5 5 5",
                              vdata: {
                                modulename: "kantortujuan",
                                title: "Pilih Kantor Tujuan",
                                popupwidth: 0.7,
                                popupheight: 0.7,
                              },
                              icon: vconfig.getstyle + "icon/search.ico",
                              tooltip: "search Kantor Tujuan",
                              handler: function () {
                                try {
                                  var me = this;
                                  var popup = Ext.create(
                                    "Ext.window.Window",
                                    {
                                      alias: "widget.popup_kantortujuan",
                                      reference: "popup_kantortujuan",
                                      title: "Pilih Kantor Tujuan",
                                      modal: true,
                                      closeAction: "destroy",
                                      centered: true,
                                      autoScroll: true,
                                      //y: -110,
                                      width: mainpanel.getWidth() * 0.3,
                                      height: mainpanel.getHeight() * 0.7,
                                      layout: { type: "hbox", pack: "start", align: "stretch" },
                                      bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
                                      items: [
                                        {
                                          xtype: "grid",
                                          pid: "GRIDpopup_kantortujuan",
                                          emptyText: "No Matching Records",
                                          autoScroll: true,
                                          flex: 1,
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
                                              url: vconfig.service_api + "referensi_kantor_pabean/referensi_kantor_pabeans",
                                              reader: {
                                                type: "json",
                                                rootProperty: "Rows",
                                                totalProperty: "TotalRows",
                                                successProperty: "success",
                                              },
                                            },
                                            listeners: {
                                              //
                                            },
                                          },
                                          plugins: ["filterfield"],
                                          columns: [
                                            { xtype: "rownumberer", width: 40 },
                                            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "Kode Kantor", dataIndex: "KODE_KANTOR" },
                                            { sortable: true, width: 230, filter: { xtype: "textfield" }, header: "Nama Kantor", dataIndex: "URAIAN_KANTOR" },
                                          ],
                                          bbar: {
                                            xtype: "pagingtoolbar",
                                            displayInfo: true,
                                            displayMsg: "Displaying topics {0} - {1} of {2}",
                                            emptyMsg: "No topics to display",
                                          },
                                          listeners: {
                                            itemdblClick: function (cmp, rec) {
                                              try {
                                                var FRM = me.up("form");
                                                FRM.getForm().setValues({
                                                  KODE_KANTOR_TUJUAN: rec.data.KODE_KANTOR,
                                                  KODE_KANTOR_TUJUAN_NAME: rec.data.URAIAN_KANTOR,
                                                });
                                                popup.close();
                                              } catch (ex) {
                                                COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                                              }
                                            },
                                          },
                                        },
                                      ],
                                    },
                                    this
                                  );
                                  popup.show();
                                } catch (ex) {
                                  COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                                }
                              },
                            },
                          ],
                        },

                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "textfield", labelWidth: 120, width: 200, fieldLabel: "Kantor Ekspor", name: "KODE_KANTOR_EKSPOR", fieldCls: "fieldinput", readOnly: true },
                            { xtype: "textfield", width: 200, name: "KODE_KANTOR_EKSPOR_NAME", fieldCls: "fieldlock", readOnly: true },
                            {
                              xtype: "button",
                              pid: "btsearch",
                              margin: "5 5 5 5",
                              vdata: {
                                modulename: "kantorekspor",
                                title: "Pilih Kantor Ekspor",
                                popupwidth: 0.7,
                                popupheight: 0.7,
                              },
                              icon: vconfig.getstyle + "icon/search.ico",
                              tooltip: "search Kantor Ekspor",
                              handler: function () {
                                try {
                                  var me = this;
                                  var popup = Ext.create(
                                    "Ext.window.Window",
                                    {
                                      alias: "widget.popup_kantorekspor",
                                      reference: "popup_kantorekspor",
                                      title: "Pilih Kantor Ekspor",
                                      modal: true,
                                      closeAction: "destroy",
                                      centered: true,
                                      autoScroll: true,
                                      //y: -110,
                                      width: mainpanel.getWidth() * 0.3,
                                      height: mainpanel.getHeight() * 0.7,
                                      layout: { type: "hbox", pack: "start", align: "stretch" },
                                      bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
                                      items: [
                                        {
                                          xtype: "grid",
                                          pid: "GRIDpopup_kantorekspor",
                                          emptyText: "No Matching Records",
                                          autoScroll: true,
                                          flex: 1,
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
                                              url: vconfig.service_api + "referensi_kantor_pabean/referensi_kantor_pabeans",
                                              reader: {
                                                type: "json",
                                                rootProperty: "Rows",
                                                totalProperty: "TotalRows",
                                                successProperty: "success",
                                              },
                                            },
                                            listeners: {
                                              //
                                            },
                                          },
                                          plugins: ["filterfield"],
                                          columns: [
                                            { xtype: "rownumberer", width: 40 },
                                            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "Kode Kantor", dataIndex: "KODE_KANTOR" },
                                            { sortable: true, width: 230, filter: { xtype: "textfield" }, header: "Nama Kantor", dataIndex: "URAIAN_KANTOR" },
                                          ],
                                          bbar: {
                                            xtype: "pagingtoolbar",
                                            displayInfo: true,
                                            displayMsg: "Displaying topics {0} - {1} of {2}",
                                            emptyMsg: "No topics to display",
                                          },
                                          listeners: {
                                            itemdblClick: function (cmp, rec) {
                                              try {
                                                var FRM = me.up("form");
                                                FRM.getForm().setValues({
                                                  KODE_KANTOR_EKSPOR: rec.data.KODE_KANTOR,
                                                  KODE_KANTOR_EKSPOR_NAME: rec.data.URAIAN_KANTOR,
                                                });
                                                popup.close();
                                              } catch (ex) {
                                                COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                                              }
                                            },
                                          },
                                        },
                                      ],
                                    },
                                    this
                                  );
                                  popup.show();
                                } catch (ex) {
                                  COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                                }
                              },
                            },
                          ],
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "textfield", labelWidth: 120, width: 200, fieldLabel: "Tujuan TPS", name: "KODE_TUJUAN_TPS", fieldCls: "fieldinput", readOnly: true },
                            { xtype: "textfield", width: 200, name: "KODE_TUJUAN_TPS_NAME", fieldCls: "fieldlock", readOnly: true },
                            {
                              xtype: "button",
                              pid: "btsearch",
                              margin: "5 5 5 5",
                              vdata: {
                                modulename: "tujuanplb",
                                title: "Pilih Tujuan",
                                popupwidth: 0.7,
                                popupheight: 0.7,
                              },
                              icon: vconfig.getstyle + "icon/search.ico",
                              tooltip: "search Tujuan",
                              handler: function () {
                                try {
                                  var me = this;
                                  var popup = Ext.create(
                                    "Ext.window.Window",
                                    {
                                      alias: "widget.popup_tujuantps",
                                      reference: "popup_tujuantps",
                                      title: "Pilih Tujuan",
                                      modal: true,
                                      closeAction: "destroy",
                                      centered: true,
                                      autoScroll: true,
                                      //y: -110,
                                      width: mainpanel.getWidth() * 0.3,
                                      height: mainpanel.getHeight() * 0.7,
                                      layout: { type: "hbox", pack: "start", align: "stretch" },
                                      bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
                                      items: [
                                        {
                                          xtype: "grid",
                                          pid: "GRIDpopup_tujuantps",
                                          emptyText: "No Matching Records",
                                          autoScroll: true,
                                          flex: 1,
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
                                              url: vconfig.service_api + "referensi_tps/referensi_tpss",
                                              reader: {
                                                type: "json",
                                                rootProperty: "Rows",
                                                totalProperty: "TotalRows",
                                                successProperty: "success",
                                              },
                                            },
                                            listeners: {
                                              //
                                            },
                                          },
                                          plugins: ["filterfield"],
                                          columns: [
                                            { xtype: "rownumberer", width: 40 },
                                            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "Kode Tujuan", dataIndex: "KODE_TPS" },
                                            { sortable: true, width: 230, filter: { xtype: "textfield" }, header: "Nama Tujuan", dataIndex: "URAIAN_TPS" },
                                          ],
                                          bbar: {
                                            xtype: "pagingtoolbar",
                                            displayInfo: true,
                                            displayMsg: "Displaying topics {0} - {1} of {2}",
                                            emptyMsg: "No topics to display",
                                          },
                                          listeners: {
                                            itemdblClick: function (cmp, rec) {
                                              try {
                                                var FRM = me.up("form");
                                                FRM.getForm().setValues({
                                                  KODE_TUJUAN_TPS: rec.data.KODE_TPS,
                                                  KODE_TUJUAN_TPS_NAME: rec.data.URAIAN_TPS,
                                                });
                                                console.log(FRM)
                                                popup.close();
                                              } catch (ex) {
                                                COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                                              }
                                            },
                                          },
                                        },
                                      ],
                                    },
                                    this
                                  );
                                  popup.show();
                                } catch (ex) {
                                  COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                                }
                              },
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
                  layout: "anchor",
                  padding: "5 5 5 5",
                  items: [
                    {
                      xtype: "container",
                      layout: { type: "vbox", pack: "start", align: "stretch" },
                      height: 170,
                      items: [
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            //
                            { xtype: "textfield", labelWidth: 120, width: 200, fieldLabel: "Kode Incoterm", name: "KODE_CARA_BAYAR", fieldCls: "fieldlock", readOnly: true, emptyText: "Incoterm" },
                            { xtype: "textfield", width: 200, name: "KODE_CARA_BAYAR_NAME", fieldCls: "fieldlock", readOnly: true, emptyText: "Incoterm" },
                          ],
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            //
                            { xtype: "textfield", labelWidth: 120, width: 200, fieldLabel: "Kode Tutup PU", name: "KODE_TUTUP_PU", fieldCls: "fieldlock", readOnly: true, emptyText: "Tutup PU" },
                          ],
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "textfield", labelWidth: 120, width: 320, fieldLabel: "Nomor Bc 11", name: "NOMOR_BC11", fieldCls: "fieldinput", readOnly: false },
                            { xtype: "datefield", labelWidth: 60, width: 170, fieldLabel: "Tanggal", name: "TANGGAL_BC11", fieldCls: "fieldinput", format: "Y-m-d", readOnly: false },
                          ],
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "textfield", labelWidth: 120, width: 320, fieldLabel: "Sub Pos Bc 11", name: "NOMOR_SUB_POS", fieldCls: "fieldinput", readOnly: false },
                            { xtype: "textfield", labelWidth: 60, width: 170, fieldLabel: "Pos Bc 11", name: "NOMOR_POS", fieldCls: "fieldinput", readOnly: false },
                          ],
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "textfield", labelWidth: 120, width: 190, fieldLabel: "Tempat Penimbunan", name: "KODE_TPS", fieldCls: "fieldlock", readOnly: true },
                            { xtype: "textfield", width: 270, name: "KODE_TPS_NAME", fieldCls: "fieldlock", readOnly: false },
                            {
                              xtype: "button",
                              pid: "btsearch",
                              margin: "5 5 5 5",
                              vdata: {
                                modulename: "kodetps",
                                title: "Pilih Tempat Penimbunan",
                                popupwidth: 0.7,
                                popupheight: 0.7,
                              },
                              icon: vconfig.getstyle + "icon/search.ico",
                              tooltip: "search Tempat Penimbunan",
                              handler: function () {
                                try {
                                  var me = this;
                                  var popup = Ext.create(
                                    "Ext.window.Window",
                                    {
                                      alias: "widget.popup_tempatpenimbunan",
                                      reference: "popup_tempatpenimbunan",
                                      title: "Pilih Tempat Penimbunan",
                                      modal: true,
                                      closeAction: "destroy",
                                      centered: true,
                                      autoScroll: true,
                                      //y: -110,
                                      width: mainpanel.getWidth() * 0.3,
                                      height: mainpanel.getHeight() * 0.7,
                                      layout: { type: "hbox", pack: "start", align: "stretch" },
                                      bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
                                      items: [
                                        {
                                          xtype: "grid",
                                          pid: "GRIDpopup_tempatpenimbunan",
                                          emptyText: "No Matching Records",
                                          autoScroll: true,
                                          flex: 1,
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
                                              url: vconfig.service_api + "master_tps/master_tpss",
                                              reader: {
                                                type: "json",
                                                rootProperty: "Rows",
                                                totalProperty: "TotalRows",
                                                successProperty: "success",
                                              },
                                            },
                                            listeners: {
                                              //
                                            },
                                          },
                                          plugins: ["filterfield"],
                                          columns: [
                                            { xtype: "rownumberer", width: 40 },
                                            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "Kode Penimbunan", dataIndex: "KODE_TPS" },
                                            { sortable: true, width: 230, filter: { xtype: "textfield" }, header: "Nama Penimbunan", dataIndex: "URAIAN_TPS" },
                                          ],
                                          bbar: {
                                            xtype: "pagingtoolbar",
                                            displayInfo: true,
                                            displayMsg: "Displaying topics {0} - {1} of {2}",
                                            emptyMsg: "No topics to display",
                                          },
                                          listeners: {
                                            itemdblClick: function (cmp, rec) {
                                              try {
                                                var FRM = me.up("form");
                                                FRM.getForm().setValues({
                                                  KODE_TPS: rec.data.KODE_TPS,
                                                  KODE_TPS_NAME: rec.data.URAIAN_TPS,
                                                });
                                                popup.close();
                                              } catch (ex) {
                                                COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                                              }
                                            },
                                          },
                                        },
                                      ],
                                    },
                                    this
                                  );
                                  popup.show();
                                } catch (ex) {
                                  COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                                }
                              },
                            },
                          ],
                        },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: { type: "vbox", pack: "start", align: "stretch" },
                      height: 200,
                      padding: "5 5 5 5",
                      flex: 1,
                      items: [
                        {
                          xtype: "grid",
                          pid: "GRIDbcout_27_aw_dokumen",
                          emptyText: "No Matching Records",
                          flex: 1,
                          plugins: ["filterfield", { ptype: "cellediting", clicksToEdit: 1 }],
                          viewConfig: {
                            enableTextSelection: true,
                          },
                          store: {
                            autoLoad: false,
                            autoSync: false,
                            remoteSort: false,
                            remoteFilter: false,
                            fields: [
                              { name: "ID", type: "int" },
                              { name: "KODE_DOKUMEN", type: "string" },
                              { name: "NOMOR_DOKUMEN", type: "string" },
                              { name: "SERI", type: "string" },
                              { name: "TANGGAL_DOKUMEN", type: "string" },
                              { name: "INTERNAL_NOMOR_AJU", type: "string" },
                              { name: "ID_COMPANY", type: "string" },
                            ],
                          },
                          columns: [
                            { xtype: "rownumberer", width: 40 },
                            { header: "Seri Dokumen", dataIndex: "SERI", sortable: true, width: 100, filter: { xtype: "textfield" }, editor: { xtype: "textfield", allowBlank: false } },
                            { header: "Kode Dokumen", dataIndex: "KODE_DOKUMEN", sortable: true, width: 110, filter: { xtype: "textfield" } },
                            {
                              header: "Tgl Dokumen",
                              dataIndex: "TANGGAL_DOKUMEN",
                              sortable: true,
                              width: 100,
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
                              header: "Nomor",
                              dataIndex: "NOMOR_DOKUMEN",
                              sortable: true,
                              flex: 1,
                              filter: { xtype: "textfield" },
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
                                    grid.getSelectionModel().select(rowIndex);
                                    var vdt = grid.getSelectionModel().getSelection()[0].data;
                                    if (vdt.KODE_DOKUMEN !== "380" && vdt.KODE_DOKUMEN !== "217") {
                                      grid.getStore().removeAt(rowIndex);
                                    }
                                  },
                                },
                              ],
                            },
                          ],
                          listeners: {
                            beforeedit: function (grid, e) {
                              console.log(e.record.data);
                              if (e.record.data.KODE_DOKUMEN === "380" || e.record.data.KODE_DOKUMEN === "217") {
                                console.log("proses");
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
                              handler: function () {
                                try {
                                  var me = this;
                                  var FRM = me.up("form");
                                  var GRIDdokumen = Ext.create(
                                    "NJC.EXIM.bcout_27_aw.GRIDdokumen",
                                    {
                                      listeners: {
                                        itemdblClick: function (cmp, rec) {
                                          console.log(rec.data)
                                          var me = this;
                                          var GRID = Ext.ComponentQuery.query("FRMbcout_27_aw grid[pid=GRIDbcout_27_aw_dokumen]")[0];
                                          if (rec.data.KODE_DOKUMEN === "380" || rec.data.KODE_DOKUMEN === "217") {
                                            COMP.TipToast.toast("Error", "Kode Dokumen 380 dan 217 tidak bisa di input", { cls: "danger", delay: 2000 });
                                            return false;
                                          }
                                          GRID.getStore().add({
                                            ID: 0,
                                            KODE_DOKUMEN: rec.data.KODE_DOKUMEN,
                                            NOMOR_DOKUMEN: "di input",
                                            SERI: "",
                                            TANGGAL_DOKUMEN: new Date(),
                                            INTERNAL_NOMOR_AJU: "",
                                            ID_COMPANY: "",
                                          });
                                          GRID.getStore().commitChanges();
                                          popup.close();
                                        },
                                      },
                                    },
                                    this
                                  );
                                  var popup = Ext.create(
                                    "Ext.window.Window",
                                    {
                                      alias: "widget.popup_dokumen",
                                      reference: "popup_dokumen",
                                      title: "Pilih Dokumen",
                                      modal: true,
                                      closeAction: "destroy",
                                      centered: true,
                                      //y: -110,
                                      width: mainpanel.getWidth() * 0.3,
                                      height: mainpanel.getHeight() * 0.7,
                                      layout: "fit",
                                      bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
                                      items: [{ xtype: GRIDdokumen }],
                                    },
                                    this
                                  );
                                  return popup.show();
                                } catch (ex) {
                                  COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                                }
                              },
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
                  layout: "anchor",
                  padding: "5 5 5 5",
                  items: [
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 120, width: 200, fieldLabel: "Valuta", name: "KODE_VALUTA", fieldCls: "fieldlock", readOnly: true },
                        { xtype: "textfield", width: 250, name: "KODE_VALUTA_NAME", fieldCls: "fieldlock", readOnly: false },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          margin: "5 0 0 0",
                          vdata: {
                            modulename: "kodevaluta",
                            title: "Pilih Valuta",
                            popupwidth: 0.7,
                            popupheight: 0.7,
                          },
                          icon: vconfig.getstyle + "icon/search.ico",
                          tooltip: "search Valuta",
                          handler: function () {
                            try {
                              var me = this;
                              var popup = Ext.create(
                                "Ext.window.Window",
                                {
                                  alias: "widget.popup_valuta",
                                  reference: "popup_valuta",
                                  title: "Pilih Valuta",
                                  modal: true,
                                  closeAction: "destroy",
                                  centered: true,
                                  autoScroll: true,
                                  //y: -110,
                                  width: mainpanel.getWidth() * 0.3,
                                  height: mainpanel.getHeight() * 0.7,
                                  layout: { type: "hbox", pack: "start", align: "stretch" },
                                  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
                                  items: [
                                    {
                                      xtype: "grid",
                                      pid: "GRIDpopup_valuta",
                                      emptyText: "No Matching Records",
                                      autoScroll: true,
                                      flex: 1,
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
                                          url: vconfig.service_api + "valuta/valutas",
                                          reader: {
                                            type: "json",
                                            rootProperty: "Rows",
                                            totalProperty: "TotalRows",
                                            successProperty: "success",
                                          },
                                        },
                                        listeners: {
                                          //
                                        },
                                      },
                                      plugins: ["filterfield"],
                                      columns: [
                                        { xtype: "rownumberer", width: 40 },
                                        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "Kode Valuta", dataIndex: "KODE_VALUTA" },
                                        { sortable: true, width: 230, filter: { xtype: "textfield" }, header: "Nama Valuta", dataIndex: "URAIAN_VALUTA" },
                                      ],
                                      bbar: {
                                        xtype: "pagingtoolbar",
                                        displayInfo: true,
                                        displayMsg: "Displaying topics {0} - {1} of {2}",
                                        emptyMsg: "No topics to display",
                                      },
                                      listeners: {
                                        itemdblClick: function (cmp, rec) {
                                          try {
                                            var FRM = me.up("form");
                                            FRM.getForm().setValues({
                                              KODE_VALUTA: rec.data.KODE_VALUTA,
                                              KODE_VALUTA_NAME: rec.data.URAIAN_VALUTA,
                                            });
                                            popup.close();
                                          } catch (ex) {
                                            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                                          }
                                        },
                                      },
                                    },
                                  ],
                                },
                                this
                              );
                              popup.show();
                            } catch (ex) {
                              COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                            }
                          },
                        },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "vbox",
                      items: [
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "currencyfield", labelWidth: 120, width: 220, fieldLabel: "Fob", name: "FOB", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                            { xtype: "currencyfield", labelWidth: 60, width: 200, fieldLabel: "Ndpbm", name: "NDPBM", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                          ],
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "currencyfield", labelWidth: 120, width: 220, fieldLabel: "Cif", name: "CIF", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                            { xtype: "currencyfield", labelWidth: 60, width: 200, fieldLabel: "Cif Rupiah", name: "CIF_RUPIAH", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                          ],
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "currencyfield", labelWidth: 120, width: 220, fieldLabel: "Freight", name: "FREIGHT", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                            { xtype: "currencyfield", labelWidth: 60, width: 200, fieldLabel: "Bruto", name: "BRUTO", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
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
                  layout: "anchor",
                  padding: "5 5 5 5",
                  items: [
                    {
                      xtype: "container",
                      padding: "5 5 5 5",
                      layout: { type: "vbox", pack: "start", align: "stretch" },
                      flex: 1,
                      height: 350,
                      items: [
                        {
                          xtype: "grid",
                          pid: "GRIDbcout_27_aw_barang",
                          flex: 1,
                          emptyText: "No Matching Records",
                          plugins: ["filterfield"],
                          viewConfig: {
                            enableTextSelection: true,
                          },
                          store: {
                            autoLoad: false,
                            autoSync: false,
                            remoteSort: false,
                            remoteFilter: false,
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
                              { name: "HS", type: "string" },
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
                              { name: "INTERNAL_NOMOR_AJU", type: "string" },
                              { name: "ISI_PERKEMASAN", type: "string" },
                              { name: "KODE_DOKUMEN", type: "string" },
                              { name: "NILAI_TAMBAH", type: "string" },
                              { name: "NDPBM", type: "float" },
                              { name: "HARGA_PEROLEHAN", type: "float" },
                              { name: "KODE_ASAL_BAHAN_BAKU", type: "string" },
                              { name: "BRUTO", type: "float" },
                              { name: "ID_COMPANY", type: "string" },
                              { name: "CREATE_USER", type: "string" },
                            ],
                          },
                          columns: [
                            { header: "SERI BARANG", dataIndex: "SERI_BARANG", sortable: true, width: 100, hidden: false, filter: { xtype: "textfield" } },
                            { header: "KODE ", dataIndex: "KODE_BARANG", sortable: true, width: 120, hidden: false, align: "right", filter: { xtype: "textfield" } },
                            { header: "NAMA ", dataIndex: "URAIAN", sortable: true, width: 120, hidden: false, align: "right", filter: { xtype: "textfield" } },
                            { header: "CIF", dataIndex: "CIF", sortable: true, width: 100, hidden: false, align: "right", renderer: "formatAmount", filter: { xtype: "textfield" } },
                            { header: "CIF RUPIAH", dataIndex: "CIF_RUPIAH", sortable: true, width: 100, hidden: false, align: "right", renderer: "formatAmount", filter: { xtype: "textfield" } },
                            { header: "NDPBM", dataIndex: "NDPBM", sortable: true, width: 80, hidden: false, filter: { xtype: "textfield" } },
                            { header: "JUMLAH SATUAN", dataIndex: "JUMLAH_SATUAN", sortable: true, width: 110, hidden: false, align: "right", renderer: "formatAmount", filter: { xtype: "textfield" } },
                            { header: "JUMLAH KEMASAN", dataIndex: "JUMLAH_KEMASAN", sortable: true, width: 120, hidden: false, align: "right", renderer: "formatAmount", filter: { xtype: "textfield" } },
                            { header: "HARGA PENYERAHAN", dataIndex: "HARGA_PENYERAHAN", sortable: true, width: 130, hidden: false, align: "right", renderer: "formatAmount", filter: { xtype: "textfield" } },
                            { header: "POS TARIF", dataIndex: "HS", sortable: true, width: 100, hidden: false, filter: { xtype: "textfield" } },
                          ],
                          tbar: [
                            "-",
                            //
                            {
                              xtype: "button",
                              text: "Detail Barang",
                              id: "btdetil_barang",
                              pid: "btdetil_barang",
                              icon: vconfig.getstyle + "icon/grid.png",
                              tooltip: "Detil Barang",
                              handler: function () {
                                try {
                                  var GRIDbarang = Ext.create(
                                    "NJC.EXIM.bcout_27_aw.GRIDbarang",
                                    {
                                      //
                                    },
                                    this
                                  );
                                  var popup = Ext.create(
                                    "Ext.window.Window",
                                    {
                                      alias: "widget.popup_barang",
                                      reference: "popup_barang",
                                      title: "Detail Barang",
                                      modal: true,
                                      closeAction: "destroy",
                                      centered: true,
                                      //y: -110,
                                      width: mainpanel.getWidth() * 0.9,
                                      height: mainpanel.getHeight() * 0.8,
                                      layout: "fit",
                                      bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
                                      items: [{ xtype: GRIDbarang }],
                                    },
                                    this
                                  );
                                  return popup.show();
                                } catch (ex) {
                                  COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                                }
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            { xtype: "tbspacer", width: 10 },
          ],
        },
      ],
    },
  ],
  dockedItems: [
    {
      xtype: "toolbar",
      pid: "toolbar_FRMbcout_27_aw",
      height: 30,
      dock: "top",
      items: [
        { xtypeL: "tbspacer", width: 5 },
        { xtype: "button", text: "Cancel Dokumen", id: "btcancel_dokumen", pid: "btcancel_dokumen", icon: vconfig.getstyle + "icon/delete.ico", tooltip: "Cancel Dokumen BC 27", handler: "btcancel_click" },
        { xtype: "button", text: "Update Dokumen", id: "btsimpan_draft", pid: "btsimpan_draft", icon: vconfig.getstyle + "icon/save.gif", tooltip: "Proses Update Dokumen BC 27", handler: "btupdate_click" },
        { xtype: "button", text: "Kunci Perubahan Dokumen", id: "btposting_click", pid: "btposting_click", icon: vconfig.getstyle + "icon/lock.png", tooltip: "Proses Lock Dokumen BC 27", handler: "btposting_click" },
        "-",
        { xtype: "button", text: "Get Respon", id: "btget_from_portal", pid: "btget_from_portal", icon: vconfig.getstyle + "icon/down.ico", tooltip: "Sinkronisasi Dokumen dari Aplikasi Portal Ceisa 4.0", handler: "btget_from_portal" },
        "-",
        { xtype: "button", text: "Send To Portal", id: "btsendportal_click", pid: "btsendportal_click", icon: vconfig.getstyle + "icon/up.ico", tooltip: "Kirim Dokumen Ke Portal Ceisa 4.0", handler: "btsendportal_click" },
      ],
      // other options....
    },
  ],
  listeners: {
    // show: "FRMbcout_27_aw_load",
  },
});
