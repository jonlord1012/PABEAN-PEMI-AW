var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.INVENTORY_PLB.goods_in.FRMinv_material_in_manual", {
  extend: "Ext.window.Window",
  alias: "widget.FRMinv_material_in_manual",
  reference: "FRMinv_material_in_manual",
  title: "Receiving from BC IN",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: false,
  controller: "Cgoods_in",
  //y: -110,
  bodyPadding: "5 5 5 5",
  width: mainpanel.getWidth() * 0.98,
  height: mainpanel.getHeight() * 0.98,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
  items: [
    {
      xtype: "form",
      bodyPadding: "5 5 5 5",
      fieldDefaults: {
        labelAlign: "left",
        labelWidth: 70,
        margin: "0 10 5 0",
      },
      border: false,
      layout: { type: "hbox", pack: "start", align: "stretch" },
      items: [
        {
          xtype: "container",
          layout: "vbox",
          flex: 1,
          items: [
            {
              xtype: "container",
              width: 600,
              flex: 1,
              layout: "vbox",
              items: [
                {
                  xtype: "container",
                  layout: "hbox",
                  items: [
                    {
                      xtype: "combobox",
                      name: "CBO_SOURCE",
                      fieldLabel: "Sumber Data",
                      labelWidth: 100,
                      width: 250,
                      displayField: "DEFNAME",
                      valueField: "DEFCODE",
                      fieldCls: "fieldinput",
                      allowBlank: false,
                      queryMode: "local",
                      forceSelection: true,
                      typeAhead: true,
                      minChars: 0,
                      anyMatch: true,
                      value: "30",
                      store: new Ext.data.Store({
                        data: [
                          { DEFCODE: "portal", DEFNAME: "PORTAL" },
                          { DEFCODE: "picking", DEFNAME: "PORTAL & PICKING LIST" },
                        ],
                        fields: ["DEFCODE", "DEFNAME"],
                      }),
                    },
                    { xtype: "textfield", width: 150, name: "INVOICE_NO", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "INVOICE NO", pid: "INVOICE_NO" },
                    { xtype: "textfield", width: 150, name: "TANGGALDOKUMEN", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "TANGGAL", pid: "TANGGALDOKUMEN", hidden: true },
                  ],
                },
                {
                  xtype: "container",
                  layout: "hbox",
                  items: [
                    { xtype: "datefield", labelWidth: 100, width: 220, fieldLabel: "Tgl & No Aju", name: "TANGGAL_AJU", fieldCls: "fieldlock", format: "Y-m-d", readOnly: true, hidden: true, },
                    { xtype: "textfield", labelWidth: 100, width: 450, name: "NOMOR_AJU", fieldLabel: "NOMOR AJU", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "Nomor Aju" },
                    {
                      xtype: "button",
                      pid: "btsearch",
                      module: "goods_in",
                      popupwidth: 900,
                      tofield: {
                        ID_HEADER_ORI: "ID_HEADER_ORI",
                        NOMOR_AJU: "NOMOR_AJU",
                        DOKUMEN: "URAIAN_DOKUMEN",
                      },
                      icon: vconfig.getstyle + "icon/search.ico",
                      tooltip: "search",
                    },
                  ],
                },
                {
                  xtype: "container",
                  layout: "hbox",
                  items: [
                    { xtype: "datefield", labelWidth: 100, width: 220, fieldLabel: "Tgl & No Daftar", name: "TANGGAL_DAFTAR", fieldCls: "fieldlock", format: "Y-m-d", readOnly: true },
                    { xtype: "textfield", width: 170, name: "NOMOR_DAFTAR", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "Nomor Daftar" },
                    /*
                     { xtype: "textfield", width: 70, name: "BC_TYPE", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "BC TYPE" },*/

                  ],
                },
                {
                  xtype: "container",
                  layout: "hbox",
                  items: [
                    { xtype: "textfield", labelWidth: 100, width: 160, fieldLabel: "Supplier", name: "VENDOR", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "Kode" },
                    { xtype: "textfield", width: 350, name: "VENDOR_NAME", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "Nama Supplier" },
                  ],
                },
              ],
            },
          ],
        },
        {
          xtype: "container",
          layout: { type: "hbox", pack: "start", align: "stretch" },
          flex: 1,
          height: 180,
          items: [
            {
              xtype: "fieldset",
              title: "RECEIPT INFO",
              flex: 1,
              height: 150,
              width: '95%',

              layout: { type: "vbox", pack: "start", align: "stretch" },
              items: [
                {
                  xtype: "grid",
                  pid: "GRIDinvoice_manual_in",
                  emptyText: "No Matching Records",
                  autoScroll: true,
                  flex: 1,
                  plugins: ["filterfield", { ptype: "cellediting", clicksToEdit: 1 }],
                  viewConfig: {
                    enableTextSelection: true,
                  },
                  columns: [
                    { xtype: "rownumberer", width: 50 },
                    {
                      header: "NOMOR",
                      dataIndex: "RECEIPT_NO",
                      sortable: true,
                      width: 200,
                      filter: { xtype: "textfield" },
                      editor: {
                        xtype: "textfield",
                        allowBlank: false,
                      },
                    },
                    {
                      header: "TGL",
                      dataIndex: "RECEIPT_DATE",
                      sortable: true,
                      width: 100,
                      filter: { xtype: "textfield" },
                      editor: {
                        xtype: "datefield",
                        allowBlank: false,
                        format: "Y-m-d",
                      },
                      renderer: function (val) {
                        return moment(val).format("YYYY-MM-DD");
                      },
                    },
                    {
                      xtype: "actioncolumn",
                      width: 50,
                      menuDisabled: true,
                      sortable: false,
                      items: [
                        {
                          icon: vconfig.getstyle + "icon/delete.ico",
                          handler: function (grid, rowIndex, colIndex) {
                            grid.getSelectionModel().select(rowIndex);
                            var vdt = grid.getSelectionModel().getSelection()[0].data;
                            if (vdt.KODE_JENIS_DOKUMEN !== "380") {
                              grid.getStore().removeAt(rowIndex);
                            }
                          },
                        },
                      ],
                    },
                  ],
                  listeners: {
                    beforeedit: function (grid, e) {
                      if (e.record.data.KODE_JENIS_DOKUMEN === "380") {
                        e.cancel = true;
                      }
                    },
                  },
                  tbar: [
                    "-",
                    //
                    { xtype: "button", pid: "btsearch_receipt", text: "Pilih Receipt", icon: vconfig.getstyle + "icon/search.ico", tooltip: "Pilih Receipt" },
                  ],
                },
              ],
            },
            /*
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "Receiving No", name: "NOMOR_RCV", fieldCls: "fieldlock", readOnly: true, enforceMaxLength: true, emptyText: "Nomor Receiving Auto" },
                            { xtype: "datefield", labelWidth: 100, width: 220, fieldLabel: "TGL Receiving", name: "TANGGAL_RCV", fieldCls: "fieldinput", readOnly: false, format: "Y-m-d", value: new Date() },
                          ],
                        },
                        {
                          xtype: "container",
                          layout: "hbox",
                          items: [
                            { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "No Faktur", name: "NOMOR_FAKTUR", fieldCls: "fieldinput", readOnly: false, enforceMaxLength: true, emptyText: "Nomor Faktur", hidden: true },
                            { xtype: "datefield", labelWidth: 100, width: 220, fieldLabel: "TGL Faktur", name: "TANGGAL_FAKTUR", fieldCls: "fieldinput", readOnly: false, format: "Y-m-d", value: "", hidden: true },
                          ],
                        },
            
            */
          ],
        },
      ],
    },
    { xtype: "tbspacer", height: 10 },
    {
      xtype: "container",
      layout: { type: "hbox", pack: "start", align: "stretch" },
      flex: 1,
      items: [
        {
          xtype: "grid",
          pid: "GRIDFRMinv_material_in_manual",
          emptyText: "No Matching Records",
          flex: 1,
          plugins: [
            "filterfield",
            {
              ptype: "cellediting",
              clicksToEdit: 1,
            },
          ],
          viewConfig: {
            enableTextSelection: true,
            getRowClass: function (record) {
              return record.get("NONFG") === "1" || record.get("NONFG") === "true" ? "gridrow-red" : "";
            },
          },
          store: {
            autoLoad: true,
            autoSync: false,
            remoteSort: true,
            remoteFilter: true,
            pageSize: 45,
            fields: [
              { name: "NOMORAJU", type: "string" },
              { name: "SERIBARANG", type: "int" },
              { name: "ARTICLE_CODE", type: "string" },
              { name: "PART_MPQ", type: "float" },
              { name: "LOT_NO", type: "string" },
            ],
            proxy: {
              type: "ajax",
              disableCaching: false,
              noCache: false,
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
              actionMethods: { read: "POST" },
              url: vconfig.service_api + "goods_in/goods_ins",
              extraParams: {
                method: "load_selected_invoice_non_source",
              },
              reader: {
                type: "json",
                rootProperty: "Rows",
                totalProperty: "TotalRows",
                successProperty: "success",
              },
            },
            listeners: {
              beforeload: function (store, operation, eOpts) {
                var me = this;
                var invNo = Ext.ComponentQuery.query("FRMinv_material_in_manual field[pid=INVOICE_NO]")[0].value;
                operation.setParams({
                  INVOICE_NO: invNo,
                });
              },
            },
          },
          /* viewConfig: {
             enableTextSelection: true,
           },*/
          columns: [
            { xtype: "rownumberer", width: 50 },
            /*{
              xtype: "actioncolumn",
              width: 35,
              align: "center",
              menuDisabled: true,
              sortable: false,
              items: [
                {
                  icon: vconfig.getstyle + "icon/magnifier.ico",
                  handler: "mapp_this_part",
                  tooltip: "Mapp Part",
                },
              ],
            },*/
            { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "NOMORAJU", dataIndex: "NOMORAJU" },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "INVOICE", dataIndex: "NOMORDOKUMEN" },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TANGGAL", dataIndex: "TANGGALDOKUMEN", renderer: "formatDate", },
            { sortable: true, width: 50, filter: { xtype: "textfield" }, header: "SERI", dataIndex: "SERIBARANG" },
            { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "TIPE", dataIndex: "TIPE" },
            { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "KODEBARANG", dataIndex: "KODEBARANG" },
            { sortable: true, width: 150, filter: { xtype: "textfield" }, header: "URAIAN", dataIndex: "URAIAN" },
            { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "HS", dataIndex: "HS" },
            { sortable: true, width: 60, filter: { xtype: "textfield" }, header: "UOM", dataIndex: "KODESATUAN" },
            { sortable: true, width: 100, align: "right", filter: { xtype: "textfield" }, header: "JUMLAH", dataIndex: "JUMLAHSATUAN" },


            /*
            {
              text: "MAPPING",
              columns: [

                { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "ARTICLE CODE", dataIndex: "ARTICLE_CODE" },
                {
                  xtype: "actioncolumn",
                  width: 35,
                  align: "center",
                  menuDisabled: true,
                  sortable: false,
                  items: [
                    {
                      icon: vconfig.getstyle + "icon/grid.png",
                      handler: "add_lot_no",
                      tooltip: "Add Lot No",
                    },
                  ],
                },
                { sortable: true, width: 60, align: "right", filter: { xtype: "textfield" }, header: "MPQ", dataIndex: "PART_MPQ" },
                {
                  header: "RECEIVED QTY",
                  dataIndex: "RCV_INPUT",
                  sortable: true,
                  width: 80,
                  tdCls: "fieldinput",
                  align: "right",
                  renderer: "formatqty",
                  editor: {
                    xtype: "numberfield",
                    hidetriger: true,
                    margin: "0 0 0 0",
                    name: "INPDESC",
                    allowBlank: false,
                  },
                },
                { sortable: true, width: 50, filter: { xtype: "textfield" }, header: "NONFG", dataIndex: "NONFG" },
                
              ],

            },
            */
          ],
          bbar: {
            xtype: "pagingtoolbar",
            displayInfo: true,
            displayMsg: "Displaying topics {0} - {1} of {2}",
            emptyMsg: "No topics to display",
          },
          tbar: [
            {
              xtype: "displayfield",
              value: "Data Dokumen BC",
            },
            "->",
          ],
        },
        { xtype: "tbspacer", height: 10 },
        {
          xtype: "grid",
          pid: "GRIDFRMinv_material_in_manual_receive_doc",
          emptyText: "No Matching Records",
          flex: 1,
          plugins: [
            "filterfield",
            {
              ptype: "cellediting",
              clicksToEdit: 1,
            },
          ],
          viewConfig: {
            enableTextSelection: true,
          },
          store: {
            autoLoad: true,
            autoSync: false,
            remoteSort: true,
            remoteFilter: true,
            pageSize: 45,
            fields: [
              { name: "RECEIPT_NO", type: "string" },
              /*{ name: "SERIBARANG", type: "int" },*/
              { name: "ARTICLE_CODE", type: "string" },
              { name: "PART_MPQ", type: "float" },
              { name: "LOT_NO", type: "string" },
            ],
            proxy: {
              type: "ajax",
              disableCaching: false,
              noCache: false,
              headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
              actionMethods: { read: "POST" },
              url: vconfig.service_api + "goods_in/goods_ins",
              extraParams: {
                method: "load_selected_invoice_non_source",
              },
              reader: {
                type: "json",
                rootProperty: "Rows",
                totalProperty: "TotalRows",
                successProperty: "success",
              },
            },
            listeners: {
              /* beforeload: function (store, operation, eOpts) {
                 var me = this;
                 var invNo = Ext.ComponentQuery.query("FRMinv_material_in_manual field[pid=RECEIPT_NO]")[0].value;
                 operation.setParams({
                   RECEIPT_NO: RECEIPT_NO,
                 });
               },
               */
            },
          },
          columns: [
            { xtype: "rownumberer", width: 50 },
            { sortable: true, width: 200, filter: { xtype: "textfield" }, header: "RECEIPT NO", dataIndex: "RECEIPT_NO" },
            { sortable: true, width: 180, filter: { xtype: "textfield" }, header: "ARTICLE CODE", dataIndex: "ARTICLE_CODE" },
            { sortable: true, width: 80, align: "right", filter: { xtype: "textfield" }, header: "MPQ", dataIndex: "PART_MPQ" },
            {
              header: "QTY",
              dataIndex: "RCV_INPUT",
              sortable: true,
              width: 100,
              tdCls: "fieldinput",
              align: "right",
              renderer: "formatqty",
              editor: {
                xtype: "numberfield",
                hidetriger: true,
                margin: "0 0 0 0",
                name: "INPDESC",
                allowBlank: false,
              },
            },
          ],
          bbar: {
            xtype: "pagingtoolbar",
            displayInfo: true,
            displayMsg: "Displaying topics {0} - {1} of {2}",
            emptyMsg: "No topics to display",
          },
          tbar: [
            {
              xtype: "displayfield",
              value: "Data Receiving",
            },
            "->",
          ],




        }
      ],
    },
  ],
  dockedItems: [
    {
      xtype: "toolbar",
      height: 30,
      dock: "top",
      items: [
        { xtype: "tbspacer", width: 10 },
        {
          xtype: "button",
          text: "Save",
          pid: "FRMinv_material_in_manual_btsave",
          icon: vconfig.getstyle + "icon/save.gif",
          tooltip: "Save Data",
          handler: "create_scan_in_manual",
        },
        { xtype: "tbspacer", width: 10 },
        {
          xtype: "button",
          text: "POSTING",
          pid: "FRMinv_material_in_manual_btposting",
          icon: vconfig.getstyle + "icon/lock.png",
          tooltip: "POSTING",
          handler: "post_this_document",
        },
      ],
    },
  ],
});
