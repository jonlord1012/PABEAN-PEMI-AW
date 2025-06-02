var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.INVENTORY.inv_fg_out.FRMinv_fg_out_polyinfo", {
  extend: "Ext.window.Window",
  alias: "widget.FRMinv_fg_out_polyinfo",
  reference: "FRMinv_fg_out_polyinfo",
  title: "Poly Number Detail Item Part",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: true,
  controller: "Cinv_fg_out",
  //y: -110,
  width: mainpanel.getWidth() * 0.98,
  height: mainpanel.getHeight() * 0.98,
  layout: { type: "border", pack: "start", align: "stretch" },
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
  bodyBorder: false,
  items: [
    {
      title: "List Production",
      region: "west",
      floatable: false,
      width: 410,
      layout: { type: "vbox", pack: "start", align: "stretch" },
      items: [
        {
          xtype: "grid",
          pid: "GRIDFRMinv_fg_out_polyinfo_header",
          emptyText: "No Matching Records",
          autoScroll: true,
          flex: 1,
          plugins: ["filterfield"],
          viewConfig: {
            enableTextSelection: true,
          },
          store: {
            autoLoad: false,
            remoteSort: false,
            remoteFilter: false,
            pageSize: 0,
            fields: [
              { name: "MAPP_PARTNO", type: "string" },
              { name: "PART_NAME", type: "string" },
              { name: "PART_GROUP", type: "string" },
              { name: "PART_CATEGORY", type: "string" },
              { name: "IN_QTY", type: "float" },
              { name: "OUT_QTY", type: "float" },
              { name: "STOCK_QTY", type: "float" },
            ],
            proxy: {
              type: "ajax",
              disableCaching: false,
              noCache: false,
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
              actionMethods: { read: "POST" },
              url: vconfig.service_api + "inv_fg_out/inv_fg_outs",
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
                  var GRIDmain = Ext.ComponentQuery.query("GRIDinv_fg_out grid[pid=GRIDinv_fg_out]")[0];
                  var vrec = GRIDmain.getSelectionModel().getSelection()[0].data;
                  operation.setParams({
                    method: "list_poly_header",
                    polyno: vrec.POLY_NO,
                  });
                } catch (ex) {
                  COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                }
              },
            },
          },
          columns: [
            //
            { xtype: "rownumberer", width: 50 },
            { header: "PROD DATE", dataIndex: "PROD_DATE", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "ASSY CODE", dataIndex: "ASSYCODE", sortable: true, width: 80, filter: { xtype: "textfield" } },
            { header: "NAMEPLATE", dataIndex: "NAMEPLATE", sortable: true, width: 165, filter: { xtype: "textfield" } },
          ],
          bbar: {
            xtype: "pagingtoolbar",
            displayInfo: true,
            displayMsg: "Displaying topics {0} - {1} of {2}",
            emptyMsg: "No topics to display",
          },
        },
      ],
    },
    {
      title: "Item/Part Material (BOM)",
      collapsible: false,
      region: "center",
      layout: { type: "vbox", pack: "start", align: "stretch" },
      items: [
        {
          xtype: "grid",
          pid: "GRIDFRMinv_fg_out_polyinfo_detail",
          emptyText: "No Matching Records",
          autoScroll: true,
          flex: 1,
          plugins: ["filterfield"],
          viewConfig: {
            enableTextSelection: true,
          },
          store: {
            autoLoad: false,
            remoteSort: false,
            remoteFilter: false,
            pageSize: 0,
            fields: [
              //
              { name: "OUT_QTY", type: "float" },
            ],
            proxy: {
              type: "ajax",
              disableCaching: false,
              noCache: false,
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
              actionMethods: { read: "POST" },
              url: vconfig.service_api + "inv_fg_out/inv_fg_outs",
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
                  var GRIDmain = Ext.ComponentQuery.query("GRIDinv_fg_out grid[pid=GRIDinv_fg_out]")[0];
                  var vrec = GRIDmain.getSelectionModel().getSelection()[0].data;
                  operation.setParams({
                    method: "list_poly_detail",
                    polyno: vrec.POLY_NO,
                  });
                } catch (ex) {
                  COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                }
              },
            },
          },
          columns: [
            { xtype: "rownumberer", width: 50 },
            { header: "ASSY", dataIndex: "ASSY_CODE", sortable: true, width: 50, filter: { xtype: "textfield" } },
            { header: "MAPP PART", dataIndex: "PART_NO", sortable: true, width: 120, filter: { xtype: "textfield" } },
            { header: "NAMEPLATE", dataIndex: "QTY_NAMEPLATE", renderer: "formatAmount", align: "right", sortable: true, width: 80 },
            { header: "QTY BOM", dataIndex: "QTY_BOM", renderer: "formatAmount", align: "right", sortable: true, width: 80 },
            { header: "QTY", dataIndex: "QTY", renderer: "formatAmount", align: "right", sortable: true, width: 80 },

            { header: "WIP IN", dataIndex: "WIP_IN_DATE", sortable: true, width: 80, filter: { xtype: "textfield" } },
            { header: "INVOICE", dataIndex: "INVOICE_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },

            { header: "SOURCE", dataIndex: "SUMBER_DATA", sortable: true, width: 65, filter: { xtype: "textfield" } },
            { header: "BC TYPE", dataIndex: "BC_TYPE", sortable: true, width: 65, filter: { xtype: "textfield" } },
            { header: "NOMOR AJU", dataIndex: "NOMOR_AJU", sortable: true, width: 170, filter: { xtype: "textfield" } },
            { header: "TANGGAL AJU", dataIndex: "TANGGAL_AJU", sortable: true, width: 80, filter: { xtype: "textfield" } },
            { header: "NOMOR DAFTAR", dataIndex: "NOMOR_DAFTAR", sortable: true, width: 80, filter: { xtype: "textfield" } },
            { header: "TANGGAL DAFTAR", dataIndex: "TANGGAL_DAFTAR", sortable: true, width: 80, filter: { xtype: "textfield" } },
          ],
          bbar: {
            xtype: "pagingtoolbar",
            displayInfo: true,
            displayMsg: "Displaying topics {0} - {1} of {2}",
            emptyMsg: "No topics to display",
          },
        },
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
      ],
    },
  ],
  listeners: {
    afterlayout: function (cmp) {
      try {
        var GRIDmain = Ext.ComponentQuery.query("GRIDinv_fg_out grid[pid=GRIDinv_fg_out]")[0];
        var vrec = GRIDmain.getSelectionModel().getSelection()[0].data;
        cmp.setTitle("Poly Number : " + vrec.POLY_NO);

        var GRIDheader = cmp.query("grid[pid=GRIDFRMinv_fg_out_polyinfo_header]")[0];
        GRIDheader.getStore().load();

        var GRIDdetail = cmp.query("grid[pid=GRIDFRMinv_fg_out_polyinfo_detail]")[0];
        GRIDdetail.getStore().load();
      } catch (ex) {
        COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      }
    },
  },
});
