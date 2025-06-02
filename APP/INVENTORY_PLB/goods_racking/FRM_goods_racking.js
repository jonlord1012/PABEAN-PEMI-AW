var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.INVENTORY_PLB.goods_racking.FRM_goods_racking", {
  extend: "Ext.window.Window",
  alias: "widget.FRM_goods_racking",
  reference: "FRM_goods_racking",
  title: "Racking from BINLOC",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: false,
  controller: "Cgoods_racking",
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
        /* {
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
                      labelWidth: 150,
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
                          { DEFCODE: "binloc", DEFNAME: "Sumber Data BINLOC" },
                          { DEFCODE: "manual", DEFNAME: "Sumber Data Manual" },
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
                    { xtype: "datefield", labelWidth: 150, width: 230, fieldLabel: "Tgl RECEIPT & No INVOICE", name: "RECEIPT_DATE", fieldCls: "fieldlock", readOnly: true, format: "Y-m-d" },
                    { xtype: "textfield", width: 250, name: "INVOICE_NO", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "INVOICE NO" },
                    {
                      xtype: "button",
                      pid: "btsearch",
                      module: "goods_racking",
                      popupwidth: 900,
                      tofield: {
                        RECEIPT_DATE: "RECEIPT_DATE",
                        INVOICE_NO: "INVOICE_NO",
                      },
                      icon: vconfig.getstyle + "icon/search.ico",
                      tooltip: "search",
                    },
                  ],
                },

              ],
            },

          ],
        },*/
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
                { xtype: "textfield", labelWidth: 100, width: 220, fieldLabel: "RACK NO", pid:"RACK_ID", name: "RACK_ID", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "RACK ID" },
                { xtype: "textfield", width: 250, name: "RACK_NAME", fieldCls: "fieldlock", readOnly: true, pid:"RACK_NAME",  enforceMaxLength: true, emptyText: "RACK DESC" },
                {
                  xtype: "button",
                  pid: "btsearch_rack",
                  module: "goods_racking",
                  popupwidth: 900,
                  tofield: {
                    RACK_ID: "RACK_ID",
                    RACK_NAME: "RACK_NAME",
                  },
                  icon: vconfig.getstyle + "icon/search.ico",
                  tooltip: "search",
                },
              ],
            },
          ],
        }
      ],
    },
    { xtype: "tbspacer", height: 10 },
    {
      xtype: "grid",
      pid: "GRIDFRM_good_picking_list",
      emptyText: "No Matching Records",
      flex: 1,

      store: {
        fields: [
          { name: "LOT_NO", type: "string" },
          { name: "QTY_PICKING", type: "string" },
          { name: "CURRENT_RACK", type: "string" },
          { name: "CUSTOMER_INVOICE", type: "string" },
        ],
      },
      plugins: ["filterfield"],
      viewConfig: {
        enableTextSelection: true,
      },
      columns: [
        {
          xtype: "actioncolumn",
          width: 35,
          align: "center",
          menuDisabled: true,
          sortable: false,
          items: [
            {
              icon: vconfig.getstyle + "icon/delete.ico",
              tooltip: "Hapus Data",
              handler: function (xgrid, rowIndex, colIndex, e, a, rec) {
                try {
                  console.log(rec);
                  Ext.MessageBox.confirm(
                    "Konfirmasi",
                    "Konfirmasi Hapus Dokumen:" + rec.data.LOT_NO,
                    function (button) {
                      if (button === "yes") {
                        xgrid.getStore().removeAt(rowIndex);
                        xgrid.getStore().commitChanges();
                      }
                    },
                    this
                  );
                } catch (ex) {
                  COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                }
              },
            },
          ],
        },
        { xtype: "rownumberer", width: 50 },
        { header: "LOT NO", dataIndex: "LOT_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "CURRENT RACK", dataIndex: "CURRENT_RACK", sortable: true, width: 200, filter: { xtype: "textfield" } },
        { header: "INVOICE NO", dataIndex: "CUSTOMER_INVOICE", sortable: true, width: 150, filter: { xtype: "textfield", format: "Y-m-d" } },
        { header: "QTY", dataIndex: "QTY_PICKING", sortable: true, width: 100,  filter: { xtype: "textfield" } },
        /*
        { header: "KODE BARANG", dataIndex: "KODE_BARANG_INVOICE", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "LOT", dataIndex: "KODE_LOT", sortable: true, width: 100, filter: { xtype: "textfield" } }, */
      ],
      tbar: [
        {
          xtype: "button",
          pid: "btsearch_lot",
          text: "Pilih Lot",
          icon: vconfig.getstyle + "icon/search.ico",
          tooltip: "Pilih Lot",
          handler: "btsearch_lot_click",
        },
      ],
      listeners: {
        //afterrender: "goods_picking_list_load",
      },
    },
    /*
    {
      xtype: "container",
      layout: { type: "hbox", pack: "start", align: "stretch" },
      flex: 1,
      items: [
        {
          xtype: "grid",
          pid: "GRIDFRM_goods_racking",
          emptyText: "No Matching Records",
          flex: 1,
          autoLoad: false,
          remoteSort: true,
          remoteFilter: true,
          pageSize: 25,
          plugins: ["filterfield"],
          viewConfig: {
            enableTextSelection: true,
          },
          columns: [
            { xtype: "rownumberer", width: 50 },

            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "INVOICE NO", dataIndex: "INVOICE_NO" },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "ARTICLE CODE", dataIndex: "ARTICLE_CODE" },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "LOT NO", dataIndex: "LOT_NO" },
            { sortable: true, width: 100, align: "right", renderer: "formatqty", header: "QTY", dataIndex: "PUTAWAY_QTY" },
            { sortable: true, width: 100, align: "right", header: "CURRENT RACK", dataIndex: "CURRENT_RACK" },
          ],

          tbar: [
            {
              xtype: "displayfield",
              value: "menampilkan Item/Part dalam 1 dokumen",
            },
            "->",
          ],
        },
      ],
    }, */ 
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
          pid: "FRM_goods_racking_btsave",
          icon: vconfig.getstyle + "icon/save.gif",
          tooltip: "Save Data",
          handler: "FRM_goods_racking_btsave_click",
        },
      ],
    },
  ],
});
