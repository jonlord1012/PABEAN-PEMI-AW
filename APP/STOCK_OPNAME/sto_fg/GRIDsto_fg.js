Ext.define("TDK.STOCK_OPNAME.sto_fg.GRIDsto_fg", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDsto_fg",
  reference: "GRIDsto_fg",
  frame: false,
  border: false,
  autoScroll: true,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
  items: [
    {
      xtype: "grid",
      pid: "GRIDsto_fg",
      emptyText: "No Matching Records",
      autoScroll: true,
      flex: 1,
      plugins: ["filterfield"],
      store: "",
      columns: [],
      bbar: {
        xtype: "pagingtoolbar",
        displayInfo: true,
        displayMsg: "Displaying topics {0} - {1} of {2}",
        emptyMsg: "No topics to display",
      },
    },
  ],
  dockedItems: [
    {
      xtype: "toolbar",
      height: 30,
      dock: "top",
      items: [{ xtype: "button", text: "New Input", pid: "btnew", icon: vconfig.getstyle + "icon/add.png", tooltip: "New" }],
      // other options....
    },
  ],
  listeners: {
    afterrender: "GRIDsto_fg_load",
  },
});
