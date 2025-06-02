var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.INVENTORY.inv_material_out.FRMout_toproduction_pis", {
  extend: "Ext.window.Window",
  alias: "widget.FRMout_toproduction_pis",
  reference: "FRMout_toproduction_pis",
  title: "Out To Production (Integration PIS)",
  modal: true,
  closeAction: "hide",
  centered: true,
  autoScroll: true,
  controller: "Cinv_material_out",
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
          pid: "GRIDout_toproduction_pis",
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
              url: vconfig.service_api + "inv_material_out/inv_material_outs",
              extraParams: {
                method: "integrasi_pis_out",
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
                  var vdate = Ext.ComponentQuery.query("FRMout_toproduction_pis datefield[name=TANGGAL_OUT]")[0];
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
                { sortable: true, width: 90, filter: { xtype: "textfield" }, header: "OUT DATE", dataIndex: "PIS_TR_DATE" },
                { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "INVOICE", dataIndex: "PIS_PACKINGLISTNO" },
                { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "PART NO", dataIndex: "PIS_PARTCODE" },
                { sortable: true, width: 80, align: "right", renderer: "formatqty", header: "QTY", dataIndex: "PIS_QTY" },
                { sortable: true, width: 80, align: "right", renderer: "formatqty", header: "DIPROSES", dataIndex: "PROCESS_QTY" },
                { sortable: true, width: 80, align: "right", renderer: "formatqty", header: "SISA", dataIndex: "PENDING_QTY" },
              ],
            },
            {
              text: "RECEIVING",
              columns: [
                { sortable: true, width: 90, filter: { xtype: "textfield" }, header: "INVOICE", dataIndex: "INVOICE_NO" },
                { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "PART NO", dataIndex: "MAPP_PARTNO" },
                { sortable: true, width: 80, align: "right", renderer: "formatqty", header: "QTY", dataIndex: "QTY" },
              ],
            },
            {
              text: "STOCK QTY",
              columns: [
                { sortable: true, width: 80, align: "right", renderer: "formatqty", header: "OUT", dataIndex: "OUT_QTY" },
                { sortable: true, width: 80, align: "right", renderer: "formatqty", header: "SISA", dataIndex: "SISA_QTY" },
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
        { xtype: "button", text: "Process Synchronize", pid: "pisbtprocessout_synchronize", icon: vconfig.getstyle + "icon/update.ico", tooltip: "Process Synchronize" },
      ],
    },
  ],
});
