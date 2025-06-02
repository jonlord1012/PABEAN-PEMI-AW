var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.INVENTORY.inv_fg_return.FRMinv_fg_return_sync_finishgood", {
  extend: "Ext.window.Window",
  alias: "widget.FRMsync_return",
  reference: "FRMsync_return",
  title: "Synchronize Data Finish Good",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: true,
  controller: "Cinv_fg_return",
  //y: -110,
  width: mainpanel.getWidth() * 0.6,
  height: mainpanel.getHeight() * 0.7,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
  items: [
    {
      xtype: "grid",
      pid: "GRIDsync_return",
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
          url: vconfig.service_api + "inv_fg_return/inv_fg_returns",
          extraParams: {
            method: "SP_FG_GET_FINISHGOOD",
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
              var vproddate = Ext.ComponentQuery.query("FRMsync_return datefield[name=RegisterDate]")[0];
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
        { header: "FINISH GOOD DATE", dataIndex: "RegisterDate", sortable: true, width: 200, filter: { xtype: "textfield" } },
        { header: "ASSY NO", dataIndex: "AssyNo", sortable: true, width: 180, filter: { xtype: "textfield" } },
        { header: "ASSY CODE", dataIndex: "AssyCode", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "CARLINE", dataIndex: "Carline", sortable: true, width: 200, filter: { xtype: "textfield" } },
        { header: "PALLET NO", dataIndex: "PalletNo", sortable: true, width: 200, filter: { xtype: "textfield" } },
        { header: "POLY NO", dataIndex: "PolyNo", sortable: true, width: 200, filter: { xtype: "textfield" } },
        { header: "QTY", dataIndex: "NM_Receipt", renderer: "formatAmount", align: "right", sortable: true, width: 80, filter: { xtype: "textfield" } },
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
        { xtype: "datefield", labelWidth: 90, fieldLabel: "Finish Good Date", width: 190, name: "RegisterDate", fieldCls: "fieldinput", format: "Y-m-d", readOnly: false, value: new Date() },
        "-",
        { xtype: "button", pid: "btrefresh", icon: vconfig.getstyle + "icon/update.ico", tooltip: "Refresh Data" },
        "-",
        {
          xtype: "button",
          text: "Proses Data",
          pid: "btproses_sync_finishgood",
          icon: vconfig.getstyle + "icon/two%20displays.ico",
          tooltip: "Proses Sinkronisasi",
          handler: "btproses_sync_finishgood_click",
        },
      ],
      // other options....
    },
  ],
});
