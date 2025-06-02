Ext.define("TDK.INVENTORY.inv_fg_control.control_inv_in.Ccontrol_inv_in", {
  extend: "Ext.app.ViewController",
  alias: "controller.Ccontrol_inv_in",
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
  formatamount: function (value) {
    var text = Ext.util.Format.number(value, "0,000.00/i");
    return text;
  },
  formatqty: function (value) {
    var text = Ext.util.Format.number(value, "0,000/i");
    return text;
  },
  renderpage: function () {
    try {
      console.log("renderer Ccontrol_inv_in");
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  control_inv_in_afterrender: function (cmp) {
    try {
      var GRID = Ext.ComponentQuery.query("inv_fg_control GRIDinv_fg_control grid[pid=GRIDinv_fg_control]")[0];
      var vdt = GRID.getSelectionModel().getSelection()[0].data;
      cmp.setTitle("Tracing Item/Part : " + vdt.PART_NO + " ( " + vdt.PART_NAME + " )");
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  control_inv_in_tracing_link_click: function (cmp, dt) {
    try {
      var vdt = dt.data;
      if (vdt.allowclick !== true) return;
      var vmodulecontrol = vdt.controlname === "" ? vdt.text : vdt.controlname;
      var id = "control_inv_in_" + vmodulecontrol;
      var cls = "TDK.INVENTORY.inv_fg_control.control_inv_in" + "." + vmodulecontrol;
      var tabs = Ext.ComponentQuery.query("control_inv_in tabpanel[pid=control_inv_in_tabpanel]")[0];
      var tab = tabs.child("#" + id);
      if (!tab) {
        try {
          tab = tabs.add(
            Ext.create(cls, {
              waitMsgTarget: true,
              itemId: id,
              closable: true,
              frame: false,
              border: false,
              title: vdt.text,
            })
          );
        } catch (err) {
          COMP.TipToast.toast("Error", err.message, { cls: "danger", delay: 2000 });
        }
      }
      tabs.setActiveTab(tab);
    } catch (err) {
      COMP.TipToast.toast("Error", err.message, { cls: "danger", delay: 2000 });
    }
  },
});
