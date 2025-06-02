Ext.define("TDK.SYNCHRONIZE.sync_doc_kurir.mappingdata.GRIDmappingdata", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDmappingdata",
  reference: "GRIDmappingdata",
  frame: false,
  border: true,
  autoScroll: true,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
  items: [
    {
      xtype: "grid",
      pid: "GRIDmappingdata_supplier",
      emptyText: "No Matching Records",
      autoScroll: true,
      title: "",
      height: 150,
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
          url: vconfig.service_api + "sync_doc/sync_docs",
          extraParams: {
            method: "read_mappingdata_supplier",
            module: "coo",
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
              var GRID = Ext.ComponentQuery.query("sync_doc_kurir GRIDsync_doc_kurir grid[pid=GRIDsync_doc_kurir]")[0];
              var vdt = GRID.getSelectionModel().getSelection()[0].data;
              operation.setParams({
                INVOICE_NO: vdt.INVOICE_NO,
              });
            } catch (ex) {
              COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
            }
          },
        },
      },
      columns: [
        { xtype: "rownumberer", width: 40 },
        { header: "VENDOR", dataIndex: "VENDOR", sortable: true, width: 100 },
        { header: "INVOICE_NO", dataIndex: "INVOICE_NO", sortable: true, width: 100 },
        { header: "INVOICE_DATE", dataIndex: "INVOICE_DATE", sortable: true, width: 100 },
        { header: "KODE INT", dataIndex: "KODE_INTERNAL", sortable: true, width: 80 },
        { header: "NAMA", dataIndex: "NAMA", sortable: true, width: 200 },
        { header: "ALAMAT", dataIndex: "ALAMAT", sortable: true, width: 350 },
        { header: "NPWP", dataIndex: "NPWP", sortable: true, width: 200 },
        { header: "NEGARA", dataIndex: "KODE_NEGARA", sortable: true, width: 80 },
        { header: "COO", dataIndex: "KODE_COO", sortable: true, width: 50 },
        { header: "MOLTS", dataIndex: "KODE_MOLTS", sortable: true, width: 50 },
        { header: "LP", dataIndex: "KODE_LP", sortable: true, width: 50 },
      ],
      bbar: {
        xtype: "pagingtoolbar",
        displayInfo: true,
        displayMsg: "Total Data {2}",
        emptyMsg: "No topics to display",
      },
    },
    { xtype: "tbspacer", height: 5 },
    {
      xtype: "grid",
      pid: "GRIDmappingdata_supplier",
      emptyText: "No Matching Records",
      autoScroll: true,
      title: "",
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
          url: vconfig.service_api + "sync_doc/sync_docs",
          extraParams: {
            method: "read_mappingdata_part",
            module: "coo",
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
              var GRID = Ext.ComponentQuery.query("sync_doc_kurir GRIDsync_doc_kurir grid[pid=GRIDsync_doc_kurir]")[0];
              var vdt = GRID.getSelectionModel().getSelection()[0].data;
              operation.setParams({
                INVOICE_NO: vdt.INVOICE_NO,
              });
            } catch (ex) {
              COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
            }
          },
        },
      },
      columns: [
        {
          text: "Sumber Data",
          columns: [
            { xtype: "rownumberer", width: 40 },
            { header: "ITEM_NUMBER", dataIndex: "ITEM_NUMBER", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "DESCRIPTION", dataIndex: "DESCRIPTION", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "ARRIVE", dataIndex: "ARRIV_PLAN_NUMBER", sortable: true, width: 80, align: "right", renderer: "formatqty", filter: { xtype: "textfield" } },
            { header: "UOM", dataIndex: "UOM", sortable: true, width: 50, filter: { xtype: "textfield" } },
            { header: "PRICE", dataIndex: "PRICE", sortable: true, width: 80, align: "right", filter: { xtype: "textfield" } },
            { header: "CAUPRI", dataIndex: "CAUPRI", sortable: true, width: 80, align: "right", filter: { xtype: "textfield" } },
          ],
        },
        {
          text: "Master Part",
          columns: [
            { header: "PART_NO", dataIndex: "PART_NO", sortable: true, width: 100, filter: { xtype: "textfield" }, tdCls: "fieldinput" },
            { header: "NAME", dataIndex: "PART_NAME", sortable: true, width: 200, filter: { xtype: "textfield" }, tdCls: "fieldinput" },
            { header: "GROUP", dataIndex: "PART_GROUP", sortable: true, width: 100, filter: { xtype: "textfield" }, tdCls: "fieldinput" },
            { header: "CATEGORY", dataIndex: "PART_CATEGORY", sortable: true, width: 100, filter: { xtype: "textfield" }, tdCls: "fieldinput" },
            { header: "TYPE", dataIndex: "PART_TYPE", sortable: true, width: 100, filter: { xtype: "textfield" }, tdCls: "fieldinput" },
            { header: "UOM", dataIndex: "ITEM_NUMBPART_UOMER", sortable: true, width: 50, filter: { xtype: "textfield" }, tdCls: "fieldinput" },
          ],
        },
        {
          text: "Part HS",
          columns: [
            { header: "NOMOR_HS", dataIndex: "NOMOR_HS", sortable: true, width: 100, filter: { xtype: "textfield" }, tdCls: "fieldlock" },
            { header: "BM", dataIndex: "TARIF_BM", sortable: true, width: 65, filter: { xtype: "textfield" }, tdCls: "fieldlock" },
            { header: "CUKAI", dataIndex: "TARIF_CUKAI", sortable: true, width: 65, filter: { xtype: "textfield" }, tdCls: "fieldlock" },
            { header: "PPH", dataIndex: "TARIF_PPH", sortable: true, width: 65, filter: { xtype: "textfield" }, tdCls: "fieldlock" },
            { header: "PPN", dataIndex: "TARIF_PPN", sortable: true, width: 65, filter: { xtype: "textfield" }, tdCls: "fieldlock" },
            { header: "PPNBM", dataIndex: "TARIF_PPNBM", sortable: true, width: 65, filter: { xtype: "textfield" }, tdCls: "fieldlock" },
          ],
        },
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
      items: ["-", "->"],
      // other options....
    },
  ],
});
