var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.INVENTORY_PLB.inv_wip_control_aw.FRMwip_list_memo_scrap_aw", {
  extend: "Ext.window.Window",
  alias: "widget.FRMwip_list_memo_scrap_aw",
  reference: "FRMwip_list_memo_scrap_aw",
  title: "Memo Scrap",
  modal: true,
  closeAction: "hide",
  centered: true,
  autoScroll: true,
  controller: "Cinv_wip_control_aw",
  //y: -110,
  width: mainpanel.getWidth() * 0.98,
  height: mainpanel.getHeight() * 0.98,
  layout: { type: "border", pack: "start", align: "stretch" },
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
  bodyBorder: false,
  items: [
    {
      title: "List Memo Scrap",
      region: "west",
      floatable: false,
      width: 790,
      layout: { type: "vbox", pack: "start", align: "stretch" },
      items: [
        {
          xtype: "grid",
          pid: "GRIDmemo_scrap",
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
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
              actionMethods: { read: "POST" },
              url: vconfig.service_api + "inv_wip_control_aw/inv_wip_control_aws",
              extraParams: {
                method: "read_scrap_header",
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
            { xtype: "rownumberer", width: 50 },
            {
              xtype: "actioncolumn",
              width: 35,
              align: "center",
              menuDisabled: true,
              sortable: false,
              items: [
                {
                  icon: vconfig.getstyle + "icon/delete.ico",
                  handler: "btcancel_memo_scrap",
                  tooltip: "Cancel Memo Scrap Dokumen",
                },
              ],
            },
            { header: "OUT NO", dataIndex: "OUT_NO", sortable: true, width: 170, filter: { xtype: "textfield" } },
            { header: "OUT DATE", dataIndex: "OUT_DATE", sortable: true, width: 80, filter: { xtype: "textfield" } },
            { header: "REMARK", dataIndex: "OUT_REMARK", sortable: true, width: 200, filter: { xtype: "textfield" } },
            { header: "BAP NO", dataIndex: "BAP_NO", sortable: true, width: 165, filter: { xtype: "textfield" } },
            { header: "BAP DATE", dataIndex: "BAP_DATE", sortable: true, width: 80, filter: { xtype: "textfield" } },

            { width: 20 },
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
      title: "Item/Part Material",
      collapsible: false,
      region: "center",
      layout: { type: "vbox", pack: "start", align: "stretch" },
      items: [
        {
          xtype: "grid",
          pid: "GRIDmemo_scrap_item",
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
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
              actionMethods: { read: "POST" },
              url: vconfig.service_api + "inv_wip_control_aw/inv_wip_control_aws",
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
                  var GRIDmemo_scrap = Ext.ComponentQuery.query("FRMwip_list_memo_scrap_aw grid[pid=GRIDmemo_scrap]")[0];
                  var vdt = GRIDmemo_scrap.getSelectionModel().getSelection()[0];
                  if (vdt) {
                    operation.setParams({
                      method: "memo_scrap_byitem",
                      OUT_NO: vdt.data.OUT_NO,
                    });
                  }
                } catch (ex) {
                  COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                }
              },
            },
          },
          columns: [
            { xtype: "rownumberer", width: 50 },
            { header: "MAPP PART", dataIndex: "MAPP_PARTNO", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "QTY", dataIndex: "OUT_QTY", renderer: "formatAmount", align: "right", sortable: true, width: 80 },
            { header: "INVOICE", dataIndex: "INVOICE_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "BC TYPE", dataIndex: "BC_TYPE", sortable: true, width: 75, filter: { xtype: "textfield" } },
            { header: "NOMOR_AJU", dataIndex: "NOMOR_AJU", sortable: true, width: 120, filter: { xtype: "textfield" } },
            { header: "TANGGAL_AJU", dataIndex: "TANGGAL_AJU", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "NOMOR_DAFTAR", dataIndex: "NOMOR_DAFTAR", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "TANGGAL_DAFTAR", dataIndex: "TANGGAL_DAFTAR", sortable: true, width: 100, filter: { xtype: "textfield" } },
          ],
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
        { xtype: "tbspacer", width: 10, text: "-" },
        { xtype: "button", text: "Refresh", pid: "FRMwip_list_memo_scrap_aw_btrefresh", icon: vconfig.getstyle + "icon/update.ico", tooltip: "Refresh Data" },
      ],
    },
  ],
  listeners: {
    afterlayout: function (cmp) {
      try {
        //
      } catch (ex) {
        COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      }
    },
  },
});
