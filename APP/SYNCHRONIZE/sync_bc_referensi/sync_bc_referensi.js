Ext.define("TDK.SYNCHRONIZE.sync_bc_referensi.sync_bc_referensi", {
  extend: "Ext.form.Panel",
  alias: "widget.sync_bc_referensi",
  reference: "sync_bc_referensi",
  config: {},
  requires: ["TDK.SYNCHRONIZE.sync_bc_referensi.GRIDsync_bc_referensi", "TDK.SYNCHRONIZE.sync_bc_referensi.Csync_bc_referensi"],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Csync_bc_referensi",
  initComponent: function () {
    Ext.apply(this, {
      xtype: "layout-border",
      layout: "border",
      border: false,
      frame: false,
      bodyBorder: false,
      items: [
        {
          region: "center",
          xtype: "panel",
          pid: "panelsync_bc_referensi",
          layout: "card",
          activeItem: 0,
          frame: false,
          border: false,
          items: [{ xtype: "GRIDsync_bc_referensi" }],
        },
      ],
    });

    this.callParent(arguments);
  },
});
