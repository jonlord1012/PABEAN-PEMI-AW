var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.SYNCHRONIZE.sync_doc_sa.FRMsync_doc_sa_draft", {
  extend: "Ext.window.Window",
  alias: "widget.FRMsync_doc_sa_draft",
  reference: "FRMsync_doc_sa_draft",
  modal: true,
  title: "Create Document Draft (Scrap)",
  closeAction: "hide",
  centered: true,
  autoScroll: true,
  controller: "Csync_doc_sa",
  //y: -110,
  width: mainpanel.getWidth() * 0.9,
  height: mainpanel.getHeight() * 0.8,
  layout: { type: "hbox", pack: "start", align: "stretch" },
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
  bodyBorder: false,
  bodyPadding: "5 5 5 5",
  items: [
    {
      xtype: "panel",
      layout: { type: "vbox", pack: "start", align: "stretch" },
      border: false,
      frame: false,
      width: 500,
      items: [
        {
          xtype: "form",
          border: false,
          frame: false,
          fieldDefaults: {
            labelAlign: "right",
            labelWidth: 65,
            margin: "5 10 0 0",
          },
          items: [
            {
              xtype: "container",
              layout: "hbox",
              items: [
                {
                  xtype: "combobox",
                  name: "BC_TYPE",
                  fieldLabel: "Dokumen BC",
                  width: 200,
                  displayField: "MODE_NAME",
                  valueField: "MODE_CODE",
                  fieldCls: "fieldinput",
                  allowBlank: false,
                  queryMode: "local",
                  forceSelection: true,
                  typeAhead: true,
                  minChars: 0,
                  anyMatch: true,
                  store: {
                    autoLoad: true,
                    remoteSort: true,
                    remoteFilter: true,
                    pageSize: 17,
                    fields: ["MODE_CODE", "MODE_NAME"],
                    proxy: {
                      type: "ajax",
                      disableCaching: false,
                      noCache: false,
                      headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
                      actionMethods: { read: "POST" },
                      url: vconfig.service_api + "sync_doc_sa/sync_doc_sas",
                      extraParams: {
                        method: "read_draft_bc",
                      },
                      reader: {
                        type: "json",
                        rootProperty: "Rows",
                        totalProperty: "TotalRows",
                        successProperty: "success",
                      },
                    },
                  },
                },
              ],
            },
            {
              xtype: "container",
              layout: "hbox",
              items: [
                { xtype: "textfield", width: 400, fieldLabel: "SA No", name: "SANO", fieldCls: "fieldinput", readOnly: true },
                {
                  xtype: "button",
                  pid: "btsearch_sa_list",
                  margin: "5 0 0 0",
                  icon: vconfig.getstyle + "icon/search.ico",
                  handler: "btsearch_sa_list_click",
                  tooltip: "search",
                },
              ],
            },
            {
              xtype: "container",
              layout: "hbox",
              items: [
                //
                { xtype: "textfield", width: 200, fieldLabel: "ETD Date", name: "ETDPEMI", fieldCls: "fieldinput", readOnly: true },
                { xtype: "textfield", width: 200, fieldLabel: "SA Date", name: "SADATE", fieldCls: "fieldinput", readOnly: true },
              ],
            },
            {
              xtype: "container",
              layout: "hbox",
              items: [
                { xtype: "textfield", width: 150, fieldLabel: "Customer", name: "CUST_CODE", fieldCls: "fieldinput", readOnly: true },
                { xtype: "textfield", width: 300, name: "CUSTOMER", fieldCls: "fieldinput", readOnly: true },
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
                    //
                    { xtype: "textfield", width: 250, fieldLabel: "Jenis Angkut", name: "SHIPPING_NAME", fieldCls: "fieldinput", readOnly: true },
                  ],
                },
              ],
            },
          ],
        },
        { xtype: "tbspacer", height: 10 },
        {
          xtype: "grid",
          pid: "GRIDinvoice_header",
          emptyText: "No Matching Records",
          autoScroll: true,
          flex: 1,
          viewConfig: {
            enableTextSelection: true,
          },
          store: {
            autoLoad: false,
            remoteSort: false,
            remoteFilter: false,
            pageSize: 0,
            proxy: {
              type: "ajax",
              disableCaching: false,
              noCache: false,
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
              actionMethods: { read: "POST" },
              url: vconfig.service_api + "sync_doc_sa/sync_doc_sas",
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
                  var vsano = Ext.ComponentQuery.query("FRMsync_doc_sa_draft textfield[name=SANO]")[0];
                  operation.setParams({
                    method: "process_data",
                    vmodule: "show_invoice",
                    vheader: vsano.getValue(),
                    vdetail: "",
                  });
                } catch (ex) {
                  COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                }
              },
            },
          },
          columns: [
            { xtype: "rownumberer", width: 40 },
            { header: "INVOICE NO", dataIndex: "INVOICE_NO", sortable: true, width: 90, filter: { xtype: "textfield" } },
            { header: "DATE", dataIndex: "ETDPEMI", sortable: true, width: 70, filter: { xtype: "textfield" } },
            { header: "CURR", dataIndex: "CURR", sortable: true, width: 50, filter: { xtype: "textfield" } },
            { header: "CUST", dataIndex: "CUST_CODE", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "CONTAINER", dataIndex: "CONTAINER", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "BL", dataIndex: "BLNO", sortable: true, width: 100, filter: { xtype: "textfield" } },
          ],
          tbar: [
            "-",
            //
          ],
        },
      ],
    },
    { xtype: "tbspacer", width: 10 },
    {
      xtype: "tabpanel",
      flex: 1,
      defaults: {
        bodyPadding: 2,
        scrollable: true,
        border: false,
      },
      items: [
        {
          title: "Detil Barang",
          layout: { type: "vbox", pack: "start", align: "stretch" },
          items: [
            {
              xtype: "grid",
              pid: "GRIDinvoice_item",
              emptyText: "No Matching Records",
              autoScroll: true,
              flex: 1,
              viewConfig: {
                enableTextSelection: true,
              },
              store: {
                fields: [
                  {
                    name: "ID_HEADER",
                    type: "float",
                    calculate: function (data, index) {
                      return index + 1;
                    },
                  },
                ],
                autoLoad: false,
                remoteSort: false,
                remoteFilter: false,
                pageSize: 0,
                proxy: {
                  type: "ajax",
                  disableCaching: false,
                  noCache: false,
                  headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
                  actionMethods: { read: "POST" },
                  url: vconfig.service_api + "sync_doc_sa/sync_doc_sas",
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
                      var vsano = Ext.ComponentQuery.query("FRMsync_doc_sa_draft textfield[name=SANO]")[0];
                      operation.setParams({
                        method: "process_data",
                        vmodule: "show_invoice_item",
                        vheader: vsano.getValue(),
                        vdetail: "",
                      });
                    } catch (ex) {
                      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                    }
                  },
                  load: function (store, operation, eOpts) {
                    try {
                      var GRIDinvoice_item_impor = Ext.ComponentQuery.query("FRMsync_doc_sa_draft grid[pid=GRIDinvoice_item_impor]")[0];
                      GRIDinvoice_item_impor.getStore().load();
                    } catch (ex) {
                      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                    }
                  },
                },
              },
              columns: [
                { xtype: "rownumberer", width: 40 },
                { header: "SANO", dataIndex: "SANO", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "INVOICENO", dataIndex: "INVOICENO", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "ASSYCODE", dataIndex: "ASSYCODE", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "ASSYNO", dataIndex: "ASSYNO", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "ASURANSI", dataIndex: "ASURANSI", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "CIF", dataIndex: "CIF", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "CIF_RUPIAH", dataIndex: "CIF_RUPIAH", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "DISKON", dataIndex: "DISKON", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "FLAG_KENDARAAN", dataIndex: "FLAG_KENDARAAN", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "FOB", dataIndex: "FOB", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "FREIGHT", dataIndex: "FREIGHT", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "HARGA_BARANG_LDP", dataIndex: "HARGA_BARANG_LDP", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "HARGA_INVOICE", dataIndex: "HARGA_INVOICE", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "HARGA_PENYERAHAN", dataIndex: "HARGA_PENYERAHAN", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "HARGA_SATUAN", dataIndex: "HARGA_SATUAN", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "JENIS_KENDARAAN", dataIndex: "JENIS_KENDARAAN", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "JUMLAH_BAHAN_BAKU", dataIndex: "JUMLAH_BAHAN_BAKU", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "JUMLAH_KEMASAN", dataIndex: "JUMLAH_KEMASAN", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "JUMLAH_SATUAN", dataIndex: "JUMLAH_SATUAN", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "KAPASITAS_SILINDER", dataIndex: "KAPASITAS_SILINDER", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "KATEGORI_BARANG", dataIndex: "KATEGORI_BARANG", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "KODE_ASAL_BARANG", dataIndex: "KODE_ASAL_BARANG", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "KODE_BARANG", dataIndex: "KODE_BARANG", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "KODE_FASILITAS_DOKUMEN", dataIndex: "KODE_FASILITAS_DOKUMEN", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "KODE_GUNA", dataIndex: "KODE_GUNA", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "KODE_JENIS_NILAI", dataIndex: "KODE_JENIS_NILAI", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "KODE_KEMASAN", dataIndex: "KODE_KEMASAN", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "KODE_LEBIH_DARI4TAHUN", dataIndex: "KODE_LEBIH_DARI4TAHUN", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "KODE_NEGARA_ASAL", dataIndex: "KODE_NEGARA_ASAL", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "KODE_SATUAN", dataIndex: "KODE_SATUAN", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "KODE_SKEMA_TARIF", dataIndex: "KODE_SKEMA_TARIF", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "KODE_STATUS", dataIndex: "KODE_STATUS", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "KONDISI_BARANG", dataIndex: "KONDISI_BARANG", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "MERK", dataIndex: "MERK", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "NETTO", dataIndex: "NETTO", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "NILAI_INCOTERM", dataIndex: "NILAI_INCOTERM", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "NILAI_PABEAN", dataIndex: "NILAI_PABEAN", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "NOMOR_MESIN", dataIndex: "NOMOR_MESIN", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "NOMOR_RANGKA", dataIndex: "NOMOR_RANGKA", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "POS_TARIF", dataIndex: "POS_TARIF", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "SERI_BARANG", dataIndex: "SERI_BARANG", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "SERI_IJIN", dataIndex: "SERI_IJIN", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "SERI_POS_TARIF", dataIndex: "SERI_POS_TARIF", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "SPESIFIKASI_LAIN", dataIndex: "SPESIFIKASI_LAIN", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "TAHUN_PEMBUATAN", dataIndex: "TAHUN_PEMBUATAN", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "TIPE", dataIndex: "TIPE", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "UKURAN", dataIndex: "UKURAN", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "URAIAN", dataIndex: "URAIAN", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "VOLUME", dataIndex: "VOLUME", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "ID_HEADER", dataIndex: "ID_HEADER", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "ID_EKSPORTIR", dataIndex: "ID_EKSPORTIR", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "NAMA_EKSPORTIR", dataIndex: "NAMA_EKSPORTIR", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "ALAMAT_EKSPORTIR", dataIndex: "ALAMAT_EKSPORTIR", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "KODE_PERHITUNGAN", dataIndex: "KODE_PERHITUNGAN", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "SERI_BARANG_DOK_ASAL", dataIndex: "SERI_BARANG_DOK_ASAL", sortable: true, width: 120, filter: { xtype: "textfield" } },
              ],
              tbar: [
                "-",
                //
              ],
            },
          ],
        },
        {
          title: "Bahan Baku Impor",
          layout: { type: "vbox", pack: "start", align: "stretch" },
          items: [
            {
              xtype: "grid",
              pid: "GRIDinvoice_item_impor",
              emptyText: "No Matching Records",
              autoScroll: true,
              flex: 1,
              viewConfig: {
                enableTextSelection: true,
              },
              store: {
                autoLoad: false,
                remoteSort: false,
                remoteFilter: false,
                pageSize: 0,
                proxy: {
                  type: "ajax",
                  disableCaching: false,
                  noCache: false,
                  headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
                  actionMethods: { read: "POST" },
                  url: vconfig.service_api + "sync_doc_sa/sync_doc_sas",
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
                      var vsano = Ext.ComponentQuery.query("FRMsync_doc_sa_draft textfield[name=SANO]")[0];
                      var GRIDinvoice_item = Ext.ComponentQuery.query("FRMsync_doc_sa_draft grid[pid=GRIDinvoice_item]")[0];
                      var dtitem = [];
                      GRIDinvoice_item.getStore().each(function (rec) {
                        dtitem.push(rec.getData());
                      });
                      operation.setParams({
                        method: "process_data",
                        vmodule: "show_invoice_item_impor",
                        vheader: vsano.getValue(),
                        vdetail: Ext.encode(dtitem),
                      });
                    } catch (ex) {
                      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                    }
                  },
                },
              },
              columns: [
                { xtype: "rownumberer", width: 40 },
                { header: "SA NO", dataIndex: "SANO", sortable: true, width: 90, filter: { xtype: "textfield" } },
                { header: "INVOICE NO", dataIndex: "INVOICENO", sortable: true, width: 70, filter: { xtype: "textfield" } },
                { header: "ASSYCODE", dataIndex: "ASSYCODE", sortable: true, width: 50, filter: { xtype: "textfield" } },
                { header: "SERI", dataIndex: "SERI_BARANG", sortable: true, width: 100, filter: { xtype: "textfield" } },
                { header: "POLY", dataIndex: "POLYNO", sortable: true, width: 100, filter: { xtype: "textfield" } },
                { header: "PROD DATE", dataIndex: "PROD_DATE", sortable: true, width: 100, filter: { xtype: "textfield" } },
              ],
              tbar: [
                "-",
                //
              ],
            },
          ],
        },
        {
          title: "Bahan Baku Lokal",
          items: [
            //
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
        { xtype: "tbspacer", width: 10 },
        "-",
        { xtype: "button", pid: "btsave", text: "Save", icon: vconfig.getstyle + "icon/save.ico", tooltip: "Save Data" },
      ],
      // other options....
    },
  ],
  listeners: {
    afterlayout: function (cmp) {
      try {
        var FRM = cmp.query("form")[0];
        FRM.getForm().reset();
        var GRIDinvoice_header = cmp.query("grid[pid=GRIDinvoice_header]")[0];
        GRIDinvoice_header.getStore().removeAll();
        GRIDinvoice_header.getStore().commitChanges();
      } catch (ex) {
        COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      }
    },
  },
});
