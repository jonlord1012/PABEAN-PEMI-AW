var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.SYNCHRONIZE.sync_doc_molts.molts_popupmapping_supplier", {
  extend: "Ext.window.Window",
  alias: "widget.molts_popupmapping_supplier",
  reference: "molts_popupmapping_supplier",
  title: "Mapping Supplier [MOLTS]",
  modal: true,
  closeAction: "hidden",
  centered: true,
  autoScroll: true,
  controller: "Csync_doc_molts",
  //y: -110,
  width: mainpanel.getWidth() * 0.6,
  height: mainpanel.getHeight() * 0.6,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
  items: [
    {
      xtype: "grid",
      pid: "GRIDmappingdata_supplier",
      emptyText: "No Matching Records",
      autoScroll: true,
      flex: 1,
      plugins: ["filterfield"],
      viewConfig: {
        enableTextSelection: true,
      },
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
          url: vconfig.service_api + "sync_doc_molts/sync_doc_moltss",
          extraParams: {
            method: "read_invoice_mapping_supplier",
            module: "molts",
          },
          reader: {
            type: "json",
            rootProperty: "Rows",
            totalProperty: "TotalRows",
            successProperty: "success",
          },
        },
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
              icon: vconfig.getstyle + "icon/search.ico",
              handler: "btpilihsupplier_mapping",
              tooltip: "Pilih Supplier/Vendor",
            },
          ],
        },
        { header: "VENDOR", dataIndex: "SHIPPER", sortable: true, width: 250, filter: { xtype: "textfield" } },
        { header: "INVOICE_NO", dataIndex: "INVOICE_NO", sortable: true, width: 100 },
        { header: "INVOICE_DATE", dataIndex: "INVOICE_DATE", sortable: true, width: 100 },
      ],
      bbar: {
        xtype: "pagingtoolbar",
        displayInfo: true,
        displayMsg: "Total Data {2}",
        emptyMsg: "No topics to display",
      },
    },
  ],
  dockedItems: [
    {
      xtype: "toolbar",
      height: 30,
      dock: "top",
      items: ["-", { xtype: "button", pid: "btautomapping", text: "Auto Mapping Supplier", icon: vconfig.getstyle + "icon/search.ico", tooltip: "Auto Supplier/Vendor" }],
      // other options....
    },
  ],
  listeners: {
    afterlayout: function (cmp) {
      try {
        var FRM = cmp.query("form")[0];
        var GRID = cmp.query("grid")[0];
        GRID.getStore().load();
      } catch (ex) {
        COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      }
    },
  },
});
