var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.EXIM.bcin_kurir.FRMbcin_kurir_kemasan", {
  extend: "Ext.window.Window",
  alias: "widget.FRMbcin_kurir_kemasan",
  reference: "FRMbcin_kurir_kemasan",
  title: "Input Jumlah dan Jenis Kemasan",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: false,
  controller: "Cbcin_kurir",
  //y: -110,
  bodyPadding: "5 5 5 5",
  width: mainpanel.getWidth() * 0.4,
  height: mainpanel.getHeight() * 0.6,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
  items: [
    {
      xtype: "form",
      bodyPadding: "5 5 5 5",
      fieldDefaults: {
        labelAlign: "left",
        labelWidth: 70,
        margin: "0 10 5 0",
      },
      height: 110,
      border: false,
      items: [
        {
          xtype: "container",
          layout: "hbox",
          items: [
            { xtype: "textfield", labelWidth: 100, width: 150, fieldLabel: "Jenis", name: "KODE_JENIS_DOKUMEN", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, emptyText: "Kode" },
            { xtype: "textfield", width: 200, name: "URAIAN_DOKUMEN", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "Nama" },
            {
              xtype: "button",
              pid: "btsearch",
              module: "jenis_kemasan",
              popupwidth: 500,
              tofield: {
                KODE_KEMASAN: "KODE_KEMASAN",
                NAMA: "URAIAN_KEMASAN",
              },
              icon: vconfig.getstyle + "icon/search.ico",
              tooltip: "search",
              handler: "btsearch_click",
            },
          ],
        },
        {
          xtype: "container",
          layout: "hbox",
          items: [
            {
              xtype: "textfield",
              labelWidth: 100,
              width: 300,
              fieldLabel: "Merk",
              name: "MERK_JENIS_KEMASAN",
              fieldCls: "fieldinput",
              readOnly: false,
              enforceMaxLength: true,
              emptyText: "Merk",
            },
          ],
        },
        {
            xtype: "container",
            layout: "hbox",
            items: [
              {
                xtype: "numberfield",
                labelWidth: 100,
                width: 300,
                fieldLabel: "Jumlah",
                name: "JUMLAH_JENIS_KEMASAN",
                fieldCls: "fieldinput",
                readOnly: false,
                enforceMaxLength: true,
                emptyText: "Jumlah",
              },
            ],
          },
      ],
    },
    {
      xtype: "container",
      layout: { type: "hbox", pack: "start", align: "stretch" },
      margin: "5 5 5 5",
      flex: 1,
      items: [
        {
          xtype: "grid",
          pid: "GRIDpopupinput_dokumen",
          emptyText: "No Matching Records",
          flex: 1,
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
            { xtype: "rownumberer", width: 20 },
            { header: "Jumlah", dataIndex: "JUMLAH_KEMASAN", sortable: true, width: 50, filter: { xtype: "textfield" } },
            { header: "Kode", dataIndex: "KODE_JENIS_KEMASAN", sortable: true, width: 50, filter: { xtype: "textfield" } },
            { header: "Nama", dataIndex: "KETERANGAN_JENIS_KEMASAN", sortable: true, flex: 1, filter: { xtype: "textfield" } },
            { header: "Merk", dataIndex: "MERK_JENIS_KEMASAN", sortable: true, width: 250, filter: { xtype: "textfield" } },
          ],
          listeners: {
            afterrender: function (grid, record, e) {
              var GRIDinput_dokumen = Ext.ComponentQuery.query("FRMbcin_kurir grid[pid=GRIDinput_dokumen]")[0];
              GRIDinput_dokumen.getStore().each(function (record) {
                grid.getStore().add(record.data);
              });
            },
          },
        },
      ],
    },
  ],
});
