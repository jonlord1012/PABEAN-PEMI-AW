Ext.define("NJC.REPORTS_PLB.ext_rpt_stock_card.GRIDext_rpt_stock_card", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDext_rpt_stock_card",
  reference: "GRIDext_rpt_stock_card",
  frame: false,
  border: true,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
  fieldDefaults: {
    labelAlign: "left",
    labelWidth: 90,
    margin: "0 10 5 0",
  },
  items: [
    {
      xtype: "grid",
      pid: "GRIDext_rpt_stock_card",
      emptyText: "No Matching Records",
      plugins: ["filterfield", "gridexporter"],
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
          url: vconfig.service_api + "ext_rpt_stock_card/ext_rpt_stock_cards",
          extraParams: {
            method: "read_to_grid",
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
              //var VIDCOMPANY = Ext.ComponentQuery.query("ext_rpt_stock_card combobox[name=CBO_COMPANY]")[0];
              var VFROMDATE = Ext.ComponentQuery.query("ext_rpt_stock_card datefield[name=tfromdate]")[0];
              var VTODATE = Ext.ComponentQuery.query("ext_rpt_stock_card datefield[name=ttodate]")[0];
              var ARTICLE_CODE = Ext.ComponentQuery.query("ext_rpt_stock_card textfield[name=article_code]")[0];
              var VARTICLE_CODE = ARTICLE_CODE.getValue();

              operation.setParams({
                //VCBO_COMPANY: VIDCOMPANY.getValue(),
                VFROMDATE: moment(VFROMDATE.getValue()).format("YYYY-MM-DD"),
                VTODATE: moment(VTODATE.getValue()).format("YYYY-MM-DD"),
                VARTICLECODE: VARTICLE_CODE,
              });
            } catch (ex) {
              COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
            }
          },
        },
        fields: [
          { name: "ARTICLE_CODE", type: "string" },
          { name: "PART_NAME", type: "string" },
          { name: "PART_CODE", type: "string" },
          { name: "QTY_IN", type: "float" },
          { name: "QTY_OUT", type: "float" },
          { name: "STOCK_BALANCE", type: "float" },
        ],


      },
      viewConfig: {
        enableTextSelection: true,
      },
      columns: [
        { xtype: "rownumberer", width: 40 },
        {
          xtype: "actioncolumn",
          width: 35,
          align: "center",
          menuDisabled: true,
          sortable: false,
          items: [
            {
              icon: vconfig.getstyle + "icon/grid.png",
              handler: "btdetail_rows_click",
              tooltip: "Detail Dokumen",
            },
          ],
        },
        { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "ARTICLE CODE ", dataIndex: "ARTICLE_CODE" },
        { sortable: true, width: 200, filter: { xtype: "textfield" }, header: "PART CODE", dataIndex: "PART_CODE" },
        { sortable: true, width: 250, filter: { xtype: "textfield" }, header: "PART NAME ", dataIndex: "PART_NAME" },
        { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "UOM ", dataIndex: "UOM" },
        { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "MPQ", dataIndex: "MPQ", renderer: "formatAmount" },
        { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "UOM MPQ", dataIndex: "UOM_MPQ" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "QTY IN", dataIndex: "QTY_IN", renderer: "formatAmount", sortType: 'asFloat', },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "QTY OUT", dataIndex: "QTY_OUT", renderer: "formatAmount", sortType: 'asFloat', },
        { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "LAST IN", dataIndex: "LAST_IN_DATE", renderer: "formatDate" },
        { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "LAST OUT", dataIndex: "LAST_OUT_DATE", renderer: "formatDate" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "BALANCE", dataIndex: "STOCK_BALANCE", sortType: 'asFloat', },
      ],
      bbar: {
        xtype: "pagingtoolbar",
        displayInfo: true,
        displayMsg: "Displaying topics {0} - {1} of {2}",
        emptyMsg: "No topics to display",
      },
    },
  ],
});
