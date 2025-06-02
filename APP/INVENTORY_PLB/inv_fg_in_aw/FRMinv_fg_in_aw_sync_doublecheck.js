var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.INVENTORY_AW.inv_fg_in_aw.FRMinv_fg_in_aw_sync_doublecheck", {
  extend: "Ext.window.Window",
  alias: "widget.FRMsync_doublecheck",
  reference: "FRMsync_doublecheck",
  title: "Synchronize Data Double Check",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: false,
  controller: "Cinv_fg_in_aw",
  //y: -110,
  width: mainpanel.getWidth() * 0.6,
  height: mainpanel.getHeight() * 0.7,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
  items: [
    {
      xtype: "grid",
      pid: "GRIDsync_doublecheck",
      emptyText: "No Matching Records",
      autoScroll: true,
      flex: 1,
      plugins: ["filterfield"],
      store: {
        autoLoad: true,
        remoteSort: false,
        remoteFilter: false,
        pageSize: 0,
        proxy: {
          type: "ajax",
          disableCaching: false,
          noCache: false,
          headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "inv_fg_in_aw/inv_fg_in_aws",
          extraParams: {
            method: "SP_FG_GET_DOUBLECHECK",
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
              var vproddate = Ext.ComponentQuery.query("FRMsync_doublecheck datefield[name=production_date]")[0];
              operation.setParams({
                proddate: moment(vproddate.getValue()).format("YYYY-MM-DD"),
                module: "list",
              });
            } catch (ex) {
              COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
            }
          },
        },
      },
      columns: [
        { xtype: "rownumberer", width: 50 },
        { header: "PROD DATE", dataIndex: "PROD_DATE", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "CONVEYOR", dataIndex: "CONVEYOR", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "ASSY CODE", dataIndex: "ASSYCODE", sortable: true, width: 200, filter: { xtype: "textfield" } },
        { header: "QTY", dataIndex: "QTY", renderer: "formatAmount", align: "right", sortable: true, width: 80, filter: { xtype: "textfield" } },
      ],
      bbar: {
        xtype: "pagingtoolbar",
        displayInfo: true,
        displayMsg: "Displaying topics {0} - {1} of {2}",
        emptyMsg: "No topics to display",
      },
    },
  ],
  dockedItems: [
    {
      xtype: "toolbar",
      dock: "top",
      items: [
        //
        "-",
        { xtype: "datefield", labelWidth: 90, fieldLabel: "Production Date", width: 190, name: "production_date", fieldCls: "fieldinput", format: "Y-m-d", readOnly: false, value: new Date() },
        "-",
        { xtype: "button", pid: "btrefresh", icon: vconfig.getstyle + "icon/update.ico", tooltip: "Refresh Data" },
        "-",
        {
          xtype: "button",
          text: "Proses Data",
          pid: "btproses_sync_doublecheck",
          icon: vconfig.getstyle + "icon/two%20displays.ico",
          tooltip: "Proses Sinkronisasi",
          handler: "btproses_sync_doublecheck_click",
        },
      ],
      // other options....
    },
  ],
});
