Ext.define("NJC.MASTERS.mst_item_comp.group_part.FRMgroup_part", {
  extend: "Ext.form.Panel",
  alias: "widget.FRMgroup_part",
  reference: "FRMgroup_part",
  border: false,
  frame: false,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
  bodyPadding: "5 5 5 5",
  items: [
    {
      xtype: "form",
      frame: false,
      border: false,
      height: 80,
      fieldDefaults: {
        labelAlign: "left",
        labelWidth: 70,
        margin: "0 10 5 0",
      },
      items: [
        {
          xtype: "fieldset",
          title: "Group Information",
          width: "100%",
          bodyPadding: "5 0 0 0",
          items: [
            {
              xtype: "container",
              layout: "vbox",
              margin: "0 0 0 0",
              items: [
                { xtype: "numberfield", name: "ID", hidden: true, value: 0 },
                {
                  xtype: "container",
                  layout: "hbox",
                  bodyPadding: "0 0 0 0",
                  items: [{ xtype: "textfield", labelWidth: 120, width: 300, fieldLabel: "Group Name", name: "MODE_CODE", fieldCls: "fieldinput", maxLength: 255, readOnly: false }],
                },
                {
                  xtype: "container",
                  layout: "hbox",
                  bodyPadding: "0 0 0 0",
                  items: [{ xtype: "textfield", labelWidth: 120, width: 400, fieldLabel: "Description", name: "MODE_NAME", fieldCls: "fieldinput", maxLength: 255, readOnly: false }],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      xtype: "grid",
      pid: "GRIDgroup_part",
      emptyText: "No Matching Records",
      autoScroll: true,
      flex: 1,
      plugins: ["filterfield", "gridexporter"],
      store: {
        autoLoad: true,
        remoteSort: false,
        remoteFilter: false,
        pageSize: 0,
        proxy: {
          type: "ajax",
          disableCaching: false,
          noCache: false,
          headers: { Authorization: "Bearer " + localStorage.getItem("ST_NJC_JWT_PLB") },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "matrix/matrixs",
          extraParams: {
            method: "group_part",
          },
          reader: {
            type: "json",
            rootProperty: "Rows",
            totalProperty: "TotalRows",
            successProperty: "success",
          },
        },
      },
      columns: [
        { xtype: "rownumberer", width: 50 },
        { header: "Group Name", dataIndex: "MODE_CODE", sortable: true, width: 300, filter: { xtype: "textfield" } },
        { header: "Description", dataIndex: "MODE_NAME", sortable: true, flex: 1, filter: { xtype: "textfield" } },
        { header: "Create", dataIndex: "CREATE_USER", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "Date", dataIndex: "CREATE_DATE", sortable: true, width: 120, filter: { xtype: "textfield" } },
        { header: "Update", dataIndex: "UPDATE_USER", sortable: true, width: 100, filter: { xtype: "textfield" } },
        { header: "Date", dataIndex: "UPDATE_DATE", sortable: true, width: 120, filter: { xtype: "textfield" } },
      ],
      bbar: {
        xtype: "pagingtoolbar",
        displayInfo: true,
        displayMsg: "Displaying topics {0} - {1} of {2}",
        emptyMsg: "No topics to display",
      },
    },
  ],
});
