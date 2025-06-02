var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.INVENTORY.inv_fg_control.FRMifc_report_stock", {
  extend: "Ext.window.Window",
  alias: "widget.FRMifc_report_stock",
  reference: "FRMifc_report_stock",
  title: "Report Stock",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: true,
  controller: "Cinv_fg_control",
  //y: -110,
  width: mainpanel.getWidth() * 0.98,
  height: mainpanel.getHeight() * 0.98,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
  items: [
    {
    xtype: "container",
    layout: { type: "hbox", pack: "start", align: "stretch" },
    flex: 1,
    items: [
    {
      xtype: "grid",
      pid: "GRIDreport_stock",
      emptyText: "No Matching Records",
      plugins: ["filterfield", "gridexporter"],
      autoScroll: true,
      flex: 1,
      features: [ { ftype: 'grouping' }],
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
          url: vconfig.service_api + "ifc_report_stock/ifc_report_stocks",
          extraParams: {
            method: "read_data",
          },
          reader: {
            type: "json",
            rootProperty: "Rows",
            totalProperty: "TotalRows",
            successProperty: "success",
          },
          grouper : {
            groupFn: function(item){
                return 'Part Number' + item.get('PART_NO') ;
            }
          }
        },
        listeners: {
          beforeload: function (store, operation, eOpts) {
            try {
              var VIDCOMPANY = Ext.ComponentQuery.query("FRMifc_report_stock combobox[name=CBO_COMPANY]")[0];
              var VPARTGROUP = Ext.ComponentQuery.query("FRMifc_report_stock combobox[name=CBO_PARTGROUP]")[0];
              var VFROMDATE = Ext.ComponentQuery.query("FRMifc_report_stock monthfield[name=tfromdate]")[0];
              var VTODATE = Ext.ComponentQuery.query("FRMifc_report_stock monthfield[name=ttodate]")[0];

              operation.setParams({
                VIDCOMPANY: VIDCOMPANY.getValue(),
                VPARTGROUP: VPARTGROUP.getValue(),
                VFROMDATE: moment(VFROMDATE.getValue()).format("YYYY-MM"),
                VTODATE: moment(VTODATE.getValue()).format("YYYY-MM"),
              });
            } catch (ex) {
              COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
            }
          },
        },
      },
      viewConfig: {
        enableTextSelection: true,
      },
      columns: [
        { xtype: "rownumberer", width: 50 },
        { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "TAHUN", dataIndex: "TAHUN" },
        { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "BULAN", dataIndex: "BULAN" },
        { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "PART NO", dataIndex: "MAPP_PARTNO" },
        { sortable: true, flex: 1, filter: { xtype: "textfield" }, header: "PART NAME", dataIndex: "PART_NAME" },
        { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "GROUP", dataIndex: "PART_GROUP", hidden: true },
        { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "CATEGORY", dataIndex: "PART_CATEGORY" },
        { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "INVOICE NO", dataIndex: "INVOICE_NO" },
        { sortable: true, width: 200, filter: { xtype: "textfield" }, header: "NO AJU", dataIndex: "NOMOR_AJU" },
        { sortable: true, width: 200, filter: { xtype: "textfield" }, header: "TANGGAL AJU", dataIndex: "TANGGAL_AJU" },
        { sortable: true, width: 120, filter: { xtype: "textfield" }, header: "NO DAFTAR", dataIndex: "NOMOR_DAFTAR" },
        { sortable: true, width: 200, filter: { xtype: "textfield" }, header: "TANGGAL DAFTAR", dataIndex: "TANGGAL_DAFTAR" },
        { sortable: true, width: 80, renderer: "formatAmount", align: "right", filter: { xtype: "textfield" }, header: "TOTAL IN QTY", dataIndex: "TOTAL_IN_QTY" },
        {
          text: "OUT QTY",
          columns: [
            { sortable: true, renderer: "formatAmount", align: "right", width: 80, header: "TO PROD", dataIndex: "OUT_TO_PROD" },
            { sortable: true, renderer: "formatAmount", align: "right", width: 80, header: "SCRAP", dataIndex: "OUT_TO_SCRAP" },
            { sortable: true, renderer: "formatAmount", align: "right", width: 80, header: "SELLING ", dataIndex: "OUT_TO_SELLING" },
          ],
        },
        { sortable: true, width: 80, renderer: "formatAmount", align: "right", filter: { xtype: "textfield" }, header: "TOTAL OUT", dataIndex: "TOTAL_OUT_QTY" },
        { sortable: true, width: 80, renderer: "formatAmount", align: "right", filter: { xtype: "textfield" }, header: "STOCK BY MONTH", dataIndex: "STOCK_BY_MONTH", hidden: true },
        { sortable: true, width: 80, renderer: "formatAmount", align: "right", filter: { xtype: "textfield" }, header: "TOTAL STOCK", dataIndex: "TOTAL_STOCK", hidden: true },
      ],
    },
    ],
    }
  ],
  dockedItems: [
    {
      xtype: "toolbar",
      height: 30,
      dock: "top",
      items: [
        //
        { xtype: "tbspacer", width: 10, text: "-" },
        { xtype: "button", text: "Refresh", pid: "FRMifc_report_stock_btrefresh", icon: vconfig.getstyle + "icon/update.ico", tooltip: "Refresh Data" },
        "-",
        {
          xtype: "combobox",
          name: "CBO_COMPANY",
          fieldLabel: "PEMI",
          labelWidth: 60,
          width: 150,
          displayField: "COMBO",
          valueField: "ID_COMPANY",
          fieldCls: "fieldinput",
          allowBlank: false,
          queryMode: "local",
          forceSelection: true,
          typeAhead: true,
          minChars: 0,
          anyMatch: true,
          value: "2",
          store: new Ext.data.Store({
            data: [
              { ID_COMPANY: "0", COMBO: "All Data" },
              { ID_COMPANY: "1", COMBO: "AW" },
              { ID_COMPANY: "2", COMBO: "WH" },
            ],
            fields: ["ID_COMPANY", "COMBO"],
          }),
        },
        "-",
        {
          xtype: "combobox",
          name: "CBO_PARTGROUP",
          fieldLabel: "GROUP PART",
          labelWidth: 100,
          width: 200,
          displayField: "PART_GROUP",
          valueField: "PART_GROUP",
          fieldCls: "fieldinput",
          allowBlank: false,
          queryMode: "local",
          forceSelection: true,
          typeAhead: true,
          minChars: 0,
          anyMatch: true,
          store: {
            autoLoad: true,
            remoteSort: false,
            remoteFilter: false,
            pageSize: 0,
            fields: ["PART_GROUP",],
            proxy: {
              type: "ajax",
              disableCaching: false,
              noCache: false,
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
              actionMethods: { read: "POST" },
              url: vconfig.service_api + "ifc_report_stock/ifc_report_stocks",
              extraParams: {
                method: "read_group_part",
              },
              reader: {
                type: "json",
                rootProperty: "Rows",
                totalProperty: "TotalRows",
                successProperty: "success",
              },
            },
          },
        },
        "-",
        {
          xtype: "container",
          layout: "hbox",
          items: [
            {
              xtype: "container",
              layout: "hbox",
              items: [
                { xtype: "monthfield", labelWidth: 60, width: 180, fieldLabel: "PERIODE", name: "tfromdate", fieldCls: "fieldinput", readOnly: false, format: "Y-m", value: new Date() },
                { xtype: "monthfield", width: 120, name: "ttodate", fieldCls: "fieldinput", readOnly: false, format: "Y-m", value: new Date() },
              ],
            },
            {
              xtype: "button",
              pid: "FRMifc_report_stock_btsearch",
              icon: vconfig.getstyle + "icon/search.ico",
              tooltip: "search",
              handler: "FRMifc_report_stock_btsearch_click"
            },
          ],
        },
        "->",
        {
          xtype: "button",
          text: "Export to",
          menu: {
            defaults: {
              handler: "exportTo",
            },
            items: [
              {
                text: "Excel xlsx",
                icon: vconfig.getstyle + "icon/exceldownload.png",
                cfg: {
                  type: "excel07",
                  ext: "xlsx",
                },
              },
            ],
          },
        },
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
