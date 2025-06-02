var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.INVENTORY.inv_subassy_aw_in.FRMinv_subassy_aw_auto", {
  extend: "Ext.window.Window",
  alias: "widget.FRMinv_subassy_aw_auto",
  reference: "FRMinv_subassy_aw_auto",
  title: "Receiving from Integrasi(AW)",
  modal: true,
  closeAction: "hide",
  centered: true,
  autoScroll: true,
  controller: "Cinv_subassy_aw_in",
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
          pid: "GRIDinv_subassy_aw_auto",
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
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
              actionMethods: { read: "POST" },
              url: vconfig.service_api + "inv_subassy_aw_in/inv_subassy_aw_ins",
              extraParams: {
                method: "read_integrasi_aw",
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
                  var vdate = Ext.ComponentQuery.query("FRMinv_subassy_aw_auto datefield[name=TANGGAL_RCV]")[0];
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
            { sortable: true, width: 60, filter: { xtype: "textfield" }, header: "STATUS", dataIndex: "ST" },
            { sortable: true, width: 90, filter: { xtype: "textfield" }, header: "RECEIPT DATE", dataIndex: "AW_RECEIPT_DATE" },
            { sortable: true, width: 120, filter: { xtype: "textfield" }, header: "PO/RECEIPT NO", dataIndex: "AW_RECEIPT_NO" },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "INVOICE / DO", dataIndex: "AW_INVOICE_NO" },
            { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "PART NO", dataIndex: "AW_PART_NO" },
            { sortable: true, width: 50, filter: { xtype: "textfield" }, header: "SEQNO", dataIndex: "AW_URUT" },
            { sortable: true, width: 80, align: "right", renderer: "formatqty", filter: { xtype: "textfield" }, header: "MIN_PACK", dataIndex: "AW_MIN_PACK" },
            { sortable: true, width: 80, align: "right", renderer: "formatqty", filter: { xtype: "textfield" }, header: "QTY_COIL", dataIndex: "AW_QTY_COIL" },
            { sortable: true, width: 80, align: "right", renderer: "formatqty", filter: { xtype: "textfield" }, header: "QTY", dataIndex: "AW_QTY" },
            { sortable: true, width: 80, align: "right", renderer: "formatqty", filter: { xtype: "textfield" }, header: "RECEIPT", dataIndex: "RECEIPT_QTY" },
            { sortable: true, width: 80, align: "right", renderer: "formatqty", filter: { xtype: "textfield" }, header: "PROCESS", dataIndex: "SISA_QTY" },
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
        { xtype: "button", text: "Process Synchronize", pid: "awbtprocess_synchronize", icon: vconfig.getstyle + "icon/update.ico", tooltip: "Process Synchronize" },
      ],
    },
  ],
});
