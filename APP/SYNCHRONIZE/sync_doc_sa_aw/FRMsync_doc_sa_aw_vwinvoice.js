var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.SYNCHRONIZE.sync_doc_sa_aw.FRMsync_doc_sa_aw_vwinvoice", {
  extend: "Ext.window.Window",
  alias: "widget.FRMsync_doc_sa_aw_vwinvoice",
  reference: "FRMsync_doc_sa_aw_vwinvoice",
  title: "Detail Dokumen SA + Invoice + Kontainer ",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: true,
  controller: "Csync_doc_sa_aw",
  //y: -110,
  width: mainpanel.getWidth() * 0.75,
  height: mainpanel.getHeight() * 0.75,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
  items: [
    {
      xtype: "grid",
      pid: "GRIDvwinvoice",
      emptyText: "No Matching Records",
      autoScroll: true,
      flex: 1,
      store: {
        autoLoad: true,
        remoteSort: true,
        remoteFilter: true,
        pageSize: 15,
        proxy: {
          type: "ajax",
          disableCaching: false,
          noCache: false,
          headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "sync_doc_sa_aw/sync_doc_sa_aws",
          extraParams: {
            method: "read_listinvoice",
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
              var CBO_PERIOD = Ext.ComponentQuery.query("FRMsync_doc_sa_aw_vwinvoice combobox[name=CBO_PERIOD]")[0];
              operation.setParams({
                PERIOD: CBO_PERIOD.getValue(),
              });
            } catch (ex) {
              COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
            }
          },
        },
      },
      plugins: ["filterfield"],
      viewConfig: {
        enableTextSelection: true,
      },
      selType: "checkboxmodel",
      simpleSelect: true,
      columns: [
        { xtype: "rownumberer", width: 40 },
        { sortable: true, width: 180, filter: { xtype: "textfield" }, header: "SA NO", dataIndex: "SA_NO" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "SA DATE", dataIndex: "SA_DATE" },
        { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "INVOICE", dataIndex: "INVOICE_NO" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "INVOICE DATE", dataIndex: "INVOICE_DATE" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "CONTAINER", dataIndex: "CONTAINER_NO" },
        { sortable: true, width: 70, filter: { xtype: "textfield" }, header: "CUSTOMER", dataIndex: "CUSTOMER_CODE" },
        { sortable: true, width: 70, filter: { xtype: "textfield" }, header: "PERIODE", dataIndex: "PERIODE" },
        { sortable: true, width: 70, filter: { xtype: "textfield" }, header: "DRNO", dataIndex: "DRNO" },
        { sortable: true, width: 70, filter: { xtype: "textfield" }, header: "SHIPPING", dataIndex: "SHIPPING_TYPE" },
        { sortable: true, width: 80, header: "SHIP NAME", dataIndex: "SHIPPING_NAME" },
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
        "-",
        { xtype: "component", width: 5 },
        {
          xtype: "combobox",
          name: "CBO_PERIOD",
          fieldLabel: "Select Period",
          labelWidth: 80,
          width: 150,
          displayField: "TAHUN",
          valueField: "TAHUN",
          fieldCls: "fieldinput",
          allowBlank: false,
          queryMode: "local",
          forceSelection: true,
          typeAhead: true,
          minChars: 0,
          anyMatch: true,
          value: moment(new Date()).format("YYYY"),
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
              url: vconfig.service_api + "sync_doc_sa_aw/sync_doc_sa_aws",
              extraParams: {
                method: "read_period",
              },
              reader: {
                type: "json",
                rootProperty: "Rows",
                totalProperty: "TotalRows",
                successProperty: "success",
              },
            },
          },
        },
        "-",
        { xtype: "button", pid: "btselect_invoice", text: "Sinkronisasi Dokumen", icon: vconfig.getstyle + "icon/save.ico", tooltip: "Sinkronisasi Data Invoice" },

        //batas,
      ],
      // other options....
    },
  ],
});
