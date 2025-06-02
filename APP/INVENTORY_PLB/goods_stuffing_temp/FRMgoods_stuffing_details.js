var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.INVENTORY_PLB.goods_stuffing.FRMgoods_stuffing_details", {
  extend: "Ext.window.Window",
  alias: "widget.FRMgoods_stuffing_details",
  reference: "FRMgoods_stuffing_details",
  title: "Stuffing Goods for Delivery",
  modal: true,
  closeAction: 'destroy',
  centered: true,
  autoScroll: false,
  controller: "Cgoods_stuffing",
  //y: -110,
  //bodyPadding: "5 5 5 5",
  width: mainpanel.getWidth() * 0.9,
  height: mainpanel.getHeight() * 0.9,
  //flex: 1,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF; margin:5px 5px 5px 5px;",
  items: [
    {
      xtype: "container",
      layout: { type: "hbox", pack: "start", align: "stretch" },
      flex: 1,
      style: { margin: '5px 30px 30px 0' },
      items: [
        {
          xtype: "container",
          layout: { type: "hbox", pack: "start", align: "stretch" },
          flex: 1,
          items: [
            {
              xtype: "container",
              layout: { type: "vbox", pack: "start", align: "stretch" },
              flex: 1,
              items: [
                {
                  xtype: "container",
                  layout: { type: "vbox", pack: "start", align: "stretch" },
                  items: [
                    {
                      xtype: "label",
                      html: "<b>Delivery Instruction Number: <span style='color:red;'>XXXXX</span></b>",
                      height: 30,
                    },
                  ]
                },
                {
                  xtype: "grid",
                  pid: "GRIDFRM_goods_stuffing",
                  emptyText: "No Matching Records",
                  flex: 1,
                  plugins: ["filterfield"],
                  viewConfig: {
                    enableTextSelection: true,
                  },
                  store: {
                    autoLoad: true,
                    remoteSort: false,
                    remoteFilter: true,
                    pageSize: 0,
                    proxy: {
                      type: "ajax",
                      disableCaching: false,
                      noCache: false,

                      headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
                      actionMethods: { read: "POST" },
                      url: vconfig.service_api + "goods_stuffing/goods_stuffings",
                      extraParams: {
                        method: "read_detail_delivery_instruction",
                        module: "goods_stuffing",
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
                          var GRID = Ext.ComponentQuery.query("goods_stuffing GRIDgoods_stuffing grid[pid=GRIDgoods_stuffing]")[0];
                          var docNo = GRID.getSelectionModel().getSelection()[0].data.DOCUMENT_NO;
                          operation.setParams({
                            DOCUMENT_NO: docNo,
                          });
                        } catch (ex) {
                          COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                        }
                      },
                    },
                  },
                  columns: [
                    { xtype: "rownumberer", width: 50 },
                    { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "DOCUMENT NO", dataIndex: "DOCUMENT_NO" },
                    { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "DOCUMENT DATE", dataIndex: "DOCUMENT_DATE" },
                    { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "ARTICLE CODE", dataIndex: "ARTICLE_CODE" },
                    { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "PART NAME", dataIndex: "PART_NAME" },
                    { sortable: true, width: 100, align: "right", renderer: "formatqty", header: "QTY", dataIndex: "QTY" },
                    { sortable: true, width: 100, align: "right", renderer: "formatqty", header: "MPQ", dataIndex: "PART_MPQ" },
                  ],
                  /*
                                    bbar: {
                                      xtype: "pagingtoolbar",
                                      displayInfo: true,
                                      displayMsg: "Displaying topics {0} - {1} of {2}",
                                      emptyMsg: "No topics to display",
                                    },
                  */
                },
              ],
            },
            { xtype: "tbspacer", width: 5 },
            {
              xtype: "container",
              layout: { type: "vbox", pack: "start", align: "stretch" },
              flex: 1,
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
                  items: [{
                    xtype: "container",
                    layout: "hbox",
                    height: 30,
                    items: [
                      { xtype: "datefield", labelWidth: 150, width: 230, fieldLabel: "PICKING DATE & NO", name: "PICKING_DATE", fieldCls: "fieldlock", readOnly: true, format: "Y-m-d" },
                      { xtype: "tbspacer", width: 10 },
                      { xtype: "textfield", width: 250, name: "PICKING_NO", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "NO BUKTI" },
                      {
                        xtype: "button",
                        pid: "btsearch",
                        module: "goods_stuffing",
                        popupwidth: 900,
                        /*tofield: {
                          PICKING_DATE: "PICKING_DATE",
                          PICKING_NO: "PICKING_NO",
                        },*/
                        icon: vconfig.getstyle + "icon/search.ico",
                        tooltip: "search",
                      },
                    ],
                  },
                  ],
                },
                {
                  xtype: "grid",
                  pid: "GRIDFRM_goods_picking",
                  emptyText: "No Matching Records",
                  flex: 1,
                  plugins: ["filterfield"],
                  viewConfig: {
                    enableTextSelection: true,
                  },
                  columns: [
                    { xtype: "rownumberer", width: 50 },
                    { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "DOCUMENT NO", dataIndex: "DOCUMENT_NO" },
                    { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "DOCUMENT DATE", dataIndex: "DOCUMENT_DATE" },
                    { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "ARTICLE CODE", dataIndex: "ARTICLE_CODE" },
                    { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "PART NAME", dataIndex: "PART_NAME" },
                    { sortable: true, width: 100, align: "right", renderer: "formatqty", header: "QTY", dataIndex: "QTY" },
                    { sortable: true, width: 100, align: "right", renderer: "formatqty", header: "MPQ", dataIndex: "PART_MPQ" },
                  ],
                  bbar: {
                    xtype: "pagingtoolbar",
                    displayInfo: true,
                    displayMsg: "Displaying topics {0} - {1} of {2}",
                    emptyMsg: "No topics to display",
                  },
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
      items: [
        {
          xtype: "container",
          layout: "hbox",
          items: [
            { xtype: "tbspacer", text: "|" },
            {
              xtype: "button",
              text: "Save",
              pid: "FRM_goods_stuffing_btsave",
              icon: vconfig.getstyle + "icon/save.gif",
              tooltip: "Save Data",
            },
          ]
        }

      ],
    },
  ],
  /*
  bbar: [{
    text: 'Close',
    handler: function (bt) {
      bt.up('window').close();
    },
  }],
  
  listeners: {
    destroy: function () {
      var GRID = Ext.ComponentQuery.query("goods_stuffing GRIDgoods_stuffing grid[pid=GRIDgoods_stuffing]")[0];
      GRID.getStore().load();
    },
  },*/
});
