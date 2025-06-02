var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.INVENTORY_PLB.inv_wip_control_aw.FRMwip_list_bom_aw", {
  extend: "Ext.window.Window",
  alias: "widget.FRMwip_list_bom_aw",
  reference: "FRMwip_list_bom_aw",
  title: "Bill Of Material",
  modal: true,
  closeAction: "hide",
  centered: true,
  autoScroll: true,
  controller: "Cinv_wip_control_aw",
  //y: -110,
  width: mainpanel.getWidth() * 0.8,
  height: mainpanel.getHeight() * 0.8,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
  bodyBorder: false,
  items: [
    {
      xtype: "grid",
      pid: "GRIDFRMwip_list_bom_aw",
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
        pageSize: 25,
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
            method: "list_bom",
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
        //
        { xtype: "rownumberer", width: 50 },
        { header: "ASSY CODE", dataIndex: "ASSY_CODE", sortable: true, width: 200, filter: { xtype: "textfield" } },
        { header: "PART NO", dataIndex: "PART_NO", sortable: true, flex: 1, filter: { xtype: "textfield" } },
        { header: "BOM QTY", dataIndex: "PART_QTY", renderer: "formatAmount", align: "right", sortable: true, width: 80 },
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
  dockedItems: [
    {
      xtype: "toolbar",
      height: 30,
      dock: "top",
      items: [
        //
        { xtype: "tbspacer", width: 10, text: "-" },
        { xtype: "button", text: "Refresh", pid: "FRMwip_list_bom_aw_btrefresh", icon: vconfig.getstyle + "icon/update.ico", tooltip: "Refresh Data" },
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
