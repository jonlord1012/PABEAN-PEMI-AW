Ext.define("NJC.SYNCHRONIZE.portal_data.mapping_supplier.FRMmapping_supplier", {
  extend: "Ext.form.Panel",
  alias: "widget.cooFRMmapping_supplier",
  reference: "cooFRMmapping_supplier",
  frame: false,
  border: true,
  autoScroll: false,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
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
          headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "sync_doc/sync_docs",
          extraParams: {
            method: "read_invoice_mapping_supplier",
            module: "coo",
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
        { header: "VENDOR", dataIndex: "VENDOR", sortable: true, width: 100, filter: { xtype: "textfield" } },
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
});
