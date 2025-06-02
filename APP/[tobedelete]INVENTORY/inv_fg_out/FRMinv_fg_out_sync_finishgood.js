var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.INVENTORY.inv_fg_out.FRMinv_fg_out_sync_finishgood", {
  extend: "Ext.window.Window",
  alias: "widget.FRMinv_fg_out_sync_finishgood",
  reference: "FRMinv_fg_out_sync_finishgood",
  title: "Synchronize Data Finish Good",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: true,
  controller: "Cinv_fg_out",
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
          url: vconfig.service_api + "inv_fg_out/inv_fg_outs",
          extraParams: {
            method: "SP_INV_FG_OUT",
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
              var vproddate = Ext.ComponentQuery.query("FRMinv_fg_out_sync_finishgood datefield[name=RegisterDate]")[0];
              operation.setParams({
                fgdate: moment(vproddate.getValue()).format("YYYY-MM-DD"),
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
        { header: "OUT DATE", dataIndex: "OUT_DATE", sortable: true, width: 80, filter: { xtype: "textfield" } },
        { header: "SA NO", dataIndex: "SA_NO", sortable: true, width: 200, filter: { xtype: "textfield" } },
        { header: "ASSY NO", dataIndex: "ASSY_NO", sortable: true, width: 180, filter: { xtype: "textfield" } },
        { header: "ASSY CODE", dataIndex: "ASSY_CODE", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "CARLINE", dataIndex: "CARLINE", sortable: true, width: 200, filter: { xtype: "textfield" } },
        { header: "PALLET NO", dataIndex: "PALLET_NO", sortable: true, width: 200, filter: { xtype: "textfield" } },
        { header: "POLY NO", dataIndex: "POLY_NO", sortable: true, width: 200, filter: { xtype: "textfield" } },
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
