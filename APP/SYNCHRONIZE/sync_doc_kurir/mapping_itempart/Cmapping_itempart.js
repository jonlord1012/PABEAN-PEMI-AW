Ext.define("TDK.SYNCHRONIZE.sync_doc_kurir.mapping_itempart.Cmapping_itempart", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cmapping_itempart",
  init: function (view) {
    this.control({
      "mapping_itempart button[pid=btautomapping]": { click: this.btautomapping_click },
    });
    this.listen({
      store: {},
    });
    this.var_global = {
      jwt: localStorage.getItem("ST_NJC_JWT"),
    };
    this.var_definition = {};
    this.renderpage();
  },
  formatAmount: function (value) {
    var text = Ext.util.Format.number(value, "0,000.0000/i");
    return text;
  },
  formatqty: function (value) {
    var text = Ext.util.Format.number(value, "0,000/i");
    return text;
  },
  renderpage: function () {
    try {
      console.log("renderer Cproses_out");
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btpilihpart_mapping: function (grid, rowIndex) {
    try {
      grid.getSelectionModel().select(rowIndex);
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var popup = Ext.define("TDK.SYNCHRONIZE.sync_doc_kurir.mapping_itempart.popup_selectpart", {
        extend: "Ext.window.Window",
        alias: "widget.popup_selectpart",
        reference: "popup_selectpart",
        title: "Mapping Manual Item/Part Material",
        modal: true,
        closeAction: "destroy",
        centered: true,
        autoScroll: true,
        width: mainpanel.getWidth() * 0.8,
        height: mainpanel.getHeight() * 0.7,
        layout: { type: "vbox", pack: "start", align: "stretch" },
        bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
        items: [
          {
            xtype: "grid",
            pid: "GRIDpopup_selectvendor",
            emptyText: "No Matching Records",
            autoScroll: true,
            flex: 1,
            plugins: ["filterfield"],
            viewConfig: {
              enableTextSelection: true,
            },
            store: {
              autoLoad: true,
              remoteSort: true,
              remoteFilter: true,
              pageSize: 15,
              proxy: {
                type: "ajax",
                disableCaching: false,
                noCache: false,
                headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
                actionMethods: { read: "POST" },
                url: vconfig.service_api + "mst_item/mst_items",
                reader: {
                  type: "json",
                  rootProperty: "Rows",
                  totalProperty: "TotalRows",
                  successProperty: "success",
                },
              },
            },
            columns: [
              { xtype: "rownumberer", width: 40 },
              { header: "PARTNO", dataIndex: "PART_NO", sortable: true, width: 120, filter: { xtype: "textfield" } },
              { header: "PARTNAME", dataIndex: "PART_NAME", sortable: true, width: 120, filter: { xtype: "textfield" } },
              { header: "DESCRIPTION", dataIndex: "PART_DESCRIPTION", sortable: true, width: 200, filter: { xtype: "textfield" } },
              { header: "UOM", dataIndex: "PART_UOM", sortable: true, width: 65, filter: { xtype: "textfield" } },
              { header: "GROUP", dataIndex: "PART_GROUP", sortable: true, width: 200, filter: { xtype: "textfield" } },
              { header: "CATEGORY", dataIndex: "PART_CATEGORY", sortable: true, width: 200, filter: { xtype: "textfield" } },
              { header: "TYPE", dataIndex: "PART_TYPE", sortable: true, width: 200, filter: { xtype: "textfield" } },
            ],
            bbar: {
              xtype: "pagingtoolbar",
              displayInfo: true,
              displayMsg: "Total Data {2}",
              emptyMsg: "No topics to display",
            },
            listeners: {
              itemdblclick: "select_manual_itempart",
            },
          },
        ],
      });
      COMP.run.getmodulepopup("popup_search", popup, this.getView());
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  select_manual_itempart: function (cmp, rec) {
    try {
      var me = this;
      var GRID = Ext.ComponentQuery.query("mapping_itempart FRMmapping_itempart grid[pid=GRIDmappingdata_itempart]")[0];
      var popup = Ext.ComponentQuery.query("popup_selectpart")[0];
      var vdt = GRID.getSelectionModel().getSelection()[0].data;
      var params = Ext.encode({
        method: "sync_manualmapping_itempart",
        module: "coo",
        ITEM_NUMBER: vdt.ITEM_NUMBER,
        PART_NO: rec.data.PART_NO,
      });

      Ext.MessageBox.confirm(
        "Konfirmasi",
        "Konfirmasi Manual Item/Part Material",
        function (button) {
          if (button === "yes") {
            var hasil = COMP.run.getservice(vconfig.service_api + "sync_doc/sync_doc", params, "POST", me.var_global.jwt);
            hasil.then(function (content) {
              var val = Ext.decode(content, true);
              if (val.success === "true") {
                COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 3000 });
                popup.close();
                GRID.getStore().load();
              } else {
                COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 3000 });
              }
            }, this);
          }
        },
        this
      );
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btautomapping_click: function () {
    try {
      var me = this;
      var params = Ext.encode({
        method: "sync_automapping_itempart",
        module: "coo",
      });
      var GRID = Ext.ComponentQuery.query("mapping_itempart FRMmapping_itempart grid[pid=GRIDmappingdata_itempart]")[0];
      var hasil = COMP.run.getservice(vconfig.service_api + "sync_doc/sync_doc", params, "POST", me.var_global.jwt);
      hasil.then(function (content) {
        var val = Ext.decode(content, true);
        if (val.success == "true") {
          COMP.TipToast.toast("Success", val.message, { cls: "success", delay: 2000 });
          GRID.getStore().load();
        } else {
          COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 2000 });
        }
      }, this);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});
