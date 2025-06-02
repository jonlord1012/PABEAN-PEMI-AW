Ext.define("NJC.SYNCHRONIZE.sync_doc_aw.mappingdata.GRIDmappingdata", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDmappingdata_aw",
  reference: "GRIDmappingdata",
  frame: false,
  border: true,
  closeAction: "destroy",

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
          headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "sync_doc_aw/sync_doc_aws",
          extraParams: {
            method: "read_mappingdata_supplier",
            module: "aw",
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
              var GRID = Ext.ComponentQuery.query("sync_doc_aw GRIDsync_doc_aw grid[pid=GRIDsync_doc_aw]")[0];
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
        { header: "AW CODE", dataIndex: "KODE_AW", sortable: true, width: 50 },
        { header: "INVOICE CODE", dataIndex: "KODE_LP", sortable: true, width: 50 },
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
        remoteSort: true,
        remoteFilter: true,
        pageSize: 0,
        proxy: {
          type: "ajax",
          disableCaching: false,
          noCache: false,
          headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "sync_doc_aw/sync_doc_aws",
          extraParams: {
            method: "read_mappingdata_part",
            module: "aw",
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
              var GRID = Ext.ComponentQuery.query("sync_doc_aw GRIDsync_doc_aw grid[pid=GRIDsync_doc_aw]")[0];
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
            { header: "ARTICLE_CODE", dataIndex: "ARTICLE_CODE", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "STOCK_NAME", dataIndex: "STOCK_NAME", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "ARRIVE", dataIndex: "ARRIV_PLAN_NUMBER", sortable: true, width: 80, align: "right", renderer: "formatqty", filter: { xtype: "textfield" } },
            { header: "UOM", dataIndex: "UOM", sortable: true, width: 50, filter: { xtype: "textfield" } },
          ],
        },
        {
          text: "Master Part",
          columns: [
            { header: "MST_ARTICLE", dataIndex: "MST_ARTICLE", sortable: true, width: 100, filter: { xtype: "textfield" }, tdCls: "fieldinput" },
            { header: "PART_NAME", dataIndex: "PART_NAME", sortable: true, width: 200, filter: { xtype: "textfield" }, tdCls: "fieldinput" },
            { header: "ALIAS", dataIndex: "ALIAS", sortable: true, width: 100, filter: { xtype: "textfield" }, tdCls: "fieldinput" },
            { header: "CATEGORY", dataIndex: "PART_CATEGORY", sortable: true, width: 100, filter: { xtype: "textfield" }, tdCls: "fieldinput" },
            { header: "TYPE", dataIndex: "TYPE", sortable: true, width: 100, filter: { xtype: "textfield" }, tdCls: "fieldinput" },
            { header: "UOM", dataIndex: "UOM", sortable: true, width: 50, filter: { xtype: "textfield" }, tdCls: "fieldinput" },
            { header: "MPQ", dataIndex: "MPQ", sortable: true, width: 50, filter: { xtype: "textfield" }, tdCls: "fieldinput", renderer: "formatqty", },

          ],
        },
        /*{
          text: "Part HS",
          columns: [
            { header: "NOMOR_HS", dataIndex: "NOMOR_HS", sortable: true, width: 100, filter: { xtype: "textfield" }, tdCls: "fieldlock" },
            { header: "BM", dataIndex: "TARIF_BM", sortable: true, width: 65, filter: { xtype: "textfield" }, tdCls: "fieldlock" },
            { header: "CUKAI", dataIndex: "TARIF_CUKAI", sortable: true, width: 65, filter: { xtype: "textfield" }, tdCls: "fieldlock" },
            { header: "PPH", dataIndex: "TARIF_PPH", sortable: true, width: 65, filter: { xtype: "textfield" }, tdCls: "fieldlock" },
            { header: "PPN", dataIndex: "TARIF_PPN", sortable: true, width: 65, filter: { xtype: "textfield" }, tdCls: "fieldlock" },
            { header: "PPNBM", dataIndex: "TARIF_PPNBM", sortable: true, width: 65, filter: { xtype: "textfield" }, tdCls: "fieldlock" },
          ],
        },*/
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
