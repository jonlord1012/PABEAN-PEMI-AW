Ext.onReady(function () {
  Ext.Loader.setConfig({ enabled: true });
  Ext.Loader.setPath("COMP", "components");
  Ext.Loader.setPath("APP_PATH", "APP");
  Ext.Loader.setPath("Ext.ux", "js/ux");

  var currentDomain = window.location.protocol + "//" + window.location.host;
  Ext.define("vconfig", {
    singleton: true,
    LOG: {},
    verify: {},
    setting: {},
    getstyle: Ext.getWin().dom.location.href + "style/",
    basepath: Ext.getWin().dom.location.href,
    
	 

    /*service_url: 'https://develop.binjava.online/auth/',*/
    /*service_data: 'https://develop.binjava.online/dummyservice/home/module/',*/
    /*service_api: 'https://develop.binjava.online'*/

    // service_url: 'http://66.42.62.29/auth/',
    // service_data: 'http://66.42.62.29/front/dummyservice/home/module/',
    // service_api: 'http://66.42.62.29/front/'


    // service_url: "http://149.28.146.73/pabean/dummyservice/home/auth/",
    // service_api: "http://149.28.146.73/pabean/dummyservice/home/api/",


    // service_main: "http://139.180.156.142:81/pabean/dummyservice/home/",
    // service_url: "http://139.180.156.142:81/pabean/dummyservice/home/auth/",
    // service_api: "http://139.180.156.142:81/pabean/dummyservice/home/api/",    
    /*service_main: "http://localhost/plb/dummyservice/home/",
    service_url: "http://localhost/plb/dummyservice/home/auth/",
    service_api: "http://localhost/plb/dummyservice/home/api/",
  */
    
      service_main:  currentDomain + "/plb/dummyservice/home/",
      service_url:  currentDomain + "/plb/dummyservice/home/auth/",
      service_api:  currentDomain + "/plb/dummyservice/home/api/",
      service_portal:  currentDomain + "/plb/dummyservice/portalapi/",
      service_report: currentDomain + "/plb/dummyservice/report/api/",
		service_portalplb :  currentDomain + "/plb/dummyservice/portalapiplb/", 
    /*
    service_main: "https://pslibalaraja.com:8084/plb/dummyservice/home/",
    service_url: "https://pslibalaraja.com:8084/plb/dummyservice/home/auth/",
    service_api: "https://pslibalaraja.com:8084/plb/dummyservice/home/api/",
    service_portal: "https://pslibalaraja.com:8084/plb/dummyservice/portalapi/",
    service_portalplb: "https://pslibalaraja.com:8084/plb/dummyservice/portalapiplb/",
    service_report: "https://pslibalaraja.com:8084/plb/dummyservice/report/api/",
	 */


  });

  Ext.application({
    name: "NJC",
    appFolder: "APP",
    autoCreateViewport: "NJC.mainpage",
    requires: ["vconfig"],
    launch: function () { },
  });
});
