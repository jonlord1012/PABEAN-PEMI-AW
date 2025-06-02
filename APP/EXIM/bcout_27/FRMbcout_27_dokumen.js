var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.EXIM.bcout_27.FRMbcout_27_dokumen", {
  extend: "Ext.window.Window",
  alias: "widget.FRMbcout_27_dokumen",
  reference: "FRMbcout_27_dokumen",
  title: "",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: false,
  controller: "Cbcout_27",
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
            { xtype: "textfield", width: 200, name: "URAIAN_DOKUMEN", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "Keterangan" },
            {
              xtype: "button",
              pid: "btsearch",
              module: "jenis_dokumen",
              popupwidth: 500,
              tofield: {
                KODE_JENIS_DOKUMEN: "KODE_DOKUMEN",
                URAIAN_DOKUMEN: "URAIAN_DOKUMEN",
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
              fieldLabel: "Nomor Dokumen",
              name: "NOMOR_DOKUMEN",
              fieldCls: "fieldinput",
              readOnly: false,
              enforceMaxLength: true,
              emptyText: "Nomor Dokumen",
            },
          ],
        },
        {
          xtype: "container",
          layout: "hbox",
          items: [
            {
              xtype: "datefield",
              labelWidth: 100,
              width: 300,
              fieldLabel: "Tanggal Dokumen",
              name: "TANGGAL_DOKUMEN",
              fieldCls: "fieldinput",
              readOnly: false,
              enforceMaxLength: true,
              emptyText: "Tgl Dokumen",
              format: "Y-m-d",
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
            { header: "Kode", dataIndex: "KODE_JENIS_DOKUMEN", sortable: true, width: 50, filter: { xtype: "textfield" } },
            { header: "Jenis", dataIndex: "URAIAN_DOKUMEN", sortable: true, width: 250, filter: { xtype: "textfield" } },
            { header: "Nomor", dataIndex: "NOMOR_DOKUMEN", sortable: true, flex: 1, filter: { xtype: "textfield" } },
            { header: "Tanggal", dataIndex: "TANGGAL_DOKUMEN", sortable: true, width: 80, filter: { xtype: "textfield" } },
          ],
          listeners: {
            afterrender: function (grid, record, e) {
              var GRIDinput_dokumen = Ext.ComponentQuery.query("FRMbcout_27 grid[pid=GRIDbcout_27_input_dokumen]")[0];
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
