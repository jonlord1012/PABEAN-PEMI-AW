Ext.define("NJC.MASTERS.master_tenant.master_tenant", {
    extend: "Ext.form.Panel",
    alias: "widget.master_tenant",
    reference: "master_tenant",
    config: {},
    requires: ["NJC.MASTERS.master_tenant.GRIDmaster_tenant", "NJC.MASTERS.master_tenant.Cmaster_tenant"],
    constructor: function (config) {
      return this.callParent(arguments);
    },
    //untuk include controller
    controller: "Cmaster_tenant",
    initComponent: function () {
      Ext.apply(this, {
        xtype: "panel",
        pid: "panelmaster_tenant",
        layout: "card",
        frame: false,
        border: false,
        items: [{ xtype: "GRIDmaster_tenant" }],
        dockedItems: [
          {
            xtype: "toolbar",
            height: 30,
            dock: "top",
            items: [{ xtype: "button", text: "New Input Tenant", pid: "btnew", icon: vconfig.getstyle + "icon/add.png", tooltip: "New" },
            "->",
            {
              xtype: "button",
              text: "Export to",
              menu: {
                defaults: {
                  handler: "exportTo",
                },
                items: [
                  {
                    text: "Excel xlsx",
                    icon: vconfig.getstyle + "icon/exceldownload.png",
                    cfg: {
                      type: "excel07",
                      ext: "xlsx",
                    },
                  },
                ],
              },
            }],
          },
        ],
      });
      this.callParent(arguments);
    },
  });
  