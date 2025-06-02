var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.INVENTORY.inv_material_in.FRMinv_material_in_pis", {
  extend: "Ext.window.Window",
  alias: "widget.FRMinv_material_in_pis",
  reference: "FRMinv_material_in_pis",
  title: "Receiving from Integrasi",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: true,
  controller: "Cinv_material_in",
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
          pid: "GRIDinv_material_in_pis",
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
              url: vconfig.service_api + "inv_material_in/inv_material_ins",
              extraParams: {
                method: "read_integrasi_pis",
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
                  var vdate = Ext.ComponentQuery.query("FRMinv_material_in_pis datefield[name=TANGGAL_RCV]")[0];
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
              text: "DATA PIS",
              columns: [
                { sortable: true, width: 60, filter: { xtype: "textfield" }, header: "STATUS", dataIndex: "ST" },
                { sortable: true, width: 90, filter: { xtype: "textfield" }, header: "RECEIPT DATE", dataIndex: "PIS_RECEIPT_DATE" },
                { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "INVOICE", dataIndex: "PIS_PACKINGLISTNO" },
                { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "PART NO", dataIndex: "PIS_PART_CODE" },
                { sortable: true, width: 80, align: "right", renderer: "formatqty", header: "QTY", dataIndex: "PIS_QTY" },
              ],
            },
            {
              text: "SUMBER DATA",
              columns: [
                {
                  xtype: "actioncolumn",
                  width: 35,
                  align: "center",
                  menuDisabled: true,
                  sortable: false,
                  items: [
                    {
                      icon: vconfig.getstyle + "icon/grid.png",
                      handler: "btdetail_sumberdata_onclick",
                      tooltip: "Detail Sumber Data Dokumen",
                    },
                  ],
                },
                { sortable: true, width: 65, filter: { xtype: "textfield" }, header: "SOURCE", dataIndex: "MODE_SOURCE" },
                { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "INVOICE", dataIndex: "INVOICE_NO" },
                { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "PART NO", dataIndex: "PART_NO" },
                { sortable: true, width: 80, align: "right", renderer: "formatqty", header: "QTY", dataIndex: "QTY" },
              ],
            },
            {
              text: "RECEIVING",
              columns: [
                { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "PART NO", dataIndex: "RCV_PARTNO" },
                { sortable: true, width: 80, align: "right", renderer: "formatqty", header: "QTY", dataIndex: "RCV_QTY" },
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
