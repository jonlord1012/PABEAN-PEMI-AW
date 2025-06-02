Ext.define("TDK.INVENTORY.inv_material_in.receiving_detail.FRMdata_receiving", {
  extend: "Ext.form.Panel",
  alias: "widget.FRMdata_receiving",
  reference: "FRMdata_receiving",
  frame: false,
  border: true,
  autoScroll: true,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
  items: [],
  dockedItems: [
    {
      xtype: "toolbar",
      height: 30,
      dock: "top",
      items: ["-", { xtype: "datefield", labelWidth: 130, width: 300, fieldLabel: "Tanggal Out Production", name: "TANGGAL_OUT", fieldCls: "fieldinput", readOnly: false, enforceMaxLength: true, emptyText: "Tgl Dokumen", format: "Y-m-d" }],
      // other options....
    },
  ],
});
