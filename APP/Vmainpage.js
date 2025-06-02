Ext.define("NJC.Vmainpage", {
  extend: "Ext.panel.Panel",
  alias: "widget.Vmainpage",
  reference: "Vmainpage",
  layout: "border",
  border: false,
  defaults: {
    split: true,
  },
  //controller:'Cmainpage',
  items: [
    {
      region: "north",
      layout: "hbox",
      border: false,
      items: [
        {
          xtype: "container",
          width: 280,
          layout: "vbox",
          items: [
            {
              xtype: "container",
              layout: "hbox",
              margin: "10 0 0 2",
              items: [
                {
                  xtype: "image",
                  src: vconfig.basepath + "style/logo/pemi.png",
                  height: 209 * 0.18,
                  width: 417 * 0.18,
                },
                {
                  xtype: "container",
                  layout: "vbox",
                  items: [
                    {
                      xtype: "label",
                      margin: "-10 0 0 3",
                      style: "color: #757575; font-weight: bold; font-size: 26px;font-family:Arial Black;font-weight: bold;",
                      html: "PEMI-AW",
                    },
                    {
                      xtype: "label",
                      margin: "0 0 0 3",
                      style: "color: #757575; font-weight: bold; font-size: 10px",
                      html: "for PLB",
                    },
                  ],
                },
              ],
            },
            {
              xtype: "container",
              layout: "hbox",
              margin: "10 0 0 10",
              items: [
                {
                  xtype: "label",
                  margin: "0 0 0 3",
                  style: "color: #757575; font-weight: bold; font-size: 12px",
                  html: "CONPANY:",
                },
                {
                  xtype: "label",
                  pid: "Vidcompany",
                  margin: "0 0 0 3",
                  style: "color: #757575; font-weight: bold; font-size: 12px",
                  html: "",
                },
                { xtype: "tbspacer", width: 10 },
                {
                  xtype: "label",
                  margin: "0 0 0 3",
                  style: "color: #757575; font-weight: bold; font-size: 12px",
                  html: "Login:",
                },
                {
                  xtype: "label",
                  pid: "Vuserlogin",
                  margin: "0 0 0 3",
                  style: "color: #757575; font-weight: bold; font-size: 12px",
                  html: "",
                },
              ],
            },
            {
              xtype: "container",
              layout: "hbox",
              margin: "2 0 0 10",
              items: [],
            },
            {
              xtype: "container",
              layout: "hbox",
              margin: "5 0 10 10",
              items: [{ xtype: "button", text: "Logout", pid: "btlogout", icon: vconfig.getstyle + "icon/user.png", tooltip: "Logout" }],
            },
          ],
        },
        {
          xtype: "tabpanel", // TabPanel itself has no title
          pid: "tab_panelmenu",
          flex: 1,
          frame: false,
          border: false,
          activeTab: 0,
          items: [
            //{ title: 'Exim', html: '' }
          ],
        },
      ],
    }, //atas posisi
    {
      collapsible: false,
      region: "center",
      layout: "card",
      border: false,
      frame: false,
      items: [
        {
          itemId: "tabs",
          pid: "modmasterTAB",
          reference: "modmasterTAB",
          xtype: "tabpanel", // TabPanel itself has no title
          items: [
            /*{
              xtype: "ext_rpt_stock_card",
              closable: true,
              frame: false,
              border: false
            },*/
          ],
        },
      ],
    },
  ],
});
