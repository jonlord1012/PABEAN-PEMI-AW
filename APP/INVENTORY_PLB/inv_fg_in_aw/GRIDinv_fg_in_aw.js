Ext.define("TDK.INVENTORY_AW.inv_fg_in_aw.GRIDinv_fg_in_aw", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDinv_fg_in_aw",
  reference: "GRIDinv_fg_in_aw",
  frame: false,
  border: false,
  autoScroll: true,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
  items: [
    {
      xtype: "grid",
      pid: "GRIDinv_fg_in_aw",
      emptyText: "No Matching Records",
      autoScroll: true,
      flex: 1,
      plugins: ["filterfield"],
      store: {
        autoLoad: true,
        remoteSort: true,
        remoteFilter: true,
        pageSize: 20,
        proxy: {
          type: "ajax",
          disableCaching: false,
          noCache: false,
          headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "inv_fg_in_aw/inv_fg_in_aws",
          extraParams: {
            method: "read_in_fg",
          },
          reader: {
            type: "json",
            rootProperty: "Rows",
            totalProperty: "TotalRows",
            successProperty: "success",
          },
        },
        listeners: {
          /* beforeload: function (store, operation, eOpts) {
            try {
              var vproddate = Ext.ComponentQuery.query("inv_fg_in_aw datefield[name=mainproduction_date]")[0];
              var CBO_FILTERKEY = Ext.ComponentQuery.query("inv_fg_in_aw combobox[name=CBO_FILTERKEY]")[0];

              operation.setParams({
                proddate: moment(vproddate.getValue()).format("YYYY-MM-DD"),
                cbo_filterkey: CBO_FILTERKEY.getValue(),
              });
            } catch (ex) {
              COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
            }
          }, */
        },
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
              icon: vconfig.getstyle + "icon/grid.png",
              handler: "btdetail_rows_click",
              tooltip: "Detail Dokumen",
            },
          ],
        },
        { header: "PROD DATE", dataIndex: "PROD_DATE", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "ARTICLE CODE", dataIndex: "ARTICLE_CODE", sortable: true, width: 200, filter: { xtype: "textfield" } },
        { header: "FINISH GOOD", dataIndex: "FG_CODE", sortable: true, width: 200, filter: { xtype: "textfield" } },
        { header: "MPQ", dataIndex: "STOCK_MPQ", renderer: "formatAmount", align: "right", sortable: true, width: 80, filter: { xtype: "textfield" } },
        { header: "QTY", dataIndex: "QTY_RECEIVE", renderer: "formatAmount", align: "right", sortable: true, width: 80, filter: { xtype: "textfield" } },
        { header: "AREA", dataIndex: "AREA", sortable: true, width: 100, filter: { xtype: "textfield" } },
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
