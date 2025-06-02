var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.EXIM.bcin_40.FRMbcin_40_kontainer", {
  extend: "Ext.window.Window",
  alias: "widget.FRMbcin_40_kontainer",
  reference: "FRMbcin_40_kontainer",
  title: "",
  modal: true,
  closeAction: "destroy",
  centered: true,
  //y: -110,
  bodyPadding: "5 5 5 5",
  width: mainpanel.getWidth() * 0.4,
  height: mainpanel.getHeight() * 0.6,
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
      height: 110,
      border: false,
      items: [
        {
          xtype: "container",
          layout: "hbox",
          items: [
            {
              xtype: "textfield",
              labelWidth: 100,
              width: 200,
              fieldLabel: "Nomor Kontainer",
              name: "kontainer_a",
              fieldCls: "fieldinput",
              readOnly: false,
              enforceMaxLength: true,
              maskRe: /[A-Z.]/,
              emptyText: "Capital",
            },
            { xtype: "textfield", labelWidth: 10, width: 200, name: "kontainer_b", fieldCls: "fieldinput", readOnly: false, enforceMaxLength: true, maskRe: /[0-9.]/, emptyText: "Only Number" },
          ],
        },
        {
          xtype: "container",
          layout: "hbox",
          items: [
            {
              xtype: "combobox",
              name: "cbo_kontainer_ukuran",
              fieldLabel: "Ukuran",
              labelWidth: 100,
              width: 320,
              displayField: "COMBO",
              valueField: "KODE_UKURAN_KONTAINER",
              fieldCls: "fieldinput",
              allowBlank: false,
              queryMode: "local",
              forceSelection: true,
              typeAhead: true,
              minChars: 0,
              anyMatch: true,
              store: new Ext.data.Store({
                autoLoad: true,
                remoteSort: false,
                remoteFilter: false,
                pageSize: 15,
                proxy: {
                  type: "ajax",
                  disableCaching: false,
                  noCache: false,
                  setHeaders: { Authorization: "Bearer " },
                  actionMethods: { read: "POST" },
                  url: vconfig.service_api + "kontainer_ukuran/kontainer_ukurans",
                  reader: new Ext.data.JsonReader(
                    {
                      type: "json",
                      rootProperty: "Rows",
                      totalProperty: "TotalRows",
                      successProperty: "success",
                    },
                    [
                      { name: "title", mapping: "topic_title" },
                      { name: "topicId", mapping: "topic_id" },
                      { name: "author", mapping: "author" },
                      { name: "lastPost", mapping: "post_time", type: "date", dateFormat: "timestamp" },
                      { name: "excerpt", mapping: "post_text" },
                    ]
                  ),
                },
              }),
            },
          ],
        },
        {
          xtype: "container",
          layout: "hbox",
          items: [
            {
              xtype: "combobox",
              name: "cbo_kontainer_type",
              fieldLabel: "Type",
              labelWidth: 100,
              width: 320,
              displayField: "COMBO",
              valueField: "KODE_TIPE_KONTAINER",
              fieldCls: "fieldinput",
              allowBlank: false,
              queryMode: "local",
              forceSelection: true,
              typeAhead: true,
              minChars: 0,
              anyMatch: true,
              store: new Ext.data.Store({
                autoLoad: true,
                remoteSort: false,
                remoteFilter: false,
                pageSize: 15,
                proxy: {
                  type: "ajax",
                  disableCaching: false,
                  noCache: false,
                  setHeaders: { Authorization: "Bearer " },
                  actionMethods: { read: "POST" },
                  url: vconfig.service_api + "kontainer_type/kontainer_types",
                  reader: new Ext.data.JsonReader(
                    {
                      type: "json",
                      rootProperty: "Rows",
                      totalProperty: "TotalRows",
                      successProperty: "success",
                    },
                    [
                      { name: "title", mapping: "topic_title" },
                      { name: "topicId", mapping: "topic_id" },
                      { name: "author", mapping: "author" },
                      { name: "lastPost", mapping: "post_time", type: "date", dateFormat: "timestamp" },
                      { name: "excerpt", mapping: "post_text" },
                    ]
                  ),
                },
              }),
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
              fieldLabel: "Keterangan",
              name: "kontainer_keterangan",
              fieldCls: "fieldinput",
              readOnly: false,
              enforceMaxLength: true,
              emptyText: "Keterangan",
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
          pid: "GRIDpopup_inputkontainer",
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
            { header: "ID", dataIndex: "ID", sortable: true, width: 120, filter: { xtype: "textfield" }, hidden: true },
            { xtype: "rownumberer", width: 20 },
            { header: "No Kontainer", dataIndex: "NOMOR_KONTAINER", sortable: true, width: 120, filter: { xtype: "textfield" } },
            { header: "Ukuran", dataIndex: "KODE_UKURAN_KONTAINER", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "Type", dataIndex: "KODE_TIPE_KONTAINER", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "Keterangan", dataIndex: "KETERANGAN", sortable: true, width: 100, filter: { xtype: "textfield" } },
          ],
          listeners: {
            afterrender: function (grid, record, e) {
              var GRIDinput_kontainer = Ext.ComponentQuery.query("FRMbcin_40 grid[pid=GRIDinput_kontainer]")[0];
              GRIDinput_kontainer.getStore().each(function (record) {
                grid.getStore().add(record.data);
              });
            },
          },
        },
      ],
    },
  ],
});
