Ext.define("COMP.run", {
  singleton: true,
  crud: function (url, param) {
    try {
      Ext.Ajax.request({
        url: url,
        method: "POST",
        params: param,
        timeout: 120000,
        success: function (response) {
          var data = Ext.decode(response.responseText);
          Ext.toast({
            html: data.message,
            title: "Process Notification",
            width: 200,
            align: "t",
          });
        },
        failure: function () {
          Ext.toast({
            html: "Please Check Connection",
            title: "Error Notification",
            width: 200,
            align: "t",
          });
        },
      });
    } catch (e) { }
  },
  uploadimage: function (url, param, file) {
    var deferred = new Ext.Deferred();
    try {
      Ext.MessageBox.show({
        msg: "Processing...",
        progressText: "process...",
        width: 300,
        wait: true,
      });
      var rawfile = file.fileInputEl.dom.files[0],
        data = new FormData();
      data.append("imagefile", rawfile);
      Ext.Ajax.request({
        url: url,
        method: "POST",
        params: param,
        timeout: 120000,
        rawData: data,
        headers: { "Content-Type": null }, //to use content type of FormData
        success: function (response) {
          var dtval = response.responseText;
          Ext.MessageBox.hide();
          deferred.resolve(dtval);
        },
        failure: function (response) {
          deferred.reject(response.status);
          Ext.MessageBox.hide();
          COMP.TipToast.toast("Error", response.statusText + " " + response.status, { cls: "danger", delay: 2000 });
        },
      });
      return deferred.promise;
    } catch (e) {
      Ext.MessageBox.hide();
      COMP.TipToast.toast("Error", e.statusText + " " + e.status, { cls: "danger", delay: 2000 });
    }
  },
  getdata: function (url, param) {
    var deferred = new Ext.Deferred();
    try {
      Ext.Ajax.request({
        url: url,
        method: "POST",
        params: param,
        timeout: 120000,
        success: function (response) {
          var data = response.responseText;
          var hasil = Ext.decode(response.responseText);
          //COMP.TipToast.toast("Login ", hasil.message, {cls: "info", delay: 2000});
          deferred.resolve(data);
        },
        failure: function (response) {
          //COMP.TipToast.toast("Login Failed", "Please Check Connection and Password", {cls: "danger", delay: 2000});
          deferred.reject(response.status);
        },
      });

      return deferred.promise;
    } catch (e) { }
  },
  gethide: function (url, param, vmethod, vauth) {
    var deferred = new Ext.Deferred();
    try {
      Ext.Ajax.request({
        url: url,
        disableCaching: false,
        headers: {
          Authorization: "Bearer " + vauth,
        },
        method: vmethod,
        timeout: 120000,
        redirect: "follow",
        dataType: "json",
        jsonData: param,
        success: function (response) {
          var data = response.responseText;
          deferred.resolve(data);
        },
        failure: function (response) {
          deferred.reject(response.status);
          COMP.TipToast.toast("Error", response.statusText + " " + response.status, { cls: "danger", delay: 2000 });
        },
      });

      return deferred.promise;
    } catch (e) {
      COMP.TipToast.toast("Error", e.statusText, { cls: "danger", delay: 2000 });
    }
  },
  getservice: function (url, param, vmethod, vauth) {
    var deferred = new Ext.Deferred();
    try {
      var mainpage = Ext.ComponentQuery.query("mainpage")[0];
      Ext.MessageBox.show({
        msg: "Processing...",
        progressText: "process...",
        width: 300,
        wait: true,
        animateTarget: mainpage,
      });

      Ext.Ajax.request({
        url: url,
        disableCaching: false,
        headers: {
          Authorization: "Bearer " + vauth,
        },
        method: vmethod,
        timeout: 0,
        redirect: "follow",
        dataType: "json",
        jsonData: param,
        success: function (response) {
          var data = response.responseText;
          deferred.resolve(data);
          Ext.MessageBox.hide();
        },
        failure: function (response) {
          Ext.MessageBox.hide();
          deferred.reject(response.status);
          COMP.TipToast.toast("Error", response.statusText + " " + response.status, { cls: "danger", delay: 2000 });
        },
      });

      return deferred.promise;
    } catch (e) {
      Ext.MessageBox.hide();
      COMP.TipToast.toast("Error", e.statusText, { cls: "danger", delay: 2000 });
    }
  },
  getnothing: function (url, param) {
    var deferred = new Ext.Deferred();
    try {
      Ext.Ajax.request({
        url: url,
        method: "POST",
        params: param,
        timeout: 120000,
        success: function (response) {
          var data = response.responseText;
          deferred.resolve(data);
        },
        failure: function (response) {
          deferred.reject(response.status);
        },
      });

      return deferred.promise;
    } catch (e) { }
  },
  errhandler: function (title, value, type) {
    try {
      switch (type) {
        case "info":
          COMP.TipToast.toast(title, value, { cls: "info", delay: 2000 });
        case "success":
          COMP.TipToast.toast(title, value, { cls: "success", delay: 2000 });
        case "warning":
          NJC.plugin.TipToasttoast(title, value, { cls: "warning", delay: 2000 });
        case "danger":
          COMP.TipToast.toast(title, value, { cls: "danger", delay: 2000 });
        case "":
          Ext.toast({
            html: value,
            title: title,
            width: 200,
            align: "t",
          });
      }
    } catch (e) { }
  },
  exportfile: function (url, param) {
    try {
      Ext.MessageBox.show({
        msg: "Exporting, please wait...",
        progressText: "process...",
        width: 300,
        wait: true,
      });
      Ext.Ajax.request({
        url: url,
        params: param,
        timeout: 1200000,

        success: function (r) {
          if (r.status === 200) {
            var resp = Ext.decode(r.responseText);
            console.log(resp);
            Ext.DomHelper.append(Ext.getBody(), {
              tag: "iframe",
              frameBorder: 0,
              width: 0,
              height: 0,
              css: "display:none;visibility:hidden;height:0px;",
              src: resp.filename,
            });
            Ext.MessageBox.hide();
          } else {
            Ext.MessageBox.hide();
          }
        },
        failure: function (e) {
          COMP.TipToast.toast("Error Process", e.statusText, { cls: "danger", delay: 2000 });
          Ext.MessageBox.hide();
        },
      });
    } catch (e) {
      COMP.TipToast.toast("Error Process", e.message, { cls: "danger", delay: 2000 });
      Ext.MessageBox.hide();
    }
  },
  getfilter: function (gridname) {
    try {
      var data = [];
      gridname
        .getStore()
        .getFilters()
        .each(function (filter) {
          data.push(filter.serialize());
        });
      return Ext.encode(data);
    } catch (e) {
      return {};
    }
  },
  getpopup: function (xtype, title) {
    try {
      Ext.define("modalview", {
        extend: "Ext.window.Window",
        xtype: "modalview",
        title: title,
        modal: true,
        layout: {
          type: "vbox",
          pack: "start",
          align: "stretch",
        },
        items: [{ xtype: xtype }],
      });
      this.dialog = Ext.widget("modalview");
      this.dialog.show();
    } catch (e) { }
  },
  getviewpdf: function (title, url) {
    try {
      Ext.MessageBox.show({
        msg: "Exporting, please wait...",
        progressText: "process...",
        width: 300,
        wait: true,
      });
      Ext.define("modalview", {
        extend: "Ext.window.Window",
        xtype: "modalview",
        title: title,
        modal: true,
        items: {
          xtype: "panel",
          width: 800,
          height: 450,
          items: {
            xtype: "component",
            autoEl: {
              tag: "iframe",
              style: "height: 100%; width: 100%; border: none",
              src: url,
            },
          },
        },
      });
      this.dialog = Ext.widget("modalview");
      this.dialog.show();
      Ext.MessageBox.hide();
    } catch (err) {
      Ext.MessageBox.hide();
      NJC.config.RUN.errhandler("Error Process Export", e.message);
    }
  },
  getterbilang: function (nilai) {
    try {
      var bilangan = nilai.toString();
      var kalimat = "";
      var angka = new Array("0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0");
      var kata = new Array("", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan");
      var tingkat = new Array("", "Ribu", "Juta", "Milyar", "Triliun");
      var panjang_bilangan = bilangan.length;

      /* pengujian panjang bilangan */
      if (panjang_bilangan > 15) {
        kalimat = "Diluar Batas";
      } else {
        /* mengambil angka-angka yang ada dalam bilangan, dimasukkan ke dalam array */
        for (i = 1; i <= panjang_bilangan; i++) {
          angka[i] = bilangan.substr(-i, 1);
        }

        var i = 1;
        var j = 0;

        /* mulai proses iterasi terhadap array angka */
        while (i <= panjang_bilangan) {
          subkalimat = "";
          kata1 = "";
          kata2 = "";
          kata3 = "";

          /* untuk Ratusan */
          if (angka[i + 2] != "0") {
            if (angka[i + 2] == "1") {
              kata1 = "Seratus";
            } else {
              kata1 = kata[angka[i + 2]] + " Ratus";
            }
          }

          /* untuk Puluhan atau Belasan */
          if (angka[i + 1] != "0") {
            if (angka[i + 1] == "1") {
              if (angka[i] == "0") {
                kata2 = "Sepuluh";
              } else if (angka[i] == "1") {
                kata2 = "Sebelas";
              } else {
                kata2 = kata[angka[i]] + " Belas";
              }
            } else {
              kata2 = kata[angka[i + 1]] + " Puluh";
            }
          }

          /* untuk Satuan */
          if (angka[i] != "0") {
            if (angka[i + 1] != "1") {
              kata3 = kata[angka[i]];
            }
          }

          /* pengujian angka apakah tidak nol semua, lalu ditambahkan tingkat */
          if (angka[i] != "0" || angka[i + 1] != "0" || angka[i + 2] != "0") {
            subkalimat = kata1 + " " + kata2 + " " + kata3 + " " + tingkat[j] + " ";
          }

          /* gabungkan variabe sub kalimat (untuk Satu blok 3 angka) ke variabel kalimat */
          kalimat = subkalimat + kalimat;
          i = i + 3;
          j = j + 1;
        }

        /* mengganti Satu Ribu jadi Seribu jika diperlukan */
        if (angka[5] == "0" && angka[6] == "0") {
          kalimat = kalimat.replace("Satu Ribu", "Seribu");
        }
      }

      return kalimat;
    } catch (e) {
      console.log(e);
    }
  },
  getmodule: function (modulename, modulepath, panelset) {
    try {
      Ext.MessageBox.show({
        msg: "Processing...",
        progressText: "process...",
        width: 300,
        wait: true,
      });

      var form = Ext.ComponentQuery.query(modulename)[0]; //this.lookupReference('FRMposales');
      if (!form) {
        form = Ext.create(modulepath);
      }
      var panel = Ext.ComponentQuery.query(panelset)[0];
      panel.items.add(form);
      panel.setActiveItem(form);
      Ext.MessageBox.hide();
    } catch (ex) {
      Ext.MessageBox.hide();
      COMP.TipToast.toast("Error", ex.statusText + " module = " + modulepath, { cls: "danger", delay: 2000 });
    }
  },
  getmodulepopup: function (modulename, modulepath, getview) {
    try {
      Ext.MessageBox.show({
        msg: "Processing...",
        progressText: "process...",
        width: 300,
        wait: true,
      });

      var form = Ext.ComponentQuery.query(modulename)[0]; //this.lookupReference('FRMposales');
      if (!form) {
        form = Ext.create(modulepath);
      }

      //console.log(form);
      getview.add(form).show();
      Ext.MessageBox.hide();
      return true;
    } catch (ex) {
      console.log(ex.message);
      Ext.MessageBox.hide();
      COMP.TipToast.toast("Error", ex.statusText + " module = " + modulepath, { cls: "danger", delay: 2000 });
    }
  },
  getxlsxtojson: function (file) {
    try {
      var deferred = new Ext.Deferred();
      var reader = new FileReader();
      var result;
      reader.onload = function (e) {
        try {
          var data = new Uint8Array(e.target.result);
          var wb = XLSX.read(data, { type: "array" });
          wb.SheetNames.forEach(function (sheetName) {
            var csv = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], { header: -1 });
            if (csv.length) {
              result = csv;
              //                                        result = csv.split("\n").map(
              //                                            function(e) {
              //                                                return JSON.stringify(e);
              //                                            }
              //                                        );
            }
          });

          deferred.resolve(Ext.encode(result));
        } catch (ex) {
          COMP.TipToast.toast("Error Process", ex.message, { cls: "danger", delay: 2000 });

          deferred.reject(result);
        }
      };
      reader.readAsArrayBuffer(file);
      return deferred.promise;
    } catch (e) {
      COMP.TipToast.toast("Error Process", e.message, { cls: "danger", delay: 2000 });
      deferred.reject(result);
    }
  },
  getxlsxtocsv: function (file) {
    try {
      var deferred = new Ext.Deferred();
      var reader = new FileReader();
      var result;
      reader.onload = function (e) {
        try {
          var data = new Uint8Array(e.target.result);
          var wb = XLSX.read(data, { type: "array" });
          //                        wb.SheetNames.forEach(function(sheetName) {
          //
          //                        });
          var csv = XLSX.utils.sheet_to_csv(wb.Sheets["Sheet1"], { FS: "\t" });
          if (csv.length) {
            result = csv.split("\n").map(function (e) {
              return e.split("\t");
            });
          }
          deferred.resolve(Ext.encode(result));
        } catch (ex) {
          COMP.TipToast.toast("Error Process", ex.message, { cls: "danger", delay: 2000 });

          deferred.reject(result);
        }
      };
      reader.readAsArrayBuffer(file);
      return deferred.promise;
    } catch (e) {
      COMP.TipToast.toast("Error Process", e.message, { cls: "danger", delay: 2000 });
      deferred.reject(result);
    }
  },
  getmsgboxyesno: function (title, content) {
    var deferred = new Ext.Deferred();
    try {
      var st = "no";
      Ext.Msg.confirm(
        title,
        content,
        function (button) {
          if (button === "yes") {
            st = "yes";
          } else {
            st = "no";
          }
          deferred.resolve(st);
        },
        this
      );
      return deferred.promise;
    } catch (ex) { }
  },
  getuploadobject: function (url, param, STdata) {
    var deferred = new Ext.Deferred();
    try {
      var val = STdata.data.items;
      var x = 0,
        y = 0,
        xcount = STdata.getCount(),
        count = 0;
      var xparam;
      var me = this;
      Ext.MessageBox.show({
        title: "Please wait",
        msg: "Loading items record : " + xcount,
        progressText: "Initializing...",
        width: 300,
        progress: true,
        closable: false,
      });

      Ext.each(val, function (item, idx) {
        ++count;
        Ext.Ajax.request({
          url: url,
          method: "POST",
          params: item,
          timeout: 12000,
          success: function () {
            ++x;
            deferred.resolve({ status: { x: x, y: y } });
            Ext.MessageBox.updateProgress(xcount, "Upload Ok: " + x + ",Failed: " + y);
            me.timer = Ext.defer(this, 500);
          },
          failure: function () {
            ++y;
            deferred.resolve({ status: { x: x, y: y } });
            Ext.MessageBox.updateProgress(xcount, "Upload Ok: " + x + ",Failed: " + y);
            me.timer = Ext.defer(this, 500);
          },
        });
      });

      Ext.MessageBox.hide();
      return deferred.promise;
    } catch (e) {
      console.log(e);
      Ext.MessageBox.hide();
      COMP.TipToast.toast("Error", e.statusText, { cls: "danger", delay: 2000 });
    }
  },
  ajax_form: function (arr) {
    var deferred = new Ext.Deferred();
    try {
      // if (arr['btnObject']) {
      //   btnObject = Ext.ComponentQuery.query(arr['btnObject'])[0];
      // } else{
      //   btnObject = null;
      // }

      Ext.Ajax.request({
        url: arr['url'],
        disableCaching: false,
        headers: {
          Authorization: "Bearer " + arr['token'],
        },
        method: arr['method'],
        timeout: 120000,
        redirect: "follow",
        dataType: "json",
        jsonData: arr['param'],
        success: function (response) {
          // btnObject.setText(arr['successSend']);
          var data = response.responseText;
          deferred.resolve(data);
        },
        failure: function (response) {
          deferred.reject(response.status);
          COMP.TipToast.toast("Error", response.statusText + " " + response.status, { cls: "danger", delay: 2000 });
        },
      });

      return deferred.promise;
    } catch (e) {
      COMP.TipToast.toast("Error", e.statusText, { cls: "danger", delay: 2000 });
    }
  },
  ajax_rawdata: function (arr) {
    var deferred = new Ext.Deferred();
    try {
      // if (arr['btnObject']) {
      //   btnObject = Ext.ComponentQuery.query(arr['btnObject'])[0];
      // } else{
      //   btnObject = null;
      // }

      Ext.Ajax.request({
        url: arr['url'],
        disableCaching: false,
        headers: {
          'Authorization': "Bearer " + arr['token'],
          'Content-Type': "null"
        },
        method: arr['method'],
        timeout: 120000,
        // redirect: "follow",
        rawData: arr['rawData'],
        success: function (response) {
          // btnObject.setText(arr['successSend']);
          var data = response.responseText;
          deferred.resolve(data);
        },
        failure: function (response) {
          deferred.reject(response.status);
          COMP.TipToast.toast("Error", response.statusText + " " + response.status, { cls: "danger", delay: 2000 });
        },
      });

      return deferred.promise;
    } catch (e) {
      COMP.TipToast.toast("Error", e.statusText, { cls: "danger", delay: 2000 });
    }
  },
});
