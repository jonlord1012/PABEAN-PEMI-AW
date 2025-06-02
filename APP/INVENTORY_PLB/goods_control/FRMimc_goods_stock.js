var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.INVENTORY_PLB.goods_control.FRMimc_goods_stock", {
  extend: "Ext.window.Window",
  alias: "widget.FRMimc_goods_stock",
  reference: "FRMimc_goods_stock",
  title: "Goods",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: false,
  controller: "Cgoods_control",
  //y: -110,
  width: mainpanel.getWidth() * 0.98,
  height: mainpanel.getHeight() * 0.98,
  layout: { type: "border", pack: "start", align: "stretch" },
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
  bodyBorder: false,
  items: [
    {
      title: "history In - Out",
      region: "south",
      height: 200,
      layout: { type: "hbox", pack: "start", align: "stretch" },
      items: [
        {
          xtype: "grid",
          pid: "GRIDproduct_receiving",
          emptyText: "No Matching Records",
          autoScroll: true,
          flex: 1,
          plugins: ["filterfield"],
          viewConfig: {
            enableTextSelection: true,
          },
          features: [
            {
              ftype: "summary",
              dock: "bottom",
            },
          ],
          store: {
            autoLoad: false,
            remoteSort: false,
            remoteFilter: false,
            pageSize: 0,
            fields: [
              //
              { name: "QTY_IN", type: "float" },
            ],
            proxy: {
              type: "ajax",
              disableCaching: false,
              noCache: false,
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
              actionMethods: { read: "POST" },
              url: vconfig.service_api + "goods_control/goods_controls",
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
                  var GRIDmutasi_stock = Ext.ComponentQuery.query("FRMimc_goods_stock grid[pid=GRIDmutasi_stock]")[0];
                  var vdt = GRIDmutasi_stock.getSelectionModel().getSelection()[0];
                  if (vdt) {
                    operation.setParams({
                      method: "stockproduct_receipt_in",
                      ARTICLE_CODE: vdt.data.ARTICLE_CODE,
                    });
                    console.log("receiving " + vdt.data.ARTICLE_CODE);
                  }
                } catch (ex) {
                  COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                }
              },
            },
          },
          columns: [
            { header: "TAHUN", dataIndex: "YEAR_N_MONTH", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "BULAN", dataIndex: "_MONTH", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "ARTICLE_CODE", dataIndex: "ARTICLE_CODE", sortable: true, width: 100, filter: { xtype: "textfield" } },
            {
              header: "QTY",
              dataIndex: "QTY_IN",
              renderer: "formatAmount",
              align: "right",
              sortable: true,
              width: 80,
              summaryType: "sum",
              summaryRenderer: function (value, summaryData, dataIndex) {
                return '<span style="font-weight:bold;font-size:11px;">' + Ext.util.Format.number(value, "0,000.00/i") + "</span>";
              },
            },
          ],
        },
        {
          xtype: "tbspacer",
          width: 5,
        },
        {
          xtype: "grid",
          pid: "GRIDproduct_out",
          emptyText: "No Matching Records",
          autoScroll: true,
          flex: 1,
          plugins: ["filterfield"],
          viewConfig: {
            enableTextSelection: true,
          },
          features: [
            {
              ftype: "summary",
              dock: "bottom",
            },
          ],
          store: {
            autoLoad: false,
            remoteSort: false,
            remoteFilter: false,
            pageSize: 0,
            fields: [
              //
              { name: "OUT_TOPROD", type: "float" },
              { name: "OUT_TOSCRAP", type: "float" },
              { name: "OUT_TOSELLING", type: "float" },
              { name: "OUT_TOTAL", type: "float" },
            ],
            proxy: {
              type: "ajax",
              disableCaching: false,
              noCache: false,
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
              actionMethods: { read: "POST" },
              url: vconfig.service_api + "goods_control/goods_controls",
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
                  var GRIDmutasi_stock = Ext.ComponentQuery.query("FRMimc_goods_stock grid[pid=GRIDmutasi_stock]")[0];
                  var vdt = GRIDmutasi_stock.getSelectionModel().getSelection()[0];
                  if (vdt) {
                    operation.setParams({
                      method: "stockproduct_out",
                      ARTICLE_CODE: vdt.data.ARTICLE_CODE,
                    });
                    console.log("out " + vdt.data.ARTICLE_CODE);
                  }
                } catch (ex) {
                  COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                }
              },
            },
          },
          columns: [
            { header: "TAHUN", dataIndex: "YEAR_N_MONTH", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "BULAN", dataIndex: "_MONTH", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "PART NO", dataIndex: "ARTICLE_CODE", sortable: true, width: 100, filter: { xtype: "textfield" } },
            /*
            {
              header: "TO PROD",
              dataIndex: "OUT_TOPROD",
              renderer: "formatAmount",
              align: "right",
              sortable: true,
              width: 80,
              summaryType: "sum",
              summaryRenderer: function (value, summaryData, dataIndex) {
                return '<span style="font-weight:bold;font-size:11px;">' + Ext.util.Format.number(value, "0,000.00/i") + "</span>";
              },
            },
            {
              header: "SCRAP",
              dataIndex: "OUT_TOSCRAP",
              renderer: "formatAmount",
              align: "right",
              sortable: true,
              width: 80,
              summaryType: "sum",
              summaryRenderer: function (value, summaryData, dataIndex) {
                return '<span style="font-weight:bold;font-size:11px;">' + Ext.util.Format.number(value, "0,000.00/i") + "</span>";
              },
            },
            {
              header: "SELLING",
              dataIndex: "OUT_TOSELLING",
              renderer: "formatAmount",
              align: "right",
              sortable: true,
              width: 80,
              summaryType: "sum",
              summaryRenderer: function (value, summaryData, dataIndex) {
                return '<span style="font-weight:bold;font-size:11px;">' + Ext.util.Format.number(value, "0,000.00/i") + "</span>";
              },
            },*/
            {
              header: "TOTAL",
              dataIndex: "QTY_OUT",
              renderer: "formatAmount",
              align: "right",
              sortable: true,
              width: 80,
              summaryType: "sum",
              summaryRenderer: function (value, summaryData, dataIndex) {
                return '<span style="font-weight:bold;font-size:11px;">' + Ext.util.Format.number(value, "0,000.00/i") + "</span>";
              },
            },
          ],
        },
      ],
    },
    {
      title: "Stock by Document",
      region: "east",
      floatable: false,
      width: 500,
      layout: { type: "vbox", pack: "start", align: "stretch" },
      items: [
        {
          xtype: "grid",
          pid: "GRIDstock_bydocument",
          emptyText: "No Matching Records",
          autoScroll: true,
          flex: 1,
          plugins: ["filterfield"],
          viewConfig: {
            enableTextSelection: true,
          },
          features: [
            {
              ftype: "summary",
              dock: "bottom",
            },
          ],
          store: {
            autoLoad: false,
            remoteSort: false,
            remoteFilter: false,
            pageSize: 0,
            fields: [
              //
              { name: "STOCK_QTY", type: "float" },
            ],
            proxy: {
              type: "ajax",
              disableCaching: false,
              noCache: false,
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
              actionMethods: { read: "POST" },
              url: vconfig.service_api + "goods_control/goods_controls",
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
                  var GRIDmutasi_stock = Ext.ComponentQuery.query("FRMimc_goods_stock grid[pid=GRIDmutasi_stock]")[0];
                  var vdt = GRIDmutasi_stock.getSelectionModel().getSelection()[0];
                  if (vdt) {
                    operation.setParams({
                      method: "stockproduct_bydocument",
                      ARTICLE_CODE: vdt.data.ARTICLE_CODE,
                      VMODE: 'DOCUMENT',
                    });
                    console.log("document " + vdt.data.ARTICLE_CODE);
                  }
                } catch (ex) {
                  COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                }
              },
            },
          },
          columns: [
            {
              header: "QTY",
              dataIndex: "STOCK_QTY",
              renderer: "formatAmount",
              align: "right",
              sortable: true,
              width: 80,
              summaryType: "sum",
              summaryRenderer: function (value, summaryData, dataIndex) {
                return '<span style="font-weight:bold;font-size:11px;">' + Ext.util.Format.number(value, "0,000.00/i") + "</span>";
              },
            },
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
    {
      title: "Mutasi Stock",
      collapsible: false,
      region: "center",
      layout: { type: "vbox", pack: "start", align: "stretch" },
      items: [
        {
          xtype: "grid",
          pid: "GRIDmutasi_stock",
          emptyText: "No Matching Records",
          autoScroll: true,
          flex: 1,
          plugins: ["filterfield"],
          viewConfig: {
            enableTextSelection: true,
          },
          features: [
            {
              ftype: "summary",
              dock: "bottom",
            },
          ],
          store: {
            autoLoad: true,
            remoteSort: false,
            remoteFilter: false,
            pageSize: 0,

            fields: [
              { name: "PART_NO", type: "string" },
              { name: "PART_NAME", type: "string" },
              { name: "PART_GROUP", type: "string" },
              { name: "PART_CATEGORY", type: "string" },
              { name: "PART_TYPE", type: "string" },
              { name: "ARTICLE_CODE", type: "string" },

              { name: "QTY_IN", type: "float" },
              { name: "QTY_OUT", type: "float" },
              { name: "STOCK_QTY", type: "float" },
              { name: "QTY_IN_MTR", type: "float" },
              { name: "QTY_OUT_MTR", type: "float" },
              { name: "STOCK_QTY_MTR", type: "float" },
            ],
            proxy: {
              type: "ajax",
              disableCaching: false,
              noCache: false,
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
              actionMethods: { read: "POST" },
              url: vconfig.service_api + "goods_control/goods_controls",
              extraParams: {
                method: "read_mutasi_stock",
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
            { header: "ARTICLE CODE", dataIndex: "ARTICLE_CODE", sortable: true, width: 150, filter: { xtype: "textfield" } },
            { header: "PART NO", dataIndex: "PART_NO", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "NAME", dataIndex: "PART_NAME", sortable: true, flex: 300, filter: { xtype: "textfield" } },
            { header: "GROUP", dataIndex: "PART_GROUP", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "CATEGORY", dataIndex: "PART_CATEGORY", sortable: true, width: 75, filter: { xtype: "textfield" } },
            { header: "TYPE", dataIndex: "PART_TYPE", sortable: true, width: 75, filter: { xtype: "textfield" } },
            { header: "MPQ", dataIndex: "PART_MPQ", sortable: true, width: 75, filter: { xtype: "textfield" } },
            {
              text: "STOCK (COIL)",
              columns: [
                {
                  header: "IN", dataIndex: "QTY_IN", renderer: "formatAmount", align: "right", sortable: true, width: 80,
                  summaryType: "sum",
                  summaryRenderer: function (value, summaryData, dataIndex) {
                    return '<span style="font-weight:bold;font-size:11px;">' + Ext.util.Format.number(value, "0,000.00/i") + "</span>";
                  },
                },
                {
                  header: "OUT", dataIndex: "QTY_OUT", renderer: "formatAmount", align: "right", sortable: true, width: 80,
                  summaryType: "sum",
                  summaryRenderer: function (value, summaryData, dataIndex) {
                    return '<span style="font-weight:bold;font-size:11px;">' + Ext.util.Format.number(value, "0,000.00/i") + "</span>";
                  },
                },
                {
                  header: "STOCK", dataIndex: "STOCK_QTY", renderer: "formatAmount", align: "right", sortable: true, width: 80,
                  summaryType: "sum",
                  summaryRenderer: function (value, summaryData, dataIndex) {
                    return '<span style="font-weight:bold;font-size:11px;">' + Ext.util.Format.number(value, "0,000.00/i") + "</span>";
                  },
                },
              ],
            },
            { width: 20 },
            {
              text: "STOCK (MTR)",
              columns: [
                {
                  header: "IN", dataIndex: "QTY_IN_MTR", renderer: "formatAmount", align: "right", sortable: true, width: 80,
                  summaryType: "sum",
                  summaryRenderer: function (value, summaryData, dataIndex) {
                    return '<span style="font-weight:bold;font-size:11px;">' + Ext.util.Format.number(value, "0,000.00/i") + "</span>";
                  },
                },
                {
                  header: "OUT", dataIndex: "QTY_OUT_MTR", renderer: "formatAmount", align: "right", sortable: true, width: 80,
                  summaryType: "sum",
                  summaryRenderer: function (value, summaryData, dataIndex) {
                    return '<span style="font-weight:bold;font-size:11px;">' + Ext.util.Format.number(value, "0,000.00/i") + "</span>";
                  },
                },
                {
                  header: "STOCK", dataIndex: "STOCK_QTY_MTR", renderer: "formatAmount", align: "right", sortable: true, width: 80,
                  summaryType: "sum",
                  summaryRenderer: function (value, summaryData, dataIndex) {
                    return '<span style="font-weight:bold;font-size:11px;">' + Ext.util.Format.number(value, "0,000.00/i") + "</span>";
                  },
                },
              ],
            },
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
        { xtype: "button", text: "Refresh", pid: "FRMimc_goods_stock_btrefresh_click", icon: vconfig.getstyle + "icon/update.ico", tooltip: "Refresh Data" },
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
