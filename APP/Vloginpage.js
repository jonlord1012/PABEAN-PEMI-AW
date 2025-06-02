Ext.define("NJC.Vloginpage", {
  extend: "Ext.form.Panel",
  alias: "widget.Vloginpage",
  reference: "Vloginpage",
  layout: {
    type: "hbox",
    pack: "start",
    align: "stretch",
  },
  border: false,
  bodyPadding: 4,
  items: [
    { xtype: "tbspacer", flex: 1 },
    {
      width: 800,
      frame: false,
      border: false,
      layout: "vbox",
      align:'center',
      margin:'25 0 0 0',
      items: [
      {
        xtype: "panel",
        margin: "10 0 10 0",
        layout: "center",
        border: false,
        frame: false,
        items: [
        {
          xtype: "container",
          layout: "hbox",
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

        ],
      },
      {
        width: 300,
        items: false,
        border: false,
        layout: "center",
        items: [
        {
          title: "Login Application",
          titleAlign: 'center',
          frame: false,
          height: 200,
          bodyPadding: 10,
          style:{
            borderRadius: '10px',
          },
          items: [
          {
            xtype: "textfield",
            name: "UserLogin",
            labelWidth:70,
            width:'100%',
            margin:'10 0 0 0',
            fieldLabel: "User Login",
            allowBlank: false,
            labelAlign: "left",
            emptyText: "user Login",
          },
          {
            xtype: "textfield",
            name: "UserPassword",
            labelWidth:70,
            width:'100%',
            margin:'15 0 0 0',
            fieldLabel: "Password",
            allowBlank: false,
            labelAlign: "left",
            emptyText: "password",
            inputType: "password",
          },
          ],

          buttons: [{
           text: "Login",
           // margin: '0 210px 0 0',
           // iconCls:"fa fa-spin fa-spinner", 
           pid: "btlogin" 
         }],
        },
        ],
      },
      ],
    },
    ],
});
