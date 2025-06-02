var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.SYNCHRONIZE.sync_doc_sa.popup_doc_sa_list", {
  extend: "Ext.window.Window",
  alias: "widget.popup_doc_sa_list",
  reference: "popup_doc_sa_list",
  title: "List Document SA",
  modal: true,
  closeAction: "hide",
  centered: true,
  autoScroll: true,
  controller: "Csync_doc_sa",
  //y: -110,
  width: mainpanel.getWidth() * 0.6,
  height: mainpanel.getHeight() * 0.7,
  layout: { type: "hbox", pack: "start", align: "stretch" },
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
  bodyBorder: false,
  items: [
    //
    {
      xtype: "grid",
      pid: "GRIDpopup_doc_sa_list",
      emptyText: "No Matching Records",
      autoScroll: true,
      flex: 1,
      plugins: ["filterfield", { ptype: "cellediting", clicksToEdit: 1 }],
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
          headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "sync_doc_sa/sync_doc_sas",
          extraParams: {
            method: "read_doc_sa_list",
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
              //
            } catch (ex) {
              COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
            }
          },
        },
      },
      columns: [
        { xtype: "rownumberer", width: 40 },
        { header: "SA NO", dataIndex: "SANO", sortable: true, width: 180, filter: { xtype: "textfield" } },
        { header: "SA DATE", dataIndex: "SADATE", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "ETD", dataIndex: "ETDPEMI", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "SHIPPING", dataIndex: "SHIPPINGTYPE", sortable: true, width: 60, filter: { xtype: "textfield" } },
        { header: "SHIP NAME", dataIndex: "SHIPPING_NAME", sortable: true, width: 80, filter: { xtype: "textfield" } },
        { header: "CODE", dataIndex: "CUST_CODE", sortable: true, width: 50, filter: { xtype: "textfield" } },
        { header: "CUSTOMER", dataIndex: "CUSTOMER", sortable: true, width: 300, filter: { xtype: "textfield" } },
      ],
    },
  ],
  dockedItems: [
    {
      xtype: "toolbar",
      height: 30,
      dock: "top",
      items: [
        //

        "-",
      ],
    },
  ],
  listeners: {
    afterlayout: function (cmp) {
      try {
        //var FRM = cmp.query("form")[0];
      } catch (ex) {
        COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      }
    },
  },
});
