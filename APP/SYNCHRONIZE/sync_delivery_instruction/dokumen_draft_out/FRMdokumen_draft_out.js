Ext.define("NJC.SYNCHRONIZE.sync_delivery_instruction.dokumen_draft_out.FRMdokumen_draft_out", {
  extend: "Ext.form.Panel",
  alias: "widget.FRMdokumen_draft_out",
  reference: "FRMdokumen_draft_out",
  frame: false,
  border: true,
  autoScroll: false,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
  fieldDefaults: {
    labelAlign: "left",
    labelWidth: 90,
    margin: "0 10 5 0",
  },
  items: [
    {
      xtype: "tabpanel",
      pid: "tabpanel_dokumendraft_out",
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
                  height: 250,
                  items: [
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        {
                          xtype: "combobox",
                          name: "CBO_BC",
                          fieldLabel: "Dokumen BC",
                          labelWidth: 90,
                          width: 200,
                          displayField: "DEFNAME",
                          valueField: "DEFCODE",
                          fieldCls: "fieldinput",
                          allowBlank: false,
                          queryMode: "local",
                          forceSelection: true,
                          typeAhead: true,
                          minChars: 0,
                          anyMatch: true,
                          value: "0",
                          store: new Ext.data.Store({
                            data: [
                              { DEFCODE: "27", DEFNAME: "27" },
                              { DEFCODE: "41", DEFNAME: "41" },
                              { DEFCODE: "28", DEFNAME: "28" },
                              { DEFCODE: "30", DEFNAME: "30" },
                            ],
                            fields: ["DEFCODE", "DEFNAME"],
                          }),
                        },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 90, width: 160, fieldLabel: "Client/Tenant", name: "MAPPED_TENANT", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "textfield", width: 350, name: "NAMA", fieldCls: "fieldinput", readOnly: true },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          vdata: {
                            modulename: "client",
                            title: "Pilih Client",
                            popupwidth: 0.8,
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
                        { xtype: "displayfield", labelWidth: 10, width: 200, name: "URAIAN_NEGARA" },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 90, width: 500, labelAlign: "right", fieldLabel: "Draft Nomor Aju", name: "DRAFT_AJU", dataIndex: "nomorAju", fieldCls: "fieldlock", readOnly: true },
                        {
                          xtype: "button",
                          pid: "btgetLastAju",
                          icon: vconfig.getstyle + "icon/search.ico",
                          tooltip: "Find Last Aju",
                        },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "checkbox", labelWidth: 90, width: 160, fieldLabel: "KIRIM BALIK ?", name: "IS_KIRIM_BALIK", readOnly: false },
                      ]
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
                {
                  text: "<b>INVOICE DATA</b>",
                  columns: [
                    { header: "CLIENT", dataIndex: "CLIENT", sortable: true, width: 75, filter: { xtype: "textfield" } },
                    { header: "INVOICE", dataIndex: "INVOICE_NO", sortable: true, width: 120, filter: { xtype: "textfield" } },
                    { header: "DATE", dataIndex: "INVOICE_DATE", sortable: true, width: 100, filter: { xtype: "textfield" } },
                    { header: "TENANT INVOICE", dataIndex: "TENANT_INVOICE_NO", sortable: true, width: 120, filter: { xtype: "textfield" } },
                    { header: "TENANT INVOICE DATE", dataIndex: "TENANT_INVOICE_DATE", sortable: true, width: 100, filter: { xtype: "textfield" } },
                    { header: "ARTICLE CODE", dataIndex: "ARTICLE_CODE", sortable: true, width: 100, filter: { xtype: "textfield" } },
                    { header: "PART CODE", dataIndex: "PART_CODE", sortable: true, width: 150, filter: { xtype: "textfield" } },
                    { header: "PART MPQ", dataIndex: "PART_MPQ", sortable: true, width: 80, renderer: "formatqty", filter: { xtype: "textfield" } },
                    { header: "TOTAL ITEM", dataIndex: "ORDER_QTY", sortable: true, width: 80, renderer: "formatqty", filter: { xtype: "textfield" } },
                    { header: "LOT_NO ", dataIndex: "DELIVERY_LOT_NO", sortable: true, width: 120, align: "right", filter: { xtype: "textfield" } },
                  ],
                },
                {
                  text: "  ",
                  width: 10,
                },
                {
                  text: "<b>INCOMING DATA </b>",
                  columns: [
                    { header: "BCTYPE", dataIndex: "IN_BC_TYPE", sortable: true, width: 60, filter: { xtype: "textfield" } },
                    { header: "NO AJU", dataIndex: "IN_NOMOR_AJU", sortable: true, width: 190, filter: { xtype: "textfield" } },
                    { header: "TGL AJU", dataIndex: "IN_TANGGAL_AJU", sortable: true, width: 80, filter: { xtype: "textfield" } },
                    { header: "NO DAFTAR ", dataIndex: "IN_NOMOR_DAFTAR", sortable: true, width: 100, filter: { xtype: "textfield" } },
                    { header: "TGL DAFTAR", dataIndex: "IN_TANGGAL_DAFTAR", sortable: true, width: 80, filter: { xtype: "textfield" } },
                    { header: "SERI BARANG", dataIndex: "IN_SERI_BARANG", sortable: true, width: 80, filter: { xtype: "textfield" } },
                    { header: "INVOICE NO ", dataIndex: "IN_INVOICE_NO", sortable: true, width: 120, filter: { xtype: "textfield" } },
                  ],
                },
                {
                  text: "  ",
                  width: 10,
                },
                {
                  text: "<b>PICKING DATA</b>",
                  columns: [
                    { header: "NO DRAFT", dataIndex: "NO_DRAFT", sortable: true, width: 150, filter: { xtype: "textfield" } },
                    { header: "NO BUKTI", dataIndex: "NO_BUKTI", sortable: true, width: 100, filter: { xtype: "textfield" } },
                    { header: "CLIENT CODE", dataIndex: "MAPPED_TENANT", sortable: true, width: 80, filter: { xtype: "textfield" } },
                    { header: "INTERNAL CODE", dataIndex: "MAPPED_GOODS", sortable: true, width: 100, filter: { xtype: "textfield" } },
                  ],
                }
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
          title: "EXBC FINISH GOOD",
          layout: { type: "vbox", pack: "start", align: "stretch" },
          items: [
            {
              xtype: "grid",
              pid: "GRIDexbcfg",
              emptyText: "No Matching Records",
              autoScroll: true,
              flex: 1,
              plugins: ["filterfield"],
              viewConfig: {
                enableTextSelection: true,
              },
              store: "",
              plugins: [
                "filterfield",
                {

                  ptype: "rowwidget",
                  pluginId: "rowwidgetPlugin",
                  selectRowOnExpand: true,
                  widget: {
                    xtype: "grid",
                    viewConfig: {
                      enableTextSelection: true,
                    },
                    store: {
                      autoLoad: true,
                      remoteSort: false,
                      remoteFilter: false,
                      pageSize: 0,
                      fields: [
                        //
                        { name: "IN_SERI_BAHAN_BAKU", type: "int" },
                      ],
                      proxy: {
                        type: "ajax",
                        disableCaching: false,
                        noCache: false,
                        headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
                        actionMethods: { read: "POST" },
                        url: vconfig.service_api + "sync_delivery_instruction/sync_delivery_instructions",
                        reader: {
                          type: "json",
                          rootProperty: "Rows",
                          totalProperty: "TotalRows",
                          successProperty: "success",
                        },
                      },
                      listeners: {
                        beforeload: function (store, operation, eOpts) {
                          try {
                            var FRM = Ext.ComponentQuery.query("FRMdokumen_draft_out form")[0];
                            var GRIDexbcfg = Ext.ComponentQuery.query("FRMdokumen_draft_out grid[pid=GRIDexbcfg]")[0];

                            var sm = GRIDexbcfg.getSelectionModel();
                            var rs = sm.getSelection()[0].data;
                            //var vdt = FRM.getValues(false, false, false, true);


                            var GRIDinvoice = Ext.ComponentQuery.query("popup_invoice grid[pid=GRIDpopup_invoice_select]")[0];
                            var dtselect = GRIDexbcfg.getSelectionModel().getSelection();
                            console.log(GRIDinvoice);
                            var list_invoice = [];
                            Ext.each(dtselect, function (item) {
                              list_invoice.push({
                                INVOICE_NO: item.data.INVOICE_NO,
                              });
                            });
                            operation.setParams({
                              method: "SP_TR_GET_EXBC_PER_SERI_BARANG",
                              invoice: Ext.encode(list_invoice),
                              DELIVERY_LOT_NO: rs.DELIVERY_LOT_NO,
                              MODE: 'exbc',
                            });
                          } catch (ex) {
                            COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                          }
                        },
                      },
                    },
                    plugins: ["filterfield"],
                    columns: [
                      {
                        text: "  ",
                        width: 10,
                      },
                      {
                        text: "<b>EXBC DATA </b>",
                        columns: [
                          { header: "SERI BARANG BB", dataIndex: "IN_SERI_BAHAN_BAKU", sortable: true, width: 80, filter: { xtype: "textfield" } },
                          { header: "BCTYPE BB", dataIndex: "IN_KODE_DOKUMEN_ASAL", sortable: true, width: 60, filter: { xtype: "textfield" } },
                          { header: "NO AJU BB", dataIndex: "IN_NOMOR_AJU_ASAL", sortable: true, width: 190, filter: { xtype: "textfield" } },
                          { header: "NO DAFTAR BB", dataIndex: "IN_NOMOR_DAFTAR_ASAL", sortable: true, width: 100, filter: { xtype: "textfield" } },
                          { header: "TGL DAFTAR BB", dataIndex: "IN_TANGGAL_DAFTAR_ASAL", sortable: true, width: 80, filter: { xtype: "textfield" } },
                          { header: "SERI BARANG ASAL", dataIndex: "EXBC_INVOICE_NO", sortable: true, width: 120, filter: { xtype: "textfield" } },
                          { header: "PART NO BB", dataIndex: "IN_KODE_BARANG_BB", sortable: true, width: 100, filter: { xtype: "textfield" } },
                          { header: "QTY BB", dataIndex: "IN_JUMLAH_SATUAN_BB", sortable: true, width: 80, filter: { xtype: "textfield" } },
                          { header: "HARGA BB", dataIndex: "IN_HARGA_SATUAN_BB", sortable: true, width: 80, filter: { xtype: "textfield" } },
                          { header: "CIF BB", dataIndex: "IN_CIF_BB", sortable: true, width: 120, filter: { xtype: "textfield" } },
                          { header: "HARGA PENYERAHA BB", dataIndex: "IN_HARGA_PENYERAHAN", sortable: true, width: 100, filter: { xtype: "textfield" } },
                          { header: "ARTICLE CODE ", dataIndex: "ARTICLE_CODE", sortable: true, width: 100, filter: { xtype: "textfield" } },
                          // { header: "PART MPQ ", dataIndex: "IN_MPQ", sortable: true, width: 100, filter: { xtype: "textfield" } },
                        ],
                      },
                    ],
                  },
                },
              ],

              columns: [
                { xtype: "rownumberer", width: 40 },
                {
                  text: "<b>INVOICE DATA</b>",
                  columns: [
                    { header: "INVOICE", dataIndex: "INVOICE_NO", sortable: true, width: 120, filter: { xtype: "textfield" } },
                    { header: "ARTICLE CODE", dataIndex: "ARTICLE_CODE", sortable: true, width: 100, filter: { xtype: "textfield" } },
                    { header: "PART CODE", dataIndex: "PART_CODE", sortable: true, width: 150, filter: { xtype: "textfield" } },
                    { header: "PART MPQ", dataIndex: "PART_MPQ", sortable: true, width: 80, renderer: "formatqty", filter: { xtype: "textfield" } },
                    { header: "LOT_NO ", dataIndex: "DELIVERY_LOT_NO", sortable: true, width: 120, align: "right", filter: { xtype: "textfield" } },

                  ],
                },
                {
                  text: "<b></b>",
                },
                {
                  text: "<b>DATA KEDATANGAN</b>",
                  columns: [
                    { header: "BCTYPE", dataIndex: "IN_BC_TYPE", sortable: true, width: 60, filter: { xtype: "textfield" } },
                    { header: "NO AJU", dataIndex: "IN_NOMOR_AJU", sortable: true, width: 190, filter: { xtype: "textfield" } },
                    { header: "TGL AJU", dataIndex: "IN_TANGGAL_AJU", sortable: true, width: 80, filter: { xtype: "textfield" } },
                    { header: "NO DAFTAR ", dataIndex: "IN_NOMOR_DAFTAR", sortable: true, width: 100, filter: { xtype: "textfield" } },
                    { header: "TGL DAFTAR", dataIndex: "IN_TANGGAL_DAFTAR", sortable: true, width: 80, filter: { xtype: "textfield" } },
                    { header: "SERI BARANG", dataIndex: "IN_SERI_BARANG", sortable: true, width: 80, filter: { xtype: "textfield" } },
                    { header: "INVOICE NO ", dataIndex: "IN_INVOICE_NO", sortable: true, width: 120, filter: { xtype: "textfield" } },
                  ],
                },

                {
                  text: "  ",
                  width: 10,
                },
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
  dockedItems: [
    {
      xtype: "toolbar",
      height: 30,
      dock: "top",
      items: ["-", { xtype: "button", pid: "btsavedokumendraft_out", text: "Simpan Dokumen Draft", icon: vconfig.getstyle + "icon/save.ico", tooltip: "Simpan Dokumen Draft" }],
      // other options....
    },
  ],
  listeners: {
    afterrender: "awFRMdokumen_draft_out_load",
  },
});
