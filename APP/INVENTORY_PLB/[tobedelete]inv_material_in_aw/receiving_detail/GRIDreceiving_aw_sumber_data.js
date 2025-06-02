Ext.define("TDK.INVENTORY_PLB.inv_material_in_aw.receiving_detail.GRIDreceiving_aw_sumber_data", {
    extend: "Ext.form.Panel",
    alias: "widget.GRIDreceiving_aw_sumber_data",
    reference: "GRIDreceiving_aw_sumber_data",
    frame: false,
    border: true,
    autoScroll: true,
    layout: { type: "vbox", pack: "start", align: "stretch" },
    requires: [],
    items: [
      {
        xtype: "grid",
        pid: "GRIDreceiving_aw_sumber_data",
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
            headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
            actionMethods: { read: "POST" },
            url: vconfig.service_api + "inv_material_in_aw/inv_material_in_aws",
            extraParams: {
              method: "read_receivingdata_sumber_data",
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
                var GRID = Ext.ComponentQuery.query("inv_material_in_aw GRIDinv_material_in_aw grid[pid=GRIDinv_material_in_aw]")[0];
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
          { header: "VENDOR", dataIndex: "VENDOR", sortable:  true, width: 150, filter:  { xtype:  "textfield" }},
          { header: "VENDOR_NAME", dataIndex: "VENDOR_NAME", sortable:  true, width: 100, filter:  { xtype:  "textfield" }},
          { header: "INVOICE_NO", dataIndex: "INVOICE_NO", sortable:  true, width: 80, filter:  { xtype:  "textfield" }},
          { header: "INVOICE_DATE", dataIndex: "INVOICE_DATE", sortable:  true, width: 80, filter:  { xtype:  "textfield" }, renderer:  "formatDate"  },
          { header: "FAKTUR_NO", dataIndex: "FAKTUR_NO", sortable:  true, width: 80, filter:  { xtype:  "textfield" }},
          { header: "FAKTUR_DATE", dataIndex: "FAKTUR_DATE", sortable:  true, width: 100, filter:  { xtype:  "textfield" }, renderer:  "formatDate"  },
          { header: "GR_NUMBER", dataIndex: "GR_NUMBER", sortable:  true, width: 100, filter:  { xtype:  "textfield" }},
          { header: "GR_DATE", dataIndex: "GR_DATE", sortable:  true, width: 100, filter:  { xtype:  "textfield" }, renderer:  "formatDate"  },
          { header: "GR_SUPPLIERNO", dataIndex: "GR_SUPPLIERNO", sortable:  true, width: 100, filter:  { xtype:  "textfield" }},
          { header: "GR_SUPPLIER_DATE", dataIndex: "GR_SUPPLIER_DATE", sortable:  true, width: 100, filter:  { xtype:  "textfield" }, renderer:  "formatDate"  },
          { header: "PO_NUMBER", dataIndex: "PO_NUMBER", sortable:  true, width: 100, filter:  { xtype:  "textfield" }},
          { header: "PO_DATE", dataIndex: "PO_DATE", sortable:  true, width: 100, filter:  { xtype:  "textfield" }, renderer:  "formatDate"  },
          { header: "LOT_NO", dataIndex: "LOT_NO", sortable:  true, width: 100, filter:  { xtype:  "textfield" }},
          { header: "PART_CODE", dataIndex: "PART_CODE", sortable:  true, width: 100, filter:  { xtype:  "textfield" }},
          { header: "PART_NUMBER", dataIndex: "PART_NUMBER", sortable:  true, width: 100, filter:  { xtype:  "textfield" }},
          { header: "PART_UNIT", dataIndex: "PART_UNIT", sortable:  true, width: 100, filter:  { xtype:  "textfield" }},
          { header: "GR_QTY", dataIndex: "GR_QTY", sortable:  true, width: 100, filter:  { xtype:  "textfield" }, renderer:  "formatQty"  },
          { header: "HARGA", dataIndex: "HARGA", sortable:  true, width: 100, filter:  { xtype:  "textfield" }, renderer:  "formatAmount"  },
          { header: "CURRENCY", dataIndex: "CURRENCY", sortable:  true, width: 100, filter:  { xtype:  "textfield" }},
          { header: "NDPBM", dataIndex: "NDPBM", sortable:  true, width: 100, filter:  { xtype:  "textfield" }, renderer:  "formatAmount"  },
          { header: "CARA_BAYAR", dataIndex: "CARA_BAYAR", sortable:  true, width: 100, filter:  { xtype:  "textfield" }},
          { header: "CIF", dataIndex: "CIF", sortable:  true, width: 100, filter:  { xtype:  "textfield" }, renderer:  "formatAmount"  },
          { header: "NETTO", dataIndex: "NETTO", sortable:  true, width: 100, filter:  { xtype:  "textfield" }, renderer:  "formatQty"  },
          { header: "BRUTO", dataIndex: "BRUTO", sortable:  true, width: 100, filter:  { xtype:  "textfield" }, renderer:  "formatQty"  },
          { header: "ID_COMPANY", dataIndex: "ID_COMPANY", sortable:  true, width: 100, filter:  { xtype:  "textfield" }},
          { header: "BC_TYPE", dataIndex: "BC_TYPE", sortable:  true, width: 100, filter:  { xtype:  "textfield" }},
          { header: "NOMOR_AJU", dataIndex: "NOMOR_AJU", sortable:  true, width: 100, filter:  { xtype:  "textfield" }},
          { header: "TANGGAL_AJU", dataIndex: "TANGGAL_AJU", sortable:  true, width: 100, filter:  { xtype:  "textfield" }},
          { header: "NOMOR_DAFTAR", dataIndex: "NOMOR_DAFTAR", sortable:  true, width: 100, filter:  { xtype:  "textfield" }},
          { header: "TANGGAL_DAFTAR", dataIndex: "TANGGAL_DAFTAR", sortable:  true, width: 100, filter:  { xtype:  "textfield" }},
          { header: "MAPP_SUPPLIER", dataIndex: "MAPP_SUPPLIER", sortable:  true, width: 100, filter:  { xtype:  "textfield" }},
          { header: "MAPP_PARTNO", dataIndex: "MAPP_PARTNO", sortable:  true, width: 100, filter:  { xtype:  "textfield" }},
          { header: "CREATE_USER", dataIndex: "CREATE_USER", sortable:  true, width: 100, filter:  { xtype:  "textfield" }},
          { header: "CREATE_DATE", dataIndex: "CREATE_DATE", sortable:  true, width: 100, filter:  { xtype:  "textfield" }, renderer:  "formatDate"  },
          { header: "ID_ORI", dataIndex: "ID_ORI", sortable:  true, width: 100, filter:  { xtype:  "textfield" }},
          { header: "NO_ORI", dataIndex: "NO_ORI", sortable:  true, width: 100, filter:  { xtype:  "textfield" }},
          { header: "ID_BC_DETAIL", dataIndex: "ID_BC_DETAIL", sortable:  true, width: 100, filter:  { xtype:  "textfield" }},
          { header: "BC_TYPE_PABEAN", dataIndex: "BC_TYPE_PABEAN", sortable:  true, width: 100, filter:  { xtype:  "textfield" }},
          { header: "INVOICE_QTY", dataIndex: "INVOICE_QTY", sortable:  true, width: 100, filter:  { xtype:  "textfield" }, renderer:  "formatQty"  },
          { header: "PO_QTY", dataIndex: "PO_QTY", sortable:  true, width: 100, filter:  { xtype:  "textfield" }, renderer:  "formatQty"  },
          { header: "ID_HEADER_ORI", dataIndex: "ID_HEADER_ORI", sortable:  true, width: 100, filter:  { xtype:  "textfield" }},
                    
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
  