var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.INVENTORY_PLB.goods_control.FRMimc_goods_control_in", {
  extend: "Ext.window.Window",
  alias: "widget.FRMimc_goods_control_in",
  reference: "FRMimc_goods_control_in",
  title: "Goods Incoming",
  modal: true,
  closeAction: "hide",
  centered: true,
  autoScroll: false,
  controller: "Cgoods_control",
  //y: -110,
  width: mainpanel.getWidth() * 0.98,
  height: mainpanel.getHeight() * 0.98,
  layout: { type: "border", pack: "start", align: "stretch" },
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
  bodyBorder: false,
  listeners: {
    afterlayout: function (cmp) {
      try {
        //
      } catch (ex) {
        COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      }
    },
  },
});