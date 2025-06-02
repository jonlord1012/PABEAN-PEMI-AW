var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.EXIM.bcin_271.FRMbcin_271", {
  extend: "Ext.window.Window",
  alias: "widget.FRMbcin_271",
  reference: "FRMbcin_271",
  title: "Header Dokumen BC 27",
  modal: true,
  closeAction: "destroy",
  centered: true,
  requires: [
    //
    "NJC.EXIM.bcin_271.Cbcin_271",
  ],
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
                { xtype: "textfield", fieldLabel: "Nik", name: "NIK", labelWidth: 30, width: 200, fieldCls: "fieldlock", readOnly: true },
                //
              ],
            },
            { xtype: "tbspacer", flex: 1 },
            { xtype: "textfield", fieldLabel: "Seri Dokumen", name: "SERI", labelWidth: 80, width: 130, fieldCls: "fieldlock", readOnly: true },
            { xtype: "textfield", fieldLabel: "Kode Dokumen", name: "KODEDOKUMEN", labelWidth: 90, labelAlign: "right", width: 130, fieldCls: "fieldlock", readOnly: true },
            { xtype: "textfield", fieldLabel: "Sumber Data", name: "MODE_SOURCE", labelWidth: 80, labelAlign: "right", width: 130, fieldCls: "fieldlock", readOnly: true },
            { xtype: "textfield", fieldLabel: "Company", name: "ID_COMPANY", labelWidth: 65, labelAlign: "right", width: 120, fieldCls: "fieldlock", readOnly: true },
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
                        { xtype: "datefield", labelWidth: 80, width: 190, fieldLabel: "Tanggal Aju", name: "TANGGAL_AJU", fieldCls: "fieldinput", format: "Y-m-d", readOnly: true },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "Nomor Daftar", name: "NOMOR_DAFTAR", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "datefield", labelWidth: 80, width: 190, fieldLabel: "Tanggal Daftar", name: "TANGGAL_DAFTAR", fieldCls: "fieldinput", format: "Y-m-d", readOnly: true },
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
                        { xtype: "textfield", labelWidth: 120, width: 185, fieldLabel: "1. Seri,Kode,Jenis", name: "ENTITAS1_SERIENTITAS", fieldCls: "fieldlock", readOnly: true, value: "1" },
                        { xtype: "textfield", width: 65, name: "ENTITAS1_KODEENTITAS", fieldCls: "fieldlock", readOnly: true, value: "3" },
                        { xtype: "textfield", width: 65, name: "ENTITAS1_KODEJENISENTITAS", fieldCls: "fieldlock", readOnly: true, value: "5" },
                        { xtype: "textfield", labelWidth: 80, width: 145, fieldLabel: "Kode Status", name: "ENTITAS1_KODESTATUS", fieldCls: "fieldlock", readOnly: true, value: "" },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        //
                        { xtype: "textfield", labelWidth: 120, width: 500, fieldLabel: "2. Nama", name: "ENTITAS1_NAMAENTITAS", fieldCls: "fieldinput", readOnly: true },
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
                        { xtype: "textfield", labelWidth: 120, width: 250, labelAlign: "left", fieldLabel: "5. NIB & NIPER", name: "ENTITAS1_NIBENTITAS", fieldCls: "fieldlock", readOnly: true },
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
                        { xtype: "textfield", labelWidth: 120, width: 185, fieldLabel: "1. Seri,Kode,Jenis", name: "ENTITAS2_SERIENTITAS", fieldCls: "fieldlock", readOnly: true, value: "1" },
                        { xtype: "textfield", width: 65, name: "ENTITAS2_KODEENTITAS", fieldCls: "fieldlock", readOnly: true, value: "3" },
                        { xtype: "textfield", width: 65, name: "ENTITAS2_KODEJENISENTITAS", fieldCls: "fieldlock", readOnly: true, value: "5" },
                        { xtype: "textfield", labelWidth: 80, width: 145, fieldLabel: "Kode Status", name: "ENTITAS2_KODESTATUS", fieldCls: "fieldlock", readOnly: true, value: "" },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        //
                        { xtype: "textfield", labelWidth: 120, width: 500, fieldLabel: "2. Nama", name: "ENTITAS2_NAMAENTITAS", fieldCls: "fieldinput", readOnly: true },
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
                        { xtype: "textfield", labelWidth: 120, width: 185, fieldLabel: "1. Seri,Kode,Jenis", name: "ENTITAS3_SERIENTITAS", fieldCls: "fieldlock", readOnly: true, value: "1" },
                        { xtype: "textfield", width: 65, name: "ENTITAS3_KODEENTITAS", fieldCls: "fieldlock", readOnly: true, value: "3" },
                        { xtype: "textfield", width: 65, name: "ENTITAS3_KODEJENISENTITAS", fieldCls: "fieldlock", readOnly: true, value: "5" },
                        { xtype: "textfield", labelWidth: 80, width: 145, fieldLabel: "Kode Status", name: "ENTITAS3_KODESTATUS", fieldCls: "fieldlock", readOnly: true, value: "" },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        //
                        { xtype: "textfield", labelWidth: 120, width: 500, fieldLabel: "2. Nama", name: "ENTITAS3_NAMAENTITAS", fieldCls: "fieldinput", readOnly: true },
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
                        { xtype: "textfield", labelWidth: 120, width: 250, labelAlign: "left", fieldLabel: "5. NIB & NIPER", name: "ENTITAS3_NIBENTITAS", fieldCls: "fieldlock", readOnly: true },
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
                  layout: { type: "vbox", pack: "start", align: "stretch" },
                  padding: "5 5 5 5",
                  flex: 1,
                  items: [
                    {
                      xtype: "grid",
                      pid: "GRIDbcin_271_pengangkut",
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
                      },
                      columns: [
                        { header: "Seri", dataIndex: "SERI", sortable: true, width: 50 },
                        {
                          header: "KODE",
                          dataIndex: "KODECARAANGKUT",
                          sortable: true,
                          width: 120,
                          editor: {
                            xtype: "combo",
                            typeAhead: true,
                            triggerAction: "all",
                            store: [
                              ["1", "DARAT"],
                              ["3", "LAUT"],
                              ["4", "UDARA"],
                            ],
                          },
                        },
                        {
                          header: "NAMA",
                          dataIndex: "NAMAPENGANGKUT",
                          sortable: true,
                          flex: 1,
                          editor: {
                            xtype: "textfield",
                          },
                        },
                        {
                          header: "NOMOR",
                          dataIndex: "NOMORPENGANGKUT",
                          sortable: true,
                          width: 120,
                          editor: {
                            xtype: "textfield",
                          },
                        },
                        {
                          header: "BENDERA",
                          dataIndex: "KODEBENDERA",
                          sortable: true,
                          width: 120,
                          editor: {
                            xtype: "textfield",
                          },
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
                        { xtype: "textfield", labelWidth: 150, width: 220, fieldLabel: "Pelabuhan Muat", name: "KODE_PEL_MUAT", fieldCls: "fieldlock", readOnly: true },
                        { xtype: "textfield", width: 200, name: "KODE_PEL_MUATNAME", fieldCls: "fieldlock", readOnly: true },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          margin: "5 0 0 0",
                          vdata: {
                            modulename: "pelmuat",
                            title: "Pilih Pelabuhan Muat",
                            popupwidth: 0.7,
                            popupheight: 0.7,
                          },
                          icon: vconfig.getstyle + "icon/search.ico",
                          tooltip: "Search Pelabuhan Muat",
                          handler: function () {
                            try {
                              var me = this;
                              var MAINpage = me.up().up().up().up().up().up();
                              var FRM = MAINpage.query("form")[0];
                              var GRIDpelabuhan = Ext.create(
                                "NJC.EXIM.bcin_271.GRIDpelabuhan",
                                {
                                  listeners: {
                                    itemdblClick: function (cmp, rec) {
                                      FRM.getForm().setValues({
                                        KODE_PEL_MUAT: rec.data.KODE_PELABUHAN,
                                        KODE_PEL_MUATNAME: rec.data.URAIAN_PELABUHAN,
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
                        { xtype: "textfield", labelWidth: 150, width: 220, fieldLabel: "Pelabuhan Transit", name: "KODE_PEL_TRANSIT", fieldCls: "fieldlock", readOnly: true },
                        { xtype: "textfield", width: 200, name: "KODE_PEL_TRANSITNAME", fieldCls: "fieldlock", readOnly: true },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          margin: "5 0 0 0",
                          vdata: {
                            modulename: "peltransit",
                            title: "Pilih Pelabuhan Transit",
                            popupwidth: 0.7,
                            popupheight: 0.7,
                          },
                          icon: vconfig.getstyle + "icon/search.ico",
                          tooltip: "Search Pelabuhan Transit",
                          handler: function () {
                            try {
                              var me = this;
                              var MAINpage = me.up().up().up().up().up().up();
                              var FRM = MAINpage.query("form")[0];
                              var GRIDpelabuhan = Ext.create(
                                "NJC.EXIM.bcin_271.GRIDpelabuhan",
                                {
                                  listeners: {
                                    itemdblClick: function (cmp, rec) {
                                      FRM.getForm().setValues({
                                        KODE_PEL_TRANSIT: rec.data.KODE_PELABUHAN,
                                        KODE_PEL_TRANSITNAME: rec.data.URAIAN_PELABUHAN,
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
                        { xtype: "textfield", labelWidth: 150, width: 220, fieldLabel: "Pelabuhan Bongkar", name: "KODE_PEL_BONGKAR", fieldCls: "fieldlock", readOnly: true },
                        { xtype: "textfield", width: 200, name: "KODE_PEL_BONGKARNAME", fieldCls: "fieldlock", readOnly: true },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          margin: "5 0 0 0",
                          vdata: {
                            modulename: "pelbongkar",
                            title: "Pilih Pelabuhan Bongkar",
                            popupwidth: 0.7,
                            popupheight: 0.7,
                          },
                          icon: vconfig.getstyle + "icon/search.ico",
                          tooltip: "Search Pelabuhan Bongkar",
                          handler: function () {
                            try {
                              var me = this;
                              var MAINpage = me.up().up().up().up().up().up();
                              var FRM = MAINpage.query("form")[0];
                              var GRIDpelabuhan = Ext.create(
                                "NJC.EXIM.bcin_271.GRIDpelabuhan",
                                {
                                  listeners: {
                                    itemdblClick: function (cmp, rec) {
                                      FRM.getForm().setValues({
                                        KODE_PEL_BONGKAR: rec.data.KODE_PELABUHAN,
                                        KODE_PEL_BONGKARNAME: rec.data.URAIAN_PELABUHAN,
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
                  layout: { type: "vbox", pack: "start", align: "stretch" },
                  padding: "5 5 5 5",
                  flex: 1,
                  items: [
                    {
                      xtype: "grid",
                      pid: "GRIDbcin_271_kontainer",
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
                      },
                      columns: [
                        { header: "Seri", dataIndex: "SERI_KONTAINER", sortable: true, width: 50 },
                        { header: "Ukuran", dataIndex: "KODE_UKURAN_KONTAINER", sortable: true, width: 50, editor: { xtype: "numberfield" } },
                        { header: "Nomor", dataIndex: "NOMOR_KONTAINER", sortable: true, flex: 1, editor: { xtype: "textfield" } },
                        { header: "Tipe", dataIndex: "KODE_TIPE_KONTAINER", sortable: true, width: 50 },
                        { header: "Jenis", dataIndex: "KODEJENISKONTAINER", sortable: true, width: 50 },
                      ],
                    },
                  ],
                },
                {
                  xtype: "fieldset",
                  title: "Jumlah dan jenis kemasan",
                  layout: { type: "vbox", pack: "start", align: "stretch" },
                  flex: 1,
                  bodyPadding: "5 0 0 0",
                  items: [
                    {
                      xtype: "grid",
                      pid: "GRIDbcin_271_kemasan",
                      emptyText: "No Matching Records",
                      flex: 1,
                      height: 100,
                      plugins: {
                        cellediting: {
                          clicksToEdit: 1,
                        },
                      },
                      store: {
                        fields: ["JUMLAH_KEMASAN", "SERI_KEMASAN", "KODE_JENIS_KEMASAN", "MERK_KEMASAN"],
                      },
                      columns: [
                        { header: "Seri", dataIndex: "SERI", sortable: true, width: 80 },
                        { header: "Jumlah", dataIndex: "JUMLAHKEMASAN", sortable: true, width: 80, editor: { xtype: "textfield" } },
                        { header: "Kode", dataIndex: "KODEKEMASAN", sortable: true, width: 80, editor: { xtype: "textfield" } },
                        { header: "Merk", dataIndex: "MEREK", sortable: true, flex: 1 },
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
                            { xtype: "textfield", labelWidth: 100, width: 160, fieldLabel: "Kantor Bongkar", name: "KODEKANTORBONGKAR", fieldCls: "fieldinput", readOnly: true },
                            { xtype: "textfield", width: 200, name: "KODE_KANTOR_BONGKARNAME", fieldCls: "fieldlock", readOnly: true },
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
                                                var MAIN_FRM = me.up().up().up().up().up().up().up();
                                                var FRM = MAIN_FRM.query("form")[0];
                                                FRM.getForm().setValues({
                                                  KODEKANTORBONGKAR: rec.data.KODE_KANTOR,
                                                  KODE_KANTOR_BONGKARNAME: rec.data.URAIAN_KANTOR,
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
                            { xtype: "textfield", labelWidth: 100, width: 160, fieldLabel: "Kantor Pabean", name: "KODE_KANTOR", fieldCls: "fieldinput", readOnly: true },
                            { xtype: "textfield", width: 200, name: "KODE_KANTORNAME", fieldCls: "fieldlock", readOnly: true },
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
                                                var MAIN_FRM = me.up().up().up().up().up().up().up();
                                                var FRM = MAIN_FRM.query("form")[0];
                                                FRM.getForm().setValues({
                                                  KODE_KANTOR: rec.data.KODE_KANTOR,
                                                  KODE_KANTORNAME: rec.data.URAIAN_KANTOR,
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
                            { xtype: "textfield", labelWidth: 100, width: 160, fieldLabel: "Tujuan", name: "KODEKANTORTUJUAN", fieldCls: "fieldinput", readOnly: true },
                            { xtype: "textfield", width: 200, name: "KODE_TUJUAN_TPBNAME", fieldCls: "fieldlock", readOnly: true },
                            {
                              xtype: "button",
                              pid: "btsearch",
                              margin: "5 5 5 5",
                              vdata: {
                                modulename: "tujuantpb",
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
                                      alias: "widget.popup_tujuantpb",
                                      reference: "popup_tujuantpb",
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
                                          pid: "GRIDpopup_tujuantpb",
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
                                              url: vconfig.service_api + "tujuantpb/tujuantpbs",
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
                                            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "Kode Tujuan", dataIndex: "KODE_TUJUAN_TPB" },
                                            { sortable: true, width: 230, filter: { xtype: "textfield" }, header: "Nama Tujuan", dataIndex: "URAIAN_TUJUAN_TPB" },
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
                                                var MAIN_FRM = me.up().up().up().up().up().up().up();
                                                var FRM = MAIN_FRM.query("form")[0];
                                                FRM.getForm().setValues({
                                                  KODEKANTORTUJUAN: rec.data.KODE_TUJUAN_TPB,
                                                  KODE_TUJUAN_TPBNAME: rec.data.URAIAN_TUJUAN_TPB,
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
                            //
                            { xtype: "textfield", labelWidth: 100, width: 180, fieldLabel: "Kode Incoterm", name: "KODECARABAYAR", fieldCls: "fieldlock", readOnly: true, emptyText: "Incoterm" },
                          ],
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            //
                            { xtype: "textfield", labelWidth: 100, width: 180, fieldLabel: "Kode Tutup PU", name: "KODETUTUPPU", fieldCls: "fieldlock", readOnly: true, emptyText: "Tutup PU" },
                          ],
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "Nomor Bc 11", name: "NOMORBC11", fieldCls: "fieldinput", readOnly: false },
                            { xtype: "datefield", labelWidth: 60, width: 170, fieldLabel: "Tanggal", name: "TANGGALBC11", fieldCls: "fieldinput", format: "Y-m-d", readOnly: false },
                          ],
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "Sub Pos Bc 11", name: "NOMORSUBPOS", fieldCls: "fieldinput", readOnly: false },
                            { xtype: "textfield", labelWidth: 60, width: 170, fieldLabel: "Pos Bc 11", name: "NOMORPOS", fieldCls: "fieldinput", readOnly: false },
                          ],
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "textfield", labelWidth: 100, width: 170, fieldLabel: "Tempat Penimbunan", name: "KODETPS", fieldCls: "fieldlock", readOnly: true },
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
                                                var MAIN_FRM = me.up().up().up().up().up().up().up();
                                                var FRM = MAIN_FRM.query("form")[0];
                                                FRM.getForm().setValues({
                                                  KODETPS: rec.data.KODE_TPS,
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
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            {
                              xtype: "grid",
                              pid: "GRIDbcin_271_dokumen",
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
                                { header: "Seri Dokumen", dataIndex: "SERI", sortable: true, width: 100, filter: { xtype: "textfield" } },
                                { header: "Kode Dokumen", dataIndex: "KODEDOKUMEN", sortable: true, width: 110, filter: { xtype: "textfield" } },
                                {
                                  header: "Nomor",
                                  dataIndex: "NOMORDOKUMEN",
                                  sortable: true,
                                  width: 100,
                                  filter: { xtype: "textfield" },
                                  editor: {
                                    xtype: "textfield",
                                    allowBlank: false,
                                  },
                                },
                                {
                                  header: "Tgl Dokumen",
                                  dataIndex: "TANGGALDOKUMEN",
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
                                        console.log(vdt.KODEDOKUMEN);
                                        if (vdt.KODEDOKUMEN !== "380") {
                                          grid.getStore().removeAt(rowIndex);
                                        }
                                      },
                                    },
                                  ],
                                },
                              ],
                              listeners: {
                                beforeedit: function (grid, e) {
                                  if (e.record.data.KODEDOKUMEN === "380") {
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
                        { xtype: "textfield", labelWidth: 60, width: 120, fieldLabel: "Valuta", name: "KODEVALUTA", fieldCls: "fieldlock", readOnly: true },
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
                                            var MAIN_FRM = me.up().up().up().up().up().up();
                                            var FRM = MAIN_FRM.query("form")[0];
                                            FRM.getForm().setValues({
                                              KODEVALUTA: rec.data.KODE_VALUTA,
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
                          pid: "GRIDbcin_271_barang",
                          emptyText: "No Matching Records",
                          flex: 1,
                          height: 310,
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
                              { name: "CIFRUPIAH", type: "float" },
                              { name: "DISKON", type: "float" },
                              { name: "FLAGKENDARAAN", type: "string" },
                              { name: "FOB", type: "float" },
                              { name: "FREIGHT", type: "float" },
                              { name: "HARGABARANGLDP", type: "float" },
                              { name: "HARGA_INVOICE", type: "float" },
                              { name: "HARGAPENYERAHAN", type: "float" },
                              { name: "HARGASATUAN", type: "float" },
                              { name: "JENISKENDARAAN", type: "string" },
                              { name: "JUMLAHBAHANBAKU", type: "float" },
                              { name: "JUMLAHKEMASAN", type: "float" },
                              { name: "JUMLAHSATUAN", type: "float" },
                              { name: "KATEGORIBARANG", type: "string" },
                              { name: "KODEASALBARANG", type: "string" },
                              { name: "KODEBARANG", type: "string" },
                              { name: "KODEFASILITASDOKUMEN", type: "string" },
                              { name: "KODEGUNA", type: "string" },
                              { name: "KODEJENISNILAI", type: "string" },
                              { name: "KODEKEMASAN", type: "string" },
                              { name: "KODENEGARAASAL", type: "string" },
                              { name: "KODESATUAN", type: "string" },
                              { name: "KODESTATUS", type: "string" },
                              { name: "KONDISIBARANG", type: "string" },
                              { name: "MEREK", type: "string" },
                              { name: "NETTO", type: "float" },
                              { name: "NILAIINCOTERM", type: "float" },
                              { name: "NILAIPABEAN", type: "float" },
                              { name: "HS", type: "string" },
                              { name: "SERIBARANG", type: "int" },
                              { name: "SERIIZIN", type: "string" },
                              { name: "SERIPOSTARIF", type: "string" },
                              { name: "SPESIFIKASILAIN", type: "string" },
                              { name: "TAHUNPEMBUATAN", type: "string" },
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
                          },
                          columns: [
                            { header: "Seri Barang", dataIndex: "SERIBARANG", sortable: true, width: 100, hidden: false, filter: { xtype: "textfield" } },
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
                            { header: "Kode Satuan Barang", dataIndex: "KODESATUAN", sortable: true, width: 130, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Kode Asal Barang", dataIndex: "KODEASALBARANG", sortable: true, width: 130, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Kode Asal Bahan Baku", dataIndex: "KODEASALBAHANBAKU", sortable: true, width: 130, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Netto", dataIndex: "NETTO", sortable: true, width: 100, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Nilai Barang", dataIndex: "NILAIBARANG", sortable: true, width: 100, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Nilai Jasa", dataIndex: "NILAIJASA", sortable: true, width: 100, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Uang Muka", dataIndex: "UANGMUKA", sortable: true, width: 100, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Pos Tarif", dataIndex: "HS", sortable: true, width: 100, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Tipe", dataIndex: "TIPE", sortable: true, width: 80, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Ndpbm", dataIndex: "NDPBM", sortable: true, width: 80, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Ukuran", dataIndex: "UKURAN", sortable: true, width: 80, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Merek", dataIndex: "MEREK", sortable: true, width: 80, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Uraian", dataIndex: "URAIAN", sortable: true, width: 100, hidden: false, filter: { xtype: "textfield" } },
                            { header: "Spesifikasi Lain", dataIndex: "SPESIFIKASILAIN", sortable: true, width: 130, hidden: false, filter: { xtype: "textfield" } },
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
                                    "NJC.EXIM.bcin_271.GRIDbarang",
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
                                      autoScroll: true,
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
          ],
        },
      ],
    },
  ],
  dockedItems: [
    {
      xtype: "toolbar",
      pid: "toolbar_FRMbcin_271",
      height: 30,
      dock: "top",
      items: [
        { xtypeL: "tbspacer", width: 5 },
        { xtype: "button", text: "Cancel Dokumen", id: "btcancel_dokumen", pid: "btcancel_dokumen", icon: vconfig.getstyle + "icon/delete.ico", tooltip: "Cancel Dokumen BC 27", handler: "btcancel_click" },
        { xtype: "button", text: "Update Dokumen", id: "btsimpan_draft", pid: "btsimpan_draft", icon: vconfig.getstyle + "icon/save.gif", tooltip: "Proses Update Dokumen BC 27", handler: "FRMbcin_271_btupdate_click" },
        { xtype: "button", text: "Kunci Perubahan Dokumen", id: "btlock_draft", pid: "btlock_draft", icon: vconfig.getstyle + "icon/lock.png", tooltip: "Proses Lock Dokumen BC 27", handler: "FRMbcin_271_btlock_click" },
        "-",
        { xtype: "button", text: "Get Respon", id: "btget_from_portal", pid: "btget_from_portal", icon: vconfig.getstyle + "icon/down.ico", tooltip: "Sinkronisasi Dokumen dari Aplikasi Portal Ceisa 4.0", handler: "btget_from_portal" },
        "-",
        { xtype: "button", text: "Send To Portal", id: "btsend_to_portal", pid: "btsend_to_portal", icon: vconfig.getstyle + "icon/up.ico", tooltip: "Kirim Dokumen Ke Portal Ceisa 4.0", handler: "btsendtoportal_click" },
      ],
      // other options....
    },
  ],
  listeners: {
    //show: "FRMbcin_271_load",
  },
});
