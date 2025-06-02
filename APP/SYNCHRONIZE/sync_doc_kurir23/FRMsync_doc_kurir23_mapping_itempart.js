var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.SYNCHRONIZE.sync_doc_kurir23.FRMsync_doc_kurir23_mapping_itempart", {
  extend: "Ext.window.Window",
  alias: "widget.FRMsync_doc_kurir23_mapping_itempart",
  reference: "FRMsync_doc_kurir23_mapping_itempart",
  title: "Proses Maping Item Part/Material",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: true,
  //y: -110,
  controller: "Csync_doc_kurir23",
  width: mainpanel.getWidth() * 0.9,
  height: mainpanel.getHeight() * 0.9,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
  items: [
    {
      xtype: "grid",
      pid: "GRID_FRMsync_doc_kurir23_mapping_itempart",
      emptyText: "No Matching Records",
      autoScroll: true,
      flex: 1,
      plugins: ["filterfield"],
      viewConfig: {
        enableTextSelection: true,
        getRowClass: function (record) {
          return record.get("PART_NO") === null ? "gridrow-red" : "";
        },
      },
      features: [
        {
          id: "group",
          ftype: "grouping",
          groupHeaderTpl: 'INVOICE NO : {[values.children[0].data["INVOICE_NO"]]}  ({children.length} Item{[values.children.length > 1 ? "s" : ""]})',
          hideGroupedHeader: true,
          enableGroupingMenu: false,
        },
      ],
      columns: [
        { xtype: "rownumberer", width: 40 },
        {
          text: "SUMBER DATA",
          locked: true,
          columns: [
            {
              xtype: "actioncolumn",
              locked: "true",
              width: 50,
              menuDisabled: true,
              sortable: false,
              align: "center",
              items: [
                {
                  icon: vconfig.getstyle + "icon/setting.ico",
                  handler: "btmapping_manual_itempart",
                  tooltip: "Mapping Manual Item Part/Material",
                },
              ],
            },
            { sortable: true, width: 100, locked: "true", filter: { xtype: "textfield" }, header: "INVOICE_NO", dataIndex: "INVOICE_NO" },
            { sortable: true, width: 100, locked: "true", filter: { xtype: "textfield" }, header: "INVOICE_DATE", dataIndex: "INVOICE_DATE" },
            { sortable: true, width: 100, locked: "true", filter: { xtype: "textfield" }, header: "ITEM NO", dataIndex: "ITEM_NUMBER" },
          ],
        },
        //Part master
        {
          text: "MASTER ITEM/PART MATERIAL",
          columns: [
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "PART NO", dataIndex: "PART_NO" },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "PART NAME", dataIndex: "PART_NAME" },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "DESCRIPTION", dataIndex: "PART_DESCRIPTION" },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "UOM", dataIndex: "PART_UOM" },
          ],
        },
        {
          text: "MASTER ITEM/PART HS",
          columns: [
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NOMOR HS", dataIndex: "NOMOR_HS" },
            { sortable: true, width: 75, filter: { xtype: "textfield" }, align: "center", header: "BM", dataIndex: "TARIF_BM" },
            { sortable: true, width: 75, filter: { xtype: "textfield" }, align: "center", header: "CUKAI", dataIndex: "TARIF_CUKAI" },
            { sortable: true, width: 75, filter: { xtype: "textfield" }, align: "center", header: "PPH", dataIndex: "TARIF_PPH" },
            { sortable: true, width: 75, filter: { xtype: "textfield" }, align: "center", header: "PPN", dataIndex: "TARIF_PPN" },
            { sortable: true, width: 75, filter: { xtype: "textfield" }, align: "center", header: "PPNBM", dataIndex: "TARIF_PPNBM" },
          ],
        },
      ],
      bbar: {
        xtype: "pagingtoolbar",
        displayInfo: true,
        displayMsg: "Displaying topics {0} - {1} of {2}",
        emptyMsg: "No topics to display",
      },
      listeners: {
        afterrender: "GRID_FRMsync_doc_kurir23_mapping_itempart_load",
      },
    },
  ],
  dockedItems: [
    {
      xtype: "toolbar",
      height: 30,
      dock: "top",
      items: [
        { xtype: "button", text: "Tampilkan Item Part/Material", handler: "btmapping_list_itempart", pid: "btmappingitem_listitem", icon: vconfig.getstyle + "icon/grid.png", tooltip: "Tampilkan Dokumen" },
        { xtype: "button", text: "Auto Mapping", handler: "btmapping_auto_itempart", pid: "btmapping_auto_itempart", icon: vconfig.getstyle + "icon/okdoc.png", tooltip: "Mapping Otomatis Item/Part Material" },
      ],
      // other options....
    },
  ],
});
