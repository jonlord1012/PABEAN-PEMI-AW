var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.EXIM.bcout_25.FRMbcout_25_item_lokal", {
  extend: "Ext.window.Window",
  alias: "widget.FRMbcout_25_item_lokal",
  reference: "FRMbcout_25_item_lokal",
  title: "Penggunaan Bahan Baku Impor",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: false,
  controller: "Cbcout_25",
  //y: -110,
  bodyPadding: "5 5 5 5",
  width: mainpanel.getWidth() * 0.9,
  height: mainpanel.getHeight() * 0.8,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",      

        items: [
        { xtype: "textfield", labelWidth: 70, width: 100, fieldLabel: "Status", name: "", fieldCls: "fieldlock", readOnly: true },
        { xtype: "tbspacer", height: 10 },
        {
            
            xtype: "container",
            layout: { type: "vbox", pack: "start", align: "stretch" },
            items: [
            {
                xtype: "fieldset",
                layout: "hbox",
                width: 600,
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
                        { xtype: "textfield", labelWidth: 60, width: 100, fieldLabel: "Detail Ke", name: "", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "tbspacer", width: 10 },
                        { xtype: "textfield", labelWidth: 50, width: 100, fieldLabel: "Dari", name: "", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "tbspacer", width: 65 },
                        { xtype: "textfield", labelWidth: 100, width: 150, fieldLabel: "Bahan Baku", name: "", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "tbspacer", width: 10 },
                        { xtype: "textfield", labelWidth: 100, width: 150, fieldLabel: "Dari", name: "", fieldCls: "fieldinput", readOnly: true },
                        ],
                    },
                    { xtype: "tbspacer", height: 10 },
                    {
                        xtype: "container",
                        layout: "hbox",
                        items: [
                        { xtype: "textfield", labelWidth: 60, width: 100, fieldLabel: "Dok Asal", name: "", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "tbspacer", width: 10 },
                        { xtype: "displayfield", labelWidth: 150, value:"BC 2.7", name: "", readOnly: true },
                        { xtype: "tbspacer", width: 130 },
                        { xtype: "textfield", labelWidth: 100, width: 200, fieldLabel: "KPPBC Dok", name: "", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "tbspacer", width: 10 },
                        { xtype: "displayfield", labelWidth: 150, value:"KPPBC TANGERANG", name: "", readOnly: true },
                        { xtype: "tbspacer", width: 10 },
                        ],
                    },
                    { xtype: "tbspacer", height: 10 },
                    {
                        xtype: "container",
                        layout: "hbox",
                        items: [
                        { xtype: "textfield", labelWidth: 60, width: 150, fieldLabel: "No/Tgl Dok", name: "", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "tbspacer", width: 10 },
                        { xtype: "displayfield", labelWidth: 10, value:"/", readOnly: true },
                        { xtype: "tbspacer", width: 10 },
                        { xtype: "textfield", labelWidth: 0, width: 90, fieldLabel: "", name: "", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "tbspacer", width: 10 },
                        { xtype: "textfield", labelWidth: 100, width: 310, fieldLabel: "No Aju", name: "", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "tbspacer", width: 10 },
                        { xtype: "textfield", labelWidth: 75, width: 150, fieldLabel: "Urut Ke", name: "", fieldCls: "fieldinput", readOnly: true },
                        ],
                    },
                    { xtype: "tbspacer", height: 10 },
                    ],
                },
                ],
            },
            {
                xtype: "fieldset",
                layout: "hbox",
                title: "DATA BAHAN BAKU",
                width: 600,
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
                        { xtype: "textfield", labelWidth: 100, width: 250, fieldLabel: "Kode", name: "", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "tbspacer", width: 10 },
                        { xtype: "textfield", labelWidth: 100, width: 250, fieldLabel: "Nomor HS", name: "", fieldCls: "fieldinput", readOnly: true },
                        ],
                    },
                    { xtype: "tbspacer", height: 10 },
                    {
                        xtype: "container",
                        layout: "hbox",
                        items: [
                        { xtype: "textfield", labelWidth: 100, width: 1085, fieldLabel: "Uraian Barang", name: "", fieldCls: "fieldinput", readOnly: true },
                        ],
                    },
                    { xtype: "tbspacer", height: 10 },
                    {
                        xtype: "container",
                        layout: "hbox",
                        items: [
                        { xtype: "textfield", labelWidth: 100, width: 250, fieldLabel: "Tipe", name: "", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "tbspacer", width: 10 },
                        { xtype: "textfield", labelWidth: 100, width: 250, fieldLabel: "Ukuran", name: "", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "tbspacer", width: 65 },
                        { xtype: "textfield", labelWidth: 100, width: 250, fieldLabel: "Spf Lain", name: "", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "tbspacer", width: 10 },
                        { xtype: "textfield", labelWidth: 100, width: 250, fieldLabel: "Merk Lain", name: "", fieldCls: "fieldinput", readOnly: true },
                        ],
                    },
                    { xtype: "tbspacer", height: 10 },
                    ],
                },
                ],
            },
            {
                xtype: "fieldset",
                layout: "hbox",
                title: "HARGA & SATUAN",
                width: 600,
                //bodyPadding: "0 0 0 0",
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
                        { xtype: "textfield", labelWidth: 100, width: 250, fieldLabel: "Hg Perolehan", name: "", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "tbspacer", width: 10 },
                        { xtype: "textfield", labelWidth: 100, width: 250, fieldLabel: "Harga Penyerahan Rp.", name: "", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "tbspacer", width: 65 },
                        { xtype: "textfield", labelWidth: 100, width: 250, fieldLabel: "Netto", name: "", fieldCls: "fieldinput", readOnly: true },
                        ],
                    },
                    { xtype: "tbspacer", height: 10 },
                    {
                        xtype: "container",
                        layout: "hbox",
                        items: [
                        { xtype: "textfield", labelWidth: 100, width: 250, fieldLabel: "Jumlah Satuan", name: "", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "tbspacer", width: 10 },
                        { xtype: "textfield", labelWidth: 100, width: 185, fieldLabel: "Satuan", name: "", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "tbspacer", width: 10 },
                        { xtype: "displayfield", labelWidth: 50, width: 55, value: "METRE", name: "", readOnly: true},
                        { xtype: "tbspacer", width: 65 },
                        ],
                    },
                    { xtype: "tbspacer", height: 10 },
                    ],
                },
                ],
            },
            {
                xtype: "container",
                layout: "hbox",
                flex: 1,
                items: [
                {
                    xtype: "fieldset",
                    title: "NILAI PPN",
                    layout: "vbox",
                    flex: 1,
                    height: 400,
                    bodyPadding: "5 0 0 0",
                    items: [
                    {
                        xtype: "container",
                        layout: "hbox",
                        items: [
                        { xtype: "textfield", labelWidth: 80, width:150, fieldLabel: "PPh", name: "", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "tbspacer", width: 10 },
                        { xtype: "displayfield", labelWidth: 50, width: 20, value: "%", name: "", readOnly: true},
                        { xtype: "tbspacer", width: 5 },
                        {
                            xtype: "combobox",
                            name: "",
                            fieldLabel: "",
                            labelWidth: 0,
                            width: 130,
                            displayField: "",
                            valueField: "",
                            fieldCls: "fieldinput",
                            allowBlank: false,
                            queryMode: "local",
                            forceSelection: true,
                            typeAhead: true,
                            minChars: 0,
                            anyMatch: true,
                            value: "23",
                            store: new Ext.data.Store({
                            data: [
                                { DEFCODE: "1", DEFNAME: "TEST" },
                            ],
                            fields: ["DEFCODE", "DEFNAME"],
                            }),
                        },
                        { xtype: "tbspacer", width: 10 },
                        { xtype: "textfield", labelWidth: 0, width:70, fieldLabel: "", name: "", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "tbspacer", width: 10 },
                        { xtype: "displayfield", labelWidth: 50, width: 55, value: "%", name: "", readOnly: true},
                        ],
                    },
                    { xtype: "tbspacer", height: 10 },
                    {
                        xtype: "container",
                        layout: "hbox",
                        items: [
                        { xtype: "displayfield", labelWidth: 80, width: 150, value: "PPN Bayar", name: "", readOnly: true},
                        { xtype: "tbspacer", width: 10 },
                        { xtype: "textfield", labelWidth: 20, width:235, fieldLabel: "Rp", name: "", fieldCls: "fieldinput", readOnly: true },
                        ],
                    },
                    { xtype: "tbspacer", height: 10 },
                    {
                        xtype: "container",
                        layout: "hbox",
                        items: [
                        { xtype: "displayfield", labelWidth: 80, width: 150, value: "PPN Fasilitas", name: "", readOnly: true},
                        { xtype: "tbspacer", width: 10 },
                        { xtype: "textfield", labelWidth: 20, width:235, fieldLabel: "Rp", name: "", fieldCls: "fieldinput", readOnly: true },
                        ],
                    },
                    { xtype: "tbspacer", height: 10 },
                    ],
                },
                { xtype: "container", height: 10 },
                {
                    xtype: "fieldset",
                    title: "FASILITAS & SKEMA TARIF",
                    layout: "vbox",
                    flex: 1,
                    height: 400,
                    items: [
                    {
                        xtype: "container",
                        layout: "hbox",
                        items: [
                        { xtype: "textfield", labelWidth: 60, width: 150, fieldLabel: "Fasilitas", name: "", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "tbspacer", width: 30 },
                        { xtype: "textfield", labelWidth: 60, width: 150, fieldLabel: "Skm Trf", name: "", fieldCls: "fieldinput", readOnly: true },
                        ],
                    },
                    { xtype: "container", height: 10 },
                    {
                        xtype: "container",
                        layout: "hbox",
                        items: [
                            {
                            xtype: "grid",
                            pid: "GRIDbcout_25_input_dokumen",
                            emptyText: "No Matching Records",
                            width: 600,
                            height: 230,
                            plugins: ["filterfield", { ptype: "cellediting", clicksToEdit: 1 }],
                            viewConfig: {
                                enableTextSelection: true,
                            },
                            store: {
                                autoLoad: false,
                                autoSync: false,
                                remoteSort: false,
                                remoteFilter: false,
                                proxy: {
                                type: "localstorage",
                                },
                            },
                            columns: [
                                { xtype: "rownumberer", width: 40 },
                                { header: "KODE", dataIndex: "KODE_JENIS_DOKUMEN", sortable: true, width: 50, filter: { xtype: "textfield" } },
                                {
                                header: "NOMOR",
                                dataIndex: "NOMOR_DOKUMEN",
                                sortable: true,
                                width: 150,
                                filter: { xtype: "textfield" },
                                editor: {
                                    xtype: "textfield",
                                    allowBlank: false,
                                },
                                },
                                {
                                header: "TGL",
                                dataIndex: "TANGGAL_DOKUMEN",
                                sortable: true,
                                width: 90,
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
                                { header: "URAIAN", dataIndex: "URAIAN_DOKUMEN", sortable: true, flex: 1, filter: { xtype: "textfield" } },
                                {
                                xtype: "actioncolumn",
                                width: 25,
                                menuDisabled: true,
                                sortable: false,
                                items: [
                                    {
                                    icon: vconfig.getstyle + "icon/delete.ico",
                                    handler: function (grid, rowIndex, colIndex) {
                                        grid.getSelectionModel().select(rowIndex);
                                        var vdt = grid.getSelectionModel().getSelection()[0].data;
                                        console.log(vdt.KODE_JENIS_DOKUMEN);
                                        if (vdt.KODE_JENIS_DOKUMEN !== "740" || vdt.KODE_JENIS_DOKUMEN !== "741" || vdt.KODE_JENIS_DOKUMEN !== "704" || vdt.KODE_JENIS_DOKUMEN !== "705") {
                                        console.log("hasil hapus");
                                        grid.getStore().removeAt(rowIndex);
                                        }
                                    },
                                    },
                                ],
                                },
                            ],
                            listeners: {
                                beforeedit: function (grid, e) {
                                if (e.record.data.KODE_JENIS_DOKUMEN === "740" || e.record.data.KODE_JENIS_DOKUMEN === "741" || e.record.data.KODE_JENIS_DOKUMEN === "704" || e.record.data.KODE_JENIS_DOKUMEN === "705") {
                                    e.cancel = true;
                                }
                                },
                            },
                            tbar: [
                                {
                                xtype: "button",
                                pid: "btedit_dokumen_item_lokal",
                                text: "Edit Dokumen",
                                module: "module_input_dokumen",
                                icon: vconfig.getstyle + "icon/new.ico",
                                tooltip: "Edit Dokumen",
                                },
                            ],
                            },
                        ],
                    },
                    { xtype: "tbspacer", height: 10 },
                        
                    ],
                },
                ],
            },
            ],
        },
        { xtype: "tbspacer", height: 5 },
        ],
        dockedItems: [
            {
              xtype: "toolbar",
              height: 30,
              dock: "top",
              items: ["-", { xtype: "button", pid: "btsavedokumendraft", text: "Simpan Dokumen Draft", icon: vconfig.getstyle + "icon/save.ico", tooltip: "Simpan Dokumen Draft" }],
              // other options....
            },
          ],
          listeners: {
            afterrender: "",
          },
});
