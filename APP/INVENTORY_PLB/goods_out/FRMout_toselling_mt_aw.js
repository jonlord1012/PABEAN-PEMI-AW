var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.INVENTORY_PLB.goods_out.FRMout_toselling_mt_aw", {
  extend: "Ext.window.Window",
  alias: "widget.FRMout_toselling_mt_aw",
  reference: "FRMout_toselling_mt_aw",
  title: "Out To Selling",
  modal: true,
  closeAction: "hide",
  centered: true,
  autoScroll: false,
  controller: "Cgoods_out",
  //y: -110,
  bodyPadding: "5 5 5 5",
  width: mainpanel.getWidth() * 0.6,
  height: mainpanel.getHeight() * 0.8,
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
                    { xtype: "textfield", labelWidth: 80, width: 300, fieldLabel: "Doc No", name: "OUT_NO", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "Nomor Dokumen Out" },
                    { xtype: "datefield", labelWidth: 80, width: 220, fieldLabel: "Selling Date", name: "TANGGAL_OUT", fieldCls: "fieldinput", readOnly: false, format: "Y-m-d", value: "", maxValue: new Date() },
                  ],
                },
                {
                  xtype: "container",
                  layout: "hbox",
                  items: [{ xtype: "textfield", labelWidth: 80, width: 300, fieldLabel: "Kategori", name: "OUT_KATEGORI", fieldCls: "fieldinput", readOnly: true, enforceMaxLength: true, value: "TO SELLING", emptyText: "Kategori" }],
                },
                {
                  xtype: "container",
                  layout: "hbox",
                  items: [
                    { xtype: "textfield", labelWidth: 80, width: 300, fieldLabel: "No BA", name: "BAP_NO", fieldCls: "fieldinput", readOnly: false, enforceMaxLength: true, value: "", emptyText: "No Berita Acara" },
                    { xtype: "datefield", labelWidth: 55, width: 165, fieldLabel: "BA Date", name: "BAP_DATE", fieldCls: "fieldinput", readOnly: false, format: "Y-m-d", value: "", maxValue: new Date() },
                  ],
                },
                {
                  xtype: "container",
                  layout: "hbox",
                  items: [{ xtype: "textarea", labelWidth: 80, width: 475, fieldLabel: "Remark", name: "OUT_REMARK", fieldCls: "fieldinput", readOnly: false, enforceMaxLength: true, value: "", emptyText: "Catatan" }],
                },
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
          pid: "GRIDout_toselling_mt_aw",
          emptyText: "No Matching Records",
          flex: 1,
          plugins: [
            "filterfield",
            {
              ptype: "cellediting",
              clicksToEdit: 1,
            },
          ],
          viewConfig: {
            enableTextSelection: true,
          },
          store: {
            fields: [
              { name: "INVOICE_NO", type: "string" },
              { name: "MAPP_PARTNO", type: "string" },
              { name: "PART_NO", type: "string" },
              { name: "PART_NAME", type: "string" },
              { name: "SISA_QTY", type: "float" },
              { name: "INPUT_QTY", type: "float" },
            ],
          },
          columns: [
            { xtype: "rownumberer", width: 50 },
            {
              xtype: "actioncolumn",
              width: 35,
              align: "center",
              menuDisabled: true,
              sortable: false,
              items: [
                {
                  icon: vconfig.getstyle + "icon/delete.ico",
                  handler: function (cmp, rec) {
                    var grid = cmp;
                    grid.getStore().removeAt(rec);
                    grid.getStore().commitChanges();
                  },
                  tooltip: "Cancel Item Part",
                },
              ],
            },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "INVOICE", dataIndex: "INVOICE_NO" },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "PART MAPPING", dataIndex: "MAPP_PARTNO" },
            { sortable: true, width: 250, filter: { xtype: "textfield" }, header: "PART NAME", dataIndex: "PART_NAME" },
            { sortable: true, width: 100, align: "right", renderer: "formatqty", header: "STOCK", dataIndex: "SISA_QTY" },
            {
              sortable: true,
              width: 100,
              align: "right",
              renderer: "formatqty",
              header: "INPUT",
              dataIndex: "INPUT_QTY",
              tdCls: "fieldinput",
              editor: {
                xtype: "numberfield",
                margin: "0 0 0 0",
                name: "INPUT_QTY",
                allowBlank: false,
                minValue: 0,
                hideTrigger: true,
              },
            },
          ],
          bbar: {
            xtype: "pagingtoolbar",
            displayInfo: true,
            displayMsg: "Displaying topics {0} - {1} of {2}",
            emptyMsg: "No topics to display",
          },
          tbar: [
            //
            "-",
            { xtype: "tbspacer", width: 10 },
            { xtype: "button", text: "Pilih Item/Part", pid: "out_toselling_btselectpart", icon: vconfig.getstyle + "icon/add%20row.ico", tooltip: "Pilih Item Part/Material" },
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
        { xtype: "button", text: "Save", pid: "FRMout_toselling_mt_aw_btsave", icon: vconfig.getstyle + "icon/save.gif", tooltip: "Save Data" },
      ],
    },
  ],
  listeners: {
    afterlayout: function (cmp) {
      try {
        var FRM = cmp.query("form")[0];
        var GRID = cmp.query("grid")[0];
        GRID.getStore().removeAll();
        GRID.getStore().commitChanges();
        FRM.getForm().reset();
      } catch (ex) {
        COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      }
    },
  },
});
