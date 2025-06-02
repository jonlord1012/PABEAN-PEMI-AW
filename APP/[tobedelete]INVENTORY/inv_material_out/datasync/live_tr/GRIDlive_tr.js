Ext.define("TDK.INVENTORY.inv_material_out.datasync.live_tr.GRIDlive_tr", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDlive_tr",
  reference: "GRIDlive_tr",
  frame: false,
  border: false,
  autoScroll: true,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
  items: [
    {
      xtype: "grid",
      pid: "GRIDlive_tr",
      emptyText: "No Matching Records",
      autoScroll: true,
      flex: 1,
      plugins: ["filterfield"],
      store: "",
      columns: [
        { xtype: "rownumberer", width: 50 },
        { header: "DATE", dataIndex: "TR_DATE", sortable: true, width: 120, filter: { xtype: "textfield" } },
        { header: "INVOICE", dataIndex: "PACKINGLISTNO", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "PARTCODE", dataIndex: "PARTCODE", sortable: true, width: 150, filter: { xtype: "textfield" } },
        { header: "QTY", dataIndex: "QTY", sortable: true, width: 120, align: "right", renderer: "formatqty", filter: { xtype: "textfield" } },
        { header: "REMARK", dataIndex: "TR_NAME", sortable: true, flex: 1, filter: { xtype: "textfield" } },
      ],
      bbar: {
        xtype: "pagingtoolbar",
        displayInfo: true,
        displayMsg: "Displaying topics {0} - {1} of {2}",
        emptyMsg: "No topics to display",
      },
      listeners: {
        afterrender: "GRIDlive_tr_load",
      },
    },
  ],
});
