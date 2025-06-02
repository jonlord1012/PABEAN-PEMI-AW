var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.INVENTORY_PLB.inv_material_control_aw.FRMimc_stock_item_aw", {
  extend: "Ext.window.Window",
  alias: "widget.FRMimc_stock_item_aw",
  reference: "FRMimc_stock_item_aw",
  title: "Stock Item",
  modal: true,
  closeAction: "hide",
  centered: true,
  autoScroll: true,
  controller: "Cinv_material_control_aw",
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
          pid: "GRIDitem_receiving",
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
              { name: "RECEIPT_QTY", type: "float" },
            ],
            proxy: {
              type: "ajax",
              disableCaching: false,
              noCache: false,
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
              actionMethods: { read: "POST" },
              url: vconfig.service_api + "inv_material_control_aw/inv_material_control_aws",
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
                  var GRIDmutasi_stock = Ext.ComponentQuery.query("FRMimc_stock_item_aw grid[pid=GRIDmutasi_stock]")[0];
                  var vdt = GRIDmutasi_stock.getSelectionModel().getSelection()[0];
                  if (vdt) {
                    operation.setParams({
                      method: "stockitem_receipt_in",
                      MAPP_PARTNO: vdt.data.MAPP_PARTNO,
                    });
                  }
                } catch (ex) {
                  COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                }
              },
            },
          },
          columns: [
            { header: "TAHUN", dataIndex: "RECEIPT_TAHUN", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "BULAN", dataIndex: "RECEIPT_BULAN", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "PART NO", dataIndex: "MAPP_PARTNO", sortable: true, width: 100, filter: { xtype: "textfield" } },
            {
              header: "QTY",
              dataIndex: "RECEIPT_QTY",
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
          pid: "GRIDitem_out",
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
              url: vconfig.service_api + "inv_material_control_aw/inv_material_control_aws",
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
                  var GRIDmutasi_stock = Ext.ComponentQuery.query("FRMimc_stock_item_aw grid[pid=GRIDmutasi_stock]")[0];
                  var vdt = GRIDmutasi_stock.getSelectionModel().getSelection()[0];
                  if (vdt) {
                    operation.setParams({
                      method: "stockitem_out",
                      MAPP_PARTNO: vdt.data.MAPP_PARTNO,
                    });
                  }
                } catch (ex) {
                  COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                }
              },
            },
          },
          columns: [
            { header: "TAHUN", dataIndex: "OUT_TAHUN", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "BULAN", dataIndex: "OUT_BULAN", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "PART NO", dataIndex: "MAPP_PARTNO", sortable: true, width: 100, filter: { xtype: "textfield" } },
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
            },
            {
              header: "TOTAL",
              dataIndex: "OUT_TOTAL",
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
      width: 400,
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
              url: vconfig.service_api + "inv_material_control_aw/inv_material_control_aws",
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
                  var GRIDmutasi_stock = Ext.ComponentQuery.query("FRMimc_stock_item_aw grid[pid=GRIDmutasi_stock]")[0];
                  var vdt = GRIDmutasi_stock.getSelectionModel().getSelection()[0];
                  if (vdt) {
                    operation.setParams({
                      method: "stockitem_bydocument",
                      MAPP_PARTNO: vdt.data.MAPP_PARTNO,
                    });
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
          store: {
            autoLoad: true,
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
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
              actionMethods: { read: "POST" },
              url: vconfig.service_api + "inv_material_control_aw/inv_material_control_aws",
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
            { header: "PART NO", dataIndex: "MAPP_PARTNO", sortable: true, width: 100, filter: { xtype: "textfield" } },
            { header: "NAME", dataIndex: "PART_NAME", sortable: true, flex: 1, filter: { xtype: "textfield" } },
            { header: "GROUP", dataIndex: "PART_GROUP", sortable: true, width: 75, filter: { xtype: "textfield" } },
            { header: "CATEGORY", dataIndex: "PART_CATEGORY", sortable: true, width: 75, filter: { xtype: "textfield" } },
            { header: "TYPE", dataIndex: "PART_TYPE", sortable: true, width: 75, filter: { xtype: "textfield" } },
            {
              text: "STOCK",
              columns: [
                { header: "IN", dataIndex: "IN_QTY", renderer: "formatAmount", align: "right", sortable: true, width: 80 },
                { header: "OUT", dataIndex: "OUT_QTY", renderer: "formatAmount", align: "right", sortable: true, width: 80 },
                { header: "STOCK", dataIndex: "STOCK_QTY", renderer: "formatAmount", align: "right", sortable: true, width: 80 },
              ],
            },
            { width: 20 },
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
        { xtype: "button", text: "Refresh", pid: "FRMimc_stock_item_aw_btrefresh", icon: vconfig.getstyle + "icon/update.ico", tooltip: "Refresh Data" },
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
