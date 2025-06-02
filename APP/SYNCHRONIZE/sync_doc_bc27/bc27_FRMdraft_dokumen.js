var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.SYNCHRONIZE.sync_doc_bc27.bc27_FRMdraft_dokumen", {
  extend: "Ext.window.Window",
  alias: "widget.bc27_FRMdraft_dokumen",
  reference: "bc27_FRMdraft_dokumen",
  title: "Draft Dokumen [BC27]",
  modal: true,
  closeAction: "hidden",
  centered: true,
  autoScroll: true,
  controller: "Csync_doc_bc27",
  //y: -110,
  width: mainpanel.getWidth() * 0.95,
  height: mainpanel.getHeight() * 0.9,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  items: [
    {
      xtype: "form",
      layout: { type: "vbox", pack: "start", align: "stretch" },
      flex: 1,
      bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
      fieldDefaults: {
        labelAlign: "left",
        labelWidth: 90,
        margin: "0 10 5 0",
      },
      items: [
        {
          xtype: "tabpanel",
          pid: "tabpanel_dokumendraft",
          flex: 1,
          tabPosition: "left",
          tabRotation: 0,
          defaults: {
            bodyPadding: 5,
            scrollable: true,
            border: false,
          },
          items: [
            {
              title: "Header Dokumen",
              layout: { type: "vbox", pack: "start", align: "stretch" },
              items: [
                {
                  xtype: "container",
                  layout: { type: "hbox", pack: "start", align: "stretch" },
                  items: [
                    {
                      xtype: "fieldset",
                      title: "Dokumen Info",
                      width: 580,
                      items: [
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "textfield", labelWidth: 90, width: 160, fieldLabel: "Dokumen BC", name: "KODE_DOKUMEN_PABEAN", fieldCls: "fieldinput", value: "27", readOnly: true },
                          ],
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "textfield", labelWidth: 90, width: 160, fieldLabel: "Vendor/Supplier", name: "KODE_INTERNAL", fieldCls: "fieldinput", readOnly: true },
                            { xtype: "textfield", width: 350, name: "NAMA", fieldCls: "fieldinput", readOnly: true },
                            {
                              xtype: "button",
                              pid: "btsearch",
                              vdata: {
                                modulename: "supplier",
                                title: "Pilih Supplier",
                                popupwidth: 0.7,
                                popupheight: 0.7,
                              },
                              icon: vconfig.getstyle + "icon/search.ico",
                              tooltip: "search",
                            },
                          ],
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [{ xtype: "textarea", labelWidth: 90, width: 500, labelAlign: "right", fieldLabel: "Alamat", name: "ALAMAT", fieldCls: "fieldlock", readOnly: true }],
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "textfield", labelWidth: 90, width: 150, labelAlign: "right", fieldLabel: "Negara", name: "KODE_NEGARA", fieldCls: "fieldlock", readOnly: true },
                            { xtype: "displayfield", labelWidth: 10, width: 200, name: "NAMA_NEGARA" },
                          ],
                        },
                        {
                          xtype: "container",
                          layout: "vbox",
                          items: [
                            { xtype: "tbspacer", height: 5 },
                            {
                              xtype: "container",
                              layout: "hbox",
                              items: [{ xtype: "textfield", labelWidth: 90, width: 350, fieldLabel: "Nomor Aju", name: "NOMOR_AJU", fieldCls: "fieldinput", readOnly: false }],
                            },
                            {
                              xtype: "container",
                              layout: "hbox",
                              items: [{ xtype: "datefield", labelWidth: 90, width: 250, fieldLabel: "Tanggal Aju", name: "TANGGAL_AJU", fieldCls: "fieldinput", format: "Y-m-d", readOnly: false }],
                            },
                            {
                              xtype: "container",
                              layout: "hbox",
                              items: [{ xtype: "textfield", labelWidth: 90, width: 350, fieldLabel: "Nomor Daftar", name: "NOMOR_DAFTAR", fieldCls: "fieldinput", readOnly: false }],
                            },
                            {
                              xtype: "container",
                              layout: "hbox",
                              items: [{ xtype: "datefield", labelWidth: 90, width: 250, fieldLabel: "Tanggal Daftar", name: "TANGGAL_DAFTAR", fieldCls: "fieldinput", format: "Y-m-d", readOnly: false }],
                            },
                            { xtype: "tbspacer", height: 20 },
                          ],
                        },
                      ],
                    },
                    { xtype: "tbspacer", width: 10 },
                    {
                      xtype: "fieldset",
                      title: "Invoice Info",
                      flex: 1,
                      height: 260,
                      layout: { type: "vbox", pack: "start", align: "stretch" },
                      items: [
                        {
                          xtype: "grid",
                          pid: "GRIDinvoice_dokumen_draft",
                          emptyText: "No Matching Records",
                          autoScroll: true,
                          flex: 1,
                          plugins: ["filterfield", { ptype: "cellediting", clicksToEdit: 1 }],
                          viewConfig: {
                            enableTextSelection: true,
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
                            "-",
                            //
                            { xtype: "button", pid: "btsearch_invoice", text: "Pilih Invoice", icon: vconfig.getstyle + "icon/search.ico", tooltip: "Pilih Invoice" },
                            "->",
                            { xtype: "button", pid: "bttambah_dokumen", text: "Tambah Dokumen", icon: vconfig.getstyle + "icon/add.png", tooltip: "Tambah Dokumen" },
                          ],
                        },
                      ],
                    },
                  ],
                },
                { xtype: "tbspacer", height: 5 },
                {
                  xtype: "container",
                  layout: { type: "hbox", pack: "start", align: "stretch" },
                  items: [
                    { xtype: "tbspacer", width: 580 },
                    { xtype: "tbspacer", width: 10 },
                  ],
                },
              ],
            },
            {
              title: "BL dokumen",
              layout: { type: "vbox", pack: "start", align: "stretch" },
              items: [
                {
                  xtype: "container",
                  layout: "hbox",
                  flex: 1,
                  items: [
                    {
                      xtype: "fieldset",
                      title: "24. Nomor, Ukuran, dan Tipe Peti Kemas",
                      layout: "vbox",
                      flex: 1,
                      bodyPadding: "5 0 0 0",
                      items: [
                        {
                          xtype: "grid",
                          pid: "GRIDdokumen_draft_kontainer",
                          emptyText: "No Matching Records",
                          width: 495,
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
                                var GRID = Ext.ComponentQuery.query("coo_dokumen_draft FRMdokumen_draft grid[pid=GRIDdokumen_draft_kontainer]")[0];
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
                      xtype: "container",
                      width: 5,
                    },
                    {
                      xtype: "fieldset",
                      title: "25. Jumlah dan jenis kemasan",
                      layout: "vbox",
                      flex: 1,
                      bodyPadding: "5 0 0 0",
                      items: [
                        {
                          xtype: "grid",
                          pid: "GRIDdokumen_draft_kemasan",
                          emptyText: "No Matching Records",
                          width: 495,
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
                                    var GRID = Ext.ComponentQuery.query("coo_dokumen_draft FRMdokumen_draft grid[pid=GRIDdokumen_draft_kemasan]")[0];
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
                                var GRID = Ext.ComponentQuery.query("coo_dokumen_draft FRMdokumen_draft grid[pid=GRIDdokumen_draft_kemasan]")[0];
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
              ],
            },
            {
              title: "Sumber Data",
              layout: { type: "vbox", pack: "start", align: "stretch" },
              items: [
                {
                  xtype: "grid",
                  pid: "GRIDsumberdata",
                  emptyText: "No Matching Records",
                  autoScroll: true,
                  flex: 1,
                  plugins: ["filterfield"],
                  viewConfig: {
                    enableTextSelection: true,
                  },
                  store: "",
                  columns: [
                    { xtype: "rownumberer", width: 40 },
                    { header: "VENDOR", dataIndex: "VENDOR", sortable: true, width: 75, filter: { xtype: "textfield" } },
                    { header: "INVOICE", dataIndex: "INVOICE_NO", sortable: true, width: 120, filter: { xtype: "textfield" } },
                    { header: "DATE", dataIndex: "INVOICE_DATE", sortable: true, width: 100, filter: { xtype: "textfield" } },
                    { header: "TRANSPORT", dataIndex: "TRANSPORT_WAY", sortable: true, width: 80, filter: { xtype: "textfield" } },
                    { header: "CARA BAYAR", dataIndex: "CARA_BAYAR", sortable: true, width: 80, filter: { xtype: "textfield" } },
                    { header: "ITEM NUMBER", dataIndex: "ITEM_NUMBER", sortable: true, width: 120, filter: { xtype: "textfield" } },
                    { header: "ARRIV", dataIndex: "ARRIV_PLAN_NUMBER", sortable: true, width: 80, align: "right", renderer: "formatqty", filter: { xtype: "textfield" } },
                    { header: "UOM", dataIndex: "UOM", sortable: true, width: 50, filter: { xtype: "textfield" } },
                    { header: "PRICE", dataIndex: "PRICE", sortable: true, width: 80, align: "right", filter: { xtype: "textfield" } },
                    { header: "CUR MONEY", dataIndex: "CURRENT_MONEY", sortable: true, width: 50, filter: { xtype: "textfield" } },
                    { header: "WEIGHT", dataIndex: "NET_WEIGHT", sortable: true, width: 80, align: "right", renderer: "formatqty", filter: { xtype: "textfield" } },
                    { header: "WEIGHT UOM", dataIndex: "WEIGHT_UOM", sortable: true, width: 80, filter: { xtype: "textfield" } },
                    { header: "COUNTRY OF", dataIndex: "COUNTRY_OF", sortable: true, width: 80, filter: { xtype: "textfield" } },
                    { header: "CAUPRI", dataIndex: "CAUPRI", sortable: true, width: 80, filter: { xtype: "textfield" } },
                  ],
                  bbar: {
                    xtype: "pagingtoolbar",
                    displayInfo: true,
                    displayMsg: "Total Data {2}",
                    emptyMsg: "No topics to display",
                  },
                  tbar: ["-"],
                },
              ],
            },
            {
              title: "Lampiran Dokumen",
              layout: { type: "vbox", pack: "start", align: "stretch" },
              items: [
                {
                  xtype: "fieldset",
                  title: "Lampiran Dokumen",
                  layout: "vbox",
                  flex: 1,
                  height: 250,
                  items: [
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [{ xtype: "textfield", labelWidth: 120, width: 400, fieldLabel: "No Kontrak", name: "NOMOR_KONTRAK", fieldCls: "fieldinput", readOnly: false }],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [{ xtype: "datefield", labelWidth: 120, width: 250, fieldLabel: "Tanggal Kontrak", name: "TANGGAL_KONTRAK", fieldCls: "fieldinput", format: "Y-m-d", readOnly: false }],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [{ xtype: "datefield", labelWidth: 120, width: 250, fieldLabel: "Tanggal Habis Kontrak", name: "TANGGAL_HABIS_KONTRAK", fieldCls: "fieldinput", format: "Y-m-d", readOnly: false }],
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
        //
        "-",
        { xtype: "button", pid: "btbc27_savedokumendraft", text: "Simpan Dokumen Draft", icon: vconfig.getstyle + "icon/save.ico", tooltip: "Simpan Dokumen Draft" },
      ],
    },
  ],
  listeners: {
    afterlayout: function (cmp) {
      try {
        var FRM = cmp.query("form")[0];
        FRM.getForm().reset();
        var GRIDsumberdata = cmp.query("grid[pid=GRIDsumberdata]")[0];
        GRIDsumberdata.getStore().removeAll();
        GRIDsumberdata.getStore().commitChanges();

        var GRIDdokumen_draft_kontainer = cmp.query("grid[pid=GRIDdokumen_draft_kontainer]")[0];
        GRIDdokumen_draft_kontainer.getStore().removeAll();
        GRIDdokumen_draft_kontainer.getStore().commitChanges();

        var GRIDdokumen_draft_kemasan = cmp.query("grid[pid=GRIDdokumen_draft_kemasan]")[0];
        GRIDdokumen_draft_kemasan.getStore().removeAll();
        GRIDdokumen_draft_kemasan.getStore().commitChanges();
      } catch (ex) {
        COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      }
    },
  },
});
