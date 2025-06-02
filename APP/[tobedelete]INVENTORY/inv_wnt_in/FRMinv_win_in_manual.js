var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.INVENTORY.inv_wnt_in.FRMinv_wnt_in_manual", {
  extend: "Ext.window.Window",
  alias: "widget.FRMinv_wnt_in_manual",
  reference: "FRMinv_wnt_in_manual",
  title: "Receiving W&T from Document BC",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: true,
  controller: "Cinv_wnt_in",
  //y: -110,
  bodyPadding: "5 5 5 5",
  width: mainpanel.getWidth() * 0.9,
  height: mainpanel.getHeight() * 0.9,
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
      border: false,
      layout: { type: "hbox", pack: "start", align: "stretch" },
      items: [
        {
          xtype: "container",
          layout: "vbox",
          flex: 1,
          items: [
            {
              xtype: "container",
              width: 600,
              layout: "vbox",
              items: [
                {
                  xtype: "container",
                  layout: "hbox",
                  items: [
                    {
                      xtype: "combobox",
                      name: "CBO_SOURCE",
                      fieldLabel: "Sumber Data",
                      labelWidth: 100,
                      width: 300,
                      displayField: "DEFNAME",
                      valueField: "DEFCODE",
                      fieldCls: "fieldinput",
                      allowBlank: false,
                      queryMode: "local",
                      forceSelection: true,
                      typeAhead: true,
                      minChars: 0,
                      anyMatch: true,
                      value: "30",
                      store: new Ext.data.Store({
                        data: [
                          { DEFCODE: "coo", DEFNAME: "Sumber Data COO" },
                          { DEFCODE: "kurir", DEFNAME: "Sumber Data KURIR" },
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
                    { xtype: "datefield", labelWidth: 100, width: 220, fieldLabel: "Tgl & No Aju", name: "TANGGAL_AJU", fieldCls: "fieldlock", readOnly: true, format: "Y-m-d" },
                    { xtype: "textfield", width: 250, name: "NOMOR_AJU", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "Nomor Aju" },
                    {
                      xtype: "button",
                      pid: "btsearch",
                      module: "inv_wnt_in",
                      popupwidth: 900,
                      tofield: {
                        ID_HEADER_ORI: "ID_HEADER_ORI",
                        NOMOR_AJU: "NOMOR_AJU",
                        DOKUMEN: "URAIAN_DOKUMEN",
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
                    { xtype: "datefield", labelWidth: 100, width: 220, fieldLabel: "Tgl & No Daftar", name: "TANGGAL_DAFTAR", fieldCls: "fieldlock", readOnly: true, format: "Y-m-d" },
                    { xtype: "textfield", width: 170, name: "NOMOR_DAFTAR", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "Nomor Daftar" },
                    { xtype: "textfield", width: 70, name: "BC_TYPE", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "BC TYPE" },
                  ],
                },
              ],
            },
          ],
        },
        { xtype: "tbspacer", width: 5 },
        {
          xtype: "container",
          layout: "vbox",
          flex: 1,
          items: [
            {
              xtype: "container",
              layout: "hbox",
              items: [
                { xtype: "textfield", labelWidth: 100, width: 160, fieldLabel: "Supplier", name: "KODE_INTERNAL", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "Kode" },
                { xtype: "textfield", width: 350, name: "SUPPLIER", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "Nama Supplier" },
              ],
            },
            {
              xtype: "container",
              layout: "hbox",
              items: [
                { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "Receiving No", name: "NOMOR_RCV", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "Nomor Receiving Auto" },
                { xtype: "datefield", labelWidth: 100, width: 220, fieldLabel: "TGL Receiving", name: "TANGGAL_RCV", fieldCls: "fieldinput", readOnly: false, format: "Y-m-d", value: new Date() },
              ],
            },
            {
              xtype: "container",
              layout: "hbox",
              items: [
                { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "No Faktur", name: "NOMOR_FAKTUR", fieldCls: "fieldinput", readOnly: false, enforceMaxLength: true, emptyText: "Nomor Faktur" },
                { xtype: "datefield", labelWidth: 100, width: 220, fieldLabel: "TGL Faktur", name: "TANGGAL_FAKTUR", fieldCls: "fieldinput", readOnly: false, format: "Y-m-d", value: "" },
              ],
            },
          ],
        },
      ],
    },
    { xtype: "tbspacer", height: 10 },
    {
      xtype: "container",
      layout: { type: "hbox", pack: "start", align: "stretch" },
      flex: 1,
      items: [
        {
          xtype: "grid",
          pid: "GRIDFRMinv_wnt_in",
          emptyText: "No Matching Records",
          flex: 1,
          plugins: ["filterfield"],
          viewConfig: {
            enableTextSelection: true,
          },
          columns: [
            { xtype: "rownumberer", width: 50 },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "INVOICE", dataIndex: "INVOICE_NO" },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "PART NO", dataIndex: "PART_NO" },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "PART MAPPING", dataIndex: "MAPP_PARTNO" },
            { sortable: true, width: 250, filter: { xtype: "textfield" }, header: "PART NAME", dataIndex: "PART_NAME" },
            { sortable: true, width: 100, align: "right", renderer: "formatqty", header: "QTY", dataIndex: "TOTAL_QTY" },
            { sortable: true, width: 100, align: "right", renderer: "formatqty", header: "RECEIPT", dataIndex: "RECEIPT_QTY" },
            { sortable: true, width: 100, align: "right", renderer: "formatqty", header: "SISA", dataIndex: "SISA_QTY" },
            { sortable: true, width: 100, align: "right", renderer: "formatqty", header: "INPUT", dataIndex: "INPUT_QTY" },
          ],
          bbar: {
            xtype: "pagingtoolbar",
            displayInfo: true,
            displayMsg: "Displaying topics {0} - {1} of {2}",
            emptyMsg: "No topics to display",
          },
          tbar: [
            {
              xtype: "displayfield",
              value: "menampilkan Item/Part dalam 1 dokumen",
            },
            "->",
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
        { xtype: "tbspacer", width: 10 },
        {
          xtype: "button",
          text: "Save",
          pid: "FRMinv_wnt_in_btsave",
          icon: vconfig.getstyle + "icon/save.gif",
          tooltip: "Save Data",
          handler: "FRMinv_wnt_in_btsave_click",
        },
      ],
    },
  ],
});
