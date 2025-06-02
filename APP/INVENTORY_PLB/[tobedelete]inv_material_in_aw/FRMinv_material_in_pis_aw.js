var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.INVENTORY_PLB.inv_material_in_aw.FRMinv_material_in_aw_pis", {
  extend: "Ext.window.Window",
  alias: "widget.FRMinv_material_in_aw_pis",
  reference: "FRMinv_material_in_aw_pis",
  title: "Receiving from Integrasi",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: true,
  controller: "Cinv_material_in_aw",
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
          pid: "GRIDinv_material_in_aw_pis",
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
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
              actionMethods: { read: "POST" },
              url: vconfig.service_api + "inv_material_in_aw/inv_material_in_aws",
              extraParams: {
                method: "read_integrasi_pis",
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
                  var vdate = Ext.ComponentQuery.query("FRMinv_material_in_aw_pis datefield[name=TANGGAL_RCV]")[0];
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
              text: "SOURCE PIS",
              columns: [
                { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "RECEIPT DATE", dataIndex: "RCV_RECEIPT_DATE" },
                { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "INVOICE", dataIndex: "RCV_INVOICE_NO" },
                { sortable: true, width: 200, filter: { xtype: "textfield" }, header: "PART NO", dataIndex: "RCV_PART_NO" },
                { sortable: true, width: 100, align: "right", renderer: "formatqty", header: "QTY", dataIndex: "RCV_QTY" },
              ],
            },
            {
              text: "SUMBER DATA",
              columns: [
                { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "INVOICE NO", dataIndex: "INVOICE_NO" },
                { sortable: true, width: 200, filter: { xtype: "textfield" }, header: "PART NO", dataIndex: "PART_NO" },
                { sortable: true, width: 100, align: "right", renderer: "formatqty", header: "QTY", dataIndex: "QTY" },
                { sortable: true, width: 50, filter: { xtype: "textfield" }, header: "SOURCE", dataIndex: "MODE_SOURCE" },
                { sortable: true, width: 55, filter: { xtype: "textfield" }, header: "BC TYPE", dataIndex: "BC_TYPE" },
                { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NO AJU", dataIndex: "NOMOR_AJU" },
                { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TGL AJU", dataIndex: "TANGGAL_AJU" },
                { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NO DAFTAR", dataIndex: "NOMOR_DAFTAR" },
                { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TGL DAFTAR", dataIndex: "TANGGAL_DAFTAR" },
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
        { xtype: "datefield", labelWidth: 100, width: 220, fieldLabel: "Tanggal Receiving", name: "TANGGAL_RCV", fieldCls: "fieldinput", readOnly: false, format: "Y-m-d", value: new Date() },
        "-",
        { xtype: "tbspacer", width: 10, text: "-" },
        { xtype: "button", text: "Process Synchronize", pid: "pisbtprocess_synchronize", icon: vconfig.getstyle + "icon/update.ico", tooltip: "Process Synchronize" },
      ],
    },
  ],
});
