var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.EXIM.bcout_27.FRMbcout_27", {
   extend: "Ext.window.Window",
   alias: "widget.FRMbcout_27",
   reference: "FRMbcout_27",
   title: "Header Dokumen BC 27",
   modal: true,
   closeAction: "destroy",
   centered: true,
   requires: [
      //
      "NJC.EXIM.bcout_27.Cbcout_27",
   ],
   controller: "Cbcout_27",
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
                     layout: "vbox",
                     flex: 1,
                     items: [
                        {
                           xtype: "container",
                           layout: "hbox",
                           flex: 1,
                           items: [
                              { xtype: "textfield", fieldLabel: "Asal Data", name: "ASAL_DATA", labelWidth: 120, width: 200, fieldCls: "fieldlock", readOnly: true },
                           ]
                        },
                        {
                           xtype: "container",
                           layout: "hbox",
                           flex: 1,
                           items: [
                              { xtype: "textfield", fieldLabel: "Nomor Respon", name: "NOMOR_RESPON", labelWidth: 120, width: 350, fieldCls: "fieldlock", readOnly: true },
                              { xtype: "textfield", fieldLabel: "Portal Status", name: "PORTAL_STATUS", labelWidth: 80, width: 200, fieldCls: "fieldlock", readOnly: true },
                           ]
                        },
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
                              { xtype: "textfield", fieldLabel: "Kode Dokumen", name: "KODE_DOKUMEN_PABEAN", labelWidth: 85, labelAlign: "right", width: 185, fieldCls: "fieldlock", readOnly: true },
                              { xtype: "textfield", fieldLabel: "Sumber Data", name: "MODE_SOURCE", labelWidth: 85, labelAlign: "right", width: 180, fieldCls: "fieldlock", readOnly: true },
                              { xtype: "textfield", name: "ID_COMPANY", labelAlign: "right", flex: 1, fieldCls: "fieldlock", readOnly: true },
                           ],
                        },
                        {
                           xtype: "container",
                           layout: { type: "hbox", pack: "start", align: "stretch" },
                           items: [
                              { xtype: "textfield", fieldLabel: "Status", name: "POSTINGSTATUS", labelWidth: 80, width: 200, fieldCls: "fieldlock", readOnly: true },
                              { xtype: "textfield", fieldLabel: "Posting User", name: "POSTINGUSER", labelWidth: 85, labelAlign: "right", width: 185, fieldCls: "fieldlock", readOnly: true },
                              { xtype: "textfield", fieldLabel: "Posting Date", name: "POSTINGDATE", labelWidth: 85, labelAlign: "right", width: 180, fieldCls: "fieldlock", readOnly: true },
                              { xtype: "textfield", name: "ID", labelAlign: "right", flex: 1, fieldCls: "fieldlock-red", readOnly: true },
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
                                    { xtype: "textfield", labelWidth: 120, width: 350, fieldLabel: "Nomor Aju", name: "NOMOR_AJU", fieldCls: "fieldinput", readOnly: false },
                                    { xtype: "datefield", labelWidth: 80, width: 190, fieldLabel: "Tanggal Aju", name: "TANGGAL_AJU", fieldCls: "fieldinput", format: "Y-m-d", readOnly: false },
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
                                    { xtype: "textfield", labelWidth: 120, width: 500, fieldLabel: "2. Nama", name: "ENTITAS1_NAMAENTITAS", fieldCls: "fieldinput", readOnly: true },
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
                                             var GRIDentitas = Ext.create(
                                                "NJC.EXIM.bcout_27.GRIDentitas",
                                                {
                                                   listeners: {
                                                      itemdblClick: function (cmp, rec) {
                                                         FRM.getForm().setValues({
                                                            ENTITAS1_NAMAENTITAS: rec.data.NAMA,
                                                            ENTITAS1_ALAMATENTITAS: rec.data.ALAMAT,
                                                            ENTITAS1_KODENEGARA: rec.data.KODE_NEGARA,
                                                            ENTITAS1_NOMORIJINENTITAS: rec.data.NOMOR_IJIN,
                                                            ENTITAS1_TANGGALIJINENTITAS: rec.data.TANGGAL_IJIN,
                                                            ENTITAS1_NIBENTITAS: rec.data.NIB,
                                                            ENTITAS1_KODEJENISAPI: rec.data.KODEJENISAPI,
                                                            ENTITAS1_NOMORIDENTITAS: rec.data.NOMORIDENTITAS,
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
                                                   //y: -110,
                                                   width: mainpanel.getWidth() * 0.6,
                                                   height: mainpanel.getHeight() * 0.7,
                                                   flex: 1,

                                                   layout: { type: "hbox", pack: "start", align: "stretch" },
                                                   bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
                                                   items: [{ xtype: GRIDentitas }],
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
                           title: "Pemilik (Entitas 2)",
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
                                          modulename: "Pemilik",
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
                                             var GRIDentitas = Ext.create(
                                                "NJC.EXIM.bcout_27.GRIDentitas",
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
                                                            ENTITAS2_KODEJENISAPI: rec.data.KODEJENISAPI,
                                                            ENTITAS2_NOMORIDENTITAS: rec.data.NOMORIDENTITAS,
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
                                                   title: "Pilih pemilik",
                                                   modal: true,
                                                   closeAction: "destroy",
                                                   centered: true,
                                                   //y: -110,
                                                   width: mainpanel.getWidth() * 0.6,
                                                   height: mainpanel.getHeight() * 0.7,
                                                   flex: 1,

                                                   layout: { type: "hbox", pack: "start", align: "stretch" },
                                                   bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
                                                   items: [{ xtype: GRIDentitas }],
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
                                    { xtype: "textfield", labelWidth: 120, width: 250, labelAlign: "left", fieldLabel: "4. NIB", name: "ENTITAS2_NIBENTITAS", fieldCls: "fieldlock", readOnly: true },
                                 ],
                              },
                              {
                                 xtype: "container",
                                 layout: "hbox",
                                 items: [
                                    //
                                    { xtype: "textfield", labelWidth: 120, width: 250, labelAlign: "left", fieldLabel: "5. API & No Identitas", name: "ENTITAS2_KODEJENISAPI", fieldCls: "fieldlock", readOnly: true },
                                    { xtype: "textfield", width: 250, name: "ENTITAS2_NOMORIDENTITAS", fieldCls: "fieldlock", readOnly: true, value: "" },
                                 ],
                              },
                           ],
                        },
                        {
                           xtype: "fieldset",
                           title: "Pengirim (Entitas 3)",
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
                                          modulename: "Pengirim",
                                          title: "Pilih Pengirim",
                                          popupwidth: 0.7,
                                          popupheight: 0.7,
                                       },
                                       icon: vconfig.getstyle + "icon/search.ico",
                                       tooltip: "Search Pengirim",
                                       handler: function () {
                                          try {
                                             var me = this;
                                             var FRM = me.up("form");
                                             var GRIDentitas = Ext.create(
                                                "NJC.EXIM.bcout_27.GRIDentitas",
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
                                                            ENTITAS3_KODEJENISAPI: rec.data.KODEJENISAPI,
                                                            ENTITAS3_NOMORIDENTITAS: rec.data.NOMORIDENTITAS,
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
                                                   alias: "widget.popup_pengirim",
                                                   reference: "popup_pengirim",
                                                   title: "Pilih Pengirim",
                                                   modal: true,
                                                   closeAction: "destroy",
                                                   centered: true,
                                                   //y: -110,
                                                   width: mainpanel.getWidth() * 0.6,
                                                   height: mainpanel.getHeight() * 0.7,
                                                   flex: 1,
                                                   layout: { type: "hbox", pack: "start", align: "stretch" },
                                                   bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
                                                   items: [{ xtype: GRIDentitas }],
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
                                 height: 150,
                                 items: [
                                    {
                                       xtype: "grid",
                                       pid: "GRIDbcout_27_pengangkut",
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
                                             { name: "SERIPENGANGKUT", type: "string" },
                                             { name: "KODECARAANGKUT", type: "string" },
                                             { name: "NAMAPENGANGKUT", type: "string" },
                                             { name: "NOMORPENGANGKUT", type: "string" },
                                             { name: "KODEBENDERA", type: "string" },
                                             { name: "NOMORAJU", type: "string" },
                                             { name: "KODECARAANGKUTNAME", type: "string" },

                                          ],
                                       },
                                       columns: [
                                          { header: "SERI", dataIndex: "SERIPENGANGKUT", sortable: true, width: 50 },
                                          {
                                             header: "KODE",
                                             dataIndex: "KODECARAANGKUT",
                                             sortable: true,
                                             width: 120,
                                             editor: {
                                                xtype: "combobox",
                                                typeAhead: true,
                                                triggerAction: "all",

                                                displayField: "DEFNAME",
                                                valueField: "KODECARAANGKUT",
                                                store: new Ext.data.Store({
                                                   data: [
                                                      { KODECARAANGKUT: "1", DEFNAME: "LAUT" },
                                                      { KODECARAANGKUT: "2", DEFNAME: "KERETA API" },
                                                      { KODECARAANGKUT: "3", DEFNAME: "DARAT" },
                                                      { KODECARAANGKUT: "4", DEFNAME: "UDARA" },
                                                      { KODECARAANGKUT: "5", DEFNAME: "POS" },
                                                      { KODECARAANGKUT: "6", DEFNAME: "MULTIMODA" },
                                                      { KODECARAANGKUT: "7", DEFNAME: "INSTALASI / PIPA" },
                                                      { KODECARAANGKUT: "8", DEFNAME: "PERAIRAN" },
                                                      { KODECARAANGKUT: "9", DEFNAME: "LAINNYA" },
                                                   ],
                                                   fields: ["KODECARAANGKUT", "DEFNAME"],
                                                }),
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
                                                   var GRIDpengangkut = this.up("grid[pid=GRIDbcout_27_pengangkut]");
                                                   GRIDpengangkut.getStore().add({
                                                      ID: 0,
                                                      SERIPENGANGKUT: 0,
                                                      KODECARAANGKUT: "",
                                                      NAMAPENGANGKUT: "",
                                                      NOMORPENGANGKUT: "",
                                                      KODEBENDERA: "",
                                                      NOMORAJU: vdt.NOMOR_AJU,
                                                   });
                                                   GRIDpengangkut.getStore().commitChanges();
                                                   var idx = 0;
                                                   GRIDpengangkut.getStore().each(function (rec) {
                                                      console.log("perubahan");
                                                      rec.set("SERIPENGANGKUT", idx + 1);
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
                           layout: "anchor",
                           padding: "5 5 5 5",
                           items: [
                              {

                              },
                              {
                                 xtype: "container",
                                 layout: "hbox",
                                 items: [
                                    { xtype: "textfield", labelWidth: 120, width: 200, fieldLabel: "Pelabuhan Muat", name: "KODE_PEL_MUAT", fieldCls: "fieldinput", readOnly: true },
                                    { xtype: "textfield", width: 200, name: "KODE_PEL_MUATNAME", fieldCls: "fieldlock", readOnly: true },
                                    {
                                       xtype: "button",
                                       pid: "btsearch",
                                       margin: "5 5 5 5",
                                       vdata: {
                                          modulename: "pelabuhanmuat",
                                          title: "Pilih Pelabuhan",
                                          popupwidth: 0.7,
                                          popupheight: 0.7,
                                       },
                                       icon: vconfig.getstyle + "icon/search.ico",
                                       tooltip: "search Pelabuhan",
                                       handler: function () {
                                          try {
                                             var me = this;
                                             var popup = Ext.create(
                                                "Ext.window.Window",
                                                {
                                                   alias: "widget.popup_pelabuhanmuat",
                                                   reference: "popup_pelabuhanmuat",
                                                   title: "Pilih Pelabuhan",
                                                   modal: true,
                                                   closeAction: "destroy",
                                                   centered: true,
                                                   //y: -110,
                                                   width: mainpanel.getWidth() * 0.35,
                                                   height: mainpanel.getHeight() * 0.7,
                                                   layout: { type: "hbox", pack: "start", align: "stretch" },
                                                   bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
                                                   items: [
                                                      {
                                                         xtype: "grid",
                                                         pid: "GRIDpopup_pelabuhanmuat",
                                                         emptyText: "No Matching Records",
                                                         autoScroll: true,
                                                         flex: 1,
                                                         store: {
                                                            autoLoad: true,
                                                            remoteSort: false,
                                                            remoteFilter: true,
                                                            pageSize: 25,
                                                            proxy: {
                                                               type: "ajax",
                                                               disableCaching: false,
                                                               noCache: false,
                                                               headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
                                                               actionMethods: { read: "POST" },
                                                               url: vconfig.service_api + "referensi_pelabuhan/referensi_pelabuhans",
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
                                                            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "Kode Pelabuhan", dataIndex: "KODE_PELABUHAN" },
                                                            { sortable: true, width: 230, filter: { xtype: "textfield" }, header: "Nama Pelabuhan", dataIndex: "URAIAN_PELABUHAN" },
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
                                                                     KODE_PEL_MUAT: rec.data.KODE_PELABUHAN,
                                                                     KODE_PEL_MUATNAME: rec.data.URAIAN_PELABUHAN,
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
                                    {
                                       xtype: "button",
                                       pid: "btsearch",
                                       margin: "5 5 5 5",
                                       vdata: {
                                          modulename: "pelabuhanmuat",
                                          title: "Pilih Pelabuhan",
                                          popupwidth: 0.7,
                                          popupheight: 0.7,
                                       },
                                       icon: vconfig.getstyle + "icon/delete.ico",
                                       tooltip: "Clear Pelabuhan",
                                       handler: function () {
                                          var me = this;
                                          var FRM = me.up("form");
                                          FRM.getForm().setValues({
                                             KODE_PEL_MUAT: null,
                                             KODE_PEL_MUATNAME: null,
                                          });
                                       },
                                    },
                                 ],
                              },
                              {
                                 xtype: "container",
                                 layout: "hbox",
                                 items: [
                                    { xtype: "textfield", labelWidth: 120, width: 200, fieldLabel: "Pelabuhan Transit", name: "KODE_PEL_TRANSIT", fieldCls: "fieldinput", readOnly: true },
                                    { xtype: "textfield", width: 200, name: "KODE_PEL_TRANSITNAME", fieldCls: "fieldlock", readOnly: true },
                                    {
                                       xtype: "button",
                                       pid: "btsearch",
                                       margin: "5 5 5 5",
                                       vdata: {
                                          modulename: "pelabuhantransit",
                                          title: "Pilih Pelabuhan",
                                          popupwidth: 0.7,
                                          popupheight: 0.7,
                                       },
                                       icon: vconfig.getstyle + "icon/search.ico",
                                       tooltip: "search Pelabuhan",
                                       handler: function () {
                                          try {
                                             var me = this;
                                             var popup = Ext.create(
                                                "Ext.window.Window",
                                                {
                                                   alias: "widget.popup_pelabuhantransit",
                                                   reference: "popup_pelabuhantransit",
                                                   title: "Pilih Pelabuhan",
                                                   modal: true,
                                                   closeAction: "destroy",
                                                   centered: true,
                                                   //y: -110,
                                                   width: mainpanel.getWidth() * 0.35,
                                                   height: mainpanel.getHeight() * 0.7,
                                                   layout: { type: "hbox", pack: "start", align: "stretch" },
                                                   bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
                                                   items: [
                                                      {
                                                         xtype: "grid",
                                                         pid: "GRIDpopup_pelabuhantransit",
                                                         emptyText: "No Matching Records",
                                                         autoScroll: true,
                                                         flex: 1,
                                                         store: {
                                                            autoLoad: true,
                                                            remoteSort: false,
                                                            remoteFilter: true,
                                                            pageSize: 25,
                                                            proxy: {
                                                               type: "ajax",
                                                               disableCaching: false,
                                                               noCache: false,
                                                               headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
                                                               actionMethods: { read: "POST" },
                                                               url: vconfig.service_api + "referensi_pelabuhan/referensi_pelabuhans",
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
                                                            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "Kode Pelabuhan", dataIndex: "KODE_PELABUHAN" },
                                                            { sortable: true, width: 230, filter: { xtype: "textfield" }, header: "Nama Pelabuhan", dataIndex: "URAIAN_PELABUHAN" },
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
                                                                     KODE_PEL_TRANSIT: rec.data.KODE_PELABUHAN,
                                                                     KODE_PEL_TRANSITNAME: rec.data.URAIAN_PELABUHAN,
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
                                    {
                                       xtype: "button",
                                       pid: "btsearch",
                                       margin: "5 5 5 5",
                                       vdata: {
                                          modulename: "pelabuhantransit",
                                          title: "Pilih Pelabuhan",
                                          popupwidth: 0.7,
                                          popupheight: 0.7,
                                       },
                                       icon: vconfig.getstyle + "icon/delete.ico",
                                       tooltip: "Clear Pelabuhan",
                                       handler: function () {
                                          var me = this;
                                          var FRM = me.up("form");
                                          FRM.getForm().setValues({
                                             KODE_PEL_TRANSIT: null,
                                             KODE_PEL_TRANSITNAME: null,
                                          });
                                       },
                                    },
                                 ],
                              },
                              {
                                 xtype: "container",
                                 layout: "hbox",
                                 items: [
                                    { xtype: "textfield", labelWidth: 120, width: 200, fieldLabel: "Pelabuhan Bongkar", name: "KODE_PEL_BONGKAR", fieldCls: "fieldinput", readOnly: true },
                                    { xtype: "textfield", width: 200, name: "KODE_PEL_BONGKARNAME", fieldCls: "fieldlock", readOnly: true },
                                    {
                                       xtype: "button",
                                       pid: "btsearch",
                                       margin: "5 5 5 5",
                                       vdata: {
                                          modulename: "pelabuhanbongkar",
                                          title: "Pilih Pelabuhan",
                                          popupwidth: 0.7,
                                          popupheight: 0.7,
                                       },
                                       icon: vconfig.getstyle + "icon/search.ico",
                                       tooltip: "search Pelabuhan",
                                       handler: function () {
                                          try {
                                             var me = this;
                                             var popup = Ext.create(
                                                "Ext.window.Window",
                                                {
                                                   alias: "widget.popup_pelabuhanbongkar",
                                                   reference: "popup_pelabuhanbongkar",
                                                   title: "Pilih Pelabuhan",
                                                   modal: true,
                                                   closeAction: "destroy",
                                                   centered: true,
                                                   //y: -110,
                                                   width: mainpanel.getWidth() * 0.35,
                                                   height: mainpanel.getHeight() * 0.7,
                                                   layout: { type: "hbox", pack: "start", align: "stretch" },
                                                   bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
                                                   items: [
                                                      {
                                                         xtype: "grid",
                                                         pid: "GRIDpopup_pelabuhanbongkar",
                                                         emptyText: "No Matching Records",
                                                         autoScroll: true,
                                                         flex: 1,
                                                         store: {
                                                            autoLoad: true,
                                                            remoteSort: false,
                                                            remoteFilter: true,
                                                            pageSize: 25,
                                                            proxy: {
                                                               type: "ajax",
                                                               disableCaching: false,
                                                               noCache: false,
                                                               headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
                                                               actionMethods: { read: "POST" },
                                                               url: vconfig.service_api + "referensi_pelabuhan/referensi_pelabuhans",
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
                                                            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "Kode Pelabuhan", dataIndex: "KODE_PELABUHAN" },
                                                            { sortable: true, width: 230, filter: { xtype: "textfield" }, header: "Nama Pelabuhan", dataIndex: "URAIAN_PELABUHAN" },
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
                                                                     KODE_PEL_BONGKAR: rec.data.KODE_PELABUHAN,
                                                                     KODE_PEL_BONGKARNAME: rec.data.URAIAN_PELABUHAN,
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
                                    {
                                       xtype: "button",
                                       pid: "btsearch",
                                       margin: "5 5 5 5",
                                       vdata: {
                                          modulename: "pelabuhanbongkar",
                                          title: "Pilih Pelabuhan",
                                          popupwidth: 0.7,
                                          popupheight: 0.7,
                                       },
                                       icon: vconfig.getstyle + "icon/delete.ico",
                                       tooltip: "Clear Pelabuhan",
                                       handler: function () {
                                          var me = this;
                                          var FRM = me.up("form");
                                          FRM.getForm().setValues({
                                             KODE_PEL_BONGKAR: null,
                                             KODE_PEL_BONGKARNAME: null,
                                          });
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
                                 height: 150,
                                 items: [
                                    {
                                       xtype: "grid",
                                       pid: "GRIDbcout_27_kontainer",
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
                                             { name: "KODEUKURANKONTAINER", type: "int" },
                                             { name: "NOMORKONTAINER", type: "string" },
                                             { name: "KODETIPEKONTAINER", type: "string" },
                                             { name: "KODEJENISKONTAINER", type: "string" },
                                             { name: "NOMORAJU", type: "string" },
                                          ],
                                       },
                                       columns: [
                                          { header: "SERI", dataIndex: "SERI", sortable: true, width: 60 },
                                          { header: "UKURAN", dataIndex: "KODEUKURANKONTAINER", sortable: true, width: 60, editor: { xtype: "numberfield" } },
                                          { header: "NOMOR", dataIndex: "NOMORKONTAINER", sortable: true, flex: 1, editor: { xtype: "textfield" } },
                                          { header: "TIPE", dataIndex: "KODETIPEKONTAINER", sortable: true, width: 60, editor: { xtype: "textfield" } },
                                          { header: "JENIS", dataIndex: "KODEJENISKONTAINER", sortable: true, width: 60, editor: { xtype: "textfield" } },
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
                                                   var GRID = this.up("grid[pid=GRIDbcout_27_kontainer]");
                                                   GRID.getStore().add({
                                                      ID: 0,
                                                      SERI: 0,
                                                      KODEUKURANKONTAINER: "",
                                                      NOMORKONTAINER: "",
                                                      KODETIPEKONTAINER: "",
                                                      KODEJENISKONTAINER: "",
                                                      NOMORAJU: vdt.NOMOR_AJU,
                                                   });
                                                   GRID.getStore().commitChanges();
                                                   var idx = 0;
                                                   GRID.getStore().each(function (rec) {
                                                      rec.set("SERI_KONTAINER", idx + 1);
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
                                       pid: "GRIDbcout_27_kemasan",
                                       emptyText: "No Matching Records",
                                       flex: 1,
                                       plugins: {
                                          cellediting: {
                                             clicksToEdit: 1,
                                          },
                                       },
                                       store: {
                                          fields: [
                                             { name: "JUMLAHKEMASAN", type: "int" },
                                             { name: "SERIKEMASAN", type: "int" },
                                             { name: "KODEKEMASAN", type: "string" },
                                             { name: "MEREK", type: "string" },
                                             { name: "ID", type: "int" },
                                             { name: "NOMORAJU", type: "string" },
                                          ],
                                       },
                                       columns: [
                                          { header: "SERI", dataIndex: "SERI", sortable: true, width: 80 },
                                          { header: "JUMLAH", dataIndex: "JUMLAHKEMASAN", sortable: true, width: 80, editor: { xtype: "textfield" } },
                                          { header: "KODE", dataIndex: "KODEKEMASAN", sortable: true, width: 80, editor: { xtype: "textfield" } },
                                          { header: "MEREK", dataIndex: "MEREK", sortable: true, flex: 1 },
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
                                                   var GRID = this.up("grid[pid=GRIDbcout_27_kemasan]");
                                                   GRID.getStore().add({
                                                      JUMLAHKEMASAN: 0,
                                                      SERI: 0,
                                                      KODEKEMASAN: "",
                                                      MEREK: "-",
                                                      ID: 0,
                                                      NOMORAJU: vdt.NOMOR_AJU,
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
                           title: "Jaminan",
                           layout: "anchor",
                           padding: "5 5 5 5",
                           items: [
                              {
                                 xtype: "container",
                                 padding: "5 5 5 5",
                                 layout: { type: "vbox", pack: "start", align: "stretch" },
                                 flex: 1,
                                 height: 150,
                                 items: [
                                    {
                                       xtype: "grid",
                                       pid: "GRIDbcout_27_jaminan",
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
                                             { name: "KODE_JENIS_JAMINAN", type: "string" },
                                             { name: "KODE_KANTOR_JAMINAN", type: "string" },
                                             { name: "NILAI_JAMINAN", type: "string" },
                                             { name: "NOMOR_BPJ", type: "string" },
                                             { name: "NOMOR_JAMINAN", type: "string" },
                                             { name: "PENJAMIN", type: "string" },
                                             { name: "TANGGAL_BPJ", type: "string" },
                                             { name: "TANGGAL_JATUH_TEMPO", type: "string" },
                                             { name: "NOMORAJU", type: "string" },
                                          ],
                                       },
                                       columns: [
                                          {
                                             header: "JENIS JAMINAN",
                                             dataIndex: "KODE_JENIS_JAMINAN",
                                             sortable: true,
                                             width: 120,
                                             editor: {
                                                xtype: "textfield",
                                             },
                                          },
                                          {
                                             header: "KODE_KANTOR",
                                             dataIndex: "KODE_KANTOR_JAMINAN",
                                             sortable: true,
                                             width: 120,
                                             editor: {
                                                xtype: "textfield",
                                             },
                                          },
                                          {
                                             header: "NILAI_JAMINAN",
                                             dataIndex: "NILAI_JAMINAN",
                                             sortable: true,
                                             width: 120,
                                             editor: {
                                                xtype: "textfield",
                                             },
                                          },
                                          {
                                             header: "NOMOR_JAMINAN",
                                             dataIndex: "NOMOR_JAMINAN",
                                             sortable: true,
                                             width: 120,
                                             editor: {
                                                xtype: "textfield",
                                             },
                                          },
                                          {
                                             header: "PENJAMIN",
                                             dataIndex: "PENJAMIN",
                                             sortable: true,
                                             width: 120,
                                             editor: {
                                                xtype: "textfield",
                                             },
                                          },
                                          {
                                             header: "TANGGAL BPJ",
                                             dataIndex: "TANGGAL_BPJ",
                                             sortable: true,
                                             width: 80,
                                             editor: {
                                                xtype: "datefield",
                                             },
                                          },
                                          {
                                             header: "JATUH TEMPO",
                                             dataIndex: "TANGGAL_JATUH_TEMPO",
                                             sortable: true,
                                             width: 80,
                                             editor: {
                                                xtype: "datefield",
                                             },
                                          },
                                          {
                                             header: "NOMORAJU",
                                             dataIndex: "NOMORAJU",
                                             sortable: true,
                                             width: 120,
                                             editor: {
                                                xtype: "textfield",
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
                                                      grid.getStore().removeAt(rowIndex);
                                                      var idx = 0;
                                                      grid.getStore().each(function (rec) {
                                                         /*rec.set("SERIPENGANGKUT", idx + 1);*/
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
                                             id: "btjaminan_add",
                                             pid: "btjaminan_add",
                                             icon: vconfig.getstyle + "icon/new.ico",
                                             tooltip: "Tambah Data Baru",
                                             handler: function () {
                                                try {
                                                   var FRM = this.up("form");
                                                   var vdt = FRM.getValues(false, false, false, true);
                                                   console.log(vdt);
                                                   var GRIDjaminan = this.up("grid[pid=GRIDbcout_27_jaminan]");
                                                   GRIDjaminan.getStore().add({
                                                      ID: 0,
                                                      KODE_JENIS_JAMINAN: "",
                                                      KODE_KANTOR_JAMINAN: "",
                                                      NILAI_JAMINAN: "",
                                                      NOMOR_BPJ: "",
                                                      NOMOR_JAMINAN: "",
                                                      PENJAMIN: "",
                                                      TANGGAL_BPJ: "",
                                                      TANGGAL_JAMINAN: "",
                                                      TANGGAL_JATUH_TEMPO: "",
                                                      NOMORAJU: vdt.NOMOR_AJU,
                                                   });
                                                   GRIDjaminan.getStore().commitChanges();
                                                   var idx = 0;
                                                   GRIDjaminan.getStore().each(function (rec) {
                                                      console.log("Add Jaminan");
                                                      /*rec.set("SERIPENGANGKUT", idx + 1);*/
                                                      idx++;
                                                   });
                                                   GRIDjaminan.getStore().commitChanges();
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
                                          {
                                             xtype: "button",
                                             pid: "btsearch",
                                             margin: "5 5 5 5",
                                             vdata: {
                                                modulename: "KantorPabean",
                                                title: "Hapus Kantor Pabean",
                                                popupwidth: 0.7,
                                                popupheight: 0.7,
                                             },
                                             icon: vconfig.getstyle + "icon/delete.ico",
                                             tooltip: "Hapus Kantor Pabean",
                                             handler: function () {
                                                var me = this;
                                                var FRM = me.up("form");
                                                FRM.getForm().setValues({
                                                   KODE_KANTOR: null,
                                                   KODE_KANTORNAME: null,
                                                });
                                             },
                                          },
                                       ],
                                    },
                                    {
                                       xtype: "container",
                                       layout: "hbox",
                                       items: [
                                          { xtype: "textfield", labelWidth: 120, width: 200, fieldLabel: "Kantor Bongkar", name: "KODE_KANTOR_BONGKAR", fieldCls: "fieldinput", readOnly: true },
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
                                          {
                                             xtype: "button",
                                             pid: "btsearch",
                                             margin: "5 5 5 5",
                                             vdata: {
                                                modulename: "KantorPabean",
                                                title: "Hapus Kantor Pabean",
                                                popupwidth: 0.7,
                                                popupheight: 0.7,
                                             },
                                             icon: vconfig.getstyle + "icon/delete.ico",
                                             tooltip: "Hapus Kantor Pabean",
                                             handler: function () {
                                                var me = this;
                                                var FRM = me.up("form");
                                                FRM.getForm().setValues({
                                                   KODE_KANTOR_BONGKAR: null,
                                                   KODE_KANTOR_BONGKARNAME: null,
                                                });
                                             },
                                          },
                                       ],
                                    },
                                    {
                                       xtype: "container",
                                       layout: "hbox",
                                       items: [
                                          { xtype: "textfield", labelWidth: 120, width: 200, fieldLabel: "Kantor Tujuan", name: "KODE_KANTOR_TUJUAN", fieldCls: "fieldinput", readOnly: true },
                                          { xtype: "textfield", width: 200, name: "KODE_KANTOR_TUJUANNAME", fieldCls: "fieldlock", readOnly: true },
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
                                                                           KODE_KANTOR_TUJUANNAME: rec.data.URAIAN_KANTOR,
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
                                          {
                                             xtype: "button",
                                             pid: "btsearch",
                                             margin: "5 5 5 5",
                                             vdata: {
                                                modulename: "KantorPabean",
                                                title: "Hapus Kantor Pabean",
                                                popupwidth: 0.7,
                                                popupheight: 0.7,
                                             },
                                             icon: vconfig.getstyle + "icon/delete.ico",
                                             tooltip: "Hapus Kantor Pabean",
                                             handler: function () {
                                                var me = this;
                                                var FRM = me.up("form");
                                                FRM.getForm().setValues({
                                                   KODE_KANTOR_TUJUAN: null,
                                                   KODE_KANTOR_TUJUANNAME: null,
                                                });
                                             },
                                          },
                                       ],
                                    },
                                    {
                                       xtype: "container",
                                       layout: "hbox",
                                       items: [
                                          { xtype: "textfield", labelWidth: 120, width: 200, fieldLabel: "Jenis Tpb", name: "KODE_JENIS_TPB", fieldCls: "fieldinput", readOnly: true },
                                          { xtype: "textfield", width: 200, name: "KODE_JENIS_TPBNAME", fieldCls: "fieldlock", readOnly: true },
                                          {
                                             xtype: "button",
                                             pid: "btsearch",
                                             margin: "5 5 5 5",
                                             vdata: {
                                                modulename: "jenistpb",
                                                title: "Pilih Jenis Tpb",
                                                popupwidth: 0.7,
                                                popupheight: 0.7,
                                             },
                                             icon: vconfig.getstyle + "icon/search.ico",
                                             tooltip: "search Jenis Tpb",
                                             handler: function () {
                                                try {
                                                   var me = this;
                                                   var popup = Ext.create(
                                                      "Ext.window.Window",
                                                      {
                                                         alias: "widget.popup_jenistpb",
                                                         reference: "popup_jenistpb",
                                                         title: "Pilih Jenis Tpb",
                                                         modal: true,
                                                         closeAction: "destroy",
                                                         centered: true,
                                                         //y: -110,
                                                         width: mainpanel.getWidth() * 0.3,
                                                         height: mainpanel.getHeight() * 0.7,
                                                         layout: { type: "hbox", pack: "start", align: "stretch" },
                                                         bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
                                                         items: [
                                                            {
                                                               xtype: "grid",
                                                               pid: "GRIDpopup_jenistpb",
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
                                                                     url: vconfig.service_api + "referensi_jenis_tpb/referensi_jenis_tpbs",
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
                                                                  { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "Kode Jenis Tpb", dataIndex: "KODE_JENIS_TPB" },
                                                                  { sortable: true, width: 230, filter: { xtype: "textfield" }, header: "Nama Jenis Tpb", dataIndex: "URAIAN_JENIS_TPB" },
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
                                                                           KODE_JENIS_TPB: rec.data.KODE_JENIS_TPB,
                                                                           KODE_JENIS_TPBNAME: rec.data.URAIAN_JENIS_TPB,
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
                                          {
                                             xtype: "button",
                                             pid: "btsearch",
                                             margin: "5 5 5 5",
                                             vdata: {
                                                modulename: "JenisTpb",
                                                title: "Hapus Jenis Tpb",
                                                popupwidth: 0.7,
                                                popupheight: 0.7,
                                             },
                                             icon: vconfig.getstyle + "icon/delete.ico",
                                             tooltip: "Hapus Jenis Tpb",
                                             handler: function () {
                                                var me = this;
                                                var FRM = me.up("form");
                                                FRM.getForm().setValues({
                                                   KODE_JENIS_TPB: null,
                                                   KODE_JENIS_TPBNAME: null,
                                                });
                                             },
                                          },
                                       ],
                                    },
                                    {
                                       xtype: "container",
                                       layout: "hbox",
                                       items: [
                                          { xtype: "textfield", labelWidth: 120, width: 200, fieldLabel: "Tujuan Tpb", name: "KODE_TUJUAN_TPB", fieldCls: "fieldinput", readOnly: true },
                                          { xtype: "textfield", width: 200, name: "KODE_TUJUAN_TPBNAME", fieldCls: "fieldlock", readOnly: true },
                                          {
                                             xtype: "button",
                                             pid: "btsearch",
                                             margin: "5 5 5 5",
                                             vdata: {
                                                modulename: "tujuantpb",
                                                title: "Pilih Tujuan TPB",
                                                popupwidth: 0.7,
                                                popupheight: 0.7,
                                             },
                                             icon: vconfig.getstyle + "icon/search.ico",
                                             tooltip: "search Tujuan TPB",
                                             handler: function () {
                                                try {
                                                   var me = this;
                                                   var popup = Ext.create(
                                                      "Ext.window.Window",
                                                      {
                                                         alias: "widget.popup_tujuantpb",
                                                         reference: "popup_tujuantpb",
                                                         title: "Pilih Tujuan Tpb",
                                                         modal: true,
                                                         closeAction: "destroy",
                                                         centered: true,
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
                                                                     url: vconfig.service_api + "referensi_tujuan_tpb/referensi_tujuan_tpbs",
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
                                                                  { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "Kode Tujuan TPB", dataIndex: "KODE_TUJUAN_TPB" },
                                                                  { sortable: true, width: 230, filter: { xtype: "textfield" }, header: "Nama Tujuan TPB", dataIndex: "URAIAN_TUJUAN_TPB" },
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
                                                                           KODE_TUJUAN_TPB: rec.data.KODE_TUJUAN_TPB,
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
                                          {
                                             xtype: "button",
                                             pid: "btsearch",
                                             margin: "5 5 5 5",
                                             vdata: {
                                                modulename: "TujuanTpb",
                                                title: "Hapus Tujuan Tpb",
                                                popupwidth: 0.7,
                                                popupheight: 0.7,
                                             },
                                             icon: vconfig.getstyle + "icon/delete.ico",
                                             tooltip: "Hapus Tujuan Tpb",
                                             handler: function () {
                                                var me = this;
                                                var FRM = me.up("form");
                                                FRM.getForm().setValues({
                                                   KODE_TUJUAN_TPB: null,
                                                   KODE_TUJUAN_TPBNAME: null,
                                                });
                                             },
                                          },
                                       ],
                                    },
                                    {
                                       xtype: "container",
                                       layout: "hbox",
                                       items: [
                                          { xtype: "textfield", labelWidth: 120, width: 200, fieldLabel: "Tujuan Pemasukan", name: "KODE_TUJUAN_PEMASUKAN", fieldCls: "fieldinput", readOnly: true },
                                          { xtype: "textfield", width: 200, name: "KODE_TUJUAN_PEMASUKANNAME", fieldCls: "fieldlock", readOnly: true },
                                          {
                                             xtype: "button",
                                             pid: "btsearch",
                                             margin: "5 5 5 5",
                                             vdata: {
                                                modulename: "tujuanpemasukan",
                                                title: "Pilih Tujuan Pemasukan",
                                                popupwidth: 0.7,
                                                popupheight: 0.7,
                                             },
                                             icon: vconfig.getstyle + "icon/search.ico",
                                             tooltip: "search Tujuan Pemasukan",
                                             handler: function () {
                                                try {
                                                   var me = this;
                                                   var popup = Ext.create(
                                                      "Ext.window.Window",
                                                      {
                                                         alias: "widget.popup_tujuanpemasukan",
                                                         reference: "popup_tujuanpemasukan",
                                                         title: "Pilih Tujuan Pemasukan",
                                                         modal: true,
                                                         closeAction: "destroy",
                                                         centered: true,
                                                         //y: -110,
                                                         width: mainpanel.getWidth() * 0.3,
                                                         height: mainpanel.getHeight() * 0.7,
                                                         layout: { type: "hbox", pack: "start", align: "stretch" },
                                                         bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
                                                         items: [
                                                            {
                                                               xtype: "grid",
                                                               pid: "GRIDpopup_tujuanpemasukan",
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
                                                                     url: vconfig.service_api + "referensi_tujuan_pemasukan/referensi_tujuan_pemasukans",
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
                                                                  { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "Kode Tujuan", dataIndex: "KODE_TUJUAN_PEMASUKAN" },
                                                                  { sortable: true, width: 230, filter: { xtype: "textfield" }, header: "Nama Tujuan", dataIndex: "URAIAN_TUJUAN_PEMASUKAN" },
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
                                                                           KODE_TUJUAN_PEMASUKAN: rec.data.KODE_TUJUAN_PEMASUKAN,
                                                                           KODE_TUJUAN_PEMASUKANNAME: rec.data.URAIAN_TUJUAN_PEMASUKAN,
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
                                          {
                                             xtype: "button",
                                             pid: "btsearch",
                                             margin: "5 5 5 5",
                                             vdata: {
                                                modulename: "TujuanPemasukan",
                                                title: "Hapus Tujuan Pemasukan",
                                                popupwidth: 0.7,
                                                popupheight: 0.7,
                                             },
                                             icon: vconfig.getstyle + "icon/delete.ico",
                                             tooltip: "Hapus Tujuan Pemasukan",
                                             handler: function () {
                                                var me = this;
                                                var FRM = me.up("form");
                                                FRM.getForm().setValues({
                                                   KODE_TUJUAN_PEMASUKAN: null,
                                                   KODE_TUJUAN_PEMASUKANNAME: null,
                                                });
                                             },
                                          },
                                       ],
                                    },
                                    {
                                       xtype: "container",
                                       layout: "hbox",
                                       items: [
                                          { xtype: "textfield", labelWidth: 120, width: 200, fieldLabel: "Tujuan Pengiriman", name: "KODE_TUJUAN_PENGIRIMAN", fieldCls: "fieldinput", readOnly: true },
                                          { xtype: "textfield", width: 200, name: "KODE_TUJUAN_PENGIRIMANNAME", fieldCls: "fieldlock", readOnly: true },
                                          {
                                             xtype: "button",
                                             pid: "btsearch",
                                             margin: "5 5 5 5",
                                             vdata: {
                                                modulename: "tujuanpengiriman",
                                                title: "Pilih Tujuan Pengiriman",
                                                popupwidth: 0.7,
                                                popupheight: 0.7,
                                             },
                                             icon: vconfig.getstyle + "icon/search.ico",
                                             tooltip: "search Tujuan Pengiriman",
                                             handler: function () {
                                                try {
                                                   var me = this;
                                                   var popup = Ext.create(
                                                      "Ext.window.Window",
                                                      {
                                                         alias: "widget.popup_tujuanpengiriman",
                                                         reference: "popup_tujuanpengiriman",
                                                         title: "Pilih Tujuan Pengiriman",
                                                         modal: true,
                                                         closeAction: "destroy",
                                                         centered: true,
                                                         //y: -110,
                                                         width: mainpanel.getWidth() * 0.3,
                                                         height: mainpanel.getHeight() * 0.7,
                                                         layout: { type: "hbox", pack: "start", align: "stretch" },
                                                         bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
                                                         items: [
                                                            {
                                                               xtype: "grid",
                                                               pid: "GRIDpopup_tujuanpengiriman",
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
                                                                     url: vconfig.service_api + "referensi_tujuan_pengiriman40/referensi_tujuan_pengiriman40s",
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
                                                                  { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "Kode Tujuan", dataIndex: "KODE_TUJUAN_PENGIRIMAN" },
                                                                  { sortable: true, width: 230, filter: { xtype: "textfield" }, header: "Nama Tujuan", dataIndex: "URAIAN_TUJUAN_PENGIRIMAN" },
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
                                                                           KODE_TUJUAN_PENGIRIMAN: rec.data.KODE_TUJUAN_PENGIRIMAN,
                                                                           KODE_TUJUAN_PENGIRIMANNAME: rec.data.URAIAN_TUJUAN_PENGIRIMAN,
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
                                          {
                                             xtype: "button",
                                             pid: "btsearch",
                                             margin: "5 5 5 5",
                                             vdata: {
                                                modulename: "TujuanPengiriman",
                                                title: "Hapus Tujuan Pengiriman",
                                                popupwidth: 0.7,
                                                popupheight: 0.7,
                                             },
                                             icon: vconfig.getstyle + "icon/delete.ico",
                                             tooltip: "Hapus Tujuan Pengiriman",
                                             handler: function () {
                                                var me = this;
                                                var FRM = me.up("form");
                                                FRM.getForm().setValues({
                                                   KODE_TUJUAN_PENGIRIMAN: null,
                                                   KODE_TUJUAN_PENGIRIMANNAME: null,
                                                });
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
                                          {
                                             xtype: "container",
                                             layout: "hbox",
                                             items: [
                                                { xtype: "textfield", labelWidth: 120, width: 200, fieldLabel: "Cara Bayar", name: "KODE_CARA_BAYAR", fieldCls: "fieldinput", readOnly: true },
                                                { xtype: "textfield", width: 200, name: "KODE_CARA_BAYARNAME", fieldCls: "fieldlock", readOnly: true },
                                                {
                                                   xtype: "button",
                                                   pid: "btsearch",
                                                   margin: "5 5 5 5",
                                                   vdata: {
                                                      modulename: "carabayar",
                                                      title: "Pilih cara bayar",
                                                      popupwidth: 0.7,
                                                      popupheight: 0.7,
                                                   },
                                                   icon: vconfig.getstyle + "icon/search.ico",
                                                   tooltip: "search Cara Bayar",
                                                   handler: function () {
                                                      try {
                                                         var me = this;
                                                         var popup = Ext.create(
                                                            "Ext.window.Window",
                                                            {
                                                               alias: "widget.popup_carabayar",
                                                               reference: "popup_carabayar",
                                                               title: "Pilih Cara Bayar",
                                                               modal: true,
                                                               closeAction: "destroy",
                                                               centered: true,
                                                               //y: -110,
                                                               width: mainpanel.getWidth() * 0.3,
                                                               height: mainpanel.getHeight() * 0.7,
                                                               layout: { type: "hbox", pack: "start", align: "stretch" },
                                                               bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
                                                               items: [
                                                                  {
                                                                     xtype: "grid",
                                                                     pid: "GRIDpopup_carabayar",
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
                                                                           url: vconfig.service_api + "referensi_harga/referensi_hargas",
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
                                                                        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "Kode Harga", dataIndex: "KODE_CARA_BAYAR" },
                                                                        { sortable: true, width: 230, filter: { xtype: "textfield" }, header: "Uraian Harga", dataIndex: "URAIAN_CARA_BAYAR" },
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
                                                                                 KODE_CARA_BAYAR: rec.data.KODE_CARA_BAYAR,
                                                                                 KODE_CARA_BAYARNAME: rec.data.URAIAN_CARA_BAYAR,
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
                                                {
                                                   xtype: "button",
                                                   pid: "btsearch",
                                                   margin: "5 5 5 5",
                                                   vdata: {
                                                      modulename: "CaraBayar",
                                                      title: "Hapus Cara Bayar",
                                                      popupwidth: 0.7,
                                                      popupheight: 0.7,
                                                   },
                                                   icon: vconfig.getstyle + "icon/delete.ico",
                                                   tooltip: "Hapus Cara Bayar",
                                                   handler: function () {
                                                      var me = this;
                                                      var FRM = me.up("form");
                                                      FRM.getForm().setValues({
                                                         KODE_CARA_BAYAR: null,
                                                         KODE_CARA_BAYARNAME: null,
                                                      });
                                                   },
                                                },
                                             ],
                                          },
                                       ],
                                    },
                                    {
                                       xtype: "container",
                                       layout: "hbox",
                                       items: [
                                          //
                                          {
                                             xtype: "combobox",
                                             fieldLabel: "Kode Tutup PU",
                                             name: "KODE_TUTUP_PU",
                                             width: 220,
                                             labelWidth: 120,
                                             fieldCls: "fieldinput",
                                             typeAhead: true,
                                             triggerAction: "all",
                                             store: [
                                                ["11", "11 - BC 1.1"],
                                                ["12", "12 - BC 1.2"],
                                                ["14", "14 - BC 1.4"],
                                             ],
                                          },
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
                                          { xtype: "textfield", labelWidth: 120, width: 320, fieldLabel: "Sub Pos Bc 11", name: "SUBPOS_BC11", fieldCls: "fieldinput", readOnly: false },
                                          { xtype: "textfield", labelWidth: 60, width: 170, fieldLabel: "Pos Bc 11", name: "POS_BC11", fieldCls: "fieldinput", readOnly: false },
                                       ],
                                    },
                                    {
                                       xtype: "container",
                                       layout: "hbox",
                                       items: [
                                          //
                                          {
                                             xtype: "container",
                                             layout: "hbox",
                                             items: [
                                                { xtype: "textfield", labelWidth: 120, width: 200, fieldLabel: "Tempat Penimbunan", name: "KODE_TPS", fieldCls: "fieldinput", readOnly: true },
                                                { xtype: "textfield", width: 200, name: "KODE_TPSNAME", fieldCls: "fieldlock", readOnly: true },
                                                {
                                                   xtype: "button",
                                                   pid: "btsearch",
                                                   margin: "5 5 5 5",
                                                   vdata: {
                                                      modulename: "tempatpenimbunan",
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
                                                                        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "Kode Kantor", dataIndex: "KD_KANTOR" },
                                                                        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "Kode TPS", dataIndex: "KODE_TPS" },
                                                                        { sortable: true, width: 230, filter: { xtype: "textfield" }, header: "Uraian TPS", dataIndex: "URAIAN_TPS" },
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
                                                                                 KODE_TPS: rec.data.KD_KANTOR,
                                                                                 KODE_TPSNAME: rec.data.URAIAN_TPS,
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
                                                {
                                                   xtype: "button",
                                                   pid: "btsearch",
                                                   margin: "5 5 5 5",
                                                   vdata: {
                                                      modulename: "TempatPenimbunan",
                                                      title: "Hapus Tempat Penimbunan",
                                                      popupwidth: 0.7,
                                                      popupheight: 0.7,
                                                   },
                                                   icon: vconfig.getstyle + "icon/delete.ico",
                                                   tooltip: "Hapus Tempat Penimbunan",
                                                   handler: function () {
                                                      var me = this;
                                                      var FRM = me.up("form");
                                                      FRM.getForm().setValues({
                                                         KODE_TPS: null,
                                                         KODE_TPSNAME: null,
                                                      });
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
                                 layout: { type: "vbox", pack: "start", align: "stretch" },
                                 height: 200,
                                 padding: "5 5 5 5",
                                 flex: 1,
                                 items: [
                                    {
                                       xtype: "grid",
                                       pid: "GRIDbcout_27_dokumen",
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
                                             { name: "KODEDOKUMEN", type: "string" },
                                             { name: "NOMORDOKUMEN", type: "string" },
                                             { name: "SERI", type: "string" },
                                             { name: "TANGGALDOKUMEN", type: "date" },
                                             { name: "NOMORAJU", type: "string" },
                                             { name: "ID_COMPANY", type: "string" },
                                          ],
                                       },
                                       columns: [
                                          { xtype: "rownumberer", width: 40 },
                                          { header: "SERI DOKUMEN", dataIndex: "SERI", sortable: true, width: 100, filter: { xtype: "textfield" } },
                                          { header: "KODE DOKUMEN", dataIndex: "KODEDOKUMEN", sortable: true, width: 110, filter: { xtype: "textfield" } },
                                          {
                                             header: "TGL DOKUMEN",
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
                                             header: "NOMOR",
                                             dataIndex: "NOMORDOKUMEN",
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
                                                      if (vdt.KODEDOKUMEN !== "380" && vdt.KODEDOKUMEN !== "217") {
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
                                             if (e.record.data.KODEDOKUMEN === "380" || e.record.data.KODEDOKUMEN === "217") {
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
                                                      "NJC.EXIM.bcout_27.GRIDdokumen",
                                                      {
                                                         listeners: {
                                                            itemdblClick: function (cmp, rec) {
                                                               var me = this;
                                                               var GRID = Ext.ComponentQuery.query("FRMbcout_27 grid[pid=GRIDbcout_27_dokumen]")[0];
                                                               if (rec.data.KODE_DOKUMEN === "380" || rec.data.KODE_DOKUMEN === "217") {
                                                                  COMP.TipToast.toast("Error", "Kode Dokumen 380 dan 217 tidak bisa di input", { cls: "danger", delay: 2000 });
                                                                  return false;
                                                               }
                                                               GRID.getStore().add({
                                                                  ID: 0,
                                                                  KODEDOKUMEN: rec.data.KODE_DOKUMEN,
                                                                  NOMORDOKUMEN: "di input",
                                                                  SERI: "",
                                                                  TANGGALDOKUMEN: new Date(),
                                                                  NOMORAJU: "",
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
                                                         flex: 1,
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
                                    {
                                       xtype: "button",
                                       pid: "btsearch",
                                       margin: "5 5 5 5",
                                       vdata: {
                                          modulename: "Valuta",
                                          title: "Hapus Valuta",
                                          popupwidth: 0.7,
                                          popupheight: 0.7,
                                       },
                                       icon: vconfig.getstyle + "icon/delete.ico",
                                       tooltip: "Hapus Valuta",
                                       handler: function () {
                                          var me = this;
                                          var FRM = me.up("form");
                                          FRM.getForm().setValues({
                                             KODE_VALUTA: null,
                                             KODE_VALUTA_NAME: null,
                                          });
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
                                          { xtype: "currencyfield", labelWidth: 120, width: 250, fieldLabel: "Fob", name: "FOB", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                                          { xtype: "currencyfield", labelWidth: 60, width: 230, fieldLabel: "Ndpbm", name: "NDPBM", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                                       ],
                                    },
                                    {
                                       xtype: "container",
                                       layout: "hbox",
                                       items: [
                                          { xtype: "currencyfield", labelWidth: 120, width: 250, fieldLabel: "Cif", name: "CIF", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                                          { xtype: "currencyfield", labelWidth: 60, width: 230, fieldLabel: "Cif Rupiah", name: "CIF_RUPIAH", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                                       ],
                                    },
                                    {
                                       xtype: "container",
                                       layout: "hbox",
                                       items: [
                                          { xtype: "currencyfield", labelWidth: 120, width: 220, fieldLabel: "Freight", name: "FREIGHT", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                                          { xtype: "currencyfield", labelWidth: 60, width: 150, fieldLabel: "Bruto", name: "BRUTO", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                                          { xtype: "currencyfield", labelWidth: 60, width: 150, fieldLabel: "Netto", name: "NETTO", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                                       ],
                                    },
                                 ],
                              },
                           ],
                        },
                        {
                           xtype: "fieldset",
                           title: "Pungutan",
                           layout: "anchor",
                           padding: "5 5 5 5",
                           items: [
                              {
                                 xtype: "container",
                                 padding: "5 5 5 5",
                                 layout: { type: "vbox", pack: "start", align: "stretch" },
                                 flex: 1,
                                 height: 170,
                                 items: [
                                    {
                                       xtype: "grid",
                                       pid: "GRIDbcout_27_pungutan",
                                       emptyText: "No Matching Records",
                                       flex: 1,
                                       plugins: {
                                          cellediting: {
                                             clicksToEdit: 1,
                                          },
                                       },
                                       store: {
                                          fields: [
                                             { name: "KODEJENISPUNGUTAN", type: "string" },
                                             { name: "NILAIPUNGUTAN", type: "float" },
                                             { name: "KODEFASILITASTARIF", type: "string" },
                                             { name: "ID", type: "int" },
                                             { name: "NOMORAJU", type: "string" },
                                          ],
                                       },
                                       columns: [
                                          { header: "JENIS", dataIndex: "KODEJENISPUNGUTAN", sortable: true, width: 80 },
                                          { header: "FASILITAS TARIF", dataIndex: "KODEFASILITASTARIF", sortable: true, width: 100 },
                                          { header: "NILAI", dataIndex: "NILAIPUNGUTAN", sortable: true, width: 150, align: "right", renderer: "formatAmount" },
                                       ],
                                       tbar: [{ xtype: "tbspacer", height: 20 }],
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
                                       pid: "GRIDbcout_27_barang",
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
                                             { name: "HARGABARANGLDP", type: "float" },
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
                                             { name: "NOMORAJU", type: "string" },
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
                                          // { header: "NOMOR AJU", dataIndex: "NOMORAJU", sortable: true, width: 80, hidden: false, filter: { xtype: "textfield" } },
                                          { header: "SERI BARANG", dataIndex: "SERIBARANG", sortable: true, width: 80, hidden: false, filter: { xtype: "textfield" } },
                                          { header: "HS CODE", dataIndex: "HS", sortable: true, width: 80, hidden: false, align: "left", filter: { xtype: "textfield" } },
                                          { header: "KODE BARANG", dataIndex: "KODEBARANG", sortable: true, width: 120, hidden: false, align: "left", filter: { xtype: "textfield" } },
                                          { header: "SPESIFIKASI LAIN", dataIndex: "SPESIFIKASILAIN", sortable: true, width: 100, hidden: false, align: "right", filter: { xtype: "textfield" } },
                                          { header: "TIPE", dataIndex: "TIPE", sortable: true, width: 80, hidden: false, align: "left", filter: { xtype: "textfield" } },
                                          { header: "URAIAN", dataIndex: "URAIAN", sortable: true, width: 280, hidden: false, align: "right", filter: { xtype: "textfield" } },
                                          { header: "JUMLAH SATUAN", dataIndex: "JUMLAHSATUAN", sortable: true, width: 110, hidden: false, align: "right", renderer: "formatAmount", filter: { xtype: "textfield" } },
                                          { header: "KODESATUAN", dataIndex: "KODESATUAN", sortable: true, width: 80, hidden: false, align: "left", filter: { xtype: "textfield" } },
                                          { header: "NETTO", dataIndex: "NETTO", sortable: true, width: 120, hidden: false, align: "right", renderer: "formatAmount", filter: { xtype: "textfield" } },
                                          { header: "CIF", dataIndex: "CIF", sortable: true, width: 100, hidden: false, align: "right", renderer: "formatAmount", filter: { xtype: "textfield" } },
                                          { header: "CIF RUPIAH", dataIndex: "CIFRUPIAH", sortable: true, width: 100, hidden: false, align: "right", renderer: "formatAmount", filter: { xtype: "textfield" } },
                                          { header: "NDPBM", dataIndex: "NDPBM", sortable: true, width: 80, hidden: false, filter: { xtype: "textfield" } },
                                          { header: "HARGA PENYERAHAN", dataIndex: "HARGAPENYERAHAN", sortable: true, width: 130, hidden: false, align: "right", renderer: "formatAmount", filter: { xtype: "textfield" } },
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
                                                      "NJC.EXIM.bcout_27.GRIDbarang",
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
                                                         flex: 1,
                                                         //y: -110,
                                                         width: mainpanel.getWidth() * 0.9,
                                                         height: mainpanel.getHeight() * 0.8,
                                                         layout: { type: "hbox", pack: "start", align: "stretch" },
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
         pid: "toolbar_FRMbcout_27",
         height: 30,
         dock: "top",
         items: [
            { xtype: "tbspacer", width: 5 },
            { xtype: "button", text: "Cancel Dokumen", id: "btcancel_dokumen", pid: "btcancel_dokumen", icon: vconfig.getstyle + "icon/delete.ico", tooltip: "Cancel Dokumen BC 27", handler: "btcancel_click" },
            { xtype: "button", text: "Update Dokumen", id: "btsimpan_draft", pid: "btsimpan_draft", icon: vconfig.getstyle + "icon/save.gif", tooltip: "Proses Update Dokumen BC 27", handler: "btupdate_click" },
            { xtype: "button", text: "Approve Inventory", id: "btposting_click", pid: "btposting_click", icon: vconfig.getstyle + "icon/lock.png", tooltip: "Proses Lock Dokumen BC 27", handler: "btposting_click" },
            "-",
            { xtype: "button", text: "Get Respon", id: "btget_from_portal", pid: "btget_from_portal", icon: vconfig.getstyle + "icon/down.ico", tooltip: "Sinkronisasi Dokumen dari Aplikasi Portal Ceisa 4.0", handler: "old__btget_from_portal" },
            "-",
            //{ xtype: "button", text: "Send To Portal", id: "btsendportal_click", pid: "btsendportal_click", icon: vconfig.getstyle + "icon/up.ico", tooltip: "Kirim Dokumen Ke Portal Ceisa 4.0", handler: "btsendportal_click" },
            {
               xtype: "button",
               text: "Send To Portal",
               icon: vconfig.getstyle + "icon/app.png",
               menu: [
                  //
                  { text: "Get Respon", handler: "old__btget_from_portal", icon: vconfig.getstyle + "icon/down.ico" },
                  { text: "Send Dokumen To Portal (Direct)", handler: "old_btsendportal_click", icon: vconfig.getstyle + "icon/up.ico" },
                  //{ text: "Send Dokumen To Portal (Desktop)", handler: "nbtsendportal_desktop", icon: vconfig.getstyle + "icon/grid.png" },
                  { text: "Download Dokumen Portal (Excel)", handler: "nbtsendportal_excel", icon: vconfig.getstyle + "icon/excel.ico" },
                  { text: "Download Dokumen Portal (JSON)", handler: "old_sendportal_json", icon: vconfig.getstyle + "icon/doc.png" },
               ],
            },
         ],
         // other options....
      },
   ],
   listeners: {
      show: "FRMbcout_27_load",
   },
});
