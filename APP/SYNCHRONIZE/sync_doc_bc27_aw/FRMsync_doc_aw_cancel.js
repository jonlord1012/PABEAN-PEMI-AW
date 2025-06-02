var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.SYNCHRONIZE.sync_doc_aw.FRMsync_doc_aw_cancel", {
  extend: "Ext.window.Window",
  alias: "widget.FRMsync_doc_aw_cancel",
  reference: "FRMsync_doc_aw_cancel",
  title: "Proses Cancel Synchronize AW",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: true,
  //y: -110,
  controller: "Csync_doc_aw",
  width: mainpanel.getWidth() * 0.47,
  height: mainpanel.getHeight() * 0.6,
  layout: { type: "hbox", pack: "start", align: "stretch" },
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
  items: [
    {
      xtype: "grid",
      pid: "GRIDsync_doc_aw_cancel",
      emptyText: "No Matching Records",
      autoScroll: true,
      flex: 1,
      plugins: ["filterfield"],
      store: "",
      columns: [
        {
          xtype: "actioncolumn",
          width: 35,
          align: "center",
          menuDisabled: true,
          sortable: false,
          items: [
            {
              icon: vconfig.getstyle + "icon/delete.png",
              tooltip: "Cancel Dokumen",
              handler: "aw_cancel_dokumen",
            },
          ],
        },
        { sortable: true, width: 0, filter: { xtype: "textfield" }, hidden: true, header: "ID", dataIndex: "ID" },
        { sortable: true, width: 0, filter: { xtype: "textfield" }, hidden: true, header: "FILE_ID", dataIndex: "FILE_ID" },
        { sortable: true, width: 300, filter: { xtype: "textfield" }, header: "PATH", dataIndex: "FILE_DESCRIPTION" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "FILE", dataIndex: "LOG_FILE_NAMESTATUS" },
        { sortable: true, width: 130, filter: { xtype: "textfield" }, header: "DATE", dataIndex: "FILE_DATE" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "STATUS", dataIndex: "FILE_STATUS" },
      ],
      bbar: {
        xtype: "pagingtoolbar",
        displayInfo: true,
        displayMsg: "Displaying topics {0} - {1} of {2}",
        emptyMsg: "No topics to display",
      },
      listeners: {
        afterrender: "GRIDsync_doc_aw_cancel_load",
      },
    },
  ],
});
