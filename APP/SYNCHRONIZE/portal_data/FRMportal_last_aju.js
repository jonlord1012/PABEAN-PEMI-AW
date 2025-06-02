var mainpage = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("NJC.SYNCHRONIZE.portal_data.FRMportal_last_aju", {
   extend: "Ext.window.Window",
   alias: "widget.FRMportal_last_aju",
   pid: "FRMportal_last_aju",
   controller: "Cportal_data",
   title: "Download CEISA 4.0 Dokumen",
   requires: ["Ext.grid.feature.Grouping"],
   centered: true,
   closeAction: "destroy",
   bodyPadding: 10,
   modal: true,
   layout: { type: "vbox", pack: "start", align: "stretch" },
   //width: mainpage.getWidth() * 0.3,
   width: 500,
   height: mainpage.getHeight() * 0.2,
   autoScroll: false,
   flex: 1,
   items: [

      { xtype: "tbspacer", width: 10 },
      {
         xtype: "container",
         layout: { type: "vbox", pack: "start", align: "stretch" },
         boder: false,
         frame: false,
         flex: 1,
         //autoScroll: true,
         bodyPadding: "15 0 15 0",
         items: [
            { xtype: "tbspacer", height: 10 },
            {
               xtype: "form",
               pid: "FRMportallastaju",
               frame: false,
               border: false,
               //layout: { type: "vbox", pack: "start", align: "stretch" },
               height: '100%',
               items: [
                  {
                     xtype: "container",
                     layout: { type: "vbox", pack: "center", align: "stretch" },
                     //layout: 'anchor',
                     bodyPadding: "15 0 15 0",
                     //flex: 1,
                     //autoScroll: true,
                     items: [
                        { xtype: "tbspacer", height: 10 },
                        {
                           xtype: "container",
                           layout: { type: "hbox", pack: "center", align: "center" },
                           //autoScroll: true,
                           //layout: 'anchor',
                           flex: 1,
                           items: [

                              { xtype: "textfield", width: 50, dataIndex: "kodeDokumen", name: "KODE_DOKUMEN", fieldCls: "fieldlock", maskRe: /[0-9.-]/, },
                              { xtype: "tbspacer", width: 10 },
                              { xtype: "textfield", labelWidth: 110, width: 300, dataIndex: "nomorAju", fieldLabel: "No. Aju & Tipe BC", name: "NOMOR_AJU", fieldCls: "fieldlock", maskRe: /[0-9.-]/, },

                              { xtype: "tbspacer", width: 10 },
                              {
                                 xtype: "button",
                                 pid: "btgetLastAju",
                                 label: "Find",
                                 module: "portal",
                                 icon: vconfig.getstyle + "icon/search.ico",
                                 tooltip: "Find Last Aju",
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
      {
         xtype: "label",
         html: "<b>FIND LAST AJU dari Portal CEISA 4.0 (https://portal.beacukai.go.id/) </b>",
      },
   ],

}
);