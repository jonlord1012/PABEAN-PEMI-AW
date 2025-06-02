Ext.define("NJC.EXIM.bcin_271_aw.GRIDentitas", {
    extend: "Ext.grid.Panel",
    xtype: "GRIDentitas",
    pid: "GRIDentitas",
    emptyText: "No Matching Records",
    autoScroll: true,
    flex: 1,
    store: {
      autoLoad: true,
      remoteSort: true,
      remoteFilter: true,
      pageSize: 15,
      proxy: {
        type: "ajax",
        disableCaching: false,
        noCache: false,
        headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
        actionMethods: { read: "POST" },
        url: vconfig.service_api + "pemasok/pemasoks",
        reader: {
          type: "json",
          rootProperty: "Rows",
          totalProperty: "TotalRows",
          successProperty: "success",
        },
      },
      listeners: {
        //
      },
    },
    plugins: ["filterfield"],
    columns: [
      { xtype: "rownumberer", width: 40 },
      { sortable: true, width: 250, filter: { xtype: "textfield" }, header: "Nama", dataIndex: "NAMA" },
      { sortable: true, width: 250, filter: { xtype: "textfield" }, header: "Alamat", dataIndex: "ALAMAT" },
      { sortable: true, width: 50, filter: { xtype: "textfield" }, header: "Negara", dataIndex: "KODE_NEGARA" },
      { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "Nomor Ijin", dataIndex: "NOMOR_IJIN" },
      { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "Tanggal Ijin", dataIndex: "TANGGAL_IJIN" },
      { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "Nib", dataIndex: "NIB" },
      { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "Jenis Api", dataIndex: "KODEJENISAPI" },
      { sortable: true, width: 100, filter: { xtype: "textfield" }, header: "Nomor Identitas", dataIndex: "NOMORIDENTITAS" },
    ],
    bbar: {
      xtype: "pagingtoolbar",
      displayInfo: true,
      displayMsg: "Displaying topics {0} - {1} of {2}",
      emptyMsg: "No topics to display",
    },
  });
  