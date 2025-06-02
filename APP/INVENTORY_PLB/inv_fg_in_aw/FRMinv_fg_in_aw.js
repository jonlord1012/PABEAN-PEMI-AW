var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.INVENTORY_AW.inv_fg_in_aw.FRMinv_fg_in_aw", {
  extend: "Ext.window.Window",
  alias: "widget.FRMinv_fg_in_aw",
  reference: "FRMinv_fg_in_aw",
  title: "FINISH GOOD IN",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: false,
  controller: "Cinv_fg_in_aw",
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
                      module: "inv_fg_in_aw",
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
                    { xtype: "textfield", width: 250, name: "NOMOR_DAFTAR", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "Nomor Daftar" },
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
              items: [{ xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "Receiving No", name: "NOMOR_RCV", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "Nomor Receiving Auto" }],
            },
            {
              xtype: "container",
              layout: "hbox",
              items: [{ xtype: "datefield", labelWidth: 100, width: 220, fieldLabel: "TGL Receiving", name: "TANGGAL_RCV", fieldCls: "fieldinput", readOnly: false, format: "Y-m-d", value: new Date() }],
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
          pid: "GRIDFRMinv_fg_in_aw",
          emptyText: "No Matching Records",
          flex: 1,
          plugins: [
            "filterfield",
            {
              ptype: "cellediting",
              clicksToEdit: 1,
            },
          ],
          columns: [
            { xtype: "rownumberer", width: 50 },
            {
              text: "Dokumen",
              columns: [
                { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "INVOICE", dataIndex: "INVOICE_NO" },
                { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "COUNTRY", dataIndex: "COUNTRY_OF" },
                { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "CAUPRI", dataIndex: "CAUPRI" },
                { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "PART NO", dataIndex: "PART_NO" },
                { sortable: true, width: 250, filter: { xtype: "textfield" }, header: "PART NAME", dataIndex: "PART_NAME" },
                { sortable: true, width: 50, filter: { xtype: "textfield" }, header: "UOM", dataIndex: "PART_UOM" },
                { sortable: true, width: 80, align: "right", renderer: "formatqty", header: "PRICE", dataIndex: "PRICE" },
              ],
            },
            {
              text: "Qty",
              columns: [
                { sortable: true, width: 100, align: "right", renderer: "formatqty", header: "QTY", dataIndex: "TOTAL_QTY" },
                { sortable: true, width: 100, align: "right", renderer: "formatqty", header: "RECEIPT", dataIndex: "RCV_IN" },
                { sortable: true, width: 100, align: "right", renderer: "formatqty", header: "SISA", dataIndex: "RCV_SISA" },
                {
                  header: "INPUT",
                  dataIndex: "RCV_INPUT",
                  sortable: true,
                  width: 80,
                  tdCls: "fieldinput",
                  align: "right",
                  renderer: "formatqty",
                  editor: {
                    xtype: "numberfield",
                    hidetriger: true,
                    margin: "0 0 0 0",
                    name: "INPDESC",
                    allowBlank: false,
                  },
                },
              ],
            },
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
            {
              xtype: "checkbox",
              boxLabel: "Select All Item/Part Receipt",
              name: "select_all_item",
              hideLabel: true,
              checked: false,
              handler: "select_all_item_change",
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
        { xtype: "tbspacer", width: 10 },
        {
          xtype: "button",
          text: "Save",
          pid: "FRMinv_fg_in_aw_btsave",
          icon: vconfig.getstyle + "icon/save.gif",
          tooltip: "Save Data",
          handler: "FRMinv_fg_in_aw_btsave_click",
        },
      ],
    },
  ],
});
