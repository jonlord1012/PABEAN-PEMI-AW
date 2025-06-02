var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.INVENTORY.inv_fg_in.FRMinv_fg_in_sync_finishgood", {
  extend: "Ext.window.Window",
  alias: "widget.FRMinv_fg_in_sync_finishgood",
  reference: "FRMinv_fg_in_sync_finishgood",
  title: "Synchronize Data Finish Good",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: true,
  controller: "Cinv_fg_in",
  //y: -110,
  width: mainpanel.getWidth() * 0.6,
  height: mainpanel.getHeight() * 0.7,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
  items: [
    {
      xtype: "grid",
      pid: "GRIDsync_finishgood",
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
          url: vconfig.service_api + "inv_fg_in/inv_fg_ins",
          extraParams: {
            method: "SP_INV_FG_IN",
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
              var vfg_date = Ext.ComponentQuery.query("FRMinv_fg_in_sync_finishgood datefield[name=finishgood_date]")[0];
              operation.setParams({
                fgdate: moment(vfg_date.getValue()).format("YYYY-MM-DD"),
                module: "read",
              });
            } catch (ex) {
              COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
            }
          },
        },
      },
      columns: [
        { xtype: "rownumberer", width: 50 },
        { header: "IN DATE", dataIndex: "FGIN_DATE", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "ASSY NO", dataIndex: "ASSY_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "ASSY CODE", dataIndex: "ASSY_CODE", sortable: true, width: 80, filter: { xtype: "textfield" } },
        { header: "CARLINE", dataIndex: "CARLINE", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "PALLET NO", dataIndex: "PALLET_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "POLY NO", dataIndex: "POLY_NO", sortable: true, width: 120, filter: { xtype: "textfield" } },
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
        { xtype: "datefield", labelWidth: 90, fieldLabel: "Finish Good Date", width: 190, name: "finishgood_date", fieldCls: "fieldinput", format: "Y-m-d", readOnly: false, value: new Date() },
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
