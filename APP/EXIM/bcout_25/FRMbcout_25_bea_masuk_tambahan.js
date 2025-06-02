var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.EXIM.bcout_25.FRMbcout_25_bea_masuk_tambahan", {
  extend: "Ext.window.Window",
  alias: "widget.FRMbcout_25_bea_masuk_tambahan",
  reference: "FRMbcout_25_bea_masuk_tambahan",
  title: "Bea Masuk Tambahan",
  modal: true,
  closeAction: "destroy",
  centered: true,
  autoScroll: false,
  controller: "Cbcout_25",
  //y: -110,
  bodyPadding: "5 5 5 5",
  width: mainpanel.getWidth() * 0.4,
  height: mainpanel.getHeight() * 0.6,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",      

        items: [
        { xtype: "tbspacer", height: 10 },
        {
            xtype: "container",
            layout: { type: "vbox", pack: "start", align: "stretch" },
            items: [
            {
                xtype: "fieldset",
                layout: "hbox",
                title:"IDENTITAS BARANG",
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
                        { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "Nomor HS", name: "", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "tbspacer", width: 10 },
                        ],
                    },
                    { xtype: "tbspacer", height: 10 },
                    {
                        xtype: "container",
                        layout: "hbox",
                        items: [
                        { xtype: "textfield", labelWidth: 100, width: 610, fieldLabel: "Uraian Barang", name: "", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "tbspacer", width: 10 },
                        ],
                    },
                    { xtype: "tbspacer", height: 10 },
                    {
                        xtype: "container",
                        layout: "hbox",
                        items: [
                        { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "Harga CIF", name: "", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "tbspacer", width: 10 },
                        { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "CIF Rp.", name: "", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "tbspacer", width: 10 },
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
                title: "BEA MASUK",
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
                        {
                            xtype: "combobox",
                            name: "",
                            fieldLabel: "Jenis Tarif BM",
                            labelWidth: 100,
                            width: 300,
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
                        { xtype: "displayfield", labelWidth: 100, width: 250, valuefield: "Tarfi Fasilitas", name: "", readOnly: true },
                        ],
                    },
                    { xtype: "tbspacer", height: 10 },
                    {
                        xtype: "container",
                        layout: "hbox",
                        items: [
                        { xtype: "textfield", labelWidth: 100, width: 170, fieldLabel: "Besar Tarif", name: "", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "tbspacer", width: 10 },
                        { xtype: "displayfield", labelWidth: 10, width: 10, value: "%", name: "", readOnly: true },
                        { xtype: "tbspacer", width: 110 },
                        {
                            xtype: "combobox",
                            name: "",
                            fieldLabel: "",
                            labelWidth: 100,
                            width: 200,
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
                        { xtype: "textfield", labelWidth: 100, width: 100, fieldLabel: "", name: "", fieldCls: "fieldinput", readOnly: true },
                        ],
                    },
                    { xtype: "tbspacer", height: 10 },
                    {
                        xtype: "container",
                        layout: "hbox",
                        items: [
                        { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "BM Bayar Rp.", name: "", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "tbspacer", width: 10 },
                        { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "BM Fasilitas Rp.", name: "", fieldCls: "fieldinput", readOnly: true },
                        { xtype: "tbspacer", width: 10 },
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
                title: "TAMBAHAN BEA MASUK",
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
                            {
                                xtype: 'checkboxfield',
                                name : '',
                                labelWidth: 100, 
                                width: 120,
                                fieldLabel: 'BMAD',
                                value: 'BMAD',
                                checked: false
                            },
                            { xtype: "tbspacer", width: 10 },
                            { xtype: "displayfield", labelWidth: 50, width: 50, value: "BMADs", name: "", readOnly: true },
                            { xtype: "tbspacer", width: 10 },
                            { xtype: "textfield", labelWidth: 100, width: 110, fieldLabel: "", name: "", fieldCls: "fieldinput", readOnly: true },
                            { xtype: "tbspacer", width: 10 },
                            { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "% = Rp", name: "", fieldCls: "fieldinput", readOnly: true },
                            { xtype: "tbspacer", width: 10 },
                        ],
                    },
                    { xtype: "tbspacer", height: 10 },
                    {
                        xtype: "container",
                        layout: "hbox",
                        items: [
                            {
                                xtype: 'checkboxfield',
                                name : '',
                                labelWidth: 100, 
                                width: 120,
                                fieldLabel: 'BMI',
                                value: 'BMI',
                                checked: false
                            },
                            { xtype: "tbspacer", width: 10 },
                            { xtype: "displayfield", labelWidth: 50, width: 50, value: "BMIs", name: "", readOnly: true },
                            { xtype: "tbspacer", width: 10 },
                            { xtype: "textfield", labelWidth: 100, width: 110, fieldLabel: "", name: "", fieldCls: "fieldinput", readOnly: true },
                            { xtype: "tbspacer", width: 10 },
                            { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "% = Rp", name: "", fieldCls: "fieldinput", readOnly: true },
                            { xtype: "tbspacer", width: 10 },
                        ],
                    },
                    { xtype: "tbspacer", height: 10 },
                    {
                        xtype: "container",
                        layout: "hbox",
                        items: [
                            {
                                xtype: 'checkboxfield',
                                name : '',
                                labelWidth: 100, 
                                width: 120,
                                fieldLabel: 'BMTP',
                                value: 'BMTP',
                                checked: false
                            },
                            { xtype: "tbspacer", width: 10 },
                            { xtype: "displayfield", labelWidth: 50, width: 50, value: "BMTPs", name: "", readOnly: true },
                            { xtype: "tbspacer", width: 10 },
                            { xtype: "textfield", labelWidth: 100, width: 110, fieldLabel: "", name: "", fieldCls: "fieldinput", readOnly: true },
                            { xtype: "tbspacer", width: 10 },
                            { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "% = Rp", name: "", fieldCls: "fieldinput", readOnly: true },
                            { xtype: "tbspacer", width: 10 },
                        ],
                    },
                    { xtype: "tbspacer", height: 10 },
                    {
                        xtype: "container",
                        layout: "hbox",
                        items: [
                            {
                                xtype: 'checkboxfield',
                                name : '',
                                labelWidth: 100, 
                                width: 120,
                                fieldLabel: 'BMP',
                                value: 'BMP',
                                checked: false
                            },
                            { xtype: "tbspacer", width: 10 },
                            { xtype: "displayfield", labelWidth: 50, width: 50, value: "BMPs", name: "", readOnly: true },
                            { xtype: "tbspacer", width: 10 },
                            { xtype: "textfield", labelWidth: 100, width: 110, fieldLabel: "", name: "", fieldCls: "fieldinput", readOnly: true },
                            { xtype: "tbspacer", width: 10 },
                            { xtype: "textfield", labelWidth: 100, width: 300, fieldLabel: "% = Rp", name: "", fieldCls: "fieldinput", readOnly: true },
                            { xtype: "tbspacer", width: 10 },
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
