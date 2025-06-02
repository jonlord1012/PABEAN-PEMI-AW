var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.INVENTORY_PLB.goods_out.FRMout_toproduction_bicc", {
  extend: "Ext.window.Window",
  alias: "widget.FRMout_toproduction_bicc",
  reference: "FRMout_toproduction_bicc",
  title: "Out To Production (Integration BICC)",
  modal: true,
  closeAction: "hide",
  centered: true,
  autoScroll: false,
  controller: "Cgoods_out",
  //y: -110,
  width: mainpanel.getWidth() * 0.9,
  height: mainpanel.getHeight() * 0.9,
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
          pid: "GRIDout_toproduction_bicc",
          emptyText: "No Matching Records",
          flex: 1,
          plugins: [
            "filterfield",
            {
              ptype: "cellediting",
              clicksToEdit: 1,
            },
          ],
          viewConfig: {
            enableTextSelection: true,
            getRowClass: function (rec, meta) {
              var tdcls = " ";
              if (rec.data.ST === "NO") {
                tdcls = "row-red";
              }
              return tdcls;
            },
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
              url: vconfig.service_api + "inv_material_out_aw/inv_material_out_aws",
              extraParams: {
                method: "integrasi_bicc_out2",
                module: "read",
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
                  var vdate = Ext.ComponentQuery.query("FRMout_toproduction_bicc datefield[name=TANGGAL_OUT]")[0];
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
              xtype: "actioncolumn",
              width: 35,
              align: "center",
              menuDisabled: true,
              sortable: false,
              items: [
                {
                  icon: vconfig.getstyle + "icon/grid.png",
                  handler: "btdetail_aw_rows_select_invoice",
                  tooltip: "Pilih Invoice",
                },
              ],
            },
            {
              text: "DATA BICC",
              columns: [
                { sortable: true, width: 60, filter: { xtype: "textfield" }, header: "STATUS", dataIndex: "ST" },
                { sortable: true, width: 90, filter: { xtype: "textfield" }, header: "OUT DATE", dataIndex: "BICC_TR_DATE" },
                { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "INVOICE", dataIndex: "BICC_INVOICE_NO" },
                { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "PART NO", dataIndex: "BICC_PART_NO" },
                { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "LOT NO", dataIndex: "BICC_LOT_NO" },
                { sortable: true, width: 80, align: "right", renderer: "formatqty", header: "QTY", dataIndex: "BICC_QTY" },
              ],
            },
            {
              text: "RECEIVING",
              columns: [
                { sortable: true, width: 90, filter: { xtype: "textfield" }, header: "INVOICE", dataIndex: "INVOICE_NO" },
                { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "PART NO", dataIndex: "PART_NO" },
                { sortable: true, width: 80, align: "right", renderer: "formatqty", header: "QTY INVOICE", dataIndex: "QTY_INVOICE" },
                { sortable: true, width: 80, align: "right", renderer: "formatqty", header: "QTY", dataIndex: "QTY_BPB" },
              ],
              
            },
            {
              text: "STOCK",
              columns: [
                { sortable: true, width: 80, align: "right", renderer: "formatqty", header: "OUT", dataIndex: "" },
                { sortable: true, width: 80, align: "right", renderer: "formatqty", header: "SISA", dataIndex: "" },
              ],
            },
            {
              columns: [
                { sortable: true, width: 80, align: "right", renderer: "formatqty", header: "TANGGAL_DOKUMEN", dataIndex: "TANGGAL_DOKUMEN" , hidden:true },
                { sortable: true, width: 80, align: "right", renderer: "formatqty", header: "NOMOR_AJU", dataIndex: "NOMOR_AJU", hidden:true  },
                { sortable: true, width: 80, align: "right", renderer: "formatqty", header: "TANGGAL_AJU", dataIndex: "TANGGAL_AJU", hidden:true  },
                { sortable: true, width: 80, align: "right", renderer: "formatqty", header: "NOMOR_DAFTAR", dataIndex: "NOMOR_DAFTAR", hidden:true  },
                { sortable: true, width: 80, align: "right", renderer: "formatqty", header: "TANGGAL_DAFTAR", dataIndex: "TANGGAL_DAFTAR", hidden:true  },
                { sortable: true, width: 80, align: "right", renderer: "formatqty", header: "SERI_BARANG", dataIndex: "SERI_BARANG", hidden:true  },
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
        { xtype: "datefield", labelWidth: 80, width: 220, fieldLabel: "Tanggal Out", name: "TANGGAL_OUT", fieldCls: "fieldinput", readOnly: false, format: "Y-m-d", value: new Date() },
        "-",
        { xtype: "tbspacer", width: 10, text: "-" },
        { xtype: "button", text: "Process Synchronize", pid: "btprocessout_synchronize", icon: vconfig.getstyle + "icon/update.ico", tooltip: "Process Synchronize" },
      ],
    },
  ],
});
