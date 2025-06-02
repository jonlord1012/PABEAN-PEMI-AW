var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.INVENTORY.inv_wip_control.FRMwip_list_production", {
  extend: "Ext.window.Window",
  alias: "widget.FRMwip_list_production",
  reference: "FRMwip_list_production",
  title: "Production Process",
  modal: true,
  closeAction: "hide",
  centered: true,
  autoScroll: true,
  controller: "Cinv_wip_control",
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
      width: 400,
      layout: { type: "vbox", pack: "start", align: "stretch" },
      items: [
        {
          xtype: "grid",
          pid: "GRIDFRMwip_list_production",
          emptyText: "No Matching Records",
          autoScroll: true,
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
              url: vconfig.service_api + "inv_wip_control/inv_wip_controls",
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
                  var from_date = Ext.ComponentQuery.query("FRMwip_list_production datefield[name=FRMwip_list_production_from_date]")[0].getValue();
                  if (from_date === null || from_date === "") {
                    from_date = new Date();
                  }
                  operation.setParams({
                    method: "list_production",
                    from_date: moment(from_date).format("YYYY-MM-DD"),
                  });
                } catch (ex) {
                  COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                }
              },
            },
          },
          columns: [
            //
            {
              text: "LIST ASSY",
              columns: [
                { xtype: "rownumberer", width: 50 },
                { header: "PROD DATE", dataIndex: "PROD_DATE", sortable: true, width: 100, filter: { xtype: "textfield" } },
                { header: "ASSY CODE", dataIndex: "ASSYCODE", sortable: true, width: 80, filter: { xtype: "textfield" } },
                { header: "QTY", dataIndex: "QTY", renderer: "formatAmount", align: "right", sortable: true, width: 80 },
              ],
            },
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
      title: "Item/Part Material (BOM)",
      collapsible: false,
      region: "center",
      layout: { type: "vbox", pack: "start", align: "stretch" },
      items: [
        {
          xtype: "grid",
          pid: "GRIDFRMwip_list_production_itempart",
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
              url: vconfig.service_api + "inv_wip_control/inv_wip_controls",
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
                  var from_date = Ext.ComponentQuery.query("FRMwip_list_production datefield[name=FRMwip_list_production_from_date]")[0].getValue();
                  if (from_date === null || from_date === "") {
                    from_date = new Date();
                  }
                  operation.setParams({
                    method: "list_production_detail",
                    from_date: moment(from_date).format("YYYY-MM-DD"),
                  });
                } catch (ex) {
                  COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                }
              },
            },
          },
          columns: [
            {
              text: "PRODUCTION",
              columns: [
                { xtype: "rownumberer", width: 50 },
                { header: "ASSY", dataIndex: "ASSY_CODE", sortable: true, width: 70, filter: { xtype: "textfield" } },
                { header: "MAPP PART", dataIndex: "PART_NO", sortable: true, width: 120, filter: { xtype: "textfield" } },
                { header: "NAMEPLATE", dataIndex: "QTY_NAMEPLATE", renderer: "formatAmount", align: "right", sortable: true, width: 80, filter: { xtype: "textfield" } },
                { header: "QTY BOM", dataIndex: "QTY_BOM", renderer: "formatAmount", align: "right", sortable: true, width: 80, filter: { xtype: "textfield" } },
                { header: "QTY", dataIndex: "QTY", renderer: "formatAmount", align: "right", sortable: true, width: 80, filter: { xtype: "textfield" } },
              ],
            },
            {
              text: "DOKUMEN WIP IN",
              columns: [
                { header: "QTY OUT", dataIndex: "OUT_QTY", renderer: "formatAmount", align: "right", sortable: true, width: 80, filter: { xtype: "textfield" } },
                { header: "WIP IN", dataIndex: "WIP_IN_DATE", sortable: true, width: 80, filter: { xtype: "textfield" } },
                { header: "INVOICE", dataIndex: "INVOICE_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
                { header: "SOURCE", dataIndex: "SUMBER_DATA", sortable: true, width: 65, filter: { xtype: "textfield" } },
                { header: "BC TYPE", dataIndex: "BC_TYPE", sortable: true, width: 65, filter: { xtype: "textfield" } },
                { header: "NOMOR AJU", dataIndex: "NOMOR_AJU", sortable: true, width: 170, filter: { xtype: "textfield" } },
                { header: "TANGGAL AJU", dataIndex: "TANGGAL_AJU", sortable: true, width: 80, filter: { xtype: "textfield" } },
                { header: "NOMOR DAFTAR", dataIndex: "NOMOR_DAFTAR", sortable: true, width: 80, filter: { xtype: "textfield" } },
                { header: "TANGGAL DAFTAR", dataIndex: "TANGGAL_DAFTAR", sortable: true, width: 80, filter: { xtype: "textfield" } },
              ],
            },
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
        { xtype: "tbspacer", width: 10, text: "-" },
        { xtype: "datefield", labelWidth: 60, width: 180, fieldLabel: "From Date", name: "FRMwip_list_production_from_date", fieldCls: "fieldinput", readOnly: false, format: "Y-m-d", value: new Date() },
        { xtype: "button", text: "Refresh", pid: "FRMwip_list_production_btrefresh", icon: vconfig.getstyle + "icon/update.ico", tooltip: "Refresh Data" },
        "-",
        { xtype: "button", text: "Synchronize WIP BC Dokumen", pid: "FRMwip_list_production_getbc", icon: vconfig.getstyle + "icon/two%20displays.ico", tooltip: "Synchronize Data" },
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
