var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.INVENTORY_PLB.goods_racking.FRM_goods_racking_putaway", {
  extend: "Ext.window.Window",
  alias: "widget.FRM_goods_racking_putaway",
  reference: "FRM_goods_racking_putaway",
  title: "Receiving from Integrasi",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: false,
  controller: "Cgoods_racking",
  //y: -110,
  width: mainpanel.getWidth() * 0.95,
  height: mainpanel.getHeight() * 0.95,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF; margin:1px;",
  items: [
    {
      xtype: "container",
      layout: { type: "hbox", pack: "start", align: "stretch" },
      flex: 1,
      margin: "0 30 30 0",
      items: [
        {
          xtype: "grid",
          pid: "GRID_goods_racking_putaway",
          emptyText: "No Matching Records",
          flex: 1,
          height: mainpanel.getHeight() * 0.6,
          plugins: [
            "filterfield",
            {
              ptype: "cellediting",
            },
          ],
          viewConfig: {
            enableTextSelection: true,
          },
          store: {
            autoLoad: true,
            remoteSort: false,
            remoteFilter: true,
            pageSize: 50,
            proxy: {
              type: "ajax",
              disableCaching: false,
              timeout: 0,
              noCache: false,
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
              actionMethods: { read: "POST" },
              url: vconfig.service_api + "goods_racking/goods_rackings",
              extraParams: {
                method: "read_integrasi_binloc",
                module: 'AUTO',
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
                  var vdate = Ext.ComponentQuery.query("FRM_goods_racking_putaway datefield[name=TANGGAL_RACKING]")[0];
                  operation.setParams({
                    vdate: moment(vdate.getValue()).format("YYYY-MM-DD"),
                  });
                } catch (ex) {
                  COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
                }
              },
            },
          },
          columns: [
            { xtype: "rownumberer", width: 50 },
            {
              text: "SOURCE BINLOC",
              columns: [
                { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "RECEIPT DATE", dataIndex: "TRANS_DATE", renderer: "formatDate" },
                { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "RECEIPT NO", dataIndex: "TRANS_NO" },
                { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "INVOICE", dataIndex: "INVOICE_NO" },
                { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "ARTICLE CODE", dataIndex: "ARTICLE_CODE" },
                { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "KODE LOT", dataIndex: "LOT_NO" },
              ],
            },
            {
              text: "PUTAWAY DATA",
              columns: [
                { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "PUTAWAY DATE", dataIndex: "PUTAWAY_DATE", renderer: "formatDate" },
                { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "PUTAWAY TO", dataIndex: "PUT_AWAY_TO" },
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
        { xtype: "tbspacer", width: 10 },
        "-",
        { xtype: "datefield", labelWidth: 100, width: 220, fieldLabel: "Tanggal Racking", name: "TANGGAL_RACKING", fieldCls: "fieldinput", readOnly: false, format: "Y-m-d", value: new Date() },
        "-",
        { xtype: "tbspacer", width: 10, text: "-" },
        { xtype: "button", text: "Process Synchronize", pid: "racking_synchronize", icon: vconfig.getstyle + "icon/update.ico", tooltip: "Process Synchronize" },
      ],
    },
    {
      xtype: "toolbar",
      dock: "bottom",
      height: 30,
      items: [
        {
          xtype: "label",
          html: "<b>NOTES:: Data yang akan disimpan dalam IT INVENTORY PABEAN, <span style='color:white;'>HANYA DATA yang memiliki NOMOR DAFTAR & NOMOR AJU</span></b>",
        }
      ],

    },
  ],
});
