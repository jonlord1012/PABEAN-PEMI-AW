var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.SYNCHRONIZE.sync_doc_molts.molts_popupmapping_itempart", {
  extend: "Ext.window.Window",
  alias: "widget.molts_popupmapping_itempart",
  reference: "molts_popupmapping_itempart",
  title: "Mapping Item/Part Material [MOLTS]",
  modal: true,
  closeAction: "hidden",
  centered: true,
  autoScroll: true,
  controller: "Csync_doc_molts",
  //y: -110,
  width: mainpanel.getWidth() * 0.7,
  height: mainpanel.getHeight() * 0.6,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
  items: [
    {
      xtype: "grid",
      pid: "GRIDmappingdata_itempart",
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
        pageSize: 20,
        proxy: {
          type: "ajax",
          disableCaching: false,
          noCache: false,
          headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "sync_doc_molts/sync_doc_moltss",
          extraParams: {
            method: "read_invoice_mapping_itempart",
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
              handler: "btpilihpart_mapping",
              tooltip: "Pilih Item/Part Material",
            },
          ],
        },
        { header: "VENDOR", dataIndex: "SHIPPER", sortable: true, width: 170 },
        { header: "INVOICE_NO", dataIndex: "INVOICE_NO", sortable: true, width: 100 },
        { header: "PART", dataIndex: "DESCRIPTION1", sortable: true, width: 200 },
        { header: "DESC", dataIndex: "DESCRIPTION2", sortable: true, width: 250 },
        { header: "UOM", dataIndex: "UNIT", sortable: true, width: 75 },
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
      items: ["-", { xtype: "button", pid: "btautomapping_itempart", text: "Auto Mapping Item/Part Material", icon: vconfig.getstyle + "icon/search.ico", tooltip: "Auto Mapping Item/Part Material" }],
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
