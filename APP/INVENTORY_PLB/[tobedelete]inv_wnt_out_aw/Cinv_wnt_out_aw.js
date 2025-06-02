Ext.define("TDK.INVENTORY_AW.inv_wnt_out_aw.Cinv_wnt_out_aw", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cinv_wnt_out_aw",
  init: function (view) {
    this.control({
      /* main grid :: add new supply out */
      "inv_wnt_out_aw GRIDinv_wnt_out_aw button[pid=GRIDinv_wnt_out_aw_btnew]": { click: this.btnew_click },
      /* main grid :: history */
      "inv_wnt_out_aw grid[pid=GRIDinv_wnt_out_aw]": { itemdblclick: this.GRIDinv_wnt_out_aw_itemdblclick },

      /* frm input :: save button */
      "FRMinv_wnt_out_aw button[pid=FRMinv_wnt_out_aw_btsave]": { click: this.btsave_click },

      /* search button */
      "FRMinv_wnt_out_aw button[pid=btsearch_technician]": { click: this.btsearch_technician_click },
      "FRMinv_wnt_out_aw button[pid=btsearch_process_name]": { click: this.btsearch_process_name_click },
      "FRMinv_wnt_out_aw button[pid=btsearch_carline]": { click: this.btsearch_carline_click },

      /* add item button */
      "FRMinv_wnt_out_aw button[pid=FRMinv_wnt_out_aw_btitem_part]": { click: this.btitem_part_click_ },
    });
    this.listen({
      store: {},
    });
    this.var_global = { jwt: localStorage.getItem("ST_NJC_JWT"), };
    this.var_definition = {};
    this.renderpage();
  },
  formatAmount: function (value) {
    var text = Ext.util.Format.number(value, "0,000.00/i");
    return text;
  },
  renderpage: function () {
    try {
      console.log("renderer controller");
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      console.log(ex.message);
    }
  },
  btnew_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      console.log("New Button klicked");
      COMP.run.getmodulepopup("FRMinv_wnt_out_aw", "TDK.INVENTORY_AW.inv_wnt_out_aw.FRMinv_wnt_out_aw", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      console.log(ex.message);
    }
  },

  btsave_click: function (btn) {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      console.log("btsave_click Button klicked");
      //COMP.run.getmodulepopup("FRMinv_wnt_out_aw", "TDK.INVENTORY_AW.inv_wnt_out_aw.FRMinv_wnt_out_aw", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      console.log(ex.message);
    }
  },
  btsearch_technician_click: function (btn) {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      console.log("btsearch_technician Button klicked");
      return this.popup_search(btn);
      //COMP.run.getmodulepopup("FRMinv_wnt_out_aw", "TDK.INVENTORY_AW.inv_wnt_out_aw.FRMinv_wnt_out_aw", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      console.log(ex.message);
    }
  },

  btsearch_process_name_click: function (btn) {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      console.log("btsearch_process_name_click Button klicked");
      return this.popup_search(btn);
      //COMP.run.getmodulepopup("FRMinv_wnt_out_aw", "TDK.INVENTORY_AW.inv_wnt_out_aw.FRMinv_wnt_out_aw", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      console.log(ex.message);
    }
  },

  btsearch_carline_click: function (btn) {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      console.log("btsearch_carline_click Button klicked");
      return this.popup_search(btn);
      //COMP.run.getmodulepopup("FRMinv_wnt_out_aw", "TDK.INVENTORY_AW.inv_wnt_out_aw.FRMinv_wnt_out_aw", mainpanel);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
      console.log(ex.message);
    }
  },


  popup_search(btn) {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

      var popup = Ext.define("TDK.INVENTORY_AW.inv_wnt_out_aw.popup_search_", {
        extend: "Ext.window.Window",
        alias: "widget.popup_search_",
        reference: "popup_search_",
        title: "Search",
        modal: true,
        closeAction: "destroy",
        centered: true,
        autoScroll: true,
        width: btn.popupwidth,
        height: btn.popupheight,
        layout: { type: "vbox", pack: "start", align: "stretch" },
        bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
        items: [
          {
            xtype: "grid",
            pid: "GRIDFRMinv_wnt_out_aw_popupsearch",
            emptyText: "No Matching Records",
            plugins: ["filterfield", { ptype: "cellediting", clicksToEdit: 1 }],
            flex: 1,
            height: 200,
            store: me.storename(btn.module),
            columns: me.setproperty(btn.module),
            listeners: {
              itemdblclick: function (dv, record, item, index, e) {
                me.setfield_input(btn.tofield, record);
              },
            },
            bbar: {
              xtype: "pagingtoolbar",
              displayInfo: true,
              displayMsg: "Displaying topics {0} - {1} of {2}",
              emptyMsg: "No topics to display",
            },
          },
        ],
      });
      COMP.run.getmodulepopup("popup_search_", popup, this.getView());
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },

  setfield_input: function (frm, rec) {
    try {
      var popup = Ext.ComponentQuery.query("popup_search_")[0];
      Ext.iterate(frm, function (key, value) {
        var nfield = Ext.ComponentQuery.query("field[name=" + key + "]")[0];
        nfield.setValue(rec.data[value]);
        console.log(nfield + rec.data[value]);
      });
      popup.close();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },

  storename: function (modulename) {
    var me = this;
    return {
      autoLoad: true,
      autoSync: false,
      remoteSort: true,
      remoteFilter: true,
      pageSize: 12,
      proxy: {
        type: "ajax",
        disableCaching: false,
        noCache: false,
        headers: { Authorization: "Bearer " + me.var_global.jwt },
        actionMethods: { read: "POST" },
        extraParams: {
          module: modulename,
        },
        url: vconfig.service_api + "inv_wnt/inv_wnts",
        reader: {
          type: "json",
          rootProperty: "Rows",
          totalProperty: "TotalRows",
          successProperty: "success",
        },
      },
      listeners: {},
    };
  },

  setproperty: function (modulename) {
    try {
      var ncol = [];
      switch (modulename) {
        case "inv_out_technician":
          ncol.push(
            { header: "KODE TEKNISI", dataIndex: "KODE_TEKNISI", sortable: true, width: 130, filter: { xtype: "textfield" } },
            { header: "NAMA TEKNISI", dataIndex: "NAMA_TEKNISI", sortable: true, width: 200, filter: { xtype: "textfield" } },
          );
          break;
        case "inv_out_process_name":
          ncol.push(
            { header: "KODE PROCESS", dataIndex: "KODE_PROCESS", sortable: true, width: 130, filter: { xtype: "textfield" } },
            { header: "NAMA PROCESS", dataIndex: "NAMA_PROCESS", sortable: true, width: 200, filter: { xtype: "textfield" } },
          );
          break;
        case "inv_out_carline":
          ncol.push(
            { header: "KODE CARLINE", dataIndex: "KODE_CARLINE", sortable: true, width: 130, filter: { xtype: "textfield" } },
            { header: "NAMA CARLINE", dataIndex: "NAMA_CARLINE", sortable: true, width: 200, filter: { xtype: "textfield" } },
          );
          break;
        default:
          break;
      }
      return ncol;
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },

  btitem_part_click_: function (btn) {
    try {

      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var FRM_MAIN = Ext.ComponentQuery.query("FRMinv_wnt_in form")[0];
      var popup = Ext.define("TDK.INVENTORY_AW.inv_wnt_out_aw.popup_list_item", {
        extend: "Ext.window.Window",
        alias: "widget.popup_list_item",
        reference: "popup_list_item",
        title: "Pilih Item",
        modal: true,
        closeAction: "destroy",
        centered: true,
        autoScroll: true,
        width: mainpanel.getWidth(),
        height: mainpanel.getHeight() * 0.6,
        bodyPadding: "5 25 25 5",
        layout: { type: "hbox", pack: "start", align: "stretch" },
        bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
        items: [
          {
            xtype: "grid",
            pid: "GRIDitem_list",
            emptyText: "No Matching Records",
            autoScroll: true,
            flex: 1,
            extraParams: {
              method: "read_data",
              module: "item_list",
            },
            store: me.storename("item_list"),
            plugins: [
              "filterfield",
              {
                ptype: "rowwidget",
                selectRowOnExpand: true,
                widget: {
                  xtype: "grid",
                  autoLoad: true,
                  store: {
                    remoteSort: false,
                    remoteFilter: false,
                    pageSize: 15,
                    proxy: {
                      type: "ajax",
                      disableCaching: false,
                      noCache: false,
                      headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT") },
                      actionMethods: { read: "POST" },
                      url: vconfig.service_api + "inv_wnt/inv_wnts",
                      extraParams: {
                        method: "read_data",
                        module: "item_list",
                        invoice: function () {
                          return "haloo";
                        },
                      },
                      reader: {
                        type: "json",
                        rootProperty: "Rows",
                        totalProperty: "TotalRows",
                        successProperty: "success",
                      },
                    },
                  },
                  bind: {
                    title: "INVOICE NO : {record.INVOICE_NO}",
                  },
                  autoLoad: true,
                  columns: [
                    { text: "JENIS BC", dataIndex: "JENIS_DOKUMEN", width: 75 },
                    { text: "NOMOR AJU", dataIndex: "NOMOR_AJU", width: 265 },
                    { text: "TANGGAL AJU", dataIndex: "quantity", xtype: "numbercolumn", format: "Y-m-d", width: 120 },
                    { text: "NOMOR DAFTAR", dataIndex: "NOMOR_DAFTAR", width: 265 },
                    { text: "TANGGAL DAFTAR", dataIndex: "TANGGAL_DAFTAR", xtype: "datecolumn", format: "Y-m-d", width: 120 },
                    { text: "QTY SUPPLIED", dataIndex: "QTY_SUPPLIED", xtype: "numbercolumn", width: 100, align: "right" },
                  ],
                },
              },
            ],
            columns: [
              { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "PARTNO", dataIndex: "PARTNO" },
              { sortable: true, width: 250, filter: { xtype: "textfield" }, header: "PART NAME", dataIndex: "PART_NAME" },
              { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "QTY AVAILABLE", dataIndex: "QTY_AVAILABLE" },
            ],
            bbar: {
              xtype: "pagingtoolbar",
              displayInfo: true,
              displayMsg: "Displaying topics {0} - {1} of {2}",
              emptyMsg: "No topics to display",
            },
            listeners: {
              /*afterrender: "GRIDitem_list_load",*/
            },
          },
          { xtype: "tbspacer", width: 5 },
          {
            xtype: "grid",
            pid: "GRIDitem_list_bc_list",
            emptyText: "No Matching Records",
            autoScroll: true,
            width: mainpanel.getWidth() / 2,
            plugins: ["filterfield"],
            store: "",
            columns: [
              { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "JENIS DOKUMEN", dataIndex: "JENIS_DOKUMEN" },
              { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "NOMOR AJU", dataIndex: "NOMOR_AJU" },
              { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "TANGGAL BC", dataIndex: "TANGGAL_AJU" },
              { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "NOMOR DAFTAR", dataIndex: "NOMOR_DAFTAR" },
              { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "TANGGAL DAFTAR", dataIndex: "TANGGAL_DAFTAR" },
              { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "QTY", dataIndex: "QTY" },
              { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "QTY AVAILABLE", dataIndex: "QTY_AVAILABLE" },
            ],
            bbar: {
              xtype: "pagingtoolbar",
              displayInfo: true,
              displayMsg: "Displaying topics {0} - {1} of {2}",
              emptyMsg: "No topics to display",
            },
            listeners: {
              afterrender: "GRIDitem_list_bc_list_load",
            },
          },
        ]
      });
      COMP.run.getmodulepopup("popup_list_item", popup, this.getView());
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});