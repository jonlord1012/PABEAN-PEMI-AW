Ext.define("NJC.SYNCHRONIZE.portal_data_plb.dokumenpabean.dokumenpabean_tarif", {
  extend: "Ext.form.Panel",
  alias: "widget.dokumenpabean_tarif",
  reference: "dokumenpabean_tarif",
  frame: false,
  border: true,
  autoScroll: false,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  //requires: ["TDK.SYNCHRONIZE.portal_data_plb.dokumenpabean.Cdokumenpabean"],
  //controller: "Cdokumenpabean",
  fieldDefaults: {
    labelAlign: "left",
    labelWidth: 90,
    margin: "0 10 5 0",
  },
  items: [
    {
      xtype: "grid",
      pid: "GRIDdokumenpabean_tarif",
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
          url: vconfig.service_api + "portal_data/portal_datas",
          extraParams: {
            method: "read_dokumenpabean_tarif",
            // module: "coo",
          },
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
              var GRID = Ext.ComponentQuery.query("portal_data_plb GRIDportal_data_plb grid[pid=GRIDportal_data_plb]")[0];
              var vdt = GRID.getSelectionModel().getSelection()[0].data;
              operation.setParams({
                INVOICE_NO: vdt.INVOICE_NO,
                NOMOR_AJU: vdt.NOMOR_AJU
              });
            } catch (ex) {
              COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
            }
          },
        },
      },
      plugins: ["filterfield"],
      viewConfig: {
        enableTextSelection: true,
      },
      columns: [
        { xtype: "rownumberer", width: 50 },
        // { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "ID_BARANG", dataIndex: "ID_BARANG" },
        // { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "SERI_BARANG", dataIndex: "SERI_BARANG" },
        // { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "JUMLAH_SATUAN", align: "right", renderer: "formatamount", dataIndex: "JUMLAH_SATUAN" },
        // { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE_SATUAN", dataIndex: "KODE_SATUAN" },
        // { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TARIF", align: "right", renderer: "formatamount", dataIndex: "TARIF" },
        // { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "JENIS_TARIF", dataIndex: "JENIS_TARIF" },
        // { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NILAI_BAYAR", align: "right", renderer: "formatamount", dataIndex: "NILAI_BAYAR" },
        // { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NILAI_FASILITAS", align: "right", renderer: "formatamount", dataIndex: "NILAI_FASILITAS" },
        // { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NILAI_SUDAH_DILUNASI", align: "right", renderer: "formatamount", dataIndex: "NILAI_SUDAH_DILUNASI" },
        // { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TARIF_FASILITAS", align: "right", renderer: "formatamount", dataIndex: "TARIF_FASILITAS" },
        // { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE_TARIF", dataIndex: "KODE_TARIF" },
        // { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE_FASILITAS", dataIndex: "KODE_FASILITAS" },
        // { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE_KOMODITI_CUKAI", dataIndex: "KODE_KOMODITI_CUKAI" },
        // { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE_SUB_KOMODITI_CUKAI", dataIndex: "KODE_SUB_KOMODITI_CUKAI" },
        // { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "FLAG_BMT_SEMENTARA", dataIndex: "FLAG_BMT_SEMENTARA" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "SERI BARANG", dataIndex: "SERIBARANG" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE PUNGUTAN", dataIndex: "KODEPUNGUTAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE TARIF", dataIndex: "KODETARIF" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TARIF", dataIndex: "TARIF" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE FASILITAS", dataIndex: "KODEFASILITAS" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TARIF FASILITAS", dataIndex: "TARIFFASILITAS" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NILAI BAYAR", dataIndex: "NILAIBAYAR" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NILAI FASILITAS", dataIndex: "NILAIFASILITAS" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NILAI SUDAH DILUNASI", dataIndex: "NILAISUDAHDILUNASI" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE SATUAN", dataIndex: "KODESATUAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "JUMLAH_SATUAN", dataIndex: "JUMLAHSATUAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "FLAG_BMT_SEMENTARA", dataIndex: "FLAGBMTSEMENTARA" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE_KOMODITI_CUKAI", dataIndex: "KODEKOMODITICUKAI" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE_SUBKOMODITI_CUKAI", dataIndex: "KODESUBKOMODITICUKAI" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "FLAG_TIS", dataIndex: "FLAGTIS" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "FLAG_PELEKATAN", dataIndex: "FLAGPELEKATAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODE_KEMASAN", dataIndex: "KODEKEMASAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "JUMLAH_KEMASAN", dataIndex: "JUMLAHKEMASAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TRANSID", dataIndex: "TRANSID" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "ID_HEADER", dataIndex: "ID_HEADER" },
      ],
      bbar: ["-"],
    },
  ],
  dockedItems: [
    {
      xtype: "toolbar",
      height: 30,
      dock: "top",
      items: [
        "-",
        {
          xtype: "button",
          pid: "btrefresh",
          text: "Refresh",
          icon: vconfig.getstyle + "icon/update.ico",
          tooltip: "Refresh Data",
          handler: function () {
            var GRID = Ext.ComponentQuery.query("dokumenpabean_tarif grid[pid=GRIDdokumenpabean_tarif]")[0];
            GRID.getStore().load();
          },
        },
      ],
      // other options....
    },
  ],
});
