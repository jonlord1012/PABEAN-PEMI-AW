Ext.define("NJC.Cmainpage", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cmainpage",
  init: function (view) {
    this.control({
      "mainpage Vloginpage button[pid=btlogin]": { click: this.btlogin_click },
      "mainpage button[btid=btid]": { click: this.btmenu_click },
      "mainpage button[pid=btlogout]": { click: this.btlogout_click },
      "mainpage Vmainpage tabpanel[pid=modmasterTAB]": { add: this.tab_panelmenu_add },
      // "mainpage Vmainpage tabpanel[pid=modmasterTAB] .tabpanels": { close: this.tab_panelmenu_close },
      "Vloginpage textfield[name=UserLogin]": { specialkey: this.dokeyUserLogin },
      "Vloginpage textfield[name=UserPassword]": { specialkey: this.dokeyUserPassword },
    });
    this.renderpage();
  },
  renderpage: function () {
    try {
      var me = this;
      var panel = Ext.ComponentQuery.query("mainpage")[0];
      if (localStorage.getItem("ST_NJC_JWT_PLB") === null) {
        this.SetActivepanel(0);
      } else {
        var ST_NJC_TAP2PANEL = JSON.parse(localStorage.getItem('ST_NJC_PLB_TAP2PANEL'));
        var ST_NJC_JWT = localStorage.getItem("ST_NJC_JWT_PLB");
        var hasil = COMP.run.gethide(vconfig.service_main + "reload", "", "POST", ST_NJC_JWT);
        hasil.then(function (content) {
          var val = Ext.decode(content, true);
          if (val.success === "true") {
            var ST_NJC_PROFILE = Ext.decode(localStorage.getItem("ST_NJC_PROFILE_PLB"));
            var Vuserlogin = Ext.ComponentQuery.query("mainpage Vmainpage label[pid=Vuserlogin]")[0];
            var Vidcompany = Ext.ComponentQuery.query("mainpage Vmainpage label[pid=Vidcompany]")[0];
            Vuserlogin.setText(ST_NJC_PROFILE[0].USER_NAME);
            Vidcompany.setText(ST_NJC_PROFILE[0].ID_COMPANY);

            me.SetActivepanel(1);
            me.configuration_menu();
            // Ext.each(ST_NJC_TAP2PANEL, function(panel) {
            //   me.btmenu_click(panel)
            // })
          }
        }, this);
      }
    } catch (err) {
      COMP.TipToast.toast("Error", err.message, { cls: "danger", delay: 2000 });
    }
  },
  GetActivepanel: function () {
    try {
      var panel = Ext.ComponentQuery.query("mainpage")[0];
      var actindex = panel.getLayout().activeItem;
      var idx = panel.items.indexOf(actindex);
      return idx;
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  SetActivepanel: function (val) {
    try {
      var panel = Ext.ComponentQuery.query("mainpage")[0];
      panel.setActiveItem(val);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  dokeyUserLogin: function (field, event, options) {
    var form = this.lookupReference("Vloginpage");
    if (event.getKey() === event.ENTER) {
      form.getForm().findField("UserPassword").focus(true);
    }
  },
  dokeyUserPassword: function (field, event, options) {
    if (event.getKey() === event.ENTER) {
      this.btlogin_click();
    }
  },
  btlogin_click: async function () {
    try {
      //var ST_NJC = new Ext.data.proxy.SessionStorage({ id: "ST_NJC" });

      var ST_NJC = Ext.create("Ext.data.Store", {
        id: "ST_NJC_PROFILE_PLB",
        proxy: {
          type: "localstorage",
          id: "ST_NJC_PROFILE_PLB",
        },
      });

      var ST_NJC = Ext.create("Ext.data.Store", {
        id: "ST_NJC_PLB",
        proxy: {
          type: "localstorage",
          id: "ST_NJC_PLB",
        },
      });
      Ext.create("Ext.data.Store", {
        id: "ST_NJC_JWT_PLB",
        proxy: {
          type: "localstorage",
          id: "ST_NJC_JWT_PLB",
        },
      });
      var Vloginpage = Ext.ComponentQuery.query("mainpage Vloginpage")[0];

      var dtval = Vloginpage.getValues(false, false, false, true);
      var params = {
        method: "login",
        data: {
          username: dtval.UserLogin,
          password: dtval.UserPassword,
        },
      };
      var Vuserlogin = Ext.ComponentQuery.query("mainpage Vmainpage label[pid=Vuserlogin]")[0];
      var Vidcompany = Ext.ComponentQuery.query("mainpage Vmainpage label[pid=Vidcompany]")[0];

      var me = this;

      var setbtn_Vlogin = Ext.ComponentQuery.query("mainpage Vloginpage button[pid=btlogin]")[0];

      // var hasil = COMP.run.gethide(vconfig.service_url, Ext.encode(params), "POST");

      await setbtn_Vlogin.setText('').setDisabled(true).setIconCls('fa fa-spin fa-spinner');

      var hasil = COMP.run.ajax_form({
        method: "POST",
        url: vconfig.service_url,
        param: Ext.encode(params),
      });

      await hasil.then(function (content) {
        var val = Ext.decode(content, true);
        setbtn_Vlogin.setText('Login').setDisabled(false).setIconCls('');

        if (val.success === "true") {
          COMP.TipToast.toast("success", val.messages, { cls: "success", delay: 3000 });

          var vdt = {
            menu_header: Ext.decode(val.menu_header),
            menu_panel: Ext.decode(val.menu_panel),
            menu_detail: Ext.decode(val.menu_detail),
          };
          localStorage.setItem("ST_NJC_PLB", Ext.encode(vdt));
          localStorage.setItem("ST_NJC_JWT_PLB", val.token);
          localStorage.setItem("ST_NJC_PROFILE_PLB", val.profile);
          var vprofile = Ext.decode(val.profile);
          Vuserlogin.setText(vprofile[0].USER_NAME);
          Vidcompany.setText(vprofile[0].ID_COMPANY);
          me.SetActivepanel(1);
          me.configuration_menu();
        } else {
          COMP.TipToast.toast("Error", val.message, { cls: "danger", delay: 3000 });
        }
      }, this);
    } catch (err) {
      COMP.TipToast.toast("Error", err.message, { cls: "danger", delay: 2000 });
    }
  },
  configuration_menu: function () {
    try {
      var ST_NJC = Ext.decode(localStorage.getItem("ST_NJC_PLB"));
      var mheader = ST_NJC.menu_header;
      var mpanel = ST_NJC.menu_panel;
      var mdetail = ST_NJC.menu_detail;
      var Vmainpage = Ext.ComponentQuery.query("mainpage Vmainpage tabpanel[pid=tab_panelmenu]")[0];
      Ext.each(mheader, function (mname, index) {
        var ntab = Vmainpage.child("#" + mname.MENU_CONTROL);
        if (!ntab) {
          var xtab = Vmainpage.add({
            title: mname.MENU_NAME,
            pid: mname.MENU_CONTROL,
            layout: "hbox",
            bodyPadding: 2,
            items: [],
          });


          Ext.each(mpanel, function (menupanel, index) {
            if (menupanel.MENU_PARRENT === mname.MENU_CODE) {
              var nsub = xtab.add({
                xtype: "panel",
                frame: false,
                //flex: 2, //menudetail.MENU_SUBMODULE.length * 60 + 40,
                bodyPadding: 1,
                margin: "0 5 0 0",
                height: 80, //default 100

                items: [],
                bbar: [{ xtype: "label", margin: "0 0 0 10", html: "<b>" + menupanel.MENU_SUBMODULE + "</b>", align: "center" }, "->"],
              });

              var xcount = 0,
                width_btn = 65;
              total_btn_width = 0;

              Ext.each(mdetail, function (btname, index) {
                if (btname.MENU_SUBMODULE === menupanel.MENU_SUBMODULE && btname.MENU_PARRENT === mname.MENU_CODE) {

                  if (btname.MENU_NAME.length >= 9) { width_btn = 85 } else { width_btn = width_btn }

                  nsub.add({
                    xtype: "button",
                    btid: "btid",
                    pid: btname.MENU_CONTROL,
                    modulepage: "NJC." + btname.MENU_MODULE + "." + btname.MENU_CONTROL + "." + btname.MENU_CONTROL,
                    width: width_btn,
                    margin: "0 3 3 0",
                    icon: vconfig.getstyle + "icon/" + btname.MENU_IMAGE,
                    text: btname.MENU_NAME.replace('_', ' '),
                    iconAlign: "top",
                    scale: "medium",
                    tooltip: btname.MENU_TOOLTIP,
                  });
                  xcount++;
                  total_btn_width = total_btn_width + width_btn;
                }
              });

              nsub.width = total_btn_width + 25;
            }
          });
        }
      });
    } catch (err) {
      COMP.TipToast.toast("Error", err.message, { cls: "danger", delay: 2000 });
    }
  },
  btmenu_click: function (cmp, e) {
    try {
      if (localStorage.getItem("ST_NJC_JWT_PLB") === null) {
        //this.SetActivepanel(0);
        location.reload();
        return false;
      }

      var modulepage = cmp.modulepage;
      var Vmaintab = Ext.ComponentQuery.query("mainpage Vmainpage tabpanel[pid=modmasterTAB]")[0];
      var me = this;

      // console.log(cmp.modulepage, cmp.pid, cmp.tooltip)

      // if (cmp.autoGenId) {
      //   var arr, lStorage = localStorage.getItem('ST_NJC_PLB_TAP2PANEL');

      //   if (!lStorage) { arr=[] } else { arr=JSON.parse(lStorage) }

      //   arr.push({
      //     modulepage:cmp.modulepage,
      //     pid:cmp.pid,
      //     tooltip:cmp.tooltip,
      //     autoGenId:false
      //   });

      //   localStorage.setItem('ST_NJC_PLB_TAP2PANEL', JSON.stringify(arr));
      // }

      var tab = Vmaintab.getComponent(cmp.pid);
      if (!tab) {
        try {
          tab = Vmaintab.add(
            Ext.create(modulepage, {
              waitMsgTarget: true,
              id: cmp.pid,
              itemId: cmp.pid,
              closable: true,
              frame: false,
              border: false,
              title: cmp.tooltip
            })
          );
        } catch (err) {
          COMP.TipToast.toast("Error", "File Not Found", { cls: "danger", delay: 2000 });
        }
      }
      Vmaintab.setActiveTab(tab);
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btlogout_click: function () {
    try {
      localStorage.clear();
      location.reload();
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  tab_panelmenu_add: function (cmp) {
    try {
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  tab_panelmenu_close: function (cmp) {
    try {
      //console.log(cmp)
    } catch (ex) {
      COMP.TipToast.toast("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  }
});
