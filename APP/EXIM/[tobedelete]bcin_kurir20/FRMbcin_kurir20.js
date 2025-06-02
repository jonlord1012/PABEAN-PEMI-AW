var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.EXIM.bcin_kurir20.FRMbcin_kurir20", {
  extend: "Ext.window.Window",
  alias: "widget.FRMbcin_kurir20",
  reference: "FRMbcin_kurir20",
  title: "Header Dokumen BC Kurir 20",
  modal: true,
  closeAction: "destroy", 
  centered: true,
  autoScroll: true,
  controller: "Cbcin_kurir20",
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
            { xtype: "textfield", fieldLabel: "STATUS", name: "MODE_STATUS", labelWidth: 50, width: 400, fieldCls: "fieldlock", readOnly: true },
            { xtype: "textfield", fieldLabel: "SUMBER DOKUMEN", name: "MODE_SOURCE", labelWidth: 140, width: 300, fieldCls: "fieldlock", readOnly: true },
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
                        { xtype: "textfield", labelWidth: 130, width: 200, fieldLabel: "KANTOR PABEAN", name: "KODE_KANTOR", fieldCls: "fieldinput", readOnly: true },
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
                        { xtype: "textfield", labelWidth: 130, width: 200, fieldLabel: "JENIS TPB", name: "KODE_JENIS_TPB", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "textfield", width: 200, name: "KODE_JENIS_TPBNAME", fieldCls: "fieldlock", readOnly: true },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          vdata: {
                            modulename: "tpb",
                            title: "Pilih Jenis TPB",
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
                        { xtype: "textfield", labelWidth: 130, width: 200, fieldLabel: "TUJUAN PENGIRIMAN", name: "KODE_TUJUAN_PENGIRIMAN", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "textfield", width: 200, name: "KODE_TUJUAN_PENGIRIMANNAME", fieldCls: "fieldlock", readOnly: true },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          vdata: {
                            modulename: "tujuanpengiriman40",
                            title: "Pilih Tujuan Pengiriman",
                            popupwidth: 0.375,
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
                      items: [{ xtype: "textfield", labelWidth: 100, width: 400, fieldLabel: "1. NPWP", name: "ID_PENGUSAHA", fieldCls: "fieldlock", readOnly: true }],
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
                        { xtype: "textfield", labelWidth: 100, width: 480, fieldLabel: "3. Alamat", name: "ALAMAT_PENGUSAHA", fieldCls: "fieldlock", readOnly: true },
                        { xtype: "textfield", labelWidth: 100, width: 320, fieldLabel: "4. Nomor Izin", name: "NOMOR_IJIN_TPB", fieldCls: "fieldlock", readOnly: true },
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
                      items: [{ xtype: "textfield", labelWidth: 100, width: 400, fieldLabel: "5. NPWP", name: "ID_PENGIRIM", fieldCls: "fieldlock", readOnly: true }],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 100, width: 140, fieldLabel: "6. Nama", name: "KODE_ID_PENGIRIM", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "textfield", width: 300, name: "NAMA_PENGIRIM", fieldCls: "fieldinput", readOnly: true },
                      ],
                    },
                    { xtype: "textfield", labelWidth: 100, width: 480, fieldLabel: "7. Alamat", name: "ALAMAT_PENGIRIM", fieldCls: "fieldlock", readOnly: true },
                  ],
                },
                {
                  xtype: "fieldset",
                  title: "DOKUMEN PELENGKAP PABEAN",
                  layout: "vbox",
                  flex: 1,
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
                        { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "9. Kontrak", name: "NOMOR_KONTRAK", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "datefield", width: 100, name: "KONTRAK_TANGGAL_DOKUMEN", fieldCls: "fieldinput", format: "Y-m-d", readOnly: true },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "10. Faktur Pajak", name: "NOMOR_FAKTUR_PAJAK", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "datefield", width: 100, name: "FAKTUR_PAJAK_TANGGAL_DOKUMEN", fieldCls: "fieldinput", format: "Y-m-d", readOnly: true },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "11. SKEP", name: "NOMOR_SKEP", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "datefield", width: 100, name: "SKEP_TANGGAL_DOKUMEN", fieldCls: "fieldinput", format: "Y-m-d", readOnly: true },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        {
                          xtype: "grid",
                          pid: "GRIDbcin_kurir20_input_dokumen",
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
                              text: "12. Input Dokumen",
                              popupwidth: 800,
                              module: "module_input_dokumen",
                              tofield: {},
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
              xtype: "container",
              layout: "vbox",
              flex: 1,
              margin: "5 0 0 0",
              items: [
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
                        { xtype: "textfield", labelWidth: 200, width: 400, fieldLabel: "13. Jenis sarana pengangkut darat", name: "NAMA_PENGANGKUT", fieldCls: "fieldinput", readOnly: true },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 200, width: 400, fieldLabel: "14. Nomor Polisi", name: "NOMOR_POLISI", fieldCls: "fieldinput", readOnly: true },
                      ],
                    },
                  ],
                },
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
                        { xtype: "currencyfield", labelWidth: 200, width: 400, fieldLabel: "15. Harga Penyerahan", name: "HARGA_PENYERAHAN", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                      ],
                    },
                  ],
                },
                {
                  xtype: "fieldset",
                  title: "DATA PENGEMAS",
                  layout: "vbox",
                  width: "100%",
                  bodyPadding: "5 0 0 0",
                  items: [
                    {
                      xtype: "grid",
                      pid: "GRIDbcin_kurir20_kemasan",
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
                                var GRID = Ext.ComponentQuery.query("FRMbcin_kurir20 grid[pid=GRIDbcin_kurir20_kemasan]")[0];
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
                          text: "16. Jumlah dan jenis kemasan",
                          icon: vconfig.getstyle + "icon/new.ico",
                          tooltip: "Input Data Kemasan",
                          handler: function () {
                            var GRID = Ext.ComponentQuery.query("FRMbcin_kurir20 grid[pid=GRIDbcin_kurir20_kemasan]")[0];
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
                  title: "DATA BARANG",
                  width: "100%",
                  bodyPadding: "5 0 0 0",
                  items: [
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "currencyfield", labelWidth: 200, width: 400, fieldLabel: "17. Volume (m3)", name: "VOLUME", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "currencyfield", labelWidth: 200, width: 400, fieldLabel: "18. Berat Kotor (Kg)", name: "BRUTO", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "currencyfield", labelWidth: 200, width: 400, fieldLabel: "19. Berat Bersih (Kg)", name: "NETTO", fieldCls: "fieldinput", readOnly: false, hideTrigger: true },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        {
                          xtype: "grid",
                          pid: "GRIDbcin_kurir20_input_item",
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
        { xtype: "button", text: "Cancel Dokumen", pid: "btcancel_dokumen", icon: vconfig.getstyle + "icon/delete.ico", tooltip: "Cancel Dokumen BC Kurir 20", handler: "FRMbcin_kurir20_btcancel_click" },
        { xtype: "button", text: "Update Dokumen", pid: "btsimpan_draft", icon: vconfig.getstyle + "icon/save.gif", tooltip: "Proses Update Dokumen BC Kurir 20", handler: "FRMbcin_kurir20_btupdate_click" },
        { xtype: "button", text: "Kunci Perubahan Dokumen", pid: "btlock_draft", icon: vconfig.getstyle + "icon/lock.png", tooltip: "Proses Lock Dokumen BC Kurir 20", handler: "FRMbcin_kurir20_btlock_click" },
        "-",
        { xtype: "button", text: "Send To Ceisa", pid: "btgenerate_draft", icon: vconfig.getstyle + "icon/up.ico", tooltip: "Kirim Dokumen Ke Aplikasi Ceisa", handler: "FRMbcin_kurir20_btsendtoceisa_click" },
        { xtype: "button", text: "Get From Ceisa", pid: "btgenerate_draft", icon: vconfig.getstyle + "icon/down.ico", tooltip: "Sinkronisasi Dokumen dari Aplikasi Ceisa", handler: "FRMbcin_kurir20_btgetfromceisa_click" },
      ],
      // other options....
    },
  ],
  listeners: {
    afterrender: "FRMbcin_kurir20_load",
  },
});
