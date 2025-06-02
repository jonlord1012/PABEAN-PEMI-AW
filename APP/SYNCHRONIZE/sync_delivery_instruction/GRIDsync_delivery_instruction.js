Ext.define("NJC.SYNCHRONIZE.sync_delivery_instruction.GRIDsync_delivery_instruction", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDsync_delivery_instruction",
  reference: "GRIDsync_delivery_instruction",
  requires: ["Ext.grid.feature.Grouping"],
  frame: false,
  border: false,
  autoScroll: true,
  layout: { type: "hbox", pack: "start", align: "stretch" },
  requires: [],
  items: [
    {
      xtype: "grid",
      pid: "GRIDsync_delivery_instruction",
      emptyText: "No Matching Records",
      autoScroll: true,
      pageSize: 20,
      flex: 1,
      store: {
        autoLoad: true,
        remoteSort: true,
        remoteFilter: true,
        pageSize: 50,
        proxy: {
          type: "ajax",
          disableCaching: false,
          noCache: false,
          headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "sync_delivery_instruction/sync_delivery_instructions",
          extraParams: {
            method: "read_data",
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
              var CBO_FILTERKEY = Ext.ComponentQuery.query("sync_delivery_instruction combobox[name=CBO_FILTERKEY]")[0];
              operation.setParams({
                cbo_filterkey: CBO_FILTERKEY.getValue(),
              });
            } catch (ex) {
              COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
            }
          },
        },
      },
      plugins: ["filterfield", "gridexporter"],
      viewConfig: {
        enableTextSelection: true,
      },
      viewConfig: {
        enableTextSelection: true,
        getRowClass: function (record) {
          return record.get("NOMOR_AJU") === null || record.get("NOMOR_DAFTAR") === null ? "gridrow-red" : "";
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
              icon: vconfig.getstyle + "icon/grid.png",
              handler: "btdetail_rows_click",
              tooltip: "Detail Dokumen",
            },
          ],
        },
        { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "CLIENT", dataIndex: "CLIENT" },
        { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "INVOICE NO", dataIndex: "INVOICE_NO" },
        { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "INV DATE", dataIndex: "INVOICE_DATE" },
        { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "TENANT INVOICE NO", dataIndex: "TENANT_INVOICE_NO" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NO PICKING", dataIndex: "NO_PICKING" },
        { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "NO DRAFT", dataIndex: "NO_DRAFT" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NO BUKTI", dataIndex: "NO_BUKTI" },
        { sortable: true, width: 380, filter: { xtype: "textfield" }, header: "CLIENT", dataIndex: "CLIENT_NAME" },
        // { sortable: true, width: 300, filter: { xtype: "textfield" }, header: "SUPPLIER NAME", dataIndex: "NAMA" },
      ],
      bbar: {
        xtype: "pagingtoolbar",
        displayInfo: true,
        displayMsg: "Displaying topics {0} - {1} of {2}",
        emptyMsg: "No topics to display",
      },
    },
  ],
});
