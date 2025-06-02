Ext.define("NJC.INVENTORY_PLB.goods_in.GRIDgoods_in", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDgoods_in",
  reference: "GRIDgoods_in",
  frame: false,
  border: false,
  autoScroll: true,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
  items: [
    {
      xtype: "grid",
      pid: "GRIDgoods_in",
      emptyText: "No Matching Records",
      autoScroll: true,
      flex: 1,
      plugins: ["filterfield", "gridexporter"],
      viewConfig: {
        enableTextSelection: true,
      },
      pageSize: 20,
      store: {
        autoLoad: true,
        remoteSort: true,
        remoteFilter: true,
        pageSize: 20,
        proxy: {
          type: "ajax",
          disableCaching: false,
          noCache: false,
          headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "goods_in/goods_ins",
          extraParams: {
            method: "read_in",
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
              icon: vconfig.getstyle + "icon/grid.png",
              handler: "btdetail_aw_rows_click",
              tooltip: "Detail Dokumen",
            },
          ],
        }, {
          text: "DOKUMEN",
          columns: [
            { hidden: true, header: "ID", dataIndex: "ID", sortable: true, width: 200, filter: { xtype: "textfield" } },
            {
              header: "RECEIPT NO", dataIndex: "RECEIPT_NO", sortable: true, width: 235, filter: { xtype: "textfield" },
              exportStyle: {
                type: 'html',
                alignment: {
                  horizontal: 'Center'
                }
              },
            },
            {
              header: "RECEIPT DATE", dataIndex: "RECEIPT_DATE", sortable: true, width: 100, filter: { xtype: "textfield" },
              exportStyle: {
                type: 'html',
                alignment: {
                  horizontal: 'Center'
                }
              },
            },
            {
              header: "INVOICE", dataIndex: "INVOICE_NO", sortable: true, width: 150, filter: { xtype: "textfield" },
              exportStyle: {
                type: 'html',
                alignment: {
                  horizontal: 'Center'
                }
              },
            },
            {
              header: "ARTICLE CODE", dataIndex: "ARTICLE_CODE", sortable: true, width: 200, filter: { xtype: "textfield" },
              exportStyle: {
                type: 'html',
                alignment: {
                  horizontal: 'Center'
                }
              },
            },
            {
              header: "LOT NO", dataIndex: "LOT_NO", sortable: true, width: 155, filter: { xtype: "textfield" },
              exportStyle: {
                type: 'html',
                alignment: {
                  horizontal: 'Center'
                }
              },
            },
            {
              header: "QTY", dataIndex: "RECEIPT_QTY", sortable: true, align: "right", renderer: "formatqty", width: 100, filter: { xtype: "textfield" },
              exportStyle: {
                type: 'html',
                alignment: {
                  horizontal: 'Center'
                }
              },
            },
            {
              header: "MPQ", dataIndex: "PART_MPQ", sortable: true, renderer: "formatqty", width: 100, filter: { xtype: "textfield" },
              exportStyle: {
                type: 'html',
                alignment: {
                  horizontal: 'Center'
                }
              },
            },
            {
              header: "NOMOR AJU", dataIndex: "NOMOR_AJU", sortable: true, width: 260, filter: { xtype: "textfield" },
              exportStyle: {
                type: 'html',
                alignment: {
                  horizontal: 'Center'
                }
              },
            },
            {
              header: "TANGGAL AJU", dataIndex: "TANGGAL_AJU", sortable: true, width: 100, filter: { xtype: "textfield" },
              exportStyle: {
                type: 'html',
                alignment: {
                  horizontal: 'Center'
                }
              },
            },
            {
              header: "NOMOR DAFTAR", dataIndex: "NOMOR_DAFTAR", sortable: true, width: 150, filter: { xtype: "textfield" },
              exportStyle: {
                type: 'html',
                alignment: {
                  horizontal: 'Center'
                }
              },
            },
            {
              header: "TANGGAL DAFTAR", dataIndex: "TANGGAL_DAFTAR", sortable: true, width: 100, filter: { xtype: "textfield" },
              exportStyle: {
                type: 'html',
                alignment: {
                  horizontal: 'Center'
                }
              },
            },
            {
              header: "TRANS_NO", dataIndex: "INVOICE_NO_ALT", sortable: true, width: 100, filter: { xtype: "textfield" },
              exportStyle: {
                type: 'html',
                alignment: {
                  horizontal: 'Center'
                }
              },
            },
          ],
        },
      ],
      bbar: {
        xtype: "pagingtoolbar",
        displayInfo: true,
        displayMsg: "Displaying topics {0} - {1} of {2}",
        emptyMsg: "No topics to display",
      },
      listeners: {
        afterrender: "GRIDgoods_in_load",
      },
    },
  ],
});
