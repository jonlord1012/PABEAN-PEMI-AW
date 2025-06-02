Ext.define("TDK.GLOBAL.item_part.Citem_part", {
  extend: "Ext.app.ViewController",
  alias: "controller.Citem_part",
  init: function (view) {
    this.control({});
    this.listen({
      store: {},
    });
    this.var_global = {
      jwt: localStorage.getItem("ST_NJC_JWT"),
    };
    this.var_definition = {};
    this.renderpage();
  },
  GRIDitem_part_load: function (grid) {
    try {
      var me = this;
      var STGRIDnew = new Ext.data.Store({
        autoLoad: false,
        remoteSort: true,
        remoteFilter: true,
        pageSize: 50,
        proxy: {
          type: "ajax",
          disableCaching: false,
          noCache: false,
          headers: { Authorization: "Bearer " + me.var_global.jwt },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "item/items",
          reader: {
            type: "json",
            rootProperty: "Rows",
            totalProperty: "TotalRows",
            successProperty: "success",
          },
        },
      });

      grid.reconfigure(STGRIDnew);
      grid.getStore().load();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});
