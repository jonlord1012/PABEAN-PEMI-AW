Ext.define("TDK.INVENTORY.inv_material_out.trans.proses_out.FRMproses_out", {
  extend: "Ext.form.Panel",
  alias: "widget.FRMproses_out",
  reference: "FRMproses_out",
  frame: false,
  border: true,
  autoScroll: true,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
  items: [
    {
      xtype: "form",
      bodyPadding: "5 5 5 5",
      fieldDefaults: {
        labelAlign: "left",
        labelWidth: 70,
        margin: "0 10 5 0",
      },
      height: 80,
      border: false,
      items: [
        {
          xtype: "container",
          layout: "hbox",
          items: [
            {
              margin: "0 0 20 0",
              xtype: "component",
              html: ["Tekan Tombol Konfirmasi untuk melakukan proses Submit"],
            },
          ],
        },
        {
          xtype: "button",
          text: "Synchronize Data Production",
          pid: "btkonfirm_outproduction",
          icon: vconfig.getstyle + "icon/refresh.gif",
          tooltip: "Synchronize Data Production",
          handler: "btkonfirm_outproduction",
        },
      ],
    },
    { xtype: "tbspacer", height: 10 },
    {
      collapsible: false,
      region: "center",
      xtype: "tabpanel",
      pid: "get_outproduction_tabpanel",
      frame: false,
      border: true,
      activeTab: 0,
      flex: 1,
      items: [
        {
          title: "Hasil Out To Production & Dokumen BC Generate",
          layout: { type: "vbox", pack: "start", align: "stretch" },
          items: [
            {
              xtype: "grid",
              pid: "GRIDout_production",
              emptyText: "No Matching Records",
              autoScroll: true,
              title: "",
              flex: 1,
              plugins: ["filterfield"],
              store: "",
              columns: [
                { xtype: "rownumberer", width: 40 },
                { header: "INVOICE", dataIndex: "INVOICE", sortable: true, width: 80, filter: { xtype: "textfield" } },
                { header: "PARTCODE", dataIndex: "PARTCODE", sortable: true, width: 100, filter: { xtype: "textfield" } },
                { header: "QTY", dataIndex: "QTY", sortable: true, width: 80, align: "right", renderer: "formatqty", filter: { xtype: "textfield" } },
              ],
              bbar: {
                xtype: "pagingtoolbar",
                displayInfo: true,
                displayMsg: "Total Data {2}",
                emptyMsg: "No topics to display",
              },
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
        "-",
        { xtype: "datefield", labelWidth: 130, width: 300, fieldLabel: "Tanggal Out Production", name: "TANGGAL_OUT", fieldCls: "fieldinput", readOnly: false, enforceMaxLength: true, emptyText: "Tgl Dokumen", format: "Y-m-d" },
        {
          xtype: "button",
          text: "Get Data & Mapping Dokumen",
          pid: "btmapping_outproduction",
          icon: vconfig.getstyle + "icon/two%20displays.ico",
          tooltip: "Mapping Data Out Production",
          handler: "btmapping_outproduction",
        },
        "->",
        {
          xtype: "checkbox",
          boxLabel: "Same as Invoice Number",
          name: "CHCEK_INVOICE",
          hideLabel: true,
          checked: true,
        },
      ],
      // other options....
    },
  ],
});
