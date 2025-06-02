Ext.define("TDK.INVENTORY.inv_subassy_aw_control.FRMinv_subassy_aw_control_invoicing_aw", {
  extend: "Ext.form.Panel",
  alias: "widget.FRMinv_subassy_aw_control_invoicing_aw",
  reference: "FRMinv_subassy_aw_control_invoicing_aw",
  frame: false,
  border: false,
  autoScroll: true,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
  items: [
    //
  ],
  dockedItems: [
    {
      xtype: "toolbar",
      height: 30,
      dock: "top",
      items: [
        //
        "-",
        { xtype: "tbspacer", width: 5, text: "-" },
        { xtype: "button", text: "Back Menu", pid: "menu_back", icon: vconfig.getstyle + "icon/back.ico", tooltip: "Menu Control" },
      ],
    },
  ],
});
