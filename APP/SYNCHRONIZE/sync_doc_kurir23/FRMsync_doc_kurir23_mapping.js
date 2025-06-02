var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.SYNCHRONIZE.sync_doc_kurir23.FRMsync_doc_kurir23_mapping", {
  extend: "Ext.window.Window",
  alias: "widget.FRMsync_doc_kurir23_mapping",
  reference: "FRMsync_doc_kurir23_mapping",
  title: "Proses Maping Dokumen",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: true,
  //y: -110,
  controller: "Csync_doc_kurir23",
  width: mainpanel.getWidth() * 0.9,
  height: mainpanel.getHeight() * 0.9,
  bodyPadding: "5 5 5 5",
  layout: { type: "vbox", pack: "start", align: "stretch" },
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
  items: [
    {
      xtype: "container",
      layout: "hbox",
      items: [
        {
          xtype: "form",
          frame: false,
          border: false,
          layout: { type: "hbox", pack: "start", align: "stretch" },
          fieldDefaults: {
            labelAlign: "left",
            labelWidth: 70,
            margin: "0 10 5 0",
          },
          items: [
            {
              xtype: "fieldset",
              layout: "hbox",
              width: 520,
              bodyPadding: "5 0 0 0",
              items: [
                {
                  xtype: "container",
                  layout: "vbox",
                  margin: "5 0 0 0",
                  items: [
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        { xtype: "textfield", labelWidth: 80, width: 140, fieldLabel: "Pilih Supplier", name: "KODE_INTERNAL", fieldCls: "fieldlock", readOnly: true },
                        { xtype: "textfield", width: 300, name: "NAMA", fieldCls: "fieldlock", format: "Y-m-d", readOnly: true },
                        {
                          xtype: "button",
                          pid: "btsearch",
                          module: "supplier",
                          popupwidth: 1000,
                          popupheight: 400,
                          tofield: {
                            KODE_INTERNAL: "KODE_INTERNAL",
                            NAMA: "NAMA",
                            ALAMAT: "ALAMAT",
                            NPWP: "NPWP",
                          },
                          icon: vconfig.getstyle + "icon/search.ico",
                          tooltip: "search",
                        },
                      ],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [{ xtype: "textfield", labelWidth: 80, width: 450, fieldLabel: "NPWP", name: "NPWP", fieldCls: "fieldlock", readOnly: true }],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [{ xtype: "textarea", labelWidth: 80, width: 450, fieldLabel: "ALamat", name: "ALAMAT", fieldCls: "fieldlock", readOnly: true }],
                    },
                  ],
                },
              ],
            },
            { xtype: "tbspacer", width: 10 },
            {
              xtype: "fieldset",
              layout: "hbox",
              width: 520,
              bodyPadding: "5 0 0 0",
              items: [
                {
                  xtype: "container",
                  layout: "vbox",
                  margin: "5 0 0 0",
                  items: [
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [{ xtype: "textfield", labelWidth: 80, width: 200, fieldLabel: "Draft Dokumen", name: "BCNO", fieldCls: "fieldinput", readOnly: true, value: "23" }],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [{ xtype: "textfield", labelWidth: 80, width: 450, fieldLabel: "BL/AWB NO", name: "BLNO", fieldCls: "fieldinput", readOnly: false }],
                    },
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [{ xtype: "datefield", labelWidth: 80, width: 250, fieldLabel: "BL/AWB Date", name: "BLDATE", fieldCls: "fieldinput", readOnly: false, format: "Y-m-d", value: new Date() }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      xtype: "panel",
      title: "List Dokumen Invoice",
      layout: { type: "hbox", pack: "start", align: "stretch" },
      flex: 1,
      items: [
        {
          xtype: "grid",
          pid: "GRID_listdokumeninvoice",
          emptyText: "No Matching Records",
          autoScroll: true,
          flex: 1,
          plugins: ["filterfield"],
          viewConfig: {
            enableTextSelection: true,
            getRowClass: function (record) {
              return record.get("PART_NO") === null || record.get("PART_NO") === "" ? "gridrow-red" : "";
            },
          },
          features: [
            {
              id: "group",
              ftype: "grouping",
              groupHeaderTpl: 'INVOICE NO : {[values.children[0].data["INVOICE_NO"]]}  ({children.length} Item{[values.children.length > 1 ? "s" : ""]})',
              hideGroupedHeader: true,
              enableGroupingMenu: false,
            },
          ],
          columns: [
            {
              text: "SUMBER DATA",
              columns: [
                { xtype: "rownumberer", width: 40 },
                { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "INVOICE_NO", dataIndex: "INVOICE_NO" },
                { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "INVOICE_DATE", dataIndex: "INVOICE_DATE" },
                { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "ITEM NO", dataIndex: "ITEM_NUMBER" },
                { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "QTY", dataIndex: "ARRIV_PLAN_NUMBER" },
                { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "PACKING", dataIndex: "PACKING_QTY" },
                { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "CTN", dataIndex: "CTN_QUANTITY" },
                { sortable: true, width: 80, filter: { xtype: "textfield" }, header: "QTY", dataIndex: "UOM" },
              ],
            },
            {
              text: "ITEM/PART MATERIAL",
              columns: [
                { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "PART_NO", dataIndex: "PART_NO" },
                { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "NAME", dataIndex: "PART_NAME" },
                { sortable: true, width: 250, filter: { xtype: "textfield" }, header: "DESCRIPTION", dataIndex: "PART_DESCRIPTION" },
                { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "TYPE", dataIndex: "PART_TYPE" },
                { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "GROUP", dataIndex: "PART_GROUP" },
                { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "CATEGORY", dataIndex: "PART_CATEGORY" },
              ],
            },
            {
              text: "PART HS",
              columns: [
                { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "HS NO", dataIndex: "NOMOR_HS" },
                { sortable: true, width: 75, filter: { xtype: "textfield" }, header: "BM", dataIndex: "TARIF_BM" },
                { sortable: true, width: 75, filter: { xtype: "textfield" }, header: "CUKAI", dataIndex: "TARIF_CUKAI" },
                { sortable: true, width: 75, filter: { xtype: "textfield" }, header: "PPH", dataIndex: "TARIF_PPH" },
                { sortable: true, width: 75, filter: { xtype: "textfield" }, header: "PPN", dataIndex: "TARIF_PPN" },
                { sortable: true, width: 75, filter: { xtype: "textfield" }, header: "PPNBM", dataIndex: "TARIF_PPNBM" },
              ],
            },
          ],
          tbar: [
            {
              xtype: "button",
              text: "Tampilkan Invoice",
              pid: "btlist_dokumen",
              icon: vconfig.getstyle + "icon/grid.png",
              tooltip: "Tampilkan Dokumen Invoice",
            },
          ],
        },
      ],
    },
  ],
  dockedItems: [
    {
      xtype: "toolbar",
      height: 30,
      dock: "top",
      items: [{ xtype: "button", text: "Save", pid: "btsave_mappingdokumen", handler: "btsave_mappingdokumen", icon: vconfig.getstyle + "icon/save.gif", tooltip: "Simpan Mapping" }],
      // other options....
    },
  ],
});
